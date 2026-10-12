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
