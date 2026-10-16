# The Lesson Standard

Owner: Head of Product. Changes to the *test ids and gates* in this document are constitutional
(they are what QA checks); changes to craft guidance are ordinary and go through Pattern Review.

A lesson is one idea in about sixty seconds. It is closer to a Brilliant problem or a Distill
figure than to a video: the learner does something and the world answers. A swipeable card is
only the container.

## The shape

| Step | What happens | Rule |
|---|---|---|
| Hook | Title (≤ 40 chars) and one line (≤ 90 chars) | A question or tension, not a topic label. "Splitting looks like extra work. It isn't." beats "Merge Sort". |
| Predict | 2–4 options, learner commits | Commit **before** anything moves. The stage is visible but locked. A wrong guess is the point: it is what the reveal answers. |
| Explore | The stage unlocks | The learner acts; the picture responds immediately. At least one action is required before the reveal unlocks. |
| Reveal | "Your prediction held" / "Not quite" + why | Two or three short paragraphs. Compare with what they *saw*. End on the idea, not on praise. |
| Recall | Days later, in the feed, without the stage | One question that needs the idea, not the wording. Stored in `meta.json → recall`. |

## Craft rules (patterns, with confidence marks)

- `**` **One representation on a phone.** If the learner must watch two places at once, cut one.
- `**` **Predict before reveal.** Enforced by the kit and by QA.
- `*` **Teach the payoff, not the procedure.** The early Merge Sort demos made splitting visible and treated merging as cleanup. Find the step that makes the idea worth having.
- `*` **Remove the easy path.** If every version is "bars moving around", ban bars and see what appears.
- `*` **Numbers the learner can feel.** 8 cards, 23 people, 10 folds. Big numbers go in the reveal.
- `*` **Prefer manipulation to animation.** Sliders and taps over play buttons; if there is a play button there is also a step button.
- `*` **Earn the reveal** (pattern `earn-the-reveal`). Name the key state and gate the reveal on reaching it, by calling `interact()` only for steps toward it. Write the reveal from what the learner actually saw. Make the question's numbers match the stage exactly.
- `*` **Show the why you promised.** If the brief lists a cause in doesNotKnow, or the objective asks the learner to explain it, something on the stage must stand for that cause and the reveal must point at it; a told sentence alone is a revise. Context outside the brief's gap may be told in one claimed sentence. (Decision `company/decisions/2026-10-14-told-vs-shown.md`.)
- `*` **No answer before the commit.** The title, hook, question options and locked stage must not state or point to the answer, and the right option must not be the only one with an exact number. "Point to" includes phrases ("takes all", "far fewer"), labelled target lines or pre-drawn limits, and an option worded more precisely than the others. (Decision `company/decisions/2026-10-14-reveal-quotes-what-you-saw.md`.)
- `*` **The reveal quotes what you saw.** Every number or state the reveal names is either computed from the learner's own current state, or gated by a milestone, and it survives Reset. The question's own case is a milestone. Record quoted values when the milestone fires, so Reset cannot turn them into "your 0 runs". The quoted state is still visible on the stage (a trace, a row or a readout) when the reveal opens, and it uses the stage's rounding. (Same decision.)
- `*` **The reveal fits with its picture.** On a 390×844 phone, when the reveal opens, the top of the stage and the last line of the reveal are both on screen (stage-top crop 0 px), and every stage element the reveal points at (a shape, line, row or readout it names, such as "look at the globe") is visible. Fix it in this order: cut told context (or move it onto the stage caption), then fold stage text and tables into the picture, then merge control rows. Never fix it by shrinking text or tap targets, and never by making the reveal scroll inside itself. **On screen means legible:** every element the reveal points at, and every meaning-carrying label at predict, renders at or above the design-system floor (10 px at 390 px wide; 8 px only for `aria-hidden` decoration, `company/design/system.md` W-289). A picture shrunk below that floor fails this rule; when fit and floor conflict, the floor wins and the crop goes to a per-lesson fix (decision `company/decisions/2026-10-14-w513-demo-crit-pairs.md`). Which teaching sentence goes is the category manager's call, not the builder's. Until `tools/reveal-fit.mjs` reports stage-top crop (W-242), judge it from a 390×844 screenshot of the open reveal. (Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.)
- **Text budget.** Stage text ≤ 25 words at any moment. The reveal ≤ 90 words (the same number as `company/design/system.md`). The budget binds new lessons and every new version; a published lesson that passes the fit rule above is not reopened for word count alone. **How the stage counts** (decision `company/decisions/2026-10-16-stage-word-budget-counting.md`): the stage is what renders inside the kit's stage, counted at its busiest frame. A word is a token with a letter in it; numbers, amounts and percentages count 0 (also fused to a unit, "$1M"; a unit symbol or a hemisphere letter right after a number counts 0 with or without a space, "60.6 kg", "49°N"; a spelled-out unit, a lone unit symbol and a chemical formula or element symbol count 1 each, Ruling 2), and the words around them count ("$100 at week 52" is 2). Stage control labels, captions, readout labels, keys and covers count. The kit's title, hook, predict question and options, explore hint and verdict are outside the stage and do not. Text the brief declares, word for word, as the **manipulated stimulus** (the framings in a framing lesson) is exempt from the 25, but the rest of the stage stays ≤ 25 and the whole stage ≤ 50, and fit and floor still bind. The reveal's 90 is counted as `tools/reveal-fit.mjs` counts it, numerals included. **Over budget:** the builder may shorten only its own unclaimed words; it never trims claim-bearing, stimulus or brief-fixed text and never shrinks type. If still over, it writes the count in build.md, stops, and the category manager decides what goes (learning designer re-lays out if cutting is not enough).
- **No bluffing.** Every factual sentence in the hook, stage or reveal is a claim in `meta.json → claims` with its support and source.

## Pre-flight (the builder answers in build.md)

Before asking for review, add `## Pre-flight` to `company/reviews/<slug>/build.md` (one per
version: `## Pre-flight v<n>`). Answer each question in one line, quoting the text or the state.
A "no" means you fix the lesson first. Reviewers walk the artifact before they read this, and a
wrong answer is a finding.

1. **Title and hook.** Read them with the question hidden. Could a learner guess the right option from them alone? (Quote the title and hook.)
2. **Options.** Are all options worded at the same precision, with every option numbered or none? (List them.)
3. **Locked stage.** In the locked frame, is there any label, line, value or highlight that matches the right option? (Name what is drawn.)
4. **Reveal values.** For each number or state the reveal names, where does it come from: (a) computed from the learner's current state, or (b) a milestone on the required path? (One line per value. "Hard-coded" is not an answer.)
5. **QA path.** Pressing each control once in DOM order (sliders: two arrow presses), does the path reach every milestone in 4, including the question's own case? Is each quoted state still visible on the stage when the reveal opens?
6. **Reset.** Press Reset last, then open the reveal. Does every sentence still match what the learner saw? (Paste the reveal text from that run.)
7. **Phone fit.** At 390×844, after the reveal opens, is the stage top on screen, and is everything the reveal points at visible? (Quote the reveal's word count and the stage-top crop in px from `tools/reveal-fit.mjs`; until W-242 lands, attach or link the 390×844 screenshot and name what the reveal points at.)

## The files

```
src/demos/<domain>/<slug>/
  Demo.tsx          default export ({ slug }) => <Lesson …>{stage}</Lesson>
  meta.json         the brief and the record (schema: src/kit/types.ts DemoMeta)
  styles.module.css optional; prefix nothing, CSS modules scope it
```

Scaffold with `npm run company -- new-demo <domain> <slug>`. Fill the brief fields in `meta.json`
first (learner boundary, misconception, objective, claims, recall). Build second.

### The lesson version (`meta.json` `version`)

Learner records, QA records and launch reviews name the version they saw, so the version must
change whenever what the learner sees changes. **A change to reveal text bumps the version**, in the
same commit, as does any other learner-visible change: hook, predict question or options, stage text,
explore hint, recall, a claim's text, or behaviour on the stage. Metadata the learner never sees
(tags, prerequisites, claim status and evidence links) does not bump it. A review stamped with the
old version then counts as "for an older version", and the lesson needs a new walk on the new one.
Do not bump a version only to settle which record applies: that holds the lesson for no reason.
(Head of Product, W-1596; case: fc8c53b8 changed the-swap-that-goes-in-circles' reveal without a
bump, `company/rituals/records/2026-10-16-launch-review-ncm-gap4.md` ruling 2, objection 3.)

When two learner records stamp the same version on the same day, `tools/publish-ready.mjs` orders
them by the `built from <sha>` each names (the record of the later build wins, by git ancestry),
then a `supersedes: <file>` line, then the `-rN` suffix; never by file time. If nothing orders them,
the more severe verdict stands. Reviewers: name the build SHA, and write a re-walk as `-r2`, `-r3`.

### Kit API (`src/kit`)

```tsx
<Lesson
  slug={slug}
  predict={{ question, options: string[], answer: number }}
  exploreHint="What to try, one sentence"
  reveal={({ prediction, correct }) => <>…</>}
  minInteractions={1}
>
  {({ phase, locked, interact, prediction, interactions }) => <Stage/>}
</Lesson>
```

- Use `Control` (button), `Slider` (range), `Readout`, `Row` from `@/kit/controls`.
- To earn the reveal, wrap the stage in `<Milestones interact={interact} names={[…]}>{(reach) => …}</Milestones>` (or call `useMilestones` inside your own Stage component) from `@/kit/milestones` and set `minInteractions` to the number of milestones. An active-but-disabled choice: `className="active"`.
- Pass `disabled={locked}` to every control. Call `interact()` on every meaningful action.
- Draw with inline SVG (`viewBox`, `className="stage-svg"`) using CSS variables (`var(--domain)`, `var(--fg)`, `var(--muted)`, `var(--good)`, `var(--bad)`, `var(--line)`, `var(--bg-2)`). It must read in light and dark themes.
- Randomness must be seeded (deterministic) so QA screenshots are reproducible. Use `mulberry32` from `@/kit/random`. A seed picked to show the expected result must be disclosed in the claim (pattern `disclose-chosen-seeds`).
- QA presses up to the first 16 stage controls in DOM order, **once each, waiting about 450 ms after each press** (sliders get two arrow presses). Put the controls that reach the key state first. A milestone that needs an animation to finish must be reachable within that wait, or be reached by a step button.
- No network, no storage, no new npm dependencies.

### The QA contract (constitutional)

Computer-use QA (`tests/qa/contract.spec.ts`) fails a lesson if:

1. It throws a page or console error.
2. Any stage control is enabled, or a reveal exists, before the prediction.
3. Any enabled stage control can be pressed without changing what is on the stage (text, input values, SVG attributes).
4. The reveal unlocks without interaction, or says fewer than 120 characters.
5. The page overflows horizontally, or a control is smaller than 24 × 24 px.

Test ids the kit renders: `lesson[data-phase]`, `stage`, `predict-option`, `commit-prediction`,
`reveal-button`, `reveal`. Controls carry `data-qa="control"`.

## Gates to publish

`company publish <slug>` refuses unless: every claim is verified by someone other than the builder;
a computer-use QA record and at least one borrowed-mind review exist in `company/reviews/`;
confidence `**` has human-learner evidence. Simulated learners find problems; only people can
show that a lesson teaches.
