# Saved account preferences — store handoff

Owner: learner-data-engineer · 2026-10-20 · implementation evidence, not independent approval.

Implemented lazy real account/session/query wiring for GET/PUT `/api/account/settings`. Accounts-off is404 before auth/storage; anonymous401. Responses are private no-store `{settings, accountTag}`. PUT reuses constant-time PC10 account-header comparison before catalogue/storage work. Body account identities are ignored, bounded same-origin validation retained, errors never echo learner values.

The existing three fields gain closed-vocabulary experiences (five allowed keys, deduplicated) and nullable challenge. Atomic SQL flags each sent key independently. A partial subject/experience/challenge edit cannot write an unsent stale `personalizationOn:true`; only an explicit enable request can send that flag. Existing-account merge preserves all account lists/challenge; either false stays false. No new automatic merge/device storage exists in this backend.

Migration003 creates the legacy settings base if absent; migration004 additively extends it, preserving previously-existing draft rows. The004 down removes new fields (and their values), retaining legacy choices/accounts;003 down explicitly drops settings. Full-chain down remains destructive and requires the existing runner confirmation. Operational rollback is feature-off, not database down. No real migration was applied. Independent backend order review remains required.

Account export includes all five choice fields, stale IDs included. Optional to_jsonb column reads default new fields when only the legacy table exists. Existing whole-row account erasure and FK cascade cover the new fields. An export/history import must not silently enable or transplant preferences; UI owner keeps this separate.

Evidence: settings suite37passed/one dedicated SQL test skipped without its explicit database variable; dedicated real PostgreSQL16 SQL test1passed/no skips against coordinator-owned disposable Docker DB. This proves clean migration, legacy upgrade/004rollback, constraints, two-session row lock off-vs-partial edit, export, transaction erasure and cascade. TypeScript noEmit passed; no full build/QA launched by this worker. Initial local initdb failed sandbox shared-memory before any server existed; initial localhost test required authorized network escalation. No real learner database was accessed.

Existing full accounts test migration assertions updated to001–004. The privacy scanner recognizes only the exact new preference client settings-PUT literal header shape, with negative controls for beacon/thirdparty/GET/extraheader/tagbody/devicekey. Coordinator must union exact new accountTag homes after UI/feed files integrate; each independently reviewed file is named in the worker report. No broad tag/network exemption was added.

Logs: `/tmp/account-settings-tests.log`, `/tmp/account-preferences-real-sql.log`, `/tmp/settings-typecheck.log`, `/tmp/account-settings-static.log`. Coordinator owns final integrated check/verify, review, default merge and release. This record grants none of those approvals.
