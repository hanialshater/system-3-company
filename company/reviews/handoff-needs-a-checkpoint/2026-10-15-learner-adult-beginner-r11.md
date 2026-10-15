*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): handoff-needs-a-checkpoint
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Record the current artifact, completed step and next check.)
Screenshots seen: yes (artifacts/walkthroughs/handoff-needs-a-checkpoint/sheet.png, recorded 2026-10-15T21:33:03.125Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Artifact and next check"; tapped Add Finished; tapped Add Next; opened reveal.

1. **No real prediction.** The hook says "almost done" lacks a place to resume, then asks which handoff identifies a restart point, with "Almost done" as the only other option. Nobody would pick it.
2. **Where understanding first broke: I never see the "almost done" note fail.** The stage only fills in a checklist (1/3 -> 3/3). There is no moment where I try to resume from "almost done" and get stuck, so the contrast the lesson names is never shown.
3. **Explore is filling a form.** The two buttons add canned values ("outline", "sources"). Nothing I do can go wrong, so nothing is learned from doing it.
4. **The reveal restates the checklist.** "Your note contains 3 of 3 checklist fields" is a score; "It gives a specific restart point while leaving responsibility for verification explicit" is vague ("responsibility for verification" did not mean anything to me).
5. Clean, readable layout; no factual risk.

Verdict reason: the hook and the options give the answer away, and the stage never shows the "almost done" handoff failing to give a restart point.

## After reading the brief (meta.json)

- Objective "record the current artifact, completed step and next check" is shown as a checklist, but the contrast with "almost done" is never on stage (finding 2).
- Fix route: demo-builder (show a resume attempt from "almost done" vs from the checklist; make the wrong option tempting).
