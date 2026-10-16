# Fact-check: london-buried-six-times-more (2026-10-16)

Lesson: src/demos/history/london-buried-six-times-more/ (status draft, v4, Demo.tsx last commit 93593cf, 2026-10-15).

## Pass 56

Checker: fact-checker, a fresh instance, 2026-10-16. SO-10-2 run 2 (company/ops/dispatch-requests/2026-10-16-r2-quality.md), board W-1022. Tag: `[project:history]` (no wave-j match in the lesson's commit subjects). I did not write, build or record these claims.

Independence: c4's sentence and c1's two-name citation were proposed by earlier fact-checker passes (FC45 fix (a) and advisory). The builder adopted both verbatim in 93593cf (v4, W-992), which is the route the steward set for W-1108-class wording. I am a different instance and checked both strictly against opened sources only.

Method:
1. Artifact first. `npm run walkthrough -- london-buried-six-times-more --url http://localhost:3981` on an existing production build (.next-so1, BUILD_ID written 2026-10-16 11:21Z, after 93593cf). I did not start a third server because of the two-server cap. I read the transcript cut at the trust-sheet appendix (R1), then Demo.tsx, then meta.json and the earlier records.
2. Numbers. I ran my own node script (session scratchpad fc56/london.mjs) on artifacts/history-data/Arbuthnot.csv (SHA-256 d81babe6...975e, which equals the history-data.mjs pin). It parses BILLS out of Demo.tsx and compares the two row by row.
3. Sources opened: CRAN HistData_1.1.1.tar.gz (sha256 b602f00c..., the same tarball as FC45) man/Arbuthnot.Rd, and raw.githubusercontent.com friendly/HistData master man/Arbuthnot.Rd (same text apart from one added example link). No connection to: math.uni.edu (Campbell's arbuth.html), worc.ox.ac.uk, pcwww.liv.ac.uk, web.archive.org. No verdict rests on them.

Unrecorded claims: none. Every factual string in the transcript (hook, question, options, stage readouts, picture alt text, reveal) maps to c1-c4.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | The rendered question 'London's yearly records of deaths (Creighton, 1965 edition; Campbell) show 15,453 in 1664', the hook 'Yearly records of London's deaths run from 1629 to 1710', the stage readouts and the reveal all match the claim. From the file: 82 rows, 1629-1710. Mortality is 15,453 in 1664, 97,306 in 1665 and 12,738 in 1666. Plague is 68,596 in 1665 (the file's maximum). Christenings in 1665 are 9,972. In 1636 plague was 10,400 of 23,359. BILLS matches the file in 82 of 82 rows. The Rd says the plague and total-mortality columns were 'obtained by Campbell and from Creighton (1965)', and its reference is Creighton's History of Epidemics in Britain, 2nd edition, dated 1965. The citation names exactly those two sources, so FC45's advisory is met. |
| c4 | verified | The reveal reads 'Where it stops: these are recorded deaths and recorded causes, from later compilations (Creighton; Campbell).' The Rd calls the columns 'total mortality' and 'deaths from plague'. It credits both works, and both postdate 1710 (1965 edition; 2001). The plural, two-name wording holds whether Campbell took the columns from Creighton or the two are separate sources, which was FC45's open question. |

Re-derived for context (c2, already verified by FC43, not re-graded): 97,306 / 15,453 = 6.297 (shown 6.3); 68,596 / 97,306 = 70.50% (shown 70%); 97,306 / 9,972 = 9.758 (9.8 on the stage, about 10 in the reveal); for 1636, 44.52% (shown 45%). All match the walkthrough.

**Result (Pass 56):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 4 verified of 4.

Advisory (non-blocking, owner cm-history): the slug and URL `london-buried-six-times-more` still say 'buried', the unit FC43 found unsourced for these columns. It is not lesson text, so it does not block. A rename is the CM's call.
