# ADR-002: The geo kit: d3-geo + Natural Earth 1:110m, bundled

status: accepted
date: 2026-10-12
deciders: platform-engineer, principal-engineer

## Context
Geography lessons need real maps, projections and spherical geometry, offline.

## Decision
`d3-geo` and `topojson-client` as dependencies; `world-atlas@2` 1:110m countries and land copied
into `src/kit/geo/` (about 160 KB, loaded only by lessons that import the kit). Helpers:
`WorldMap`, `country()`, `moveToLatitude()`, `mapFeature()`, `EARTH_RADIUS_KM`.

## Consequences
- Good: correct projections and great-circle math; one data source that every claim can cite.
- Bad: 1:110m drops small islands and simplifies borders, so lessons must not make claims that depend on that resolution.
- Bad: rivers, climate and ocean data are not included; lessons needing them must wait for a new ADR.

## Alternatives rejected
Hand-written projections (error-prone); 1:50m data (5× larger for little visible gain on a phone).
