# Benchmark 7: predictions, committed before any run

owner: vp-meta · date: 2026-10-22 · scored by `setup.mjs tally` and `setup.mjs audit`, with the measures defined in [PROTOCOL.md](PROTOCOL.md) · status: committed, no arm run yet. **v3 (2026-10-23): re-committed before any run, after the G1 pilot; the v3 section at the end supersedes P7-2, P7-3, P7-4 and P7-10 where they differ. P7-1 and P7-5 to P7-9 stand.**

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

## v3: predictions re-committed before any run (2026-10-23)

**Why re-commit.** v2 made the games hard and added a mid-run Change Notice, and v3 hardened the harness (PROTOCOL.md, "Benchmark 7 v3"). The numbers above were written for the easier v1 games. The only pass rate seen so far is the **G1 pilot**: one careful spec-only session reached 100% at its first hand-in (pre-notice) and 100% after the notice, with no fix round. That is n = 1, on one game, from a session that was told to check its work hard. It moves my prior on V up: a strong single agent can hit the ceiling. These predictions are written against that.

**The measures** (all from `setup.mjs tally`):
- **First hand-in:** the pre-notice score: V's first "done", and H's or HSI's first accept run.
- **After the notice:** the first post-notice score. **Final:** the last post-notice score.
- **balanced:** the mean of the per-category pass rates. **sharedBalanced:** the same over the 20 engine categories all three games have. Every comparison across games uses sharedBalanced, because the suites' category sizes differ.
- **Regressions:** categories clean at the first hand-in that fail at the first post-notice run (the notice category aside).
- **Transfer score** (research memo, section 5): for each engine category that failed in game n's first hand-in, its pass-rate change to game n+1's first hand-in. An arm's transfer score is the mean over its two steps (G1→G2, G2→G3), weighted by the number of such categories. "Still failing" counts the categories that fail again.

**Points** are percentage points. "Each game" means G1, G2 and G3. A prediction that cannot be tested because no category failed is reported as untestable, and counts as not confirmed.

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P7-11 | **V's first hand-in is below the ceiling** | V's first hand-in is below 100% on at least 2 of the 3 games, and V's mean over the games is 85-99.5% | V scores 100% on 2 or more games, or V's mean is under 85% |
| P7-12 | **First hand-in, H vs V** (supersedes P7-2) | H's first hand-in ≥ V's on each game. H's mean is at least 2 points above V's. The evaluator plays the game against SPEC.md and H's warm builder fixes in the same session before the first accept | H < V on 2 or more games; or H's mean − V's mean < 2 points while V's mean is under 98% (when V's mean is 98% or more, the margin test is untestable and only the per-game test applies) |
| P7-13 | **Final, H vs V** (supersedes P7-3) | H's final ≥ V's on each game, and both arms' finals are ≥ 99% on at least 2 games | H < V on 2 or more games |
| P7-14 | **The Change Notice** | Regressions per notice: H ≤ V summed over the three games. H's after-notice score ≥ V's on at least 2 games. H's test1 and eval run the visible notice tests and re-check unchanged rules before its first post-notice accept; V goes straight to its next hand-in | H's regressions > V's (summed), or H's after-notice < V's on 2 or more games |
| P7-15 | **Learning on recurring mechanisms, HSI** (supersedes P7-4) | HSI's transfer score is at least 10 points above H's. HSI also has fewer categories still failing than H, summed over the two steps | HSI's transfer − H's transfer < 10 points, or HSI's "still failing" ≥ H's. Untestable (not confirmed) if HSI's G1 and G2 first hand-ins fail no engine category |
| P7-16 | **HSI rises, G1 to G3** | HSI's first hand-in sharedBalanced rises by ≥ 5 points from G1 to G3, while H's and V's each move by < 5 points | HSI's G3 − G1 < 5 points; or H's or V's G3 − G1 ≥ 5 (the rise is then in the games, not the playbook). Untestable if HSI's G1 is above 95 sharedBalanced |
| P7-17 | **The same rounds after the notice** | Every H and HSI order that got the notice enters the post-notice phase with exactly 3 loops left (`notice.loopsUsedPreNotice` and `granted`), as V has 3 rounds | any Meta order that got the notice with fewer than 3 loops left |
| P7-18 | **Wall clock, H vs V** (supersedes P7-10, whose rationale named a batch hold that no longer exists) | H ≤ 1.5 × V per game. The external evaluation and the handoffs cost minutes, and the stages do not run in parallel | H > 1.5 × V on 2 or more games |

## v3: the operator's prior

These are guesses, with confidences, made before any run. They do not change the predictions above.

- **P7-11, V below the ceiling: 55%.** The suites are large: 560-602 tests, with exact messages, a seeded generator, deep reloads and 290 fuzz inputs. Most single sessions will miss some of it. But the pilot shows that a careful one may not. If V reaches 100% on two games, P7-12 and P7-13 become ties, and the comparison is about cost and time.
- **P7-12, H's first hand-in above V's: 55%.** It is above V's by construction only if the evaluator finds real defects. In dry runs it passed wrong versions. A strong builder's own tests may already catch what it would.
- **P7-13, finals: 70%,** mostly through ties at or near 100%.
- **P7-14, the notice: 50%.** The notice is small (4-5 rules). Both arms get the same visible notice tests. H's extra checks help only on regressions those tests do not cover.
- **P7-15, transfer: 30%.** Only two steps, few categories may fail, and the playbook holds a few one-line rules. A rule like "re-read the errata before handing in" transfers; a game's constant does not. A big effect is needed to clear 10 points.
- **P7-16, the rise: 25%.** If HSI's G1 is already near the ceiling, there is no room to rise.
- **P7-17, the same rounds: 95%.** Dry run 4 showed it, and the risk is only an untested path, such as a notice delivered after a park.
- **P7-18, wall clock: 45%.** Each stage after build is a separate session start.

**What would change the plan.** If V reaches 100% on G1 at its first hand-in, the games are still too easy for this comparison. That result is still reported, and the next benchmark needs harder games. The protocol's stops and measures do not change after any run.
