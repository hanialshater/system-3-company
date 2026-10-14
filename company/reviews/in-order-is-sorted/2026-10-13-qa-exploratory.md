# Exploratory QA: in-order-is-sorted

date: 2026-10-14 (file named per request) · by: qa-tester (Rosa) · build: .next-qa on :3430 · script: artifacts/explore/x.mjs (not committed)

Viewports: 320x640 and 1280x800. Chromium.

| Probe | Result |
|---|---|
| Force-click every stage control while locked, press Enter | phase stayed predict; nothing happened |
| Keyboard only: focus option, Space, commit enabled | ok |
| Double-click commit | one transition to explore, no error |
| Controls via focus + arrow keys + double-click | reveal button enabled, no page/console errors |
| Horizontal overflow at 320 px | 0 px, before and after reveal |
| Reload mid-lesson (explore) | returns to predict; progress not kept (observation, not a defect per contract) |
| Complete to reveal after reload, double-click reveal | phase reveal, exactly one reveal element |

No defects found. Limits: one run per viewport, last prediction option and arrow-key controls only; drag/pointer gestures on stage not exercised. A passing run is not evidence of learning.
