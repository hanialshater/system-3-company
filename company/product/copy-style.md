# Lesson copy style: questions, hooks and reveals

Owner: head-of-product. Written 2026-10-20 from the founder's probability review and the all-subject
scene-question pass (company/ops/progress.md, same date). It applies to everyone who writes text a
learner sees: learning designers (the design note), builders, category managers (titles, hooks) and
anyone running a copy pass. `demo-standard.md` still sets the budgets and the contract.

## The card reads top-down

Since 2026-10-20 an open card shows: title → predict question and options → stage. The hook is hidden
once the lesson is open (it remains the feed teaser and share text). So the question is the first full
sentence the learner reads, and the title must not answer it.

## Predict question

- Put the learner in a concrete scene: second person, present tense, an everyday place, something at
  stake. "You're at a bus stop. Buses come every 10 minutes on average, but at random times…" beats
  "Buses arrive at random, 10 minutes apart on average…".
- 20–40 words, one clear question at the end.
- State every condition the answer depends on. A hidden condition (the doctor picks the fittest; the
  other jurors vote their clues) makes two answers defensible.
- No symbols or jargon the learner lacks (∝, 1/d, r =, μ, "independent", "significant", "expected
  value", "p-value"). Describe them in words.
- Vary the scene; do not lean on "a friend" or "a casino" every time.
- History and sensitive classes (company/international/sensitive-topics-checklist.md): no invented
  scene, no putting the learner inside a real event or role. Real studies and books: add nothing.
- Life hacks: never weaken a safety condition.

## Options

- Every option is a believable answer someone would give. The answer must not be the only precise,
  non-round, "exactly" or computed-looking option.

## Title and hook

- The title poses the question; it never states the answer ("Why your friends have more friends"
  gives it away; "Are your friends more popular than you?" does not).
- The hook teases the same question as the predict, ≤ 90 characters. No winks: "…Right?",
  "Surely…?", "Or is it?", "So X?".

## Reveal

- Point at what the learner just saw on the stage, with its numbers.
- Do not end on a maxim that restates the paragraph ("Randomness has no memory."). Model caveats
  ("No slipping, no air drag.") are fine and stay. A closing line that is the only place the lesson's point,
  mechanism or answer to the misconception is stated is content, not a maxim: keep it (2026-10-20:
  16 of ~135 reveal cuts removed exactly that and had to be restored).
- Avoid "X, not Y" pivots and colon pivots onto a slogan or a named term the learner has not met.
- No idea the stage never showed (a new formula, a new study, a new term).
- No builder words on the stage or in the reveal: seed, run, Toy:, lit, leaves (graph), whisker.

## Running a copy pass (lessons learned 2026-10-20)

1. **Claims lock text.** If a `claims[].text` quotes the question, title or hook verbatim, changing it
   needs a claim update and fact-checker re-verification. Plan that with the fact-checker first;
   otherwise the pass can only prefix a scene or skip (most ai/*, lifehacks, history, all algo-*).
   Never edit `claims[]` in a copy pass. Before committing, diff every lesson's claim texts against
   HEAD (W-2020 asks for a check that does this).
2. **Know where the text lives.** Not always `Demo.tsx`: books in `idea.json`; life hacks in
   `src/lib/lifehacks/studyCatalog.ts`, `home-lessons.ts`, `resource-specs.json` (meta and spec titles
   must stay equal, tests check it); algorithms in `src/lib/algorithms/topics/*.ts` (claim coverage is
   tested by `tools/algorithms-200-check.mjs`). Give one worker per shared file.
3. **Every learner-visible edit bumps `version` once** and stales that lesson's learner-review and QA
   records. A pass over N lessons creates N re-walks; put them on the board.
4. **Measure before sizing.** `node tools/copy-tells.mjs` counts likely tells per domain. About a third
   of its closing-line and "X, not Y" hits are real; read samples before planning work.
5. **Check before committing:** `npm run check` (only version-gate errors may be new), typecheck, and
   the suites that read shared text (`test:lifehacks`, `test:books`, `test:algorithms`).
