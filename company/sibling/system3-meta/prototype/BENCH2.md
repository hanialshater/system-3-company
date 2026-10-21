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
