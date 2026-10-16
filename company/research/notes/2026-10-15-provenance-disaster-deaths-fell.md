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

## Pin (2026-10-16, W-1206)

- author: research-scientist (Dario) · batch `company/ops/dispatch-requests/2026-10-16-r3-research.md` B1 · feeds W-1038 (cm-history)
- checked by: fact-checker (lane 10), routed by evaluation-steward. Nothing here is a verified claim until that check.
- fetched files: `artifacts/history-data/` (gitignored, not committed). Fetched with plain `curl -sS` through the sandbox proxy.
- confidence marks as at the top of this note. "high" below means: fetched today, hashed, and re-computed in this run.

### P1. What was fetched (high)

| File (in artifacts/history-data/) | URL | Fetched (UTC) | HTTP | Bytes | sha256 |
|---|---|---|---|---|---|
| `owid-natural-disasters-deaths.csv` | https://ourworldindata.org/grapher/natural-disasters-deaths.csv | 2026-10-16T12:19:41Z | 200 | 275,205 | `244aaa43368253a975e9cda6e9200bad1ba60fd78a70a602c2e20f777e129d6a` |
| `owid-natural-disasters-deaths.metadata.json` | https://ourworldindata.org/grapher/natural-disasters-deaths.metadata.json | 2026-10-16T12:19:42Z | 200 | 15,488 | `8b78b2972ed3615d639ec945e996fcb90aef9774da0c5b57cb1c7acfbb4035c4` |
| `owid-natural-disasters-deaths-short.csv` (same data, short column names) | https://ourworldindata.org/grapher/natural-disasters-deaths.csv?useColumnShortNames=true | 2026-10-16T12:20:48Z | 200 | 275,378 | `3059d0307d099f80911ba04c6a58c425e82e581448b89fce65eb73f44c8d9853` |
| `owid-zip/natural-disasters-deaths.zip` (data package: CSV, metadata, readme.md) | https://ourworldindata.org/grapher/natural-disasters-deaths.zip | 2026-10-16T12:20:48Z | 200 | 69,388 | `a057756063203c55cd48ca554b9b049b0ff270a1cabd709a76481bbb66675478` |

Three things a re-fetcher needs to know:

1. **The 2026-10-15 hash (3059d030…) is not a change upstream.** It is the `?useColumnShortNames=true` variant. Today that variant still hashes to `3059d0307d099f80…`, and `?v=1&csvType=full&useColumnShortNames=true` and `?csvType=full&useColumnShortNames=true` give the same hash. The plain URL, and `?v=1&csvType=full&useColumnShortNames=false`, give `244aaa43…`. The CSV inside the zip is byte-identical to the plain CSV: sha256 `244aaa43…`, 275,205 bytes. **Pin the plain URL.**
2. **Do not pin the metadata JSON by hash.** It has a top-level `"dateDownloaded": "2026-10-16"`, so its bytes change every day even when the data do not. Pin the CSV, and record the metadata's `lastUpdated` (2026-04-30) instead.
3. The series moves on its own schedule: the metadata says `lastUpdated` 2026-04-30 and `nextUpdate` 2027-04-30. Expect the pin to fail after April 2027, and possibly earlier if OWID revises it.

Not reached (status recorded so nobody retries it blind): `https://api.ourworldindata.org/v1/indicators/1228789.metadata.json` (the metadata's `fullMetadata` link) gave proxy 403 at 12:20:30Z, and `https://doc.emdat.be/docs/legal/terms-of-use/` gave proxy 403 at 12:22:06Z. The grapher page `https://ourworldindata.org/grapher/natural-disasters-deaths` gave 200 (not read).

### P2. Columns and world aggregate, checked against this note's description (high)

- CSV header: `Entity, Code, Year, Droughts, Earthquakes, Volcanoes, Floods, Landslides, Storms, Wildfires, Extreme temperatures, All disasters`. The short-name header maps them to EM-DAT types: `total_dead_{drought, earthquake, volcanic_activity, flood, landslide, extreme_weather, wildfire, extreme_temperature, all_disasters}_yearly`. These are the eight types section 4 lists ("Storms" = extreme_weather, "Volcanoes" = volcanic_activity), plus a total column. **There is no epidemic column.** Section 4's description holds, so the stop rule was not triggered.
- The metadata's definitions: "Flood ... We also include glacial lake outburst floods in this category", and "Landslides" covers "both wet mass movements ... and dry mass movements". vega's separate "Mass movement (dry)" type is therefore folded into Landslides here.
- 238 entities. The World row runs 1900-2025 (126 rows, none missing; there is no World row for 2026). Aggregates in the file: World, six continents, EU-27, four income groups. Historical states have OWID codes (USSR, Yugoslavia, Czechoslovakia, East/West Germany, Serbia and Montenegro, the two Yemens).
- **World `All disasters` = the sum of the eight type columns in all 126 World rows** (0 mismatches). **World = the sum of every non-aggregate entity** (ISO countries plus historical states) in every year (0 mismatches). If you sum ISO codes only, 44 years come out short. For example, 1921 is 0 instead of 1,200,000, because the 1921 famine is coded to the USSR. So World is a plain sum, with nothing added by modelling.

### P3. Licence, citation, version, as the files state them (high that they say it; licence terms not opened)

- Chart citation (metadata `chart.citation`): "EM-DAT, CRED / UCLouvain (2026)".
- Column citation (`citationShort`, every column): "EM-DAT, CRED / UCLouvain (2026) – with major processing by Our World in Data". `citationLong` for the total: "EM-DAT, CRED / UCLouvain (2026) – with major processing by Our World in Data. “Annual number of deaths from all disasters – EM-DAT” [dataset]. EM-DAT, “The International Disasters Database” [original data]."
- **Licence: the metadata JSON states none.** The zip's `readme.md` (section "Sources") says: "License: UCLouvain 2026 (https://doc.emdat.be/docs/legal/terms-of-use/)". It also says: "If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license". **This is not CC BY.** The EM-DAT terms page is 403 from here, so **we don't know** what those terms allow for a public lesson. Whether the lesson may show these numbers is a licence question for whoever owns W-745 (licence and drift review). This run does not decide it.
- Source citation (readme): "EM-DAT – The International Disasters Database (2026). Maintained by the Centre for Research on the Epidemiology of Disasters (CRED), part of the University of Louvain (UCLouvain), Brussels, Belgium."
- **EM-DAT version: no version number is stated** in the metadata or the readme. What they do state: Producer EM-DAT, "Published: 2026-04-28", "Retrieved on: 2026-04-30", from https://emdat.be/. OWID `lastUpdated` 2026-04-30, indicator id 1228789 (total). Call it "EM-DAT as published 2026-04-28, retrieved by OWID 2026-04-30". **We don't know** the EM-DAT release label.
- Caveat in the chart note (metadata `chart.note`): "Based on recorded events; coverage is more limited before the year 2000. Longer historical trends may partly reflect reporting improvements."

### P4. Method (so anyone can recompute)

- **Current series:** World rows only. For each year, sum the eight type columns. Blank counts as 0. The result equals `All disasters`. Average over 1920-1929 (10 rows) and 2010-2017 (8 rows). There are no epidemics to exclude.
- **Pinned vega file** (`vega-datasets-3.2.1/package/data/disasters.csv`, pin `vega`): the file has world totals only. For each year, sum every type row except `All natural disasters` and `Epidemic`. Then average over the same years (10 and 8 years present).
- **Population:** the brief's method from `history-cycle1-check.mjs` section 11 (lines 346-347). Gapminder Fast Track world population (pin `gmpop`, `gapminder-pop-global.csv`), taking the 1925 value for the 1920s and the 2014 value for 2010-2017.
- **Per-million ratio** = (mean₁₉₂₀ₛ / pop₁₉₂₅) ÷ (mean₂₀₁₀₋₁₇ / pop₂₀₁₄), which is the same as raw ratio × population ratio.
- The script for this run is in the session scratchpad (not kept). The steps above are the whole method.

### P5. Results (high: re-computed from the fetched files)

| | Current OWID series (pin above) | vega, epidemics excluded | vega, all types (brief as drafted) |
|---|---|---|---|
| 1920-1929 sum / mean a year | 5,239,415 / **523,942** (523,941.5) | 5,403,293 / **540,329** | 8,726,293 / 872,629 |
| 2010-2017 sum / mean a year | 429,758 / **53,720** (53,719.75) | 421,356 / **52,670** (52,669.5) | 454,950 (`All` row) / 56,869; type sum 454,938 / 56,867 |
| **Raw ratio** | 523,941.5 / 53,719.75 = **×9.75** | 540,329.3 / 52,669.5 = **×10.26** | 872,629.3 / 56,868.75 = ×15.34 |
| Population ratio (gmpop 2014 / 1925) | 7,381,616,244 / 1,972,916,475 = **×3.74** | same | same |
| Deaths per million, 1920s → 2010-17 | 523,941.5 / 1,972.916 = 265.6 → 53,719.75 / 7,381.616 = 7.28 | 273.9 → 7.14 | 442.3 → 7.70 |
| **Per-million ratio** | 265.57 / 7.278 = **×36.5** (= 9.753 × 3.7415) | **×38.4** | ×57.4 |
| 1931 world total | **3,718,976**, of which Floods 3,700,000 (China's row: 3,710,000 in all) | 1931 `All` 3,706,227, of which Flood 3,700,000 | same file |
| Biggest single year | 1931 (of 1900-2025) | 1931 | 1931 |
| 1920s by type, top | Droughts 4,724,000 (90% of the decade), Earthquakes 389,991, Storms 120,516, Floods 4,333 | — | Drought, then Epidemic (as section 4) |

Notes on the table:

- These reproduce section 4's ×9.8, ×10.3 and ×15.3. They also replace the "about ×36, low until scripted" with **×36.5 (high)**.
- Using decade-mean populations (1920-29: 1.966 bn; 2010-17: 7.335 bn; ratio 3.73) instead of midpoints gives ×36.4. The method choice does not move the headline (high).
- The vega `All natural disasters` row and the sum of its types differ by 12 deaths in 2010-2017 (454,950 against 454,938). The check script uses the `All` row. The difference does not matter at the rounding used.
- 1931 differs between the series only in small items. Earthquakes are 14,286 in the current series against 1,537 in vega. Floods are 3,700,000 in both. "1931 alone recorded 3.7 million" holds on both series (high).

### P6. What the numbers support

- **Headline on the current series: "about 10 times fewer" recorded deaths a year (×9.75), and "about 36 times fewer per million people" (×36.5).** Both high, as arithmetic on the pinned file. The cultural reviewer's option set (A "About the same" / B "Fell about 10-fold" / C "Fell more than 30-fold") still has a single right answer, C, on the current series. Setting the letters is cm-history's job in the re-script.
- "×15" and "×57" hold only on the vega file with epidemics counted as natural disasters. The current maintainers' series does not count them (high: the column is absent).
- **The population ratio 3.7** comes from Gapminder Fast Track via pin `gmpop`, 1925 against 2014 (high as computed). It is a ratio of modelled estimates, and the pre-1950 values are estimates per the `gmpop` entry (medium for what it means).
- **What these numbers are, in meaning (medium):** recorded deaths, not deaths. The metadata itself warns that "Longer historical trends may partly reflect reporting improvements". The 1920s total is 90% drought, which section 3 shows were famines. So "×10" measures a fall in recorded deaths. It does not measure safety from nature.
- **The 1918 influenza: it is not in the current series (high).** The series has no epidemic column, and its 1918 World total is 11,250 (earthquakes 10,216, wildfires 1,000, storms 34). It is also barely in vega: the Epidemic row for 1918 is 449,700 (high). **How many the 1918 pandemic killed, we don't know from anything opened here.** "Tens of millions" in section 4 is still unverified (memory).
- **We don't know:** the EM-DAT release label (P3), what the UCLouvain terms permit (P3), or how many 1920s deaths EM-DAT has never recorded. The series cannot answer the last one, since missing events have no row.

### P7. Proposed `SOURCES` entry (text only; owner cm-history pastes it into history-data.mjs; this run edits no check script)

```js
  owiddisasters: { file: "owid-natural-disasters-deaths.csv", url: "https://ourworldindata.org/grapher/natural-disasters-deaths.csv", doc: "https://ourworldindata.org/grapher/natural-disasters-deaths.zip (readme.md and metadata.json inside; the standalone .metadata.json carries a dateDownloaded field, so it is not pinned)", sha256: "244aaa43368253a975e9cda6e9200bad1ba60fd78a70a602c2e20f777e129d6a", what: "Our World in Data's current EM-DAT series: deaths (dead plus missing) by year, country and type, 1900-2025 (World row = sum of countries and historical states). Eight types: droughts, earthquakes, volcanoes, floods (incl. glacial lake outbursts), landslides (wet and dry), storms, wildfires, extreme temperatures, plus All disasters. NO epidemics. EM-DAT published 2026-04-28, retrieved by OWID 2026-04-30 (no release number stated); OWID lastUpdated 2026-04-30, nextUpdate 2027-04-30, so expect the pin to fail then. Pinned 2026-10-16 (W-1206); the 2026-10-15 scratch hash 3059d030... is the ?useColumnShortNames=true variant of the same data", licence: "EM-DAT terms of use, 'UCLouvain 2026' (https://doc.emdat.be/docs/legal/terms-of-use/), per OWID's readme; NOT CC BY; terms not opened (403 from this sandbox): to confirm before publishing (W-745)" },
```

The proposed entry has no `extract` key, since this is a plain CSV. The fetch-and-verify loop in history-data.mjs should handle it like the other `url` entries. cm-history should run `node company/domains/briefs/checks/history-data.mjs` after pasting it to confirm.
