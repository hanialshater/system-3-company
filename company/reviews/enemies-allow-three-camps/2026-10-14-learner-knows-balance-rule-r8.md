*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): enemies-allow-three-camps
lesson version: v5 (meta.json version 5)
boundary: knows-balance-rule. Knows the balance rule from enemy-of-my-enemy (at most two camps); does not know that if an all-enemy triangle is allowed, the network can split into any number of camps (meta.json learner field, same tag as r6/r7).
Screenshots seen: yes (artifacts/walkthroughs/enemies-allow-three-camps/sheet.png, build 5, 8 frames)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("0").

1. **No answer before the commit: met.** Options 0 / 6 / 13 are bare numbers; 6 (the all-enemy count) is a good trap. Locked stage: hexagon, "Banned: two friendly links, one hostile.", readouts "?", Camps "3" selected (the question's case). The title is now "Three camps, one rule: what breaks?" (r7 lean toward "three sides is fine" softened).
2. **Shows the why: met.** "Next triangle" highlights A, B, C with "B and C are both A's friends, so same camp, so friends. Allowed." ALL ENEMIES varies (6 / 20 / 0) while BANNED stays 0 across 3, 6 and 2 camps; "B–D friends" turns 4 triangles red. Each part of the idea has a state.
3. **The reveal quotes what I saw: met (r7 top finding fixed).** The Seen rows now record banned and all-enemies per setting ("3 camps 0, 6 · 6 camps 0, 20 · 2 camps 0, 0" and "B–D friends, 2 camps: 4 banned, e.g. A, B, D"), and they are on screen in the reveal frame. "6 are all enemies" is now backed by a visible row, not contradicted by the live 0.
4. **Fit fails.** The reveal is 113 words (> 90 on a new version, v5). In 08-reveal the hexagon is scrolled off: only a sliver of node D shows above the rule line. The reveal points at "in A, B, C, B and C are both A's friends" and "4 triangles turned banned, such as A, B, D", i.e. at the red triangles in the picture, which are not visible. The Seen row carries the count but not the picture.
5. **Stage text budget.** At step 6 the stage carries the rule line, the caption, three readouts and two Seen rows, about 45 words (> 25). The Seen rows are what make the reveal honest; folding them into the picture or readouts would help fit and budget together.
6. Minor: the Seen row notation "(banned, all enemies): 3 camps 0, 6" is terse; I had to read it twice to know which number is which. "The strict rule" in the reveal names a rule the stage never calls strict.
7. Labels: picture labels are readable during explore; at reveal the picture is off screen, so the W-287 kit shrink could not be judged. The locked frame draws the hexagon small (node letters ~5 px), the same kit pattern seen on other lessons.

Where understanding first broke: at "The all-enemy triangle is what the strict rule forbids". With my boundary I know the balance rule, but nothing on the stage is called "the strict rule", so I had to infer it is the enemy-of-my-enemy rule I came in with.

## After reading build.md (Pre-flight v5)

v5 is text-only (c5 wording); v4 added the Seen rows. The builder flags the "strict rule" naming as an open question for the learning designer; my finding 6 agrees. No Pre-flight 7 (phone fit) answer.

**Top finding (revise, reveal fits with its picture):** reveal 113 words on v5 (> 90), and at 390×844 the hexagon with the red banned triangles is off screen while the reveal points at A, B, C and "such as A, B, D". Cut told context (category manager picks) and fold stage text (Seen rows, caption) so the hexagon top and the reveal's last line are both on screen. Kit label shrink (locked frame) is W-287.

| r7 finding | Status |
|---|---|
| Top: "6 are all enemies" contradicted by live ALL ENEMIES 0 | fixed (Seen row records 3 camps 0, 6; visible at reveal) |
| Hexagon with red triangles off screen at reveal | not fixed (now the top finding) |
| Title/hook lean toward "three sides is fine" | softened (new title) |
