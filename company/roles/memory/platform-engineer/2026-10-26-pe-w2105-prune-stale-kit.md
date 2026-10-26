### 2026-10-26 · pe-w2105-prune-stale-kit · platform-engineer
- did: W-2105: prune drops a stale kit's entries, stale-kit fires only while an entry uses the kit, R5 comment, 3 tests; merged origin/main into feat/lesson-frames-pilot
- learned: A stale kit is a manifest-level problem, so dropping lessons alone never cleared it; the rule had to depend on entries still naming the kit (tools/lib/lesson-frames.mjs)
- know: Prune tests use fresh(): a manifest re-hashed from today's tree, because main stales the committed manifest within days (tests/lesson-frames/manifest.test.mjs)
- know: Main checkout node_modules is Next 16.4.0; branch builds need npm ci in the worktree (27 min, ~1 GB on a 1-2 GB-free disk) (company/engineering/readiness/2026-10-26-w2105-prune-stale-kit.md)
- open: principal-engineer reads the W-2105 diff; W-2106 and W-2103 mine before production flag-on (company/ops/board.json)
