*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): spaced-beats-cram
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know how to separate the research-supported spacing effect from invented memory curves)
Screenshots seen: yes (artifacts/walkthroughs/spaced-beats-cram/sheet.png, recorded 2026-10-15T21:31)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Distributed sessions"; tapped Next morning, One month; slid Day to 28; tapped A, B, Month: both; opened reveal.

1. **Where understanding first broke: the next-morning marker.** At day 1 the stage shows A 87%, B 95%, so spreading the hours wins the next morning too. The trust sheet (c5) says the opposite tends to happen: massing can do better on an immediate test, and spacing pays off on a delayed one. That contrast is the surprising part of this idea, and the stage hides it. I leave thinking "spaced beats cram at every horizon, just by more later", which would make me distrust spacing the first time cramming wins tomorrow's quiz.
2. **The two plans differ in two ways, so I cannot tell what the calendar did.** B is labelled "B:recall→1h" and the alt text says "B starts with recall". So B gets spacing plus retrieval practice, and A gets neither. The hook asks what the *calendar* changes, but the 19% vs 1% gap could come from the recall step. A beginner who notices "recall" has no way to separate the two.
3. **Labels are code-speak.** "A:3h@0", "B:recall→1h" and "Illustrative recall·3h/plan" need decoding. I worked out "3 hours on day 0" from the alt text, not from the stage.
4. **The prediction felt easy.** "Distributed sessions" is the answer most adults have heard; "Calendar cannot matter" is a straw option. The real trap (cramming feels better the next day) was the place to put a prediction, and it is not used.
5. **The numbers are dramatic and invented.** A at 1% after a month of three hours of study reads as "cramming is almost worthless". The stage does say "chosen decay constants, not measured memory", which is honest, but the reveal still leads with 1% vs 19%.
6. **Does the reveal answer my question ("what changes a month later?")?** Partly. It tells me B is higher and that research supports spacing. It does not say why spacing helps, how big the real effect is, or that cramming can look better at first. "Your prediction held" plus "research supports it" confirms what I already believed and adds no new understanding.

Fixes (for the builder):
- Make the next-morning marker show the cram plan level with or ahead of the spaced plan (as c5 describes), so the month marker brings the reversal.
- Either give A a recall step too, or remove "recall" from B, so the only difference is the calendar.
- Spell the plan labels out ("A: 3 hours on day 0", "B: 1 hour on each of 3 days").
- Add one sentence of reason to the reveal (for example, that each later session starts after some forgetting, and remembering again is what sticks), with a claim behind it.

Verdict reason: the stage shows spacing winning even the next morning, against the lesson's own claim c5, and B mixes spacing with a recall step, so the reveal cannot show the learner what the calendar alone changes.

## After reading meta.json

- Objective ("separate the research-supported spacing effect from invented memory curves") is partly delivered: the stage and reveal both say the curves are chosen constants. But the curves still carry a next-morning result (B ahead) that the lesson's own claim c5 says research does not support, so the invented part teaches something the evidence part contradicts (finding 1).
- Misconception ("equal hours imply equal recall regardless of calendar") is answered only by the "Calendar cannot matter" option, which few adults pick. The confound in finding 2 weakens the answer: B differs by calendar and by recall.
- Recall question (four one-hour sessions vs one four-hour session) fits the reveal.
- Fix route: demo-builder (next-morning curve, B's recall step, labels, reveal reason); fact-checker to confirm c3 still holds once the curves change.
