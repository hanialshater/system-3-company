### 2026-10-17 · exp008-left-or-right-v3 · analytics-steward
- did: Committed EXP-008 launch prediction rows D1-D6, F5/F6, O1/O2 for math/left-or-right v3 (draft) before publish and deploy; new EXP rather than EXP-007 Amendment 2; README index updated
- learned: EXP-007 already names 'Amendment 2' for a reworded unknot-game recall card, so a new slug outside a launch review's record gets its own EXP (company/experiments/EXP-008-launch-predictions-left-or-right.md)
- learned: Commit 54aa64e3 has the literal deploy tag in its body; harmless only because F-48 set git.deploymentEnabled false, so never write the tag in a message even when negating it (vercel.json)
- know: Which reveal opener a learner saw is not logged: reveal and interact carry no fields, so O1/O2 stay not measured (src/lib/events-intake.ts)
- know: Launch row ids run on across EXP-006/007/008 (A, B, C, D; F1-F6; O1/O2) so WBR lines stay unique (company/experiments/EXP-008-launch-predictions-left-or-right.md)
- open: Route an opener field on reveal (privacy-reviewer then engineer) and the stem-echo recall card to cm-math-discrete (company/experiments/EXP-008-launch-predictions-left-or-right.md)
- open: Any read waits on W-706 and a founder-approved deploy (company/experiments/EXP-008-launch-predictions-left-or-right.md)
