# Build note: head-on-is-a-wall

Builder: demo-builder (wave-i-physics), 2026-10-14. Brief: `company/domains/briefs/physics.mechanics.md` round 3 #1. Status draft; every claim unverified.

Departure from the brief: there is no separate Crash button. Each target chip (Into a car, Into a wall) and each speed chip (25, 50, 100 km/h) sets up the crash and runs it at once, with a 400 ms replay. QA presses each control once in DOM order, so a Crash button that had to follow every chip could not reach the three milestones. A chip is disabled while it would only repeat the crash that is already on screen. The crumple drawn at the end is the same at every speed and is decorative; no claim rests on it.

## Pre-flight v1

1. **Title and hook.** "Two cars at 50, head-on" / "Two identical cars, both at 50 km/h, meet head-on. What is that crash like for car A?" Neither names a wall speed.
2. **Options.** "25 km/h", "50 km/h", "100 km/h": all numbered, same precision.
3. **Locked stage.** An empty "car A crush energy" bar frame, a road with car A on the left and car B on the right, "car A 50 km/h", and the caption "1,500 kg cars, rigid wall". There is no meeting-point marker (it appears after the first head-on crash) and no wall or energy values.
4. **Reveal values.** "145 kJ" for the head-on crash: milestone "car-50" (recorded; stage "car 50: 145 kJ" plus a dashed outline on the bar). "the 50 km/h wall (145 kJ)": milestone "wall-50"; stage "wall 50: 145 kJ". "579 kJ, 4 times higher": milestone "wall-100"; stage "wall 100: 579 kJ" and the live bar; the ratio is computed from the two records. "the meeting point, which never moved": the dashed "meeting point" line, drawn after the first head-on crash and kept from then on.
5. **QA path.** Into a car (crash car 50, "car-50"), Into a wall (wall 50, "wall-50"), 25 km/h (wall 25), 50 km/h (wall 50 again), 100 km/h (wall 100, "wall-100"). All 3 milestones. The 400 ms replay ends inside QA's 450 ms wait. When the reveal opens, the three record lines, the dashed outlines and the live 579 kJ bar are visible. The dashed "meeting point" line stays marked once any head-on crash has been seen, and the wall stands on it, so it is on screen too.
6. **Reset.** There is no Reset control. Reveal from the QA-path run: "Your 50 km/h head-on crash filled car A's crush bar to 145 kJ, as high as the 50 km/h wall (145 kJ). The 100 km/h wall filled it to 579 kJ, 4 times higher. The cars stopped at the meeting point, which never moved, so each stopped from 50 to 0 in its own crumple zone, as against a wall. Doubling the closing speed doubles the total energy, but two cars share it. Crush energy grows with speed squared."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 head-on-is-a-wall`: fit, crop 0 px, hiddenBelow 0, namedHidden 0, 85 reveal words (89 before a trim), phoneFit true. Screenshot: `artifacts/reveal-fit/head-on-is-a-wall.png`.

Stage text at most about 24 words. No console errors in the locked frame. Not run: next build, computer-use QA, walkthrough (per the task).

## Pre-flight v2

Builder: demo-builder (physics-r5-b2-builder-head-on-v2), 2026-10-16. Batch: `company/ops/dispatch-requests/2026-10-16-r5-physics.md#B2`, rulings R7 and R8. Lesson commit 9e7d37c (branch phys-headon-v2). Status stays `review`. c1 and c4 reset to `unverified` (R7); c2, c3, c5 unchanged.

Changes: (R7) reveal paragraph 2 is now word for word "The meeting point never moved, so each car stopped from 50 to 0 in its own crumple zone, as against a wall. Two cars at 50 carry twice one car's energy, and each crumple zone takes its own half. Crush energy grows with speed squared." Paragraph 1 is unchanged. (R8) one condition in Demo.tsx: a speed chip gets the `active` class only when `!locked && config.speed === v`. No layout change, no new control, no new text, and the QA path and milestones are as in v1. After the commit, the 50 km/h chip shows selected as in v1, because the hint and "Into a car" run at 50.

1. **Title and hook.** Unchanged from v1: "Two cars at 50, head-on" / "Two identical cars, both at 50 km/h, meet head-on. What is that crash like for car A?"
2. **Options.** Unchanged: "25 km/h", "50 km/h", "100 km/h".
3. **Locked stage.** Read from the built page at 390×844 on :3595 (Playwright, 2026-10-16): stage text "car A crush energy B A car A 50 km/h 1,500 kg cars, rigid wall Into a car Into a wall 25 km/h 50 km/h 100 km/h". Control states: `[{"t":"Into a car","active":true,"disabled":true},{"t":"Into a wall","active":false,"disabled":true},{"t":"25 km/h","active":false,"disabled":true},{"t":"50 km/h","active":false,"disabled":true},{"t":"100 km/h","active":false,"disabled":true}]`. No speed chip is selected. The only selected chip is "Into a car", which matches no predict option. Drawn: an empty bar frame, cars A and B, "car A 50 km/h", and the caption. There is no meeting-point line, wall or values. One residual remains for cm-physics, and R8 does not cover it: the SVG readout "car A 50 km/h" is not a chip, but it does contain the right option's text. It restates the question's scenario ("both drive at 50 km/h"), as v1 did. I left it alone because R8 scopes chips only and says R8 must not add words or change the layout. Whether it goes is a teaching call.
4. **Reveal values.** Unchanged from v1 (145 kJ from milestone "car-50", 145 kJ from "wall-50", 579 kJ and the ratio from "wall-100"). "The meeting point never moved" refers to the dashed "meeting point" line, which is drawn after the first head-on crash and kept. "twice one car's energy" and "its own half" are words with no rendered number (c4).
5. **QA path.** Unchanged: Into a car (car-50), Into a wall (wall-50), 25, 50, 100 km/h (wall-100). All 3 milestones. Local contract QA passes (below).
6. **Reset.** No Reset control. Reveal from the QA-path run (reveal-fit screenshot): "Your 50 km/h head-on crash filled car A's crush bar to 145 kJ, as high as the 50 km/h wall (145 kJ). The 100 km/h wall filled it to 579 kJ, 4 times higher. The meeting point never moved, so each car stopped from 50 to 0 in its own crumple zone, as against a wall. Two cars at 50 carry twice one car's energy, and each crumple zone takes its own half. Crush energy grows with speed squared."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3595 head-on-is-a-wall --width 390 --height 844 --shots` (tool commit 79c22aa, head 9e7d37c, clean): verdict fit, crop 0, phoneFit true, hiddenBelow 0, hiddenAbove 0, namedHidden 0 ("meeting point" visible), revealWords 85 (the same as v1, ≤ 90), revealLines 11. Screenshot: `artifacts/reveal-fit/head-on-is-a-wall.png` (local, untracked). It shows the stage top, the three record lines, the bar, the meeting-point line and the whole reveal on screen.

### Stage word budget (decision 2026-10-16, Ruling 2: numbers and units after a number count 0)

| Frame | Tokens counted | Words |
|---|---|---|
| Locked | car A crush energy (4), B (1), A (1), car A [50 km/h] (2), [1,500 kg] cars, rigid wall (3), Into a car (3), Into a wall (3), [25/50/100 km/h] (0) | 17 |
| Reveal open (QA path end, wall 100) | car A crush energy[: 579 kJ] (4), car/wall/wall [records] (3), meeting point (2), A (1), car A [100 → 0 km/h] (2), caption (3), controls (6) | 21 |
| Busiest (all three records seen, then Into a car again) | the reveal frame + B (1) | 22 |

Busiest frame: 22 words ≤ 25. No stimulus is declared. R8 added no words: the change is a class condition only.

### Local contract QA (the builder's pass, not the qa-tester's record)

`next build` with NEXT_DIST_DIR=.next-ph5 at 9e7d37c, `tools/serve.sh start 3595 .next-ph5`. `QA_BASE_URL=http://localhost:3595 QA_ONLY=head-on-is-a-wall npx playwright test --workers=2`: "follows the lesson contract" passed on phone and desktop. Feed tests: 8 passed and 2 failed ("subject chips filter the feed", phone and desktop). The failure comes from QA_ONLY: it narrows `lessons()` to this one slug, while the physics chip shows every physics card. The same test, rerun without QA_ONLY against the same server, passed 2/2. `npm run typecheck` exit 0. A second Playwright probe of the locked frame at 390×844 logged 0 console or page errors.
