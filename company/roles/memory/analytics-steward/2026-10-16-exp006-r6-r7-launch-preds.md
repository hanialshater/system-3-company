### 2026-10-16 · exp006-r6-r7-launch-preds · analytics-steward
- did: Committed EXP-006 launch prediction rows for cut-the-busiest-link and the four NCM gap lessons, after publish but before any deploy; closed W-1529; added W-1646
- learned: The event intake logs no session, identifier or first-time marker, and recall spacedDays has no ordinal, so first-revisit recall and learner pairing cannot be computed even after W-706 (src/lib/events-intake.ts)
- know: EXP-006 commits aggregate rows A1-A6 with stated biases and F1/F2 marked not measured; r5 P1/P2 and Life Hacks L1/L2 assume per-learner data too (company/experiments/EXP-006-launch-predictions-r6-r7.md)
- know: Launch records invite the steward to add the prediction row; filing it as EXP-* makes npm run check enforce the format (company/experiments/README.md)
- open: W-1646 privacy-reviewer: first:true marker on first recall and predict per slug (company/ops/board.json)
- open: Any read waits on W-706 and a founder-approved deploy (company/experiments/EXP-006-launch-predictions-r6-r7.md)
