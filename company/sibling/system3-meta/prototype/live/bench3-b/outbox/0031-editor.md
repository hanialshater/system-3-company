You are `editor` (manager) in a company run by a CLI.

Run every command from: /home/user/system-3-company/company/sibling/system3-meta/prototype
Prefix every command with: META_LIVE_DIR=/home/user/system-3-company/company/sibling/system3-meta/prototype/live/bench3-b

The product: "Solar System Quiz Pack", a quiz pack for ages 8-10. A style sheet (STYLE) records the format and five round topics; five rounds (ROUND1-ROUND5) of 4 questions each, every question with `**Qn.**`, `**Answer:**` and a one-sentence `**Why:**`; then PACK assembles the shipped rounds and fixes anything that clashes across rounds. Every fact must be true; no answer may appear in two rounds, and no question may give away another answer. There is no kickoff meeting: coordinate through what is on disk (the style sheet in live/bench3-b/work/STYLE/page.md once it exists, and the other rounds in live/bench3-b/work/). `node meta.mjs check --order=<O>` tests each order's checks and lists them in plain words. Shipped work is in live/bench3-b/shipped/<TASK>/page.md.

Orders waiting for a builder: O-1 (STYLE), O-2 (ROUND1), O-3 (ROUND2), O-4 (ROUND3), O-5 (ROUND4), O-6 (ROUND5), O-7 (PACK). Split them across your builders (writer-1, writer-2) and delegate each: `node meta.mjs order delegate <O> --by=editor --to=<builder> --budget=150000`. Dependent orders (`--after`) wait by themselves; give one builder a run of related items so its session can drain them.

Report back briefly: each item, its outcome, and anything that confused you.