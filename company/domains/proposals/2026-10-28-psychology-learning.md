# Domain proposal: Psychology and human learning

Owner: domain-scout · date: 2026-10-28 · status: proposal; not a launch decision
Founder direction: create psychology, human-learning and deeper psychology demos, at least 500. This proposal recommends a small pilot on the way to that target; it does not reduce the target or claim that 500 lessons exist. The founder has selected the domain; Head of Product still owns the entry route and assignment of an existing category manager. Do not create a new role in this proposal.

## Audience and promise

Curious people encounter a stimulus, predict, manipulate a concrete representation and learn what that observation can and cannot establish about perception, memory and learning. Extend later to emotion, self, development, relationships, culture and foundational research methods. A learning interaction is not a diagnosis or a personality test. Confidence, memory and perception vary: the outcome of one task must never be framed as measuring a person's capacities or mental health.

## Candidate map

These 12 concepts are candidate **concept families**, not 12 verified effects or 500 complete briefs. Demand scores 1–3 are editorial guesses, not learner data. Names describe the teaching boundary, not empirically measured effect sizes.

| Concept | Est. demand | Interactive idea | Collision to check |
|---|---:|---|---|
| Visual context and target size | 3 | Compare same-size disks against two different ring surrounds; inspect the sizes | `big-ideas/same-grey-in-shadow` is gray/lightness, not relative size |
| Grouping by proximity | 2 | Move equally sized dots to change the group structure | Existing geometry or visual examples; audit before build |
| Figure-ground interpretation | 2 | Switch which region is highlighted in an ambiguous shape | `same-grey-in-shadow` deals with a shadow, not figure-ground |
| Attention and competing tasks | 3 | Inspect what two task instructions ask the user to track | Existing behavioral attention items; must not treat performance as a diagnosis |
| Source memory | 3 | Separate recalling a shared word from identifying its source in two lists | `lifehacks/cover-before-recall` tests an answer; not source identification |
| Cues and competing associations | 3 | Build two cue–answer pairs sharing a cue and inspect ambiguity | `books/bk-learn-cue-overlap`: cue context in a toy, not competing answers |
| Recall versus recognition | 3 | Compare what is demanded by a blank answer and a shown-choice task | `books/bk-stick-retrieval-evidence`, `lifehacks/cover-before-recall`: close; specific objective and stage need sign-off before building |
| Memory construction | 3 | Compare an observed event with a plausible additional inference | Audit Behavioral Economics memory items; do not equate an illustrative choice with empirical false-memory rates |
| Feedback specificity | 3 | Compare broad and item-specific feedback on an explicit error | `lifehacks/keep-the-error-feedback`, `books/bk-peak-feedback-discriminates`: close; must define a new objective before build |
| Learning contingency | 2 | Compare cue/outcome frequencies with and without the cue | `probability` inference and `behavioral` causal inference demos; psychology must teach contingency, not repeat arithmetic |
| Metacognition and calibration | 3 | Compare stated confidence against a small, explicitly constructed response set | `lifehacks/check-confidence-with-output`, `note-gap-check`: avoid repeating study fluency |
| Social context and interpretation | 2 | Contrast two plausible contextual explanations of one ambiguous action | Behavioral attribution/decision examples; no judgments of actual persons or groups |

Keep the broader 20-strand/500 target as a capacity allocation only. Assign unique objectives and test duplicate boundaries before counting each demo.

## Candidate pilot briefs

### P1. Do the centers match? — context and visual size

- **Boundary:** Knows circles can be compared by diameter; need not know visual size-contrast research. Misconception: a difference in apparent size proves the center circles' physical sizes differ.
- **Predict:** Two targets are shown in separate groups. Which statement is true of the centers: same diameter, left is larger, right is larger? Both center disks are built with exactly the same radius; the surrounding disks differ in size. Avoid an equal-size label or measuring mark before prediction.
- **Explore:** Switch the surround between large and small circles, then turn on a superimposed outline or a ruler that measures the targets; make the relevant case and an alternate context accessible. The measure comes from the actual geometry, not a hard-coded independent answer. Keep the measured view on screen when opening the reveal and after Reset.
- **Reveal:** Both center diameters in the picture are equal. Context can change the visual impression, but users may experience the effect differently; this exercise alone does not measure vision. Distinguish the on-screen geometry (derived from code) from any general perceptual claim (source-backed and unverified).
- **Recall:** A different pair of equal target circles sits within different surrounds. If a ruler gives the same diameter, which conclusion about the drawn targets follows? Same drawn diameter, independent of subjective appearance.
- **Nearest lesson:** `src/demos/big-ideas/same-grey-in-shadow` compares equal gray values in a shadow scene. This pilot compares geometric size and surrounding disk size; don't repeat brightness or claim a single common mechanism. Review boundary with cm-big-ideas.
- **Source/check path:** stage math and renderer code for equal diameters; OpenStax *Psychology 2e*, chapter 5 on sensation and perception, as a candidate starting source (https://openstax.org/books/psychology-2e/pages/5-introduction). The source has not been opened for this exact claim in this run. Find and independently check a primary source for the chosen size-context display before any broad explanatory claim is published.

### P2. Which list was it? — item and source memory

- **Boundary:** Knows that a word can appear in a list. Gap: recognizing an item does not logically determine where it appeared when the item occurred in more than one source.
- **Predict:** Show two named lists in the prompt. Both contain `river`; only the blue list contains `bridge`, and only the green list contains `forest`. The question asks whether recognizing `river` alone identifies its list: blue, green, or insufficient information. Correct answer: insufficient information. The options refer to the displayed case; hide comparison markup until after commitment.
- **Explore:** Tap each list to reveal its entries, then tap a word to show which lists contain it. `river` has two matching sources; `bridge` has one. The learner must inspect both words. Keep the resulting source matches visible at reveal and across Reset.
- **Reveal:** In this constructed example, recognition of `river` fits either list; `bridge` is distinctive. A remembered item and its remembered source are different questions; the task does not assess memory ability. Do not claim that the learner forgot or that a particular rate of source errors occurs.
- **Recall:** A photo appeared in both a travel album and a family album. Does remembering the photo alone tell you which album you saw it in? No, the same item occurs in both.
- **Nearest lesson:** `src/demos/lifehacks/cover-before-recall` asks for a closed-answer test. Here a correct item does not identify its source; link rather than duplicate that lesson.
- **Source/check path:** lists and matches are constructed fixtures, checked directly against the rendered arrays. For a broader distinction between item and source memory, consult an independently checked scholarly source; OpenStax *Psychology 2e* chapter 8 is a candidate (https://openstax.org/books/psychology-2e/pages/8-introduction). No source was opened here for this specific empirical or theoretical claim.

### P3. One cue, two answers — competing associations

- **Boundary:** Knows a cue can be associated with an answer. Gap: a shared cue cannot uniquely select between two answers without an additional condition.
- **Predict:** In the declared toy set, `STAR → blue`, then `STAR → green`. Asked only `STAR → ?`, can that cue alone identify one answer from the recorded set? Options: blue only, green only, or either is consistent. Correct: either is consistent.
- **Explore:** Add the second association and tap the cue: show both arrows. Then add context labels `morning` and `evening` to the two pairs and compare which answer each context identifies. Require both the shared-cue and context states and retain the compared results at reveal and Reset.
- **Reveal:** The same cue links to two outcomes in this explicitly constructed record; a context label disambiguates the record. This is a model of competing associations, not proof that any person's memory will fail or that one answer will overwrite another.
- **Recall:** A file name maps to two folders, one marked work and one home. Which extra information identifies the intended mapping? The folder/context, not the shared name alone.
- **Nearest lesson:** `src/demos/books/bk-learn-cue-overlap` explores a context change in a toy. This pilot shows two explicit associations sharing one cue; if its actual stage teaches that same ambiguity, do not build until the distinction is signed.
- **Source/check path:** the associations and resulting matches derive from the fixture. A real-world claim about proactive/retroactive interference needs a source and independent fact-check; do not include an empirical learning-rate claim in the pilot.

## Checkability, sensitive content and quality

- Every learner-facing factual sentence gets a separately addressed `unverified` claim with code derivation, source or disclosed simulation; no builder self-verifies. Keep all pilot lessons draft pending independent fact checking, learner, accessibility and QA reviews.
- Subjective experiences may vary. Identify models and hypothetical data as such; don't infer diagnosis, memory capacity, intelligence, or treatment effectiveness. Never collect sensitive responses for these illustrations. For trauma, relationships, disorders and cultural comparisons, route a dedicated sensitive-content review before implementation.
- Geometry, exact arrays and event sequences can be independently checked directly. Empirical effects, their boundary conditions, contested theories and population generalizations need actual source access and independent fact-checking. The above references are starting points, not proof of reviewed claims.
- Do not count a trivial reskin as a new learning objective. A pilot must make the particular mechanism visible; generic text with a generic slider is not sufficient.

## Manager and decision

Recommend **cm-big-ideas** as a provisional existing coordinator only if Head of Product accepts the fit and capacity; cm-behavioral, cm-lifehacks and cm-books should review the boundaries they own. No new role proposed. Head of Product decides entry and pilot count, and founder-level direction is already recorded. Do not reclassify or move existing lessons merely to reach 500.

Retirement or narrowing signals to assess after real evidence exists: unresolvable duplicate objectives, inability to verify claims, repeated learner failures to understand the stage, or sustained low retention against a predeclared comparable baseline. No demand or learner-success measurement was established in this proposal.
