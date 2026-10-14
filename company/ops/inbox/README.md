# Inbox from parallel sessions

Parallel sessions don't edit `board.json`, `progress.md` or `events.jsonl`, because those files collide. Each one writes its board items and handoffs to `company/ops/inbox/session-<n>.md`, and the operating session folds them in when it merges that session's PR.

| Session | Branch | Owns |
|---|---|---|
| 1 (operator) | ccr-4c6c7654-ew9ko1 | revisions, building, review, QA, publishing, org, external PRs |
| 2 | ccr-rnd-ncm | R&D (knots gen 2 and promotion, the agent-based simulation engine and Schelling lessons) and the Networks, Crowds, and Markets vertical |
