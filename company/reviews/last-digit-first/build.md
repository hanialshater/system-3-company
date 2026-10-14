# Build note: last-digit-first (algo-pair-09, 2026-10-14)

Built from brief #14 and the wireframe company/design/specs/last-digit-first.svg (no spec .md existed). Three pass buttons (one press = deal + collect), then an Order toggle that restarts first-digit-first and keeps each finished run's result on stage. Reveal unlocks after the third pass; it quotes only runs finished. No tap-each-card step (the wireframe uses pass buttons). Neighbour marks < / > show order after each pass.
Answers re-run in node (both orders, 20,000 random lists). All claims unverified.
Skipped (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` run. Risk: untested typing and visuals; stage text near the 25-word budget at its peak.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Two rows of pass buttons (last-first, first-first), each its own run; gate needs both runs finished. On a third pass the first bucket with two cards is ringed with 'Tie in bucket N: kept the order earlier passes gave it'. 'Flip the order' sentence removed. Retitled 'Sort by the last digit first?'.
- Claims reopened (status unverified): c2, c3.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.

## v4 (2026-10-14)
W-202: reveal names the tie bucket and cards from the last-digit-first pass-3 buckets and the first out-of-order pair from the first-digit-first ending, instead of pointing at the stage (c2, c3).

## Pre-flight v5

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers fact-check pass 23 (c2 disputed)

Changes: claim c2's parenthetical now says "720 comes before 355", which is what the reveal prints (fBad = 0 on the one deterministic first-digit-first run). The hook "Which order works?" read as "one of the two orders works", which leans toward the order the title names, so it is now a neutral question. Demo.tsx is unchanged.

1. **Title and hook.** "Sort by the last digit first?" / "Three passes, one digit each. Does the order of the passes matter?" The title names the procedure the question asks about, not its outcome; the hook does not say which ending happens. No.
2. **Options.** "fully sorted" / "sorted by first digit only" / "scrambled". None numbered, same register. Yes.
3. **Locked stage.** Rule line "Deal by one digit, collect buckets 0 to 9. Ties keep order.", the start list 329 457 657 839 436 720 355 with no < > marks, ten empty buckets, "Buckets 0–9 · last digit first", "passes done: 0 of 3". No ended lines. Nothing matches "fully sorted".
4. **Reveal values.** "Your last-digit-first run ended 329 355 436 457 657 720 839": (b) recorded in `ended.last` at milestone last-done. "bucket 3 held 329 then 355": (a/b) read from runs.last's pass-3 buckets, which exist once last-done fires and cannot be cleared. "Your first-digit-first run ended 720 355 436 457 657 329 839 ... (720 comes before 355)": (b) `ended.first` at milestone first-done; the pair is computed from that record. "Three passes ... however many there are": told context, claim c4.
5. **QA path.** DOM order: Last first · Pass 1, Pass 2, Pass 3 (last-done), First first · Pass 1, Pass 2, Pass 3 (first-done): 2 of 2. Each pass button is enabled only after the one before it, so DOM order is also the required order. Both "... digit first ended: ..." lines stay on the stage once written.
6. **Reset.** There is no Reset and runs cannot be undone. Expected reveal after the QA path: "Your last-digit-first run ended 329 355 436 457 657 720 839: every neighbour in order. On its pass 3, bucket 3 held 329 then 355: they tied on the first digit, and they kept the order the earlier passes had given them. So the earlier digits settle ties, and the first digit, dealt last, has the last word. / Your first-digit-first run ended 720 355 436 457 657 329 839: ordered by the last digit only (720 comes before 355). The first digit went first, so the later passes overwrote its work. / Three passes sort three-digit numbers, however many there are." (Read from the code; this batch does not run QA.)
