# Fact-check: hawks-never-take-over (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation and Demo scoreH/scoreD: (4-6)/2 = -1, 4, 0, 4/2 = 2; matches the stage table. |
| c2 | verified | node hawk.mjs: H(.1) = 3.5, D(.1) = 1.8, H(.9) = -0.5, D(.9) = 0.2, equal at 2/3. |
| c3 | verified | node, Demo trajectory copied: all starts 1..99 round to 67% at generation 150 (10%: 0.66662, 90%: 0.66669). Baselines 5 and 20 settle at 2/3 too. |
| c4 | verified | Derivation: equal payoffs at x = V/C (c2), hawks gain below and lose above, so V/C is the stable mix. Maynard Smith 1982 not opened; secondary sources found by web search state ESS p = V/C for V < C. Easley and Kleinberg ch. 7 is 'Evolutionary game theory' (library catalogue via web search); the section (I believe 7.5, evolutionarily stable mixed strategies) is from memory and unconfirmed. |
| c5 | verified | Demo model (deterministic shares, random pairing implicit, chosen payoffs) and the muted reveal paragraph say exactly this. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Arithmetic (4 - 6) / 2 = -1 under the stated equal-chance assumption; matches the table and scoreH. Own node also: every start 1..99% ends at 67% after 150 generations. Maynard Smith 1982 not opened; the sentence rests on the arithmetic. |
