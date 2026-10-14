# Decision: review of the Books and Big Ideas content strategies (W-614, W-618)

owner: head-of-product (Priya) · date: 2026-10-14 · status: **decided** on the five rulings below. The targets are recommendations, because per-category targets are the founder's (plan-to-2000 header). Four founder questions remain open and are listed at the end.
reviewed: `company/domains/books-strategy.md` (cm-books, Hester), `company/domains/big-ideas-strategy.md` (cm-big-ideas, Dmitri)
inputs read: both strategies in full; `company/decisions/2026-10-14-w556-wave-gate.md` (my gate); `company/decisions/2026-10-14-books-and-big-ideas.md` (founder request: "Book Summaries: multi-card lessons that teach a book's core ideas … book summary (multiple cards)"); `company/product/verticals/plan-to-2000.md` §2 and §3; `company/ops/brief-skips.json`; `company/roles/cultural-reviewer.md`; Big Ideas briefs 6, 8 and 9; `npm run company -- status` and the meta.json status of the 8 drafts (2026-10-14).
founder's intent, as given to me by the session that dispatched this review: "double down on big ideas and book summary".

## What is true today (checked 2026-10-14)

- There are 8 drafts on disk and 0 published. Books has slowest-station-sets-pace, one-percent-a-day, born-in-january-picked-first and wheel-number-pulls-guess, with 6 claims each. Big Ideas has two-four-six-rule, ten-times-taller-giant, noise-draws-dunning-kruger and earth-history-in-a-day, with 5, 5, 5 and 8 claims. None has a review.
- The W-556 gate is shut: the queue is 319 against a limit of 160, and Wave J is 0/144 published. All 20 unbuilt Books briefs and all 20 unbuilt Big Ideas briefs carry a "Wave K gate (W-556)" skip line.
- **The gate does not hold the 8 drafts.** W-556 holds new builds only. Reviews, fact-checks and revisions of existing drafts are explicitly not gated. Both leads treated the drafts as stuck, and they are not.
- No book can be opened from this host. Journal hosts are blocked too (W-511, W-583). So no Books lesson can publish until a book source exists (F1) and the legal read is answered (F2), whatever this record says.

## Ruling 1. The targets

**I do not lower either headline target.** I adopt each lead's committed numbers as the committed tranche. The rest of the target becomes a conditional tranche that is released by named triggers.

| | Plan target (founder's) | Committed (paced as the lead proposed) | Conditional | Released when | Unreleased slots |
|---|---|---|---|---|---|
| Books | 120 | **60**: K 10, L 15, M 15, N-Q 20 (books-strategy §4 table, unchanged) | **60** (the lead proposed 30) | In steps of 15. Each step needs (a) a working book source (F1), and the previous step's book-sourced claims cleared within one wave; (b) Books first-review launch rate at or above the feed median. From Wave N, also commit rate and 7-day recall at or above the feed median (the lead's K5 measures) | Return to the pool at Wave N cycle planning, and not before |
| Big Ideas | 170 | **72 through Wave M**: K1 12, K2 12, L 24, M 24 (big-ideas-strategy §4, unchanged) | **98** | In waves. Each needs (a) the ideas to exist: every released slot is an idea or path second that passes the §1 bar (transfer ≥ 3, overturn, boundary); (b) Big Ideas first-review launch rate ≥ 50%; (c) from Wave N, transfer recall at or above the feed median | Return to the pool at Wave N cycle planning |

Why: both leads' reasons are real, and they are **capacity** reasons, not reasons the category is worth less. Review is the bottleneck (319 against 160). Books holds ~100% of its lessons on a source nobody can open. Big Ideas has 68 ideas that pass its bar today. A reason of that kind should set the *pace* and the *release trigger*. It should not shrink the founder's target before we have measured the capacity. The plan already counts only gated lessons toward 2,000, so committing 120 Books lessons that cannot publish would add nothing. Holding them as conditional costs nothing and keeps the "double down" intact.

What I accept from each strategy as written: Books D2 (2 lessons per book by default; 120 then means about 60 books, and the lead has ranked 50), D3, D5 and D6, the caps (12 in flight, 2 per book) and kill rules K1-K6. Big Ideas D2 (a 24-lesson pilot in two halves), D3-D7, the caps (12 in flight, 3 ⚑ in review), the DLR condition on K2, and kill rules 1-5.

What I decline: Big Ideas' **120 as a hard ceiling** (D1). The idea-supply argument is right, but the right guard is the §1 bar applied per slot, not a number fixed from today's 59-concept map. Books' **"freed 60 slots return to the pool now"** (D1). They return at Wave N, and only if the triggers have not fired.

## Ruling 2. A W-556 pilot exemption, so "double down" produces lessons this week

**Yes, a narrow and named exemption: 5 new builds in total (Big Ideas 3, Books 2).** It amends my own W-556 record (Amendment 3, recorded there).

What already moves without any exemption: the 8 drafts go to fact-check and learner review now. Chief of staff, put them at the front of those queues (board).

**Big Ideas: 3 briefs, named by the lead:** one-ten-thousandth-apart (6), same-grey-in-shadow (8) and colds-clear-without-the-pill (9). With two-four-six-rule and ten-times-taller-giant they make the Domain Launch Review five. I removed the W-556 part of their skip lines. Each line still holds the brief until cm-big-ideas finishes the W-537 re-check of that brief and W-538 (DomainId) lands. cm-big-ideas then removes the line.

**Books: 2 briefs, which cm-books names** (choosing them is her scope, not mine), from the 6 pilot briefs in books-strategy §4. With the 4 drafts, a DLR five can form with one spare. cm-books does W-536 on those 2 and removes their lines. I did not touch any Books skip line.

**Every exempt brief must meet all of these** (cm-books and cm-big-ideas check them before removing a line):
1. The predict answer and every stage number rest only on a derivation, a disclosed seeded simulation, or what the learner's screen shows, and a node check exists.
2. The reveal holds at most 1 held citation, and its "cut if not checkable" fallback is written. A Books lesson has at most 2 book-sourced claims, and the answer rests on neither.
3. The idea is not ⚑ (contested) and not in a sensitive class (Ruling 4).
4. It uses single card or another approved format. No `<CardSequence>`.
5. W-538 has landed, and the CM's re-check of that brief is recorded.

**Bounds:**
- The 5 count in the gate's queue measure and against each category's Wave K pilot. They are not on top of it.
- There is no further exemption without a new decision record.
- The exemption ends when the gate opens or at Wave K cycle planning, whichever comes first.

**D8 (W-618): a contested lesson may not be in the DLR five.** noise-draws-dunning-kruger stays a draft and goes to review, but it is not one of the five. The lead offered colds-clear-without-the-pill as the swap, and I took it. earth-history-in-a-day stays out as well (5 date claims, likely held).

**What this does and does not buy this week.**
- It does: up to 5 new drafts, and 8 drafts entering review.
- It does not buy any Books publish (F1 and F2 block it).
- It buys a Big Ideas publish only if the derivation claims verify and any held line is cut.
- It buys no deploy without the founder's approval of that deploy.

## Ruling 3. The shared boundary (Books §8, Big Ideas §8.2; W-617, W-621)

**The two sections are one boundary from today, and both categories are bound by it. Neither co-sign is a precondition for briefing.** The unit, the ownership rules and the collision tables agree in substance. I settle the four places where they differ:

1. **Path dependence / wnf-critical-junctures.**
   - The texts conflict: Books §8 says Big Ideas owns path dependence, while Big Ideas removed that concept and §8.2 gives Books the institutional claim.
   - **Ruling:** Books owns the *Why Nations Fail* institutional claim. The doorway is probability/same-songs-different-hits, and Books may not re-run that stage. The concept stays deferred, but the reason is now "told, not shown" (books-strategy §9), not overlap.
2. **Thresholds.** Big Ideas removed threshold-collective-action. **Math owns thresholds** (math/one-shy-rioter-stops-the-riot). Books may teach only the *Tipping Point* "law of the few" claim and the simulations that question it.
3. **Verdict words.**
   - The two sections conflict: Books uses Yes / Mostly / Mixed / Mostly not / Untested, and Big Ideas proposes five others.
   - **Ruling: one shared set of six**, because verdict recall is a measure both categories report:
     - **holds up**
     - **holds with limits** (Books "Mostly")
     - **mixed or contested**
     - **mostly not**: the strong form fails, but a smaller effect survives (10,000 hours)
     - **did not replicate**: a registered or multi-lab replication found about zero (ego depletion)
     - **untested**
   - Each verdict needs its own source. Built drafts change the wording at their next revision. This is not a rebuild.
4. **Named pairs.** The pair list in Big Ideas §8.2 rule 4 stands as written. **It also counts as cm-big-ideas' agreement** to Books rank 30 (bend-in-the-line), on the condition that it uses a projection-line stage and not the birth-death lag model. Any **new** pair still needs the other lead's written sign-off in the later brief (§8.2 rule 7). Disputes come to me.

W-617 and W-621 are re-scoped: each lead adds a citation of this ruling to their own section and adopts the verdict words. Neither is blocking.

## Ruling 4. The cultural-review route for sensitive society and mind topics

**The product requirement is decided here. The scope change is routed.**
- **Requirement.** These lessons get a review by someone outside the category before build (on the brief) and before publish (on the walkthrough):
  - any Big Ideas or Books lesson in a sensitive class from big-ideas-strategy §6 (economic policy, demography, voting and political philosophy, religion, group differences, wellbeing claims, war and violence);
  - Books titles that touch those classes (for example *Guns, Germs, and Steel*, *The Better Angels of Our Nature*, *Why Nations Fail*).
  
  A research-lead literature map comes first for every ⚑ lesson and every sensitive one (W-622).
- **Who.** The cultural-reviewer is the right reviewer, because "the example that lands wrong, the norm that differs" is her mission. Her scope is locale variants only, and I may not change a role.
  - chief-of-staff-ceo-office proposes the re-scope in `tools/org/roles.mjs`: source-language reviews of lessons in a sensitive class, recorded as `company/reviews/<slug>/<date>-culture-en.md`. localization-lead, her lead, must agree to the load.
  - If the record is to become a **publish gate** in the tooling, that is evaluation-steward's change by amendment, not mine.
- **Until the re-scope lands,** sensitive-class briefs stay unclaimed even after the gate opens, as the lead proposed. This costs nothing this week: no exempt brief and no pilot brief is in a sensitive class.

## Ruling 5. Books F3: what "multiple cards" means

**"Multiple cards" means several sub-cards inside one lesson about one idea: the case, your test, holds up?** A "book summary" is the book's **path**: 2 lessons (sometimes 3), linked in curriculum order. We do not build one lesson that walks through a whole book or several of its ideas. That would be the multi-idea retelling the charter's copyright rules forbid, and it does not fit 60 seconds. The founder's own words, "multi-card lessons that teach a book's core ideas", fit this reading: the *lessons* teach the core ideas, together.

**I go further than D4 on the default.**
- Once W-604, W-601 and W-602 close and the design lead flips the formats.md row, **multi-card is the default Books shape**. Its three beats are the category's promise (claim and verdict side by side).
- Single card is the stated exception. It applies to arithmetic ideas whose verdict *is* the derivation, and the brief says why.
- Until the format opens, everything is single card, the pilot included.
- **Committed test:** the first multi-card Books lesson is brief 13 (the lead's proposal), chaired by someone other than the design lead. Then one pilot arithmetic lesson is built both ways for a pairwise crit.
- **Prediction:** the multi-card version wins the crit on "the verdict is clear and separate". If single card wins, the default goes back to D4 as written.
- This takes F3 off the founder's list. If the founder meant a whole book per lesson, that reverses this ruling and needs a charter change and a new decision record.

**Also settled (W-614, from W-539): "Does it hold up?" is a launch requirement for Books.** A Books lesson without the separate, labelled, sourced verdict line does not pass Domain Launch Review. If the line's source is held, the normal claim gate holds the lesson.

## Founder questions that remain (board W-615, W-619), each with my recommendation

| # | Question | My recommendation |
|---|---|---|
| **F1** (W-615, W-541 b, W-583) | A book source for chapter checks | **Name one person this week** who fills the pilot's chapter sheets with copies in hand. That is about 12 claims and about 30 minutes, once cm-books writes the sheets. Then a connected fact-check session each wave (option b). Evaluation-steward must first confirm that a dated, named record counts as a source check (board). Without F1, kill rule K1 fires at Wave L's entry. |
| **F2** (W-615, W-541 a) | A legal read of the copyright policy | **(a) Commission it now**, with the six questions in books-strategy §6, and require it before the first Books *publish*. It does not hold builds or reviews. It costs no calendar time, because F1 holds publishing anyway. |
| **F4** (W-615) | The Books target | **Keep 120.** Accept the split in Ruling 1: 60 committed, 60 conditional on the source and launch-rate triggers. Do not accept "60 + 30, with 60 back to the pool now". |
| **W-619 (1)** | The Big Ideas target | **Keep 170** with 72 committed through Wave M. The other 98 are released only for ideas that pass the bar. Do not set a 120 ceiling. The plan's 2,000 is then unchanged until Wave N cycle planning shows otherwise. |
| **W-619 (2)** | Include the Big Ideas DLR five's ~6 held claims in the first W-583 session | **Yes.** Add the Books pilot's chapter claims if that session can reach a library or e-book host (F1 b). |

The W-556 founder asks (W-583 fact-check session, first deploy) are unchanged, and they matter more now: "double down" turns into published lessons only through them.

## Objections, and what happened to each

| Objection | Raised by | Status |
|---|---|---|
| "Review, not build, is the limit, so commit 60 and return 60 slots to the pool." | cm-books (D1) | **Accepted as the pace, declined as the target.** The 60 are committed and paced exactly as proposed. The other 60 are held as conditional on capacity triggers, and they return to the pool at Wave N if the triggers have not fired. The founder decides the number (F4). |
| "Every Books lesson holds a claim nobody can open, so 120 is fiction." | cm-books (§4) | **Accepted as a fact.** It is now the first release trigger: no conditional step without a working book source. It is not a reason to cut the target before F1 is answered. |
| "Only 68 ideas pass the bar, so 170 needs filler." | cm-big-ideas (D1 a) | **Accepted as a guard, declined as a number.** Every conditional slot must be an idea that passes §1. If too few exist at Wave N, the slots go back to the pool. That is the same outcome as the lead's ceiling, without fixing it from today's map. |
| "Review capacity and held sources: a Big Ideas lesson holds ~1 claim." | cm-big-ideas (D1 b, c) | **Accepted** as the reason for the committed pacing and the 12 / 3 caps, both adopted. |
| "You kept their numbers, so you did not double down." | anticipated (founder's intent) | **Answered with what changes this week:** 5 new builds through a lifted gate, 8 drafts at the front of the review queues, and both headline targets kept. More builds behind a shut review queue would add files, not lessons (plan §0). The founder can overrule the pacing. |
| "An exemption to a gate one day old breaks the gate." | anticipated (chief of staff, W-585) | **Accepted in part.** The exemption is 5 named briefs, counted in the queue measure and against the pilot, with an expiry and no further exemptions without a record. Its purpose is the gate's own: the two DLR fives tell us whether these categories work before they spend more review. |
| "Lifting the gate adds lessons that cannot publish (Books)." | anticipated (fact-checker) | **Accepted for Books.** That is why Books gets 2 and not 6. The return is a Books DLR five, the copyright checklist used on real builds, and a first measure of the K2 verdict-overturn rate. That is information we cannot get any other way. |
| "A contested lesson in the DLR five holds the launch hostage." | cm-big-ideas (D8) | **Accepted.** Dunning-Kruger is out of the five and colds-clear is in. |
| "Co-sign of the boundary must come first." | cm-big-ideas (§10 ask) | **Declined.** The texts agree in substance. I settled the four differences (Ruling 3) as the dispute owner, so waiting adds nothing. New pairs still need written sign-off. |
| "Multi-card for arithmetic ideas adds presses and fit risk and teaches nothing more." | cm-books (D4) | **Partly accepted.** Single card is allowed as a stated exception, and nothing uses a sequence before W-604, W-601 and W-602. I made multi-card the default after that, because the founder asked for it and the category's three beats fit it. A pairwise crit tests the call (Ruling 5). |
| "The cultural-reviewer route is not in that role's scope." | cm-big-ideas (§6) | **Accepted. Routed, not ruled.** The re-scope goes to chief-of-staff-ceo-office with localization-lead's consent. Sensitive briefs stay unclaimed until it lands. |
| "A chapter sheet filled by a person is not a fact-check." | cm-books (anticipated, evaluation steward) | **Open, routed** to evaluation-steward (board). F1's recommendation depends on that answer. |

## This would be wrong if

- the 5 exempt builds and 8 drafts do not reach review within one operating loop. Then the bottleneck is not the gate, and the exemption bought nothing;
- the Books pilot's verdict-overturn rate at fact-check reaches 30% (K2). Then the Books conditional tranche should be cut, not held;
- F1 has no answer by Wave L's entry. Then the lead's 60 is the right ceiling, and I should say so to the founder;
- the pairwise crit picks single card for arithmetic ideas. Then D4 stands as the lead wrote it.

## Applied in this session

- `company/ops/brief-skips.json`: for one-ten-thousandth-apart, same-grey-in-shadow and colds-clear-without-the-pill, I removed the W-556 reason. The W-537 and W-538 holds remain. No Books line was changed.
- `company/decisions/2026-10-14-w556-wave-gate.md`: added Amendment 3, which points here.
- Board: W-614 and W-618 moved to done. W-617 and W-621 re-scoped. Links added to W-615, W-619 and W-539. New items: W-623 cm-books (name 2 exempt briefs, W-536 on them, chapter sheets), W-624 cm-big-ideas (W-537 on briefs 6, 8 and 9), W-625 chief-of-staff (review-queue priority for the 8 + 5), W-626 chief-of-staff-ceo-office (cultural-reviewer re-scope), W-627 evaluation-steward (does a chapter sheet count as a source check), W-628 principal-pm-verticals (plan-to-2000 §2 after F4 and W-619), W-629 design-lead (the multi-card test in Ruling 5).
