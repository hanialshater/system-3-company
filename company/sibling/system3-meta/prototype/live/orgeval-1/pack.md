# Org evaluation pack (numbers by code)

generated 2026-10-21T17:03:08.960Z · runs: bench1-meta, bench2-meta, live4

## Trend across runs (oldest first)
| measure | bench1-meta | bench2-meta | live4 |
|---|---|---|---|
| defectsFound | 0 | 4 | 3 |
| tokensPerShipped | 105106 | 167822 | 193177 |
| firstPassYield | 1 | 0.43 | 0.75 |
| caughtBeforeShip | - | 0.5 | 0.75 |
| codeShareOfCatches | - | 0 | 0 |
| humanCatchesCodeCouldHaveMade | 0 | 3 | 1 |
| escaped | 0 | 4 | 1 |
| rulesApplied | 0 | 0 | 7 |

## bench1-meta
- items: 6/6 shipped; 10 sessions, 630638 tokens, 105106 per shipped item, 13.09 min to the last ship
- auto-correction: first-pass yield 1; 0 revises caught by {}; 0 escaped {} found by {}; caught before ship null; 0 of 0 human catches were a class code can check
- revises by class: {}
- learning: repeats after being told: none; same class on several items before any telling: none; roles with more than one session: writer-1, reader, release; memory writer-1 4/4 learned, reader 6/6 learned, release 0/6 learned, writer-2 2/2 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 0 rules, 1 actions; MTG-2 (wbr): 0 positions, 0 objections, 4 decisions, 0 rules, 3 actions; rules applied to orders 0; actions 0/4 done
- compared with current method (Benchmark 1): items 6, sessions 25, tokens 1481983, revisions 5, judges_preferring 0/2

## bench2-meta
- items: 7/7 shipped (integration: PACK); 17 sessions, 1174756 tokens, 167822 per shipped item, 20.22 min to the last ship
- auto-correction: first-pass yield 0.43; 4 revises caught by {"checker":4}; 4 escaped {"duplicate":1,"fact":3} found by {"judge":1,"fact-check":3}; caught before ship 0.5; 3 of 4 human catches were a class code can check
- revises by class: {"consistency":1,"length":3}
  - O-1 STYLE (checker, consistency): Class: the number rule contradicts the sheet own reserved answers and owned facts (a round writer cannot obey both). Instances: (1) ## Difficulty says "No quest
  - O-2 ROUND1 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q1 Why "The Sun is a huge, hot ball of glowing gas
  - O-4 ROUND3 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q4 Why "Because it is tipped over, each end of it 
  - O-6 ROUND5 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q1 Why "It is a tiny space rock that burns up in o
- learning: repeats after being told: none; same class on several items before any telling: writer-1 length O-2,O-4; roles with more than one session: writer-1, reader, release, writer-2; memory writer-1 7/7 learned, reader 11/11 learned, release 0/7 learned, writer-2 4/4 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 0 rules, 3 actions; MTG-2 (wbr): 8 positions, 0 objections, 4 decisions, 0 rules, 8 actions; rules applied to orders 0; actions 3/12 done
- compared with current method (Benchmark 2): items 6, sessions 24, tokens 1449456, revisions 5, judges_preferring 0/2, escaped_facts_wrong_or_misleading 0, escaped_nitpicks 1

## live4
- items: 4/4 shipped (integration: PACK); 11 sessions, 772707 tokens, 193177 per shipped item, 11.51 min to the last ship
- auto-correction: first-pass yield 0.75; 1 revises caught by {"checker":1,"integration":2}; 1 escaped {"consistency":1} found by {"reader":1}; caught before ship 0.75; 1 of 1 human catches were a class code can check
- revises by class: {"format":1,"numbers":1}
  - O-3 ROUND3 (checker, format/numbers): Class 1, numbers not written as digits (MTG-1 item 2 decision: "Numbers as digits"), 6 instances: (a) intro line "All four animals" → "All 4 animals"; (b) Q4 "w
- fixed at integration: fact: - Round 3, Q1 Why line: "soft body" changed to "soft belly". Only a hermit crab's belly is soft (its front and claws have a hard shell), and this now matches th | fact: - Round 3, Q2 Why line: "no fins or gills like a fish" changed to "no backbone and no fins like a fish". Sea stars do breathe through tiny skin gills, so "no gi
- learning: repeats after being told: none; same class on several items before any telling: none; roles with more than one session: writer-2, reader, release; memory writer-1 2/2 learned, writer-2 3/3 learned, reader 5/5 learned, release 0/4 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 5 rules, 1 actions; rules applied to orders 7; actions 0/1 done

## Notes
- Agent memory is per company: a role's memory does not travel to the next run, so learning across runs can only show up as process (rules, checks, briefs).
- Revises in runs before findings were kept per revise use the order's last findings; 'unrecorded' means a revise with no findings text.
- Escapes come from the escapes file (blind fact-checks, judges, WBRs), not from the run's own record.