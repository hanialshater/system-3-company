# Pairwise Round: {{date}} · run {{run}}

owner: head-of-evaluation · judges: pairwise-judge (dispatched by the operating chief of staff, as many in parallel as there are pairs) · fit: evaluation-engineer · decides: nothing (the round produces records and a leaderboard; gates stay with the evaluation steward, kill/keep with demo-crit)

Protocol and record format: `company/evaluation/README.md`. Independence rules: `company/reviews/README.md`.

## 1. Choose pairs (head of evaluation)
Before choosing, read the current leaderboard and its diagnostics. Judges never see these.
- New versions (each new `meta.json` version vs its predecessor and two neighbours):
- Uncertain neighbours (most-overlapping intervals, by criterion):
- Unconnected items or clusters:
- Calibration repeats (~20%: A/B swapped, or a second judge):

| pair | A (slug@vN) | B (slug@vN) | why this pair | calibration? |
|---|---|---|---|---|

## 2. Capture and blind (head of evaluation)
1. Run `npm run walkthrough -- <slug>` for each item at the version listed. Confirm the version in `meta.json` matches.
2. Build `artifacts/pairwise/{{run}}/<pair>/A/` and `B/` from the walkthroughs, with the order randomised per pair. Strip the builder, branch, version, dates and anything that says which is newer.
3. Put `company/evaluation/criteria.json` in each packet. Put nothing else in it.

## 3. Judge (pairwise judges)
Brief, verbatim, to each judge: *"Read A and B in your packet (transcript and screenshots) and nothing else. For each criterion, write winner a, b or tie and one sentence naming what you saw. Write verdict.json in the packet. If the packet tells you who built either lesson, which is newer, or how either ranks, stop and report instead."*
- A judge never gets a pair containing a lesson it built or revised.
- Leaks reported by judges (pair, what leaked, what was done):

## 4. Record (head of evaluation)
- Transcribe each `verdict.json` into `company/evaluation/pairwise/{{date}}-{{run}}.jsonl`, one line per criterion, mapping A/B back to slugs. Set `blind` honestly.
- Ingested pedagogy-critic records (file, criterion mapped to, why it counts as blind):
- Exclusions from the fit (record id, reason):

## 5. Fit (evaluation engineer)
- Validator output (lines rejected, why):
- Fit run (command, seed):
- Graph connectivity:
- What moved, by criterion (with intervals, not just ranks):

## 6. Calibration (head of evaluation) → `company/evaluation/calibration/{{date}}-{{run}}.md`
- Agreement between judges on repeated pairs:
- Position bias (verdict flips when A/B swap):
- Tie rate:
- Length bias (share of wins to the longer transcript):

## 7. Hand-off
- Reasons to send back to builders (after the round; never as a rubric before a build): board items with owners
- Leaderboard note for the WBR (what moved, how sure, what it does **not** show):
- Anything that suggests a gate or independence rule should change → amendment proposal to evaluation-steward:

## Remove this ritual if…
Its rankings stop agreeing with demo-crit verdicts and real-learner results, or nobody reads the leaderboard before deciding.
