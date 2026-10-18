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

## Re-read 2026-10-18: the fixes (merge `de5ff7013`; fix commits `beb83bfd4`, `c8afd9ff7`)

reviewer: principal-engineer (Kenji) · read the code diff `7ed0a2c8e..de5ff7013 -- src tests db` first, then EDD-008 addendum A6 and the readiness "Additions, 2026-10-18".

### What I ran (worktree copy of `de5ff7013`; nothing deployed)
| What | Result |
|---|---|
| `npm run test:accounts`, throwaway PostgreSQL 16 (unix socket, port 55497, `/var/tmp`; torn down) | **56: 52 pass, 0 fail, 4 skipped** (built-server tests), as the author reported |
| `npm run test:platform` with the same database | **39: 35 pass, 0 fail, 4 skipped**; the PC7 importer scan and its controls pass |
| `npm run build`, no accounts variables; `next start` on port 3317 (stopped) | build pass; test **31 pass**; test **34 pass** in real Chromium (first load 1 network `/me`, reload 0; the `no-store` control is seen) |
| First-load JS, gzip -9 of every script in the prerendered HTML, same method as above | `/` **242,291 B** (merge I reviewed: 242,513, so −222 B; vs parent `7436cdcb9`: +557 B). `/d/a-birthday-like-mine` **239,482 B** (was 239,587, −105 B; vs parent +520 B). No `/api/account`, `mergeIntoLocal`, `unionMaps`, `account-device` or library string in any first-load script |
| Probe 1 (in the client harness, not committed): A signed in and answered; the attacker's own sign-in link with `callbackURL` edited to `/` | verify **302 to `/`**, so there is no `?signed-in=1` marker. The client keeps A's device state: `syncing: true`, **no merge screen**. The attacker's history is pulled onto the device, and the next recall and completion are PUT to the **attacker's** account. A's earlier history is not sent: deltas hold |
| Probe 2: sign out in a page, then `accountState()` (what `/account` calls when it remounts on a client navigation such as browser Back) | **never resolves** (timed out at 2 s). `forgetSession()` makes a new `ready` that nothing starts, so the page stays on "Loading…" |

### Conditions
| | Verdict | Evidence |
|---|---|---|
| **MC2** | **closed** | `accountMe()` first ask has no `cache` option, `refresh` is `no-store`, on-state answers stay `no-store`. Test 34 passes in my run. The comments in `account-api.ts` `me()` and `AccountSync.tsx` now say "browser, 5 minutes", and that CDN `s-maxage` is unmeasured. That is true |
| **MC3** | **closed** | A6.1 lists the off-state differences as accepted: `/me` 404, the async chunk (now **2,594 B** gzip, up from 1,761 because the merge code moved into it; I accept that, since it loads after first paint), `/account` 200, first-load. Row 5 ("nothing else"), on the device side, is backed by test C2 |
| **PC1** | **closed** | The kit hands the sink `before` (a separate storage read) and `after`. `progressDelta` sends only a first `completedAt`, a first `predictedCorrectly` and recalls with a new `at`. No sink is registered before the merge answer. `Lesson.tsx` overwrites `predictedCorrectly` on a replay, and that is correctly not sent. Test C4 is my script. Probe 1 also showed that old history stays unsent |
| **PC2** | **closed on its test; safe default pending the privacy ruling (W-1710)** | Sign-out restores the `own` snapshot and removes the key. An ended session cleans up on the next load. "Also clear this device" is offered at sign-out. Test C6 is my script; C7 and C8 pass. The A6.4 cost line (a delta that fails before sign-out is lost) is accepted |
| **PC3** | **not closed (one clause)** | Count before the pull, one starter and two-caller race: **closed** (`movesAgainst`, `accountState` starts nothing, test C5). "Remembered **for this account** on this device": **open**. `s3c:account-device:v1` holds no account identity. A change of account is detected only by the `?signed-in=1` marker, and the holder of a link can edit that marker away (`callbackURL` is a query parameter, and the library's `originCheck` accepts any same-origin path: probe 1). That reopens the login-CSRF path A6.4 says it closes, for a victim who is already signed in. **Fix needed:** the device state records which account answered, and `run()` treats a different signed-in account like the marker. Add a test that repeats probe 1. The identity form (opaque id, hash) goes into the D23 row the privacy reviewer reads |
| **PC4** | **closed** | `CAP_RECALLS_SQL` keeps the newest 100 per (account, slug) across requests. Per-account limits: progress 60/10 min, merge 10/h (per instance; F8 stays a go-live item). DELETE skips the catalogue check, PUT keeps it. Tests 28 and 29 pass. A 429 delta is dropped, not retried; I accept that for a staff preview |
| **PC7** | **closed** | `NAMES` adds `account/likes` and `account/saves`. The new importer scan (static, dynamic, `require`) limits `account-client` to `src/components/account/`, with `CLIENT_ALLOWED` empty and planted controls. One known limit: a re-export through a file inside `src/components/account/` would pass. That needs a file in the allowed folder, which the folder's owner reviews |
| **PC8** | **closed** | `mergeIntoLocal` is out of the kit (test C3). The sink stays, and the A6.8 reason holds: `updateProgress` is the one write path. Re-measured above: first-load is lower than at the reviewed merge |
| PC5, PC6 | open (not this author's) | unchanged: principal-engineer-ops and release-manager; platform-engineer W-1149 or the preview record |

**New device key `s3c:account-device:v1` (tier 2, new stored field).** Engineering view: **acceptable**. It is never written with accounts off (C2, and `run()` returns before touching storage when `/me` is 404). It is never sent. Its size is the device's own anonymous map (bounded), and it is removed on every way out of the session. It still needs the privacy reviewer's inventory row (proposed D23 in A6.4) before preview-on, and the PC3 fix will add the account binding to it.

**New: PC9 (preview, small).** After sign-out or deletion, `/account` hangs on "Loading…" if it remounts in the same page load (probe 2): sign out, follow a link to `/`, press Back. `accountState()` waits on a promise that no caller will settle once `forgetSession()` has run. **Fix:** after `forgetSession()`, `accountState()` must still resolve, for example by starting the memoised `startAccountSync()` when nothing has started. Add a test that remounts after sign-out and after deletion. This does not occur with accounts off: `run()` settles `{ me: null }` once and nothing resets it.

### Verdict
**Merge into the default branch with every switch off: approve.** MC2 and MC3 are closed. **MC1** (`npm run verify` including `qa` on the exact merged tree) is the chief of staff's, and **MC4** (readiness approval) is principal-engineer-ops'. Both must be met before the merge, and my approval does not substitute for either. The open items (PC3's account binding, PC9) are reachable only with `ACCOUNTS_ENABLED` on.

**Staff preview with any switch on: not yet.** Still open: **PC3** (account binding, probe 1 as a test), **PC9** (the remount hang), **PC5** and **PC6**, the privacy reviewer's rulings on W-1710 and the D23 row, and the 390×844 walk of `/account` (privacy preview item 2; the client tests are not a browser). PC1, PC2, PC4, PC7 and PC8 need nothing more from engineering.

### Routed (for the chief of staff; I did not edit board.json)
1. backend-engineer: the PC3 account binding plus a probe-1 test, and the PC9 fix plus a remount test. I re-read the diff; no new review record is needed.
2. privacy-reviewer: D23 for `s3c:account-device:v1`, including the identity form PC3 adds, and W-1710. Probe 1 bears on F3's login-CSRF question: an edited `callbackURL` removes the marker.

## Re-read 2026-10-18 (second): PC3 binding, PC9, W-1714 (merge `27317e69b`; fix commit `7c7f488ad`)

reviewer: principal-engineer (Kenji) · read `git show 7c7f488ad -- src tests` first, then EDD-008 addendum A7 and the readiness "Additions, 2026-10-18 (second)".

### What I ran (worktree copy of `27317e69b`; nothing deployed, no server started)
| What | Result |
|---|---|
| `npm run test:accounts`, throwaway PostgreSQL 16 (postgres user, unix socket only, port 55733, `/var/tmp`; torn down) | **61: 57 pass, 0 fail, 4 skipped** (built-server tests 31 to 34), as the author reported |
| Same client tests with only `src/lib/account-client.ts` put back to `7c7f488ad^` (server code new, so `/me` sends a tag the old client ignores) | **C9, C10, C11 fail**; C1 to C8 pass. C9 fails at `syncing` (true, expected false); C11 at the 1 s timeout. File restored |
| Probe 3 (client harness, temporary file, deleted): A signed in and answered; a lesson tab is left open, syncing. B's own link with `callbackURL` edited to `/` is opened in the same profile (verify 302 to `/`); the new tab loads; then the learner keeps playing **in the old tab** | New tab: merge screen, `ask {lessons 2, recalls 2}` (the fix works on a page load). Old tab: one recall, one completion and one Save are sent with B's cookie. **B's account now holds the recall on `plates-move`, the completion and prediction of `lesson-c`, and a save of `lesson-c`** |
| Probe 4 (same harness): A answered; the server's `BETTER_AUTH_SECRET` is changed; next page load | `/me` signed out, device state removed, device back to its own history. A rotation of `BETTER_AUTH_SECRET` signs everyone out before the tag is ever compared |

### Conditions
| | Verdict | Evidence |
|---|---|---|
| **PC3** (account binding, as I specified it) | **closed** | The device state records the tag at all three answers. `run()` ends the previous account if the marker is present **or** the tag differs; a missing tag never matches (C10). C9 is my probe 1 against the real handlers (edited `callbackURL`, verify 302 `/`, page load at `/`), and it asserts the merge screen, the device's own history only, no write before the answer, and neither account's rows changed. It fails on the old client (run above). See PC10 for the case my condition did not cover |
| **PC9** | **closed** | After `forgetSession()`, `accountState()` starts the memoised `startAccountSync()`. Before any reset it still returns `ready` and starts nothing (C5 still asserts that). With accounts off, nothing calls `forgetSession()`, so the off path is unchanged. C11 covers sign-out and deletion, and a second read makes no request. It times out on the old client |
| **W-1714 Ruling 1** (engineering reading; the ruling is principal-engineer-ops') | **meets items 1 to 5** | `LOGGED_LIBRARY_CODES` is frozen and matched with `includes` on a string, so it is an exact match and never a pattern. Nothing reads `message`, `findings`, `cause` or `stack`, and a throwing `code` getter is caught. S16 builds the installed `SchemaMismatchError`, checks the output directly and through `/me`, and passes 10 near-misses (including `@`, a newline, an array, and an object with `toString`). The `auth.ts` logger is unchanged (item 5). Ruling 2's restart behaviour shows in the author's own log line, which is a good sign that the code works |

**The account tag: sound.** It is HMAC-SHA-256 over `s3c:account-device:v1\0<id>`, truncated to 128 bits, in base64url.
- *Reusing `BETTER_AUTH_SECRET`:* acceptable, no condition. The message carries its own label, and it contains `:` and NUL. A cookie signature (HMAC over a token) or an HS256 JWT signing input (base64url only) never contains those. The output is truncated, so it can never pass as a full 32-byte signature. A user can only obtain the tag of their own account id. A separate HKDF-derived key would be tidier, but it would protect against nothing I can name.
- *Rotation fails safe in both forms.* Changing `BETTER_AUTH_SECRET` invalidates every session (probe 4), so each device cleans up as on sign-out. Better Auth 1.7.10 also reads a versioned `BETTER_AUTH_SECRETS` from the process environment (`context/secret-utils.mjs`). Under that form `accountTag` still keys on `BETTER_AUTH_SECRET`, so tags do not change. Neither form can give two accounts the same tag.
- *Correction to the proposed D23 text and A7.1* (privacy-reviewer and author; not a condition): "a secret rotation changes every tag (each device asks once more)" is not what happens. Rotating `BETTER_AUTH_SECRET` signs every device out, and rotating through `BETTER_AUTH_SECRETS` leaves tags unchanged.
- *Minor, no condition:* the `?? ""` fallback in `account-api.ts` is unreachable, because `createAuth` throws `SECR0` first. I would drop it rather than keep an unkeyed path in the code.

### New: PC10 (preview-blocking, small): the binding is checked per page load, but writes are not bound
PC3's fix runs once, in `run()`. A tab that is already syncing keeps its sink, its `knownMe` and any merge screen it is showing. The session cookie belongs to the browser profile, so once another tab signs the profile into B, that open tab sends every new delta, Save and Like to **B** (probe 3). The same holds for a merge screen left open: it says "Send this device's history to {A's email}?", but **Import** would POST to B. This is the same login-CSRF threat as probe 1, with the victim's ongoing play as the data, for as long as the old tab stays open. It is not a regression: the pre-fix code had the same hole. With accounts off it is unreachable. My PC3 wording only asked for the page-load check, so the author did what was asked.
- **Fix (backend-engineer):** bind the writes on the server. Every account write from the client (`PUT /progress`, `merge`, saves, likes) carries the tag it was started with, for example in a header. The server compares it with `accountTag(secret, session.user.id)`, and if they differ it answers 409 and writes nothing. On a 409 the client ends the account on the device as `run()` does (no retry, no pending entry) and settles to the merge screen, or tells the page to reload. A `storage` listener on `s3c:account-device:v1` is a useful addition, but it is not enough alone, because it depends on the other tab running.
- **Test:** probe 3 as a test. The old tab's recall, completion, Save and Like after the switch leave B's rows unchanged, and the old tab's merge-screen Import gets a 409 and writes nothing.

### Not re-measured
Build and first-load JS: the change is about 40 lines in the async account client and the account page, so I did not rebuild. The author reports the build passes off and on, plus tests 31 to 34 against `next start`. The readiness A-17/P5 rule (re-run 31 to 33 on the preview SHA) covers this.

### Verdict
**Merge into the default branch with every switch off: approve** (unchanged). Nothing in `7c7f488ad` runs with `ACCOUNTS_ENABLED` unset: `run()` returns on the 404 before it touches storage, `forgetSession()` is never called, and `/me` with accounts off is the 404 it was. MC1 (verify including `qa` on the exact merged tree, chief of staff) and MC4 (principal-engineer-ops) still bind, and my approval does not replace either.

**Staff preview with any switch on: not yet.** Engineering still owes **PC10** (above). Others still owe PC5 and PC6 (principal-engineer-ops, release-manager, platform-engineer), W-1710 and D23 (privacy-reviewer, with the rotation wording corrected), the 390×844 walk of `/account` (privacy preview item 2), and principal-engineer-ops' readiness reading of this addition. PC1 to PC4 and PC7 to PC9 need nothing more from engineering.

### Routed (for the chief of staff; I did not edit board.json)
1. backend-engineer: PC10, server-bound writes plus the probe-3 test. Drop the `?? ""` secret fallback while you are there. I will re-read the diff; no new review record is needed.
2. privacy-reviewer: D23 with the rotation sentence corrected (above), and W-1710.
3. principal-engineer-ops: W-1714 Ruling 1 met in engineering's reading (S16). Closing it is your call.

Kudos (not filed: `kudos.mjs` writes `events.jsonl`): @backend-engineer. C9 is my probe 1 almost line for line, and it fails on the old client exactly where it should. S16 uses the installed library class rather than a hand-made object, as Ruling 1 asked.

## Re-read 2026-10-18 (third): PC10 write binding (merge `98aa6092f`; fix commit `96e8654fc`)

reviewer: principal-engineer (Kenji) · read `git show 96e8654fc -- src tests` first, then EDD-008 addendum A8 and the readiness "Additions, 2026-10-18 (third)".

### What I ran (worktree copy of `98aa6092f`; nothing deployed, no server started, no build)
| What | Result |
|---|---|
| `npm run test:accounts`, throwaway PostgreSQL 16 (postgres user, unix socket only, port 55811, `/var/tmp`; torn down) | **66: 62 pass, 0 fail, 4 skipped** (built-server tests 31 to 34), as the author reported |
| Server-only mutant: `boundWrite` made to always pass (client new, so it still sends the header) | **30, C12, C13, C14 fail**; everything else passes. The tests depend on the server check, not on the client refusing. File restored |
| S18 scanner probed with 10 extra cases (`scanSource` on the client file name; scratch script, not committed) | caught: a tag returned by an arrow helper; `readJson(DEVICE_KEY)` sent whole. **Missed**: `knownMe` sent whole (the `/me` answer, which holds the tag **and the email**); `current` (the `AccountState`) sent whole; a `/me` answer from a local function sent whole; `const { tag: t } = me` then `t`; `const f = fetch; f(..)`; `XMLHttpRequest`; `new Image().src`; all of `localStorage` by loop. None of these is in the code today (I read every request site: `account-client.ts` 9, `AccountView.tsx` 1 (`start`, body is email, band, policy), `kit/progress.ts` 1 beacon of the event) |

### Conditions
| | Verdict | Evidence |
|---|---|---|
| **PC10** (server-bound writes, probe 3 as a test) | **closed** | Every write handler orders Origin (403) → session (401) → `boundWrite` (409) → body, so a wrong, empty or missing tag is refused before `readJson` (test 30 sends a malformed body with A's tag: 409, not 400). The compare is `timingSafeEqual` behind a length check; the length is the fixed 22, so nothing useful leaks, and a doubled header (`Headers.get` joins with ", ") never matches. The five routes and six methods (progress PUT, merge, save PUT/DELETE, like PUT/DELETE, delete) are all bound; S18 part 4 pins the `boundWrite` call list to them. C12 is probe 3 with recall, completion, Save and Like; C14 covers the open merge screen (Import 409, Decline checks `/me`), and Delete goes through the bound `deleteAccount()`. With accounts off every bound route answers 404 before the check |
| Unbound routes write nothing to an account's learner data | **holds, one wording point** | `me`, `progressGet`, `listMarks`, `exportFile`, `counts` read only (`progress-store.ts`: no write in those functions). `start` writes sign-in rows and runs `purgeExpired`, with no session to bind to. Sign-out from a stale page ends whichever session the browser holds and then removes the device state: the safe direction. Verify is the sign-in itself. *Wording:* A8.1 says reads write nothing. Any `getSession` call, read or write, can refresh the session (at most daily, `updateAge`) and move `last_sign_in_at` of **the cookie's own** account (`auth.ts` hooks). That is session upkeep for the account the browser really holds, not a cross-account write. No condition |
| Client 409 handling | **sound** | No retry: a 409 is not queued in `pending`, and `pushDelta` returns at once when `syncTag` is null. The first 409 wins (`changedFor`); a late 409 for a tag the page has already left does nothing. The device state is ended only if it still names the sent tag, so a newer tab's answer for B is left alone (C13). Save and Like are refused while `knownMe` is null after a 409, so a fresh `/me` cannot rebind them silently. The account page re-reads through `onAccountChanged`, and `SignedIn` is keyed by tag. A lesson page just stops until its next load. The A8.1 residuals (a write already in flight; the instant between `/me` and the "nothing" answer, caught by the first write's 409) are real and acceptable |
| S18 tag scan | **sound for today's code; its stated limits are too narrow (PC11)** | It does what it says for named flows: identifiers, assignments, `set`/`push`, parameters, local function returns, the one exception for `boundHeaders` on the five routes, and the backstop by name. But the tag lives inside two objects the client holds whole (`knownMe`/`mePromise`, and `current`/`AccountState`), and sending either whole carries the tag past the scan and the backstop (`.tag` is never written). See PC11 |
| CSRF | **no adverse interaction; it strengthens the write path** | A cross-site page cannot send `x-s3c-account` without a CORS preflight, and no account route answers one with `Access-Control-Allow-*`. So the header is a second barrier after the Origin check and SameSite=Lax, and a forger would also need the victim's tag. Same-origin `keepalive` fetches with a custom header need no preflight, so the push path is unaffected. Login-CSRF (a GET verify) is not touched by this. PC3 and PC10 together now confine its effect to what the victim does in a page loaded after the switch |

### New: PC11 (before a staff preview, small): make S18's guard match its claim, or state its true limits
S18 is the evidence for privacy condition 1 as A8.2 amends it. Its stated limits (anonymous-function parameters, imports) leave out the realistic regression: someone wires the Like or Save control, or an analytics event, and passes the `/me` answer or the account state whole. **Fix (backend-engineer), either:** (a) add `knownMe`, `mePromise`, `current`, `accountMe`, `accountState` (and the types `Me`, `SignedInMe`, `AccountState`) to what may not reach a send argument, follow a renamed binding's property name (`{ tag: t }`), and add a by-name backstop that the client file and its importers use no `XMLHttpRequest`, `WebSocket`, `EventSource`, `Image` or aliased `fetch`; with a negative case for each of my misses. Or (b) list those misses in A8.2's stated limits, word for word, so the privacy reviewer rules on the true guard. I prefer (a): it is about 20 lines and reuses the scanner.

### Note for whoever wires the Like and Save controls (no condition now)
`setSaved` and `setLiked` check only that `/me` is signed in (and the age band for likes). They do not check that this device has answered the merge screen for this tag. So on any page loaded after a switch of account (or after the 409 re-read), a Save or Like goes to the new account even though its merge screen is unanswered. Today nothing in the UI calls them (PC7 `CLIENT_ALLOWED` is empty). The record that adds the controls should decide whether they wait for the answer for this tag. This belongs with the privacy reviewer's F3 login-CSRF question.

### Verdict
**Merge into the default branch with every switch off: approve** (unchanged). With `ACCOUNTS_ENABLED` unset every bound route answers 404 before the new check, `/me` is the same 404, and the client sends no write (C2). MC1 (verify including `qa` on the exact merged tree, chief of staff) and MC4 (principal-engineer-ops' readiness approval) still bind. My approval replaces neither.

**Staff preview with any switch on: not yet.** Engineering owes **PC11** (above). Others owe: the privacy reviewer's ruling on **A8.2** (the tag is now sent in one header, a change to condition 1, W-1913) and the D23 row update (W-1917), W-1710; PC5 and PC6 (principal-engineer-ops, release-manager, platform-engineer); the 390×844 walk of `/account` (privacy preview item 2); principal-engineer-ops' readiness reading of the third addition, with P5 (tests 31 to 33 on the preview SHA). PC1 to PC4 and PC7 to PC10 need nothing more from engineering.

### Routed (for the chief of staff; I did not edit board.json)
1. backend-engineer: PC11, option (a) preferred. I will re-read the diff; no new review record is needed.
2. privacy-reviewer: A8.2 ruling and D23 (W-1913, W-1917). Read PC11 before relying on S18. The Like/Save note above goes with F3.
3. principal-engineer-ops: readiness "Additions (third)": the merge stays approvable with switches off, and P5 applies.

Kudos (not filed: `kudos.mjs` writes `events.jsonl`): @backend-engineer. Test 30 checks the order (a malformed body with a wrong tag is still 409), and C13 tests the newer-tab case I had not named. Both fail on a server-only mutant, so they test the server rather than the client.
