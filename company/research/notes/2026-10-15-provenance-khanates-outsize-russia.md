# Provenance note: khanates-outsize-russia (History brief 12, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · route step 2 of the charter's sensitive-topics route (`company/domains/history.md`)
- for: cultural-reviewer (W-960, `culture-en-brief`), then cm-history-maps-borders (Marisol) and cm-history (Henrike). The fact-checker marks claims; this note marks none verified.
- brief: `company/domains/briefs/history.md` #12 · concept `history:empire-extent-mongols` · classes: empire, borders, political figures
- data read: `artifacts/history-data/world_1279.geojson` (pin `basemap1279`, sha256 839f48f6…), `node_modules/world-atlas/countries-50m.json` (2.0.2), and for comparison `world_1300.geojson` fetched today from the same repo (sha256 a27985e6…, **not pinned**; scratch only)

**Confidence marks.** high = I opened the file or page from this host and re-ran the number myself. medium = opened, but a secondary statement of someone else's result. low = my inference. unverified (memory) = not opened; a pointer only, never learner text.

## 1. Whose record is it?

Not a record from 1279 at all. It is a modern, hand-drawn GIS layer: polygons "collected, adapted and converted from diverse sources, sometimes only available through the wayback machine. Among these sources, anonymous students from the 'ThinkQuest Team C006628'" (historical-basemaps README, Credits; opened, high). No polygon carries a citation. The repository asks users to "verify the maps by comparison to other sources before using in academic work" (README; opened, high).

So the "record" is one maintainer's (A. Ourednik) and anonymous contributors' reading of secondary atlases. It is not a Mongol, Chinese, Persian or Rus' source, and no chronicle or tax register stands behind any border.

## 2. Who made it, when, for what purpose

- historical-basemaps, GitHub `aourednik/historical-basemaps`, GPL-3.0, master branch, "work in progress". Its purpose is "ready-to-use base maps for mapping historical data" at world or continent scale (README; high). The CONTRIBUTING file says files must stay "generalized enough to achieve file size below 3 MB" and that "some show a 20 km shift. This must yet be corrected" (opened, high).
- Field meanings (README; high): `SUBJECTO` = "the name of the colonial power exercising authority on the country or region"; `BORDERPRECISION` 1 = approximate, 2 = moderately precise, 3 = determined by international law. **All 247 polygons in the 1279 file are precision 1** (counted, high).
- The README's own "Conceptual limitations and disputed territories" section says that historical boundaries are "even more disputed than contemporary ones", that territory as a concept "becomes meaningful, in Europe, only since the Peace of Westphalia (1648)", and that "areas of civilizations actually overlap" (opened, high). Its epigraph (Graeber and Wengrow) states that kingdoms and empires were "exceptional islands of political hierarchy". The epigraph frames the dataset. It is not a finding.
- Russia today: Natural Earth 1:50m via world-atlas 2.0.2. Its Russia polygon is 16.88 million km² on the sphere (re-run, high).

## 3. What the dataset codes as "Mongol Empire" (re-run, high)

Eight polygons have `SUBJECTO = "Mongol Empire"`: Great Khanate 10.55, Khanate of the Golden Horde 5.25, Ilkhanate 3.78, Chagatai Khanate 3.31 (the brief's "four khanates", 22.89 million km²), and Tibet 1.79, Ryazan 1.31, Novgorod 0.91, "Seljuk Caliphate" 0.34 (the brief's "tributaries"; 27.24 in all). These agree with the brief's check section 12.

Things the reviewer should see, which the brief does not mention (point-in-polygon tests on the pinned file, high):
- **Korea is inside the "Great Khanate" polygon** (Seoul tests inside it), so Goryeo is drawn as part of the core khanates, not as a separate or tributary state. Hangzhou, Guangzhou and Kunming are also inside, so the 1279 map counts the whole of the former Song lands.
- **Moscow and Kyiv both fall inside the polygon named "Ryazan"**, so one Rus' principality's name covers most of the Rus' lands. A lesson that sets this beside "Russia today" invites a reader to map Ryazan onto Russia.
- **Tbilisi is inside the Ilkhanate**, although a "Georgia" polygon exists elsewhere in the file. Yakutsk is in a polygon named "Siberians"; Novosibirsk is inside the Golden Horde.
- The tributary label is not in the data. `PARTOF` reads "Mongol Empire" for the Ilkhanate and the "Seljuk Caliphate" only; for the other six it repeats the polygon's own name. Nothing in the file says "tribute" (brief claim 5 stays held; its data fallback "the other lands this map assigns to them" is the honest wording).
- The dataset's names are themselves choices: "Seljuk Caliphate" for what is usually called the Sultanate of Rum (unverified, memory), and "Great Khanate" rather than the Yuan dynasty (unverified, memory, as to usage).

**Same polygons, different coding, 21 years later (high).** In the repository's `world_1300.geojson`, the khanate polygons have identical areas (10.55, 5.25, 3.78, 3.31), but the Ilkhanate's `SUBJECTO` is "Ilkhanate", Ryazan's is "Khanate of the Golden Horde", and Tibet and Novgorod no longer appear as Mongol-coded polygons. Counting "SUBJECTO = Mongol Empire" in 1300 gives 19.11 million km², not 22.89. This is the lesson's own point (the size depends on coding) shown inside one dataset. It also shows that the borders were copied between years, not redrawn from evidence for each year.

## 4. Published alternatives to the numbers

- **We don't know from this host.** No published estimate of the Mongol Empire's area was opened. A PMC search (2026-10-15) found only genetics papers. The commonly quoted figures (Taagepera's work on empire sizes, roughly 23-24 million km² near 1270-1309) are unverified (memory) and must not reach a learner without an opened source.
- The brief already avoids a superlative. It should also avoid any phrasing that implies the 22.9 figure is "the" area. "On this map" (already in the reveal) carries that.

## 5. Which perspectives it leaves out

- The people inside the polygons: the map shows rulers' claims, not who lived there, paid, resisted or moved. Pastoral and forest peoples are drawn as blank "hunter-gatherer" or "Siberians" polygons, the same treatment the README's epigraph warns about.
- Chinese, Korean, Persian, Rus', Georgian, Tibetan and Anatolian views of the relationship (rule, alliance, vassalage, occupation). Tibet's relation to the Yuan court in particular is read very differently by Chinese and Tibetan historiography today (unverified, memory: a known political dispute, not a fact for the stage).
- Mongol self-description: the khanates are named in English by ruler-lineage or by later historians' terms (Golden Horde), not as their own sources named them (unverified, memory).

## 6. Framing risks for the cultural reviewer

1. **The main one: the "Russia today" outline is itself a contested border, and the 1279 polygons map Rus' onto it.** In world-atlas 2.0.2, Crimea (Simferopol) and the southern Kurils (Iturup) test inside "Russia" (high). Both are disputed today (Crimea's status is contested by Ukraine and most UN members; the Kurils by Japan: unverified, memory, but this is exactly the charter's "maps that present contested borders as settled"). Crimea is about 27,000 km² (unverified, memory), so the ratio barely moves, but the outline cannot be drawn unlabelled. Combined with Moscow and Kyiv sitting inside "Ryazan", a reader in Ukraine, Kazakhstan or Mongolia could read the stage as a statement about whose land is whose. Checklist items N4, L4 and the refuse list's contested-border rule apply.
2. **A comparison of countries (W-889 class).** "1.4 times Russia" sets a 13th-century polity against a modern state. That is allowed as a measured quantity only, with no verdict. Avoid words like "outsize", "dwarfed" or "bigger than Russia ever was" on the stage. The slug "khanates-outsize-russia" is internal, but the title must not carry it.
3. **Conquest framing by omission.** 1279 is the year the map shows the Song lands inside the Great Khanate (data). The care line already bars a conquest narrative; the reviewer should check that no preset, label or colour animates expansion.
4. **"Tributary" is our word, not the data's** (section 3). Use the fallback, or source it.
5. **Korea inside the core.** If a khanate is labelled on the stage, the label must not imply that Goryeo was simply part of it. The safest course is to show the polygon names only one at a time (as the brief says) and to add that the map draws Korea inside the Great Khanate. That fact is from the data (high).
6. **Precision.** Every polygon is "approximate". The blur preset is good. The reveal's "every border on this 1279 map is marked approximate" matches the data.

## 7. What is checkable from reachable hosts

| Claim in the brief | Checkable here? | How |
|---|---|---|
| Areas 22.89, 27.24, 1.36, 1.61 | yes (high) | `history-cycle1-check.mjs` section 12 on the pinned file |
| Russia 16.88 million km², 12.6% of land outside Antarctica | yes (high) | same script, world-atlas 2.0.2 |
| "work in progress" | yes (high) | README on raw.githubusercontent.com |
| every 1279 polygon precision 1 | yes (high) | pinned file |
| "states that paid them tribute" | **no** | not in the data, and no source opened. Use the data fallback |
| any published extent of the empire | **no** | none on PMC, OWID, CRAN or GitHub that I found. Say "we don't know" or cut |
| Crimea and Kurils inside Russia in the basemap | yes (high) | world-atlas 2.0.2 point tests |

## 8. Limit sentence: does the brief's match this note?

Mostly. The reveal's "Which lands count as the empire is a choice the mapmaker made" and "the map's own makers call it work in progress" match sections 2 and 3. **Proposed addition (cm-history-maps-borders decides):** label the Russia outline "today's borders, including areas disputed today" or exclude the disputed areas and say so. If a sentence is free, use "The same polygons are coded differently on this project's 1300 map" (data, from a file that would need a pin).

## Routing
- cultural-reviewer: W-960 `culture-en-brief` on brief 12, with this note as its input (checklist N2, F5, N4, L4).
- cm-history-maps-borders: the Russia-outline label, and whether to pin `world_1300.geojson` for the coding comparison. No edit made here.
