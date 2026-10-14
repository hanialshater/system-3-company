# Build note: ruler-catch

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key state: five or more catches seen, clustering near 20 cm. Milestone `five`. QA path: "Drop once" (1), "Drop 5 times" (6), "Clear".
- The catcher is SIMULATED (brief's own board note: the stage clock is simulated). Reaction time = 0.20 s + 0.05 x (sum of three uniforms - 1.5), mulberry32 seed 1. Seed 1 was the first one tried; seeds 2 and 3 give similar means (20.4, 21.3 cm over 30 draws). The first six catches span 12.6 to 27.4 cm, wider than the brief's "15 to 25 cm", so the reveal quotes the learner's actual min and max rather than the brief's range.
- Stated on stage: "Simulated catcher, not your reflex."
- No equations on stage; the time scale beside the ruler is d = g t^2 / 2 drawn as ticks (0.10 to 0.30 s at 4.9, 11.0, 19.6, 30.7, 44.1 cm).
- Claim c3 (typical human reaction 0.2 to 0.25 s) has no citation yet ("TO CITE"); it is not quoted to the learner. Fact-checker should source it or drop it.
- Screenshot looked at: QA phone-2-explore (ends after Clear) plus my own screenshot after Drop once + Drop 5 times (12.6 cm last catch, five dots on the ruler). Layout fine.

## Revision v2 (wave C)

Clear no longer empties the reveal: it uses the most catches seen, so no Infinity or NaN.

## Pre-flight v3

builder: demo-builder (wave G revisions, batch 2) · 2026-10-14 · answers r7 learner review `2026-10-14-learner-knows-reflexes-and-falling-r7.md`

Changes: (1) the time scale (0.20 s beside 20 cm) is drawn only after the commit; its label now reads "time, d = ½gt²". (2) The conversion is on stage: a working line turns the latest catch into a time ("12.6 cm: t = √(2 × 0.126 m ÷ 9.81) = 0.16 s"); Clear keeps it. (3) A Seen row records the catches so far ("Seen: 6 catches, 12.6 to 27.4 cm = 0.16 to 0.24 s") and survives Clear; 27.4 is now printed. The reveal quotes the Seen row and points at the working line, writing out 20 cm the same way. Title "How fast is your reflex?" -> "How long does a catch take?" (the catcher is simulated); hook drops "blink-quick" (it pointed at a short time). c2, c6 reworded, unverified.

1. **Title and hook.** "How long does a catch take?" / "A falling ruler can time a reaction. How long does a catch really take?" No size of time named or implied. No.
2. **Options.** "0.02 s" / "0.2 s" / "2 s". All numbered, one significant figure.
3. **Locked stage.** The cm ruler (0-45, labels every 10), "cm fallen", caption "Make a prediction to start.", readouts "?" and "?", blank working and Seen lines. No time scale, no 0.20 s, nothing at 20 cm.
4. **Reveal values.** "6 catches ... 12.6 and 27.4 cm ... 0.16 to 0.24 s": computed from seen (the most catches on the ruler at once; milestone five), the same strings as the Seen row. "20 cm means 0.20 s" and "√(2 × 0.200 m ÷ 9.81) = 0.20 s": the question's case, computed with working(20), the same format and rounding as the stage working line and the 0.20 s scale tick. "about 5 thousandths": computed, told context (c5).
5. **QA path.** Drop once (16.4 cm), Drop 5 times (6 catches; five), Clear. 1 of 1 milestone. At reveal the Seen row, the working line for 12.6 cm and the time scale are on stage.
6. **Reset.** Clear pressed last: the ruler empties and the readouts read 0 and ?, the Seen row and working line stay. Reveal from that run: "Your Seen row: 6 catches closed between 12.6 and 27.4 cm, which is 0.16 to 0.24 s on the scale. A catch at 20 cm means 0.20 s. / The working line under the ruler is the conversion. Falling from rest, d = ½ g t², so t = √(2d / g): for 20 cm, t = √(2 × 0.200 m ÷ 9.81) = 0.20 s. Distance grows with the square of the time. That makes a few centimetres a fine clock: near 20 cm, each extra centimetre is about 5 thousandths of a second. No air drag; the catcher here is simulated." (Read from the code; this batch does not run QA. Seeded TRIALS re-run in node: 16.4, 27.4, 22.2, 24.2, 13.3, 12.6.)

## Pre-flight v4 (demo-builder, 2026-10-14, wave H, learner r8 / W-323)

Changes: reveal cut from ~99 to 63 body words: "No air drag; the catcher here is simulated." cut (the caption now reads "Simulated catcher, not your reflex. The ruler falls from rest, no air drag."; new claim c7), the 5-thousandths sentence cut (c5 withdrawn), "The working line under the ruler" → "The working line". Ruler numbers and "cm fallen" 9 → 10 px; "cm fallen" moved left so it no longer runs into "time, d = ½gt²".

1. Title and hook: unchanged.
2. Options: unchanged ("0.02 s", "0.2 s", "2 s").
3. Locked stage: unchanged (cm ruler only, no time scale).
4. Reveal values: catches count, 12.6 and 27.4 cm, 0.16 and 0.24 s (b) the Seen row (five milestone; survives Clear); 20 cm and 0.20 s are the question's constants via timeFor/working().
5. QA path: Drop once, Drop 5 times, Clear; Seen row and working line on screen at the reveal.
6. Reset: Clear last (QA path). Reveal (63 words): "Your Seen row: 6 catches closed between 12.6 and 27.4 cm, which is 0.16 to 0.24 s on the scale. A catch at 20 cm means 0.20 s. The working line is the conversion. Falling from rest, d = ½ g t², so t = √(2d / g): for 20 cm, t = √(2 × 0.200 m ÷ 9.81) = 0.20 s. Distance grows with the square of the time."
7. Phone fit (reveal-fit, localhost:3530, 2026-10-14): crop 72 px → 0 px; hiddenBelow 0; namedHidden 0; phoneFit true; reveal 101 → 69 words as measured (verdict included). Picture drawn at full scale (212 px, no shrink), so the time-scale labels are 10 px at the reveal. Screenshot: artifacts/reveal-fit/ruler-catch.png.
