# Build note: halving-powers (demo-builder, 2026-10-13)

- Intent: stacks of unit blocks for 2³, 2², 2¹ (the question's values) in a row, followed by dashed "?" slots for 2⁰, 2⁻¹ and 2⁻². Three step chips ("÷ 2 → 2⁰", "÷ 2 → 2⁻¹", "÷ 2 → 2⁻²") each halve the last stack. Only the next chip is enabled, so the stack goes 2 -> 1 (one green block) -> 1/2 -> 1/4 block.
- Key state (one milestone): the power stepped down to 0, a single unit block. QA's in-order presses reach it first, then continue to 1/4.
- The caption defines the notation ("2³ means 2 × 2 × 2") before any step, and each step's caption shows the division (e.g. "2¹ ÷ 2 = 2 ÷ 2 = 1, so 2⁰ = 1").
- The reveal mentions 1/2 and 1/4 only if the learner reached them. The extra argument (2⁰ × 2³ = 2³) is a claim (c3) that excludes 0⁰.
- Locked: the 2⁰ slot reads "?", and the readout shows "?".
- After screenshots: the stacks and labels read clearly on the phone. The small "÷2" marks under the gaps are faint but legible. No change.
- All claims unverified, for the fact-checker.
