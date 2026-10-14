# Build note: same-dose-levels-off

builder: demo-builder (demo-builder-wavej-life) · 2026-10-14 · v1 draft · brief: company/domains/briefs/life.ecology-body.md #5 (check E5) · no spec

- Model as briefed: 100 units added every I hours (6, 12, 3) for 10 days; half of whatever is there is cleared every 6 hours (continuous decay 0.5^(t/6 h) between additions, which gives the brief's L·f + 100 at each addition). course() re-run in node: 6 h 100, 150, 175, 187.5, 193.75 … 200.0 after the 40th; 12 h 133.3 after 20; 3 h 341.4 after 80. Matches E5.
- Stage: setup line (hidden at the reveal), readouts "just after the last addition: N" and "every I h, first 5: …", one sawtooth chart (units 0 to 400, days 0 to 10). Drawn curves stay as pale traces, each with an end label "6 h: 200", "12 h: 133", "3 h: 341" in a right gutter.
- Controls in DOM order: Every 6 h, Every 12 h, Every 3 h (each disabled while current). Start after the commit: empty chart.
- Milestones (minInteractions 2): i6, other (12 h or 3 h). When the reveal opens the 6 h curve is made current again, so the "first 5" readout it quotes is on the stage.
- The reveal's interval sentence is computed: 3 h if drawn ("twice as often settled at 341: higher"), else 12 h ("half as often settled at 133: lower").
- Made-up substance; no medicine or dose named anywhere. Claims c1 to c4, all unverified.

## Pre-flight v1

1. **Title and hook.** "The same 100 units, again and again" / "Add the same amount every 6 hours for 10 days. Does it keep piling up?" The hook asks; it does not answer.
2. **Options.** "About 200" / "About 2,000" / "About 4,000": all numbers, same precision.
3. **Locked stage.** Setup text, "just after the last addition: ?", "pick how often to add", empty axes 0 to 400 and 0 to 10 days. No line, no 200 mark (200 is a gridline among 0/100/200/300/400).
4. **Reveal values.** "100, 150, 175, 188, 194", "200": (b) milestone i6, on the stage as the readouts and the "6 h: 200" label (6 h current at the reveal). "half is 100": 200 / 2. "about a day in": derivation (claim c3). "341" or "133": (b) milestone other, the end label of that trace.
5. **QA path.** Every 6 h (i6), Every 12 h (other), Every 3 h: both milestones in 2 controls. All three curves and labels are on the chart at the reveal.
6. **Reset.** No Reset control. Reveal after the QA path: "Every 6 hours the level went 100, 150, 175, 188, 194, then stayed at 200. Clearing half removes more when there is more: at 200, half is 100, exactly one addition. / In and out balance, so the level stops rising, about a day in. Adding twice as often settled at 341: higher, but it still levelled off. / A made-up substance; this is not about any real medicine or dose."
7. **Phone fit.** See the v1 measurement line below.
