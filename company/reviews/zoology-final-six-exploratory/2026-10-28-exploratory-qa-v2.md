# Six revised animal lessons: exploratory browser QA

Date: 2026-10-28. Scope: six v2 drafts: `fish-parrotfish-scrape`, `fish-seahorse-tail-anchor`, `fish-shark-oily-liver`, `animal-imitation-evidence`, `animal-observation-versus-motive`, and `zoo-arthropod-ant-trail`. Tested all six components and metadata files alongside Lesson, controls, DemoCard and global CSS. The exact Git blob hashes are in `artifacts/zoology-final-six-exploration/source-hashes.json`; none changed between input capture and the post-run check. The branch HEAD at selection was `2c534856119b82f9f4709f27ef321114c8e33bac`; the shared working tree was dirty.

## Method and limits

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order (up to 16; range controls received two right-arrow presses). Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

## Results

6 lessons × 2 viewports = 12 runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs. All six captured phone-reveal screenshots were opened and visually inspected; their stage and reveal were visible.

Recheck of specific prior visual observations:

- The parrotfish now has a recognizable fish shape and beak at a surface; the seahorse has a recognizable body and curling tail; and the shark has fins, a tail and a visible liver cutaway. These remain simplified anatomical schematics requiring independent science and design review.
- `animal-imitation-evidence` now depicts a separate animal acting, an animal watching, and a later observer in the demonstration condition, plus a later observer without demonstration in the other panel. This addresses the earlier absence of a distinct demonstrator and observer, though the images still simplify the actions and do not constitute experimental observations.
- `animal-observation-versus-motive` now shows a paw at two positions, with arrows indicating motion, which addresses the earlier static-only depiction. It remains an illustrative schematic, not a video observation.
- `zoo-arthropod-ant-trail` now uses `--fg` (#f7f7f8 in the standalone skin) for the ant. Against the representative #191b22 stop of the dark card gradient this is approximately 16.06:1, and the ant is clearly visible in the inspected screenshot. This sample is not a comprehensive accessibility or contrast audit.

These are visual observations, not scientific or learner verdicts. Evidence: `artifacts/zoology-final-six-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
