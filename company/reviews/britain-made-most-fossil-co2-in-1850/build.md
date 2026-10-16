# Build note: britain-made-most-fossil-co2-in-1850

**Old folder (v1, v2 records, kept at their path):** `company/reviews/britain-made-most-co2-in-1850/` (build.md for v1/v2, fact-check 2026-10-14, QA 2026-10-16, culture-en stage A brief). The lesson moved from `src/demos/history/britain-made-most-co2-in-1850/` to `src/demos/history/britain-made-most-fossil-co2-in-1850/` (W-1205 ruling, `company/reviews/history-round-1-cm-rulings.md`, "2026-10-16 r13").

## Disclosed first: v3 does not pass `npm run check` (one error), held for cm-history

`error src/demos/history/britain-made-most-fossil-co2-in-1850: hook is 94 chars; the hook budget is 90`.
The hook is brief 9's change 1 word for word ("Several countries burned coal by 1850. How was the world's fossil-fuel CO2 split between them?", 94 characters). The title, change 2 word for word, is 43 characters against the standard's 40 (`company/product/demo-standard.md`, "The shape"); the check script does not gate titles, so only the hook fails. Brief-fixed text is not mine to trim (demo-standard, "Over budget"), so I did not pick a wording. **The branch should not merge until cm-history rules on the hook (and the title).** Candidates, for cm-history only, not applied:
- Hook (80 chars): "Several countries burned coal by 1850. How was the world's fossil-fuel CO2 split?"
- Hook (84 chars): "Several countries burned coal by 1850. How was fossil-fuel CO2 split between them?"
- Title (39 chars): "Where fossil-fuel CO2 came from in 1850"
Each is a one-line edit of `meta.json` (hook and title live only there); no claim covers the second hook sentence or the title, and c7 (the first hook sentence) is unchanged. The fit numbers below were measured with the 94-character hook and the 43-character title (two title lines at 390 wide), so a shorter hook or title can only add room.

## v3 (2026-10-16, demo-builder, branch hist-co2v3; batch company/ops/dispatch-requests/2026-10-16-r4-history.md#B2, board W-1205, W-1038)

What changed, against brief 9's v3 spec (`company/domains/briefs/history.md` #9):
- Slug, directory, claim ids and component name moved to `britain-made-most-fossil-co2-in-1850`. `grep -r "britain-made-most-co2-in-1850" src/` returns nothing. One source string cites the research note by glob (`company/research/notes/2026-10-15-provenance-britain-*.md`) because that file's name carries the old slug; I did not rename research-lead's file.
- Title and hook: brief changes 1 and 2, word for word (see above).
- Question: "In 1850, what share of the world's carbon dioxide from burning fossil fuels came from the United Kingdom?" (18 words, check section 9).
- Reveal: brief text (change 3, cm-history's wording "counting land cleared for farms too"). The old "rebuilt from records ... early years are the roughest" sentence is gone. Check section 9's reveal line matches what renders (the three numbers are computed and milestone-recorded as before).
- "Britain" is gone from everything a learner sees. Stage labels and readouts say "UK" (the label column at 1950 and in the tonnes view is 76 SVG units, and "United Kingdom 8%" does not fit at 11 px). The stage carries the gloss "UK = United Kingdom" once, top right of the picture, in every drawn and locked frame (brief 9, "Labels": cm-history's call, for the cultural reviewer's stage B). To make room the picture titles lost "by country": "Share of world fossil CO2" and "Fossil CO2, million tonnes a year".
- No land-use toggle (change 5); the land-use number is one told sentence.
- Layout, for the reveal fit (see Phone fit): the five presets share one row, with "Tonnes, not shares" wrapping to two lines inside its 44 px button; the third readout is wider so "World ×10" stays on one line. No text or tap target shrank.
- meta.json: version 3, status draft, objective says "the United Kingdom", `evidence.qa` emptied (the 2026-10-16 QA record in the old folder is for v2 and stays there).

Claims (I verified none):
- **Reset to unverified:** c1 (learner text "Britain" to "the United Kingdom"/"UK", gloss added), c2 (stage labels "UK"), c3 (readout "UK, 1900", reveal subject), c6 (**new text**: "this counts fuel burned in each country, not land clearing", replaces the removed v2 c6; for the fact-checker: does "fuel burned" fairly describe a series that also includes cement?), c8 (**new**: "counting land cleared for farms too, ... under 5%", co2_including_luc 131.8 / 2,910.9 Mt = 4.5%; for the fact-checker: the research note says land-use change is "mostly clearing forests and grasslands", which does not itself say "for farms").
- **Status kept (fact-checker's FC39):** c4, c5, c7. Their text, support, source and the learner text they address are unchanged; only the id moved with the slug. Each note says so. If the fact-checker treats an id move as a change, these three reset too.
- Stage word count at the busiest frame (tonnes view): 21 (title 6, gloss 3, band labels 5, "Tonnes, not shares" 3, readout labels and value 4). Reveal: 78 words as reveal-fit counts it.

## Pre-flight v3

1. **Title and hook.** "Where the fossil-fuel CO2 came from in 1850" / "Several countries burned coal by 1850. How was the world's fossil-fuel CO2 split between them?" Neither names a country or a size.
2. **Options.** "About 5%", "About 25%", "About 60%": all numbered, same precision (unchanged).
3. **Locked stage.** Title "Share of world fossil CO2", gloss "UK = United Kingdom", axes 0-100% and 1750-1950, no band drawn, readouts "–". The gloss names the country the question asks about but no share. Nothing marks 60%.
4. **Reveal values.** "62%": milestone `y1850` (readout "UK, 1850"). "21%": milestone `y1900` (readout "UK, 1900"). "10 times": milestone `tonnes` (readout "1850 to 1900: World ×10"). "under 5%": told, claim c8 (no toggle, by the care line); it is not on the stage.
5. **QA path.** DOM order 1800, 1850 (y1850), 1900 (y1900), 1950, Tonnes, not shares (tonnes): all three milestones by press 5 (unchanged). At the reveal, the tonnes view with the 1850 and 1900 guides and all three readouts is on the stage.
6. **Reset.** No Reset; presets never clear the readouts. Reveal from the 390x844 run: "In 1850 the United Kingdom produced 62% of the world's fossil-fuel CO2. By 1900 its share had fallen to 21% as the United States, Germany and others burned more coal, and world emissions had grown 10 times. A falling share can hide a rising total. Where it stops: this counts fuel burned in each country, not land clearing; counting land cleared for farms too, the United Kingdom's 1850 share was under 5%."
7. **Phone fit.** `tools/reveal-fit.mjs` (committed copy, tool stamp clean) against my production build (`next build`, NEXT_DIST_DIR=.next-co2, `next start` on :3742, built from 4645a20 plus the layout CSS in this commit):
   - 390x844: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named 1850, 1900, germany, others, 62%, 21%: all visible), 78 reveal words, picture not fitted (full 188/188, so svg text renders at 11 px), phoneFit true.
   - 412x839: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 78 reveal words, phoneFit true.
   - First run (before the one-row presets): 390x844 cropped 33 px with the picture fitted to 171/188 (text at the 10 px floor); 412x839 fit. Fixed by merging the preset rows, not by cutting words.
   - Artifacts (not committed): `artifacts/reveal-fit/co2-v3-390x844.json`, `co2-v3-412x839.json` and the matching PNGs.
- **QA contract** (`tests/qa/contract.spec.ts`, QA_BASE_URL=http://localhost:3742, QA_ONLY=britain-made-most-fossil-co2-in-1850, --workers=2): phone passed, desktop passed (2 passed). Local build, not a qa-tester release record.
- Typecheck passes. `npm run check`: one error, the hook (above).

Publish needs culture-en on the walkthrough (stage B), a fact-check of c1-c3, c6 and c8, and a QA record on v3.

r16 fix (W-1360): hook and title set to cm-history's wording, skip line removed; fit was measured with the longer strings, so not re-run.
