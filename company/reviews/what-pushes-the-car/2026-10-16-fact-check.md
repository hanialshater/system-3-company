# Fact-check: what-pushes-the-car (2026-10-16)

## FC pass 55 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (standing order in company/ops/dispatch-requests/2026-10-16-r2-quality.md, "## Standing orders"), domain physics, all 17 open physics claims (3 Wave J lessons, tag [project:wave-j]). Physics checkability rule (company/domains/physics.md): equations with stated idealisations, units on every number.

Order (artifact first): production build of the main checkout at the pass's starting HEAD (NEXT_DIST_DIR=.next-so2), `npm run walkthrough -- electron-speed-in-a-wire second-speaker-decibels what-pushes-the-car --port 4001` (recorded 2026-10-16T11:19Z), transcript read cut at the appendix (R1), step screenshots viewed. Then Demo.tsx, then the meta.json claims. I did not read build.md or the builder's check.mjs; every number was re-derived in my own node script (not kept in the repo; method and values are in each claim's note). Sources: the ledger cites Halliday-Resnick-Walker and Purcell-Morin, which are not reachable here, so I did not rely on them. I opened OpenStax University Physics (CC BY 4.0) as CNXML from github.com/openstax/osbooks-university-physics-bundle at commit 2300d5b (2026-09-08), quoted by module id in each note. openstax.org and wikipedia.org were refused by the proxy (403). No claim here was written by me: git history shows only the Wave J builder's commits (c9f5476, fc6d3d4, a926418, 3516c4e).

Result: 6 of 6 verified, 0 held, 0 disputed. Statuses and full per-claim notes are in src/demos/physics/what-pushes-the-car/meta.json (each note starts 'FC pass 55').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | OpenStax vol 1 m58323 (only external forces change the system's momentum) and m58295. Frictionless frame: 0 N, no ghost outline, wheels spin. |
| c2 | verified | m58299: "the ground pushes forward on the drive wheels, in reaction to the drive wheels pushing backward on the ground". Arrows seen. |
| c3 | verified | 2,400 N; 9,417.6 N grip. m58304 table: rubber on dry concrete mu_s 1.0, so 0.8 is a fair illustrative value (any mu > 0.204 gives the same stage). |
| c4 | verified | 1,177.2 N, 0.981 m/s2; m58304 uses mu_s = 0.100 for a car on ice. Stage, Seen and reveal match. |
| c5 | verified | mu = 0 gives 0 N, 0 m/s2. Seen. |
| c6 | verified | Caption seen. x = 4.000 m, 1.962 m, 0 m at 2 s; 48.0, 23.5, 0 px; arrows 30.0 and 14.7 px per axle. m58304: kinetic friction is smaller than static. |

## Findings for the builder and cm-physics (not disputes)

1. **Alt text** on the ice frame reads "Car on a ice road." That is a grammar slip, not a claim (route to the builder with the a11y pass).
2. **Sources.** The Halliday citations name chapters only. The claims stand on the OpenStax vol 1 modules quoted in each note.
3. No unrecorded claims: the hook ("Something has to push it") is c1 in other words; the predict answer ("The road") is c2.
