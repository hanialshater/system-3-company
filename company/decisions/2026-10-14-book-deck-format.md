# Decision: the Book deck format (W-647)

owner: head-of-product (Priya)
date: 2026-10-14
status: decided on rulings 1 to 6. Three items are the founder's and are listed at the end (purpose of "more per book", the unit of the Books target, the legal read). revisit if any line under "Revisit if" is observed.
reviewed: `company/design/specs/book-format.md` and `book-format.svg` (design-lead, Ines), proposed 2026-10-14
answers: `company/decisions/2026-10-14-founder-books-experience.md` ("We need more for books, it is different experience probably multiple cards")
amends: `company/decisions/2026-10-14-books-big-ideas-strategy-review.md` (rulings 1, 2 and 5; see "What changes in my earlier review") and, through cm-books, `company/domains/books-strategy.md` and the charter `company/domains/books.md` (see "What changes in books-strategy.md")
inputs read: the spec in full and its objections table; the founder decision; my strategy review; books-strategy.md §1-§4, §6; the charter `company/domains/books.md` (lines 13 and 52); `company/product/surface-value.md`; constitution Articles 4-6; `company/decisions/2026-10-14-w556-wave-gate.md`; the board (W-541, W-601, W-602, W-604, W-615, W-623, W-627-W-631, W-647-W-651); the 6 Books drafts' meta.json (all `draft`, 6 or 7 claims each); `npm run company -- status` (2026-10-14).

## Context

The founder replaced my Ruling 5 ("a book summary is the path of 2 lessons") with "a book is its own multi-card experience, with more per book". The design lead proposed a deck: an opening card (question, idea map, a bet), 4 to 6 idea lessons (default 5, each its own slug with 3 sub-cards: the case / your test / holds up?), a closing card (the bet against the verdicts), about 6 minutes, one feed tile per book, a tier-2 deck shell, a countable copyright line, about 10 committed books, and a Wave K pilot of a *Thinking, Fast and Slow* reference deck plus the other drafts.

Three facts the spec does not account for, checked today:
- **The charter caps a book at 4 ideas** (`books.md` line 52: "Every book in the map has at least 2 ideas and at most 4. A fifth idea means the book is better served by the Courses org"). It also says "No book has more than 2 lessons in draft or review at once" and "each one must stand alone in the feed" (line 13). The spec's default of 5 and maximum of 6, its 2-deck cap and its "idea lessons do not appear in the feed" break all three.
- **The spec uses the old Books verdict words** (Yes / Mostly / Mixed / Mostly not / Untested). My Ruling 3 replaced them with the shared six (holds up, holds with limits, mixed or contested, mostly not, did not replicate, untested).
- **The W-556 gate is shut** (queue 319 against 160). The 3-sub-card ideas also wait on W-604, W-601 and W-602 and the deck EDD (W-648, W-650). The reference deck cannot be built this week whatever I rule.

## Options considered

| Option | Verdict |
|---|---|
| One long sequence per book (12-20 sub-cards) | Rejected, for the spec's reasons: it breaks predict-per-idea, the 16-control QA budget and the claim gate. |
| The spec as written (default 5, max 6) | Rejected on depth only: it exceeds the charter's 4-idea ceiling, which exists to keep a book from becoming a course and is the cheapest copyright guard we own. |
| **The deck, default 4 ideas, 3 allowed, never more than 4 without a charter change** | **Chosen.** Twice the 2 planned, inside the charter, about 5 minutes. |
| Keep 2 lessons per book (my Ruling 5) | Superseded by the founder. |

## Rulings

### Ruling 1. The format: accepted, at 3 to 4 ideas

- **Shape: accepted.** Opening card (the book's question in our words, the idea map, the bet, Start disabled until a bet) → idea lessons → closing card (verdicts rendered from each idea's verdict claim; bet and result computed, never typed). Each idea is an ordinary lesson: its own slug, `meta.json`, predict → explore → reveal, recall. Inside, *the case / your test / holds up?* by default; single card is the stated exception for arithmetic ideas (books-strategy §3 "When to use which"). Never 4 sub-cards in a Books idea.
- **Depth: 4 ideas by default, 3 when only 3 pass the five tests in books-strategy §2, never more than 4.** A deck of 5 or 6 needs a charter change by cm-books that also answers the Courses boundary (`books.md` line 52, courses-lead) and a new record from me. A book with fewer than 3 passing ideas gets no deck.
- **Time: about 5 minutes** (4 × 60-75 s + about 35 s of framing; ceiling 7 min). The tile's "4 ideas · about 5 min" is computed from the deck.
- **Verdict words: the shared six from Ruling 3.** "Hold up" on the bet means **holds up** or **holds with limits**, and the card says so. Verdict quota per deck: at least 1 in 3 ideas not "holds up", so at least 2 of 4 (at least 1 of 3).
- **Navigation: accepted.** One feed tile per book; resume at the first idea without `completedAt`, never mid-idea; a non-interactive book bar of plain segments outside the `Lesson` stage; "Next idea" is a button below the card. Two conditions:
  - **No auto-advance and no guilt.** Next idea is always a press (Article 6.1, no infinite autoplay). An unfinished deck's tile says "Resume: idea 3 of 4" and nothing else: no "you left a book unfinished", no counters.
  - **The tile obeys the feed rules in surface-value.md** (subject round-robin; labelled "in review" when any idea is not published). Surface Value is not changed by this record.
- **"Each lesson must stand alone in the feed" (charter line 13) is kept as a property, not a placement.** Each idea must be complete without the others (own prediction, toy, verdict, recall; reachable at `/d/<slug>`; its revisit card appears in the feed alone). Its first appearance in the feed is inside its deck. cm-books rewrites line 13 to say this.
- **Kit: accepted as tier 2.** A deck shell with no change to `Lesson.tsx`, `sequence.tsx` or `tests/qa`. The principal engineer reviews the EDD (W-648) before any code (W-650). The format stays 🔴 in formats.md until W-604, W-601, W-602 close, the EDD lands, and the reference deck passes a design review not chaired by the design lead.
- **A deck goes live only when all of its ideas are published and every deck-level claim is verified.** A bet over 4 ideas with 1 missing is a broken reveal.

### Ruling 2. Depth against breadth, and what the 120 counts

- **Fewer books at the same pace: accepted** (the spec's recommendation, cm-books's objection answered). Slower is the wrong trade: Books is the one category with nothing published, and the published count is the pace.
- **Two different numbers, kept apart:**
  - **Slots measure review cost, in lesson-equivalents.** A deck costs its ideas plus 1 for deck-level review (concatenation test, book-probe walk, whole-deck learner read). A 4-idea deck = 5 slots. The +1 is the spec's estimate; it is re-measured on the reference deck and this line is revised if it is wrong by more than 1.
  - **The target counts published idea-lessons**, not decks. Each idea is a gated lesson at `/d/<slug>` with its own claims and recall, and the plan-to-2000 total counts gated lessons. Counting decks would make "120 Books" mean about 500 lessons and break the 2,000's arithmetic. **This is my recommendation; the unit is the founder's (F4).**
- **What the committed 60 slots buy:** about 12 decks of 4 = about 48 counted idea-lessons, not 60. Pacing (Ruling 1 of my review, unchanged): K 10, L 15 (3 decks), M 15 (3 decks), N-Q 20 (4 decks). The 5 kept drafts each make their later deck 1 slot cheaper. The conditional 60 slots buy up to about 12 more decks on Ruling 1's triggers.
- **Reaching 120 idea-lessons takes about 150 slots** (30 decks). Under the current committed + conditional 120 slots, the honest ceiling is about 96 idea-lessons in about 24 books. The founder should see this number before answering F4.
- **Work-in-progress caps:** at most **2 decks in flight**, and at most **12 Books lessons in draft + review in total**, loose drafts included (today: 6 drafts; with one deck's 3 new ideas, 9). The charter's "2 lessons per book in draft or review" becomes "1 deck per book in flight". cm-books changes the charter line.
- **Breadth trigger (committed prediction).** For the reference deck, before deploy: in the whole-deck borrowed-mind read, the reader names the verdict of at least 3 of 4 ideas after the closing card and does not flag fatigue before idea 3. After a founder-approved deploy, with real learners: **at least 50% of learners who place a bet reach the closing card.** If fewer than 35% do, the default drops to 3 ideas and the freed slots go to more books. Completion is Surface Value item 5 (necessary, not sufficient); first-revisit recall per idea (item 4) is reported beside it and decides if they disagree.

### Ruling 3. The pilot (Wave K, 10 slots)

- **The reference deck is *Thinking, Fast and Slow*, 4 ideas:** `wheel-number-pulls-guess` (anchoring, kept as built, single card) as idea 1, plus **3 new idea builds**, plus the deck review. **cm-books chooses the 3** from the spec's four candidates (loss aversion, peak-end, planning fallacy, behavioural priming) or others, and orders them. The deck must meet the verdict quota (at least 2 of 4 not "holds up"). If priming is chosen, it needs a concept in `books.json` and the distinct test against `best-of-twenty-on-one-test`.
- **The other 5 drafts are kept, not rebuilt**, each as idea 1 of its book's later deck: `slowest-station-sets-pace` (The Goal), `born-in-january-picked-first` (Outliers), `one-percent-a-day` (Atomic Habits), `biased-judge-noisy-judge` (Noise), `total-signups-hide-the-slide` (The Lean Startup). They go on through fact-check and learner review now (the gate never held reviews). **They do not publish standalone.** Each publishes inside its deck.
- **Count:** 6 drafts + 3 builds + 1 deck review = 10 slots, the plan's Wave K Books pilot unchanged.
- **No new W-556 exemption.** The 3 new builds are ordinary Wave K builds: they wait for the gate, and the 3-sub-card ones also wait for W-604, W-601, W-602 and the deck kit. A builder could not finish them this week anyway. cm-books may write their briefs now (briefs are not gated).
- **The Books launch is the reference deck as a unit.** I chair its Launch Review (go/no-go per idea against the gates, plus the deck-level checks in Ruling 4). The Domain Launch Review's "five lessons" belongs to the domain scout; I ask her to rule that for Books the five is the reference deck (4 ideas + the deck review), not 5 loose drafts (board).
- **W-629 (my Ruling 5 test) is re-scoped:** the reference deck's 3-sub-card ideas are the first multi-card Books lessons (brief 13 is no longer first). The pairwise single-vs-multi crit on one arithmetic idea moves to Wave L, one extra build, prediction unchanged ("multi-card wins on 'the verdict is clear and separate'"). If single card wins, arithmetic ideas stay single card inside decks, which the format already allows.

### Ruling 4. The copyright line (for the founder's legal read, F2)

**Accepted as our binding standard from today, as an addition to the rules in `2026-10-14-books-and-big-ideas.md`; it loosens none of them.** The legal read confirms or tightens it. No Books lesson or deck publishes before F1 and F2.

The countable rule, per deck:
1. **At most 20 words per idea and 120 per deck** say what the book argues: each idea's "*Title* argues …" sentence, the opening card's question and the closing summary, all counted.
2. **At most 1 quoted line per deck** (about 20 words or fewer, attributed, only where the wording is the point).
3. **At most 4 ideas per deck** (Ruling 1), and the opening card says "Not the whole book: 4 ideas we can test, in our own words."
4. **No chapter or part numbers, titles or page references shown; the deck's order is our teaching order, never the book's.** The chapter lives only in `meta.json` as "(unconfirmed)".
5. **Our toys only:** no figures, tables, diagram layouts, coinages for the book's examples, characters, scenes, summaries, takeaways or exercises from the book.
6. **The concatenation test, every deck:** paste every learner-visible sentence that says what the book argues, **plus the idea titles of the map, in deck order**, into one paragraph. It must be within the 120-word count (titles not counted toward 120, but read with it), and a reader must not be able to tell from it what the book's chapters contain or their order. If it reads as a synopsis, the deck fails, whatever each card says alone.
   - **Who runs it: not the builder and not cm-books.** The fact-checker counts (a script may count); the Launch Review chair (me) or a reviewer I name reads for "synopsis". Recorded in `company/reviews/<work>-deck/<date>-copyright.md`.

Added for F2 (the legal read), beside the six questions in books-strategy §6:
- **Q7.** Does a deck of up to 4 tested ideas from one book, under these word limits, take the "heart" of the work or substitute for it, even if no sentence is reproduced? Is a count of ideas a better guard than a count of words?
- **Q8.** Is the concatenation test, as worded above, an adequate operational test of "not a summary of the book's text"? What would counsel add?
- **Q9.** Is the book's question on the opening card and the feed tile, with the title, author and year, safe as worded (it is the most visible sentence we write about a book)?

### Ruling 5. W-651: may a deck manifest hold claims? (framed for the evaluation steward)

This is an evidence-and-gate question, so it is the evaluation steward's, not mine. My product requirement and the questions:

**Product requirement (mine, binding on whichever answer):** no learner sees a deck-level sentence (book question, title, author and year, closing summary, quote) unless it is a recorded claim with an address, support and source, checked by someone other than its builder, and **held by the same publish gate as lesson claims**. Article 6.3 (a learner may see what it rests on) applies to the deck's cards: the deck shows its claims the way a lesson does.

**Questions for the steward:**
1. Is "that lesson's `meta.json`" (CLAUDE.md, the claims rule) a rule about **where** claims live, or about **gating** (each learner-visible sentence held by a gate)? If the second, a manifest can qualify once the gate reads it.
2. **Option A: the manifest** (`content/books/decks/<work>.json`, addresses `books.deck.<work>.c<n>`). The gate in `tools/company.mjs` (protected) does not read it today, and a deck has no status, so it needs an amendment: the gate reads manifests, and the deck route renders only when every manifest claim is verified and every idea is published. The judged may not amend the judge alone (Article 3.3).
3. **Option B: idea 1's `meta.json`**, as **ordinary entries in its `claims` array** (not a separate `deck` block, which the gate may not read), addresses `books.<slug>.deck-c<n>`. The existing gate holds them with no amendment. Costs: idea 1 cannot publish until the deck claims verify (acceptable: it does not publish standalone, Ruling 3), and the claims must move if idea 1 leaves the deck.
4. Whichever you choose: does `tools/meta.mjs` need to learn it (deck claims are not lesson claims for coverage counts)?
5. Later, and only by amendment: should the deck walk (`tools/book-probe.mjs`) join `tests/qa` after it passes on two decks?

**My preference, for the steward to accept or reject:** Option B for the pilot, because it ships under the existing gate with no amendment, and Option A only if a second deck shows B's coupling hurts. The steward rules; the EDD (W-650) follows the ruling.

### Ruling 6. What stays as the spec wrote it

The time budget per idea, mid-idea restart, the bet store `s3c:books:v1`, per-idea recall with no book-level recall item, the four book events, the book probe, and the spec's "This would be wrong if" list, all accepted. The spec's §5 mockup and §6 numbers are superseded where they say 5 ideas (now 4) and Yes/Mostly (now the shared six). The design lead revises the spec (board).

## What changes in books-strategy.md (cm-books makes the edits; W-649)

| Section | Was | Now |
|---|---|---|
| Header / D2 | 2 lessons per book by default; a third rarely | A book is a deck of 3-4 idea lessons, default 4 (Ruling 1). |
| D4 | Multi-card only where the verdict needs its own picture | Multi-card (3 sub-cards) is the default inside each idea; single card is the arithmetic exception (unchanged in substance from my Ruling 5). |
| D6 / §4 Wave K row | Pilot = 4 drafts + 6 briefs, 10 books | Pilot = TFS reference deck (wheel + 3 builds + deck review) + 5 kept drafts, 10 slots (Ruling 3). The unbuilt pilot briefs (twenty-steps-at-99, good-call-bad-result, turkey-day-one-thousand, more-people-later-project) are re-planned by cm-books as ideas of later decks or deferred. |
| §1 promise | "One idea per lesson, two lessons per book" | "One idea per lesson; 3-4 tested ideas per book in one deck, about 5 minutes; never the whole book." |
| §2 ranked list | 50 books, 30 committed | About 12 committed books (Ruling 2); cm-books re-ranks for decks (each needs 3-4 ideas passing the five tests). |
| §3 "How many lessons per book" | 2 / 3 / 4 | 3-4, default 4; 5+ only by charter change and courses-lead. |
| §4 target and caps | 60 committed = 30 books × 2; ≤ 12 in flight, ≤ 2 per book | 60 committed slots = about 12 decks = about 48 idea-lessons; ≤ 2 decks and ≤ 12 Books lessons in flight; 1 deck per book. Target unit = idea-lessons (founder, F4). |
| §6 checklist | per-lesson rules | adds the deck-level countable rule and the concatenation test (Ruling 4), and legal questions Q7-Q9. |
| Charter `books.md` lines 13, 52 and the per-book cap | "stand alone in the feed"; 2-4 ideas; ≤ 2 in draft/review per book | "stand alone" as a property (Ruling 1); 2-4 unchanged (decks use 3-4); 1 deck per book in flight. |

I put a pointer at the top of books-strategy.md so a reader of the strategy sees this record before the superseded lines. The rewrite is cm-books's.

## What changes in my earlier review (`2026-10-14-books-big-ideas-strategy-review.md`)

- **Ruling 5 is superseded in part.** Still true: "several sub-cards inside one lesson about one idea" (now the inside of each deck idea); no single lesson walks through a book or several of its ideas; single card is the arithmetic exception; "does it hold up?" is a launch requirement. No longer true: "a book summary is the book's path of 2 lessons (sometimes 3)", and "brief 13 is the first multi-card Books lesson" (W-629 re-scoped, Ruling 3). F3 is answered by the founder's record, not by my ruling.
- **Ruling 1:** Books slots now count review in lesson-equivalents (a deck = ideas + 1). The 60 committed / 60 conditional split and its triggers stand. My F4 recommendation "keep 120" now reads "keep 120 idea-lessons" (Ruling 2).
- **Ruling 2:** the 2 Books exemption builds stand (both are drafts on disk). The Books "DLR five" of loose drafts is replaced by the reference deck (Ruling 3; domain scout asked). No further exemption is added here.
- **Accepted from books-strategy (Ruling 1 list):** D2 and the "2 per book" cap are withdrawn; D6 is replaced.
- I added an amendment note to that record pointing here.

## Rests on

- `company/design/specs/book-format.md` §1-§6 (shape, budget, copyright count, kit, capacity arithmetic).
- `company/domains/books.md` lines 13 and 52 (the charter ceiling and "stand alone").
- `company/product/surface-value.md` (feed rules; completion is item 5, recall item 4).
- Constitution Articles 3.3, 4.3, 6.1, 6.3.
- My Ruling 3 (shared verdict words) and the W-556 gate record.

## Revisit if

- fewer than 35% of bettors reach the closing card after deploy, or the whole-deck borrowed-mind read flags fatigue before idea 3 (Ruling 2: drop to 3 ideas);
- the legal read says a deck of 3-4 ideas is a substitute however few words it spends (then depth goes back to 2);
- deck-level review costs more than 2 lesson-equivalents on the reference deck (re-price the slots);
- the founder says "more per book" meant 5 or more ideas (charter change, Courses boundary, new record);
- the evaluation steward rules that no deck-level claim home is valid (then the deck carries no deck-level sentences: no question, no summary, a title card and computed verdict list only).

## Objections, and what happened to each

| Objection | Raised by | Kind | Status |
|---|---|---|---|
| More per book means fewer books, or slower; say which | cm-books (books-strategy D1, D2), carried by the founder decision | purpose (budget) | **Accepted: fewer books at the same pace.** About 12 committed decks instead of 30 books. The 3-idea fallback is triggered by measured completion (Ruling 2). cm-books revises the list (W-649). |
| A book retold card by card risks the copyright line and the 60-second budget | head-of-product (me, founder decision) | evidence | **Accepted as answered by checks:** the countable rule, the concatenation test (now including the map titles, run by someone other than the builder), 4-idea ceiling, 60-75 s per idea with every idea a stopping point. The legal read confirms (F2, Q7-Q9). |
| A longer book format is a kit change and needs tier-2 review | principal-engineer (EDD-006) | evidence | **Accepted:** no `CardSequence` change; the deck shell is a tier-2 EDD (W-648 before W-650). Per-idea budget 14 ≤ 16 controls. |
| Default 5, max 6 ideas per deck | design-lead (spec §1, §6) | purpose | **Rejected because** the charter caps a book at 4 ideas and sends a fifth to the Courses org; the spec did not address that line. 4 is already double the plan. 5+ needs a charter change and a new record. |
| Verdict chips Yes / Mostly / Mixed / Mostly not / Untested | design-lead (spec §2, §5) | evidence | **Superseded** by Ruling 3 of my review (shared six). The design lead revises the spec. |
| "The deck's idea lessons do not also appear as separate feed items" breaks the charter's "each must stand alone in the feed" | head-of-product (this review) | purpose | **Accepted with the charter reworded:** standalone is a property (complete alone, own recall, own URL, revisits alone in the feed), not a first placement. cm-books edits line 13. |
| "4 is still not 'more'; the founder wanted the book covered" | anticipated (founder's intent) | purpose | **Open, for the founder (Article 4.3, a purpose dispute).** My answer: 4 is twice the plan and the charter's ceiling, and "covering the book" is exactly what the copyright rules forbid. If the founder wants 5+, it is a charter change and a new record. |
| "Give the reference deck an exemption so Books moves this week" | anticipated (design lead, chief of staff) | budget | **Rejected because** the 3-sub-card ideas also wait on W-604, W-601, W-602 and the deck kit, so an exemption would buy files, not a deck. Briefs may be written now. |
| "Keep the 5 drafts publishable as single lessons until their decks exist" | anticipated (cm-books, the published-count pace) | purpose | **Rejected because** the founder said a book is a different experience from a subject lesson, and a loose draft that publishes then vanishes into a deck changes the feed under learners. F1 and F2 block every Books publish anyway, so it costs no published lesson today. Reopen if F1 and F2 clear long before the first deck of a kept draft. |
| A deck manifest is outside the claim gate | design-lead (spec §4), W-651 | evidence (gate) | **Open, funded:** framed for the evaluation steward (Ruling 5), with a product requirement that binds either answer and a fallback in "Revisit if". |
| The +1 slot per deck for deck-level review is a guess | head-of-product (this review) | evidence | **Accepted as an estimate, funded by a measurement:** re-priced on the reference deck (Ruling 2). |
| "Counting idea-lessons flatters the target: a deck costs 5 slots for 4 counted lessons" | anticipated (principal-pm-verticals) | purpose | **Open, for the founder (F4).** I recommend idea-lessons because they are the gated unit the 2,000 counts; I show the cost (about 150 slots for 120) beside it so the founder decides with the number. |
| A bet and a "Resume" tile could become streak-like pressure | anticipated (Article 6.1) | evidence | **Accepted, closed by a rule:** no auto-advance, no unfinished-book messaging, no counters (Ruling 1). Borrowed-mind read checks the bet does not read as filler (spec's "wrong if"). |

## Applied in this session

- This record.
- `company/domains/books-strategy.md`: a pointer line at the top (no other edit; the rewrite is cm-books's, W-649).
- `company/decisions/2026-10-14-books-big-ideas-strategy-review.md`: an amendment note under the header.
- Board: W-647 done; notes on W-649, W-651, W-629, W-615, W-541, W-628, W-631; new items for design-lead (revise the spec), cm-books (the charter lines), domain-scout (Books DLR on the reference deck).

## What remains for the founder

1. **Purpose of "more per book" (W-615):** confirm that a deck of 3-4 idea lessons with an opening bet and a closing verdict card is what you meant, and that 4 ideas is the ceiling (5+ needs a charter change and moves toward the Courses org).
2. **F4, the unit of the Books target (W-615, W-628):** I recommend 120 **idea-lessons** (about 30 books, about 150 review slots). The 120 slots now in Ruling 1 buy about 96 of them.
3. **F2, the legal read (W-541 a):** commission it with the six questions in books-strategy §6 plus Q7-Q9 here, and ask counsel to confirm or tighten the countable rule and the concatenation test.
4. **F1, a book source (W-541 b):** unchanged; a deck needs 3-4 chapter-sheet lines per book.
