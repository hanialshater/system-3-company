### 2026-10-16 · ncm-final-four · learner-evaluator
- did: Walked the 4 NCM course-completing lessons (v1, draft) from their meta.json boundaries on a private build (.next-le-ncm, port 3687) and wrote 4 learner records linked in evidence.simulatedLearner
- learned: walkthrough takes the bare slug (/d/<slug>); domain/slug aborts with a locator timeout and 0 screenshots (tools/walkthrough.mjs)
- learned: The QA-path walkthrough presses each control once, so step buttons inside a replay are skipped; a small playwright probe from tools/ (then deleted) showed the missing frames (company/reviews/same-picture-two-histories/2026-10-16-learner-knows-homophily.md)
- know: Worktrees have no node_modules; a symlink to the main checkout's works for build and walkthrough, remove it before committing (tools/walkthrough.mjs)
- open: the-swap-that-goes-in-circles needs a re-walk after the reveal glosses 'transitive' (company/reviews/the-swap-that-goes-in-circles/2026-10-16-learner-knows-preference.md)
