#![forbid(unsafe_code)]

mod generated;

pub use generated::*;

#[cfg(test)]
mod tests {
    use super::network::CookieSameSite;

    #[test]
    fn named_enum_accepts_only_official_wire_values() {
        assert_eq!(CookieSameSite::Strict.as_str(), "Strict");
        assert_eq!(CookieSameSite::try_from("Lax"), Ok(CookieSameSite::Lax));
        assert!(CookieSameSite::try_from("invalid").is_err());
    }
}
