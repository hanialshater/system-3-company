*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: one-link-back-grows-the-core
lesson version: v1
boundary: knows that web links are one-way and the IN / core / OUT bow-tie picture (IN reaches the core, the core reaches OUT); does not know that one new OUT→IN link adds only the pages on the loop it closes, and expects it to pull all of IN and OUT into the core.
Screenshots seen: yes (artifacts/walkthroughs/one-link-back-grows-the-core/sheet.png, recorded 2026-10-22T11:43:31.506Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere that blocks. The question defines the core in plain words ("pages A to D can each click their way to every other"), and the stage labels IN, CORE and OUT. Every arrow I traced in the screenshot matches the reveal: A→B, B→C, C→D, D→A, E→A, F→E, G→B, C→H, H→I, D→J. The loop F → E → A → B → C → H → I → F uses only drawn arrows plus the new one, and so does J → G → B → C → D → J. The counts 8, 6, 10 and 4 agree with the readout, the fills and the chip ticks.
2. What the prediction felt like: a real choice. 10 is the misconception ("one back link joins everything"), 5 tempts a learner who thinks only F joins, and 8 needs tracing. Because the graph sits on screen before locking, a careful learner can trace it, which is fine for a prediction. I chose 5 and was wrong in an instructive way: the first chip immediately showed E, H and I filling as well.
3. Whether the reveal answered my question: yes. My question after tapping was "why E, H and I but not G and J?". The reveal answers it directly (G can't be reached from the core; J can't click back) and states the rule. The stage returns to the question's case (I → F, core 8) at the reveal, so the text and the picture agree. "A toy web, not to scale" is present.

Notes (not blocking):
- No legend says that a filled node means "in the core". The readout and the explore panel ("Watch which pages fill") make it clear enough, but a one-word key would remove any doubt.
- In 06-reveal, node G is drawn with a dark fill and a heavier ring than J, while in 02-step-1 (the same I → F state) G looks the same as J. It reads as a stray highlight. It could suggest G is special. Required: G and J drawn alike whenever both are outside the core.
- "One back link adds only the pages on the loop it closes" is exactly right for this stage, which has one loop per link. In a general graph a link can close several loops. The trust sheet's claim c2 words this more carefully ("the pages v reaches that also reach u"). Acceptable for a toy, but the fact-checker should confirm the reveal sentence is scoped to the stage.
- The locked stage shows "None" as the active chip before any exploring, which is consistent with "core: 4 pages" but reads a little odd as a starting state. Not a problem.

Verdict reason: no finding blocks a first-time learner at this boundary; the prediction is a real surprise, the explore shows each case, and the reveal explains the exact pages that join and why the others stay out.

## After reading build.md / meta.json

- Read only meta.json `version` (1), after the findings above were written, to stamp this review. Did not read build.md or design.md.
