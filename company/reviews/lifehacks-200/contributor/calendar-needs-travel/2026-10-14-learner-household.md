*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: calendar-needs-travel
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with explicitly treating travel as a calendar commitment.
artifact: artifacts/walkthroughs/calendar-needs-travel/transcript.md, then sheet.png; recorded 2026-10-14T00:37:48.851Z; home/study build be775a7.

## 1. From the artifact

Screenshots seen: all five frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt like a reading check: Travel before meeting plainly includes a journey, while Meeting only does not. The useful tension is in the actual five-minute schedule overlap, rather than in these option labels.
- No sustained understanding break. The labelled minute ranges let me identify travel 0–15 overlapping meeting 10–30. Test plan gives 5m, Move meeting moves the meeting to 15–35 and gives 0m, and moving Start to seventeen produces meeting/email overlap of 2m.
- The picture shifts the meeting along a common time axis while the travel and email ranges stay put. The last finish remains 45m despite changed feasibility; that distinction is readable in the persistent range labels.
- The reveal reports the current 2m overlap and 45m finish rather than claiming the earlier zero-overlap state persists. It explains that all rows book the same person, which answers why overlapping ranges matter. The final overlap is with email, an extension of the travel problem that the labels make recoverable.
- No fatal flaw observed. Main limitation: prediction does not ask the learner to anticipate feasibility or overlap, even though the exploration makes both concrete. No factual or QA approval is implied.

## 2. After reading the brief

- The objective is reserving travel as a separate block. The stage already includes a travel block and concretely shows its scheduling conflict; moving the meeting resolves that conflict once on the path.
- The recall repeats the prediction's "Which layout includes the journey?" and Travel before meeting/Meeting only labels. Selecting the option containing the word Travel requires no application to a new calendar, so it does not test the time-block idea the exploration makes useful.
- Artifact-only experience raised no blocking schedule-mechanism objection. The brief comparison adds a recall objection against the lesson standard's idea-based recall rule. Status remains review; this record supplies no claim verification, human-learning evidence or QA/accessibility approval.

Verdict: revise

## 3. Revised lesson artifact recheck — 64b7b1e

artifact recorded: 2026-10-14T00:54:05.949Z. Screenshots seen: all five fresh sheet.png frames after the fresh transcript; findings appended before reading the revised brief or recall account.

- The lesson path still visibly moves the meeting from travel overlap to no overlap, then to email overlap, with correct current range/counter correspondence. No sustained understanding break or fatal flaw observed.
- The prediction remains a wording check, but the manipulation's time-block mechanism is clear. The sole historical blocking objection was recall repeating that wording; its resolution awaits actual revised recall-screen review.

### Actual phone recall artifact

Read phone-recall.md recorded 2026-10-14T00:58:18.886Z, then actually saw phone-recall-question.png and phone-recall-answer.png. Build 64b7b1e; seeded completion history and scripted correct selection, not human retention evidence.

- The rendered prompt supplies a 14:30 meeting and a twenty-minute fixed journey, asking latest departure. Choices 14:10/14:30/14:50 require reserving the journey before arrival rather than choosing the option containing Travel.
- Feedback explains 14:30 minus twenty minutes and excludes journey uncertainty. The historical repeated-wording recall objection is resolved in the actual phone UI; the simple lesson prediction remains nonblocking.

### After reading the revised brief

- The unchanged separate-travel-block objective matches both the visible overlap manipulation and actual latest-departure recall. The historical recall objection is resolved.
- Status remains review. This is a simulated learner-experience recommendation; it verifies no claims and provides no human-learning, browser-QA or accessibility attestation. Actual recall renders were seen, but the seeded/scripted flow is not observed retention.

Latest verdict: launch
