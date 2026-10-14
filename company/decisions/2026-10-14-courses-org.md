# Decision: a Courses org in category management

owner: head-of-product · date: 2026-10-14 · status: accepted (founder request) · decided by: founder ("Do the Networks, Crowds, and Markets vertical. Add a courses org in category management. Get the book (category manager), then develop demos; we aim at good coverage of things that could have demos.") · drafted by: chief-of-staff (Ada)

## What
- **courses-lead** (Amara): Head of Courses, team `courses`, reports to head-of-product. Adopts works (content/works.json) as courses, staffs one course manager per work, sets coverage targets.
- **cm-course-ncm** (Jonah): Course Manager for *Networks, Crowds, and Markets* (easley-kleinberg-2010), reports to courses-lead. Owns `content/courses/ncm/chapters.json` (every chapter and section → concepts, demo-able or not with a reason, covering lessons), briefs for gaps in `company/courses/ncm/briefs.md`, and `company/courses/ncm/coverage.md`.
- Room: "Courses · Books" on floor 3, next to Strategy.

## Why a separate org, not a strand
Subject categories own *what is true in a subject*. A course owns *a sequence someone else wrote*, cutting across categories. NCM touches math (graphs, balance), probability (cascades, power laws), economics (games, auctions, markets), CS (web, PageRank) and life (epidemics). One owner per book keeps coverage and order visible. Otherwise five strand managers each see a fifth of it.

## What it takes from existing roles
- **Strand managers** keep their concepts. A course concept that belongs to a subject is added to that subject's `content/curriculum/<domain>.json` (tagged `course: ncm`), and the strand manager is told on the board. The strand manager may object to placement.
- **principal-pm-verticals** (Selin) keeps the vertical's strategy (`company/product/verticals/networks-crowds-markets.md`). The course manager executes coverage. Batch 1 (S2-01..S2-23, session 2) stays as planned. The course manager briefs only gaps beyond it.
- **personalization-lead** still owns the learning path. The course map is its input.

## Source rule
The book is a map, never a source of learner text, figures or exercises. The free draft is on the authors' site. The cloud environment's network policy currently blocks cs.cornell.edu and the mirrors, so the chapter and section titles come from search snippets and the published table of contents. Every section number stays `unconfirmed` until someone with access checks it (open: the founder can allow the host).

## Objections
Both directs consulted agree with changes. Each change is adopted, and tools/org/roles.mjs is updated:
1. **Order and targets** (Priya, Leonie): courses-lead *proposes* targets and order. The head of product approves them, and course briefs compete for the lesson slots allocated at cycle-planning. For NCM, Selin's vertical doc decides concept order. The courses org owns section coverage and book order, and course maps are now one of Selin's inputs.
2. **Strand ownership** (Leonie): the course manager *proposes* concepts (`course: ncm`, `proposed: true`, plus a board item), and the strand manager accepts or objects. Disputes go to the category lead, then the head of product.
3. **Brief routing** (Leonie): `tools/claim.mjs` reads only company/domains/briefs/. Rather than changing the tool, a course brief is copied into the owning strand's briefs file under "Course: NCM" once the strand manager has re-checked its answer, and builders claim it from there. Kenji may later choose to teach claim.mjs about course files.
4. **Learning path** (Leonie): it stays with personalization-lead, and the course map is an input to it.
5. **Denominator** (Priya, Leonie): courses-lead reviews every `demoable: false`, and a strand manager or Selin spot-checks them. Coverage comes from `node tools/meta.mjs coverage`, is reported as an input metric, and is never counted as Surface Value.
6. **Unconfirmed sections** (Priya): no `curriculum.references` row may cite an unconfirmed section number. While the book host is blocked, rows cite the chapter only.

## Consulted
- **head-of-product (Priya):** Agree with changes. Placement under me is right: courses-lead reports to head-of-product, beside principal-pm-verticals, with subject concepts staying with strand managers. Changes:
  1. **Order and targets.** For a work that is also a vertical (NCM), Selin owns which concepts and in what order in `company/product/verticals/networks-crowds-markets.md`. The course map is her input, not a rival plan. Change courses-lead's "Set course coverage targets and order" to "propose; head-of-product approves, and the vertical doc wins where it disagrees."
  2. **Slots.** Course briefs get no lane of their own. They compete for the cycle's lesson slots I allocate at cycle-planning, and the exploration budget is held back from them. Add "Allocating lesson slots (head-of-product)" to courses-lead's out-of-scope.
  3. **Honest denominator.** The ≥80% target divides by sections the course manager marked `demoable` himself. Every `demoable: false` needs a reason that a strand manager or Selin spot-checks at vertical-review. Coverage is an input metric, never Surface Value, and the WBR reports it next to learner results, not in their place.
  4. **Placement disputes.** If a strand manager objects to where a concept goes, that category's lead decides in writing on the board. If that does not settle it, it comes to me. Separately, a `curriculum.references` row may not cite a section number that is still `unconfirmed`.
- **chief-of-staff-ceo-office (Leonie):** agree with changes. A book cuts across five strands, so one owner per work is a real flow, not a role added to patch process. Five changes before generating: (1) **Handoff not wired:** `tools/claim.mjs` only reads `company/domains/briefs/`, so briefs in `company/courses/ncm/briefs.md` never reach a builder. Either the approved course brief moves into the owning strand's briefs file, or claim.mjs learns course files (Kenji's call). (2) **Strand managers:** the course manager *proposes* a concept and brief on the board. The strand manager accepts it into `content/curriculum/<domain>.json` or objects, and the category lead settles disputes. Today cm-course-ncm writes into files the strand managers own. (3) **principal-pm-verticals:** Selin owns which vertical, its audience, metric and kill criteria. Courses own section coverage and book order. Remove "and in what order" overlap by adding course maps and coverage to Selin's inputs, which today has no link back. (4) **personalization-lead:** drop "the course learning path" from courses-lead's scope. The course map is an input to the path, as this record already says. (5) **Who reviews the course manager:** courses-lead reviews the map, sampling every `demoable: false` call, since those shrink the denominator. The owning strand manager reviews each brief and re-runs its node-checked answer before the brief can be claimed. Coverage numbers come from `node tools/meta.mjs coverage`, not hand-typed. Lessons then go through the normal fact-checker, learner review and QA.
