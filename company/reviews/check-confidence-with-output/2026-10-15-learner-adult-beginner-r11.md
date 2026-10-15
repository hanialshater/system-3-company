*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: check-confidence-with-output
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: reading short labels and comparing simple counts. Does not know: Compare felt familiarity with a scored local reconstruction.. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/check-confidence-with-output/sheet.png, recorded 2026-10-15T10:09:59.296Z, build c0cfd14 served on localhost:3590)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: on the predict screen. The question asks "Before checking it, how many places do you know are right?", but the stage already shows the studied order (1 map, 2 key, 3 route) right above my attempt (route, map, key). Before any check I can see all three are wrong. "Unknown until checked" is false on the screen it is asked on. The studied row is covered only after pressing A.
2. What the prediction felt like: a wording puzzle. "Know" in the question does the work, so "Unknown until checked" is the clever answer rather than a belief I held. With the answer key visible, the honest answer is "0 of 3", which is not an option.
3. Whether the reveal answered my question: no. The reveal reads back the table ("Feels familiar: match not checked. Check it: match 0/3. Yours: match 3/3.") and adds that a single attempt "cannot estimate future retention or general ability". It does not say why feeling sure misled me (familiarity is not recall). "Yours: 3/3" came from swapping tiles while the answer was on screen, which is copying, not recalling. The reveal treats it as a result.

Verdict reason: the predict stage shows the studied order beside the attempt, so the learner can see 0/3 before choosing, which contradicts the correct answer "Unknown until checked". Cover the studied order until B is pressed.

## After reading build.md / meta.json

- r9 found that the target was fully visible during predict, so the covered recall was of something seen five seconds earlier. The same issue remains, and it is sharper now: the new question ("Before checking it, how many places do you know are right?") is contradicted by the visible studied order. The fact-check rewording (W-844) changed only the recall "why", which I did not see in the walkthrough; it does not touch this.
- r9's "feeling familiar is never on the stage" is partly fixed: A now covers the studied order and shows "not checked".
