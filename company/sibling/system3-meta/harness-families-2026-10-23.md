# Agent-harness families: Sakana Fugu, the Eureka Machine, and a sourced comparison table

Research date: 2026-10-23.

**Network caveat.** From this sandbox only GitHub could be reached. arxiv.org, sakana.ai, deepmind.google, anthropic.com, cognition.ai, techcrunch.com, the-decoder.com and huggingface.co all returned 403 or DNS failures. So the confidence labels mean:

- **P (primary, read):** I read the primary text this session. That means the Fugu technical report PDF (pulled from github.com/SakanaAI/fugu) and project READMEs on GitHub.
- **S (secondary):** the fact comes from web-search summaries of press, blogs or aggregators. Some of these quote the primary source, but I did not open it.
- **M (memory):** the fact comes from my knowledge of the primary paper and was not re-fetched this session. Check M items before citing them publicly.

---

## 1. Sakana Fugu (Sakana AI)

**What it is.** Fugu is "a family of orchestrator models that harness and amplify the capabilities of an LLM agent team." Each Fugu model is itself an LLM, trained to read a query and "dynamically devise agentic scaffolds" over a pool of frontier worker models. Users call it as a single model through an OpenAI-compatible API (Chat Completions and Responses) (P, technical report and GitHub README). Sakana calls it a "multi-agent system delivered as one model."

**Release history.**
- Technical report dated **2026-06-22** (P). It launched two variants, Fugu and Fugu-Ultra.
- **Fugu Max** and **Fugu Ultra v2** were announced **2026-09-11** (S: OpenCode data page and press). I could not read the Sakana post for that release.

**Architecture: two different orchestrators (P).**

- **Fugu (fast tier), built on TRINITY** (arXiv 2512.04695, ICLR 2026).
  - A pretrained LM backbone has a lightweight *selection head* attached. The head reads one hidden state and outputs one logit per worker model.
  - It picks **one worker per turn** and assigns no roles. It decides from logits, with no text decoding, so it adds almost no latency.
  - Only the singular-value scales of selected weight matrices are fine-tuned, so very few parameters are trained.
  - Training stage 1 is SFT toward a softmax over each worker's measured reward on verifiable single-step tasks.
  - Training stage 2 is **sep-CMA-ES**, an evolution strategy, run on multi-turn end-to-end coding-harness tasks (Claude Code, Codex, OpenCode trajectories) with a binary terminal reward.
  - In multi-turn work it switches workers turn by turn. For example, on Terminal Bench it alternates GPT-5.5 as builder with Claude Opus 4.8 at "critical debugging points."
- **Fugu-Ultra (quality tier), built on the Conductor** (arXiv 2512.04388, ICLR 2026).
  - An LM trained with **GRPO**. Rewards: 0 if the plan is unparseable, 1 if the answer is correct, 0.5 otherwise. No KL penalty.
  - It writes a natural-language workflow of up to 5 steps. Each step names a subtask, the worker assigned to it, and an *access list* of which earlier outputs that worker may see.
  - This can express best-of-N, chains, and trees with a chosen aggregator. The aggregator varies by task: Gemini for trivia-heavy work, GPT for math.
  - The orchestrator can list *itself* as a worker, which makes it recursive.
  - Production extensions for tool use:
    - *Intra-workflow agent isolation*, to avoid "orchestration collapse" (the first agent to act steering every later agent).
    - *Inter-workflow persistent shared memory* of tool calls.
- **Worker pool named in the report:** Gemini-3.1-Pro, Claude-Opus-4.8, GPT-5.5, part of "a large pool of diverse models." Users can exclude providers or models without retraining.

**What judges or verifies.**
- During training, verifiable ground truth: task correctness and terminal success.
- At inference there is **no external verifier**. Any verification is done by worker LLMs inside the generated workflow, for example Opus re-checking GPT's build.

**Target tasks.** Agentic coding and software engineering, scientific reasoning, hard QA, long context, and tool-using dialogue. It is aimed at both interactive use (Fugu) and the hardest multi-step jobs (Fugu-Ultra).

**Reported results (P, Table 1).** Format: Fugu-Ultra / Fugu / Opus 4.8 / Gemini 3.1 / GPT-5.5. Baselines are provider-reported. Fugu's scores are Sakana's own.

| Benchmark | Fugu-Ultra | Fugu | Opus 4.8 | Gemini 3.1 | GPT-5.5 |
|---|---|---|---|---|---|
| SWE-Bench Pro | 73.7 | 59.0 | 69.2 | 54.2 | 58.6 |
| Terminal Bench 2.1 | 82.1 | 80.2 | 74.6 | 70.3 | 78.2 |
| GPQA-Diamond | 95.5 | 95.5 | 92.0 | 94.3 | 93.6 |
| HLE | 50.0 | 47.2 | 49.8 | 44.4 | 41.4 |
| LiveCodeBench | 93.2 | 92.9 | 87.8 | 88.5 | 85.3 |
| SciCode | 58.7 | 60.1 | 53.5 | 58.9 | 56.1 |
| MRCRv2 | 93.6 | 86.6 | 87.9 | 84.9 | 94.8 |

- Fugu-Ultra does not win everywhere. GPT-5.5 is higher on MRCRv2, and plain Fugu is higher on SciCode.
- No independent replication found.
- Fugu Ultra v2 reportedly scores 48.3 on "Chartography," versus 27.3 for Opus 5 and 29.5 for Fable 5 (S, one Dutch news summary).

**Cost.**
- The technical report gives no cost or token figures (P, searched the full text).
- List prices are second-hand, from OpenRouter-based aggregators, October 2026 (S):
  - Fugu Max: **$2 in / $6 out per million tokens**.
  - Fugu Ultra v2: **$5 in / $30 out per million tokens**, $0.50 cached input.
  - Both: 1M context, 128K max output.
- Reported subscriptions of $20 / $100 / $200 a month (S).
- Not offered in the EU/EEA (S, one source).
- Per-task cost is **unknown**. Ultra runs several frontier models per query, so the real cost per task is presumably several times a single model call.

**Links.**
- https://sakana.ai/fugu/
- https://sakana.ai/fugu-release/
- https://sakana.ai/fugu-max-release/
- https://github.com/SakanaAI/fugu (report PDF included)
- arXiv 2606.21228
- TRINITY: arXiv 2512.04695
- Conductor: arXiv 2512.04388

## 2. The "Eureka Machine" (Recursive, Richard Socher)

**This is not NVIDIA's Eureka.** NVIDIA's Eureka (Ma et al., ICLR 2024) is an LLM that evolves *reward-function code* for RL in simulation. It is a population/evolutionary method and appears in row 7. The founder's "Eureka Machine" is something else.

**What it is.** The in-house automated AI-research system of **Recursive** (also reported as Recursive Superintelligence Inc.), founded by Richard Socher (S). Reported co-founders include Tim Rocktäschel; Peter Norvig and Tim Shi also appear in some reports (S, inconsistent across outlets). Funding is reported as about $650M at about $4.65B (May 2026). One report says $5B. These figures conflict (S).

Socher's book *The Eureka Machine* (PublicAffairs, 2026-09-22) gives the vision: a "four-pillar framework" aimed at a system that improves itself (S).

**How the loop works, as far as is public.** All of this is second-hand. **No paper, technical report or GitHub repo was found.**
- It generates ideas, runs experiments, and uses the results to choose the next experiment.
- Humans supervise; per coverage, they "mostly watched and picked winners."
- What it reportedly changed: the base-model training method, model architecture (a sparser MoE shape), low-bit training (claimed 71% size reduction with little quality loss), and custom hardware-specific kernels.
- Its target is an *external* model pipeline. It is not reported to rewrite its own agent code yet.
- Who or what judges each step is **unknown**. Presumably experiment metrics, plus humans choosing among candidates.
- Whether it keeps an archive or population is **unknown**.

**Results.**
- Its first product is **Flint**, released **2026-10-21**: an Apache-2.0 open-weight coding MoE with about 39.8B total and 2.5B active parameters and a 262K context (S).
- Self-reported scores: Terminal-Bench 2.1 54.9%, "SWE-bench Pro v2" 89.7%, SWE-bench Verified 74.2% (S).
- One WIRED reviewer found it handled a few small coding tasks well on a 48 GB Mac (S).
- Commentators note that Flint shows *AI-assisted model development*, **not** recursive self-improvement. That would need the Eureka Machine to improve *itself* (S: Dataist, The Decoder).

**Links.** TechCrunch (2026-10-21), The Decoder, Dataist, Forbes (book), all listed in Sources.

**A related system that *does* publish its loop.** Weco AI's **AIDE²** ("Recursive self-improvement of AI research agents," arXiv 2609.26457, 2026-09-22). The loop:
- an AI-research agent proposes edits to its own code;
- it benchmarks the edited versions on AI R&D tasks;
- it keeps the edits that win on *hidden* evaluations;
- each accepted rewrite becomes the next editor.

It claims the gains transfer to tasks it never saw (S, abstract only; numbers not seen).

---

## 3. Comparison table

| # | Family / systems | Structure | How agents coordinate | What judges / verifies | Where it wins (task regime) | Headline results | Cost / compute | Sources | Conf. |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Single agent with tools** (ReAct-style; Claude Code / Codex / mini-SWE-agent as a single loop) | One LLM in a tool loop, with one context | None; the transcript is the state | Environment feedback: tests, execution, tool output | Most coding and agentic tasks where the context fits. Many frontier SWE-bench and Terminal-Bench numbers are single-agent with minimal harnesses (Fugu's own baselines used mini-SWE-agent / Terminus 2) | Baseline for everything below | Cheapest. Anthropic: an agent uses about 4x the tokens of a chat | anthropic.com/engineering/multi-agent-research-system | S |
| 2 | **Single agent + subagents** (Anthropic Research). Also here: **Sakana Fugu** (learned router), **Fugu-Ultra** (learned topology designer), **Kimi K2.5 Agent Swarm** | A lead agent plans and spawns parallel subagents with separate contexts, then synthesizes. Fugu: a trained orchestrator over a pool of *different* frontier models. Kimi: an RL-trained orchestrator with up to 100 subagents | Lead writes task descriptions; subagents return compressed findings. Fugu-Ultra: access lists define who sees what, agents are isolated within a workflow, and tool memory is shared across workflows | Anthropic: an LLM judge plus human evaluation of research output. Fugu: training-time ground truth; at inference, only peer LLMs. Kimi: RL reward during training | Breadth-first research and wide search where subtasks are independent (Anthropic: when "the value of the task is high enough"). Fugu: heterogeneous skills across models (builder/debugger pairs) | Anthropic: an Opus 4 lead with Sonnet 4 subagents beat single-agent Opus 4 by **90.2%** on an internal research eval. Fugu-Ultra: SWE-Bench Pro **73.7** vs best single model 69.2; TB 2.1 **82.1** vs 78.2. Kimi: **3-4.5x** fewer critical steps in wide search (S) | Anthropic: about **15x** chat tokens; token use explains 80% of BrowseComp variance. Fugu Ultra v2 about $5/$30 per M tokens (S). Kimi: up to 1,500 coordinated steps | anthropic.com/engineering/multi-agent-research-system; github.com/SakanaAI/fugu; kimi.com/blog/kimi-k2-5 | Anthropic S; Fugu P; Kimi S |
| 3 | **One writer + advisors** (Cognition / Devin) | A single thread does all writes; other models act as read-only advisors or reviewers | Share full traces, not single messages. Keep decision context unified. Reviewer runs with *no* shared context | Code review by a separate agent; tests | Long coding tasks where parallel writers make conflicting implicit decisions | "Don't Build Multi-Agents" (2025-06-12). Reported April 2026 follow-up allows review loops, "smart friend" routing, manager-worker delegation. Devin Review reportedly catches about 2 bugs per PR, 58% severe (S, unverified) | Not reported | cognition.ai/blog/dont-build-multi-agents (unreachable here); secondary summaries | S |
| 4 | **Operational org: SOP / role-based** (MetaGPT, ChatDev) | Fixed roles (PM, architect, engineer, QA) in a waterfall / SOP pipeline | Structured documents passed through a shared message pool (MetaGPT); paired "chat chain" dialogues per phase (ChatDev) | Role-based review; executable feedback / unit tests | Small, well-specified software projects; tasks with a known process | MetaGPT: HumanEval **85.9%**, MBPP **87.7%** pass@1 (ICLR 2024) | ChatDev: about **$0.30** and under 7 min per generated app (paper's figure) | github.com/geekan/MetaGPT; github.com/OpenBMB/ChatDev; arXiv 2308.00352, 2307.07924 | M |
| 5 | **Science-like** (Google AI co-scientist; Sakana AI Scientist v1/v2; Agent Laboratory) | Generator / critic / ranker roles in a research cycle. v2 adds experiment-manager-guided agentic tree search. Agent Lab: literature review, then experiments, then report | Co-scientist: a Supervisor assigns Generation, Reflection, Ranking, Evolution, Proximity and Meta-review agents. Ranking is an **Elo tournament** of pairwise "debates" | LLM reviewers (automated peer review), Elo self-play, and ultimately wet-lab or human peer review | Open-ended hypothesis generation; ML papers in templated or narrow domains | Co-scientist: AML drug-repurposing candidates inhibited tumor cells in vitro (S). AI Scientist-v2: first fully AI-written workshop paper accepted through peer review (ICLR 2025 workshop, P README; reported scores about 6.33, later withdrawn, M) | AI Scientist v1 about **$15 per paper** (M). Agent Lab: about 84% cheaper than prior autonomous research methods (M) | research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist; github.com/SakanaAI/AI-Scientist-v2; github.com/SamuelSchmidgall/AgentLaboratory (arXiv 2501.04227) | S/P/M |
| 6 | **Swarm on a test suite** (Anthropic parallel-Claude C compiler) | 16 identical Claude Opus 4.6 agents, each in its own Docker container, no orchestrator | Agents claim tasks with lock files and push to a shared git repo. Breakthrough: a GCC "known-good oracle" harness split the kernel build so agents stopped colliding on the same bug | **The test suite** (GCC torture tests, building real projects) plus GCC as an oracle | Huge, decomposable tasks with a dense, trustworthy automated test signal | About 100k-line Rust C compiler that builds **Linux 6.9 on x86, ARM, RISC-V**; **99%** of the GCC torture suite; compiles PostgreSQL, SQLite, Redis, FFmpeg, Doom | About **2,000** Claude Code sessions, about **$20,000** API, about 2 weeks | anthropic.com/engineering/building-c-compiler; theregister.com 2026-02-09 | S |
| 7 | **Population / evolutionary** (FunSearch, AlphaEvolve, OpenEvolve, ShinkaEvolve, NVIDIA Eureka) | A program database or population. LLMs mutate programs; selection keeps the best (islands, MAP-Elites-like) | No dialogue. Coordination happens through the shared archive and sampling. AlphaEvolve mixes Gemini Flash (breadth) and Pro (depth) (S) | **A programmatic evaluator** that scores each candidate (problem objective, simulator reward) | Problems with a cheap, exact scoring function: math constructions, kernels, scheduling, reward design | FunSearch: cap set n=8 size **512** (M). AlphaEvolve: 4x4 complex matrix multiply in **48** multiplications; matched SOTA on about **75%** and improved about **20%** of 50+ open problems; reported **0.7%** of Google fleet compute recovered (S, single source). ShinkaEvolve: circle packing n=26 at **2.635983** in about 150 generations (S; tolerance differs from AlphaEvolve). OpenEvolve matches the n=26 benchmark (P README). NVIDIA Eureka: beat human-expert rewards on **83%** of 29 tasks, **+52%** average normalized (P README) | OpenEvolve: about **$0.01-0.60 per iteration** depending on model (P README). ShinkaEvolve's pitch is "orders of magnitude" better sample efficiency | deepmind.google/blog/alphaevolve-…; github.com/algorithmicsuperintelligence/openevolve; github.com/SakanaAI/ShinkaEvolve (arXiv 2509.19349); github.com/eureka-research/Eureka (arXiv 2310.12931) | S/P/M |
| 8 | **Search + formal verifier** (AlphaGeometry, AlphaProof, AlphaProof Nexus, Harmonic Aristotle, Seed Prover; IMO 2025) | Proposer LLM or policy plus tree search, checked by **Lean** or a symbolic engine. Informal IMO-2025 golds instead used parallel thinking (Deep Think) | Search over proof steps; Lean error messages feed back into the next attempt. Nexus: 4 agent variants, the simplest being independent Gemini 3.1 Pro subagents (S) | **Lean kernel / symbolic deduction**, which is sound. The 2025 natural-language golds were graded by IMO coordinators | Mathematics where statements can be formalized; anywhere a sound checker exists | IMO 2024: AlphaProof + AG2 **28/42** silver (M). IMO 2025: Gemini Deep Think **35/42** official gold; OpenAI experimental 35/42 (graded by ex-judges); Aristotle 5/6 *formal* (gold-equivalent); Seed Prover 30 pts certified, 5/6 after extended search. AlphaProof Nexus: **9 of 353** open Erdős problems, **44 of 492** OEIS conjectures (Science, 2026-10-08) (S) | Nexus: "a few hundred dollars" per problem (S). AlphaProof 2024: up to days per problem (M) | arXiv 2510.01346 (Aristotle); seed.bytedance.com blog; the-decoder.com (Nexus); deepmind.google | S/M |
| 9 | **Ensembles / voting / aggregation** (self-consistency; More Agents Is All You Need; Mixture-of-Agents). Also here: **Sakana AB-MCTS / TreeQuest (Multi-LLM)**; Fugu-Ultra's tree topologies with a learned aggregator | N samples or N models in parallel, sometimes in layers (MoA). AB-MCTS: adaptive tree search that decides "go wider vs go deeper" *and* which LLM to call | Majority vote (self-consistency); a layered aggregator LLM (MoA); Thompson-sampling tree search over models (AB-MCTS) | Agreement between samples, an aggregator LLM, or a task scorer. ARC-AGI-2 used pass@k against the reference | Reasoning with one checkable answer; instruction following (MoA); problems where models have complementary strengths | Self-consistency: GSM8K **+17.9 pts** on PaLM-540B (M). MoA: AlpacaEval 2.0 **65.1%** vs GPT-4o 57.5%, open models only (P README). Multi-LLM AB-MCTS (o4-mini + Gemini 2.5 Pro + R1-0528): about **30%** ARC-AGI-2 pass@250 vs about 23% for o4-mini alone (S) | Linear in N samples or models; AB-MCTS spends up to 250 calls per task | arXiv 2203.11171; arXiv 2402.05120; github.com/togethercomputer/MoA; github.com/SakanaAI/treequest (arXiv 2503.04412) | M/P/S |
| 10 | **Debate** (Irving et al. 2018; Du et al. 2023 multi-agent debate; Khan et al. 2024) | Two or more agents argue over rounds; optionally a weaker judge decides | Read each other's answers and revise (Du), or adversarial argument for a judge (Khan) | A judge (LLM or human), or convergence | Factuality and reasoning (Du); scalable oversight where the judge is weaker than the debaters (Khan) | Khan et al. (ICML 2024 best paper): debate raised non-expert judge accuracy to **76%** (LLM judges) and **88%** (human judges) vs **48% / 60%** naive baselines (M) | Rounds × agents of full generations | arXiv 2305.14325; arXiv 2402.06782 | M |
| 11 | **Self-improving agents** (Reflexion, Voyager, ExpeL, Gödel Agent, Darwin Gödel Machine, Huxley-Gödel Machine, Meta Hyperagents/DGM-H, Weco AIDE², Karpathy autoresearch, **Recursive's Eureka Machine**) | What gets modified varies by system: verbal memory (Reflexion), a skill library (Voyager), an insight store (ExpeL), the agent's own code (Gödel Agent, DGM, HGM, AIDE²), or a target training script (autoresearch, Eureka Machine) | DGM: an **archive** of agent variants; any one can be the parent. HGM: expands self-modifications by estimated clade metaproductivity (CMP). autoresearch: single-agent hill-climb, keep or revert per git commit | Benchmarks (SWE-bench, Polyglot), hidden evals (AIDE²), val_bpb in a fixed 5-min budget (autoresearch), environment success (Voyager), unit tests (Reflexion). Eureka Machine: **unknown**, with humans picking winners (S) | Domains with a cheap, trusted benchmark to climb. Transfer is claimed but contested | Reflexion: HumanEval **91%** pass@1 (M). Voyager: **3.3x** more unique items, up to **15.3x** faster tech-tree milestones (M). DGM: SWE-bench **20.0→50.0%**, Polyglot **14.2→30.7%** (S, matches arXiv abstract). HGM: SWE-bench Verified **61.4%** with GPT-5-mini (S). DGM-H Polyglot held-out 8.4→26.7% (S). Eureka Machine → Flint, self-reported (above) | DGM: about **$22,000** per SWE-bench run, about 2 weeks (S, paper appendix). HGM: "fewer CPU hours" than DGM (S). autoresearch: about 12 experiments/hour on 1 GPU (P README) | github.com/jennyzzt/dgm (arXiv 2505.22954); github.com/metauto-ai/HGM (arXiv 2510.21614); github.com/karpathy/autoresearch; arXiv 2603.19461; arXiv 2609.26457; arXiv 2303.11366, 2305.16291, 2308.10144, 2410.04444 | S/P/M |

### Where the requested systems sit

- **Sakana Fugu sits in row 2, with an edge in row 9.**
  - It is an orchestrator over workers. The difference from Anthropic's lead agent is that the orchestrator is *trained* (SFT plus CMA-ES for Fugu; GRPO for Ultra), and the workers are different vendors' models.
  - Ultra's tree topologies with a task-chosen aggregator are a learned form of Mixture-of-Agents (row 9).
  - Evolution is used **only at training time**. At run time Fugu does not improve itself, so it is not row 11.
- **AB-MCTS / TreeQuest sits in row 9, with a search flavour shared with row 8.**
  - Its judge is a task score, not a sound verifier.
- **Kimi K2.5 Agent Swarm sits in row 2** (S).
- **Gemini Deep Think's "parallel thinking" sits in row 9, inside a single model** (S).
- **AlphaProof Nexus sits in row 8** (S).
- **HGM, Hyperagents (DGM-H), AIDE² and autoresearch sit in row 11.**
- **The Eureka Machine sits in row 11 by its stated aim.** On current evidence it behaves like a row-5 or row-7 research loop aimed at an external model, with humans selecting results.

### Three takeaways for the founder

1. **The verifier decides which family can work.**
   - With a sound checker (Lean, a compiler test suite, an exact objective), search-heavy families win: rows 6, 7 and 8.
   - Without one, the judging falls to LLM judges, Elo ratings or votes (rows 2, 5, 9 and 10). Those are weaker and can be gamed.
2. **Multi-agent setups pay for breadth, not for depth.**
   - Anthropic reports about 15x tokens.
   - Cognition argues that parallel *writers* break consistency.
   - Fugu's gains come from model *heterogeneity*, not from adding more agents.
3. **Most "self-improvement" so far is climbing a benchmark with an archive.**
   - Two claims are unproven: that the agent got better at *improving itself*, and that the gains transfer. Weco's AIDE² and the Eureka Machine both make these claims; for the Eureka Machine nothing has been published.

### Not verified or unknown

- Fugu per-task cost and pool size.
- The Fugu Max benchmark table.
- Every internal detail of the Eureka Machine.
- The exact title of Cognition's April 2026 post.
- AlphaEvolve's 0.7% compute figure (only a secondary source).
- HGM's 61.4% (only a secondary source).
- Every item labelled M.

## Sources

- Sakana Fugu: https://sakana.ai/fugu/ · https://sakana.ai/fugu-release/ · https://sakana.ai/fugu-max-release/ · https://github.com/SakanaAI/fugu · https://arxiv.org/html/2606.21228v1 · https://opencode.ai/data/sakana/fugu-ultra-v2.md · https://datanorth.ai/nl/nieuws/sakana-ai-lanceert-fugu-max-en-fugu-ultra-v2 · https://www.eesel.ai/blog/sakana-fugu-max-pricing · https://anotherwrapper.com/llm-pricing/fugu-ultra-v2
- Eureka Machine / Recursive: https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai/ · https://the-decoder.com/recursive-shows-first-result-of-its-ai-driven-research-process-with-flint/ · https://dataist.ai/news/recursives-flint-puts-self-improving-ai-to-an-early-test/ · https://fourweekmba.com/ai-650m-backed-recursive-says-ai-helped-build-its-first-model/ · https://www.forbes.com/sites/johnwerner/2026/08/27/the-eureka-machine-richard-socher-breaks-down-science-in-the-ai-age/ · https://aiweekly.co/alerts/sochers-recursive-raises-650m-for-self-improving-ai-push · https://www.alphaxiv.org/abs/2609.26457
- Rows 2-3: https://www.anthropic.com/engineering/multi-agent-research-system · https://simonwillison.net/2025/Jun/14/multi-agent-research-system/ · https://kimi.com/blog/kimi-k2-5 · https://agentic-ai.readthedocs.io/en/latest/ContextEngineering/devin/ · https://patmcguinness.substack.com/p/the-ai-agent-architecture-debate
- Row 6: https://anthropic.com/engineering/building-c-compiler · https://www.theregister.com/2026/02/09/claude_opus_46_compiler/ · https://www.infoq.com/news/2026/02/claude-built-c-compiler/
- Row 7: https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/ · https://github.com/algorithmicsuperintelligence/openevolve · https://github.com/SakanaAI/ShinkaEvolve · https://arxiv.org/pdf/2511.23473 · https://github.com/eureka-research/Eureka
- Row 8: https://the-decoder.com/google-deepminds-alphaproof-nexus-solves-decades-old-math-problems-for-a-few-hundred-dollars/ · https://winbuzzer.com/2026/05/26/google-deepmind-says-alphaproof-nexus-is-still-not-agi-xcxwbn/ · https://arxiv.org/pdf/2510.01346 · https://seed.bytedance.com/en/blog/bytedance-seed-prover-achieves-silver-medal-score-in-imo-2025 · https://simonwillison.net/2025/Jul/21/gemini-imo/
- Row 9: https://github.com/togethercomputer/MoA · https://github.com/SakanaAI/treequest · https://venturebeat.com/ai/sakana-ais-treequest-deploy-multi-model-teams-that-outperform-individual-llms-by-30
- Row 5: https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/ · https://github.com/SakanaAI/AI-Scientist-v2 · https://github.com/SamuelSchmidgall/AgentLaboratory
- Row 4: https://github.com/geekan/MetaGPT · https://github.com/OpenBMB/ChatDev
- Row 11: https://sakana.ai/dgm/ · https://arxiv.org/pdf/2505.22954 · https://github.com/metauto-ai/HGM · https://iclr.cc/virtual/2026/poster/10009359 · https://the-decoder.com/a-self-rewriting-ai-from-kaust-revives-jurgen-schmidhubers-vision-of-a-godel-machine/ · https://www.verdent.ai/guides/meta-hyperagents-ai-coding · https://github.com/karpathy/autoresearch
