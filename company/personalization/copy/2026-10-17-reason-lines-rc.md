# RC: reason-line candidates for reachable-v3's seven move keys (W-1579, W-1605, W-1616)

owner: fact-checker (Ingrid), run fc-rc-v3-1017 · date: 2026-10-17 · asked by vp-personalization through the chief of staff (board W-1579, W-1605, W-1616)
artifact: company/personalization/policies/reachable-v3.ts, sha256 53981ab02a240900a5fa2c9c1d62a1e0c49a9add07a3a35c26656f0a8e01c195 (checked this run), branch ccr-3744965a-rfmufj at 6dad106
status: **PROPOSALS, not verified copy.** I wrote these lines, so I may not verify them (fact-checker onboarding, "may not verify a claim you wrote"). Each line is set out as a claim (address, support, source) so that a **second fact-checker** can check it, and head-of-product can read it with the intro copy (W-1602). Nothing here goes in `reason-copy.ts` until both have done that. No code, candidate, EDD, test or criterion was edited.

Read: F7 evidence `company/personalization/evidence/2026-10-17-reachable-v3-reason-truth.md` (§2, §4, §5, §6 N1-N9, §8); privacy design read `company/reviews/_privacy/2026-10-17-edd-010-design-read.md` (Q-P5, E10); privacy v3 addendum and addendum 2 `company/reviews/_privacy/2026-10-17-edd-010-v3-addendum.md` (V1-V15, V3b); batch 5 §12 G7 and §15-§17 (`company/personalization/batches/2026-10-17-batch-5.md`); EDD-010 §12 (`company/engineering/edd/EDD-010-personalised-new-lesson-order.md`, A1 C7f, A2 E10); F6 `company/personalization/evidence/2026-10-17-edd010-reason-rule-truth.md` (B3 and §1 method); `reachable-v3.ts` `estimate`, `rankRows`, `pairCodes`, `moves` (lines 201-370, 430-556).

## 1. The rules every line follows

From the sources above, applied to every key:

- **Strength:** "some lessons" forms only (F7 §8: some-contributing is the only strength true for every card of every key; all-* fails). No absolute position ("earlier than usual", "top", "Nth"): batch 5 §16.1, V4.
- **Ceiling:** completion facts (class a/b) and catalogue relations (class c) only (Q-P5). No number, no quantity word, nothing about knowing or ability, no time gap, no control or choice (E10, V3, V4, SS3).
- **Slots:** `{ key, title?, count?, concept? }` only (E10, V1). `concept` stays empty until Q-A3 has checked names (batch 5 §16.3), so no line below uses it. No line uses `count`.
- **Per key:** prerequisites, both directions: the lesson is the subject; no you/your/need/should/must/not yet/unfinished/"before you can"/imperative; no claim about whether the learner did the prerequisites (V12, V3b). later:refresh: `{ key }` only, no title (V13). Refresh: "finished" only, no time words (V14). concept-known and refresh: no cause or sequence connective (because, since, so, as, after, once, thanks to, based on, due to, that's why, which is why, reason, why), no colon or arrow joining title and position (V15).
- **Wording choice on "ideas you have finished".** Privacy addendum 2 ("What I did not decide") warns that a finished lesson on an idea is not the idea being finished. Truth for F7's shapes needs only "at least one finished lesson on that concept" (F7 §2, passed-known L; §4 later:refresh). Every pilot concept with more than one lesson has exactly two (7 concepts, my probe below), so "an idea you have finished" can be false when one of two was done. The lines below say "share an idea with a lesson you've finished", which states only what is proven. "as" is a V15 token, so "the same idea as ..." is avoided in the refresh and concept-known lines.
- **Direction:** the glue takes direction from `moves`, never from the display slot (F7 N4: 27 deep-pin cards in B2 sit behind their default slot while `moves` says earlier; their "some lessons" lines stay true because every frame pair is a display pair, F7 §5).

## 2. The seven lines (proposals)

`{title}` is a lesson title looked up by slug from the named facts field (E10). "This lesson" is the card the line sits on.

| # | Address (key) | Slots | Proposed line |
|---|---|---|---|
| L1 | `earlier:prerequisites` | `{ key }` | This lesson moved ahead of some lessons that build on other lessons. |
| L2 | `later:prerequisites` | `{ key }` | Some lessons moved ahead of this one. This one builds on other lessons. |
| L3 | `earlier:concept-known` | `{ key, title }`, title from `finishedOnConcept` | This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea. |
| L4 | `later:concept-known` | `{ key, title }`, title from `finishedOnConcept` | Some lessons moved ahead of this one. You've finished {title}, which is on the same idea. |
| L5 | `earlier:refresh` | `{ key, title }`, title from `finishedOnConcept` | This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea. |
| L6 | `later:refresh` | `{ key }` only (V13) | Some lessons that share an idea with a lesson you've finished moved ahead of this one. |
| L7 | `earlier:passed-known` | `{ key, title }`, title from `finishedOnPassedConcepts` | This lesson moved ahead of some lessons that share an idea with {title}, a lesson you've finished. |

When `finishedOnConcept` or `finishedOnPassedConcepts` has more than one slug, the glue names the first (the field's own order, first completion). Any member is true (support below); naming more than one is not proposed.

## 3. Each line as a claim: support and source

Strengths are F7's (§2): some-con = the line's term closes a positive part of the gap against at least one passed pair; lit = the shape's literal fact true on that same pair; cf = removing the fact's state flips at least one pair. "By construction" cites the line of `reachable-v3.ts` that forces it.

**L1 earlier:prerequisites.** Asserts: among the lessons still ahead that this card passed, at least one has prerequisite lessons in the catalogue. Support: F7 §4 "alternative shapes", "moved ahead of some lessons that build on other lessons first": literal plus some-con on the same pair, 35,310 of 35,310 RAND cards and every named probe; F7's argument: a passed card whose prerequisite term favours x has prereqFactor below 1, which needs a prerequisite concept with a lesson in dims (`reachable-v3.ts` 236 and 350: a prerequisite concept with no lesson in dims has pKnown 1, so no penalty). Not asserted: that this lesson has fewer prerequisites (V3b; F7 N2 shows that form false for 245 RAND cards). I dropped F7's "first" (it reads as an order to the learner, V12's concern) and the line still states the catalogue relation. Source: F7 §4, §6 table; privacy addendum 2 "N2 earlier: allowed".

**L2 later:prerequisites.** Asserts: some lessons passed this one; this one has prerequisite lessons in the catalogue. Support: F7 §4, `facts.prerequisiteLessons` non-empty for 40,245 of 40,245 RAND cards and every probe; by F7's same argument, for this card to lose on the prerequisite term its own factor is below 1, which needs a prerequisite with a lesson in dims. Source: F7 §4, §6 table; privacy addendum 2 V12.

**L3 earlier:concept-known.** Asserts: a passed card exists ("some lessons"); the named title is a lesson the learner finished on this card's concept. Support: **no observation.** F7 found 0 cards with this key in 411 histories (§4), and my own probe found 0 in 4,500 more (§5). Literal truth is by construction: the code needs `movedHasState` (`pairCodes`, line 475), own concept state exists only after a finished lesson on that concept (`estimate`, the completions loop; `rankRows` line 356), and `finishedOnConcept` is the finished lessons on that concept (line 515). some-con is by construction (F7 N7). cf: unknown. Source: reachable-v3.ts; F7 §4 ("never occurred"). See §4 for the missing proof.

**L4 later:concept-known.** Support: F7 §4 later:concept-known, lit with some-con 551 of 551 RAND and every probe (P2, P3, G1, G1b, PRG, P5, B2, B2'); literal by construction as for L3. cf fails for 15 of 551 (F7 N3): the finished lesson is a contributing term but not on its own enough to move the card, which is why V15 forbids a cause word and the line only places the title beside the position. Source: F7 §4, N3; privacy addendum 2 V15.

**L5 earlier:refresh.** Support: F7 §4, lit with some-con 995 of 995 RAND, PR 7/7, PRG 4/4; cf 962 of 995 (N3). **Not by construction** (see §4 residual R1): a card with no own concept state can in principle carry the refresh code, and then `finishedOnConcept` is empty and the line has no true title. 0 such cards in F7 or in my 4,500 histories. Source: F7 §4, N3; reachable-v3.ts 331-358.

**L6 later:refresh.** Asserts: at least one lesson that passed this card is on a concept where the learner has a finished lesson. Support: F7 §4 alternative shape for later:refresh: a passing card has its own concept state and its refresh term favours it, 281 of 281 RAND, 3 of 3 PR/PRG; removing that state flips the pair for every card. Own concept state exists only after a finished lesson on that concept (as in L3), so "shares an idea with a lesson you've finished" is the state, said as a completion. No title, because v3 has no list of finished lessons on the passing cards' ideas, and `finishedOnConcept` (the card's own idea) is empty or wrong for 276 of 281 (F7 N1; V13). Source: F7 §4, N1; privacy addendum 2 "N1 later:refresh: allowed with V13, V14".

**L7 earlier:passed-known.** Asserts: this card passed at least one lesson on the named title's concept, and the learner finished the title. Support: F7 §4: lit with some-con, 18 of 18 cards over all probes and RAND; 62 of 62 named titles true; cf for every card (N5). By construction `finishedOnPassedConcepts` holds finished lessons on the concepts of passed cards for which passed-known is eligible (lines 535-541). Source: F7 §4, N5; privacy addendum Q1, V1, V4.

## 4. Blocking, held, residuals

**Blocking keys: none**, at the strength F7 proved and inside V1-V5, V3b, V12-V15, on the evidence above. Two qualifications:

- **L3 earlier:concept-known: held, not blocking.** I can write it so that it is literally true and contributing wherever the key fires (by construction, §3). What is missing: (a) **one observed card**: a constructed or found history in which `moves` gives `earlier:concept-known`, with the literal, some-con and cf checks of F7 §2 run on it, by someone other than me; or (b) **a proof that the key cannot fire.** On the sign of the q swap, it can fire only where swapping q to the passed card's q closes the gap, i.e. (q_x − q_y)(refresh_x − newGain·prereqFactor_x) > 0 with x having own state. Every pilot concept with more than one lesson has two, so x has state only when its one sibling is finished; then q_x is high and the earlier case needs refresh_x above x's new-lesson gain, or a passed y with even higher q. I did not decide whether either is reachable. Until (a) or (b), the line is unexercised copy. If (b) is proven, T6/C7f still needs a line for the key (seven keys, V1), and L3 serves.
- **R1 (earlier:refresh, residual, not blocking).** Refresh can be a contributing code for a card with **no** own state: such a card has `refresh = refreshPrior > 0` (`reachable-v3.ts` 358), and a passed card finished today has refresh 0 (line 355 at age 0), so the refresh swap can favour the stateless card. If refresh then wins the decisive count (it is ahead of passed-known in CODE_ORDER, line 484), the card is `earlier:refresh` with an empty `finishedOnConcept`, and L5 has no true title. 0 cases in F7's 411 histories and in my 4,500 (including 1,500 with every completion at age under a day). Ask (personalization-engineer, EDD-010 §12 T6/T23): a test that fails if an `earlier:refresh` move ever arrives with an empty `finishedOnConcept`, so the glue never renders L5 without a title, and never fills it from another field. If such a case is ever found, L7's shape (the passed card's idea) may be the true one, and that is a question for F-level truth and privacy, not for the glue.

Coherence risks (not truth failures; for head-of-product, W-1602, and the second fact-check):
- **C1.** L4 and L5 are the same second sentence in opposite directions (batch 5 §15.1 "known residual"). Each is true per card (the title is the state behind a term that contributes to that card's move), and F7 found 0 cases of one finished lesson named in both senses (§5, N6). A learner who sees both may still read "finished a lesson on this idea" as pushing one card later and another earlier. Nothing within V14 can name the time gap that tells them apart.
- **C2.** L6 and L7 say opposite things about lessons that share an idea with a finished lesson (moved forward in L6, passed in L7). Both are true per card (refresh term vs q term). F7's juxtaposition count is by named title, and L6 names none, so this pairing was not counted.
- **C3.** L4/L5 place the title beside the position, and a reader will infer some cause. That inference is partly true: the term contributes on at least one pair for every card, and cf fails for 33 of 995 (L5) and 15 of 551 (L4). That is the standard I rule acceptable in §6, and V15 stops the line from claiming more.

## 5. My own probe (re-run, not a new truth test)

To check the counts I rely on, not to replace F7. Inputs: dims at 4a559d6 (`git show 4a559d6:src/lib/learner/dims-index.generated.ts`), pilot entries built as EDD-010-probe.mts builds them; frozen v3 copied byte-for-byte (sha256 checked). `moves` and `internals.rows` only. Scripts in the session scratchpad (`rc/rc.mts`, `rc/ck.mts`), not in the repository.

- Run A (seed 7, 1,500 histories; each two-lesson concept finished at one random lesson with p 0.6 plus 0-39 random lessons; ages mixed 0-89 days, all under 0.5 day, or all 60-200 days, in thirds): earlier:prerequisites 143,905, later:prerequisites 158,373 (prerequisiteLessons non-empty 158,373), earlier:refresh 3,460 (own title 3,460), later:refresh 748 (all stateless themselves; a passing card with state whose refresh swap closes a positive part found for 748, checked by rank position only, so looser than F7's D'/R' pair test), later:concept-known 2,764 (own title 2,764), earlier:passed-known 450 (titles non-empty 450), earlier:concept-known 0.
- Run B (seed 11, 3,000 histories; ages from {0, 0.5, 1, 3, 10, 30, 60, 120, 365, 1000} days; 0-79 extra lessons; half with a random `shown` prefix up to 60): earlier:refresh 5,191 with an empty `finishedOnConcept` 0; concept-known with an empty `finishedOnConcept` 0; earlier:concept-known 0; 7 concepts with two lessons, none with more.

This agrees with F7 on every count it touches. It does not test L1's literal on the D'/R' pair set as F7 did, and it does not test cf.

## 6. Ruling on F6 B3, for the record

**Question (batch 5 §15.4 item 2; F6 B3).** Is a true fact, placed in a reason slot when it is not the cause of the move, acceptable reason copy?

**Ruling: no.** I agree with vp-personalization's position under G7.

Reason. A line placed on a moved card in the place where the learner reads why it is there makes a claim the words do not spell out: "this is part of why". That is the "different claim the stage actually makes", which this role must check (fact-checker onboarding, failure modes). F6's B3 fact ("you've finished N lessons in this subject") was true for every card but was just as true for cards moved the other way, and the term that moved the card was prediction results, which nothing in the line names. So the claim the placement makes was false, even though the sentence was true. G7 requires a *true reason line* (batch 5 §12), and a true sentence in a reason slot is not that.

The test I apply, and the one a second fact-checker should apply to L1-L7: **a fact may sit in a reason line only if it is the state behind a term that the pair test shows contributing to this card's move against at least one card it passed or that passed it (F7 some-con, with the literal fact on the same pair), and the words claim nothing stronger than that.** "Some lessons" keeps the claim at some-con. V15 keeps juxtaposition lines from claiming the fact was enough on its own (cf).

What this means for v3:
- B3 itself is moot in v3: the `domain-estimate` code is gone (batch 5 §15.1 (ii)).
- L1, L2, L4, L5 (when it has a title), L6 and L7 meet the test on F7's evidence (§3).
- The own-title line for later:refresh would **fail** the test (F7 N1: the card's own finished lesson is not the state behind the term that moved it, cf 0). That is why L6 names the passing lessons' idea and no title. It is the same conclusion as privacy's V13, reached on truth rather than on privacy.
- F6's §16.2 option (a), "you finished no lesson on this idea", fails it for the same reason (batch 5 §16.2 already refused it).

Confidence: high on the ruling as a standard. Medium on how a 13-year-old reads juxtaposition (C1-C3): that is a reading question for head-of-product, not a truth one.

## 7. Plainness (asked; not a pedagogy ruling)

Every line is one or two short sentences, uses no term from the model (no "prerequisite", "concept", "refresh", "estimate"), and says "idea" for concept and "builds on" for the catalogue relation. The weakest are L1 and L6 (a noun phrase with a clause inside it). Simpler versions I tried were false ("lessons on ideas you have finished" overclaims; "each" or "they" read as every lesson that moved) or hit a V15 token ("the same idea as"). Head-of-product owns the final reading level (W-1602).

## 8. Next moves and owners

1. **Second fact-checker (not this run):** check L1-L7 against F7 and this record; set them verified or disputed. Run L3's missing proof (§4 (a) or (b)).
2. **head-of-product (W-1602):** read L1-L7 with the intro copy; C1-C3 are the reading risks.
3. **personalization-engineer (W-1615 follow-up, EDD-010 §12):** R1's test (no `earlier:refresh` line without an own title); per-key slot map from V13 with L6 at `{ key }`; T23 deny-list as in V12-V15 run against L1-L7 (L1-L7 were written to pass it; the test is the proof); EDD C7f still says "six keys", privacy V1 says seven.
4. **privacy-reviewer:** L6's words ("share an idea with a lesson you've finished") and L7's ("share an idea with {title}, a lesson you've finished") differ from the shapes ruled ("on ideas you have finished"); I believe they are narrower, and they need privacy's read.
5. **vp-personalization:** B3 ruling recorded (§6); no key blocks on this evidence; L3 is held pending proof.
