# Build note: twins-never-split (builder: demo-builder, sonnet build, EXP-003)

- Retitled (the slug gives the answer away): "Can training pull identical units apart?".
- The brief's data and numbers (weights end at 0.316) were not reproducible without its data, so the toy has its own: 2 tanh units (w, b, v all trained), 4 points x = -1.5..1.5, targets 0, 1, 1, 0, learning rate 0.3. Twins end at w = 1e-17 (shown 0.000), max gap exactly 0, loss 0.250; a 0.01 nudge then 200 more steps gives -1.627 / 1.627, loss 0.003. Fully deterministic.
- A Reset button was removed after the first QA pass: QA presses controls in DOM order, so Reset wiped the run the reveal quotes.
- Nudge-first is possible (not blocked, so every control stays enabled for QA); the reveal then omits the twin paragraph.
- Lines overlap exactly while twins are equal: thick solid plus thin dashed so the overlap is visible.
