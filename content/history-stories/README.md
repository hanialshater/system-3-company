# Interactive historical map stories

24 built drafts, three in each of eight families. `collection.json` is the actual lesson index. `curriculum-200.json` includes 176 additional research candidates, explicitly marked planned. Planned topics are not routes, lessons or coverage claims.

## Format

Predict → explore four checkpoints → compare → reveal. Every checkpoint has a date or a clearly described period/process step, an active place set and a short source-addressed statement. Four distinct manually visited checkpoints unlock the reveal. Moving a slider counts only its selected checkpoint; repeated visits, Compare and Reset do not earn unseen checkpoints. Reset preserves completed exploration. The reveal pins the final cumulative picture. Compare uses white dashed marks for the preceding checkpoint; gold is the selected/current evidence. No timer or automatic playback is required.

The map can represent a journey, network, regional dispersal, reports, or infrastructure. Dots show selected places, not magnitude or population. Lines show generalized connections, never historical boundaries. Dotted objective links are unfulfilled objectives, not active routes. Closed connections are explicitly marked. The Panama elevation inset represents the lock system, not a named vessel's log. Trade/network walkthroughs with repeated era labels are spatial sequences, not invented event dates.

## Provenance and reproducibility

Every `src/demos/history/story-*/story.json` carries source URLs, opened date, addressed source sections and review status. `meta.json` maps frame/reveal/scope/geometry claims to those fields. These are authored summaries of opened institutional sources, not independently fact-checked claims. Review status remains unverified.

Modern land is Natural Earth 50m, public domain, with the exact URL and SHA256 in `content/history-locators.json`. Rebuild `map.json` with:

```
node tools/generate-history-story-maps.mjs /path/to/ne_50m_land.geojson
```

Without a local path the generator downloads the pinned source and rejects changed bytes. d3-geo projects coastlines and original schematic connections; no original historical map artwork is traced or copied. Small reference coordinates are rounded modern geographic anchors chosen by the author to locate the named regions, not archaeological surveys or exact historical sites. The museum/article supports the historical connection; it does not attest these exact decimal coordinates. The source review must assess the geographic generalization as well as the text.

Global circumnavigation uses a world projection. Pacific settlement uses a Pacific-centered projection to avoid a false trans-Eurasian line at the dateline. Other maps use fitted Mercator views. North is up. No route distances, speeds, territory areas, casualty sizes or modelled infection fronts are asserted. The London river is an original approximate Thames reference polyline; no exact shoreline is asserted.

## Review limitations

All 24 lessons are drafts. Source-opening by the implementer is not independent fact-checking. Independent research-lead/cultural brief review was not completed before implementation; that process deviation is recorded in the founder decision and W-2024. No review verdicts, learner outcomes or gate waivers have been invented. Research, cultural, fact and learner reviews must precede editorial publication. The existing founder policy exposes drafts in the product.

## Verification commands

`npm run test:history` checks the actual built/planned boundary, evidence addressing and geographic invariants. `STORY_BASE_URL=http://127.0.0.1:<port> node tests/history/story-flow.mjs` checks all 24 complete flows on phone and desktop, including repeat/skip/reset gating, the Suez closure, Panama elevation and reveal fit. The unchanged protected contract is also run with `QA_ONLY` set to collection.json slugs. Screenshots and browser results are generated locally in artifacts, not fabricated editorial reviews.
