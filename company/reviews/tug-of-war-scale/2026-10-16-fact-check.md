# Fact-check: tug-of-war-scale (2026-10-16)

## FC pass 66 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (company/ops/dispatch-requests/2026-10-16-r3-quality.md, "## Standing orders"), batch SO-10-2 trigger (b)/(d), tag [project:wave-j]. Server: shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start and end; s3c-qa HEAD the same); R3a check.sh exit 0 for this lesson; no diff on this lesson between 987687acc1cc934b5eaa4f5510d2111712263532 and the main checkout HEAD. Order (artifact first): `npm run walkthrough -- second-speaker-decibels electron-speed-in-a-wire what-pushes-the-car tug-of-war-scale --url http://localhost:3591` (recorded 2026-10-16T14:42-14:43Z), transcript cut at the appendix, step screenshots viewed; then Demo.tsx, then meta.json. I did not read build.md or check.mjs; numbers re-derived in my own node. Source: OpenStax University Physics (CC BY 4.0) CNXML fetched by this pass from raw.githubusercontent.com/openstax/osbooks-university-physics-bundle at 2300d5b. Halliday/Purcell not opened and not relied on. Independence: the reset wording came from earlier FC wording findings but was adopted into Demo.tsx and claim text by demo-builder (commit named below), the route the r2 ruling on W-1108 sets; this pass wrote no claim text. Full per-claim notes start 'FC pass 66' in the lesson's meta.json.

Scope: c1 (reset by 0f8fa45, W-711 wording). Result: 1 of 1 verified, 0 held, 0 disputed.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own derivation: at rest T_right = T_left; a massless spring carries one tension. Demo.tsx draws both arrows and the dial from one T = PULL[mode]. m58303: negligible-mass string, 'the tension is the same throughout the string'; m58300: tension pulls outward along both ends. Stage (two equal arrows, 'tension 100 N', dial) and reveal ('at rest it is stretched only when both ends are pulled equally') seen on the server. The 2026-10-14 wording note is resolved. |

Note: the W-834 label change (fg ink, 11 px) changes no text.
