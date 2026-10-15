# Build note: london-buried-six-times-more

Builder: history-builder-2 (demo-builder) · 2026-10-14 · brief company/domains/briefs/history.md #8 · branch history-build-2. Kept from evaluators until they report.

- Data: BILLS in Demo.tsx is Arbuthnot.csv [Year, Males + Females, Plague, Mortality], 1629-1710, copied from the pinned file (history-data.mjs: arbuthnot). All values are computed from it, matching history-cycle1-check.mjs section 8: 15,453 -> 97,306 (6.3×), plague 70% (Math.round of 70.50), 9,972 christenings, 9.8 burials per christening (reveal: about 10), 1666 12,738, 1636 10,400 of 23,359 (stage: 45%).
- No answer before the commit: the locked stage and the "1664" preset draw only 1629-1664 on a 0-25,000 axis. The "1665" preset draws every year and rescales to 0-100,000, and the full chart stays drawn after that.
- Deviation from the brief: the brief names milestones `y1664` and `y1665` only. The reveal also quotes the plague share and the christenings, so `share` and `christen` are milestones too (minInteractions 4). The 1636 preset is not a milestone; the reveal does not quote it.
- Plague part of each bar is solid red, not hatched: at about 3.7 px per bar a hatch does not read. Bars are 332/82 = 4.05 viewBox units per year, about 3.8 px at 390 px wide (the brief asked for at least 4 px; this is a little under, and closing the gap would mean shrinking the y labels further).
- The 1664 readout comparison "(1664: 1.3)" for burials per christening was dropped to keep the readout on one line at the reveal (fit). The 1.3 is in the check script, not on the stage.
- Each milestone leaves a label: "1664: 15,453", "1665: 97,306, 6.3×", "1666: 12,738" (drawn with the 1665 preset), "70% plague", and a green christening mark "christened: 9,972" on the 1665 bar.
- Title and hook are mine (the brief gives none): "1665 in London's burial records" / "London's Bills of Mortality counted burials year by year. What did 1665 look like?" For cm-history to confirm. Risk for cm-history: the slug (in the URL) says "six times more", which points at the answer; renaming the slug is not the builder's call.

## Pre-flight v1
1. **Title and hook.** "1665 in London's burial records" / "London's Bills of Mortality counted burials year by year. What did 1665 look like?" No size, ratio or direction.
2. **Options.** "About 30,000" / "About 100,000" / "About 300,000": all numbered, same form.
3. **Locked stage.** Bars 1629-1664 only (other burials grey, plague red), y gridlines 10,000 and 20,000, year axis 1630-1710, legend, disabled presets, readout "Burials -". No 1665 bar, no label, no highlight.
4. **Reveal values.** 97,306 and 6.3: (b) milestone `y1665` (spike label "1665: 97,306, 6.3×"). 70%: (b) milestone `share` ("70% plague" label). 9,972 and 10: (b) milestone `christen` (christening mark label; readout 9.8). 12,738: (b) milestone `y1665` ("1666: 12,738" label). All computed from BILLS.
5. **QA path.** DOM order: 1664, 1665, Plague's share, 1636 an earlier outbreak, Christenings that year: five presses, four milestones, including the question's case (y1665). Every quoted label is still drawn when the reveal opens.
6. **Reset.** No Reset control (brief rule). Labels persist once drawn. Reveal on the QA path: "London recorded 97,306 burials in 1665, 6.3 times the year before, and 70% were put down to plague. Christenings that year were 9,972, so the city buried about 10 people for every child christened. A year later, burials were back to 12,738. Where it stops: these are recorded burials and recorded causes, not a count of every death or a doctor's diagnosis."
7. **Phone fit.** `REVEAL_FIT_TIMEOUT_MS=300000 node tools/reveal-fit.mjs --url http://localhost:3622 london-buried-six-times-more` (2026-10-14): verdict fit, crop 0 px, namedHidden 0, phoneFit true, 68 words (62 reveal + verdict). No picture fitting needed after the presets went into a 3 + 2 grid, so 12 px labels render at about 11 px. Screenshot `artifacts/reveal-fit/london-buried-six-times-more.png`.

QA: `tests/qa/contract.spec.ts` phone + desktop passed (artifacts/qa/london-buried-six-times-more/). Claims c1-c4 unverified.

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- FC39/FC41 c1, the pass-39 wording: the learner text no longer says these yearly totals are the Bills of Mortality's burial counts. Question: "London's yearly records of deaths (compiled by Creighton, 1965) show 15,453 in 1664. In 1665, the year of the Great Plague, about how many?" (23 words). Hook: "Yearly records of London's deaths run from 1629 to 1710. What did 1665 look like?" Title: "1665 in London's death records". Stage: "Deaths, 1664/1665", "Deaths per christening, 1665", legend "other deaths". Reveal: "...97,306 deaths in 1665 ... about 10 deaths for every child christened. A year later, deaths were back to 12,738."
- c3 (Great Plague) and c4 (limit sentence) are verified by FC41 and their text is kept, as asked. **Open for the fact-checker:** c4 says "these are recorded burials", while the stage now calls the same totals deaths and no longer ties them to the Bills. FC41 verified c4 against what the Bills recorded; whether it still holds for totals attributed to Creighton is theirs to judge.
- Numbers re-derived in node from Arbuthnot.csv: all 82 rows match BILLS; 15,453 -> 97,306 (x6.30), plague 70.5%, 9.76 per christening.
- Claims reset to unverified: c1, c2 (wording follows c1; numbers unchanged).
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 67 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/london-buried-six-times-more.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
