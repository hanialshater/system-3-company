# Accounts rebuild: hand QA with the console magic link (2026-10-17)

owner: backend-engineer (Amara) · branch `accounts-1017` · for: principal-engineer (merge review), privacy-reviewer (schema and deletion read), principal-engineer-ops (readiness A-17) · design: [EDD-008 and its 2026-10-17 addendum](../edd/EDD-008-accounts-and-server-progress.md)

**What this is:** the flows I drove by hand with `curl` against a local **production build** (`next build` with `NEXT_DIST_DIR=.next-on`, then `next start -p 3124`), accounts, likes/saves and counts all `on`, a throwaway local PostgreSQL 16.15 (unix socket, fake data, deleted after), no `RESEND_API_KEY`, so the sign-in link came from the console transport in the server log. Builder's account, not an evaluator's: an independent re-run is owed (principal-engineer-ops, A-17). **Not done:** the browser QA contract, any preview, Neon, a real email, the account page in a browser (it renders; nobody has walked it), the 390x844 walkthrough (G5).

## Builds
| Build | Result |
|---|---|
| `npm run build`, no accounts variables at all | pass; 12 account route functions plus `/account` |
| `npm run build` with `ACCOUNTS_ENABLED=on LIKES_SAVES_ENABLED=on` | pass |
| `built-routes.test.mjs` 31 against the off build (15 method/path pairs) | pass: all 404, no `Set-Cookie` |
| `built-routes.test.mjs` 32, 33 against the on build | pass: library door 404, `start` with `name` 400, signed-out reads 401, anonymous `/me` 200 with no cookie |
| First-load JS (C9 as reworded), gzip, measured on `next start` of main at 2c9532cd0 versus this branch with accounts off | `/`: 241,842 → 242,585 B (+743 B); `/d/a-birthday-like-mine`: 239,034 → 239,607 B (+573 B). Both under the 1 KB ceiling. No `better-auth`, `kysely`, `pg-pool`, `nanostores`, `/api/account`, `lesson_like` or `s3c:saves` string in any first-load script on either page (the account client is loaded as its own chunk after first paint) |

## The flows (`curl`, accounts on)
```

== 1 anonymous /me (expect 200 signedIn:false, no set-cookie)
HTTP/1.1 200 OK
cache-control: no-store
{"signedIn":false,"likesSaves":true}
== 2 start with name (expect 400) and cross-origin (expect 403)
400
403

== 3 library door (expect 404)
404

== 4 start (expect 200 sent), link printed to the server log
{"sent":true}
link: http://localhost:3124/api/account/auth/magic-link/verify?token=<redacted>
server log lines with the address: 0

== 5 click (expect 302 to /account?signed-in=1, cookie Path=/api/account HttpOnly SameSite=Lax)
HTTP/1.1 302 FOUND
location: http://localhost:3124/account?signed-in=1
set-cookie: s3c.session_token=<redacted>; Max-Age=2592000; Path=/api/account; HttpOnly; SameSite=Lax

== 6 signed-in /me
{"signedIn":true,"email":"staff1@example.com","ageBand":"16+","likesSaves":true,"canLike":true}

== 7 beacon carries no cookie (curl -v request headers to /api/events)
> POST /api/events HTTP/1.1
(no '> cookie' line above = none sent)

== 8 merge (Keep my history) with an unknown slug and an extra key
{"progress":{"a-birthday-like-mine":{"recalls":[{"at":1792195251000,"correct":true}],"completedAt":1792022451000,"predictedCorrectly":true},"a-star-heads-for-goal":{"recalls":[],"completedAt":1792281651000}},"saves":[{"slug":"a-star-heads-for-goal","at":1792281651000}]}

== 9 merge again (idempotent: same answer)
{"progress":{"a-birthday-like-mine":{"recalls":[{"at":1792195251000,"correct":true}],"completedAt":1792022451000,"predictedCorrectly":true},"a-star-heads-for-goal":{"recalls":[],"completedAt":1792281651000}},"saves":[{"slug":"a-star-heads-for-goal","at":1792281651000}]}

== 10 delta PUT
{"slug":"a-star-heads-for-goal","progress":{"recalls":[{"at":1792281651000,"correct":false}],"completedAt":1792281651000}}

== 11 like, save, lists, counts (expect 204s, own lists, count null)
like 204
save 204
{"likes":[{"slug":"a-birthday-like-mine","at":1792281651759}]}
{"saves":[{"slug":"a-birthday-like-mine","at":1792281651775},{"slug":"a-star-heads-for-goal","at":1792281651000}]}
HTTP/1.1 200 OK
cache-control: public, max-age=600, s-maxage=600
{"counts":{"a-birthday-like-mine":null,"a-star-heads-for-goal":null}}


== 12 export
content-disposition: attachment; filename="system3-history.json"
{"format":"s3c-export-v1","exportedAt":"2026-10-18T00:00:51.842Z","account":{"email":"staff1@example.com","ageBand":"16+","createdAt":"2026-10-18T00:00:51.634Z","lastActiveAt":"2026-10-18T00:00:51.641Z","policyVersion":"draft-2026-10-16","policyAcceptedAt":"2026-10-18T00:00:51.636Z"},"sessions":[{"createdAt":"2026-10-18T00:00:51.638Z","expiresAt":"2026-11-17T00:00:51.638Z"}],"progress":{"a-birthday-like-mine":{"recalls":[{"at":1792195251000,"correct":true}],"completedAt":1792022451000,"predictedCorrectly":true},"a-star-heads-for-goal":{"recalls":[{"at":1792281651000,"correct":false}],"completedAt":1792281651000}},"likes":[{"slug":"a-birthday-like-mine","at":1792281651759}],"saves":[{"slug":"a-birthday-like-mine","at":1792281651775},{"slug":"a-star-heads-for-goal","at":1792281651000}]}

== 13 teen account cannot like (expect 403)
teen like 403
{"signedIn":true,"email":"staff2@example.com","ageBand":"13-15","likesSaves":true,"canLike":false}

== 14 sign-out (teen): cookie cleared, /me signed out
HTTP/1.1 200 OK
set-cookie: s3c.session_token=; Max-Age=0; Path=/api/account; HttpOnly; SameSite=Lax
set-cookie: s3c.session_data=; Max-Age=0; Path=/api/account; HttpOnly; SameSite=Lax
set-cookie: s3c.dont_remember=; Max-Age=0; Path=/api/account; HttpOnly; SameSite=Lax
{"signedIn":false,"likesSaves":true}

== 15 delete (account 1)
HTTP/1.1 200 OK
set-cookie: __Secure-s3c.session_token=; Path=/api/account; Max-Age=0; HttpOnly; SameSite=Lax; Secure
set-cookie: s3c.session_token=; Path=/api/account; Max-Age=0; HttpOnly; SameSite=Lax
{"deleted":{"account":1,"lessons":2,"recalls":2,"devices":1,"likes":1,"saves":2,"settings":0,"pendingLinks":0}}

auth_user          0
auth_session       0
auth_account       0
auth_verification  0
progress           0
recall             0
lesson_like        0
lesson_save        0
settings           (no table)
deleted_account    1
PASS: every table 0, deleted_account 1
auth_user          1
auth_session       0
auth_account       0
auth_verification  0
signup_intent      0
progress           0
recall             0
lesson_like        0
lesson_save        0
settings           (no table)
deleted_account    1
schema_migrations  2
PASS: auth_account is empty
auth_verification  expired=0 oldest=-
signup_intent      expired=0 oldest=-
auth_session       expired=0 oldest=-
deleted_account    expired=0 oldest=-

== 16 server log lines (expect only the dev-email lines and Next banner)
▲ Next.js 16.4.0
- Local:         http://localhost:3124
- Network:       http://192.0.2.2:3124
✓ Ready in 152ms
✓ Running next.config.mjs took 16ms
{"at":"2026-10-18T00:00:51.678Z","type":"view","slug":"a-birthday-like-mine"}
```

## What I read off that
- Anonymous `/me`: 200, `no-store`, no cookie (M4). `start` refuses `name` (400) and a cross-origin POST (403); the library's own door is 404 (C2, C3, C7).
- The server log held the link and never the address (0 lines with it). The only other log line is the existing `/api/events` line.
- The cookie is `Path=/api/account; HttpOnly; SameSite=Lax`, one cookie only (no cache cookie). Over http it has no `Secure` and no `__Secure-` prefix; on https it gets both (`useSecureCookies` follows `BETTER_AUTH_URL`).
- `curl` with the cookie jar sent **no** `Cookie` header to `/api/events` (path scope, P6.2). This is curl's cookie engine, not a browser: the browser check (`browser-cookie`) is still owed on a preview (A-17).
- Merge dropped the unknown slug and the extra key, kept the saves line, and was idempotent; a second device's `predictedCorrectly: false` did not overwrite `true` (Q7).
- The like count answered `null` for a lesson with 1 like (below 10), cacheable 600 s, no cookie.
- The 13-15 account got 403 on like, and `/me` said `canLike: false`.
- Deletion named its counts, cleared the cookie on the scoped path, and `tools/db-deletion-check.mjs <id> <email>` printed PASS (every table 0, `deleted_account` 1). `--all-counts`: `auth_account` 0.

## Found on the way (not bugs in the code, but readiness facts)
1. **A schema mismatch is cached until restart.** I first started the built server against a database I had not migrated. Better Auth's run-time schema check failed (it reads `information_schema`, no DDL), every account route answered 500 with the fixed log line `account me: failed`, and it **kept** failing after I applied the migration, until the server restarted. Better Auth's source (`@better-auth/core` `createSchemaCheck`) says a mismatch is kept and an unreachable store is not. So: apply migrations **before** a deploy that turns accounts on (already the rollout order), and a migration applied to a live database needs a redeploy before the routes see it. Readiness §3 says so.
2. **The fixed-text logging made that hard to diagnose**: the log line said nothing but "failed". I diagnosed it with a temporary local print that was reverted before any commit (`git diff` clean). If ops wants a diagnosable line, the safe addition is the error's `code` when it is a Better Auth code such as `SCHEMA_MISMATCH` (not only a SQLSTATE). Not done; a question for principal-engineer-ops.
3. **The throwaway Postgres could not live under the session scratch directory**: that tree is root-only and its permissions are reset, and `initdb` refuses to run as root. I ran it as the `postgres` user under `/var/tmp/s3c-acct-1017-pg` (mode 711, unix socket only, port 55432, no TCP), and deleted it at the end. No system service was used.
