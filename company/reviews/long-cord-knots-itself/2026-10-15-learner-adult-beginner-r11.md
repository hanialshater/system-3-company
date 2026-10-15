*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): long-cord-knots-itself
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The experiment used a 30cm box, one revolution per second and ten seconds of tumbling. Its short strings had no observed knots; three-metre strings knotted in 55% of the reported trials. The stage samples those observed frequencies with seed 17.)
Screenshots seen: yes (artifacts/walkthroughs/long-cord-knots-itself/sheet.png, recorded 2026-10-15T21:35:30.559Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "0.3m string" (wrong); tapped Test 0.3m, Test 3m; opened reveal.

1. **Where understanding first broke: "the paper".** The hook and question say "In the paper's setup", but no paper is named before the reveal and the stage footer reads "30cm box · 1rev/s · 10s · seed17 · p=0/0.55". I do not know what the paper is, what "seed17" means, or what "p=0/0.55" is. The setup only becomes clear in the reveal.
2. **What the prediction felt like.** Given away. The title "Long cord, more loops" answers it. Without the title it is a fair question.
3. **Whether the reveal answered my question.** Partly. The plain sentence ("short strings had no observed knots; three-metre strings knotted in 55% of trials") is the answer. But "study-conditioned model draws" and "samples those observed frequencies with seed 17" are researcher language; I could not tell whether the 13/20 on stage were real trials or made-up dice rolls. "Plain cord; storage only" reads like a disclaimer with nothing attached to it.
4. Picture: the grid of 20 strings, knotted vs unknotted, is clear and the best part.

Verdict reason: the title gives the answer and the stage and reveal lean on "seed", "p=" and "study-conditioned model draws"; name the experiment in plain words (who, what box, how long) and say the 20 strings are a simulation of its 55%.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, including "samples ... with seed 17", which is not something a learner needs to know. Route to the category manager.
- Trust sheet c3 ("Bernoulli draws ... p=0 and p=0.55, fixed seed17") confirms the stage is a simulation; the stage should say so in plain words. Fix route: demo-builder (title, footer wording, name the experiment).
