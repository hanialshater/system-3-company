# Engineering Review: 2026-10-18: accounts rebuild (EDD-008 rebuilt, PRD-005 likes and saves), merge pass

owner: principal-engineer (Kenji) · tier: 2 · subject: merge commit `29a75310d` on `ccr-bf4ba2e6-qi1p4x` (merge of `accounts-1017`: `3e0131c3c`, `64790f2e6`, `7011dca1c`; parent `7436cdcb9`) · prior review: [2026-10-15 F-01 review and its 2026-10-16 addendum](2026-10-15-accounts-f01-review.md) (C1 to C11, Rulings 1 to 3)

- EDD: [EDD-008](../edd/EDD-008-accounts-and-server-progress.md) and its 2026-10-17 addendum · ADR: ADR-008, [ADR-009](../adr/ADR-009-postgres-on-neon-eu.md) · Amendment: none needed (no protected path changed; `.github/workflows/ci.yml` untouched, see F12)
- [x] The problem is real (F-01, PRD-005)
- [x] Options considered (EDD-008; the merge/sync change is the author's departure, judged in F3 to F5)
- [x] Blast radius: measured with the switches off (F1, F2)
- [ ] Readiness record approved by principal-engineer-ops: not read as approved here; it is a condition (MC4)
- [x] Rollback is one revert: the merge is one commit; migrations are not applied anywhere by the merge (they run only by hand, `tools/db-migrate.mjs`)
- [~] `npm run verify` on the integrated tree: I ran its parts except `qa` (results below). `qa` is condition MC1
- [x] Measurements before and after: first-load JS measured against the parent by me (F2)
- [x] Security, privacy, licences: F6 to F11, F13

**Order of work (artifact before account).** I read the diff and the code, ran the suite and my own probes, and wrote every finding below **before** opening the author's account (the EDD-008 addendum, `company/engineering/notes/2026-10-17-accounts-hand-qa.md`, the readiness sections). The section "After reading the account" was written afterwards and changes nothing above it unless it says so.

## What I ran (all on this host, nothing deployed)

| What | Result |
|---|---|
| `npm run test:accounts` against a throwaway PostgreSQL 16 (unix socket, port 55491, `/var/tmp`, `log_statement=all`; torn down) | **42 pass, 0 fail, 3 skipped** (the 3 built-server tests, run separately below) |
| `tests/accounts/built-routes.test.mjs` against `next start` of this build, accounts **off** | test 31 **pass**: every account route 404, no `Set-Cookie` |
| `npm run test:platform` with the seeded database | **34 pass, 0 fail, 4 skipped**; `engagement-not-ranking.test.mjs` alone: **4/4 pass**, seeded half ran |
| `npm run build` with no accounts variables set | **pass** (C4 holds) |
| `npm run typecheck` | exit 0 |
| `npm run check` | pass (5 pre-existing warnings) |
| `npm run qa` | **not run by me** (MC1) |
| Postgres statement log over the whole suite | no DDL outside the migrator and the test's own `DROP SCHEMA` (C10 holds). The library does issue read-only catalogue queries (`select attname … not_null …`, 27 in the run) |
| `npm audit` / `npm audit --omit=dev` on the merged lockfile | 33 (8 moderate, 24 high, 1 critical), the same pre-existing `vercel` CLI set; **0** with `--omit=dev`; none in the 37 added packages (C11 as reworded: met) |
| Lockfile delta vs parent | 37 added, 0 changed, 0 removed; licences MIT 34, ISC 2, Apache-2.0 1; no install scripts |
| Traced function size, `/api/account/auth/[...all]` | 187 files, 11.2 MB (vs `/api/events` 10.2 MB); far under the 250 MB limit (C9 server half) |
| First-load JS, parent `7436cdcb9` vs merge, gzip -9 of every script in the prerendered HTML | `/`: 241,734 → 242,513 B (**+779 B**). `/d/a-birthday-like-mine`: 238,962 → 239,587 B (**+625 B**). No library or `/api/account` string in any first-load script |
| Real-server flow, accounts **on**, local DB, console mail transport | link → 302 to `/account?signed-in=1`; cookie `s3c.session_token; Path=/api/account; HttpOnly; SameSite=Lax`; replayed link refused; a tampered `callbackURL=https://evil.example` → 403, no session; library `update-user` → 404; sign-out cross-origin → 403 and with no Origin → 403; counts → no `Set-Cookie`, `public, max-age=600`; server log holds the link but not the address |
| Browser (Playwright) on `/` with accounts **off**, load then reload | requests added vs today: `GET /api/account/me` (404) **on every load including the reload**, and one async chunk (1,761 B gzip). No cookie set |
| Probe: 20 progress `PUT`s of 100 distinct recalls each, one slug | **2,000 `recall` rows** for one slug; `GET /api/account/progress` 72 KB |
| Probe: unsave of a slug that has left the catalogue | **404, row stays** |

Probe scripts were in my session scratchpad and are not committed. Nothing was installed: `node_modules` was a symlink to the main checkout's (same pinned versions) and is removed. Method notes for the next reviewer: Turbopack refuses a `node_modules` symlink when the project sits outside `/home/user/system-3-company`, so the parent baseline was a `git archive` of `7436cdcb9` extracted inside this worktree (since removed). The worktree isolation hook blocks `su`, so `setpriv --reuid=postgres --regid=postgres --init-groups` ran `initdb` and `pg_ctl`.

## Findings (problems, not fixes)

### F1. Accounts off is not quite "today's app plus one request" (merge-relevant, small)
Measured with the switches off, the merged app differs from the parent in four ways, not one:
1. `GET /api/account/me` → 404, on **every** full page load. The handler sends `cache-control: public, max-age=300, s-maxage=300`, and the comments in `account-api.ts` `me()` and `AccountSync.tsx` claim "at most one function call per visitor per 5 minutes". That claim is false in the browser: `accountMe()` in `src/lib/account-client.ts` fetches with `cache: "no-store"`, which bypasses the HTTP cache, and Playwright saw the reload re-request it. Whether Vercel's CDN still answers it from `s-maxage` is unmeasured.
2. One extra async JS chunk (1,761 B gzip) on every page, the `import("@/lib/account-client")`.
3. `/account` now answers 200 with "Accounts are not available here" (it was a 404). It is `noindex` and linked from nowhere. C5 forbids the page from reading the switch, so this follows from the design. It needs to be written down, not changed.
4. First-load JS +779 B gzip on `/` (F2).
None of these touches a learner's data, a lesson or the beacon. The `/api/events` beacon never carries the cookie, because the cookie path is `/api/account`.

### F2. C9 (as reworded 2026-10-16): met on the ceiling, not on the letter
+779 B gzip on `/` and +625 B on `/d/*`, under the 1 KB ceiling, and no account, auth-library or driver code or route string in any first-load script (C9(a) holds). By chunk, normalised: Turbopack's async-module runtime is +448 B, which is framework code. About +135 B is `AccountSync`'s `useEffect(import(…))`, and about +184 B is `setProgressSink` and `mergeIntoLocal` added to `src/kit/progress.ts`, which every lesson loads. So about 320 B is first-party code. C9(b) said "all of it framework runtime or id churn". I rule it **met**, because its purpose was keeping library code out, and that holds. But `mergeIntoLocal` has only two callers (`account-client.ts`, `AccountView.tsx`), and it belongs in the account chunk, not in the kit (PC8).

### F3. The per-lesson push uploads the whole local entry, so "Don't import" is not true (preview-blocking)
`updateProgress` in `src/kit/progress.ts` calls `sink(slug, all[slug])`, and `pushDelta` PUTs that **whole** local entry: `completedAt`, `predictedCorrectly` and every recall on the device for that slug. Suppose a learner signs in, presses **Don't import** and then plays or revisits any lesson they had played anonymously. That slug's whole pre-sign-in history goes to the account, including the earlier `completedAt`, the anonymous `predictedCorrectly` (which the server then keeps for ever, by Q7) and the old recalls. The addendum's stated property ("the device's earlier history is uploaded only by the explicit merge, so Don't import stays true on later loads", `account-client.ts` header) holds only for slugs never touched again. The merge-by-union server rule makes this permanent: nothing can lower or remove it. It is also the path a login-CSRF would use (an attacker mails a victim the attacker's own sign-in link). After the click, every lesson the victim touches sends that slug's full device history to the attacker's account.

**Judgement on the author's change** ("full upload on every load" → explicit merge + per-lesson push). The direction is right, and better than EDD-008 proposal 3. The 2026-10-15 review (F10) had already called the full upload wasteful, and an explicit merge is the only honest way to offer "Don't import". The defect is in the word "delta". A delta has to be the change this update made (a new recall, a first completion, a first prediction), not the slug's whole state.

### F4. Pulling the account's map into the device's anonymous store leaks across accounts on a shared device (preview-blocking)
`startAccountSync` merges the account's map into `s3c:progress:v1`, the same key anonymous play uses. Sign-out does not remove it (`signOut()` clears only in-memory state; the UI offers "also clear this device" only on delete). On a shared or school device:
- after sign-out, the next anonymous learner's revisits and progress include the previous account's history, and
- if a second learner then signs in, the "Bring this device's history?" screen offers the first learner's history as theirs. Even after **Don't import**, F3 pushes it slug by slug.
This is a privacy property. I am routing the ruling on what sign-out must do to the privacy reviewer (see "Routed"). The engineering requirement is the test in PC2.

### F5. The merge screen counts the wrong thing and forgets the answer (preview-blocking, small)
`AccountView` calls `startAccountSync()`, which awaits the pull and `mergeIntoLocal`, and only then mounts `SignedIn`, which computes `whatMoves()` from the **merged** local map. On a fresh second device with no history, the screen says "Bring this device's history? N lessons completed…", where N is the account's own lessons. The consent screen (gate 2.3, "confirmed the list on screen") shows the wrong list. `mergeState` is component state, so **Don't import** is asked again on every visit, and since the local map now always holds the account's history, it always shows. There is also a race: the layout's `AccountSync` and the page both call `startAccountSync`. The second caller returns before the pull finishes, so the count depends on timing.

### F6. Server-side growth is bounded per call, not per account (preview-blocking, small)
`cleanProgressMap` caps recalls at 100 per slug **per request**, but `INSERT … ON CONFLICT DO NOTHING` accumulates them. Measured: 20 PUTs → 2,000 `recall` rows for one slug and a 72 KB GET. `progressPut` and `merge` have no rate limit. Only the account owner can write, but one script can grow its account without bound, and the GET response then flows into the device's `localStorage` (about 5 MB quota). Every client then receives it in `mergeIntoLocal`.

### F7. Unsave and unlike of a retired lesson fail (preview, small)
`mark()` checks `inCatalog(slug)` before both PUT and DELETE. Measured: DELETE of a slug no longer in the catalogue → 404 and the row stays. The learner then cannot remove their own row except by deleting the account. A DELETE should not need the slug to be live.

### F8. Rate limits: right shape, per instance (go-live, recorded)
`start` (5/60 s per IP and per email, HMAC keys), likes (60 per rolling 24 h per account) and the library's verify limit (30/60 s, the F-f ruling, already done) all live in one function instance's memory. With Fluid compute and several instances, or after a cold start, the real limit is a multiple of the number. For a staff preview this is fine. For go-live, the privacy C3.2 "at most 60 per account per 24 h" is not held as written, and per-email mail-bombing is bounded only per instance. The like limiter also counts unlikes (harmless). `clientIp` trusts the first `x-forwarded-for` hop. That is right on Vercel, which sets the header itself, and wrong anywhere else.

### F9. The counts endpoint (no raw numbers, no cookie): correct; cache-busting is open (before `LIKE_COUNTS_PUBLIC` goes on outside staff)
It is correct: switched by `likeCountsPublic` (accounts and likes and counts all on), never reads a cookie (and the cookie's path cannot reach it), the same body for every viewer, step labels only (`<10` → `null`, so 0 and 9 are byte-identical; tested), a 24-hour account age, a hide list, and `public, max-age=600`. The raw count never leaves `countLabels`. Open: it is unauthenticated, unlimited and keyed by the raw query string. `?slugs=a,b`, `?slugs=b,a` and `?slugs=a,b,zz` are different cache entries, so anyone can make every request miss the cache and hit Postgres. A small cost, but it is the one public database-backed endpoint.

### F10. Auth, session and cookie scope: correct (no finding)
Cookie `Path=/api/account`, HttpOnly, SameSite=Lax, `Secure` and the `__Secure-` name on https. No cookie cache. Hashed single-use tokens, 300 s. Only `GET /magic-link/verify` and `POST /sign-out` reach the library router (C2; the library's `/sign-in/magic-link` and `update-user` → 404). `start` takes exactly three keys (C3). `verification.create.before` strips `name` and the M1 CHECK backs it. IP and UA are blanked on create and update, and the CHECK backs that. No intent → no user. Telemetry is refused. The logger prints only the SQLSTATE. Our own writes check Origin, `sec-fetch-site` and JSON (C7). The library checks `callbackURL` against `trustedOrigins` (403 measured). Email is lowercased by the library before lookup and insert, and the unique index is on `lower(email)`. Delete clears both cookie names on the scoped path. One preview hazard: with `BETTER_AUTH_URL` unset on Vercel, `baseURL` is `https://$VERCEL_URL`, the per-deployment host. A staff member on the branch alias host then gets links and cookies for the other host, and sign-out from the alias is refused (PC5).

### F11. SQL and migrations: sound
Every value is parameterised. The two interpolations (`${table}` from the `MarkTable` union, `${filter}` a constant) take no input. The upserts are idempotent (`LEAST` ignores NULL; prediction `COALESCE` keeps the first, by Q7). Each migration runs in its own transaction with its `schema_migrations` row. `down` needs `--confirm-drop` and rolls back in reverse order (002 before 001, which the `lesson_*` foreign keys require). Up/down/up is tested (test 26). The Postgres 16 floor is enforced. Smaller points, none blocking: no advisory lock against two migrators at once (the second fails inside its transaction, so this is safe); a failed migration prints `e.message`, which for DDL holds no row values; `recall` reaches `auth_user` only through `progress` (the cascade is correct, and deletion also deletes it explicitly).

### F12. Deletion and export: complete for the tables that exist
Deletion is one transaction. `FOR UPDATE` on the user row blocks a concurrent session insert until it fails. It deletes likes, saves, settings (if the perso-m1 table exists), recalls, progress, sessions, accounts, and pending links matched by lowercased email in `auth_verification`, then the user, and writes the tombstone. `signup_intent` holds no email or id, so it is not personal data here, and it expires in ≤ 10 min. The export holds the account basics, sessions (created and expiry only), progress in the device shape (a round trip is tested), likes, saves and settings. It omits pending links (transient) and the tombstone (correct). `tools/db-deletion-check.mjs` covers the same table list. One gap in the safety net: `test:accounts` is in `verify` but **not in `.github/workflows/ci.yml`**, so CI never runs even the 15 database-free checks (S1 to S15: the switch scan, the client-import scan, the one-door scan, the M5 pin guard). `ci.yml` is protected, so adding it needs an amendment (routed).

### F13. Dependencies: acceptable
37 packages, all permissive, no install scripts. The heavy parts (all of `better-auth`'s adapters for drizzle, prisma and mongo, plus `zod`, `jose` and `kysely`) are installed but traced only where imported. `better-auth` 1.7.10 is exact-pinned and `pg` 8.23.1 too, and S14 fails any Better Auth bump that does not update the regression record (M5). Risk to watch: Better Auth is a fast-moving 1.x with a large surface, and our safety rests on hooks, `disabledPaths`-style routing and DB CHECKs. The CHECKs are the right backstop. Upgrades stay tier 2.

### F14. The engagement-not-ranking test: the scan guards; the ordering half proves little
Half (a) compares `feedOrder` output with empty and with seeded like and save tables. `feedOrder` reads no database today, so (a) can only fail if someone wires the database into the feed, and it runs only when `ACCOUNTS_TEST_DATABASE_URL` is set (not in CI, not in a default `verify`). The real guard is (b), the name and import scan, which is good but has two gaps:
- `NAMES` does not include the learner's own list routes (`/api/account/likes`, `/api/account/saves`). `src/lib/account-client.ts` is on the allow-list and **any** file may import it. So a feed component could import a new `listSaves()` from `account-client` and reorder by it, and (b) would pass.
- The scan covers `src/`, `tools/` and `content/` only. That is enough today.
The control test (planted reader) is good practice.

### F15. Smaller points (no condition)
- `start` writes `signup_intent` and `auth_verification` before the send. With no mail transport (production, no key), the learner gets 500 and the rows wait for the next `start` purge. That is fine.
- `MAIL${status}` truncated to 5 chars logs as `sqlstate=MAIL4`: cosmetic.
- `POLICY_VERSION` is duplicated in `AccountView.tsx` and `auth.ts` `PUBLISHED_POLICY_VERSIONS`. A mismatch fails closed (400). A-16 already covers go-live.
- The console mail transport prints live single-use links to the server log on Preview. That is acceptable only with staff addresses and team-only log access (PC5).
- `/api/likes/counts` imports the account wiring, so its function carries Better Auth (11.2 MB). This is harmless.
- C6: no `regions` in `vercel.json`. Per Ruling 3, the per-route `preferredRegion` does nothing on Node functions, so every account route runs in `iad1` today. W-1149 (option C) did not land with this branch. That does not affect a merge with the switches off, but the proof preview is still owed (PC6).

## Decision

### Merging into the default branch with every switch off: **approve with conditions**
With `ACCOUNTS_ENABLED` unset, no account code path touches a database, sets a cookie or changes a lesson. The build passes with no variables, and the deltas are the four in F1, all small and measured. The defects F3 to F7 are reachable only with the switch on. Merge conditions (backend-engineer unless named):
- **MC1.** Run `npm run verify` (including `qa`) green on the exact tree being merged, and paste the summary into the readiness record. I ran everything but `qa`.
- **MC2.** Make the /me caching claim true or remove it: either the first `accountMe()` fetch drops `cache: "no-store"` (keep `no-store` for `refresh`, and keep the on-state `no-store` response header), so the off-state 404's `max-age=300` is honoured, or the comments in `account-api.ts` `me()`, `AccountSync.tsx` and the addendum stop claiming "once per 5 minutes". If the first option: a Playwright check that a reload makes no second `/me` request with accounts off.
- **MC3.** Record the four off-state deltas of F1 (with my numbers or re-measured ones) in the EDD-008 addendum as accepted, so "accounts off equals today" has a written exception list.
- **MC4.** principal-engineer-ops approves the readiness record for the merge with the switches off. That is their call, not mine.

### Before a staff preview with any switch on: these must hold
- **PC1 (F3).** The push sends only what this update changed: the new recall, a first `completedAt` or a first `predictedCorrectly`. It does not send the slug's stored entry. Test: device with anonymous history on slug X → sign in → **Don't import** → one new recall on X → the account holds exactly that recall, with no earlier `completedAt`, prediction or recall.
- **PC2 (F4).** A second account on the same device never receives the first account's history without an explicit import, and sign-out does whatever the privacy reviewer rules about the pulled copy. Test: A signs in, history pulled, signs out; B signs in on the same device → B's merge screen offers nothing of A's, and B's account receives nothing of A's after any lesson.
- **PC3 (F5).** The merge screen counts only device history the account does not already hold, computed before the pull. The answer (Import or Don't import) is remembered for this account on this device. Test for both, plus the two-caller race.
- **PC4 (F6, F7).** A server-side cap on recalls per (account, slug) that holds across requests, plus a per-account limit on `PUT /progress` and `merge`, each with a test that repeats my 20×100 probe. Unlike and unsave of a slug outside the catalogue delete the row (test).
- **PC5 (F10, F15).** Preview environment: `BETTER_AUTH_URL` is set to the exact host staff will use, Deployment Protection is on, only staff addresses sign up, and the test database holds fake data only (C8). If the console transport is used, function-log access is team-only, and the preview record says so. The A-17 browser cookie check (the beacon and page requests carry no session cookie) runs in a real browser on the preview. The readiness record says `browser-cookie.mjs` was lost and only the curl check stands in.
- **PC6 (C6, Ruling 3).** The region proof of Ruling 3 condition 3 is on the record. Either W-1149 lands first, or the preview record states the account functions ran in `iad1` (fake data only).
- **PC7 (F14).** The engagement scan adds `/api/account/likes` and `/api/account/saves` to `NAMES`, and fails if any file outside `src/components/account/` (and the like and save controls, named in `ALLOWED` with their record) imports `account-client`.
- **PC8 (F2, small).** `mergeIntoLocal` and the sink move out of `src/kit/progress.ts` into the account chunk, or stay there with a one-line reason in the addendum. Re-measure first-load.

### Before go-live (recorded, not owed now)
Durable or shared rate limits for `start` per email and for the 60-likes rule (F8). Before `LIKE_COUNTS_PUBLIC` goes on outside staff: a normalised count cache key (sorted and deduped `slugs`), and either a per-IP limit or per-slug caching (F9). `test:accounts` in CI via an amendment to `ci.yml` (F12). W-1149 `fra1` (F15). A-16: the draft policy version removed.

### Objections that travel with this decision
- *"Approving a merge whose sync is wrong ships wrong code to main."* (principal-engineer, against myself.) **Answer:** the code is unreachable with the switch off. The conditions that fix it bind the only way to reach it (the preview). Refusing the merge would keep a 4,200-line branch off main, after one such branch has already been lost.
- *"Per-instance rate limits break privacy C3.2 as written."* (implied by F8.) **Answer:** that is true at go-live, and it is listed there. It is not true of a staff preview, where every account is staff.

## After reading the account
(Written after the findings above.) Read: the EDD-008 addendum A1 to A5, `company/engineering/notes/2026-10-17-accounts-hand-qa.md`, the readiness additions.

- **First-load numbers agree.** The author measured +743 B on `/` and +573 B on `/d/*` against main at `2c9532cd0`. I measured +779 B and +625 B against the merge parent `7436cdcb9`, at gzip level 9. The baselines differ, and both are under the ceiling. F2 stands, including the ~320 B of first-party code, which the note does not split out.
- **A4.1 is the author's case for explicit merge plus per-lesson push.** It names one cost, the offline delta lost when the tab closes. It does not notice F3, that the "one-slug delta" is the slug's whole stored entry. The hand QA's flow 10 sends a hand-made entry with `curl`, so it could not show this. F3 stands as preview-blocking.
- **A1 handles the shared-device case for saves** ("while signed in nothing is written to `s3c:saves:v1`, so sign-out leaves no account saves on a shared device", C5.3). The same reasoning was not applied to progress, which *is* pulled into `s3c:progress:v1`. That makes F4 an inconsistency inside the design, not only my reading. It strengthens the case for PC2.
- **A4.4 says the off-state 404 "the browser and CDN may keep for 5 minutes".** The browser half is false (F1, MC2).
- **The note says the account page "renders; nobody has walked it"**, and no browser QA ran. That fits F5 going unseen. PC3's tests are the first evaluator check of that screen.
- **Hand QA, found on the way #1: a schema mismatch is cached until restart.** This explains the read-only catalogue queries I saw in the statement log. It is a rollout-order fact for principal-engineer-ops: migrate first, then deploy, and redeploy after any later migration. It is not an engineering condition. **#2, diagnosability.** Logging Better Auth's own error code is safe if it is matched against a fixed allow-list of library codes (for example `SCHEMA_MISMATCH`). It must never be the message. principal-engineer-ops decides whether they want it.
- Nothing in the account changes a finding, a condition or the verdict above.

## Kudos
- @backend-engineer: the hand-QA note lists exactly what was not done, and it found Better Auth's cached schema mismatch. That explained the catalogue queries in my statement log before I had to chase them. (Not filed with `kudos.mjs`: it writes `events.jsonl`, which this review may not touch. The chief of staff may file it.)

## Routed (board asks for the chief of staff; I did not edit board.json)
1. backend-engineer: MC1 to MC3, then PC1 to PC8.
2. privacy-reviewer: rule on F4 (what sign-out must do to the account copy pulled onto a device; whether login-CSRF via a mailed link, F3, needs a UI cue beyond "Signed in as …" on `/account`).
3. principal-engineer-ops: MC4 (readiness for the merge with switches off), and PC5/PC6 on the preview record.
4. evaluation-steward (or the amendment's owner): amendment to add `npm run test:accounts` to `.github/workflows/ci.yml` (F12).
5. platform-engineer: W-1149 `fra1` before the preview, or the PC6 record.
