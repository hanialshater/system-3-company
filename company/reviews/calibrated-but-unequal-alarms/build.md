# Build note: calibrated-but-unequal-alarms (demo-builder, wave-i-ai, 2026-10-14)

Brief: `company/domains/briefs/ai.ai-society.md` item 56. Status draft, version 1. Claims c1-c5 unverified; c4 (Kleinberg et al. 2017, Chouldechova 2017) is a real-systems citation for the fact-checker. The optional COMPAS sentence (brief claim 5) is not in learner text.

- Stage: two 10 x 10 dot grids (A left, B right). Ringed dots = labelled high risk, in the top rows. "Show outcomes" fills reoffenders dark, leaves the others light and turns the ring red on false alarms. Under each grid: "false alarms x of y = z%" and "misses x of y = z%". Which dots reoffend is a fixed pattern ((i + row) % 5), exact 80% / 20% for every slider value.
- Controls in DOM order: Show outcomes (one-shot, then disabled), slider "Ringed in B" (5 to 50, step 15, start 20).
- Milestones: question-case (outcomes shown with B at 20) and rates-equal (outcomes shown with B at 50). A one-line stage message keeps the other key state as a trace: at B = 50 it shows "Seen: B at 20 ringed, false alarms 6%, misses 50%."; elsewhere "Seen: B at 50 ringed, both errors 20%, as in A."
- Departures from the brief: slider 5 to 50 step 15 (brief: 10 to 50) so QA's two arrow presses go 20 -> 35 -> 50; no Reset control (the slider is the only state, so Reset would duplicate it); the third milestone ("one other slider value") is dropped, since reaching 50 passes 35. The reveal draft is reworded, not cut: "the high box" became "is ringed" (the stage's word), "no score" became "no imperfect score" (Kleinberg et al. exempt a perfect predictor), and paragraph 2 follows the current state (matches/matched). Reveal 80 words, brief draft 82.

## Pre-flight v1
1. **Title and hook.** "Same honest score, same false alarms?" / "One risk score is equally accurate for two groups. Who gets wrongly flagged?" Names no group and no direction.
2. **Options.** "The same as B's" / "Higher than B's" / "Lower than B's": none numbered, all at the same precision.
3. **Locked stage.** Grey dots, the ringed top rows (A 50, B 20, the question's own setup), "false alarms –" and "misses –" under each grid, slider at 20 of 100 and disabled. No outcome colours, no rates, no reoffender counts.
4. **Reveal values.** "8 in 10 ringed dots reoffended": (a) true of every state by construction. "at 20 ringed in B, 20% ... 6% ... 50% ... 20%": (a) the current slider value when it is not 50, and then the readouts show the same numbers; at 50, (b) milestone question-case (B = 20), shown in the stage trace line. "At 50 ringed ... matches/matched": (b) milestone rates-equal; at 50 it is the current readouts, otherwise the trace line.
5. **QA path.** Show outcomes (question-case, B at 20), then slider 20 -> 35 -> 50 (rates-equal). Both milestones reached. At the reveal B is at 50: readouts show A and B both at 20% / 20%, and the trace line shows "Seen: B at 20 ringed, false alarms 6%, misses 50%."
6. **Reset.** No Reset control. Reveal text on the QA run (B at 50): "The score was honest: in A and in B, 8 in 10 ringed dots reoffended. Yet at 20 ringed in B, 20% of A's innocent people were flagged against 6% of B's, and B's misses were 50% against A's 20%. A has more reoffenders, so more of A is ringed, guilty or not. At 50 ringed, B's base rate matches A's, and so do both errors. Unless base rates match, no imperfect score is calibrated and equal on both errors."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 calibrated-but-unequal-alarms` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 87 words with the verdict (80 reveal). Stage 312 px (picture 179, controls 85, text 17). The reveal points at the ringed dots, the red false-alarm rings, the readout lines and the trace line, all on screen. Smallest rendered svg label 10.35 px; no control under 24 px. Screenshot `artifacts/reveal-fit/calibrated-but-unequal-alarms.png`.

Not run: next build, QA, walkthrough (per task). registry, tsc and `npm run check` pass (879 lessons, 0 warnings).

## v2 · 2026-10-16 · demo-builder (B1, board W-1265, batch company/ops/dispatch-requests/2026-10-16-r3-verticals.md#B1)

From `2026-10-16-learner-adult-beginner-r14.md` (verdict revise). Status set back to `draft`, version 2.

| r14 finding | What was done | Result |
|---|---|---|
| 1. Slider labelled as flagging, but it moves B's reoffenders | Relabelled the slider **"Reoffenders in B"**; it now reads B's base rate (23 / 32 / 41 / 50), and the ringed count follows in the grid header ("B: 20 ringed"). Chose relabel over splitting into two controls: a separate "ringed" control would let ringing drift from the score's 80%/20% rule, so the score would stop being calibrated, which changes what the lesson teaches. Relabelling is the smaller change and keeps the model as it is. Reveal adds "The slider changed B's people, not the score" (new claim c6). | fixed |
| 2. Ringed counts only in the picture | Headers now say "A: 50 ringed" / "B: 20 ringed", and the reoffender counts (50 / 32) show from the locked frame, so the prediction can be reasoned from the text | fixed |
| 3. "imperfect score" new at the last line | Now "Otherwise no score that makes mistakes is calibrated with equal errors." (c4 reset) | fixed |
| Note: two ring colours, one explained | Key under the picture: ring = "high risk" (always), red ring = "false alarm" (after Show outcomes); the dark-dot icon marks the "50 reoffend" row | fixed |
| Note: only one slider value visited | Not added as a step. On the QA and learner path the slider passes 41 on the way to 50, and the readouts show it (false alarms 12%, misses 32%) | not done (optional) |

Other changes: readouts are a three-row table (reoffend / false alarms / misses) with row labels on A's side only, written "10/50 = 20%", which keeps the stage at 25 words or fewer; the trace now says "B at 32: false alarms 6%, misses 50%." / "B at 50: both errors 20%."; the explore hint is "Show the outcomes, then change how many in B reoffend." Claims c1-c4 reset to unverified (their visible text changed), c6 is new and unverified, c5 is unchanged (still verified).

Node check (port of reoffends()/rates(), 2026-10-16): h = 5/20/35/50 gives reoffenders 23/32/41/50 (= 20 + 0.6h), ringed reoffenders 4/5, 16/20, 28/35, 40/50 (80%), others 19/95, 16/80, 13/65, 10/50 (20%); B false alarms 1/77, 4/68, 7/59, 10/50; misses 19/23, 16/32, 13/41, 10/50. No verified number changed.

Stage word count (decision 2026-10-16-stage-word-budget-counting): busiest frame is B at 50 with the trace, 25 (tag 3, Show outcomes 2, trace 5, headers 4, reoffend 1, false alarms 2, misses 1, key 4, slider 3). After Show outcomes at 20: 24. Before outcomes: 23.

## Pre-flight v2
1. **Title and hook.** Unchanged: "Same honest score, same false alarms?" / "One risk score is equally accurate for two groups. Who gets wrongly flagged?" Names no direction.
2. **Options.** Unchanged: "The same as B's" / "Higher than B's" / "Lower than B's", none numbered.
3. **Locked stage.** Grey dots, rings on A's top 50 and B's top 20, "A: 50 ringed", "B: 20 ringed", "50 reoffend" / "32", key "high risk", slider "Reoffenders in B 32" disabled. No outcome colours, no false-alarm or miss rates. The counts are the setup the question needs (finding 2); none of them names "higher".
4. **Reveal values.** "8 in 10 ringed dots": (a) true of every state. "with 32 reoffenders in B ... 20% ... 6% ... 50% ... 20%": (a) the current slider when it is not 50, matching the readouts; at 50, (b) milestone question-case, shown as the trace "B at 32: false alarms 6%, misses 50%.". "at 50, base rates match/matched": (b) milestone rates-equal; at 50 the readouts, elsewhere the trace "B at 50: both errors 20%.".
5. **QA path.** Show outcomes (question-case at 32 reoffenders), slider two presses 32 -> 41 -> 50 (rates-equal). Both milestones in 3 presses; at the reveal the trace shows the 32 case and the readouts show 50. Local contract QA passed (below).
6. **Reset.** No Reset control (unchanged). Reveal on the QA run: "The score was honest in both groups: 8 in 10 ringed dots reoffended. Yet with 32 reoffenders in B, A's innocent people were flagged 20% of the time, B's 6%; B's misses were 50%, A's 20%. A has more reoffenders, so more of A is ringed, guilty or not. The slider changed B's people, not the score: at 50, base rates match, and so do both errors. Otherwise no score that makes mistakes is calibrated with equal errors."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:4111 calibrated-but-unequal-alarms cut-the-busiest-link --shots --out <scratch>/fit.json` (production build, NEXT_DIST_DIR=.next-wj3, commit 5d86720 plus the working-tree fixes committed with this note; recorded 2026-10-16T13:01:15Z): **verdict fit, crop 0 px, phoneFit true**, hiddenBelow 0, namedHidden 0, thumb false, 85 words (reveal-fit count, verdict included), revealLines 10, stage 343 px (picture 190, controls 85, text 33), the card fits the picture to 190/196. Summary `{"fit":2,"thumb":0,"cropped":0,"namedHidden":0,"phoneFit":2,"pass":2}`. Two fixes on the way: v2's first cut was 103 words, crop 37 px; tightening the reveal (no idea dropped) gave crop 0. The key's 16 px ring icons first had a viewBox, and reveal-fit took one as "the picture" (thumb, 16 px at 0.05) because the main svg is data-reveal-fit; the icons now have no viewBox. The reveal points at the ringed dots, red rings, readouts and trace, all on screen. Screenshot `artifacts/reveal-fit/calibrated-but-unequal-alarms.png`.

Local contract QA: `QA_BASE_URL=http://localhost:4111 QA_ONLY=calibrated-but-unequal-alarms,cut-the-busiest-link npx playwright test tests/qa/contract.spec.ts --workers=2`: 4 passed (phone and desktop for both lessons). This is not a QA record; the evaluation steward writes those.

Checked by (asked): learner-evaluator r15 re-walk on v2, artifact first; fact-checker on c1-c4 and c6.
