#!/usr/bin/env node
// D2 (batch 5 §6, W-1572): the client dims index. Build-time, static, not personal.
//
//   node company/personalization/dims/build-index.mjs           write src/lib/learner/dims-index.generated.ts
//   node company/personalization/dims/build-index.mjs --check   exit 1 if the committed file is not what this builds
//
// Owner: lesson-dims-owner. Inputs, read only: src/demos/*/*/meta.json, content/curriculum/*.json,
// company/personalization/dims/*-anchors.json (the only misconceptionStrength ratings that exist), and
// src/lib/visibility.ts (which statuses the feed serves). No learner data, no clock, no network, no randomness:
// the same tree always builds the same bytes (tests/personalization/dims-index.test.mjs).
//
// Derivation (company/personalization/2026-10-16-brief-response.md §2.4; the same choices as the simulator's
// company/personalization/model/sim/catalog.mjs, so pilot entries match what the simulator scored):
// - concept = meta.curriculum.primary (qualified "domain:concept"), else "<domain>:<meta.concept>".
// - level = meta.curriculum.level, else the curriculum node's level, else "intro" (the header counts fallbacks).
// - prerequisites = meta.curriculum.prerequisites ∪ the curriculum node's prerequisites, qualified, minus itself,
//   sorted. Concept ids, not slugs. A prerequisite may name a concept no visible lesson teaches; it stays listed.
// - successors = reverse edges (concept ids): every concept, in any curriculum file or any visible lesson,
//   that lists this lesson's concept as a prerequisite. Sorted.
// - status = meta.status exactly. Only lessons src/lib/visibility.ts lists in the feed (statusVisible with
//   no includeDrafts and the default environment: published and review) are in the index.
// - pilot = domain is probability or cs (the catalogue the candidate is scored on).
// - misconceptionStrength / strengthSource only where a rating record exists; otherwise the fields are absent.
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
export const OUT = "src/lib/learner/dims-index.generated.ts";
export const PILOT = ["probability", "cs"];
export const INDEX_VERSION = "dims-index-v1";
const RATINGS = ["company/personalization/dims/2026-10-16-misconception-strength-anchors.json"];

const q = (domain, id) => (id.includes(":") ? id : `${domain}:${id}`);
const byCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const dirs = (p) => readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort(byCodeUnit);

export async function buildDims(root = ROOT) {
  const { statusVisible } = await import(pathToFileURL(join(root, "src/lib/visibility.ts")).href);
  const listed = (status) => statusVisible(status, {}, {});

  const nodes = {}; // qualified concept -> { level, prerequisites }
  const curDir = join(root, "content", "curriculum");
  for (const f of readdirSync(curDir).filter((f) => f.endsWith(".json")).sort(byCodeUnit)) {
    const cur = readJson(join(curDir, f));
    for (const c of cur.concepts || []) nodes[q(cur.domain, c.id)] = { level: c.level, prerequisites: (c.prerequisites || []).map((p) => q(cur.domain, p)) };
  }

  const lessons = [];
  let levelFallback = 0;
  const demos = join(root, "src", "demos");
  for (const d of dirs(demos)) {
    for (const slug of dirs(join(demos, d))) {
      const f = join(demos, d, slug, "meta.json");
      if (!existsSync(f)) continue;
      const m = readJson(f);
      if (!listed(m.status)) continue;
      if (m.slug !== slug || m.domain !== d) throw new Error(`${f}: slug/domain do not match the path`);
      const concept = m.curriculum?.primary || q(d, m.concept);
      const node = nodes[concept];
      const level = m.curriculum?.level || node?.level || "intro";
      if (!m.curriculum?.level && !node?.level) levelFallback++;
      const prerequisites = [...new Set([...(m.curriculum?.prerequisites || []).map((p) => q(d, p)), ...(node?.prerequisites || [])])]
        .filter((p) => p !== concept).sort(byCodeUnit);
      lessons.push({ slug, domain: d, concept, level, prerequisites, status: m.status });
    }
  }

  const succ = {};
  const addEdge = (pre, c) => (succ[pre] ||= new Set()).add(c);
  for (const [c, n] of Object.entries(nodes)) for (const p of n.prerequisites) addEdge(p, c);
  for (const l of lessons) for (const p of l.prerequisites) addEdge(p, l.concept);

  const ratings = {};
  const ratingFiles = [];
  for (const rel of RATINGS) {
    const p = join(root, rel);
    if (!existsSync(p)) continue;
    ratingFiles.push(rel);
    for (const r of readJson(p).records || []) {
      if (![1, 2, 3].includes(r.misconceptionStrength) || !r.strengthSource) throw new Error(`${rel}: bad record ${r.slug}`);
      if (ratings[r.slug]) throw new Error(`${rel}: ${r.slug} rated twice`);
      ratings[r.slug] = { misconceptionStrength: r.misconceptionStrength, strengthSource: r.strengthSource, rubric: r.rubric };
    }
  }

  const dims = {};
  for (const l of [...lessons].sort((a, b) => byCodeUnit(a.slug, b.slug))) {
    if (dims[l.slug]) throw new Error(`duplicate slug ${l.slug}`);
    const e = { ...l, successors: [...(succ[l.concept] || [])].sort(byCodeUnit), pilot: PILOT.includes(l.domain) };
    const r = ratings[l.slug];
    if (r) { e.misconceptionStrength = r.misconceptionStrength; e.strengthSource = r.strengthSource; }
    dims[l.slug] = e;
  }
  const entries = Object.values(dims);
  const unindexedRatings = Object.keys(ratings).filter((s) => !dims[s]).sort(byCodeUnit);
  const header = {
    version: INDEX_VERSION,
    notPersonal: true,
    sources: ["src/demos/*/*/meta.json", "content/curriculum/*.json", ...ratingFiles, "src/lib/visibility.ts"],
    statuses: [...new Set(entries.map((e) => e.status))].sort(byCodeUnit),
    pilotDomains: PILOT,
    lessons: entries.length,
    pilotLessons: entries.filter((e) => e.pilot).length,
    levelFallbacks: levelFallback,
    misconceptionStrength: {
      rated: entries.filter((e) => e.misconceptionStrength).length,
      rubric: [...new Set(Object.values(ratings).map((r) => r.rubric))].sort(byCodeUnit),
      note: "Present only on lessons with a rating record (the msr-v1 anchors, one rater, agreement not yet measured). Absent everywhere else: absent means not rated, never a default. No placeholder value is ever written.",
      unindexedRatings,
    },
  };
  return { header, dims };
}

const lit = (v) => JSON.stringify(v);
export function render({ header, dims }) {
  const lines = [
    "// GENERATED by `node company/personalization/dims/build-index.mjs`. Do not edit by hand; rerun the script.",
    "// D2 (company/personalization/batches/2026-10-17-batch-5.md §6): the static dims index, one entry per lesson the",
    "// feed lists. Derived read-only from meta.json and content/curriculum. Not personal: no learner data, nothing fetched.",
    "// Key order carries no meaning (entries happen to be in slug order). misconceptionStrength is absent where no",
    "// rating exists; see DIMS_HEADER.misconceptionStrength. Owner: lesson-dims-owner.",
    "",
    "export type DimsLevel = \"intro\" | \"core\" | \"stretch\";",
    "export type DimsEntry = {",
    "  slug: string; domain: string; concept: string; level: DimsLevel;",
    "  prerequisites: string[]; successors: string[]; // concept ids (\"domain:concept\")",
    "  status: \"published\" | \"review\"; // exactly meta.json's status",
    "  pilot: boolean; // probability or cs: the catalogue the candidate is scored on",
    "  misconceptionStrength?: 1 | 2 | 3; strengthSource?: string; // only where a rating record exists",
    "};",
    "",
    `export const DIMS_HEADER = ${JSON.stringify(header, null, 2).replace(/^(\s*)"([A-Za-z]+)":/gm, "$1$2:")} as const;`,
    "",
    "export const dims: Record<string, DimsEntry> = {",
  ];
  for (const e of Object.values(dims)) {
    const parts = [`slug: ${lit(e.slug)}`, `domain: ${lit(e.domain)}`, `concept: ${lit(e.concept)}`, `level: ${lit(e.level)}`,
      `prerequisites: ${lit(e.prerequisites)}`, `successors: ${lit(e.successors)}`, `status: ${lit(e.status)}`, `pilot: ${e.pilot}`];
    if (e.misconceptionStrength) parts.push(`misconceptionStrength: ${e.misconceptionStrength}`, `strengthSource: ${lit(e.strengthSource)}`);
    lines.push(`  ${lit(e.slug)}: { ${parts.join(", ")} },`);
  }
  lines.push("};", "");
  return lines.join("\n");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const text = render(await buildDims());
  const out = join(ROOT, OUT);
  if (process.argv.includes("--check")) {
    const same = existsSync(out) && readFileSync(out, "utf8") === text;
    console.log(same ? `${OUT}: up to date` : `${OUT}: STALE. Run node company/personalization/dims/build-index.mjs (owner: lesson-dims-owner)`);
    process.exit(same ? 0 : 1);
  }
  writeFileSync(out, text);
  console.log(`wrote ${OUT} (${text.length} bytes)`);
}
