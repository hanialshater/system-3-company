# Fact-check: longest-drinking-straw (2026-10-16)

## FC wj64 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: standing order SO-10-2, trigger "new lessons merged with unverified claims", [project:wave-j], board W-1490. Lesson merged at 0027f27 (physics #64-68, build fba1dce). Order (artifact first): the shared review server :3591 (s3c-qa, built from bf6fde8) does not contain these drafts (404), so I started my own `next dev` on :3644 from the main checkout (dist dir .next-fc-wj64, removed afterwards; the tsconfig.json include line that next dev appended was reverted), ran `npm run walkthrough -- <5 slugs> --url http://localhost:3644` (2026-10-16T16:27Z), read the transcript to the appendix and viewed the step screenshots; then Demo.tsx, then meta.json. I did not read build.md, the brief or artifacts/scratch/cm-physics-r4/check.mjs before writing these findings. Every number was recomputed in my own node script (below). Sources opened by this pass: OpenStax College Physics 2e (CC BY 4.0) CNXML from raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/modules/<id>/index.cnxml, fetched 2026-10-16. Halliday, Resnick and Walker and the CRC Handbook were not opened and nothing rests on them. Per-claim notes start "FC wj64" in meta.json.

Scope: c1-c5. Result: 5 verified, 0 disputed, 0 unverifiable.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | h = dP/(rho g). m42195: atmospheric pressure supports a column h with near-zero pressure above; m42192: 10.3 m of water = one atmosphere. |
| c2 | verified | (101325 - 2339)/(998 * 9.81) = 10.11 m; 10.35 m without vapour. m42219 table: 20 C vapour pressure 2.33 x 10^3 Pa (own Antoine: 2330 Pa); 'about 2.34 kPa' changes h by < 0.01 m. |
| c3 | verified | West 1999, J Appl Physiol 86:1062 (abstract via Crossref): summit pressure 251-253 Torr = 33.5-33.7 kPa; h = 3.18-3.21 m, 3.2 m. |
| c4 | verified | m42195: 'The atmosphere is able to force mercury in the tube to a height h because the pressure above the mercury is zero.' Same push for the straw. |
| c5 | verified | PX_PER_M 12.6; arrow widths 3 / 1.4 px; caption carries the idealisations. |

Unrecorded claims: none. The recall (a pump at the bottom of a 15 m well pushes; the air holds up about 10 m) is covered by c1 and c4.

Fixes for demo-builder (no verdict depends on them): c1/c4 sources -> OpenStax m42195, m42192 instead of the unopened Halliday chapter; c2 vapour pressure -> m42219 instead of the unopened CRC Handbook; c4 source 'A fluid cannot sustain the tension' is too strong (water holds metastable tension in clean narrow tubes and xylem); say dissolved gas and nucleation prevent it in an ordinary straw.

Recompute (own node, scratchpad fc-wj64/recompute.mjs):
```
== batteries
one {
  V: 1.5,
  I: 0.3,
  P: 0.44999999999999996,
  h: 6.6667,
  fill: 0.5012531328320802,
  glowR: 19.999999999999996
}
par {
  V: 1.5,
  I: 0.3,
  P: 0.44999999999999996,
  h: 13.3333,
  fill: 1,
  glowR: 19.999999999999996
}
ser {
  V: 3,
  I: 0.6,
  P: 1.7999999999999998,
  h: 3.3333,
  fill: 0.2506265664160401,
  glowR: 39.99999999999999
}
par per-cell current mA 150 h 13.333333333333334
== clap
c 343.23
85 0.50 0.50 170
170 0.99 0.99 340
340 1.98 1.98 680
1.0s -> 171.5 171.6174902906637
sonar 2s @1500 1500 @1540 1540
== scale
0 70.0 along N 0 muMin 0
30 60.6 along N 343.3 muMin 0.577
60 35.0 along N 594.7 muMin 1.732
== straw
sea 10.109
sea novap 10.347
everest253 3.206
everest251 3.178
Antoine pv 20C Pa 2330
== power
230 43.4783 945.1796 dots 20 glow 0.994 drop V 21.74 pct 9.45
2300 4.3478 9.4518 dots 2 glow 0.518 drop V 2.17 pct 0.09
23000 0.4348 0.0945 dots 1 glow 0.060 drop V 0.22 pct 0
ratio 99.99999999999999 99.47368421052632
```
