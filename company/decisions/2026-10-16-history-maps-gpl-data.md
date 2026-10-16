# Shipping GPL-3.0-derived historical map data (PR #4, History maps 100)

owner: **founder** (decides whether the company accepts GPL-3.0 for this data, and which option below) · engineering side written by: principal-engineer (Kenji) · board: W-1557
date: 2026-10-16
status: **proposed: awaiting the founder's decision.** Nothing is decided by this record. PR #4 does not merge until the founder has decided (engineering review M1, [2026-10-16-pr4-engineering-review.md](../engineering/reviews/2026-10-16-pr4-engineering-review.md)).
class: engineering, licence (best-practices item 11: "Anything beyond individual facts needs a decision record", `company/engineering/best-practices.md:15-20`)

**This record is not legal advice, and it gives none.** It states what ships, where and in what form, what the licence text has sections about, and what engineering can build for each option. Whether an obligation applies, and what is enough to meet it, are legal questions for the founder, with counsel if the founder wants one.

## Context

PR #4 adds 100 draft History lessons. Each lesson's `map.json` is generated in bulk from `aourednik/historical-basemaps` at commit `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`, using 25 `geojson/world_<year>.geojson` snapshots (`tools/history-maps/sources.json`, SHA-256 pins). The upstream `LICENSE` is the GPL-3.0 text, and a byte-identical copy is committed at `src/lib/history-maps/DATA-LICENSE.txt` (SHA-256 `8ceb4b9e…5b903` in both). The community engineer reproduced all 300 generated files byte for byte from the pinned checkout (`company/engineering/community/prs/4.md` §1). I did not: this session has no access to the upstream repository.

**What "derived" means here, mechanically** (`tools/history-maps/generate.mjs`):

| Step | Code |
|---|---|
| Read each pinned snapshot; normalise polygon ring direction without moving a coordinate | `:24-31`, `tools/history-maps/geometry.mjs` |
| For each lesson, project every feature with a NAME into a Mercator window around two points, clip to the 360×192 viewBox, round to 0.1 px, emit SVG path strings | `:83-102` |
| Copy the feature's NAME (and ABBREVN) labels, the feature indexes, the source URL and hash | `:92-94,101,103` |
| Coastline: Natural Earth 1:110m land, already in the repository and not from this source | `:37-42`; ADR-002 |

So each `map.json` holds transformed geometry plus verbatim labels for every source feature in its window, not only the two features the lesson asks about: 1,971 shapes in all, 1,689 of them context ("other") features.

## What ships, and where (engineering facts)

| Channel | What | Since | Licence text with it? | Visible attribution? |
|---|---|---|---|---|
| Public GitHub repository `hanialshater/system-3-company`, branch `feat/history-maps-100` (PR #4) | the 100 `map.json` (1.59 MB), the generator, `sources.json` pins, `DATA-LICENSE.txt`, README | **already**, since the PR was pushed (2026-10-16). The repository is public (`gh api repos/hanialshater/system-3-company`: `"visibility": "public"`, `"license": null`). `package.json` `"private": true` only stops npm publishing | yes, in `src/lib/history-maps/` | README credits "André Ourednik and contributors" |
| Base branch, after a merge | same files on the default line of development; they stay in git history even after a revert | at merge | yes | same |
| Production web app (Vercel), at the next founder-approved deploy after merge | 100 client JS chunks under `/_next/static/chunks/`, one per lesson, each holding that lesson's `map.json` compiled together with our `HistoryMapStage` and kit `Lesson` code. 2.39 MB raw in a webpack build of `57aef500` (`.claude/worktrees/pr4-a11y/.next-a11y`). **Shipped although every lesson is a draft:** `src/demos/loaders.generated.ts` has a static `import()` per lesson whatever its status, and every page loads the bundler runtime that maps each chunk id to its file | next deploy after merge | **no.** `DATA-LICENSE.txt` is not imported or served | no on lesson pages (the stage caption reads "Area anchors · Approximate reconstruction · Mercator"). Each chunk contains the upstream repository URLs and commit (`frames[].source.url`, `sourceCommit`). The `/history-maps` footer credits Ourednik, but that route is a 404 in production while all cases are drafts |
| Previous production deployments | a Vercel deployment keeps its static files until that deployment is deleted; reverting the code does not withdraw them | from the deploy | — | — |
| Learner-facing claims (when a lesson is visible) | each meta's `maps`/`comparison` claims cite the upstream URLs and hashes; claims reach the page through `publicMeta` | only when a lesson is visible (none is in production) | no | URL only |

## What the licence text has sections about (no interpretation)

The GPL-3.0 text in `DATA-LICENSE.txt` has sections on "Conveying Verbatim Copies" (§4), "Conveying Modified Source Versions" (§5, which mentions notices that the work was modified and a relevant date, and licensing the whole work under the licence), "Conveying Non-Source Forms" (§6, which concerns making "Corresponding Source" available), and definitions of "Source Code", "Corresponding Source" and "object code" (§0–§1). Four questions follow, and they are for the founder (and counsel), not for engineering:

1. Is shipping these derived paths in a public web app, and hosting them in the public repository, something the company accepts under GPL-3.0?
2. Which of our files form "the work" for this data: `map.json` alone, the per-lesson chunk that bundles it with our code, or more? (The bundler places data and code in one file today. Engineering can separate them, see A3.)
3. Is a compiled `map.json` a source or a non-source form, and if non-source, what counts as its Corresponding Source: the upstream files at the pinned commit, our generator, or both?
4. What attribution and notices must a learner-visible lesson carry?

## Options considered

**A. Accept GPL-3.0 for this data and ship it with engineering measures.** If the founder accepts, these are the measures engineering can build. Which of them are required is the founder's call.
- **A1 Licence and notice served with the app:** serve the GPL-3.0 text and a NOTICE (source, pinned commit, list of modifications from the table above, date) at a stable public URL, for example `/licences/historical-basemaps`. Small; a static route, so tier 2 by the `added` rule. platform-engineer.
- **A2 Attribution on every map lesson:** a credit line on the stage or in the trust sheet ("Map data: André Ourednik & contributors, Historical Basemaps, GPL-3.0") linking to A1. One line in `HistoryMapStage.tsx`, inside the stage word budget. platform-engineer with design.
- **A3 Data kept separable from code:** emit each `map.json` as its own static file, and have the stage load it, instead of compiling it into the lesson chunk. The interaction stays offline after load, at the cost of one extra request per lesson. This is only needed if the answer to question 2 makes the boundary matter. platform-engineer, tier 2 (an EDD addendum, since it changes how a lesson loads).
- **A4 Corresponding source:** the generator, `cases.mjs`, `geometry.mjs` and `sources.json` are already in the public repository, and the upstream snapshots are public at the pinned commit. If more is needed (for example a mirror of the 25 pinned upstream files, or a written offer), engineering can add it to the NOTICE. platform-engineer.
- Cost: A1+A2+A4 is about a day of platform work plus one design check; A3 is about a week with QA.

**B. Keep the data out of production until the founder decides, and decide later.**
- **B1 Do not merge PR #4 yet.** Zero engineering cost. The lessons stay on the PR branch and the review conditions keep. It does not change the GitHub channel, where the data is already public.
- **B2 Merge, but hold every production deploy until the decision.** Not recommended: it blocks all other work's deploys on one licence question.
- **B3 Merge, and keep draft lessons out of production bundles** (the registry emits loaders only for statuses a production build may serve). This is right for scale anyway (PR #4, #5 and #6 engineering reviews, F11 in each), but the registry generator is `tools/company.mjs`, a protected path, so it needs an amendment and an EDD-003 addendum. It is weeks, not days, and once one case leaves draft, the question returns.

**C. Change the source or the design so no bulk GPL geometry ships.**
- **C1 Labels-only stage.** Ship, per lesson, only the NAME labels at the two points in the two years (four short facts), with the public-domain Natural Earth coast and the dots, and no historical polygons. Best-practices item 11 allows individual facts read from an uncleared source when the source file says so. Engineering cost: small (the generator writes fewer fields, the stage draws no fills). The real cost is pedagogical: the overlay and the context outlines go away. That needs learning-designer and cm-history before any build.
- **C2 A differently licensed dataset.** Candidates to evaluate. **I have not verified the licence or coverage of any of these**; research-lead checks before anyone builds. CShapes 2.0 (state borders, which as I understand covers about 1886 onward, so it would not cover most of the 100 cases); Euratlas (Europe, commercial licence); regional academic gazetteers. None is known to be a drop-in replacement for 100–1994 CE worldwide.
- **C3 Our own schematic regions.** Hand-authored, coarse polygons per case, each traced from cited facts and drawn by our code (best-practices item 11's pattern). This is large content and research work for 25 snapshots, and owned by cm-history and research-lead, not engineering.
- **C4 Ask the upstream author for a separate licence for the data.** Not engineering's; listed for completeness.

**Do nothing (merge as is, deploy later).** Rejected by engineering: it ships the data to production with no licence text and no attribution on the lessons (table above), with no decision anyone owns.

## Engineering recommendation (not the decision)

B1 now. Do not merge until the founder decides. It costs nothing and keeps every option open. Then:
- if the founder accepts GPL-3.0 for this data: A1, A2 and A4 before merge, A3 only if the answer to question 2 needs it;
- if not: C1 is the cheapest path that keeps the 100 cases, subject to learning-designer and cm-history; otherwise the PR goes back to the contributor (community-engineer requests changes).

Separately from this PR: the public repository has no licence of its own (`"license": null`). That is the founder's question too, and it matters for every third-party file in the tree, not only this one.

## Decision

**Pending: founder.** Write the decision here, with date and option. It is not inferred from any agent message.

## Rests on

- `tools/history-maps/generate.mjs`, `tools/history-maps/sources.json`, `src/lib/history-maps/DATA-LICENSE.txt` (read at `57aef500`)
- `src/demos/loaders.generated.ts` (unconditional per-lesson `import()`), `src/components/DemoHost.tsx:6`, `src/lib/visibility.ts:21-33`
- Chunk measurements: `.claude/worktrees/pr4-a11y/.next-a11y/static/chunks/` (100 files with map data, 2,391,608 bytes; runtime `webpack-*.js` lists every chunk hash). Webpack build, not mine. A Turbopack production build may split differently; the fact that the data ships does not depend on the bundler
- Repository visibility: `gh api repos/hanialshater/system-3-company` on 2026-10-16
- Provenance reproduction: `company/engineering/community/prs/4.md` §1 (testimony; not re-run by me)

## Revisit if

- The founder's decision names an option. Then the chosen option's conditions go into the PR #4 merge conditions.
- Upstream changes its licence, or offers the data under another licence (C4).
- B3 (drafts out of production bundles) lands for other reasons. Then the production channel closes for drafts, and only the GitHub channel and published lessons remain.
- Any other lesson set proposes bulk data from a GPL or unclear source. It gets its own record. This one is not precedent.

## Objections

| Objection | Raised by | Kind | Status |
|---|---|---|---|
| "Drafts are invisible in production, so nothing is distributed by merging" | anticipated (PR #4 README: "Drafts remain unavailable in production") | evidence | Rejected: listing and routing are gated, bundling is not (table, row 3) |
| "The data is already public on GitHub, so the decision is moot" | principal-engineer (self, for the founder) | evidence | Open for the founder: it is true for the GitHub channel. The production channel adds files served without the licence text or attribution. Whether the GitHub channel needs action now is part of question 1 |
| "A licence record for map data is ceremony; it's only drafts" | anticipated | purpose | Rejected: best-practices item 11 exists because the EDD-004 knots work met the same question with GPL tables, and this is a 1.6 MB bulk copy, not individual facts |
| "Engineering should just say whether GPL is fine" | anticipated | purpose | Declined: that is legal advice and a founder decision. Engineering supplies the facts and the options' costs |
