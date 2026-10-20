# EDD-015: saved account preferences in the main feed

author: personalization-engineer / backend-engineer (implementation owners; proposed contract recorded by chief-of-staff)
tier: 2
status: proposed before code
date: 2026-10-20
reviewers: principal-engineer, privacy-reviewer, evaluation-steward

## Problem and authorized direction

Founder explicitly requests account-saved preferences and the ordinary main feed, all source in current remote default. The prior ephemeral preview did not fulfill this behavior. Current defaultc82f35f9c has1383lessons and existing optionalBetterAuth/Postgres accounts; settingsDeps isnull and schema only a draft. Default/main checkout is stale and heavilydirty; implementation uses /private/tmp/s3-account-personalization and preserves unrelated work.

## Proposal

Extend existing settings row and authenticated /api/account/settings GET/PUT, no new authprovider or dependency. Fixed stated fields: personalizationOn boolean/null, subjects allowlisted domainIDs, legacy lessOf preserved, experiences fixedfive IDs, challenge null/gentle/balanced/demanding. Account editor is optional and explicitly saves/enables; Skip makes no write, Off savesfalse, Reset clears choices and savesfalse. No local preference storage or anonymous import. Signedout/nochoice/off/empty/failedreads use exact canonicalbaseline. Export includes every stored field; account deletion clears/cascades settings. Reviewed additive numbered migration is manually applied to named dev/preview DB, never runtimeDDL. No real production migration or deploy inferred by current request.

Existing accountsflag/session/DB helpers are wired lazily; no credentials needed for builds. Settings PUT checks sameorigin, JSON/caps and PC10expectedaccount header against current session; no bodyuserId trusted. GET echoes bound accounttag; client captures tag+epoch and ignores stale responses on signout/switch/reset/unmount. Preserve per-key atomic write semantics: omitted fields cannot restore staleOntrue; never merge preference writes with history. GET/PUT private no-store and redacted fixed error logging. No new telemetry or learner data inHQ.

Ordinary / remains feed entry. Public staticbaseline pages unchanged. Signed-in opted-in feed uses account-cookie-scoped no-store /api/account/feed, server ranks the entire currentlyvisible baseline before paginating into slim30-card pages. Re-export source-pinned provisional editorial records against currentcatalogue; missing/stale/disputed/weak entries arefixedbarriers. Reuse bounded5-card/2-position ordinalmatching separately versioned, with prerequisite and visibility/release protections before tastes. No data-derivedlearning/mastery or fittedGAM. Matching affects newlesson slots only; due recall priority remains outside matcher. Actualoldbaseline interleaves due recalls every3newlessons; do not claim an existing due-first engine. Enabledpath must honor reviewer/steward disposition. Subjectchips use canonicalfilteredorder; no preference-derived input to publicstaticcache.

Avoid shifting an active prediction: acceptinitial ranked list only whileintroactive; otherwise offer explicit Refresh feed to apply. Inflight fetches carry generation+account identity; changedsettings/profileversion on laterpage must refuse mixed snapshots and offer explicitrefresh. Settings fetched fresh on load/focus/return and afterSave; save failure never claims saved. Keep memory bounded, no fullcatalogueprofiles in learnerHTML. Moved cards explain factual stated-choice fit, no measured outcome claims. HQ remains synthetic.

## Policy and admission

Current founder words supersede preview-only productscope; prior AMD015 reachable-v3 is not reusable permission for this candidate. Steward prepares minimal opt-in amendment alongside implementation; no protected edits or claimedratification until actualowner/founder disposition. Provisionalprofile admission must beexplicitly bounded; no claims of universalquality/calibration. RealdataGAM/Bayesian and remaining329draft evaluations remainbacklog.

## Verification and rollout

Focused tests for settings allowlists/bodycaps, signedout/accountsoff/sameorigin/PC10, atomicpartialupdates, export/delete/migration; fakePostgres SQL whereavailable. Matcher tests forbaseline identity/off/reset, eligibility/status/prereq/freshness/diversity, wholecatalogue paging stability/no duplicates, movedreasons. Compiled browser tests for optionalonboarding→save→ordinaryfeed→reload/newsession→off/reset→signout/accountswitch and stale requests, keyboard/phone, noanalytics/preference leaks. Existing protected tests/gates remainunchanged, npmcheck/verify reportactualfailures; no blanketoldpreviewapproval. Independent engineering/privacy/operationalreview before defaultmerge.

## Rollback and limits

Withdraw main-feed matching via candidate flag/off route whilepreserving settings/export and canonicalfeed. Never drop existingaccountdata for rollback; backwards-compatible additive migration. Profileversion/sourceidentity pins release. Userpreferences describeinterests, notability. No deploymentorproductionpromotionauthorizedhere; app source mergesinto currentdefault afterreview. Real authenticatedDB runtime proof requires nameddev/preview credentials and syntheticuser lifecycle; no private accountsecrets inchat/logs.
