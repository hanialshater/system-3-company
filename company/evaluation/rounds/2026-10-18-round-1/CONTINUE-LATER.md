# Continue evaluation later

2026-10-19 founder direction: park the 329 draft walkthroughs. They remain unknown, never failed or approved. Existing 954 primary and 62 overlap records are provisional and are not admitted for serving.

Keep the pinned inventory and original raw records unchanged. For another pass, create a separate dated round directory and inventory, append new review records there, and preserve source revision, demo version, entry hashes, full phase coverage, null dimensions and provenance. Resolve disagreements through separate adjudication records, never overwrite raw ratings. The existing safe `/hq/personalization/review/<slug>` route remains available for visible lessons; draft preview access is a parked engineering task.

Regenerate a candidate snapshot with `node tools/build-editorial-profiles.mjs <round-directory> <output-json>`. Default output is `src/data/editorial-profiles.preview.json`. This exporter checks exact dimension keys and ordinal range, identity and completed phases; source freshness covers metadata and Demo.tsx entry files only, not transitive imports. Missing reviews stay unknown; two-point overlaps and unresolved adjudication candidates stay disputed. Regeneration never publishes lessons or grants serving admission. Independently review regenerated evidence and exact preview artifact before deployment. Future round export/admission policy may narrow this contract further.


Build lifecycle: `npm run build` and `npm run dev` regenerate the provisional snapshot. After editing lesson entries or reviews in a running dev session, run `npm run editorial:preview` again. Each deployment rebuild hashes the resulting profile contents/state as well as review records. Entry pins do not cover transitive dependencies.
