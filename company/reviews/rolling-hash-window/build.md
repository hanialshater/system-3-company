# Build note: rolling-hash-window

Builder: algo-pair-08 · 2026-10-14 · status draft. Kept from evaluators until they report.

## What was built
Per `company/design/specs/rolling-hash-window.md` and the coordinator's updated brief: text EBCDAFFABCDE, pattern ABCDE (5 letters, sum 15), A=1 ... F=6. The spec body still described CBADAB; the header note and the coordinator message gave the new example, and I laid the stage out afresh (12 tiles, 5-tile window outline, "-5 / +6" chips over the leaving and arriving tiles, equation line, history row of sums, letters-added counter for sliding vs re-adding).

## Node check (numbers on the stage)
Window sums 15 16 20 18 16 18 16 15; flags at windows 1 (EBCDA, false) and 8 (ABCDE, true). Letters added up: sliding 5 + 7x2 = 19, re-adding 8x5 = 40.

## Decisions
- **Flag at the start:** window 1 (EBCDA) is flagged before any slide, so the DOM order is Check letters, Slide, Slide to end. That makes the QA path one press per milestone (`false-flag-checked`, then `second-flag` by Slide to end). The spec's order (Slide first) would have left Check disabled.
- **A flag must be checked before moving on:** Slide and Slide to end are disabled on a flagged, unchecked window. Without this a learner who slid away from window 1 could never reach the false-flag milestone (no back button, and none is wanted). This also matches how Rabin-Karp works.
- Check and Slide to end act at once, with no animation, so they fit QA's 450 ms wait.
- "Letters added up" counts letters added to or subtracted from a sum, not letters compared in a check (claim c3 says so).
- The reveal shows the learner's real state: it names the false flag only if they checked it, and the match as confirmed only if they checked ABCDE.
- The plain-sum hash is the lesson's toy; Karp-Rabin use a polynomial hash. The reveal does not claim otherwise; c5 flags the citation for the fact-checker.

## Not done / for others
All claims `unverified`. Evidence blocks empty. The spec file and SVG still show the old CBADAB layout (interaction designer).


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Text is now FEBCDAFFABCDE so the first action is a slide; the false flag EBCDA is window 2. Options bare (All 5 / Just 2 / About 3). Counter hidden while locked. 'kept: already in the sum' bracket under the shared letters. 'Slide to end' reports 'N slides × 2 letters'. Retitled. Window-width control not added (reviewer's minor 4).
- Claims reopened (status unverified): c1, c2, c3, c5; new c6.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
