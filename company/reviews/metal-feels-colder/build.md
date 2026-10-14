# Build note: metal-feels-colder

Builder: demo-builder (wave-i-physics), 2026-10-14. Brief: `company/domains/briefs/physics.electricity.md` round 3 #1. Status draft; every claim unverified.

Departures from the brief: the "tap a block" tool chips became four direct buttons (Probe metal, Probe wood, Touch metal, Touch wood), because QA presses each control once in DOM order and a tool-mode chip would leave a milestone unreachable. The material chip is one "Swap metal" button that also puts the finger on the new metal, so the metal's label, its "skin" line and its arrow always describe the same material. Steel properties (plain carbon steel, Incropera appendix A) were added by me; the brief gave only aluminium, pine and skin (claim c3 says so). Seen values are folded into labels under each block, as the brief's phone-fit note asked.

## Pre-flight v1

1. **Title and hook.** "Which block is colder?" / "Metal feels cold and wood feels warm. So which block in the room is colder?" It names the everyday feeling (the misconception) and does not say that they share a temperature.
2. **Options.** "The metal", "The wood", "Neither: both are 20 °C". The right option carries the only number, but 20 °C is the room temperature given in the question itself, so it is no more exact than the question; flag for the reviewer if they see it differently.
3. **Locked stage.** Two blocks on a table labelled "Aluminium" and "Wood (pine)", caption "Same room, all day." No thermometer, finger, arrow or reading is drawn before the commit.
4. **Reveal values.** "20 °C on both blocks": milestone "probe-both" (each probe recorded; "probe 20 °C" stays under each block). "about 21 °C on the metal": recorded at the last metal touch (milestone "touch-metal"; stage "skin 21 °C" under the metal). "about 30 °C on the wood": milestone "touch-wood"; stage "skin 30 °C". "4.4 times thicker" (4.6 with aluminium): recorded with the metal touch; drawn as the metal arrow (solid when touching, dashed outline otherwise) beside the wood arrow.
5. **QA path.** Probe metal, Probe wood ("probe-both"), Touch metal ("touch-metal", aluminium), Touch wood ("touch-wood"), Swap metal (finger on steel, record now steel 21 °C, 4.4x). All 3 milestones are reached by the 4th press. When the reveal opens, both "probe" lines, both "skin" lines and both arrows are on the stage.
6. **Reset.** There is no Reset control, so nothing can erase the records. Reveal from the QA-path run: "Your thermometer read 20 °C on both blocks. Yet when the finger touched, its skin dropped to about 21 °C on the metal and only to about 30 °C on the wood, and the metal's heat-flow arrow was 4.4 times thicker. Metal conducts heat away from your skin fast, so the skin cools; wood barely takes any, so the skin stays warm. Your finger senses heat leaving it, not the object's temperature."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 metal-feels-colder` (shared dev server, 2026-10-14): fit, crop 0 px, hiddenBelow 0, namedHidden 0, 81 reveal words, phoneFit true. Screenshot: `artifacts/reveal-fit/metal-feels-colder.png`. The reveal points at the probe lines, the skin lines and the two arrows, and all of them are visible. The picture is drawn at scale 1, so the 10.5–12 px labels render at 10.5–12 px.

Stage text at most 24 words (block names, 4 record lines, caption). No console errors in the locked frame. Not run: next build, computer-use QA, walkthrough (the task said not to).

## Revision v2 (demo-builder, 2026-10-14, learner r9: W-575)

- **Options.** "The metal" / "The wood" / "Neither" (was "Neither: both are 20 °C", the only option with a number and a reason).
- **"4.4 times" on the stage.** Each recorded arrow now carries its ratio to the wood arrow as a label: "4.6×" (aluminium) or "4.4×" (steel), "1×" (wood). Reveal: "the metal's heat-flow arrow read 4.4×, the wood's 1×." c4 updated, unverified.
- **Swap metal no longer looks dead.** The swap changes the arrow label 4.6× -> 4.4× (and the block name). The skin line stays 21 °C on both metals (20.6 vs 21.0 rounded); that is true and now sits beside a number that does change.
- Block label "Wood (pine)" -> "Wood" to keep stage text at 25 words with the two new labels.
- **Pre-flight 7.** crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 78 words counted by reveal-fit. Measured with tools/reveal-fit.mjs logic against the shared dev server localhost:3530 (390x844 touch). The stock script timed out on page.goto (the dev server took 30-50 s to DOMContentLoaded and up to 3 min to hydrate under load average ~30), so I ran a scratch copy with only the goto/wait/tap timeouts raised (scratchpad reveal-fit-slow.mjs; measurement code unchanged). Results in artifacts/reveal-fit/r9-revise*.json.
