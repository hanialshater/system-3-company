# Geography & Maps: category charter

owner: cm-geography · status: active · curriculum: `content/curriculum/geography.json` · coverage: `npm run company -- coverage geography`

## Audience
Anyone who has looked at a world map and believed it.

## What a great lesson in this category does
It uses the real world, not a cartoon. Lessons draw the Natural Earth outline with the geo kit
(`@/kit/geo`) and let the learner move the projection, the route or the Sun. The surprise should
be visible on the map itself.

## How claims get checked here
Areas and distances are computed in the lesson with d3-geo on a sphere (mean radius 6,371 km)
and compared with a cited reference value. Every map states its projection. Data are 1:110m, so
no claims about small islands or precise borders.

## What we refuse to publish
Political claims about borders. Rankings that depend on data resolution. "Fun facts" with no source.

## Portfolio rules
- Order by demand, with one concept per cycle that nobody has asked for yet.
- No more than two lessons on one concept until every demand-3 concept has one.

## Target and boundary (r5, cm-geography, 2026-10-16)

Board W-693 and W-551; batch `company/ops/dispatch-requests/2026-10-16-r5-geography.md` B3. Read against `company/product/verticals/2026-10-14-history-and-next-categories.md` §3 (geography row) and `company/product/verticals/plan-to-2000.md` §2. §1 of the History record is superseded in part by `company/decisions/2026-10-14-founder-history-100.md` (History target 100, not 60). The Vertical Review record says the §3 boundaries still apply, so this position is written against §3 as it stands. Head-of-product (W-692) and principal-pm-verticals decide. This section proposes; it does not rule.

Where we stand (2026-10-16, `npm run company -- coverage geography`, `src/demos/geography`): 60 lessons on disk (57 published, 2 review, 1 draft), 55 of 63 concepts with a lesson. Not yet built: 10 Wave J briefs (maps-projections #1-5, people-places #2-5, earth-climate #6 air-over-the-ridge) plus schelling-on-new-york. **If all 11 are built: 71.**

### §3 geography boundary, line by line

| §3 item | Position | Condition or reason |
|---|---|---|
| Geography owns how maps and places work: projections, scale, distance, sun and climate, population distribution *now*, MAUP and choropleth bias | **Co-sign** | This matches the charter and the curriculum. |
| History owns change over time read from dated data on a map | **Co-sign, limited to the human record** (objection 1 below) | Physical time series stay with geography as mechanism: climate, sea ice, coastline change, plate motion (`plate-motion-rates` is geography's already). |
| History uses `@/kit/geo` and does not teach projection mechanics | **Co-sign** | I ask cm-history to apply this charter's claim rule to every History map: the stage names its projection and data resolution, and distances are great-circle on a sphere unless the stage says otherwise. That is a request; History's charter is not mine to edit. |
| `population-centre` (geography) against a History "centre moves west" lesson: the pair needs cm-geography's written sign-off | **Signed, with conditions** (W-693) | (1) Geography's lesson is people-places #5 `where-is-the-centre-of-people`. It teaches the mechanism: a centre is a weighted mean, and it moves toward wherever people are added. History's brief names it as the nearest lesson and the prerequisite. (2) History shows the dated, real record and does not re-run a drag-the-people toy stage. (3) History's stage names which centre it uses (mean or median), and its claims say how it was computed (on a sphere, or projected, and with which projection). (4) If geography's lesson is not yet built when History builds, History may state the mechanism in one sentence but must not stage it. (5) A second History lesson on the same concept needs a new sign-off. |
| `segregation-model-nyc` (sensitive; geography holds the cultural ruling) | **Co-sign: it stays geography's** | It is built under the cultural reviewer's 2026-10-14 rulings only. Any History "segregation over time" lesson needs my written sign-off and the sensitive-topic route. |
| `latitude-longitude`, `sun-time-from-longitude` against a History longitude-at-sea lesson | **Signed for the pair, with conditions** | History names `barcelona-sun-minutes` (sun-time-from-longitude) as its doorway, and may also name `null-island-lat-lon`. It may use "15 degrees per hour" as a stated fact, and its own subject is the dated record: clock drift turned into position error. It does not stage the sun-time mechanism. |
| Geography's charter refuses political claims about borders; historical borders are a sensitive class for History | **Co-sign** | Geography's refuse line still binds geography. Historical borders are History's call, made on the sensitive route. |
| Geography keeps every concept now in `geography.json`; new "X over time" pairs need written sign-off | **Co-sign** | I keep sign-offs in this table. Each new pair gets one row. |
| Target 110 → 95 | **Co-sign the number. I object to one part of its rationale** (objection 2) | 95 leaves 24 slots above the 71 we will have. Nothing I can brief today fills them, because the concepts left need data the kit does not ship (W-034: a climate grid for `climate-zones`; gridded population for real-data people-places). The cap is set by data, not by what History takes. I also do not object to F-22's further −5 (95 → 90, in both of head-of-product's options). That −5 binds only if the founder ratifies it. |

### Objections (each one goes to principal-pm-verticals and head-of-product)

1. **"Time-series map ideas go to History"** (plan-to-2000 §2, geography row) is broader than the §3 split it cites. Read literally, it would hand History sea-ice extent, climate normals over decades and plate motion, and those are physical mechanisms. **Proposed wording:** "Time-series map ideas *about the human record* (population, borders, cities, trade) go to History. Physical-geography time series stay in geography." I am not asking for a change to the §3 table, only to the plan's one-line summary.
2. **The "−15 to fund History" arithmetic is stale.** History's target is now 100 (founder, 2026-10-14), not the 60 that the −15 was meant to fund. I co-sign 95 as geography's own ceiling, but the re-sum to 2,000 is principal-pm-verticals' to redo. Geography should not be cited as funding a figure that has since changed.

### What the W-551 cap means for the 11 unbuilt briefs

- **All 11 are inside the cap** (71 against 95, or 90). Their build order and the build hold belong to lane 2 (W-492). A brief whose budget line reads "Stage over budget" is not ready. Schelling builds only if B2 finds it within budget, or after A2's re-ruling.
- **They are the last new geography briefs until data lands.** I will write no new concepts or briefs, except (a) `climate-zones` once a gridded climate dataset is in `node_modules` under a decision record, (b) revisions of built lessons, and (c) a same-concept replacement for a brief that is retired or fails.
- **map-scale-ratio** is now carried by sheet-at-half-scale alone (britain-on-a-page retired, R6). Coverage shows the concept as unmet until that brief is built.
- **About 19-24 slots stay unfilled** after the 11. If no dataset has landed by Wave N cycle-planning, I will return them to the N-Q pool at that ritual rather than hold them. The decision to return them is mine to bring; the pool is principal-pm-verticals'.
