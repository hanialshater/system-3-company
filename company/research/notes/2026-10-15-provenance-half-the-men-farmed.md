# Provenance note: half-the-men-farmed (History brief 3, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · charter sensitive route, step 2
- for: cultural-reviewer (W-960 `culture-en-brief`; the route list says the reviewer should see this note's wording on enslaved people before anything else), cm-history-population-economy (Olumide), cm-history
- brief: `company/domains/briefs/history.md` #3 · concept `history:farm-share-structural-change` · class: slavery (the 1850 record's coverage)
- data read: vega-datasets 3.2.1 `jobs.json` and `datapackage.json` (pin `vega`); two IPUMS papers on PMC, opened in full via the PMC OAI service
- confidence marks: high = opened and re-run here; medium = opened secondary; low = inference; unverified (memory) = not opened

## 1. Whose record is it?

The **United States federal census**: enumerators' manuscript returns, as later sampled, coded and harmonised by IPUMS USA at the University of Minnesota. vega's description (opened, high): a tabulation of the IPUMS `OCC1950` variable by sex across IPUMS USA samples, "derived from Version 6.0 (2015) of IPUMS USA, according to 2024 correspondence with the IPUMS Project", first built in 2006 for IBM Research's *sense.us* (Heer, Wattenberg, Viégas). The census was the state's count, taken for apportionment and taxation, of the people it chose to count, in the categories it chose.

## 2. Who made it, when, for what purpose, and who it leaves out

**Enslaved people are on a different schedule with no occupation.** Hacker, Huynh, Nelson & Sobek (2025), "IPUMS Full Count Datasets of Enslaved Persons and Slaveholders in the United States in 1850 and 1860", *Historical Methods* 58(4), PMC13166968 (opened in full, high as a statement by the IPUMS team about the source):

> "The enslaved population was enumerated on a separate schedule—'Schedule 2, Slave Inhabitants'—with much less information. Although age, sex, color, and disability were recorded for each enslaved person, names were not recorded, and no information was collected on occupation, marital status, birthplace, literacy, or school attendance."

The same paper says an 1849 advisory board of statisticians had proposed collecting more (including names) and that "the lack of information collected for enslaved population schedules is regrettable". It puts the 1850 enslaved population at about 3.2 million. Nelson, Magnuson, Hacker & Sobek (2025), *Historical Methods* 58, PMC12629631 (opened, high), give enslaved persons as **13.8% of the total population in 1850** and 12.6% in 1860.

**"Indians not taxed" are outside the data too.** PMC12629631, note 1: the IPUMS 1850-1880 full-count data "do not include individuals the U.S. Constitution referred to 'Indians not taxed'", meaning Native Americans "who maintained tribal relations, lived under their own governments" (opened, high). The brief does not mention them.

**Women's work.** jobs.json lists 52,043 women with an occupation in 1850 and 1,210,715 in 1860 (re-run, high). That is a gap in what the census recorded, not a measure of women's work. Why the 1850 count is so small (for example, whether enumerators were told to record occupations for men only) was **not opened**: unverified (memory).

**Coding.** vega warns that IPUMS "has made improvements to occupation coding since version 6, particularly for 19th-century samples", so "figures for earlier years (particularly 19th century) may not match current IPUMS USA data exactly" (high). `OCC1950` maps 1850 job titles onto a 1950 classification: a modern frame laid on the past.

## 3. What the data show around emancipation (re-run, high; reading low)

| Census | Men with a job (millions) | Farm share of men |
|---|---|---|
| 1850 | 5.35 | 51.0% |
| 1860 | 7.22 | 47.9% |
| 1870 | 11.10 | 51.5% |
| 1880 | 15.37 | 48.2% |

There is no 1890 row in the file (high; why is not opened). The 1860 to 1870 jump in men with a job (+54%) and the farm share rising again to 51.5% fit formerly enslaved men entering the occupation records in 1870. That is my inference (low): the file has no race variable, so it cannot show this. **It must not reach the stage.** It does tell the reviewer that the 1850 and 1860 shares are not comparable with 1870 onwards, and the brief's "true 1850 farm share was higher" is a plausible direction, not a measured number.

## 4. Published alternatives

- No alternative farm-share series was opened. Current IPUMS (after the 2015 v6 recoding, and the 2025 full-count releases) may give different 19th-century shares (vega's warning, high). **We don't know by how much** from this host: IPUMS's own site (`usa.ipums.org`) is blocked.
- An estimate of the farm share **including** enslaved workers would need assumptions about their occupations, which the 1850 record does not contain. Any such number would be a model, labelled as ours, or nothing (charter).

## 5. Which perspectives it leaves out (summary)

About 3.2 million enslaved people (no occupation recorded), Native Americans "not taxed" (not enumerated in these data), and most women's work (not recorded as an occupation). Plus everyone's own description of their work: the census recorded enumerators' entries, later coded to 1950 categories.

## 6. Framing risks for the cultural reviewer

1. **The main one: the one held sentence about enslaved people.** It is now **checkable** (PMC13166968) and must not be cut silently. Proposed wording, matching the source: "Enslaved people were listed on a separate schedule that recorded no occupation, so the 1850 job records leave out about one in seven Americans, most of whom worked on farms." Every part except "most of whom worked on farms" is in the opened sources ("one in seven" is 13.8%, PMC12629631). **"Most of whom worked on farms" is not in what I opened: unverified (memory). Cut it, or have the fact-checker source it.** Without it, the sentence still says why the 1850 share is understated. The care line (no stage element counts enslaved people) is kept, because "one in seven" sits in the reveal, not on the stage. If the reviewer reads even that as using enslaved people as a statistic, use "leave out the enslaved population entirely".
2. **Person-first language** (checklist L1). The source's own term is "Slave Inhabitants". Use it only in quotation marks, as the schedule's name.
3. **"Half the men farmed"** as a title erases the people the record did not list. The reveal's last sentence must carry that, and it does once item 1 is in.
4. **Native Americans** are a second omission that the brief does not name. One clause ("and Native Americans living under their own governments were not counted") is sourced (PMC12629631). It goes in only if the 90-word cap allows; otherwise the research note records it and the lesson does not claim completeness.
5. **Women's 52,043** must not be read as "women didn't work". The reveal's current "(52,043 women)" is ambiguous. Suggest "recorded jobs almost only for free men".

## 7. What is checkable from reachable hosts

| Item | Checkable? | Source |
|---|---|---|
| shares 51.0 → 2.0%, the 1910 peak, 52,043 women | yes (high) | `history-cycle1-check.mjs` section 3 on the pin |
| enslaved people listed on a separate schedule with no occupation | **yes (high)** | Hacker et al. 2025, PMC13166968 |
| enslaved people 13.8% of the 1850 population | yes (high) | Nelson et al. 2025, PMC12629631, note 1 |
| "Indians not taxed" excluded | yes (high) | PMC12629631, note 1 |
| why the census recorded so few women's occupations | **no** | census instructions not opened |
| "most of whom worked on farms" | **no** | not in opened sources |

## 8. Limit sentence: match

The brief's held sentence, "Enslaved people … were not recorded with occupations", matches PMC13166968. Its "the true 1850 farm share was higher" is a direction I agree with (low: inference). It should not be stated as a fact without a source. Proposed final sentence, about 40 words: "Where it stops: the 1850 census recorded jobs almost only for free men. Enslaved people, about one in seven Americans, were listed on a separate schedule with no occupation, so these shares leave them out."

**The fact-checker (not this note) marks the held claim.** I recommend it move from held to sourced, citing PMC13166968.
