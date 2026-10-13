# Build note: squaring-shortcut (demo-builder, 2026-10-13)

- Design intent: one exponent line 1..16 ("3^k means k threes multiplied together"). Squaring arcs are drawn above the line (1→2→4→8→16, numbered 1-4); ×3 steps are small arcs below (1→2→...→16). Buttons: Square it, Square to 3^16, ×3 once, ×3 to 3^16. Every multiplication stays drawn as an arc, so the run buttons do not hide steps. The line above shows the latest product (e.g. 3^8 × 3^8 = 3^16 = 43,046,721).
- Key state: both lanes at 3^16, 4 arcs versus 15. Milestones ["squared-to-goal", "climbed-by-three"], minInteractions 2. QA path: Square it, Square to 3^16, ×3 once, ×3 to 3^16.
- Deviation from brief: no free "tap two held values" picker (QA presses each control once, and a picker cannot reach 3^16 on that path); the brief's 3^15 try is dropped from the stage, and the reveal no longer quotes 3^15 since the learner never reaches it. The lower bound (3 steps reach at most 3^8) is a derivation in the reveal; builder's exhaustive addition-chain search confirms 4 is minimal for 16.
- Numbers: 4, 15, 3^8 and 43,046,721 come from GOAL/SQ_STEPS in Demo.tsx. "log₂" replaced by "times you can halve n".
- Retitled: title "How few steps to 3 to the 16th?".
- After screenshots: arcs and readouts read on phone; no layout changes.
