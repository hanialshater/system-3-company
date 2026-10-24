# Benchmark 9b results: a population forked from a warm session (PF), against V

owner: vp-meta · date: 2026-10-24 · status: **final** · protocol and predictions: [B9B.md](B9B.md) (committed before
the run) · principles tested: [../../PRINCIPLES.md](../../PRINCIPLES.md) 2, 3 and 4

## Result (quiet final scoring: 5 interleaved runs each, nothing else on the machine)

| Arm | Score | Lua | Held-out corpus | Cost | Active minutes |
|---|---|---|---|---|---|
| **V** (one agent, B9) | **0.529** | 0.515 | 0.544 | **$18.00** | 114 |
| **PF** (warm forks) | 0.624 | 0.641 | 0.608 | $60.53 | 109 |
| start (re-judged) | 1.000 | 1.032 | 0.969 | | |
| for reference: B9 P (cold population) | 0.613 | | | $21.26 | 227 |

V re-judged at 0.529 in this session (0.542 in B9's): the judge's noise is again about ±2%. **PF lost to V by 18%, at
3.4× V's cost**, and did no better than B9's cold population. A loss, written up as one.

**The curve:** scout (no change) → round 1's best, *measure*, 0.733 (full judge) → round 2's best, *bold* (forked from
*measure*), 0.640 → 0.624 quietly.

| Session | Minutes used | Cost | Peak context | Fast judge |
|---|---|---|---|---|
| scout | 24.8 of 25 | $4.36 | 189k | (no change) |
| r1 measure | 30.0 of 45 | $7.58 | 239k | 0.727 (full 0.733, the winner) |
| r1 bold | 30.8 of 45 | $6.74 | 226k | 0.753 |
| r1 lean | 32.1 of 45 | $6.72 | 230k | 0.772 |
| r1 sceptic | 31.8 of 45 | $6.04 | 220k | 0.862 |
| r2 bold | 19.3 of 40 | $9.12 | 269k | 0.669 (full 0.640, the winner) |
| r2 lean | 18.4 of 40 | $10.60 | 283k | 0.805 |
| r2 sceptic | 21.3 of 40 | $9.38 | 273k | 0.807 |

## Predictions

| # | Prediction | Verdict |
|---|---|---|
| B9b-1 | PF ≤ 0.526 | **wrong** (0.624; V 0.529) |
| B9b-2 | forks' median peak context ≥ 150k | **held** (median 230k, against B9 P's 35k; most of it inherited from the scout) |
| B9b-3 | PF ≤ $54 | **wrong** ($60.53: the round-2 forks cost $9-11 each, against a planned $7; the cap was on time only) |
| B9b-4 | board ≥ 8 entries, ≥ 2 dead ends, a round-2 fork names a round-1 entry | **wrong on one part**: 23 entries and all three round-2 plans cite round-1 entries (#3, #7, #11, #12), but only 1 dead end (2 more "not doing" notes were posted as hypotheses) |
| B9b-5 | the round-1 winner is not *measure* | **wrong** (*measure* won round 1; *bold* won round 2) |
| B9b-6 | Lua ÷ corpus between 0.9 and 1.1 | **held** (1.05: the gains were general) |

Operator's priors: B9b-1 45% (wrong), B9b-2 85% (held), B9b-3 70% (wrong), B9b-4 60% (wrong), B9b-5 55% (wrong), B9b-6
75% (held).

## What happened

- **The scout understood the system** (NOTES.md: a profile by phase and function, the directions). All four round-1
  forks then went to the same first move, per-batch preprocessor caches (header tokens, canonical paths, the prelude's
  macro table), and three of them posted it to the board within minutes of each other. Diversity of temperament did
  not produce diversity of direction: one warm context, forked four times, saw the same top of the profile.
- **The board worked as a record, not yet as a division of labour.** 23 entries, each with evidence and a wrong-if:
  measured findings (caches byte-identical on Lua and 391 visible files; overlapped namespace loading; precedence
  climbing in the parser; a two-worker pipelined batch), warnings (two forks independently ruled out clearing
  `RT/CHECK_SPECS` as too close to the rules), and process knowledge ("do not edit the tree while the fast judge
  runs on it", #3), which every round-2 fork then used.
- **Four parallel sessions saturated the machine, and the forks knew it.** Three posted that the fast judge's ratios were
  noise ("this box is now ~4x slower than during scouting"; the same start tree timed at 32-39 s): the measurement that
  should guide each move was unusable while the population ran. B9 P had the same problem; warm contexts did not fix it.
- **The forks stopped early.** Round 1 used about 31 of 45 minutes, round 2 about 20 of 40: each fork did one or two
  measured changes, called the returns falling, and handed in. V, in one session, kept going for 114 minutes.
- **The large structural wins came late or not at all.** Round 2's *bold* fork found the pipelined parallel batch (V's
  kind of win) in its 19 minutes; V had found parallel loading, direct linking and faster tokens in its first round.

## What this says

1. **Warm context fixed the context deficit but not the result.** Forks held 220-280k tokens (B9 P: 35k), started
   from a real understanding of the system, and used a shared board well. They still lost to one agent by 18%. The
   "starved population" diagnosis was half right: context was missing, but it was not the binding constraint.
2. **On one machine, a population pays twice for parallelism**: once in tokens (each fork re-reads a large context on
   every turn: round-2 forks cost about $0.45 a minute against V's $0.16), and once in measurement (parallel sessions
   make each other's timings noise). A performance task whose referee is wall-clock time is the worst case for a
   population sharing one box.
3. **Forking from one context collapses diversity.** Temperament prompts changed how the forks worked (the sceptic
   spent round 2 stress-testing, with 160 generated programs, and found nothing broken), not what they chose to work on.
   The Zen check already warned: "five judges sharing one source are one witness".
4. **Short horizons cut depth.** Each fork, told it had a fixed slot and others in parallel, stopped at the first
   flattening. A single agent with the whole budget does not.

**For B9c** (running now, protocol committed before these results): it keeps the warm fork and the board, and adds
what PF lacked: combining everyone's kept work into one main, and persistent workers across three rounds. It shares
PF's two known handicaps (parallel sessions on one box; one source context), so the prior that it beats V falls.
