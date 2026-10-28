# Invertebrate batch: exploratory browser QA

Date: 2026-10-28. Scope: 14 `zoo-invert-*` draft lessons. The exact slugs are listed in `artifacts/zoology-invert-exploration/slugs.json`. Tested 14 lesson components and 14 metadata files alongside Lesson, controls, DemoCard and the global stylesheet. `source-hashes.json` in the same directory records their Git blob hashes; none changed between input capture and the post-run check. The branch HEAD at selection was `3b59bb1b29b5e43c34e223d6593d75011e6b83af`; the shared working tree was dirty.

## Method and limits

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order (up to 16; range controls received two right-arrow presses). Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

## Results

14 lessons × 2 viewports = 28 runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs.

All 14 phone-reveal screenshots were captured; the following eight were actually opened and visually inspected: `zoo-invert-bivalve-filter-feeding`, `zoo-invert-coral-partner-exchange`, `zoo-invert-jellyfish-polyp-medusa`, `zoo-invert-nautilus-chambers`, `zoo-invert-octopus-jet`, `zoo-invert-planarian-eyespots`, `zoo-invert-sea-squirt-larva-adult`, `zoo-invert-sponge-water-filter`. Their stage and reveal were visible in the sampled screenshots.

Two findings require visual/learning design and independent science review:

1. In `zoo-invert-octopus-jet`, the 'Water out' panel has two opposing arrows; neither is labeled as water versus animal movement. The reveal describes water exiting through a siphon and states that arrows indicate a simplified direction, so the visual does not clearly assign meaning to the two opposing arrows.
2. In `zoo-invert-coral-partner-exchange`, the food arrow starts at a green internal partner and extends beyond the animal's outline, whereas the reveal says the products go toward the animal; the drawing does not clearly show their transfer to the host. The word 'Food' crowds a tentacle in the 390 px screenshot.

These are diagram-interpretation findings, not scientific verdicts. An operational pass does not establish that a diagram teaches the concept or that its claims are accurate.

Evidence: `artifacts/zoology-invert-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
