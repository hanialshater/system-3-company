# Fact-check: ruler-catch (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | working(20) = 't = sqrt(2 x 0.200 m / 9.81) = 0.20 s' (node; timeFor(20) = 0.20193). Inverse check: 0.5 x 9.81 x t^2 x 100 = 20 cm exactly. Time scale is drawn only when unlocked; reveal string is the same function as the stage working line. |
| c6 | verified | Own mulberry32 port, seed 1 (fc26-b0/ruler.mjs): TRIALS 16.4, 27.4, 22.2, 24.2, 13.3, 12.6, ...; every catch converts with timeFor (inverse exact). Seen row after 5 drops 'Seen: 5 catches, 13.3 to 27.4 cm = 0.16 to 0.24 s', after 6 '12.6 to 27.4 cm = 0.16 to 0.24 s'. seen is max catches on the ruler at once and Clear only sets n = 0, so the row survives Clear; drops after Clear replay the same TRIALS, so lo/hi stay the learner's catches. The working line uses lastCm = TRIALS[next - 1], the latest catch. The reveal needs milestone five, so seen >= 5. |

**Result:** 2 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | held (unverified) | Woods et al. 2015 and Kosinski 2008 could not be opened from this host (web blocked). Not in learner text; it informs the simulated mean of 0.20 s. |
| c7 | verified | fallCm(t) = 50 g t^2 = 100 x g t^2/2, no drag term; caption after the commit reads exactly 'Simulated catcher, not your reflex. The ruler falls from rest, no air drag.' |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
