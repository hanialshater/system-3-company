# Book Summaries: category charter

owner: cm-books (Hester) · strands: business (cm-books-business, Kwame), psychology (cm-books-psychology, Imogen), science-history (cm-books-science-history, Tobias) · status: incubating · curriculum: `content/curriculum/books.json` · works: `content/works.json` (`category: "books"`) · coverage: `npm run company -- coverage books` · decision: `company/decisions/2026-10-14-books-and-big-ideas.md`

Drafted on 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request. cm-books owns this charter from here and may rewrite anything except the copyright and accuracy rules. Changing those needs a decision record.

## Audience
People who have heard of a famous non-fiction book, or half-read one, and want its core ideas in a minute: commuters, students, managers, book-club members. They want to know two things. What does the book actually say? Is it right?

## What a great lesson in this category does
It takes **one idea from one book** and makes the learner bet on it before they hear it. The Goal's bottleneck, Thinking, Fast and Slow's anchoring and Atomic Habits' 1% a day are examples. The stage lets the learner run the book's own example, or a toy version of it. The reveal says what the book argues, in our words. Then it says, as a separate point, **whether the idea holds up**: what later research found, where it fails, or that nobody has tested it.

A lesson is not a book report. One idea per lesson, and 2 to 4 ideas per book, each its own concept in the curriculum. A book's lessons form a short series, but each one must stand alone in the feed.

The founder asked for "book summary (multiple cards)". The target format is the **multi-card sequence** (`company/design/formats.md`), for example card 1 the book's example, card 2 the mechanism, card 3 the evidence. That format needs kit work, which a design engineer is doing now: a stepper inside explore, with no contract change while predict and reveal stay single (decision `2026-10-13-design-org.md`). **Until the stepper lands and the design lead approves a reference lesson, builders use single card or another approved format.** Each brief names the single-card format it uses today, plus a "multi-card later" line saying how it would split, so it can be rebuilt without a new brief.

## Copyright (binding, from the founder)
- **Never reproduce the book's text.** That covers no paragraphs, no close paraphrase that follows the book sentence by sentence, no chapter-by-chapter retelling, and no copied figures, tables, diagrams or exercises. Our stages are original drawings and our own toy models.
- **Quote at most one short line**, which means one sentence of about 20 words or fewer, with attribution (author, title, chapter) in the lesson, and only when the wording itself is the point (for example a named law such as Brooks's law). Most lessons quote nothing.
- **Give the summary in our own words.** The book is a map to the idea, never a source of learner text. This is the same rule as the Courses org (`company/decisions/2026-10-14-courses-org.md`, "Source rule").
- No cover images, author photos or publisher artwork. Illustrations follow `company/design/illustration.md`, as original work.
- The fact-checker checks this as part of claim verification. A lesson with a quote longer than one short line, or with unattributed book wording, is a **dispute**, not a style note.

## How claims get checked here
Every factual sentence a learner sees is a claim in `meta.json`. In this category each idea produces **at least two kinds of claim, kept separate**:

1. **"The book argues X."** This is a claim about the book, not about the world. Its source is the book with a chapter citation: author, title, edition or year, and chapter number and title. The brief writes the chapter as `chapter (unconfirmed)` until a fact-checker has checked it against a copy of the book. A claim that cites an unconfirmed chapter cannot be verified. This environment often cannot open publisher or library sites, so chapter checks may wait for a connected host. That is a known blocker, and it is recorded in the decision record.
2. **"Does X hold up?"** This is a claim about the world, sourced to research: a meta-analysis, a replication, a review, or official data. It sits in the reveal, labelled as such ("What later research found" or "Does it hold up?"). There are three allowed verdicts, and each needs its source:
   - **holds up** (with the strongest evidence for it);
   - **mixed or contested** (name both sides);
   - **untested or not testable** (say so; do not invent a verdict).

   If the book's claim is arithmetic or logic (1.01^365, a bottleneck's throughput), the check is a derivation on the stage or in node, and the "holds up" claim is about whether the **real-world use** of the arithmetic holds up.
3. **Toy-model claims.** Every number the stage computes from a model we chose is labelled as the lesson's model, with its assumptions on the stage ("illustrative: heights grow 0.5 cm a month").

Other rules:
- A book's anecdote ("the book opens with a Super Bowl call") is a "book argues" claim. It is never presented as a verified historical fact unless it has its own source.
- When the book cites a study, the lesson cites **the study** for the result, and the book only for the fact that the book uses it.
- Health, money and legal content follows the Life Hacks lines in the refuse list below. Ideas can be taught. Advice cannot.

## What we refuse to publish (the refuse list; cm-books owns it)
- Anything that reproduces the book's text beyond one short attributed line, or its figures, tables or exercises.
- A lesson that presents the book's claim as settled when the evidence is mixed or the claim was refuted, or that leaves out the "does it hold up" claim when evidence exists.
- Fiction, memoir and religious texts (non-fiction only). Political manifestos as advocacy: a lesson may teach an idea from one, but never promote it.
- Self-help claims about health, diet, medication, trauma or therapy. Investment picks, "get rich" schemes and anything that reads as financial advice.
- Books whose central claims rest on data later retracted or shown to be fabricated, unless the lesson is about that failure and is sourced to the correction.
- Summaries of books published in the last 12 months (publishers' sales windows; also, no replication evidence exists yet).
- Ad hominem: a "does it hold up" claim judges the idea and the evidence, never the author.

## Portfolio rules
- **Strands.** Each concept carries one strand in `subarea`: `business` (Business & Strategy), `psychology` (Psychology & Self), `science-history` (Science & History). Each strand manager owns that strand's concepts and the briefs file `company/domains/briefs/books.<strand>.md`. cm-books owns the cross-strand ranked list in `company/domains/briefs/books.md`.
- **One book, 2 to 4 ideas.** A concept is one book plus one idea, with an id like `<book>-<idea>` and `work` set to the book's id in `content/works.json`. Every book in the map has at least 2 ideas and at most 4. A fifth idea means the book is better served by the Courses org (one owner per work, `company/courses/README.md`). cm-books then proposes it to courses-lead.
- **One lesson per idea first.** No idea gets a second lesson until every demand-3 idea has one.
- **No book gets more than 2 lessons in review at once**, so that the feed does not become one author's.
- **Breadth before depth.** The first 12 briefs cover at least 10 different books across all three strands.
- **Overlap with subject categories.** Many book ideas already have a subject lesson: anchoring has none, but conjunction (Linda), regression to the mean, sampling bias, compounding and calibration do. A book lesson does not re-teach the mechanism. It names the subject concept as a prerequisite (`probability:regression-to-mean`) or in `also`, and it teaches what the book adds: its example, its argument and the verdict on it. Run `node tools/overlap.mjs`, and say in the brief how the lesson differs from its nearest lesson.
- **Ranking.** Demand first. Then how well the idea can be shown, not told, on one phone screen. Then the strength of the misconception. Then how much evidence exists for the "holds up" claim (an idea with no evidence either way ranks lower, because its reveal is weaker). Popularity of the book is an input to demand, not a rank of its own.
- **Demand ratings** in `content/curriculum/books.json` are a first estimate made at drafting. They are not learner data. cm-books confirms or changes them at the first cycle planning.
- **Launch gate.** The category stays incubating until 5 lessons have passed Domain Launch Review, with the copyright check recorded for each.
