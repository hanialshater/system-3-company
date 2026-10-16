# History maps: 100 draft practice cases

Browse `/history-maps` on a local build or preview with draft access. Each link opens an ordinary `/d/<slug>` lesson. The index applies `visibleDemos({includeDrafts:true})`; it returns 404 when none of the cases may be shown. Drafts remain unavailable in production under the existing visibility contract.

There are 100 geographic cases across ten regional groups. They share a three-step interaction: earlier snapshot → later snapshot → overlay. All three are required for the reveal. The trace preserves both visited outcomes while switching back and forth. Region NAME labels are compared as sorted sets; overlapping labels and missing coverage are retained. NAME equality is not a count of sovereign states and is not SUBJECTO equality.

## Reproduce the data

```sh
git clone https://github.com/aourednik/historical-basemaps.git artifacts/historical-basemaps
git -C artifacts/historical-basemaps checkout da7a4b735ecef70aebdc9c73e409d8a2500d50f3
node tools/history-maps/generate.mjs artifacts/historical-basemaps
node --test tests/history-maps/*.test.mjs
```

The generator requires that exact source commit and validates the file SHA-256 pins in `sources.json`. Without `--write`, it compares all generated map, metadata and Demo files against the checked-out sources. Use `--write` only when deliberately rebuilding initial drafts: it replaces their metadata, including review evidence. Never use it to revise already reviewed or published lessons without the normal version/reset process.

The 25 GeoJSON snapshots are converted to clipped Mercator SVG paths at build time. Learner interactions require no network, map service, account, secret or new package. Each lesson imports only its own map.json, behind the existing registry's per-lesson dynamic import. Coastlines use the existing Natural Earth physical land data, without today's country borders.

The source mixes polygon winding. `geometry.mjs` normalises exterior and hole direction for d3 without moving a coordinate. Regression tests cover reversed exteriors, holes and multipolygon islands. Otherwise a small territory can be interpreted as the rest of the sphere.

Coarse coastlines sometimes omit a city centre. The generator deterministically searches the nearest covered area anchor within 75 km of the nominal point, testing both snapshots without selecting a preferred outcome. Both coordinates and the offset are retained. The stage explicitly says "Area anchors". It does not claim a historical settlement existed there, and unfilled locations are not treated as empty land.

## Provenance and rights

Historical Basemaps: André Ourednik and contributors, source commit above. This is a work-in-progress reconstruction with overlapping and approximate boundaries, as its README states. The repository's GPL-3.0 licence is copied to `src/lib/history-maps/DATA-LICENSE.txt` for the derived historical paths. `sources.json` names every raw file, immutable URL and hash, including README and LICENSE. Natural Earth physical land is public domain (world-atlas packaging ISC).

Source feature indexes, complete NAME matches and shortened source ABBREVN labels travel in each case's map.json. Claims distinguish the coordinate convention, source data, derived point-label comparison, inference limitations and recall item. All 500 claims start unverified. Builder tests do not set checkedBy or fabricate independent review evidence.

These are draft prototypes pending the existing company owners and sensitive-topic route. The case set is not a claim of 100 different concepts. See `company/decisions/2026-10-16-founder-history-maps-100-pr.md` and `company/reviews/history-maps-100/build.md`.
