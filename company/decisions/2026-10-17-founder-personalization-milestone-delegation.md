# Founder: personalization in HQ and on the website; merge at a milestone; chief of staff decides until then

owner: founder (decides) · recorded by: chief-of-staff · date: 2026-10-17 · class: product / delegation
route: founder → chief-of-staff (decides within the limits below) → vp-personalization (plans and runs lane 14) → founder (deploy approval)
status: decided

## What the founder said
> "Ok i want to have it in both and merge once we reach a milestone, i grant you power to decide until milestone is achieved"  (founder, conversation, answering "Is personalization live in hq or on the website?" — it was live in neither)

## What is decided
1. **Goal:** personalization usable in HQ (the Personalization Lab, in a deployed HQ) and on the website (learners can get a personalised feed).
2. **Merge to main** happens once the milestone below is met, not before.
3. **Delegation:** until the milestone, the chief of staff decides in the founder's place on the founder questions personalization raises (including the open readout-3 question "build a candidate?", First Light Q5's "ships off", and sequencing).

## Limits of the delegation (read by the chief of staff; the founder may widen them)
- **Deploys still need the founder, every time** (CLAUDE.md hard rule; "decide until the milestone" is read as not covering a deploy). The milestone ends at "ready to deploy"; the deploy itself is asked separately.
- **Constitution and protected paths** still change only by ratified amendment.
- **Counsel questions** (privacy D4: minors in a default personalised arm) are not the chief of staff's to answer; the design avoids needing them (opt-in only).
- **Company gates** (privacy review, claims rule, principal-engineer tier review, platform-engineer review of Feed.tsx, head-of-product as owner of the default order) all still apply.

## The milestone (M1), as defined by the chief of staff under this delegation
**M1 = "Personalization v1 ready to deploy":**
- **Website:** a learner can switch on "Personalise my feed" (explicit opt-in, off by default, so no experiment default arm and no D4 question). When on, new-lesson order comes from one frozen candidate policy built from criterion 3's reachable-signal design (app-visible inputs only, privacy-ruled), with a true "why this card" reason; revisits stay as today; one switch turns it off at once. Works anonymous (local only) and does not store derived values (D20).
- **HQ:** the Personalization Lab works in a deployed HQ build (no child process in production; e.g. precomputed runs), with privacy-reviewer and hq-engineer sign-off.
- **Evidence:** the candidate is judged on criterion 3's frozen world against default-order (built blind, frozen by hash, scored, reproduced), and its result is reported honestly whatever it is; the opt-in ships only if the candidate does no harm (no persona harmed by δ_harm, guardrails hold). A thin or failed gain is stated in the reason copy and the release note, not hidden.
- **Gates:** privacy reads of every new input/surface; claims for any learner-facing sentence; principal-engineer tier-2 and platform-engineer review of the feed change; head-of-product review; `npm run verify` green.
- **Then:** merge the branch to main and ask the founder for the deploy.

## Decisions taken now under the delegation
- Readout 3 (REACHABLE, thin): **build one candidate** (lane 14), as M1 requires. Pre-commitments V3/V5 style apply: one candidate, frozen before scoring, no re-tuning.
- First Light Q5 ("rule set ships off") is **superseded for personalization by opt-in**: off by default, on only by the learner's explicit choice. head-of-strategic-initiatives is told (scope note), not asked.

## Objections
- **chief-of-staff:** the reachable gain is thin (clears δ_min by 0.0002–0.0076 and collapses in 3 sensitivity cells), so a shipped opt-in may help little. **Answer:** opt-in, no-harm gate, honest reason copy; the founder asked for it in both places, and the evidence is reported with it.
- **chief-of-staff:** personalization on the website before accounts means anonymous-only, local computation. **Answer:** that is what the privacy ruling already allows (P3.3); signed-in follows when accounts are wired.

## Founder answer on the budget (2026-10-17)

> "Approve W-1583"  (founder, conversation)

- The personalization budget is raised to **4.5M tokens through M1**, as the chief of staff recommended (W-1583: 2.1M covered batch 5 only; batches 3–4 count against the same budget). Approved by the founder, not under the delegation. The token-capture fix (WBR 2026-10-17 anomaly 1, W-1280) is part of the recommendation, so the figure can be measured.

## Founder message to clarify (2026-10-17)

> "No opt in or out"  (founder, conversation)

- Recorded verbatim; the chief of staff has asked the founder which reading he means before changing M1 (see conversation). M1's website part stays as written until then.
