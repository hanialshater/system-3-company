# When does an organisation of agents beat one strong agent?

Research note for System 3 Meta, 2026-10-23. Each claim carries a source URL or is marked **[reasoning]**. Caveat on sources: arxiv.org, cognition.ai, deepmind.google and research.google were unreachable from this sandbox. Figures from those sources come from search snippets and secondary write-ups and are marked as such. The Anthropic engineering posts were read in full.

**Short answer.** Many agents beat one when four things are true together:
1. The work splits into many units that don't depend on each other.
2. Each unit has a cheap, automatic, trusted verifier (tests, a reference oracle, Lean, a score function).
3. The verifier, not conversation, is how the agents coordinate.
4. The total work is too big for one context, or one session's wall-clock, to cover.

When any of these is missing, one strong agent wins on cost and usually on quality. Your results on the spreadsheet engine, lessons, text game and C-subset compiler fit this: each task was small enough for one context, and your org paid coordination costs with no parallelism dividend.

---

## A. AI evidence

### 1. Anthropic's C compiler built by parallel Claudes (2026)
Source: https://www.anthropic.com/engineering/building-c-compiler (read in full)

**Setup**
- 16 parallel Opus 4.6 instances ran with no active human intervention over about two weeks.
- They used "nearly 2,000 Claude Code sessions", 2 billion input and 140 million output tokens, and cost "just under $20,000".
- Each agent ran in a `while true` bash loop in its own Docker container. It cloned a shared bare git repo (`/upstream`), worked, and pushed back.
- **There was no lead agent and no orchestrator.** Each agent picked "the next most obvious" problem.
- **Locking:** an agent claimed a task by writing a file into `current_tasks/`. Git's push conflict forced a second claimant to pick something else.

**How the work was split**
- **Tests were the work queue.** Each agent took a different failing test.
- Past about 99% of the suite, each agent took a different real program to compile (SQLite, Redis, libjpeg, MQuickJS, Lua).
- Some agents had standing roles: deduplication, compiler performance, code quality of the generated output, design critique "from a Rust developer's perspective", and documentation.

**What failed**
- On the Linux kernel, all agents hit the same bug and overwrote each other's fixes. Adding agents did not help.
- Merge conflicts were frequent, and new features often broke existing behaviour.
- One agent ran `pkill -9 bash` and killed its own loop.

**What made it work**
- Very high-quality tests, designed around Claude's failure modes.
- Short output with detailed logs written to grep-able files.
- A deterministic per-agent `--fast` mode that ran a 1% or 10% sample of tests, to offset "time blindness".
- CI with stricter enforcement once regressions became common.
- **GCC as a known-good oracle.** Kernel files were compiled with a random mix of GCC and the new compiler, so each agent could isolate a different bug. Delta debugging then found pairs of files that failed only together. This turned one blocking bug into many independent ones.

**Results**
- About 100k lines of Rust, clean-room.
- Builds a bootable Linux 6.9 on x86, ARM and RISC-V.
- Builds QEMU, FFmpeg, SQLite, Postgres and Redis, and runs Doom.
- "99% pass rate on most compiler test suites including the GCC torture test suite".
- It still borrows GCC's assembler, linker and 16-bit code generator.
- Its output is less efficient than GCC at -O0.

**Lesson [reasoning].** The parallelism came from a huge, already-decomposed verifier (thousands of tests, then many real programs, then per-file oracle checks), not from the org chart. When the verifier stopped decomposing (one shared kernel bug), the 16 agents collapsed to the throughput of one.

### 2. Mathematics: search, parallelism and a formal checker

**AlphaProof** (Nature, 12 Nov 2025; https://deepmind.google/en/blog/ai-solves-imo-problems-at-silver-medal-level/; https://research.google/pubs/olympiad-level-formal-mathematical-reasoning-with-reinforcement-learning/)
- RL in Lean, trained on millions of auto-formalised problems.
- At test time it generates and learns from "millions of related problem variants".
- Combined with AlphaGeometry 2, it reached silver-medal level at IMO 2024 (4 of 6 problems) using multi-day computation.
- Organisation: massive sampling, with Lean as the only judge.

**IMO 2025 gold** (https://simonwillison.net/2025/Jul/21/gemini-imo/; https://9to5google.com/2025/07/21/gemini-deep-think-math-imo-2025/)
- Gemini Deep Think and an OpenAI experimental model each scored 35/42, in natural language.
- Google credits "parallel thinking": several candidate solutions explored at once inside one model.
- Here parallelism is internal sampling plus selection, not a team of roles.

**AlphaProof Nexus** (May 2026 preprint, arXiv 2605.22763; secondary coverage: https://the-decoder.com/google-deepminds-alphaproof-nexus-solves-decades-old-math-problems-for-a-few-hundred-dollars/)
- Reported to solve 9 of 353 open Erdős problems and 44 of 492 OEIS conjectures, at a few hundred dollars per problem.
- Gemini proposes proofs, Lean checks every step, and Lean's error messages steer the next attempt.
- Coverage reports that a basic agent also found all 9 proofs, at higher cost on the hardest ones. **[secondary; not verified against the paper]**

**Erdős #728** (Jan 2026; https://arxiv.org/pdf/2601.07421)
- GPT-5.2 Pro produced an informal argument, and Harmonic's Aristotle formalised it in Lean.
- That is a two-stage pipeline: a creative generator, then a formal verifier.

**Caution** (https://www.theneuron.ai/explainer-articles/from-erdos-to-axiom-the-open-problems-ai-has-actually-solved/; secondary)
- A proof that compiles in Lean can still prove the wrong statement.
- One reported DeepMind sweep found only 6.5% of 200 candidate solutions "meaningfully correct". The verifier is only as good as the spec.

**Lesson [reasoning].** The math wins share one shape: many cheap attempts, a perfect checker, and feedback from the checker. No role hierarchy is involved. The checker's precision is what lets the system run more attempts usefully.

### 3. Orchestrators, counter-evidence, failure taxonomies, scaling studies

**Anthropic multi-agent research system** (https://www.anthropic.com/engineering/multi-agent-research-system; read in full)
- An Opus 4 lead with Sonnet 4 subagents beat single-agent Opus 4 by 90.2% on an internal research eval.
- Agents use about 4x the tokens of chat. Multi-agent systems use about 15x.
- Three factors explained 95% of variance on BrowseComp, and **token usage alone explained 80%**.
- Named as poor fits: tasks where agents need shared context or have many dependencies, and "most coding tasks", which have fewer parallel parts than research.
- Failures they saw: 50 subagents spawned for simple queries, duplicated work from vague delegation, agents distracting each other, and synchronous subagents becoming a bottleneck.
- Parallel tool calls and parallel subagents cut research time by up to 90%.
- Reading [reasoning]: much of the gain is "more tokens spent in parallel, in clean contexts" on breadth-first work.

**Cognition, "Don't Build Multi-Agents"** (2025, https://cognition.ai/blog/dont-build-multi-agents; summarised via https://jxnl.co/writing/2025/09/11/why-cognition-does-not-use-multi-agent-systems/)
- Principles: share full context and traces, not summaries, because "actions carry implicit decisions".
- In their Flappy Bird example, two subagents build a background and a bird in styles that don't match.
- Default they recommend: one linear agent, with context compression for long tasks.

**Cognition follow-up, "Multi-Agents: What's Actually Working"** (Apr 2026, https://cognition.com/blog/multi-agents-working; via search snippets)
- The warnings still hold for parallel-writer swarms.
- What works is **single-threaded writes, with other agents contributing intelligence rather than actions**:
  - a clean-context reviewer;
  - a stronger "smart friend" model;
  - a manager doing map-reduce over scoped children.

**MAST, "Why Do Multi-Agent LLM Systems Fail?"** (NeurIPS 2025, https://arxiv.org/abs/2503.13657)
- 14 failure modes in 3 groups: system design/specification, inter-agent misalignment, and task verification.
- Built from 7 frameworks and 1,642 traces, with κ=0.88 inter-annotator agreement.
- The authors argue failures come mostly from system design, not model limits. I could not retrieve the per-category percentages.

**Google/DeepMind/MIT, "Towards a Science of Scaling Agent Systems"** (Dec 2025, https://arxiv.org/abs/2512.08296; blog https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/)
- A controlled study: 260 configurations, 6 benchmarks, 5 architectures, 3 model families.
- Multi-agent results ranged from **+80.8% on decomposable financial reasoning to −70% on sequential planning**.
- Trace-level error amplification: 17.2x for independent agents, 4.4x for centralised (the single-agent baseline is 1.0).
- Gains diminish once the single-agent baseline is already strong. A "~45%" threshold appears in secondary write-ups only.
- A predictive model picked the best architecture for 87% of held-out configurations.

**"More Agents Is All You Need"** (Li et al., TMLR 2024, https://huggingface.co/papers/2402.05120)
- Plain sampling-and-voting improves accuracy as instances are added, and the gain grows with task difficulty.
- These are ensembles, not organisations.

**MacNet** (Qian et al., ICLR 2025, https://proceedings.iclr.cc/paper_files/paper/2025/hash/66a026c0d17040889b50f0dfa650e5e0-Abstract-Conference.html)
- Agents arranged as a DAG scale past 1,000 agents.
- Performance follows a **logistic** "collaborative scaling law", and irregular topologies beat regular ones.
- The authors note limits on the scaling horizon.

**Coding benchmarks**
- **Agentless** (FSE 2025, https://arxiv.org/abs/2407.01489): a fixed three-step pipeline (localise, repair, validate) with no autonomous agent scored 32% on SWE-bench Lite at $0.70 per issue, beating the open-source agents of its day.
- mini-swe-agent, about 100 lines, is reported at above 74% on SWE-bench Verified (secondary: https://www.programming-helper.com/tech/swe-bench-coding-agent-benchmarks-2026-software-engineering-ai-evaluation).
- Claims that multi-agent teams beat single agents on SWE-bench (for example +7.2 points from a reviewer role) are blog-level evidence only (https://dev.to/nikita_benkovich_eb86e54d/coding-agent-teams-outperform-solo-agents-722-on-swe-bench-verified-4of5).
- **Net:** for single-issue coding there is no strong evidence that a team beats one agent. A reviewer is the most plausible exception.

### 4. Evolutionary and population harnesses

**FunSearch** (Nature 2023, https://pmc.ncbi.nlm.nih.gov/articles/PMC10794145)
- An LLM proposes edits to programs sampled from a database, and an automatic evaluator scores them.
- The evaluator "guards against confabulations".
- It found new cap-set constructions and better bin-packing heuristics.

**AlphaEvolve** (May 2025, https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/; figures via https://theregister.com/2025/05/15/google_deepmind_debuts_algorithm_evolving)
- Gemini Flash supplies breadth (many proposals) and Gemini Pro supplies depth (occasional stronger ones).
- Automated evaluators score every candidate, and an evolutionary program database selects among them.
- Results:
  - A Borg scheduling heuristic recovers about 0.7% of Google's fleet compute.
  - 4x4 complex matrix multiplication in 48 scalar multiplications.
  - A 23% kernel speedup, giving 1% shorter Gemini training.
  - Across 50+ open problems it matched state of the art in about 75% of cases and improved on it in about 20%.

**Lesson [reasoning].** This is the purest "many beats one" harness, and it has no roles at all. Agents are cheap, interchangeable mutators. The evaluator is the whole organisation. It works only where the score can be computed.

---

## B. Human evidence

### 5. Software teams

**Brooks, *The Mythical Man-Month* (1975)** (notes: https://home.cs.colorado.edu/~kena/classes/5828/s99/lectures/lecture04.pdf)
- "Adding manpower to a late software project makes it later."
- The causes: ramp-up time, n(n−1)/2 communication paths, and tasks that can't be split.
- His remedy is the "surgical team": one chief designer keeps the system's conceptual integrity, and others support.

**Conway's law (1968) and the mirroring hypothesis** (MacCormack, Baldwin and Rusnak, Research Policy 2012, https://dash.harvard.edu/handle/1/34403525)
- Product architecture tends to mirror the organisation that builds it.
- **[reasoning]** An agent org split by function (builder, evaluator, PM) will produce function-shaped seams, not module-shaped ones.

**Team Topologies** (Skelton and Pais 2019, https://teamtopologies.com/key-concepts)
- Size teams to their cognitive load.
- Favour "stream-aligned" teams that own a slice end to end.
- Minimise interaction modes between teams, and use platform teams to provide a stable interface.

**QSM / Putnam team-size data** (vendor data: https://qsm.com/blog/2012/top-performing-projects-use-small-teams; https://qsm.com/blog/2025/4-key-studies-team-size)
- Across 491 projects, teams of 3–7 were optimal for medium-sized systems.
- At 50k SLOC, large teams spent 99 person-months against 19 for small teams.
- On 100k SLOC, teams of 20+ finished only about a week sooner than teams under 5 (8.92 vs 9.12 months).
- In other words, roughly 5x the cost for almost no gain in schedule. This is the human version of your benchmark.

### 6. Science

**Wu, Wang and Evans, *Nature* 2019** (https://ideas.repec.org/a/nat/nature/v566y2019i7744d10.1038_s41586-019-0941-9.html)
- Covers 65 million papers, patents and software products.
- **Large teams develop recent, popular ideas. Small teams disrupt** by reaching for older, less popular ones.
- The effect holds for the same individuals as they move between team sizes.

**Polymath8** (retrospective: https://arxiv.org/abs/1409.8361; wiki: https://michaelnielsen.org/polymath/index.php?oldid=8900)
- An open online team cut Zhang's prime-gap bound from 70,000,000 to 4,680 in about two months. At times the bound fell "every thirty minutes".
- After Maynard's new idea, Polymath8b reached 246.
- The pattern:
  - A lone individual made the conceptual breakthrough (Zhang, then Maynard).
  - The crowd excelled at **optimisation of a decomposable, numerically checkable target**: sieve weights, numerics and sub-lemmas, each verifiable.

**Peer review and replication** **[reasoning]**
- The human institution of independent verification separates the producer from the checker.
- It is slow and blocking, which is your evaluator problem. Science tolerates that because errors are expensive and progress is cumulative.

### 7. Economies and institutions

- **Adam Smith (1776)**, pin factory, Wealth of Nations Book I ch. 1 (https://www.econlib.org/library/Smith/smWN.html): division of labour raises output through dexterity, saved switching time and specialised tools. It is limited by the extent of the market (Book I ch. 3). **[reasoning]** Specialisation pays only when there is a steady volume of the same kind of work.
- **Hayek, "The Use of Knowledge in Society" (AER 1945)** (https://www.econlib.org/library/Essays/hykKnw.html): knowledge is dispersed and local. Prices are a low-bandwidth signal that coordinates without central planning. **[reasoning]** The agent analogue is a scalar signal everyone can read, such as pass/fail counts or a fitness score, instead of messages.
- **Coase, "The Nature of the Firm" (1937)** and **Williamson** (Nobel lecture: https://www.nobelprize.org/prizes/economic-sciences/2009/williamson/lecture/): firms exist where market transactions cost more than hierarchy. Hierarchy wins under asset specificity, uncertainty and frequent interaction. Markets win for standardised, separable exchanges.
- **Standards and interfaces.** Containerisation cut shipping costs by standardising one interface (Levinson, *The Box*, https://press.princeton.edu/books/paperback/9780691170817/the-box). The IETF works by "rough consensus and running code" (RFC 7282, https://www.rfc-editor.org/rfc/rfc7282). **[reasoning]** Stable interfaces let strangers cooperate without meeting. Guilds, universities and standards bodies exist to carry knowledge across generations of workers, which is your "the disk is the memory" principle.

---

## C. Synthesis

### Design principles (each testable)

1. **Parallelise only over a decomposed verifier.** The number of agents worth running is at most the number of independently failing checks.
   - Evidence: C compiler (tests became the queue; the shared kernel bug collapsed it); Google scaling study (+81% decomposable, −70% sequential).
   - Test: plot useful agents against distinct failing clusters.
2. **Coordinate through artifacts, not messages.** Use a shared repo, file locks, test status and a scalar score. Ban status chatter.
   - Evidence: C compiler (no lead; git and `current_tasks/`); Hayek's price signal; Anthropic's "agents distracting each other".
   - Test: compare token share spent on inter-agent messages against pass rate.
3. **Turn blocking bugs into many bugs with an oracle.** When everyone hits the same failure, add a differential oracle (a reference implementation, bisection, delta debugging) so work splits again.
   - Evidence: GCC oracle plus delta debugging for Linux.
4. **Keep one writer per unit, and add thinkers around it.** Reviewers, "smart friends" and critics add value. Parallel writers on shared state add merge conflicts.
   - Evidence: Cognition 2025/2026; the C compiler's merge conflicts; Brooks's surgical team.
5. **Make the evaluator automatic, fast and non-blocking.** Human-style review belongs only at irreversible gates.
   - Evidence: FunSearch/AlphaEvolve evaluators; the `--fast` 1–10% sampled suite; your slow evaluator. Centralised verification cut error amplification from 17.2x to 4.4x.
   - Test: evaluator latency as a share of cycle time.
6. **For search problems, use many cheap explorers and one strict judge.** Mix cheap breadth models with occasional expensive depth.
   - Evidence: AlphaEvolve (Flash plus Pro), AlphaProof variants, Nexus plus Lean, "More Agents", Deep Think parallel thinking.
   - Test: success against the number of samples, at a fixed checker.
7. **Spend tokens where breadth exceeds one context.** A multi-agent gain is mostly parallel token spend. If one context holds the whole problem, one agent wins on cost.
   - Evidence: 80% of variance from tokens, a 15x multiplier, your 2x cost loss.
   - Test: the context-fit ratio (task working set against the context window).
8. **Hire specialists only for steady, recurring work where knowledge accumulates.** Examples: a performance agent or a dedup agent on a 100k-line codebase. Don't hire them for one-off waves.
   - Evidence: Smith's extent of the market; the C compiler's standing roles appeared only at scale.
9. **Keep teams small, 3–7 writers, and organise by module, not by function** (stream-aligned).
   - Evidence: QSM, Brooks, Team Topologies, Conway/mirroring.
10. **Freeze interfaces first.** Define the AST, IR and module ABI before fan-out, so parallel units compose.
    - Evidence: Flappy Bird mismatch; containerisation; mirroring.
11. **Pay cold-start costs once.** Use warm, long-lived loop workers with a durable handoff file, not fresh sessions per ticket.
    - Evidence: the C compiler's `while true` loop with about 125 sessions per agent; your cold-start losses. **[reasoning]**
12. **Use small groups for new ideas and big groups for optimisation.** Breakthroughs come from one strong agent. Crowds then grind down a measurable target.
    - Evidence: Wu, Wang and Evans; Polymath8 (Zhang/Maynard, then the crowd).

### Three benchmarks where a harness should clearly win

1. **"Compile the world" breadth test.** Take a working compiler or interpreter and make 50–200 independent real programs or packages build and pass their own tests, with a reference implementation as oracle.
   - Why: the failures are naturally many and independent (principles 1 and 3), and the work exceeds one context and one session's wall-clock.
   - Prediction: an org of 8–16 loop workers beats one session on programs passing per wall-clock hour, at similar cost per program. This is the C compiler's second phase.
2. **Open optimisation with a scorer.** Examples: kernel speed, a packing or scheduling heuristic, compression ratio. The evaluator is a deterministic score with no ceiling.
   - Why: there is no "done" state. Population search keeps improving where one agent plateaus (principle 6).
   - Prediction: an AlphaEvolve-style population of cheap mutators beats one strong agent's best result at equal tokens after N generations.
3. **Multi-repo migration or wide refactor.** Examples: port 40 independent services to a new API, or a fleet of Lean lemmas with a fixed statement list.
   - Why: per-unit verifiers (each service's tests, Lean), a frozen interface (the new API or the statements), one writer per unit, and total size far beyond one context.
   - Prediction: wall-clock speedup close to linear up to the point where the shared interface is contested.

Each benchmark controls total tokens and measures wall-clock time, cost and hidden-test accuracy. Include a single-agent run with the same token budget used for retries or self-consistency, so you don't simply reward spend.

### What this implies for the Lua 5.4 wave

**[reasoning]** Lua 5.4's official suite (`testes/*.lua`, driven by `all.lua` with `_soft`/`_port` flags; https://www.lua.org/tests/; https://git.lua4.win/lua/tree/testes/all.lua?h=v5.4) has two parts:
- About 30 files, each fairly self-contained: strings, math, closures, coroutines, gc, goto, utf8 and others.
- A C API part (`api.lua` and the `T` testing library), which needs internals.

**Phase 1: one agent.** The core (lexer, parser, VM/evaluator, value model, tables, metatables, closures) is a tightly coupled spine. Splitting it would hit the −70% sequential regime.
- One strong agent should build the spine and **freeze the interfaces**: value representation, the call/return protocol, the error/pcall mechanism and the GC hooks (principles 4 and 10).

**Phase 2: fan out.** Once `all.lua` runs end to end with many files failing:
- Assign test files as units through `current_tasks/` locks: string library, `string.format`/`string.pack`, utf8, math and integer/float semantics, coroutines, goto, error messages.
- Use **reference `lua` 5.4 as a differential oracle**. Run every snippet on both and diff the output, so shared failures split into separate ones (principle 3).
- Expect gains only here. Measure the number of distinct failing clusters before adding agents (principle 1).

**Rules for the whole wave**
- Use the sampled fast suite for inner loops. Run the full suite in CI only, so the evaluator never blocks (principle 5).
- Keep 3–6 workers, each owning a module, plus one clean-context reviewer and no role theatre (principles 4 and 9).
- **Risks:** gc and weak tables, coroutines interacting with pcall, and error-message text all cut across modules. Assign them to the spine owner.

### What this implies for System 3 Meta's kernel

**[reasoning]** Kernel features, ranked by expected value:
1. **A test-sharded work queue.** Derive tickets automatically from failing-test clusters, with file or git locks and claim/release semantics.
2. **An oracle and delta-debugging primitive.** Differential runs against a reference implementation, with automatic splitting of a blocking failure.
3. **Warm loop workers.** Persistent workers with a handoff file, to remove cold starts.
4. **A non-blocking evaluator tier.** Fast sampled checks per commit, the full suite in CI, and human or LLM review only at release gates.
5. **A single-writer guarantee per module,** plus optional reviewer and "smart friend" agents that can comment but not write.
6. **A fan-out governor.** Spawn N agents only when the number of independent failing clusters is at least N and the working set exceeds one context. Otherwise run one agent. Log the decision so it can be audited.
7. **A population mode** for scored tasks: a program database, cheap mutators and an evaluator.
8. **Per-run telemetry.** Tokens spent on coordination against production, evaluator latency, merge-conflict rate, and duplicate-work rate (MAST categories as labels).

The kernel's default should be "one agent until proven decomposable". Principles 1, 6 and 7 are the switch that turns the org on.
