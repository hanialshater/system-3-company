# History map stories: implementation provenance and care notes

owner: cm-history
date: 2026-10-21
status: draft; independent research and cultural review pending

This note was prepared during implementation. It is not signed as research-lead or cultural-reviewer and cannot stand in for their required verdicts. All 24 lessons retain draft status and unverified claims. W-2024 records the unmet pre-build sensitive review route. No source, publication, QA or constitutional gate is changed.

## Corpus and evidence

The collection uses institutional secondary interpretations of historical evidence, not a comprehensive primary-record database. The opened sources and exact topical sections are repeated per lesson in `story.json` and metadata claims. The reading covered museum explanations, national-library exhibitions/catalog descriptions, government historical pages and named textbook sections. Reading a source supports preparing a claim for review; it does not independently verify the claim.

- Campaigns: National WWII Museum (Curatola, 2025), USHMM D-Day; Met (Hemingway and Hemingway, 2004); OpenStax Roman Republic. Normandy emphasizes ongoing logistics, not a victory game. Alexander includes army agency, return and succession. Hannibal's Alpine pass remains unspecified.
- Empires: Encyclopaedia Iranica Golden Horde entry, Met Ottoman arts, OpenStax Rome. Administrative/artistic networks and changing reach replace territorial-color fills. Sarai is a lower-Volga regional point, not a claim to one certain archaeological site. Golden Horde fragmentation is a broad fifteenth-century phase, not a precise boundary snapshot.
- Exploration: Library of Congress Columbus/Taíno exhibition and Harrisse collection chronology; Fundación Elkano exhibition; Hong Kong Museum of History Zheng He exhibition. America is inhabited before European arrival. Taíno continuity is not erased by the older exhibition's extinction language. Guanahani identification is uncertain. Circumnavigation credits changing crews and Elcano; Zheng He's seven voyages are grouped by region and never asserted to be one continuous itinerary.
- Migration: Te Ara (Geoff Irwin), OpenStax Bantu migrations, NPS Black Metropolis teaching resource. Radiocarbon dates are approximate; Pacific chronology is revisable. “Bantu” names related languages, not a uniform race, army or one movement; regional arrows do not imply empty land. Great Migration uses a southern regional anchor, not a fabricated individual journey, and includes institutions and exclusion at the destination.
- Trade: Met ancient trade, Red Sea textiles and Sahel exhibition. Networks are plural and changing. The ancient Silk Roads walkthrough uses the same era on each spatial checkpoint. Textile survival/Genizah records do not identify an exact ship track or the precise excavation site of each Met fragment. Sahara includes enslavement as part of exchange rather than presenting commerce as unqualified benefit.
- Revolutions/borders: US Office of the Historian Italy, Papal States and Haitian Revolution; Deutsches Historisches Museum unification pages. No present-day border claim or imagined unanimous consent. State formation, capital choice and diplomatic recognition are distinguished. Haiti centers enslaved people's rebellion and the delay in US recognition; no death-count spectacle.
- Disease/disasters: OpenStax's contrasting Ziegler/Green interpretations and London Museum plague; London Museum fire; NOAA Lisbon tsunami. Dots are dated reports or broad regional anchors, not precise transmission chains or wave models. No group is blamed for disease. No casualty guessing or victim-control mechanic. Fire day groups do not establish each landmark's burn time.
- Infrastructure: Suez Canal Authority, Panama Canal Authority, LOC Geography and Map Division. Official infrastructure histories can emphasize institutional achievement, so labor and political interruption remain visible. Suez includes harsh Egyptian labor conditions and closure; Panama is an opening-era process diagram. Trans-Siberian shows only eastern corridor choices and uses “at the time” for the all-Russian route.

## Interpretive limits and alternatives

Historical coastlines, administrative frontiers, troop tracks, exact settlement routes and causal epidemic links are not reconstructed. Modern Natural Earth coastlines are a locator convention. The projection/generator and all geography conventions are documented in `content/history-stories/README.md`.

Source-sensitive alternatives are retained in the experience: unknown Alpine pass, approximate Sarai/region anchors, debated Guanahani, changing Polynesian dates, debated Bantu routes, multi-path plague interpretations, uncertain excavation provenance and NOAA's distinction between observations and modelling. Independent review may require narrower text, different source interpretations or better geographic anchors. No teacher or learner efficacy claim is made.

## Review work required

1. Research-lead validates provenance, missing perspectives and alternatives for each story.
2. Cultural-reviewer reviews the briefs and final walkthroughs, including Indigenous, enslaved, migrant and colonized perspectives and neutral place naming.
3. Fact-checker opens each addressed source and checks frame chronology, reveal and the original schematic.
4. Learner evaluation checks whether the prediction and comparison teach the stated distinction. Browser QA alone cannot establish learning.
