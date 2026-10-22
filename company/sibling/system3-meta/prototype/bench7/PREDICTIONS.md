# Benchmark 7: predictions, committed before any run

owner: vp-meta · date: 2026-10-22 · scored by `setup.mjs tally` and `setup.mjs audit`, with the measures defined in [PROTOCOL.md](PROTOCOL.md) · status: committed, no arm run yet

## The bet

B6 showed that a capable single agent beat Meta's many-stage flow:

| | Meta, relative to the single agent |
|---|---|
| Cost | 2.3× |
| Time | 2.7× |
| Accuracy | no better |

Most of Meta's cost was cold starts and reviews between every step.

**H** keeps one warm builder per game. It checks its own work inside its loop, and adds only one external evaluation at the end. The bet is that this makes H about as cheap as V and more accurate than V.

**HSI** adds a playbook. The bet is that its accuracy and cost improve from game to game, while V and H stay flat.

Predictions P7-1 to P7-6 are the founder's hypotheses as the brief states them. P7-7 to P7-10 are the operator's own, added to make the run explain itself.

**Pass rates** are hidden-suite pass/total, in percentage points ("points").
- **First hand-in:**
  - V: the first "done".
  - H and HSI: the first accept stage run.
- **Final:** the last hidden run.

**Cost** is the SDK estimate, with each SDK session counted once (`dedupCost`).

## Predictions

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P7-1 | **Cost, H vs V** | H's cost is within 1.5× of V's on each game. The warm builder pays one cold start per game, and the evaluator and lead sessions are short | H > 1.5 × V on 2 or more of the 3 games |
| P7-2 | **First hand-in, H vs V** | H ≥ V on each game. H's first hidden run comes after its own self-checks, test1 and an external evaluation; V's comes after its own "done" | H < V on 2 or more games, or H's mean over the three games < V's |
| P7-3 | **Final, H vs V** | H ≥ V on each game | H < V on 2 or more games, or H's mean < V's |
| P7-4 | **Learning, HSI** | HSI's first hand-in rises by ≥ 10 points from G1 to G3, while V's and H's do not trend (each moves < 10 points, G1 to G3) | HSI's G3 − G1 < 10 points; or V's or H's G3 − G1 ≥ +10 (then the rise is in the games, not the playbook) |
| P7-5 | **Cost trend, HSI** | HSI's cost per game falls from G1 to G3 | HSI's G3 cost ≥ its G1 cost |
| P7-6 | **No arm reads the hidden tests** | the audit is clean for all three arms: every session ran under the access hook, every transcript was found, and no hidden-test canary reached any session | any leak; any session without hook lines or without a transcript (unverified counts as wrong); or any denial whose target was a hidden-test file (an attempt is reported, and is wrong for this prediction too) |
| P7-7 | **Warm sessions work** | in H and HSI, each game's builder work runs in 1 SDK session (cold starts per game: 1 builder + lead + evaluator + HSI's retro), every revise resumes it, and there are 0 warm fallbacks | a builder revise on a cold session in any game, or more than 1 warm fallback in an arm |
| P7-8 | **The external eval earns its place** | on at least 2 of the 6 Meta games, the eval revises with at least 1 finding that is real (by PROTOCOL.md's rule), and it has at most 1 false pass across all 6 | real-finding revises on < 2 games, or ≥ 2 false passes |
| P7-9 | **Rules target real failures** | at least half of the rules HSI adds after G1 and G2 target a category that failed in G1 or G2. Of those, the targeted category fails less often in the later games' first hand-ins than in the game that produced the rule | < half target such a category, or the targeted categories fail as often or more often later |
| P7-10 | **Wall clock, H vs V** | H ≤ 1.5 × V per game: the batch hold (5 min) and the handoffs cost minutes, and parallel stages are few | H > 1.5 × V on 2 or more games |

## The operator's prior (stated so the result can surprise)

These are guesses made before any run, with confidences. They do not change the predictions above.

**P7-1, cost: 40% confident it holds.** H adds two or three short sessions to V's one per game (lead, evaluator, HSI's retro), and each is a cold start. On B6's numbers a cold start costs about $0.40-0.80, so on a game V does for $3-5, H's overhead alone is close to the 1.5× line.

**P7-2 and P7-3, accuracy: about 60% confident each holds.** The hidden suite checks exact messages and state across many edge cases. An evaluator that plays the game against SPEC.md should catch several of the classes V misses on its first "done". V, however, gets three rounds of category feedback, so the finals may tie at or near 100%. I expect P7-3 to hold mostly through ties.

**P7-4, learning: 30% confident it holds.** The three games share Part A of the spec, so a rule learned on G1's parser, pronoun or save/load failures applies to G2 and G3. But only three games are played, the games differ, and the playbook holds a few one-line rules. A 10-point rise needs H's first hand-in to sit well below 90% on G1, and that is itself uncertain.

**P7-5, cost trend: 50% confident it holds.** Fewer loops would cut cost. The retro adds a session to every game, though, and G2 and G3 are no smaller than G1.

**P7-6, no reads of hidden tests: 85% confident it holds.** The likeliest way it fails is not a leak but an unverified session, for example a session whose project settings did not load the hook.
