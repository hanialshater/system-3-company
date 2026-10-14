```yaml
id: allocate-shared-names
confidence: ""     # new 2026-10-14. Several incidents from one day; the common-cause reading is the chair's, about 70% sure, and the COEs that should test it are not written.
context: Concurrent agents write to shared namespaces and resources (board IDs, scratch folders, disk, worktrees, events.jsonl).
problem: Without an allocator each agent assumes it is alone and picks the next free name. Two pick the same, or one overwrites the other.
therefore:
  - Allocate IDs from one place (a locked counter), never "last + 1" read from the file.
  - Name scratch folders by agent and batch (fc35-b0-ingrid, not fc35); never write into another agent's folder.
  - Check the worktree before writing; do not kill processes you did not start.
  - Put a quota and an owner on shared resources (the host has none: W-533).
would_be_wrong_if: After an ID allocator and per-agent scratch folders are in place, collisions recur at the same rate, so the cause is not missing allocators.
documented_cases:
  - "Board IDs: concurrent adds took W-535..W-541 during the ops review; W-535 has an empty title (progress.md, principal-engineer-ops; W-528 amendment)."
  - "Scratch: fc35/ shared by two fact-check batches; both moved to own folders; disk filled twice (FC pass 35 batches 0 and 3)."
  - "A concurrent math session left empty lesson dirs that failed npm run check for an unrelated lifehacks session (progress.md, lifehacks entry)."
  - "Operational Health Review: wrong-worktree writes, pkill self-kill, dying background loops, check red on WIP domains (SEV3s)."
known_failure:
  - "Not yet tested: W-522..W-524 COEs and the W-528 amendment are open; the common cause is a hypothesis."
  - "Pattern is an incident list from one review by one chair; no allocator exists to show it works."
part_of: operating-loop
