### 2026-10-17 · r8-left-or-right-a11y · accessibility-reviewer
- did: Reviewed left-or-right v3 (main d238ac7b) in real Chromium: keyboard, live-region mutation log, contrast both themes, reduced motion, CVD filters, 320/360/390; pass with conditions, no lock-out
- learned: Turn over never changes the role=status region (sum and hand unchanged), so it is silent to a screen reader; only the img label and aria-pressed change (src/demos/math/left-or-right/Demo.tsx)
- learned: Stage buttons here show Chromium's default auto ring, not the accent ring, so W-1649 does not reproduce in Chromium on this lesson (company/reviews/left-or-right/2026-10-17-accessibility.md)
- know: Worktree-isolated agents cannot run heredoc plus pipes in one Bash call; write probes with Write then run node (artifacts/a11y-lor/probe.mjs)
- open: No real screen reader; L1 to L4 routed to demo-builder, design-lead, platform-engineer (company/reviews/left-or-right/2026-10-17-accessibility.md)
