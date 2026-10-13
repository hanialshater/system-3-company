# Build note: odds-three-to-one (demo-builder, 2026-10-13)
- Intent: 4 blocks in a Lose tray and a Win tray; tapping a block moves it. Readouts: odds against (losses to wins) and win chance W of 4. No randomness.
- Gate: 2 milestones, 3 to 1 against (1 win, 3 losses = 25%) and evens (2 and 2 = 50%). Blocks start all in Lose; the QA path (block 1, 2, 3, 4) passes 25%, 50%, 75%, 100%, so every option value is seen.
- Blocks keep a fixed DOM order; CSS grid places each in its tray (so QA order does not shift).
- Question options are computed from chance(); the reveal quotes only 3 to 1 and 2 to 2, both gated.
- Not built: the brief's "up to 20 blocks"; 4 to 1 = 20% appears only in the recall (c5).
