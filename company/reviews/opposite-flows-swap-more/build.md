# Build note: opposite-flows-swap-more

builder: demo-builder (demo-builder-wavej-life) · 2026-10-14 · v1 draft · brief: company/domains/briefs/life.ecology-body.md #4 (check E4) · no spec

- Model as briefed: S sections; each tick every section's blood and water move to their average, the last blood section is read, blood shifts one section right (0 enters), water shifts one section along its direction (100 enters at its inlet); 2,000 ticks, computed at load. exchanger() re-run in node: same way 50 at S = 1, 4, 10; opposite 50, 80, 90.91. Matches E4.
- Stage: model line, readout "blood leaves at N", two pipes (water above, blood below) split into S sections; each section shows its levels as they arrive (before that tick's exchange) and is shaded by level; arrows for each flow; "100 in" at the water inlet, "0 in" at the blood inlet, the blood outlet value and "out". Results row "Blood out: same 10: 50 · opposite 1: 50 · …" keeps every combination tried.
- Why arriving levels: after the exchange both numbers in a section are equal (halfway), so showing them would hide the gap. Arriving levels show the water 18 above the blood in every section with opposite flows, and 50/50 from section 2 on with same-way flows: the cause the reveal names.
- Controls in DOM order: Same way (start, active and disabled), Opposite way, 1 section, 4 sections, 10 sections (start, active and disabled). Section buttons keep the direction.
- Milestones (minInteractions 2): opp10 (opposite, 10 sections), oppOther (opposite at 1 or 4). When the reveal opens the question's case (opposite, 10 sections) is put back on the stage.
- The brief's gill sentence (claim 3 in the brief) is not on the card. The recall question uses two water pipes, not an animal, so it needs no outside source.
- Claims c1 to c5, all unverified.

## Pre-flight v1

1. **Title and hook.** "Same pipes, flip one flow" / "Water and blood run side by side and swap oxygen. Does the water's direction matter?" They ask whether direction matters, not by how much.
2. **Options.** "50" / "70" / "90": all numbers, same precision.
3. **Locked stage.** The brief's setup text, "blood leaves at ?", two pipes of 10 empty sections, "water" and "blood" labels. No arrows, no levels.
4. **Reveal values.** "met at 50": model, same way at 10 sections is the start state and stays in the results row as "same 10: 50". "in every section the water was still richer": the arriving levels on the stage (opposite, 10 sections, shown at the reveal). "91": (b) milestone opp10, the readout and the outlet label. "closer to 100": the results row (opposite 1: 50, 4: 80, 10: 91; milestone oppOther). "stays at 50 however long": derivation, told (claim c3).
5. **QA path.** Opposite way (opp10), 1 section (oppOther), 4 sections, then 10 sections becomes enabled again only after another count is chosen (pressed if reached). Both milestones within the first 2 presses.
6. **Reset.** No Reset control. Reveal after the QA path: "Flowing the same way, blood and water met at 50 and stopped exchanging. Flowing opposite ways, the blood about to leave met the freshest water, so in every section the water was still richer than the blood beside it. / The blood left at 91 of 100, with the same pipes and speeds. More sections push it closer to 100; the same-way pipe stays at 50 however long it is. Toy model."
7. **Phone fit.** Measured with the `tools/reveal-fit.mjs` logic on the :3530 dev server (a copy with longer page-load timeouts only, artifacts/wavej-life-tools/reveal-fit-slow.mjs, because the shared dev server took 30 s or more a page): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; revealWords 76 (tool count, verdict line included). Stage parts: picture 117, controls 70, text 83. Smallest rendered SVG label over the QA path and at the reveal: 10.7 px ("water"). On screen with the reveal's last line: the section levels, the readout "blood leaves at 91", the outlet "91" and the results row. Screenshot artifacts/reveal-fit/opposite-flows-swap-more.png.

QA: `tests/qa/contract.spec.ts` on :3530 (QA_ONLY, QA_OUT=artifacts/qa-wavej-life, `--timeout=300000` because page loads took 20 to 60 s): phone and desktop pass. An earlier run with the default 45 s timeout failed on page.goto only; one longer-timeout run logged the React "state update on a component that hasn't mounted yet" console error once (same-dose-levels-off, desktop), not reproduced in the next run; other builders attribute it to Fast Refresh rebuilds on the shared server.
