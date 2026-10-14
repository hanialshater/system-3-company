# Decision: demo crit 2026-10-14, six pairs, and whether "on screen" means legible (W-513)

owner: head-of-product (Priya)
date: 2026-10-14
status: decided. Board W-513.
inputs read: `company/rituals/records/2026-10-14-demo-crit.md` (witness record, pedagogy critic only), the six `company/reviews/<challenger>/2026-10-14-pairwise.md`, `company/rituals/records/2026-10-14-pattern-review.md`, `company/knowledge/patterns/fit-means-legible.md`, `company/design/system.md` (W-289 floor), `company/product/demo-standard.md`, current `meta.json` status and version of each lesson.
not done: I did not walk the lessons myself, and I am not an evaluator. These are product decisions on the witness record. One evaluator role (pedagogy critic) reported, and learner, QA, a11y and fact-check slots were not convened. Where a decision depends on what the current version shows, the condition is written as a check on a fresh 390×844 frame, not as my reading.

Version caution: the crit frames were taken today against `next dev`. who-pays-same-filter is now v5 and a-star-heads-for-goal v8 (W-456 design re-check open). The holds below lift on a frame of the **current** version, so if a later version already fixes the problem, the hold costs one screenshot.

## Ruling on "on screen": yes, it includes legible

In the craft rule "The reveal fits with its picture", **on screen means visible and readable**: every stage element the reveal points at, and every meaning-carrying label at predict, renders at or above the design-system floor (10 px at 390 px wide; 8 px only for `aria-hidden` decoration; `company/design/system.md` W-289). A picture shrunk until those labels fall below the floor has failed the rule, not met it. When fit and floor conflict, the floor wins. The remaining crop goes to a per-lesson fix (cut told context, fold at the reveal, redraw), never to a smaller picture.

- Scope: binds new lessons and every new version, like the word budget. A published lesson is reopened only if the thing its reveal points at is below the floor, not for every small label.
- Budget: unchanged. Reveal ≤ 90 words and stage text ≤ 25 words. Shrinking text is not a way to buy words.
- Applied: one sentence added to that craft rule in `company/product/demo-standard.md` (craft guidance, mine; the QA contract section is untouched). Whether QA should **test** it is a gate question, so it goes to evaluation-steward (protected `tests/qa/**`, amendment route).

## The six pairs

| # | Pair (A vs B) | Decision | What happens |
|---|---|---|---|
| 1 | lh-sequential-discounts vs twenty-then-ten-off | **B keep. A merge: its framing only.** A is not published as a separate lesson. | The "stacked coupon or one 30% offer: which is cheaper?" question is offered to B's owner (W-515, cm-economics), who carries it into B as a variant or says why not. A goes to the first Life Hacks retirement review as merged. |
| 2 | lh-discount-round-trip vs fifty-up-fifty-down | **B keep. A kill** (a duplicate that teaches less; nothing in it B lacks). | Not published. cm-math answers the transfer (W-516) as declined unless it wants something from A. If B's reveal is trimmed, the corner sentence stays. |
| 3 | sock-pairs-not-all-combinations vs handshakes-halve | **B keep. A does not ship as is: revise or merge**, cm-lifehacks's choice (W-517). | I rule the critic's flaw fatal for publication: the lesson's central quantity ("all possible pairs") is never on screen on the default path, which fails "Show the why you promised". No revision starts before the template fix (W-518), which is the shared cause. |
| 4 | penalty-kick-mix vs two-suspects-payoff | **Keep both, B before A** on any path. **A revise before publish.** | A's predict-frame table must be legible (ruling above), and the reveal frame must not crop the "Scoring" line and headers. A is on the ready-to-publish list, so the release manager holds it until a current-version 390×844 frame passes. Path order goes to cm-course-ncm. |
| 5 | a-star-heads-for-goal vs wave-from-the-corner | **Keep both, B before A. B revise (W-519 stands). A may publish** on its own gates. | A's 46-word question, the "?" cell and the told admissibility sentence are minors for cm-cs. They do not block publication. B is published and fails the fit rule on the QA path, so it is revised, not unpublished. |
| 6 | who-pays-same-filter vs supply-demand | **Keep both, B before A. A revise before publish. B revise** (chart top cropped at the reveal; ~115-word reveal on the next version). | A: the panel and band its reveal points at must be legible. The release manager holds A until a current-version frame passes. QA checks the "DRAFT" badge on a `review` lesson. B's revise follows the word-budget clause: the crop reopens it, and the words are trimmed in that same version. |

Cross-cutting, accepted: **fix the template once before judging the other 13 Life Hacks duplicates one by one** (crit candidate 6). No more pairwise crits on Life Hacks duplicates until W-518 is ruled. **Related lessons are often a sequence** (candidate 5): for pairs 4-6 the output is a path order, not a winner.

## Objections, and what happened to each

| Objection | Raised by | Status |
|---|---|---|
| A's "which offer is cheaper" framing suits Life Hacks better than B's. | pedagogy-critic (pair 1) | **Accepted.** It travels with the merge to W-515. cm-economics must carry it or answer why not. |
| B's reveal is the longer one (~90 words), and the preference must not reward length. | pedagogy-critic (pair 2) | **Accepted.** The decision rests on the drawn corner, not on length. If B is trimmed, the corner sentence stays. |
| B's nine near-identical taps strain 60 seconds. | pedagogy-critic (pair 3) | **Accepted as a B minor, not a reason to prefer A.** Sent to cm-math with W-516 for its next version. |
| B's question restates the whole table in prose. | pedagogy-critic (pair 4) | **Accepted as a B minor.** B is published and passes the fit rule, so it is not reopened for this alone. Logged for cm-economics's next version of B. |
| "Fit from the start" did not hold for B. Being published did not protect it. | pedagogy-critic (pair 5) | **Accepted.** That is why B is revised, and why the fit sweep (W-264) covers published lessons. |
| The phone-fit fix met the letter of the rule by shrinking. | pedagogy-critic (pair 6) | **Accepted.** That is the legibility ruling above. |
| A design-lead ruling is needed on "legible". | pedagogy-critic (pair 6) | **Answered here, not by design-lead.** The craft rule is product's. The floor number stays the visual designer's (W-289). If design-lead disagrees, they write an objection under this record and I answer it. |
| Fit-means-legible against the word budget: shrinking frees room, so the budget should be decided with it. | pattern-librarian | **Declined.** The budget stays at 90 and 25. Legibility removes one way of fitting. It does not buy words. |
| The cost is real: fully fitting lessons fell from 398 to 176 when the floor landed, and ~284 still crop. | fit-means-legible pattern (known_failure) | **Accepted cost.** They go the per-lesson route (W-264..W-267). Published lessons reopen only when what the reveal points at is illegible. |
| 10 px is a ruling, not a measurement of learners. | fit-means-legible pattern | **Accepted.** I revisit it if a real-device read test (EXP-002 or later) shows 4-5 px labels read as well, or if lessons held to the floor lose pairwise to shrunk ones. |
| Only one evaluator role reported, so these rest on a single witness. | demo-crit record (status line) | **Accepted. It shapes what I decided.** Keeps and path orders stand on one witness. Revise holds lift on a measured frame, not on a second opinion. Kills are limited to the one case (pair 2) where the duplicate adds nothing its pair lacks. |

## This would be wrong if

- a fresh current-version frame of penalty-kick-mix or who-pays-same-filter already meets the floor (then the hold lifts at once, and the crit was judging an old version);
- after W-518, a rebuilt Life Hacks duplicate beats its pair (then the kill in pair 2 was premature, and the lesson can come back as a new version);
- learner data shows the B-before-A orders do not matter for completion or recall.
