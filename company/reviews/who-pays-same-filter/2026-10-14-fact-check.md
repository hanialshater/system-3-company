# Fact-check: who-pays-same-filter (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx D = 300 and F = 100. In panel 2, fitting gives p2Factory = -F = -100 and p2Laundry = 0, total -$100. Paying gives -300 and 0, total -$300. If both buttons are pressed, the factory keeps the filter (fitted takes precedence), so no press order shows a worse end. The reveal's '$100 beats $300 of damages' matches. |
| c2 | verified | Own node with the Demo deal test (offer - F > 0 and -offer > -D). $50: factory -50, refused, flash '-$50 for me'. $200: deal, factory +100, laundry -200, total -100. $350: the factory would accept, but laundry -350 < -300, flash '-$350: worse than smoke'. Whole-dollar deals run $101-$299, so 'between $100 and $300' holds. The milestone needs the deal and only $200 makes one, so the reveal's 'your $200 offer' is always true. |
| c3 | held (unverified) | The model part is verified: both Totals read -$100 (panel 1 deal: +100 - 200; panel 2: -100 + 0), the filter is fitted in both, and only the payer differs (own node). Held on the naming, 'This is the Coase theorem, which holds when bargaining is costless', which rests only on Coase (1960), J. Law Econ. 3, and E&K ch. 24 'Property Rights' (chapter title from my own knowledge). I could open neither: every scholarly host was unreachable through the proxy. The naming is standard, but I may not verify a sentence that rests only on an unopened source. Needs: a checker with access opens Coase 1960 or E&K ch. 24. |
| c4 | verified | Verified by derivation in the lesson's own model; E&K ch. 24 not opened. The deal's surplus is D - F = $200. If bargaining costs more than $200, no offer leaves both sides strictly better, so under the right to pollute the filter is not fitted and the total is -$300, not -$100: the result fails. With many laundries sharing the $300, each one's own gain can fall below the cost of acting alone, and paying requires a collective deal (free riding and holdouts). 'Can fail' is the modest form. Reveal line 370 matches. |
| c5 | verified | The stage line 'Simplified: two sides, free bargaining, costs known.' is on stage at all times. D = 300 and F = 100 are constants, labelled 'smoke $300 a year' and 'filter $100 a year'. Nothing claims they are real figures. |

**Result:** 4 verified, 0 disputed, 1 held this pass; the lesson cannot publish until c3 (unverified) is resolved.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | held (unverified) | HELD, still unverified. The model half is unchanged and true (both Totals -$100). The naming ('This is the Coase theorem, which holds when bargaining is costless') still rests only on Coase 1960 / E&K ch. 24. Wikipedia and readthedocs fail DNS; search-result summaries agree but are not an opened source. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | The model half: own arithmetic on Demo.tsx: the panel 1 deal can only be the $200 offer (factoryAccepts needs offer > 100, laundryGains needs offer < 300; offers 50, 200, 350), giving factory +100, laundry -200, total -100. In panel 2, fitted overrides paid: factory -100, laundry 0, total -100. Neither state can be undone, so both Totals read -$100 when the reveal opens. The naming 'Economists call this idea the Coase theorem' is judged as a naming convention (the coordinator's ruling for this pass): the free-bargaining, rights-decide-only-who-pays result is what the economics literature calls the Coase theorem, and the sentence no longer states a general law. 'Here bargaining is free' rests on the stage rule 'Simplified: two sides, free bargaining, costs known.' Nit: this source field reads 'both Totals read -00' (a shell-expanded '$100'); not learner-visible. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
