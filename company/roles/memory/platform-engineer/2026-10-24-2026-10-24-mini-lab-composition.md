### 2026-10-24 · 2026-10-24-mini-lab-composition · platform-engineer
- did: Exposed composable useMiniLab, MiniLabStage and MiniLabReveal so lesson wrappers render real kit Lesson/Control elements; wired test:mini-lab into verify before publication tests.
- learned: The protected company static checker inspects each Demo.tsx directly for actual Lesson and Control use; delegating the whole contract through a domain adapter fails it (src/lib/mini-lab/README.md).
- know: Composition retains the reviewed state transitions, witnessed-case gate and presentation logic; only the wrapper ownership boundary changed (src/components/mini-lab/TraceLesson.tsx).
- open: Final integrated browser QA and independent tier-2 operational approval remain (company/engineering/readiness/2026-10-24-mini-lab-composition.md).
