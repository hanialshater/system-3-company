# Fact-check: lh-annual-label-cost

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Definitional (as lh-idle-versus-active c5); energy.gov.au not opened. Stage: 200 x 2 x 0.3 = €120, 350 x 2 x 0.3 = €210. Not rendered as text. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 8 years A = 200 × 8 × 0.3 = €480.00, B = 350 × 8 × 0.3 = €840.00; readouts '200 kWh × 8 years × €0.30' etc. Energy picture: line samples at 0, 2, 4, 6, 8 years on a fixed scale (top label €1,050.00, the range maximum). Note for demo-builder: at 1 year the readout reads '1 years'. |
| c3 | verified | 150 kWh × €0.30 = €45 a year; €45 × 8 = €360 = €840 − €480 (stage start). Annual cost €60 and €105 at 1 year on the stage. |
| c6 | verified | 200 × €0.30 = €60 and 350 × €0.30 = €105 a year (stage at Years 1); over 8 years the gap is €360 (spec index 1); €45 is the one-year gap. Note: the stage's card labels state kWh/year, the hook calls the labels €60 and €105; consistent at the stated €0.30/kWh. |

**W-1078 (trust sheet matches the stage):** still open. c4 recall is a 250 kWh/year label (€300 over 4 years). The stage's labels are 200 and 350 kWh/year; at 4 years it shows €240 and €420. The recall arithmetic is true and stays verified; the row clears when the recall uses the stage's fixture (demo-builder, recall text from learning-designer or cm-lifehacks), then a fact-checker re-verifies c4.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
