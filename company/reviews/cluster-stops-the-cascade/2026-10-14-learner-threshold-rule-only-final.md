# Learner review (final): cluster-stops-the-cascade (knows the threshold rule only)

date: 2026-10-14 - reviewer: learner-evaluator (borrowed mind: knows "join once at least half your friends have", fractions; not that network shape stops a cascade) - version: walkthrough at c9e4df0d, phone, option 0 ("Many more people adopting first", a wrong pick).
Screenshots seen: yes (sheet.png all 18 frames; 14-step-13.png and 18-reveal.png in full). Hypotheses only.

**Verdict for the current version: launch with notes.**

## 1. Findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** a tight group whose members have most of their friends inside it cannot be entered from outside, so a cascade stops there.

- **Answer visible before predicting?** Only by option shape. The stem now states the stall (8 of 12) and the options are "Many more people adopting first / Nothing: those four are out of reach / Two people adopting first, somewhere else". The third option is the only specific, structural one and the hook ("What fixes that?") is neutral. The locked stage has a "Start 8,9" button, which tells a careful reader that the start place matters. No other leak.
- **Option 1 is not clearly wrong.** "Many more people adopting first" is vague. Seeds 0, 1, 8, 9 (two more people, in the group) also reach all 12, and any large enough extra seed set does. The reveal then says "Not more seeds: two in a better place", which is untrue as written: more seeds, including ones inside the group, would also work. A sharp learner who picked option 1 would object that the reveal marked a defensible answer wrong. This is the top finding.
- **What the prediction felt like.** Reasoned, not guessed: the learner sees 0 and 1 stop at 8, so "nothing" and "more" are both plausible. Option 2 ("out of reach") is a good misconception.
- **Explore.** The hint says tap a person, step, then try the other start. On the phone the "Start 8,9 / Start 0,1" buttons are half-cut at the bottom of the stage in every explore frame (14-step-13.png: both labels clipped by the stage edge). That is the control the hint and the whole contrast depend on. The stage in explore frames is taller than its content area; in the reveal frame the buttons are fully shown. This is an explore layout fault, not only the known reveal scaling. A person can still tap the visible top half; a person on a smaller phone may not realise they are buttons. (Hypothesis: it is clipped in the real browser, I see it in the screenshot.)
- **Taps give little.** The script tapped all twelve people (the first 12 steps) before the first Step; each tap shows only a pill and a status line ("3: 0 of 2 friends adopted"). Nothing forces it, but a real learner told to tap a person will, and it earns nothing. The Step and To the end buttons carry the lesson.
- **Told vs shown.** Shown: the stall (8 of 12, round 6), the dashed "holdouts" outline on the four, and the status line "8: 1 of 4 friends adopted; 3 of 4 in the group, so at most 1 (needs 2)". That is the cause (the inside count and the arithmetic) on the stage, and the reveal points at the outline. That meets the 2026-10-14 decision. Told: the last muted line ("a cascade stops exactly at such a group ... with none among the rest, it takes everyone"). "None among the rest" is hard to parse (none of what?). It is a general claim beyond the toy.
- **Reveal quotes only reached states.** Yes, "Person 8 had 1 of 4" only if 8 was tapped at the end; the script did. Round 6, 8 of 12, and 12 of 12 from 8,9 were all visited.
- **Other branches.** Pick option 2 or 1 gets the same "Not quite" body; option 2 ("out of reach") is never answered by name, though "none can join first" covers it. Correct pick gets "Your prediction held" with the same body.
- **Misconception risk.** "Started at 8 and 9, the same two seeds reached all 12" can read as "seed the cluster". The muted closing line is the only guard.

**Top remaining finding:** option 1 is not actually wrong, and the reveal's "Not more seeds" is false as stated (adding 8 and 9 to the seeds also reaches all 12); plus the Start buttons are clipped in the explore frames.

## 2. Compared with meta.json (after section 1)

doesNotKnow (cluster-density condition) is on the stage as the outline, the inside count and the status arithmetic. The objective's "so none can be the first to join" is stated in the reveal and backed by the "needs 2" line. The misconception (too few seeds / too weak) is in option 1 and the hook is now neutral, but the option is defensible, which weakens the confrontation.

## 3. Earlier findings (previous review, then build.md)

- Reveal skipped inside-count to adopted-count: **fixed** (status line plus "at most 1 of 4, under half").
- Pill "1/4" unexplained: **fixed** by the status line text.
- Hook "too few fans" leaked: **fixed**.
- Prediction was a pure calculation: **improved** (the stem gives 8 of 12, so the pick is about remedy).
- 12 taps for nothing: **not fixed**.
- "Inside" count not shown before the end: **fixed** (shown on 8 after the final).
