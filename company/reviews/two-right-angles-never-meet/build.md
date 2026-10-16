# Build note: two-right-angles-never-meet

- Builder: wave-i-math (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/math.md #56 (cm-math). Kept from evaluators until they report.
- Stage: fixed base (1 base = 80 px) with a square left corner and vertical left side; the learner turns the right corner B from 60° to 90°. Sides meet tan(B) bases up; top corner 90° − B. From about 64° the meeting point is off the card (arrowheads on both sides); at 90° the sides stand parallel and the readout says "never". "Sides meet" and "top corner" readouts are drawn inside the picture (folded in to fit the phone).
- Departure from the brief: the brief says "one dial". QA presses a slider only twice (60 → 62), so I added two presets after it, "Set 89°" and "Set 90°", which reach the key states. Each is disabled while already at its value, so no press is dead.
- Milestones: `near` (B in 85..89°; the largest such B is recorded) and `ninety` (B = 90°). Each leaves a dashed trace with a label ("89° → 57.3 up", "90° → never") that stays after the learner moves on, so the reveal's numbers stay on the stage.
- Rounding: the readout, trace and reveal share fmtH (2 decimals under 10, 1 under 100), so the reveal says "57.3 bases up" where the brief said "57".
- overlap.mjs was not run (brief asked for it before build; it is a cm-math check, not in this dispatch).
- Not run (per dispatch): next build, QA, walkthrough.

## Pre-flight v1

1. Title and hook: "Two right angles in one triangle?" / "Put two square corners on one base. What would the third corner have to look like?" Neither says whether it is possible; no.
2. Options: "Yes, if it is tall enough" / "Yes, if its base is short enough" / "No, never". None numbered, all short clauses at the same precision.
3. Locked stage: a 60° right-corner triangle with a square left corner, labels "90°", "60°", "1 base", "top ?", readouts "sides meet ?" and "top corner ?", caption "On a flat page.", disabled "Set 89°" / "Set 90°". Nothing marks parallel sides or "never"; the 90° preset is the question's own case, not the answer.
4. Reveal values: "180°", "0°" (fixed facts, c1; not stage states). "at 89°" = (b) the largest B recorded by milestone `near`; "57.3 bases up" and "1° tip" = (b) fmtH(tan(near)) and 90 − near from the same record; "at 90° they stood parallel" = (b) milestone `ninety`.
5. QA path: slider 60 → 62 (two arrows), "Set 89°" (near), "Set 90°" (ninety). Both milestones reached; at the reveal the stage is at 90° (parallel, "never") and the 89° dashed trace with "89° → 57.3 up" is still drawn.
6. Reset: there is no Reset control. Moving the slider back to 60° keeps both traces and both records. Reveal text from the QA run: "Suppose a triangle had two right angles. Those two corners already use all 180°, leaving 0° for the third. / You watched it happen: at 89° the sides met 57.3 bases up with a 1° tip; at 90° they stood parallel and never met. / The assumption leads to an impossible triangle, so it is false. That is proof by contradiction: assume it, follow it, hit a wall."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 two-right-angles-never-meet`, dev server, 2026-10-14): first build crop 21 px (readouts on their own wrapped row); after folding both readouts into the picture: crop 0 px, hiddenBelow 0, namedHidden 0 ("never" visible), 72 words with the verdict. Stage 357 px (picture 200, controls 85, text 34), reveal 232 px, window 618 px. Both traces, both sides and the "never" readout are on screen with the reveal's last line.

## v2

- Builder: demo-builder (math r5 B4, `company/ops/dispatch-requests/2026-10-16-r5-math.md#B4`), 2026-10-16. Ruling M3 (cm-math). Inputs: learner r1 finding 3 and the clipped-label note (`2026-10-16-learner-adult-beginner-r1.md`). Kept from evaluators until they report.
- **M3a, readout fit (layout only).** The four in-picture readouts ("sides meet", "N bases up" / "never", "top corner", "N°") were start-anchored at x = 226 of a 320-wide viewBox, so "57.3 bases up" (14 px bold) ran past x = 320 and was clipped to "bases u". They are now end-anchored at x = W − 6 = 314 (`textAnchor="end"`). Words, sizes (11 px labels, 14 px values) and vertical positions unchanged; nothing else on the stage moved. Measured with getBBox at 390×844 (Playwright, `next start` on .next-m5): "1.88 bases up" at 62° spans x 216.0-314.1, "57.3 bases up" at 89° spans 216.0-314.1, "never" at 90° spans 274.3-314.1; all inside the viewBox (0-320). The right side of the triangle at 89-90° is at x ≈ 200, so the readout (from x 216) does not overlap it. No font below 10 px, no re-layout.
- **M3b, reveal.** P1 and P2 replaced with the ruling's text exactly; P3 unchanged. P2's sentence is split into two: "...with a {90 − near}° tip. Setting 90° was that assumption, and the sides stood parallel and never met." The numbers are the same values as v1 (milestone `near`, fmtH; milestone `ninety`).
- **Claims.** None changed in text, numbers or status (c1-c5 identical to v1, compared by JSON). No claim reset: c1's source quotes "Those two corners already use all 180°, leaving 0° for the third.", which is still the reveal's text; c3 and c4 keep their meaning, as M3 states. Whether the new P2 wording ("Setting 90° was that assumption") needs a fact-check is for the fact-checker or cm-math to say; the ruling says it does not.
- meta.json `version` 2, status stays `review`.

### Stage word budget v2 (decision 2026-10-16, Ruling 2)

Counted from the rendered stage (`data-testid="stage"` text nodes, tokens with a letter), every frame on the QA path:

| Frame | Words |
|---|---|
| locked | 19 |
| 60° (unlocked) | 23 |
| 62° | 23 |
| 89° | 23 |
| 90° | 23 |
| reveal open | 23 |

Busiest frame 23 ≤ 25 (stimulus 0, other 23). At 89°: "up" 1, "1 base" 1, "sides meet" 2, "bases up" 2 ("bases" is a spelled-out unit, counts 1), "top corner" 2, caption 11, "Right corner" 2, "Set" ×2 = 23; numerals, "°" and "→" count 0. M3 adds no stage words (v1 had the same 23).

### Pre-flight v2

1. Title and hook unchanged: "Two right angles in one triangle?" / "Put two square corners on one base. What would the third corner have to look like?" No.
2. Options unchanged: "Yes, if it is tall enough" / "Yes, if its base is short enough" / "No, never". None numbered.
3. Locked stage unchanged except the readout anchor: "90°", "60°", "1 base", "top ?", "sides meet ?", "top corner ?", caption "On a flat page. Make a prediction to start." Nothing matches the right option.
4. Reveal values: "180°", "0°" fixed facts (c1). "at 89°", "57.3 bases up", "1° tip" = (b) milestone `near` record. "Setting 90° ... parallel and never met" = (b) milestone `ninety`.
5. QA path: slider 60 → 62, "Set 89°" (near), "Set 90°" (ninety). At the reveal the stage is at 90° ("never") with the "89° → 57.3 up" and "90° → never" traces drawn.
6. Reset: no Reset control (as v1). Reveal text from the run: "Assume a triangle had two right angles. Those two corners already use all 180°, leaving 0° for the third. / You watched it happen: at 89° the sides met 57.3 bases up with a 1° tip. Setting 90° was that assumption, and the sides stood parallel and never met. / The assumption leads to an impossible triangle, so it is false. That is proof by contradiction: assume it, follow it, hit a wall."
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3655 two-right-angles-never-meet --shots` (production build of 60b6d50, 2026-10-16): verdict fit, **crop 0**, **phoneFit true**, namedHidden 0 ("never" visible), hiddenBelow 0, 77 words (verdict included), picture fitted 183/200, stage 340 px, reveal 253 px, window 618 px. Summary line: `{"viewport":"390x844","lessons":1,"fit":1,"clip":0,"thumb":0,"cropped":0,"namedHidden":0,"phoneFit":1,"pass":1,"tool":{"head":"60b6d50","clean":true}}`.

### Screenshots (390×844, local, gitignored)

- 89° frame, whole readout "57.3 bases up" inside the stage: `/home/user/s3c-m5/artifacts/two-right-angles-v2/89deg.png` (copy: `/home/user/system-3-company/artifacts/two-right-angles-v2/89deg.png`)
- 62° frame: `.../two-right-angles-v2/62deg.png`; 90° frame: `.../90deg.png`; open reveal: `.../reveal.png` and reveal-fit's `artifacts/reveal-fit/two-right-angles-never-meet.png`.

### Local contract QA (builder's pass, not a QA record)

`QA_BASE_URL=http://localhost:3655 QA_ONLY=two-right-angles-never-meet npx playwright test --workers=2` on the 60b6d50 build: `contract.spec.ts > two-right-angles-never-meet > follows the lesson contract` passed on phone and desktop. 10 passed, 2 failed: `feed.spec.ts > subject chips filter the feed` (phone, desktop). I read that failure as an artifact of `QA_ONLY`: the test's allowed set comes from the filtered lesson list (one slug) while the Math chip shows every math lesson. It does not touch this lesson's code. The qa-tester's record on the v2 commit is the evidence, not this run.
