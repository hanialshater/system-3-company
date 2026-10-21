# Org evaluation pack (numbers by code)

generated 2026-10-21T17:39:43.551Z · runs: bench2-meta, live4, bench3-a, bench3-b

## Trend across runs (oldest first)
| measure | bench2-meta | live4 | bench3-a | bench3-b |
|---|---|---|---|---|
| defectsFound | 4 | 3 | 16 | 17 |
| tokensPerShipped | 167822 | 193177 | 174122 | 201292 |
| firstPassYield | 0.43 | 0.75 | 0.57 | 0.57 |
| caughtBeforeShip | 0.5 | 0.75 | 0.89 | 0.89 |
| codeShareOfCatches | 0 | 0 | 0.81 | 0.47 |
| humanCatchesCodeCouldHaveMade | 3 | 1 | 1 | 4 |
| escaped | 4 | 1 | 2 | 2 |
| rulesApplied | 0 | 7 | 18 | 0 |

## bench2-meta
- items: 7/7 shipped (integration: PACK); 17 sessions, 1174756 tokens, 167822 per shipped item, 20.22 min to the last ship
- auto-correction: first-pass yield 0.43; 4 revises caught by {"checker":4}; 4 escaped {"duplicate":1,"fact":3} found by {"judge":1,"fact-check":3}; caught before ship 0.5; 3 of 4 human catches were a class code can check
- revises by class: {"consistency":1,"length":3}
  - O-1 STYLE (checker, consistency): Class: the number rule contradicts the sheet own reserved answers and owned facts (a round writer cannot obey both). Instances: (1) ## Difficulty says "No quest
  - O-2 ROUND1 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q1 Why "The Sun is a huge, hot ball of glowing gas
  - O-4 ROUND3 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q4 Why "Because it is tipped over, each end of it 
  - O-6 ROUND5 (checker, length): Class: Why line over the 20-word limit (STYLE Why-line voice: one sentence, at most 20 words). Instances: (1) Q1 Why "It is a tiny space rock that burns up in o
- self-checks (code, before hand-in): 0 run, 0 failed {} (not logged in this run)
- learning: repeats after being told: none; same class on several items before any telling: writer-1 length O-2,O-4; roles with more than one session: writer-1, reader, release, writer-2; memory writer-1 7/7 learned, reader 11/11 learned, release 0/7 learned, writer-2 4/4 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 0 rules, 3 actions; MTG-2 (wbr): 8 positions, 0 objections, 4 decisions, 0 rules, 8 actions; rules applied to orders 0; actions 3/12 done

## live4
- items: 4/4 shipped (integration: PACK); 11 sessions, 772707 tokens, 193177 per shipped item, 11.51 min to the last ship
- auto-correction: first-pass yield 0.75; 1 revises caught by {"checker":1,"integration":2}; 1 escaped {"consistency":1} found by {"reader":1}; caught before ship 0.75; 1 of 1 human catches were a class code can check
- revises by class: {"format":1,"numbers":1}
  - O-3 ROUND3 (checker, format/numbers): Class 1, numbers not written as digits (MTG-1 item 2 decision: "Numbers as digits"), 6 instances: (a) intro line "All four animals" → "All 4 animals"; (b) Q4 "w
- self-checks (code, before hand-in): 0 run, 0 failed {} (not logged in this run)
- fixed at integration: fact: - Round 3, Q1 Why line: "soft body" changed to "soft belly". Only a hermit crab's belly is soft (its front and claws have a hard shell), and this now matches th | fact: - Round 3, Q2 Why line: "no fins or gills like a fish" changed to "no backbone and no fins like a fish". Sea stars do breathe through tiny skin gills, so "no gi
- learning: repeats after being told: none; same class on several items before any telling: none; roles with more than one session: writer-2, reader, release; memory writer-1 2/2 learned, writer-2 3/3 learned, reader 5/5 learned, release 0/4 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 5 rules, 1 actions; rules applied to orders 7; actions 0/1 done

## bench3-a
- items: 7/7 shipped (integration: PACK); 18 sessions, 1218857 tokens, 174122 per shipped item, 18.17 min to the last ship
- auto-correction: first-pass yield 0.57; 3 revises caught by {"checker":3,"code (self-check)":13}; 2 escaped {"fact":2} found by {"fact-check":2}; caught before ship 0.89; 1 of 3 human catches were a class code can check
- revises by class: {"numbers":1,"fact":2,"consistency":1}
  - O-2 ROUND1 (checker, numbers): Class: rounded number stated as exact (Why not true on its own). 1 instance: Q3 Why says "the trip takes 8 minutes" -> must say "about 8 minutes" (light takes a
  - O-5 ROUND4 (checker, fact/consistency): Class A, untrue fact (every fact must be true): (1) Q4 Why "its lakes are filled with liquid gas" -> "liquid gas" is a contradiction and misleading; Titan lakes
  - O-6 ROUND5 (checker, fact): Class: facts not true as written (comet tail). (1) Q4 Why "push its ice and dust outward" -> the tail is gas and dust (ice turns to gas first); required: "push 
- self-checks (code, before hand-in): 35 run, 13 failed {"other":9,"length":4}
- learning: repeats after being told: none; same class on several items before any telling: writer-2 fact O-5,O-6; roles with more than one session: writer-1, writer-2, reader, release; memory writer-1 5/5 learned, reader 10/10 learned, release 0/7 learned, writer-2 5/5 learned
- collaboration: MTG-1 (meeting): 6 positions, 0 objections, 2 decisions, 10 rules, 0 actions; rules applied to orders 18; actions 0/0 done

## bench3-b
- items: 7/7 shipped (integration: PACK); 22 sessions, 1409043 tokens, 201292 per shipped item, 23 min to the last ship
- auto-correction: first-pass yield 0.57; 6 revises caught by {"checker":6,"code (self-check)":8,"integration":3}; 2 escaped {"fact":1,"format":1} found by {"fact-check":1,"integration":1}; caught before ship 0.89; 4 of 6 human catches were a class code can check
- revises by class: {"other":2,"length":3,"duplicate":1,"format":1}
  - O-5 ROUND4 (checker, other): CLASS 1 wrong topic: title "# Round 4: Space Rocks" -> must be "# Round 4: Moons" per work/STYLE/page.md (Rounds list). CLASS 2 answers owned by another round (
  - O-6 ROUND5 (checker, length): Class 1, giveaway of another answer (1 instance): Q4 question says "flew past Pluto in 2015", which hands over the answer to Q2 (Pluto) in the same round → requ
  - O-6 ROUND5 (checker, length): Both prior classes fixed: Q4 no longer names Pluto (now asks which way a comet tail points), and Q1 is 19 words (all four questions are at most 20 words). Class
  - O-6 ROUND5 (checker, other): Prior class fixed: Q4 answer is now 3 words. Class 1, answer that does not name what it means (1 instance): Q4 "**Answer:** Away from it" — in the question, "it
  - O-6 ROUND5 (checker, duplicate): Prior class fixed: Q4 no longer has the pronoun answer; it now asks what comets are made of (Answer: Ice and dust), a true fact that fits Round 5 and is on no o
  - O-7 PACK (checker, length/format): Class: format slip, Answer over the STYLE 1-3 word cap (1 instance). Round 3 Q3 "**Answer:** The Great Red Spot" is 4 words -> required: an answer of at most 3 
- self-checks (code, before hand-in): 39 run, 8 failed {"other":6,"duplicate":2}
- fixed at integration: format: - Round 5 heading: changed "Dwarf planets, asteroids and comets" to "Dwarf Planets, Asteroids and Comets", so all five round titles use the same capitalisation  | format: - Round 3 Q3 answer: dropped the leading "The", because the style sheet caps answers at three words and the old answer had four (format slip); the Why line alre | other: - No other changes. Read as one pack, the 20 answers are all different, no question or Why line hints at another round's answer, the facts agree across rounds (
- learning: repeats after being told: writer-2 length (told on O-6, again on O-7); same class on several items before any telling: none; roles with more than one session: writer-2, writer-1, reader, release; memory writer-2 9/9 learned, writer-1 4/4 learned, reader 13/13 learned, release 0/7 learned
- collaboration: no meetings; rules applied to orders 0; actions 0/0 done

## Notes
- Agent memory is per company: a role's memory does not travel to the next run, so learning across runs can only show up as process (rules, checks, briefs).
- Revises in runs before findings were kept per revise use the order's last findings; 'unrecorded' means a revise with no findings text.
- Escapes come from the escapes file (blind fact-checks, judges, WBRs), not from the run's own record.