# Inbox: session 2 (R&D + Networks, Crowds, and Markets vertical)

Branch: `ccr-rnd-ncm`. Session 1 folds these into `company/ops/board.json` and `company/ops/progress.md`.
Newest entry at the top.

## Board items (proposed moves and new items)

- **W-161** (vp-rnd) → done. See decision `company/decisions/2026-10-14-evolution-stop-rule.md`.
- **NEW** (owner: rnd-lead): write `company/rnd/evolution/knots-gen2-brief.md` per §4 of that decision. Then dispatch knots gen 2 (3 rnd-engineers in worktrees) and record `knots-gen2.md` with the stop-rule table.
- **W-162** (rnd-lead): keep drafting the EDD. Send it to the principal engineer only after gen-2 selection, or with gen1-force if gen 2 slips more than 2 days past dispatch.

## Handoffs

### 2026-10-14: rnd-lead (Bram), knots gen-2 brief written; ready to dispatch after one commit

- **What changed.**
  - New `company/rnd/evolution/knots-gen2-brief.md`, covering every item of decision 2026-10-14-evolution-stop-rule §4, with three verbatim engineer prompts ("Slot brief for gen2-<name>").
  - `src/lab/knots/evolve.json`: registered `gen2-ortho-force` ← [gen1-ortho, gen1-force], `gen2-force-smooth` ← [gen1-force], `gen2-ortho-round` ← [gen1-ortho]. Weights, benchWeights, budgets, mutable and tests unchanged. `evolve.mjs selftest` ok.
- **Before dispatch (session lead):** commit the brief and `evolve.json`, then create the three worktrees from that commit. The harness refuses unregistered candidates, so a worktree cut before the commit gates its engineer out.
- **Facts checked today.** The evaluator has 102 tests (gen1-force 102/102, gen1-ortho 101/102 in a scratch-archive run, seed 1). The parents' frozen files are byte-identical. random-knot entry: force 12,095 B, ortho 10,825 B. So force-smooth must cut ≥ 319 B, and the ortho slots have 951 B to the 11,776 B condition, not the 1.4 KB in the gen-1 record. Self-checks use `EVOLVE_ARCHIVE=<scratch>` so the official `knots.jsonl` stays clean.
- **One addition of mine, stated in the brief:** the internal-objective ban also covers the looks test's measure and constants, not only the bench's.
- **Belief.** Confident that the brief is complete against §4 and the commands work as written. Less sure that force-smooth can both add its three ideas and cut 319 B. That is the slot most likely to miss the bundle condition.
- **Next.** Owner: session lead or rnd-lead. Dispatch 3 rnd-engineers, then do the gate audit, ≥ 3 eval runs, the SVG looks sheet and `knots-gen2.md` with the stop-rule table.

### 2026-10-14: vp-rnd (Vera), W-161 evolution stop rule → done

- **What changed.**
  - Decision [2026-10-14-evolution-stop-rule.md](../../decisions/2026-10-14-evolution-stop-rule.md).
  - New step 6 in `company/rnd/evolution.md`.
  - Bet table in `company/rnd/README.md`: knots generation budget is now 2 left (gen 2 and gen 3, gen 3 only if gen 2 passes).
- **The rule.** Score the best candidate and the current champion in the same runs, on at least 3 fresh seeds, and count every run.
  - Paired gain g per seed.
  - The generation improves only if median g ≥ max(2% × the champion's evolvable term E, noise floor 15) and g > 0 on every seed. E is score − 100 × tests.
- **Gen 1 passed.** gen1-force against gen0-baseline on the 102-test evaluator: g = 24.95, 30.04, 45.72, so the median is 30.04 against T = 15. That is +10.3% of E.
- **Gen 2 goes ahead** with Bram's three slots. Required amendments:
  - the looks gate is stated up front in the brief;
  - the winner must keep the random-knot entry ≤ 11,776 B, so force-smooth must shrink it by ≥ 319 B, not 150 B;
  - gen2-ortho-round may not use force relaxation;
  - NOTES.md must name every internal objective, and copying the evaluator disqualifies the candidate;
  - gen1-force is re-scored in every run;
  - the record includes rendered pictures.
- **Belief.** Confident that the old rule was unusable and that gen 1 cleared any sensible rescaling. Moderately confident that 15 points is the right floor: it rests on 6–7 seeds.
- **Proposed board items.**
  - **W-161** → done.
  - **NEW, owner rnd-lead:** "Write knots-gen2-brief.md per decision 2026-10-14-evolution-stop-rule §4, then dispatch gen 2 (3 rnd-engineers, worktrees) and write knots-gen2.md with the stop-rule table."
  - **W-162** stays with rnd-lead, re-titled in effect: draft the EDD now, but send it to the principal engineer only after gen-2 selection, or with gen1-force if gen 2 slips more than 2 days past dispatch.

