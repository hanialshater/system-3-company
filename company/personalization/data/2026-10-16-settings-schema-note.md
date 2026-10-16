# `settings` schema diff and design note (W-1521)

owner: learner-data-engineer (Solenne, Customer Data team) · date: 2026-10-16 · run: lde-b4-1016 · brief: company/personalization/batches/2026-10-16-batch-1.md item B4 · status: **draft for review, nothing built, nothing applied.** I wrote this diff and I do not approve it.

Readers, in this order: **privacy-reviewer** (the read the ruling asks for: company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §2.2 and §8 item 7), **principal-engineer** (tier-2 schema review), **backend-engineer** (migration number and order, runner compatibility, the delete/export patch in §6). Nothing in this note may be built against real data, or applied to any database holding a real learner, before privacy-reviewer's written pass. Production apply is the founder's deploy approval through release-manager (EDD-008 rollout), never this role.

Files:
- `company/personalization/data/00N_settings.up.sql`, `00N_settings.down.sql`: the draft migration.
- `company/personalization/data/test-00N-settings.sh`: up/down test on a throwaway local Postgres 16 cluster, fake data, stub `auth_user`. Run: `bash company/personalization/data/test-00N-settings.sh`. Result on 2026-10-16: 26 passed, 0 failed.

## 0. Not written against the `accounts` branch

The brief asks for a branch from the `accounts` tip. That branch is not in this clone and `git fetch origin accounts` fails (no such remote ref). Following the brief's fallback, this is drafted on branch `perso-settings-w1521` cut from main, as files under `company/personalization/data/`, not in `db/migrations/`. Consequences, all for **backend-engineer's order review** to confirm before the file moves:

1. **The number.** `00N` is a placeholder. On the accounts branch at `2f5c500` the head is `001_accounts` (data-inventory §3 header); if M1 (a `CHECK` on `auth_verification`, inventory §8 item 8) or any other change landed as `002`, this becomes the next free number. If two migrations race, the one merged second renumbers (proposal §3a rule 1).
2. **The FK target.** I read `auth_user(id text PRIMARY KEY)` from EDD-008 §6.4, not from `001_accounts.up.sql`. Confirm the column name and type at the current accounts tip. If `auth_user.id` is ever changed, backend-engineer consults this team first (§3a rule 2).
3. **The runner.** Unknown to me whether `tools/db-migrate.mjs` wraps each file in a transaction, how it pairs `.up`/`.down`, and whether it expects `IF EXISTS` guards. The files carry no `BEGIN`/`COMMIT`. Confirm.
4. **The down test** ran on a local scratch cluster, not with the project runner and not on the Neon preview branch. EDD-008 rollback asks for the preview branch (schema-only, fake data); that run is still owed once the file sits in `db/migrations/`.
5. **Table name.** `settings` is generic in a shared database. I kept the name EDD-008 §6.1 and the gate use. principal-engineer may prefer `learner_settings` or `perso_settings`; renaming costs nothing now.

## 1. The table

```sql
CREATE TABLE settings (
  user_id            text PRIMARY KEY REFERENCES auth_user(id) ON DELETE CASCADE,
  personalization_on boolean,                       -- NULL = no choice made (§5 question)
  subjects           text[] NOT NULL DEFAULT '{}',  -- domain ids; checks below
  less_of            text[] NOT NULL DEFAULT '{}'   -- 'domain:<id>' | 'concept:<id>' | 'lesson:<slug>'
);
```
Constraints, all in the up file: both arrays one-dimensional, no NULL element; `subjects` at most 32 entries, each `[a-z0-9][a-z0-9-]{0,63}`; `less_of` at most 50 entries, each `(domain|concept|lesson):[a-z0-9][a-z0-9-]{0,199}`. No secondary index. No timestamps.

**Four columns, each a stated choice. No `created_at` or `updated_at`:** nothing needs to know when a learner changed a preference, and a change time is activity data. If a merge rule later needs one (§7 Q3), it comes back as a diff.

**Why `less_of` is typed.** The ruling (SS1) allows a domain id, a concept id or a lesson slug. These namespaces overlap: on 2026-10-16, 20 of the 974 lesson slugs are also curriculum concept ids (checked by reading `content/curriculum/*.json` ids and `src/demos/*/*/meta.json` folders). An untyped `"overfitting"` would be ambiguous, so each entry names its kind.

**What the database can and cannot enforce.** The `CHECK`s prove shape: lowercase id characters, no spaces, no punctuation, bounded counts. They make a sentence impossible to store, but a single hyphenated word would still fit the shape. **Membership in the catalog is enforced by the write path** (SS2: unknown ids dropped, duplicates removed, `subjects` capped at the live domain count, which is 14 today). The 32 cap is a backstop that will not need a migration when a domain is added. A database-side catalog check would mean a catalog table this team does not own, so I did not propose one.

**Stale ids.** A lesson can be unpublished after a learner said "less of" it. Proposal: the read path ignores ids not in the catalog, and the next write drops them. Nothing is rewritten in the background, so the system never writes the row except on a learner action (SS3).

## 2. SS1 to SS5, clause by clause

| Condition (ruling §2.2) | How this diff meets it | Where it is proved, or what is still owed |
|---|---|---|
| **SS1** closed vocabulary, no free text | Arrays of id-shaped strings only; `less_of` typed by kind; no `text` column holding prose; no "other" or label field | DB: test lines "free text in subjects", "free text after a kind", "untyped less_of entry", "unknown less_of kind". Catalog membership: the write path's test (owed with the API, §6) |
| **SS2** bounded; dropped-unknown validation on write | `subjects` ≤ 32 in DB, ≤ domain count in app; `less_of` ≤ 50 (the ruling's proposed cap); write path drops unknown ids and keys, as the merge does (gate 2.3) | DB: cap tests at 32/33 and 50/51. App: owed |
| **SS3** stated means stated, never inferred | A row is written only by a learner's request to the settings route; no job, trigger, default-filler or composer code writes it; `personalization_on` stays NULL until the learner chooses; no suggestion pre-fills `subjects` from `domainConcentration` | A route test that the composer and every server path other than `PUT /api/settings` cannot write the table (owed with the API). I may not write a choice inferred from behaviour (my card) |
| **SS4** stored with the account, deleted and exported with it; anonymous stays local; changes take effect at once; off overrides | FK `ON DELETE CASCADE` to `auth_user.id`, plus an explicit line in the deletion transaction (§6). Export block (§6). Anonymous learners: never sent, local only (§4, D22). The composer reads the row per request (no cache), so a change applies on the next request. `personalization_on = false` returns the F1 default order whatever `subjects`/`less_of` hold | DB: cascade test. Export/delete: patch for backend-engineer (§6). Off-overrides: composer test (learner-model-engineer, owed) |
| **SS5** never shown to or inferable by anyone but the learner | No index other than the primary key, so the table is built for one-row lookups by `user_id`, not cross-learner queries. No column goes to the beacon, `exp`, the event log, an error report or any aggregate. I propose **no** aggregate over `settings` at all; if one is ever wanted (for example "share of learners with personalization off"), its query text comes to privacy-reviewer first, k ≥ 20, never keyed by subject or `less_of` entry | DB: index-count test. The "never in an aggregate" rule is a standing rule for this team, not a test |

Also from the ruling: **no join to `age_band`** (T1, T4). The settings route and the composer read `settings` by `user_id` only; teen accounts get the same table and the same rules (T6: the teen's choices are the teen's own).

## 3. D20: no column

**D20 values get no column.** The fingerprint, need scores, composer terms, `explainNeeds` output, ability or mastery state, and any count or rate of correct predictions (ruling §4, P4, N1) are not in this table and not in any table this team proposes. They stay computed on demand from `progress`, `recall` and this row, and are discarded. A request to store one is a new privacy read and, for ability state, an AMD-008 P1 amendment, not a migration (proposal §3a rule 4).

## 4. Proposed data-inventory rows

privacy-reviewer owns `company/engineering/data-inventory.md`; these are proposals for her to accept, change or refuse. I confirm the columns match `00N_settings.up.sql` as drafted here; I cannot approve my own rows. Numbering assumes the next free numbers after D20.

**Section 3 (the accounts database), new subsection "3.6a `settings` (4 columns)":**

| # | Column | In gate 2.2 | Purpose | Retention | Deletion path | Notes |
|---|---|---|---|---|---|---|
| D21.1 | `settings.user_id` | yes | owner; one row per account | with the account | account deletion (explicit `DELETE` in the transaction; FK cascade is the backstop) | row exists only after the learner's first explicit choice |
| D21.2 | `settings.personalization_on` (boolean, nullable) | yes | the AMD-008 P4 off switch, as the learner set it | with the account | as D21.1; the learner can also change it at any time | NULL = no choice made (§5 question) |
| D21.3 | `settings.subjects` (domain ids, ≤ 32 in DB, ≤ domain count in app) | yes | the learner's stated subjects, a filter on the feed | with the account | as D21.1; clearing the list empties it at once | stated only, never inferred (SS3) |
| D21.4 | `settings.less_of` (typed ids, ≤ 50) | yes | the learner's "less of this", a filter on the feed | with the account | as D21.1; clearing empties it at once | can reveal what a teen avoids (ruling SS5): never in an aggregate, never shown to anyone else |

Processor: Neon (storage), Vercel (functions), as the rest of section 3. Legal basis: unknown (counsel, F-25); working description "the learner's own stated preference for the feed they asked for". Owner: learner-data-engineer (EDD-008 §6.1's `settings` row still says personalization-lead; backend-engineer edits her own EDD per proposal §3a).

**Section 1 (on the device), new row, proposed, for the anonymous case (SS4):**

| # | Datum | Purpose | Stored where | Processed by | Retention | Deletion path | Status |
|---|---|---|---|---|---|---|---|
| D22 | `s3c:settings:v1` (localStorage): `{personalizationOn, subjects, lessOf}` in the shape of the export block (§6) | the anonymous learner's own P4 switch and stated filters | learner's browser | nobody else; never sent while anonymous (N2) | until the learner clears it or site data | the settings control itself, clear site data | **not designed in code.** The key name and who writes the client code are not mine to fix (client code is outside this card); listed so the key does not appear without a row |

Section 3.6's sentence "`settings` ... is not in migration 001 ... Nothing is stored for it today" stays true until a migration with this table is applied.

## 5. The `personalization_on` default: a question, not my call

The column is nullable in this draft because the brief and the VP's position say so; that is a drafting choice to make the question answerable, not an answer. The decision is **privacy-reviewer's with vp-personalization** (proposal §7, Mateo's row), against AMD-008 P4 and F1.

**The VP's position (proposal §7, vp-personalization row, item 3), verbatim in substance:** the column stores only an explicit learner choice and is nullable. `null` means no choice was made, and the served order then follows the registered experiment's arm (holdout = the F1 default order). It is never written from behaviour (as SS3), and an explicit off always wins (P4).

The options as I see them, for the reader (not a recommendation):

| Option | Schema | What a learner with no choice gets | Data note |
|---|---|---|---|
| A (VP, drafted) | `boolean`, nullable | the experiment arm; holdout = F1 | the column records only what the learner did. No row at all is the same as NULL |
| B | `NOT NULL DEFAULT true` | personalized | the stored `true` is not a choice the learner made; it would look like one in the export |
| C | `NOT NULL DEFAULT false` | F1 default order until they opt in | same as B, inverted; changes the phase B experiment's population |

Question for privacy-reviewer: does option A's "NULL follows the arm" need the experiment registration (N5) to state how the arm is held for a signed-in learner, since the arm, not the row, then decides the order? That is analytics-steward's registration, not this table.

## 6. Retention, deletion, export

**Retention line:** `settings` is kept while the account lives; deleted by the learner's account deletion (EDD-008 §7) or by the 24-month inactivity purge, which reaches it through the `ON DELETE CASCADE` from `auth_user` (that purge is off in release 1 and is backend-engineer's). Neon point-in-time history rolls it off inside the plan window (≤ 35 days); after a restore, the tombstone replay `DELETE FROM auth_user WHERE id IN (SELECT user_id FROM deleted_account)` removes it by cascade. No separate purge job, no other copy.

**Deletion patch (for backend-engineer, who owns the transaction and `tools/db-deletion-check.mjs`):** in EDD-008 §7, add one line before `DELETE FROM auth_user`, so the count can be reported to the learner and the cascade stays a backstop:
```sql
DELETE FROM settings WHERE user_id = $1;   -- 0 or 1 row; "your feed settings" in the response
```
and add `settings` to the deletion-check script's table list (expected 0 after deletion). I have not edited either; both live on the accounts branch.

**Export patch (for backend-engineer, who owns `GET /api/account/export`):** add a top-level block to `s3c-export-v1`, in the same shape as the proposed local key D22 so the file imports into a fresh browser unchanged:
```json
"settings": { "personalizationOn": null, "subjects": ["math", "cs"], "lessOf": ["domain:history", "lesson:<slug>"] }
```
With no row, the block is `{ "personalizationOn": null, "subjects": [], "lessOf": [] }`. Whether adding a block needs a `format` bump (`s3c-export-v2`) is backend-engineer's call; I think an added key is backward-compatible, at about 60%.

## 7. Open questions

1. **Default** (§5): privacy-reviewer with vp-personalization.
2. **Number, FK, runner** (§0): backend-engineer's order review. Also the preview-branch down test once the file is in `db/migrations/`.
3. **Merge on "Keep my history"** (EDD-008 §8): when an anonymous learner signs up with a local D22, do the choices move to the account? My proposal, for backend-engineer and privacy-reviewer: the merge screen lists them alongside lessons and recalls; if the account has no row, the local choices are written on confirm; if it has one, the account row wins and the device takes it (no timestamp column needed). "Don't import" leaves both as they are.
4. **Table name** (§0 item 5): principal-engineer.
5. **The settings API** (`src/app/api/settings/**`, `src/lib/server/personalization/**`): not written in this item. It carries the catalog-membership check, dedupe, the domain-count cap and the SS3 route test. It is the next item for this role, after privacy-reviewer's read of this note.
6. **lawyer** (ruling §7, not mine): whether a "less of this" choice can be special-category data by implication. This diff stores it minimally and never aggregates it; it does not answer the question.

## 8. What I checked and what I did not

Checked: the SQL runs on PostgreSQL 16 and the 26 test lines pass (shape checks, caps, FK, single row per account, cascade, no extra index, down drops only `settings`, other schema and rows unchanged, up/down/up). The id shapes of all 14 domain ids, 1,205 curriculum ids and 974 lesson slugs fit the `CHECK` patterns (all `^[a-z0-9]+(-[a-z0-9]+)*$`, longest 38 characters).
Not checked: `001_accounts.up.sql` itself (not available), the runner, Neon preview, any client or server code (none exists), Better Auth interaction (none expected: the table is ours, not the library's).
