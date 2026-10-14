# Fact-check: half-of-humanity, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. c1 skipped by instruction and left unverified: it needs a human source check (direct compare with the UN WPP 2024 table, population.un.org unreachable from the sandbox). No status change.

## Pass 17 (2026-10-14)

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified (skipped) | Needs a human source check of the primary table (network access to the source is blocked for agents; see the claim's earlier FACT-CHECK notes). Not touched in pass 17. |

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Compared with WPP 2024 data files from the wpp2024 R package (github.com/PPgp/wpp2024, data from the UN Population Division; population.un.org still blocked). Mid-2024 rebuilt three ways from data/miscproj1dt.rda and popproj1dt.rda: births/CBR, deaths/CDR, and the mean of 1 Jan 2024 and 1 Jan 2025. All 16 values round to the claim: India 1,450.9, China 1,419.3, USA 345.4, Indonesia 283.5, Pakistan 251.3, Nigeria 232.7, Brazil 212.0, Bangladesh 173.6, Russia 144.8, Ethiopia 132.1, Mexico 130.9, Japan 123.75, Egypt 116.5, Philippines 115.8, DR Congo 109.3, world 8,161.97. The mean matches Demo.tsx to 0.01 M. These are also the 15 largest (Viet Nam 16th, 101.0). Not a compare against the portal's own July-1 table, but the data are the UN's own WPP 2024 release. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node (fc26-b0/half.mjs, d3 geoArea on kit countries-110m): Russia 16.92 M km^2 of 135.02 M km^2 non-Antarctic land = 12.53 points; people 144.82 / 8,161.97 = 1.77 points (population per c1, verified). Over all 16,384 subsets of the other 14 chips, the displayed whole-percent land jump is 12 or 13 and the one-decimal people jump 1.7 or 1.8, so 'about 13' and 'under 2' hold on every path; added ninth after the top 8: land 25% -> 38%, people 53.5% -> 55.3%, matching r6. Recorded only on the first add. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Read v3 Demo.tsx first. Own node sum of POP (UN WPP 2024 values as in Demo.tsx) over WORLD_M = 8161.97: cumulative 17.78, 35.17, 39.40, 42.87, 45.95, 48.80, 51.40%, so the first six give 48.8% and the seven give 51.4%. ppl() prints one decimal. The values themselves rest on the UN figures (covered by the lesson's other claims); this claim is the arithmetic. |
| c4 | verified | Checked as a property of the map drawn, not from Šavrič et al. (not opened). Own run of d3-geo 3.1.1 geoEqualEarth().fitSize([320,156], Sphere): planar area / spherical area for 116 countries (geoArea > 0.002 sr) is 3489 to 3511, a 0.64% spread; 10° cells at latitudes −80 to 80 give 3482 to 3506. That is constant up to edge resampling. As a control, Mercator gives 23,574 at the equator vs 133,371 at 60°. So drawn area is proportional to real area on this stage. |
| c5 | verified | Own run with the lesson's own shapes (kit/geo countries-110m.json via topojson-client, d3 geoArea): the 7 countries / all countries except Antarctica = 25.33%, which lnd() prints as '25%'. This matches the reveal fallback '25%' and the crossed.land recorded when half is crossed in order. At 1:110m resolution it is 'about', as the claim says. |

**Result:** 3 verified, 0 disputed, 0 held unverified.
