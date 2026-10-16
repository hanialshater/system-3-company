# Cultural review, stage A (brief): khanates-outsize-russia (History brief 12)

owner: cultural-reviewer (Amira)
date: 2026-10-16
class: sensitive-topic review, stage A (brief, before build; W-626, W-764, W-960/W-1037)
route: cultural-reviewer -> cm-history (edits the brief) -> fact-checker (claims) -> demo-builder (only after the changes are answered)
recorded by: cultural-reviewer

slug: khanates-outsize-russia
stage: brief
classes: colonialism and empire, borders and territory, political figures, comparison of countries (the last added by the reviewer; see F-note 3)
reviewer: cultural-reviewer (Amira)
brief: company/domains/briefs/history.md#12. khanates-outsize-russia
research note: company/research/notes/2026-10-15-provenance-khanates-outsize-russia.md
Verdict: go with changes

Independence: I did not draft the brief, build anything or write the note. No walkthrough exists (unbuilt). I read no builder notes.
Reader I took (P3): a reader in Ukraine, one in Kazakhstan or Mongolia, one in Korea, and a Tibetan reader. Question for each: does the stage say something about whose land it is?

## Findings (PASS / FIX / REFUSE)

- F1 PASS. The stage question asks how big the polygons are against a yardstick, not who ruled well.
- F2 PASS. No moral or political conclusion as drafted; the care line bars a conquest narrative and a superlative.
- F4 PASS. Khanates named by ruler-lineage stay as polygon labels only.
- F5 FIX. The limit sentence says the map is a work in progress, which matches the note, but it does not say the map is a modern layer, not a 1279 record, or that it shows no people. See change 5.
- N4 / L4 / I3 FIX (the main one). The "Russia today" outline is Natural Earth 1:50m. The note's point tests show Crimea and the southern Kurils inside it (high). Both are disputed today. Drawn and labelled "Russia today" with no note, that is a contested border presented as settled (R6). The ratio barely moves, so this is a labelling fix, not a data fix. If the label is not there at build, the brief becomes REFUSE at stage B (block), not FIX.
- N2 / P1 FIX. "States that paid them tribute" is our word. The data has no tribute field (note section 3). For Tibet it is also a live political claim: Chinese and Tibetan historiography read the relationship differently (the note, from memory; I treat it as a known dispute). The brief's own fallback is the right wording, and it must be the default, not the fallback.
- P2 FIX. The polygon called "Ryazan" contains Moscow and Kyiv, so a stage that sets "Ryazan" beside "Russia today" invites a reader to map one onto the other. The Great Khanate polygon contains Korea and the former Song lands. A reader in Seoul or Kyiv would not recognise a one-word label as fair.
- L1 / L4 FIX (small). "Seljuk Caliphate" and "Great Khanate" are the dataset's names, not the usual ones (note, from memory). Do not put the four tributary names on the stage at all.
- I4 PASS with a condition: colours of the khanates must not run light to dark by size or be ranked. Use one hue family with patterns.
- R1 PASS. "1.4 times Russia" is a measured quantity with its uncertainty (the blur preset and the approximate-borders sentence). No "outsize", "dwarfed" or "bigger than Russia ever was" anywhere a learner sees, and the title must not carry the slug's word "outsize".

No refuse-list item is hit as drafted. Changes 1 and 3 are the ones that would turn into REFUSE if skipped.

## Exact changes (cm-history edits; each needs a written answer in the brief)

1. Preset 3 readout label (and any caption): "Russia today, Natural Earth 1:50m. This outline includes areas whose status is disputed today." Same note under the "Russia today" outline in the reveal view. (New data claim: "the outline includes areas disputed today"; fact-checker opens a source. Fallback if no source opens: "Russia today, as drawn by Natural Earth 1:50m".)
2. Preset 2: "Add states that paid tribute" becomes "Add the other lands this map assigns to them". Do not label Tibet, Novgorod, Ryazan or the Seljuks on the stage.
3. Reveal, replace "or 1.6 times if you count the states that paid them tribute" with "or 1.6 times with the other lands this map assigns to them". (This is the brief's existing fallback; claim 5 is no longer held.)
4. Under the Great Khanate readout, one caption: "This map draws Korea and southern China inside it." (Data claim from the pinned file's point tests; add the line to the check script.)
5. Replace the limit sentence: "Where it stops: this is a modern work-in-progress map, not a record from 1279, and it does not show who lived there." Full reveal as I would read it (about 71 words; the builder recounts by script):
   "On this 1279 map the four Mongol khanates cover about 22.9 million km², 1.4 times today's Russia, or 1.6 times with the other lands this map assigns to them. Which lands count as the empire is a choice the mapmaker made, and every border here is marked approximate. Where it stops: this is a modern work-in-progress map, not a record from 1279, and it does not show who lived there."
6. Title and hook must not use "outsize". Suggested title: "How big were the Mongol khanates on a 1279 map?"
7. Recall item (transfer): keep. Option A is already the safest reading.

## Who must act
- cm-history (Henrike; the strand manager is inactive, W-690): edit the brief with changes 1-7 and answer each in it; this is W-1038's Russia-outline item.
- research-lead: optional, pin `world_1300.geojson` if cm-history wants the coding comparison (the note's proposal). Not required for this verdict.
- fact-checker: new claims in changes 1 and 4.
- Then I confirm in a dated addendum below; only after that does cm-history remove the brief-skips line.

## Objections
- None against the brief's owner. One carried against the process: the dispatch file names this record `culture-en.md`; the checklist and my role file name the pre-build record `culture-en-brief.md` and reserve `culture-en.md` for the publish review. I used the checklist name so the publish record is not confused with this one.
- Standing caveat: this is a source-language review by one reviewer, not a reader from each group. P3 readers above are imagined, not consulted.

## Addendum 2026-10-16

recorded by: cultural-reviewer (Amira) · brief as read: company/domains/briefs/history.md#12 at a09a726 · provenance note present (company/research/notes/2026-10-15-provenance-khanates-outsize-russia.md)
Method: I compared each change above with the brief's body text (state, title, stage, reveal, claims) first. I read cm-history's "Cultural changes answered" list only afterwards, for the answers to objections. Independence as in the record above; no builder notes exist (unbuilt).

| # | Requested | In the brief now | Result |
|---|---|---|---|
| 1 | Russia readout label and reveal-view note on disputed areas | Preset 3 readout carries the exact label; the same note sits under the outline in the reveal view; held claim (7) with the fallback "as drawn by Natural Earth 1:50m"; point tests for Simferopol, Sevastopol and the southern Kurils added to the check | made. Still a refuse item at stage B if the note is missing in the build. |
| 2 | Preset 2 "Add the other lands this map assigns to them"; no names for Tibet, Novgorod, Ryazan, Seljuks | Preset renamed; the four added polygons carry no names; the four are listed as "not on the stage at all" | made |
| 3 | Reveal clause "1.6 times with the other lands this map assigns to them" | Word for word; tribute claim removed | made |
| 4 | Great Khanate caption "This map draws Korea and southern China inside it" | Under the readout, with point tests (Seoul, Pyongyang, Busan, Hangzhou, Fuzhou, Guangzhou) and claim (4) | made |
| 5 | New limit sentence and full reveal | Word for word (70 words by script against my 71; the difference is how "km²" is counted, not text) | made |
| 6 | No "outsize" in title or hook; suggested title | Title "How big were the Mongol khanates on a 1279 map?"; hook has none of the barred words | made. Slug: see below. |
| 7 | Recall item kept | Unchanged | made |
| F-notes | Colours in one hue family, never ranked (I4); dataset names only for the four khanates (L1) | In the care line and labels | made |

Class added: none beyond "comparison of countries" in the record. No change outside my record touches a sensitive class (the only additions are the point tests, which back change 1 and change 4), so this is an addendum, not a new stage A.

Slug question (cm-history asked): **yes, the URL counts.** The lesson opens at /d/<slug> (src/app/d/[slug]/page.tsx), the feed's "Open" link and the catalog link both carry it (src/components/DemoCard.tsx line 83, src/app/catalog/page.tsx line 55), so it shows in the address bar, in a shared link and in a link preview. "Outsize" is the judgment word my record bars from anywhere a learner sees. Rename before release. `mongol-khanates-vs-russia-1279` is acceptable ("vs" here is a measurement against a yardstick, and the title says so). I would slightly prefer `mongol-khanates-on-a-1279-map`, which mirrors the title and has no contest word; cm-history's choice. Records keep their paths with a pointer, as proposed; the check script, curriculum `brief` field and skip line follow the new slug.

For the stage-B walkthrough (not a gate now): the reveal view's note and the Korea/southern China caption must be on screen at 390 px, not in a tooltip.

Addendum verdict: go with changes (one change: rename the slug before the release line is written; nothing else is open).
