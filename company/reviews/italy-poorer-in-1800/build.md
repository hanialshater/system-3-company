# Build notes: italy-poorer-in-1800

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #18. Numbers: history-cycle2-check.mjs section 18 (all checks pass).

- The Maddison "GDP per capita" values for Entity Italy, 1310-1871 (562 values, none missing), are copied into Demo.tsx unchanged; a node script confirmed the array equals the CSV. The stage shows only an index, 1450 = 100, because the copy states no unit. The index axis starts at 0, so the 25% fall is not exaggerated.
- Locked frame: axes and the line from 1310 to 1450 only (the question gives 1450 = 100). After the commit, the line is drawn up to the furthest preset pressed. Marks for 1450 and 1800 stay once set.
- Presets in DOM order: 1450, 1800 (milestone `y1800`; readout "1800: 75 (−0.08% a year since 1450)"), 1310 to 1871, the whole line (readout 1310 89 · 1450 100 · 1800 75 · 1871 87), Change per year (a dashed constant-rate segment from 1450 to 1800, with readout "−0.08% a year: 100 → 75"). The gate is `y1800` only, as in the brief. The 0.08% the reveal names is already in the 1800 readout, so no extra milestone was needed. There is no Reset button. Control row `foldAtReveal`.
- Hook changed from my draft ("one rich region") to "Test north and central Italy", which carries no unclaimed adjective.
- No held source sentence. Malanima's title, an optional caption in the brief, is not used. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "Richer by 1800?" / "Before industry, did people at least get slowly richer? Test north and central Italy." They ask a question and do not answer it.
2. **Options.** "About 75" / "About 100" / "About 150". All are numbered at the same precision.
3. **Locked stage.** It shows the axes (0-120), a dashed reference at 100 and the 1310-1450 line, with readout "?". Nothing is drawn after 1450, so nothing matches 75.
4. **Reveal values.** 75% is computed and gated by `y1800`, marked "1800: 75". 0.08% is computed and shown in the 1800 readout (gated by `y1800`) and in the rate view. 350 years is computed (1800 - 1450) and in the rate readout label. 1450 and 1800 are the presets.
5. **QA path.** Pressing the 4 presets in DOM order reaches y1800 (press 2). It ends in the rate view: whole line, both marks, the dashed segment and the readout "−0.08% a year: 100 → 75".
6. **Reset.** There is no Reset button. Reveal from the run: "On this series, a person in north and central Italy in 1800 had about 75% of the income of one in 1450: a fall of about 0.08% a year for 350 years. Income per person can shrink for centuries, not only grow. Where it stops: this is one reconstruction, it covers only the north and centre before 1871, and the copy we opened states no unit, so it is read as an index."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, phoneFit true, reveal 76 words with the verdict. The svg labels are 11 px in a 340-wide viewBox at about 330 px.

## v2 (2026-10-15, demo-builder, branch hrB: W-990, learner adult-beginner r1)
- **Endpoints defended on stage** (finding 2): a fifth preset, "25-year averages" (milestone `avg`; minInteractions 2), draws the centred 25-year mean of the same series (y-12..y+12, 1322-1859) as a thick line over the faint yearly line. It shades 1438-1462 and 1788-1812 and labels them "avg 101" and "avg 79"; readout "1438–1462: 101 → 1788–1812: 79". Re-derived in node from the pinned maddison2020.csv: window means 3,251.9 and 2,531.1, index 101.1 and 78.7, ratio 77.8%. The result holds when the window changes: 21-year windows give 100.4 / 78.7, 51-year windows 99.8 / 79.5, 10-year windows a 75.1% ratio. The 1450 value is not a spike against its own neighbourhood (its 21-year mean is 100.4). 1800 is a dip (75 vs 79), so the averaged fall is about 22%, not 25%.
- Reveal: "a fall of about 0.08% a year for 350 years" is replaced by "Not just a high year against a low one: averaged over the 25 years around each date, it still fell, from 101 to 79." The 0.08% stays on the stage (1800 readout, Change per year), and claim c3 is unchanged. The brief's objective still names 0.08%, so cm-history may want it back in. The word budget (86 now) has room for about four words.
- **Limit sentence** (finding 4): "Where it stops: this is one reconstruction, of the north and centre only, and the data file names no unit, so it is shown as an index." The "copy we opened" wording is gone. c6 is reset to unverified.
- **Hook: unchanged, for cm-history to rule.** Proposed open title and hook (from the review): "Italy, 1450 to 1800" / "North and central Italy before industry: what happened to income per person?" The question and options do not change.
- The whole-line view is still optional. The avg view draws the whole line, so the required path now shows the context the review asked for.
- Claims: new c7 (averages), unverified. c6 reset. c3 note only. meta.json version 2.
- Phone fit (reveal-fit, committed, :3672, 390x844): fit, crop 0, hidden 0, namedHidden 0, phoneFit true, 86 words. QA contract phone and desktop pass.

## v3 (2026-10-15, demo-builder, branch patience: W-1024, cm-history r1-revision ruling 3; FC47 c6 dispute)

- meta.json title "North and central Italy, 1450 to 1800"; hook "Before industry, did income per person rise, hold or fall?"; objective and recall replaced with the ruling's exact text (recall answer index 0). Reveal paragraph 1 unchanged.
- New claim c8 for the hook's "Before industry" (unverified; a source must be opened by the fact-checker; fallback hook "Over 350 years, did income per person rise, hold or fall?" per the ruling).
- c6 (FC47 dispute): reveal limit sentence now "Where it stops: this is one reconstruction, of the north and centre only, shown as an index (1450 = 100)." (fix a; the unit reason is dropped because the OWID datapackage.json gives 2011 int-$). Source updated; reset to unverified. Demo.tsx header comment no longer says the copy states no unit.
- Re-derived from the pinned maddison2020.csv (sha256 holds): index 1800 = 74.70 (75); centred 25-year means 1438-1462 = 101.05 (101), 1788-1812 = 78.65 (79).
- reveal-fit: 390x844 fit, crop 0, 78 words, phoneFit false (namedHidden "1800"); 412x839 the same. On HEAD's files 412 already had this flag and 390 did not. Cause: the longer title wraps to two lines, the card collapses the controls tray ("Show controls"), and the hidden match is the "1800" preset button inside it. The year the reveal quotes is on the picture ("1800: 75" dot label, visible in the screenshot); the heuristic matches only an exact "1800" label. I did not change the ruled title or game the label. QA contract: phone and desktop pass.

## Status draft -> review (2026-10-16, demo-builder, branch rome4: W-996, history round-1 batch item 2)
- Flipped on: QA record company/reviews/italy-poorer-in-1800/2026-10-16-qa.md (contract phone + desktop, pass, production build of 59df55e); claims 8/8 verified; launch verdict on the current version v2 in company/reviews/italy-poorer-in-1800/2026-10-16-learner-adult-beginner-r12.md. Demo.tsx and styles are unchanged since the QA build. No code or claim changed; version stays 2.
