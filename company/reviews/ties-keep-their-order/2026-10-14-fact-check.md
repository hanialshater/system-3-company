# Fact-check: ties-keep-their-order, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 insertion gives Ben Dee Ana Cal; selection gives Ben Dee Cal Ana | verified | Re-ran insertion() and selection() by hand from Demo.tsx; rows match the claim source. |
| c2 swap 2 throws Ana past Cal; Cal stays on slide 2 | verified | Before swap 2: Ben Ana Cal Dee; first A from slot 2 is Dee (slot 4); swap passes Cal. Slide 2: Ana B not higher than Cal B. |
| c3 stable definition; insertion stable, swap-selection not | verified | CLRS 4th ed. 8.2 (stable) and 2.1 (insertion sort). Insertion moves an item only past strictly greater ones, so equal items never cross; the c1 run is a counterexample for selection. |
| c4 name sort then stable grade sort keeps names in order | verified | Derivation; the claim states the stability requirement. |

Result: 4 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node selection sort: before swap 2 order Ben Ana Cal Dee; swap slots 2 and 4 gives Ben Dee Cal Ana, Ana passes Cal (both B). Own insertion: slide step 2 mover Cal, left neighbour Ana (B, not higher), Cal stays. Demo KEY_SWAP = 2, button 'Swap 2: watch Ana' is learner-pressed. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
