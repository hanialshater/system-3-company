# Build note: back-button-stack (demo-builder, 2026-10-12)

- Design intent: browser history as one pile (A at the bottom, D on top, 'you are here' marker). Back moves the marker down; forward pages show dashed; visiting a new page after Back throws the dashed pages away and shows them struck out in red.
- Reveal gate: interact() only on a visit that discards forward pages, which is the moment the misconception breaks.
- Deviation from brief: no queue mode. One idea per card; the queue gets one contrast sentence in the reveal. No Forward button either; forward pages are shown, not navigable.
- After screenshots: the pile reads top-down cleanly on phone; no changes needed beyond confirming the start state gives nothing away (it only shows the premise A-D).
