# Second dinosaur batch: exploratory browser QA

Date: 2026-10-28. Scope: 13 new dinosaur drafts introduced by commit `6f0365d6`. Exact slugs are listed in `artifacts/zoology-dinosaur-second-exploration/slugs.json`. Tested the 13 lesson components and their 13 metadata files alongside Lesson, controls, DemoCard and the global stylesheet. The same directory's `source-hashes.json` records their Git blob hashes; none changed between input capture and the post-run check. The branch HEAD at selection was `e11a5bee6552f7fc9d06963bd3e1d3d50c730d6f`; the shared working tree was dirty.

## Method and limits

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order (up to 16; range controls received two right-arrow presses). Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

## Results

13 lessons × 2 viewports = 26 runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs.

All 13 phone-reveal screenshots were captured; only these ten were actually opened and visually inspected: `zoo-dino-ankylosaur-club`, `zoo-dino-bone-growth-marks`, `zoo-dino-cluster-caution`, `zoo-dino-dental-battery`, `zoo-dino-embryo-egg`, `zoo-dino-feather-evidence`, `zoo-dino-frill-hypotheses`, `zoo-dino-neck-joints`, `zoo-dino-unknown-color`, and `zoo-dino-wishbone`. Their stage and reveal were visible in the sampled screenshots.

Two findings for learning and visual design review:

1. `zoo-dino-dental-battery`: the image labels many adjacent teeth and adds a leaf, but the inspected frame does not clearly show plant material contacting the tooth surface or a processing motion. The reveal describes a working surface against plant material; consider whether the claimed interaction is sufficiently depicted.
2. `zoo-dino-wishbone`: matching chevrons are drawn on broad bird and theropod body silhouettes, but the skeletal location of the furcula is not shown. Review whether the visual demonstrates anatomical comparison adequately or whether it asks the learner to accept two matching symbols as evidence.

These are diagram-interpretation findings, not scientific verdicts. An operational pass does not establish that a diagram teaches or its claims are accurate.

Evidence: `artifacts/zoology-dinosaur-second-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
