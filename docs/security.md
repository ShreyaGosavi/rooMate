# Security Considerations

What RooMate actually does for security right now, and — just as importantly — what it doesn't do yet. I'd rather be upfront about the gaps here than have someone find them by reading the code and wonder why they weren't mentioned.

## Password security

Passwords are hashed with bcrypt before they ever touch the database — the raw password is never stored.

One inconsistency I found while writing this doc: signup hashes with a cost factor of 12, but the password-reset flow hashes with a cost factor of 10. Functionally both are fine, but they should match. This is on the list to fix.

## Token strategy

RooMate uses short-lived access tokens plus a refresh token to keep users logged in without re-entering credentials constantly:

- **Access token** — signed JWT, currently set to a 7-day expiry.
- **Refresh token** — signed separately, also 7 days.

Honestly, having both tokens at the same 7-day expiry defeats a lot of the point of splitting them in the first place — the usual pattern is a short-lived access token (minutes) backed by a longer-lived refresh token (days), so a leaked access token has a small blast radius. That's a real improvement I'd make next: shorten the access token's lifetime significantly.

## Session model: rotation, and one session per user

Every time a refresh token is used (or a user logs in), a new access + refresh token pair is issued, and the new refresh token overwrites whatever was previously stored in Redis for that user (`refresh:<userId>`). Practically, this means:

- **Rotation works** — an old refresh token can't be reused once a new one has been issued, since the value stored in Redis has already moved on.
- **One active session per user** — because there's only a single Redis key per user, logging in on a second device overwrites the first device's stored refresh token. The first device's access token still works until it naturally expires, but it won't be able to refresh afterward. This wasn't an intentional multi-device design decision so much as a side effect of the simplest implementation — worth revisiting if multi-device support matters later.

Logging out, or resetting a password, deletes the stored refresh token immediately (`redis.del`), which kills the session right away rather than waiting for the token to expire naturally.

## Email verification & password reset

Both flows use random, single-use tokens stored in Redis with short expiries:

- Email verification token — 15 minutes.
- Password reset token — 15 minutes.
- A verified-but-not-yet-signed-up email stays "verified" in Redis for 1 hour, so there's a window to complete signup after verifying — after that, verification would need to happen again.

The forgot-password flow deliberately doesn't reveal whether an email exists in the system — it responds the same way either way, and only actually sends an email if the account exists. Small thing, but it's the kind of detail that matters for not leaking who's a registered user.

## Known gaps

Being straightforward about what isn't handled yet:

- **JWT fallback secret** — if `JWT_ACCESS_SECRET` isn't set in the environment, the JWT strategy currently falls back to a hardcoded string (`'fallback_secret'`) instead of failing loudly. In production this env var is always set, but the silent fallback itself is a bad pattern — it should throw on startup instead.
- **No rate limiting yet** — login, signup, and forgot-password aren't throttled. Someone could brute-force a login or spam the password-reset endpoint. This is the next thing I'd add.
- **Database SSL certificate isn't verified** — the Postgres connection uses SSL but with `rejectUnauthorized: false`, meaning it doesn't validate the certificate chain. Common shortcut, but not the same as full verification against RDS's actual CA bundle.
- **Equal access/refresh token lifetimes** — covered above, this reduces the value of having two tokens at all.

## Transport & secrets

- Traffic to `api.roomate.site` goes through Cloudflare in **Full (strict)** SSL mode, so the connection between Cloudflare and the EC2 origin is encrypted end-to-end, not just Cloudflare-to-browser.
- Secrets (JWT signing keys, DB credentials, API keys) live in environment files that are gitignored locally and injected via GitHub Actions secrets in CI — nothing sensitive is committed to the repo.
- Kafka connections use SASL authentication over TLS when credentials are present (as they are with Confluent Cloud in production).

---

*See also: [Architecture](architecture.md) · [Deployment](deployment.md)*
