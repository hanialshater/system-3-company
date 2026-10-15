# Provenance note: most-lost-before-moscow (History brief 5, sensitive route)

- date: 2026-10-15 · author: research-lead (Wen) · task: W-959 · charter sensitive route, step 2
- for: cultural-reviewer (W-960 `culture-en-brief`), cm-history-events-data (Anselm), cm-history
- brief: `company/domains/briefs/history.md` #5 · concept `history:napoleon-1812-attrition` · classes: war, political figures
- data read: `artifacts/history-data/Minard.troops.csv`, `Minard.temp.csv` (pins `minard`, `minardtemp`), the HistData doc page `Minard.troops.html`, and one period source on PMC (below)
- confidence marks: high = opened and re-run here; medium = opened secondary; low = inference; unverified (memory) = not opened

## 1. Whose record is it?

**Minard's** (1869), not the army's. The file holds the numbers Charles Joseph Minard drew on his map, as typed into a text file by Lee Wilkinson for *The Grammar of Graphics* (HistData doc, opened, high: "Originally given by Lee Wilkinson, in a text file associated with The Grammar of Graphics"). Minard himself compiled them from earlier French accounts of the campaign (unverified, memory: Thiers, Ségur, Fezensac, Chambray, per Friendly 2002, which is cited in the doc and was **not opened**).

So the chain is: participants' and historians' accounts (1820s-1840s) → Minard's graphic (1869) → Wilkinson's transcription → HistData → Rdatasets. Each step could change a number, and only the last two are opened.

## 2. Who made it, when, for what purpose

- Minard, a retired French civil engineer, drew it in 1869 (unverified, memory). It is often read as an argument about the cost of war (unverified, memory; Friendly 2002 not opened). It was made as a graphic, not as a count.
- The doc's dating error stands: "the Russian campaign of 1815" and "date in Minard.temp should be made a real date in 1815" (opened, high). The campaign was 1812. **A period source on PMC now supports "1812":** a review of Beaupré's treatise on the effects of cold in the Russian campaign, *Medico-Chirurgical Review* 5(9), 1826 (PMC5106729, opened via PMC OAI, medium as a secondary account by a contemporary): "Moscow was evacuated in the middle of October, 1812". If a builder puts "1812" on the stage, the fact-checker can open this.
- Temperatures: the doc gives no unit (high). Minard's map used degrees Réaumur (unverified, memory). The brief already says "below zero" with no unit, which is right.

## 3. What the file itself does, re-run (high)

- Main column (group 1): 340,000 at 24.0° E, 100,000 at Moscow (37.6° E), 4,000 at the end. Advance loss 240,000, retreat loss 96,000 (agrees with brief check 5).
- **Group 2's 28,000 men disappear from the file at 28.3° E** (the last group-2 row, on the retreat) and are not added to group 1, which stays at 20,000 through 28.3-27.5° E. So the brief's "Of 422,000 men in all three columns, 10,000 came back" (4,000 + 6,000) silently treats group 2 as lost. On Minard's map the groups join near the Berezina (unverified, memory). The derivation is arithmetic on the file, but its reading needs a caveat, or it should say "on Minard's figures".
- The main column rises from 12,000 to 14,000 at 26.4° E (rows 30-31). Survivors cannot rise unless men rejoin, so this is a transcription or merger artefact (low: inference).
- First reading below zero: −9 on 9 November at 33.2° E, where the column held 37,000 (high).

## 4. Published alternatives

- **The timing of the cold.** Minard's temperature line starts on 18 October at 0 and first drops below zero on 9 November (data). The 1826 Beaupré review (opened, medium) says: "The autumn had been mild ... From the 20th to the 25th day of October the cold became intense". A contemporary army account dates hard cold about two weeks before Minard's first sub-zero reading. **This matters for the brief's frame:** "before any frost on Minard's chart" is accurate, but "before winter" (option B, "Advancing, before winter") is a stronger claim than the record supports. The losses are still mostly on the advance (data), so the lesson's point survives either way.
- **Causes of loss on the advance.** The same review describes disease, hunger and "contagious disease from neglect and fatigue" among the army and its animals before Moscow, then disorder and drinking after the fire of Moscow (opened, medium). This supports "lost ≠ killed by cold". Modern work on typhus and other louse-borne disease in the Grande Armée exists (unverified, memory: e.g. Raoult et al. 2006 on Vilnius burials; a PMC search on 2026-10-15 did not find it in PMC).
- **The size of the army.** Modern totals for all forces that crossed differ from Minard's 422,000, because historians count reinforcements, flank corps and non-combatants differently (unverified, memory). **We don't know** a sourced alternative from this host. The brief keeps "these are Minard's figures", which is the honest course.

## 5. Which perspectives it leaves out

- **Russian soldiers and civilians.** Minard draws one army. Russian military and civilian deaths, the burning of Moscow and of the countryside, and the peasants on the route are not on the map (certain for the file; the scale of Russian losses is unverified, memory).
- **Who was in the column.** "Napoleon's army" was multinational: French, Polish, German, Italian and other contingents (unverified, memory). The file has no nationality.
- **Camp followers, prisoners and horses.** The file counts "survivors" of the column only.
- **How men were "lost".** The file records survivors, not causes: death in battle, disease, cold, hunger, desertion, capture, garrison duty (convention, high that the file has no cause field).

## 6. Framing risks for the cultural reviewer

1. **The main one: a "great man" and a heroic-villain story around one named ruler.** The concept is named after Napoleon, and the learner's misconception is phrased about him. The care line says "lost" never becomes "killed" and no one is blamed. Check also that no stage text credits Russia's generals or "the Russian people" with a collective verdict, and that "Napoleon's main column" appears only as a label (checklist F4, L5).
2. **"Before winter" vs "before Minard's first frost".** See section 4. Suggest option B reads "Advancing, before the cold" only if the stage defines the cold as Minard's readings, or use "Advancing, before the first frost Minard recorded".
3. **"10,000 came back, about 1 in 42"** is a derived ratio on a file that drops group 2 (section 3). Either show it as "on Minard's figures" or drop the all-columns preset.
4. **Death toll as the surprise.** The prediction is about the shape (advance vs retreat), which is good (N5). The "1 in 42" readout must not become the hook.
5. **Wrong year.** No "1815" anywhere. If "1812" appears, cite PMC5106729 or another opened source.

## 7. What is checkable from reachable hosts

| Item | Checkable? | Source |
|---|---|---|
| 240,000 vs 96,000, 37,000 at the first sub-zero reading | yes (high) | `history-cycle1-check.mjs` section 5 on the pinned files |
| Minard's figures came via Wilkinson | yes (high) | HistData doc |
| the campaign year 1812 | yes, secondary (medium) | PMC5106729 (1826 review of Beaupré) |
| "intense cold" from 20-25 October | yes, secondary (medium) | PMC5106729 |
| "lost counts deaths, desertion, capture, garrisons" | **no**: Friendly (2002) not reachable | use the fallback "these are Minard's figures, not a count of deaths" |
| modern estimates of the army's size or losses | **no** | none opened |

## 8. Limit sentence: match

The brief's "these are Minard's figures, and 'lost' counts deaths, desertion, capture and men left behind in garrisons alike" rests on an unopened source; its fallback ("these are Minard's figures, not a count of deaths") matches the file. **Proposed:** "Where it stops: these are Minard's figures for one army; they count survivors, not how men were lost, and leave out Russian losses." Every part of that is checkable from the file or the doc. (Add "1869" only with an opened source: the year is from memory and from our own pin description, not from the doc.)
