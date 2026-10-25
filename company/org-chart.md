# Org chart

> **Since 2026-10-25 (restructuring, F-50 option A, company/decisions/2026-10-25-founder-restructuring.md): 39 roles; 34 after F-52 G2 (company/decisions/2026-10-25-founder-f52.md), with head-of-strategic-initiatives and vp-marketing scheduled to park on 2026-11-23 and rnd-lead if F-49 is declined.** The drawing below is from before that date and is kept for history. The org as data is `tools/org/roles.mjs`, and `company/roles/README.md` lists the active and parked roles. Reporting lines now:
>
> | Manager | Reports |
> |---|---|
> | founder | chief-of-staff, chief-of-staff-ceo-office, head-of-product, evaluation-steward, principal-engineer, head-of-strategic-initiatives, vp-marketing |
> | head-of-product | principal-pm-verticals (lane S), design-lead (lane M), platform-engineer, release-manager, analytics-steward, research-scientist, personalization-engineer, growth-designer (lane 14, F-52) |
> | principal-pm-verticals | category-curator (pool, category as data), demo-builder (pool) |
> | design-lead | interaction-designer |
> | evaluation-steward | fact-checker, learner-evaluator, qa-tester, accessibility-reviewer, pedagogy-critic, route-reviewer (pool), personalization-eval (F-52) |
> | principal-engineer | principal-engineer-ops, backend-engineer, privacy-reviewer, rnd-lead |
> | chief-of-staff | tools-lead (and hq-engineer under it), pattern-librarian |
> | chief-of-staff-ceo-office | portfolio-manager |

```text
                                 Founder (human)
                     desire layer · Surface Value · constitution
                                       │
          ┌────────────────────────────┼─────────────────────────────┐
   Chief of Staff               Head of Product               Evaluation Steward
 (operator / Deep Mode)     vision · roadmap · PRDs      harness · gates · independence
          │                            │                             │
   Pattern Librarian   ┌──────────────┼──────────────┐         ┌─────┴──────────────┐
                       │              │              │         │ Quality (System 3) │
              Category managers    Studio        Platform      │ Fact-Checker       │
              cm-math              Learning      Platform Eng. │ Learner Evaluator  │
              cm-cs                 Designer     Release Mgr   │ Pedagogy Critic    │
              cm-probability        ├ Mockup                   │ Computer-Use QA    │
              cm-physics            ├ Researcher               │ Accessibility      │
              cm-ai                 └ Demo Builder             └────────────────────┘
              cm-economics
              cm-life              Insight
              cm-chemistry         Analytics & Experiment Steward
              cm-geography
              Domain Scout

   Company Tools (→ Chief of Staff)      Engineering (→ Principal Engineer)      Growth (→ Head of Product)
   Tools Lead                            Principal Engineer                      Growth & Gamification Designer
   └ HQ Engineer                         ├ Backend Engineer
                                         └ Privacy & Safety Reviewer
```

Quality reports to the Evaluation Steward, who reports to the founder, not to product. Builders cannot
promote their own work, and the people who judge it do not work for the people who want it shipped.

## How a lesson moves

```text
 brief            design            mockups          build            checks (isolated)          launch
 cm-<domain> ──▶ learning-   ──▶ mockup-artist ──▶ demo-builder ──▶ qa-tester          ──▶ launch-review ──▶ release-manager
 (board item)    designer        (optional)        (status:review)  fact-checker            (gates pass)       (publish, deploy)
                 ▲  researcher (only when the work      │           learner-evaluator
                 │  produced a question)                │           pedagogy-critic (pairwise)
                 └──────────── findings, phrased as problems ◀──────accessibility-reviewer
```

The arrows are typical, not a pipeline. The chief of staff picks the next move from the evidence.
It might be another build, research, a mockup, killing the branch, or sending the lesson to a
real learner.

## Teams and what each optimises

| Team | Optimises | Must never |
|---|---|---|
| Leadership | Choosing the right problems; keeping the loops honest | Approve its own amendments without the board |
| Categories | What to teach next; an honest map | Count simulated reviews as learning |
| Studio | Lessons that teach the payoff | Verify its own claims, edit the judge |
| Quality | Independent evidence, fast | See the builder's account before the artifact |
| Platform | Builders never touch plumbing | Rename the QA contract's test ids |
| Insight | What numbers mean; patterns that can lose | Report a result whose prediction wasn't committed |

All 26 roles: [roles/README.md](roles/README.md).
