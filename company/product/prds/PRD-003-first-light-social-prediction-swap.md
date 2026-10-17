# PRD-003: First Light social for release 1, the "prediction swap" (beyond share links)

owner: growth-designer (Jonah)
date: 2026-10-16
class: product (PRD for a social surface; stored social data, so engineering tier 2)
status: **proposed**. Nothing here is approved. It ships only if every condition in "What ships, and when it does not" holds.
route: growth-designer (this PRD) → privacy-reviewer (privacy gate §5.3, P2.3, P4.3; the beacon field in R12) → principal-engineer (tier-2 EDD, W-1131, written with growth-designer) → analytics-steward (registers the experiment before any build) → head-of-product (scope: does this replace Ruling 2's share-link-only line) → evaluation-steward (AMD-008 M5 reading, Q1.8) → head-of-strategic-initiatives (dates, D-23) → founder (F-26 moderator; the reading of M5 if contested)
changes: **2026-10-16 round 3 (growth-designer, batch first-light/2026-10-16-round-3#B3).** `exp.spacedDays` defined as the schedule step, `REVISIT_SCHEDULE_DAYS[successes before this recall]` (one of 1, 3, 7, 21), not elapsed days, per principal-engineer's C9 finding (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md); worked day-5 example and the `?revisitMinutes` note added. The event's fields and allowed values are unchanged from the privacy ruling (C2); what ships, and when, is unchanged. **2026-10-16 (growth-designer, batch first-light/2026-10-16-round-2#B4).** R12 replaced by the one event definition in the privacy ruling `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md` (conditional pass, C1 to C9), so PRD-003 and PRD-004 no longer disagree on `arm`; the C4 marker rules added to section 9; the P6 row and objection 6 updated. Conformance to a ruling only: what ships, and when, is unchanged.
recorded by: growth-designer
board: W-1127 (this PRD). Related: W-1131 (social tier-2 EDD), F-26 (moderator), F-25 (lawyer)
inputs read: `company/decisions/2026-10-15-founder-first-light-ads-social-back.md`; `company/decisions/2026-10-15-first-light-release-1-scope.md` (Rulings 2 and 4); `company/initiatives/first-light/privacy-gate.md` (§1 P1, P2.3, P4, P6; §5; §7.2; §8); `company/constitution/amendments/AMD-008-first-light-surface-value.md` (M1 to M8, X1, X2); `company/initiatives/first-light/quality-bar.md` (Q1.8, Q2, Q3.4, Q4); `company/engineering/notes/2026-10-15-first-light-reestimate.md` (social row); `company/decisions/2026-10-15-founder-f01-accounts.md`; `src/kit/progress.ts`, `src/kit/types.ts`, `src/kit/Lesson.tsx` (event calls only), `src/components/Feed.tsx` (RevisitCard). Not read: any EDD-008 draft (none on disk).

---

## 1. In one paragraph

Release 1 always ships **share a lesson** (privacy gate P4.2). If, and only if, the founder names a moderator and a cover by **2026-10-30** (F-26), release 1 also ships one social feature, the **prediction swap**. A signed-in learner aged 16 or over sends a friend a lesson with their own first prediction **sealed** inside it. The friend plays the lesson exactly as it is (predict, explore, reveal) and only then sees the sealed prediction. The friend may send their own prediction back with one tap. That is everything: no text, no images, no names, no friend list, no feed of other people, no counts, no scores. The bet is about learning. Seeing that someone you know predicted differently, after you have committed and seen the answer, makes you explain the wrong option to yourself, and that should show up in recall a day or more later. If no moderator is named by 10-30, **release 1 ships share links only**, and this PRD waits for release 2 unchanged.

## 2. What ships, and when it does not

| Condition | Date | If it fails |
|---|---|---|
| Founder names a human moderator **and** a cover, each able to act within 24 hours, and within 1 hour on a report of a child in danger (F-26; privacy gate 5.3 items 6 and 8) | **2026-10-30** | **Share links only (P4.2).** The swap is absent from the release build. No build work starts before this date beyond the EDD draft |
| Tier-2 EDD for the swap's stored data (W-1131) approved by principal-engineer and read by privacy-reviewer | 2026-11-02 (proposed) | Share links only |
| Experiment registered by analytics-steward, predictions as in section 8, committed before any data | before the first build run | No build. Shipping without an experiment is out of my scope |
| Swap feature-complete on a preview (definition in section 11) | **2026-11-06** (proposed pre-declared cut, the same day as challenges) | Share links only. Head-of-strategic-initiatives reports it; this table is the ruling in advance |
| Privacy gate rules P4.3 pass on the swap, with every 5.3 row evidenced | 2026-11-09 (gate ruling date) | Share links only, by the gate, not by a new scope decision |
| Quality bar Q1.8 passes on the release SHA | 2026-11-23 | Swap switched off; Q1.8 becomes "absent" for it |

**Share links (P4.2) ship in every row above,** unless P4.2 itself fails on the release SHA, in which case release 1 has no social at all (release-1 scope record, Ruling 2). The share-link requirements are in section 6 so one document covers both.

## 3. Problem

The founder wants social in release 1 ("Yes i want these back", 2026-10-15). The constraints leave a narrow space: no user text or images (5.3 item 2), no ranking or comparison of people (AMD-008 M5), no streaks or guilt (M2 to M4), 16+ only (5.3 item 1, P2.3), and a mission that counts recall, not visits. Most social mechanics in learning apps (friends lists, leagues, streak-sharing, comments) are either barred here or reward taps rather than remembering. The question this PRD answers: **what is the lightest thing one learner can show another that should make either of them remember more?**

## 4. Options considered (lightest first) and why the swap

| Option | What another learner sees | Serves learning? | Verdict |
|---|---|---|---|
| A. Share a lesson (P4.2) | Nothing about the sender | Only by bringing a new person to a lesson | **Ships in every case.** Not "beyond share links" |
| B. Fixed-list reaction sent back ("surprised me", "knew it") | One enum from the recipient | Weakly. A reaction is a feeling, not a retrieval or an explanation | Rejected: social with moderation cost and no plausible recall effect |
| **C. Prediction swap (sealed, after reveal)** | The other person's **first prediction** on one lesson, after your own reveal | Plausibly. A committed prediction meeting a different one is the core move of peer instruction; here the discussion, if any, happens in the friends' own chat | **Chosen**: the lightest option with a mechanism that points at recall |
| D. Show the friend's prediction **before** your reveal | Same, earlier | Probably more (closer to peer instruction) | Rejected: it lives inside the lesson frame, so it needs a `Lesson.tsx` change (protected), and it anchors the recipient's prediction |
| E. Aggregate "how others predicted" on the reveal | A number from other learners | Possibly | Rejected: a number derived from other learners' data (M5 test), and inside the lesson frame |
| F. Pairs or friend lists with shared progress | A person's progress | No mechanism beyond comparison | Rejected: comparison (M5), a follow graph (5.3 item 3) |
| G. "Explain it to a friend" with free text | Text | Yes (self-explanation) | Rejected for release 1: free text needs pre-moderation (5.3 item 2) |

The mechanism behind C is a hypothesis here, not a claim (pm-handbook rule 4: an idea that worked elsewhere is a hypothesis here). Nothing about it reaches a learner as a factual sentence.

## 5. Users and ages

- **Sender:** a signed-in account in the 16+ band. Teen-mode accounts (13 to 15) and anonymous learners never see a "swap" control (P2.3; 5.3 item 1). They keep share links.
- **Recipient:** the swap shows only to a signed-in 16+ account. **Anyone else who opens a swap link** (anonymous, teen mode, a blocked recipient, a second person after the token is used, an expired token) sees the plain lesson exactly as a share link would show it, with no sealed prediction, no sender trace and no server record of the visit. The age of an anonymous visitor is unknown, so the anonymous path is treated as possibly a child.
- If counsel (F-25) reads GDPR Art. 8 strictly and the floor becomes 16+ everywhere, nothing here changes: the swap is already 16+.

## 6. Requirements

### Share a lesson (ships in every case; P4.2)

- **S1.** A "Share" control outside the lesson frame (on the card chrome and on `/d/<slug>`, not in `Lesson.tsx`) opens the device share sheet (Web Share API) or, where absent, copies the link.
- **S2.** The link is exactly `https://<host>/d/<slug>`: no query string, no fragment, no learner id, no name, no progress, no prediction.
- **S3.** Opening it creates no server record beyond what any page view creates today (the existing anonymous beacon). One static OG image for all lessons (re-estimate §2).
- **S4.** Share text, if any, is the lesson title only. No "I got it right", no score, no count (M2, M4, M5).
- **S5.** Available to every age band that can see the feed, including teen mode (scope record, Ruling 2).

### Prediction swap (only if section 2 holds)

- **R1. Create.** On a lesson the sender has completed, the card chrome (outside `Lesson.tsx`) shows "Swap predictions". It is shown only to signed-in 16+ accounts. Tapping it creates a swap holding the sender's **first** prediction on that lesson (the option index), and opens the share sheet with a link `https://<host>/s/<token>`. The token is random (at least 128 bits), single-use and carries nothing else.
- **R2. Source of the sealed prediction.** The sender's first prediction is read from the signed-in learner's server-side progress if EDD-008 stores the predicted option, otherwise from the `predict` event already in the local event log (`s3c:events:v1`, written by the kit today). If neither exists for that lesson, the control is not shown. **No change to `src/kit/`.** If this turns out to need one, the swap does not ship in release 1.
- **R3. Open.** `/s/<token>` renders the lesson through the same host as `/d/<slug>`, unchanged: predict, explore, reveal, with the kit enforcing the order. Below the lesson frame sits a sealed panel ("A friend's prediction is sealed until you see the answer"). It unlocks only after the recipient's own `reveal` event for that slug in this page. The recipient who has already completed the lesson before sees the panel unlocked at once, labelled "You had already played this", and their own first prediction is the one used.
- **R4. Claim on first eligible open.** The first signed-in 16+ account that reaches the reveal claims the token. After that the token shows the plain lesson to anyone else. The recipient's identity is **not** stored in the swap. Only "claimed" is.
- **R5. What the unlocked panel shows.** "Your prediction: <option text>. Your friend's prediction: <option text>." Nothing else: no right or wrong marks on the friend's option, no "you both", no "you beat", no tally, no history of past swaps, no sender handle or name. The option texts are the lesson's own, already recorded and verified.
- **R6. Swap back (optional).** One button, "Send mine back". It stores the recipient's first prediction option on the swap. The recipient sees "Sent" and nothing more. Not tapping it stores nothing about them.
- **R7. What the sender sees.** On the sender's account view, a list of their **open** swaps only (lesson title, "waiting" or "your friend sent theirs back: <option text>"). No count, no totals, no "swaps sent" figure. A swap disappears from the list when it expires.
- **R8. Limits.** At most **3 open swaps** per sender at a time; a swap expires **14 days** after creation. These are spam limits, not rewards, and no copy mentions them as goals.
- **R9. Report and block** on every unlocked panel and every list row (5.3 item 5; details in section 7). Reasons are a fixed list: "I don't know who sent this", "I'm being sent these when I don't want them", "Something else is wrong with this". No free text.
- **R10. Settings.** A single account setting, "Prediction swaps", default **off** (5.3 item 4: private by default). The opt-in screen says, in one sentence, exactly who sees what: "If you turn this on, people you send a swap to see your first prediction on that lesson, after they see the answer. They do not see your name." Turning it off deletes the learner's open swaps at once.
- **R11. No ads anywhere on `/s/<token>`,** as on `/d/<slug>` (scope record, Ruling 3, rule 6). Routed to head-of-product as an explicit addition to rule 6.
- **R12. Measurement field (privacy ruling 2026-10-16, conditional pass).** When a recipient claims a swap, the swap page writes the origin marker `s3c:origin:v1` = `swap` for that slug (rules in section 9, "Device markers"). When that lesson's first revisit is answered, the recall card sends one extra beacon event, defined outside `src/kit/`, exactly `{type: "exp", exp: "EXP-<n>", origin: "swap" | "challenge" | "none", arm?: "test" | "holdout", slug, correct, spacedDays: 1 | 3 | 7 | 21}`. The server adds `at`. Nothing else is accepted: no token (`/s/<token>` never reaches the beacon, the marker or a log), no sender, recipient, account or challenge id, no counts, no durations, no client timestamps, no free text. In this PRD `origin` is `swap`, and `arm` is absent unless the analytics steward adds a randomised arm. The analytics steward may replace it with any strict subset of these fields without a new privacy read (C3). **`spacedDays` (definition, both PRDs, 2026-10-16 round 3):** `spacedDays` = `REVISIT_SCHEDULE_DAYS[successes before this recall]` (`src/kit/progress.ts`; successes = the lesson's `recalls` with `correct: true`, counted before this answer is appended), so it is always one of 1, 3, 7, 21. It is the schedule step this recall was due on, not the days elapsed since play: the sender must not reuse `RevisitCard`'s `Math.round((now − completedAt) / 86_400_000)` (`src/components/Feed.tsx`, around line 257), which C2 would drop. Worked example: a learner plays a lesson on day 0 and answers its first revisit on day 5; there are no successes before it, so the event sends `spacedDays: 1`, not 5. QA's `?revisitMinutes` shortens the day length that decides when a revisit is due, but it does not change `spacedDays`: a QA run sends the same schedule step a learner would (never 0). Because the event is sent only on a lesson's first revisit, every event these PRDs send carries `spacedDays: 1`; whether to keep the field or drop it as a strict subset (C3) is the analytics steward's call, not this PRD's.
- **R13. Copy.** Every surface string passes the AMD-008 M4 banned-phrase scan. No string states a fact about learning ("Swapping helps you remember" is banned: it is an unverified claim and engagement bait). Any string that does state a fact is a recorded claim (X2, Q3.4).
- **R14. Performance.** The swap page and controls load on demand, outside the feed's entry chunk (re-estimate: new surfaces stay out of first-load JS; Q5.3).

### Non-goals (release 1)

Free text, images, chosen handles, real names, profiles, avatars, friend lists, follows, direct messages, search for people, group swaps, swap counts or histories, "swap of the day", notifications or email about swaps (P1.8: email is sign-in only), reminders, sharing scores or mastery, anything for teen mode or anonymous learners beyond share links, and any learner-to-learner contact channel.

## 7. The privacy gate §5.3 minimums: how each is met

Each row needs evidence the privacy reviewer reads (gate §1, P4.3). The evidence producer is named; nothing is evidenced yet.

| 5.3 item | Minimum | How the swap meets it | Evidence and producer |
|---|---|---|---|
| 1 | 16+ accounts only; teen mode and the under-13 anonymous path never see it | Control (R1) and panel (R3) render only for a signed-in account whose stored band is 16+. Every other visitor gets the plain lesson (section 5). Age band is read as a feature switch, not a profile input (gate §4) | Two scripts (band 14, anonymous) show 0 swap elements and 0 server rows: backend-engineer, qa-tester (Q1.8) |
| 2 | No free text and no images; reactions from a fixed list or nothing | The only content one learner shows another is an option index from the lesson's own fixed options (R5, R6). Report reasons are a fixed list (R9) | Schema read: no text or blob column in the swap tables: privacy-reviewer reads EDD W-1131 |
| 3 | No direct messages, no search by name, no follow graph visible to others; handles generated, never chosen; no real-name field | No handles at all: the sender is "your friend", the recipient is not stored (R4). No graph exists: a swap is a one-off token. No message channel | Schema read and UI walk: privacy-reviewer, qa-tester |
| 4 | Private by default; explicit opt-in that says who sees what; opting out removes at once; no progress shown without opt-in | R10: off by default, one-sentence opt-in, off deletes open swaps immediately. The recipient's prediction leaves their browser only if they tap "Send mine back" (R6). No progress or mastery is ever shown | Q1.8 two-account script (0 cross-account leaks); opt-out script (0 rows after toggle): qa-tester, backend-engineer |
| 5 | Report on every item, block, stored report record, receipt confirmed | R9 on every panel and list row. Block: the blocker's account stores the blocked sender's user id; future swaps from that sender open as plain lessons for the blocker, and the sender is not told. Report record: `{swap token, reason enum, created_at}`; the swap is hidden at once pending review. Receipt: "Reported. A person will look at this within 24 hours." (a claim about our process, recorded as a claim and true only while F-26 holds) | Report and block scripts; report table read: backend-engineer, privacy-reviewer |
| 6 | Takedown within 24 h, within 1 h for a child in danger; a named person for each | The moderator queue lists reports with the swap's lesson and option (no free text exists, so review is short). Takedown deletes the swap and, on a child-safety report, suspends the sender's swap permission. Named persons: the F-26 moderator and cover | Runbook entry naming both, with response times: founder names; principal-engineer-ops writes the runbook (gate P7.5) |
| 7 | A written child-safety procedure; lawyer writes or approves the reporting duties | A short procedure: preserve the report record, remove the swap, suspend the sender's swaps, who is told, who may look. Reporting duties to authorities: **lawyer** (F-25) | Procedure file under `company/initiatives/first-light/privacy/`: privacy-reviewer drafts the non-legal half; lawyer the duties |
| 8 | A named human moderator with reserved time, and a cover, named by the founder | **F-26, open.** Without both names by 10-30, the swap does not ship (section 2) | Founder's record: founder |
| 9 | Deletion removes social items too (P1.4) | Account deletion deletes the learner's swaps (sent), their swap-backs, their block list and their reports' link to them. Retention: every swap row is deleted 30 days after creation at the latest, claimed or not; report records 90 days unless a child-safety report requires preservation (lawyer) | P1.4 query script over the swap tables: privacy-reviewer runs it |

Other gate rows this touches:

| Row | How it is met |
|---|---|
| **P2.3** (no social for 13 to 15) | Unchanged and enforced as in 5.3 item 1. Teen mode keeps share links (P4.2), which are not social (§5.2) |
| **P4.1** (nothing that shows a learner to another) | Superseded for the swap only by P4.3, on the founder's 2026-10-15 decision. Everything else P4.1 lists stays at 0 |
| **P4.2** (share a lesson) | Section 6, S1 to S5 |
| **P4.3** (5.3 plus a named moderator) | This section, plus F-26 |
| **P1.2** (anonymous means local) | Opening `/s/<token>` anonymously reads the token and writes nothing |
| **P6.1, P6.2** (beacon fields, no identifier) | R12 adds one event type with no identifier. Ruled 2026-10-16: conditional pass, C1 to C9 (`company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`); C1 (route.ts allow-list for every type) blocks the event until it lands |
| **Q1.8** (quality) | Works logged-out (plain lesson) and logged-in; 0 cross-account leaks over the 2-account script; the report path works |

## 8. Committed prediction (about learning)

Registered by analytics-steward as an experiment before any build (board ask 3). The prediction is fixed here, before any data.

- **Metric:** Surface Value #4, first spaced-revisit recall (the lesson's own recall question, answered correctly, at its first scheduled revisit, 1 day or more later).
- **Groups:** signed-in 16+ learners who first played a lesson by claiming a swap (origin "swap"), against the same lessons first played from the feed or `/d/<slug>` by signed-in 16+ learners (origin "none").
- **Prediction:** swap recall is **at least 4 points higher** than the comparison on the same lessons. Within swaps, recipients whose prediction differed from the sealed one recall **at least 6 points higher** than the comparison.
- **Guardrail (Surface Value #5):** prediction-to-reveal completion on `/s/<token>` is not lower than on `/d/<slug>` by 3 points or more. The sealed panel must not tempt people to skip to the reveal.
- **would_be_wrong_if:** with at least 150 first-revisit recalls in the swap group, the difference is below +2 points (no learning benefit worth a moderator), or the swap group recalls 3 points or more **below** the comparison (harm: switched off at once).
- **Not success measures:** swaps sent, swaps claimed, swap-backs, return visits, sessions. They are reported as engagement, labelled as such (AMD-008 X1), and never used to keep the feature.
- **If the 150 recalls are not reached within 30 days of launch:** the result is "unresolved". The feature is not kept by default. Head-of-product decides at the first distillation (AMD-008 X3) whether to keep, run longer, or remove it, and engagement numbers are not an argument there.
- **My confidence:** about 35% that the +4 points holds; about 80% that it is not harmful. Selection is the main threat: people who receive swaps from friends may differ from feed learners. The analytics steward may add a randomised arm (for example, half of claimed swaps keep the panel sealed for good) if traffic allows.

## 9. Data (for the tier-2 EDD, W-1131)

Proposed, smallest set. The EDD may propose less; it may not propose more without the privacy reviewer.

| Table | Fields | Retention |
|---|---|---|
| `swap` | `token` (random), `sender_user_id`, `slug`, `sender_option` (int), `created_at`, `expires_at`, `claimed` (bool), `back_option` (int, nullable), `hidden` (bool) | Deleted at 30 days after creation, at account deletion, or at opt-out |
| `swap_block` | `blocker_user_id`, `blocked_user_id`, `created_at` | Deleted with either account |
| `swap_report` | `token`, `reason` (enum), `created_at`, `state` (enum) | 90 days, unless preserved under the child-safety procedure (lawyer) |

No recipient user id, no IP, no device, no user agent, no free text. The beacon event in R12 is not stored with any of these.

### Device markers and the beacon event (privacy ruling C4, data inventory D5)

Ruled in `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md` (conditional pass, C1 to C9; the gate it applies is itself proposed until the founder's 10-23 review). The same rules hold in PRD-003 and PRD-004; the analytics steward owns the markers, growth-designer specifies them, a platform builder builds them.

- **`s3c:origin:v1`** holds, per slug, the origin **enum only** (`swap` or `challenge`). Never a token, a sender, a link or a timestamp from the swap or the challenge. It is removed for a slug once that lesson's first revisit has been answered, and in any case 30 days after it was written.
- **The arm** (PRD-004's random 20% holdout, not used by this PRD unless the analytics steward adds a randomised arm): one key holding the enum `test` or `holdout`, written once, removed when the experiment closes. It is the only marker value allowed to persist beyond one lesson. It leaves the device only as the `arm` enum on the `exp` event, never on any other event and never with the account.
- **Never uploaded or exported:** neither marker is uploaded by the account merge (EDD-008 §8 uploads the progress map only), neither is in the account export, and neither is read by any personalization rule (P3.2). Deleting the account does not touch them; "also clear this device" does.
- **Never in `s3c:events:v1`:** neither marker is written to the local event log, and the `exp` event is not stored locally at all.
- **Shared devices:** the origin marker shows the next user of the browser that a learner opened a friend's swap or a challenge. The privacy reviewer accepts this as the cost of measuring, and the data inventory (D5) says so.
- **The event** is the one definition in R12. It is sent only when a marker or an arm exists for that browser (C3, the analytics steward's call); the server accepts it only after C1 and C2 land and the experiment is on the server's registered list; it obeys the global kill switch, GPC and DNT, and has its own off switch (C8); raw rows are kept at most 90 days (C7) and analysed only as aggregates, never joined to account, swap or report tables (C6).

## 10. AMD-008 (proposed) check

| Rule | How the swap stays inside it |
|---|---|
| M1 | A swap gives no mastery credit. Only the lesson's own reveal and its recall count, as for any lesson |
| M2, M3, M4 | No counts across days, no countdown, no expiry message ("expires in 2 days" is not shown; an expired swap just disappears), banned-phrase scan on every string |
| **M5** | No points, scores or ranks; no number derived from another learner; no right/wrong mark on the friend's option. **Open reading:** showing a friend's option after the reveal lets a learner infer who was right. I read M5 as banning ranking and scores, not the sight of one chosen friend's answer. The evaluation-steward should rule on that reading before AMD-FL-B; if M5 is read to ban it, the swap does not ship and release 1 is share links only |
| M6 | The lesson inside a swap is the unchanged lesson; predict-before-reveal is enforced by the kit |
| M8 | No reminders and no notifications about swaps |
| X1 | Engagement is reported, labelled, never a success measure (section 8) |
| X2 | Option texts are existing verified lesson claims; any new factual string is recorded |

## 11. "Feature-complete on a preview" (the 11-06 line)

On a Vercel preview of a branch with the swap behind a flag: R1 to R10 work end to end with two test accounts (16+), a 14-year-old test account and an anonymous context; the report and block flows store and hide; the opt-out deletes; the account deletion script removes every swap row; and the R12 event fires with no identifier. Anything short of that on 11-06 means share links only.

## 12. Cost and dates

- **Cost (estimate, low confidence):** on top of share links (about 0.50M, 6 runs): the EDD (2 runs), about 4 code runs, 1 fix, 1 PE, 3 privacy, and the quality bar's about 9 runs for social (quality-bar.md §3). Roughly 2.0M to 2.5M tokens. The principal engineer's re-estimate (W-908) owns the real figure.
- **Dates:** F-26 by 10-30; EDD approved by 11-02; feature-complete by 11-06; privacy ruling 11-09; round-1 reviews 11-10 to 11-12; T-7 dry run 11-16; verdict 11-23. The date and cut order are head-of-strategic-initiatives' to propose.

## 13. Rollout

Preview only, behind a flag (off by default) until the privacy gate passes P4.3. In production, the setting stays default off for every learner (R10). Kill switch: one flag turns the swap off, and all `/s/<token>` links then render the plain lesson (they degrade into share links). Rollback deletes nothing that the retention rule would not delete anyway.

## 14. Open questions for the founder

1. **F-26:** will you name a moderator and a cover by **2026-10-30**? If not, release 1 ships share links only and this PRD waits for release 2. The swap is designed so that the queue should be tiny (no free text, no images), but the gate needs the names either way.
2. **Is "light social" satisfied by the swap?** It is deliberately small: one learner sees one friend's prediction on one lesson. If you meant friends, profiles or anything with a list of people, that is outside what the gate and AMD-008 allow in release 1, and it should be said now rather than at review.
3. **Lawyer (F-25):** the child-safety reporting duties (5.3 item 7) and report-record preservation need counsel before 11-09.

## 15. Board asks (for the caller to file; I did not edit board.json)

1. **founder:** F-26, by 2026-10-30 (already in the inbox).
2. **privacy-reviewer:** read this PRD against §5.3, P2.3 and P4.3, and the R12 beacon field against P6.1 and P6.2.
3. **analytics-steward:** register the experiment in section 8 (EXP-<n>), with the comparison, the 150-recall threshold and the guardrail, before any build run.
4. **principal-engineer + growth-designer:** the tier-2 EDD (W-1131) on section 9, by 2026-11-02, started only once F-26 is answered (or drafted now at low cost, if head-of-strategic-initiatives prefers that risk).
5. **evaluation-steward:** rule on the M5 reading in section 10 before AMD-FL-B.
6. **head-of-product:** amend Ruling 2 to name the swap as the only social beyond share links in release 1 (conditional on section 2), and add `/s/<token>` to the no-ad pages in rule 6.
7. **head-of-strategic-initiatives:** add the swap's dates and the 11-06 line to D-23, and the 10-30 F-26 dependency.
8. **platform-engineer:** the share-link spec (S1 to S5) is ready to build now; it does not depend on F-26.

## Addendum (2026-10-17): likes and saves are specified in PRD-005

The founder decided on 2026-10-17 (`company/decisions/2026-10-17-founder-accounts-likes-saves.md`) that accounts, server progress, likes with a public count and private saves come first. They are specified in `company/product/prds/PRD-005-likes-and-saves.md` (proposed), not here. Nothing in this PRD changes. The swap still shows no counts, and its non-goals stand for the swap. Note the tension that PRD-005 carries openly: option B in section 4 rejected a fixed-list reaction for the swap because it had no plausible recall effect. PRD-005 does not claim one for likes either. Its committed prediction is "no harm to learning, and popularity is not recall", and it keeps counts out of every ranking path, with a test.

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | Social before there are learners to be social. At launch there are few learners, so few swaps, and the 150-recall threshold may not be reached for months. | growth-designer (my role's own failure mode) | **Held, and answered by design.** The founder decided social is in release 1. This PRD makes the feature as cheap and as reversible as possible, makes "unresolved" not mean "kept", and makes share links the default outcome. My view on record: share links alone would be the better release 1 |
| 2 | There is no named human moderator. A report button nobody reads is worse than no social. | privacy-reviewer (gate §5.1), head-of-product | **Open; blocks the swap.** Section 2: without F-26 by 10-30, share links only |
| 3 | Stored social data is tier 2, needs its own EDD and "does not fit 11-30"; about 9 quality runs and 3 privacy runs. | principal-engineer, privacy-reviewer | **Open.** Section 9 is the smallest data set I could find (three tables, no text, no recipient id). The 11-06 line in section 11 is the pre-declared cut. The date is head-of-strategic-initiatives' |
| 4 | "Light" social could include comparison. Seeing a friend's option lets a learner infer who was right. | head-of-product, AMD-008 M5 | **Open, routed.** No scores, ranks, tallies or right/wrong marks (R5, R7). The reading is the evaluation-steward's (board ask 5); if it goes against the swap, release 1 is share links only |
| 5 | The prediction may be confounded: people who get swaps from friends differ from feed learners. | growth-designer (anticipating analytics-steward) | **Accepted as a limit.** Stated in section 8 with my confidence; the analytics steward may add a randomised arm |
| 6 | The R12 beacon event adds a field to the event stream, which the gate keeps minimal. | growth-designer (anticipating privacy-reviewer) | **Answered by the privacy reviewer, 2026-10-16: conditional pass, C1 to C9** (`company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`, objection 1). R12 and section 9 now follow her definition and C4. Still open on the route: C1 and C2 (backend-engineer), C3 (analytics-steward), C9 (principal-engineer). The ruling is not a pass on the swap itself |

## What would make this PRD wrong

- The founder names a moderator but meant richer social than one sealed prediction (question 2). Then a new PRD is needed, and its dates are re-estimated.
- The sealed prediction cannot be read without a `src/kit/` change (R2). Then the swap does not ship in release 1.
- Real swaps show the guardrail firing (people skip to the reveal to unseal). Then the panel design is wrong, not just the prediction.
