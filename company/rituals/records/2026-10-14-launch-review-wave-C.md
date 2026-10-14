# Launch review: Wave C (2026-10-14)

Note: this file did not exist when Wave C2 was written (the Wave C holds lived only in company/ops/publish-holds.json). Created by the release manager with the Wave C2 section below.

## Wave C2

Date: 2026-10-14 · executed by: release manager (Diego)

- Resolved holds removed from company/ops/publish-holds.json: atoms-across-a-hair, freezer-balloon, four-to-one-settles. Reason for the original hold (no QA record for the current v2 code) is gone: Rosa filed company/reviews/<slug>/2026-10-14-qa.md (pass, phone and desktop) and Demo.tsx is not newer than it.
- `node tools/publish-ready.mjs` listed 21 candidates. Each checked: latest learner review is launch for the current version (the script's check), all meta.json claims verified (withdrawn claims excluded), 2026-10-14 QA record present with result pass. Spot-checked QA sheets: ph-log-scale, fall-distance-squares, race-down-the-ramp (all pass, 0 retries).
- Published (21, via `publish-ready.mjs --publish`, company gates ran): atoms-across-a-hair, four-to-one-settles, freezer-balloon, molecules-in-one-drop, no-atom-weighs-35-45, one-dose-of-acid, ph-log-scale, point-one-is-26-percent, read-the-bone-clock, salt-water-hides-silver, same-air-less-oxygen, current-same-around-loop, fall-distance-squares, flour-on-the-moon, higher-orbit-slower, lifeguard-fastest-path, light-at-double-distance, moon-hammer-feather, puck-on-ice-no-push, push-the-swing-in-time, race-down-the-ramp.
- Published count: 204 before, 225 after.
- Left alone: the 15 Wave A2 QA-record holds (and the other A2/geography/fact-check holds). The 15 wait on a founder decision.

## Wave A2 holds resolved

Release manager, 2026-10-14. The 15 lessons held in Wave A2 for "no computer-use QA record" were re-checked. Rosa filed QA records for all of them on 2026-10-14 (company/reviews/<slug>/2026-10-14-qa.md, all pass on phone and desktop).

Checks per lesson, all passed:
- Demo.tsx last changed (git log and file mtime) on 2026-10-13, before the QA run at 2026-10-14 00:05, so the QA record covers the current code.
- The latest learner review (2026-10-13 adult-beginner) says Verdict: launch for v1, and meta.json is v1.
- Every claim in meta.json is verified.

Holds removed and lessons published (225 -> 240): chain-of-blame, flip-twenty-percent, keep-the-top-85, noisy-compass, twins-never-split, which-question-splits, helium-leaks-first, pencil-lead-vs-diamond, every-message-is-possible, four-words-beat-eight-letters, hamming-points-at-the-bug, in-order-is-sorted, three-pizzas-four-people, red-apple-green-light, stop-when-it-looks-significant.

Holds kept: none of the 15. Unrelated holds (cards-do-remember, salt-ions-count-double, 8 geography lessons) were not in this task and remain.
