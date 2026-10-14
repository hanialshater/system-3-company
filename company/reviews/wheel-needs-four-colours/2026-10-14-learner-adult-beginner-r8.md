*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): wheel-needs-four-colours
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows backtracking tries a choice and undoes it on a dead end; does not know that a hub linked to an odd ring of regions cannot be coloured with three colours)
Screenshots seen: yes (artifacts/walkthroughs/wheel-needs-four-colours/sheet.png and 15-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "2"; Run backtracking (ring of 5, 3 colours: 6 dead ends, region 5 red-outlined "no colour left"); 4 colours (done, 4 used); Ring of 4 (done, 3 used); picked regions C, 1, 2, 3, 4; tapped red, blue, yellow, purple; Undo; opened reveal.

1. **The dead end is shown well.** Frame 02: region 5 is white with a red outline and "region 5: no colour left", and its neighbours visibly hold red, blue and yellow. The ring of 4 alternating blue/yellow beside it is the even/odd contrast. A learner who guessed 2 sees the centre take one colour and the ring needing more.
2. **No answer before the commit: passes.** The options 2, 3 and 4 are all bare numbers. The locked wheel is uncoloured. "3 colours" and "Ring of 5" are pre-selected, but "4 colours" is not highlighted.
3. **The reveal does not fit with its picture (fatal for the why, so revise).** In 15-reveal the whole wheel is above the card, along with the history line ("5 ring, 3 colours: dead end · ..."). Only the control rows and "COLOURS USED 3 / COLOURED 5/5" are left. The reveal's argument is about the picture ("region 5 ran out: its neighbours held all three", "two colours must alternate round the ring. Five is odd, so the last region meets both"), and the picture is not on screen. The reveal is about 118 words (budget 90). Like the r7 W-267 cases, this one has five rows of controls under the picture, so a text trim alone will probably not clear it.
4. **What is left on the stage at the reveal is the manual ring-of-4 state** (3 used, 5/5 coloured), not the ring of 5 the reveal opens with. Once the picture is back on screen, the ring of 5's dead end is only in the history line.
5. The manual tap path (regions, then colours, then Undo) adds 10 QA steps but no idea. For a learner it is a second activity next to "Run backtracking". Not blocking.

Verdict reason: good stage, but at the reveal the picture the whole explanation points at is entirely off screen.

## After reading build.md (Pre-flight v3) and the r7 review

- r7 gave launch on v2. v3 fixed the disputed c4 record (the ring of four says "done with 3 colours" only when that is true). That matches what I saw ("4 ring: done, 3 used").
- Pre-flight has no item 7. Build note: "Not run: build, QA, walkthrough". At 390x844 the wheel is completely off screen when the reveal opens. That is a new rule (decision 2026-10-14-reveal-fits-with-its-picture) that r7 did not apply. This is a large crop (the wheel plus about five control rows), the W-267 class.
- W-288 (platform) already lists this lesson for hand-checking untagged pointer targets in a shrunk svg. That is unrelated to my finding, but the same picture.

Fix route: demo-builder, with a design-lead review because it needs a compact stage (for example, colour chips inside the picture, region picks by tapping the wheel). The reveal must be 90 words or fewer, the wheel and region 5 must be on screen at the reveal, and the crop must be 0.
