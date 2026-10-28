# Operational readiness: w2047-sequence-probe-settle

change: tools/sequence-probe.mjs "back" compares settled fingerprints: after every walk press and every trail press it reads the shown card until two readings 500 ms apart match (card index included), ceiling 6 s; a card still changing at the ceiling FAILs "back" as "never settled". Layout checks (overflow, crop, tap) still measure at 300 ms, mid-motion included. Motion stays on (no reduced-motion emulation). New test tests/platform/sequence-probe.test.mjs runs the real probe against tests/platform/fixtures/sequence-probe-fixture.html.
change-tier: 1
paths: tools/sequence-probe.mjs, tests/platform/sequence-probe.test.mjs, tests/platform/fixtures/sequence-probe-fixture.html
author: platform-engineer
self-check: platform-engineer
board: W-2047
risks: none

1. **What can fail.** A lesson with a looping or ambient animation on a sub-card never settles and now FAILs "back" as "card k never settled (still changing after 6 s)" where before it failed as "state not kept"; either way it was a FAIL, the message now says why. A motion with a single still step longer than 500 ms could still be read as settled mid-motion (the gap must exceed the longest step; the slowest known, flatten-the-cube's playback, steps every 220 ms). The probe is slower: at least 0.5 s per press (flatten and euclid walks took 9-10 s each per viewport).
2. **How we would know.** `node --import ./tests/lifehacks/register.mjs --test tests/platform/sequence-probe.test.mjs` (in `npm run test:platform`, so in verify): fixture-fast PASS, fixture-slow (0 to 10 in 220 ms steps) PASS, fixture-lost (card reset on return) FAIL "state not kept", fixture-forever FAIL "never settled". The pre-change probe (HEAD f431cf31e's tools/sequence-probe.mjs) FAILs both fixture-slow and fixture-lost, so fixture-slow reproduces W-2047's false FAIL.
   Real lessons, private build `NEXT_DIST_DIR=dist-pe-w2047 next build` of f431cf31e (flatten Demo.tsx unchanged since v2, 3e365688e), `next start -p 4793`:
   - old probe: flatten-the-cube-to-a-dot back FAIL at phone 390x844 and desktop 1280x800 ("card 2 changed after leaving it (state not kept); card 3 changed after going back and forth").
   - fixed probe: flatten-the-cube-to-a-dot back PASS at 390 and 1280; euclid-three-steps back PASS at 390 and 1280; every other check unchanged (28 PASS, 4 n/a warnings on next start). The only FAILs are four-cards at 390 on both lessons, the hypothetical fourth trail step (W-601's question; design review R1 says it does not apply to a three-card lesson), unchanged by this change.
3. **How to roll back.** Revert this commit. Minutes; no data; no deploy.
4. **Capacity.** None in production. The probe is a dev tool; the new test starts four headless Chromium probes in parallel for about 25-35 s.
5. **Security.** None: no route, no app code. The test's server listens on 127.0.0.1 on a random port and serves one static file.
6. **Data.** None written (the probe writes screenshots only with --shots).
7. **Risks.** None added or closed.
