# Computer-use QA: the-swap-that-goes-in-circles (reveal fix, version still 1)

date: 2026-10-16 · harness: tests/qa/contract.spec.ts + exploratory R4 · recorded by: qa-tester (company qa-record) · result: **pass** (no failure found; observations below)

built from: `975a485128f05cc92e6b58b5c98abcb6fa6b05b4` (branch worktree-agent-a5d57760357dc86f7, tree clean apart from the tsconfig.json rewrite that `next build --webpack` makes, restored before commit) · lesson version: 1 (`src/demos/math/the-swap-that-goes-in-circles/meta.json` still says 1 although commit fc8c53b8 changed the reveal) · board W-1570 · QA started its own `next start` (QA_PORT 3751, NEXT_DIST_DIR `.next-qa5`, QA_OUT `artifacts/qa5-out`); the exploratory server (port 3752) ran from the same dist. The earlier record `2026-10-16-qa.md` stays as history.

## Contract (QA_ONLY for the four NCM lessons, 2 workers, 0 retries)

| Viewport | Result | Retries |
|---|---|---|
| phone (Pixel 7) | passed | 0 |
| desktop 1280x800 | passed | 0 |

8/8 across the four lessons in 19.3 s (report `artifacts/qa5-out/qa-report.json`, not committed).

## Exploratory R4 at 390x844 and 360x640 (touch; scripts `artifacts/explore/r4.mjs`, `r4b.mjs`, `r4c.mjs`, not committed)

- Wrong order before predicting: force-clicked all 4 controls while locked: phase stayed `predict`, reveal count 0, commit disabled.
- Double-tapped first option, then last, then commit: phase moved to `explore` once.
- Reverse order (Back to the circle, Rank them: apple first, 3 swaps, 6 swaps): "Back to the circle" is disabled until a run has happened (tap failed); the other three worked on the first tap, the second tap failed on each because a used or selected button disables itself.
- Reveal gating: after 6 swaps alone, 3 swaps alone, or Rank alone the reveal button stayed disabled with the label "Try it first". It enabled only after all three of 6 swaps, 3 swaps and Rank had been used. The label does not say what unlocks it.
- Stage readouts: 3 swaps "holding: cherry · paid: 30¢"; 6 swaps "holding: cherry · paid: 60¢"; Rank shows "✕ refused" and "holding: apple · paid: 20¢". Aria-label after the full path: "Max holds the cherry, paid 60 cents".
- Reveal text after the full path (the fixed text): "Every swap was one Max wanted, yet after 3 he held the cherry again, 30¢ poorer, and after your 6 he had paid 60¢ for nothing. Once his preferences were ranked, the swaps stopped at his favourite after 2." then "That is why choice models assume preferences are ranked (transitive): if Max prefers apple to banana and banana to cherry, he prefers apple to cherry, so there is no circle to sell him." The numbers agree with the stage (30¢, 60¢, 20¢ = 2 paid swaps before refusal).
- Reveal verdict when the third option was chosen: "Not quite: it was “Cherry, 60¢ poorer”."
- Reload mid-lesson: restarted at `predict`, reveal count 0, both sizes.
- Page and console errors: none. Horizontal overflow: none at either size. Elements past the viewport edge: 0. Smallest rendered text 10px.

## Observations (what was seen, not what should be)

- At 360x640 after Reveal the rings and swap arrows are scrolled out of the stage window; the 6 swaps, 3 swaps, Rank and Back controls and the reveal text are visible and readable (`artifacts/explore/shots/the-swap-that-goes-in-circles-360-reveal.png`, opened and viewed). Same crop recorded earlier.
- 'Why trust this' showed 4/6 claims checked at this build (fact-checker editing in parallel).
- meta.json version is 1 after a reveal text change; whether that needs a bump is the builder's and lesson-pipeline's call.
- Not exercised: keyboard-only walk, reduced motion, dark mode, feed swipe-away. The browser run does not show that anyone learned.

A pass means the contract held in a browser. It is not evidence that anyone learned.
