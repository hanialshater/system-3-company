*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: asthma-looks-safe
lesson version: v2
boundary: adult beginner who knows a model learns patterns from past records; does not know that records carry the effects of past decisions, so a model that predicts well can give the wrong answer to "what should we do?", and acting on it removes the care that made the pattern (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/asthma-looks-safe/sheet.png, recorded 2026-10-16T13:03:17Z)
Verdict: revise

Run: SO-10-3 `[project:catalog]`, shared review server http://localhost:3591 built from 5b2fee71701e8645e3cd6e2fde60bcea004833e8 (R3a check exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("About 4%, as before").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Not at the predict card: the hook, the question and the stage are easy to read, and step 1 ("Model's view ... asthma 4% risk, others 8%. Safest: asthma.") and step 2 ("Ward: all · intensive care: none", asthma 10 of 50 died) are clear and each changes the picture. It breaks at the reveal, for the learner who reasons well. The question itself says "every asthma patient went to intensive care" and "the model sends low-risk patients to the ward". With that, this mind rules out 4% at once and then has to choose between 8% and 20%. Nothing on the predict card or the stage says that asthma patients are *sicker* than the others once they lose intensive care. So the reasoned answer is "About 8%, like others": "they now get the same care as everyone else, so they die like everyone else". 20% can only come from knowing outside the lesson that asthma makes pneumonia more dangerous.

2. **What the prediction felt like.** It feels like a three-way choice where one option is ruled out by the question's own wording (the 4% picker has not read the second sentence closely) and the other two differ on a fact the lesson never gives. The 4% option works as a trap for a pattern-follower, and that is the lesson's target misconception, so it is fair. The 8%/20% split feels like a trivia guess, not a decision the learner can reason through.

3. **Whether the reveal answered the question the learner actually had.** For the 4% picker (this walk), yes: "they died less because every one of them went to intensive care. The model saw the outcome, not the reason" answers "why not 4%?" directly, and the closing line ("answers 'who did badly before?', not 'what happens if we change what we do?'") states the idea well. For the 8% picker, no. They get "Not quite: it was 'About 20%'" and an explanation of why not 4%, which they already knew. The question they have, "why do asthma patients in the ward die *more* than the others in the ward?", is never answered. The stage shows 10 of 50 against 12 of 150, but not why. **This is the blocking finding.** The learner who understood the lesson's main point is marked wrong and is not told why, so 20% reads as an arbitrary number. One sentence would fix it, on the stage or in the reveal: asthma makes pneumonia more dangerous, so the old rule's intensive care was hiding a higher true risk. Or the options could be changed so that 8% is not a reasoned wrong answer. Which fix to make is the CM's or the builder's call, not mine.

Notes (not blocking):
- In 02-step-1 and 03-step-2 the stage card sits low, with a band of empty space above "TOY PNEUMONIA PATIENTS", while 01-predict and 04-reveal are top-aligned. The layout jumps between steps.
- "Ward: all · intensive care: none" means the model sends everyone, the others too, to the ward. The question says "sends low-risk patients to the ward". A careful reader may wonder whether the others' 12 of 150 is the old ward number or a new one. It is the same number in both rows, so it reads as "unchanged", which works, but nothing says so.
- No dead end under R4: both stage controls change the stage, and "Show me why" unlocked after step 2.

Verdict reason: revise. The reveal does not tell the learner who picked "About 8%, like others" why asthma patients do worse than the others once they are in the ward. Nothing in the artifact supports 20% over 8%, so the best-reasoned wrong answer gets no explanation.

## After reading build.md / meta.json

(Written after the findings above were saved. build.md not read: out of scope for this role.)
- **Intent vs experience.** The objective is that the learner can explain why asthma patients died less in the records (they all got intensive care), and that the model's ranking raises their deaths. The 4% picker gets that explanation in full. My blocking finding is not about that half. It is about the 20% vs 8% gap, which the objective needs ("raises their deaths") but the reveal never gives a reason for.
- **The answer to the 8% picker's question exists, but the learner barely sees it.** Demo.tsx (lines 76-80) has a stage line "Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%." It shows only after unlock and *before* "Model's view" is tapped. The explore panel tells the learner to tap "Model's view" first, and that control then stays disabled (`disabled={locked || view}`), so the line is replaced and never comes back. The walkthrough frames do not show it (02-step-1 already shows the model's view). I believe this from the code and have not seen it on screen. It also shows only after the prediction is locked, so it cannot support the prediction itself. Possible fixes, for the CM or builder to choose: restate the ward risk in the reveal ("on the ward, asthma patients' toy risk is 20%"), keep the line visible, or say on the predict card that asthma raises the risk.
- **Claim c1** says "the toy risks are stated on the stage: ward 20% for asthma and 8% for others". That is true only in the brief state described above. I am not disputing the claim's truth, which is the fact-checker's call. It is a note that the learner may never see where the claim says it is stated.
- The note on the layout jump between steps (stage card sitting low in 02/03) stands. The meta.json claims explain nothing about it.
