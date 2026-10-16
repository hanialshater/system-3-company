# Fact-check: electron-speed-in-a-wire (2026-10-16)

## FC pass 55 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (standing order in company/ops/dispatch-requests/2026-10-16-r2-quality.md, "## Standing orders"), domain physics, all 17 open physics claims (3 Wave J lessons, tag [project:wave-j]). Physics checkability rule (company/domains/physics.md): equations with stated idealisations, units on every number.

Order (artifact first): production build of the main checkout at the pass's starting HEAD (NEXT_DIST_DIR=.next-so2), `npm run walkthrough -- electron-speed-in-a-wire second-speaker-decibels what-pushes-the-car --port 4001` (recorded 2026-10-16T11:19Z), transcript read cut at the appendix (R1), step screenshots viewed. Then Demo.tsx, then the meta.json claims. I did not read build.md or the builder's check.mjs; every number was re-derived in my own node script (not kept in the repo; method and values are in each claim's note). Sources: the ledger cites Halliday-Resnick-Walker and Purcell-Morin, which are not reachable here, so I did not rely on them. I opened OpenStax University Physics (CC BY 4.0) as CNXML from github.com/openstax/osbooks-university-physics-bundle at commit 2300d5b (2026-09-08), quoted by module id in each note. openstax.org and wikipedia.org were refused by the proxy (403). No claim here was written by me: git history shows only the Wave J builder's commits (c9f5476, fc6d3d4, a926418, 3516c4e).

Result: 6 of 6 verified, 0 held, 0 disputed. Statuses and full per-claim notes are in src/demos/physics/electron-speed-in-a-wire/meta.json (each note starts 'FC pass 55').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | OpenStax vol 2 m58730: I = nqAv_d. Own node v = 7.343e-5 m/s. |
| c2 | verified | Own node 8.491e28 /m3 (one free electron per atom); m58730 uses one per atom and n = 8.48e28. 44 dots on the stage before the switch. |
| c3 | verified | Own node: 0.0734 mm, 4.406 mm, 26.43 cm, 7.566 h. Every stage label, Seen row and reveal figure matches after rounding. |
| c4 | verified | m58730: lights come on as soon as the switch moves; signals ~10^8 m/s, 'a significant fraction of the speed of light'. 2 m: 6.7 ns at c, 10.1 ns at 0.66 c, so 'about 10 ns' at 2e8 m/s (stated illustrative) is fair. |
| c5 | verified | m58730 (charges enter and leave at once) + vol 2 m58454 (same current in series) + v_d = I/(nAe): same drift in the uniform wire. Scope note below. |
| c6 | verified | Caption, ruler, 2 m dimension seen; PX_M 100 px/m, RX_CM 9.33 px/cm; battery negative plate on top, dot drifts switch to bulb (m58730: electrons go from negative to positive terminal). AC: displacement amplitude 0.33 um at 50 Hz. |

## Findings for the builder and cm-physics (not disputes)

1. **c5, scope.** "All of them drift together at the same speed" is true in the uniform 1 mm2 copper wire the stage models. A real bulb filament carries the same current at a different drift speed (different n and A). The reveal says "the wire's free electrons", so nothing on screen is false. If the builder wants c6 to be complete, add "the bulb's filament is drawn as the same wire" to the idealisations.
2. **Sources.** The Halliday and Purcell-Morin citations name a chapter with no page. The claims stand on the opened OpenStax module (m58730). The builder may add it to the source field. I have not edited claim text or sources.
3. No unrecorded claims: the hook, the predict answer ("Several hours") and every stage string in the transcript are covered by c1-c6.

## FC pass 66 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (company/ops/dispatch-requests/2026-10-16-r3-quality.md, "## Standing orders"), batch SO-10-2 trigger (b)/(d), tag [project:wave-j]. Server: shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start and end; s3c-qa HEAD the same); R3a check.sh exit 0 for this lesson; no diff on this lesson between 987687acc1cc934b5eaa4f5510d2111712263532 and the main checkout HEAD. Order (artifact first): `npm run walkthrough -- second-speaker-decibels electron-speed-in-a-wire what-pushes-the-car tug-of-war-scale --url http://localhost:3591` (recorded 2026-10-16T14:42-14:43Z), transcript cut at the appendix, step screenshots viewed; then Demo.tsx, then meta.json. I did not read build.md or check.mjs; numbers re-derived in my own node. Source: OpenStax University Physics (CC BY 4.0) CNXML fetched by this pass from raw.githubusercontent.com/openstax/osbooks-university-physics-bundle at 2300d5b. Halliday/Purcell not opened and not relied on. Independence: the reset wording came from earlier FC wording findings but was adopted into Demo.tsx and claim text by demo-builder (commit named below), the route the r2 ruling on W-1108 sets; this pass wrote no claim text. Full per-claim notes start 'FC pass 66' in the lesson's meta.json.

Scope: c6 (reset by 824e171). Result: 1 of 1 verified, 0 held, 0 disputed.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Stage caption, ruler 0-30 cm, '2 m' seen. New idealisation 'The bulb's filament is drawn as the same wire': Demo.tsx moves every dot on one loop path (through BULB_X) by the same shiftPx, so the filament is modelled as the same wire. m58730: electrons go negative to positive terminal. AC: own node peak drift 1.04e-4 m/s, amplitude 0.33 um at 50 Hz. |

Wording note for demo-builder via cm-physics (not a dispute, not blocking): the bulb is drawn as a symbol with a zigzag filament, so 'treated as the same wire' says what the stage does more exactly than 'drawn as the same wire'.
