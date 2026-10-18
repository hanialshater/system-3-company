### 2026-10-16 · pr4-history-maps-a11y · accessibility-reviewer
- did: Scanned PR #4 (100 map-* History lessons + /history-maps): a11y-scan on all 100, probe of 14 lessons at 390/320, index at 4 viewport/theme combos; record committed 37db216f on pr4/a11y
- learned: Light-theme --domain gold (#d9b26f) as text is 1.7-1.9:1; the scan flags it as lesson-origin fail in 100/100 (company/reviews/history-maps-100/2026-10-16-pr4-accessibility.md)
- learned: Same disabled-pressed-button focus loss as Books B1 recurs in the history Demo.tsx (src/demos/history/map-rome-athens-100-400/Demo.tsx)
- know: dispatch-check --kind=build must run from the main checkout root with --worktree=<abs path>, else it calls the worktree the main checkout (tools/dispatch-check.mjs:187)
- know: Scan of 100 takes about 8 min at 4 workers; pkill -f next start can kill your own shell, kill by port pid instead (tools/a11y-scan.mjs)
- open: No screen reader or colour-blind image run; A vs B hue-only finding H4 is from computed colours (company/reviews/history-maps-100/2026-10-16-pr4-accessibility.md)
