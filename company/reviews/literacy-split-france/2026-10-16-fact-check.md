# Fact-check: literacy-split-france (2026-10-16)

Lesson: src/demos/history/literacy-split-france/ (status draft, v1, last lesson commit ad5d10f, an ancestor of the server SHA bc0edc0; 7742055 is also an ancestor of bc0edc0, so the queue condition holds; no change between bc0edc0 and main).

## Pass 58

Checker: fact-checker, a fresh instance, 2026-10-16. SO-10-2 `[project:history]`, the same run as schooling-and-crime-1830s pass 58. I did not write, build or record c1-c3. Their author is demo-builder (4768970, 9236a7f, ad5d10f). **I recorded c4 myself** (an unrecorded sentence), so I did not verify it.

Server and method: as in company/reviews/schooling-and-crime-1830s/2026-10-16-fact-check.md (bc0edc0 at start and end; walkthrough first, cut at R1; build.md not read). Data: the same re-fetched Guerry.csv (pin matches). departments.json was compared with the file row by row. france-departements-simplifiee.geojson SHA-256 c08a1ad4...3fc3 matches the frdep pin. The gregoiredavid/france-geojson README was opened on raw.githubusercontent.com.

Unrecorded claims: **one.** The reveal's limit sentence reads "these are young men called up for the army, not everyone". No claim covers it (c2 covers the outline half of the sentence). I recorded it as c4, unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified, advisory | departments.json rows equal the file in 86 of 86 rows. N/E/S/W/C have 17 departments each, and Corse has no Region (doc: "coded as NA"). The question's "about 39% ... on average" checks out: the unweighted mean is 39.26, and weighted by Pop1831 it is 39.86. |
| c2 | verified (convention) | The outline pin holds. The README names IGN Admin Express COG and the Licence ouverte. The mapping is Seine = 75/92/93/94, Seine-et-Oise = 78/91/95, Haut-Rhin = 68/90 and Corse = 2A/2B, with 06/73/74 null; the file has no Alpes-Maritimes or Savoie rows. The projection is geoConicEqualArea parallels 44/49 (Demo.tsx line 81), and the stage and reveal disclose the stand-in. |
| c3 | verified | N+E 55.24 (34 departments) and S+W+C 28.41 (51); the extremes are Meuse 74 and Correze 12, with Seine 71. All 86 average 39.26. Every rendered number matches. |
| c4 (new) | **held (unverified)** | "Army conscripts" and "not everyone" are supported by the doc. "Young men" has search snippets only, the same gap as schooling c1. Fix: "these are army conscripts, not everyone", or open a conscription source. A different fact-checker instance must verify it. |

Advisory (non-blocking, cm-history): c1. The question and the title say "in the 1830s"; the doc says "around 1830" and gives no years for Literacy.

### Label floor at 390 px (History ask a)

Measured on :3591 at a viewport of 390x844 (deviceScaleFactor 3) with Playwright. Rendered size = computed font-size x the element's on-screen SVG scale (getScreenCTM). The floor is 10 px (demo-standard.md "On screen means legible"). Script: session scratchpad fc57/scripts/fontprobe.mjs.

| State | Element | Rendered size | Result |
|---|---|---|---|
| open reveal | all 21 SVG labels: callouts "Meuse 74%", "Correze 12%"; legend title "Conscripts who could read and write, %"; bins 65-74, 50-64, 35-49, 20-34, 12-19; "no value in Guerry's table"; "Conic equal-area projection; today's outlines" | **10.000 px** (12 x 0.8333) | at the floor: **pass**, with zero margin |
| open reveal | readout names (North and east; South, west, centre; All 86) | 11.52 px | pass |
| open reveal | readout values 55% / 28% / 39% | 16 px | pass |
| open reveal | control buttons | 14.08 px | pass |
| predict | SVG labels (projection note) | 11.29 px (12 x 0.941) | pass |

Note: the map scales down from 0.941 at predict to 0.833 at the reveal. Any further shrink of the reveal stage would take every map label below the floor.

**Result (Pass 58):** 3 verified, 0 disputed, 1 held (c4, new). Lesson now: 3 verified of 4.

## Pass 59

Checker: fact-checker, a fresh instance, 2026-10-16. SO-10-2 batch SO-10-2-2, `[project:history]`. I did not write, build or record c1-c4. Pass 58's instance recorded c4, so an independent verification of c4 is open to me. I could not verify it, because the source hosts are blocked.

Server: 5b2fee71701e8645e3cd6e2fde60bcea004833e8, read at start and end. It is after 7742055, so the queue condition holds. check.sh gave R3a pass (exit 0). Walkthrough on :3591 read first, cut at R1. Method and data as in schooling-and-crime-1830s pass 59 (same fetch, same pin, own script). No lesson change since pass 58 apart from `evidence.qa`.

| Claim | Verdict | Basis (my numbers) |
|---|---|---|
| c1 | verified | departments.json = the file, 86/86 rows. Regions have 17 departments each, and Corse's Region is empty. Mean 39.256 (Pop1831-weighted 39.856). |
| c2 | verified (convention) | 96 outlines. Stand-in map 75/92/93/94, 78/91/95, 68/90 and 2A/2B, with 06/73/74 null. Every Guerry department has an outline. The legend bins 12-19 ... 65-74 cover the file's integer range 12-74 with no gap. |
| c3 | verified | N 54.06, E 56.41, S 31.88, W 27.59, C 25.76. N+E 55.24, S+W+C 28.41, all 39.26. Meuse 74 and Correze 12 (no ties), Seine 71. Every rendered number matches. |
| c4 | **held (unverified)** | The rendered reveal says "these are young men called up for the army, not everyone". The doc supports "army conscripts ... not everyone". For "young men", the host list and result are the same as schooling c1 pass 59, so c4 is blocked-host held (W-556). Fix (demo-builder, via cm-history): "Where it stops: these are army conscripts, not everyone, ...". |

The label-floor result is pass 58's, and qa-tester has confirmed it since (ac1c38f). I did not re-measure.

Counts: 3 verified, 1 held, 0 disputed.
