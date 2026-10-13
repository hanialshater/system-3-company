# Build note: two-flips-slip-by (demo-builder, 2026-10-13)

- Design intent: the noisy wire, with almost no words (exploration brief). A big receiver light (OK green / ERROR red) above eight received bits: seven message bits 1011010 and a dashed check bit 0. Tapping a bit flips it in transit (red, underlined). Readouts: flips, 1s received, message intact/changed. Undo flips resets.
- Key state: one flip caught, then an even number of flips passing on a changed message. Milestones ["caught-one", "missed-even"], minInteractions 2. QA path: bit 1 (ERROR), bit 2 (OK, message changed), bits 3-8, Undo.
- Numbers: the check bit is computed from DATA in Demo.tsx (even parity); the light uses the same passes() test. Brief answer (C) is a derivation (each flip toggles parity); held.
- Locked: light, 1s count and message state show a dash.
- Choice: kept a "1s received" readout although the brief asked for no explanatory text; it is a number, not a sentence, and it is what lets the learner discover the even/odd rule rather than read it.
- After screenshots: the legend labels (message / check) are aligned to their bits with fixed widths; no other changes.
