# Closeout ruling (F-46, founder 2026-10-16): every unfinished lesson pushed, fixed once, or retired

owner: head-of-product (Priya) · date: 2026-10-16 · board: W-1483 (doing) · slot: hop-f46-closeout-r6
decisions: F-46 `company/decisions/2026-10-16-founder-catalog-closeout.md` (items 1-8); plan `company/product/2026-10-16-catalog-closeout.md` (rules 1-7, batches, dates; still in force where this ruling does not change it)
founder, 2026-10-16, relayed in the dispatch for this run: "fire on all cylinders, get all demos done as much as possible or retired (archived for later)"
snapshot: main `cdee168c` (after PR #5, 100 Books drafts). 364 lessons: **235 review + 129 draft** (194 Life Hacks, 106 Books, 64 others). Launch review held in the same run: `company/rituals/records/2026-10-16-launch-review.md` (r6).

## The ruling in one table

| Ruling | Meaning | Count | Outside Life Hacks and Books | Life Hacks | Books |
|---|---|---|---|---|---|
| **(a) push** | No build. The named gate (a check, a hold lift, a status flip or a launch review) is what is left, and the named role owns it. | **140** | 54 | 86 | 0 |
| **(b) fix once** | One builder round on the latest blocking finding, then its checks, then publish or retire (F-46 item 1; plan rules 1-2). | **87** | 9 | 78 | 0 |
| **(c) retire** | Archive for later, with a retirement note (F-46 items 7-8). Each one has a date, and some have a condition that can save them. | **137** | 1 | 30 | 106 |
| | **Total** | **364** | **64** | **194** | **106** |

**Retired in this run: none**, and on purpose. Retirement is `status: "retired"` in `meta.json` (`tools/company.mjs` accepts the status; `src/app/d/[slug]/page.tsx` returns 404 for it; coverage ignores it; the files stay). There is no CLI command for it. F-46 item 7 is a founder rule: "No lesson is retired without a retirement note at `company/reviews/<slug>/retirement.md`, written by the category manager who retires it (head-of-product checks it)." No such note exists today (`find company/reviews -name retirement.md` finds only the template). So product may not flip any status in this run, and neither may the release-manager. The 137 are retired by their CMs on the dates below, with the status command in the plan ("The status change"), once I have checked each note. The register is `company/product/retired-lessons.md`, created in this run with no rows.

Expected end state if every check runs and every round fails: 137 retired and 227 still to settle by publish or retire. If the founder answers F1/F2 by 10-19 18:00, the 106 Books move from (c) to (a). If cm-lifehacks argues for parked lessons by 10-18, those move from (c) to (b) or (a).

## What would make a line here untrue

- A count changes because a status, version, verdict, claim, QA record or hold changed. Rebuild with the method in the plan's "How to rebuild the ledger". The tables are a snapshot taken at `cdee168c`.
- A lesson ruled (b) gets a second build, or a lesson ruled (a) gets any build without a new ruling from me.
- A lesson ruled (c) changes status without a CM note I have checked, or without a row in `company/product/retired-lessons.md`.
- A deadline passes (10-20 outside Life Hacks, 10-23 Life Hacks) and a lesson is neither published nor retired.

## What this ruling adds to the plan (product scope, mine)

1. **Stuck rule (founder's "more than 2 fix rounds").** "Stuck" means the lesson got a revise verdict on three or more distinct versions; each revise was followed by a rebuild. Thirteen are stuck, all outside Life Hacks (none in Life Hacks is).
   - The **11 stuck path-W lessons** (penalty-on-wiggle, hailstone-27-climbs, one-road-cuts-the-map, range-min-in-four-nodes, selfish-routes-cost-a-third-more, outside-option-sets-the-split, two-bets-split, continental-jigsaw, enemies-allow-three-camps, no-fraction-fits, throw-it-fast-enough) get **the walk and nothing else**. Launch → checks → publish. Revise → retire, **with no fallback round**, even when the finding is new. This tightens plan rule 3 for these lessons only. Their current versions are already the third to sixth attempt, so a fallback round would be a fifth or seventh.
   - The **2 stuck path-F lessons** (karatsuba-three-not-four, patience-wins-the-split) keep their one round, because each blocking finding is mechanical rather than about teaching: a reveal crop at 390×844, and an exploreHint that names the unlock actions. If the re-walk says revise, they retire. No exceptions.
   - I did not retire the stuck lessons outright. A walk costs one lane-10 slot, a retirement note costs a CM run, and some of these were one trim away at their last review (no-fraction-fits r8: "A trim, not a redesign").
2. **Books, 106 (6 originals + 100 from PR #5): (c) retire on 10-20, unless the founder answers F1 (a book source) and F2 (legal read) by 10-19 18:00.** Every Books lesson carries book-attribution claims (467 of 467 claims in the 100 are unverified). No host here can open a book (`company/decisions/2026-10-14-books-big-ideas-strategy-review.md`). So these are "claims that cannot be verified with available sources", and no fix round can change that. My PR #5 ruling already called the 100 "a parked prototype bank … with no automatic promotion" (`company/product/verticals/2026-10-16-books-100-pr-ruling.md`). Retiring them is how that bank gets archived, visibly and counted. If F1/F2 are answered in time, cm-books names picks (at most 12 Books in draft + review, per the books charter cap, which that ruling suspended only for the PR) and they move to (a). The rest stay retired.
   - **Note format for the 100:** one `retirement.md` per lesson, as F-46 item 7 requires. cm-books may generate them from `company/domains/briefs/books-100/manifest.json` and the strand briefs, provided each note carries that lesson's own idea, misconception, predict answer, version, claims (with the three families kept apart), QA and learner records, and cost. The shared reason (F1/F2) is written out in each note, not just linked. A builder must be able to start from the note alone.
   - The 100 have no row in `company/ops/publish-holds.json`. The claim gate keeps them unpublished anyway. Adding a Books hold row is the chief of staff's file, so I route it.
3. **schelling-on-new-york: (c) retire.** Not in the plan's 258: it landed as draft v4.1 at 17:33Z (`edfa00cf`). c10b (Rothstein 2017, home equity) is still unverified after five fact-check passes because the book cannot be opened from this host, and the stage is 83 strict words against the 25 cap, with no ruling on what may leave it (W-1391, cultural-reviewer, backlog). It is a sensitive lesson, built 3+ times, and its unblocker is outside the company's reach today. cm-geography writes the note by 10-19 18:00 (fix: a page for c10b or a replacement source, then the W-1391 re-layout). The 7,930-form HOLC data check in c10c-f is reusable evidence.
4. **Physics #64-68** (clap-at-the-cliff, longest-drinking-straw, power-line-voltage-loss, scale-on-a-slope, two-batteries-side-by-side): (a) push, as plan rule 6 said. They have no QA, learner walk or fact-check yet, so all three are owed by 10-19 18:00 (XW-5 plus a QA and FC batch, evaluation-steward). They get the same one round as everyone else if the walk says revise.
5. **Three Wave J lessons moved W → C since the plan** (calibrated-but-unequal-alarms, small-gap-big-extremes, tug-of-war-scale: walked launch on v3 and QA'd on v3, 875903c9). They are drafts. principal-pm-verticals flips them to review, then they come to launch review. small-gap first needs evaluation-steward's ruling on r1(b), and calibrated needs W-1367.
6. **Duplicates.** I found no unfinished lesson that duplicates a published one closely enough to retire it without a CM's judgement. Choosing among concepts is the CM's call, not mine. The parked set already holds the duplicates the park record named (for example transparent-box-visibility → shelf-front-labels). Five Life Hacks lessons share a curriculum concept with a lesson that is already published: drawer-divider-cost and measure-inside-not-outside (packing-cube-walls), file-fold-see-each-shirt (shelf-front-labels), small-items-in-mesh (pillowcase-set-kit), explain-the-link (rebuild-the-procedure). **If lane 10 runs short, these go last**, and a capacity retirement among them costs the least coverage. cm-lifehacks may instead retire any of them as a duplicate by 10-18, with a note.
7. **Capacity order is unchanged** (plan: C, V, W before F). A lesson whose checks have not run by its deadline is retired with a note marked "capacity retirement", so it ranks high on the comeback list.

## Path legend for the tables

F: revise verdict on the current version · W: current version never walked · C: launch on the current version, only checks or holds left · V: verdict wording "pass" (W-843) · B: Books founder hold · R: parked Life Hacks · X: retired by this ruling for a reason outside the plan (schelling) · new: not in the plan's 258.

Plan rule 3 applies to every path-W row that has no "stuck" note. A walk that says revise with a **new** blocking finding gets one fallback round (XB-fallback / LB-fallback). The same finding the last version was built to fix means retire.

Owners: "evaluation-steward → X" means evaluation-steward sends the lane-10 request and role X writes the record. The CM sends builder requests, except for the five lane-2 slugs, where principal-pm-verticals sends them (plan objection 6). Publishing is always done by the release-manager through `company publish`.

## Tables per lane

### cm-ai (2: push 1 · fix 1 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | penalty-on-wiggle | review v7 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 | stuck: revise on 4 versions (2,3,5,6); walk says revise → retire, no fallback round |
| 2 | asthma-looks-safe | draft v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims | cm-ai | build 10-18 12:00; checks 10-19 18:00 |  |

### cm-behavioral (4: push 1 · fix 3 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | zero-loses-to-this-crowd | review v2 | C → C | (a) push | FC 1 claim; launch review → publish | fact-checker, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 2 | same-week-a-year-apart | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim) | cm-behavioral | build 10-18 12:00; checks 10-19 18:00 |  |
| 3 | saved-or-die-same-600 | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim) | cm-behavioral | build 10-18 12:00; checks 10-19 18:00 |  |
| 4 | sure-million-or-long-shot | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim) | cm-behavioral | build 10-18 12:00; checks 10-19 18:00 |  |

### cm-big-ideas (4: push 3 · fix 1 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | earth-history-in-a-day | draft v3 | C → C | (a) push | QA on current version; status draft → review; launch review → publish | qa-tester, cm-big-ideas, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 2 | ten-times-taller-giant | draft v2 | V → V | (a) push | verdict re-recorded in canonical words (W-843); status draft → review; launch review → publish | evaluation-steward, cm-big-ideas, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 3 | two-four-six-rule | draft v2 | V → V | (a) push | verdict re-recorded in canonical words (W-843); status draft → review; launch review → publish | evaluation-steward, cm-big-ideas, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 4 | noise-draws-dunning-kruger | draft v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims | cm-big-ideas | build 10-18 12:00; checks 10-19 18:00 |  |

### cm-cs (6: push 5 · fix 1 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | cut-the-rod-for-more | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 |  |
| 2 | hailstone-27-climbs | review v6 | W → W | (a) push | learner walk on the current version (rule 3); FC 2 claims | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 | stuck: revise on 3 versions (1,2,5); walk says revise → retire, no fallback round |
| 3 | one-road-cuts-the-map | review v5 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 | stuck: revise on 3 versions (1,2,4); walk says revise → retire, no fallback round |
| 4 | range-min-in-four-nodes | review v5 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 | stuck: revise on 3 versions (1,2,4); walk says revise → retire, no fallback round |
| 5 | selfish-routes-cost-a-third-more | review v6 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-1 walk by 10-17 18:00 | stuck: revise on 4 versions (2,3,4,5); walk says revise → retire, no fallback round |
| 6 | karatsuba-three-not-four | review v5 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims | cm-cs | build 10-18 12:00; checks 10-19 18:00 | stuck: revise on 4 versions (2,3,4,5); this is the last round, no exceptions |

### cm-economics (7: push 5 · fix 2 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | only-the-needed-trader-profits | review v3 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 |  |
| 2 | outside-option-sets-the-split | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 | stuck: revise on 3 versions (1,2,3); walk says revise → retire, no fallback round |
| 3 | pay-for-the-harm-you-do | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 |  |
| 4 | two-bets-split | review v7 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 | stuck: revise on 4 versions (2,3,4,6); walk says revise → retire, no fallback round |
| 5 | who-pays-same-filter | review v5 | C → C | (a) push | W-513 frame pass of the current version; launch review → publish | head-of-product, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 6 | patience-wins-the-split | review v5 | F → F | (b) fix once | W-1333: exploreHint names every action the reveal needs; then QA + learner re-walk + launch review | cm-economics | build 10-18 12:00; checks 10-19 18:00 | stuck: revise on 3 versions (1,2,4); v5 walked launch; this hint fix is the last round |
| 7 | penalty-kick-mix | review v4 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then a W-513 frame pass | cm-economics | build 10-18 12:00; checks 10-19 18:00 |  |

### cm-geography (2: push 1 · fix 0 · retire 1)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | continental-jigsaw | review v6 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 | stuck: revise on 3 versions (1,3,5); walk says revise → retire, no fallback round |
| 2 | schelling-on-new-york | draft v4 | new → X | (c) retire | c10b (Rothstein 2017 page) unverifiable from this host after 5 fact-check passes; stage 83 strict words (W-1391) unresolved; v4.1 after 3+ builds | cm-geography (note) · head-of-product (checks) | note by 10-19 18:00; status 10-20 |  |

### cm-history (13: push 13 · fix 0 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | britain-made-most-fossil-co2-in-1850 | draft v3 | W → W | (a) push | learner walk on the current version (rule 3); FC 2 claims; then cultural review (W-889) + DLR-H | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 |  |
| 2 | cholera-fell-with-height | draft v3 | C → C | (a) push | status draft → review; History DLR (10-19); launch review → publish | cm-history, head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 3 | doubling-stopped-speeding-up | review v3 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 4 | income-flat-then-sixteenfold | review v4 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 5 | italy-poorer-in-1800 | review v2 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 6 | lakes-misplaced-east-west | review v2 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 7 | life-expectancy-gained-late | review v3 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 8 | literacy-split-france | draft v1 | C → C | (a) push | FC 1 claim; status draft → review; History DLR (10-19); launch review → publish | fact-checker, cm-history, head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 9 | london-buried-six-times-more | draft v4 | C → C | (a) push | status draft → review; History DLR (10-19); launch review → publish | cm-history, head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 10 | more-boys-christened | review v2 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 11 | rome-placed-too-far-east | review v4 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 12 | schooling-and-crime-1830s | draft v1 | C → C | (a) push | FC 1 claim; status draft → review; History DLR (10-19); launch review → publish | fact-checker, cm-history, head-of-product, release-manager | DLR-H 10-19 22:00 |  |
| 13 | wages-bought-more-wheat | review v2 | C → C | (a) push | History DLR (10-19); launch review → publish | head-of-product, release-manager | DLR-H 10-19 22:00 |  |

### cm-life (4: push 4 · fix 0 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | screening-survival-clock | draft v1 | V → V | (a) push | verdict re-recorded in canonical words (W-843); status draft → review; launch review → publish | evaluation-steward, cm-life, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 2 | steady-catch-from-a-lake | draft v1 | V → V | (a) push | verdict re-recorded in canonical words (W-843); status draft → review; launch review → publish | evaluation-steward, cm-life, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 3 | twenty-cultures-twenty-plates | draft v1 | V → V | (a) push | verdict re-recorded in canonical words (W-843); status draft → review; launch review → publish | evaluation-steward, cm-life, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 4 | vaccinate-at-the-peak | review v6 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-2 walk by 10-17 18:00 |  |

### cm-math (7: push 7 · fix 0 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | agenda-picks-the-winner | review v3 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 |  |
| 2 | bridge-carries-news-not-habits | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 |  |
| 3 | cluster-stops-the-cascade | review v5 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 |  |
| 4 | enemies-allow-three-camps | review v6 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 | stuck: revise on 3 versions (2,3,5); walk says revise → retire, no fallback round |
| 5 | fifty-up-fifty-down | review v2 | W → W | (a) push | cm-math confirms the version (review stamp v3, meta v2), then learner walk on the current version (rule 3) | cm-math, then evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 |  |
| 6 | no-fraction-fits | review v6 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 | stuck: revise on 5 versions (1,2,3,4,5); walk says revise → retire, no fallback round |
| 7 | two-right-angles-never-meet | review v2 | C → C | (a) push | hold lift (v2 walked launch r2, W-1388 satisfied); launch review → publish | head-of-product, release-manager | checks 10-17 18:00; launch review 10-18 |  |

### cm-physics (9: push 9 · fix 0 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | bird-on-the-wire | review v2 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-3 walk by 10-17 18:00 |  |
| 2 | clap-at-the-cliff | draft v1 | new → W | (a) push | first QA, learner walk and fact-check (built after F-46 under item 5) | evaluation-steward → qa-tester, learner-evaluator, fact-checker | XW-5 + QA + FC by 10-19 18:00 |  |
| 3 | longest-drinking-straw | draft v1 | new → W | (a) push | first QA, learner walk and fact-check (built after F-46 under item 5) | evaluation-steward → qa-tester, learner-evaluator, fact-checker | XW-5 + QA + FC by 10-19 18:00 |  |
| 4 | metal-feels-colder | review v2 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-4 walk by 10-17 18:00 |  |
| 5 | power-line-voltage-loss | draft v1 | new → W | (a) push | first QA, learner walk and fact-check (built after F-46 under item 5) | evaluation-steward → qa-tester, learner-evaluator, fact-checker | XW-5 + QA + FC by 10-19 18:00 |  |
| 6 | ruler-catch | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-4 walk by 10-17 18:00 |  |
| 7 | scale-on-a-slope | draft v1 | new → W | (a) push | first QA, learner walk and fact-check (built after F-46 under item 5) | evaluation-steward → qa-tester, learner-evaluator, fact-checker | XW-5 + QA + FC by 10-19 18:00 |  |
| 8 | throw-it-fast-enough | review v7 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-4 walk by 10-17 18:00 | stuck: revise on 5 versions (1,2,3,4,6); walk says revise → retire, no fallback round |
| 9 | two-batteries-side-by-side | draft v1 | new → W | (a) push | first QA, learner walk and fact-check (built after F-46 under item 5) | evaluation-steward → qa-tester, learner-evaluator, fact-checker | XW-5 + QA + FC by 10-19 18:00 |  |

### cm-probability (1: push 1 · fix 0 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | weak-links-hold-it-together | review v4 | W → W | (a) push | learner walk on the current version (rule 3) | evaluation-steward → learner-evaluator | XW-4 walk by 10-17 18:00 |  |

### principal-pm-verticals (5: push 4 · fix 1 · retire 0)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | calibrated-but-unequal-alarms | draft v3 | W → C | (a) push | status draft → review; W-1367 trace check (qa-tester); launch review → publish | principal-pm-verticals, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 2 | cut-the-busiest-link | review v2 | C → C | (a) push | publish (all gates pass; go in launch review r6) | release-manager | 2026-10-16 (launch review r6: go) |  |
| 3 | small-gap-big-extremes | draft v3 | W → C | (a) push | status draft → review; evaluation-steward ruling on r1(b) seen vs read; launch review → publish | principal-pm-verticals, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 4 | tug-of-war-scale | draft v3 | W → C | (a) push | status draft → review; launch review → publish | principal-pm-verticals, release-manager | checks 10-17 18:00; launch review 10-18 |  |
| 5 | secret-in-the-counts | draft v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims | principal-pm-verticals (lane 2) with cm-ai | build 10-18 12:00; checks 10-19 18:00 |  |

### cm-books (106: push 0 · fix 0 · retire 106)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | biased-judge-noisy-judge | draft v2 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 2 | bk-accelerate-small-batches | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 3 | bk-algorithms-cache-change | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 4 | bk-bears-range-not-point | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 5 | bk-bets-process-versus-outcome | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 6 | bk-blue-value-cost-trade | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 7 | bk-brooks-ramp-up-cost | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 8 | bk-certain-confidence-score | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 9 | bk-chaos-nearby-trajectories | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 10 | bk-chasm-segment-readiness | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 11 | bk-checklist-series-reliability | draft v4 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 12 | bk-choosing-information-budget | draft v3 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 13 | bk-climbing-small-valid-steps | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 14 | bk-code-carry-chain | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 15 | bk-cooperation-one-error | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 16 | bk-cosmos-scale-compression | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 17 | bk-crowds-correlated-errors | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 18 | bk-data-replica-read-lag | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 19 | bk-deep-unbroken-block | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 20 | bk-degrees-shortcut-paths | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 21 | bk-devops-limit-work-in-progress | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 22 | bk-digital-attention-allocation | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 23 | bk-distracted-switching-budget | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 24 | bk-diversity-species-area-model | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 25 | bk-dodo-fragmented-habitat | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 26 | bk-drive-proxy-reward | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 27 | bk-drucker-time-fragments | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 28 | bk-drunkard-streak-and-rate | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 29 | bk-elegant-team-slack | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 30 | bk-emyth-owner-bottleneck | draft v4 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 31 | bk-extended-external-state | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 32 | bk-fact-middle-of-distribution | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 33 | bk-fifth-upstream-orders | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 34 | bk-flow-utilization-queue | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 35 | bk-forecast-proper-score | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 36 | bk-gene-frequency-dependent | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 37 | bk-gorilla-selection-rule | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 38 | bk-great-selected-winners | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 39 | bk-grit-product-assumption | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 40 | bk-grove-leverage-hours | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 41 | bk-growth-surface-volume | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 42 | bk-habit-cue-policy | draft v3 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 43 | bk-hyperfocus-salience-filter | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 44 | bk-indistractable-cue-access | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 45 | bk-influence-social-sample | draft v4 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 46 | bk-information-repeated-messages | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 47 | bk-innovator-demand-crossing | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 48 | bk-irrational-decoy-dominance | draft v3 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 49 | bk-island-arrival-loss-balance | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 50 | bk-jobs-context-changes-choice | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 51 | bk-knowledge-missing-mechanism | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 52 | bk-law-symmetry-shift | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 53 | bk-lean-analytics-cohort-mix | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 54 | bk-learn-cue-overlap | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 55 | bk-learning-link-new-to-known | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 56 | bk-linked-hub-removal | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 57 | bk-manager-delegation-interface | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 58 | bk-measure-value-information | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 59 | bk-minds-sampling-representatives | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 60 | bk-mindset-small-effect-scale | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 61 | bk-mistakes-selective-evidence | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 62 | bk-networks-degree-versus-bridge | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 63 | bk-notes-links-not-piles | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 64 | bk-nudge-default-choice-model | draft v3 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 65 | bk-numbers-chunk-workspace | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 66 | bk-okr-output-and-quality | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 67 | bk-order-clock-comparison | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 68 | bk-organized-offload-buffer | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 69 | bk-origin-selection-frequencies | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 70 | bk-pale-angular-size | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 71 | bk-peak-feedback-discriminates | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 72 | bk-peopleware-interruption-cost | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 73 | bk-personal-mba-break-even | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 74 | bk-phenotype-external-effect | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 75 | bk-pieces-energy-reference | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 76 | bk-playing-capability-fit | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 77 | bk-porter-same-budget-opportunity | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 78 | bk-pro-feedback-target | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 79 | bk-qed-add-amplitudes | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 80 | bk-range-transfer-rule | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 81 | bk-release-bulkhead-capacity | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 82 | bk-rewards-metric-gaming | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 83 | bk-scale-exponent-boundary | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 84 | bk-scarcity-attention-budget | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 85 | bk-ship-distributed-information | draft v2 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 86 | bk-signal-overfit-validation | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 87 | bk-smart-sunk-cost-boundary | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 88 | bk-solution-asymmetric-incentives | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 89 | bk-spring-selection-resistance | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 90 | bk-startup-test-before-scale | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 91 | bk-stick-retrieval-evidence | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 92 | bk-strategy-credible-commitment | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 93 | bk-swan-unseen-regime-change | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 94 | bk-sync-coupling-threshold | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 95 | bk-systems-delay-control | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 96 | bk-time-light-cone-budget | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 97 | bk-topologies-handoff-edges | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 98 | bk-watchmaker-cumulative-retention | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 99 | bk-wonderful-contingent-branches | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 100 | bk-yes-trade-different-values | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 101 | bk-zero-tail-concentration | draft v1 | new → B | (c) retire | F1 book source + F2 legal read (founder); book-attribution claims cannot be verified from this host | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 102 | born-in-january-picked-first | draft v1 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 103 | one-percent-a-day | draft v2 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 104 | slowest-station-sets-pace | draft v1 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 105 | total-signups-hide-the-slide | draft v2 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |
| 106 | wheel-number-pulls-guess | draft v1 | B → B | (c) retire | F1 book source + F2 legal read (founder); no fix round can clear it | cm-books (note) · founder (F1/F2) | 2026-10-20 (if F1/F2 unanswered at 10-19 18:00) |  |

### cm-lifehacks (194: push 86 · fix 78 · retire 30)

| # | Lesson | Status | Path (plan → now) | Ruling | Gate or fix still needed | Owner | By | Note |
|---|---|---|---|---|---|---|---|---|
| 1 | batch-by-setup | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 2 claims; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 2 | box-handle-clearance | review v2 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 3 | breeze-is-not-extra-surface | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 4 | care-label-first-choice | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 5 | check-confidence-with-output | review v3 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 6 | choose-the-metric-first | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 7 | cover-before-recall | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 8 | dependency-before-priority | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-1 walk by 10-18 23:59 |  |
| 9 | do-not-starve-the-long-job | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 10 | drying-room-water-load | review v3 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 11 | earliest-deadline-first | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 12 | elastic-loop-release | review v4 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 13 | estimate-a-range | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 14 | explain-the-link | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 15 | fit-before-fixed-slot | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-2 walk by 10-18 23:59 |  |
| 16 | fitted-sheet-corners-nest | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 17 | folded-shirt-stack-height | review v3 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 18 | fragmented-time-does-not-fit | review v3 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 19 | garment-overlap-hides-face | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 20 | half-size-two-towels | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 21 | humidity-evaporation-gap | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 22 | include-the-wrap-up | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-3 walk by 10-18 23:59 |  |
| 23 | keep-the-error-feedback | review v3 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 24 | laundry-gap-air-path | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 25 | laundry-sort-before-walk | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 26 | lh-align-price-units | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 27 | lh-annual-label-cost | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 28 | lh-around-versus-across | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 29 | lh-big-pack-price | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 30 | lh-billing-rounds-hours | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 31 | lh-count-sheets-not-rolls | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 32 | lh-coverage-whole-cans | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 33 | lh-deposit-checkout-net | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-4 walk by 10-18 23:59 |  |
| 34 | lh-discount-round-trip | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 35 | lh-double-container-radius | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 36 | lh-duty-cycle-energy | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 37 | lh-fixed-coupon-percent | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 38 | lh-fixed-energy-charge | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 39 | lh-fixed-volume-fill | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 40 | lh-flow-duration-offset | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 41 | lh-idle-versus-active | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 42 | lh-lead-time-stock | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 43 | lh-pay-for-used-quantity | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 44 | lh-purchase-plus-running | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 45 | lh-reuse-cost-per-use | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 46 | lh-round-lines-versus-total | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 47 | lh-same-energy-new-tariff | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 48 | lh-scale-recipe-portions | review v3 | C → C | (a) push | FC 1 claim; LS-1 safety walk + DLR-LH row; launch review → publish | fact-checker, lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 49 | lh-sequential-discounts | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 50 | lh-small-leak-large-duration | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 51 | lh-split-order-fixed-fee | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 2 claims; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-5 walk by 10-18 23:59 |  |
| 52 | lh-standby-days-add-up | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 53 | lh-ticket-bundle-unused | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 54 | lh-two-for-one-boundary | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 55 | lh-visit-fee-crossover | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 56 | lh-voucher-minimum | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 57 | lh-water-meter-units | review v2 | W → W | (a) push | learner walk on the current version (rule 3); QA on current version; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 58 | lh-watts-hours-trade | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 59 | lh-weighted-unit-average | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 60 | long-cord-knots-itself | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 61 | meeting-and-preparation | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 62 | note-gap-check | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-6 walk by 10-18 23:59 |  |
| 63 | one-person-two-jobs | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 64 | one-question-one-card | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 65 | project-prefix-filenames | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 66 | reserve-an-unassigned-slot | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 67 | reverse-the-flashcard | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 68 | ribbon-around-box-length | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 69 | round-box-leftover-gap | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 70 | rug-chair-pullback | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 71 | ruler-start-not-zero | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 72 | search-the-document-body | review v1 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 73 | seasonal-bin-rotation | review v2 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 74 | separate-confusable-pairs | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 75 | shoes-opposite-ends | review v2 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 76 | short-jobs-clear-a-queue | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 77 | square-bow-stays-tied | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-7 walk by 10-18 23:59 |  |
| 78 | suitcase-rotate-block | review v2 | C → C | (a) push | W-1078 recall confirmed by fact-checker; launch review → publish | release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 79 | tote-balance-sides | review v2 | C → C | (a) push | LS-1 safety walk + DLR-LH row; launch review → publish | lifehacks-safety-reviewer, head-of-product, release-manager | LS-1 10-19 18:00; DLR-LH-1 10-19 |  |
| 80 | towel-over-two-bars | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 81 | towel-spread-dries-first | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 82 | towel-thickness-hidden-volume | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 83 | unlock-the-following-work | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 84 | wet-knit-hang-stretch | review v2 | W → W | (a) push | learner walk on the current version (rule 3); FC 1 claim; then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 85 | work-back-from-a-deadline | review v2 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 86 | work-in-process-limit | review v4 | W → W | (a) push | learner walk on the current version (rule 3); then LS + DLR-LH row | evaluation-steward → learner-evaluator | LW-8 walk by 10-18 23:59 |  |
| 87 | alphabet-sort-search | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 88 | apply-not-quote | review v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 89 | bag-weight-before-volume | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 90 | buffer-for-a-late-finish | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 91 | calendar-needs-travel | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 92 | cm-to-inches | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 93 | coiled-cord-bend-radius | review v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 94 | count-setup-in-the-block | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 95 | cue-needs-a-boundary | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim); then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 96 | desk-supply-near-use | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-1: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 97 | door-swing-clearance | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 98 | drawer-divider-cost | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 99 | duplicate-before-experiment | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 100 | duplicates-two-stations | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 101 | equal-names-not-equal-files | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 102 | file-fold-see-each-shirt | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 103 | file-modified-not-created | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 104 | file-type-then-owner | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 105 | flat-pack-volume-dimensions | review v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 106 | furniture-through-door | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-2: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 107 | group-cables-with-ends | review v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 108 | heavy-book-close-to-back | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 109 | iso-date-filename-sort | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 110 | jacket-last-first | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 111 | keys-fixed-drop-zone | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 112 | labels-specific-address | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 113 | lh-area-scales-square | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 114 | lh-buy-only-stock-gap | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 115 | lh-capacity-batch-count | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 116 | lh-duplex-sheet-rounding | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-3: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 117 | lh-each-cut-allowance | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 118 | lh-flow-times-minutes | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 119 | lh-free-shipping-gap | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 120 | lh-indivisible-shares | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 121 | lh-jug-rounding-extra | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 122 | lh-material-reuse-account | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 123 | lh-merge-overlapping-lists | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 124 | lh-offcuts-not-one-piece | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 125 | lh-overlap-material-area | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 126 | lh-parcel-fee-repeats | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-4: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 127 | lh-percentage-overage | review v3 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 128 | lh-round-replenishment | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 129 | lh-round-snack-packs | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 130 | lh-subtract-openings-area | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 131 | lh-turn-container-volume | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 132 | lh-use-deadline-tickets | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 133 | lh-weighted-bill-share | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 134 | lh-weighted-volume-allocation | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 135 | lids-match-by-size | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 136 | link-label-names-the-target | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-5: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 137 | mail-exact-phrase | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim); then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 138 | mail-minus-noise | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+1 open claim); then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 139 | mail-or-vs-and | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 140 | margin-before-cut | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 141 | measure-diagonal-for-square | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 142 | measure-inside-not-outside | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 143 | mug-handle-packing | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 144 | nested-box-retrieval | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 145 | rectangular-bin-nesting | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 146 | resize-photo-frame-ratio | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-6: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 147 | shelf-gap-wasted-height | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 148 | shorter-folder-path | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 149 | show-the-file-extension | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 150 | size-is-not-recency | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 151 | small-items-in-mesh | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 152 | sock-pairing-by-pattern | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims (+5 open claims); then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 153 | sock-pairs-not-all-combinations | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 154 | socks-use-shoe-space | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 155 | sofa-diagonal-room | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 156 | spacer-protects-clearance | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-7: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 157 | suitcase-layer-access | review v2 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 158 | tags-are-not-copies | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 159 | tape-mark-same-spacing | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 160 | trays-slide-out-reach | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 161 | version-nine-and-ten | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 162 | weight-spread-on-table | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 163 | wobbly-table-quarter-turn | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 164 | wrapping-paper-minimum-area | review v1 | F → F | (b) fix once | one fix round on the latest blocking finding, then QA + learner re-walk + FC of changed claims; then LS + DLR-LH row | cm-lifehacks | LB-8: build by 10-19/10-20 06:00; checks by 10-22 |  |
| 165 | agenda-needs-an-outcome | review v3 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 166 | arrival-is-not-departure | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 167 | bug-report-needs-reproduction | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 168 | circle-tray-square-corners | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 169 | copy-keeps-the-original | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 170 | cut-moves-the-selection | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 171 | deadline-needs-a-reference | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 172 | delegate-the-whole-handoff | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 173 | deleted-is-a-search-state | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 174 | find-next-is-navigation | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 175 | handoff-after-finish | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 176 | handoff-needs-a-checkpoint | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 177 | lh-cents-euros-conversion | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 178 | lh-committed-stock | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 179 | lh-count-before-dispatch | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 180 | lh-pool-spare-stock | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 181 | make-a-question-answerable | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 182 | name-the-next-owner | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 183 | plain-text-paste-scope | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 184 | preview-replace-all | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 185 | record-the-reason | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 186 | request-needs-the-object | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 187 | select-before-replace | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 188 | selection-not-focus | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 189 | separate-ready-from-blocked | review v2 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 190 | status-and-blocker-differ | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 191 | transparent-box-visibility | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 192 | undo-then-redo | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 193 | wetter-cloth-more-water | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |
| 194 | zoom-does-not-rewrite | review v1 | R → R | (c) retire | parked (triage r11); retire unless cm-lifehacks argues for it | cm-lifehacks (note) · head-of-product (checks) | argument by 10-18 23:59; note 10-19 18:00; status 10-20 |  |

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | The founder said "done or retired", so product should retire today, not on dates. | chair, against my own ruling | **Declined.** F-46 item 7 is the founder's own rule: no retirement without the CM's note, which head-of-product checks. Flipping 137 statuses with no notes would break that rule and lose the "so we can fix it later" feedback the founder asked for. The dates are the fastest path that keeps the rule: parked lessons on 10-20, Books on 10-20, schelling on 10-20. |
| 2 | Retiring 100 Books drafts on the day they merged throws away a fresh, QA'd PR. | chair | **Accepted as a cost, mitigated.** Retired lessons keep every file, and the PR's QA (200/200 contract) and the 7 pilot learner launches stay valid evidence for a comeback. The trigger that saves them is the founder's F1/F2 answer by 10-19 18:00, not a fix round. Without a book source, no Books lesson can publish whatever we build (`company/decisions/2026-10-14-founder-books-experience.md`). Routed to chief-of-staff for the daily founder line. |
| 3 | The stuck rule (no fallback round for 11 path-W lessons) may retire a lesson whose new walk finds a new, cheap defect. | chair | **Accepted, with a reason.** These lessons have been rebuilt 3-5 times each. A new finding on version 4-7 is evidence the premise does not converge, and F-46 item 1 caps rounds, not checks. The retirement note must carry the exact finding and its fix. If the fix is a trim or a crop, the comeback is cheap and ranks high. A CM who disagrees for a named lesson writes it here by 10-18 23:59, and I answer in this table. |
| 4 | `company status` lists 11 lessons as ready. The founder's line could read 11 publishable when 1 is. | chair (launch review r6, objection 1) | **Open, routed to tools-lead** (board). Until it is fixed, count from `publish-ready.mjs` and this ruling. |
| 5 | The plan's batches assume lane-10 capacity that has not been confirmed (plan objection 2). | chief-of-staff (F-46), carried | **Open.** evaluation-steward's capacity answer was due 10-17 12:00. The capacity order and capacity-retirement labelling in rule 7 above are the fallback. |
| 6 | Five Life Hacks lessons share a concept with a published lesson. They could be retired now as duplicates. | chair | **Declined for product.** Concept choice is the CM's scope. I ranked them last under capacity pressure and gave cm-lifehacks the option, by 10-18. |
| 7 | patience-wins-the-split is stuck but keeps its round. Is that inconsistent with objection 3? | chair | **Answered.** v5 walked **launch**. The hold is mine (W-1333) and is about one hint line. A hint fix cannot re-open the premise. The stuck rule bars rebuilding a premise that has not converged, and this one converged. |

## Messages sent (mailbox, kind=report, project catalog)
Sent 2026-10-16 20:54Z by head-of-product. Each lane message carries that lane's table, the rules, and the note requirement.

| To | Message id |
|---|---|
| cm-ai | `20261016T205405320Z-head-of-product-91eb7ee9` |
| principal-pm-verticals | `20261016T205412576Z-head-of-product-e851c3ad` |
| cm-behavioral | `20261016T205412749Z-head-of-product-f6cd554c` |
| cm-big-ideas | `20261016T205412863Z-head-of-product-4c50b96d` |
| cm-books | `20261016T205413034Z-head-of-product-1dc1cb7c` |
| cm-cs | `20261016T205413265Z-head-of-product-b8027086` |
| cm-economics | `20261016T205413379Z-head-of-product-a94d9c9e` |
| cm-geography | `20261016T205413471Z-head-of-product-655823f0` |
| cm-history | `20261016T205413596Z-head-of-product-9e3aff73` |
| cm-life | `20261016T205413757Z-head-of-product-ae01eaef` |
| cm-lifehacks | `20261016T205413851Z-head-of-product-04ffb6a6` |
| cm-math | `20261016T205414122Z-head-of-product-fb8ece1c` |
| cm-physics | `20261016T205414334Z-head-of-product-8d242275` |
| cm-probability | `20261016T205414453Z-head-of-product-3675f288` |
| release-manager (launch r6 go) | `20261016T205428479Z-head-of-product-bef57316` |
| evaluation-steward (lane-10 checks, stuck rule) | `20261016T205428679Z-head-of-product-a08ca141` |
| chief-of-staff (counts, F1/F2 to the founder, holds) | `20261016T205428853Z-head-of-product-5e7b6fa7` |

## How to rebuild
Use the plan's method (`company/product/2026-10-16-catalog-closeout.md`, "How to rebuild the ledger"), extended to every draft and review lesson, Books included. The ruling is assigned in this order: Books → (c); plan path R → (c); schelling → (c); cut-the-busiest-link → (a) publish; patience → (b); current revise → (b); current version unwalked → (a) walk; launch on the current version or "pass" wording → (a) with its remaining gates. "Stuck" means revise verdicts on 3 or more distinct versions. The scripts are scratch and not committed. The rules above are enough to redo it.
