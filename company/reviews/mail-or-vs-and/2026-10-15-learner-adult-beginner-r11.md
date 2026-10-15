*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): mail-or-vs-and
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish union and intersection in a message filter.)
Screenshots seen: yes (artifacts/walkthroughs/mail-or-vs-and/sheet.png, recorded 2026-10-15T21:35:56.908Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "OR"; tapped Use OR, Use AND; opened reveal.

1. **Where understanding first broke: the two conditions are never stated.** The question asks which includes "every match to either condition", but the stage never says what the conditions are. I had to infer from the results that they were "from Ana" and "is a PDF" (OR gave Ana PDF, Ana TXT, Bo PDF; AND gave Ana PDF). The title "Either sender or both fields" did not help.
2. **What the prediction felt like.** Given away. The hook says "OR broadens a set; AND requires both conditions", and the question's "either" is the definition of OR.
3. **Whether the reveal answered my question.** It restates the hook. "The current result reports 1 matches" is ungrammatical. The real beginner trap with mail search (everyday "and" meaning "and also these", so people type AND when they want both senders) is not touched.
4. The tapped button does not look selected (after "Use OR", "Use AND" is highlighted).

Verdict reason: the hook and question define the answer and the stage never names the two conditions; state the query on stage and ask about the everyday-"and" trap.

## After reading the brief (meta.json)

- doesNotKnow "distinguish union and intersection in a message filter" is told in the hook. The conditions are unnamed on stage.
- Fix route: demo-builder (name both conditions and show the query; a prediction about result counts).
