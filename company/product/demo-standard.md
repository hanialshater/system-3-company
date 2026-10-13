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
- **Text budget.** Stage text ≤ 25 words at any moment. The reveal ≤ 120 words.
- **No bluffing.** Every factual sentence in the hook, stage or reveal is a claim in `meta.json → claims` with its support and source.

## The files

```
src/demos/<domain>/<slug>/
  Demo.tsx          default export ({ slug }) => <Lesson …>{stage}</Lesson>
  meta.json         the brief and the record (schema: src/kit/types.ts DemoMeta)
  styles.module.css optional; prefix nothing, CSS modules scope it
```

Scaffold with `npm run company -- new-demo <domain> <slug>`. Fill the brief fields in `meta.json`
first (learner boundary, misconception, objective, claims, recall). Build second.

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
