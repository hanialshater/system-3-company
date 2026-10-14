# Build note: bridge-carries-news-not-habits

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 4

- Intent: one hand-drawn graph, two pentagons (complete groups of 5) joined by one thick bridge link, person 4 to Ben. Two rule rows, each with Step and Run and its own running count: "Habit: needs half" and "News: needs one". The graph shows the rule last pressed (habit = domain fill, news = green fill; newest joiners outlined). Ben carries a live badge "k of 5 friends" (red while he is out).
- Key states (milestones, minInteractions 2): habit stuck (a round adds nobody) and news across (all 10 heard). QA path in DOM order: habit Step, habit Run (stuck), news Step, news Run (all 10). Step/Run disable when their spread is finished, so no dead presses.
- Show the why: the cause in doesNotKnow ("across a bridge you have only one friend") is Ben's badge, 1 of 5, on the stage at the moment the habit stops; the reveal points at it.
- Rounds are simultaneous (everyone checks friends at the same time). q = 1/2 means at least half (2 of 4 joins, 2 of 5 does not).
- Re-run (own code, node 2026-10-14, then the Demo's own functions via a transpile-only harness): habit rounds [2,3], [4], [] -> group A, 5 people, in 2 rounds, round 3 stuck; Ben 1 of 5 (20%). News rounds [2,3,4], [5], [6,7,8,9] -> all 10 in 3 rounds. Matches the brief.
- Not run: next build, typecheck, QA, walkthrough (out of this batch's scope). Status stays draft until local QA.
- Brief notes: the brief says build after news-comes-from-acquaintances, cluster-stops-the-cascade and one-shy-rioter-stops-the-riot; none are on this branch, so the learner.knows ("weak ties bring news", "the half rule") is not yet backed by a lesson in the feed. The brief's `also: probability:independence` looks unrelated to the mechanism; copied as written, for the category manager to confirm.

## Pre-flight v3 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

W-236, c5 (disputed). The Centola & Macy sentence rested on sources nobody here could open.
- The sentence is dropped from the reveal, which now ends "... too little for a habit that needs several friends." The c5 claim is deleted from meta.json.
- No mechanics changed. Not run: build, QA, walkthrough.

## v4 (demo-builder, 2026-10-14): learner r8 (W-322), habit trace on the stage

Problem: the reveal quotes "Ben had 1 of his 5 friends adopting", but after the news run (the DOM-order path) the picture shows the news end state (Ben "5 of 5 friends"); the habit's 1 of 5 had no trace.
Change: once the habit is stuck, its row reads "Habit stuck: 5/10" with a red second line "Ben 1 of 5 friends" (computed from the habit run's own state, `adoptingFriends(BEN, runs.habit.on)`), so it stays on the stage whatever the picture shows. Reveal text unchanged. c2 reopened (it now names the trace). Version 3 → 4. Not done: the r8 minor (the "k of 5 friends" badge sits between the two bridge nodes) and the note on the title's contrast.

## Pre-flight v4

1. Title and hook: "News crosses the bridge. Does a habit?" / "One link joins two friend groups. Gossip gets across. Will a new habit follow it?" The contrast leans to "no" (r8 note); none of the three options is named.
2. Options: "Yes, all of B" / "Only Ben" / "No one in B": same precision, none numbered.
3. Locked stage: two groups, two starters in A, "Make a prediction to start.", no badge, no counts.
4. Reveal values: 5 people and 2 rounds (habit milestone; row "Habit stuck: 5/10"); Ben 1 of 5, 20% (habit milestone; row trace "Ben 1 of 5 friends"); all 10 in 3 rounds (news milestone; caption "News, round 3: all 10 heard." and row "10/10").
5. QA path: habit Step, habit Run (stuck), news Step, news Run (all 10): both milestones in 4 presses. Every quoted state is on the stage at the reveal (habit row trace, news row and caption).
6. Reset: no Reset control. Reveal after the QA path: "You watched the habit fill group A (5 people) in 2 rounds and then stop. Ben had 1 of his 5 friends adopting, which is 20%, short of half. Nobody else in group B had any. / The news crossed the same link and reached all 10 in 3 rounds, because it needs only one friend. / A bridge gives you exactly one friend on the far side: enough for news, too little for a habit that needs several friends."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 bridge-carries-news-not-habits`, dev server): crop 0 px (0 before), hiddenBelow 0, namedHidden 0, phoneFit true; stage 323 px, reveal 232 px, window 594 px. Reveal 78 words (tool count 86 includes the verdict line). Smallest picture label "5 of 5 friends" at 10.4 px rendered; group and Ben labels 11.3 px. Graph, both rows and the "Ben 1 of 5 friends" trace are on screen with the reveal's last line.
