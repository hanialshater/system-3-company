# Build note: one-good-link-beats-many (demo-builder, 2026-10-14, session 2 batch 1)

- Format: single card, step-run button, hand-drawn network stage built to design-lead rulings `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` section 2 (rulings win over the brief). 10 display-only named nodes (1-character labels A, B, C, D, H, Y, P, Q, R, X; 13 px, radius >= 14), no tappable nodes or edges, directed edges 2 px with 9 px arrowheads ending at the rim, H and Y drawn as two offset arrows. Node states: hollow default, heavy ring for the two asked-about pages (X, Y); size = score. Legend line "Arrow: links to. Size: score." Stage words about 22. No animation (instant redraw).
- Brief mapping: A, B, C, D = the brief's a1..a4 (X links to A); P, Q, R = p1..p3; H is named H in the question and never called the hub on the stage.
- Left out: the optional "remove the 4 pages that link to H" step. It was not re-run and verified, so it is not built (instruction from caller).
- Numbers: all from `model.ts`, which is the exact rule the stage uses; re-run in node 2026-10-14. Round 1: X 0.270, Y 0.100, H 0.440. Round 2: Y 0.389, H 0.223, X 0.053, A 0.245. Round 51 (stable to 3 dp from round 50): H 0.422, Y 0.374, X 0.053, A 0.060, others 0.015. Y ahead of X in every round 2 to 51; X constant from round 2; sums 1.000. The vertical review's Y 0.395 does not reproduce, not used.
- Reveal gate: one milestone, "round two reached" (Step twice, or Settle). The reveal quotes only rounds the learner displayed (tracked in `seen`, kept across Reset): round 1 and 2 numbers only if Step reached round 2; round 51 numbers only if Settle was pressed. Under the QA path (Step, Settle, Reset) the reveal quotes round 51 only.
- Control order for QA: Step, Settle, Reset. Settle jumps to round 51 with no replay; Step and Settle disable at round 51; Reset disabled at round 0, so no press is a no-op.
- Curriculum reference: easley-kleinberg-2010 ch. 14, section 14.3, **section unconfirmed** (brief: book page fetch gave a proxy 403). Fact-checker confirms against the free PDF. Claim c6 also needs a human source check (Brin and Page 1998).
- Fix after screenshots: the stage was clipped under the predict panel (rule line cut off), so the SVG max height was lowered to 27dvh.
- All claims are `unverified`; I did not mark any verified. Own code about 8 KB.
- QA: `company/reviews/one-good-link-beats-many/2026-10-14-qa.md` (own NEXT_DIST_DIR .next-pr, QA_PORT 3481). In an unfiltered run, feed.spec "subject chips filter the feed" failed on both viewports; it is not a lesson test and I did not investigate it.
- Walkthrough: `npm run walkthrough -- one-good-link-beats-many` ran with WALKTHROUGH_URL pointed at my server on 3481 (its default random port failed to start). I also looked at phone screenshots after Step 1 and Step 2 (round 1: X 0.270, large ring, Y small; round 2: Y larger, X back to 0.053).

## Revision v2 (demo-builder, 2026-10-14, from the adult-beginner learner review and fact-check NCM-1)

- Undefined words: the question now says "Every page has a score: how important it is" and "after many rounds of updating" (no "settle"/"ranks"). Stage rule: "Each round a page passes 85% of its score down its links; every page gets a free 1.5%." Button "Settle" is now "Run to round 51". Readout labels shortened to Round, X, Y. Stage words about 25 (rule 18, legend 7); the changing hint is outside the stage.
- Answer not visible before predicting: title "What is one link worth?", hook "Three links in, or one: which page scores higher?"; options are parallel and carry no reason. Correct option is now LAST (answer 2); recall also moved to answer 2.
- Trap: after Step 1 the hint reads "X leads so far. Step again." Run to round 51 is disabled at round 0; from round 1 it shows round 2 for 1.5 s before jumping on (the QA harness clicks each control once, so it cannot Step twice). The reveal milestone fires only at round 2, so rounds 1 and 2 are always displayed.
- Score shown flowing: arrow thickness is the amount passed that round; the four arrows into X and Y carry the number (round 1: 0.085 from each of P, Q, R; round 2: 0.013 each, 0.374 from H to Y). The reveal quotes these.
- Reset removed, so the reveal can no longer quote round 51 beside a round-0 stage. The reveal quotes round 51 only if the learner ran to it.
- Claims: c4 (text) and c5 (reveal context) -> unverified; c8 and c9 added, unverified. c1, c2, c3, c6, c7 unchanged, still verified. Recall: option order only.
- Not done: the optional "remove the 4 pages that link to H" step.

## Revision v3 (demo-builder, 2026-10-14, polish from learner review r2)

- "X never moved again" removed as an unconditional claim. Reveal now says "By round 2, Y had 0.389 and X 0.053" (a displayed round); only if the learner ran to round 51 it adds "the scores had stopped changing: Y 0.374, X 0.053, the same as at round 2".
- "Free 1.5%" in plain words on the stage: "every page also gets 1.5% free, links or not."
- Reveal gives one phrase on Y: "H, which five pages link to (Y links back to it too)".
- Claims: c1 text now names Y linking back to H -> unverified. c2, c3, c4 text unchanged (still verified); the stage/reveal wording changed only.
- QA v3: own NEXT_DIST_DIR .next-og3, QA_PORT 3913, QA_ONLY slug: 10 passed, 2 failed (feed.spec "subject chips filter the feed", phone and desktop; same non-lesson failure as v1). Walkthrough run on 3913; all four phone frames looked at: rule line wraps to two lines, reveal text fits, no new overlap. check and typecheck pass; tsconfig.json change from build reverted.
