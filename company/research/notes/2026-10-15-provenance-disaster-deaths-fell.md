# Provenance note: disaster-deaths-fell (History brief 11, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · charter sensitive route, step 2
- for: cultural-reviewer (W-960 `culture-en-brief`), cm-history-events-data (Anselm), cm-history
- brief: `company/domains/briefs/history.md` #11 · concept `history:disaster-deaths-over-time` · class: famine
- data read: vega-datasets 3.2.1 `disasters.csv` and `datapackage.json` (pin `vega`); Our World in Data's **current** series `grapher/natural-disasters-deaths.csv` and its metadata JSON, fetched 2026-10-15 from ourworldindata.org (sha256 3059d030…; **not pinned**; scratch only); OWID's "Natural Disasters" and "Famines" pages (opened); one Sci Data paper on PMC
- **host note for cm-history:** the charter lists `ourworldindata.org` and `cran.r-project.org` as blocked (checked 2026-10-14). Today both answered HTTP 200 and served content. The charter's table should be re-checked by its owner.
- confidence marks: high = opened and re-run here; medium = opened secondary; low = inference; unverified (memory) = not opened

## 1. Whose record is it?

**EM-DAT**, the Emergency Events Database of CRED (Centre for Research on the Epidemiology of Disasters, UCLouvain, Belgium), as processed by Our World in Data (vega datapackage, opened, high). For the early 20th century it is not a contemporary register. OWID (opened, high): "CRED was created in 1973 and started compiling disaster data. It wasn't until 1988 that it took over the disaster database and established EM-DAT." Records of the 1900s-1940s were compiled backwards, decades later, from whatever sources reported an event. OWID says "mostly large events, making it into the history books, ... were recorded" and that "EM-DAT suggests caution when trying to infer complete trends using pre-2000 data" (opened, high). OWID's chart note: "coverage is more limited before the year 2000" (metadata, high).

EM-DAT's inclusion rule is about outside help: a disaster is "a situation or event which overwhelms local capacity, necessitating a request to the national or international level for external assistance" (OWID metadata quoting EM-DAT, high). Deaths are "confirmed deaths, plus missing people" (high).

## 2. Who made it, when, for what purpose

- CRED: a public-health research centre whose database serves humanitarian and disaster-risk work (unverified, memory, as to purpose).
- OWID: Ritchie, Rosado & Roser (2022), "Natural Disasters" (vega cites this, high). OWID standardised country names, regions and units (vega, high).
- vega-datasets copied the OWID series of about 2022 into `disasters.csv`: world totals by type, no country column (high).
- Missingness is not random. Jones, Guha-Sapir & Tubeuf (2022), "Human and economic impacts of natural disasters: can we trust the global data?", *Scientific Data* 9:572, PMC9481555 (opened, high): for 1990-2020, "the year the disaster occurred, income-classification of the affected country and disaster type were all significant predictors of missingness"; "data are unlikely to be missing completely at random".

## 3. The 1920s are mostly famines, and two big ones had human causes (high for the codes; medium for the readings)

The pinned file has no country. OWID's current series does. Matching the large drought years (current series, re-run, high):

| Year | Recorded under | Deaths | Country in the current OWID series |
|---|---|---|---|
| 1920 | drought | 500,000 | China |
| 1921 | drought | 1,200,000 | USSR |
| 1928 | drought | 3,000,000 | China |
| 1942 | drought | 1,500,000 | India |
| 1943 | drought | 1,900,000 | **Bangladesh** (that is, the Bengal famine, coded to a country that did not exist until 1971) |

The brief's own note ("droughts then were famines") is right. OWID's Famines page (opened, medium as OWID's summary) says "most documented famines have occurred in the context of harvest failures", but also that "Amartya Sen argues that 'speculative withdrawal and panic purchase of rice stocks' was one of the primary causes of the Bengali famine of 1943". The 1921 Soviet famine came amid civil war and grain requisitioning (unverified, memory). So **the "natural disaster" record counts famines whose causes were partly political, military or market failures, and codes them as drought.** Round numbers (500,000; 1,200,000; 3,000,000) show these are single historians' estimates, not counts (low: inference from the rounding).

## 4. Published alternatives: the numbers change with the version

**The biggest one: the current OWID/EM-DAT series has no epidemics.** `disasters.csv` includes an "Epidemic" type (3.32 million deaths in the 1920s). OWID's current `natural-disasters-deaths` series has no epidemic column at all (columns: drought, earthquake, volcanic activity, flood, landslide, extreme weather, wildfire, extreme temperature). Re-run (high):

| Series | 1920s mean a year | 2010-2017 mean a year | Fall |
|---|---|---|---|
| pinned vega file, all types (the brief) | 872,629 | 56,867 | ×15.3 |
| pinned vega file, epidemics removed | 540,329 | 52,670 | ×10.3 |
| OWID current series (EM-DAT 2026), no epidemics | 523,942 | 53,720 | ×9.8 |

So the headline "15 times fewer" depends on counting epidemics as natural disasters, which the data's own maintainers no longer do. Per person the fall is still large, about ×36 on the current series against the brief's ×57 (my arithmetic: ×9.8 times the brief's 3.7-fold population growth; low until scripted).

**Single events were revised.** China's 1959 flood: 2,003,396 deaths in vega's copy, 483,126 in the current series (high). One revision changes the 1950s decade by about 150,000 a year.

**"Now" depends on what is included.** OWID says disasters "kill approximately 10,000 to 20,000 people per year globally (excluding temperature deaths, which are unevenly counted)", averaged over the last decade (opened, high). The brief's 2010-2017 mean of 56,869 includes the 2010 Haiti earthquake, epidemics and temperature deaths. Both are "the record"; they answer different questions.

**The 1918 influenza is not in it.** vega's "Epidemic" row for 1918 is 449,700 (high). The pandemic killed tens of millions (unverified, memory). The epidemic type is very incomplete even for the largest event of the century. That is another reason to drop it.

## 5. Which perspectives it leaves out

- People in the places hit: the counts come from governments, relief agencies and later historians, not from the communities.
- **Poor and colonised places are the least completely recorded** (PMC9481555 for 1990-2020; for the 1900s-1940s, OWID's "mostly large events"). The decline partly measures who was counted.
- **Human causes.** Famine deaths filed as drought hide war, requisitioning, colonial administration and markets (section 3).
- No country is on the stage (care line). That avoids blaming places, but it also hides that the 1920s total is mostly China, the USSR and India.

## 6. Framing risks for the cultural reviewer

1. **The main one: "natural" disasters that were famines with human causes.** The stage shows a "drought" stack for the 1920s, and the reveal says "Most of the 1920s deaths were recorded under drought and epidemics". A reader in Bengal, Ukraine or Henan would not recognise the 1943, 1921 or 1928 famines as weather events (checklist P3). Say "recorded under drought (famines, some with human causes)" or "recorded as droughts, most of them famines", and keep the care line's ban on "nature is getting kinder".
2. **The ×15 headline rests on epidemics** (section 4). Either remove epidemics and use about ×10 (the current maintainers' definition, matching OWID), or keep them and say in the reveal that "this older copy counts epidemics as disasters; without them the fall is about ten times". The prediction options (60,000 / 500,000 / 1.5 million) still work for both.
3. **Today's borders projected onto the past:** "Bangladesh 1943" in the current OWID series. This is not on the stage (no country there), but it matters if anyone adds country labels (N4).
4. **Survivorship of records:** "early records are less complete" (held sentence 4) is now **checkable**: OWID's page and chart note (opened, high) say so. It can move from held to sourced, and the brief's first clause can stay.
5. **Death toll as spectacle:** "1931 alone recorded 3.7 million" is a single estimate of the 1931 China floods (current series: China, flood, 3,700,000; high). Using it as the "biggest single year" preset is fine as an illustration of volatility. Do not frame it as a surprise in itself (N3).

## 7. What is checkable from reachable hosts

| Item | Checkable? | Source |
|---|---|---|
| decade means, ×15.3, ×57, 1931 | yes (high) | `history-cycle1-check.mjs` section 11 on the pin |
| early records less complete; CRED from 1973, EM-DAT from 1988 | **yes (high)** | ourworldindata.org/natural-disasters (opened 2026-10-15) |
| EM-DAT's disaster definition, deaths include missing | yes (high) | OWID grapher metadata JSON |
| which country each big drought year is | yes (high), current series only | OWID grapher CSV (would need a pin) |
| current series without epidemics: ×9.8 | yes (high) | same; would need a pin and a script line |
| Bengal 1943 had market causes (Sen) | yes, secondary (medium) | ourworldindata.org/famines |
| 1918 influenza toll | **no** | not opened |

## 8. Limit sentence: match

The brief's "early records are less complete, and one year can swing a decade" matches, and its held clause is now sourceable. **Proposed (cm-history-events-data decides):** pin the current OWID series, and end with "Where it stops: early records hold mostly the largest events, many of the 1920s 'droughts' were famines with human causes, and this copy counts epidemics, without which the fall is about ten times."
