# Computer-use testing

owner: qa-tester · harness owner: evaluation-steward · harness: `tests/qa/` (protected)

An early mistake was judging lessons by reading their code or screenshots. The judge has to
*use* the thing. A browser agent clicks controls in the wrong order, resizes the page, and
notices that the beautiful button everybody admired does nothing. The browser is an instrument:
it records what happened when someone used the artifact. It does not tell us whether a human
learned.

## Three layers

| Layer | Command | What it catches | Who reads it |
|---|---|---|---|
| **Contract** (automated) | `npm run qa` | Page errors; stage unlocked before the prediction; controls that change nothing; reveal without interaction or under 120 characters; horizontal overflow; tap targets under 24px. Runs on Pixel 7 and desktop. | CI, release manager |
| **Walkthrough** (artifact for evaluators) | `npm run walkthrough -- <slug> [--choose N] [--steps K]` | Produces `artifacts/walkthroughs/<slug>/transcript.md` and phase screenshots: what the learner sees, step by step, without the builder's explanation | learner-evaluator, pedagogy-critic, fact-checker |
| **Exploratory** (agent-driven) | ad-hoc Playwright scripts in `artifacts/explore/` (not committed) | Wrong-order taps, double taps, rotate/resize, keyboard-only, reduced motion, dark/light | qa-tester writes the record |

## Running

```sh
npm run build                     # QA runs against the production build
npm run qa                        # all lessons, phone + desktop
QA_ONLY=merge-sort-payoff npm run qa
npm run company -- qa-record      # turn test-results/qa-report.json into review records + evidence links
npm run walkthrough -- merge-sort-payoff
```

If Playwright cannot find Chromium, set `PW_CHROMIUM_PATH` to the browser binary.
For parallel agents, use `NEXT_DIST_DIR`, `QA_PORT` and `QA_OUT` so builds and reports do not collide.

## Exploratory checklist (write results to `company/reviews/<slug>/<date>-qa.md`)

- [ ] Tap every control twice quickly. Does state stay consistent?
- [ ] Use controls in an order the builder did not intend (reset mid-way, max then min).
- [ ] Phone (390 × 844), small phone (360 × 640), desktop. Does anything clip?
- [ ] Keyboard only: Tab to options, Space/Enter to commit, arrows on sliders.
- [ ] `prefers-reduced-motion` and both colour schemes.
- [ ] Reload mid-lesson: does it restart cleanly?
- [ ] In the feed: swipe away mid-lesson and back.

## Accessibility (accessibility-reviewer)

Every SVG stage has `role="img"` and an `aria-label` describing what it shows *now*. Meaning is
never carried by colour alone. Contrast is checked in both themes. Each control has a visible
label or an `aria-label`.

## Proposing a new contract check

Write it as a failing test in a branch, show which current lessons it would fail and why that is
right, and file an amendment (`rituals/templates/amendment.md`). The evaluation steward prepares
it and the constitutional review board decides.
