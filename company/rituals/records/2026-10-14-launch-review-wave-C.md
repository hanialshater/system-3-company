# Launch review: Wave C (2026-10-14)

Note: this file did not exist when Wave C2 was written (the Wave C holds lived only in company/ops/publish-holds.json). Created by the release manager with the Wave C2 section below.

## Wave C2

Date: 2026-10-14 · executed by: release manager (Diego)

- Resolved holds removed from company/ops/publish-holds.json: atoms-across-a-hair, freezer-balloon, four-to-one-settles. Reason for the original hold (no QA record for the current v2 code) is gone: Rosa filed company/reviews/<slug>/2026-10-14-qa.md (pass, phone and desktop) and Demo.tsx is not newer than it.
- `node tools/publish-ready.mjs` listed 21 candidates. Each checked: latest learner review is launch for the current version (the script's check), all meta.json claims verified (withdrawn claims excluded), 2026-10-14 QA record present with result pass. Spot-checked QA sheets: ph-log-scale, fall-distance-squares, race-down-the-ramp (all pass, 0 retries).
- Published (21, via `publish-ready.mjs --publish`, company gates ran): atoms-across-a-hair, four-to-one-settles, freezer-balloon, molecules-in-one-drop, no-atom-weighs-35-45, one-dose-of-acid, ph-log-scale, point-one-is-26-percent, read-the-bone-clock, salt-water-hides-silver, same-air-less-oxygen, current-same-around-loop, fall-distance-squares, flour-on-the-moon, higher-orbit-slower, lifeguard-fastest-path, light-at-double-distance, moon-hammer-feather, puck-on-ice-no-push, push-the-swing-in-time, race-down-the-ramp.
- Published count: 204 before, 225 after.
- Left alone: the 15 Wave A2 QA-record holds (and the other A2/geography/fact-check holds). The 15 wait on a founder decision.
