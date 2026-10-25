# Benchmark 12 results: SQLite compatibility by SQLite's own test suite (the autonomous org O, against one agent V)

owner: vp-meta · date: 2026-10-25 · status: **final** · protocol and predictions: [B12.md](B12.md) (committed before
the run) · knowledge base after the run: [../../knowledge/KB.md](../../knowledge/KB.md) (106 entries, B11 and B12)

## Result (the full judge on each arm's final head: 480 hidden test files of SQLite 3.53.4's own suite)

| Arm | Hidden score (mean per test file) | All hidden statements | Scripts entirely right | Visible (mean per file) | Cost | Wall clock of the work |
|---|---|---|---|---|---|---|
| **V**, one agent | **86.92%** | 88.08% | 1,034 / 1,520 | 91.13% | $145.05 | 142 min (22 turns) |
| **O**, the org | **85.76%** | 86.54% | 1,006 / 1,520 | 89.48% | $142.27 | **63 min** (first land 23:31, last 00:34) |
| start (B11 V's engine) | 57.80% | 53.27% | 416 / 1,520 | 58.41% | | |

Both arms passed the rules (deterministic; no process or database access). **V won by 1.2 points at the same cost;
O did its work in less than half the wall-clock time.** The task did not saturate: both are 13-14 points from 100%.

## How the org divided the work (27 lands, none refused; each member's lands in its own area of SQLite)

| Member | What it landed |
|---|---|
| m-architect (Opus) | the schema layer (`sqlite_master` with stored CREATE text, transactions), PRAGMAs and `pragma_*` table-valued functions, ATTACH/DETACH, ANALYZE and VACUUM, lazy view resolution |
| m-engine (Opus) | CTEs (recursive), nested joins, window functions (frames, EXCLUDE, FILTER), views compiled from their source, RIGHT/FULL OUTER JOIN, row values, GROUP BY and ORDER BY behaviour |
| m-language (Sonnet) | ALTER TABLE (rebuild from stored SQL, ADD/DROP constraint), bind parameters, triggers (BEFORE/AFTER/INSTEAD OF, RAISE), generated columns, AUTOINCREMENT, ON CONFLICT actions, UPDATE FROM, foreign-key enforcement |
| m-values (Sonnet) | printf/format, date and time functions, JSON (functions, arrows, `json_each`/`json_tree`, aggregates, subtypes), unhex, `case_sensitive_like` |

Main rose at every land from 58.4% to 89.5% (visible) in 63 minutes; then every member judged the work done for the
budget left and went idle at 00:34-00:36 with $142 spent (95% of the cap).

## Predictions

| # | Prediction | Verdict |
|---|---|---|
| B12-1 | O beats V by ≥ 3 points (hidden) | **wrong** (V 86.92, O 85.76) |
| B12-2 | both improve by ≥ 15 points | **held** (V +29.1, O +28.0) |
| B12-3 | neither passes 95% of hidden statements | **held** (88.1, 86.5) |
| B12-4 | O's members divide the work by area of SQLite | **held** (the table above: four disjoint areas) |
| B12-5 | V's context compacts at least once | **wrong** (none; peak 810k tokens) |
| B12-6 | members use the knowledge base | **held for reading** (all four members and V opened spec/KNOWLEDGE.md, 8-18 mentions each in their transcripts); not traced to a specific change |
| B12-7 | hidden within 4 points of visible, both | **wrong for V** (91.1 → 86.9, 4.2 points); held for O (89.5 → 85.8, 3.7) |
| B12-8 | O does not stop itself before 80% of the budget | **held** (it stopped at 95%) |

## Harness notes

- A woken member that does not read its notes is woken again at once: m-values looped wake → idle at 00:36 (a few
  cents). Fix: count a wake's notes as seen.
- O ended its own work at 00:36; the harness waited for notes until the operator ended the arm at 02:51 (as in B11).
- No harness failure changed a score this time.

## Off-boarding

All five sessions off-boarded after the run: 52 entries, now in the knowledge base with B11's 54 (106 entries, 33
topics, `knowledge/KB.md`).

## What this says

1. **On a broad, non-saturating task at the same budget, the autonomous org came within 1.2 points of one strong
   agent, and finished in 44% of the time.** Four agents in parallel turn the same money into the same progress about
   twice as fast in wall clock: the org's real advantage here was **speed**, not quality.
2. **The org divided the work by itself and the parts composed**: 27 lands from four members, each in its own area,
   every one of them raising or keeping main, none refused; ten notes were enough coordination.
3. **The single agent still did slightly better per dollar**: it went deeper (more scripts entirely right, 1,034 against
   1,006) and kept improving past the point where the org stopped. The org stopped itself at 95% of its budget, with
   its members judging the remaining money too little for another useful pass: with a larger budget, or a cheaper
   rate, it would have kept going, and its curve was still rising when it stopped.
4. **The milestone ("an org beats one strong agent at the same budget on work that does not saturate") is not yet
   reached; the gap is now 1.2 points, down from 18-40% in B9 and B10.** The next design should test the org's speed
   advantage directly: the same wall-clock limit for both arms (where four agents get four times the work done), or a
   budget large enough that neither arm's money runs out before the work does.
