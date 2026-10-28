# Mammal lesson drafts — 2026-10-28

Built 14 individual draft lesson files from the requested mammal slice. The plan ID and slug mapping is in `manifest.json`; `build.py` writes the files reproducibly and `check.py` checks schema, source status, option bounds, nonidentical recall wording and control wiring. None of those checks verifies the scientific claims, demonstrates learning or replaces visual QA.

The lessons use a common prediction → click to uncover evidence → reveal pattern with individually authored SVG scenes. These are simple evidence-uncovering activities, not 14 simulations, animated animal models or naturalistic animal images. Each source is explicitly a lead requiring exact page/claim verification; all claims and review evidence remain unverified or empty. The simple schematics are not to scale and several do not depict realistic animal anatomy.

## Pre-flight v1

- Prediction appears before the evidence is uncovered. The locked schematic is unhighlighted and the evidence button is disabled; each lesson's question/options and neutral caption were reviewed for obvious answer leakage, but not walked in a browser.
- The first and only enabled stage action uncovers the evidence, calls the kit's interaction callback and retains that evidence through reveal. This is a basic reveal action; whether it teaches a causal mechanism rather than restating it needs independent learning-design review.
- Recall wording differs from prediction in all 14, but several revisit the same organism and require a stronger independent transfer test.
- No reset control is provided; page reload behavior was not checked.
- 390 × 844 reveal fit, keyboard use, readable type sizes, contrast and screen-reader output have not been inspected. No screenshots, actual browser QA, learner review, or typecheck were run in this worktree.
- Company check after all 14 lessons returned 800 errors and four warnings. Of the 17 additions relative to the supplied 783-error starting report, 14 were these not-yet-added curriculum concepts, two were stale generated registries, and one was the inherited invalid `W-2162` state `blocked`. The integration owner handles curriculum, registry and board; no check success is asserted here.

## Open questions for review

Fact-check every source against the full claim, especially the sound and whisker diagrams, common ancestry inference, pangolin curl, ear heat flow, and generalization across species and contexts. Confirm the correct citation for each: a domain or textbook landing page is only a research lead. Assess whether each diagram actually supports its reveal, whether any question or locked picture cues the answer, and how the concept overlaps the existing catalog or other new lessons. The remaining 36 ideas in the 101–150 list were not built in this slice. Fact-checker, learning designer, accessibility reviewer, QA tester and the parent integration owner should review before publication.
