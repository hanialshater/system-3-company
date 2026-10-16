# Fact-check: two-batteries-side-by-side (2026-10-16)

## FC wj64 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: standing order SO-10-2, trigger "new lessons merged with unverified claims", [project:wave-j], board W-1490. Lesson merged at 0027f27 (physics #64-68, build fba1dce). Order (artifact first): the shared review server :3591 (s3c-qa, built from bf6fde8) does not contain these drafts (404), so I started my own `next dev` on :3644 from the main checkout (dist dir .next-fc-wj64, removed afterwards; the tsconfig.json include line that next dev appended was reverted), ran `npm run walkthrough -- <5 slugs> --url http://localhost:3644` (2026-10-16T16:27Z), read the transcript to the appendix and viewed the step screenshots; then Demo.tsx, then meta.json. I did not read build.md, the brief or artifacts/scratch/cm-physics-r4/check.mjs before writing these findings. Every number was recomputed in my own node script (below). Sources opened by this pass: OpenStax College Physics 2e (CC BY 4.0) CNXML from raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/modules/<id>/index.cnxml, fetched 2026-10-16. Halliday, Resnick and Walker and the CRC Handbook were not opened and nothing rests on them. Per-claim notes start "FC wj64" in meta.json.

Scope: c1-c4. Result: 4 verified, 0 disputed, 0 unverifiable. One unrecorded claim recorded (alt1, unverified).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Series emfs add (3.0 V); identical parallel cells keep 1.5 V. m42357 (Electromotive Force: Terminal Voltage) states both. Stage meter and reveal match. |
| c2 | verified | 1.5/5 = 0.30 A, 0.45 W; 3.0/5 = 0.60 A, 1.80 W (2x current, 4x power). m42714 (P = IV; constant R gives 4x power at 2x voltage). |
| c3 | verified | 2000/300 = 6.67 h; parallel: 150 mA per cell, 13.33 h; series: 600 mA through both, 3.33 h. Capacity stipulated on the stage. |
| c4 | verified | Glow area proportional to power (glowR = 20*sqrt(P/0.45)), gauge = min(1, h/13.3). Source string is stale (see fixes). |
| alt1 (new) | unverified | Recorded by me, so I may not verify it. Picture text says 'four times as bright'; the model gives four times the power. Would not verify as written. |

Unrecorded claims: the series-state picture text 'The bulb glows four times as bright' (recorded as alt1). Everything else in the transcript (hook, question, options, meter, 'lifts 1.5 V', caption, Seen row, other picture text, reveal) maps to c1-c4. The recall (end to end for 3 V) is covered by c1/c3.

Fixes for demo-builder (no verdict depends on them except alt1):
1. Alt text, series state: 'four times as bright' -> 'brighter, at four times the power'; then retire alt1 or have it checked.
2. c4 source: 'glow radius 14 + 9 px per W' is not the code; write 'glow radius 20*sqrt(P/0.45) px, area proportional to power'.
3. c1-c3 sources: replace the unopened Halliday chapter with OpenStax College Physics 2e m42357 / m42714.

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
