#![forbid(unsafe_code)]

use std::{
    collections::{HashMap, VecDeque},
    sync::{
        Arc, Mutex,
        atomic::{AtomicBool, AtomicU64, Ordering},
    },
    time::Duration,
};

use futures_util::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use thiserror::Error;
use tokio::sync::{Notify, mpsc, oneshot};
use tokio_tungstenite::{connect_async, tungstenite::Message};

pub use nodriver_protocol as protocol;

type Pending = HashMap<u64, oneshot::Sender<Result<Value, CdpError>>>;
const EVENT_QUEUE_CAPACITY: usize = 4_096;

#[derive(Debug, Error, Clone)]
pub enum CdpError {
    #[error("CDP connection is closed")]
    Closed,
    #[error("CDP connection was lost: {0}")]
    Lost(String),
    #[error("CDP command timed out after {0}ms")]
    Timeout(u64),
    #[error("CDP command was aborted")]
    Cancelled,
    #[error("CDP protocol error {code}: {message}")]
    Protocol {
        code: i64,
        message: String,
        data: Option<Value>,
    },
    #[error("CDP transport error: {0}")]
    Transport(String),
    #[error("invalid CDP message: {0}")]
    InvalidMessage(String),
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CdpEvent {
    pub method: String,
    #[serde(default)]
    pub params: Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub session_id: Option<String>,
}

pub struct Connection {
    next_id: AtomicU64,
    outgoing: mpsc::UnboundedSender<Message>,
    pending: Arc<Mutex<Pending>>,
    events: Arc<Mutex<VecDeque<CdpEvent>>>,
    closed: Arc<AtomicBool>,
}

#[derive(Default)]
pub struct Cancellation {
    cancelled: AtomicBool,
    notify: Notify,
}

impl Cancellation {
    pub fn cancel(&self) {
        self.cancelled.store(true, Ordering::Release);
        self.notify.notify_waiters();
    }

    async fn cancelled(&self) {
        if self.cancelled.load(Ordering::Acquire) {
            return;
        }
        self.notify.notified().await;
    }
}

impl Connection {
    pub async fn connect(endpoint: &str, timeout_ms: u64) -> Result<Self, CdpError> {
        Self::connect_cancellable(endpoint, timeout_ms, None).await
    }

    pub async fn connect_cancellable(
        endpoint: &str,
        timeout_ms: u64,
        cancellation: Option<&Cancellation>,
    ) -> Result<Self, CdpError> {
        let connecting = connect_async(endpoint);
        tokio::pin!(connecting);
        let connected = if let Some(cancellation) = cancellation {
            tokio::select! {
                result = &mut connecting => result,
                () = cancellation.cancelled() => return Err(CdpError::Cancelled),
                () = tokio::time::sleep(Duration::from_millis(timeout_ms)) => return Err(CdpError::Timeout(timeout_ms)),
            }
        } else {
            tokio::time::timeout(Duration::from_millis(timeout_ms), &mut connecting)
                .await
                .map_err(|_| CdpError::Timeout(timeout_ms))?
        };
        let (socket, _) = connected.map_err(|error| CdpError::Transport(error.to_string()))?;
        let (mut writer, mut reader) = socket.split();
        let (outgoing, mut outgoing_rx) = mpsc::unbounded_channel();
        let pending = Arc::new(Mutex::new(Pending::new()));
        let events = Arc::new(Mutex::new(VecDeque::new()));
        let closed = Arc::new(AtomicBool::new(false));

        let writer_closed = Arc::clone(&closed);
        tokio::spawn(async move {
            while let Some(message) = outgoing_rx.recv().await {
                if writer.send(message).await.is_err() {
                    break;
                }
            }
            let _ = writer.close().await;
            writer_closed.store(true, Ordering::Release);
        });

        let reader_pending = Arc::clone(&pending);
        let reader_events = Arc::clone(&events);
        let reader_closed = Arc::clone(&closed);
        tokio::spawn(async move {
            while let Some(message) = reader.next().await {
                let text = match message {
                    Ok(Message::Text(text)) => text.to_string(),
                    Ok(Message::Binary(bytes)) => match String::from_utf8(bytes.to_vec()) {
                        Ok(text) => text,
                        Err(error) => {
                            fail_pending(
                                &reader_pending,
                                CdpError::InvalidMessage(error.to_string()),
                            )
                            .await;
                            break;
                        }
                    },
                    Ok(Message::Close(_)) | Err(_) => break,
                    _ => continue,
                };
                if route_message(&text, &reader_pending, &reader_events)
                    .await
                    .is_err()
                {
                    break;
                }
            }
            reader_closed.store(true, Ordering::Release);
            fail_pending(
                &reader_pending,
                CdpError::Lost("WebSocket closed".to_owned()),
            )
            .await;
        });

        Ok(Self {
            next_id: AtomicU64::new(1),
            outgoing,
            pending,
            events,
            closed,
        })
    }

    pub async fn send(
        &self,
        method: &str,
        params: Option<Value>,
        session_id: Option<&str>,
        timeout_ms: Option<u64>,
    ) -> Result<Value, CdpError> {
        self.send_cancellable(method, params, session_id, timeout_ms, None)
            .await
    }

    pub async fn send_cancellable(
        &self,
        method: &str,
        params: Option<Value>,
        session_id: Option<&str>,
        timeout_ms: Option<u64>,
        cancellation: Option<&Cancellation>,
    ) -> Result<Value, CdpError> {
        if self.closed.load(Ordering::Acquire) {
            return Err(CdpError::Closed);
        }
        let id = self.next_id.fetch_add(1, Ordering::Relaxed);
        let mut message = Map::new();
        message.insert("id".into(), id.into());
        message.insert("method".into(), method.into());
        if let Some(params) = params {
            message.insert("params".into(), params);
        }
        if let Some(session_id) = session_id {
            message.insert("sessionId".into(), session_id.into());
        }
        let (sender, receiver) = oneshot::channel();
        self.pending
            .lock()
            .expect("pending mutex poisoned")
            .insert(id, sender);
        if self
            .outgoing
            .send(Message::Text(Value::Object(message).to_string().into()))
            .is_err()
        {
            self.pending
                .lock()
                .expect("pending mutex poisoned")
                .remove(&id);
            return Err(CdpError::Lost("WebSocket writer closed".to_owned()));
        }
        let result = match (cancellation, timeout_ms) {
            (Some(cancellation), Some(timeout_ms)) => tokio::select! {
                response = receiver => response.map_err(|_| CdpError::Lost("response channel closed".to_owned()))?,
                () = cancellation.cancelled() => Err(CdpError::Cancelled),
                () = tokio::time::sleep(Duration::from_millis(timeout_ms)) => Err(CdpError::Timeout(timeout_ms)),
            },
            (Some(cancellation), None) => tokio::select! {
                response = receiver => response.map_err(|_| CdpError::Lost("response channel closed".to_owned()))?,
                () = cancellation.cancelled() => Err(CdpError::Cancelled),
            },
            (None, Some(timeout_ms)) => {
                match tokio::time::timeout(Duration::from_millis(timeout_ms), receiver).await {
                    Ok(response) => response
                        .map_err(|_| CdpError::Lost("response channel closed".to_owned()))?,
                    Err(_) => Err(CdpError::Timeout(timeout_ms)),
                }
            }
            (None, None) => receiver
                .await
                .map_err(|_| CdpError::Lost("response channel closed".to_owned()))?,
        };
        if matches!(result, Err(CdpError::Cancelled | CdpError::Timeout(_))) {
            self.pending
                .lock()
                .expect("pending mutex poisoned")
                .remove(&id);
        }
        result
    }

    pub async fn poll_events(&self, max_events: usize) -> Vec<CdpEvent> {
        let mut events = self.events.lock().expect("event mutex poisoned");
        let count = max_events.min(events.len());
        events.drain(..count).collect()
    }

    pub async fn close(&self) {
        if self.closed.swap(true, Ordering::AcqRel) {
            return;
        }
        let _ = self.outgoing.send(Message::Close(None));
        fail_pending(&self.pending, CdpError::Closed).await;
    }
}

async fn route_message(
    text: &str,
    pending: &Mutex<Pending>,
    events: &Mutex<VecDeque<CdpEvent>>,
) -> Result<(), CdpError> {
    let message: Value =
        serde_json::from_str(text).map_err(|error| CdpError::InvalidMessage(error.to_string()))?;
    if let Some(id) = message.get("id").and_then(Value::as_u64) {
        let Some(sender) = pending.lock().expect("pending mutex poisoned").remove(&id) else {
            return Ok(());
        };
        let result = if let Some(error) = message.get("error") {
            Err(CdpError::Protocol {
                code: error
                    .get("code")
                    .and_then(Value::as_i64)
                    .unwrap_or_default(),
                message: error
                    .get("message")
                    .and_then(Value::as_str)
                    .unwrap_or("Unknown CDP error")
                    .to_owned(),
                data: error.get("data").cloned(),
            })
        } else {
            Ok(message
                .get("result")
                .cloned()
                .unwrap_or_else(|| Value::Object(Map::new())))
        };
        let _ = sender.send(result);
        return Ok(());
    }
    if message.get("method").and_then(Value::as_str).is_some() {
        let event: CdpEvent = serde_json::from_value(message)
            .map_err(|error| CdpError::InvalidMessage(error.to_string()))?;
        let mut events = events.lock().expect("event mutex poisoned");
        if events.len() == EVENT_QUEUE_CAPACITY {
            events.pop_front();
        }
        events.push_back(event);
    }
    Ok(())
}

async fn fail_pending(pending: &Mutex<Pending>, error: CdpError) {
    for (_, sender) in pending.lock().expect("pending mutex poisoned").drain() {
        let _ = sender.send(Err(error.clone()));
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tokio::net::TcpListener;
    use tokio_tungstenite::accept_async;

    #[tokio::test]
    async fn routes_command_response_and_session_event() {
        let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
        let address = listener.local_addr().unwrap();
        tokio::spawn(async move {
            let (stream, _) = listener.accept().await.unwrap();
            let mut socket = accept_async(stream).await.unwrap();
            let request = socket.next().await.unwrap().unwrap().into_text().unwrap();
            let request: Value = serde_json::from_str(&request).unwrap();
            assert_eq!(request["method"], "Runtime.evaluate");
            assert_eq!(request["sessionId"], "session-1");
            socket
                .send(Message::Text(
                    serde_json::json!({"id": request["id"], "result": {"value": 2}})
                        .to_string()
                        .into(),
                ))
                .await
                .unwrap();
            socket
                .send(Message::Text(
                    serde_json::json!({
                        "method": "Runtime.consoleAPICalled",
                        "params": {"type": "log"},
                        "sessionId": "session-1"
                    })
                    .to_string()
                    .into(),
                ))
                .await
                .unwrap();
        });

        let connection = Connection::connect(&format!("ws://{address}"), 1_000)
            .await
            .unwrap();
        let result = connection
            .send(
                "Runtime.evaluate",
                Some(serde_json::json!({"expression": "1 + 1"})),
                Some("session-1"),
                Some(1_000),
            )
            .await
            .unwrap();
        assert_eq!(result["value"], 2);
        tokio::time::sleep(Duration::from_millis(10)).await;
        assert_eq!(
            connection.poll_events(10).await,
            vec![CdpEvent {
                method: "Runtime.consoleAPICalled".into(),
                params: serde_json::json!({"type": "log"}),
                session_id: Some("session-1".into()),
            }]
        );
    }

    #[tokio::test]
    async fn removes_timed_out_pending_command() {
        let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
        let address = listener.local_addr().unwrap();
        tokio::spawn(async move {
            let (stream, _) = listener.accept().await.unwrap();
            let mut socket = accept_async(stream).await.unwrap();
            let _ = socket.next().await;
            tokio::time::sleep(Duration::from_millis(100)).await;
        });
        let connection = Connection::connect(&format!("ws://{address}"), 1_000)
            .await
            .unwrap();
        assert!(matches!(
            connection.send("Runtime.enable", None, None, Some(5)).await,
            Err(CdpError::Timeout(5))
        ));
        assert!(connection.pending.lock().unwrap().is_empty());
    }

    #[tokio::test]
    async fn cancellation_removes_pending_command() {
        let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
        let address = listener.local_addr().unwrap();
        tokio::spawn(async move {
            let (stream, _) = listener.accept().await.unwrap();
            let mut socket = accept_async(stream).await.unwrap();
            let _ = socket.next().await;
            tokio::time::sleep(Duration::from_millis(100)).await;
        });
        let connection = Connection::connect(&format!("ws://{address}"), 1_000)
            .await
            .unwrap();
        let cancellation = Cancellation::default();
        cancellation.cancel();
        assert!(matches!(
            connection
                .send_cancellable(
                    "Runtime.enable",
                    None,
                    None,
                    Some(1_000),
                    Some(&cancellation),
                )
                .await,
            Err(CdpError::Cancelled)
        ));
        assert!(connection.pending.lock().unwrap().is_empty());
    }
}
