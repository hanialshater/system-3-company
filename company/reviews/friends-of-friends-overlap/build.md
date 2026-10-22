# Build note: friends-of-friends-overlap

builder: demo-builder (Meta M6, order O-4) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md #10 (check N10) · design: company/reviews/friends-of-friends-overlap/design.md

## Answer check
`node company/domains/briefs/checks/math-ncm-wave-j-check.mjs` (2026-10-22): `N10 {"tree":{"d1":10,"d2":90,"d3":810,"within3":911},"ring":{"d1":10,"d2":10,"d3":10,"within3":31,"maxDist":100}}`. Demo.tsx computes the ring by the same breadth-first search (RING_DIST) and the tree as 10 × 9^(k−1). Ringed friend (+3) knows −2…+8 minus itself: you, 6 of your friends, 3 new (c3).

## Built as briefed
Village at step 1 first; chips [2 steps] [3 steps] [No shared friends] [Village] in DOM order, active ones disabled; the ring drawn as texture (35 of the 1,000 shown, nothing tappable); labels 15 px in the viewBox.

## Choices and deviations, for cm-math
1. Readout: the brief's two lines ("people at this step: N", "within N steps: M") became a small table (step 1–3 and within 3, for village and no shared friends), so the quoted village and tree numbers are both on the stage when the reveal opens, whichever world is shown. Stage words, busiest frame: table "village" 1 + "no shared" 2 + "step" ×3 + "within" 1 = 7; chips 2 + 3 + 1 = 6 ("2 steps", "3 steps" count 1 each); "you" 1; numerals 0 → 14 ≤ 25.
2. Added a ringed friend with its 10 links (from step 2, both worlds) so the cause in doesNotKnow is shown on the stage (told-vs-shown decision). New claim c3.
3. Predict question rewritten as a second-person scene and "exactly two steps" spelled out as "friends of your friends, other than you, but not your own friends".
4. Title and hook are mine: "How many friends of friends do you have?" / "Ten friends each, and they have ten friends each. How many new people two steps out?"
5. Reveal: the brief's draft, with the ringed-friend sentence and the tree numbers. "Far smaller" / "closed triangles" became "In the village they do, so the count stays small" (no new term). The farthest-villager figure (100) is in claim c1 but not shown.
6. Claim c4 support is "source" (E&K ch. 2; the kit's enum has no "citation").

## Pre-flight v1

1. Title and hook: "How many friends of friends do you have?" / "Ten friends each, and they have ten friends each. How many new people two steps out?" Neither names 10, 45 or 90, nor hints at overlap.
2. Options: "90", "45", "10": bare numbers, same precision.
3. Locked stage: village at step 1: you, 10 friends coloured with numerals "1" either side, the rest grey; table step 1 village 10, every other cell "?"; no links drawn. The step-1 "10" is the friends count stated in the question; nothing marks step 2.
4. Reveal values: "step 2 added only 10" = table cell village/step 2, filled when milestone village2 fires; "step 3 another 10: 31 within 3" = village/step 3 and within 3 cells, shown only if the village was seen at step 3; "7 … 3 are new" = the ringed friend's links on the pinned village picture (drawn at step ≥ 2); "90 at step 2, 810 at step 3" = table column no shared, filled when milestone tree3 fires.
5. QA path: 2 steps (village2, village 10 at step 2), 3 steps (village 10 at step 3, 31 within), No shared friends (tree at step 3: 810, with 90 at step 2 in the table; tree3), Village (back). Both milestones by press 3; every quoted number stays in the table at the reveal.
6. Reset: Village (pressed last) is the return. Reveal after that run (reveal-fit run, all four chips): "In the village, step 2 added only 10 new people and step 3 another 10: 31 within 3 steps, counting you. The ringed friend's 10 links: 7 land on you or your own friends, only 3 are new. | With no shared friends every link is new: 90 at step 2, 810 at step 3. Multiplying 10 × 9 assumes none of your friends know each other. In the village they do, so the count stays small." Matches the table and the pinned picture.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3104 friends-of-friends-overlap --shots` on `next dev` in this worktree: verdict fit, stage-top crop 0 px, namedHidden 0, phoneFit true; reveal 80 words (tool count); picture 160 px, table 98 px, controls 94 px. Screenshot artifacts/reveal-fit/friends-of-friends-overlap.png (git-ignored): the village arc with the ringed friend's links, the full table, the chips and the whole reveal on one screen. Labels then went 14 → 15 px (picture about 0.7 scale, so about 10.5 px).

## Checks run
N10 check script; `npx tsc --noEmit` clean; `npm run registry`; `npm run check`; `meta check --order=O-4` (test1). Official QA, walkthrough and build are code's stages; not run by me. Not seen in a screenshot: the tree picture (only the reveal frame was captured).

## Revise v2 (fact-check 2026-10-22)

Finding: c4 cited E&K ch. 2 for the friends-of-friends overcount caution; secondary sources put it in ch. 20 (Fig. 20.1). "Much smaller" overstated the general rule.
- c4 source re-cited to ch. 20, The Small-World Phenomenon (Fig. 20.1, section unconfirmed), flagged for a human source check (the book PDFs are blocked by the proxy).
- c4 text: "many friends of friends are already your friends, so the count two steps out is much smaller" → "some friends of friends are already your friends, so the count two steps out is smaller".
- Learner-visible text unchanged: the reveal already scopes the claim to the village ("In the village they do, so the count stays small"), which c1 carries. Demo.tsx not touched.
- curriculum.references kept at ch. 2 (§2.3 BFS layers, the brief's own reference for the stepping mechanic); cm-math may add ch. 20 to the brief.
- All claims (c1–c3 verified in v1, c4 changed) reset to unverified, checker notes removed; version 1 → 2.

## Pre-flight v2

1. Title and hook: unchanged from v1; neither names 10, 45 or 90 nor hints at overlap.
2. Options: "90", "45", "10": unchanged.
3. Locked stage: unchanged (village at step 1, other cells "?").
4. Reveal values: unchanged from v1 item 4; every quoted number is in the table or on the pinned picture.
5. QA path: unchanged (2 steps, 3 steps, No shared friends, Village); both milestones by press 3.
6. Reset: Village is the return; reveal text identical to v1.
7. Phone fit: no stage or reveal text change, so v1's reveal-fit (fit, crop 0, 80 words) still holds; code's qa stage re-runs it.
