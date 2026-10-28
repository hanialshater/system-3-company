# Two revised dinosaur lessons: exploratory browser QA

Date: 2026-10-28. Scope: `zoo-dino-dental-battery` and `zoo-dino-wishbone`, both v2. Tested both components and metadata files alongside Lesson, controls, DemoCard and global CSS. The exact Git blob hashes are in `artifacts/zoology-dino-v2-exploration/source-hashes.json`; none changed between input capture and the post-run check. The branch HEAD after the run was `05e4d602a0e738785f277bafd39da9e7ff562b10`; the shared working tree was dirty.

## Method and results

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order. Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

Both lessons × two viewports = four runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs. Both phone-reveal screenshots were opened and visually inspected; both stage and reveal were visible.

Recheck of prior visual observations: `zoo-dino-dental-battery` now shows plant material over the tooth row, a press arrow and a labeled contact point, addressing the earlier lack of clearly depicted tooth/plant contact. `zoo-dino-wishbone` now shows side-by-side simplified chest diagrams with highlighted furculae, ribs and shoulders, addressing the earlier absence of a skeletal reference. These are schematic illustrations and the observation is not a scientific or learner verdict.

Evidence: `artifacts/zoology-dino-v2-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
