# Book format: a book as a deck of idea modules

owner: design-lead (Ines) · date: 2026-10-14 · status: **proposed**. head-of-product rules on it (board). The kit part is tier 2: the principal engineer reviews the EDD before any code. The design lead may not approve her own format in design review, so the reference deck is chaired by someone else.
answers: `company/decisions/2026-10-14-founder-books-experience.md` (the founder's "We need more for books, it is different experience probably multiple cards"). It supersedes Ruling 5 of `2026-10-14-books-big-ideas-strategy-review.md` ("the summary is the path of lessons") and books-strategy D2 (2 lessons per book) as far as the format goes. Depth and the list are still cm-books's to revise.
mockup: [`book-format.svg`](book-format.svg) (8 frames at 390×844, every label 11 px or more).
inputs read: the founder decision; `company/design/formats.md`; `src/kit/sequence.tsx`; `src/kit/Lesson.tsx`; `src/kit/progress.ts`; `src/components/Feed.tsx`; EDD-006 and its review (C1 probe results: a 4-step trail is 76 px wide and 71 px tall at 390, W-630); `company/domains/books-strategy.md` §3, §4, §6; the 6 Books drafts in `src/demos/books/`; `company/decisions/2026-10-14-w556-wave-gate.md`; today's demo crit (`company/rituals/records/2026-10-14-demo-crit.md`); patterns `fit-means-legible`, `measure-the-fit`, `earn-the-reveal`, `numbers-from-the-stage`, `preset-buttons`.
consulted through records: interaction-designer (W-601 is still backlog, so there is no ruling on the 4-step trail or the no-Back choice; this format avoids both, see §4) and cm-books (books-strategy D1, D2, D4 and the "3-card case / your test / holds up" shape, which this format keeps as the inside of each idea).

## The decision in five lines

1. **A book is a deck, not one long sequence.** A deck is an opening card, then 4 to 6 **idea modules**, then a closing card. Each idea module is an ordinary lesson (its own slug, `meta.json`, claims, predict → explore → reveal and spaced recall). Inside, it is the 3-sub-card shape from books-strategy §3: *The case / Your test / Holds up?*
2. **Default 5 ideas, about 60 to 75 seconds each, about 6 minutes per book.** The opening takes about 15 s and the closing about 20 s. Every idea is a stopping point, and the deck resumes at the next untested idea.
3. **The book gets its own predict → reveal.** The opening card asks for a bet ("how much of this book will hold up?"), the ideas are the explore, and the closing card is the reveal: your bet against the verdicts, idea by idea.
4. **The copyright line is measured, not felt:** at most 20 words per idea and 120 per deck say what the book argues. Everything else is our toy, the learner's result and the verdict. No chapter numbers or titles shown, no book order as structure, one quoted line per deck at most.
5. **No change to `Lesson.tsx`, `CardSequence` or `tests/qa`.** The kit change is a deck shell around existing lessons: a deck manifest, a `/b/<work>` route, a non-interactive book bar, a feed tile, and a book probe. Capacity: **fewer books at the same review load**, about 10 committed books, not 30.

## 1. The unit

### A deck of idea modules, not one long sequence

| Option | What it would need | Verdict |
|---|---|---|
| **One long sequence** (one lesson, 12 to 20 sub-cards) | `CardSequence` past 4 cards (the trail is already 71 px tall at 4, W-630); more than 16 controls, so a `tests/qa` amendment; one predict and one reveal for five ideas, so four ideas get no prediction of their own and no recall; one `meta.json` with about 35 claims, so one held chapter claim holds the whole book | **Rejected.** It breaks the demo standard (predict for every idea taught), the QA budget and the claim gate all at once. It is also the shape that reads most like a retelling. |
| **A deck of idea modules** (an opening card, 4 to 6 lessons, a closing card) | A shell around existing lessons. Each idea passes the existing contract at `/d/<slug>` unchanged | **Chosen.** Every idea keeps its own bet, toy, verdict and recall. One held claim holds one idea, not the book. A learner can stop after any idea. |

### How many ideas, how many cards, how long

- **Ideas per deck: 5 by default, 4 minimum, 6 maximum.** An idea enters the deck only if it passes all five tests in books-strategy §2 (stage, predict, verdict, own words, distinct). A book with fewer than 4 passing ideas does not get a deck. It stays a single lesson or waits (cm-books's call). The 6th idea is allowed only if all six pass and the deck still meets the verdict quota (at least 1 in 3 not "Yes").
- **Cards per idea: 3 sub-cards by default** (*The case / Your test / Holds up?*, `CardSequence` with `revealCard` = card 3), per head-of-product Ruling 5. A **single card** is the stated exception for arithmetic ideas whose verdict *is* the derivation (books-strategy §3 "When to use which"). Never 4 sub-cards in a Books idea (see §4: that is the trail that wraps to 71 px).
- **Time budget.**

| Part | Target | Ceiling |
|---|---|---|
| Opening card | 15 s | 20 s |
| One idea, 3 sub-cards: predict 10 s, 3 × 12 to 15 s, reveal 15 s | 60 to 75 s | 90 s |
| One idea, single card | 60 s | 75 s |
| Closing card | 20 s | 30 s |
| **A deck of 5 ideas** | **about 6 minutes** | 8 minutes |

  So yes: still about 60 seconds per idea (a 3-sub-card idea runs a little over), and a book takes 5 to 7 minutes, which is 4 to 6 minutes of ideas plus about 35 s of framing. That is the honest number for the tile ("5 ideas · about 6 min"), computed from the deck, not typed.

- **Card count per deck (5 ideas, all 3-sub-card):** 1 opening + 5 × (predict, 3 sub-cards, reveal) + 1 closing, which is 27 screens. The learner presses about 2 controls per sub-card, so about 40 presses for the book. This is why each idea must be a stopping point (§2).

## 2. Book-level framing, navigation and progress

### The book's own predict → explore → reveal

| Book beat | Card | What the learner does | Rule |
|---|---|---|---|
| **Predict** | Opening card | Bets how much of the book will hold up: "All 5 / 3 or 4 / 1 or 2 / None". "Hold up" means verdict Yes or Mostly (said on the card) | **Start is disabled until a bet is placed.** The bet's right answer is computed from the ideas' verdict claims (`numbers-from-the-stage`), never typed. |
| **Explore** | The idea modules, in deck order | Each idea's own predict → explore → reveal | Each idea's predict is about that idea's toy, not about the book. The book bet is not mentioned inside an idea. |
| **Reveal** | Closing card | Sees their bet against the verdicts, idea by idea | Rows show only the ideas the learner tested. An untested idea shows "not tested yet" and a "Test it" button, never its verdict (no spoiler that skips a prediction). |

### Opening card (frame 2 in the mockup)

Holds, top to bottom: a "Book" chip with "5 ideas · about 6 min"; the title, author and year (a bibliographic claim); **the book's question in our words** (one sentence, 20 words or fewer, a book-sourced claim); the map; the bet; Start.

- **The map is a list of the idea titles**, which are the lessons' own titles. They name the situation, never the answer or the book's slogan (books-strategy §3). It is not interactive on the opening card: nothing to jump to before you have bet. Rows are 44 px tall so the same component can serve the closing card.
- One line under the map, always: "Not the whole book: 5 ideas we can test, in our own words." This is the substitution guard on screen (§3).
- No cover, author photo or publisher artwork (checklist item 5).

### Idea modules: the book bar (frames 3 to 7)

Each idea renders inside the deck shell with a **book bar** above the lesson card:

- Left: a "‹ Book" control (44 px tall) that opens the deck's map view (the closing card's layout, with rows for the ideas done so far).
- Middle: "Idea 5 of 5" at 12 px, with the book title before it, truncated with an ellipsis (it is redundant there: the full title is in `aria-label` and on the opening card).
- Right: **one segment per idea, no text**: 16 × 8 px each, filled = revealed, outlined = current, empty = not started. A segment is not a control and has no title, so it cannot wrap. That is the answer to "a book-level trail at 390 px": at 6 ideas the segments take 6 × 16 + 5 × 4 = 116 px, at one height, always.
- The bar is **outside the `Lesson` stage**, so the existing QA contract never sees or presses it.
- Inside the lesson card the idea's own `CardSequence` trail runs as today: 3 steps, 103 px wide and 44 px tall at 390 (EDD-006 C1 measurement).
- After the idea's reveal, one button appears **below the lesson card**, outside the stage: "Next idea: *title* →". On the last idea it reads "See the verdicts →".
- **No vertical swipe between ideas on the book page.** The only gestures are the sub-card swipe that `CardSequence` already has (horizontal, an accelerator only) and normal page scroll. One gesture layer fewer than the feed, which helps with EDD-006 objection O2 (swipe against the feed and iOS edge-back).

**Vertical budget.** The bar costs 44 px. On `/b/<work>` it takes the place of the lesson card's top row, so the net change must be 0 or less. **This is measured, not assumed** (`measure-the-fit`): the book probe (§4) records each idea's reveal height at 390×844 with the bar. If any idea's reveal does not fit, the fix is that idea's reveal (fold, cut words, redraw) under `2026-10-14-reveal-fits-with-its-picture.md`, never a smaller picture (`fit-means-legible`).

### Closing card: "What holds up from this book" (frame 8)

- A heading, then **one row per idea**: the idea's title and its verdict chip (Yes / Mostly / Mixed / Mostly not / Untested). The verdict word is **rendered from that idea's verdict claim**, not retyped, so the closing card cannot disagree with the idea's reveal.
- "Your bet: 3 or 4. Result: 4 of 5 hold up." Both numbers are computed.
- One summary sentence, 30 words or fewer, in our words. It is a claim in the deck manifest. It says what the verdicts have in common (for example, which ones rested on small early studies), and **never restates the book's argument** (that is what the 120-word budget in §3 is for).
- "These 5 ideas come back for recall in 1, 3, 7 and 21 days" (from `REVISIT_SCHEDULE_DAYS`, not typed).
- "Back to the feed".

### Recall: per idea, not per book

- Each idea keeps its own `meta.recall` and comes back in the feed as an ordinary revisit card, with one added line: "From *Thinking, Fast and Slow* · idea 2". The recall asks the verdict or the mechanism, never book trivia (books-strategy §3).
- There is no book-level recall item. "Which idea failed?" a day later is book trivia, and it would be a sixth claim that rests on five others.

### Progress and resume

- **Resume is at idea granularity.** An idea is done when its lesson has `completedAt` (already written by `Lesson.tsx` at the reveal, `src/kit/progress.ts`). The deck state is derived from that: the next idea is the first one in deck order without `completedAt`. **No new progress store is needed for ideas.**
- **Mid-idea resume is deliberately not offered.** An idea interrupted on sub-card 2 restarts at its predict. It is 60 seconds, and the prediction must come before the stage (contract rule 2). Keeping sub-card state across sessions would mean showing a stage without a fresh prediction.
- The only new stored value is the book bet: `s3c:books:v1` → `{ [workId]: { bet, at } }`, guarded like `progress.ts` (storage can be missing; then the closing card says "No bet recorded" and still shows the verdicts).
- Events (for EXP-002 and the funnel): `book-view`, `book-bet`, `book-idea-next`, `book-complete`, added to `LessonEvent` in `src/kit/types.ts`. Idea lessons emit their usual events under their own slug.

### The feed shows a book as one tile (frame 1)

- A new feed item kind, `book`. The tile shows the "Book" chip, title, author and year, the book's question, "5 ideas · about 6 min", the segments (filled for ideas done), and one primary button: **Start** / **Resume: idea 3 of 5** / **See the verdicts**.
- **The verdict chips appear on the tile only for ideas the learner has done.** The tile never shows a verdict ahead of the prediction.
- **The deck's idea lessons do not also appear as separate feed items.** They stay reachable at `/d/<slug>` (QA, deep links, "look again" from a revisit card) and through the deck at `/b/<work>?idea=<slug>`.
- Tapping the tile goes to `/b/<work>`. Back returns to the feed at the tile.

## 3. Where it stops being a retelling: the copyright line

The decision record's rules bind (`2026-10-14-books-and-big-ideas.md`, books-strategy §6 checklist items 1 to 12). A deck covers more of a book than two lessons did, so it adds **deck-level** limits that are countable. A fact-checker or a script can check every one of them.

### Countable limits

| Limit | Per idea | Per deck |
|---|---|---|
| Words that say what the book argues (the "*Title* argues …" sentence, plus the opening card's question) | **≤ 20** | **≤ 120** in total, opening card and closing summary included |
| Quoted lines (verbatim, attributed, about 20 words or fewer, only where the wording is the point) | 0 by default | **≤ 1 per deck** (it was 1 per lesson; five lessons must not mean five quotes) |
| Ideas | 1 | **≤ 6**, and the opening card says "not the whole book" |
| Chapter or part numbers or titles shown to the learner | 0 (the chapter lives only in `meta.json`, "(unconfirmed)") | 0 |

**The concatenation test (deck review, every deck):** paste every learner-visible "argues" sentence of the deck, in deck order, into one paragraph. It must be 120 words or fewer, and a reader must not be able to tell from it what the book's chapters contain, or in what order. If it reads as a synopsis, the deck fails, whatever each card says on its own. This is the head-of-product's objection ("a book retold card by card"), turned into a check.

### What a card may contain

- **Our toy**: a mechanism drawn from scratch, with its assumptions on the stage. Toy data is labelled "toy" on the stage.
- **The learner's own result**, quoted in the reveal from stage state.
- **One sentence on what the book argues**, in our words, 20 words or fewer, in the reveal (beat 2), as a book-sourced claim.
- **The verdict and its evidence**, as a picture on *Holds up?* and a labelled sentence in the reveal (beat 3), sourced to the study, replication or derivation, never to the book.
- **Results the book cites, cited to the original study** (the 1974 wheel study, a replication), and drawn as our own picture of those results.
- **The book's title, author and year**, in the reveal and on the opening and closing cards. Never in a lesson title or hook.
- **An author's own public revision**, sourced to that revision (books-strategy §2 rule 7).

### What a card may not contain

- Any sentence of the book, or a paraphrase that follows the book's sentences in order.
- **The book's structure as our structure.** Decks are ordered by our teaching order (headline idea first, prerequisites before what needs them, a failed idea near the end). We never label an idea by chapter, part or page, and never show the book's table of contents.
- The book's own summaries, chapter-end recaps, "key takeaways", checklists, exercises or quizzes. (*Thinking, Fast and Slow* ends its chapters with sample remarks for using the ideas; we do not reproduce or imitate them. Chapter detail unconfirmed: a fact-checker confirms against a copy.)
- **The book's coinages for its examples**, where the coinage is the book's and not the field's. Use the study's description instead.
- Figures, tables, diagrams or chart layouts from the book, redrawn or not. If the book has a famous diagram, our stage does not imitate its layout.
- **Characters, dialogue, scenes or plot** from a narrative book. *The Goal* is a novel: a Goal deck may teach the bottleneck with our own line of machines (as `slowest-station-sets-pace` does), but it names no character, retells no scene and does not re-stage the book's scout hike. Whether re-creating a book's named example as our toy is safe is legal-read question 4 (W-541 a). Until it is answered, decks use our own examples.
- Anecdotes stated as history, advice ("so you should …" on health, money, law, therapy), a cover or trade dress, or any judgement of the author rather than the evidence.

### Why the deck stays a test, not a summary

Count words in a 5-idea deck. At most 120 words say what the book argues. Each idea's stage (25 words or fewer per sub-card, so 75 or fewer) and the rest of its reveal (about 70 words) are our toy, the learner's result and the verdict, so roughly 5 × 145 = 725 words. That puts the book's argument at about **one-seventh of the text**. The rest is evidence the book does not contain. A learner who finishes the deck knows whether five claims hold up. They do not know what the book says around them. That is the market-substitution argument for the legal read (books-strategy §6, question 2), and the legal read still has to answer it (F2). No Books lesson publishes before F1 and F2.

## 4. Kit implications

### What `CardSequence` lacks, and the answer to each

| Gap | Minimal answer | Kit change? |
|---|---|---|
| More than 4 cards | **Not needed.** A book is several lessons, and each uses 3 sub-cards. The 2 to 4 limit and the 16-control budget stay. | None to `sequence.tsx` |
| Nested idea modules | **Composition, not nesting.** A deck shell renders one existing lesson (`DemoHost`) at a time. No `CardSequence` sits inside another. | New shell component |
| A book-level trail at 390 px | **Segments, not titled steps** (§2): 16 × 8 px each, no text, not controls, outside the stage. The idea trail stays at 3 steps, the measured 103 × 44 px. So W-630's 71 px wrap never happens in Books, whatever W-601 rules on 4-step trails. | New `BookBar` |
| Resume | **Derived from `completedAt`.** One small new store for the bet only. | New `bookState()` helper and one storage key |

### The proposed change (tier 2, for the principal engineer's review)

Proposed as one EDD, written by the design-engineer (who wrote EDD-006) from this spec:

1. **Deck manifest**: `content/books/decks/<work-id>.json`. Its fields are `work`, `ideas` (ordered lesson slugs, 4 to 6), `question` (text and claim id), `summary` (text and claim id), `claims` (the same schema as `meta.json`: bibliographic, the book's question, the summary sentence, addresses `books.deck.<work-id>.c<n>`) and `quote` (0 or 1). cm-books owns which ideas go in a deck and their order. The claims follow the usual gate. **Open question for the evaluation steward:** is a deck manifest a valid home for claims? The constitution's wording is "that lesson's `meta.json`". If it is not, the fallback is to put the three deck claims in idea 1's `meta.json`, under a `deck` block. The claims tooling (`tools/meta.mjs`, the claims gate) must read whichever home is chosen.
2. **`src/kit/book.tsx`** (new, not protected): `<BookBar>` (the segments, the label and the "‹ Book" control) and a pure function `bookState(deck, progress)` that returns `{ next, done[], bet }`, which is unit-testable without a browser.
3. **`src/components/BookDeck.tsx` + `src/app/b/[work]/page.tsx`** (new): the opening card, the idea host, "Next idea", the closing card and the map view.
4. **`src/components/Feed.tsx`**: an item `{ kind: "book" }`. Slugs listed in any deck are dropped from the lesson items. Revisit items stay per idea, with the "From *Title* · idea n" line.
5. **`src/kit/types.ts`**: the four book events. **`src/kit/progress.ts`**: the `s3c:books:v1` read and write, guarded.
6. **Not changed:** `src/kit/Lesson.tsx` (protected), `src/kit/sequence.tsx` and `tests/qa/**` (protected). Each idea is a lesson exactly as today.

Gating, in order: W-604 (sequence probe), W-601 (interaction design review of the reference) and W-602 (accessibility review) close; this spec is ruled on; the EDD is reviewed; the kit work lands; the reference deck is built and its design review is chaired by someone other than me. Only then do I flip a "Book deck" row in `formats.md` from 🔴 to ✅.

### QA: how a book is walked with one press per control

- **Each idea, unchanged:** the existing contract walks `/d/<slug>`: predict the first option, press the first 16 enabled, visible stage controls once each in DOM order (the `CardSequence` trail first, all disabled; then each sub-card's controls, then its Next), reveal, then the overflow and tap checks. **Per-idea budget: trail 3 + Next 2 + at most 3 controls per sub-card × 3 = 14 ≤ 16.**
- **The deck, new: `tools/book-probe.mjs`** (not protected, run by hand like `tools/sequence-probe.mjs`), at 390×844 touch and at 1280×800, on `/b/<work>`:
  1. Opening card: Start is disabled before the bet. Press the first bet option once, then Start once.
  2. For each idea, the contract's own steps inside the shell (predict, each stage control once, reveal), then "Next idea" once. The book bar's "‹ Book" control is not pressed during the walk. The bar is checked for height (44 px, no wrap) and segment state.
  3. Every sub-card of every idea, while it is showing: horizontal overflow ≤ 1 px, tap targets ≥ 44 px, and the reveal fits with the bar present (this closes EDD-006 review gap O4 for decks too).
  4. Closing card: one row per idea, verdict words equal to each idea's verdict claim text, the bet and the result present, no overflow.
  5. **Resume:** reload after idea 2's reveal. The tile reads "Resume: idea 3 of 5" and `/b/<work>` opens on idea 3's predict. Clear storage: the tile reads "Start" and the closing card handles a missing bet.
  6. **Feed:** exactly one tile per deck, and no slug of a deck appears as its own feed lesson.
  7. Then press "‹ Book" once and check the map view.
- **Contract amendment, later and only if wanted:** once the probe passes on the reference deck and one more, the evaluation steward may propose adding the deck walk to `tests/qa` (protected, by ratified amendment). Until then the probe result is recorded in the EDD and in each deck's review record. **No contract change is needed to ship the format**, because every idea is already a contract lesson.

## 5. Worked mockup: *Thinking, Fast and Slow* (Kahneman, 2011)

Wireframes: [`book-format.svg`](book-format.svg), 8 frames at 390×844, labels 11 to 22 px. **Every sentence below is draft wording to show the shape. None is a claim yet.** Book-sourced points carry "(unconfirmed)". Verdicts are my reading; the fact-checker can overturn any of them. Ideas 2 to 5 are not briefed. Choosing and briefing them is cm-books's call (the priming idea has no concept in `books.json` yet, and it needs the distinct test against `best-of-twenty-on-one-test`).

**The deck (in our teaching order, not the book's chapter order):**

| # | Idea module (lesson title) | Concept | Shape | Draft verdict |
|---|---|---|---|---|
| 1 | A random number, then a guess | tfs-anchoring | single card (**exists**: `wheel-number-pulls-guess`, draft) | Yes |
| 2 | A coin flip you turn down | tfs-loss-aversion | 3 sub-cards | Mostly (a ratio near 2 is found on average, with wide spread across studies) |
| 3 | The end of the cold water | tfs-peak-end | 3 sub-cards | Mostly |
| 4 | Your plan against everyone's | tfs-planning-fallacy | single card (an arithmetic outside view) | Yes |
| 5 | A word list, then a walk | (new) behavioural priming | 3 sub-cards | Mostly not |

Verdict quota: 3 of 5 not "Yes". Book bet answer: 4 of 5 hold up ("3 or 4").

**Card by card** (the frame numbers match the SVG):

1. **Feed tile.** Chip "BOOK · 5 ideas · about 6 min". "Thinking, Fast and Slow". "Daniel Kahneman, 2011". "The book's question: when should you trust a fast, effortless judgement?" (book-sourced, unconfirmed). Five empty segments. [Start]. On return: segments 1 and 2 filled with chips "Yes" and "Mostly", and [Resume: idea 3 of 5].
2. **Opening card.** The same header. "5 ideas you will test" with the five titles above (44 px rows, not tappable). "Not the whole book: 5 ideas we can test, in our own words." "Your bet: how many of the 5 will hold up? (Yes or Mostly)" [All 5] [3 or 4] [1 or 2] [None]. [Start: idea 1] (disabled until a bet).
3. **Idea 5, predict.** Book bar: "‹ Book · Thinking, Fast a… · Idea 5 of 5", 4 filled segments and 1 outlined. The lesson card: hook "Read a list of words about old age, then walk down a hall. Early studies timed people." Question: "When large labs re-ran the walk with many more people, the slowdown was…" [About the same] [About half] [Near zero] [Bigger]. (Answer: near zero.)
4. **Sub-card 1, "The case".** Trail: 1 The case · 2 Your test · 3 Holds up? Stage: 4 toy bars, "small early studies", each showing a large slowdown with n = 30 under it. Label: "toy studies, not real data". Controls: [Show the early studies]. Milestone: early-shown. Next: Your test →.
5. **Sub-card 2, "Your test".** "If there were no effect at all, could small studies still find one?" Controls: [Run 20 small studies] [Keep only the 'significant' ones]. Stage: 20 dots around 0. The kept ones (computed, for example 2) sit far from 0, and their average is drawn as a line. Trace: "kept 2 of 20". Milestones: ran, filtered. Next: Holds up? →.
6. **Sub-card 3, "Holds up?".** Controls: [Add the large re-runs]. Stage: the early bars plus 2 wide, short bars near 0, n in the hundreds, labelled "large re-runs (toy)". Milestone: replications-shown. The reveal button unlocks (minInteractions = 4).
7. **Idea 5, reveal** (about 75 words, 3 beats). "You saw: 20 toy studies of no effect, and the 2 that cleared the bar averaged a big slowdown. The large re-runs sat near zero. *Thinking, Fast and Slow* argues that ideas planted by words can steer behaviour, such as walking more slowly (unconfirmed). **Does it hold up? Mostly not.** Large replications of the walking study found no slowdown, and Kahneman later wrote that he had trusted underpowered studies (unconfirmed)." Below the card: [See the verdicts →].
8. **Closing card.** "What holds up from this book." Five rows, each with a title and a chip: Yes · Mostly · Mostly · Yes · Mostly not. "Your bet: 3 or 4. Result: 4 of 5 hold up." Summary (manifest claim, 30 words or fewer): "The four that held were measured again in large studies. The one that failed rested on small early studies." "These 5 come back for recall in 1, 3, 7 and 21 days." [Back to the feed].

**The copyright count for this deck:** 5 "argues" sentences of about 18 words, plus the question (11 words), is about 100 words, under 120. No quote, no chapter shown, the order is not the book's, the stage examples are our toys or the original studies, and the book's coinage for the walking study is not used.

**Claims this deck would carry** (an estimate for capacity): ideas 6 to 8 each (anchoring has 6), so about 35. Plus 3 manifest claims. About 7 book-sourced (one chapter-sheet line each), and about 10 research claims on journal hosts that are blocked from here (W-511).

## 6. Capacity: review cost against W-556, and the recommendation

### What a deck costs review, against the strategy's 2-lesson book

| Per book | 2-lesson book (books-strategy D2) | 5-idea deck (this spec) |
|---|---|---|
| Lessons (fact-check + borrowed-mind learner review each) | 2 | 5 |
| Claims (6.3 average across the 6 drafts; briefs plan 6 to 8) | about 13 | about 32, plus 3 manifest claims = **about 35** |
| Book-sourced claims (chapter-sheet lines) | 2 to 4 | 6 to 11 (one sheet per book, about 15 to 20 minutes with the book in hand) |
| Deck-level work | none | 1 concatenation and copyright check, 1 book-probe walk, 1 whole-deck learner read (fatigue, retelling), about one lesson's worth of review |
| **Lesson-equivalents of review** | **2** | **about 6** |

### Against the gate and the caps

- **W-556:** the queue must be 160 or fewer across all categories before Wave K. It is 319 today. Books holds about 100% of its lessons on a source nobody can open (F1). The deck changes none of that. It changes how a fixed Books review allowance is spent.
- **Work-in-progress cap:** books-strategy's 12 Books lessons in draft and review stays. Its "2 per book" cap cannot hold for decks, so it becomes **at most 2 decks in flight** (2 × 5 = 10 lessons, under 12).
- **Committed tranche:** head-of-product Ruling 1 commits 60 Books slots (K 10, L 15, M 15, N to Q 20). If each deck counts as 6 (5 ideas plus 1 for deck-level review), that is **10 books**. The strategy had 30 books for the same 60. The conditional 60 would add up to 10 more books, released on Ruling 1's triggers.

### Recommendation: fewer books, not slower

cm-books's objection is right: more per book means fewer books. **I recommend fewer books at the same review load, not the same books more slowly.** Holding the pace matters more, because the published count is the pace (W-556), and a slower Books line delays the one category with no published lessons.

- **Depth: 5 ideas per deck by default, 4 when only 4 pass the five tests, never 6 in the committed tranche.** That gives 10 to 12 committed books.
- **Wave K pilot (10 slots): one reference deck plus the drafts.** The reference is *Thinking, Fast and Slow*: 4 new idea builds plus the manifest, with `wheel-number-pulls-guess` as idea 1. The other 5 drafts (`slowest-station-sets-pace`, `born-in-january-picked-first`, `one-percent-a-day`, `biased-judge-noisy-judge`, `total-signups-hide-the-slide`) are kept and not rebuilt. Each becomes idea 1 of its book's later deck. That is 6 drafts + 4 builds = 10, the same pilot size. Whether the 2 W-631 exemption builds stay as named is cm-books's and head-of-product's call.
- **Waves L and M:** about 2 decks each, inside the 12-in-flight cap.
- **Breadth comes back only from the conditional tranche,** on Ruling 1's triggers plus one more: deck completion. If EXP-002 or the funnel shows the median learner stops before idea 3, the default drops to 3 or 4 ideas, and the freed slots go to more books.

## Objections, and what happened to each

| Objection | Raised by | What happened |
|---|---|---|
| More per book means fewer books, or slower; say which | cm-books (books-strategy D1, D2), carried by the founder decision | **Accepted and answered:** fewer books (about 10 committed instead of 30) at the same review load and pace. The default drops to 3 or 4 ideas if learners stop before idea 3. cm-books revises the list (board). |
| A book retold card by card risks the copyright line and the 60-second budget | head-of-product | **Accepted, turned into checks:** ≤ 20 argues-words per idea, ≤ 120 per deck, the concatenation test, no chapter or book order shown, ≤ 1 quote per deck, our toys only. Time: 60 to 75 s per idea, and every idea is a stop point. The legal read (F2) still decides. |
| A longer book format is a kit change and needs tier-2 review (`CardSequence` 2 to 4, ≤ 16 controls) | principal-engineer (EDD-006) | **Accepted:** no `CardSequence` change. The deck shell is the kit change, proposed as a tier-2 EDD. Each idea stays inside the 16-control budget (14 at most). |
| One long sequence is "what the founder said" | anticipated | **Declined:** the founder said "multiple cards" and "cover ideas", not "one lesson". A deck is 27 cards for 5 ideas, and each idea keeps its own prediction and recall. A single sequence would remove both. |
| A 4-step trail wraps to 71 px (W-630) | design-engineer | **Avoided, not overruled:** Books ideas use 3 sub-cards, and the book level uses untitled segments. W-601 still rules on 4-step trails for other formats. |
| Mid-idea resume would be friendlier | anticipated | **Declined:** resuming on sub-card 2 shows a stage without a fresh prediction. An idea is 60 to 75 s, so a restart is cheap. |

## This would be wrong if

- learners stop a deck before idea 3 as often as they skip a single lesson (the funnel or EXP-002). Then a deck buys no depth, and 2 or 3 ideas per book with more books is better;
- the book bet and the closing card read as filler in learner review (borrowed-mind or real). Then cut them to a title card and a verdict list, and keep the per-idea lessons;
- the legal read says a 5-idea deck is a market substitute however few words it spends on the argument. Then the depth goes back to 2 or 3;
- the reference deck's ideas cannot fit their reveals at 390×844 with the book bar (book probe). Then the bar folds into the lesson card's header, which is a kit change to `DemoCard`, not to the contract.
