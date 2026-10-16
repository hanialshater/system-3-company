# NYC grid mask, 40 x 40 (for schelling-on-new-york)

- **Source:** NYC Department of City Planning, Borough Boundaries, BYTES of the BIG APPLE release 16A (2016), `nybb.shp`, EPSG:2263. The metadata names the publisher (DCP, 22 Reade St).
- **How obtained:** the NYC Open Data host was unreachable from the build container (proxy). The identical DCP product ships inside the PyPI wheel `geopandas-0.14.4-py3-none-any.whl` at `geopandas/datasets/nybb_16a.zip`, which was downloaded from files.pythonhosted.org on 2026-10-14. sha256 of `nybb_16a.zip`: `b4a98fc3b77be5af58676de9560c2782b902b83d1d8c7914dea8d0e75177e2a1`. Nothing from the wheel is in the repo or the app; only the derived mask is.
- **Script:** `nyc-mask-rasterise.mjs <dir> 40` takes cell centres on a square grid over the data's bounding box and applies an even-odd point-in-polygon test. There are no dependencies. Cell size is 3,855 ft (about 1.2 km).
- **Output:** `nyc-mask-40.json`:
  - 576 land cells: QN 207, BK 130, SI 111, BX 84, MN 44.
  - `hex` is the 200-byte bitmask that the lesson uses.
  - `labels` exist only for the check script and must never reach the lesson (R2).

## R2 checks on the real mask (`MASK=nyc-mask-40.json node --experimental-strip-types schelling-nyc-check.mjs equal50`)

Equal 50/50 groups, threshold 30, seeds 1 to 50, 2 x 2 blocks:

| | Random start | Settled |
|---|---|---|
| D | 0.42 to 0.53 (mean 0.46) | 0.67 to 0.83 (mean 0.76) |
| Like share | 0.48 to 0.53 | 0.73 to 0.83 |

- **Ticks:** 7 to 24, and all 50 seeds settle. The keyed answer B ("about 0.4 to 0.5") holds, and the reveal's "about 0.75" holds.
- **Edge artefact (a region ends more than 90% one group):** 2 region-seeds of 250, both in the Bronx (seeds 3 and 36). The hand mask had 5. Seeds 3 and 36 must never be the default or demo seed. Seed 1: D 0.47 → 0.76 in 7 ticks.
- **Width:** upper Manhattan is still 1 to 2 cells wide in some rows at every N up to 44, because the real island is that narrow. Widening the grid does not remove this. The edge check above shows no effect from it at N = 40 (Manhattan 0 of 50). This is reported to the cultural reviewer per R2(c) as "not worse than the hand mask".
- **Comparison:** at N = 32 the real mask gives start 0.35 to 0.58 (outside option B on some seeds) and Manhattan 3 of 50. N = 40 is the recommended grid.
