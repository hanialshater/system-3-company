# Privacy rulings: composer tests (W-1705), HQ lab done-ness (W-1706), `settings` schema (W-1700)

owner: privacy-reviewer (Elif) · date: 2026-10-16 · run: pr-perso-reads-1016 · class: tier-2 privacy reads · board: W-1705, W-1706, W-1700
Follows my ruling `company/reviews/_privacy/2026-10-16-personalization-model-inputs.md` (W-1674), whose N1 to N6, SS1 to SS5 and section 6 are the standard here. I wrote that ruling; the three artifacts are other roles' work (learner-model-engineer, personalization-engineer, learner-data-engineer). I approve none of my own proposals. Not legal advice; **lawyer** marks items for counsel.

Read: the three artifacts named on the board, `privacy-n1-n3.test.mjs` in full, `sim/README.md` privacy section, `src/app/api/hq/personalization/route.ts`, `src/lib/hq-personalization-server.ts`, `00N_settings.up.sql` and `.down.sql`, the schema note, the VP's decision §4, `data-inventory.md`. **Ran:** `node --test .../privacy-n1-n3.test.mjs` (5 of 5 pass); `node .../privacy-breaks.mjs` (13 rows, "every break caught as expected"); `bash .../test-00N-settings.sh` (26 passed, 0 failed). **Not read:** `001_accounts.up.sql` (accounts branch not available), `hq-cli.mjs` and the JSX beyond the lab note's quoted lines (I relied on the lab note's grep and re-checked only the route and server file), any settings API (none exists).

## Summary of rulings

| Item | Ruling |
|---|---|
| W-1705 N1 and N3 tests | **Pass with conditions** (T1 to T3) |
| W-1706 lab privacy DoD and the own-route exception | **Exception accepted, narrowly. Grep: pass with conditions. Lab is not "privacy-done" until W-1707 and W-1708 land** (L1 to L5) |
| W-1700 `settings` schema | **Pass with conditions** at schema level; **not clear to apply** to any database holding a real learner until B1 to B4 are met (SS1 to SS5 rows below) |
| `personalization_on` default | **Option A accepted** with conditions (D1 to D4) |
| Anonymous-to-account merge | **Pass with conditions** (G1 to G4) |
| Inventory rows D21.1 to D21.4, D22 | **Accepted as proposed rows**, written into `data-inventory.md`, status "designed, not built" |

## 1. W-1705: N1 and N3 tests on the composer: pass with conditions

Against my §3, N1 and N3:

- **N1 (computed, not stored).** Met for the composer. The test deep-freezes every input and stubs `fetch`, XHR, WebSocket, EventSource, `sendBeacon`, `localStorage`, `sessionStorage`, `indexedDB`, `caches`, `document.cookie`, Node `fs` writes (including named-import bindings through `syncBuiltinESMExports`), `http/https/net/tls/dgram`, `child_process`, `console.*` and `process.stdout/stderr`. That covers each destination my N1 names: storage, beacon/`exp` (network), merge/export (network), a log, an error report (console and stderr). It also asserts zero storage *reads*, which is stricter than N1. A control proves the stubs record. The stubs install only for the N1 test and are restored.
- **N3 (forbidden-input invariance).** Met. All 11 `FORBIDDEN_INPUTS`, `ageBand` included, are varied at two values at four carrier levels (history item, fingerprint, `fingerprintFrom` opts, `ComposeInput`); the check is stricter than order (reasons, terms, scores, slot traces, need scores) and adds a by-name read watch. It fails if `FORBIDDEN_INPUTS` gains an entry the test does not vary. Control 1 (16 of 80 cards moved) and control 2 (flipping the latest `predictedCorrectly` changes the order) show the comparison is not blind. The break harness catches 12 deliberate breaks; I note with approval that it records the case that matters to me: a uniform `ageBand` shift (B6u) passes an order-only test and is caught only by the composition check. That is why I accept this test and would have refused an order-only one.
- **Harness safety.** `privacy-breaks.mjs` writes only to a temp copy; the break text containing `fetch` and `localStorage` is test fixture, not a read of learner data. The sim README states the grep hits.

Conditions:
- **T1. Wire it in.** The tests run only if someone remembers (`package.json` and `tools/company.mjs check` do not call them; `self-check.mjs` is likewise manual). The README says "run after any change", which is a habit, not a gate. Before the model is proposed for phase B: add them to `npm run check` or CI (owner: learner-model-engineer with evaluation-steward's AMD-FL-B test list, my ruling §8 item 6). Until then the status is "passes when run", not "enforced".
- **T2. Serving code needs its own N1/N3.** This test covers the composer and the model functions it calls (README "Limits" says so). When a serving layer exists (browser compose for anonymous learners, per-request compose for signed-in ones), it must run the same N1 stubs and the N3 variation where it runs, including the `settings` read: a read of the row is allowed, a write from the compose path is not. N2 (no history serialised to a request) is not tested here and gets its own test at that layer. This ruling does not clear a serving build.
- **T3. Renamed keys.** A forbidden value carried under a different key (for example `age` for `ageBand`) is caught only if it changes the composition; the README admits this. Accept as a known limit; the phase B review reads the serving diff for new input names (N6).

## 2. W-1706: HQ lab privacy definition of done and grep

**D1 to D6 as written are the right definition of done** and match my §6. I checked what I could without a browser: the route (`route.ts`) takes only `Request`, reads only the URL's search params through `parseSimRequest`, reads no cookies or headers, returns 404 unless `hqEnabled()`; `runSim` refuses to spawn when `NODE_ENV === "production"`, even with `HQ_PUBLIC=1`; the CLI's data inputs are the personas, the catalog files and `sim/out/traces`.

**Ruling on the H1/H2 exception: accepted**, in this form: a hit is allowed only if it is a `fetch` of the **literal** path `/api/hq/personalization` (query string built from the lab's own controls), and the route's data sources stay exactly those in D1. A page calling its own simulator route is not a real-data path; the browser sends nothing the viewer holds. H3 (a comment) is not a hit that matters. This is not a general allowance for `/api/` or `fetch`: any other URL, any variable URL, `localStorage`, `s3c:`, an accounts/event-intake import is still a finding.

Conditions:
- **L1. The W-1708 test pins the literal.** It must fail on any `fetch` whose first argument is not the literal route, on any other `/api/`, on a template that interpolates anything before the `?`, and on every other pattern in the grep (localStorage, `s3c:`, sessionStorage, indexedDB, `document.cookie`, `cookies()`, `headers()`, imports matching `account|auth|session|events-intake|progress`). The module list is updated when the accounts module lands (note §5).
- **L2. Route stays closed to learner data.** If `route.ts` or `hq-cli.mjs` ever reads a cookie, header, storage, or a path outside the D1 list, the exception lapses and I read it again. `op` stays a closed set; `op=learners`-style additions are a new read.
- **L3. Saved traces.** `sim/out/traces/` holds simulator output only; real-data traces are never written there. Accepted as a note, not a code check; if W-1676/W-1685 calibration ever uses real data it is a new read (A2).
- **L4. Child environment.** Accept W-1709's plan to pass a minimal env to the CLI instead of `{ ...process.env }`. Not a data path today (the CLI reads none); do it before accounts secrets (`DATABASE_URL` and the like) exist in the dev environment, because then the spawned process would inherit them.
- **L5. Labelling blocks "done".** D2 and D3 are only partly met (fingerprint caption and curves legend do not say "simulated"; the persona heading reads as a segment, "Struggling repeater"). W-1707 closes them. **The lab is not privacy-done until W-1707 and W-1708 land and I have read the rendered page** (the lab note judged from JSX). I will not call it done on the note alone. A screenshot of one panel must carry the word.

This is a ruling on the grep and the exception. It is not the "I read the grep before the lab is called done" sign-off in full: that needs L5.

## 3. W-1700: `settings` schema

Not written against the `accounts` branch; the FK target (`auth_user(id text)`) comes from EDD-008 §6.4, not from `001_accounts`. Everything below is at the schema level, and applying it anywhere real needs B1 to B4.

| Condition | Schema-level reading |
|---|---|
| **SS1** closed vocabulary | **Met in shape, not in membership.** CHECKs force lowercase id characters, no spaces, typed `less_of`, a 1-D array without NULLs; a sentence cannot be stored. A single hyphenated word still fits the pattern (`i-am-ashamed-of-x`), so the database proves shape only. The note says so honestly. Membership against `content/domains` and the catalog is the write path's job. **B1:** the settings API must drop unknown ids and dedupe, with a test that a well-shaped non-catalog id is dropped; I read that API before the table is applied to production. Typed `less_of` (the 20 of 974 slug/concept overlap) is a good call. |
| **SS2** bounded | **Met.** 32 DB backstop for `subjects` (app caps at the domain count, 14), 50 for `less_of`. Slug length 200 follows `progress.slug`. |
| **SS3** stated, never inferred | **Met in schema:** no timestamp, no default-true, nothing a trigger or job could fill. **B2:** the route test that only `PUT /api/settings` can write the table (owed with the API) is a condition of the API read. No "suggested subjects" path may call it. |
| **SS4** deleted, exported, anonymous local | **Met in design:** `ON DELETE CASCADE` as backstop, an explicit `DELETE` in the EDD-008 §7 transaction, `settings` in `db-deletion-check`, an export block in the shape of the local key. **B3:** these are patches on the accounts branch that nobody has made; the table does not ship without them and the deletion check expecting 0 rows. Neon history rolls it off in the plan window (D14b), tombstone replay removes it. |
| **SS5** not visible to anyone but the learner | **Met in schema:** primary-key index only, no timestamps, no join column to `age_band`. **B4:** the settings route and any error handler must not log request bodies (inventory gap 11: D6 logs whole bodies; do not let that pattern reach this route); no aggregate over `settings` ever keyed by subject or `less_of`; a "share with personalization off" count is the only aggregate I would consider, k >= 20, and its query text comes to me first. |

Other schema points:
- Nullable `personalization_on`, `subjects`/`less_of` default `'{}'`: fine. No `created_at/updated_at`: agreed, a change time is activity data.
- Table name: principal-engineer's call; I have no objection to `learner_settings`.
- Migration number, FK type, runner transactions, preview-branch down test: backend-engineer's order review (note §0). I rely on none of them. The test result (26 of 26, I re-ran it) is on a scratch cluster with a stub `auth_user`.
- A re-read is owed on the accounts tip (gate E7): if `auth_user.id` or migration numbering differs, the file changes and my pass lapses for the changed lines.

### 3.1 `personalization_on` default: option A accepted

The stored value is only what the learner chose; B and C would put a value in the export the learner never set. Conditions:
- **D1.** NULL, and a missing row, mean "no choice". With no registered experiment, NULL serves the F1 default order (VP §4). Under a registered experiment, NULL serves the arm.
- **D2.** An explicit `false` wins over arm, `subjects` and `less_of`, at once, with no cache (AMD-008 P4).
- **D3.** The arm is never stored in `settings`, and the registration (analytics-steward, N5) states how it is assigned and held for signed-in and anonymous learners (answers the note's §5 question: yes). A persistent arm marker needs the beacon ruling's C1 to C9 or a new read.
- **D4. Before any registration puts NULL learners aged 13 to 15 into a personalized arm: counsel.** Personalized-by-default for minors in an experiment may collide with "high privacy by default" duties (UK AADC and similar). **lawyer.** I do not decide it. Option A is neutral to it (the schema allows either outcome), and until phase B is registered NULL is the default order, so nothing is exposed now. The age band stays out of arm assignment (T1 of the model ruling); if counsel says minors may not be defaulted in, the answer must come from consent or from the experiment's population rule, not from branching the model on age. Raise at the registration, not now.

### 3.2 Anonymous-to-account merge (note §7 item 3): pass with conditions

Proposal: choices listed on the "Keep my history" screen; written on confirm if the account has no row; if it has a row, the account wins and the device takes it; "Don't import" leaves both.
- **G1.** Confirmation is the learner's act, so the write is a stated choice (SS3 holds). Nothing is imported silently.
- **G2.** Imported choices go through the same write path as `PUT /api/settings` (catalog membership, caps, dedupe); unknown keys dropped (gate 2.3).
- **G3. An explicit off is never turned on by a merge.** If either side holds `personalizationOn: false`, the merged result is `false`, whichever side "wins" for the lists. (A narrow exception to "account wins", because off is the protective setting and the learner would not see the flip.) Row-level conflicts on `subjects`/`less_of`: account wins, no union, so a teen's "less of this" on a shared device does not leak into a populated account.
- **G4.** The merge screen shows `less_of` entries only to the person at that device, and the entries never go to the beacon, a log, or the `exp` event (SS5). "The device takes it" overwrites local D22 with the account's values only after the learner confirms.

### 3.3 Data-inventory rows: accepted

D21.1 to D21.4 (3.6a, the accounts database) and D22 (`s3c:settings:v1`, on the device) are written into `company/engineering/data-inventory.md` with status "designed, not built". The columns match `00N_settings.up.sql` as read here; the backend-engineer still confirms them against the real migration (the inventory's own rule). Owner of record: learner-data-engineer. D22: the key name is provisional; the client code's owner must be named before it ships, or the row is a finding. Legal basis stays "unknown (counsel, F-25)". The inventory sentence "nothing is stored for it today" stays true.

## 4. What I did not check, and confidence

- Rendered HQ lab page (L5); serving code and settings API (none exist); `001_accounts` (not available).
- Confidence the composer tests are what they claim: high (ran them, read all of the test, 13 break rows). That the first serving build passes N1 and N3 without a finding: about 65%, since serving code adds the settings read and the browser layer. That the schema, as drafted, survives the backend-engineer's order review without a privacy-relevant change: about 80%.
- **lawyer:** minors in a personalized default arm (D4); whether a `less_of` choice can be special-category data by implication (carried from my first ruling); processor and basis rows unchanged.

## 5. Next, by owner

1. learner-model-engineer / evaluation-steward: T1 (wire the tests into check or CI), T2 note on the serving layer.
2. personalization-engineer (with hq-engineer): W-1707, W-1708 with L1; W-1709 with L4. Then ask me to read the rendered page (L5).
3. learner-data-engineer: B1 to B4 into the settings API brief; deletion/export patches handed to backend-engineer.
4. backend-engineer: migration number, FK, runner, preview-branch down test, deletion and export patches; confirm D21 columns.
5. analytics-steward: D3 in the phase B registration; D4 to counsel via the founder.
6. vp-personalization: informed that option A is accepted with D1 to D4.
7. Me: read the settings API when it exists (B1 to B4); read the rendered lab; re-read on the accounts tip.
