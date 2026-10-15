*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): size-is-not-recency
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Choose sorting metadata that matches the retrieval goal.)
Screenshots seen: yes (artifacts/walkthroughs/size-is-not-recency/sheet.png, recorded 2026-10-15T21:33, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Modified day"; tapped Sort size, then Sort day; opened reveal.

1. **The prediction gives itself away.** The question asks for the "latest" file and the stage already says "d = day modified; higher = more recent". Picking "Modified day" needs no thought. The trap the title names (assuming the big file is the newest one) is never offered as an option, so nobody gets to fall into it.
2. **Where understanding first broke: the readout.** Both sorts show "Order 3", and the reveal says "The current result reports 3 order". I cannot tell what "Order 3" measures; it does not change between the two sorts, so it reads like a broken counter.
3. **The button state looks reversed.** After I tapped "Sort size", the "Sort day" button looked raised and white while "Sort size" was greyed. I could not tell which sort I was looking at without reading the list.
4. **Does the reveal answer my question ("which file is the latest?")?** No. It never says "notes (day 9) is the latest, and it is the smallest file". The list does show it at the top after Sort day, but the reveal talks about "the most prominent-looking file" without naming it.

Fixes (for the builder):
- Ask a question the size sort could answer wrongly, for example "Which file did you work on most recently?" with "the biggest one" as an option.
- Replace "Order 3" with what matters ("Top of list: notes, day 9").
- Name the answer in the reveal: the newest file is the smallest one here.
- Make the selected sort button look selected.

Verdict reason: the reveal never names the latest file and its only readout ("3 order") means nothing to me, so the size-versus-date contrast is shown in the list but not said.

## After reading meta.json

- Objective "choose sorting metadata that matches the retrieval goal" is the right idea; the misconception field is just "Size", which is the belief the stage never lets me hold (finding 1).
- Fix route: demo-builder (question, readout, reveal naming the answer, button state).
