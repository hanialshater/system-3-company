# Benchmark 2: a solar-system quiz pack, Meta tools against the current method (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Don't stop" (after Benchmark 1)

## Why a second task

Benchmark 1 was one story, and the story's risk was consistency (pronouns, tense). A quiz pack carries different risks:
- **facts:** a wrong answer is a defect a reader may not catch;
- **duplicates:** five writers pick the same favourite facts;
- **format discipline.**

This run also tests the three changes Benchmark 1 asked for:
- `supervisor.mjs cycle`, one command per wake;
- `meta.mjs batch`, set-up in one command;
- an integration order (`PACK`) that reads the whole pack before it ships.

## The task (the same brief for both arms)

A quiz pack for ages 8-10 about **the solar system**. It comes in two parts:
- **`STYLE`, a style sheet:**
  - `## Format`: how a question, its answer and its "why" line look;
  - `## Rounds`: five lines `- Round n: <topic>`, with no topic overlap;
  - a difficulty rule.
- **Five rounds, `ROUND1`…`ROUND5`.** Each round:
  - starts with the line `# Round n: <topic>`;
  - has exactly 4 questions, each with `**Qn.**`, `**Answer:**` and a one-sentence `**Why:**`;
  - runs 100-300 words;
  - is true, uses no fact twice in the pack, and is readable at ages 8-10.

Meta adds `PACK`: `pack.md` assembles the five shipped rounds and fixes cross-round problems. The current method's equivalent is the editor's acceptance read.

**The hidden rubric (code)**, the same for both arms:
- the style sheet has its sections and 5 round lines;
- each round has its title line, 4/4/4 Q/Answer/Why lines and 100-300 words;
- reading ease ≥ 60; no banned words;
- **no answer repeated across rounds**, compared as normalised answer text.

**Fact-check:** a fresh fact-checker session per arm counts factual errors. It sees one pack and does not know which arm wrote it.

**Blind judges:** two, with A/B swapped.

## Arms

- **Current method** (`live/bench2-baseline/`), as in Benchmark 1:
  - the editor writes the style sheet;
  - one writer session per round, one reader session per check;
  - a writer and a reader session per revision;
  - editor acceptance;
  - a WBR written by an agent from `board.md`.
- **Meta** (`live/bench2-meta/`, `storybook` spec reused: editor, two writers, reader):
  - one `batch` for the set-up: channels, goals with code-measured criteria, a project, a kickoff meeting, orders (`STYLE`, `ROUND1-5 --after=STYLE`, `PACK --after=ROUND1-5`) with text checks;
  - the kickoff: two writers' private positions (topic split, difficulty, the "why" voice), then the editor decides and delegates;
  - `supervisor.mjs cycle` at every wake, with the briefs it prints used as written;
  - the WBR as in Benchmark 1.

Measured the same way as in Benchmark 1. Orchestrator actions count every agent launch and every command I type, `batch` and `cycle` included.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| C1 | Meta agent tokens per accepted item ≤ 60% of the current method, the integration order included | > 80% |
| C2 | Meta orchestrator actions ≤ 60% of the current method, now that set-up and bookkeeping are code | > 90% |
| C3 | Meta wall time ≤ 1.5× the current method | > 2× |
| C4 | Meta factual errors ≤ the current method's (fact-checker, blind) | Meta has more |
| C5 | Duplicate answers across rounds: Meta 0; the current method ≥ 1 before acceptance | Meta ships a duplicate |
| C6 | The judges prefer Meta or tie in at least one ordering | both prefer the current method |
| C7 | No hand bookkeeping in Meta: 0 `launched`, `usage` or `watch` commands typed | any typed |

## Results (run 2026-10-21, 16:07-16:40 UTC; scored after the run, predictions above unchanged)

The record is in `live/bench2-record/`:
- action logs and per-session usage;
- every `cycle` output, with the briefs code wrote;
- the hidden rubric, with one fix noted below;
- both WBRs, both packs, and the fact-checks and judges.

| Measure | Current method | Meta | Meta / current |
|---|---|---|---|
| Agent sessions to an accepted pack | 24 | 15 | 63% |
| Agent tokens to an accepted pack | 1,449,456 | 1,012,025 | **70%** |
| With the WBR | 1,520,370 (25 sessions) | 1,174,756 (17 sessions) | 77% |
| Wall time, first dispatch to accepted or shipped | 12 min 19 s | 20 min 14 s | **1.64×** |
| Orchestrator actions | 26 (1 set-up, 25 launches) | 37 (init, batch, wbr open, 17 cycles, 17 launches) | **142%** |
| of which agent launches | 25 | 17 | 68% |
| Hand bookkeeping (launched, usage, watch) | - | **0** | - |
| Revise loops | 5, plus 1 acceptance round sent back | 4 (STYLE once; ROUND1, 3, 5 once each) | - |
| Hidden rubric | 6/6 | 7/7 (PACK included) | same |
| Duplicate answers across rounds | 0 | 0 | same |
| Fact-check: wrong / misleading / nitpick | 0 / 0 / 1 | 0 / 0 / 3 | - |
| Blind judges (6 criteria × 2 orderings) | 1 win | **9 wins** (2 ties) | - |
| "Would publish" (both orderings) | 0/2 | 2/2 | - |

**Scoring:**
- **C1 wrong (70% against ≤ 60%), not refuted (> 80%).** Benchmark 1's 38% did not carry over.
- **C2 refuted (142% against ≤ 60%).** `cycle` removed the bookkeeping, but it is still one typed command per wake. 17 cycles plus 17 launches is more than the current method's 25 launches with no commands.
  - What is left is the wake itself. When a session ends, the harness should run `cycle` and hand over its briefs, which leaves only the launches (68%).
- **C3 wrong (1.64× against ≤ 1.5×), not refuted (< 2×).** Meta's rounds waited on a serial chain: the kickoff, then the style sheet, its check, its revision and its re-check. That is 5 sessions before any round started, while the current method's 5 writers started at minute 2.
- **C4 holds on errors and is worse on nitpicks.** Neither pack has a wrong or misleading fact; Meta has 3 nitpicks to 1.
  - One of them, "thick clouds trap heat" on Venus, is exactly the claim the current method's reader caught in its own pack. Meta's reader did not.
- **C5 half right.** Meta shipped 0 duplicate answers. So did the current method, so its half was wrong.
  - Meta did ship a cross-round giveaway: Round 1's why line calls Pluto a dwarf planet before Round 5 asks for it. PACK, built to catch exactly that, logged it as "agreement". Judge 1 and Meta's own WBR caught it, and the WBR opened a fix (ISS-14, ISS-15).
- **C6 right.** Both judges would publish Meta's pack, and Meta won 9 of 12 criteria.
- **C7 right.** Zero hand bookkeeping; every launch was planned and briefed by code.

**Why Meta's cost edge shrank from 38% to 70%:**
1. **A mechanical rule judged by people.** The kickoff set "why ≤ 20 words". No order check carried it, so test1 passed lines of 21-22 words, and the reader sent back 3 of 5 rounds.
   - Those 3 cost 2 writer sessions and a reader re-check, about 196k.
   - Fixed in code during the run: `lineMaxWords` in text checks.
2. **The serial style-sheet gate.** The STYLE loop cost 2 sessions (129k) and 8 minutes on the critical path.
   - Its cause was a rule the kickoff itself decided ("every number says about") that contradicted the kickoff's own reserved answer, 1969.
3. **Integration and ritual cost more sessions.** The PACK order took 2 sessions (140k). The WBR is now two judgment sessions planned by code (163k), against one in Benchmark 1.
4. **This time the current method had good briefs.** I gave its writers the same rules Meta's orders carried. Benchmark 1's current method was hurt by a vague bible, and here the style sheet's gaps were fixed in one editor pass.

**Tool defects found, all fixed in this run (54 tests):**
- **Text checks:**
  - `mustInclude` was an unescaped regex: `**Q1.**` threw, and `## Format` could never match.
  - They also gain `lineMaxWords`.
- **Planning outside rooms:**
  - A non-room launch (kickoff positions) held back the same role's room work for 5 minutes.
  - Briefs now carry the role's open tracker actions.
- **The WBR chair brief** said `meeting close`, which would have skipped the WBR record. It now says `wbr close`.
- **A refused command kept its partial changes.** A refused `meeting decide` left a tracker action behind. A refusal now saves only the refusal.
- **WBR pack:**
  - The misses list ignored orders revised once;
  - Page 0's first window had no start.
- **`meta.mjs help`** printed only an error; `need()` named only the first missing flag.

**My errors and rubric fixes:**
- My STYLE order banned the six words anywhere in the sheet, while the kickoff asked the sheet to list them; the writer spelled them out.
- My rubric's STYLE test counted ownership lines ("**Round 1** owns …"). I fixed it before scoring; it applies to both arms and is noted in the rubric.

**Across Benchmarks 1 and 2 (n = 2, one model family):**
- **Quality: Meta wins both times.** Blind judges preferred Meta overall in all 4 orderings. The kickoff meeting, which settles decisions before anyone writes, is the mechanism the judges' reasons point to.
- **Cost: Meta wins both times.** It cost 38% and 70% of the current method's tokens. The size of the win depends on whether the code checks carry the kickoff's rules.
- **Speed: mixed.** Meta was faster with a light gate (0.89×) and slower with a heavy one (1.64×).
- **Orchestration: not won yet.** It needs the harness to call `cycle` on its own.

**Next:**
1. Turn kickoff decisions that code can check into order checks automatically, for example an action "add check" whose result edits the order's `checks`.
2. Let rounds start in parallel with the STYLE check when the kickoff has decided topics. The gate should be the decisions, not the document.
3. Run `cycle` from a harness hook when an agent finishes.
4. Make PACK's cross-round check a code check: answers, plus answer words that appear in another round's lines.
