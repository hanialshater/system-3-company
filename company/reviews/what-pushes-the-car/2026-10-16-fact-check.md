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

## FC pass 66 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (company/ops/dispatch-requests/2026-10-16-r3-quality.md, "## Standing orders"), batch SO-10-2 trigger (b)/(d), tag [project:wave-j]. Server: shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start and end; s3c-qa HEAD the same); R3a check.sh exit 0 for this lesson; no diff on this lesson between 987687acc1cc934b5eaa4f5510d2111712263532 and the main checkout HEAD. Order (artifact first): `npm run walkthrough -- second-speaker-decibels electron-speed-in-a-wire what-pushes-the-car tug-of-war-scale --url http://localhost:3591` (recorded 2026-10-16T14:42-14:43Z), transcript cut at the appendix, step screenshots viewed; then Demo.tsx, then meta.json. I did not read build.md or check.mjs; numbers re-derived in my own node. Source: OpenStax University Physics (CC BY 4.0) CNXML fetched by this pass from raw.githubusercontent.com/openstax/osbooks-university-physics-bundle at 2300d5b. Halliday/Purcell not opened and not relied on. Independence: the reset wording came from earlier FC wording findings but was adopted into Demo.tsx and claim text by demo-builder (commit named below), the route the r2 ruling on W-1108 sets; this pass wrote no claim text. Full per-claim notes start 'FC pass 66' in the lesson's meta.json.

Scope: c3, c4, c5 (reset by 824e171, Seen row now forces only). Result: 3 of 3 verified, 0 held, 0 disputed.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node 2,400 N; 9,417.6 N limit at mu 0.8. Stage, Seen 'dry: 2,400 N' and reveal seen. m58304: max static friction mu_s N; rubber on dry concrete 1.0 (0.8 illustrative). |
| c4 | verified | Own node 1,177.2 N < 2,400 N, 0.981 m/s2. Stage, Seen 'ice: 1,177 N', reveal seen. m58304 uses mu_s = 0.100 for a car on ice. |
| c5 | verified | mu 0 gives 0 N, 0 m/s2. Stage '0 N forward . 0 m/s2 . wheels spin', Seen 'frictionless: 0 N' seen. |

No unrecorded claims: the Seen row's shorter text is quoted exactly in c3-c5.
