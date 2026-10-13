# Design system (v0)

owner: visual-designer (Kiri), with the accessibility reviewer · implemented by: platform-engineer in `src/app/globals.css` and `src/kit/`

v0 records what exists today, so later changes are deliberate:
- **Colour roles:** `--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--good`, `--bad`, `--warn`, plus one `--domain` colour per category (`content/domains.json`). Light and dark mode via `prefers-color-scheme`.
- **Type:** system UI sans. The stage text budget is ≤ 25 words, and the reveal is ≤ 90 words.
- **Controls:** `Control`, `Slider`, `Readout`, `Row` from `src/kit/controls.tsx`. Tap targets ≥ 44 px. Sliders 28 px high.
- **Charts and diagrams:** label the axes on the stage, name the model ("Toy model", the projection), show the answer readouts as "?" while locked.
- **Motion:** settle within 450 ms (the QA wait), and respect `prefers-reduced-motion`.
- **Known gaps** (from reviews):
  - reveal text clipped on phones (W-061);
  - overlapping labels;
  - floats printed unrounded (60.000000000000014);
  - colours that are too close for colour-blind learners.
