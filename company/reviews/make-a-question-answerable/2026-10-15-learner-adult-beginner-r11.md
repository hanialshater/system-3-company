*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): make-a-question-answerable
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Specify the decision and the requested response.)
Screenshots seen: yes (artifacts/walkthroughs/make-a-question-answerable/sheet.png, recorded 2026-10-15T21:36:07.387Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Choose A or B"; tapped Add Choice, Add Reply; opened reveal.

1. **Where understanding first broke: the stage is a form, not a message.** I fill "Object: proposal, Choice: A/B, Reply: Friday" by tapping. I never see the two messages side by side ("What do you think?" vs "Can you choose A or B for the proposal by Friday?"), or what reply each one gets. The "Reply: Friday" field appears without explanation; I guessed it means a deadline.
2. **What the prediction felt like.** None. Two options, and the hook ("'What do you think?' can ask for almost anything") rules one out.
3. **Whether the reveal answered my question.** It gives a score ("3 of 3 checklist fields") and a sentence on bounded responses. The interesting claim, that an open question gets slower or vaguer replies, is not shown or supported on stage.

Verdict reason: the prediction cannot be got wrong and the stage is a checklist rather than the two requests and their replies; show the messages and ask which one gets a decision back.

## After reading the brief (meta.json)

- doesNotKnow "specify the decision and the requested response": the checklist names the parts (choice, reply-by) but the learner never sees a request change or a reply.
- Fix route: demo-builder (two messages and their replies); category manager (whether the claim about reply quality needs a source).
