# Fact-check: two-bets-split (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node outcomes(2): -10% 0.25, +5% 0.5, +20% 0.25; loss = 25%, the loss value is -10%. Reveal pins n = 2 (pinned = phase === 'reveal'), chip text matches. |
| c8 | verified | node outcomes(3): -10, 0, +10, +20; ticks are every bar's return (plus a 0% tick only when no bar is within 4 points: n = 1, 2). 'break even' label on r === 0 bars (n = 3, 6; exact zeros in floating point). |

**Result:** every claim open at this pass is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v5 wave E revision. Method: read v5 Demo.tsx (stage, seen row, conditional reveal paragraphs, no Reset) before the claim sources, then re-ran the numbers in my own node port of outcomes()/lossChance() (scratchpad fc24/tb.mjs). External hosts unreachable (DNS fails), so no external source was opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | outcomes(2): -10/+5/+20 at 1/4, 1/2, 1/4; loss 25%. Milestone two-bets guarantees '2 bets: 25%' is in the seen row the reveal points to. |
| c5 | verified | lossChance n = 1..6: 50, 25, 12.5, 31.25, 18.75, 10.94%; pct renders 31.3%. Shown only if 4 independent bets was visited. Reveal does not repeat 'more than the 25% with 2'; the comparison is true. |
| c6 | disputed | 'Real investments often fall together' is a world claim with no source ('general context'). Search snippets name Preis et al. 2012 but no host could be opened. Fix (builder): attach an openable source, or reword as a model-relative hedge. |
| c7 | verified | sd of split return 15/sqrt(n): 15.00 ... 6.12 for n = 1..6; average 5 throughout; worst case 0.5^n. |
| c9 | verified | Together mode: -10/+20 at 0.5 for every n; loss 50%. Paragraph appears only with a together entry (n > 1). |

**Result:** 4 verified, 1 disputed (c6). Publishing stays blocked on c6.

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | 'Made-up numbers': UP = 20, DOWN = -10 are constants. 'In it, bets either move independently or all together': Mode = 'indep' / 'together', and outcomes() in together mode is one bet's 50/50 for any n; chip 'Model: independent coin-flip bets' / 'Model: the bets rise and fall together'. 'Not advice' is a disclaimer. The unsourced world claim is gone from the muted line and from Demo.tsx (grep: no 'real invest'). |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
