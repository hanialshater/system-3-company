# Fact-check: eight-cores-not-eight-times

## How I checked
- Recomputed in node with time = 15 + 45/cores, speed-up = 60/time: 1 core 60 min 1x; 2 cores 37.5 min 1.6x; 4 cores 26.25 min 2.286 -> 2.29x; 8 cores 20.625 -> 20.6 min, 2.909 -> 2.91x; cores -> infinity time -> 15, speed-up -> 4. 45/8 = 5.625 ("under 6"). Amdahl form 1/(0.25 + 0.75/8) = 2.909, 1/0.25 = 4. (20.625).toFixed(1) = "20.6".
- Read Demo.tsx: every readout, the trace, axis label and bar come from one formula; the formatter shows exact two-decimal values (37.5, 26.25) and one decimal otherwise. Unlimited is drawn as the limit value with the label "45 ÷ ∞ → 0".
- Predict options 7.5 / About 21 / 30: the answer "About 21" matches 20.6; 7.5 = 60/8 (the misconception); 30 is a distractor.
- Reveal: "under 6", "20.6 minutes", "2.91 times faster, not 8", "never more than 4 times faster", Amdahl formula: all match c1, c3, c4.
- Caption matches c6. Amdahl (1967), AFIPS SJCC 30, pp. 483-485, doi 10.1145/1465482.1465560 is the correct bibliographic record; the paper argues in prose, and the formula is the standard later statement (Hennessy and Patterson, ch. 1). Attributing the name is standard, so I found no defect there.
- Screenshots 01-07 inspected for clipping and overlap.

## Defects

| id | quote | what is wrong | recomputation / source | severity | confidence |
|---|---|---|---|---|---|
| D1 | "The 20 minutes that cannot split still take 20 minutes, so a 60-minute job can never take less than 20: at most 3 times faster, however many cores." (trust sheet, c5) | The trust sheet shows this as CHECKED. It describes a 60-minute job with 20 serial minutes, but the lesson's job has 15. Its address is "recall why", which no learner-visible text matches. Read in the trust sheet, it contradicts the stage (15 min, 4x) and has no context saying it is a different job. | Arithmetic is right for its own premise (20 + 40/n -> 20, 60/20 = 3), but nothing in the lesson shows that premise | S2 | medium |
| D2 | Reset state (1 core): bar label shows "45" (code renders "45 ÷ 1") | The label is placed at x = xAt(60)+4 = 302 in a 320-wide viewBox, so "÷ 1" is clipped off the right edge (screenshots 06-step-5, 07-reveal). The learner sees a bare "45" next to the 60 mark, and it reads like an axis value. | Geometry: 22 + 60*4.6 + 4 = 302; a 6-character 12px label needs ~40 units | S3 | high |
| D3 | aria-label "Job bar on 1 cores: 60 minutes" | Grammar ("1 cores") in the accessible label, also recorded in the transcript | code: `${cores} cores` with no singular case | S4 | high |

No S1 defects: every visible number recomputes exactly.

S1: 0 · S2: 1 · S3: 1 · S4: 1
