#![deny(clippy::all)]

use std::{
    collections::HashMap,
    sync::{
        Arc, LazyLock, Mutex as StdMutex,
        atomic::{AtomicU32, Ordering},
    },
};

use napi::{Error, Result, Status};
use napi_derive::napi;
use nodriver_cdp_core::{Cancellation, CdpError, Connection};
use tokio::sync::{Mutex, RwLock};

static CONNECTIONS: LazyLock<RwLock<HashMap<u32, Arc<Connection>>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));
static NEXT_HANDLE: LazyLock<Mutex<u32>> = LazyLock::new(|| Mutex::new(1));
static NEXT_CANCELLATION: AtomicU32 = AtomicU32::new(1);
static CANCELLATIONS: LazyLock<StdMutex<HashMap<u32, Arc<Cancellation>>>> =
    LazyLock::new(|| StdMutex::new(HashMap::new()));

#[napi]
pub async fn connect(
    endpoint: String,
    timeout_ms: Option<u32>,
    cancellation_id: Option<u32>,
) -> Result<u32> {
    let cancellation = get_cancellation(cancellation_id)?;
    let connection = Arc::new(
        Connection::connect_cancellable(
            &endpoint,
            u64::from(timeout_ms.unwrap_or(10_000)),
            cancellation.as_deref(),
        )
        .await
        .map_err(cdp_error)?,
    );
    let mut next = NEXT_HANDLE.lock().await;
    let handle = *next;
    *next = next
        .checked_add(1)
        .ok_or_else(|| Error::new(Status::GenericFailure, "native connection handle overflow"))?;
    CONNECTIONS.write().await.insert(handle, connection);
    Ok(handle)
}

#[napi]
pub async fn send(
    handle: u32,
    method: String,
    params_json: Option<String>,
    session_id: Option<String>,
    timeout_ms: Option<u32>,
    cancellation_id: Option<u32>,
) -> Result<String> {
    let connection = get_connection(handle).await?;
    let params = params_json
        .map(|json| serde_json::from_str(&json))
        .transpose()
        .map_err(|error| Error::new(Status::InvalidArg, format!("invalid params JSON: {error}")))?;
    let cancellation = get_cancellation(cancellation_id)?;
    let result = connection
        .send_cancellable(
            &method,
            params,
            session_id.as_deref(),
            timeout_ms.map(u64::from),
            cancellation.as_deref(),
        )
        .await
        .map_err(cdp_error)?;
    serde_json::to_string(&result).map_err(napi_error)
}

#[napi]
pub fn create_cancellation() -> Result<u32> {
    let id = NEXT_CANCELLATION.fetch_add(1, Ordering::Relaxed);
    if id == u32::MAX {
        return Err(Error::new(
            Status::GenericFailure,
            "native cancellation id overflow",
        ));
    }
    CANCELLATIONS
        .lock()
        .expect("cancellation mutex poisoned")
        .insert(id, Arc::new(Cancellation::default()));
    Ok(id)
}

#[napi]
pub fn cancel(cancellation_id: u32) -> Result<()> {
    let cancellation = CANCELLATIONS
        .lock()
        .expect("cancellation mutex poisoned")
        .get(&cancellation_id)
        .cloned()
        .ok_or_else(|| {
            Error::new(
                Status::InvalidArg,
                format!("unknown cancellation id: {cancellation_id}"),
            )
        })?;
    cancellation.cancel();
    Ok(())
}

#[napi]
pub fn dispose_cancellation(cancellation_id: u32) {
    CANCELLATIONS
        .lock()
        .expect("cancellation mutex poisoned")
        .remove(&cancellation_id);
}

#[napi]
pub async fn poll_events(handle: u32, max_events: Option<u32>) -> Result<Vec<String>> {
    let connection = get_connection(handle).await?;
    connection
        .poll_events(max_events.unwrap_or(100) as usize)
        .await
        .into_iter()
        .map(|event| serde_json::to_string(&event).map_err(napi_error))
        .collect()
}

#[napi]
pub async fn connection_closed(handle: u32) -> Result<bool> {
    Ok(get_connection(handle).await?.is_closed())
}

#[napi]
pub async fn active_connection_count() -> u32 {
    CONNECTIONS.read().await.len() as u32
}

#[napi]
pub async fn close(handle: u32) -> Result<()> {
    let connection = CONNECTIONS
        .write()
        .await
        .remove(&handle)
        .ok_or_else(|| invalid_handle(handle))?;
    connection.close().await;
    Ok(())
}

async fn get_connection(handle: u32) -> Result<Arc<Connection>> {
    CONNECTIONS
        .read()
        .await
        .get(&handle)
        .cloned()
        .ok_or_else(|| invalid_handle(handle))
}

fn invalid_handle(handle: u32) -> Error {
    Error::new(
        Status::InvalidArg,
        format!("unknown native connection handle: {handle}"),
    )
}

fn napi_error(error: impl std::fmt::Display) -> Error {
    Error::new(Status::GenericFailure, error.to_string())
}

fn get_cancellation(cancellation_id: Option<u32>) -> Result<Option<Arc<Cancellation>>> {
    cancellation_id
        .map(|id| {
            CANCELLATIONS
                .lock()
                .expect("cancellation mutex poisoned")
                .get(&id)
                .cloned()
                .ok_or_else(|| {
                    Error::new(Status::InvalidArg, format!("unknown cancellation id: {id}"))
                })
        })
        .transpose()
}

fn cdp_error(error: CdpError) -> Error {
    let payload = match error {
        CdpError::Closed => serde_json::json!({ "kind": "closed" }),
        CdpError::Lost(message)
        | CdpError::Transport(message)
        | CdpError::InvalidMessage(message) => {
            serde_json::json!({ "kind": "lost", "message": message })
        }
        CdpError::Timeout(timeout_ms) => {
            serde_json::json!({ "kind": "timeout", "timeoutMs": timeout_ms })
        }
        CdpError::Cancelled => serde_json::json!({ "kind": "aborted" }),
        CdpError::Protocol {
            code,
            message,
            data,
        } => serde_json::json!({
            "kind": "protocol",
            "code": code,
            "message": message,
            "data": data,
        }),
    };
    Error::new(
        Status::GenericFailure,
        format!("NODRIVER_CDP_ERROR:{payload}"),
    )
}
