# Fact-check: stable-until-mutants-meet (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Against all-A: A earns 2, B earns 2 (stage table, Demo wA/wB at y = 0); no strict gain from switching, so (A, A) is a (non-strict) Nash equilibrium. |
| c2 | verified | Maynard Smith ESS conditions (Maynard Smith and Price 1973, Nature 246, 'The logic of animal conflict', from memory, not opened): E(A,A) = E(B,A) = 2 and E(A,B) = 1 < E(B,B) = 3, so A fails. Easley and Kleinberg's ch. 7 definition (A's fitness strictly above the invader's for every small invading share) fails too: 2 - y < 2 + y. Chapter 7 'Evolutionary game theory' confirmed by library-catalog search snippet (book host blocked); ESS is its section 7.2 from my knowledge. |
| c3 | verified | Own node (fc21/ess.mjs): 0.01109 at 10, 0.01960 at 50, 0.2104 at 100, first >= 0.99 at 111 (0.9963; 0.9891 at 110). Baseline-10 check: 2.9% at generation 400. Reveal '1% to only 2% by 50' rounds 1.96%. |
| c4 | verified | 2(1 - y) + y = 2 - y; 2(1 - y) + 3y = 2 + y; edge 2y: 0.02 at 1%, 0.42 at 21% (stage shows +0.42 at generation 100, y = 0.2104). |
| c5 | verified | Disclosed in the stage line 'Score = surviving offspring, no baseline. Meetings are random.' and the muted last line of the reveal. |

**Result:** all open claims verified.
