# Ecology and revised animal diagrams: exploratory browser QA

Date: 2026-10-28. Scope: 12 `ecology-*` draft lessons and six previously observed animal lessons retested at v2: `mammal-camel-hump-reserve`, `mammal-elephant-ear-heat`, `zoo-invert-octopus-jet`, `zoo-invert-coral-partner-exchange`, `zoo-herp-snake-tongue-chemicals`, and `zoo-herp-lizard-sun-shade`. The exact 18 slugs are in `artifacts/zoology-ecology-corrections-exploration/slugs.json`. Tested all 18 lesson components and metadata files alongside Lesson, controls, DemoCard and global CSS. The same directory's `source-hashes.json` records their Git blob hashes; none changed between input capture and the post-run check. The branch HEAD at selection was `5437aecb48f15df66dd7ccf7584694b4a1dcf46b`; the shared working tree was dirty.

## Method and limits

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order (up to 16; range controls received two right-arrow presses). Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

## Results

18 lessons × 2 viewports = 36 runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs.

All 18 phone-reveal screenshots were captured; only these 11 were actually opened and visually inspected: all six v2 retest slugs above, plus `ecology-beaver-upstream-water`, `ecology-camera-field-toy`, `ecology-migration-protected-boundary`, `ecology-seed-carry-or-eat`, and `ecology-wildlife-corridor-toy`. Their stage and reveal were visible in the sampled screenshots.

Recheck of specific prior visual observations:

- Camel and elephant depictions now show recognizable animal bodies rather than only abstract shapes. The camel drawing remains a labeled schematic cutaway, not independent evidence for the claimed contents of the hump.
- Snake now has a coiled body, and the lizard has legs; the lizard remains very small and schematic. Further visual/pedagogy review is appropriate.
- Octopus jet now labels the two arrows as 'Animal' and 'Water', and depicts a siphon; this addresses the earlier ambiguity over which direction each arrow represented.
- Coral exchange now shows the food arrow ending inside the host outline and a CO₂ arrow ending near the internal partner. The labels no longer visibly crowd the tentacle in the inspected phone screenshot; this addresses the earlier observed arrow-direction ambiguity and label crowding.

These are visual observations, not scientific or learner verdicts. The ecology examples remain simplified models or comparisons and require independent content and design review.

Evidence: `artifacts/zoology-ecology-corrections-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
