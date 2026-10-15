*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): cue-needs-a-boundary
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know to attach context to an ambiguous retrieval cue)
Screenshots seen: yes (artifacts/walkthroughs/cue-needs-a-boundary/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "1: the one you meant"; tapped A · Capital?, B · Kenya's capital?, Swap 1↔2, Swap 2↔3; opened reveal.

1. **Where understanding first broke: B, then the swaps.** Pressing "B · Kenya's capital?" turns all three target cards into "Japan / Kenya / Peru" and marks my attempt "Match 0/3". I expected one card to say "Kenya's capital?" and fit only Nairobi. Instead I got a matching puzzle (put Tokyo, Nairobi, Lima in the target's order) that has nothing to do with whether a cue is specific. "Answers this cue fits: 1" says the idea in the table, but the stage shows a three-country ordering task. The swaps then teach me to copy an order.
2. **What the prediction felt like.** Fair as a question ("how many answers fit 'Capital?'"), and "1: the one you meant" is a real belief. But the locked stage already shows three cards each reading "capital?" above Tokyo, Nairobi and Lima, so the answer "3" is in the picture before I commit.
3. **The trust sheet shows a DISPUTED claim** (the "seen" claim, about what the table and first reveal sentence say). A learner who taps "Why trust this?" sees "4/5 claims checked" and a disputed line.
4. **Did the reveal answer my question?** "'Capital?' fits all three notes, so it cannot tell you which one to recall. 'Kenya's capital?' fits one." That is clear and right. The flashcard habit (write the boundary into the cue) comes through in the reveal, not in what I did.

Verdict reason: the explore is a card-ordering task (B relabels all three cards and scores my order 0/3), not a test of how many answers a cue fits, so the hands-on part doesn't exercise the idea; the locked stage also shows the answer.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("attach context to an ambiguous retrieval cue") is delivered by the reveal's sentence. The explore (an ordering puzzle inherited from the sequence template) doesn't exercise it (finding 1).
- Misconception ("a short cue like 'Capital?' points to the fact you had in mind") is the "1: the one you meant" option, which is a good trap.
- The "seen" claim is "disputed" in meta.json and shows as such on the trust sheet. Fact-checker / demo-builder own it before publish.
- Recall (Nile, Amazon, Danube: which cue has exactly one answer) is a good transfer test. A stage where the learner picks or edits a cue and watches "answers this cue fits" drop from 3 to 1 would match it. Owner: demo-builder.
