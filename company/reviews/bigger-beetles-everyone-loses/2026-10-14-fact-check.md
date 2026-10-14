# Fact-check: bigger-beetles-everyone-loses (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | wL - wS = 2 at every x (8-6 = 4-2 = 2); Demo.tsx wL/wS. |
| c2 | verified | Re-ran Demo.tsx next(): 0.0415 at 5, 0.1633 at 10, 0.9306 at 20, 0.9896 at 23, first >= 0.99 at 24 (0.9947). Baseline 10 gives 69, as stated. |
| c3 | verified | avg(0.01) = 5.98, avg at gen 24 = 4.01, at 30 = 4.000. |
| c4 | verified | From 0.9499 at gen 30: 0.9731, 0.9860, 0.9929 (back above 0.99 after 3 generations). Near all-large, wS = 2.0003, wL = 4.0003. |
| c5 | verified | Definition matches Maynard Smith & Price (1973) as reported by Wikipedia (ESS) and Sandholm's EGT notes (resistant to invasion by a small group of mutants), via web search; papers not opened. Easley & Kleinberg ch. 7 is 'Evolutionary Game Theory' (confirmed from knowledge and an MIT syllabus listing EK ch. 7 for ESS); ESS is defined in 7.2 from my knowledge of the book, section not opened. Also checked the stage's game is an ESS: large vs large 4 > small vs large 2. |
| c6 | verified | Stage and reveal say so (Demo.tsx 'Score = surviving offspring, no baseline. Beetles meet at random.' and the muted reveal line). |

Chapter placement: easley-kleinberg-2010 ch. 7 (Evolutionary Game Theory) is right (from my knowledge, plus an MIT syllabus listing EK ch. 7 for ESS). The section (7.2, Evolutionarily Stable Strategies) is from memory and not opened.
