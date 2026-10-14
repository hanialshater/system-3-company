# Build note: ten-times-taller-giant

Builder: demo-builder (demo-builder-bigideas-1) · 2026-10-14 · from brief big-ideas.md #3 (single card, slider and toggle).

- Numbers: weight k³, bone area k² (same shape) or k³ (thicker legs, diameter k^1.5), load per cm² k or 1. At 10×: 1,000 / 100 / 10 (check script #3).
- Picture: a 1× person and the scaled person on one ground line, drawn to scale (the giant is k times taller). Legs widen by √k relative to the body when "thicker". A load-per-cm² bar with a dashed "limit (illustrative)" line at 4×; bar and legs turn red above it. Three readouts (weight, bone area, load/cm²). The top line records the same-shape 10× values once reached.
- Controls, DOM order: Scale slider (1-10), Make it 10× (preset: QA's two slider presses reach only 3×), Legs: same shape / thicker (toggle).
- Milestones: ten (same shape at 10×; weight, area, load recorded), thick (thicker legs at a scale above 1).
- **Accuracy changes from the brief, flag for cm-big-ideas-science:** the brief's misconception framing ("a scaled-up body crushes itself") is stronger than the physics. Standing stresses in human bone are far below its strength; the 10× giant would lose its safety margin for running and jumping, not collapse at rest. So the stage shows an illustrative limit, the reveal says "well past the illustrative limit", and c5 says the lesson does not claim collapse at rest. The limit line's 4× is placed inside the 2-4 safety factors Biewener reports (c4, to confirm). The limit sentence follows Biewener 1989: posture, not much thicker bones ("mostly stand more upright instead of growing far thicker bones").
- Reveal 69 words. Claims c1-c5, all unverified.

## Pre-flight v1

This pre-flight describes the v1 build. Board items W-633 to W-636 (from cm-big-ideas' W-537 re-check) revise these drafts; the builder of each v2 adds `## Pre-flight v2`.

1. **Title and hook.** "A giant built just like you" / "Make a person 10 times bigger, same shape, same bone. Are the legs still up to the job?" It suggests a problem but gives no factor.
2. **Options.** "The same" / "10 times" / "100 times" / "1,000 times": three numbered, plus "The same" (the factor 1). Same precision.
3. **Locked stage.** 1× person and an equal-size second person labelled "?", empty bar, dashed limit line at 4× (matches no option), readouts "?".
4. **Reveal values.** "1,000×", "100×", "10×": (b) milestone ten, recorded, and on stage in the top line "10×, same shape: weight ×1,000, bone ×100, load ×10". "well past the illustrative limit": 10 > 4, the line is on stage. "Thicker legs kept the load level": (b) milestone thick; on the QA path the stage shows thicker legs, load ×1, at the reveal.
5. **QA path.** Slider ×2 (3×), Make it 10× (ten), Legs: thicker (thick). Every press changed the stage (own Playwright walk on :3530).
6. **Reset.** No Reset control; recorded values never change. Reveal on the QA path: "At 10× the giant weighed 1,000× as much, but its leg bones were only 100× as big in cross-section, so each square centimetre carried 10× the load, well past the illustrative limit. Thicker legs kept the load level. Galileo argued in 1638 that giants need disproportionately thick bones. Where it stops: big mammals mostly stand more upright instead of growing far thicker bones, which keeps bone stress roughly level."
7. **Phone fit.** verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 75 words with the verdict; stage 330 px (picture 133, readouts 37, controls 94, text 30), window 618 px. (An earlier own screenshot cropped the stage top; fixed by cutting the picture to 150 px and the status line to one line.) Measured 2026-10-14 ~17:35 UTC on the shared dev server :3530 with tools/reveal-fit.mjs logic, but run from a scratch copy whose only changes raise the page.goto timeout (30 s → 600 s) and the lesson-render wait (15 s → 900 s): the unmodified tool failed 20+ times on page.goto/render timeouts (the server took 73 s to DOMContentLoaded and 217 s to hydrate). Screenshot artifacts/reveal-fit/ten-times-taller-giant.png. The run measured the files as they stood then, which already included another builder's in-flight v2 edits (W-634).

(v1 item 7 was left as a placeholder, "FIT_GIANT", and never measured. v2 below has the measurement.)

## v2 (2026-10-14, demo-builder-bigideas-pilot): W-634, the W-537 re-check row 3

- **The held limit now has its fallback** (c3, Biewener 1989, the lesson's one class-H citation; Galileo c2 is class P, public domain). If c3 is not checkable, the last paragraph becomes "Where it stops: real animals change shape and posture as they grow." (support: convention, illustrated by the thicker-legs toggle), with no claim about bone stress in mammals. The fallback is written in c3's source. The reveal text is unchanged.
- **Label floor:** a 390 px measurement found the SVG labels ("1×", "?", "load per cm²", "limit (illustrative)", "10× thicker legs") at 9.8 px, under the 10 px floor. `.lab` went from 11 to 12 px (now 10.7 px). No other change to the stage.
- Version 2; c3 is unverified.

## Pre-flight v2
1-6. Unchanged from v1 (no change to the question, options, stage logic or reveal). The QA contract passed, phone and desktop (artifacts/qa-bigideas-pilot).
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530` (next dev): fit, crop 0 px, namedHidden 0, phoneFit true, 75 words (tool count). Smallest stage text 10.7 px at predict and at the reveal (builder's own font-size probe).
