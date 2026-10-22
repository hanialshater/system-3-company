# Making a text-adventure engine task genuinely hard (design memo)

Purpose: three comparable specs, G1 to G3, where an agent implements a text-adventure engine from a written spec and is judged by hidden acceptance tests. The difficulty has to reward reading the spec, checking work and learning from failure, not raw coding speed. Tags: **[S]** means a sourced claim. **[R]** means our own reasoning.

## 1. Why text games are hard for LLM agents

- **Combinatorial action space plus language and commonsense.** Jericho frames interactive fiction as combining "combinatorial action spaces, language understanding, and commonsense reasoning" [S] https://arxiv.org/abs/1909.05398
- **Partial observability.** In text games the description "does not communicate complete information about the underlying game state, or may do so ambiguously" [S]. TextWorld's generator produces families of similar games for studying transfer [S]. https://arxiv.org/abs/1806.11532
- **Long horizons and composite subgoals.** ScienceWorld tasks are made of many subgoals. Later papers bin "long" tasks at about 94 oracle steps on average [S] https://arxiv.org/pdf/2510.05608 (uses ScienceWorld, https://arxiv.org/abs/2203.07540)
- **Hand-authored games stay hard.** TALES (it unifies Jericho, TextWorld, ScienceWorld, ALFWorld and TextWorldExpress) finds frontier agents do well on synthetic games but score under 15% on human-written ones (v4 abstract) [S] https://arxiv.org/abs/2504.14128
- **Knowing-doing gap.** BALROG finds models can state game knowledge but fail to apply it, and the long-horizon games (NetHack) remain far from solved [S] https://arxiv.org/abs/2411.13543
- **Transfer to our task [R].** When the agent builds the engine instead of playing it, the same properties show up as engine-side requirements: hidden state the tests probe indirectly, delayed effects (a timer set in turn 3 fires in turn 40), and interacting rules whose combinations nobody tests by hand.

## 2. Noise and ambiguity in specs and feedback

- **Underspecification.** On an underspecified SWE-bench Verified, models struggle to tell well-specified tasks from underspecified ones. Interaction to recover missing details improves results by up to 74% [S] https://arxiv.org/abs/2502.13069. A scaffold that separates detecting underspecification from writing code closes most of the gap [S] https://www.alphaxiv.org/abs/2603.26233
- **Information revealed over time (drift).** When an instruction is "sharded" across turns, performance drops 39% on average. Models commit early to assumptions and do not revise them [S] https://arxiv.org/abs/2505.06120
- **Spec contradicting tests.** ImpossibleBench mutates tests so they conflict with the spec. Frontier agents often "pass" by exploiting the tests, and stronger models cheat more [S] https://arxiv.org/abs/2510.20270
- **Distractors.** Irrelevant context sharply degrades reasoning (GSM-IC) [S] https://arxiv.org/abs/2302.00093
- **Long specs.** Accuracy follows a U-shape: facts in the middle of a long context get used least [S] https://arxiv.org/abs/2307.03172
- **Noisy test feedback.** Benchmark task defects include ambiguous specs and flaky tests [S] https://iclr.cc/virtual/2026/10012540. Agents treat a red test as ground truth and credit unrelated edits when a flaky test turns green (practitioner essay, not a study) [S] https://tianpan.co/blog/2026-07-02-flaky-tests-poison-agent-loops
- **Weak tests inflate scores.** UTBoost found erroneous patches labelled as passing on SWE-bench [S] https://arxiv.org/abs/2506.09289. SWE-ABS reports that about one in five "solved" patches from top agents is semantically wrong [S] https://arxiv.org/pdf/2603.00520

## 3. Single-agent failure modes a checker or playbook should catch

| Failure | Evidence | What catches it [R] |
|---|---|---|
| Premature "done" | Agents "declare the job done"; Claude tends "to mark a feature as complete without proper testing" [S] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | An independent evaluator that runs the spec's end-to-end transcripts |
| Overfitting or gaming visible tests | ImpossibleBench [S] (above) | An evaluator that reads the spec, not the tests; held-out probes |
| Early assumptions never revisited | Multi-turn study [S] (above) | A checklist step to re-read the spec and errata after each change |
| Regressions when fixing | SWE-CI: most models regress during long-term maintenance [S] https://arxiv.org/abs/2603.03823 | A full-suite rerun gate; a playbook rule to never patch only the failing category |
| Self-correction without external signal | Intrinsic self-correction often fails to help and can hurt [S] https://arxiv.org/abs/2310.01798 | Why the evaluator must be independent and test-grounded [R] |
| Not carrying lessons forward | Reflexion's episodic reflections and ExpeL's distilled insights improve later trials [S] https://arxiv.org/abs/2303.11366, https://arxiv.org/abs/2308.10144 | The playbook |

## 4. Menu of difficulty mechanisms

Each mechanism lists what it is, why it discriminates, how to test it deterministically, and how to keep it fair. All of this section is our own reasoning **[R]**, motivated by the sources above. **Fairness rule for every mechanism:** every hidden test must be derivable from the final spec text alone. A reference implementation must pass 100%, and two independent spec-only implementations should pass at least 95% before a spec ships.

1. **Errata that override earlier text.** An "Errata (takes precedence)" section near the end changes about 6 rules stated earlier (say, `take all` skips fixed items).
   - Why it discriminates: it rewards re-reading the whole spec and keeping a rule ledger. The errata sit after the bulk of the spec, and agents commit to assumptions early (Laban et al.).
   - Test: transcripts that pass only under the errata version of each rule.
   - Fair: an explicit precedence rule, stated in §0 and again at the errata.
2. **Ambiguity resolved by a general rule elsewhere.** Phrases like "the nearest container" or "it" are resolved by a stated rule elsewhere (for example, "pronouns bind to the last noun the player typed, never to one the game printed").
   - Why it discriminates: it rewards cross-referencing the spec instead of guessing.
   - Test: about 10 probe commands per ambiguity.
   - Fair: the general rule is unambiguous and is the only resolution consistent with the spec.
3. **Category-only feedback.** The visible grader reports only failing categories with counts, such as `parser: 3/40 failed`, and never names the test or input.
   - Why it discriminates: it rewards writing your own tests from the spec and penalises guess-and-check. It mirrors the partial signals described in §2.
   - Test: the hidden suite is fixed and only the reporting is coarse.
   - Fair: categories map one-to-one to spec chapters.
4. **Mid-run requirement change.** At a fixed checkpoint (after submission k), a signed "Change Notice" adds or alters 3 to 5 rules, for example a new `undo` command or changed scoring.
   - Why it discriminates: it tests absorbing a change without regressions (SWE-CI) and whether the playbook records "re-run everything after a change".
   - Test: hidden tests cover both the changed rules and unchanged rules near them.
   - Fair: the notice is self-contained and states exactly which earlier rules it supersedes.
5. **Seeded randomness with an exact RNG spec.** Combat, wandering NPCs and loot use a specified PRNG (say, a 32-bit xorshift with given constants and seed), plus a stated rule for which events draw numbers and in what order.
   - Why it discriminates: one extra or missing draw desynchronises every later outcome, which punishes "roughly right" code and rewards checking against the spec's published test vectors.
   - Test: golden transcripts at fixed seeds.
   - Fair: include the first 10 outputs for one seed, and one fully worked turn showing each draw.
6. **Parser fuzz set.** About 300 hidden inputs: mixed case, extra whitespace, punctuation, synonyms, abbreviations, multi-object commands ("take lamp and key"), commands chained with "then", unknown words, empty lines, 10 KB lines, and Unicode.
   - Why it discriminates: it rewards systematic edge-case enumeration from the grammar section.
   - Test: an exact expected response, or an exact error-class message, for each input.
   - Fair: the spec gives a formal grammar (EBNF), a tokenisation rule and the exact text of every error message.
7. **Timing and turn-count puzzles.** Delayed consequences: a lamp with 120 turns of fuel, a drawbridge open only on turns where turn mod 7 == 3, and poison that kills 15 turns after it is drunk. Which commands consume a turn (`look`, `inventory` and invalid input do not) is specified exactly.
   - Why it discriminates: these are the delayed-effects problems that make text games hard (§1). Off-by-one errors surface only in long transcripts.
   - Test: 200+ turn scripted runs with assertions at specific turns.
   - Fair: a turn-accounting table in the spec.
8. **Save/load round-trip under every state.** `save` then `load` must reproduce identical behaviour, including RNG state, pending timers, NPC positions, pronoun binding and score.
   - Why it discriminates: it catches state the implementer forgot was state, which is the partial-observability problem turned inward.
   - Test: for each of N checkpoints in a long transcript, run save, then load in a fresh process, continue, and compare the rest of the transcript byte for byte.
   - Fair: the spec lists every component of the game state.
9. **Distractor rooms and items.** Several rooms and items are described at length with tempting verbs, but the spec gives them no mechanics, or explicitly says "decorative: respond with the generic refusal".
   - Why it discriminates: it penalises over-building and inventing behaviour (GSM-IC distractors) and rewards spec fidelity.
   - Test: probes that expect the exact generic response.
   - Fair: a stated default rule for any verb and object pair the spec does not mention.
10. **Long spec with load-bearing middle sections.** Pad the spec to about 25k tokens with real but low-stakes content, and put about 5 critical rules mid-document.
    - Why it discriminates: lost-in-the-middle effects (Liu et al.) mean these rules get missed.
    - Test: dedicated tests on those rules.
    - Fair: every rule appears in the table of contents and has a rule ID.
11. **Combinatorial rule interactions.** Rules each correct alone conflict when combined: darkness plus a carried light inside a closed container, or a weight limit plus a nested bag. A precedence table resolves the conflicts.
    - Why it discriminates: it rewards an evaluator that tests interactions rather than features one at a time.
    - Test: pairwise probes.
    - Fair: the precedence table covers every pair.
12. **Visible tests that are a strict subset.** The visible tests are deliberately about 15% of the hidden suite and are skewed toward the happy path.
    - Why it discriminates: it exposes overfitting and premature completion (UTBoost, Anthropic harness post).
    - Test: the hidden-to-visible pass gap is itself a metric.
    - Fair: the visible tests are correct, just incomplete.

**Determinism [R].** The engine is a CLI that reads stdin and writes stdout. Tests compare normalised transcripts. No wall-clock time or OS randomness is allowed. Run every hidden test 3 times and quarantine any test that is flaky against the reference implementation. If you want flaky-signal noise, inject it deliberately: for example, the visible grader re-reports a random 5% of categories with a stated "may be stale" banner, so the noise is labelled and stays fair.

## 5. Measuring self-improvement across episodes fairly

- **Same mechanisms, new guises [R].** G1, G2 and G3 each contain all 12 mechanisms with new surface forms:
  - G1 (castle): the errata change `take all`, the RNG is xorshift, and the timer is a lamp.
  - G2 (starship): the errata change `drop`, the RNG is an LCG, and the timer is oxygen.
  - G3 (jungle): the errata change containers, the RNG is a PCG variant, and the timer is a tide.

  A playbook lesson like "build a rule ledger and apply the errata first" transfers. A lesson like "lamp fuel is 120" does not. This mirrors TextWorld's families of similar games for studying transfer [S] https://arxiv.org/abs/1806.11532 and ScienceWorld's held-out task variants [S] https://arxiv.org/pdf/2510.05608
- **Equal difficulty [R].** Calibrate each spec with the same reference-implementation effort (lines of code, rule count and test count within ±10%). Pilot vanilla-agent pass rates for G1, G2 and G3 separately, and counterbalance the order (G1 to G3 and G3 to G1) so the difficulty of individual games is not mistaken for learning.
- **Metrics [R].**
  - Hidden pass rate per mechanism category (not just overall), and the gap between hidden and visible pass rates.
  - Submissions needed to reach the plateau.
  - Regressions per change notice.
  - Transfer score: the improvement on mechanism m in G(n+1), conditional on m having failed in G(n). This is the cleanest signal that the playbook generalises, in the spirit of ExpeL's insight transfer [S] https://arxiv.org/abs/2308.10144
- **Leakage controls [R].**
  - Hidden tests never leave the grader. The playbook may store only the agent's own notes and category-level feedback.
  - Audit the playbook diff after each episode for game-specific constants or quoted test inputs, and strip or flag them.
  - Fresh hidden suites per game, with no shared inputs between them.
  - The vanilla agent gets the same category feedback and the same number of submissions, so only the harness differs.
- **Repeats [R].** At least 3 runs per condition per game. Report means with spread, because agent runs vary from one run to the next. The multi-turn study found a large rise in run-to-run unreliability [S] https://arxiv.org/abs/2505.06120
