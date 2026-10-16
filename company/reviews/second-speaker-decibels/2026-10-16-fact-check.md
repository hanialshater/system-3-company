# Fact-check: second-speaker-decibels (2026-10-16)

## FC pass 55 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: SO-10-2 (standing order in company/ops/dispatch-requests/2026-10-16-r2-quality.md, "## Standing orders"), domain physics, all 17 open physics claims (3 Wave J lessons, tag [project:wave-j]). Physics checkability rule (company/domains/physics.md): equations with stated idealisations, units on every number.

Order (artifact first): production build of the main checkout at the pass's starting HEAD (NEXT_DIST_DIR=.next-so2), `npm run walkthrough -- electron-speed-in-a-wire second-speaker-decibels what-pushes-the-car --port 4001` (recorded 2026-10-16T11:19Z), transcript read cut at the appendix (R1), step screenshots viewed. Then Demo.tsx, then the meta.json claims. I did not read build.md or the builder's check.mjs; every number was re-derived in my own node script (not kept in the repo; method and values are in each claim's note). Sources: the ledger cites Halliday-Resnick-Walker and Purcell-Morin, which are not reachable here, so I did not rely on them. I opened OpenStax University Physics (CC BY 4.0) as CNXML from github.com/openstax/osbooks-university-physics-bundle at commit 2300d5b (2026-09-08), quoted by module id in each note. openstax.org and wikipedia.org were refused by the proxy (403). No claim here was written by me: git history shows only the Wave J builder's commits (c9f5476, fc6d3d4, a926418, 3516c4e).

Result: 5 of 5 verified, 0 held, 0 disputed. Statuses and full per-claim notes are in src/demos/physics/second-speaker-decibels/meta.json (each note starts 'FC pass 55').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | OpenStax vol 1 m58377: beta = 10 log10(I/I0), I0 = 10^-12 W/m2. 1 uW/m2 gives 60.000 dB. |
| c2 | verified | Own derivation (cross term of uncorrelated pressures averages to 0, so intensities add); 63.010, 66.021, 70.000 dB. All stage frames match. |
| c3 | verified | m58377: each factor of 10 is 10 dB; doubling is 3.01 dB. |
| c4 | verified | 10^6 is correct for "the power of one 60 dB speaker". Wording finding below. |
| c5 | verified | Caption seen. m58372: constructive interference doubles the amplitude; I goes as amplitude squared (m58377), so in-phase spots get +6.02 dB. No loudness claim on screen. |

## Findings for the builder and cm-physics (not disputes)

1. **c4, wording (the strongest finding in this pass, still not a dispute).** The reveal reads: "So 120 dB is not two 60 dB speakers; it is a million times their power." If "their" means the two speakers (2 uW/m2), the factor is 500,000, not 10^6. The ledger's source field shows the builder meant one speaker's power. In a lesson about a 3 dB difference, the misreading is worth removing: "it is a million times one speaker's power". This is the builder's edit, through cm-physics.
2. **c1, terms.** The stage calls intensity "sound power reaching you" and gives it in uW/m2. That is plain-language power per area, and the unit makes it clear. Not a dispute.
3. **Sources.** The Halliday citation names a chapter only. The claims stand on OpenStax m58377 and m58372 plus derivation.
4. No unrecorded claims: the hook, the predict answer (63 dB) and every stage string are covered by c1-c5.
