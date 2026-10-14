*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): edges-are-differences
lesson version: v1
boundary: adult-beginner. Knows a pixel row is a list of brightness numbers; does not know that edges are where neighbouring pixels differ, found by sliding a tiny filter (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/edges-are-differences/sheet.png, all 6 frames)
Verdict: launch

## 1. From the artifact

- Hook: "To find an edge in a photo, must a computer first see what is bright and what is dark?" is a real tension. The predict question then asks for arithmetic ("how many of the four answers are not zero?"). A careful learner can work it out before committing, so the prediction tests carefulness more than belief. A learner who holds the "must recognise bright or dark" idea might still pick 4 ("every pixel has a brightness"), so the guess can still be wrong for the right reason. This is a minor gap between hook and question.
- Locked stage: the row, the green [−1 0 +1] window on pixels 1–3, and four "?" answer boxes. Nothing leaks.
- Explore: "Next pixel" moves the window, fills the answer box, and writes the sum on stage ("Pixel 3: 10 − 200 = −190 (a step!)"). "Slide to the end" fills 0, −190, −190, 0. ANSWERS NOT ZERO goes to 2. The bright flat patch (pixel 2) and the dark flat patch (pixel 5) both give 0, side by side. That is the misconception's answer, and it is on stage, not told.
- Swap: "Swap bright and dark" reverses the row and clears the answers. The slider back to pixel 3 then shows +190, +190. The sign flip is seen.
- Reveal: it matches the first pass (0, −190, −190, 0) and points at pixel 2 vs pixel 5. "Convolution" is one sentence of context.
- Minor: at the reveal the stage shows the swapped row ("?, +190, +190, 0", PIXELS DONE 3/4), while the reveal's first sentence quotes the unswapped values. A learner looking up at the stage sees numbers that are not the ones quoted.
- Minor: after Swap, PIXELS DONE drops to 1/4 and ANSWERS NOT ZERO to 0. This can read as "my progress was lost". Saying it restarts the row would help.

## 2. Earlier findings

No earlier learner review in company/reviews/edges-are-differences/. The boundary is taken from meta.json.

## 3. After reading the brief

- The doesNotKnow item ("edges are where neighbouring pixels differ, found by sliding a tiny filter") is on stage: the learner slides the window and watches non-zero appear only at the step. The misconception ("must recognise a bright or dark area first") is answered by two visible zeros, one bright and one dark. That meets "Show the why you promised".
- The objective's 0, −190, −190, 0 is exactly what the stage showed.
- Minors only (arithmetic-style predict, reveal/stage mismatch after swap, progress reset). No FATAL.
