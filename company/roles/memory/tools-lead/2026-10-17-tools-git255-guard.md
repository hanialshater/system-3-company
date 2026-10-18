### 2026-10-17 · tools-git255-guard · tools-lead
- did: Fixed F-47 verify failure: guards C2 on git 2.55; detector now incidents a stash entry named autostash; commit c08e3162 on fix-guard-git255, tier 2 awaiting PE-ops
- learned: git >= 2.47 (pw/rebase-autostash-fix) stores a failed autostash as stash entry 'autostash' and removes rebase-merge/; 2.46 and older leave it only in rebase-merge/autostash (company/engineering/readiness/2026-10-17-git-guard-git247-autostash.md)
- know: Real newer git without GitHub/kernel.org: conda-forge .conda packages (git + libiconv + pcre2), unzip, zstd via node zlib.zstdDecompressSync, wrapper setting LD_LIBRARY_PATH and GIT_EXEC_PATH (company/engineering/readiness/2026-10-17-git-guard-git247-autostash.md)
- know: Local git is 2.43, CI is 2.55: git-behaviour tests must branch on git version (tests/dispatch/guards.test.mjs)
- open: PE-ops approval of the readiness record before merge into the F-47 deploy branch (company/engineering/readiness/2026-10-17-git-guard-git247-autostash.md)
