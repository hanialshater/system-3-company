*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): note-gap-check
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Reconstruct a missing field from a short source note.)
Screenshots seen: yes (artifacts/walkthroughs/note-gap-check/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Cover then reconstruct"; tapped Remove field, Cover, Swap 1↔2, Swap 2↔3, Check; opened reveal.

1. **Where understanding first broke: the "attempt" row is already filled in.** Before I do anything, the brown row under the note holds 627 / B4 / Friday: the three correct answers, just in the wrong order. After Cover, I am not recalling anything. I am sorting tiles I can see into place. "Reconstruct" turns into "unscramble", and a learner who had forgotten the day would still get 3/3.
2. **"Remove field" removes nothing I could notice.** It turns the day box into "?", but "Friday" is still sitting in the attempt row. The hook promises that "a complete-looking page can still lack the detail you need", but no state of this stage ever lacks a detail. The gap the lesson is about never appears.
3. **The prediction is close to free.** "Cover then reconstruct" against "Read the completed note" answers itself from the wording of the question ("tests whether ... are known"). I got it right without any new idea.
4. **The reveal does not answer my question.** I wanted to see a covered value I could not produce. The reveal says "Your reconstruction matches 3 of 3" and calls this a "local completeness check". Nothing went missing, so I never see a gap exposed.
5. Minor: "Local reconstruction", "positions" and "local completeness check" are system words, not words a beginner uses.

Fixes (for the builder):
- Let the attempt start empty, or offer distractor tiles, so a gap shows as a slot the learner cannot fill.
- Make "Remove field" produce a note that looks complete but is missing one value, and have the check expose it.

Verdict reason: the reconstruction is done by reordering the correct answers, which are already on screen, so the lesson never shows a missing detail being found.

## After reading the brief (meta.json)

- The objective is "Reconstruct a missing field from a short source note." On stage there is no missing field to reconstruct: the attempt row supplies the values (finding 1). The objective is not delivered.
- Fix route: demo-builder (an attempt row that starts empty, or a note with a real gap).
