# Build note: two-said-blue (demo-builder, 2026-10-14)

Format: Simulation run, no spec. Session 2 (NCM batch 1). Kept from evaluators until they report.

## What it is
Urn model, truth blue. 100 people, clue right with probability p, copy a lead of 2+ else follow own clue (ties follow own clue). Stage: 20x5 grid of the latest crowd's picks (blue filled circle / red square, ring on the first person who saw a lead of 2), chips for clue accuracy (60%, 80%, 2 in 3), Run 1 / 100 / 10,000, "Pool the clues" toggle (replaces picks with the clues themselves), readouts (clues right, runs with seeds 1..n, crowd wrong, pooled wrong).

## Numbers (re-run in node with model.ts, the exact rule)
- p=2/3: exact 1/5. Seeds 1..10,000: 1,991 wrong; 1..101: 18; 1..10,101 (QA path): 2,009 (19.9%). Pooled red majority: 2 of 10,101 (3 ties, not counted). Every sequence reached a lead of 2 (latest at person 27). Matches the brief.
- 60%: 3,094 of 10,000 (exact 30.8%). 80%: 594 of 10,000 (exact 5.9%).
- Pooled exact: 0.0199% wrong, 0.0220% tie (binomial).

## Decisions and deviations from the brief
- Section unconfirmed: reference is ch. 16 with section "16.2" recorded; 16.2-16.5 are from memory of the contents, as in the brief. Fact-checker to confirm against the book.
- Anderson & Holt (1997) claim is NOT shown to learners (needs a human source check); kept as claim c8 so the check is not lost.
- Layout is 5 rows of 20 (dot 10 px, pitch 16 px, viewBox 320 wide), not one 100-dot row: a single row would be ~3 px dots. Reads left to right, top to bottom.
- Runs are computed and shown instantly; no 400 ms replay (it adds nothing for a static row and risks QA waits).
- Tallies are kept per accuracy (seeds restart at 1 for each); chip order is 60%, 80%, then "2 in 3" last in DOM and on screen, so the QA click path (each control once, in order) ends on 2 in 3 with 10,101 runs and the pooled view open, which is what the reveal quotes. The reveal quotes the accuracy with the most runs.
- A "Clues right" readout was added: without it the chips changed nothing observable before a run and failed the contract.
- Blue is a fixed #3b82f6 (the domain colour is amber in light theme, which would have made "blue" amber). Colour is not the only cue: circle vs square.
- Stage words are about 30 with legend and readout labels (limit 25 asked): the rule line, legend and four readout labels. Trim candidate for design review: shorten the rule line.
- Last crowd drawn is seed n; on the QA path that is seed 10,101, which locks red (seeded, untuned, not chosen).

## QA
Contract QA (phone and desktop) passes: company/reviews/two-said-blue/2026-10-14-qa.md. Walkthrough screenshots looked at, all 9 phone frames. Full QA run also executed feed.spec; its "subject chips filter the feed" test failed on both projects (feed spec, not this lesson; not investigated).

## Revision v2 (demo-builder, 2026-10-14)
Inputs: learner review (adult beginner) and fact-check pass NCM-1.
- Rule before predicting: the prediction question now states the copy rule (lead of 2 or more is copied, else own clue). Stage message trimmed to "The urn is blue."
- Correct option first: options reordered, answer 0 (recall options too, answer 0).
- Reveal gap: reveal prints (1-p)^2 for the accuracy run most (11.1% at 2 in 3, 16.0% at 60%, 4.0% at 80%; node-checked) and says it is only the quickest route; red can also lead by 2 after a split start, so the total (20.0%, 30.8%, 5.9%) is higher. Also fixed "clue right 67%" to "2 in 3".
- Jargon: "seeds" and "10,101" removed from reveal; readout "Runs (seeds 1 to n)" is now "Crowds run".
- "Pooled wrong" is now "Pooled wrong (ties excluded)"; reveal says ties are not counted.
- Stage text now about 23 words (message 4, legend 9, readout labels 10), was about 30.
- Claims: c4, c5, c7 texts changed, now unverified. c1 text unchanged (source note added, address moved to the question). c8 stays withdrawn. References untouched.
- QA: contract passes phone and desktop (QA_PORT 3661, own dist .next-tsb); walkthrough phone frames viewed; npm run check and typecheck pass.
