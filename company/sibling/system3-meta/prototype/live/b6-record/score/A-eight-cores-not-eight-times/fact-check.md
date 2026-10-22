# Fact-check: eight-cores-not-eight-times

Checked only the files in this pack. Recomputed in node with the code's own functions (time = 15 + 45/c, speed-up = (60/t).toFixed(1) with trailing ".0" removed, time t.toFixed(1)).

## Learner-visible text and numbers
| Item | Check | Result |
|---|---|---|
| Hook "Give a job 8 cores instead of 1. How much sooner does it finish?" | question, no factual content | ok |
| Question: 60-min job, 45 splittable, 15 not; options 7.5 / About 21 / 30 min; answer "About 21 min" | 15 + 45/8 = 20.625 (node) | ok; 7.5 = 60/8 is the misconception distractor |
| Locked/Reset stage: 60.0 min, 1x, one lane | timeOf(1) = 60; 60/60 = 1 | ok |
| 2 cores: 37.5 min, 1.6x | 15 + 22.5 = 37.5; 60/37.5 = 1.6 | ok |
| 4 cores: 26.3 min, 2.3x | 26.25; JS toFixed(1) -> "26.3" (tie rounds up, node); 60/26.25 = 2.286 -> 2.3 | ok |
| 8 cores: 20.6 min, 2.9x | 20.625 -> "20.6"; 60/20.625 = 2.909 -> 2.9 | ok |
| Unlimited: 15.0 min, 4x | code returns SERIAL = 15; 60/15 = 4 (idealized limit, matches claim c2) | ok |
| Traces ✓37.5/26.3/20.6/15.0 | stored timeOf(c) on first visit; Reset (c=1) not stored | ok |
| Caption "Model: the split part divides perfectly; no overhead." | matches code (no overhead term) and claim c4 | ok |
| Bar: grey 15-min block, lanes, finish line, axis 0/30/60 | px() linear in minutes; finish line at px(t); screenshots 04/05/07 show finish at ~15 and ~20.6 | ok |
| Reveal "45 splittable minutes shrank to 5.6 on each core" | 45/8 = 5.625 -> 5.6 | ok |
| Reveal "grey 15 ... stayed 15: 20.6 minutes, 2.9 times faster, not 8" | as above | ok |
| Reveal "Unlimited cores ... took 15.0 minutes and can never run more than 4 times faster" | 15 + 45/n > 15 for finite n, limit 15 -> max 4x | ok (claim c2) |
| Reveal "Computer scientists call this Amdahl's law" | claim c3 | ok |
| Stage pinned to 8 cores in reveal (screenshot 07) | phase === "reveal" -> shown = 8 | consistent with reveal text |
| Labels >= 10 px | SVG text 12px; caption 0.78rem; trace 0.75rem (12px) | ok |

## Claims
- c1: 15 + 45/8 = 20.625 -> 20.6, 5.6 per core, 2.909 -> 2.9; 2 cores 37.5 (1.6x), 4 cores 26.25 -> 26.3 (2.29 -> 2.3x). Recomputed; matches stage and reveal.
- c2: limit 15, 60/15 = 4, never exceeded. Derivation correct; matches reveal.
- c3: 1/(0.25 + 0.75/8) = 2.909 (node); bound 1/s = 4. Source Amdahl, G. M. (1967), AFIPS SJCC Conf. Proc. vol. 30, pp. 483-485 is the correct bibliographic reference for the paper that gives the law its name (dl.acm.org fetch was blocked by the proxy; checked from known bibliography). The paper argues in words; the closed form is the standard textbook (Hennessy & Patterson) statement, which the claim discloses. Matches "Computer scientists call this Amdahl's law".
- c4: caption text matches code exactly; disclosure is correct (overhead only lowers speed-up).

## Defects
No defects found. Every visible number recomputes exactly under the stated model, every visible factual sentence maps to a claim, and the citation is correct.

S1: 0 · S2: 0 · S3: 0 · S4: 0
