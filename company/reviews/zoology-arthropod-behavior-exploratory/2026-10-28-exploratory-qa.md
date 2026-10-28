# Arthropod and animal behavior batch: exploratory browser QA

Date: 2026-10-28. Scope: 26 new drafts—14 `zoo-arthropod-*` and 12 `animal-*`. The exact slugs are in `artifacts/zoology-arthropod-behavior-exploration/slugs.json`. Tested 26 lesson components and 26 metadata files alongside Lesson, controls, DemoCard and the global stylesheet. The same directory's `source-hashes.json` records their Git blob hashes; all were unchanged when checked after the run. The branch HEAD at selection was `f149b7dc8c28da61be37b3f5428b1f8a962d86c1`; the shared working tree was dirty.

## Method and limits

A Chromium component harness bundles the actual lesson components, DemoCard, Lesson, controls and CSS, supplies lesson metadata, and stubs DemoHost and Next Link. It is not a Next.js application or the protected QA contract. Each lesson ran once at 390×844 and once at 1280×800: a fresh page chose the last prediction option, then activated enabled controls in DOM order (up to 16; range controls received two right-arrow presses). Checks covered initial prediction lock, no initial reveal, reveal gating, stage change for exercised controls, ability to reveal, explanation over 120 characters, console/page errors, horizontal document overflow and the 24 px control-size contract minimum. Phone reveal geometry was compared with the card body for top-stage and bottom-reveal cropping.

## Results

26 lessons × 2 viewports = 52 runs, zero scripted failures, zero captured page/console errors, no horizontal document overflow and no measured 390×844 stage/reveal crop. All visible stage controls measured at least 44 px high during these runs.

All 26 phone-reveal screenshots were captured; only these 11 were actually opened and visually inspected: `animal-cooperative-care-toy`, `animal-cue-controlled-comparison`, `animal-group-dilution-toy`, `animal-imitation-evidence`, `animal-observation-versus-motive`, `animal-vigilance-time-budget`, `zoo-arthropod-ant-trail`, `zoo-arthropod-bee-pollen`, `zoo-arthropod-life-cycles`, `zoo-arthropod-web-vibration`, and `zoo-arthropod-spider-insect`. Their stage and reveal were visible in the sampled screenshots.

Findings for visual and learning design review:

1. `zoo-arthropod-ant-trail`: the second ant is drawn in dark brown (#6d5645) on the dark card and is difficult to see at phone size. Its approximate contrast against #191b22 is 2.51:1; the card background is a gradient, so an independent contrast audit is still needed.
2. `animal-imitation-evidence`: the reveal says both panels show the same final action, and one includes an observed demonstration. The visible stage shows one animal and a box in each panel, with an arrow toward the box in one and no arrow in the other; it does not visibly distinguish a demonstrator, an observer and a later action. A viewer must rely on the captions and reveal to infer the study design.
3. `animal-observation-versus-motive`: the stage depicts a static circle next to a branch and labels it 'Scratches branch'. The explanatory contrast is about observing an action rather than inferring motive, but the depicted movement is not visible in the inspected frame. Design should consider whether the evidence is shown sufficiently to support the question.

These observations are not scientific verdicts. A passing mechanical run does not establish that the diagrams teach or the claims are accurate.

Evidence: `artifacts/zoology-arthropod-behavior-exploration/results.json`, `probe.log`, `probe.mjs`, `server.mjs`, `entry.tsx`, `host.tsx`, `slugs.json`, `source-hashes.json` and `<slug>-phone.png` in that directory. Only one prediction option per lesson was exercised; answer mapping across all choices, keyboard, reload, smaller phones, theme changes, feed interactions, full routes, comprehensive accessibility, independent science review and learner evidence were not tested. No launch verdict.
