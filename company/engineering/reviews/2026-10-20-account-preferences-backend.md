# Account preferences: independent backend and migration-order review

owner: backend-engineer
date: 2026-10-20
reviewed_source: 583557c673163393ed34cc38c3d606b6575885f7
parent: c82f35f9c
artifact: /private/tmp/s3-account-settings
status: revise — finite HTTP write-boundary finding B1; migration ordering accepted

## Independence and scope

This reviewer prepared the proposed AMD016 text as evaluation-steward earlier in this task and discloses that policy authorship. This reviewer did not write application code, SQL migrations or their tests and does not ratify that proposal here. This is an independent backend/migration integration assessment of actual source before the builder handoff, not privacy final acceptance, constitutional ratification, operational readiness, release approval or authority to apply a database migration. No app/protected file or real database was changed by this review.

## Migration-order disposition

**Accept003→004 ordering for the reviewed clean or matching legacy-draft schema.**003 creates the legacy settings table after001 auth_user/002 likes+saves, with user primary key/FK cascade, nullable switch and bounded non-null subject/lessOf arrays. CREATEIFNOTEXISTS preserves an already existing matching legacy table; it does not certify an arbitrary pre-existing schema.004 adds experiences/challenge, defaulting existing rows to empty/null and preserving existing choices/opt-out state. Constraints reject wrong dimension, NULL elements, over-five experiences, unknown experience IDs and unknown non-null challenge values. API membership/shape/cap validation remains necessary and is present. No per-choice index, timestamps, inferred score or runtime DDL is introduced.

004down retains every account row and legacy switch/subjects/lessOf but **destroys new experience/challenge values**.003down drops settings and its rows. Full reverse order004→003→002→001 therefore removes settings before auth_user and preserves the existing chain's intentional destructive-down behavior; the runner requires explicit confirm-drop. Feature rollback must disable matching and preserve preferences/export/delete, not execute either down migration. The builder handoff correctly states this. These are schema design findings, not permission to run migrations against dev/preview/production.

## Store, rights and wiring findings

Atomic set plans use one INSERTONCONFLICT or UPDATE with per-key flags; omitted switch cannot restore stale true after explicit off. Merge retains account lists/challenge and either false dominates; empty/no-choice requests avoid creating a row. Responses may perform a post-write read only when RETURNING has no changed row; writes never depend on an earlier row read. Lazy settingsDeps imports existing account session/query/feature helpers without constructing auth/pool itself. Accounts-off gates before session/database access, anonymous is401, account identity derives from verified session. PC10 constant-time comparison rejects missing/mismatched x-s3c-account with409 before parsing/store work. GET/PUT echo the opaque tag and no-store headers. No per-account module cache exists; catalogue memo is public membership only. Client epoch/tag handling is outside this backend-only review and still required.

Export queries preserve stale stored IDs and include all new fields. to_jsonb optional-key extraction works on legacy003-only schema and supplies empty/null defaults. Existing account erasure deletes the entire settings row within its caller's account transaction; FK cascade independently covers direct auth_user deletion. Import/old-v1 parser/UI compatibility remains a separate integrated client acceptance item; helper export defaults alone do not prove the complete file-import flow.

## B1 — fix before backend approval

In src/lib/server/personalization/settings-handler.ts, sameOriginWrite currently trusts arbitrary x-forwarded-host/host headers and compares host only, accepting scheme differences. handleSettingsPut also never enforces application/json. Thus its new live route does not satisfy EDD015 and the exact privacy requirement for trusted deployment origin/JSON checks. A valid JSON body with text/plain is accepted if authenticated/tag-bound; forwarded origin headers can widen accepted hosts. This inherited dormant-handler behavior becomes exposed by this change and needs repair now. The shared http helper has the same host behavior, so importing it unchanged does not resolve the finding.

Required repair: validate exact origin against trusted request/deployment origins without arbitrary forwarded-host expansion, reject non-application/json before reading/writing, retain PC10, add negative controls for spoofed forwarded origin/host, scheme mismatch and valid-JSON text/plain; rerun affected account/settings tests. Root and builder were notified with exact stable source. No exploit against a real account was attempted.

## Evidence and limits

Read tests/settings/account-preferences-sql.test.mjs and coordinator-owned /tmp/account-preferences-real-sql.log: one real PG16 synthetic SQL test passed, no skips. Actual assertions cover clean full migrateUp, stored field roundtrip, absent second-account row, five invalid new-field constraint cases, new-field export,004down preserving legacy values/export defaults,004re-up default filling, real two-session off-row-lock versus partial edit, explicit account transaction erasure and direct FK cascade. Its old-schema path is the equivalent post004down schema, not an independently provisioned arbitrary legacy instance. It does not execute003down/full reverse chain or production schema probing; coordinator's full accounts suite remains owed. A source-level migration order assessment is not a claim those executions already passed.

Builder reports settings37pass/1dedicated-SQL skip without variable, static18pass, typecheck clean. Those are builder evidence, not reviewer reruns. This reviewer ran no concurrent SQL/database reset, build or server. Required integrated runtime privacy/client/paging/onboarding and account suite evidence remain separate. Vercel curriculum-file tracing in settingsCatalog is explicitly unverified in source; compiled/deployed artifact acceptance must establish membership availability, rather than treating source fs reads as cloud proof.

## Final disposition

Migration order/constraints/export/delete/backend atomic design: accepted within stated applicability. Exact583557c67 backend HTTP admission: **revise B1**. Corrective source review and negative-test evidence required before this record can change to approved. Protected objective/migration application/default integration/deployment permissions are neither implied nor granted.

## Corrective review — B1 closed, backend scope approved

Final reviewed source: **93c3893c2f0cae7e9e2c633a0d663f954e778114**, child of583557c67. Re-read exact correction and negative controls. Origin must now be its own exact URL.origin serialization and equal requestURL.origin; arbitrary Host/x-forwarded-host cannot enlarge that set, and scheme/path/userinfo variants fail. PUT rejects non-JSON415 before auth/body handling; charset-qualified application/json works. PC10 and prior limits remain. This is deliberately strict to the framework request origin; no alternate deployment-origin trust is inferred. A deployed proxy whose requestURL origin differs must be resolved explicitly by trusted configuration, not by reintroducing forwarded-header trust.

Independently ran the existing required test loader with the two affected settings suites: **24/24 pass,0skip**; `/tmp/account-preferences-backend-review-tests.log`. Initial bare node:test invocation omitted repository TS loader and failed import resolution, then corrected with tests/lifehacks/register.mjs; no code change was needed for that invocation mistake. No SQL was rerun concurrently. Prior real SQL remains applicable because no SQL/store/export file changed in the correction. Builder's expanded settings38pass/1dedicatedSQLskip and static18pass remain separate reported evidence.

Exact Git blob identities at final source (SHA1 Git content IDs):

| Path | Blob |
|---|---|
| db/migrations/003_account_preferences.down.sql | 6e5d5a255fcc6e089832cf29df59f306517d31b0 |
| db/migrations/003_account_preferences.up.sql | 894a8d909cfbdeab82d97e3ca949599fe5e1a979 |
| db/migrations/004_account_preference_experiences.down.sql | 9bf2bb8634d549fd16b648b407844e12fec3fb49 |
| db/migrations/004_account_preference_experiences.up.sql | 0f57b079bbf5311d67db0d5db3518e9ef0b0a049 |
| src/lib/server/personalization/settings-handler.ts | 4f98880c43f02f460a48f0799fd5c4f149bc74b7 |
| src/lib/server/personalization/settings-store.ts | 46b28803c0d669c2dbfe7f531d4812808b709d96 |
| src/lib/server/personalization/settings-wiring.ts | a347912046e8ad7e368800c9ab0112e08f7f77e5 |
| src/lib/server/personalization/settings.ts | 3c1a37f8b0e36d64ed9308f13e80d4fc2327e7ee |
| src/lib/server/progress-store.ts | 9ed9161f870c9afe8b80a13789ba3ab074837c02 |
| tests/settings/account-preferences-sql.test.mjs | 99b3deec0bdad5bc9e4cdf3eac62c81b61d6b862 |
| tests/settings/account-preferences.test.mjs | aa47324dbfaa1ab1e348fcbcc550ef0b15e364a2 |

**Superseding disposition:** approve this exact backend/migration design and implementation scope, B1 closed. Earlier revise is retained as history. Full integrated accounts execution, client/runtime/privacy final review, policy ratification, readiness, default integration and any named migration/deployment approvals remain separate requirements. This is not blanket approval of application work outside the reviewed backend source.

Test-only follow-up251c3142ac77ffa095bcf055dbdc9f65292367ff adds explicit malformed-origin and credential-bearing-origin negative cases; reviewed diff contains no application or SQL changes. Backend approval therefore applies unchanged to251c3142a; account-preferences.test.mjs blob becomes d05dd0699 (full identity available from that pinned commit). Builder reports focused7/7pass; prior independent24/24 source behavior evidence remains applicable, not represented as a new rerun.
