# Review: 2026-10-14: HQ Library (/hq/library), W-455, commit 2666844

owner: tools-lead · board: W-455 · author: hq-engineer · verdict: **approve with changes** (keep it live for local use; changes C1 to C5 go to hq-engineer)

Surface: `src/lib/hq-library.ts`, `src/app/hq/library/` (Library.tsx, Markdown.tsx, page, css), `src/app/api/hq/library/` (search, doc), the search box in `src/app/hq/HQ.tsx`, and `tests/hq/library.test.mjs`.

How I reviewed: artifact first, then code. I used headless Playwright on the dev server (:3530) at 1280x900 and 390x844. I ran the searches "launch review", "Vercel", "AMD-002" and "ci", tried every type chip, opened docs, followed links in docs, used the back button on the phone, and searched from the floor-plan box. I sent 14 traversal and secret requests to both routes. I measured cost in node with the real `company/` tree. I counted the markdown constructs the corpus actually uses. I read the author's progress entry only after my findings were written. `npm run test:hq`: 6/6 pass. Probe scripts and screenshots are in my scratchpad and were not committed.

## What works (checked, not taken on trust)

- **Search is useful on the founder's three queries.** "launch review": the 2026-10-13 launch review is first, then the launch-review template, then waves A and C. "Vercel": the eng review, the decision, the progress entry, the stack decision, the runbook and EDD-002 are all in the top 6. "AMD-002": the amendment is first and its progress entry second. AND-of-terms plus the phrase bonus does what it should.
- **Path guard holds.** `../package.json`, `..%2F.env.md`, `/etc/passwd`, `constitution/protected-paths.txt`, `ops/../../CLAUDE.md`, `ops/board.json`, `%252e%252e`, `%2e%2e` path segments, a NUL suffix and an unknown progress slug all return 404. Malformed percent-encoding returns 400 (from Next). Only `.md` under `company/` is served, symlinks are skipped by the walk and re-checked with realpath, and nothing gitignored under `company/` is markdown (only `ops/claims/*.json`). Search hits carry snippets only, never bodies.
- **Phone, 390 px.** No horizontal overflow on the list or the reader, tables scroll inside their own box, list and reader swap, and "← Results" returns to the list. Floor-plan search (Enter) lands on `/hq/library?q=AMD-002`. Links between docs open in the reader, and owner and room chips go to `/hq?room=`. No console errors from HQ. One build-error overlay came from a builder's unfinished lesson (`shake-faster-same-speed` is missing styles.module.css). That is not HQ.
- **No markup injection.** The renderer builds React elements only. There is no `dangerouslySetInnerHTML`, and the highlight regex escapes the query terms.

## Findings

### 1. Type rules: the big buckets are right; reviews, templates, design and experiments are not
Counts today: Handbook 271, Strategy 67, Decisions 25, Reports 23, Tech design 22, Constitution 5, Courses 3, Reviews 3, Requirements 1, Progress 113 (one per entry), Lesson reviews 4,580.
- Reports (all 23 files in `rituals/records`), Decisions, Constitution and Progress are correct as they stand.
- **Reviews are split across three buckets.** `engineering/reviews/*` is in Tech design, `design/reviews/*` (5 files) is in Handbook, and only `company/reviews/*.md` is in Reviews. A founder who filters to Reviews sees 3 docs. This review will land in Tech design.
- **Templates are mixed in with real docs** (22 files: `rituals/templates/*`, `*/TEMPLATE.md`). "Launch Review: {{date}}: <slug>" ranks 2nd for "launch review", and the ADR and EDD templates count as Tech design.
- **Design is hidden in Handbook.** Handbook is 271 docs, and about 110 of them are design work (`design/specs` 68, `design/concepts` 27, `design/illustration-requests` 9, plus `design/*.md`). That makes Handbook the junk drawer the founder wanted to get away from.
- **Experiments** (`experiments/EXP-*`) are in Handbook. They are dated records with results, so they belong in Reports, or in their own bucket.
- **Strategy contains standards.** `product/demo-standard.md` and `product/lesson-metadata.md` are the lesson requirements, and the "PRDs and BRDs" bucket has only PRD-001. `product/pm-handbook.md` is handbook material. The rest of Strategy is right: domains, briefs, verticals, roadmap and vision.
- The BRD rule is untested on real data (none exist), as the author says. That is harmless.

### 2. The deny list hides real docs
`DENY` matches `secret|token|password|credential` anywhere in the path. Today it hides all 8 review files of the lesson `paint-mix-shared-secret` (`reviews/paint-mix-shared-secret/*`), and it will hide any future lesson about passwords or tokens (cs.security exists). Everything served is committed markdown under `company/`, so name-based secret filtering protects little. The real risks are traversal and non-markdown files, and both are already covered. The deny list should match only dotfiles and basenames that look like secret files.

### 3. Search: short terms match inside words
Terms match as substrings. For "ci", 396 docs match, and AMD-002 (the CI amendment) ranks 4th behind docs that only contain "ci" inside "decision" or "acids". The same will happen with "qa", "pr", "ui" and "edd". Ranking for words of 4 or more letters is fine.

### 4. Progress-entry deep links are not stable
`splitProgress` numbers duplicate slugs in file order, and new entries go at the top. So when a new entry gets the same 70-character slug as an existing one, every older entry with that slug moves from `-N` to `-(N+1)`, and a saved link silently opens a different handoff. This already happens 3 times (`...learner-evaluator-round-8-learner-reviews-r8-build-5-walkth-2/-3/-4`). For the mission ("what it did at any past moment"), this is the one finding that matters most.

### 5. Markdown renderer: good enough; two defects on real docs
I checked the corpus. Raw HTML appears in 4 non-lesson docs, all inside code. There are 0 reference links, 0 nested quotes and 1 footnote. Task lists (13 docs) render as literal "[x]", which reads fine. Nested and resumed ordered lists in `rnd/evolution/knots-gen2.md` render correctly. Defects:
- **YAML frontmatter** (45 docs, all `design/concepts/*`) renders as a rule, then a run-on paragraph ("id: debunk name: Debunk (Life Hacks) kind: format status: …"), then a rule. Because the H1 is no longer the first block, it is not suppressed, so the title also shows twice (pane title plus an H2).
- **Table cells break mid-word** ("evaluation-" splits as "evaluatio / n-" in the launch-review objections table at 1280 px). The cause is `.md { overflow-wrap: anywhere }`, which also lowers the cells' min-content width.
- Hardening, not seen broken: `<ol>` ignores the starting number, so a list that begins at "3." after a paragraph shows "1.".

### 6. Cost of caching ~5,100 docs: acceptable for a local, single-user tool
Measured in node on the real tree (5,114 docs, 12.2 MB of markdown):
- Cold build: 0.56 s. The author saw about 3 s under the dev server.
- Heap: about 53 MB. This includes 24 MB of strings, because `body` and its lowercase copy `low` are both kept.
- Re-walk with stat of every file when the 5 s cache expires: about 110 ms, synchronous, on the request path.
- Search: 20 to 120 ms, synchronous. It scans all 4,580 lesson-review bodies even when that type is off, because the chips show per-type match counts.
- `loadDoc`: about 2 ms.

None of this blocks shipping. It becomes a problem if HQ is served publicly (`HQ_PUBLIC=1`) to concurrent users, or when lesson reviews pass about 15,000 files. Cheap fixes if that happens: keep only `low` and slice the original text from disk on open, and count lesson-review matches only on demand.

## Changes (board items for hq-engineer: W-460 C1, W-461 C2, W-462 C3, W-463 C4, W-464 C5)

- **C1 (type rules):** All review folders go to Reviews: `engineering/reviews`, `design/reviews`, and `company/reviews/*.md` at the top level. Add a Templates type, off by default, for `rituals/templates/` and `*/TEMPLATE.md`. Add a Design type for `design/**`. `experiments/` goes to Reports. `product/demo-standard.md` and `product/lesson-metadata.md` go to Requirements, and `product/pm-handbook.md` goes to Handbook. Add one test per rule using real paths.
- **C2 (deny list):** Narrow `DENY` to dotfiles and secret-file basenames, so lesson slugs such as `paint-mix-shared-secret` are indexed. Add a test with that path.
- **C3 (search):** For terms of 3 letters or fewer, match on word boundaries (title, headings, path and body). Lower templates in the ranking (or this follows from C1, since templates would be off by default). Test: "ci" returns AMD-002 first.
- **C4 (stable progress links):** Number duplicate progress slugs from the bottom of the file (oldest entry gets the base slug), so adding a new entry never changes an existing link. Add a test that adds a duplicate at the top and checks that the old paths still resolve to the same text.
- **C5 (renderer):** Strip leading `---` frontmatter, show it as a metadata line, and use its `owner` and `status` in `describe()`. Give table cells `overflow-wrap: break-word` instead of `anywhere`. Emit `start` on `<ol>`.

## Decision on a markdown library: not now (no decision record needed)

The in-house renderer is about 190 lines. It covers what `company/` uses, and it has a property worth keeping: it cannot emit raw HTML. A library such as react-markdown plus remark-gfm would bring in dozens of transitive packages and need its own sanitising configuration. It would fix only the frontmatter case, and C5 fixes that in about 15 lines. **Revisit trigger:** if, after C5, the founder or a worker reports three more rendering defects on real docs, or if docs start to need footnotes, HTML or math, the hq-engineer writes the decision record then, with this review linked as the objection to answer.

## Open objections

- O1 (tools-lead, C4): stable deep links into the progress log are part of "what it did at any past moment". Until C4 lands, quote progress entries by date and role, not by Library URL.
