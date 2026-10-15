*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): equal-names-not-equal-files
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare content identifiers instead of only names.)
Screenshots seen: yes (artifacts/walkthroughs/equal-names-not-equal-files/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Content identifier"; tapped Group names, Group content; opened reveal.

1. **The prediction is a giveaway.** Hook: "Identical filenames do not establish duplicate contents." Question: "Which comparison distinguishes the two report files? Content identifier / Filename alone." The two report files have the same name, so "filename alone" cannot distinguish them by definition.
2. **Where it first broke: both buttons said 2.** Group names gave "Name groups 2" (report.txt twice, copy.txt). Group content gave "Content groups 2" (A twice, B). Same number, and the list did not regroup, highlight or colour anything. I could not see which files were grouped together either time, so the two operations looked identical.
3. **The interesting case is hidden in plain sight.** copy.txt has the same content as the first report.txt: a different name, same contents. That is the mirror case and the more useful one for a person cleaning up files. Nothing on stage points to it.
4. **"Content identifier" is unexplained.** The letters A and B at the right of each row are the content. A beginner does not know that a real computer can tell this (by a checksum or by comparing the files); the reveal says "not a real cryptographic hash", which introduces a term only to say it does not apply.
5. **Reveal versus my question.** My question: "how do I check if two files with the same name are really the same?" The reveal says names can collide and stops. No practical way to compare is offered (size, date, opening both, a duplicate finder).

Fixes (for the builder):
- After each grouping, visibly cluster or colour the rows so the learner sees report.txt + report.txt (by name) versus report.txt + copy.txt (by content).
- Ask a question with a real wrong answer: "Which two files are duplicates?" with the two report.txt files as the tempting choice.

Verdict reason: both grouping operations show the same count with no visible grouping, so the learner cannot see what content comparison found, and the prediction is answered by the hook.

## After reading the brief (meta.json)

- Objective: 'Compare content identifiers instead of only names.' The stage has both operations, but both report 2 and nothing regroups (finding 2), so the comparison is not visible.
- Misconception field is 'Filename alone', the foil label.
- Fix route: demo-builder.
