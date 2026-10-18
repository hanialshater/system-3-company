# Computer-use QA: bk-nudge-default-choice-model

target: http://127.0.0.1:3613 · mode: external (own PR review server) · built from: da62ea4379440a0186d0f09b78a5ecb820b162aa · dist: .next-books100-seven-v3 · BUILD_ID: cxvdaIQSI167MmWWhah2L


date: 2026-10-16 · harness: tests/qa/contract.spec.ts · recorded by: qa-tester (company qa-record) · result: **contract pass**

| Viewport | Result | Retries | First error |
|---|---|---|---|
| phone | passed | 0 | — |
| desktop | passed | 0 | — |

Screenshots: `artifacts/qa/bk-nudge-default-choice-model/` (not committed; regenerate with `QA_ONLY=bk-nudge-default-choice-model npm run qa`).

A pass means the contract held in a browser. It is not evidence that anyone learned.

lesson version: v3 · overall scope: draft prototype QA, with a recorded small-phone layout limitation

## Artifact-first findings

Before metadata or current CM/build/review accounts, inspected the learner-visible walkthrough above its trust-sheet appendix and actual phase/reveal screenshots. The follower and chooser bars show 6/6 + 2/4 and 0/6 + 2/4, supporting 80%/20%. Both results remain in Seen after Reset. The source question equality check was solely an integrity assertion.

Authoritative current walkthrough: `artifacts/books100-v3-isolated-walkthroughs/bk-nudge-default-choice-model/transcript-artifact-only.md` and `sheet.png`. The original shared walkthrough folders showed mixed frames and are excluded as screenshot evidence. Current 390×844 reveal image actually viewed: `company/reviews/books-100/screenshots/current/bk-nudge-default-choice-model.png`.

## Current browser results

Unmodified contract: phone and desktop passed with zero retries, from `test-results-books100-seven-v3/qa-report.json`. Build preflight separately matched the actual current prediction question, visible A/B labels and Reset min-width 60px, size 60×44px, for every representative. Actual HTML/asset hashes and source hashes are in `company/reviews/books-100/2026-10-16-seven-family-v3-identity.json`.

Unmodified strict 390×844 fit: fit; 57 reveal words, 11 lines, zero crop/clip/hidden labels. Across the observed 390px predict and busiest explored frames: stage word maximum **20/25** (numbers/amounts count zero; actual letter-bearing tokens counted), minimum actual meaning font **11px**, smallest control **60×44px**. SVG font measurement includes screen-transform scaling.

- B → A → Reset: B alone left reveal locked; A completed Seen history. Reset was then disabled because baseline A was already visible, so no actionability click was attempted. Both Seen values and reveal remained available.
- Fresh B → Reset → A: Reset before A was observed left reveal locked. A remained selectable; its explicit run completed both Seen values and enabled reveal.
- Physical rapid double clicks on enabled A, B and Reset preserved consistent results/history. Disabled active controls were skipped rather than awaited.
- Keyboard only: Tab reached prediction/commit, A, B, Reset and reveal; Space/Enter operated them and reveal opened.
- Desktop light 1280×800 and small-phone dark/reduced-motion 360×640 reached reveal without runtime errors or horizontal overflow.

## Recorded exploratory limitation

**Revise/route at 360×640:** opening reveal crops meaning-carrying stage content: controls and the follower bar are cropped. Screenshot actually viewed: `artifacts/books100-seven-v3-explore/bk-nudge-default-choice-model-small-dark-reduced.png`. This is one of seven affected families, reported to the integrator for evaluation-steward/design/builder follow-through. The 390×844 strict result remains valid; no small-phone fit or launch pass is claimed. Theme/reduced-motion controls ran in this combined 360px condition; separate theme/motion contrast certification was not performed.

After reading the brief: source version v3 and rendering identity were checked after initial findings. `company qa-record` added only this real contract evidence link; no lesson status or claim verification was changed. No source, learning, publish or deployment attestation is supplied.

Next owner: integrator routes the small-phone limitation and minor presentation findings; qa-tester awaits the frozen complete 100-route build. See `company/reviews/books-100/2026-10-16-seven-family-v3-qa.md`.
