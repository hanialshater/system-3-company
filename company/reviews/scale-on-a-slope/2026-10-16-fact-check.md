# Fact-check: scale-on-a-slope (2026-10-16)

## FC wj64 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: standing order SO-10-2, trigger "new lessons merged with unverified claims", [project:wave-j], board W-1490. Lesson merged at 0027f27 (physics #64-68, build fba1dce). Order (artifact first): the shared review server :3591 (s3c-qa, built from bf6fde8) does not contain these drafts (404), so I started my own `next dev` on :3644 from the main checkout (dist dir .next-fc-wj64, removed afterwards; the tsconfig.json include line that next dev appended was reverted), ran `npm run walkthrough -- <5 slugs> --url http://localhost:3644` (2026-10-16T16:27Z), read the transcript to the appendix and viewed the step screenshots; then Demo.tsx, then meta.json. I did not read build.md, the brief or artifacts/scratch/cm-physics-r4/check.mjs before writing these findings. Every number was recomputed in my own node script (below). Sources opened by this pass: OpenStax College Physics 2e (CC BY 4.0) CNXML from raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/modules/<id>/index.cnxml, fetched 2026-10-16. Halliday, Resnick and Walker and the CRC Handbook were not opened and nothing rests on them. Per-claim notes start "FC wj64" in meta.json.

Scope: c1-c4. Result: 3 verified, 1 disputed (c4), 0 unverifiable. One unrecorded claim recorded (alt1, unverified). The lesson cannot publish while c4 is disputed.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | N = mg cos(theta), along = mg sin(theta): 343.3 N at 30 deg (mu >= 0.577), 594.7 N at 60 deg (mu >= 1.732). m42075. Demo.tsx arrows sum to the weight (checked). |
| c2 | verified | 70 cos 30 = 60.62 -> 60.6; 70 cos 60 = 35.0; flat 70.0. |
| c3 | verified | m42132: 'The bathroom scale is an excellent example of a normal force'; m42075: 'normal means perpendicular to a surface'. Current source is only 'textbook'. |
| c4 | **disputed** | The stop block holds the scale, not the person (60 deg screenshot: block at the downhill end of the scale, feet clear of it). The person still needs 594.7 N of friction from the platform, mu >= 1.73 shoe-on-platform, which is the coefficient c4 says the block removes. 'At rest, not slipping.' at 60 deg rests on this. |
| alt1 (new) | unverified | Recorded by me. Flat-state picture text says the weight 'splits into a part into the ramp and a part along the ramp'; on flat ground the along part is zero. False as written for theta = 0. |

Fix for c4 (demo-builder, with cm-physics on the physics): one of (a) draw the stop as a cleat/foot rail fixed to the ramp that touches the shoes as well as the scale, and say so in c4; (b) state 'perfect grip: the shoes would need mu >= 1.73 on the platform at 60 deg'; (c) replace 60 deg with an angle ordinary shoe grip can hold (the need is mu >= tan theta: 30 deg needs 0.58; 45 deg already needs 1.0). Then return c4 to unverified for a re-check.
Other fixes: alt text at theta = 0 ('Flat ground. The person's whole weight presses into the scale.'); c1/c3 sources -> OpenStax m42075, m42132.

Unrecorded claims: alt1 (recorded). The recall (ramp pushes with less than the weight) is covered by c1.

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
