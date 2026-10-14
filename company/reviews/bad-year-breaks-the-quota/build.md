# Build note: bad-year-breaks-the-quota

builder: demo-builder (demo-builder-wavej-life) · 2026-10-14 · v1 draft · brief: company/domains/briefs/life.ecology-body.md #2 (check E2 in company/domains/briefs/checks/life-wave-j-check.mjs) · no spec (brief: none needed)

- Model as briefed: dN/dt = 0.5N(1 − N/1000) − H, H = 120 (lake A) or 0.2N (lake B), N(0) = 600, disease multiplies N by 0.7 or 0.5 at year 10, Euler dt 0.001, years 0 to 60. simulate() re-run in node: 30% A 589, B 600; 50% A empty at t = 16.93 (shown as "year 17", the same ceil rounding as steady-catch-from-a-lake), B 600. Matches E2.
- Stage: one panel. Readout "year 60: A … · B … fish" above one chart (fish 0 to 1,000, years 0 to 60), A solid (domain colour), B dashed (fg), end labels "A: 120 a year" and "B: 20%" in a right gutter, nudged apart. After any disease press: a dashed red line "A's tipping point: 400". In the 50% case: a hollow dot at year 10, 300 fish, and the note "at 300 fish: grows 105, A takes 120" (the cause the reveal names). Tried cases stay as faint traces.
- Controls in DOM order: "Disease kills 30%", "Disease kills 50%" (each disabled while it is the current case; start is no disease, both flat at 600 to year 60).
- Milestones (minInteractions 2): k30, k50. When the reveal opens the 50% case is put on the stage (the 30% case stays as faint traces).
- Stage text: the locked frame shows the brief's 24-word setup; after the commit it is replaced by the model line (16 words); at the reveal the line is hidden.
- Deviation: the brief's reveal draft had no numbers for the 30% case; mine has none either (I tried "(589 and 600 by year 60)" and cut it for the word budget).
- Claims c1 to c5, all unverified. The brief's optional Hilborn and Walters context is not on the card.

## Pre-flight v1

1. **Title and hook.** "Two steady lakes, one bad year" / "Both lakes have given 120 fish a year for years. Then a disease hits both." Neither names a lake that survives.
2. **Options.** "Both" / "Only lake A" / "Only lake B" / "Neither": all words, none numbered.
3. **Locked stage.** Setup text, both lines flat at 600 from year 0 to 10 only, a "year 10" label, axis 0/500/1,000 and years. No 400 mark, no line after year 10, readout "year 60: ?".
4. **Reveal values.** "both lakes came back" (30%): (b) milestone k30, still drawn as faint traces. "recovered to 600", "empty in year 17": (b) milestone k50, the readout "year 60: A empty · B 600 fish" and the lines (the 50% case is put on the stage when the reveal opens). "120", "300", "105", "60", "400": model constants, drawn as the end label, the year-10 dot and note, and the tipping line.
5. **QA path.** 30% (k30), 50% (k50): both milestones in 2 controls. The 50% lines, readout, note and tipping line are on the stage when the reveal opens.
6. **Reset.** No Reset control. Reveal after the QA path: "After a 30% loss both lakes came back. After a 50% loss, lake B recovered to 600, but lake A was empty in year 17. / Lake A's catch stays 120 however few fish remain. At 300 fish the lake adds only 105 a year, so each year takes more than it adds. Lake B's 20% shrinks with the stock: 60 fish at 300. / A fixed number has a tipping point, 400 fish here; a fixed share has none. Toy model, not fishing advice."
7. **Phone fit.** `tools/reveal-fit.mjs` logic on the :3530 dev server (a copy with longer page-load timeouts, artifacts/wavej-life-tools/reveal-fit-slow.mjs, because the shared dev server took over 30 s a page): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; revealWords 90 (tool count, includes the 6-word "Not quite" verdict; 87 with "Your prediction held."). Stage parts: picture 203, controls 35. Screenshot artifacts/reveal-fit/bad-year-breaks-the-quota.png. Smallest rendered SVG label over the QA path and at the reveal: 10.8 px (axis ticks, 12 px in a 356-wide viewBox).

QA: `tests/qa/contract.spec.ts` on :3530 (QA_ONLY, QA_OUT=artifacts/qa-wavej-life, `--timeout=300000` because page loads took 20 to 60 s): phone and desktop pass. An earlier run with the default 45 s timeout failed on page.goto only.
