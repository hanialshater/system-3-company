# Fish and aquatic vertebrate drafts — 2026-10-28

Built 12 individual draft lesson pairs from plan IDs 255, 256, 258, 259, 261, 262, 265, 268, 271, 281, 286 and 300. `manifest.json` maps IDs to slugs. The lessons compare two case-specific diagrams with two separate uncover actions; each SVG and the intended question are authored for that case. They are conceptual diagrams, not naturalistic illustrations or independently authored dynamic simulations. All references are leads, not checked sources, and every factual claim remains unverified.

The `check.py` script verifies manifest uniqueness, metadata/source-status and answer bounds, presence of a synchronous interaction guard and two locked controls, nonidentical recall wording, and arithmetic for the illustrated countercurrent toy. The arithmetic uses stipulated arbitrary oxygen-pressure units: same-direction differences 100, 40, 0; opposite-direction differences 10, 10, 10. In both rows water loss equals blood gain under an equal-volume accounting convention. It is a simplified illustration, not experimental data or a physiological model.

## Pre-flight v1

- Both panels are initially hidden, and both uncover controls are disabled until prediction. Neither panel changes until its corresponding button is pressed; duplicate presses cannot count as both required interactions.
- After each panel opens it stays visible through the reveal; the reveal unlocks only after both panels have been opened. The visual evidence and explanation require a teaching review to determine whether the comparison demonstrates the promised mechanism, especially countercurrent flow and buoyancy.
- Recall wording differs from prediction, but some questions revisit the same case and need more distinct transfer examples.
- Stage labels are model descriptions rather than measured data. The six-value countercurrent example and body-volume comparison are deliberately stipulated models. The gill shape is a two-dimensional analogy; realistic anatomy, scale and causal strength are not asserted.
- No real browser QA, TypeScript, screenshot inspection, 390 × 844 fit check, keyboard or screen-reader test was performed in this worktree. No claim, pedagogy or learner review was performed. Several source leads are institution or textbook landing pages; fact-checkers must locate exact sources.
- Company check with the previously committed 14 mammals plus these 12 fish returned 812 errors and four warnings. Relative to the supplied starting report of 783 errors/four warnings, 26 are not-yet-added curriculum concepts, two are stale generated registries, and one is the inherited `W-2055` state `blocked`. The parent integration owner handles all three shared files; no success is asserted.

## Open review

Check species qualifications, gill partial-pressure model, water-flow assumptions, swim bladder volume, oil density, case-dependent countershading, seahorse tail contact, puffer inflation and parrotfish feeding against precise authoritative sources. Inspect all 12 full-app routes and phone reveals and review the learning design. Thirty-eight additional ideas in the requested 251–300 range remain unbuilt by this slice; no claim is made that they have been vetted or are unique against the existing catalog.

## Visual revision v2 — three cases

Parent visual QA reported that the parrotfish appeared as a generic lens and did not make its identity or beak-to-surface contact clear. Version 2 replaces that scene with a recognizable stylized fish: body, eye, tail, fins and beak next to a textured surface; the second panel moves the beak to the surface and includes a schematic scraping arrow. The two pre-prediction panels show the same neutral approach sketch, with no contact or direction highlighted. The diagram is still a simplified invented illustration, not a species-accurate photograph or a measurement.

The seahorse tail-grip and shark liver examples also replace lens/line shapes with stylized animal profiles: a head, eye, body and curling tail against a stem for the seahorse; a tail, body, fins, eye and gill marks for the shark. The highlighted liver and wrapped-tail state appear only during exploration. Both controls in all three cases now declare a 44 px minimum width and height. All three metadata versions are 2, all factual claims remain unverified, and prior evidence arrays remain empty.

The generator contains these version-2 illustrations and refuses to overwrite any existing lesson by default; its explicit `--force` option requires a review of intended replacements. Schema, source-status and countercurrent arithmetic checks pass; static assertions confirm version 2, two 44 px declarations and neutral locked sketches for the three cases. No actual phone screenshot, computed control size, typecheck, scientific review or learner review has been performed here. A separate visual QA pass must assess recognizability, beak/surface contact, tail placement, organ highlight, contrast and 390 × 844 fit.
