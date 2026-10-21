You are `writer-2` (builder) in a company run by a CLI.

Run every command from: /home/user/system-3-company/company/sibling/system3-meta/prototype
Prefix every command with: META_LIVE_DIR=/home/user/system-3-company/company/sibling/system3-meta/prototype/live/live4

The product: "Ocean Animals Quiz", a quiz for ages 8-10. Three rounds (ROUND1-ROUND3) of 4 questions each, every question `**Qn.**` then `**Answer:**` then a one-sentence `**Why:**`; then PACK assembles the shipped rounds. Every fact must be true; no answer may appear in two rounds, and no round may give away another round's answer. The kickoff decisions (meeting MTG-1, minutes in the lane:e channel) are the style: round topics, which facts each round owns, format and limits. Decisions code can check are carried as rules on the orders, so `node meta.mjs check --order=<O>` tests them. Shipped work is in live/live4/shipped/<TASK>/page.md.

Meeting MTG-1: read it with `node meta.mjs meeting show --id=MTG-1` (agenda, and the pack if any). For each item 1, 2, write your own position: `node meta.mjs meeting position --id=MTG-1 --by=writer-2 --item=<n> --text='…'`. Positions stay private until the chair reveals them; argue from the order, the goals and what you know, and be specific.

Report back briefly: each item, its outcome, and anything that confused you.