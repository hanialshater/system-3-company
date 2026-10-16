# DRAFT FOR THE FOUNDER: ads policy, house cards only at launch

owner: vp-marketing (Celeste) · date: 2026-10-16 · class: policy draft (the founder decides; nothing here is in force)
status: **DRAFT. Not ratified, not applied, nothing built, bought, registered or posted.**
asked by: founder, 2026-10-16 (F-43): "I want to reach milestone deploy so I can start personalization or ads." Fast path §5, item 6 (company/initiatives/first-light/2026-10-16-fast-path-to-release.md, 15c7acc)
board: W-1126 (F-17 to F-20 packet), W-916 (domain shortlist, appended at the end) · project: `[project:first-light]`
route: vp-marketing (this draft) → head-of-product (product rules, label wording, the "no ads" promise) → privacy-reviewer (W-892, §4 here) → analytics-steward (W-894, §5 here) → evaluation-steward (where this overlaps AMD-008 part A) → founder (F-17, F-18, F-19, F-20, F-44)
sources: company/marketing/2026-10-15-monetization-ads-proposal.md; company/marketing/2026-10-16-founder-ads-packet.md; Ruling 3 in company/decisions/2026-10-15-first-light-release-1-scope.md; company/decisions/2026-10-15-founder-first-light-ads-social-back.md; AMD-008 part A (company/constitution/amendments/AMD-008-first-light-surface-value.md, proposed); privacy gate P2.3, P5, §6 (company/initiatives/first-light/privacy-gate.md); company/decisions/2026-10-15-founder-f01-accounts.md (13+, teen mode 13 to 15)

## Read this first

- **This is a draft.** Where it repeats a rule that already exists (Ruling 3, AMD-008 A1 to A10, privacy gate P5), the existing record wins. Where this draft is stricter, it is a proposal, and the owner of that rule decides.
- **Timing depends on F-44.** The fast path proposes moving the ad slot to **after** the accounts milestone (cut C2). Your 10-15 word put it back into release 1. F-44 asks you to choose. Either way this policy is the same. Only the date changes.
- **At launch the slot earns $0.** House cards are our own messages. Nobody pays for them. The slot is a test that the card does no harm, built to your rules, before any money is involved.
- **No outcome, user count or revenue figure appears here as fact.** None exists. We have 0 measured real-learner outcomes before EXP-002.

## 1. What an ad card may and may not be

### At launch (stage 1): house cards only

A **house card** is a full-height feed card made by us, about us, that pays nobody and links nowhere outside our own site. It may be one of exactly three kinds:

| Kind | Example shape (wording not final) | Condition |
|---|---|---|
| **A published lesson** | "From the same shelf: [lesson title]" | The lesson is **published** and **every claim in its `meta.json` is verified**. A lesson in review is never featured (my own rule: I may not feature a lesson whose claims are not all verified). The category manager confirms before the card goes in the list |
| **A published category** | "[Category] is open: [n] lessons" | The category is live. The number is a claim and is recorded |
| **How we work** | "Every fact in a lesson has a source. Tap 'claims' to see it." | Every factual sentence is in company/marketing/claims.md and checked by the fact-checker. I do not mark my own copy verified |

Every sentence on a house card is a claim (AMD-008 X2): it has an address, a source, and the fact-checker's verdict before it ships.

### A house card may not

1. **Pretend to be a lesson.** No prediction buttons, no "claims checked" mark, no reveal, nothing that imitates the lesson card (AMD-008 A3).
2. **Claim an outcome.** No "smarter", "remember more", "master", "learn faster", or anything that says or implies a learning result. None is measured.
3. **Use engagement framing or a dark pattern.** No streaks, no "don't stop now", no "you're on a roll", no guilt, no countdown, no fake scarcity ("only today", "limited"), no "new" unless it is a dated, recorded claim.
4. **Ask for anything.** No sign-up prompt, no share or invite prompt, no donation ask, no email ask. Those are in-product growth flows and belong to the growth-designer, under their own review. A house card informs and points to one of our own pages, nothing more.
5. **Link outside our origin.** No outbound link, no affiliate link, no tracking parameter (privacy gate P5.5: release 1 has no outbound links at all).
6. **Say "no ads".** Once a card labelled as an ad slot sits in the feed, "no ads" is at best arguable. See open question Q3.
7. **Be chosen by tap rate.** Which lesson or category a house card features is set by a rule written down in advance (§2.4), never by which card gets more taps. Otherwise the house card becomes a hidden ranking, which AMD-008 A8 and X1 forbid.

### Not at launch, and not in this policy

- **Third-party ads of any kind**: no network, including "non-personalised" modes, no pixel, no tag, no script (privacy ruling 6.1, AMD-008 A9).
- **Paid first-party cards** (stage 2), sponsored lessons (W-895, parked) and affiliate links (refused for release 1 in privacy ruling 6.1).
- **Personalised or behavioural ads**: refused for every learner, permanently while children may be present (A7, privacy ruling 6.1).

### Content barred at every stage, including later paid stages

Gambling, alcohol, tobacco and vaping, dating, weight loss and diet products, crypto and trading, political and issue advertising, and anything that sells the answer to the lesson before it (privacy gate P5.6 list, plus tobacco and trading, which I add). A human reviews every creative before it enters the list, house cards included.

## 2. Placement and frequency in the feed

These restate Ruling 3 and AMD-008 A1, A2, A4 and A6, and add three proposals of mine (marked **new**).

1. **Between lessons only.** After the learner has moved past a whole lesson (finished or swiped on). Never inside a lesson, never between a prediction and its reveal, never inside a multi-card sequence. `src/kit/Lesson.tsx` stays ad-free.
2. **Never on a lesson page.** No card on `/l/<slug>` or `/d/<slug>`, at any stage. A learner who opens a shared link sees the lesson and nothing else.
3. **Never first, never next to a due revisit.** No card is the first card of a session, and none sits directly before or after a due revisit.
4. **Cap: at most 1 card per 6 lessons, and it is a ceiling.** In any 7 consecutive cards, at most 1 is a house card. The registered experiment may lower the rate. Raising it needs a new head-of-product decision, an amendment and a founder item. Revenue is never the reason.
5. **New: the earliest slot is after the 6th lesson of a session.** A short session (5 lessons or fewer) sees no house card at all.
6. **New: no two house cards in a row of the same kind**, and never the same card twice in one session. Repetition is an engagement tactic, not information.
7. **New: what it features is chosen by a fixed rule, not by the learner or its performance.** Proposed rule, for head-of-product: a featured lesson or category comes from the **subject of the lesson before the card** (contextual, A7), rotating evenly through the eligible published, all-claims-verified items. Same preceding lesson, same candidate set, for every learner.
8. **Lesson order does not move.** With the slot removed, the lesson sequence equals the slot-off feed, card for card (A8).
9. **Static, and swipeable at once.** Text and one still image. No video, animation, sound, autoplay, countdown or "skip in 5 s" (A3, A5).
10. **One kill switch.** One flag turns the slot off and restores the slot-off feed exactly (A10).

## 3. Labelling

- **The label is on the card, top, readable, and the same on every house card.** It passes the quality bar's contrast rule (Q2.5).
- **Proposed wording, for head-of-product (owns the final wording under W-891) and design-lead (owns how it looks):** **"From us · not a lesson"**. My reasons: it is true (we made it, it is not a lesson), it does not call an unpaid card an "ad" (which would be odd), and it does not hide that this is a promotional slot.
- **When paid cards ever arrive, the label changes to "Ad"** for paid cards, and stays "From us · not a lesson" for house cards. The two must never look alike. A paid card is never labelled "From us".
- **The label is not a claim in the lesson sense, but it is a sentence a learner sees,** so it goes into company/marketing/claims.md with its support (this policy and the build).

## 4. Child safety and privacy limits

The privacy reviewer owns every call in this section (W-892). This draft sets a floor. Their ruling is stricter where it differs, and wins (AMD-008 objection 7). What is already ruled, conditionally, for release 1 (privacy gate §6.1, P5):

- **No tracking for ads, for anyone.** The ad path sets no cookie and no storage key, makes no request outside our own origin, loads no third-party script and no iframe (P5.1, P5.2). Allow-list for the host page: our own origin, our own image path, our own event API.
- **Selection uses no learner data** (P5.3, A7). Not history, not account, not age band, not device, not location finer than country. Two learners with different histories and the same preceding lesson see the same candidate set.
- **No ad measurement that identifies a learner** (P5.4). Impressions and taps are aggregate counters per creative per day, keyed by creative id only. No per-session or per-learner ad log, and the beacon gains no ad field tied to lesson history.
- **The experiment** may use only a random per-tab session id held in memory, never stored, never sent with account data, gone when the tab closes (privacy gate §7.2 item 4). Anything longer-lived is a new review.
- **Under 13** (anonymous only, F-01/F-24) and **teen mode, 13 to 15**: house cards only, at every stage, forever under this policy (Ruling 3 rule 9, P2.3). Because house cards use no learner data at all, every age sees the same card: no age-based targeting exists to get wrong.
- **No consent banner** is needed for house cards, on the privacy reviewer's reading (§6.2 option A), **provided** P5.1, P5.2 and P7.1 pass on the release SHA. **A lawyer confirms** (F-25). One added cookie, storage key or third-party origin re-opens the question.
- **COPPA and GDPR-K (GDPR Art. 8), and the UK Age Appropriate Design Code:** my understanding, which is not legal advice: a first-party card with no identifier and no profiling avoids the behavioural-advertising consent problems these rules raise for children. That is for the privacy reviewer and counsel to confirm, not for me to assert. If counsel reads Art. 8 strictly and the age floor becomes 16 (F-01 fallback), nothing in this policy changes.
- **Global Privacy Control and Do Not Track:** when sent, the beacon is not sent (P6.4). The house card still shows, because it uses no data.

## 5. The success measure, fixed in advance

**Status: proposed by me, not yet fixed.** The analytics steward owns every definition, the sample and the period (W-894, backlog). Nothing here counts until it is written in a registered EXP file **before any data exists**. Until then, the answer to "did the slot work?" is "no data".

What I propose the steward registers (from the 10-15 proposal and Ruling 3 rule 10):

- **The question is whether the slot does no harm, not whether people tap it.** House cards earn nothing, so the only thing to learn at stage 1 is the cost to learning-proxy outcomes.
- **Arms:** no card (allowed to win) versus house card at 1 per 6. A lower rate counts only if it is its own registered arm.
- **Primary measure:** prediction → reveal completion on the lesson right after the slot position, compared with the same position in the no-card arm.
- **Guardrails (the `would_be_wrong_if` lines in Ruling 3):** next-lesson completion falls by 3 points or more; end-of-session right after the card rises by 5 points or more; first spaced-revisit recall falls by 3 points or more. Any one fires → the slot switches off and returns only through a new decision.
- **Not success measures:** house-card taps, dwell and click-through. They are reported, labelled as engagement (AMD-008 X1), and never used to pick which card shows or to set the rate.
- **Baseline:** the steward's stage-0 baseline, measured from launch (fast path §5; scope Ruling 3, objection 4), so the experiment has something to compare against even if the slot starts after the milestone.
- **Checks before reading:** sample ratio, logging changes, novelty effect (steward's list).

## 6. What would have to be true before any paid or third-party ad

Every line is a gate. None of them is met today.

**Before any paid first-party card (stage 2):**
1. Stage 1 ran its registered experiment to the steward's sample, and **every guardrail held**.
2. You said yes to stage 2 as its **own** F-17 item (the packet recommends stages 0 and 1 only).
3. AMD-008 part A is **ratified** (F-19).
4. **Hosting allows commercial use:** you have read Vercel's fair-use page and decided F-18 (Pro, or another host). Unverified from this host: Hobby is non-commercial.
5. The privacy reviewer's **second ruling** on paid creatives exists (privacy gate §6.1), including what happens when an advertiser's page sets cookies on a child, and the ruling on anonymous sessions whose age is unknown (Ruling 3 rule 9).
6. The **content policy and a human review queue** exist (P5.6), with a named reviewer.
7. **Each advertiser agreement** comes to you as its own item (F-20); you sign, a lawyer reads. Marketing accepts no terms.
8. The analytics steward has defined **revenue per 1,000 lesson views, labelled as revenue**, and the WBR reports it apart from Surface Value metrics (X1).
9. Teen mode and under-13 learners still see house cards only.
10. The **school-licence discovery** has said whether a paid slot costs more in licences than it earns.

**Before any third-party network, additionally:** a further amendment (A9), a new privacy review with child-directed flags on every request, a sandboxed cross-origin frame, a consent-banner decision for the EU and UK, a data processing agreement, a principal-engineer review of CSP and page weight (W-893; the feed sits at its 300 KB budget), and a decision record for any new dependency. Personalised or behavioural ads stay refused regardless.

## 7. Open questions for the founder

| # | Question | My recommendation | Blocks |
|---|---|---|---|
| Q1 | **F-44, cut C2:** does the ad slot start after the accounts milestone, or stay in release 1? | After the milestone. House cards earn $0, and the slot's review runs then stay off the critical path | the slot's dates |
| Q2 | **F-17:** stages 0 and 1 only, on Ruling 3, house cards only? | Yes. Stage 2 returns as a new item | W-893, W-894 |
| Q3 | **"No ads" promise:** head-of-product's one allowed promise is "every claim checked, no ads, no tracking". Is it still true with house cards in a promotional slot? | Head-of-product decides. My proposal: while only house cards run, say "**no paid ads**, no tracking", and drop it the day a paid card is approved | positioning, launch copy |
| Q4 | **May house cards feature single lessons, or only categories and "how we work"?** A featured lesson is close to a recommendation, which personalization will also do | Categories and "how we work" only at first; single lessons only after head-of-product rules on §2.7 | creative list |
| Q5 | **F-18:** do you read house cards as commercial use under Vercel's Hobby terms? | Please read the fair-use page yourself. I cannot reach it from here | go-live of the slot |
| Q6 | **F-20:** approve no ad, affiliate, donation or sponsor account now? | Yes, approve none | nothing, by design |
| Q7 | **Should the slot ship at all if the no-card arm wins?** | No. That is Ruling 3 rule 10, and I would keep it | — |

## Objections

| Objection | Raised by | Status |
|---|---|---|
| The house-card slot costs about 0.53M engineering and about 1.4M of quality runs (head-of-product's figures) and earns $0 | head-of-product, principal-engineer | **Open, the founder's (F-17, F-44).** Accepted by you as a cost on 10-15. The fast path's C2 moves it after the milestone, and F-17 "no" removes it |
| A house card that features a lesson is a ranking by another name, which Surface Value forbids unless written down | vp-marketing (self, against §1) | **Open, to head-of-product.** Mitigated in this draft by §1 item 7 and §2.7 (a fixed contextual rotation, never tap rate) and by Q4 (categories only at first) |
| The privacy reviewer rates leaving the slot out (option D) as the cleanest choice, and the safer cut than social if review capacity is short | privacy-reviewer (privacy gate §6.2) | **Open.** This draft accepts that D costs nothing in privacy terms. Whether to cut is F-17 and F-44, not this policy |
| Calling a house card anything other than "Ad" could look like hiding the slot's purpose | vp-marketing (anticipated, for design-lead and head-of-product) | **Open, to head-of-product (W-891 wording).** The label still says "not a lesson" and sits in the slot's fixed place. If head-of-product prefers "Ad", I accept it |
| The "no ads" promise may already be untrue once a promotional slot exists | vp-marketing (self) | **Open, to head-of-product (Q3).** No public copy uses it until that ruling |
| The success measure is not fixed: W-894 is in backlog and no EXP file exists | vp-marketing (self) | **Open, to analytics-steward.** Stage 1 does not ship until the EXP file is registered with predictions committed (Ruling 3 rule 10) |
| The COPPA, GDPR-K and AADC lines are my reading, not legal advice | vp-marketing (self) | **Routed** to privacy-reviewer (W-892) and counsel (F-25). Nothing in §4 is asserted publicly |
| School licences and a feed slot pull against each other | vp-marketing (10-15 proposal) | **Open.** Tested by the school-licence discovery, which needs no build. It is gate 10 in §6 |

## What would make this draft wrong

- You decline F-17. Then the slot leaves scope and this policy is filed as unused.
- The privacy reviewer or counsel finds that a house card needs a banner or an age check. Then §4 changes to their ruling.
- The steward's baseline shows the 6-lesson cap is never reached in real sessions. Then the slot never shows, and the experiment cannot run as designed: the steward redesigns it, and I do not raise the rate.

---

## Appendix: W-916 domain shortlist (for F-23)

The shortlist is already on disk: company/marketing/2026-10-16-f23-domain-options.md. In order: **Guess First** (guessfirst.app or guessfirst.com), then Guess, Then See (guessthensee.com), then Predict & See (predictandsee.com). Not recommended: First Light as the public name, and One Minute Why.

**Retry on 2026-10-16 (this run):** RDAP lookups for guessfirst.com, guessthensee.com, predictandsee.com (Verisign) and guessfirst.app (Google registry) all failed to connect through the proxy (curl status 000). This session has no Vercel domain tool, so `get_purchase_quote` did not run. **Every availability and price there is still unverified, from memory, and is not a quote.** Nothing was registered, bought or signed in to.

**Next step:** the founder, or a session that has the Vercel MCP and the founder's go-ahead for a read-only quote, runs `get_purchase_quote` for the five names and pastes the results into the F-23 file. Counsel runs the trademark search (F-25) before any purchase. F-23 is proposed for 10-30, bought and pointed by about 11-06.
