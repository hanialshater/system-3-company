# Aquatic evidence comparisons — builder record

2026-10-28 · Eight draft lessons, inventory IDs 253, 266, 267, 269, 272, 273, 282 and 293; `manifest.json` maps slugs. Each has authored conceptual SVG evidence within a shared two-panel interaction. These are not eight independent simulations or naturalistic animal images. All claims and broad source leads are unverified, evidence arrays are empty, and no publication is requested.

I screened for overlap with the prior `company/reviews/zoology-fishes/manifest.json` and the current Life catalog. Candidate 278 (cleaner fish eating parasites) was omitted because `ecology-cleaner-fish-mutualism` already presents that mechanism. A complete semantic overlap audit remains open. The chosen examples focus on paired pectoral fins, mucus and scales, remora attachment, male seahorse brood pouch, anglerfish lure, archerfish jet, clownfish shelter and mouthbrooding.

## Validation and visual inspection

`node company/reviews/zoology-fish-next/check.mjs` validates eight unique IDs and slugs, draft and unverified status, answer/recall bounds, distinct recall question, two locked interaction gates, declared 44px controls, forbidden active-content strings in static SVG and TSX transpilation. All 24 SVG fragments parse as XML. These are source checks, not runtime or science evidence.

`light-contact.png` and `dark-contact.png` render both final SVG states of all eight lessons in a static Inkscape harness. I opened both sheets and corrected the remora/host attachment geometry, added visible fish tails/eyes, and showed both paired fins. They remain schematic: the tiny eggs in the mouthbrooding view and the remora disc deserve real-phone legibility inspection; labels, pictorial detail, anatomy, contrast and interactions have not been tested in an actual browser. The archerfish jet is explicitly an exaggerated path, not a measurement; dots representing embryos are not actual counts.

## Shared pre-flight v1

- In the locked stage both evidence drawings and labels are hidden. Options are verbal. Titles and hooks do not name the answer; the paired fins themselves appear only after commitment.
- Each control opens one view and records one milestone; `seenRef` blocks double counting. Both views stay visible through reveal. No lesson-local Reset control is present, and reload behavior is untested.
- Later recall uses a new recognition scenario or asks for a related concept. The source record includes the question, answer explanation, labels and recall. No source is claimed verified.
- The restored workspace could not install Chromium, so no actual browser, phone-fit, keyboard, screen reader, independent source/science, accessibility or learner review is claimed. Source leads are general institutional sites, not claim-specific proof.
- The parent integrator must add concepts and regenerate the registries. No board, curriculum, registry or protected file changed here. `tools/fish-next/build.py` refuses to overwrite existing lesson directories unless explicitly run with `--force`.
