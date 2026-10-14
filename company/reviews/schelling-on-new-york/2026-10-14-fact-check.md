# Fact-check: schelling-on-new-york v1

- Checker: fact-checker (session 2, branch s2-rebuild). Date: 2026-10-14. I wrote none of these claims.
- Order of reading: meta.json claims, then Demo.tsx, engine.ts and check.mjs, then the walkthrough transcript (`artifacts/walkthroughs/schelling-on-new-york/transcript.md`), then cultural review R3 and R7. I read the build note (`2026-10-14-build.md`) only after my view of every claim was formed.
- **Result: 14 claims. 8 verified, 5 disputed, 1 unverified, 0 withdrawn. The lesson cannot publish.**
- Each claim's `source` in meta.json carries a `FACT-CHECK 2026-10-14` note with the detail below.

## What I could read

| Source | Reached? | How |
|---|---|---|
| NYC DCP Borough Boundaries 16A (nybb) | **Yes, read** | `pip download geopandas==0.14.4`. Wheel sha256 `3bb6473c…89aa` equals PyPI's published digest. `nybb_16a.zip` sha256 `b4a98fc3…e2a1`, as claimed. Metadata read from `nybb.shp.xml`. |
| Mapping Inequality (HOLC maps) | **Partly, read** | dsl.richmond.edu is unreachable. Its own data repo is reachable: `raw.githubusercontent.com/americanpanorama/HOLC_Area_Description_Data/master/ad_data.json` (7,930 area descriptions) and the `mapping-inequality-census-crosswalk` README. |
| Aaronson, Hartley, Mazumder 2021, AEJ: Policy 13(4): 355-392 | No | Search-indexed abstracts and listings only (AEA, Chicago Fed WP 2017-12, SSRN). |
| Fishback, Rose, Snowden, Storrs, JUE 141 (2024) 103462 / NBER w29244 | No | Search-indexed abstracts only (NBER, SSRN, Arizona repository, Chicago Fed brief). |
| Rothstein 2017, *The Color of Law* | No | Search-indexed secondary summaries only (ABA, EPI). |
| NYU Furman Center, State of the City | No | Search-indexed citywide-data snippets only. |
| Census Bureau glossary, census tract | No | Search-indexed records of the definition (data.gov tract metadata) only. |
| Massey and Denton 1988, Social Forces 67(2) | No | Search-indexed bibliographic and abstract listings only. |
| Schelling 1971 | Not re-checked | Rests on economics.mild-preferences-sharp-divides.c6 (verified 2026-10-14). |

WebFetch and curl fail DNS for every publisher host. Only raw.githubusercontent.com and package registries resolve. "Search-indexed" means a search engine's summary of the page, not the page itself. Where a verdict rests on that, the claim note says so.

## Re-runs

- `node --experimental-strip-types src/demos/geography/schelling-on-new-york/check.mjs`: all checks pass. The output matches c5, c6 and c7.
- `MASK=company/domains/briefs/checks/nyc-mask-40.json node --experimental-strip-types company/domains/briefs/checks/schelling-nyc-check.mjs equal50`:
  - start 0.42-0.53 (mean 0.46), settled 0.67-0.83 (mean 0.76) over seeds 1 to 50;
  - ticks 7-24; BX more than 90% one group in 2 seeds.
  - It agrees with nyc-mask-40.md.
- **Independent D.** I wrote my own D (explicit block enumeration) and ran it over engine frames for the 48 lesson seeds.

  | Blocks | Start | Settled at 30% |
  |---|---|---|
  | 1x1 | 1.000 | 1.000 |
  | 2x2 | 0.421-0.525 (mean 0.461) | 0.672-0.834 (mean 0.753) |
  | 4x4 | 0.212-0.309 (mean 0.255) | 0.436-0.637 (mean 0.529) |
  | 8x8 | 0.104-0.185 (mean 0.138) | 0.224-0.448 (mean 0.330) |

  - 48/48 runs settle. Groups are 259/259.
- **Mask.** I re-ran `nyc-mask-rasterise.mjs <fresh extract> 40`.
  - Its `hex` and `labels` are byte-identical to `nyc-mask-40.json`.
  - `engine.ts MASK_HEX` is identical to the fresh hex: 400 hex digits = 200 bytes, 576 land cells (QN 207, BK 130, SI 111, BX 84, MN 44).
  - Metadata: "New York City Borough Boundary", edition 16A, pubDate 2/23/2016, NYC Department of City Planning. Projection: NAD83 NY Long Island (US ft).

## Verdicts

| Claim | Status | Basis |
|---|---|---|
| c4 D definition, Massey and Denton 1988 | verified | Citation from indexed listings. Definition, endpoints and the "would have to change units" gloss by derivation from the formula. |
| c5 random start about 0.4-0.5 on 2x2 | verified | Re-run plus independent D. |
| c6 settles at 30%, about 0.75 | **disputed** | The text is right. The stage readout is not (see below). |
| c7 D by block size | verified | Re-run plus independent D. The walkthrough values match. |
| c8 simple moving rule, simplified Schelling | verified | Simulation. Citation via the economics c6 claim. |
| c9 does not show why any real city looks as it does | verified | Scope judgement, consistent with engine.ts inputs. |
| c10a 1938 maps, associated, research mixed | **disputed** | See below. |
| c10b discrimination; widened income and wealth gaps (Rothstein) | unverified | Source unreachable. |
| c10c income and wealth differences (Furman Center) | **disputed** | See below. |
| c11 DCP boundaries, 40 x 40, 1.2 km, 576 cells | verified | Fully re-derived from the shapefile. |
| c12 toy model, made-up equal groups, setting not a measure | verified | Stage text verbatim. 259/259 groups. |
| c13 recall: random mix about 0.5 on small blocks | **disputed** | See below. |
| c14 left out: money, prices, jobs, history, who may live where | verified | Derivation from engine.ts. |
| c15 tract holds thousands; grid block holds a handful | **disputed** | See below. |

## Disputes and their fixes (builder makes them; I do not edit lesson text)

1. **c6: the "would stay" readout shows 100% while agents would still move.**
   - Cause: `Math.round(100 * (1 - movers/agents))`. With 1 or 2 movers out of 518 it reads 100%.
   - At 30%, 41 of the 48 lesson seeds hit this before they settle (134 frames). Over the slider range 0-50% it happens on 1,084 frames.
   - A learner sees "would stay 100%", presses Step, and squares move. Seed 1 is not affected: its last pre-settle frame has 4 movers, which reads 99%.
   - **Fix:** show 100% only when `movers === 0`, for example with `Math.floor`.
2. **c10a: four problems.**
   - **(a) Two sources in one claim**, against R7.
   - **(b) "Research is mixed on created or recorded" is not what Aaronson, Hartley and Mazumder 2021 support.** Per the indexed abstracts, they report the maps *led to* lower home ownership, house values and rents and more segregation, through reduced credit access. The other side of "mixed" is Fishback, Rose, Snowden and Storrs, "New Evidence on Redlining by Federal Housing Programs in the 1930s", *Journal of Urban Economics* 141 (2024) 103462 (NBER w29244, 2021). Per its indexed abstract:
     - FHA's exclusion of such neighbourhoods predates the HOLC maps;
     - the maps had little effect on HOLC or FHA lending.
     The cultural review's R7 date "Fishback and co-authors 2022" should read 2024 (journal) or 2021 (NBER).
   - **(c) "associated with later lending".** Aaronson et al.'s measured outcomes are home ownership, values, rents and segregation. Lending is their inferred mechanism.
   - **(d) "1938 maps" in a sentence about "US cities".** The Mapping Inequality area-description data (read) date the surveys mostly 1937-1939, a few 1935-36. New York City's forms quote prices as of 1 April 1938. So "1938" is right for New York only. The same data confirm security grades A-D ("Best" to "Hazardous") and mortgage-fund fields, so "graded neighbourhoods for lending risk" holds.
   - **Fix:** split into three claims, one source each:
     - (a) late-1930s government maps graded neighbourhoods for lending risk [Mapping Inequality];
     - (b) the grades are associated with later outcomes [Aaronson et al. 2021]. Either say "home ownership and house values", or add a source that measures later lending;
     - (c) research is mixed on whether the maps created or recorded the pattern [Fishback et al. 2024].
     - Also change "1938" to "late-1930s", or make it "New York's 1938 map".
   - The cultural reviewer should re-check the new wording against R7. "Associated with" stays the right strength. Aaronson et al. claim more than that, so the claim understates that source, which is acceptable.
3. **c10c: the source cannot carry the text.**
   - Per the indexed listings, the Furman Center citywide tables give present-day NYC median household income by race and ethnicity. They do not cover wealth, and they are not a "documented history of where households live".
   - The card also has no sentence of its own for c10c. Its only income and wealth words are "then income and wealth gaps it widened", which c10b carries.
   - **Fix:** either withdraw c10c and let c10b carry the gaps, or keep an income-only claim sourced to a named Furman Center edition and table, and source wealth separately (for example the Federal Reserve Survey of Consumer Finances).
4. **c13: the recall card generalises a model number.**
   - "A random mix scores about 0.5 on small blocks" has no "in this model" and no block size, and the recall card is seen on its own.
   - The figure holds for blocks of about 4 squares. By a binomial check, a random 50/50 mix scores about 0.19 on units of 16, 0.10 on 64 and 0.08 on 100. On a real city's small blocks it would be far lower, which is the opposite of the lesson's point.
   - The "why" says "households", and the grid holds no households (c12).
   - The claim text says 0.4-0.5 while the recall card says 0.5.
   - **Fix:** "In this model, a random mix scores about 0.4 to 0.5 on 2 × 2 blocks…" and "squares" in place of "households". Use one range in both places.
5. **c15: "A block in this grid holds a handful of squares" is false when the reveal has just quoted 8 × 8 (or 4 × 4).**
   - The walkthrough reveal reads "…0.12 on 8×8. … A block in this grid holds a handful of squares."
   - Maximum land cells per block on the mask: 4 (2 × 2), 16 (4 × 4), 64 (8 × 8).
   - The tract half is supported by indexed records of the Census definition (1,200-8,000 people, optimum 4,000). The glossary page itself is unreachable.
   - **Fix:** for example "A block in this grid holds at most 64 squares", or "A 2 × 2 block holds at most four". The unit contrast survives either way.

## Unverified

- **c10b (Rothstein 2017): source unreachable.**
  - Indexed secondary summaries say the book ties federal housing policy to the wealth gap through home equity, and discusses suppressed incomes. That is consistent with both halves, but it is not a record of the book's text, and cultural review condition 8 asks for the page.
  - Caution for whoever opens the book: Rothstein's income argument runs partly the other way (government-suppressed incomes limited housing choice).
  - If no page reference turns up for "widened income gaps", narrow the clause to "wealth".

## Other observations (no claim status)

- The trust sheet shows every claim's full `source` field to learners, so these notes are learner-visible. That is the existing convention.
- The build note's pre-flight says the locked stage reads "would stay 67%" at seed 1, tick 0. The walkthrough and engine say 80% (103 movers of 518). The build note is wrong; the lesson is not.
- R7 and the build note both cite "Fishback and co-authors 2022". The publication found is JUE 2024 (NBER 2021).

## Next

- **demo-builder:** fix c6 (readout), c13 (recall wording), c15 (block sentence) and the c10a split / c10c withdraw-or-narrow, then route back to me.
- **cultural-reviewer:** re-check the new c10a wording against R7.
- **Anyone with egress:** open AEJ: Policy 13(4), JUE 141:103462, Rothstein, the Furman Center tables, the Census glossary and Social Forces 67(2), and confirm the indexed readings above against the pages.
