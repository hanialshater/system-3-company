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
