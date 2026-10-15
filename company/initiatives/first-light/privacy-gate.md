# First Light: the privacy and safety gate

owner: privacy-reviewer (Elif) · board: W-932 (this file, due 2026-10-22), W-892 (ad slot), W-965 (data-model review of the auth/progress EDD) · charter: charter.md · quality bar: quality-bar.md (section 2.6 says quality cites this gate and never re-judges it) · rules it sits under: AMD-008 (proposed, W-906)
status: **proposed, 2026-10-15** (week-1 scoping, untagged). Open for objections until 2026-10-22. I judge other roles' proposals against it. I do not approve my own, and nobody approves this file for me: the founder accepts it at the 10-23 review together with the quality bar.
budget: none yet (First Light is `proposed`). This run reads and writes one file. Every "planned" item below waits for it.
read for this file: charter, founder decision (with Amendment 1), quality-bar.md, dependencies.md, the ads proposal, AMD-008, `src/app/api/events/route.ts`, `src/lib/spike.ts` (`eventWriteAllowed`), `src/kit/progress.ts`, `src/kit/types.ts`. Not read: any EDD (none exists yet, D-16), the personalization README, the F-01 inbox entry itself.

**What this gate is.** Before First Light ships, every stored field has a reason, an owner and a deletion path, and nothing social ships without moderation and a child-safety answer. A row is passed only by the evidence in its column. A fail blocks the surface, not the release: a surface that fails is cut to release 2 by head-of-product and its quality rows become "absent" (quality-bar.md, "Cut surfaces"). The gate has no waiver path in this file. A founder waiver of a privacy row must name the row and carry my objection verbatim, like a quality waiver.

**What this gate is not: legal advice.** See section 9. Several rows below need a lawyer's reading, not mine, and I mark each one "lawyer".

---

## 0. What is stored today (baseline, read from the code, 2026-10-15)

`company/engineering/data-inventory.md` does not exist yet. This table is its first draft and becomes that file at my next run (board ask 1).

| Field | Where | Contents | Reason | Owner | Deletion path today | Verdict |
|---|---|---|---|---|---|---|
| `s3c:progress:v1` | the learner's browser (localStorage) | per lesson slug: `completedAt`, `predictedCorrectly`, `recalls[{at, correct}]` | spaced revisits | proposed: learner-model-engineer (no owner on record) | clear site data in the browser. No in-app control | ok. Never leaves the device today |
| `s3c:events:v1` | browser | last 500 events: type, slug, `option`, `correct`, `spacedDays`, `dwellMs`, `at` | none found: nothing in `src/` reads it (`loadEvents` in `src/kit/progress.ts` has no caller; the `hq` ones are a different function) | none | clear site data | **fails "every field has a reason".** Either name its consumer or stop writing it. The beacon already sends the same events |
| beacon `POST /api/events` | server function log | `{at, ...body}`: **the whole parsed body is logged, not only the allow-listed fields** (route.ts line 17). The check is only `type` in 6 values and `slug` is a string | analytics (Analytics Steward owns meaning) | analytics-steward (proposed) | Vercel log retention, which we do not control or document | **finding.** Extra keys from any client land in the log verbatim. Fix: log an explicit pick of fields per type, cap lengths |
| request metadata | Vercel platform logs | IP, user agent, path, time, per request (platform behaviour, from memory, not verified this run) | none of ours: it is the host's | platform-engineer | host retention | lawyer: whether an IP in a platform log is personal data for a site that may have child visitors (section 2) |
| `s3c:spike:*`, `s3c:secret` | `/spike` harness only | test values | EDD-003 spike | principal-engineer | n/a | out of scope, but must be absent from the release build (checked in P8.4) |

No cookies are set by the app (route.ts header and the grep for `document.cookie`: none). The beacon carries no identifier. That is the good starting point, and the rest of this file is mostly about keeping it.

---

## 1. The gate: criteria table

**How to read a row.** *Pass* is the number or the written fact. *Evidence* is a file I read (under `company/initiatives/first-light/privacy/`, created at the first evidence run, not now). `<sha>` is the release SHA of quality-bar.md section 2.3. *Cited from quality* means the measurement runs once, in the quality row named, and I read its evidence rather than run a second test (quality-bar.md section 2.6). **Not cited from quality is my own test or read.**

### P1. Accounts and anonymous-first history

| ID | Criterion | Check | Pass | Evidence producer | Cited from quality? |
|---|---|---|---|---|---|
| P1.1 | **Minimum data set** (section 2.2) | Schema diff review against the table in 2.2. Every column of every table has a reason, an owner and a deletion path in the data inventory | 0 columns not in the inventory; 0 columns holding a name, birth date, location, free text, device id, IP | backend-engineer writes; privacy-reviewer reads | no |
| P1.2 | **Anonymous means local** | Read the EDD and the network log of an anonymous session | A learner who never signs up has 0 server-side rows that can be tied to them (no anonymous server id, no cookie, no fingerprint). Progress for them lives in the browser only | backend-engineer; qa-tester's network log reused | Q1.4 ("refusing sign-up leaves the anonymous feed fully usable") for the function; the 0-row claim is mine |
| P1.3 | **Merge at sign-up is explicit and safe** | Read the merge spec; run the merge script (section 2.3) | The learner is shown what will be imported and can decline. Nothing is uploaded before sign-up completes. Merge is a union that never overwrites or deletes existing account history. The upload is schema-validated and size-capped | backend-engineer | Q1.4 (history identical before and after) covers the function |
| P1.4 | **Self-serve deletion** | Delete an account created by the test script, then query every table and the auth provider | Delete control reachable in at most 3 taps from the account view, with no support ticket. After it: 0 rows keyed to the user id in any table, the auth-provider record gone, sign-in fails. Backups roll off within **35 days** and the number is written in the policy | backend-engineer builds; privacy-reviewer runs the query script | no |
| P1.5 | **Self-serve export** | Export an account holding the 20-event script | One JSON file, downloadable by the learner, containing every field the inventory lists for them, in the same shape as the local progress map. A re-import into a fresh browser gives an identical history | backend-engineer | partly Q1.5 (device A to B) |
| P1.6 | **Retention** | Read the retention table in the EDD | Every table has a stated retention. Accounts with no sign-in for **24 months** are deleted after a notice (proposed number, the founder may change it). Deleted-account tombstones hold no learner data | backend-engineer | no |
| P1.7 | **Processors listed** | Read the inventory | Every processor (auth provider, database host, Vercel, email sender) is listed with what it receives and its DPA status. Status "unknown" is a fail | backend-engineer; **lawyer** for the DPAs | no |
| P1.8 | **Email use** | Read the auth spec and the sender config | Email is used for sign-in and account recovery only. No marketing mail, no reminder mail at launch (AMD-008 M8 allows opt-in reminders later). A new use needs its own review | backend-engineer | no |

### P2. Age

| ID | Criterion | Check | Pass | Evidence producer | Cited from quality? |
|---|---|---|---|---|---|
| P2.1 | **Age screen at account creation, neutral** | Walk through sign-up on 390x844 | Asks for birth **year** only, with no hint of the cut-off, before any email is requested. The year is turned into a band (see 3.3) and then **discarded**: only the band is stored. A learner who is under the floor is told plainly, and the screen does not reload into an easy retry (the band choice is remembered for that browser session) | backend-engineer; growth-designer for copy | function and accessibility in Q2.3 |
| P2.2 | **Under-13 gets no account and no server record** | Script: enter a year that makes the learner 12 | 0 rows, 0 emails collected, anonymous feed fully usable, no "sign up" nag afterwards in that session | backend-engineer; qa-tester | no, mine |
| P2.3 | **Teen mode for ages 13 to 15** | Script: enter a year that makes the learner 14 | Account allowed. No social surface, no user text, no ad other than the house card, no reminders. The age band is visible in the export | backend-engineer | Q1.8 (no cross-account leak) for the social half |
| P2.4 | **No personalised or behavioural ads for anyone** | Read the ad spec; Q1.9 request log | 0 requests to ad hosts; the ad request carries no identifier or history (AMD-008 A7, A9) | backend-engineer | **Q1.9** |
| P2.5 | **Parental consent** | none at launch | Release 1 collects no data that needs verifiable parental consent, because under-13s cannot have an account. If the founder lifts the floor at F-01, this row **fails** until a consent flow has its own review | founder (F-01) | no |
| P2.6 | **Age policy is written and matches the build** | Read the policy text against the build | One sentence in the policy states the floor and teen mode, and the build behaves as stated | head-of-product; **lawyer** for the wording | no |

### P3. Server-side progress and personalization

| ID | Criterion | Check | Pass | Evidence producer | Cited from quality? |
|---|---|---|---|---|---|
| P3.1 | **Inputs are the AMD-008 P2 list and nothing else** | Read the progress schema and the personalization rule inputs | Server stores only: completion, prediction made and right or wrong, recall result, due-revisit state (derived), stated choices (subjects, "less of this", personalization on or off). 0 columns for dwell, swipes, scroll speed, session length or count, shares, device, location, ad impressions or taps | backend-engineer; personalization-lead | **Q1.6** ("0 engagement inputs") for behaviour. The schema read is mine |
| P3.2 | **No profiling beyond the rule list** | Code audit of the personalization module | No inferred attribute (interest score, ability score, demographic guess, cohort id) is stored or computed outside a published rule. Rule output is computed on demand and not stored per learner. If the Q1.6 rule log is kept, it is kept at most **30 days** | personalization-lead; privacy-reviewer reads | no |
| P3.3 | **Anonymous personalization stays local** | Network log of an anonymous session with history | The history is not sent to the server to personalise. Rules run in the browser, or the server receives only what a rule needs for one request and keeps nothing | backend-engineer | P4 test in AMD-FL-B |
| P3.4 | **Turning personalization off** | AMD-008 P4 test | Off means the server also stops using the data for ordering. The progress rows remain until the learner deletes them | personalization-lead | AMD-FL-B (P4) |
| P3.5 | **Mastery stays inside M1** | Read the mastery schema | State is derived from the three events of AMD-008 M1. No stored counter of consecutive periods (M2) | learner-model-engineer | Q1.7 |

### P4. Light social

| ID | Criterion | Check | Pass | Evidence producer |
|---|---|---|---|---|
| P4.1 | **Recommendation: nothing that shows a learner to another learner or accepts learner text ships in release 1** (section 5) | The release build | 0 surfaces with user-generated text, images, handles, follow, comments, direct messages, search for people, leaderboards (AMD-008 M5 already bans the last) | head-of-product (scope) |
| P4.2 | **Allowed: share a lesson** | Read the share feature | A share is a link to a lesson (or the device share sheet), with no tracking parameter, no learner id, no name and no progress in the link. Opening it creates no server record | growth-designer builds; privacy-reviewer reads |
| P4.3 | **If social is kept despite P4.1** | See the minimum set in 5.3 | Every item in 5.3 evidenced, **and** a named human moderator who can act within 24 hours | founder (the moderator) |

### P5. The ad slot (W-892)

| ID | Criterion | Check | Pass | Evidence producer | Cited from quality? |
|---|---|---|---|---|---|
| P5.1 | **First-party, contextual only** | Q1.9 request log plus a DOM read | 0 requests from the host page to any origin outside the allow-list in 6.1; 0 third-party scripts; 0 iframes in the ad card | qa-tester | **Q1.9** (the allow-list is mine, the measurement is theirs) |
| P5.2 | **No ad cookies, no ad storage** | Cookie jar and localStorage diff after 30 swipes with the slot on | 0 cookies. 0 new storage keys written by the ad path (AMD-008 A9) | qa-tester | **Q1.9**, if the qa-tester adds the storage diff (board ask 3). Otherwise I run it |
| P5.3 | **Selection uses no learner data** | AMD-008 A7 test | Two learners, different histories, same preceding lesson: same candidate set. The ad request carries no id | qa-tester | **Q1.9** and AMD-FL-B |
| P5.4 | **No ad measurement that identifies a learner** | Read the ad analytics spec | Impressions and taps are counted as aggregate counters per creative per day, by the ad id only. No per-session or per-learner ad log. The beacon does not gain ad fields that tie to `slug` histories | analytics-steward | no |
| P5.5 | **Outbound links** | Read the creative schema | An ad that links out goes **directly** to the advertiser: `rel="sponsored noopener noreferrer"`, no redirect through our domain that logs the click against a learner, no tracking parameters we add. Release 1: house cards only, so there are no outbound links at all | growth-designer; vp-marketing | no |
| P5.6 | **Ad content policy** | Read the policy | Categories barred as in the proposal (gambling, alcohol, dating, weight loss, crypto, political). A human reviews every creative. A creative is shown to teen-mode accounts only if it is a house card | vp-marketing | no |
| P5.7 | **Consent banner** | Read section 6.2 | Release 1 ships with no banner, and the build proves why: P5.1, P5.2 and P7.1 all pass. A change that adds a cookie or third-party origin re-opens this row | privacy-reviewer | no. **Lawyer** confirms |

### P6. The event beacon

| ID | Criterion | Check | Pass | Evidence producer |
|---|---|---|---|---|
| P6.1 | **Allow-listed fields, per type** | Unit read of route.ts, plus a POST with extra keys | The log line holds only the fields in `LessonEvent` for that type, with string length caps. A POST with an extra key does not log the key | backend-engineer |
| P6.2 | **Still no identifier** | A signed-in session's network log | The beacon carries no user id, no session id that lasts beyond the tab, and no auth header or cookie. Signed-in or not, the beacon looks the same | backend-engineer; qa-tester's log reused |
| P6.3 | **Retention** | Read W-706's design | When events are persisted (W-706, D-32): raw events at most **90 days**, then only aggregates. No IP stored. Stated in the inventory | backend-engineer; analytics-steward |
| P6.4 | **A kill switch at run time** | Read the code | Events can be stopped without a rebuild (`NEXT_PUBLIC_EVENTS` is read at build time today). The beacon is not sent when the browser sends Global Privacy Control or Do Not Track | backend-engineer |
| P6.5 | **Local event log** | Read progress.ts | Either a named consumer exists for `s3c:events:v1`, or it is removed. `dwellMs` is engagement and is reported as such only (AMD-008 X1) | learner-model-engineer |

### P7. Evidence, release and housekeeping

| ID | Criterion | Check | Pass | Evidence producer |
|---|---|---|---|---|
| P7.1 | **Third-party requests on every new page** | Q1.9 and a network log of `/`, `/d/<slug>`, sign-up, account, the legal pages | Only the allow-list in 6.1 | qa-tester (cited) |
| P7.2 | **Privacy policy and terms exist, match the inventory, and are reachable** | Read at RC1 | Each field in the inventory appears in the policy in plain words (a 13-year-old can read it). **Lawyer** has reviewed the text. Linked from sign-up, the account view and the footer, in the same place on every page (Q2.6) | founder (lawyer); privacy-reviewer for factual match |
| P7.3 | **No learner data in lessons, claims or logs shared with agents** | grep of the release build and `meta.json` for learner fields | 0 hits | privacy-reviewer |
| P7.4 | **No spike keys in the release build** | grep for `s3c:spike`, `s3c:secret` | 0 hits outside `/spike`, which returns 404 in production | platform-engineer |
| P7.5 | **Incident path** | Read the runbook | A privacy incident (leak, wrong deletion) has a named owner, a classification (EDD-007 tier 2), and a notice step. **Lawyer** for statutory notice periods | principal-engineer-ops |
| P7.6 | **Privacy verdict** | All rows above on `<sha>` | Pass, or each failing surface cut. Written as `privacy/verdict-2026-11-23.md` | privacy-reviewer |

---

## 2. Accounts and anonymous-first history

### 2.1 Position

Anonymous means **local**. A learner who never signs up leaves nothing on the server except the anonymous beacon event (section 7) and the host's own request log. Cross-device progress is a benefit of an account, not of an anonymous server id. If the EDD proposes an anonymous server-side id so that history can be "claimed" later, I will not pass it: it is a persistent identifier on people who may be children, with no account, no age screen and no deletion path. The merge works without one, because the upload happens at sign-up (2.3).

### 2.2 The minimum data set (what I will pass; the EDD may propose less)

| Table | Fields | Why | Not stored |
|---|---|---|---|
| `account` | random `user_id`; email (or the auth provider's subject id if it supports that without email); `age_band` (`13-15` or `16+`); `created_at`; `last_sign_in_at`; `policy_version` and timestamp accepted | sign-in, recovery, which mode applies, retention clock, proof of what the learner agreed to | birth year or date, name, photo, phone, location, IP, device id, password hashes held by us if the provider holds them |
| `progress` | `user_id`, `slug`, `completed_at`, `predicted_correctly`, `recalls[{at, correct}]` | spaced revisits across devices (the same shape as the local map) | dwell, option chosen, swipes, anything about order shown |
| `settings` | `user_id`, `personalization_on`, `subjects[]`, `less_of[]` | stated choices (AMD-008 P2, P4) | any inferred field |

The auth provider and database host are F-01 choices and are not mine to pick. What I need from the choice: it can delete a user by API, it exports user data, it offers a DPA, and it does not require more fields than the table above. If a provider insists on a name or phone, that is a reason to reject it.

### 2.3 The merge at sign-up

1. The learner taps "Keep my history". The screen says what moves: the lessons completed, the recalls, and nothing else. The local event log is not uploaded.
2. Upload happens only after the account exists and the age band is stored. The server validates the shape, caps the size (proposal: 5,000 lessons, 100 recalls each), and drops unknown keys.
3. Merge per slug is a union: earliest `completed_at`, recalls concatenated and de-duplicated by `at`. It never deletes or lowers account history. Signing in on a second device runs the same merge both ways.
4. The local copy stays until the server acknowledges. A failed upload shows a retry and keeps local data (Q1.5).
5. "Don't import" is a real choice and leaves local progress on the device and the account empty.
6. The merge is idempotent: running it twice gives the same result. I will read the script, and the test that Q1.4 runs is the functional proof.

### 2.4 Deletion and export in practice

Deletion removes `account`, `progress`, `settings` and the auth-provider record in one operation, and the confirmation names what was deleted. It does not touch the learner's local data unless they choose "also clear this device". Export is self-serve and covers every table in 2.2. There is no export of the beacon events because none are tied to the learner (P6.2): the policy says so.

---

## 3. Age

### 3.1 What I recommend (one approach)

**Option "13+ accounts, teen mode, no under-13 accounts".** In release 1:

| Learner | Anonymous feed | Account | Ads | Social | Email | Personalization |
|---|---|---|---|---|---|---|
| Any age, no account | yes, fully usable | n/a | house card only (no ad data in any case) | n/a | none | local, from the device only |
| Under 13 (says so at the age screen) | yes, unchanged | **not offered. No email asked, nothing stored** | house card only | none | none | local only |
| 13 to 15 | yes | yes, **teen mode** | house card only | none | sign-in and recovery only | yes, rules only (P2 inputs) |
| 16 and over | yes | yes | house card only in release 1 | per section 5 | sign-in and recovery only | yes |

Why this one:
- Under-13 accounts need verifiable parental consent for COPPA and the national equivalents. That is a flow with real cost, a legal review and an operations load (consent records, revocation, parent-side deletion). It buys nothing release 1 needs, because the anonymous feed already serves a child fully.
- The anonymous-first design already lets a child learn with **no data collected**, so the under-13 answer is the product itself, not a barrier.
- Teen mode is cheap (it removes features) and keeps the 13 to 15 learner that the quality bar already uses as a borrowed mind (Q4.1).

What changes for a child (under 13): no account, no email, no social, no personalised ads (none exist for anyone), no reminders, no export or deletion needed because there is nothing stored on our side. What changes for a teen (13 to 15): no social, no user text, house cards only, no reminders.

**Parental consent options considered**, for the founder's F-01 and for a later release:
1. *None, floor 13* (recommended for release 1).
2. *Email-plus consent* (parent email, confirm link): cheap, accepted by the US FTC only for data used internally and not disclosed. Release 2 at the earliest, **lawyer** first.
3. *Verifiable methods* (card micro-charge, ID check, signed form): needs payments or a vendor (a new dependency and a DPA). Not before release 3, and only with school licences as the reason.

### 3.2 The 16 line in the EU (GDPR Art. 8)

The digital-consent age is 16 by default and 13 to 16 by member state. I cannot tell from here whether Art. 8 binds a service whose lawful basis is the contract of use rather than consent. **This is a question for a lawyer**, and it is the biggest open legal item on the age side. If the lawyer says teen accounts in a 16-country need parental authorisation, the fallback that keeps release 1 shippable is **accounts at 16+ everywhere** and 13 to 15 anonymous only. That costs one table row, not a redesign, and the quality bar's 13 to 15 borrowed mind then reviews the anonymous path. I ask the founder to take the answer before 11-09. Country is not collected, so a per-country rule is not buildable without a new data field, which I would not pass for this purpose.

### 3.3 The age signal

A neutral birth-year question (no "are you over 13?" tick box, which teaches children what to answer), asked once, before email. Output: a band (`under-13`, `13-15`, `16+`) held only in the session until the account is made, then only `13-15` or `16+` is stored. The year is never written down. This is self-declared and can be lied about. I accept that: COPPA is about actual knowledge, and the screen does not collect more than it needs to decide. A learner who states under 13 gets no account (P2.2). Whether the site is "directed to children" or "mixed audience" is **a legal characterisation**, and the lesson content and design are the facts a lawyer will use. Flagged in section 9.

### 3.4 If the founder decides under-13 learners may have accounts (F-01 option 2)

P2.5 fails until a consent flow, a parent-side deletion path and a lawyer's read exist. Treat that as a new workstream, not a toggle: I estimate at least 5 more review runs and I would recommend cutting accounts for those learners from release 1 even then.

---

## 4. Server-side progress and personalization

- **Allowed inputs** are exactly AMD-008 P2: own completions, predictions (made or not, right or wrong), recall results, due revisits, choices the learner states, the curriculum's prerequisite graph. **Forbidden:** dwell, swipes, scroll speed, shares, session length or count, anything about ads, demographics, device, location finer than country. Where my ruling and AMD-008 differ, the stricter wins (AMD-008 objection 7). Mine adds one thing: **age band is not an input** to any rule. A teen mode is a feature switch, not a profile.
- **Retention:** progress and settings for as long as the account lives, deleted with it. Derived personalization output is not stored (P3.2). The rule log, if kept for Q1.6, is kept at most 30 days.
- **No profiling beyond the rule list.** No stored interest score, ability estimate, cohort or embedding. A learned model is already outside AMD-008 P1. If one is ever proposed, it needs a privacy review of its own, and I will treat it as profiling.
- **Server side vs local.** Anonymous personalization runs in the browser (P3.3). A signed-in learner's rules may run on the server, using only the `progress` and `settings` rows, with nothing kept per request.
- **Cross-account data.** Mastery is compared only with the learner's own past (AMD-008 M5), so no aggregate shown to a learner is derived from other learners' records.
- **Reasons shown to the learner** (P3 of AMD-008) must not reveal another learner's data and must not mention the age band.

---

## 5. Light social

### 5.1 Recommendation: cut to release 2 anything beyond "share a lesson"

I recommend that release 1 ships **no** feature that shows one learner to another or accepts text, images or names from a learner. Release 1 social is "share a lesson" (P4.2): a link or the device share sheet. Reasons:

1. **Moderation needs a human who can act within hours.** The company is agents. I have no record of a person who would see a report, remove content and answer a parent, and no on-call. A report button that nobody reads is worse than no social.
2. **Child safety.** Teen accounts (13 to 15) would be on the same surface as adults. Contact between adults and children is the harm that matters most, and the only safe launch for it is no contact surface at all.
3. **Legal duties scale with user content.** Platform duties for user-generated content (US reporting duties for child sexual abuse material, the EU Digital Services Act, the UK Online Safety Act) are real. **A lawyer must say** which apply at our size. I will not guess.
4. **Time.** The review chain is already the critical path (R-020). Social costs about 9 quality runs (quality-bar.md section 3) and at least 3 of mine.
5. **It is not what makes the first release work.** The charter lists social as "light". Sharing a link covers the need for a learner to tell a friend, and AMD-008 already bars leaderboards and comparison.

This is a scope recommendation. The cut is head-of-product's decision (quality-bar.md, "Cut surfaces"). If there is no privacy ruling on social by 11-09, social is cut anyway (D-22), and this file is that ruling in advance.

### 5.2 What is not social, so it is not blocked

Share a lesson (P4.2); the learner's own progress, mastery and export; a "report a problem with this lesson" link that sends no learner data. The last is a lesson-quality channel and goes to the claims owner, not a moderation queue.

### 5.3 If the founder keeps social in release 1 anyway: the minimum

Each item is a row I will evidence before I pass it. Missing any one means cut.

1. 16+ accounts only. Teen mode and the under-13 anonymous path never see it.
2. **No free text and no images** in release 1: reactions from a fixed list, or nothing. Free text needs pre-moderation, which needs the human in item 8.
3. No direct messages. No search by name. No follow graph visible to others. Handles are generated, never chosen, and no real name field exists.
4. **Private by default.** A learner appears to others only after an explicit opt-in that says who will see what. Opting out removes them at once. Another learner's progress is never shown without opt-in (Q1.8's 2-account script is the proof).
5. A **report** control on every item shown, a **block** control, and a stored report record. Report receipt confirmed to the reporter.
6. Takedown within **24 hours** of a report, and within one hour for a report of a child in danger. A named person for each.
7. A written child-safety procedure: what to do on a report of grooming or abuse material (preserve, remove, report to the competent authority), who is told, who may look at the content. **Lawyer** writes or approves the reporting duties.
8. **A named human moderator** with time reserved, and a second as cover. The founder names them. Without it P4.3 fails.
9. Deletion removes the learner's social items too (P1.4).

---

## 6. The ad slot, and the rule on W-892

### 6.1 Proposed ruling (W-892)

I do not approve the proposal that I would build myself, and I am not the proposer here. vp-marketing and head-of-product propose the slot. My ruling:

- **Approved for release 1, conditional:** a **first-party, static, contextual card**, the **house cards only** (Stage 1 in the ads proposal). It is served from our own origin. Contextual means "chosen by the subject of the lesson before it" (A7). It uses no learner data. It sets no cookie and no storage key. It runs no third-party script. It has no iframe. Allow-list for the host page in release 1: **our own origin, our own image path, and the event API on our own origin.** Nothing else.
- **Refused for release 1:** any third-party ad network, any network "in non-personalised mode", any tracking pixel, any redirect-click logger, any affiliate link, any sponsored lesson. A network needs a further amendment (AMD-008 A9) and a new privacy review with: child-directed flags, a sandboxed cross-origin frame, a consent banner decision, a DPA, and a CSP review.
- **Paid first-party creatives (Stage 2):** a second ruling, not this one. It needs the content policy (P5.6), the human review queue, the advertiser agreements (the founder signs, a **lawyer** reads), and an answer to "what happens when the advertiser's page sets cookies on a child". A paid creative that links out leaves our site, and teen mode and under-13 anonymous learners are the learners at risk.
- **Personalised or behavioural ads:** refused for all learners, permanently while children may be present.

### 6.2 Consent banner, by option

| Option | Banner? | Why (my position, not legal advice) |
|---|---|---|
| **A. First-party house or paid card**, no cookies, no storage, no third-party origin | **No** | Nothing is stored on the device by the ad path and nothing is sent to anyone but us. Our functional storage (progress, which the learner asks for) is, in my reading, the kind the ePrivacy rules exempt. **Lawyer to confirm** the exemption for `s3c:progress:v1` and the beacon |
| **B. Third-party network, non-personalised, in a sandboxed frame** | **Yes in the EU and UK**, plus child-directed treatment on every request | Networks usually read or write device storage for frequency capping and fraud checks, which needs consent, and a consent dialog shown to teens is a poor basis anyway |
| **C. Personalised or behavioural** | not available | refused (6.1) |
| **D. No ads in release 1** | No | the cleanest option, and allowed by decision item 4 ("ads may slip to release 2") |

Rule on option A: **no banner**, provided P5.1, P5.2 and P7.1 pass on the release SHA. A single added cookie, storage key or third-party origin re-opens the question. Because the house card earns nothing and has no data effect, the privacy cost of leaving it out is zero. If review capacity is short, **D is the safer cut than social**, and I would say so at the 11-09 review.

---

## 7. The event beacon

### 7.1 Today

`track()` in `src/kit/progress.ts` writes the event to localStorage and calls `navigator.sendBeacon("/api/events", JSON.stringify(event))` unless `NEXT_PUBLIC_EVENTS` is "off" at build time. `route.ts` refuses cross-origin and sandboxed-frame writes (W-477), accepts six event types, and `console.log`s `{at, ...body}`. Events are `view`, `predict` (with `option` and `correct`), `interact`, `reveal`, `recall` (`correct`, `spacedDays`), `complete` (`dwellMs`). No cookie, no id. The events land in Vercel's function logs. Findings: the full-body log (P6.1), the build-time-only switch (P6.4), the local event log with no reader (P6.5), and no stated retention (P6.3).

My reading of today: the beacon is not personal data in the usual sense, because it carries no identifier. **Lawyer** to say whether it is once the host's IP and user agent sit beside it in the platform log, and whether that matters for visitors who state they are under 13. My mitigation in the meantime: keep platform log retention as short as the plan allows, and write the number in the inventory.

### 7.2 With accounts

1. The beacon does **not** gain a user id, a session id that survives the tab, or any auth header. A signed-in learner and an anonymous one send the same events. If analytics wants a per-learner view, that is a new purpose and a new review.
2. Progress writes for a signed-in learner use a **separate authenticated endpoint**. Those writes are not "events" and are not logged with the body.
3. `eventWriteAllowed` stays: same-origin only.
4. The ads proposal's experiment is "randomised by anonymous session (no persistent learner ID unless F-01 allows one)". I allow a **random per-tab session id held in memory** for that experiment. Not stored, not sent with account data, deleted on tab close. Anything longer-lived is a new review.
5. When W-706 persists events: 90 days raw, then aggregates; no IP; the inventory says so (P6.3).
6. `dwellMs` and every other engagement field remain "reported, labelled as engagement" (AMD-008 X1), and never feed a rule.

---

## 8. Evidence I need, by workstream and date

Dates not set by a record are marked **proposed**. Engineering durations are unknown until W-908 (dependencies.md). "Then" means the day the artifact arrives, and my review takes at most 2 working days.

| # | From | What | By | Why it matters |
|---|---|---|---|---|
| E1 | **backend-engineer** | **Auth and progress EDD with a data-model section** (W-965): tables and columns, merge spec, deletion and export design, retention table, provider choice and what it receives. Template: sections 2.2 to 2.4 here | proposed **2026-10-20**, so my review lands by 10-22 and tranche 2 (10-23) has an answer. If it arrives later, my review lands 2 working days after | **Comes first.** Nothing with a learner id merges before this (D-17). Critical path |
| E2 | principal-engineer | The PE review of E1 in parallel, not in series | same day as E1 | A rework round restarts the chain (dependencies.md section 2) |
| E3 | founder | F-01: auth provider, database host, age floor. My recommendation: **13+, no under-13 accounts** | 2026-10-23 (open) | The age gate and P2 rows depend on it |
| E4 | founder | Lawyer engaged for the items in section 9 | proposed **2026-10-30**, so counsel's text returns before RC1 on 11-13 | Terms and privacy policy cannot be written by this gate |
| E5 | backend-engineer + growth-designer | Age screen and teen-mode spec (P2.1 to P2.3): copy, states, which surfaces hide | 2026-11-02 (proposed) | Feeds AMD-FL-B testids and Q2.3 |
| E6 | head-of-product | Ruling on W-891 (slot numbers) and **the scope cut on social**: cut, or keep with 5.3 | 2026-10-30 (the date the quality bar already asks for) | I cannot write a ruling on social that nobody has scoped. Without it social is cut on 11-09 |
| E7 | backend-engineer | Schema diff for each migration, before merge | each, before merge | EDD-007 and my authority to block |
| E8 | backend-engineer / analytics-steward | W-706 design: allow-listed event fields, retention, kill switch (P6.1 to P6.5) | 2026-11-02 (proposed) | The beacon is the one field set already live |
| E9 | personalization-lead / learner-model-engineer | The rule list with each rule's inputs, and the M1 definition table | 2026-11-02 (proposed; the quality bar needs the M1 table before AMD-FL-B on 11-06) | P3.1, P3.2 |
| E10 | vp-marketing + growth-designer | Slot design, house-card creatives, ad analytics spec, content policy (P5.4 to P5.6) | 2026-11-02 (proposed) | W-892 ruling by 11-09 |
| E11 | qa-tester | Q1.9 to include: request-origin check against my allow-list, cookie and storage diff, anonymous-session network log; Q1.8 two-account leak script; Q1.4 history identical | in the surface specs by AMD-FL-B (11-06) | Cited, not rerun (quality-bar.md 2.6) |
| E12 | backend-engineer | The deletion and export test results (P1.4, P1.5) on a preview of RC1 | 2026-11-12 | I run the query script myself on the preview |
| E13 | principal-engineer-ops | Incident path for privacy events (P7.5), and the platform log retention figure | 2026-11-09 | Inventory and policy numbers |
| E14 | founder (with lawyer) | Draft privacy policy and terms | **2026-11-13** (RC1) | P7.2 |
| E15 | platform-engineer | Spike keys absent from the release build; `/spike` 404 in production | RC1 | P7.4 |

Fixed dates this gate adds to the quality bar's table (it already lists 10-22 for these criteria and 11-09 for rulings):

| Date | What | Owner |
|---|---|---|
| 2026-10-22 | This file open for objections closes. W-965 review of E1 if it has arrived | privacy-reviewer |
| 2026-10-23 | Founder accepts or changes this gate with the bar | founder |
| 2026-11-09 | Rulings: social, ad slot (W-892), age gate | privacy-reviewer |
| 2026-11-16 | Privacy rows run on RC1 beside the T-7 dry run | privacy-reviewer |
| 2026-11-20 | Re-check rows touched by `git diff RC1..final` | privacy-reviewer |
| 2026-11-23 | Privacy verdict on the final SHA | privacy-reviewer |

---

## 9. What is legal advice I cannot give

I flag these. I do not decide them. Several change what ships.

1. **COPPA:** whether the site is "directed to children" or "mixed audience", what "actual knowledge" means once the age screen exists, and whether platform request logs with IP count as personal information for a visitor who says they are under 13.
2. **GDPR Art. 8 and national ages**, and whether teen accounts at 13 to 15 are allowed without parental authorisation (3.2). The UK Age Appropriate Design Code and whether a DPIA is required for a service used by children.
3. **ePrivacy:** whether our localStorage progress and the beacon need consent or are exempt; confirmation of "no banner" for ad option A (6.2).
4. **The privacy policy and the terms of use**: the text, the lawful basis for each field, controller details, a contact point for rights requests, and data-subject rights deadlines. The founder will need a lawyer for both. I can supply the factual data description from the inventory.
5. **Processors:** DPAs with the auth provider, database host, Vercel and any email sender; international transfers.
6. **Social duties:** US child sexual abuse material reporting, the EU DSA, the UK Online Safety Act (if social is kept, 5.3).
7. **Advertiser contracts and ad disclosure** (FTC, CAP).
8. **Vercel Hobby versus commercial use** (F-18): not a privacy question, but the ads proposal could not verify it.
9. **Breach notification** periods and who must be told.

A tool that I can supply: a short plain-language description of what we collect, for a lawyer to start from. I cannot say "this is compliant", and nothing in this file should be quoted as saying it.

---

## 10. My capacity

The budget pack gives 13 privacy-reviewer runs. I have 0 measured runs (this is the first), so the cost per run is a proxy of about 140k tokens, medium-low confidence. With social cut, the plan needs **13 runs**; with social kept, **16**. There is no slack in either. I ask for 2 more as a contingency (15, or 18 with social).

| # | Run | When | Social cut | Social kept |
|---|---|---|---|---|
| 1 | W-965: data-model review of E1 | 10-22 (or 2 working days after E1) | 1 | 1 |
| 2 | Re-review after rework (assume one round) | 10-26 to 10-28 | 1 | 1 |
| 3 | Data inventory first version (section 0 becomes the file) plus the age-screen spec review (E5) | 10-26 | 1 | 1 |
| 4 | Ruling pack: social, ad slot W-892, age gate (E6, E10, section 3 to 6) | by 11-06, issued by 11-09 | 1 | 2 |
| 5 | Schema diffs (E7), two migrations assumed | week of 11-02 | 2 | 2 |
| 6 | W-706 event design review (E8) | 11-04 | 1 | 1 |
| 7 | Personalization rule inputs audit (E9) | 11-04 | 1 | 1 |
| 8 | Social PRD and moderation procedure review | 11-04 to 11-06 | 0 | 2 |
| 9 | Deletion and export evidence on the RC1 preview (E12) | 11-12 | 1 | 1 |
| 10 | Privacy policy and terms factual match (E14, after counsel) | 11-13 | 1 | 1 |
| 11 | Privacy rows on RC1 (beside the T-7 dry run) | 11-16 | 1 | 1 |
| 12 | Re-check of rows touched since RC1 | 11-20 | 1 | 1 |
| 13 | Verdict on the final SHA | 11-23 | 1 | 1 |
| | **Total** | | **13** | **16** |

The binding runs are 1 and 2, which sit on the critical path between 10-23 and 11-09 with the PE review and the readiness record (dependencies.md section 2). I will not start run 1 before the EDD has a data-model section: a review of a diagram with no fields is the rubber stamp this role is told to avoid. I will also not pass "it is only a user id". If the EDD is late, the options are to shorten the other reviews, never to skip this one.

---

## 11. Objections to this gate (open until 2026-10-22)

None yet. Every objection gets an answer here, with what happened to it. "Noted" is not an answer.

| # | From | Objection | Answer |
|---|---|---|---|
| | | | |

Two I expect and have not heard:
- **head-of-product / growth-designer: "social is in the founder's scope."** The founder's decision lists "light social", and I recommend cutting it to a share link. That is advice. The cut is head-of-product's, and the founder can keep it with 5.3 and a named moderator.
- **backend-engineer: "an anonymous server id is simpler for the merge."** It is, and I refuse it for the reasons in 2.1. The merge in 2.3 does not need it.

---

## Board asks (for the chief of staff to file; this file does not edit board.json)

1. **privacy-reviewer** (me): next run, turn section 0 into `company/engineering/data-inventory.md` and open W-965 as "review E1 within 2 working days of arrival". Needs: budget.
2. **backend-engineer:** the auth and progress EDD with a data-model section by **2026-10-20** (proposed), as in E1 and sections 2.2 to 2.4. Fix the beacon log to log allow-listed fields only (P6.1) in the same change that touches `route.ts`. Both need board items (D-16 and D-17 have none).
3. **qa-tester:** add three checks to the Q1.8 and Q1.9 surface specs, so I cite them and do not rerun: the request-origin check against 6.1's allow-list, a cookie and storage-key diff after the ad slot is shown, and the anonymous-session network log (rows P1.2, P5.1, P5.2, P7.1).
4. **head-of-product:** rule on **social**: cut to a share link (my recommendation) or keep with 5.3, by **2026-10-30**. Name the moderator if kept. Also name an owner for `s3c:events:v1` or remove it (P6.5).
5. **founder:** (a) F-01: accept 13+ with teen mode and no under-13 accounts, by 10-23. (b) **Engage a lawyer** for the terms, the privacy policy and the section 9 questions, by 10-30. (c) Name a human moderator if social stays.
6. **portfolio-manager:** 13 privacy runs fit only if social is cut. Add 2 contingency runs, and reserve my slots for 10-22, 10-26 to 10-28, 11-04 to 11-06, 11-12 to 11-13, 11-16, 11-20 and 11-23.
7. **chief-of-staff:** file board items for the age gate, for the privacy rulings on social and the ad slot (D-22 has none for these two), and for the lawyer engagement.
8. **platform-engineer / principal-engineer-ops:** state the platform log retention and the production log drain, if any, for the inventory (E13); remove `/spike` keys from the release build (E15).
9. **evaluation-steward:** when AMD-FL-B is written, give the age screen and teen mode testids, so P2.2 and P2.3 run as scripts. The quality bar's Q4.1 age floor ("13 to 15") depends on F-01 as written here.
