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

---

# Section 3, 2026-10-18 (later): PC3 binding and the W-1711 cue (fix commit 7c7f488ad, merged 27317e69b)

Reviewer: privacy-reviewer (Elif). I read the code diff (`git show 7c7f488ad -- src tests`) first, the author's notes after. I did not run tests (no Postgres, no `node_modules` here) and did not walk a browser.

## 3.1 The account tag in `s3c:account-device:v1`: ACCEPT WITH CONDITIONS

What I read: `accountTag(secret, id)` in `src/lib/server/http.ts` (HMAC-SHA-256, first 16 bytes, base64url). `createAuth` refuses to start with a secret under 32 characters (`SECR0`), so the tag is not keyed by an empty string in practice. `/me` adds it only when signed in, and with accounts on every answer is no-store. In `account-client.ts` the tag is compared (`sameAccount`) and written into the device state in three places; no `fetch` carries it. `clearThisDevice`, sign-out, deletion and an ended session already remove the key.

Is it a persistent identifier on the device? Yes, and it is the same on every device of one account (that is its purpose). I accept it because:
- It reveals nothing the account page does not: it is not the id, cannot be reversed or matched without the server secret, holds no email, and the server stores nothing new (it can recompute it, as it already holds the account).
- The device already holds a copy of that account's history (D1) while signed in, so the tag adds linkability only for someone who can already read the learner's browser storage. Linking two devices needs both.
- A random per-sign-in nonce cannot tell "a different account" on a later load; the marker alone is what the principal's probe 1 defeated. The tag is the smallest value that does the job.

Conditions (each testable; 1 to 3 are the ones that would make me withdraw this):
1. **Local only.** The tag is never logged, never in a request body, header, URL, event, beacon or table, never shown to the learner. S17 tests its properties; add to the static scan that no `fetch`/`sendBeacon` argument can reach `DEVICE_KEY` or `.tag`. Any server-side store of it comes back to me.
2. **Same deletion path as D23**, no longer: sign-out, deletion, ended session, new link, "Also clear this device". No timer, no copy elsewhere.
3. **The key stays secret and long.** A rotation changes every tag and only makes each device ask again (the author's fail-safe); acceptable. Any other key (a public value, a constant) makes the tag a guessable function of the id: back to me.
4. **Residual stated in the inventory:** if the learner never returns after the session ends, the tag stays with the key until site data is cleared. Counsel to be told a pseudonymous identifier exists (F-25); I flag, I do not decide.

Edit made: row D23 in `company/engineering/data-inventory.md` now describes `account: <tag>` (derivation, 22 characters, stable across devices, not stored server-side, local only) in place of the sentence "No email, no account id, no user id" (kept as "no account id itself"); purpose, reader, basis and status columns updated. The backend-engineer confirms the row; I do not approve my own file.

## 3.2 The W-1711 cue as built: MEETS my condition as written; one gap

Read in `AccountView.tsx`:
- **Merge names the account:** heading "Send this device's history to {email}?" sits directly above the boxes and the Import button; `me.email` is React text (escaped). Meets. Decline is untouched: one tap, sends nothing.
- **One-line notice, this page view only, nothing stored:** when `fromLink` (the `?signed-in=1` marker, read once and removed from the address bar) the page shows "You are now signed in as {email}. If you did not just ask for this, sign out", `role="status"`, with a button running the same sign-out (`doSignOut`, honouring the unticked "Also clear this device" box). `fromLink` is in memory only. Meets. The words are the placeholder I suggested; growth-designer still owns them.

**The gap, which comes from PC3 itself.** The attacker who mails a link can edit `callbackURL` (principal's probe 1). The victim then lands on `/` with no marker, and the notice and merge screen exist only on `/account`. By the code: if the device holds history the attacker's account lacks, nothing is sent until the victim opens `/account`, where the heading names the account (good). If the device holds nothing the account lacks, `run()` writes `answer: "nothing"` and begins sync with no screen, so later progress on this device flows to the attacker's account with no cue shown. My earlier line ("a browser-bound link is the principal engineer's call; I do not require it if the cue ships") assumed the victim lands on `/account`. That does not hold for an edited link, so I **amend** it: the cue meets 3.1 and 3.2 as written but does not by itself close the mailed-link case.

New go-live condition **G7** (no block on merge or a staff preview, where addresses belong to staff): before any non-staff address, either (a) the principal-engineer binds the sign-in link to the browser that asked for it, or (b) a sign-in cue reaches the learner on whatever page they land on when a new account's device state is begun without a screen (the "nothing" branch). The choice is the principal's. Severity is bounded: later progress and saves from one device go to an account the attacker can read; past history does not.

## 3.3 What the preview walk must check (390x844, staff address)

1. Sign-in link to `/account?signed-in=1`: the notice is the first line under "Your history", names the exact address, and "sign out" is reachable without scrolling. Reload: notice gone, no marker in the address bar.
2. Device with history the account lacks: the merge heading shows a 40-character address wrapped, not clipped or overflowing; Don't import is one tap; the network panel shows no request carrying progress or saves before the answer.
3. Notice's "sign out" with the box unticked: the device's own history returns. Ticked: progress, events, saves and the device key are gone. The box is visible next to Sign out without scrolling (section 2, condition 2).
4. G7 case: a link with `callbackURL` edited to `/` (test C9's probe), on a device with nothing the account lacks and on one with history. Record what the learner sees. I expect no cue in the first case; the walk records it.
5. localStorage after each step: `s3c:account-device:v1` holds `answer`, `account` (22 characters), `own` and nothing else; no tag in any request, in any response other than `/me`, in the console or in a server log.
6. A second account on the same device is asked again without a marker (PC3) and the first account's pulled copy is gone.
7. Screen reader: the notice is announced once, not on every render.

## 3.4 Verdicts

- **Merge into the default branch with all flags off: pass, no condition on me.** With flags off no route works, no sink is set, no key (so no tag) is written (C2). I read the diff; I did not run S1-S17 or C1-C11.
- **Staff preview with flags on, from my side:** the cue wiring no longer blocks. Still open before the founder-approved flag deploy: items 2-6 of "Before a staff preview" (section 1), the walk in 3.3 recorded, the Postgres-hosted test runs (C4-C11, S14, S16, S17, test 34) recorded in readiness, and tag condition 1 (static scan). Staff addresses only.
- **Go-live:** G1-G6 and P1.7 unchanged; section 2's cue conditions are built (words pending); **G7** added; counsel told about the tag (F-25).

## Objections (section 3)

| # | Objection | Must be answered by | Status |
|---|---|---|---|
| O4 | Login-CSRF cue | growth-designer (words) | wiring met; words open; walked in preview |
| O6 | Edited callbackURL bypasses the `/account` cue (G7) | principal-engineer | open, before go-live |
| O7 | Tag conditions 1-4 (3.1) | backend-engineer | open: static scan for the tag |
| O3, O5 | unchanged | founder; learner-model-engineer | open |

## Next moves (section 3)

1. **backend-engineer:** confirm row D23; add the static no-send scan for `.tag`/`DEVICE_KEY`; run C4-C11, S14, S16, S17 and test 34 where Postgres exists.
2. **principal-engineer:** decide G7.
3. **growth-designer:** final words for the notice and heading.
4. **chief-of-staff:** board items for O6 and O7 (I did not touch the board).
5. **founder/counsel:** F-25 notice that a pseudonymous tag exists.

---

# Section 4, 2026-10-18 (later): PC10 and the tag in a request header (code 96e8654fc, merged 98aa6092f)

Reviewer: privacy-reviewer (Elif). I read the code diff (`git show 96e8654fc -- src tests`) first, the EDD-008 addendum A8 after. I did not run tests (no Postgres, no `node_modules` here; S18 needs the TypeScript package) and did not walk a browser.

## 4.1 Ruling 1: the header exception to condition 1: ACCEPT WITH CONDITIONS

What I read:
- Client: `boundHeaders(tag, withJson)` is the only place the tag enters a request. It is called in five `fetch`es in `account-client.ts`: `/api/account/progress` (PUT), `/merge` (POST), `/delete` (POST), `/saves/{slug}` and `/likes/{slug}` (PUT/DELETE). `pushDelta` returns before any request when `syncTag` is null. The tag is not in a body, URL, event or beacon; `/api/events` and `/api/likes/counts` are untouched by the diff.
- Server: `boundWrite` runs after the session and origin checks, before the body is read. `sameAccountHeader` compares with `timingSafeEqual`; a missing or empty header, or a mismatch, answers `409 {"error":"account_changed"}`. The 409 body does not echo the tag. `tagOf` throws `SECR0` with no secret; `logFailure` prints fixed text only. Nothing else in `src/lib/server` reads request headers into a log (grep for `ACCOUNT_HEADER` finds http.ts and account-api.ts only).
- A custom header on a cross-origin request needs a CORS preflight, and no route answers one; so the browser cannot send it to a third party from our code, and `sameOriginWrite` refuses a foreign Origin anyway.

Why I accept. My condition 1 protected one thing: that the tag should not become an identifier that leaves the device and sits in somebody's records. Here it goes only to the origin that already holds the session cookie and the account id the tag is derived from, on requests that already carry both. The server learns nothing it did not know, stores nothing, and the learner's browser gains the only reliable way to say "I started as account A" (the alternative, below, needs a stored column to do the same). The need is real: PC10 shows an open tab writing a recall, a Save and a Like into the account the browser was later signed into.

The alternative, refused as the worse choice: a random per-sign-in value in the session row is a new stored field (a new row in the inventory, reason, owner, and a deletion path that must follow the session), and it must also be handed to the page. It would be less linkable (changes each sign-in), but linkability across sign-ins is not a harm here: the server holds the account. I do not require it.

Residual, stated: the tag is stable per account and the same on every device, so anything that records request headers (platform log drains, a WAF or observability agent, a future middleware) would hold a stable pseudonym joining one account's writes. Today none does, by reading. That is why condition 3 exists.

Conditions (1 to 3 are the ones that would make me withdraw):
1. **Boundary stays tested and in the gate.** S18 (`tag-scan.mjs`, part of `test:accounts`) passes in CI with `node_modules`, before any flag goes on; its route list stays exactly the five write routes. A sixth route, a read route, `/api/events`, `/api/likes/counts`, or any non-same-origin URL carrying the header comes back to me. S18's stated limits (an anonymous function's parameter is not followed; imports are followed by name only) are accepted because part 3's by-name backstop covers them; a new file that calls `fetch` and imports the tag helpers fails that backstop and is the signal.
2. **Never recorded.** No server log, error text, analytics event, trace, `Server-Timing`/`Vary` header or response echoes the header or the tag. The 409 body stays fixed. Nobody adds a handler that logs `req.headers`.
3. **Platform capture is switched off or checked before the flag deploy.** Before the founder-approved flag deploy, the principal-engineer-ops (or whoever owns the deploy) confirms that the host's request logs, log drains and any observability or firewall product do not store custom request headers, and records it in readiness. If any does, either exclude `x-s3c-account` from capture or come back to me for the stored alternative.
4. **Rotation and deletion as before** (3.1 conditions 2 and 3, with the corrected rotation wording in D23): the device key and the tag are removed on the same paths; the secret stays 32+ characters; a public or constant key makes the tag guessable from an id and comes back to me. A tag that now leaves the browser raises the stakes of a weak key; `SECR0` guards it.
5. **Counsel note (F-25), flagged, not decided:** the tag is a pseudonymous identifier that now crosses the network to us. It is derived from data we already hold, so I see no new purpose. Counsel to be told, with the 3.1 notice.

Condition 1 of section 3.1 now reads: "The tag is never logged, never in a request body, URL, event, beacon or table, and never shown. It travels in one header, `x-s3c-account`, same-origin, to the five account write routes only (S18)."

## 4.2 Ruling 2: row D23 updated

Edited `company/engineering/data-inventory.md`, row D23 (the backend-engineer left it to me, W-1917):
- **Processed by** (was "nobody; never sent, tag included"): the tag alone travels in the PC10 header to the five write routes, compared and dropped; the rest of D23 is never sent; conditions point here.
- **Rotation, corrected:** a `BETTER_AUTH_SECRET` change signs every session out and removes every device's state before any tag is compared; versioned `BETTER_AUTH_SECRETS` keeps `BETTER_AUTH_SECRET`, so every tag stays the same. It does not "change every tag". My own 3.1 condition 3 said "A rotation changes every tag ... acceptable"; that sentence was wrong for the same reason and is superseded by the D23 wording. (The residual that a device key persists if the learner never returns is unchanged.)
- **Status** and the section 10 delta record the ruling and the commit. The backend-engineer should confirm the row; I do not approve my own file.

## 4.3 Ruling 3: verdicts

- **Merge into the default branch with all three flags off (98aa6092f): pass, no condition on me.** With the flags off every write route answers 404 before `boundWrite` (C2 unchanged), no sink is set, no key and no tag are written, and nothing sends the header. I read the diff; I did not run S1-S18 or C1-C14.
- **Staff preview with flags on, what still blocks from my side** (staff addresses only):
  1. 4.1 condition 1: S18 and the Postgres-hosted tests (C4-C14, S14, S16, S17, test 34) actually run on a host that has Postgres and `node_modules`, recorded in readiness. I could not run any of them.
  2. 4.1 condition 3: the host's header capture confirmed or excluded, recorded in readiness.
  3. Items 2-6 of "Before a staff preview" (section 1) and the walk in 3.3, with two additions: (a) in the network panel, `x-s3c-account` appears on the five write routes and on no other request, including no event beacon; (b) two tabs, the second signed into another account: the first tab's next write gets 409, it stops syncing, shows the sign-in notice and the account page re-reads; the first account's pulled copy is gone from the device, and no request carries a body for the wrong account.
  4. Unchanged from section 3: the G7 case walked and recorded.
- **Go-live:** G1-G7 and P1.7 unchanged; 4.1 conditions 2 and 5 added to the notice list; counsel told (F-25).

## Objections (section 4)

| # | Objection | Must be answered by | Status |
|---|---|---|---|
| O7 | Tag conditions (3.1, now amended by 4.1) | backend-engineer | static scan built (S18), run owed |
| O8 | Header capture by host logs, drains, WAF (4.1 cond. 3) | principal-engineer-ops | open, before a staff preview |
| O6, O4, O5, O3 | unchanged | principal-engineer; growth-designer; learner-model-engineer; founder | open |

## Next moves (section 4)

1. **backend-engineer:** confirm row D23; run S18 and C4-C14 where Postgres and `node_modules` exist; record in readiness.
2. **principal-engineer-ops:** confirm no host/log/WAF capture of custom request headers; record in readiness (O8).
3. **principal-engineer:** merge decision on this record; G7 still yours.
4. **chief-of-staff:** board item for O8 (I did not touch the board).
5. **founder/counsel:** F-25 notice now includes that the tag crosses the network to our own server.
