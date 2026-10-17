# Personalised new-lesson order: intro copy, chips, cold start, reason lines, data page, release-note residual

owner: head-of-product (Priya) · date: 2026-10-17 · run: hop-w1602-1017 · board: W-1602 (the W-1577 addendum), W-1611
decision this serves: `company/decisions/2026-10-17-founder-personalization-milestone-delegation.md` ("always on, no switch"), behind the company build flag `NEXT_PUBLIC_NEW_LESSON_ORDER`, off by default.
candidate: `company/personalization/policies/reachable-v3.ts`, sha256 `53981ab0…c195` (checked this run, matches the RC record).
status: **product rulings and proposed copy. None of the copy is verified.** Every proposed sentence is a learner-facing claim. It goes to a second fact-checker (truth) and privacy-reviewer (ceiling) before it reaches code. Nothing here clears a release: W-1585 (amendment), W-1586 (privacy re-ruling), W-1587 (counsel), the G record and the founder's deploy approval all still stand in front of the flag.

Read: EDD-010 §3.1, §3.3, §5.4, §11, §12 (`company/engineering/edd/EDD-010-personalised-new-lesson-order.md`); batch 5 §5, §12, §14 (`company/personalization/batches/2026-10-17-batch-5.md`); RC lines (`company/personalization/copy/2026-10-17-reason-lines-rc.md`); privacy design read (`company/reviews/_privacy/2026-10-17-edd-010-design-read.md`, Q-P2, E10, E14, findings 2-4) and the v3 addendum with addenda 2 and 3 (`company/reviews/_privacy/2026-10-17-edd-010-v3-addendum.md`, V1-V15, V3b, A3-1 to A3-3); `src/components/Feed.tsx` (IntroCard, items, chooseFilter); `tests/qa/feed.spec.ts` (read only); `src/lib/visibility.ts`; `content/domains.json`; `company/product/surface-value.md` (protected, read only); my own `company/decisions/2026-10-12-feed-is-not-personalised.md`.
Measured this run: EDD-010's probe (`company/engineering/edd/EDD-010-probe.mts`, usage lines 6-9) re-run in my scratchpad against the frozen v3 file and dims at 4a559d6, plus a 20-line check of statuses and domains in v3's empty-history rank. Nothing in the repository was edited except this file.

## What would make a line here untrue
- The candidate changes (any hash other than `53981ab0…c195`), or the pilot domains change from probability and cs. Every cold-start number below is for v3 on today's 230 pilot lessons.
- Counsel (W-1587) or the founder requires a learner control. Then the data-page sentence "there is no setting" is false, and G9 makes the website part NO-GO anyway.
- RC's line set changes, A3-2 is resolved as "no line" for an untitled `earlier:refresh` card, or any moved card can render without a line. Then the intro sentence "A card that moved says so" is false (Q-H1 below).
- Accounts ship and progress is read from the server. Then "Your progress stays in this browser" is false (W-1611 below).
- A subject chip gets the personalised order. Then the chip intro below is false.

---

## 1. Q-H1: the feed intro with the flag on

### Where the current copy lives
- **Copy:** `src/components/Feed.tsx`, function `IntroCard` (about line 240): "We know nothing about you yet, so this feed is not “for you”. It alternates subjects. {count} lessons today."
- **Test:** `tests/qa/feed.spec.ts` line 9 (protected), test "home feed opens honestly and starts": at `/` on a fresh context, the intro contains `not “for you”` (curly quotes).
- I edited neither. Any change to the test goes to evaluation-steward inside W-1585.

### What is false with the flag on, and one thing already false today
1. "It alternates subjects": false in the All feed. I re-ran the EDD probe on frozen v3. At cold start 229 of 230 pilot cards move, same-subject neighbours go from 0 to 2 in the first 60 cards and from 47 to 80 over the whole feed (EDD §3.1 reports the same numbers for v2; v3's empty-history order matches because only the prerequisite term varies).
2. "We know nothing about you yet, so this feed is not “for you”": false in the All feed for a returning device. `IntroCard` renders on every visit and in every filter (`Feed.tsx`, `items` always starts with the intro).
3. **Already false today, flag on or off:** on a subject chip, "It alternates subjects" is false, because a chip has one subject. With the flag off this must stay byte-identical (EDD T10), so it is a separate fix, not part of this flag (board request 4 below).

### Ruling
- The intro text depends on the filter: one text for All, one for a chip. The filter is UI state, not learner data, so this adds no read.
- One text per filter, the same for new and returning devices. The server renders the intro before the device's order exists (G-8), so the text cannot depend on history. Each sentence has to be true in both states.
- The cold-start sentence stays, scoped to a new device. It is true, it keeps the v1 promise in substance (cold start uses no learner data), and it still contains `not “for you”`, so the protected test passes **and** what it checks stays true. I support vp-personalization's proposed restatement of the test's intent for W-1585 ("with no history, the order uses no learner data, and the feed says what its order is"). The copy below meets that intent too.
- Use the chip names learners see ("Probability", "CS", `content/domains.json` `short`), not internal ids.
- No sentence may say or imply a control, a setting, or that the order follows the learner's choices or ability (privacy design read line 33, SS3; G7).

### Proposed text (flag on). Hook paragraph unchanged.

**All feed** (muted paragraph):

> On a new device we know nothing about you, so this feed is not “for you”. It mixes subjects, and in Probability and CS, lessons that build on fewer others come earlier. When you finish Probability or CS lessons, this device moves some new ones earlier or later. A card that moved says so. {count} lessons today.
>
> [How your progress is used] (link to the data text in §5)

**Subject chip** (muted paragraph, every chip including Probability and CS):

> New lessons here come in a fixed order, the same for everyone, so this list is not “for you”. {count} lessons today.

### The sentences as claims (for the second fact-checker and privacy-reviewer)

| # | Sentence | Support (what makes it true) | Source | Flag |
|---|---|---|---|---|
| I1 | On a new device we know nothing about you, so this feed is not “for you”. | Empty history: `rank` uses no learner data; the order is the same on every new device | EDD §3.1; privacy design read finding 4 | Contains "know" (E10's deny-list word). E10 binds `reason-copy.ts`, not the intro, and today's copy already says it. Privacy to confirm |
| I2 | It mixes subjects, | Non-pilot positions keep the round-robin, pilot slots stay where they are (EDD §5.4 step 3). 80 same-subject neighbours across 946 positions | EDD §3.3, §5.4; my probe re-run | "mixes", not "alternates" |
| I3 | and in Probability and CS, lessons that build on fewer others come earlier. | At cold start pilot slots are filled by fewer in-pilot prerequisite concepts first, ties in default order | EDD §3.1; batch 5 §14.1 (vp's own sentence) | **Precision for the fact-checker:** the count is of in-pilot prerequisite *concepts* that have a lesson, not lessons, and the first card is pinned to the server's. "come earlier" (comparative) is deliberate; vp's "come first" is false for card 1 (pinned) and because pilot slots are interleaved with other subjects. With history the rule is not just this, which is why I4 follows |
| I4 | When you finish Probability or CS lessons, this device moves some new ones earlier or later. | v3 reads only `slug` and `completedAt` of pilot lessons (V7); non-pilot slugs are ignored (EDD §5.4 step 1); computed on the device | privacy addendum V6-V7; EDD §5.4 | "finish" names a completion, not a choice. Privacy to read against SS3 ("reflects their choices") |
| I5 | A card that moved says so. | G7: no moved card without its line; S1 test | batch 5 §12 G7 | True only if every moved card renders a line. See §4, A3-2 |
| C1 | New lessons here come in a fixed order, the same for everyone, so this list is not “for you”. | Chips serve the default order (EDD §5.4 "Filters") | EDD §5.4; Q-H2 below | False if Q-H2 changes |

Build note (not mine to do): `IntroCard` needs the filter as a prop. The link opens a sheet or page holding §5's text. Both exist only in the flag-on build (T10). Owner: personalization-engineer in S1, reviewed by platform-engineer.

---

## 2. Q-H2: All feed only, or the Probability and CS chips too?

**Ruling: the All feed only.** I agree with vp-personalization (batch 5 §14.3).

Reasons:
1. **Evidence.** Criterion 3b scored the all-subject order. A single-subject order is unscored, and shipping it would be a feather: an idea that worked in another setting, with no local evidence.
2. **Truth in copy.** A chip's fixed order makes the chip intro (C1) true and simple.
3. **Privacy finding 3 holds.** Chips are **not** an opt-out, and no copy, help text, release note or answer to counsel may present them as one. Choosing a chip is not a learner control over the All feed. The C1 sentence describes the chip's order and offers nothing.

Accepted cost: the same lesson can sit in a different place in All and in its chip. A learner who switches between them may notice. Each intro says what its order is, so the difference is honest.

Revisit if: personalization-eval reports a scored reading of a single-subject order under a frozen criterion. That would be a new product decision, recorded here.

---

## 3. Is the cold-start subject mix acceptable as a product experience?

**Ruling: acceptable, with conditions.** No remedy is needed (so neither HQ-only nor no website release, and never glue code).

Evidence I checked myself this run (EDD probe on v3 `53981ab0…c195`, dims at 4a559d6):
- 229 of 230 pilot cards move. The first card is pinned to the server's (EDD §5.4 step 4).
- Same-subject neighbours: first 60 cards 0 → 2; whole feed 47 → 80 (of 946 positions).
- The first 30 pilot picks are 17 Probability and 13 CS. The first 20 alternate imperfectly (`p,cs,cs,p,cs,cs,cs,p,p,p,p,cs,p,p,p,p,cs,p,p,cs`). In the All feed those 20 are spread over about 130 positions, with other subjects between them.

Reasons:
1. **Where sessions happen, almost nothing changes.** Two same-subject pairs in the first 60 cards is not a different experience.
2. **It is the order my own decision asked for.** In `company/decisions/2026-10-12-feed-is-not-personalised.md` I accepted cm-math's objection that round-robin "may put a stretch lesson second for a beginner", with prerequisite-aware ordering as the answer. Fewer prerequisites first is that answer, for two subjects.
3. **Nothing editorial is lost.** The default order inside a subject is slug order (alphabetical, `default-order-rule.md` step 2), not a curated sequence.
4. **It uses no learner data,** so the trade-off in surface-value.md ("No personalisation at cold start", owned by head-of-product) still holds in substance.

**Finding (new, for W-1585): review lessons move ahead of published ones.** Surface-value line 23 and AMD-008 F1 say "published first, then lessons in review". In v3's empty-history order, the 8 pilot review lessons sit at pilot positions 33, 187-190 and 224-226, against 152 and 223-229 in the default order. `weak-links-hold-it-together` (review) is ahead of 189 published pilot lessons, and it lands at about All-feed position 209. As a product experience I accept this: review lessons are labelled "In review" and the founder keeps them on in production (`src/lib/visibility.ts`; `company/decisions/2026-10-15-founder-show-review.md`). But it changes a protected line, so the W-1585 amendment must say it. It cannot be fixed in glue (G6). Removing review lessons from the pilot dims would be a change to the candidate's input, which personalization-eval and vp-personalization would have to rule on, not me. Measured at cold start only; I did not measure it with history.

Conditions on the "acceptable" ruling:
- The All intro is §1's text, not today's.
- G's record and the release note say that the empty-history state was not scored (batch 5 §14.1 item 3).
- Real-learner notes are read for complaints that the order feels samey or random (the revisit trigger of my 2026-10-12 decision). Privacy finding 1 rules out live counters, so notes are the only signal.

Would be wrong if: same-subject neighbours in the first 60 All-feed cards at cold start rise above 6 (three times today's 2) after a catalogue or dims change; or 3b's G1 top-domain share fails for curious-newcomer, the nearest scored case. Either one brings this back to me before release.

---

## 4. Reason lines L1-L7 and reading risks C1-C3

The questions: are they clear and well made for a 13-year-old reading them on the card? I own the reading level (RC §7). Truth stays with the fact-checker, and the ceiling with privacy. **Every change below needs both to re-read it** (marked ⟲).

### What a 13-year-old meets
Each line has two jobs: where the card went ("moved ahead"), and one related fact. RC's lines do both truthfully. They have three craft problems:
1. **Titles in mid-sentence.** 118 of 231 pilot titles end in `?`, `!` or `.`, and some contain a colon ("At least one boy: both boys?"). RC's L3-L5 would render "You've finished How many people to match my birthday?, which is on the same idea." That cannot be read.
2. **Three words for one relation.** "on the same idea" (L3-L5), "share an idea with" (L6-L7), "build on" (L1-L2). A reader learns two relations more easily than three.
3. **The verb comes late.** L1, L6 and L7 put the verb after a long noun phrase (L6 has 16 words before its verb).

### Ruling: one two-sentence pattern
The first sentence says where the card went (two forms). The second gives one relation (two forms). Titles go last, in curly quotes.

| # | Key | RC proposal | My proposal | Change |
|---|---|---|---|---|
| L1 | earlier:prerequisites | This lesson moved ahead of some lessons that build on other lessons. | This lesson moved ahead of some lessons. Some of them build on other lessons. | ⟲ split |
| L2 | later:prerequisites | Some lessons moved ahead of this one. This one builds on other lessons. | *unchanged* | none |
| L3 | earlier:concept-known (held, RC §4) | This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea. | This lesson moved ahead of some lessons. It shares an idea with a lesson you've finished, “{title}” | ⟲ |
| L4 | later:concept-known | Some lessons moved ahead of this one. You've finished {title}, which is on the same idea. | Some lessons moved ahead of this one. This one shares an idea with a lesson you've finished, “{title}” | ⟲ |
| L5 | earlier:refresh | This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea. | This lesson moved ahead of some lessons. It shares an idea with a lesson you've finished, “{title}” | ⟲ |
| L6 | later:refresh | Some lessons that share an idea with a lesson you've finished moved ahead of this one. | Some lessons moved ahead of this one. Some of them share an idea with a lesson you've finished. | ⟲ split |
| L7 | earlier:passed-known | This lesson moved ahead of some lessons that share an idea with {title}, a lesson you've finished. | This lesson moved ahead of some lessons. Some of them share an idea with a lesson you've finished, “{title}” | ⟲ |

**Rendering rule (product, for the glue and T23).** The title is the learner's own finished lesson, named once (A3-1), set in curly quotes at the end of the line. A period is added after the closing quote only if the title does not already end in `?`, `!` or `.`. The deny-list test in T23 must run over the template, and over a rendered line with a plain title. If it scans the rendered line with real titles, "At least one boy: both boys?" fails V15's colon rule even though no colon joins title and position. That is a test-design point for personalization-engineer, not a request to loosen V15.

**Why each change keeps truth and the ceiling (my reading; the fact-checker and privacy decide):**
- **L1, L6, L7 "Some of them ..."** asserts the same as RC's restrictive clause: at least one of the passed (or passing) lessons has the relation. One thing for the fact-checker: "some of them" can suggest "not all of them". That is an implicature, not part of the literal claim, and I accept it as a reading cost. If the fact-checker counts it as a claim, keep RC's L1 and L6 and take only the title change for L7. "Them" refers to "some lessons", never to all lessons on the feed. RC rejected "they" for the same reason.
- **L3-L5 "It/This one shares an idea with a lesson you've finished, “{title}”"** says what RC's "{title}, which is on the same idea" says: the title is a finished lesson on this card's concept (`finishedOnConcept`). It also avoids "the same idea as", which hits the V15 token "as". No cause or sequence word, "finished" only (V14), one title (A3-1).
- **L7** keeps "a lesson you've finished" as the appositive (A3-3), and "share an idea with" is unchanged.
- **L1, L2**: the lesson is the subject, and there is no you, need, not yet or unfinished (V12, V3b).
- No count, no concept slot, no time word, no absolute position (V1, V4, V14).

### Reading risks
- **C1 (L4 and L5: same second sentence, opposite directions). Accepted, with the risk named.** A reader can see "shares an idea with a lesson you've finished" on one card that moved ahead and on another that moved back. The fact that tells them apart (how long ago) is forbidden by V14, and dropping the sentence leaves a line with no reason, which G7 forbids. Both lines are true, and F7 found 0 cases where one title is named in both directions (RC §4, N6). My pattern does not remove C1. It makes the second sentence a plain fact about the lesson rather than about the learner, which lowers the pull to read it as praise or blame.
- **C2 (L6 against L7). Accepted.** Under my pattern they differ in direction and in whether a title appears. L7 is rare (450 cards in RC's 1,500 histories, 18 in F7).
- **C3 (cause read into placement). Accepted.** Under the B3 ruling, the fact contributes to the move on at least one pair for every card (RC §6), so the inferred "partly why" is true. V15 stops the words from claiming more. I would not accept a line whose implied cause was false.
- **C4 (new): the lines become wallpaper at cold start.** On a new device nearly every Probability and CS card carries L1 or L2, about 229 cards. That is honest, but a line repeated that often stops being read. Product ruling: the line is small and muted, sits under the card's title, and is never truncated. A cut-off line ("This lesson moved ahead of some lessons.") is a position with no reason. QA checks fit at 390×844 under `company/product/demo-standard.md`. I am not asking for the lines to be hidden at cold start: hiding them would be glue deciding which moved cards explain themselves, and I5 would become false.
- **A3-2 (untitled `earlier:refresh`, RC's R1, never observed).** Product preference: show L5's first sentence alone ("This lesson moved ahead of some lessons."), not nothing, so that I5 stays true. vp-personalization rules whether that meets G7. If the answer is "no line", I5 must change before release.

---

## 5. W-1611: the data-page sentence and the release-note residual

### Where it lives
**There is no data page today.** I found no learner-facing privacy text in `src/app` or `src/components`, and the trust sheet in `DemoCard.tsx` is about one lesson's claims. Ruling: the text below must be reachable from the All intro (the "How your progress is used" link in §1) before the flag is turned on. It ships in the flag-on build only. It would be false with the flag off, and T10 requires the flag-off build to be byte-identical. Build owner: personalization-engineer (S1), with platform-engineer review. Privacy-reviewer reads the rendered text (finding 2).

### Proposed data text (W-1611)
> Your progress (which lessons you've finished, and when) stays in this browser, on this device. On the All feed, this device uses it to move some Probability and CS lessons earlier or later. Everyone's feed works this way, and there is no setting for it. Nothing new is sent or saved to do it.

| # | Sentence | Support | Source | Flag |
|---|---|---|---|---|
| D1 | Your progress (which lessons you've finished, and when) stays in this browser, on this device. | D1 `s3c:progress:v1` is local; accounts are not wired here | privacy design read Q-P2 (accounts branch not here) | **Partly false today and needs privacy's word:** the record also holds predictions and recalls, which revisits use. Say "Your progress" without the parenthesis if privacy wants the sentence to describe the whole record. False once accounts read a server row |
| D2 | On the All feed, this device uses it to move some Probability and CS lessons earlier or later. | Computed on the device from `slug` and `completedAt` (V7); All feed only (Q-H2) | EDD §5.4; privacy V7 | Satisfies finding 2 ("kept on the device and reorders the feed") |
| D3 | Everyone's feed works this way, and there is no setting for it. | Always on, no switch (founder 2026-10-17) | founder decision | States that there is no switch, so it cannot imply one (W-1611). It is not a promise either: if counsel requires a control, this sentence changes with the release. Does not mention `personalization_on` (E7) |
| D4 | Nothing new is sent or saved to do it. | No new field, write or fetch; request shapes frozen (E4); no stored derived value (D20) | privacy design read summary, E4 | "to do it" scopes the claim to the computation. I deliberately do not say "nothing about the order leaves your device", because of the residual below |

Optional, for privacy-reviewer to accept or cut (I lean towards including it, because "it says so" is the product's habit): *"As before, each lesson you open is loaded from our web host, and the host's logs record those requests."* It is true with the flag off too, so it could go on a future site-wide data page instead.

### Release-note residual (E14), proposed wording
> **What the host can see.** Each lesson is loaded from our host (Vercel) when a learner reaches it, as it is today. With the new order on, the sequence of those loads follows the device's order. So someone who can read the host's request logs could work out part of the order one device was shown, and from the order, something about which Probability and CS lessons that device had finished. We send nothing extra for the order, add nothing to any request, and do not join the host's logs to our event records (privacy E4, E5). privacy-reviewer rated this residual low and already present in kind (`company/reviews/_privacy/2026-10-17-edd-010-design-read.md`, Q-P2).

Flag for privacy-reviewer: the clause "and from the order, something about which ... lessons that device had finished" is my inference, not privacy's words. It follows from the order being computed from completions, and it says why the residual matters. Privacy-reviewer may cut it. The rest of E14 (ordering on the device; nothing stored or sent for it; live effect unmeasured; learners cannot switch it off), the unscored cold start (§3) and the review-lesson finding (§3) also go in the release note. vp-personalization assembles the note (MR line 14). This paragraph is my part of it.

---

## 6. W-1577's original parts, read against always-on
W-1577 was written for the opt-in: switch off = default order, a rule-list record for `reachable-v1`, and where the opt-in sits. Under the founder's "always on, no switch": "where the opt-in sits" no longer applies; "switch off = default order" becomes "flag off = today's feed byte for byte" (EDD T10, batch 5 §12 MR line 13), which I check when the test exists; the rule-list record is owed for **reachable-v3**, not v1. I have not done that check or written that record in this run. Both stay open on W-1577.

## 7. Objections (they travel with these rulings)
| Objection | Raised by | Answer |
|---|---|---|
| O-S1: the cold-start order is a consequence nobody chose | personalization-engineer (EDD §11) | vp-personalization chose it (batch 5 §14.1). As owner of the default order, I accept it as a product experience (§3), on the evidence and with the conditions there. **Closed for product.** It stays in W-1585, which must record it, and the review-lesson finding is added |
| Chips may be read as a way out | privacy-reviewer (finding 3) | **Accepted.** No copy presents a chip as an opt-out (§2), and C1 offers nothing |
| C1-C3 reading risks | fact-checker (RC §4) | **Accepted as risks, with the reasons in §4.** Each line stays true, and no wording within V14/V15 removes C1 |
| A personalised chip order would teach better than alphabetical | (my own, raised against my ruling) | **Declined for now.** There is no local evidence (feather). Revisit if 3b-style evidence appears (§2) |
| Lines on ~229 cards at cold start become noise | (my own, C4) | **Accepted as a cost.** Muted, untruncated, under the title. Not hidden (§4) |

My 2026-10-12 decision record ("The feed is honest at cold start: round-robin, not 'for you'") is superseded for the All feed if and when W-1585 is ratified. I will mark it then and not before, because until ratification it describes the product that ships.

## 8. Next moves and owners (board requests; the chief of staff files them, I edit no board.json in this run)
1. **Second fact-checker (W-1579 line):** truth of I1-I5, C1, D1-D4 and the ⟲ lines in §4, including the "some of them" implicature and I3's precision.
2. **privacy-reviewer (W-1586):** ceiling read of the ⟲ lines, I1 ("know"), I4 (SS3), D1-D4, the optional host sentence, and the release-note clause.
3. **evaluation-steward (W-1585):** record that cold-start review lessons move ahead of published ones (§3), alongside O-S1 and the test-intent restatement. My copy keeps `not “for you”` true at cold start.
4. **head-of-product + platform-engineer (new, flag-independent):** today's chip intro says "It alternates subjects" on a single-subject chip. Fix it in the flag-off copy as its own change (C1's wording, without the flag).
5. **personalization-engineer (S1, EDD §12):** `IntroCard` takes the filter; the "How your progress is used" link and data text exist in the flag-on build only; reason-line rendering rule (quoted title last, no double punctuation, never truncated); the T23 deny-list scans the template, not real titles.
6. **vp-personalization:** A3-2 choice (§4); fold §5's residual paragraph into the release note.
7. **head-of-product (me, W-1577):** the T10 check when the test exists; the rule-list record for reachable-v3.
