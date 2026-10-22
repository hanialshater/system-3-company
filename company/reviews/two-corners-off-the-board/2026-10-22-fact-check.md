# Fact-check: two-corners-off-the-board (v1)

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read first: artifacts/walkthroughs/two-corners-off-the-board/transcript.md and sheet.png, then meta.json claims, Demo.tsx and brief company/domains/briefs/math.discrete.md:519-536. build.md / design.md not read.

## Method
- My own brute force (Python, independent of the brief's script): the full 4×4 board has 8 dark, 8 light and 36 tilings. Opposite corners (0,0),(3,3) off: 6 dark, 8 light, 0 tilings, and the maximum placement is 6 dominoes (154 such placements). Corners (0,0),(0,3) off: 7 and 7, 12 tilings. 8×8 without (0,0),(7,7): 30 dark, 32 light. 6×6: 18 dark, 18 light. These match `math-wave-j-check.mjs` D4.
- Fixed tries in Demo.tsx BOARDS: each opposite-corner try leaves exactly (2,3)/(3,2), (0,3)/(3,0) and (0,1)/(1,0), all light (r + c odd), as c2 says. The one-row tries are: all horizontal; bottom two rows as four vertical; [1,5],[2,6],[4,8],[7,11] vertical plus [9,10],[12,13],[14,15] horizontal (four vertical, three horizontal). The module-load check confirms every domino is two neighbouring on-board cells and the dominoes are disjoint.
- Drawing (sheet.png): dark squares carry dots, (0,0) is dark, and every drawn domino spans one dotted and one plain square. Step 1 outlines (2,3) and (3,2) as uncovered. The steps 2–3 tilings match tries 1–2. The readouts are 6/8 and 7/7.
- c1: neighbours differ by 1 in r + c, so they have opposite parity.
- c3 recall: removing two same-colour squares from 6×6 leaves 16 and 18; 17 dominoes need 17 of each, so the answer "No, never" is right.
- Every factual sentence in the reveal and on the stage maps to c1–c3. No unrecorded claims.

## Claims

| claim | new status | note |
|---|---|---|
| math.two-corners-off-the-board.c1 | verified | Neighbouring squares differ by 1 in r + c, so one is dark and one is light. |
| math.two-corners-off-the-board.c2 | verified | Brute force: 6/8, 0 tilings, max 6; 7/7, 12 tilings. All three fixed tries leave the named light squares; the tilings are as described. |
| math.two-corners-off-the-board.c3 | verified | 8×8 opp: 30/32 (both corners have r + c even). 6×6 recall: 16/18, so 17 dominoes cannot fit. |

Verdict: pass
