# Books: 100-demo PR design constraints

Owner: design-lead (Ines) · 2026-10-16 · status: implementation constraints, not a launch approval.

Task: the founder requested 100 additional book-summary demos on a PR. The binding scope ruling is `company/product/verticals/2026-10-16-books-100-pr-ruling.md`: exactly 100 distinct books, one original runnable idea prototype each, with the six existing Books lessons outside this count. cm-books owns the book/idea selection, briefs, overlap decisions and curriculum (`company/domains/briefs/books-100/manager.md` and the three strand JSON manifests). This file selects an implementable visual route; it does not amend the format catalogue, the kit or publication gates.

## Format decision

Use **single card**, the existing catalogue default, for an original, testable idea from a book. One prediction, one mechanism, one explore scene, one reveal and one transfer recall. No manual stepper, deck shell, chapter navigation or 100 prose summaries behind “Next” buttons. Decorative artwork is optional; it is not needed for this batch.

The later authoritative record is `company/decisions/2026-10-14-book-deck-format.md`: the book deck's shape was accepted at 3–4 idea lessons, but its format remains red pending kit prerequisites, EDD and independent reference review. The 5–6-idea proposal in `book-format.md` is superseded. A single-card prototype is an implementable idea module, **not an approved replacement for the planned book experience**. It does not authorise standalone Books publication.

The current product ruling records the exact-manifest draft exception to W-556, the cumulative 12-lesson cap, K1 and prototype deck completeness. It permits 106 Books drafts including the six existing lessons; it does not release any additional batch or authorise production decks. The founder's request does not verify book chapters, settle F1/F2, open an unbuilt format or authorise deployment. Builders use the ruling and the manager's exact manifest, not a general queue exemption.

## Reusable stage families

All rows below use the same existing **single-card format**; these are scene choices, not new formats or shared-engine approval. cm-books and the learning designer must tie each scene to its specific misconception. Changing names, coefficients or a book reference on the same calculation is not a distinct lesson.

| Family | What the learner changes | What must visibly answer | Required evidence before reveal |
|---|---|---|---|
| Capacity and constraints | Allocate a limited improvement or move work between stations | A pictured queue, capacity or completed flow changes under the stated rule | Baseline and intervention; show whether the limiting step moved |
| Stocks, accumulation and recurrence | Change an input, interval or feedback term | The stock updates from its prior state and the inflow/outflow or recurrence is visible | At least two relevant states; include the prediction's exact case |
| Averages and aggregation | Reassign or filter a small, displayed set of records | Included records and the numerator/denominator change together | Keep the population totals and the selected-group result visible |
| Choice under stated rules | Change one payoff, probability, information set or constraint | A small decision tree, payoff cells or option totals update by the displayed rule | Compare the required alternatives; preserve their assumptions and outcomes |
| Sorting and selection | Apply a clearly named ordering or inclusion rule to visible items | Items move or become explicitly included/excluded; the resulting set is visible | Before/after selection, including any displaced or excluded item needed for the explanation |
| Prediction and error | Move estimates or change a common offset/spread | Estimate marks move relative to an explicit target; error is computed from those marks | The relevant estimates and reference remain visible; keep bias and variability distinct |
| Networks and coordination | Change an edge, threshold or contribution on a small deterministic network | Reachability, route, contribution or threshold crossing changes visibly | Show the traversed path or triggered nodes and the required counterfactual |
| Evidence comparison | Select an actual study/result from a fully sourced brief | The displayed study's own number, interval or sample changes, with its identity and units | Both relevant records stay visible; this family requires a lesson-specific learning/interaction design note |

Do not use the same two unlabeled bars as the mechanism for every family. Counts may have bars, but objects, filters, queues, payoff cells and paths should represent the cause the learner is meant to understand. A “Test” button that only reveals a prewritten conclusion does not meet this spec.

The network family obeys `formats.md`: at most 12 tappable nodes and 10 tappable edges, 44 px targets at least 48 px apart, and no random or aggregate-tick ABM disguised as a small deterministic scene. Avoid this family when its geometry cannot fit.

New representation, drag-only operation, random/agent simulation, non-default comparison/storyboard, research result visualisation, or a verdict needing another evidence picture: **route the brief to learning-designer, then interaction-designer** for a per-lesson note/spec before a builder claims it. The design lead reviews format/layout questions; the platform engineer owns missing kit support. Do not flatten such a brief into a generic arithmetic card to fill the count.

## Fact, model and evidence separation

1. **Book argument:** at most 20 learner-visible words in our own wording, attributed in the reveal. Record a separate claim against the named edition and chapter/section; mark `(unconfirmed)` until independently checked. The builder never verifies it. A toy or a publisher blurb does not establish what a book argues.
2. **Our model:** say “Toy model” on the stage. Record fixed assumptions, inputs, units, formula, rounding and the mechanism shown as claims in `meta.json`. Deriving a result establishes that result under those assumptions. It does not validate an author's wider social, psychological or business claim.
3. **Holds up:** the shared production verdict vocabulary is `holds up`, `holds with limits`, `mixed or contested`, `mostly not`, `did not replicate`, `untested`. Cite an independent derivation or actual research; name the limit. An invented learning curve or fabricated effect size cannot support a real-world verdict. Inaccessible evidence means **our verdict remains unverified**, not that the idea is untested in the literature. Retain the explicit source/publication hold; do not imply a failed replication or manufacture a verdict quota for prototypes.
4. **Addresses:** every factual sentence in hook, stage, reveal and recall, including model details and bibliographic facts, has an addressed claim with support/source. Builders leave claims unverified. Learning designer owns the learner boundary and transfer recall; fact-checker owns verification.
5. **Original expression:** no book text, figures, layouts, named scenes, characters, exercises or chapter-order reconstruction. Quote zero lines by default. Do not use a cover or publisher artwork. Chapter references live in metadata; they do not become stage labels. The current 3–4 ideas/deck and concatenation safeguards remain for any later deck.

The reveal normally has three short beats: **what your displayed test did → what the book argues → what this does and does not establish**. Its wording is specific to the lesson, not an identical disclaimer appended to all 100. The key causal explanation must already be visible in the scene; the reveal may name it.

## Required interaction and phone criteria

- **Predict:** title ≤40 characters, hook ≤90 characters, 2–4 equally precise options. Title/hook/locked diagram must not identify the winning option. Do not print a solved target, answer number or winner highlight before commit. All stage controls exist from the first render and receive `disabled={locked}`; answer readouts show `?`.
- **Explore:** 1–3 meaningful, named milestones using `Milestones`/`useMilestones`, with `minInteractions` equal to their count. A milestone represents observed evidence, not an unrelated tap. Both the prediction's exact case and any counterfactual needed by the reveal are mandatory.
- **Control path:** buttons once in DOM order, sliders two arrow presses, with each response settling within 450 ms. Put required case controls first. Every enabled control changes visible state; already selected options and a no-op Reset are disabled. Preset labels name an intervention, not the answer.
- **Evidence:** compute all reveal values from current state or snapshots captured when required states are reached. Use the stage's rounding. The matching scene, marker, trace or compact record remains visible at reveal. Snapshots are labelled by their case; a number detached from its condition is insufficient.
- **Reset:** retain the required evidence and milestone snapshots if the reveal stays earned. Alternatively reset the evidence and the earn state together through a supported route. Never leave an earned reveal describing erased evidence. The standard path includes pressing Reset last and then opening reveal.
- **Budget:** stage ≤25 visible words at its busiest frame under `2026-10-16-stage-word-budget-counting.md`; reveal ≤90 words. Include controls, readouts and captions in the stage count. Numbers do not excuse an unreadably crowded scene. The builder may not trim fixed or claim-bearing wording to make the count fit: route that cut to cm-books/learning-designer.
- **Phone:** inspect 390×844 at predict and open reveal, plus horizontal overflow at 320 px. Stage top, last reveal line and every named evidence element stay on screen. Meaning-carrying SVG text targets ≥11 rendered px at natural phone size and never shrinks below the 10 px system floor. Do not solve fit with smaller text, smaller targets or inner reveal scrolling.
- **Access:** existing design tokens and kit controls; controls ≥44 px tall; shape/outline/labels alongside colour; light/dark and reduced-motion support. Keep clear keyboard names and one concise polite status region for changing results. No network, storage, dependency, kit or app-shell changes from these lessons.

Every builder writes the standard seven-question Pre-flight in `company/reviews/<slug>/build.md`; this spec is not a replacement. A self-reported fit or a successful unit calculation is not computer-use QA.

## Builder batching and review handoff

Use the existing **demo-builder** role, dispatched by learning-designer after cm-books supplies a brief and any required design note. Respect the queue's `claim.mjs next books --agent=<label>` lock; release abandoned items. The coordinator resolves the old hardcoded checkout path to the actual checkout, rather than creating another queue or bypassing locks.

Suggested batching, after the scope ruling: first build **one representative from each selected family**, then stop for independent visual and learner findings. Use those findings to adjust the remaining scenes. Continue in disjoint batches of at most 10 slugs per builder. Reusable rendering is allowed, but **a shared engine/template used by more than 10 lessons needs the existing engineering/readiness route** before broad adoption; copying a 100-lesson template into lesson folders does not waive that review. Keep build notes out of evaluator briefs.

| Existing owner | Required task / record |
|---|---|
| learning-designer | Reject missing or duplicated misconceptions; provide prediction, payoff, reveal/recall note; route non-default interactions |
| demo-builder | Implement assigned slugs, unverified claims, per-lesson build/pre-flight and math checks; run check/typecheck/build; request independent QA |
| qa-tester | Walk every new lesson, including DOM-order actions and Reset-last, and record code-version-specific computer-use results |
| learner evaluator dispatched through product | Artifact-first walkthrough per sample; write findings before reading meta/build; distinguish simulated review from human learning evidence |
| fact-checker | Independently check all claims required for publication, not just sampled demos; retain chapter/source holds |
| accessibility-reviewer | First family representatives and longest/crowded stages at 390/320, both themes; inspect targets, labels and keyboard operation |
| design review chaired independently of this spec's author | One per used family, then at least one per 10-demo batch and every lesson with a layout/clarity finding; add the worst-case label/reveal length and any new interaction |
| Head of Product / release-manager | Preserve unresolved objections, Books caps and F1/F2/deck holds; PR review does not imply publication or deployment |

Sampling is a design-risk strategy, not blanket approval of unsampled lessons. A sample failure expands review to the affected family/batch and sends the problem to its owner; it does not allow a global “100 passed” claim. The PR should state exact built, independently QA'd, learner-reviewed and claim-verified counts separately.

## Handoff

2026-10-16: format route and constraints written; product's exact-manifest draft exception linked; no lesson code, board/progress/event mutation, claim verification or readiness approval performed by this role. `npm run check` passed on the 969-lesson base with five pre-existing disputed-claim warnings in Life Hacks. Confidence is high that the selected single-card route requires no new format/kit, conditional on actual per-lesson briefs fitting the criteria. Next owners: cm-books supplies 100 distinct brief candidates; learning-designer/interaction-designer prepare any required notes; engineering reviews shared renderer readiness; existing builders implement. Independent design review must judge the built artifacts rather than treating this file as their approval.
