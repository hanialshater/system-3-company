### 2026-10-25 · pe-w2047-probe-settle · platform-engineer
- did: W-2047: sequence-probe back now settles fingerprints (500 ms reads match, 6 s ceiling, motion on); fixture test added; flatten v2 and euclid back PASS at 390 and 1280
- learned: Settle needs the gap above the longest motion step; settling only the trail read is not enough, the leaving read in the walk was mid-motion too (tools/sequence-probe.mjs)
- learned: next build 16.4 ends with a SecurityFatalError upgrade nudge after output; first try left no preview-props.json, the retry gave a startable dist (company/engineering/readiness/2026-10-25-w2047-sequence-probe-settle.md)
- know: tests/platform/sequence-probe.test.mjs serves a no-React fixture of the CardSequence DOM; extend its modes for new probe checks (tests/platform/fixtures/sequence-probe-fixture.html)
- know: Disk hit 100% mid-run with several sessions building; pkill -f with a pattern in your own command kills your shell, find your server by NEXT_DIST_DIR in /proc/<pid>/environ (company/ops/progress.md)
- open: W-2066 reveal-fit thumb quirk is mine (company/ops/board.json)
