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

## v3 · 2026-10-16 · demo-builder (Wave J revisions, mailbox 20261016T152552171Z-principal-pm-verticals-57f8213a item 1; spec r6-ai A2 items 1-7)

Worktree s3c-wjrev6, branch wj-rev-r6, from d37f621. Status `draft`, version 3. Kept from evaluators until they report.

| Item (board) | What was done | Result |
|---|---|---|
| A2.1 reveal last sentence (W-1379) | First built the ruled sentence "Otherwise no high/low score that makes mistakes can be honest in both groups and match both errors." On the production build, reveal-fit gave **crop 16 px** (91 words). Used cm-ai's pre-approved fallback: "**Otherwise no high/low score that makes mistakes is honest with matching errors.**" With it: crop 0 (below). Sentence 1, the slider sentence and "guilty or not" are untouched. | fixed (fallback, pre-approved) |
| A2.2 c4 rewritten (W-1379) | c4 text is the ruled wording with the rendered fallback quoted; support `source` -> `derivation`; unverified; source carries FC 35/62's derivation and the note that Chouldechova 2017 and Kleinberg et al. 2017 are not the support. | fixed |
| A2.3 recall + c7 (W-1379) | Recall question and why are cm-ai's text word for word; options and answer 0 unchanged. New claim c7 (`derivation`, unverified). Builder's node: p = 0.05 + 0.25f; p = 10% -> f 0.2, refused share 15.56%; p = 20% -> f 0.6, 52.50%. | fixed |
| A2.4 trace (W-1367, r15 note 3) | "B at ..." -> "Earlier at ..." in both trace strings; display logic unchanged. c3 text updated to quote the new strings, reset to unverified. | fixed |
| A2.5 term unification (W-1368) | Hook "One risk score is equally honest for two groups. Who gets wrongly flagged?"; predict "... or low (20%), honest in both groups. Among A's non-reoffenders, the share flagged is:". Options and answer (1, "Higher than B's") unchanged; the predict answer does not move. | fixed |
| A2.6 unchanged | Ring counts, B's "32", c1, c2, c5, c6 (their quoted strings did not change; still verified). | as ruled |

Claims: c3, c4 unverified (reset); c7 new, unverified; c1, c2, c5, c6 verified (untouched). `grep -c "high/low score" Demo.tsx` = 1.

### Stage word budget (v3, decision 2026-10-16-stage-word-budget-counting)

Counted from the rendered DOM (Playwright, 390x844, production build, the QA path), tokens with a letter. Busiest frame: B at 50 after the 32 case, trace on = **25** (tag 3, Show outcomes 2, trace "Earlier at 32: false alarms 6%, misses 50%." 5, headers "A: ringed / B: ringed" 4, "reoffend" 1, "false alarms" 2, "misses" 1, key "high risk / false alarm" 4, slider "Reoffenders in B" 3). Same at the open reveal. Other frames: locked 20, explore before outcomes 23, outcomes at 32: 24, at 41: 24. No stimulus. "Earlier" replaced "B", so the count is unchanged from v2.

### Reveal-fit (production build)

`NEXT_DIST_DIR=.next-r6 npx next build` in the worktree (tree d37f621 plus this change), `tools/serve.sh start 4163 .next-r6`, then `node tools/reveal-fit.mjs --url http://localhost:4163 calibrated-but-unequal-alarms small-gap-big-extremes tug-of-war-scale --jobs 3 --shots --out <scratch>/fit.json` (2026-10-16T15:38:38Z, tool commit 79c22aa, clean):

```
calibrated-but-unequal-alarms fit crop 0 phoneFit true hiddenBelow 0 namedHidden 0 words 86 lines 10 stage 343 {"picture":190,"table":0,"controls":85,"text":33} thumb false
{"viewport":"390x844","lessons":3,"fit":3,"scroll":0,"clip":0,"thumb":0,"errors":0,"cropped":0,"namedHidden":0,"phoneFit":3,"pass":3}
```

First run with the 17-word sentence (15:35:59Z): `fit+crop calibrated-but-unequal-alarms crop 16px ... 91 words`. Screenshot `artifacts/reveal-fit/calibrated-but-unequal-alarms.png` (I looked: trace "Earlier at 32: ..." on stage, all readouts and the last sentence on screen).

Rendered reveal on the QA path: "The score was honest in both groups: 8 in 10 ringed dots reoffended. Yet with 32 reoffenders in B, A's innocent people were flagged 20% of the time, B's 6%; B's misses were 50%, A's 20%. A has more reoffenders, so more of A is ringed, guilty or not. The slider changed B's people, not the score: at 50, base rates match, and so do both errors. Otherwise no high/low score that makes mistakes is honest with matching errors."

### Local contract QA (v3)

`QA_BASE_URL=http://localhost:4163 QA_ONLY=<the six Wave J slugs of this batch> npx playwright test tests/qa/contract.spec.ts --workers=3`: 12 passed (phone and desktop). Not a QA record; lane 10 writes those. Next checks (r6-ai A1b/A1c, lane 10's): fact-check of c3, c4, c7; r16 re-walk; W-1367 real-drag QA.
