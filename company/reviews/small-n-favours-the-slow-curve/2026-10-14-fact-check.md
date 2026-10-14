# Fact-check: small-n-favours-the-slow-curve (2026-10-14)

Board: W-657. Lesson: src/demos/cs/small-n-favours-the-slow-curve/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: n = 20/43/44/100 in any order, plus Reset (which clears the bars only; the trace keeps every visited n). All four milestones gate the reveal, so every number it quotes is in the trace.

Sources opened (GitHub raw): walkccc/CLRS (3rd-edition solutions; docs/Chap01/1.2.md quotes exercise 1.2-2 and gives the answer 2 <= n <= 43; mkdocs.yml and docs/Chap02/Problems/2-1.md give Problem 2-1 and quote it); python/cpython Objects/listsort.txt; openjdk/jdk TimSort.java. CLRS itself was read only through walkccc's quotation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran insertion()/merge() from model.ts: 20 -> 3,200 / 5,532; 43 -> 14,792 / 14,933; 44 -> 15,488 / 15,374; 100 -> 80,000 / 42,521. fmt() renders with commas as stated. |
| c2 | verified | Loop n = 2..1,000: insertion cheaper for 2-43 (42 sizes), merge for 44-1,000 (957); rounding merge to whole steps flips no size. n = 1 (merge 0) is outside the claim. Opened CLRS 3e exercise 1.2-2 statement and answer (2 <= n <= 43) in walkccc/CLRS docs/Chap01/1.2.md (GitHub raw; a solutions repo that quotes the exercise). |
| c3 | verified | Derivation: 8n^2 < 64 n log2 n iff n < 8 log2 n; 8 log2 43 = 43.41 > 43, 8 log2 44 = 43.68 < 44. For large n the n^2 term dominates any constant. |
| c4 | verified | Opened: walkccc/CLRS mkdocs.yml lists '2-1 Insertion sort on small arrays in merge sort' and docs/Chap02/Problems/2-1.md quotes the problem (coarsen the leaves of merge sort with insertion sort, because insertion sort's constant factors make it faster for small sizes). Practice: CPython Objects/listsort.txt (binary insertion sort boosts short runs to minrun) and OpenJDK TimSort.java ('Small arrays are sorted in place, using a binary insertion sort'). So 'fast merge sorts hand short pieces to insertion sort' is supported. CLRS itself was read only through the walkccc quotation. |
| c5 | verified | Convention: the caption says 'Steps from a cost model, not timings'. The constants 8 and 64 match CLRS 3e exercise 1.2-2 as quoted in walkccc/CLRS (opened). |

**Result:** verified 5.
