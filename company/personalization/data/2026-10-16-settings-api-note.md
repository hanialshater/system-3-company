# Settings API (W-1538): design note, B1–B4 / D1–D3 / G1–G4 map, B3 patches

owner: learner-data-engineer (Solenne, Customer Data) · date: 2026-10-16 · run: lde-u2-1016, fix round lde-u2-fix-1016 · brief: company/personalization/batches/2026-10-16-batch-3.md#u2 · ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3, §3.1, §3.2 · schema: company/personalization/data/00N_settings.up.sql (W-1521 draft) · status: **code on branch, not wired, nothing applied.** I wrote this and I do not approve it.

Branch: `perso-u2` (worktree /home/user/s3c-u2). The brief names `perso-settings-api-u2`; the dispatch put this run on `perso-u2`. Same content; rename on merge if wanted.

**Fix round (lde-u2-fix-1016, 2026-10-16).** Two reviews: principal-engineer company/engineering/reviews/2026-10-16-w1538-settings-api.md (approve with conditions C1–C7) and privacy-reviewer company/reviews/_privacy/2026-10-16-w1538-settings-api.md (D2a, B2a). Done here: **C1/B2a** the route moved to `/api/account/settings` (§2, §4.1) and the B2 scan fails if any file remains under `src/app/api/settings/`; **C7/D2a** the PUT is one atomic SQL statement per request (§7). Board W-1558 (C1/C7), W-1538.

Readers: **privacy-reviewer** (B1–B4 read; D1–D3, G1–G4), **backend-engineer** (§4 unverified items, §5 B3 patches, order review), **principal-engineer** (tier 2: location, the shared `package.json` lines, table name).

## 1. Files

| File | What |
|---|---|
| `src/lib/server/personalization/settings.ts` | Pure: the `FeedSettings` shape, catalog membership and dedupe (B1), caps (SS2), write parsing (unknown keys dropped, D3), set/merge rules (G1–G4), the serving read (`servingSettings`, D1/D2), the export block (B3), the catalog builder |
| `src/lib/server/personalization/settings-store.ts` | The only SQL that writes `settings` (B2): three single-statement writes (`SET_UPSERT_SQL`, `SET_UPDATE_SQL`, `MERGE_SQL`, chosen by `writePlan` from the request alone) and one select. Takes a `Query` function (pg `Pool#query` shape) |
| `src/lib/server/personalization/settings-handler.ts` | `handleSettingsGet`, `handleSettingsPut`: flag, Origin, session, bounded body, parse, one `store.put` (no read before the write, §7), fixed responses. Never throws, never logs data (B4) |
| `src/lib/server/personalization/settings-wiring.ts` | Builds the membership catalog from `content/domains.json`, `content/curriculum/<domain>.json` and the lesson registry. `settingsDeps()` returns **null**: session, database and flag are not wired (§4) |
| `src/app/api/account/settings/route.ts` | `GET` and `PUT` only; 404 while `settingsDeps()` is null. `runtime = "nodejs"`, `preferredRegion = "fra1"` (ADR-008 C6) |
| `tests/settings/*.test.mjs` | 31 tests: `npm run test:settings` (added to `verify`, not to `check`) |
| `company/personalization/data/test-settings-write-sql.mjs` | The three write statements on a throwaway local Postgres 16 with fake rows: 52-case match against `applyWrite`, no rewrite of unchanged rows, five two-session races, and a control (§7). Not in any npm script |

## 2. API surface

`GET /api/account/settings` (signed in) → `200 {"settings": {"personalizationOn": true|false|null, "subjects": [...], "lessOf": [...]}}`. Ids that left the catalog are left out of the answer; the row is not rewritten (SS3). No row → `{"personalizationOn": null, "subjects": [], "lessOf": []}` (D1). `cache-control: no-store`.

`PUT /api/account/settings` (signed in, same-origin `Origin` required) with
`{"personalizationOn"?: true|false|null, "subjects"?: string[], "lessOf"?: string[], "mode"?: "set"|"merge"}`
- `set` (default): keys sent replace stored ones; keys not sent keep the value the row holds when the write lands (§7). `null` clears the choice.
- `merge`: the "Keep my history" confirm (§3, G1–G4). One writer for both, so B2 and G2 hold together.
- Unknown keys dropped unread (gate 2.3; an `arm`, `exp`, timestamp or score never reaches the store, D3). Unknown or duplicate ids dropped (B1). Wrong type → `400 {"error":"malformed"}`; over the caps after dropping (`subjects` > domain count, `lessOf` > 50) or a raw array > 200 → `400 {"error":"too_many"}` (refused, not truncated, so a choice is never silently lost). Body > 16 KB → 413.
- Answers `200 {"settings": …}` with the row as stored after the write, read through `cleanStored` (ids that left the catalog are not handed back). A write that leaves "no choice" on an account with no row creates no row; an unchanged row is not rewritten.

Other answers: 404 when not wired or `ACCOUNTS_ENABLED` is off; 401 signed out (anonymous settings stay on the device, D22, N2); 403 bad Origin on PUT; 500 `{"error":"unavailable"}` on any store, session or catalog failure.

Serving read (for learner-model-engineer): `servingSettings(cleanStored(row, catalog))` → `{mode:"off"}` (D2: no filters handed on), `{mode:"no-choice", …}` (D1: F1 default order or the registered arm, which is never in `settings`, D3), `{mode:"on", subjects, lessOf}`. Whether stated filters apply under "no-choice" is Learner Model's and the VP's call; the helper passes them and decides nothing. No cache: every call site reads the row per request.

## 3. Ruling conditions, where each is met and proved

| Condition | Code | Test (tests/settings/) |
|---|---|---|
| **B1** drop non-catalog ids, dedupe, caps | `parseSettingsWrite`, `cleanSubjects`, `cleanLessOf`, `subjectsCap` | `settings-api`: "a well-shaped id that is not in the catalog is dropped" (fake catalog, every kind), "the real catalog drops a well-shaped non-catalog id" (14 domains, 1,204 concept ids, every `meta.json` slug), dedupe, caps 50/51 and domain count |
| **B2** only `PUT /api/account/settings` writes (B2a wording) | the one `store.put` call is inside `handleSettingsPut`; the route exports GET and PUT only | `settings-only-put-writes`: repo-wide SQL-write and import scan of src/, tools/, company/, tests/, db/, scripts/ (planted-break control, 8 plants caught incl. a file at the old mount `src/app/api/settings/`, 1 non-write passed); route exports; one `store.put` call site; GET and the serving read never write |
| **B3** delete and export patches | `settingsExportBlock`; patches in §5 | `settings-api`: "B3 export block". The patches themselves are untested here (their targets are on the accounts branch) |
| **B4** no body logging, route or error handler | fixed log line, SQLSTATE at most; every path returns a Response | `settings-no-body-logging`: sentinel in bodies and in pg-style error `message`/`detail`, 11 paths, console and stdout/stderr captured, response bodies checked; control proves the capture records; static check of the five files |
| **D1** NULL = missing = no choice | `cleanStored(null)`, `NO_CHOICE`, no row created for a no-choice write | "D1" |
| **D2** false wins at once, no cache | `servingSettings` returns `{mode:"off"}` only; store has no cache | "D2": off after on, next GET sees it; a direct store change is seen by the very next request |
| **D2a** an overlapping PUT cannot undo an off | one statement per PUT, values computed by the database on the locked row (§7) | `settings-write-race`: interleaved set/set, merge/set, both orders, no-row case, against the fake store; control replays the old read-modify-write and loses the off. `test-settings-write-sql.mjs`: the same on real local Postgres sessions |
| **D3** no arm in `settings` | `WRITABLE_KEYS` allow-list; SQL names four columns | "D3": arm/exp/updatedAt/needScore/fingerprint/ageBand in a body, store receives three keys |
| **G1** merge only on the learner's confirm | `mode:"merge"` is sent by the client after the confirm screen; the server cannot see that screen | "G1/G4" (GET and bad bodies never merge). The confirm itself is the client's contract (owner of the "Keep my history" screen, backend-engineer) |
| **G2** same write path | merge goes through `parseSettingsWrite` | "G2" |
| **G3** off never turned on; account wins, no union | `applyWrite` merge branch; `MERGE_SQL` decides it in the same statement | "G3" ×2 (six off/on cases) |
| **G4** device takes the account's values only after confirm; `lessOf` never to beacon, log or `exp` | response returns the merged row; nothing logs (B4) | client side: not in this change |

Also kept: no timestamp, no derived value (D20), nothing inferred (SS3: GET never writes, stale ids are not rewritten in the background), no aggregate query of any kind (SS5).

## 4. Unverified: depends on the accounts branch (not fetchable in this clone, 2026-10-16)

backend-engineer to confirm or supply; until then `settingsDeps()` returns null and the route is 404 everywhere.

1. **Mount path: decided, `/api/account/settings`** (principal-engineer ruling 1, C1; privacy-reviewer B2a: the B2 text now reads "only `PUT /api/account/settings`"). ADR-008 scopes the session cookie to `Path=/api/account`, so the route now receives it, and ADR-008 item 8 (every `/api/account/*` route 404 when `ACCOUNTS_ENABLED` is off) applies. Still owed by backend-engineer (W-1559): acknowledge the namespace and confirm no catch-all on the accounts branch shadows it.
2. **Session helper**: the function returning the signed-in `auth_user.id` for a Request (`SettingsDeps.userId`).
3. **Database helper**: `src/lib/server/db.ts` per the env contract; its query must match `Query` (pg `Pool#query`: `(text, values) → {rows}`), and `text[]` must round-trip as JS arrays (pg's default). Each write is a single autocommit statement (§7), so the helper needs no transaction or client checkout. The statements use `INSERT … ON CONFLICT … DO UPDATE … WHERE … RETURNING` and `UPDATE … RETURNING`, which Neon's Postgres supports; a Neon preview-branch round trip is still owed (C4).
4. **Flag**: `src/lib/server/accounts-flag.ts` (`ACCOUNTS_ENABLED === "on"`, per request).
5. **FK target and table name**: `auth_user(id text)` from EDD-008 §6.4, not from `001_accounts`; `settings` vs `learner_settings` (one constant, `SETTINGS_TABLE`).
6. **Migration number**: still `00N` (W-1521 note §0). The API does not depend on it.
7. **File tracing**: that Vercel ships `content/curriculum/*.json` with the function (the wiring reads them with `fs` at first use).

## 5. B3 patches for backend-engineer (apply on the accounts branch; nothing edited there)

**Deletion transaction** (EDD-008 §7, `POST /api/account/delete`): one line before `DELETE FROM auth_user`, so the learner is told and the cascade stays a backstop:
```sql
DELETE FROM settings WHERE user_id = $1;   -- 0 or 1 row; "your feed settings" in the response
```
When this lands, add its file to `DELETE_ONLY` in `tests/settings/settings-only-put-writes.test.mjs` in the same change (the B2 scan otherwise fails it, which is the point).

**Deletion check** (`tools/db-deletion-check.mjs`): add `settings` (key column `user_id`) to the table list; expected count after deletion **0**.

**Export** (`GET /api/account/export`, `s3c-export-v1`): a top-level block from the stored row:
```ts
import { settingsExportBlock } from "@/lib/server/personalization/settings";
// row: the stored settings row via pgSettingsStore(query).get(userId), or null
exportFile.settings = settingsExportBlock(row);   // {"personalizationOn": null|bool, "subjects": [...], "lessOf": [...]}
```
Note: reading the row through `pgSettingsStore` means the export route imports the store; add it to `STORE_IMPORTERS` in the B2 test (read-only use), or run `SELECT_SQL` directly. Whether the added key needs `s3c-export-v2` is backend-engineer's call (I think not, about 60%).

## 6. Confidence

- B1, B4, D1–D3, G2–G3 as code: high (25 tests, controls for the two scanners). That they survive real wiring unchanged: about 75%; the mount-path question (§4.1) changes a path, not the logic.
- B2: the scan is a grep. It cannot see a table name assembled at run time or a write from outside this repo (a console session on Neon). The defence for those is review and the B3 deletion-check.
- D2a fix: high that the statements implement `applyWrite` and keep an off under the five races tested, because they ran on a local Postgres 16 with two real sessions (fake rows; a planted break in `MERGE_SQL` failed the matrix). Not tested: Neon specifically, the real db helper, isolation levels other than the default READ COMMITTED (under SERIALIZABLE some races would instead fail one statement with a serialization error: that PUT answers 500 and writes nothing, so an off is still not undone, but the other choice is not saved unless the client retries).
- Not checked: any Postgres round-trip of `text[]` through a pg client (no `pg` package in this clone; the SQL test drives psql); the client code for D22 and the merge screen (not mine to write).

## 7. Atomic write (D2a, C7), 2026-10-16 fix round

**Defect (privacy-reviewer D2a, principal-engineer finding 2):** the PUT read the row, computed the whole next row in Node, then upserted all columns. A subjects-only PUT that read `personalizationOn:true` before an off landed would write `true` back after it.

**Fix, option (a) for `set` plus a single-statement rule for `merge`:** the handler no longer reads before writing. It hands the validated request (only the keys sent, plus `mode`) to `store.put`, which runs exactly one statement chosen by `writePlan` from the request alone:

| Request | Statement | What the database does on the row it has locked |
|---|---|---|
| `set` that would create a real choice | `SET_UPSERT_SQL`: `INSERT … ON CONFLICT (user_id) DO UPDATE SET col = CASE WHEN <key sent> THEN EXCLUDED.col ELSE s.col END … WHERE <some sent key differs> RETURNING` | inserts the request's values (unsent keys at the D1 defaults) or writes only the sent columns |
| `set` that would create a no-choice row (e.g. `{personalizationOn:null}`, `{subjects:[]}`) | `SET_UPDATE_SQL`: the same per-key `UPDATE … WHERE user_id = $1 AND <some sent key differs> RETURNING` | changes an existing row; creates no row (D1) |
| `merge` | `MERGE_SQL`: `INSERT … SELECT … WHERE <device row is a choice> ON CONFLICT DO UPDATE SET personalization_on = false WHERE EXCLUDED.personalization_on IS FALSE AND s.personalization_on IS DISTINCT FROM false RETURNING` | no row: inserts the device's choices; existing row: lists untouched (account wins, no union), and the only possible change is to `false` (either side false gives false, G3) |

The `WHERE … IS DISTINCT FROM` clauses keep "an unchanged row is not rewritten". When nothing is returned (unchanged, or no row), the store reads the row once for the answer; the write never depends on that read. Postgres guarantees `INSERT … ON CONFLICT DO UPDATE` an atomic insert-or-update outcome and, under READ COMMITTED, evaluates the `SET` and `WHERE` against the newest version of the conflicting row after waiting for any concurrent writer, which is what makes a late subjects-only or merge statement see the off.

The rule all three statements implement is `applyWrite(row, request)` in `settings.ts` (it replaced `applySet`/`applyMerge`). Explicit later choices still win in order: a learner who sends `personalizationOn:true` after an off has turned it on, which is a stated choice, not a race.

**Evidence.** (1) `tests/settings/settings-write-race.test.mjs` (in `test:settings`): against the in-memory store, which models the contract by applying `applyWrite` with no await between reading and writing the row; **no Postgres runs in this suite**. A control replays the old read-modify-write with the same interleaving and loses the off. (2) `company/personalization/data/test-settings-write-sql.mjs`: the exported SQL strings, prepared and executed by psql on a **throwaway local Postgres 16 cluster with fake rows** (not Neon, not a preview branch, no learner data): 52 (row, request) cases equal `applyWrite`, unchanged rows keep their `xmin`, five two-session races (one session holds its write in an open transaction while the other blocks on the row lock) all keep `false`, and the old statement used the old way loses it. 9/9 on 2026-10-16. Run: `node --import ./tests/lifehacks/register.mjs company/personalization/data/test-settings-write-sql.mjs` (needs root or the postgres user, and `/usr/lib/postgresql/*/bin`).
