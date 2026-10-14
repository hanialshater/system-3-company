# Decision: no answer before the commit, and the reveal quotes only what the learner saw

owner: head-of-product
date: 2026-10-14
status: decided

## Context
The wave E learner reviews (`company/reviews/*/2026-10-14-learner-*-r6.md`) returned 64 revise,
89 launch and 1 fatal out of 154. On first reviews of new lessons it is 51 revise out of 84 (61%).
A keyword grep of the 64 revise files is rough, but it finds one of two failure patterns in about
37 of them: 18 with an answer leak, 25 with a reveal quoting an unseen state, and 6 with both.
I read eight of them in full:

**Pattern 1: the answer is on the card before the commit (board W-154).**
- `range-min-in-four-nodes`: the title "Ten values, four looks" sits above "how many stored nodes?" (10 / 4 / 2), and the hook "A tree needs far fewer" rules out 10.
- `middle-of-three-takes-all`: the title is the answer to "what share does Bo get?", and Bo is the middle of three.
- `newton-doubles-the-digits`: the title "Twelve digits of √2 in four steps" answers "how many updates until 12 digits?" (4 / 8 / 12). The reviewer: "I copied it; I didn't predict it."
- `four-in-a-row-two-thirds`: the locked chart has a dashed target line labelled "⅔", and one option is "About $0.67".
- `ternary-asks-more`: "More: 13" is the only option with an exact number, so it reads as the answer key.
- `patience-wins-the-split` (minor): the dashed "no end date" line shows the limit as soon as a shrink is chosen, before any rounds are stepped.

**Pattern 2: the reveal quotes a state the learner never reached (board W-150).**
- *The gate lets them skip it.* `ternary-asks-more` quotes "after two questions: 249 vs 333", but the QA path asks one question and then jumps to found. `patience-wins-the-split` says "400 rounds gave 52.6%" (the 10% shrink the question asked about), but the gate never requires a 10% run, and the learner's 400 rounds gave 66.7%. `four-in-a-row-two-thirds` quotes $0.625 and $0.688, which were never shown as numbers, and its "$0.667 / $0.333" contradicts the readout "$0.666 / $0.334". `range-min-in-four-nodes` quotes "1 to 14 needs 6", a range nobody selected.
- *Reset wiped it.* `the-bar-nobody-can-forecast`: the QA path presses Reset last, so the reveal reads "your 0 random nights averaged 0.0, yet 0% were crowded", right after the learner watched 111 nights average 60.1.
- *Reached but not seen.* `throw-it-fast-enough` v3 gates on a landing throw and then the orbit. But the QA slider sweep passes 7.85 km/s in one ~450 ms step, so the reviewer still says "I never threw 7.85" when the reveal says "your 7.85 km/s throw". A milestone that leaves no mark on the stage is not something the learner saw.

Both patterns break the same promise in `earn-the-reveal`: the wrong guess has to be possible, and
the reveal has to compare that guess with what the stage actually gave the learner. Pattern 1 makes
the prediction free. Pattern 2 makes the reveal testimony instead of evidence. The earlier decision
`2026-10-14-told-vs-shown.md` covered the *cause*. It left W-150 (the *values*) open and did not
address W-154.

## Options considered
1. **Leave it to the reviewers.** That is what we do now. It costs one revise round per lesson
   (about half of new lessons), and builders cannot see the rule until a review fails them.
2. **A kit or gate change**: block titles that contain the answer's number, or check reveal
   numbers against stage text. A leaking title is often a phrase, not a number ("takes all"), so
   a check would miss most cases. It also belongs to the platform engineer and the evaluation
   steward, and some of it is protected. Not mine to make, and not enough on its own.
3. **Two craft rules plus a builder pre-flight (chosen).** Write both patterns as rules in
   demo-standard.md, and make the builder answer them in build.md before asking for review. That
   puts the check where the defect is made. Reviewers keep catching what the pre-flight misses.

## Decision
Two craft rules go into `company/product/demo-standard.md` at `*`. Many cases support them, but
Pattern Review has not confirmed them yet.

> `*` **No answer before the commit.** The title, hook, question options and locked stage must not state or point to the answer, and the right option must not be the only one with an exact number.

> `*` **The reveal quotes what you saw.** Every number or state the reveal names is either computed from the learner's own current state, or gated by a milestone, and it survives Reset.

How to read them. Each point here is a line a reviewer can check:
- "Point to" includes phrases ("takes all", "far fewer"), labelled target lines and pre-drawn limits on a locked or freshly unlocked stage, and an option that is worded more precisely than the others. Options carry numbers at the same precision, or none do.
- "Gated by a milestone" means the milestone is on the required path. QA presses each control once in DOM order, so the controls that reach it come first. **The case the question asks about** (the 10% shrink, the two-question state) must be one of the milestones.
- "Survives Reset" means a value is recorded when its milestone is reached and the reveal quotes that record, not the live state. Or Reset does not clear what the reveal quotes. A reveal must never print a zero-run sentence ("your 0 nights").
- "What you saw" means the quoted state is still visible somewhere on the stage when the reveal opens (a trace, a history row or a readout). A milestone passed in one slider sweep with no mark left behind does not count.
- Reveal numbers use the same rounding as the stage readout (0.666, not 0.667).

A **pre-flight** section in demo-standard.md turns both rules into six questions. The builder
answers each one in that lesson's `company/reviews/<slug>/build.md`, under `## Pre-flight`, before
asking for review. This applies to new builds and to every revision from now on. Reviewers are
not asked to trust the answers. They still walk the artifact first, and a wrong pre-flight answer
is a finding against the build.

### Board
- **W-150 closed.** The rule, the reading notes and the pre-flight cover "every 'you saw' value must be a milestone reached or the learner's own state", plus the Reset case.
- **W-154 closed for the standard half** (the rule and the builder check). The other half, "a pre-predict leak check in review", changes the learner evaluator's brief. That brief is generated from `tools/org/roles.mjs`, and evaluation design belongs to the evaluation steward. It goes to them as a new board item, so W-154 is not left open in my name for work I cannot do.
- New item for the demo-builder: apply the pre-flight to the r6 revise lessons named above. Fixing them is builder work. Choosing between fixes that change the concept (for example, the slider in throw-it-fast-enough cannot go past 7.9) stays with the learning designer.

## Rests on
- The eight r6 learner reviews named above. They come from simulated learners, so they find problems but do not show learning.
- The verdict counts from `grep "^Verdict" company/reviews/*/2026-10-14-learner-*-r6.md` (2026-10-14). The pattern split comes from a rough keyword grep and was not hand-coded.
- `company/reviews/throw-it-fast-enough/build.md` v3 (the gate change that a reviewer still did not see).
- Pattern `earn-the-reveal`. Decision `2026-10-14-told-vs-shown.md`.

## Revisit if
- The next learner-review wave on lessons built with a filled-in pre-flight still sends back more than 1 in 5 for either pattern. That would mean a self-check is not enough, and the case for a review-side or kit-side check (option 2) gets stronger.
- Human-learner data shows that lessons whose title states the answer are recalled as well as neutral ones. That would mean the title leak costs nothing we measure, and rule 1 would be a feather.
- Reviewers start sending lessons back for told *context* numbers that the reveal does not claim the learner saw. That would mean "names" is being read too widely.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| A title is a hook. A title like "The middle of three takes all" is memorable, and the surprise is in *why*, not *what*. | head-of-product (anticipated, from the demo-standard Hook rule: "a question or tension") | purpose | **Rejected for titles that answer the question on the card.** In newton-doubles-the-digits the reviewer picked 4 and "copied it", so the wrong-guess moment, which the reveal exists to answer, cannot happen. A title may still name the tension ("What does the middle one get?"). |
| Gating the reveal on the question's own case and on every quoted state adds milestones. QA presses each control once in DOM order, so optional steps cannot gate, and lessons get forced into one path. | demo-builder (in effect, build.md notes for throw-it-fast-enough v2/v3; board W-152) | evidence | **Accepted as a constraint; the rule stands.** The rule offers a second route: quote the learner's own current state ("after one question: 500 vs 666") instead of adding a milestone. A QA contract that can follow a scripted path is W-152 (evaluation steward, amendment). I am not changing it here. |
| "Survives Reset" may need kit support (a snapshot at milestone time, a safe reset), and builders should not each hand-roll it. | head-of-product (anticipated; board W-031 "safe stage reset during reveal") | evidence | **Open, funded by W-031 (platform-engineer).** Until a kit helper exists, builders store the quoted values when the milestone fires. That is ordinary state in Demo.tsx, so no kit change is needed. |
| The "only option with an exact number" test will catch honest questions whose answer is the only one that *can* be exact. | head-of-product (anticipated, from ternary-asks-more "More: 13") | purpose | **Rejected.** The fix costs one word: give every option a number, or none. The rule does not ban numeric answers, only an answer that is worded differently from the others. |
| A builder answering their own pre-flight is not independent, so it adds ceremony without assurance. | head-of-product (anticipated, from CLAUDE.md "builders never mark their own claims verified") | purpose | **Accepted in part.** The pre-flight is not a gate and no one counts it as evidence. It exists so the builder looks before the reviewer does. Evaluators still see the artifact before build.md. The revisit trigger above measures whether it works. |
