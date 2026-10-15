# Book Summaries: content strategy

> **Superseded in part (2026-10-14, head-of-product):** a book is now a deck of 3-4 idea lessons (default 4), not 2 lessons. D2, D6, §1's "two lessons per book", §3 "How many lessons per book", the §4 Wave K row and caps, and the "2 per book" cap no longer hold as written. See `company/decisions/2026-10-14-book-deck-format.md` ("What changes in books-strategy.md"). cm-books rewrites these sections (W-649).

owner: cm-books (Hester) · date: 2026-10-14 · status: **proposed**. head-of-product reviews it (board). The founder decides the asks in section 5 and 6 and the target in section 4. cm-big-ideas is asked to cite or object to section 8.
builds on: `company/domains/books.md` (charter), `content/curriculum/books.json` (60 ideas, 27 books), `company/domains/briefs/books.md` (cycle-1 briefs 1-12, and "Strategy wave 1", briefs 13-24, written with this doc), `company/decisions/2026-10-14-books-and-big-ideas.md` (copyright rules, objections 1-8), `company/product/verticals/plan-to-2000.md` (Books target 120), `company/decisions/2026-10-14-w556-wave-gate.md` (Wave K gate), `src/kit/sequence.tsx` + `company/engineering/edd/EDD-006-multi-card-sequence.md` + `company/engineering/reviews/2026-10-14-edd-006-review.md` (multi-card format; W-604 gates real use).
measured today: 4 Books lessons on disk, all `draft` v1 with 6 claims each (slowest-station-sets-pace, one-percent-a-day, born-in-january-picked-first, wheel-number-pulls-guess). 0 published. 8 cycle-1 briefs unbuilt. From this host, on 2026-10-14, gutenberg.org, openlibrary.org, archive.org and en.wikipedia.org gave no connection, and the Google Books API returned 429. **No book can be opened from here.**

## Where this departs from its inputs (summary)

| # | Input says | This strategy says | Why |
|---|---|---|---|
| D1 | plan-to-2000: Books target **120** (about 40 books x 3 ideas) | **60 committed** (30 books x 2), a further 30 only on learner data. The 60 freed slots go back to the plan's pool. | Review, not build, is the limit (W-556). Every Books lesson carries at least one claim that cannot be verified from here, and third ideas per book are mostly demand 1-2 and told, not shown (section 4). |
| D2 | Charter: 2 to 4 ideas per book, and "one lesson per idea first" | **2 lessons per book by default**. A third only when it uses a different stage engine and has a different verdict from the first two. Concepts stay in the map, but unbriefed third ideas are marked as not planned (section 9). | Breadth across books is what the category promises, and a third idea from the same book is the template-duplicate risk the 2026-10-14 crit killed. |
| D3 | Charter ranking: demand first | Demand first, **then** two hard filters before any other tie-break: (a) no duplicate of an existing lesson's engine and question, in any category; (b) verification cost (fewest held claims first). Demand-3 ideas that fail (a) are deferred, not briefed. | Five demand-3 ideas duplicate published lessons (section 8). Briefing them would make lessons that a crit kills. |
| D4 | Founder: "book summary (multiple cards)", read as every Books lesson becomes multi-card | **Multi-card is for ideas whose verdict needs its own picture.** Arithmetic ideas stay single card. Every brief still carries a "Multi-card later" line. Nothing uses `<CardSequence>` until W-604, W-601 and W-602 close and the design lead flips the formats.md row. | The format costs 2 of 16 QA presses per card (EDD-006 budget), and sub-cards 1 to n-1 get no CI overflow check until W-604 lands. A summary of a whole book across cards would also be the chapter-by-chapter retelling the copyright rules forbid. Founder ask F3 confirms the reading. |
| D5 | Charter: three strands | **No new strand now.** One cross-strand tag instead: each brief states its verdict (holds up / mixed / mostly not / untested), and each wave carries a quota (section 2). | A strand means a new role, and the six strand roles are already idle until briefs flow (decision record, Leonie's finding b). The theme that would justify a fourth strand, "famous findings that failed", cuts across all three. |
| D6 | plan-to-2000, Wave K: "Books pilot of 10 (arithmetic or logic ideas only, single card)" | Same 10, named: the 4 drafts already on disk plus 6 briefs whose "holds up" check is a derivation. **The 4 drafts were built before the gate opened.** They count against the pilot, not on top of it. | It keeps the plan's number honest. |
| D7 | Cycle-1 briefs file: "Next in line" lists 12 demand-3 ideas | 8 of them are briefed in strategy wave 1. The other 4 are deferred for overlap or a duplicate engine: signal-calibrated-weather, yes-batna, money-time-in-compounding and fact-straight-line (section 8). | Map honesty: they stay in the map, labelled, with the reason. |

## 1. Audience and promise

**Who.** Adults who have heard of a famous non-fiction book, or half-read it, and want two answers in a minute: what does it actually claim, and is that claim right? Commuters, students, managers, book-club members. They are not experts in the field the book is about. They arrive with the book's slogan ("10,000 hours", "1% a day", "the default wins") and often with the slogan's strong form.

**The promise, in one line.** *You test the book's big idea yourself, and then you find out whether it held up.*

What a learner gets here that a text summary (a blurb, a summary app, a review) cannot give:

1. **Predict: a bet before the answer.** A text summary tells you the idea, and you nod. Here you commit to what the book's own example will do (how many parts leave the line, how far apart the two sign-up forms are) before you see it. A wrong bet is the moment the idea lands. A summary cannot make you wrong.
2. **Explore: the book's example as a working toy.** You run the mechanism: speed up the wrong station, flip the default, add the decoy. You see the cause, not a sentence about it. The toy is ours, drawn from scratch, with its assumptions on the stage, which is also what keeps us clear of the book's text and figures.
3. **Reveal: the book's claim, then the verdict.** One sentence on what the book argues, in our words. Then a separate, labelled sentence, "Does it hold up?", with one of four verdicts and its source. Text summaries repeat the book. Reviews argue with it in prose. We give the claim and the evidence side by side, and where the evidence is a replication or a derivation, the stage shows it.

What we do not promise: the whole book, its stories, its voice, or advice. One idea per lesson, two lessons per book, and a path that links them.

## 2. Book selection

### What makes a book demo-able
A book qualifies only if at least two of its ideas pass all five tests:

1. **Stage test.** The idea has a mechanism that a toy can run on one phone screen: a quantity changes when the learner presses something. "Gossip holds groups of 150" fails (a number, not a mechanism). "The slowest step sets the pace" passes.
2. **Predict test.** A non-expert can hold a confident wrong answer, and the right answer is not given away by the book's title, the lesson title or the question wording (the r9 learner reviews flagged this in all 14 Life Hacks lessons).
3. **Verdict test.** There is evidence either way (meta-analysis, replication, official data, or a derivation), so the "does it hold up" line can be sourced. "Untested" is allowed, but it ranks lower.
4. **Own-words test.** The idea can be stated and staged without the book's text, figures, tables, characters' dialogue or exercises. If the only way to teach it is to retell the book's story, it fails.
5. **Distinct test.** No existing lesson in any category already runs the same engine on the same question (`node tools/overlap.mjs`, plus the list in section 8).

And the book itself must pass the charter's refuse list: non-fiction, at least 12 months since publication, not health or financial advice, not resting on retracted or fabricated data (unless the lesson is about that failure).

### Ranking
Inside a wave: demand (1-3, our estimate) → passes the distinct test → verification cost (fewest claims that need the book or a blocked source) → demo-ability → strength of the misconception → strength of the verdict evidence. Popularity feeds demand only.

**Wave quotas** (each wave of Books briefs):
- all three strands, none above half;
- at least 1 in 3 briefs with a verdict other than "holds up" (mixed, mostly not, untested);
- at least 1 "failure lesson" per wave once the pilot has passed Domain Launch Review (below);
- at most 2 lessons per book in draft or review at once (charter).

### Ranked list of 50 books, in waves

Status: **map** = in `content/curriculum/books.json` and `content/works.json` today; **new** = needs a works entry (courses-lead owns which works enter `content/works.json`) and 2 concepts, added only when its first brief is written. Verdict = the drafter's reading of the evidence for the idea we plan first. The fact-checker can overturn any of them.

**Wave A: the pilot and strategy wave 1 (21 books, all in the map; briefs 1-24)**

| Rank | Book | Strand | First ideas (concepts) | Verdict of first idea |
|---|---|---|---|---|
| 1 | *The Goal*, Goldratt & Cox (1984) | business | bottleneck sets pace; dice line falls behind | holds up (derivation) |
| 2 | *Thinking, Fast and Slow*, Kahneman (2011) | psychology | anchoring; loss aversion | holds up / mixed in size |
| 3 | *Outliers*, Gladwell (2008) | psychology | relative age; 10,000 hours | holds up / **mostly not** |
| 4 | *The Checklist Manifesto*, Gawande (2009) | business | many steps compound | partly |
| 5 | *Thinking in Bets*, Duke (2018) | business | resulting | holds up |
| 6 | *The Black Swan*, Taleb (2007) | science-history | the turkey | logical point |
| 7 | *The Lean Startup*, Ries (2011) | business | vanity metrics | arithmetic holds; one RCT |
| 8 | *The Mythical Man-Month*, Brooks (1975) | business | Brooks's law | rule of thumb, author revised |
| 9 | *Noise*, Kahneman, Sibony & Sunstein (2021) | psychology | bias vs noise | holds up (identity) |
| 10 | *Atomic Habits*, Clear (2018) | psychology | 1% a day | **mostly not** as a model of learning |
| 11 | *Factfulness*, Rosling et al. (2018) | science-history | the gap instinct | holds up, lines debated |
| 12 | *The Innovator's Dilemma*, Christensen (1997) | business | overshoot crossing | **contested** |
| 13 | *Nudge*, Thaler & Sunstein (2008) | psychology | defaults | holds up, smaller in outcomes |
| 14 | *Guns, Germs, and Steel*, Diamond (1997) | science-history | continental axes | **contested** |
| 15 | *Zero to One*, Thiel & Masters (2014) | business | one deal beats the rest | depends on the tail |
| 16 | *Predictably Irrational*, Ariely (2008) | psychology | the decoy | **mixed** |
| 17 | *Influence*, Cialdini (1984) | psychology | social proof | **mixed** |
| 18 | *The Evolution of Cooperation*, Axelrod (1984) | science-history | tit for tat (with mistakes) | partly |
| 19 | *Getting to Yes*, Fisher & Ury (1981) | business | interests, not positions | mechanism holds |
| 20 | *Silent Spring*, Carson (1962) | science-history | biomagnification | holds up |
| 21 | *Thinking in Systems*, Meadows (2008) | science-history | delay makes you overshoot | holds up |

**Wave B: second ideas from Wave A, the rest of the map, and new books with strong stages (16 books; briefs 25-48, from Wave L at the earliest)**

| Rank | Book | Strand | Status | Planned idea | Why it is here |
|---|---|---|---|---|---|
| 22 | *The Fifth Discipline*, Senge (1990) | business | new | the beer game: orders swing harder upstream | strong stage; bullwhip is well documented |
| 23 | *Good to Great*, Collins (2001) | business | new | firms picked for past success regress | **failure lesson** (regression to the mean; Rosenzweig, *The Halo Effect*, 2007) |
| 24 | *Willpower*, Baumeister & Tierney (2011) | psychology | new | ego depletion | **failure lesson** (multi-lab replication near zero) |
| 25 | *Mindset*, Dweck (2006) | psychology | map | praise for effort; effect size | **failure lesson** (small average effects) |
| 26 | *Superforecasting*, Tetlock & Gardner (2015) | science-history | new | scoring forecasts; teams | holds up; overlap check with ai and noise ideas first |
| 27 | *Moneyball*, Lewis (2003) | business | new | a cheap stat that wins games, until the market prices it | holds up, then arbitraged away |
| 28 | *The Marshmallow Test*, Mischel (2014) | psychology | new | delay predicts outcomes | **failure lesson** (shrinks with background controls) |
| 29 | *The Better Angels of Our Nature*, Pinker (2011) | science-history | new | the decline of war | **contested** (heavy tails: a long calm is weak evidence) |
| 30 | *Misbehaving*, Thaler (2015) | psychology | new | ~~the endowment effect~~ none for now: endowment yielded to Behavioral (W-903), and mental accounting is behavioral #8 | slot reopens at next ranking |
| 31 | *The Selfish Gene*, Dawkins (1976) | science-history | new | hawks and doves settle at a mix | derivation; overlap check with life first |
| 32 | *Grit*, Duckworth (2016) | psychology | new | grit predicts success | **failure lesson** (largely conscientiousness) |
| 33 | *The Signal and the Noise*, Silver (2012) | science-history | map | calibration; Bayes | **deferred**: both ideas duplicate published lessons (section 8) |
| 34 | *Sapiens*, Harari (2014) | science-history | map | agriculture trap | **deferred** until Big Ideas' Malthusian lesson exists (section 8) |
| 35 | *The Psychology of Money*, Housel (2020) | business | map | time in compounding; tails | **deferred**: same engines as habits-one-percent and zero-power-law-returns |
| 36 | *The Power of Habit*, Duhigg (2012) | psychology | map | habit loop | weak stage; brief only with a designer's stage idea |
| 37 | *Why Nations Fail*, Acemoglu & Robinson (2012) | science-history | map | one town, two institutions | told, not shown; brief only with a stage idea |

**Wave C: later, on learner data (13 books)**

| Rank | Book | Strand | Planned idea | Note |
|---|---|---|---|---|
| 38 | *Freakonomics*, Levitt & Dubner (2005) | business | sumo wrestlers at 7-7 | holds up; not the crime chapter (contested and charged) |
| 39 | *The Tipping Point*, Gladwell (2000) | psychology | the law of the few | **contested** (simulations of influentials); only the influentials angle, threshold cascades are math's |
| 40 | *Diffusion of Innovations*, Rogers (1962; 5th ed. 2003) | business | the S-curve of adoption | holds up |
| 41 | *Longitude*, Sobel (1995) | science-history | clock drift becomes miles | arithmetic holds; the hero story is contested by historians; prerequisite `geography:sun-time-from-longitude` |
| 42 | *Stumbling on Happiness*, Gilbert (2006) | psychology | we overestimate how long feelings last | mostly holds; not hedonic adaptation (Big Ideas) |
| 43 | *How to Lie with Statistics*, Huff (1954) | science-history | the cut-off axis | overlap check with probability data-literacy first |
| 44 | *Presence*, Cuddy (2015) | psychology | power posing | **failure lesson** only |
| 45 | *Collapse*, Diamond (2005) | science-history | Easter Island | **contested** |
| 46 | *Scarcity*, Mullainathan & Shafir (2013) | psychology | scarcity taxes attention | **mixed** replication |
| 47 | *The Art of Statistics*, Spiegelhalter (2019) | science-history | to choose | |
| 48 | *Fooled by Randomness*, Taleb (2001) | business | survivors among fund managers | only if not a duplicate of `armour-where-no-holes` |
| 49 | *Algorithms to Live By*, Christian & Griffiths (2016) | science-history | explore or exploit | **not** optimal stopping (`reject-the-first-three` is published) |
| 50 | *The Wisdom of Crowds*, Surowiecki (2004) | psychology | to choose | only if not a duplicate of `five-weak-voters` and `noise-independent-judges` |

Strand balance across the 50: business 15, psychology 18, science-history 17.

**Declined, with the reason** (so nobody re-proposes them without new facts): *Why We Sleep* and *The Body Keeps the Score* (health and trauma, refuse list); *Rich Dad Poor Dad* and stock-picking books (financial advice); *The Secret* (nothing checkable); *On the Origin of Species*, *The Wealth of Nations*, Malthus's *Essay*, Kuhn's *Structure*, Gleick's *Chaos*, Johnson's *The Ghost Map* (their ideas belong to Big Ideas, section 8); any book under 12 months old.

### Books whose ideas failed replication, and how we handle them
These are a feature of the category, not a risk to hide. A learner who leaves knowing that ego depletion did not replicate has learned something no summary app tells them.

1. **The lesson tests the book's claim, not a strawman.** The prediction is about the effect as the book states it, at the size the book implies. The reveal says what the book argues, then the verdict.
2. **The failure is on the stage where possible.** The natural picture is a set of results: small early studies with big effects, then a large registered or multi-lab study near zero. That is the "Holds up?" card in the multi-card shape (section 3), and in single card it is the second preset.
3. **Sources.** The verdict cites the replication or meta-analysis (Many Labs, a Registered Replication Report, a pre-registered meta-analysis), not a blog or a news story. If the original authors dispute the replication, the reveal names both sides (verdict "contested", not "failed").
4. **What survives is said.** "Practice matters; it explains about a fifth of differences" is the verdict, not "10,000 hours is a myth". Overstating a debunk is the same error as overstating the claim.
5. **No ad hominem.** The verdict judges the evidence. It never mentions an author's other work, reputation or conduct.
6. **Retractions.** If a study the lesson relies on is retracted or carries an expression of concern, the fact-checker records it as a dispute and the lesson becomes about the correction, or it is withdrawn (charter refuse list). For *Predictably Irrational* the fact-checker checks each cited study for this before verifying (brief 19).
7. **Author revisions count.** Where the author has publicly revised a claim (Brooks on Brooks's law), the reveal may say so, sourced to the author's revision.

## 3. Lesson shape per book

### How many lessons per book
- **2 by default**: the headline idea (level intro) and one more with a different stage engine and, where the evidence allows, a different verdict.
- **3** only when the third idea passes all five tests in section 2 and its demand is 2 or more.
- **4** is the charter's ceiling. A book that wants a fifth goes to courses-lead (charter rule), and we expect none.
- No book has more than 2 lessons in draft or review at once (charter). The Goal and Outliers reach that limit with briefs 14 and 13, so no third lesson from either is built until one publishes.

### The standard structure: "what the book argues / does it hold up"

**Single card (today, and for every arithmetic idea).**

| Beat | Rule |
|---|---|
| Title and hook | Name the situation, never the answer or the book's slogan. No book title in the lesson title (a title is a hint). |
| Predict | A question about the book's example, run as our toy, that a non-expert can get wrong. 25 words or fewer of stage text. Options at the same precision. |
| Explore | Preset buttons in DOM order, each pressed once, reach every milestone (QA path). One preset is **the book's picture**, the claim as the book states it. When the verdict is not "holds up", another preset is **what the evidence shows**. No Reset button: each preset sets the full state, and a Reset pressed by QA would be a control that changed nothing or would wipe the state the reveal quotes. Every meaning-carrying label is at least 10 px at 390 px wide (author at 11 px). |
| Reveal (90 words or fewer) | Three beats, in order: (1) what you saw, quoting stage state (about 40 words); (2) "*Title* argues …", in our words (about 20 words); (3) "Does it hold up?" plus one of **Yes / Mostly / Mixed / Mostly not / Untested**, then the evidence (about 30 words). |
| Claims | Three families, kept separate in `meta.json`: **book-sourced** ("the book argues X", chapter `(unconfirmed)`), **derivation** (the toy's arithmetic, checked in node), **research-sourced** (the verdict's evidence). Every brief lists them under those three headings. |
| Recall | The recall item asks the verdict or the mechanism, never book trivia (title, author, chapter). |

**Multi-card (once W-604, W-601 and W-602 close and the design lead flips the formats.md row).**

| Sub-card | Title (one or two words) | What it holds | Milestone |
|---|---|---|---|
| 1 | "The case" | the book's example as our toy | the book's picture reached |
| 2 | "Your test" | the mechanism, at the question's case | the question case |
| 3 | "Holds up?" | the evidence as a picture: replication bars, the measured share, or the toy's limit | the evidence shown |

Rules: 3 sub-cards by default and 4 only after the 4-step trail is measured (EDD-006 open question 5). Budget: trail 3 + Next 2 + controls ≤ 16, so **at most 3 controls per sub-card**. `revealCard` is card 3. Traces are 12 characters or fewer and carry the numbers from cards 1 and 2 that the reveal quotes. Same 90-word reveal.

**When to use which.**
- **Multi-card** when the verdict is mixed or mostly not **and** the evidence can be drawn as its own picture (13, 19, 20 in wave 1), or when the book's argument has a step that needs its own picture (the coaching step in relative age).
- **Single card** when one stage with a toggle or two presets holds both the book's picture and the test. That covers most arithmetic ideas (bottleneck, 1% a day, checklist steps, bias vs noise). A sequence there adds presses and fit risk and teaches nothing more.
- **Never** a sequence that walks through a book's chapters or several of its ideas. One idea per lesson stays binding.
- **The first multi-card Books lesson** is the design lead's reference candidate, chaired by someone other than her (decision record). I propose brief 13 (`ten-thousand-hours-how-much`): its three cards are natural, and its verdict needs a picture.
- Rebuilding a single-card Books lesson as multi-card is a new version that needs a new learner review. No rebuilds until a pairwise crit or EXP-002 data shows the multi-card version wins.

### A book's lessons as a path
- Each book gets a path, "*Title*: 2 ideas", in curriculum order: intro idea first, then the deeper or critical one. In `books.json` the second idea lists the first as a prerequisite (for example `goal-dependent-fluctuations` needs `goal-bottleneck-sets-pace`).
- Each lesson stands alone in the feed. The path is an order, not a dependency on having seen lesson 1.
- `meta.json` carries `curriculum.references` to the work (book, chapter, unconfirmed), so `node tools/meta.mjs coverage --work=<id>` shows the book's coverage.
- Building the path view is personalization-lead's work (as for NCM, W-415). I will ask once two books have 2 published lessons each.
- Cross-category paths are allowed when they are true sequences: `probability:regression-to-mean` → *Good to Great*; `life:evolution-of-cooperation` → Axelrod with mistakes.

## 4. Target and pacing

**The plan's 120 is a build number. The limit is review.** The W-556 gate holds every new build until the review queue is ≤ 160, Wave J is ≥ 60% published and no dispute is older than one wave. Today the queue is 319 and Wave J is 0/144 published. On top of that, Books has a limit of its own that the gate does not measure: **100% of Books lessons hold at least one claim that cannot be verified from this host** (the chapter), and most of their research claims sit on journal hosts that are also blocked (W-511).

What a Books lesson costs review, against a subject lesson:
- claims: 6 per lesson in the 4 drafts, against a 5.45 average (plan-to-2000, section 5), and the briefs here plan 6-8;
- a copyright check on every lesson, recorded at Domain Launch Review;
- at least 1 book-sourced claim that needs a copy of the book, plus 1-3 research claims that need a journal host.

**Revised target: 60 gated lessons (30 books x 2), plus up to 30 more on learner data.** That makes 90 at most, not 120. The plan counts only gated lessons toward 2,000, and so does this.

| Wave | Books builds | Entry condition, in addition to the plan's gate for that wave | Running total |
|---|---|---|---|
| K | **10 (the pilot)**: the 4 drafts + twenty-steps-at-99, good-call-bad-result, turkey-day-one-thousand, total-signups-hide-the-slide, more-people-later-project, biased-judge-noisy-judge (10 books, every verdict check a derivation or a single source) | W-556 gate open | 10 |
| L | 15 | (a) a book source exists (founder ask F1), (b) 5 pilot lessons passed Domain Launch Review with copyright checks recorded, (c) the legal-read question (F2) answered, (d) verdict overturn rate in the pilot below 30% | 25 |
| M | 15 | L's Books lessons ≥ 60% published; no copyright dispute open | 40 |
| N-Q | 20 committed, plus up to 30 | committed 20 on the default; the extra 30 only if Books commit rate and 7-day recall are at or above the feed median | 60 (90 at most) |

**Work-in-progress caps, always:** at most 12 Books lessons in draft + review at once (under 8% of a one-wave queue), and at most 2 per book. A builder who finds the cap reached takes another category's brief.

**Briefs run ahead of builds, but not far.** Briefs are cheap and builds are gated, so I write at most one wave of Books briefs beyond what builders may claim: wave 1 (13-24) now, and 25-36 only after the pilot's first fact-check shows how the verdicts hold up. Every unbuilt Books brief has a "Wave K gate (W-556)" line in `company/ops/brief-skips.json`.

Where the 60 freed slots go is head-of-product's call (Big Ideas, exam prep or subject unmet demand-3). I recommend they not go to more Books.

## 5. Sources and verification

### What a "the book argues X" claim must rest on
- **The book itself**: a named edition (author, title, year, publisher), with chapter number and title, **confirmed by a fact-checker or by a recorded human check against a copy** (print, e-book or library preview), dated and naming who checked it. Only then can the claim be `verified`.
- **Not acceptable as the source of what a book argues:** summary apps, Wikipedia, Goodreads, publisher blurbs (a blurb is a source only for title, subtitle and year), reviews, our memory, or an AI model's recall. These can help a fact-checker find the chapter. They never verify it.
- **The narrow fallback:** if the author made the same argument in their own peer-reviewed paper or signed article, the claim may be reworded as "*Author* argues X (paper, year)", and the book becomes a reference only. This changes what the learner reads, so the fact-checker proposes it and I approve the wording. It does not help from this host while journal hosts are blocked too.

### What else in a Books lesson rests on what
- **Results the book cites:** cite the study for the result and the book only for the fact that it uses it (charter). A number taken from a book's own figure is replaced by the underlying data or by our labelled toy.
- **Anecdotes** are book-sourced claims and are never stated as history. The briefs avoid them.
- **Verdicts** cite a meta-analysis, replication, review or official data. Where the idea is arithmetic, the verdict on the arithmetic is a derivation (checked in node), and any claim about real-world use is separate and sourced.

### What we do until a source is available
1. **Build, but do not publish.** Within the W-556 gate and the caps, builders build. Book claims go into `meta.json` as `unverified` with the chapter written "(unconfirmed)", exactly as briefed. The lesson waits in review.
2. **Keep held claims few.** Each brief has at most 2 book-sourced claims, and the core of every pilot lesson is a derivation. The question's answer never depends on a book-sourced number, except in brief 19, which says so.
3. **Never reword to dodge the gate.** Dropping "the book argues" to make a claim look like a derivation is a dispute, not a fix.
4. **Prepare the chapter sheets now.** For each wave, cm-books writes one sheet per book: each book-sourced claim, the edition, the expected chapter, and a yes / no / where-instead column, so a person holding the book can clear a claim in about 2 minutes. The pilot needs 10 books and about 12 claims, about half an hour with copies in hand.

### What we ask the founder (these extend W-541 and W-583; they are not new decisions)
- **F1. A book source (W-541 b, W-583).** Options: (a) you, or a person you name, fill each wave's chapter sheet with copies in hand, and the fact-checker verifies against that dated record (the evaluation steward confirms this counts as a source check); (b) a connected fact-check session per wave with library or e-book access; (c) an allow-list for one preview host. **My recommendation: (a) for the pilot, then (b) per wave.** If none of these exists by Wave L's entry, kill rule K1 fires (section 7).
- **F2. A legal read (W-541 a).** Framed in section 6.
- **F3. "Multiple cards".** Did you mean several cards **per idea** (our plan: the case, your test, holds up?) or one lesson that summarises **a whole book** across cards? We plan the first, for the copyright rules and the 60-second budget. If you meant the second, that is a charter change and a decision record.
- **F4. The target.** Accept 60 committed (plus 30 on data) in place of 120.

## 6. Copyright and legal risk

### Builder checklist (every Books lesson; copy into `company/reviews/<slug>/build.md` and tick)
The rules are the charter's, and they are binding. This is the same thing as a list a builder can tick.

1. [ ] No sentence of the book appears in the lesson. No paraphrase that follows the book's sentences in order.
2. [ ] Quotes: none, or exactly one line of about 20 words or fewer, attributed in the lesson (author, title, chapter), and only where the wording is the point (a named law). The brief must allow it.
3. [ ] No figure, table, diagram, chart layout, exercise or worksheet from the book, redrawn or not. The stage is our own toy, drawn from scratch. If the book has a famous diagram (a target, a curve), our stage does not imitate its layout.
4. [ ] No characters, dialogue or scenes from a narrative book (*The Goal* is a novel). Describe the idea, not the story.
5. [ ] No cover, author photo, publisher artwork, logo or series trade dress. Illustrations follow `company/design/illustration.md`.
6. [ ] Lesson title and hook do not use the book's title or its slogan. The book is named in the reveal.
7. [ ] One idea from one book. No chapter-by-chapter or multi-idea retelling, in one card or across sub-cards.
8. [ ] Every book-sourced claim names the edition and chapter, marked "(unconfirmed)" until checked. The builder never marks it verified.
9. [ ] Results the book cites are cited to the original study. Numbers from the book's own figures are replaced by the underlying source or a labelled toy.
10. [ ] The "Does it hold up?" sentence is present, separate, labelled and sourced, and judges the evidence, never the author.
11. [ ] No advice: no "so you should" on health, money, law or therapy.
12. [ ] The book is at least 12 months past publication.

The fact-checker checks items 1-3 and 8-10 as part of claim verification. A breach of 1-3 is a **dispute**, not a style note (charter).

### The open question for the founder: a legal read (W-541 a)
- **The question.** Before the first Books lesson is published, do we get a lawyer's read of this policy? Nobody in the company is a lawyer. "One short attributed line" and "our own words" are a policy, not legal advice.
- **What a read would answer.** (1) Whether teaching 2 ideas from an in-copyright book in our own words, with original toys, is safe in the places we publish (US fair use differs from UK and EU quotation exceptions). (2) Whether lessons as a set could be called a market substitute for the book, like a summary app; our critique and verdict line argue against that, but that is our argument. (3) Book titles in lesson text and metadata (titles are generally not protected by copyright, but series names can be trademarks). (4) Re-creating a book's named example as our own toy (the hike, the hockey cutoff). (5) Negative verdicts that name an author (defamation risk; our no-ad-hominem rule is the guard). (6) The attribution format for the one allowed line.
- **Options.** (a) A read before the first Books publish. (b) Publish under the policy, no read. (c) Publish only books whose ideas rest mostly on public data or derivations until a read exists.
- **What it costs.** (a) costs money and no calendar time, if started now: no Books lesson can publish before its chapters are confirmed anyway (F1). (b) costs nothing now and keeps the risk. (c) shrinks the category.
- **My recommendation: (a)**, started during the drain wave, with the six questions above. It does not block building (decision record, objection 1).

## 7. Quality guards, measures of success, and kill criteria

### Guards (before a brief is accepted, and at review)
- **Distinct.** Every brief names its nearest lesson in any category and says what it adds. If the stage engine and the question both match an existing lesson, the brief is not written (section 8). Inside Books, no two lessons share an engine: today `p^n` belongs to checklist-steps-compound, compounding to habits-one-percent, `min` of rates to goal-bottleneck-sets-pace, and a heavy-tail sum to zero-power-law-returns. ggs-anna-karenina (`p^n`) and money-time-in-compounding (compounding) are deferred for that reason.
- **No answer in the wording.** The title, hook and question do not contain the answer or the book's slogan. Answer positions vary across a wave: wave 1 uses A, B and C. All three are used, and none is used more than half the time.
- **Verdict honesty.** The four verdict words only. "Holds up" needs the strongest evidence for it; "mixed" names both sides with a source each. Verdict quota: at least 1 in 3 per wave not "holds up".
- **Fit and legibility.** Reveal ≤ 90 words, counted by script; stage text ≤ 25 words; every label the reveal points at ≥ 10 px at 390 px (W-513 ruling). Briefs give phone-fit notes.
- **Held-claim budget.** At most 2 book-sourced claims per lesson. A lesson's answer does not rest on a held claim unless the brief says so.
- **Simulated reviews are quality signals only.** Borrowed-mind learner reviews tell us whether a lesson is clear. They are not evidence that anyone learned, and they never move the target or demand.

### Measures of success
Now (no deploy): gated Books lessons published (target: 5 through Domain Launch Review, the launch gate); share of Books claims verified; median age of held book claims; **verdict overturn rate at fact-check** (target under 20%, kill at 30%); copyright disputes (target 0); revise rate at first learner review compared with the feed.
After a deploy (EXP-002 or later): commit rate and 7-day recall against the feed median; **verdict recall** (the recall item asks "did it hold up?"; target: as good as mechanism recall); book-path completion (2 lessons of one book; target 20%, a guess to replace with data).

### Kill criteria (each fires a written review by me, then head-of-product)
- **K1. No book source.** If founder ask F1 has no answer by Wave L's entry, stop all Books builds beyond the pilot, and propose either a public-data-only scope or folding the best ideas into Big Ideas with the book as a reference.
- **K2. Verdicts don't survive.** If 30% or more of the pilot's "does it hold up" verdicts are overturned at fact-check, pause briefs and add a research pass before every brief (the decision record's "would be wrong if").
- **K3. Copyright breaches.** If 2 or more of the first 10 lessons get a copyright dispute, stop builds and re-brief every unbuilt Books brief.
- **K4. Legal read negative.** If the read says the policy is not enough, nothing publishes until the charter's rules change by decision record.
- **K5. Learners don't care.** 60 days after a deploy, if Books commit rate or 7-day recall is 10 points or more below the feed median, cut to the best 20 lessons and stop new books.
- **K6. Duplicates win.** If Books lessons lose the pairwise crit to the subject lesson they cite in 3 of the first 5 crits, merge them: the book becomes a reference in the subject lesson's metadata.

## 8. Shared with Big Ideas and the subject categories (citable section)

cm-big-ideas: please cite this section in your strategy, or write your objections under it. cm-books does not edit the Big Ideas map, and you do not edit ours. The table records who briefs what.

### The boundary rule
- **Books** owns a lesson when its question is about **a specific book's claim**, and the reveal must say what that book argues and whether it holds up.
- **Big Ideas** owns a lesson when the idea **stands without a book**: it has many sources, or a canonical paper, or a classic text whose idea is now common property.
- **Subject categories** own the **mechanism**. A Books or Big Ideas lesson names the subject concept as a prerequisite or in `also`, and teaches what it adds. It never re-runs the subject lesson's stage as its main stage.
- **One idea, one owner.** If both categories could brief the same idea, the owner is in the table below. Disputes go to the two category leads, then to head-of-product (the decision record's placement rule).
- **Engines are shared property.** No two lessons across Books, Big Ideas and the subject categories run the same engine on the same question. Each brief names its nearest lesson and the difference.

### Known collisions and who owns them

| Idea | Big Ideas concept | Books concept | Owner, and what the other may do |
|---|---|---|---|
| Falsification / smallest test | falsification-2-4-6 | lean-mvp-learning | **Big Ideas.** Books defers lean-mvp-learning. If ever briefed, it is about the cheapest test as a business choice, with Big Ideas as a prerequisite. |
| Demographic transition / population growth | demographic-transition (BI brief 7) | fact-straight-line | **Big Ideas** owns the mechanism (deaths fall, births follow). Books may brief the straight-line instinct (extrapolating a curve that is bending), with BI's lesson as a prerequisite and a different stage (projection lines). Not briefed until cm-big-ideas agrees. |
| Malthusian trap | malthusian-trap | sapiens-agriculture-trap | **Big Ideas** owns the population mechanism. Books may later teach only the book's welfare claim (farmers lived worse) and its evidence. Deferred. |
| Power laws / 80-20 | pareto-80-20 | zero-power-law-returns | **Shared, split by question.** Big Ideas: what share of the effect comes from the top few causes. Books: whether one outcome can beat all the others combined (brief 18). Both cite `probability:power-law-scaling`. |
| Lindy effect | lindy-effect | none | **Big Ideas.** Books does not brief *Antifragile*. |
| Dunning-Kruger | dunning-kruger-artifact | none | **Big Ideas.** |
| Hedonic adaptation | hedonic-adaptation | (later) *Stumbling on Happiness* | **Big Ideas** owns adaptation. Books may teach impact bias (forecasting how long a feeling lasts) only. |
| Cognitive dissonance | cognitive-dissonance | none | **Big Ideas.** |
| Perverse incentives / Goodhart | perverse-incentives | none | **Big Ideas**, with `ai:goodharts-law`. Books briefs no Goodhart idea from any book. |
| Path dependence / critical junctures | path-dependence-lock-in | wnf-critical-junctures | **Big Ideas.** Books defers wnf-critical-junctures. |
| Thresholds and cascades | threshold-collective-action | (later) *The Tipping Point* | **Big Ideas and math** own thresholds. Books may teach only the "law of the few" claim and the simulations that question it. |
| Emergence | emergence-simple-rules | meadows ideas | **Big Ideas.** Books' Meadows lessons are a delay in one loop (brief 24) and stocks and flows, never emergence. |
| Chaos, division of labour, cumulative selection, germ theory, paradigm shifts | chaos-butterfly, division-of-labour, cumulative-selection, germ-theory-pump, paradigm-shift | none | **Big Ideas.** Books does not brief Gleick, Smith, Darwin, Snow or Kuhn. |
| Controlled experiments | controlled-experiment, randomised-assignment | (any book citing an RCT) | **Big Ideas.** Books cites them as prerequisites. |

### Subject lessons Books will not duplicate

| Books concept | Nearest published lesson | Decision |
|---|---|---|
| signal-calibrated-weather (d3) | ai/say-seventy-mean-it (calibration) | **Deferred.** Brief only with an angle cm-ai agrees is new; otherwise retire the concept. |
| yes-batna (d3) | economics/outside-option-sets-the-split | **Deferred, likely retired.** BATNA is the outside option. Books took the second *Getting to Yes* idea instead (brief 22). |
| money-time-in-compounding (d3) | economics/compound-interest; books habits-one-percent | **Deferred** (engine duplicate). |
| swan-silent-evidence (d2) | probability/armour-where-no-holes | **Deferred.** |
| fact-size-per-capita (d2) | probability per-capita-rates | **Deferred.** |
| axelrod-tit-for-tat (d2) | life/strategy-builder (tit for tat invades, no mistakes) | **Briefed with a different question** (brief 21: one mistake echoes forever). Prerequisite `life:evolution-of-cooperation`. |
| noise-bias-vs-noise (d3) | ai/shrink-toward-zero (a biased estimate can win) | **Briefed with a different question** (brief 14: equal squared error, scatter as an error). `also: ai:bias-variance`. |
| spring-biomagnification (d2) | life/ten-percent-up (energy pyramid) | **Briefed as the mirror image** (brief 23: mass shrinks, the chemical concentrates). Prerequisite `life:energy-pyramid`. |
| meadows-delay-oscillation (d2) | life/thermostat-leftover; ai/step-too-long | **Briefed with a different cause** (brief 24: the delay, not the gain). |
| (later) *Algorithms to Live By*, optimal stopping | probability/reject-the-first-three | **Not briefed.** |

## 9. What the map does not teach yet (map honesty)

`content/curriculum/books.json` has 60 concepts. After the cycle-1 briefs (12) and strategy wave 1 (12), **36 concepts have no brief**. Of those:
- **Deferred for overlap** (section 8): signal-calibrated-weather, signal-bayes-update, yes-batna, money-time-in-compounding, money-tails-drive-everything, swan-silent-evidence, fact-size-per-capita, fact-straight-line, sapiens-agriculture-trap, lean-mvp-learning, wnf-critical-junctures, ggs-anna-karenina.
- **Not demo-able as drafted** (a number or a story, not a mechanism): sapiens-group-size, wnf-inclusive-extractive, mmm-plan-to-throw-one-away, habit-keystone, zero-competition-erodes-profit, innovators-small-markets. These are candidates for the first retirement review unless a designer proposes a stage.
- **Waiting for their book's first lesson to publish** (2-per-book limit): goal-local-efficiency-trap, tfs-planning-fallacy, tfs-peak-end, and the second ideas of most Wave A books.
- **Planned for Wave B:** mindset-praise-effort, mindset-effect-size, habits-plateau, habit-loop, nudge-order-effects, irrational-zero-price, influence-reciprocity, influence-commitment, noise-independent-judges, checklist-pause-points, bets-beliefs-as-odds, axelrod-shadow-of-future, ggs-livestock-germs, spring-resistance, meadows-stock-and-flow.

The map also does not yet include the Wave B and C new books. I add their concepts only when I write their first brief, so the map does not fill with concepts nobody can build (the taxonomy-department failure).

## 10. The next 24 briefs (ranks 13-36)

Ranks 13-24 are written in `company/domains/briefs/books.md` under "## Strategy wave 1". Their numbers are checked by `node company/domains/briefs/checks/books-strategy-wave1-check.mjs`, which also counts each reveal draft and stage question. Ranks 25-36 are ranked here and get written only after the pilot's first fact-check (section 4).

| Rank | Slug (proposed) | Concept | Book | Strand | Format | Verdict | Status |
|---|---|---|---|---|---|---|---|
| 13 | ten-thousand-hours-how-much | outliers-ten-thousand-hours | Outliers | psychology | Single card (multi-card reference candidate) | mostly not | written |
| 14 | biased-judge-noisy-judge | noise-bias-vs-noise | Noise | psychology | Single card | holds up | written (pilot) |
| 15 | dice-line-falls-behind | goal-dependent-fluctuations | The Goal | business | Simulation run | holds up | written |
| 16 | tick-to-join-or-leave | nudge-defaults | Nudge | psychology | Single card | mostly | written |
| 17 | rome-beijing-same-daylight | ggs-continental-axes | Guns, Germs, and Steel | science-history | Map explorer | contested | written |
| 18 | one-deal-beats-the-rest | zero-power-law-returns | Zero to One | business | Single card | depends on the tail | written |
| 19 | decoy-nobody-buys | irrational-decoy | Predictably Irrational | psychology | Single card | mixed | written |
| 20 | most-guests-reuse-towels | influence-social-proof | Influence | psychology | Single card | mixed | written |
| 21 | one-slip-echoes-forever | axelrod-tit-for-tat | The Evolution of Cooperation | science-history | Single card | partly | written |
| 22 | trade-the-issues | yes-interests-not-positions | Getting to Yes | business | Single card | mechanism holds | written |
| 23 | poison-climbs-the-chain | spring-biomagnification | Silent Spring | science-history | Single card | holds up | written |
| 24 | late-hot-water-overshoots | meadows-delay-oscillation | Thinking in Systems | science-history | Single card | holds up | written |
| 25 | orders-swing-upstream | new: fifth-bullwhip | The Fifth Discipline | business | Simulation run | holds up | ranked |
| 26 | great-firms-regress | new: gtg-regression | Good to Great | business | Simulation run | mostly not | ranked |
| 27 | willpower-runs-out | new: willpower-ego-depletion | Willpower | psychology | Multi-card if ready, else single | did not replicate | ranked |
| 28 | praise-the-effort | mindset-praise-effort | Mindset | psychology | Single card | mostly not | ranked |
| 29 | your-plan-versus-everyone | tfs-planning-fallacy | Thinking, Fast and Slow | psychology | Single card | holds up | ranked (after a TFS lesson publishes) |
| 30 | bend-in-the-line | fact-straight-line | Factfulness | science-history | Single card | holds up | ranked (needs cm-big-ideas' agreement) |
| 31 | score-the-forecasters | new: superforecasting-brier | Superforecasting | science-history | Single card | holds up | ranked (overlap check) |
| 32 | cheap-stat-wins-games | new: moneyball-on-base | Moneyball | business | Single card | holds up, then priced in | ranked |
| 33 | wait-for-two-marshmallows | new: marshmallow-controls | The Marshmallow Test | psychology | Single card | shrinks with controls | ranked |
| 34 | long-peace-heavy-tail | new: angels-war-tails | The Better Angels of Our Nature | science-history | Simulation run | contested | ranked |
| 35 | ~~keep-the-mug~~ | ~~new: misbehaving-endowment~~ | Misbehaving | psychology | — | — | **yielded** to `behavioral:endowment-effect` (cm-books signed the exception, 2026-10-15, W-903; `company/domains/behavioral-signoffs.md` B2). Books takes it back if that lesson is struck. The slot reopens at the next ranking |
| 36 | hawks-and-doves-settle | new: selfish-gene-ess | The Selfish Gene | science-history | Single card | holds up (derivation) | ranked (overlap check with cm-life) |

Wave 1 (13-24): 12 books, 9 of them new to the briefs; psychology 5, business 3, science-history 4; answers A ×4, B ×4, C ×4; verdicts not "holds up" in 7 of 12. Ranks 25-36 bring business back up (3 new business books) and add four failure lessons.

## Objections, and what happened to each

| Objection | Raised by | Status |
|---|---|---|
| "Cutting 120 to 60 abandons the founder's 2,000." | anticipated (plan-to-2000 owner) | **Declined, with the slots returned.** The 60 slots go back to the pool, so 2,000 is not affected. They go where review can clear them. Founder ask F4. |
| "The founder asked for multi-card; single card for arithmetic ideas ignores that." | anticipated | **Partly accepted.** Every brief has a multi-card line, and the first multi-card Books lesson is proposed as the reference. The founder confirms the reading (F3). |
| "Deferring demand-3 ideas breaks 'demand first'." | charter ranking rule | **Accepted as a charter change.** I own the charter's ranking rule (not the copyright and accuracy rules). The change is D3. The deferred ideas stay in the map and are labelled (section 9). |
| "The 4 drafts were built while Books was meant to be Wave K." | this review | **Recorded, not answered by me.** They count against the pilot's 10. Every unbuilt Books brief now has a W-556 skip line, so the gate holds from here. Whether the gate leaked is the chief of staff's check (W-585). |
| "A human chapter sheet is not a fact-check." | anticipated (evaluation steward) | **Open, routed.** F1(a) asks the evaluation steward to say whether a dated record from a named person holding the book counts as a source check. If not, F1(b) or (c). |
| "Overlap rules belong to both categories, not one." | this review | **Accepted.** Section 8 is offered to cm-big-ideas to cite or object to (board). Until they answer, it binds only Books briefs. |
| "The verdicts in the briefs are one person's reading of the literature." | decision record, objection 2 | **Accepted.** Every verdict is marked as the brief's reading. Kill rule K2 measures how often the fact-checker overturns them. |

## This would be wrong if
- a book source appears soon and review capacity grows, so Books lessons clear at the subject rate (then 120 is reachable, and D1 should be revisited with data);
- learners do not value the verdict line (verdict recall well below mechanism recall), in which case the category's promise is the toy, not the verdict, and Big Ideas could absorb it;
- pairwise crits show multi-card beats single card even for arithmetic ideas (then D4 is too narrow).
