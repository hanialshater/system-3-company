# Privacy review: PRD-005 likes (public bucketed count) and private saves

owner: privacy-reviewer (Elif) · date: 2026-10-17 · class: tier-2 privacy review of a social surface with stored data · answers: PRD-005 §6 "For privacy-reviewer" Q1 to Q5 · inputs read: PRD-005, the founder decision of 2026-10-17, `company/initiatives/first-light/privacy-gate.md` (P1, P2, P4, P6, §3, §4, §5.3), my EDD-008 review (M1 to M6, G1 to G6, Q6), AMD-008 (M5, X1, P2), `company/engineering/data-inventory.md` (existence only). Not read: any code (none exists for likes yet). Not legal advice (gate §9).

Standing caveat: the gate is still **proposed** and I wrote it, so I cannot approve it. Where I apply it below, the founder confirms the reading at the 10-23 review (objection O1). Where this record is stricter than the PRD, the stricter wins (AMD-008 objection 7).

## Rulings

| Q | Ruling |
|---|---|
| 1. Count under M5 / §5.3 | **Allow with conditions.** Not forbidden by M5 as I read it, and §5.3 applies in a reduced form (no content, so no report/block queue; a named human and a freeze switch instead). M5 reading is the evaluation-steward's |
| 2. Threshold and steps | **Allow with conditions.** Hidden below 10, steps only. **Refuse exact display at any level** |
| 3. Abuse | **Allow with conditions.** Rate limit plus buckets is not enough; add the 24-hour rule, a daily cap, a named reviewer and a per-lesson hide switch |
| 4. Ages | **Likes 16+ only (refuse 13-15 and under-13 liking). Allow** teens and anonymous viewers to *see* counts |
| 5. `s3c:saves:v1` | **Allow with conditions.** Separate line on the merge screen, server is truth once signed in |

## Q1. The public count, M5 and §5.3

**My position on M5 (the reading itself is W-1697, evaluation-steward).** M5 has two limbs: no comparison of a learner with other learners, and "no rendered number derived from other learners' data on any *mastery* surface". A lesson-level count compares no learner with anyone, and a lesson card or `/d/<slug>` is not a mastery surface, so I read M5 as not violated, **provided the count never renders on a mastery surface**. My own gate §4 sentence ("no aggregate shown to a learner is derived from other learners' records") is wider than M5 and was written about mastery; I am correcting it here to "on any mastery or personalization surface". The residual risk is X1's spirit, not M5's letter: a number invites ranking lessons by eye, which is why steps and no sort stay (Q2).

**What I need from the W-1697 reading, in writing, before `LIKE_COUNTS_PUBLIC` can be on in anything but staff preview:**
1. A list of what counts as a mastery surface. Specifically: is a **revisit card** (a lesson shown for recall) one? Until answered, the count is not rendered on revisit cards, on the map, in the account progress view, or beside any mastery string.
2. Whether "comparison with other learners" reaches a lesson-versus-lesson number. If yes, an amendment is needed, not a reading.
3. A test ID for the count case, so M5 has a failing spec and not a judgement.

**§5.3 for a count-only surface.** Items 2, 3, 4 and 9 hold by construction (no text or handles; nothing about a person is shown; deletion removes the likes). Items 5, 6 and 7 (report, takedown, child-safety procedure) have nothing to act on, because no content or person is shown. Item 1 is Q4. Item 8 (a named human) is **kept**: a person must be able to hide a manipulated count within 24 hours (Q3). Conditions:
- C1.1 P4.1 is read as passed for likes: 0 surfaces with learner text, handle, follow or list of who liked. Test: the `GET /api/likes/counts` response schema has only `{slug: label|null}`; no endpoint returns another account's like rows.
- C1.2 The "Liked" list is visible only to the account (cookie scope; a second account's request for it returns the second account's rows only, per the Q1.8 two-account script).
- C1.3 Counsel is asked (gate §9.6) whether a count-only like falls under the EU DSA or UK Online Safety Act. Flagged, not decided; it does not block staff preview.

My view on record, agreeing with the PRD's objection 1: private likes would serve the mission with less risk. The founder decided public; I do not refuse it.

## Q2. Threshold and steps

- **Hidden below 10; labels 10+, 25+, 50+, 100+, 250+, 1k+ accepted.** Extending above 1k in steps (2k+, 5k+, 10k+) is fine. **Exact display is refused at every level**: exact numbers allow differencing (one person's like seen as +1) and read as a ranking.
- C2.1 `GET /api/likes/counts` returns a label or `null`. A slug with 0 likes and one with 9 give **byte-identical** responses. Test with both seeded.
- C2.2 The response is cacheable for at least 10 minutes (`s-maxage` >= 600), so a boundary crossing cannot be tied to a minute. No cookie, no auth, no per-viewer variation. Test: response headers and a second request with a session cookie returns the same body.
- C2.3 Slugs in the query must be catalog slugs, at most 50 per request; others are ignored without error text.
- C2.4 Raw counts (a counter column or cache) may exist server side but are never in a response, a log line or `console.log`. Test: grep of route handlers and a response-body scan with 1,234 seeded likes finds no number other than the label.
- C2.5 Own like shows a filled heart only; "you and N others" is banned (as PRD).

## Q3. Abuse and duplicates

Magic-link limits plus coarse buckets do not stop a patient farmer using plus-addresses. Because P1.1 forbids IP or device fields, I will not pass a defence that stores them. Conditions, using only existing fields:
- C3.1 **24-hour rule.** A like counts publicly only when its account is at least 24 hours old (`auth_user.created_at`, no new column). Test: seed an account created 1 hour ago with a like; the count excludes it; after the clock moves 24 hours it includes it.
- C3.2 **Daily cap.** At most 60 like writes per account per rolling 24 hours (429 after). Limiter keys hashed in memory (as EDD-008 M6); nothing persisted.
- C3.3 **Named reviewer.** The founder names one human (and a cover) who can review a suspected manipulation within 24 hours and hide a lesson's count. Until named, `LIKE_COUNTS_PUBLIC` stays off in production. Board item requested.
- C3.4 **Freeze means hide.** A per-lesson hide list (runtime config holding slugs only; no new table or learner field) makes that lesson's label `null`. A frozen stale number would itself be a display, so hide, not freeze. Test: slug on the list returns `null` with 500 seeded likes.
- C3.5 **Removal is recorded without identities.** Deleting farmed likes is done by the named reviewer and logged in a file under `company/reviews/_privacy/` as slug, number removed, date, reason. No email or user id in the file.
- C3.6 The aggregate anomaly query (likes per lesson per day against totals) may be run by the analytics-steward and reports no user ids. The query text comes to me before it runs on real data (as EDD-008 Q5).

## Q4. Ages

- **Like: 16+ only, enforced on the server.** Gate §5.3 item 1 and §2.3 teen mode apply; a like adds to a public number and the founder calls it social. Cost to teens is small: they can still Save. Relief is via counsel on Art. 8 (gate §3.2), not a new rule here.
  - C4.1 `PUT /api/account/likes/<slug>` for an `age_band` of `13-15` returns 403 and writes no row (test with a 13-15 test account). The UI check alone does not pass.
  - C4.2 Under-13 (tab band `under-13`) and anonymous: no Like control is rendered and no sign-up nag (P2.2). 13-15 accounts see no Like control either; no copy mentions "16" or an age (the screen must not teach the cut-off).
  - C4.3 No "turning 16" control is built for this. EDD-008 review Q6's trigger ("a feature differs by band") now fires, but its second condition (the Art. 8 answer) has not; the build waits for it.
- **Anonymous and child viewers may see the count: allow.** It names and shows no person, and fetching it identifies no one (C2.2).
- C4.4 The band is never an input to the count or the like list (gate §4).

## Q5. `s3c:saves:v1` and the merge screen

Allowed under P1.2: slugs and times, in the browser, no server row for an anonymous saver. Conditions:
- C5.1 Anonymous Save issues **0 network requests** (network log, P1.2). The key is not in the beacon and not read by feed order, revisit selection or personalization (P3.3; the engagement-not-ranking test covers it).
- C5.2 The "Keep my history" screen lists saves as **a separate line with its own choice** ("5 saved lessons"), declinable independently of progress (P1.3). Nothing uploads before sign-up completes; local copy stays until the server acknowledges, then `s3c:saves:v1` is removed.
- C5.3 **Server is the source of truth for saves once signed in; no tombstones.** A tombstone would store the fact that a learner unsaved a lesson. Merge is a one-time union at sign-up. When signed in, nothing is written to `s3c:saves:v1`, and sign-out leaves no account saves on the device (shared school devices). Test: sign in, save, sign out, read localStorage.
- C5.4 Server import validates slugs against the catalog and caps count (proposal: 5,000, as progress); unknown keys dropped.
- C5.5 `data-inventory.md` gains `lesson_like`, `lesson_save` and `s3c:saves:v1`, each with reason, owner and deletion path, before merge.

## Data and deletion (applies to all five)

- C6.1 `lesson_like` and `lesson_save` hold exactly `user_id`, `slug`, `created_at_ms`, PK `(user_id, slug)` (schema diff to me before merge; any further column is a block). Unlike and unsave **delete** the row.
- C6.2 Account deletion removes both tables' rows in the same transaction; `tools/db-deletion-check.mjs` counts them and the confirmation names the numbers; the 24-month idle rule covers them. Export lists them (P1.5).
- C6.3 No new beacon event type or field (P6.1, P6.2). No anonymous server id. No notifications about likes or saves (P1.8).

## What must not be built before this ruling (backend-engineer scope)

Building behind flags with counts off is fine, within this record. Do **not** build, or merge if built:
1. Any response, cache or log that exposes a raw count, or distinguishes 0 from 1 to 9 (C2.1, C2.4).
2. A like path that accepts a 13-15 account, or any anonymous like or anonymous server id (C4.1).
3. Tombstones for saves, or any column beyond C6.1 (C5.3, C6.1).
4. Any IP, device or user-agent field or store for abuse handling (C3).
5. Any store or mechanism that persists a per-learner experiment arm for PRD-005 P1. The instrument gap (a new `exp` origin value) is **not ruled here**; it needs its own request to me with the analytics-steward, and the count stays off until then.
6. Any read of like or save tables by feed, personalization, revisit selection or the settings API (PRD rule 2).

## Gate rows by stage

| Stage | Rows that must pass | Evidence |
|---|---|---|
| **Merge to main** (flags off, counts off) | P1.1 (schema diff, inventory updated), P1.2 (anonymous Save 0 requests), P1.4 and P1.5 (deletion and export tests cover both tables), P1.6 (retention stated), P2.2 and P2.3 (C4.1, C4.2), P3.1 and P6.1/P6.2 (no read, no beacon change), P4.1 (C1.1), P7.3; and EDD-008 M1 to M6 still stand. C2 and C3 tests exist and pass against seeded data | tests plus my schema read |
| **Staff preview** (staff addresses, fake data; counts may be on for staff) | the above, plus P1.3 (merge screen with the saves line, C5.2), P1.4 (I run `db-deletion-check` on the preview), P1.5 round trip, P2.1 to P2.3 by walkthrough, P7.1 and P6.2 for the count endpoint (no cookie, no third-party request), C3.1 to C3.4 run on seeded data, count absent on mastery surfaces (Q1.1) | walkthrough plus request log |
| **Go-live, saves and likes** (real learner emails) | EDD-008 G1 to G6; P1.7 (DPAs, still **fail** today, counsel); P7.2 (policy names likes, saves, who can and cannot see them, the 24-hour rule, deletion; I check the facts); P7.6 verdict | verdict file |
| **Go-live, public count** (`LIKE_COUNTS_PUBLIC`) | all of the above, plus: W-1697 M5 reading on file (Q1); named reviewer (C3.3); PRD-005 P1 experiment registered and its instrument gap ruled; counsel flag C1.3 recorded; founder's separate approval | each file linked in the switch's decision record |

## Objections

| # | Objection | Raised by | Answer needed from | Status |
|---|---|---|---|---|
| O1 | I rule under a gate that is proposed and mine; the reduced §5.3 for count-only is my reading, not an accepted text | privacy-reviewer | founder, 10-23 review | open |
| O2 | A public count is engagement shown to learners (X1 spirit); private likes carry less risk | chief-of-staff, growth-designer (carried) | evaluation-steward (W-1697) | open, carried |
| O3 | Dependence on a named human: agents cannot hide a count or answer a parent | privacy-reviewer | founder | open |

## Next moves

1. **evaluation-steward** (W-1697): the three items under Q1.
2. **founder:** name the manipulation reviewer and cover (C3.3); confirm the reduced §5.3 reading (O1); counsel for C1.3 and Art. 8.
3. **backend-engineer:** build to C-conditions; schema diff to me before merge.
4. **analytics-steward:** the P1 arm and the `exp` question, as a request to me.
5. **chief-of-staff:** board items for the above (I did not touch the board).
