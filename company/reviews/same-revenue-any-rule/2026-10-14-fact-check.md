# Fact-check: same-revenue-any-rule (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Curriculum reference easley-kleinberg-2010 ch. 9 (auctions; first-price, second-price, all-pay and seller revenue): matches, high confidence. The book was not opened (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own re-implementation (mulberry32(97), values 100 r() A then B): 33.395 / 33.303 / 33.302, shown to one decimal as 33.4 / 33.3 / 33.3. |
| c2 | verified | E[min] = 100/3; E[max]/2 = (200/3)/2; all-pay 2 x (10000/3)/200 = 100/3. Derivation holds. |
| c3 | verified | Own node best-response check at v = 60: first-price best bid 30.00 (v/2) against v/2 bidding; all-pay best bid 18.000 = 60^2/200 against v^2/200. Second-price truthful is dominant (standard). Note: the builder's source text says 'Fact-checker confirms' before any check; that phrase is the builder's, not this pass's. |
| c4 | verified | Holds for this model by c2/c3. Myerson, Math. Oper. Res. 6(1):58-73 (1981) and Riley & Samuelson, AER 71(3):381-392 (1981) confirmed as publications by search-result text only (not opened); their revenue-equivalence attribution is from my own knowledge. Easley-Kleinberg ch. 9 (auctions) placement matches my knowledge. |
| c5 | verified | Framing; chip 'Model: 2 bidders · values random $0-100 · seed 97' and reveal muted line match. |
| c6 (new, unrecorded) | disputed | Reveal: 'First-price charges less, half the winner's value.' Average payments are equal (33.3 vs 33.3) and half the winner's value is below the lower value in 10,065 of 20,000 seeded auctions. Builder rewords; see the claim's source for a suggestion. |

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Reveal para 2 (line 86) reads this sentence word for word. Per Demo payments(): second-price makes the winner pay min(a, b), the lower value. First-price makes the winner, the higher-value bidder (hi = max), pay hi/2, half its own value. The sentence no longer says first-price charges less than second-price, so it no longer contradicts the averages. Own re-run (mulberry32(97), 20,000 auctions): 33.395 / 33.303 / 33.302. Optimal first-price bid v/2 rests on c3 (verified, own best-response check). |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | All-pay bid v²/200 <= v/2 (own derivation of symmetric equilibrium for 2 bidders U[0,100]); expected revenue 2·E[v²]/200 = 100/3 for all three rules; own re-run mulberry32(97), 20,000 auctions: 33.395 / 33.303 / 33.302. Holds by derivation and simulation; Myerson / Riley-Samuelson attribution not needed for the sentence (not opened). |
| c6 | verified | Own re-run mulberry32(97), 20,000: mean lower 33.395 ('$33.4'), mean higher 66.606 ('$66.6'), half 33.303 ('$33.3'). Reveal uses the recorded full run (full ?? snapshot(N)), so the figures hold after Reset. |
| c7 | verified | Own re-run: auction 20,000 values 90.007 / 18.948 -> second-price '$18.9', first-price 45.004 '$45.0'. Lower value beats half the higher in 10,065 of 20,000. Reveal clause appears only while an auction is on stage (n > 0) and quotes the current last auction; the claim's figures are the full-run case. |

**Result:** all open claims verified; no disputes.
