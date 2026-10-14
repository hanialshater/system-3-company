# Fact-check: more-traps-more-species (2026-10-14)

Board: W-677. Lesson: src/demos/life/more-traps-more-species/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Catch 50/500/5,000 in any order. New forest seed (2 -> 3 -> 1) is disabled until the first catch. The reveal sets 5,000 and reads the current seed. All three seeds' reveal texts were rendered and checked. The check script E6 section was re-run and matches.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran catchInsects() copied from Demo.tsx with the kit's mulberry32. Seed 2: 20/34/40; seed 3: 17/34/40; seed 1: 18/37/40 (E6 re-run agrees). Rendered reveals: seed 2 'under twice the 20', seed 3 'about twice the 17', seed 1 'about twice the 18', and all 40 at 5,000 on every seed. All are true. Note-only slip in the source field: it says '34 < 2 x 17', but 34 = 2 x 17, so the code prints 'about' for seed 3, which is right. Builder: correct the note. |
| c2 | verified | Derivation: E[species] = sum of 1 - (1 - p_i)^n with p_i proportional to 0.88^i: 18.86, 34.34, 39.97 (node; E6 agrees). The shares sum to 1; commonest 0.1207, rarest 0.00083. |
| c3 | verified | Seed 2 first-catch insect numbers match the claim (10, 12, 3, 2, 13, 4, 15, 6, 17, 53 for the top 10). Repeats between insects 50 and 500 are 96.9% (seed 2), 96.2% (seed 3) and 95.8% (seed 1). On every reachable seed, the species first found after insect 50 are mostly from the rarer half (seed 2: ranks 22, 9, 28, 14, ...). 'Each new species is a rarer one' is loose but fair against the commonest species: by insect 50 the commonest 9 (seed 2), 10 (seed 3) and 13 (seed 1) species have all been found. |
| c4 | verified | Derivation inside the model: the same forest gives 20, 34 or 40 species by catch size alone (c1). No literature sentence is on the card. |
| c5 | verified | Convention: the stage says 'A made-up forest: a few common species, many rare ones' and the shares are 0.88^i over 40, so it is accurate. The cut 'real forests' clause is not on the card. |
| c6 | verified | Seed 2 (the start seed) has 20 species at 50. Other seeds change the reveal's numbers but not the locked premise, which is shown before any seed change. |

**Result:** verified 6.
