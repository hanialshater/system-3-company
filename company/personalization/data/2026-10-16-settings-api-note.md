# Settings API (W-1538): design note, B1–B4 / D1–D3 / G1–G4 map, B3 patches

owner: learner-data-engineer (Solenne, Customer Data) · date: 2026-10-16 · run: lde-u2-1016 · brief: company/personalization/batches/2026-10-16-batch-3.md#u2 · ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3, §3.1, §3.2 · schema: company/personalization/data/00N_settings.up.sql (W-1521 draft) · status: **code on branch, not wired, nothing applied.** I wrote this and I do not approve it.

Branch: `perso-u2` (worktree /home/user/s3c-u2). The brief names `perso-settings-api-u2`; the dispatch put this run on `perso-u2`. Same content; rename on merge if wanted.

Readers: **privacy-reviewer** (B1–B4 read; D1–D3, G1–G4), **backend-engineer** (§4 unverified items, §5 B3 patches, order review), **principal-engineer** (tier 2: location, the shared `package.json` lines, table name).

## 1. Files

| File | What |
|---|---|
| `src/lib/server/personalization/settings.ts` | Pure: the `FeedSettings` shape, catalog membership and dedupe (B1), caps (SS2), write parsing (unknown keys dropped, D3), set/merge rules (G1–G4), the serving read (`servingSettings`, D1/D2), the export block (B3), the catalog builder |
| `src/lib/server/personalization/settings-store.ts` | The only SQL that writes `settings` (B2): one parameterised upsert of the four columns, one select. Takes a `Query` function (pg `Pool#query` shape) |
| `src/lib/server/personalization/settings-handler.ts` | `handleSettingsGet`, `handleSettingsPut`: flag, Origin, session, bounded body, parse, read-modify-write, fixed responses. Never throws, never logs data (B4) |
| `src/lib/server/personalization/settings-wiring.ts` | Builds the membership catalog from `content/domains.json`, `content/curriculum/<domain>.json` and the lesson registry. `settingsDeps()` returns **null**: session, database and flag are not wired (§4) |
| `src/app/api/settings/route.ts` | `GET` and `PUT` only; 404 while `settingsDeps()` is null. `runtime = "nodejs"`, `preferredRegion = "fra1"` (ADR-008 C6) |
| `tests/settings/*.test.mjs` | 25 tests: `npm run test:settings` (added to `verify`, not to `check`) |

## 2. API surface

`GET /api/settings` (signed in) → `200 {"settings": {"personalizationOn": true|false|null, "subjects": [...], "lessOf": [...]}}`. Ids that left the catalog are left out of the answer; the row is not rewritten (SS3). No row → `{"personalizationOn": null, "subjects": [], "lessOf": []}` (D1). `cache-control: no-store`.

`PUT /api/settings` (signed in, same-origin `Origin` required) with
`{"personalizationOn"?: true|false|null, "subjects"?: string[], "lessOf"?: string[], "mode"?: "set"|"merge"}`
- `set` (default): keys sent replace stored ones; keys not sent keep their value. `null` clears the choice.
- `merge`: the "Keep my history" confirm (§3, G1–G4). One writer for both, so B2 and G2 hold together.
- Unknown keys dropped unread (gate 2.3; an `arm`, `exp`, timestamp or score never reaches the store, D3). Unknown or duplicate ids dropped (B1). Wrong type → `400 {"error":"malformed"}`; over the caps after dropping (`subjects` > domain count, `lessOf` > 50) or a raw array > 200 → `400 {"error":"too_many"}` (refused, not truncated, so a choice is never silently lost). Body > 16 KB → 413.
- Answers `200 {"settings": …}` with the stored result. A write that leaves "no choice" on an account with no row creates no row; an unchanged row is not rewritten.

Other answers: 404 when not wired or `ACCOUNTS_ENABLED` is off; 401 signed out (anonymous settings stay on the device, D22, N2); 403 bad Origin on PUT; 500 `{"error":"unavailable"}` on any store, session or catalog failure.

Serving read (for learner-model-engineer): `servingSettings(cleanStored(row, catalog))` → `{mode:"off"}` (D2: no filters handed on), `{mode:"no-choice", …}` (D1: F1 default order or the registered arm, which is never in `settings`, D3), `{mode:"on", subjects, lessOf}`. Whether stated filters apply under "no-choice" is Learner Model's and the VP's call; the helper passes them and decides nothing. No cache: every call site reads the row per request.

## 3. Ruling conditions, where each is met and proved

| Condition | Code | Test (tests/settings/) |
|---|---|---|
| **B1** drop non-catalog ids, dedupe, caps | `parseSettingsWrite`, `cleanSubjects`, `cleanLessOf`, `subjectsCap` | `settings-api`: "a well-shaped id that is not in the catalog is dropped" (fake catalog, every kind), "the real catalog drops a well-shaped non-catalog id" (14 domains, 1,204 concept ids, every `meta.json` slug), dedupe, caps 50/51 and domain count |
| **B2** only `PUT /api/settings` writes | the one `store.put` call is inside `handleSettingsPut`; the route exports GET and PUT only | `settings-only-put-writes`: repo-wide SQL-write and import scan of src/, tools/, company/, tests/, db/, scripts/ (planted-break control, 7 plants caught, 1 non-write passed); route exports; one `store.put` call site; GET and the serving read never write |
| **B3** delete and export patches | `settingsExportBlock`; patches in §5 | `settings-api`: "B3 export block". The patches themselves are untested here (their targets are on the accounts branch) |
| **B4** no body logging, route or error handler | fixed log line, SQLSTATE at most; every path returns a Response | `settings-no-body-logging`: sentinel in bodies and in pg-style error `message`/`detail`, 11 paths, console and stdout/stderr captured, response bodies checked; control proves the capture records; static check of the five files |
| **D1** NULL = missing = no choice | `cleanStored(null)`, `NO_CHOICE`, no row created for a no-choice write | "D1" |
| **D2** false wins at once, no cache | `servingSettings` returns `{mode:"off"}` only; store has no cache | "D2": off after on, next GET sees it; a direct store change is seen by the very next request |
| **D3** no arm in `settings` | `WRITABLE_KEYS` allow-list; SQL names four columns | "D3": arm/exp/updatedAt/needScore/fingerprint/ageBand in a body, store receives three keys |
| **G1** merge only on the learner's confirm | `mode:"merge"` is sent by the client after the confirm screen; the server cannot see that screen | "G1/G4" (GET and bad bodies never merge). The confirm itself is the client's contract (owner of the "Keep my history" screen, backend-engineer) |
| **G2** same write path | merge goes through `parseSettingsWrite` | "G2" |
| **G3** off never turned on; account wins, no union | `applyMerge` | "G3" ×2 (six off/on cases) |
| **G4** device takes the account's values only after confirm; `lessOf` never to beacon, log or `exp` | response returns the merged row; nothing logs (B4) | client side: not in this change |

Also kept: no timestamp, no derived value (D20), nothing inferred (SS3: GET never writes, stale ids are not rewritten in the background), no aggregate query of any kind (SS5).

## 4. Unverified: depends on the accounts branch (not fetchable in this clone, 2026-10-16)

backend-engineer to confirm or supply; until then `settingsDeps()` returns null and the route is 404 everywhere.

1. **Mount path vs the session cookie (the big one).** ADR-008 and EDD-008 §Proposal 4 scope the session cookie to `Path=/api/account`. A route at `/api/settings` (the path the ruling, the brief and my role doc name) **never receives the session**, so it can never authenticate. Options: (a) mount at `/api/account/settings`, which keeps P6.2 by construction and needs only a path change in the route file and the B2 test's `ROUTE` constant; (b) widen the cookie path, which breaks the property ADR-008 chose it for and needs a new privacy read. I recommend (a). The location is principal-engineer's call (tier 2), the `/api/account/*` namespace is backend-engineer's, and privacy-reviewer's B2 wording ("only `PUT /api/settings`") would then read "only `PUT /api/account/settings`".
2. **Session helper**: the function returning the signed-in `auth_user.id` for a Request (`SettingsDeps.userId`).
3. **Database helper**: `src/lib/server/db.ts` per the env contract; its query must match `Query` (pg `Pool#query`: `(text, values) → {rows}`), and `text[]` must round-trip as JS arrays (pg's default).
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
- Not checked: any real Postgres round-trip of `text[]` through a pg client (no client in this clone); the client code for D22 and the merge screen (not mine to write).
