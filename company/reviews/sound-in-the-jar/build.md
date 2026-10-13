# Build note: sound-in-the-jar

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key states: some air pumped out ("pumped") and 1% air ("near-vacuum"). QA path: slider (two presses, 100% to 25%), "Pump to 1%", "Let air back in".
- The clapper swings by CSS animation at every pressure (stopped under prefers-reduced-motion), which is the point: the bell keeps moving while the sound goes.
- The sound bar and arcs are schematic, proportional to the air left; the readout uses words ("Quieter", "Faint", "Near silence"), no decibel numbers, per the brief's note to the verifier. The words are a drawing choice, not a measurement.
- 120 dots (seed 3) stand for the air; shown = round(pct x 120 / 100), so 1% shows one dot.
- Screenshot looked at: my own shot at 1% (one dot, sliver bar, faint arcs, "Near silence"). Fine.
