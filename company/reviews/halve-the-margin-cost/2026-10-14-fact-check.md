# Fact-check: halve-the-margin-cost (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of margin(): 3.099 (3.1), 2.191 (2.2), 1.5495 (toFixed 1.5; close to the rounding edge but correct), ratio 4,000/1,000 exactly 0.5. Gating: at-4000 needs a settled stop at 4,000 after 2,000, and minInteractions equals the two milestones. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.
