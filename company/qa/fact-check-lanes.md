# Parallel fact-check lanes: one slug, one lane

owner: evaluation-steward · adopted 2026-10-16 (W-1535) · applies to: whoever dispatches fact-checkers (chief of staff, lane 10 under SO-10-2)

Why: on 2026-10-16 lanes A and B were each given a description ("publish-blocking claims", "remaining open claims outside Books", "F-46 closeout"), not a list. Both read 6 draft lessons, wrote different notes on the same claims, and the merge had to pick a status by hand (company/qa/2026-10-16-w1535-lane-disagreement-ruling.md).

## The rule

1. **A lane is an explicit slug list.** The dispatch brief names every slug the lane may touch, written out in full. A lane may set a status, write a note or write a record only for slugs on its list. Descriptions such as "all open claims", "the rest" or "outside Books" are not lanes.
2. **Lists are disjoint.** Before dispatching a second lane while another is still running, the dispatcher checks that no slug is on both lists. The check is part of the brief: "Overlap with running lanes: none (checked against <brief paths>)."
3. **Found something off your list? Hand it on, do not fix it.** If a lane meets an open claim on a slug outside its list (a shared engine, an unrecorded sentence on another lesson), it writes one line in its report naming the slug and claim id and stops. The dispatcher adds the slug to a later lane.
4. **One record per slug per lane.** The record is `company/reviews/<slug>/<date>-fact-check-<lane>.md`, where `<lane>` is the lane's name as written in the brief (for example `lane-a`, `lane-b`, with one spelling).

## If two lanes still overlap

The merge keeps the more cautious status **and marks the claim for a steward ruling**. It does not treat that status as final. It quotes each lane's note **in full** in the claim note. If a note is too long, it points to the lane's record file. It never cuts a note mid-sentence. The steward then rules under these rules:

- **Verified against "unverified, no source opened".** The verify stands, with no third check, when the verifier did not author the claim, opened and quoted its source, and checked the current claim text. A hold because a host was blocked is an absence, not a finding against.
- **Verified against a specific objection the verifier never saw** (scope, wording or an overclaim). The claim stays unverified, and a third instance answers that objection by name.
- **Verified against disputed, where the dispute is about the rendered text.** Disputed stands. A verify of the claim text does not answer a finding about what the learner sees.
- **Disputed against disputed.** Disputed stands, and the builder applies one fix. The re-verify goes to an instance that drafted none of the candidate wordings (company/knowledge/patterns/fresh-checker-for-drafted-wording.md).
