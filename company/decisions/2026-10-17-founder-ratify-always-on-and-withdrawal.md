# Founder: ratify the always-on amendment and pre-approve a flag-off withdrawal

owner: founder · recorded by: chief-of-staff · date: 2026-10-17
status: decided (intent); the amendment text is still to be drafted and shown to the founder
class: constitution
route: founder → chief-of-staff (records) → evaluation-steward (drafts the amendment, W-1764, with W-1782 and W-1813) → founder (reads the text) → ratified

## What the founder said

> "Ratify both"  (founder, conversation, 2026-10-17)

Asked which two, the founder chose **"Amendment + flag-off"**: have the always-on amendment drafted for ratification, and pre-approve turning the website's personalised-order flag off on a privacy or child-safety trigger.

## What is decided, and what is not yet

1. **Always-on amendment (W-1764).** The founder ratifies the substance: a personalised new-lesson order on the website for every learner, with no learner switch, behind the company build flag. No amendment text existed when the founder said this. evaluation-steward drafts it now. It must state the cold-start behaviour (batch 5 §14.1), that review lessons can come before published ones at cold start (W-1813; surface-value line 23, AMD-008 F1), and the restated intent of the protected QA intro test (W-1782). **It takes effect when the founder has seen the drafted text and confirms it.** That is a confirmation of wording, not a new decision.
2. **Pre-approved flag-off withdrawal.** The founder approves in advance one kind of deploy: a build identical to the live one except that the personalised-order flag is off. It applies only on a privacy or child-safety trigger, and release-manager runs it without asking the founder first. It then records the trigger, the deploy and its smoke test, and tells the founder at once. This is narrower than any other deploy. Every other deploy still needs the founder's approval each time.
   - CLAUDE.md says a deploy needs approval of "that specific deploy in this conversation". A standing approval conflicts with that wording, so the clause goes into the amendment above, together with the matching line in company/ops/runbook-deploy.md and in CLAUDE.md. Until the amendment is ratified, no agent acts on the pre-approval.
3. **Not decided here:** counsel (W-1766, W-1791) is still a question for the founder's lawyer, and the website release still waits on it; the company-side comparison group (O2); any other deploy.

## Objections

- **chief-of-staff:** a standing deploy approval weakens the "every deploy needs the founder" rule. **Answer:** it is limited to one action that only removes the feature (the flag goes off, the code is already reviewed, nothing new ships), on two named triggers. The founder is told at once, and the clause is written into the amendment rather than assumed.
