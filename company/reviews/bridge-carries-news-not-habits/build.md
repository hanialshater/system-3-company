# Build note: bridge-carries-news-not-habits

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 4

- Intent: one hand-drawn graph, two pentagons (complete groups of 5) joined by one thick bridge link, person 4 to Ben. Two rule rows, each with Step and Run and its own running count: "Habit: needs half" and "News: needs one". The graph shows the rule last pressed (habit = domain fill, news = green fill; newest joiners outlined). Ben carries a live badge "k of 5 friends" (red while he is out).
- Key states (milestones, minInteractions 2): habit stuck (a round adds nobody) and news across (all 10 heard). QA path in DOM order: habit Step, habit Run (stuck), news Step, news Run (all 10). Step/Run disable when their spread is finished, so no dead presses.
- Show the why: the cause in doesNotKnow ("across a bridge you have only one friend") is Ben's badge, 1 of 5, on the stage at the moment the habit stops; the reveal points at it.
- Rounds are simultaneous (everyone checks friends at the same time). q = 1/2 means at least half (2 of 4 joins, 2 of 5 does not).
- Re-run (own code, node 2026-10-14, then the Demo's own functions via a transpile-only harness): habit rounds [2,3], [4], [] -> group A, 5 people, in 2 rounds, round 3 stuck; Ben 1 of 5 (20%). News rounds [2,3,4], [5], [6,7,8,9] -> all 10 in 3 rounds. Matches the brief.
- Not run: next build, typecheck, QA, walkthrough (out of this batch's scope). Status stays draft until local QA.
- Brief notes: the brief says build after news-comes-from-acquaintances, cluster-stops-the-cascade and one-shy-rioter-stops-the-riot; none are on this branch, so the learner.knows ("weak ties bring news", "the half rule") is not yet backed by a lesson in the feed. The brief's `also: probability:independence` looks unrelated to the mechanism; copied as written, for the category manager to confirm.
