*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): one-odd-loop-blocks-two-camps
lesson version: v2
boundary: knows "two camps = friends inside, enemies across"; does not know that a network with missing links splits into two camps exactly when every loop has an even number of enemy links (meta.json learner field; same mind as r6).
Screenshots seen: yes (artifacts/walkthroughs/one-odd-loop-blocks-two-camps/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Title "Two camps on a ring of six?" and hook "Two enemy links on a ring of six, plus one cross link. Can two camps form?" are neutral. The stem states the rule. The legend "Green solid: friends · red dashes: enemies" is on the locked stage, the readouts are "?", and nothing leaks. "Yes" is the natural guess (the ring's 2 is even, so it looks fine), and I took it. "Can't tell from the loops" is an odd third option, but harmless.
- Explore: "Big ring" highlights the hexagon and tints each node by camp (filled vs dotted), switching at each red link. A comes back in the same camp ("2, even"). "Right loop" and "Left loop" each show "1 enemy link ... back at A in the other camp: clash", with A drawn with a red dotted ring. That is the mechanism on the stage: the camp flips at each enemy link and comes back wrong. "Try all 64 splits" gives "0 of 64 ... Best try (filled vs dotted camps) still breaks 1 link (thick)". "Enemy on C-D" gives "0, even" and "2 of 64 work: one split, names swapped". The trace row keeps every count.
- Reveal: 2 even, right 1 / left 1, 0 of 64 and 2 of 64 all match the stage and survive in the trace row. It ends on the general rule.
- Minor findings, not blocking:
  1. In the C-D case only the left loop was walked (trace: "left loop 0"). "Every loop was even" also covers the right loop (2) and the big ring (2), which I could count by eye but never walked.
  2. The reveal stage is scrolled so the top of the graph (A, B) is cut off.
  3. The walk is a static tint, not a stepped token. It reads, but a beginner may not see the *order* of the switches.

## 2. Earlier findings (r6, on v1)

1. The switch-per-enemy-link mechanism was told, not shown: **fixed** (camp tints along the highlighted loop, and the clash ring on A).
2. No legend, and the best-try colouring unlabelled: **fixed** (legend, "filled vs dotted camps", thick broken link).
3. Title leaned toward "No": **fixed**.
4. Graph cropped at the top over the reveal: **not fixed** (minor 2).

## 3. After reading the brief

- The doesNotKnow item ("splits into two camps exactly when every loop has an even number of enemy links") is shown by the odd/even loop walks, the 0/64 vs 2/64 contrast, and the move to C-D. The "exactly when" generalisation is one told sentence at the end, which is fine.
