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

## Wave C3

Date: 2026-10-14 · executed by: release manager (Diego)

- `node tools/publish-ready.mjs` listed 10 candidates. Each checked: latest learner review (r2/r3) is launch for the current version, all meta.json claims verified (fact-check pass 14), 2026-10-14 QA record pass on phone and desktop with 0 retries, and Demo.tsx not newer than the QA record.
- Published (10, company gates ran): rsa-lock-with-public-key, two-pointers-meet, ambulance-pitch-drop, big-number-swallows-one, binary-search, bend-at-double-speed, clay-boat, double-the-size, distance-is-area, plus-and-minus-chips.
- ambulance-pitch-drop: the r3 reviewer's N1 (ring-gap labels 36.8 m / 31.8 m visible while the stage is locked) is a minor leak. My call: publish. The reviewer said launch, the leak only helps a careful reader infer "ahead is higher", and the real choice between options 2 and 3 survives. Not publishing around a gate. Fix routed to the lesson builder as board W-164 (also the beside-you 704 Hz clause).
- Published count: 240 before, 250 after.

## r9 publishes (evening)

Date: 2026-10-14 · executed by: chief of staff (via `node tools/publish-ready.mjs --publish`). Written after the fact: the retro recorded this as a missed ritual.

Gate for every lesson below: the latest r9 learner review says launch for the current meta.json version; every claim is verified (fact-check pass 35 or earlier); there is a QA record; and the lesson is not in `ops/publish-holds.json`.

- **Batch A (13), commit 0647086:** long-answers-lose-the-product, the-slowing-half-life, each-element-pops-once, fenwick-hops-by-lowest-bit, one-crowded-bucket, proposers-get-the-best, ray-counts-crossings, two-locks-wait-forever, wheel-needs-four-colours, accurate-bettor-takes-the-pot, all-lines-meet-in-one-mother, six-students-per-professor, times-can-shrink.
  - ray-counts-crossings carries an open question (W-566): its prediction can be answered just by looking at the U. It was raised in r7, r8 and r9 with no ruling. Published on a launch verdict; the learning designer owes the ruling.
- **Batch B/C (5), commit 3699890:** bending-frontier, debt-grows-ratio-falls, four-in-a-row-two-thirds, shake-faster-same-speed, every-scale-equally-likely.
- **Batch B (3), commit f9efa87:** odds-average-the-bettors, stag-needs-three-in-four, the-bar-nobody-can-forecast.
  - The commit message says 4. patience-wins-the-split was refused by the gate (claim c5 unverified) and stayed in review. The message was wrong; the gate was right.
- **Holds added (f9efa87):** who-pays-same-filter and penalty-kick-mix, per the head-of-product ruling W-513 (revise, then hold until a frame of the current version passes).
- **Published count:** 587 at the start of the day, 608 now. None is live. Production gets them with the next founder-approved deploy.
- **After publish:** two-locks-wait-forever was revised to v2 (W-567: wording only, no claim text) after it published. It needs a re-review before the next deploy carries v2.
