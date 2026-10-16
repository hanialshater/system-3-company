# Operational readiness: lh-content-patch-r2-b4

change: Life Hacks content patch r2 section 1 (W1, W2, W9 + FC52/FC38 disputes) applied to 33 merged lessons: spec text in studyCatalog.ts, home-lessons.ts and resource-specs.json; two W2 Home lessons moved to engine 2; two chip labels in RetrievalLesson.tsx; W2 inventory lines in tests/lifehacks
change-tier: 2
paths: src/lib/lifehacks/studyCatalog.ts, src/lib/lifehacks/home-lessons.ts, src/lib/lifehacks/resource-specs.json, src/components/lifehacks/RetrievalLesson.tsx, tests/lifehacks/engines-v2.test.mjs, tests/lifehacks/home-v2.test.mjs (W2 inventory and ratchet lines only), src/demos/lifehacks/*/meta.json (33 lessons)
author: demo-builder
board: W-1179, W-1106, W-755, W-1118, W-1109; no new item placed by me
risks: none proposed (see 7)
links: batch item company/ops/dispatch-requests/2026-10-16-r2-lifehacks.md#B4; patch company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1; branch lhfix-r2, commit 483a52b (code, specs, metas, tests) and the commit that adds this file

Tier 2 because paths.json classes src/lib/lifehacks/** and src/components/lifehacks/** as shared-engine. **The author does not approve it; principal-engineer-ops does. Do not merge lhfix-r2 before that.** Approval would cover code and tests, not publishing: every changed claim is unverified.

## What changed in shared code

| Change | Who else it touches | Why |
|---|---|---|
| Spec text (title, hook, question, options, answer, idea, formula) for 21 Study, 11 Home and 1 Resource entries | Only the named lessons: each edit replaces fields of one entry (the apply script asserted every old value against disk first) | The patch rows |
| `towel-thickness-hidden-volume`, `care-label-first-choice`: `engine: 2` plus modeLabels, options, amounts, resultLabel, (resultUnit), plainNumbers, revealLine | Only these two specs. home-models.ts is **not changed**: both use their existing cases (`area-volume`, `label-rule`) | The patch's new options cannot be v1 default options (button labels) |
| RetrievalLesson.tsx `FeedbackStage` chips: "Count only" / "Marked" → "First try, count only" / "First try, marked" | Rendered only for `retrieval.kind === "feedback"`: 1 catalog entry (keep-the-error-feedback). Counted with grep on studyCatalog.ts | FC52 c3 dispute, words fix |
| tests/lifehacks: the two slugs added to `R11_WAVES_HOME.W2` (engines-v2) and to the W2 every-step ratchet (home-v2) | Tests only; the fix plan's W2 table lists both slugs, which the inventory test checks | The inventory is exact on purpose; moving a lesson is acknowledged there (the W3 precedent; the W3 approval ruled tests/lifehacks is builder-owned) |
| engine-v2.ts, home-models.ts, HomeLesson.tsx, StudyLesson.tsx | **Not changed** | |

## The check

1. **What can fail.** (a) A new option list whose `answer` is out of range or points at the wrong option: each answer was set from the patch and checked against the engine's own run (unlock 42/32, batch-by-setup 19/17, do-not-starve late at 35 vs due 25, reserve done by 60/70, fixed charge €14, towel 10 → 5 cm² per cm³, care label 0 of 3). (b) A v2 move with a malformed reveal at some slider value: both lessons are now in the every-step ratchet (no raw token, no NaN, no trailing-zero cells). (c) Worst case: a learner is marked wrong on a correct answer. Learners would see it; no data is touched.
2. **How we would know.** `npm run test:lifehacks` (120/120 on 483a52b), `npm run check` (passed), and the QA contract on a release build: 33 touched lessons × phone/desktop all passed (74 passed; 2 feed.spec failures are an artifact of QA_ONLY, since that test filters against the QA_ONLY subset; feed.spec alone without QA_ONLY: 10/10). Fact-checker re-verifies the 42 reset claims (`npm run -s company -- claims --open` lists all 42).
3. **How to roll back.** `git revert` the B4 commits on the integration branch; minutes, no data, no founder needed (no deploy involved).
4. **Capacity.** One `next build` (exit 0, no OOM), one QA run with 2 workers on port 4051, a 30-second screenshot server on 4051 stopped by its pid group. Dist dir `.next-lhfix` deleted. No new process left running.
5. **Security.** None: no routes, scripts, query parameters or secrets.
6. **Data.** None: no learner data, no event shape.
7. **Risks.** None proposed. Open items stay as routed rows (below), not risks.

## Rows not applied (the author's stops)

- **laundry-gap-air-path** (whole row): needs a count-as-slider model (gap = (60 − 8n)/(n − 1)), which is a new or changed case in home-models.ts, i.e. a shared Home engine change. Stopped per the dispatch.
- **garment-overlap-hides-face slider** (TP-2(c)): hiding it breaks the W2 ratchet ("keeps its slider"); driving B needs a model change. Neither is specified.
- **drying-room-water-load singular** ("1 shirt"): needs plural support in engine-v2.ts revealLine tokens.
- **reserve-an-unassigned-slot free-slot label**: the v1 calendar cannot label a free gap without a StudyLesson.tsx change. The patch allows leaving it unlabelled.

## Approval (tier 2; written by principal-engineer-ops)
- Decision: **approved with conditions** for the code and tests at 483a52b/90a3abb by principal-engineer-ops (copied by chief-of-staff at merge, 2026-10-16). Does not cover publishing (42 claims unverified) or the four rows not applied. Authority: `company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4-approval.md` (3523e83).

(empty: awaiting principal-engineer-ops)
