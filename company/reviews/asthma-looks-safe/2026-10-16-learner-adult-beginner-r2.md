*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: asthma-looks-safe
lesson version: v3
boundary: adult beginner from the lesson's own learner field. Knows that a model learns patterns from past records; does not know that records carry the effects of past decisions, so acting on a good predictor can remove the care that made the pattern.
Screenshots seen: yes (/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/run-c1/artifacts/walkthroughs/asthma-looks-safe/sheet.png, recorded 2026-10-16T14:43:21.600Z, --choose 1 = on-screen option 2 "Rises above 4%"; and /tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/run-c0/artifacts/walkthroughs/asthma-looks-safe/sheet.png, recorded 2026-10-16T14:43:27.852Z, --choose 0 = on-screen option 1 "Stays about 4%, as before"; single frames 02-step-1.png and 03-step-2.png opened from the option-0 run)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run batch=SO-10-3, tag [project:catalog], r2 re-walk. Shared review server http://localhost:3591, built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM in /home/user/s3c-qa/.next-review6 and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end, unchanged). R3a: `check.sh 987687a… src/demos/ai/asthma-looks-safe` exit 0 against origin and against local HEAD. Transcript read cut at the trust-sheet appendix. The walkthroughs were run into a private directory (cwd in the scratchpad) because another process was rewriting artifacts/walkthroughs/asthma-looks-safe/ at the same minute (a third walk at 14:42:32Z, option 2, deleted my first run's frames mid-copy).

The two questions in the brief, answered from the artifact:
- **Do the grid rows read clearly? Yes.** "Died:" with the asthma/others key, then two rows "Old rule 2/50 12/150" and "Model decides 10/50 12/150". The active row is bold and its button is tinted; the inactive row goes grey. I could read 2/50 as 4% and 10/50 as 20% without help, and the unchanged 12/150 for others told me the model's choice only changed things for asthma.
- **Does the in-picture tag read clearly? Yes.** After "Model's view", the grid splits into a purple-boxed column tagged "Intensive care" (the 50 asthma dots) and a block tagged "Ward"; after "Model decides" the box goes and the tag reads "Ward: all". Purple-on-grey contrast of "Intensive care" is lighter than the rest but legible on the phone frame. The dead dots (black) visibly multiply inside the asthma columns.

1. **Where understanding first broke.** At step 1, on the line under the "Model's view" button: "Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%." It sits right under "Safest: asthma 4%, others 8%" and inside what the button calls the model's view. So I read it as something the model knows. Then the model ranks asthma safest and sends them to the ward anyway, and the reveal says "The model saw the outcome, not the reason". If the model's view shows a 20% ward risk, it did see the reason. That is the lesson's central claim, and the screen seems to contradict it. A beginner can come away with "the model was careless" rather than "the model could not know". Second, smaller effect: the 20% appears before I press "Model decides", so step 2 only confirms a number I have already read (this is after commit, so the prediction is not spoiled).
2. **What the prediction felt like.** Easy, for the wrong reason. The question says every asthma patient went to intensive care and "Now the model sends low-risk patients to the ward". Without knowing anything about models, "less care, more deaths" gives "Rises above 4%". The trap the hook sets up ("asthma patients die less") does not reach the question, because the question has already told me the low death rate came with intensive care. With option 0 ("Stays about 4%"), the "Not quite" reveal answers why it rose (the care was hiding the risk), and that works. With option 1 ("Rises"), "Your prediction held" taught me nothing I had not reasoned from common sense. I did not walk "Falls below 4%".
3. **Whether the reveal answered the question I actually had.** Mostly. My question after step 2 was "why did the model think asthma was safe if it could see the 20%?" The reveal's answer ("saw the outcome, not the reason") is the right idea, but it collides with finding 1. The closing line ("answers 'who did badly before?', not 'what happens if we change what we do?'") is clear and I could repeat it.

Blocking finding (owner: the AI domain's category manager, via the lesson builder): the "Ward risk: asthma 20%…" line is labelled, by position and by the button, as the model's view. It should read as the hidden truth the model does not have (for example, shown only after "Model decides", or tagged as not seen by the model). As it stands it contradicts the reveal.

Notes (do not block):
- The prediction is answerable by common sense alone (finding 2). Consider whether the question can ask what the model will do, or what the records predict, before saying the model removes intensive care.
- The trust link reads "3/7 claims checked" on a draft-status lesson.

Verdict reason: the "Model's view" panel shows the 20% ward risk as if the model knew it, which contradicts the reveal's "the model saw the outcome, not the reason" and the lesson's core idea.

## After reading build.md / meta.json

- Not read in this run. Only meta.json `version` (3) and `learner` were read, for the stamp and the boundary. meta.json has another run's uncommitted edits in the main checkout, so this record is **not** linked in evidence.simulatedLearner by this run (listed in the run report for the single writer).
