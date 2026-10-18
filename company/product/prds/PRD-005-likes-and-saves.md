# PRD-005: Likes (public count) and saves (private), an addendum to PRD-003

owner: growth-designer (Jonah)
date: 2026-10-17
class: product (social surface with stored data: engineering tier 2, on top of EDD-008)
status: **proposed**. Nothing here is approved. Likes need the privacy-reviewer's ruling (gate P4.3, §5.3) before any build; the public count has its own switch and its own ruling.
route: growth-designer (this) → privacy-reviewer (count, threshold, abuse, ages, §5.3) → analytics-steward (registers the experiment in §4 before any build) → backend-engineer (EDD-008 rebuild + like/save addendum, API in §6) → principal-engineer (tier-2 review) → platform-engineer (card chrome) → evaluation-steward (AMD-008 M5 reading, §6 Q1) → founder (every deploy)
decision: `company/decisions/2026-10-17-founder-accounts-likes-saves.md` (likes public, saves private; objections answered there are carried in §3)
inputs read: that decision; `company/product/surface-value.md`; PRD-003; `company/initiatives/first-light/privacy-gate.md` (§2.2, P1, P2, P4, P6, §5.3); `company/engineering/edd/EDD-008-accounts-and-server-progress.md` (§6, §7, §9); AMD-008 (M1 to M5, X1); `src/components/DemoCard.tsx`; `src/lib/feed-index.ts`

## 1. What the learner sees and does

- **Controls.** Two buttons in the card footer (`card-foot` in `src/components/DemoCard.tsx`, beside "Why trust this?") and on `/d/<slug>`: **Save** (bookmark) and **Like** (heart). Nothing inside the lesson frame; `src/kit/Lesson.tsx` is untouched. Both are visible from the first card, so a learner can save before playing.
- **Anonymous learner.** Save works and is stored **only in the browser** (new key `s3c:saves:v1`, slugs and times; P1.2). Like needs an account so each like counts once: tapping it opens a one-line sheet ("Likes need an account, so each person counts once.") with "Keep my history" and "Not now". "Not now" closes it for the rest of the tab; it never reappears unprompted. If the tab's age screen said under 13 (`s3c:ageband:session`), the Like button is not rendered at all (P2.2: no sign-up nag).
- **Signed in.** Save and Like are stored on the account (§3). Teen mode (13 to 15): Save yes; Like **proposed 16+ only** (privacy-reviewer decides, §6 Q4).
- **Lists.** "Saved" and "Liked" sit in the account view (anonymous: "Saved" only, from the feed menu). Each row is the lesson title and subject, newest first, with Open and Remove. No counts in the lists (not the lesson's, not "you saved 12"), no sort by popularity, no "due" or reproach copy.
- **Public count.** Next to the heart, a lesson shows how many accounts liked it, in coarse steps: **hidden below 10** (heart only, no number and no "be the first"), then "10+", "25+", "50+", "100+", "250+", "1k+". Proposed threshold 10 and bucketing, so one person's like cannot be inferred by watching a number move; privacy-reviewer sets both. Your own like shows as a filled heart and never as "you and 11 others".
- **Undo, always.** Each control is a toggle; a second tap undoes it at once. Remove in a list shows "Removed. Undo" for 5 seconds.

## 2. Rules that make it System 3

1. **Counts are display-only.** No like count, like row or save is read by feed order (`feedOrder`/`feedPage` in `src/lib/feed-index.ts`), revisit selection, personalization, recommendations, mastery (M1) or anything that chooses what to build (curriculum maps, the company CLI, the WBR's lesson tables). Counts are fetched by the card after render from their own endpoint, so the statically generated feed pages cannot depend on them.
2. **The test that proves it** (backend-engineer writes; qa-tester cites): `tests/platform/engagement-not-ranking.test.mjs`. (a) `feedOrder("all")` and every domain's `feedOrder(X)` are byte-identical with the like and save tables empty and seeded with random counts. (b) An import-graph and identifier scan over `src/lib/`, `src/app/api/feed/`, `tools/` and `content/`: no module outside the like/save API routes and the card's count component imports the like/save store or names `lesson_like`, `lesson_save` or the count endpoint. Any new reader fails CI until a decision record allows it.
3. **One like per account**, enforced by the primary key `(user_id, slug)`; no anonymous likes.
4. **No notifications** about likes or saves (P1.8: email is sign-in only), **no streaks or totals** (M2, M4), **no leaderboards, "most liked", "trending" or sort by likes** (M5), no mastery credit (M1), no sharing of likes.
5. **Copy** passes the M4 scan; no string states a fact about learning ("Saving helps you remember" is banned). The count is a number, not a claim about quality, and the card says nothing like "popular".

## 3. Data, retention, deletion, export

| Table | Fields (minimum) | Not stored | Retention |
|---|---|---|---|
| `lesson_like` | `user_id`, `slug`, `created_at_ms`; PK `(user_id, slug)` | anything else: no device, no IP, no source card, no position in the feed | while the like stands; unlike **deletes** the row (no soft delete) |
| `lesson_save` | `user_id`, `slug`, `created_at_ms`; PK `(user_id, slug)` | same | while saved; unsave deletes the row |
| `s3c:saves:v1` (browser, anonymous) | `{slug: savedAt}` | | until removed or site data cleared; offered in "Keep my history" (listed on the merge screen, P1.3) |

- The public count is computed from `lesson_like` rows (or a cache rebuilt from them), never stored per learner. Unlike and account deletion decrement it because the rows are gone.
- **Account deletion** (EDD-008 §7) adds `DELETE FROM lesson_like` and `DELETE FROM lesson_save WHERE user_id = $1` to the transaction; the confirmation names them ("12 likes, 5 saves"); `tools/db-deletion-check.mjs` counts both tables. The 24-month inactivity rule (P1.6) covers them.
- **Export** (EDD-008 §9) adds `"likes": [{"slug","at"}]` and `"saves": [{"slug","at"}]`; import restores saves locally; likes re-import only to an account.
- **Beacon:** nothing. Likes and saves add no event type and no field to `/api/events` (P6.1, P6.2).

## 4. Committed prediction (registered by analytics-steward before any build)

Likes and saves are not built to teach; the bet is that they **do no harm to learning** and that popularity is **not** a stand-in for being remembered, which is why counts never rank.

- **P1 (harm guardrail, public count).** Arms by lesson (analytics-steward may choose per-page-load randomisation instead): counts shown versus counts hidden, crossing over after 4 weeks. Prediction → reveal completion (Surface Value #5) and first-revisit recall (#4) in the shown arm are within 3 points of the hidden arm. **would_be_wrong_if:** either is 3 or more points lower with counts shown (at least 150 first-revisit recalls per arm). Then the public count is switched off and the finding goes to the founder.
- **P2 (popularity is not recall).** Over lessons with at least 30 first-revisit recalls and at least 10 likes, the rank correlation between likes per completion and first-revisit recall rate is **below 0.3**. **would_be_wrong_if:** it is 0.3 or more. Even then counts stay out of ranking; the result is reported to head-of-product, not acted on in code.
- **P3 (saves).** I predict no recall difference (within 2 points) between saved and unsaved lessons for the same learners. Learners choose what to save, so this is descriptive, not causal.
- **Not success measures:** likes, saves, like rate, return visits. The analytics-steward may report them in the WBR **labelled as engagement** (AMD-008 X1), as totals and distributions only, never as a per-lesson ranked table.
- **Instrument gap:** the arm must reach the recall data without an identifier. The `exp` event (privacy ruling `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`) has no value for this arm; analytics-steward and privacy-reviewer decide whether a new `origin` value is allowed. Until then P1 cannot be read and the public count stays off (the founder's separate switch).
- **My confidence:** about 70% that P1 holds (no harm); about 65% that P2 holds.

## 5. Switches and rollout

`LIKES_SAVES_ENABLED` (controls and lists) and `LIKE_COUNTS_PUBLIC` (the number), both run-time, default off. Saves can ship with accounts; likes ship hidden-count first; the count switches on only after the privacy ruling and with the experiment live.

## 6. Open questions

**For privacy-reviewer**
1. Is a public aggregate count "a number derived from other learners' data" under AMD-008 M5 (a lesson card is not a mastery surface) and does it need §5.3 in full (moderator, report, block) when it carries no text, names or contact? Route the M5 reading to evaluation-steward.
2. Threshold and buckets: I propose hidden below 10, then 10+/25+/50+/100+/250+/1k+. Is exact display above some higher number acceptable?
3. Abuse and duplicates: one like per account stops repeats, not account farming. Is the magic-link rate limit plus coarse buckets enough, or should likes from accounts younger than, say, 24 hours be excluded from the count? Who reviews a suspected manipulation, and does a count ever get frozen?
4. Ages: may teen-mode (13 to 15) accounts like (they add to a public number but are not shown), or 16+ only (my proposal)? Is the count shown to anonymous visitors who may be children (my proposal: yes, it shows no person)?
5. Is the new browser key `s3c:saves:v1` acceptable under P1.2, and should the merge screen list saves as a separate line?

**For backend-engineer**
1. API shape: `PUT`/`DELETE /api/account/likes/<slug>` and `/api/account/saves/<slug>` (idempotent, under the cookie scope of ADR-008); `GET /api/account/likes` and `/saves` for the lists; public `GET /api/likes/counts?slugs=…` returning bucket labels only, never raw counts below the threshold, cacheable, no cookie.
2. Saves sync: EDD-008's merge is a union and never deletes, which would resurrect an unsaved lesson. Tombstones with times, or the server as source of truth for saves when signed in?
3. Count: `COUNT(*)` per slug with a cache, or a counter column kept by trigger? Either way it must decrement inside the deletion transaction.
4. Does the personalization lane's settings API (`origin/perso-m1`) need anything from these tables? It must not read them (rule 2).

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | A public count is engagement shown to learners and pulls toward popularity | chief-of-staff (decision record) | **Held, answered by rule 2 and its test**, bucketed display, no sort or "trending", and P2. My view on record: private likes would serve the mission as well with less risk; the founder decided public |
| 2 | Public counts invite fake likes and need a child-safety answer | chief-of-staff | **Open, routed** to privacy-reviewer (Q3, Q4); count stays off until ruled |
| 3 | Social before there are learners: with few accounts most lessons sit below 10 for months, so the count is mostly invisible | growth-designer (my role's failure mode) | **Accepted.** That is the threshold working; the experiment may be unresolved for a long time, and unresolved does not mean kept |
