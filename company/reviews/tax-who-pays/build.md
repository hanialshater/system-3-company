# Build note: tax-who-pays

builder: demo-builder · 2026-10-13

- Intent: one price ladder. The $2 tax is a gap from "bakers keep" to "buyers pay", split at the old $6 line into the buyers' share and the bakers' share.
- Milestones: tax collected from bakers, and from buyers, each at the usual buyer slope (b = 10). The two buttons come first in DOM order, so QA reaches both.
- Model: demand A − b·p with A = 40 + 6b, so the untaxed price stays $6 at every slope; the brief's 100 − 10p is b = 10. Slopes 5/10/20 are my choice (buyers' share 1.33/1.00/0.67), disclosed in c4.
- Collected-from-buyers is solved separately (supply(p) = demand(p + 2)), not copied from the bakers case, so the equal split is computed, not asserted.
- QA fix: "Tax on buyers" changed no number (that is the lesson), so QA called it dead. The SVG now says who pays the $2. Labels trimmed to stay at or under 25 words.
- Dropped from the brief: nothing. The reveal names the slopes the learner tried.
