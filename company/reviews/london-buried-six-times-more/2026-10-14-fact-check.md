# Fact-check: london-buried-six-times-more (2026-10-14)

Lesson: src/demos/history/london-buried-six-times-more/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/london-buried-six-times-more/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: Hook 'London's Bills of Mortality counted burials year by year' carries the same attribution as c1 and goes with it.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified | The numbers verify against the pinned file. Arbuthnot.csv 1664 Mortality 15,453; 1665 97,306, Plague 68,596; 1666 12,738; 1665 christenings 5,114 + 4,858 = 9,972; 1636 Plague 10,400 of 23,359. Demo.tsx BILLS identical for all 82 years. The attribution does not verify. The HistData Arbuthnot doc (opened) says the Plague and Mortality columns are 'deaths from the plague and total mortality obtained by Campbell and from Creighton (1965)'. It does not say they are the Bills of Mortality's burial counts. (So the pin's note 'the doc does not name the source' is out of date: it names Campbell 2001 and Creighton 1965.) Web search snippets, not opened, match: 97,306 burials and 68,596 plague in the 1665 general bill. But no printed Bill, Creighton or Campbell page could be opened (all blocked). Fix: either a web-capable session (W-583) opens a 1665 general Bill or Creighton and verifies 'Bills of Mortality ... burials'; or the builder words it to the doc: 'London's yearly records of deaths and plague deaths (compiled by Creighton, 1965)'. That wording would change the question, hook and reveal from 'burials' to 'deaths'. |
| c2 | verified | Arithmetic on c1's numbers: 97,306/15,453 = 6.30; 68,596/97,306 = 70.5% (70); 97,306/9,972 = 9.76 (about 10); 1636 44.5% (45). Demo.tsx computes the same. The labels 'burials' and 'put down to plague' depend on c1. |
| c3 | unverified | '1665 was the year of the Great Plague' is a named historical event. The file only shows that 1665 has the largest plague count (68,596) in 1629-1710. No opened source names it (Britannica and Wikipedia blocked). Fix: verify in the W-583 session, or reword the question to the data: 'In 1665, the worst plague year in these records, about how many?' |
| c4 | unverified | Depends on what a Bill recorded: burials, with causes entered by non-medical searchers. No source for that could be opened (see c1). The HistData doc says only 'total mortality'. Fix: verify with c1 in the W-583 session, or cut to 'Where it stops: these are recorded deaths and recorded causes, not a count of every death.' The source field already offers cutting 'or a doctor's diagnosis'. |

**Result (Pass 39):** 1 verified, 0 disputed, 3 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c1 (unverified): fix in the note above. Owner: history-builder-2; or the W-583 web-capable session.
- c3 (unverified): fix in the note above. Owner: history-builder-2; or the W-583 web-capable session.
- c4 (unverified): fix in the note above. Owner: history-builder-2; or the W-583 web-capable session.
