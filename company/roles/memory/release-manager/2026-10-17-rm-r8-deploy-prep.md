### 2026-10-17 · rm-r8-deploy-prep · release-manager
- did: Prepped r8 production deploy (founder approved 2026-10-17): decision record, r9 WebKit cell waived, releases.json r8, C2 built-output 4/4 pass on 2821160c, check/typecheck/test:platform green; no deploy
- learned: Worktree clones can be shallow; release-draft needs the previous release commit, fetch --unshallow fixed it (tools/release-draft.mjs)
- learned: tests/hq/releases.test.mjs hardcodes the version list, nextVersion and the marker check; I updated it for r8 and exempted post-F-48 releases from the marker (tests/hq/releases.test.mjs)
- know: Post-deploy C2 half still owed: production /catalog shows no Algorithms section nor algo- slug (company/engineering/readiness/2026-10-16-algorithms-200.md)
- open: WebKit/Safari check of left-or-right still owed, W-1607/W-1615; waiver covers only this deploy (company/decisions/2026-10-17-founder-deploy-r9-left-or-right-safari.md)
