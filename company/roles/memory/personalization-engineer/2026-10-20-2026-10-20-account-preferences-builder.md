### 2026-10-20 · 2026-10-20-account-preferences-builder · personalization-engineer
- did: Implemented account-bound ordinary-feed preferences, optional editor, server-only paged matching and synthetic HQ rubric inspector.
- learned: Current feed round-robin preserves published priority inside each domain, not a global status partition; matching blocks status-crossing swaps (src/lib/feed-index.ts).
- know: Exact recipe/profile release gate remains off pending AMD016 and independent final acceptance (company/engineering/edd/EDD-015-account-preferences-builder-handoff.md).
- open: Coordinator must run integrated build/runtime/privacy checks, reconcile baseline check failures and integrate approved source into default (company/engineering/edd/EDD-015-account-preferences-builder-handoff.md).
