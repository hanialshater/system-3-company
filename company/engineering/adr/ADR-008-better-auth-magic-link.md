# ADR-008: Accounts are Better Auth magic links in our own Postgres, optional, and invisible to the event beacon

status: proposed (accepting it needs the phase-2 spike to pass, W-1135, and the principal engineer's review with EDD-008)
date: 2026-10-15
deciders: founder (F-01, provider), principal-engineer (architecture), privacy-reviewer (data, P1 and P6 rows)
source: [founder F-01](../../decisions/2026-10-15-founder-f01-accounts.md) · [f01-options.md](../../initiatives/first-light/f01-options.md) · [privacy gate](../../initiatives/first-light/privacy-gate.md) · [EDD-008](../edd/EDD-008-accounts-and-server-progress.md) · dependency records: [better-auth](../../decisions/2026-10-15-dep-better-auth.md), [Resend, no SDK](../../decisions/2026-10-15-provider-resend-no-sdk.md)

## Context
Progress lives only in the browser (`src/kit/progress.ts`, `s3c:progress:v1`). First Light wants it to survive devices, and wants the revisit recall rate to be measurable. The privacy gate fixes the shape: anonymous means local (2.1), the minimum fields (2.2), an explicit merge (2.3), self-serve deletion and export (2.4), a 13+ floor with the year discarded (3.3), and a beacon that never carries an identifier or cookie (P6.2). Sign-in must never stand in front of the first lesson.

## Decision
1. **Library:** `better-auth` 1.7.10, exact pin, `magicLink` plugin only. No passwords, no social providers, no anonymous plugin, no Neon-managed auth.
2. **Where accounts live:** our Postgres (ADR-009), in tables prefixed `auth_`. The auth provider is therefore us. Deleting a user is one SQL transaction, with no second system to call.
3. **Mounted under one path:** Better Auth at `/api/account/auth/*`, and our own account routes (merge, progress, export, delete, me) under `/api/account/*`.
4. **The session cookie is scoped to `Path=/api/account`**, `HttpOnly`, `Secure`, `SameSite=Lax`, with a `__Secure-` prefix. The browser then never attaches it to `/api/events`, to pages or to lesson frames, so P6.2 ("the beacon looks the same signed-in or not") holds by construction rather than by care. Pages ask `/api/account/me` from the client. Better Auth's cookie cache (a second cookie) is off.
5. **Sign-up order:** age screen (in the browser, nothing sent) → email → link. A server route accepts only the bands `13-15` or `16+` and the policy version. It stores them in `signup_intent` keyed by the hash of the magic-link token, then sends the link. The user row is created on the first click, with the band read from that intent (EDD-008 §6.2). An under-13 answer never reaches the server.
6. **Privacy settings in code, each with a test:** telemetry off; magic-link token stored hashed, 300 s, single use; session IP and user agent blanked by hook and forbidden by a DB `CHECK`; the rate limiter's IP-keyed store in memory only; Better Auth's own `delete-user` endpoint off; logger at `error` with no request bodies.
7. **Email:** Resend over plain `fetch`, sign-in links only (P1.8).
8. **Kill switch:** `ACCOUNTS_ENABLED` (server-read at run time, default off). When off, every `/api/account/*` route returns 404 and the UI hides sign-in. Merging this code does not turn accounts on.

## Consequences (good and bad)
- Good: no third-party origin in the browser (P7.1), no password store, no second user database. Exit is low: the tables are ours.
- Good: the cookie scoping makes the beacon rule a property of the browser, so a later refactor cannot leak the session into analytics by mistake.
- Good: an anonymous learner never meets any of this. No cookie and no server row until sign-up completes (P1.2).
- Bad: four library defaults conflict with the gate (IP, user agent, plain tokens, the required `name` column), and we must hold them down on every upgrade. A minor release could change them.
- Bad: server components cannot read the session, because the cookie does not reach page paths. Signed-in UI is client-rendered from `/api/account/me`. For a feed of lessons this costs one request, and I think it is worth it.
- Bad: the in-memory rate limiter is per function instance, so a determined sender can exceed 5 links per minute by hitting several instances. Resend's quota caps the damage. The spike decides whether a Vercel firewall rule is also needed.
- Bad: sign-in links pass through the email sender's logs and the host's request log (the token is in the URL). Single use and 300 s make a logged link worthless after use or expiry.

## Alternatives rejected and why
- **Auth.js v5:** still a beta for Next 16. It remains the named fallback if the spike fails (founder record).
- **Clerk:** a second user store in the US, a third-party script and cookies on sign-up (P7.1), and two-system deletion.
- **Neon "Managed Better Auth":** moves auth into Neon's service (`NEON_AUTH_*` variables), which is a different processor than the one decided. It would need its own review.
- **Hand-rolled magic links:** no packages, but we would own the session, CSRF and cookie code alone.
- **An anonymous server id to "claim" history later:** refused by the privacy gate (2.1). The merge at sign-up needs no id.
- **A session cookie on `/`:** simpler, but every same-origin request, including `sendBeacon("/api/events")`, would carry it. That breaks P6.2.
