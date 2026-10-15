# W-946: take metas (and every lesson's code and CSS) out of the client shell — design

owner: principal-engineer (Kenji) · implementer: platform-engineer · amendment: evaluation-steward · date: 2026-10-15
tier: **2** (`src/components/DemoHost.tsx` and `src/lib/catalog.ts` are tier 2 in readiness/paths.json; the generator is in protected `tools/company.mjs`). Needs: this design (it is the EDD-001 option 4 design, measured), an engineering review of the diff, an EDD-007 readiness record, and an amendment (below). No ADR: two generated files and two import lines are cheap to reverse.
Refs: W-946, W-878 and W-884 (leaks), W-607 and W-669 (lesson code and CSS on every page), W-667 and W-670 (AMD-001 (c2), option 4), [r7 readiness record](../readiness/2026-10-15-r7-drafts-trust-sheet.md) M7, [EDD-001](../edd/EDD-001-feed-at-500-lessons.md), [stage-0 note](2026-10-14-edd-003-stage0-feed-and-qa-changed.md), [re-estimate](2026-10-15-first-light-reestimate.md) (the measurements).

## 1. The problem: two leaks from one file

`src/demos/registry.generated.ts` exports both `demos` (all 960 `meta.json` files) and `loaders` (an `import()` of every `Demo.tsx`). Both kinds of consumer import the whole file:

| Importer | Side | It wants | It also gets | Measured effect (HEAD, 960 lessons) |
|---|---|---|---|---|
| `src/components/DemoHost.tsx` (`"use client"`) | client | `loaders` | every meta | a 5.39 MB (1.33 MB gz) chunk on every page, holding drafts, claim sources, `checkedBy`, "Fact-checker to confirm" and withdrawn claims (W-946, M7) |
| `src/lib/catalog.ts` (`/`, `/d`, `/api/*`, `/catalog`) | server | `demos` | every `import("./…/Demo")` | each `"use client"` lesson becomes a client reference of the page (961 project modules in `/page`'s client-reference manifest). Turbopack puts all lesson code into the page's entry chunk (3.6 MB, 1.04 MB gz, once for `/` and once for `/d`) and hoists all lesson CSS (751 stylesheets, most of `/`'s 310 KB HTML) |

The second row corrects the stage-0 note and my scalability note. The second 3.6 MB chunk is lesson code, not "the geo kit". The CSS hoisting comes from this same import, so it is not a separate problem for W-669.

## 2. The design

**Generate two files, each with a single job, and keep each on its own side.**

| File | Contains | Imported only by | Must never |
|---|---|---|---|
| `src/demos/index.generated.ts` | `import mN from "./<d>/<s>/meta.json"` for each lesson, plus `export const demos: DemoMeta[]` | `src/lib/catalog.ts` (server). catalog.ts adds `import "server-only"` (Next aliases it internally, `next/dist/build/create-compiler-aliases.js`, so it is **not** a new dependency) | contain an `import()` of a Demo |
| `src/demos/loaders.generated.ts` | `export const loaders = { "<slug>": () => import("./<d>/<s>/Demo"), … }`. No meta import, no status, no titles | `src/components/DemoHost.tsx` (client) | import any `meta.json` |
| `src/demos/registry.generated.ts` | **deleted**. Keeping it as a re-export would let the next importer bring the bug back | nobody | exist (the (c2) orphan rule fails it) |

**Where metas load from: the server, which already works today. No new endpoint.**
- Feed cards: `/` server-renders page 0 of the slim `FeedItem` index (`src/lib/feed-index.ts`). Later pages are static JSON at `/api/feed/<filter>/<page>`.
- Lesson page: `/d/<slug>` passes its one `publicMeta` (allow-list, W-947) as a prop.
- Trust sheet and revisit cards: `/api/meta/<slug>` serves static, allow-listed JSON, with no drafts on production.
- Everything reads `demos` through `catalog.ts`, and nothing on the client does. After the split, the only learner-visible copy of a meta is the allow-listed projection.

**Rejected alternatives.**
- `experimental.turbopackTreeShaking`: experimental, it applies to every page, and it would hide the cause (already ruled out at W-670).
- A computed `import(\`./${d}/${s}/Demo\`)`: this is a context module. It breaks `qa-changed`'s import scan and the faithfulness rule.
- A second generator outside `company.mjs` with no amendment: see section 4, path 3.

**Regression guards (ordinary surface, platform-engineer).**
1. `tests/platform/registry-split.test.mjs` scans imports:
   - no `"use client"` file, and nothing it imports, reaches `index.generated`;
   - no file outside `DemoHost.tsx` imports `loaders.generated`;
   - no server module imports `loaders.generated`.
   The last rule is what puts lesson code back into the shell.
2. `tests/platform/built-output.test.mjs`: extend it to `static/chunks`, with 0 `INTERNAL_STRINGS` hits and no chunk over 300 KB raw. Remove its "out of scope: static/chunks" line.
3. Wire `test:platform` into `verify` (W-925 already asks for this).

## 3. Expected result (measured in scratch, build E in the re-estimate)

| | HEAD | after |
|---|---|---|
| `/` HTML | 309,937 B | 47,614 B |
| `/` stylesheets | 751 | 1 |
| `/` first-load JS (gz) | 2,711,774 B | 229,969 B |
| client chunks with internal strings | 1 | 0 |
| phone, 4x, usable (loopback, loaded host) | 4.61 s | 0.89 s |
| `next build` | 3m05 | 1m35 |
| contract (12 lessons × 2) / feed spec | | 24/24 / 10/10 |

**Residuals (this does not close them):**
- **Draft lesson code is still fetchable.** `loaders` lists every slug on disk, drafts included, and each draft's `Demo` chunk exists as a static file. The draft's internal notes no longer ship, but its stage and reveal copy can be read by anyone who reads the loaders chunk. Filtering by status in the generator is exactly what (c2)'s invariant 3 forbids, and it should stay forbidden. The fix is EDD-003 stage 1's manifest (published versions only). For now, W-884 stays open on that half and goes in releases `known_issues`.
- **The loaders map grows with the catalog** (about 49 B per lesson: 46.9 KB raw and 18.6 KB gz at 960). At about 5,000 lessons it takes about 100 KB gz, a fifth of the Q5.3 budget. The stage 1 manifest replaces it before then.

**Would be wrong if:**
- a lesson's CSS arrives after its markup, so the feed flashes unstyled (I saw no flash on `/d`, but the feed on a real network is unmeasured);
- per-card chunk fetches make scrolling show "Loading…" noticeably on a phone network. The mitigation is to prefetch the loaders of the next 2 cards in `Feed`;
- some tool reads `registry.generated.ts`. Today `tools/qa-changed.mjs` excludes it by name, so update that exclusion to `*.generated.ts`.

**Rollback:** revert the commit and run `npm run registry`. No data is involved.

## 4. How this relates to AMD-001 (c2) and A1

- **A1** is scalability option A1, which is **EDD-001 option 4**, which is this design. The "one geo chunk" half of A1 is void: no geo chunk was ever on first load.
- **AMD-001 (c2)** moves `registrySource` to ordinary `tools/registry.mjs` (`registryFiles(demos)` returns `{path: contents}`). `cmdCheck` keeps judging:
  - freshness, plus an orphan rule;
  - faithfulness: every lesson is imported from its own `meta.json`, across all generated files;
  - no status literal.
  The two-file map passes all three unchanged, because faithfulness concatenates the files. It was recommended "Ratify" at the 2026-10-12 constitutional review and is on the founder's 10-15 digest. It is unratified (W-667).

**Path 1 (recommended): ratify (c2) with a two-line rider, then A1 as an ordinary change in `tools/registry.mjs`.** The rider turns W-946 from a convention into something the gate judges. It also closes the gap (c2) admits ("pointing a slug at the wrong `Demo` … is not caught by the invariants").

**Path 2 (only if (c2) is refused): a narrow amendment** that edits `registrySource` and the freshness check in `tools/company.mjs` directly, so they emit and check the two files. It has the same invariants as the rider. A refusal of (c2) would be about who may change the generator. It would not be a reason to keep shipping fact-check notes.

**Path 3 (rejected): a second generator outside the gate file** with no amendment. `check` would never judge the files the app actually uses. That defeats the protection's purpose, and the steward would be right to fail it.

### Draft amendment text, for the evaluation steward (I did not edit protected files)

> **AMD-001 (c2), rider W-946: generated files are split by side, and each split is judged.**
> *Surface:* `tools/company.mjs` `cmdCheck` (the registry section added by (c2)).
> *Change:* add two invariants after invariant 3, judged over `registryFiles(demos)`:
> 4. **Loader faithfulness.** Every lesson on disk has exactly one loader entry, `"<meta.slug>": () => import("./<domainDir>/<slugDir>/Demo")`. Its key is the slug read from that lesson's own `meta.json`. No other `import()` appears in generated code.
> 5. **Side separation.** No generated file both imports a `meta.json` and contains an `import()`.
>
> ```js
> const loaderRe = /"([^"]+)":\s*\(\)\s*=>\s*import\("\.\/([^/"]+)\/([^/"]+)\/Demo"\)/g;
> const loaders = [...gen.matchAll(loaderRe)].map((x) => [x[1], `${x[2]}/${x[3]}`]);
> const bySlug = new Map(demos.filter((d) => d.meta).map((d) => [`${d.domainDir}/${d.slugDir}`, d.meta.slug]));
> for (const k of onDisk) if (loaders.filter(([, p]) => p === k).length !== 1) err("src/demos/*.generated.ts", `lesson ${k} needs exactly one loader`);
> for (const [slug, p] of loaders) if (bySlug.get(p) !== slug) err("src/demos/*.generated.ts", `loader "${slug}" points at ${p}`);
> if ((gen.match(/\bimport\(/g) || []).length !== loaders.length) err("src/demos/*.generated.ts", "unexpected import() in generated code");
> for (const [file, src] of Object.entries(files))
>   if (/from "\.\/[^"]+\/meta\.json"/.test(src) && /\bimport\(/.test(src)) err(file, "a generated file must not hold both metas and loaders (W-946)");
> ```
> *Claimed benefit:* closes W-946 (internal notes in every browser) and the wrong-loader gap (c2) names. Measured with the split: `/` first-load JS 2.71 MB to 0.23 MB gz, `/` HTML 310 KB to 48 KB.
> *What it removes:* the ability of a generator change to put metas and loaders back into one file without `check` failing.
> *Judging effect:* none on what may publish. `check` fails on two more kinds of generator drift.
> *Prediction:* after A1 merges, `check` passes on the two-file map with the same lesson and claim counts as before, and the built-output test finds 0 internal strings in `static/chunks`.
> *Would be wrong if:* a legitimate generator shape (for example EDD-003 stage 1's manifest) is blocked by invariant 5. In that case, amend it to name the file allowed to hold both.
> *Side by side:* the applying commit runs `check` before and after, with the same counts. A tampered generator (one loader pointed at another lesson, or metas merged back into the loaders file) must fail.
> *Rollback:* revert the hunk. Invariants 1 to 3 stay.
> *Seat:* platform-engineer and principal-engineer are interested parties (this loosens nothing for them, but it is their change), so neither is the deciding vote.

## 5. Order of work

1. Founder ratifies (c2) with the rider (W-667). evaluation-steward brings it.
2. platform-engineer applies (c2), and then, in a separate commit:
   - `registryFiles` emits the two files;
   - `catalog.ts` imports `index.generated` and adds `import "server-only"`;
   - `DemoHost.tsx` imports `loaders.generated`;
   - the guards from section 2 are added;
   - `qa-changed` excludes `*.generated.ts`;
   - `npm run verify` passes (full QA, because DemoHost is shell).
3. principal-engineer reviews the diff. principal-engineer-ops approves the readiness record.
4. A founder-approved deploy. Then the r7 C2-style checks, plus a check that `view-source` and `static/chunks` show 0 hits for "checkedBy" on production.
5. Re-measure W-607 and W-669 before anyone writes a CSS EDD.
