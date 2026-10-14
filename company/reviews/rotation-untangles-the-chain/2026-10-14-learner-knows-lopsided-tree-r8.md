*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): rotation-untangles-the-chain
lesson version: v3 (meta.json version 3)
boundary: knows-lopsided-tree. Knows insert order shapes a search tree (lopsided-tree); does not know that a tree can fix itself with a local rotation and stay in order (meta.json learner field, same tag as r6/r7).
Screenshots seen: yes (artifacts/walkthroughs/rotation-untangles-the-chain/sheet.png, build 5, 6 frames; 06-reveal.png opened at full size)
Verdict: launch with notes

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("7 levels").

1. **No answer before the commit: met.** Options "7 levels / 5 levels / 3 levels" share one form. The locked stage shows keys 1–2, the rule line and "HEIGHT 2 levels", "PLAIN ? / ROTATING ?". Nothing points at 3.
2. **Shows the why: met.** Step 1 (Insert next key) shows the rotation as a state: ghost circles of 1, 2, 3 in their old places, an arrow, 2 lifted above 1 and 3, caption "Key 3 made 1's side too deep: 2 lifted up". The column strip 1–7 under the tree makes "no key left its column" something I can check by eye. Plain vs Rotating toggle gives the 7-level chain against the 3-level tree on one stage.
3. **The reveal quotes what I saw: met.** "stayed 3 levels tall", "chain of 7", "4 rotations" match the readouts on stage at the reveal (HEIGHT 3 levels, ROTATIONS 4, PLAIN 7 levels, ROTATING 3 levels, 4 rot.). "At key 3, you saw 2 rise above 1 and 3" is past tense and matches frame 02. The log₂ sentence is told context outside the gap (one sentence).
4. **Fit: 81 words; nearly fits.** In 06-reveal.png the reveal's last line and the tree, column strip and readouts are on screen. The stage's top caption ("If one side gets two levels deeper, rotate: lift the middle key up.") is cut through its first line, so the stage-top crop is a few px, not 0. Everything the reveal points at is visible. Note for the builder: the picture keeps a large empty band below the 3-level tree (room for the 7-level chain); folding that would remove the crop. Not blocking for me, because nothing the reveal names is hidden, but it is a strict-rule miss the launch reviewer should see.
5. **Labels at the reveal are small (kit, W-287).** Node digits in the shrunk tree and column boxes are about 8 px at full frame size: readable with effort, the ghost "5", "6", "7" barely. Recorded as a kit finding, not a lesson revise.
6. Minor: in frame 05 (after tapping Rotating) the page has scrolled so the root 4 is above the screen; the learner has to scroll back to see the root. Cosmetic.

Where understanding first broke: it didn't, on this path. The one idea a beginner may still not take away is why "two levels deeper" is the trigger; the stage shows it happening, and the reveal does not need more.

## After reading build.md (Pre-flight v3)

v3 fixed a Plain-first path that locked out the first-rotation milestone (W-235). The DOM-order path is unchanged and is the one walked here. No phone-fit item (Pre-flight 7) is recorded; the screenshot above stands in for it. Nothing in build.md changes my findings.

**Top finding (launch with notes):** the lesson shows the rotation and the preserved order, and the reveal quotes the stage. Notes: stage-top caption cut by a few px at reveal (fold the empty band under the tree); reveal-time label shrink is kit W-287.

| r7 finding | Status |
|---|---|
| r7 verdict launch | holds; no regression in build 5 apart from the kit's label shrink |
