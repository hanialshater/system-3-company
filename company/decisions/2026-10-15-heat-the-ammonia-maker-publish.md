# Decision: heat-the-ammonia-maker may publish in r7; the open W-733 question does not hold it

owner: head-of-product (Priya), on publishing. Whether the c6 sentence stays in the lesson is cm-chemistry's content call (W-733), and this record does not make it.
date: 2026-10-15
status: decided (not held)
class: product
route: fact-checker (passes 1, 37, 38, `company/reviews/heat-the-ammonia-maker/2026-10-14-fact-check.md`) → cm-chemistry (W-733, the factories sentence) → head-of-product (this record: publish or hold) → chief-of-staff (r7 publish list)
recorded by: head-of-product
board: W-1023 (this decision), W-733 (cm-chemistry)

## The question

The brief (`company/domains/briefs/chemistry.energy-rates.md`, brief 11, claim 4) says: "If no source is checkable, cut the 'factories' sentence from the reveal and keep claims 1-3". Fact-check pass 1 held c6 because no source could be opened, and W-733 asked cm-chemistry to decide whether to cut it. W-733 is still open. Does that hold the lesson out of r7?

## Ruling: not held. It may publish in r7.

- **The brief's condition for the cut no longer holds.** Pass 38 (fact-checker, a fresh instance) **verified c6** from OpenStax Chemistry 2e, which is openable on GitHub. Section 13.3 (m68799) gives "150-250 atm" and a catalyst "at relatively moderate temperatures (400-500 °C)". The glossary in section 18.5 (m68833) gives "an iron catalyst and elevated temperatures and pressures". The same pass verified c5 (kinetics), which the sentence and the hook rest on. All 7 claims are verified in `meta.json`.
- **The lesson passes its gates.** `npm run company -- status` lists heat-the-ammonia-maker as "Ready to publish". The current learner review is a launch.
- **The sentence carries the lesson's point.** The learner review (r10) calls "faster but less" the lesson's punchline, and "why factories still run hot" is that punchline. Cutting a verified sentence would weaken the lesson for no gain in truth.
- W-733's other half (find an openable kinetics source for c5) was met by pass 38.

So W-733's open question is no longer a precondition. If cm-chemistry still wants to cut or reword c6, that is a new version: a content edit, claims reset where the text changes, and the normal gates. It does not hold the current version.

**Caveat carried with the ruling (fact-checker, pass 38 aside):** OpenStax 13.3 also gives "Kp on the order of 10^-5 at 25 °C", which conflicts with NASA TM-4513 (K = 5.6 × 10^5 at 25 °C, c2, verified). The lesson follows NASA, correctly. **Do not cite OpenStax for K** in this lesson or any revision of it.

No entry goes in `company/ops/publish-holds.json`.

## Objections

- **The brief / fact-checker pass 1: "Cut it (cm-chemistry's call), or supply an openable source."** **Answer:** the second branch happened, since pass 38 supplied and opened a source. The cut is no longer required. *Status: closed.*
- **cm-chemistry (W-733, open): the cut decision is theirs, and publishing first pre-empts it.** **Answer:** partly accepted. The decision to keep or cut stays cm-chemistry's, and any change ships as a new version through the gates. What I decline is holding a verified, gate-passing lesson while a question whose premise (no checkable source) has lapsed is still open. *Status: held to cm-chemistry's answer on W-733. If it is "cut", the builder revises after publish.*
- **Learner review r10, finding 4: "Show speed" is thin, and the "faster but less" tension rests on one label.** **Answer:** this is a craft note, not a publish blocker, because the verdict was launch. It is routed to cm-chemistry as a possible v-next improvement (a time-to-settle readout would itself be a new claim). *Status: routed, not blocking.*

## Board (asks for the caller; I did not edit board.json)
- **cm-chemistry (W-733):** close it as "no cut required: c6 verified in pass 38". If you still want to change the sentence, file it as a revision.
- **chief-of-staff / release-manager:** heat-the-ammonia-maker stays on the r7 publish list. The deploy still needs the founder's approval.
- W-1023: done against this record.
