# Provenance note: disease-killed-eight-to-one (History brief 4, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · charter sensitive route, step 2
- for: cultural-reviewer (W-960 `culture-en-brief`), cm-history-events-data (Anselm), cm-history
- brief: `company/domains/briefs/history.md` #4 · concept `history:crimean-war-causes-of-death` · class: war
- data read: `artifacts/history-data/Nightingale.csv` (pin `nightingale`), vega-datasets 3.2.1 `crimea.json` and `datapackage.json` (pin `vega`), the HistData doc page `Nightingale.html` (Rdatasets, raw.githubusercontent.com)
- confidence marks as in the khanates note: high = opened and re-run here; medium = opened secondary; low = inference; unverified (memory) = not opened

## 1. Whose record is it?

The **British army's** record of its own dead, compiled for a British reform campaign. vega's datapackage (opened, high) names the source as Nightingale (1859), *A contribution to the sanitary history of the British army during the late war with Russia*, **Table II: "Estimated Average Monthly Strength of the Army; and the Deaths and Annual Rate of Mortality per 1,000 in each month, from April 1854, to March 1856 (inclusive), in the Hospitals of the Army in the East."** It adds that "Nightingale credits Dr. William Farr for compiling the data from the 1858 Medical and Surgical History of the British Army" (high that the package says this; the 1858 volume was not opened).

Two consequences the brief does not state:
- **The deaths are deaths recorded in the army's hospitals in the East**, by the table's own title. Men who died in the field without reaching a hospital may be outside it (low: an inference from the title; I did not open Table II's notes).
- **"Army" is an estimate.** The HistData doc says "Estimated average monthly strength" (high). It ranged from 8,571 (April 1854) to 47,751 (re-run, high), so counts and rates tell different stories and the brief's "Rate per 1,000 a year" preset matters.

## 2. Who made it, when, for what purpose

- Compiled by William Farr from army medical returns; published by Florence Nightingale in 1858-1859 (HistData doc and vega datapackage, opened; Nightingale's books not opened). The HistData doc says her diagrams were made to argue that deaths "could be reduced by better battlefield nursing care" and for "medical reform" (high that the doc says so).
- **Purpose: advocacy.** The diagrams were made after the war to persuade government, not as a neutral tally. The Lancet's 2020 bicentenary piece (McEnroe, PMC7252134, opened, medium as a secondary account) says she was "a passionate campaigner for health reform" and a "political influencer".
- The digitised copy came through Pearson & Short (2007), Understanding Uncertainty (HistData doc, high that it says so; the site is blocked here).
- **What "zymotic" meant.** McEnroe (2020, opened, medium): zymotic disease was "a step between the old theory of miasma ... and the emerging germ theory", "a concept of fermentation spreading disease, dividing diseases between zymotic (preventable) ones such as dysentery and cholera and non-preventable ones". vega's field description: "Zymotic Diseases (preventable infectious diseases)" (high). The category is a 19th-century classification, so "disease" on the stage is our modern simplification of it.
- **Wounds** in vega's schema = "Luxatio, Sub-Luxatio, Vulnus Sclopitorum (gunshot wounds), Vulnus Incisum, Contusio, Fractura, Ambustio, Concussio-Cerebri" (high).

## 3. Published alternatives and disputes

- **The "Sanitary Commission caused the fall" reading.** The HistData doc says the death rate "was higher in the first year of the war, before a Sanitary Commissioners arrived in March 1855" (high that the doc says so). McEnroe (2020) says the Commission, sent to Scutari in 1855 and co-led by John Sutherland, found the hospital "built on a blocked sewer", cleaned it, and that "the positive effect ... was recorded in the Sanitary Commission's report" (medium; the report itself not opened).
- **The known dispute** (the brief's "dispute about the rose's message"): historians have argued about what Nightingale concluded and when, about whether the Scutari hospitals themselves raised mortality, and about how much of the fall came from sanitation versus season, supply and army size. Hugh Small (1998), cited in the HistData doc, is the usual source. **Not opened** (the host is blocked), so its argument is unverified (memory) here. The brief's limit sentence ("weather and army size changed too, so this chart alone cannot prove what caused the fall") is the right hedge and matches what the data can show.
- **We don't know** from this host how Table II compares with the army's own *Medical and Surgical History* (1858) totals. The two copies in our pins (HistData and vega) agree (brief check section 4), but both descend from the same 1859 table, so their agreement is not independent confirmation.

## 4. Which perspectives it leaves out

- **Every army but the British one.** French, Ottoman, Sardinian and Russian soldiers, who made up most of the war's dead (unverified, memory, for the shares), are absent. The stage question says "British soldiers", which is correct. The reveal must not slide into "in the Crimean War, disease killed eight times ...".
- **Civilians.** Crimean Tatars and other residents of the war zone, and the families who followed the army, do not appear in the record (unverified, memory, that the record omits them; it is certain that the table counts only the army).
- **Soldiers themselves.** The record speaks for them through officers, doctors and a reformer. Men appear only as counts.
- **The nurses and orderlies,** including those who were not Nightingale's party. McEnroe says she arrived with 38 British nurses (medium); others worked there too (unverified, memory).

## 5. Framing risks for the cultural reviewer

1. **The main one: a reform campaign's chart presented as a neutral count, and a cause credited to one actor.** "After a sanitary commission arrived" (held claim 3) together with Nightingale's name invites a "great woman" story (refuse list: one person credited with a collective outcome) and a causal claim the chart cannot carry. Keep the fallback ("From April 1855 they averaged 277 a month") unless the fact-checker opens a primary source. Even then, keep "this chart alone cannot prove what caused the fall".
2. **"Hospitals of the Army in the East".** The limit sentence should say whose deaths these are: "deaths recorded in the British army's hospitals in the East". The table title is opened (high), so this is a sourced phrase.
3. **The annual rate of 1,023 per 1,000** ("more than the whole army in a year") is the stage's most striking number. It is a rate, annualised from one month. It is accurate, but it is the death toll used as the surprise (checklist N3). Suggest the reveal says "an annual rate above 1,000 per 1,000: at that pace the whole army would have died within a year" or drops the clause. "More than the whole army" can be misread as a count.
4. **Minimising combat.** "8 to 1" must not read as "the war was mostly harmless" or "battle didn't matter". The care line (no who-was-right, no gore) covers the rest.
5. **"Zymotic" translated as "disease"** is fine on the stage if the reveal or a label says it was the period's word for infectious "preventable" diseases. Sourced to vega's schema and McEnroe.

## 6. What is checkable from reachable hosts

| Item | Checkable? | Source |
|---|---|---|
| 14,476 / 1,758 / 1,748, 8.23, the rates, 930 vs 277 | yes (high) | `history-cycle1-check.mjs` section 4 on pinned files |
| "in the Hospitals of the Army in the East" (Table II title) | yes, as the package states it (high) | vega datapackage.json |
| Farr compiled the data | yes, as the package states it (high) | vega datapackage.json |
| what zymotic meant | yes, secondary (medium) | McEnroe 2020, Lancet, PMC7252134 (via PMC OAI) |
| Sanitary Commission sent to Scutari in 1855, found a blocked sewer | yes, secondary (medium) | PMC7252134. The HistData doc gives "March 1855" |
| what caused the fall | **no**: the data cannot say; Small (1998) and the Commission's report not opened | keep the hedge |
| totals for the other armies | **no** | not in any pinned file |

## 7. Limit sentence: match

The brief's limit ("weather and army size changed too, so this chart alone cannot prove what caused the fall") matches. **Proposed (cm-history-events-data decides):** name whose record it is in the same sentence, for example "Where it stops: these are deaths in British army hospitals, from a chart made to argue for reform; weather and army size changed too, so it cannot prove what caused the fall." Check the 90-word cap.
