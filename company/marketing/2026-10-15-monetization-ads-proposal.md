# Proposal: monetization, centred on ads

owner: vp-marketing (Celeste) · date: 2026-10-15 · status: **proposal only** (nothing opened, signed up, installed, posted or deployed)
asked by: founder, 2026-10-15: "For the marketing team we need to work on monetization: ads."
decides: founder (spend, accounts, any Surface Value amendment); privacy-reviewer (final call on the age and ad-data questions); principal-engineer (engineering review); analytics-steward (metrics and the experiment)
confidence: medium on the constraints and the shape of the plan; **low on every revenue number** (no real-learner traffic exists, and the rates below are my assumptions, not sourced figures)

## The answer in one paragraph

Ads can be made compatible with what we are building, but only one kind, and not yet. That kind is a
**labelled, static, contextual card between lessons**, served from our own origin with no
third-party script, no cookies and no data about the learner. **Personalised or behavioural ads:
never** while learners may be under 13 (or under 16 in parts of the EU). They also contradict the
feed rule "It is not personalised and it says so". There is no money to earn today. Nothing is
deployed to real learners (F-04 open), the age policy is undecided (F-01 open), and the Hobby host
does not allow commercial use (C4, unverified this session). At any traffic we can expect in the
next quarter, display ads earn less than the Pro plan they need. So: build the preconditions and the
rules first, run the ad card as a registered experiment with guardrails, and in parallel test the
two options most likely to pay for the hosting without touching a learner: **school/B2B licences**
and **donations aimed at adults**.

## Constraints, quoted

**Surface Value** (company/product/surface-value.md, protected, v1):

> "Engagement (dwell, swipes, shares) is reported, labelled as engagement, and **never** used to rank lessons against each other or to choose what to build."

> "Order is subject round-robin, published first, then lessons in review, labelled as such. It is not personalised and it says so."

> "Nothing autoplays. There are no streaks and no guilt."

> "If the objective is not written down where someone can argue with it, it enters through invisible overrides. This is the objective. Changing it is an amendment."

**Children.** F-01 (company/ops/founder-inbox.json) is still open: "whether learners may be under 13", with options "13+ only, or under-13 with COPPA/GDPR-K consent flows". Until it is decided, we have to assume a learner may be a child. My understanding, which is not legal advice and is for the privacy reviewer to confirm: COPPA treats persistent identifiers used for behavioural advertising as personal information, which needs verifiable parental consent for under-13s on child-directed or mixed-audience services. GDPR Art. 8 sets the age of digital consent between 13 and 16 depending on the member state. The UK Age Appropriate Design Code expects profiling, including for ads, to be off by default for children. **Owner of the final call: privacy-reviewer.**

**Hosting.** company/engineering/notes/2026-10-14-scalability-options-for-founder.md, row C4: "Vercel Pro | ~$20/mo per member | more than 100 deploys a day; Hobby is non-commercial use". **Verification: not done.** vercel.com was unreachable from this host (the proxy returned 403 on CONNECT for `/docs/limits/fair-use-guidelines` and `/docs/plans/hobby`). From memory only (unverified): Vercel's fair-use guidelines restrict Hobby to non-commercial personal use and list advertisements, payment requests and affiliate-driven sites as commercial; I believe they say asking for donations is not commercial use. **The founder, or someone with web access, should read that page before relying on any of this.** Until then I treat it as: any ad, affiliate link, paid tier or licence fee means Pro (or another host) first.

**Engineering.** The feed is at its budget. The 2026-10-14 integrated tree measured `/` at "303,965 B (40,250 B gz)" against "the 300 KB budget" (company/ops/changelog.md). EDD-003 stage 1 plans "a strict CSP (`script-src` limited to the shell and the lesson CDN, `connect-src` limited to the event API)" and lesson bundles in `<iframe sandbox="allow-scripts">` on a separate origin so that "Lesson code can never touch the host's cookies, storage or tokens". A third-party ad script on the host page would run with exactly the host privileges that design keeps from our own lessons. The anonymous event beacon (`navigator.sendBeacon("/api/events", …)` in src/kit/progress.ts) stays anonymous only while nothing on the page sets cross-site identifiers. CLAUDE.md: "No new npm dependencies without a decision record."

**Data.** We have no real-learner traffic. EXP-002 is "designed, not run". So every revenue figure below is **a labelled range built from assumptions. None of them is a claim**, and none may be quoted outside this file. The analytics steward owns every metric. This document makes no learning-outcome claim.

## Where an ad may sit relative to the card

A lesson is one predict → explore → reveal card (or a sequence). The rules I propose:

1. **Never inside a lesson.** Not on the stage, not in the controls, not in the reveal, not in the "Does it hold up?" line, not in the claims/sources tap, and not inside the EDD-003 lesson frame. `src/kit/Lesson.tsx` is protected and stays ad-free.
2. **Never before a reveal.** An ad card appears only *after* the learner has moved past a lesson, whether they finished it or swiped on. It never sits between a prediction and its reveal, and never in a multi-card sequence.
3. **Between lessons in the feed only.** It is a separate, full-height feed card labelled "Ad" (or "Sponsored"). It is visually distinct from a lesson (design-lead's system), and the learner can swipe past it at once. No countdown, no interstitial, no "skip in 5 s".
4. **Never first, never next to a revisit.** No ad card is the first card of a session. None sits directly before or after a due revisit, because revisits are what Surface Value puts first ("Revisits come before new lessons when due").
5. **Static.** Text plus one still image. No video, no animation, no sound, nothing that autoplays.
6. **Capped.** At most 1 ad card per 6 lessons (a starting value, set by the experiment, never raised for revenue alone). None on a lesson's own page (`/l/<slug>`) in stage 1.
7. **Contextual by the subject of the lesson before it, never by the learner.** Choosing an ad by "the last lesson was Physics" uses no learner data. It must not use anything about the learner: history, device ID or location finer than country.
8. **The lesson order does not move.** Ad cards are inserted into the round-robin order. They never reorder lessons, and no lesson is chosen, built or kept because of ad performance.

### Does this need an amendment? Yes, I believe so

The "For the feed" section describes a feed made of lessons and revisits. A non-lesson card is a
change to that surface. Revenue is also a new optimisation pressure of exactly the kind Surface
Value was written to keep visible: per-impression revenue rewards more swipes. Writing these rules
into a doc that is not protected would be the "invisible override" the document warns about. I
propose a Surface Value amendment (the number is assigned by the chief of staff) that adds:

- (a) non-lesson cards are allowed only between lessons, with rules 1 to 8 above;
- (b) "Revenue, like engagement, is reported, labelled as revenue, and never used to rank lessons, choose what to build, or set the ad frequency without a registered experiment";
- (c) sponsored lessons follow every gate unchanged, and a sponsorship never moves a lesson in the feed (see below);
- (d) no personalised or behavioural advertising while learners may be under the local age of digital consent.

Donations, school licences, and an ad-free tier with no ads elsewhere need **no** amendment, as long as no
card is inserted into the feed and no streak or guilt copy is used. An ad-free tier *does* need
(a) and (b), because it only exists if ads exist.

## Options

Revenue ranges use one illustrative traffic scenario, so the options can be compared. **Scenario A:
1,000 monthly active learners; Scenario B: 10,000.** Both assume 8 sessions per learner per month
and 5 lessons per session, which gives 40,000 or 400,000 lesson views a month. These are planning
numbers I chose, not forecasts. We have zero real learners today. Rates (RPM, conversion,
commission) are my unsourced assumptions and are marked as such. The analytics steward should
replace all of them with defined numbers or "no data".

### 1. Contextual display ads between lessons

- **Learners:** one swipe of friction every 6 lessons. There is a risk to trust ("a lesson app that sells my attention"), and a risk that an ad's claims sit beside our verified ones. An ad is not a claim of ours, so it must be visually unmistakable as an ad.
- **Compliance:** non-personalised only. With a **first-party card** (no third-party script, no cookies), I expect no consent banner is needed for the ads. With a **third-party network in a non-personalised mode**, most networks still set cookies or read device storage for frequency capping and fraud checks. Under the ePrivacy rules that likely needs a consent banner in the EU/UK, and child-directed treatment flags (e.g. a "treat as child-directed" setting) on every request. The privacy reviewer decides. Ad content must be filtered by category (no gambling, alcohol, dating, weight loss, crypto, political), and filtering needs a human review queue for a first-party card.
- **Engineering:** *first-party card*: a JSON list of approved creatives, one image each, rendered by our own feed component. No new npm dependency, and no CSP change beyond our own image path. It adds a few KB, but any HTML growth must come out of the 300 KB budget first. *Third-party script*: typically tens to hundreds of KB of JS (unverified), plus `script-src`/`frame-src`/`connect-src` openings for ad domains, which breaks the strict CSP planned in EDD-003. If it is ever used, it must run in its own sandboxed cross-origin frame, like the lessons, never on the host page. It needs a decision record.
- **Revenue (assumption):** at 1 ad per 6 lessons, A is about 6,700 impressions a month and B about 67,000. At an assumed non-personalised RPM of $0.50 to $3: **A ≈ $3 to $20/mo; B ≈ $33 to $200/mo.** A first-party card sold directly to a sponsor could earn more per impression, but needs sales effort and a buyer we do not have. Break-even against one Vercel Pro seat (~$20/mo, unverified) needs roughly Scenario B.
- **Reversibility:** high for a first-party card (a flag; remove the cards). Medium for a third-party network (account, terms, CSP and consent banner to unwind; trust is slower to return).

### 2. Sponsored lessons or categories, clearly labelled

- **Learners:** a label on the feed card, outside the stage, such as "Sponsored by X. X did not write or check this lesson." It is the most visible conflict-of-interest risk we could take on.
- **How it interacts with claims and fact-checking (non-negotiable):** the sponsor funds a *topic*, never content. A category manager writes the brief; the sponsor does not write, edit, preview or veto it. Every claim goes through the fact-checker and every gate as normal, and a sponsored lesson that fails stays unpublished, with no refund pressure on the verdict. The sponsor sentence is itself a factual sentence a learner sees, so it must be a claim in `meta.json` with a source (the signed agreement). A `sponsor` field in meta.json, and any check that reads it, touches `tools/company.mjs`, which is protected (amendment), so this goes to the evaluation steward. There is no sponsor in a topic where it sells the answer (a lender sponsoring compound interest, a drug maker sponsoring a health lesson). A sponsorship never moves a lesson up the round-robin. A sponsored *category* that changes feed order is ruled out without its own amendment.
- **Compliance:** advertising-disclosure rules (FTC endorsement guides in the US; CAP code in the UK) need the label to be clear and close. Contracts mean the founder accepts terms. Marketing does not.
- **Engineering:** small (a label component and one meta field), but it touches gates.
- **Revenue (assumption, no market evidence):** $0 to $2,000 per sponsored lesson, flat, mostly likely $0 until there is audited traffic. It does not scale with traffic the way display does.
- **Reversibility:** medium. Contracts run for terms. A published sponsored lesson can be unlabelled only when the term ends.

### 3. House ads and affiliate links for books

- **House ads** (our own cards: "Books is now open", "how we check claims"). Learners: low cost, if they are rare and honest. Risk: they become engagement nudges, which is growth-designer's scope and bound by "no streaks and no guilt". Compliance: none beyond our own claims register. Engineering: the same first-party card as option 1, so it is a good way to build and test the slot with no money involved. Revenue: **$0 directly**. Reversibility: high.
- **Affiliate links (Books).** Learners: "find the book" after the reveal and outside the stage, on the lesson page only, never in the feed card. Compliance: a clear disclosure next to the link (FTC; programme terms. From memory and unverified, Amazon Associates requires a set disclosure sentence). Affiliate clicks set the retailer's tracking cookie, which is a child-safety question for the privacy reviewer. A link must never imply the book "holds up" when our verdict says it does not, so the cm-books "Does it hold up?" line wins every time. Engineering: an outbound link plus `rel="sponsored noopener"`, with no script. Revenue (assumption): 1 to 4% of Books lesson views click, 2 to 5% of clicks buy, ~$15 a book, 3 to 4.5% commission. Per 10,000 Books lesson views that is **about $0.10 to $1.40**. Negligible. Reversibility: high.

### 4. Alternatives and complements

| | Learners | Compliance | Engineering | Revenue (assumption) | Reversible |
|---|---|---|---|---|---|
| **Donations** (aimed at adults: an "About / support" page, never a feed card) | none in the feed; copy must have no guilt ("keep us alive") | the payment platform's age terms (usually 18+); copy goes through the claims register; the founder opens the account | a link to a hosted page; no script | 0.1 to 0.5% of MAU at ~$3 to $5/mo: **A ≈ $3 to $25; B ≈ $30 to $250/mo** | high |
| **Paid ad-free tier** | adds a paywall-shaped incentive to make ads worse (a dark-pattern risk we must rule out in writing) | payments, refunds, tax; under-13s cannot pay; needs accounts (F-01 backend) | auth, payments provider (a new dependency, so a decision record), entitlement checks | 0.5 to 2% conversion at $2 to $4/mo: **A ≈ $10 to $80; B ≈ $100 to $800/mo** | medium (subscribers to refund) |
| **B2B / school licences** (a teacher dashboard, class sets, no ads) | likely the best fit: no ads at all for those learners | school consent under COPPA, US student-privacy laws (many bar targeted ads to K-12 students, e.g. California SOPIPA, from memory), data processing agreements, accessibility; **no outcome claims** (none exist before EXP-002), so we sell "every claim checked, no ads, no tracking", which is checkable | accounts, rosters, an ad-free mode; the largest build | $200 to $2,000 per school per year, assumed; 0 to 10 schools in year one → **$0 to $20,000/yr** | medium (contracts) |

Note: ads on the public feed and school licences pull against each other. Schools and parents tend to
choose ad-free tools, so an ad slot may cost more in licences than it earns.

### Options table

| Option | Effect on learners | Compliance work | Engineering work | Revenue, Scenario B (assumption) | Reversible |
|---|---|---|---|---|---|
| Contextual first-party ad card between lessons | 1 swipe per 6 lessons | ad-content policy; label; likely no banner | small; no dependency | ~$33 to $200/mo | high |
| Third-party contextual network | same, plus a page-weight hit | consent banner (EU/UK), child-directed flags, network terms | CSP, frame isolation, budget, decision record | similar RPM, less sales work | medium |
| Personalised / behavioural ads | profiling | parental consent; contradicts Surface Value | as above | higher RPM | **ruled out** |
| Sponsored lessons | label; conflict-of-interest risk | disclosure; contracts | meta field (touches protected gates) | $0 to $2,000 per lesson, flat | medium |
| House ads | low | none | the same slot | $0 | high |
| Book affiliate links | link on the lesson page | disclosure; cookie question | a link | <$2 per 10k Books views | high |
| Donations (adults) | none in the feed | platform terms | a link | ~$30 to $250/mo | high |
| Paid ad-free tier | paywall incentive | payments, tax, age | auth + payments | ~$100 to $800/mo | medium |
| School / B2B licences | ad-free | school privacy, DPAs | largest | $0 to $20k/yr | medium |

## Recommendation and staged plan

**Recommend:** go ahead only with the **first-party contextual ad card**, and only after Stage 0.
Rule out personalised ads permanently while children may be present. Run **donations (adults) and a
school-licence discovery** in parallel, because they are the likely revenue and need no card in the
feed. Park sponsored lessons until the evaluation steward has written the sponsor rule. Park
affiliate links (not worth the cookie question) and the paid tier (it needs the backend, and it
rewards bad ads).

| Stage | What | Gate to enter | Measurement it needs (analytics steward defines) |
|---|---|---|---|
| **0. Preconditions** (no ads) | F-04 deploy; F-01 age policy; hosting decided (Pro or another host; the founder reads the Vercel terms); the Surface Value amendment ratified; privacy review; principal-engineer review of the slot design; the feed back under 300 KB with headroom | founder decisions F-17 to F-20 | baseline traffic: lesson views, sessions, prediction → reveal completion, first-revisit recall (EXP-002), all with written definitions |
| **1. House cards** in the ad slot | the first-party card, carrying only our own house messages, 1 per 6 lessons, no money | Stage 0 done; the experiment below registered with predictions committed | the guardrails below; the slot works on phone and desktop (computer-use QA); a11y |
| **2. Paid contextual card**, first-party, direct-sold or from a vetted list | the same slot with paid creatives; an ad-content policy; a human review queue | Stage 1 guardrails held; the founder approves each advertiser account or contract | revenue per 1,000 lesson views (labelled as revenue); the same guardrails; complaints |
| **3. (Only if justified) a third-party network** in a sandboxed frame | a non-personalised network, child-directed flags on | the privacy reviewer approves; a decision record; the founder approves the account; page-weight and CSP review | as Stage 2, plus page weight, latency and CSP violation reports |

### Experiment (to be registered by the analytics steward before Stage 1; number assigned by the steward)

Draft for the steward, in the README's section order. The prediction is mine and must be committed in the EXP file **before** any data exists. The steward may tighten it.

- **Hypothesis:** a static, labelled card between lessons at 1 per 6 lessons does not reduce learning-proxy outcomes for the lesson after it.
- **Committed prediction (draft):** compared with a no-card holdout, the lesson right after an ad-slot card shows prediction → reveal completion within 2 percentage points of the holdout, and first spaced-revisit recall within 3 points. `would_be_wrong_if:` completion of the next lesson drops by 3 points or more, or the end-of-session rate after the card rises by 5 points or more, or revisit recall falls by 3 points or more, at the sample the steward sets.
- **Design:** randomised by anonymous session (no persistent learner ID unless F-01 allows one). Arms: no card (baseline, allowed to win), house card at 1 per 6. Later, paid card at 1 per 6. Guardrails: Surface Value #5 completion and #4 recall. Ad-card dwell and taps are reported **labelled as engagement**, never as success. Checks before reading: sample ratio, logging changes, novelty effect.
- **Kill rule:** a guardrail breach stops the arm. Revenue never overrides a guardrail.

## Founder decisions (added to company/ops/founder-inbox.json as F-17 to F-20)

1. **F-17 Whether to pursue ads, and on these terms**: first-party contextual card only, no personalised ads, staged as above. Options: proceed to Stage 0; donations and schools only; or no monetization yet.
2. **F-18 Hosting spend for any commercial use**: Vercel Pro (~$20/mo per member, unverified) or another host, before any ad, affiliate link, paid tier or licence goes live. Please read Vercel's fair-use page yourself. This host could not reach it.
3. **F-19 Surface Value amendment** (non-lesson cards between lessons; revenue never ranks lessons; sponsorship never moves a lesson; no personalised ads while children may be present). Ratify, change or reject.
4. **F-20 Accounts and terms**: no ad network, affiliate programme, donation platform or sponsor contract is opened or signed without your approval of that item. Approve none now. Choose which one (if any) to prepare for first.

These depend on F-01 (age policy) and F-04 (deploy).

## Board asks (the chief of staff files these)

- **head-of-product:** rule on the ad slot as a product change (rules 1 to 8: placement, cap, no slot on lesson pages), and on whether a school/B2B offer and an ad-free tier belong on the roadmap. Sign off any product promise in donation or licence copy.
- **privacy-reviewer (final call):** contextual first-party versus third-party non-personalised; whether either needs a consent banner (EU/UK ePrivacy) or age signals; COPPA/GDPR-K/UK AADC treatment while F-01 is open; affiliate-link cookies; donation platform age terms; school-licence data requirements. Record the ruling in the data inventory.
- **principal-engineer:** review the first-party card design against the 300 KB feed budget, the EDD-003 CSP and frame boundary, and the anonymous beacon. Confirm third-party ad JS must live in its own sandboxed cross-origin frame. Confirm the Vercel Hobby/Pro position (C4) against Vercel's terms. Any new dependency needs a decision record.
- **analytics-steward:** register the experiment above, with predictions committed before data. Define lesson views, sessions, revenue per 1,000 lesson views (labelled revenue) and the guardrails. Replace my assumed RPM, conversion and donation rates with sourced numbers or "no data".
- **evaluation-steward:** sponsored lessons touch gates and claims (a `sponsor` field and the sponsor sentence as a claim, checks in protected `tools/company.mjs`). Write the sponsor-independence rule or reject sponsored lessons.
- Also, for information: **growth-designer** (house cards are in-product, so no nudge or guilt copy), **design-lead** (the visual distinction of an ad card), **cm-books** (affiliate links parked; the "Does it hold up?" line wins), **fact-checker** (any ad, donation or licence copy goes through company/marketing/claims.md before use).

## What this proposal does not claim

No revenue, user count, RPM or conversion figure here is a fact. They are labelled assumptions for
comparing options. No learning outcome is stated or implied. No account was opened, nothing was
installed, and nothing public changed.
