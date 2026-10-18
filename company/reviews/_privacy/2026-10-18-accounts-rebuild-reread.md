# Privacy re-read: the accounts rebuild (commit 29a75310d), flags off, and the way to a staff preview

owner: privacy-reviewer (Elif) · date: 2026-10-18 · class: tier-2 re-read of schema, auth and learner-data code · rules applied: my EDD-008 review (M1-M6, G1-G6, E13) and my PRD-005 ruling (C1-C6), both in this directory · I do not approve my own proposals: the gate is still proposed (founder, 10-23), so this is my reading for the principal engineer's merge decision.

**What I read, in order:** migrations 001 and 002; `src/lib/server/{auth,account-api,progress-store,http,email,idle-purge,accounts-flag,account-route}.ts`; `src/lib/account-client.ts`, `AccountView.tsx`, `AccountSync.tsx`, the `src/kit/progress.ts` diff; test titles and the static suite. Then the author's notes. **What I did not do:** run the Postgres tests (no server on this host). I ran `tests/accounts/static.test.mjs`: 14 of 15 pass; S14 fails only because `node_modules` is absent in this worktree (ENOENT), which says nothing about the code. Every "met" below for a database behaviour rests on my reading plus the author's report of 42 passing on PG 16, not on a run of mine.

## Verdict

**Merge to the default branch with all three flags off: pass, no condition outstanding on me.** With the flags off no route does work (every handler returns 404 with no `Set-Cookie` before touching the pool or the library), no progress sink is registered, no Like/Save/count control exists in the UI (grep: `setLiked`, `setSaved` have no caller outside `account-client.ts`), and the beacon route is untouched. The only new traffic is one cacheable 404 from `/api/account/me` per page load. Two defects below (P-1, P-2) are in code that cannot run while accounts are off; they block the preview, not the merge.

## M1-M6

| | Result | Evidence |
|---|---|---|
| M1 name backstop | **met** | `auth_verification_no_name` CHECK (non-object or non-empty `name` refused) in 001; `verification.create/update.before` strips it in `auth.ts`; test 8 calls the library directly. EDD §6.1 wording is now true |
| M2 idle clock; purge unreachable | **met** | `LAST_ACTIVITY_SQL` is `greatest(last_sign_in_at, newest session.updated_at)`; both session hooks move `last_sign_in_at`; S5 (ran, passes) fails if anything but `idle-purge.ts` names the purge or the 24-month interval; S6 locks readers of the column; test 22 |
| M3 retention wording true | **met** | EDD §6.1, §9 say "removed at the next sign-in request"; `purgeExpired` runs in `start`; `--oldest-expired` exists (hand-QA output); cadence is readiness A-15 (preview-on) |
| M4 anonymous `/me` sets no cookie | **met in code and by curl; browser run owed** | `me()` appends cookies only for a signed-in session; test 12; built test 33 and hand QA item 1. Tests 31-33 need a built server and have not run on the merge SHA (A-17, principal-engineer-ops). The browser beacon check is a preview condition |
| M5 bump guard | **met, with a note** | exact pins; S14 compares the lockfile's Better Auth packages with `better-auth-regression.json` and checks the listed suite titles exist. It does not run the suite, and the record's prose names a `better-auth-bump.test.mjs` that does not exist (S14 is the guard). Doc fix for the author; not a block |
| M6 limiter keys, policy version | **met** | `limiterKey` is HMAC-SHA-256 under an in-memory random key (S10); `isPolicyVersion` checks `PUBLISHED_POLICY_VERSIONS` (tests 3, 9). The list holds `draft-2026-10-16`, right for staff, wrong for a real learner (A-16, go-live) |

## PRD-005 merge-stage rows (flags off, counts off)

| Row | Result |
|---|---|
| P1.1 schema + inventory (C5.5, C6.1) | **met.** `lesson_like` and `lesson_save` hold exactly `user_id, slug, created_at_ms`, PK `(user_id, slug)`, no counter, no extra column; 001 has the same columns the inventory lists. I wrote the entries (below) |
| P1.2 anonymous Save = 0 requests (C5.1) | **met in code** (`setSaved` uses the known answer and has no `fetch` on the anonymous branch; S15). Network-log proof waits for a UI that has a Save control |
| P1.4 / P1.5 deletion and export cover both tables (C6.2) | **met in code**: `deleteAccount` deletes both inside the one transaction and returns the numbers; export lists both; `db-deletion-check` counts both; hand QA shows PASS. My own run is a preview condition |
| P2.2 / P2.3 (C4.1) | **met**: `mark()` refuses a non-`16+` like with 403 before any write; `canLike` is false for 13-15. C4.2 (no control, no copy about 16) cannot be judged: no control exists |
| P3.1, P6.1/6.2 (no read, no beacon change) | **met**: `engagement-not-ranking` (b) scans for readers; no change to the events route or its fields |
| P4.1 (C1.1), C2, C3 | **met in code**: the count response is `{slug: label or null}` with `s-maxage=600`, no cookie read, catalog slugs, at most 50; raw `n` never leaves `countLabels`; 24-hour rule joins `auth_user.created_at`; hide list; 60-writes cap (a per-instance memory limiter, so on Vercel a soft cap; fine as ruled, but the seeded test must not claim a hard 60). Tests 15, 16, 18 |
| C5.3 no tombstones | **met**: unsave and unlike `DELETE`; nothing written to `s3c:saves:v1` while signed in |

## The departure from EDD-008: explicit merge plus per-lesson push

**Judgment: accept the design, reject two things in how the push is built.**

- *The direction is right for privacy.* EDD-008 proposed a two-way merge of the whole local map on every load. That would silently undo "Don't import" on the next page (gate 2.3 item 5: account stays empty). Explicit merge is the only reading that keeps P1.3 true. Where the author asked "is a lost offline delta acceptable": **yes.** An update that never reaches the server is data we did not collect; it stays on the learner's device and is not lost to them. The cost is durability, and that belongs to the learner-model-engineer. Do **not** add a persisted retry queue to fix it: that is a new storage key that would need its own inventory row and buys nothing the explicit merge does not. The account view must not promise live sync.
- **P-1 (defect): a delta carries the whole local entry for a slug, not what just changed.** `updateProgress` passes `all[slug]` to the sink, and `cleanProgressMap` accepts every recall in it. So after the learner chose "Don't import" (or simply never opened the merge screen: the sink is registered on any page once signed in), the next completion or recall of any lesson already in the old local history uploads that lesson's whole declined history. This breaks the effect of gate 2.3 item 5 and PRD-005 C5.2 for progress. Fix: the sink receives only what this update added (a newly set `completedAt` or `predictedCorrectly`, the new recall), computed by the caller as a difference.
- **P-2 (defect): shared devices.** `mergeIntoLocal` copies the account's map into `s3c:progress:v1`, and sign-out leaves it there. If account B then signs in on the same device, B's next delta for a slug uploads the entry A's data produced (by P-1's whole-entry rule). Even after P-1 is fixed, A's history sits on the device after A signs out. Q8 of my EDD review named shared school devices. Fix: sign-out offers "Also clear this device" (the existing `clearThisDevice`), with the choice shown plainly, and the two-account script below passes.

Neither is a flags-off issue: with accounts off the sink is never set.

## Before a staff preview with flags on (staff addresses, `first-light` fake data, counts on for staff only)

1. **P-1 and P-2 fixed**, with scripts: (a) decline the import, complete a lesson already in local history, read the server rows: only the new event; (b) two-account run on one browser profile (A plays, signs out; B signs in, plays the same lesson): B's rows contain nothing from A.
2. **UI exists and is walked at 390x844:** merge screen with the saves line as its own choice and a real "Don't import" (P1.3, C5.2); age screen (P2.1/P2.2: no cut-off hint, under-13 gets no row, no nag); Like control absent for anonymous, under-13 and 13-15 with no copy about 16 (C4.2); no "you and N others"; count absent on revisit cards, the map, the account view and beside any mastery string until W-1697 answers (Q1.1).
3. **Network evidence:** anonymous Save logs 0 requests; the signed-in session cookie is on 0 beacon requests in a real browser (A-17 `browser-cookie`); `/api/likes/counts` carries no cookie and no third-party request (P6.2, P7.1).
4. **My runs on the preview:** `db-deletion-check` before and after a full account (A-9); `--oldest-expired` (A-15); C3.1-C3.4 on seeded data (an account 1 hour old excluded, hide list, 0 and 9 byte-identical, 1,234 likes show only a label).
5. **Environment (A-5, A-14, G4):** `BETTER_AUTH_TELEMETRY*` unset (`vercel env ls`, names only); Postgres 16 or newer read before migrating `first-light`; no variable points at a Production project (none exists); migrations applied before the flag deploy, and a redeploy after any later migration (hand QA found a cached schema mismatch). `LIKE_COUNTS_PUBLIC` on for staff preview only; production stays off until the named reviewer (C3.3), the W-1697 reading and the `exp` ruling exist.
6. **Mail on a preview:** with no `RESEND_API_KEY` the link is printed to the function log (the address is not). Acceptable for staff addresses; a live link sits in Vercel's log for 5 minutes, and nothing real may be signed up. Real Resend only after G2.
7. The deploy that turns a flag on is the founder's approval, per CLAUDE.md. Not mine to grant.

**Go-live is unchanged:** G1-G6 and P1.7 still fail (DPAs unknown, region not shown, E13 not landed, draft policy version, no policy text). Nothing in this rebuild changes that.

## Objections

| # | Objection | Must be answered by | Status |
|---|---|---|---|
| O1 | P-1 and P-2 above | backend-engineer; learner-model-engineer on the sink's contract | open, blocks preview-on |
| O2 | M5 record names a test file that does not exist | backend-engineer | open, doc fix |
| O3 | Carried: P1.7, gate proposed and mine, named reviewer for the count | founder | open (see EDD-008 and PRD-005 records) |

## Data inventory

`company/engineering/data-inventory.md` exists. Added: D20 (`s3c:saves:v1`, section 1a), D21 and D22 (`lesson_like`, `lesson_save`, section 3.9) with reason, owner and deletion path, and a section 10 status delta recording which older rows (M1, M2, M3, M6 and the age-band key) changed on this merge. The backend-engineer should confirm the column match; I do not approve my own file.

## Next moves

1. **backend-engineer:** P-1 and P-2, the M5 doc fix; tell me, and I re-read the diff.
2. **principal-engineer:** merge decision (flags off) on this record and readiness A-17 test 31.
3. **principal-engineer-ops / release-manager:** preview items 3-5 and the founder-approved deploy.
4. **growth-designer / evaluation-steward:** copy for the saves line and the Like absence rule; W-1697 mastery-surface list.
5. **chief-of-staff:** board items for O1 and the preview conditions (I did not touch the board).


---

# Section 2, 2026-10-18 (later): re-read of the fixes, commit beb83bfd4 (merged as de5ff7013), flags off

owner: privacy-reviewer (Elif) · I read `src/lib/account-client.ts` whole, the `src/kit/progress.ts` and `AccountView.tsx` diffs, tests C1-C8 (`tests/accounts/client-sync.test.mjs`) and EDD-008 A6 **after** the code. **I did not run any test:** there is no Postgres server here (`pg_isready`: no response) and no `node_modules`, so C4, C6, C7 and C8 (which need the database) are read, not run. Every "closed" below rests on the code and the tests' assertions; the author's report of passing runs is not mine. I do not approve my own proposals; D23 is the author's proposal, which I add or refuse.

## 1. P-1 and P-2

| | Verdict | Evidence |
|---|---|---|
| P-1 whole entry uploaded | **closed on reading (test not run by me)** | `updateProgress` hands the sink `before` (a fresh storage read) and `after`; `progressDelta` sends a `completedAt` or `predictedCorrectly` only if unset before, and recalls whose `at` was not there before, else `null` (account-client.ts 119-127). C4 asserts: nothing sent before the answer (`writes(profile) == []`); declining uploads nothing; a recall on a declined lesson sends exactly that recall; a replay of a declined completed lesson sends nothing; server rows hold one recall and no anonymous completion; the next load makes only `GET /me`, `GET /progress`. This is my script (a) |
| P-2 second account inherits the first's history | **closed for the device-copy path; residuals below** | Sign-out puts back `own`, removes the pulled copy and the key (`endAccountOnDevice`), after flushing pending deltas and only if the server confirms (a failed sign-out changes nothing, C8). C6 asserts after A's sign-out `local == anon` exactly and no device key; B is offered only the anonymous history (`ask` 2 lessons / 2 recalls, nothing of A's lesson-d); B's rows hold B's two events and nothing of A's. C7: a session ended elsewhere, and a new link over an active session, both restore `anon` before B's count. C8: "Also clear this device" removes progress, device key, saves, events; deletion restores `anon`. This is my script (b) |

**Residuals, none blocks:**
1. A delta that failed offline and was not retried before sign-out never reaches the account and leaves with the account copy (A6.4 "Cost"). Accepted, as in section 1: data not collected, not data lost from the device's own history.
2. `s3c:events:v1` (D2) is not restored or cleared at sign-out unless the box is ticked. It holds slug, correct and time of what A played; nothing reads it. It is the existing open finding (inventory section 8), now with a shared-device reason to stop writing it or give it a reader.
3. Two tabs: a tab opened before a second sign-in keeps its sink registered (module state is per page), so its later plays push deltas under the new cookie. Only the change is pushed (P-1), so no old history moves. Accept for staff preview; look at it in the account walk.
4. A forged `?signed-in=1` on an active session only ends the local copy and re-asks the merge screen; the own history is restored and nothing is lost. Harmless.
5. The two merge checkboxes start ticked. The learner still has to press "Import", and "Don't import" sits next to it, so I accept it; I would prefer unticked (copy decision for growth-designer).

**O1 (P-1, P-2): closed on this reading.** O2 (M5 record names a missing file): A6.7 and the changed record name S14; closed on reading, S14 run owed on a built host.

## 2. W-1710: what sign-out must do on a shared device

**Ruling: the author's default stands.** At sign-out, deletion, an ended session, and a new sign-in link over an active session, the account's pulled copy leaves the device and the device's own pre-sign-in history is put back exactly as it was. "Also clear this device" is offered at sign-out and at deletion, **unticked**.

Reasons (so the next reader can overturn them with a fact):
- The pre-sign-in history belongs to whoever used the device before, who may not be the person signing out; clearing it by default destroys data on a guess. The account copy is what the signing-out person put on the device, and it is removed.
- The opposite default (clear everything) would make "Keep my history" cost the learner their own local history at every sign-out; on a one-learner device that is plain loss.
- The residual risk on a truly shared device (A's pre-sign-in history visible to B) is the same as before accounts existed, and the box answers it.

Conditions (growth-designer owns the words; the meaning must stay true):
1. The sign-out line says what stays. As built (AccountView ~line 277) it is true; keep it.
2. The box is visible without scrolling next to the Sign out button at 390x844 (preview walk).
3. D2 (events) is not part of the restore (residual 2); the box is the only way it goes. Keep the box's effect list exact: progress, events, saves, device key (`clearThisDevice`).
4. No timer, retry queue or "remember me" on the device key; any such change comes back to me.

## 3. Mailed-link login-CSRF: does it need a UI cue?

**Yes, narrowly; no new storage.** The attack: someone mails the victim a valid sign-in link for the attacker's own account (the link is not bound to a browser). The victim clicks, is signed into the attacker's account, lands on `/account` and meets "Bring this device's history?" with both boxes ticked and an "Import" button. One click copies the victim's history into an account the attacker can read. The page says "Signed in as {email}" at the top, but nothing ties that to the button, and the victim did not ask to sign in. The code in beb83bfd4 closes the leak toward the next account; this closes the leak toward an account the learner did not choose.

Required (growth-designer words, backend-engineer wiring):
1. The merge screen names the account where the choice is made, e.g. "Send this device's history to {email}" (`me.email` is already there).
2. When the page was reached by the sign-in marker (the client already reads `?signed-in=1` once), show one line for that page view only: "You are now signed in as {email}. If you did not just ask for this, sign out." with the sign-out control next to it. Nothing stored.
3. The decline path stays one tap and sends nothing (already true, C4).

**When:** before any non-staff address (go-live); I check it in the preview walk at 390x844. It does not block the flags-off merge, nor a staff preview on staff addresses. A browser-bound link (server half) is the principal engineer's call; I do not require it if the cue ships.

## 4. D23 `s3c:account-device:v1`: added

Added to `company/engineering/data-inventory.md` section 1a, with two edits to the author's text: retention says plainly that it stays until site data is cleared if the learner never returns after the session ends (a device key has no timer), and "never sent" cites my read of `account-client.ts` (no `fetch` reads it), not a test. It holds a copy of D1 and a three-value answer; **no email, no user id, no account id**, so it adds no category beyond D1 and shows no more than D1 does on the device. Reason, owner and deletion path are stated; legal basis as D1 (counsel, F-25). Written only while signed in, never with accounts off (C2, A6.1 row 5). A section 10 status delta records the P-1 closure, D23 and the D2 note. The backend-engineer should confirm the row; I do not approve my own file.

## 5. Verdicts

**Merge to the default branch with all three flags off (de5ff7013): pass, no condition on me.** The fixes add one device key written only when signed in, a lazy client chunk and a cacheable 404 that now caches (MC2; test 34 is the browser check, not run by me). With the flags off no route works, no sink is set, no key is written. I did not re-run S1-S15; I read the three non-test files they scan that changed (`account-client.ts`, `progress.ts`, the engagement test).

**Staff preview with flags on: P-1 and P-2 no longer block.** Still open before the founder-approved flag deploy:
1. Items 2-6 of "Before a staff preview" above, unchanged (UI walked at 390x844, network evidence, my deletion-check run, environment, mail).
2. From this section: the account-naming merge screen and the sign-in notice (3.1, 3.2), and "Also clear this device" next to Sign out (2.2), walked in item 2.
3. C4-C8, S14 and test 34 run on a host with Postgres and `node_modules` (I could not), recorded in readiness.

Go-live: G1-G6 and P1.7 unchanged; 3.1 and 3.2 are added as go-live conditions.

## Objections (section 2)

| # | Objection | Must be answered by | Status |
|---|---|---|---|
| O1 | P-1, P-2 | backend-engineer | closed on reading (tests not run by me) |
| O2 | M5 record | backend-engineer | closed on reading (S14 run owed) |
| O4 | Login-CSRF cue (section 3) | growth-designer (words), backend-engineer (wiring) | open, before go-live; walked in preview |
| O5 | D2 events not cleared at sign-out; no reader | learner-model-engineer | open (inventory section 8), not a block |
| O3 | Carried: P1.7, gate proposed and mine, named reviewer for the count | founder | open |

## Next moves

1. **backend-engineer:** confirm D23; wire 3.1 and 3.2 once words exist; run C4-C8, S14 and test 34 where Postgres exists.
2. **growth-designer:** words for 3.1, 3.2 and unticked merge boxes (residual 5).
3. **learner-model-engineer:** name a reader for `s3c:events:v1` or stop writing it (O5).
4. **principal-engineer:** merge decision stands on this record; decide whether a browser-bound link is wanted.
5. **chief-of-staff:** board items for O4 and O5 (I did not touch the board).
