// Read side of the HQ Design inspector (/hq/design): every curriculum concept and every lesson for it,
// with the design evidence a designer needs (learner verdicts, design reviews, illustrations, board
// items, walkthrough contact sheets, concept design notes). Repo files only; nothing is written here.
// Owner: design-engineer. The index is light (sent with the page); the per-concept detail is fetched
// from /api/hq/design/concept/<key> so review text stays out of the first payload.
import fs from "node:fs";
import path from "node:path";

const ROOT = () => process.cwd();
// turbopackIgnore: these are runtime reads of repo files (HQ only), not modules to trace into the bundle.
const p = (...xs: string[]) => path.join(/*turbopackIgnore: true*/ ROOT(), ...xs);
const read = (f: string) => {
  try {
    return fs.readFileSync(f, "utf8");
  } catch {
    return null;
  }
};
const readJson = <T>(f: string): T | null => {
  const t = read(f);
  if (t == null) return null;
  try {
    return JSON.parse(t) as T;
  } catch {
    return null;
  }
};
const ls = (d: string) => {
  try {
    return fs.readdirSync(d);
  } catch {
    return [];
  }
};

export type Verdict = "launch" | "revise" | "fatal";

export interface DomainInfo {
  id: string;
  name: string;
  short: string;
  color: string;
  subareas: { id: string; name: string }[];
}

export interface ConceptRow {
  /** `<domain>:<id>`: concept ids repeat across curricula (osmosis, rule-of-72, euclid-gcd). */
  key: string;
  id: string;
  domain: string;
  subarea: string; // "untagged" when the curriculum entry has no subarea
  name: string;
  level: string;
  demand: number;
  prerequisites: string[]; // as written in the curriculum
  prereqKeys: (string | null)[]; // resolved to concept keys (null if the prerequisite is unknown)
  slugs: string[];
  counts: { lessons: number; published: number; launch: number; revise: number; fatal: number; noReview: number; illustrated: number };
  layoutFinding: boolean;
}

export interface LessonRow {
  slug: string;
  title: string;
  domain: string;
  concept: string;
  status: string;
  version: number | null;
  verdict: Verdict | null;
  layoutFinding: boolean;
  illustrated: boolean;
  hasSheet: boolean;
}

export interface DesignIndex {
  domains: DomainInfo[];
  concepts: ConceptRow[];
  lessons: LessonRow[];
}

interface Meta {
  slug: string;
  title: string;
  hook?: string;
  domain: string;
  concept: string;
  status: string;
  version?: number;
  format?: string;
  owner?: unknown;
}

/** Learner review text that points at a layout problem (the "has layout finding" filter). */
// Negations ("not clipped", "no overlap") and an empty "told, not shown: none" field do not count.
export const LAYOUT_RE = /(?<!\b(?:not|no|nothing|without) )(?:clipp|overlap|clutter)|told, not shown(?!\s*:\s*(?:none|nothing|n\/a)\b)/i;

/** Sentences of a review that carry a layout finding, trimmed for display. */
function layoutSnippets(text: string, n = 3): string[] {
  const g = new RegExp(LAYOUT_RE.source, "gi");
  const out: string[] = [];
  for (const m of text.matchAll(g)) {
    const i = m.index ?? 0;
    const start = Math.max(text.lastIndexOf("\n", i), text.lastIndexOf(". ", i) + 1, i - 140);
    let end = text.indexOf("\n", i);
    if (end < 0 || end - i > 140) end = Math.min(text.length, i + 140);
    let snip = text.slice(start, end).replace(/^[\s\-*]+/, "").trim();
    if (/^\**problems?\**\s*:/i.test(snip)) continue; // already shown as findings
    if (end < text.length && text[end] !== "\n") snip = snip.replace(/\s+\S*$/, "") + " …";
    if (snip && !out.includes(snip)) out.push(snip);
    if (out.length >= n) break;
  }
  return out;
}

function lessons(): Meta[] {
  const out: Meta[] = [];
  for (const d of ls(p("src/demos"))) {
    for (const s of ls(p("src/demos", d))) {
      const m = readJson<Meta>(p("src/demos", d, s, "meta.json"));
      if (m?.slug) out.push(m);
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** All lesson slugs on disk: the allow-list for the sheet route. */
export function lessonSlugs(): Set<string> {
  return new Set(lessons().map((m) => m.slug));
}

// Learner review files: <date>-learner-<persona>[-vN][-seen].md. Latest = newest date, then highest
// version, then the "-seen" (screenshots seen) read over the transcript-only one.
function reviewRank(f: string): string {
  const date = f.slice(0, 10);
  const v = Number(f.match(/-v(\d+)(?:-seen)?\.md$/)?.[1] ?? 1);
  const seen = /-seen\.md$/.test(f) ? 1 : 0;
  return `${date}|${String(v).padStart(3, "0")}|${seen}`;
}

function latestLearnerReview(slug: string): { file: string; text: string } | null {
  const files = ls(p("company/reviews", slug)).filter((f) => /learner/.test(f) && f.endsWith(".md"));
  if (!files.length) return null;
  files.sort((a, b) => reviewRank(a).localeCompare(reviewRank(b)));
  const file = files.at(-1)!;
  const text = read(p("company/reviews", slug, file));
  return text == null ? null : { file: `company/reviews/${slug}/${file}`, text };
}

function verdictOf(text: string): Verdict | null {
  const all = [...text.matchAll(/^\W*verdict\W*:\W*(launch|revise|fatal)/gim)];
  return (all.at(-1)?.[1]?.toLowerCase() as Verdict | undefined) ?? null;
}

/** The first findings of a learner review: its "Problems: (1) …; (2) …" line, else its first bullets. */
function findingsOf(text: string, n = 2): string[] {
  const line = text.match(/^\s*-?\s*\**problems?\**\s*:\s*(.+)$/im)?.[1];
  if (line && /\(\d+\)/.test(line)) {
    return line
      .split(/\(\d+\)/)
      .map((x) => x.trim().replace(/[;.]\s*$/, ""))
      .filter(Boolean)
      .slice(0, n);
  }
  const sec = text.split(/^## /m).find((x) => /^1\./.test(x)) ?? text;
  return sec
    .split("\n")
    .filter((l) => /^\s*-\s+/.test(l))
    .map((l) => l.replace(/^\s*-\s+/, "").trim())
    .filter((l) => !/^screenshots/i.test(l))
    .slice(0, n)
    .map((l) => (l.length > 260 ? l.slice(0, 257) + "…" : l));
}

const sheetPath = (slug: string) => p("artifacts/walkthroughs", slug, "sheet.png");
const illustrated = (slug: string) => ls(p("public/illustrations", slug)).some((f) => f.endsWith(".webp"));

function curricula(): { domain: string; concepts: { id: string; name: string; level: string; demand: number; prerequisites?: string[]; subarea?: string }[] }[] {
  return ls(p("content/curriculum"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<{ domain: string; concepts: never[] }>(p("content/curriculum", f)))
    .filter((x): x is NonNullable<typeof x> => Boolean(x?.domain && Array.isArray(x.concepts)));
}

export function designIndex(): DesignIndex {
  const df = readJson<{ domains: DomainInfo[] }>(p("content/domains.json"));
  const domains: DomainInfo[] = (df?.domains ?? []).map(({ id, name, short, color, subareas }) => ({ id, name, short, color, subareas: (subareas ?? []).map(({ id, name }) => ({ id, name })) }));

  const rows: LessonRow[] = lessons().map((m) => {
    const r = latestLearnerReview(m.slug);
    return {
      slug: m.slug,
      title: m.title,
      domain: m.domain,
      concept: m.concept,
      status: m.status,
      version: typeof m.version === "number" ? m.version : null,
      verdict: r ? verdictOf(r.text) : null,
      layoutFinding: r ? LAYOUT_RE.test(r.text) : false,
      illustrated: illustrated(m.slug),
      hasSheet: fs.existsSync(sheetPath(m.slug)),
    };
  });
  const byConcept = new Map<string, LessonRow[]>();
  for (const l of rows) byConcept.set(l.concept, [...(byConcept.get(l.concept) ?? []), l]);

  const curr = curricula();
  const keys = new Set(curr.flatMap((c) => c.concepts.map((x) => `${c.domain}:${x.id}`)));
  const concepts: ConceptRow[] = [];
  for (const c of curr) {
    for (const x of c.concepts) {
      const ll = byConcept.get(x.id) ?? [];
      const prerequisites = x.prerequisites ?? [];
      concepts.push({
        key: `${c.domain}:${x.id}`,
        id: x.id,
        domain: c.domain,
        subarea: x.subarea || "untagged",
        name: x.name,
        level: x.level,
        demand: x.demand,
        prerequisites,
        prereqKeys: prerequisites.map((q) => {
          const k = q.includes(":") ? q : `${c.domain}:${q}`;
          return keys.has(k) ? k : null;
        }),
        slugs: ll.map((l) => l.slug),
        counts: {
          lessons: ll.length,
          published: ll.filter((l) => l.status === "published").length,
          launch: ll.filter((l) => l.verdict === "launch").length,
          revise: ll.filter((l) => l.verdict === "revise").length,
          fatal: ll.filter((l) => l.verdict === "fatal").length,
          noReview: ll.filter((l) => !l.verdict).length,
          illustrated: ll.filter((l) => l.illustrated).length,
        },
        layoutFinding: ll.some((l) => l.layoutFinding),
      });
    }
  }
  return { domains, concepts, lessons: rows };
}

export interface LessonDetail {
  slug: string;
  title: string;
  hook: string;
  domain: string;
  version: number | null;
  status: string;
  format: string;
  review: { file: string; verdict: Verdict | null; findings: string[]; layout: string[] } | null;
  designReviews: { file: string; text: string }[];
  illustration: { status: string; request: string | null; images: number };
  board: { id: string; title: string; owner: string; state: string }[];
  sheet: { exists: boolean; command: string };
}

export interface ConceptDetail {
  concept: ConceptRow;
  lessons: LessonDetail[];
  notes: { path: string; text: string | null };
}

function front(t: string): Record<string, string> {
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  return Object.fromEntries(
    (m?.[1] ?? "")
      .split("\n")
      .map((l) => l.replace(/#.*$/, "").trim())
      .filter((l) => l.includes(":"))
      .map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]),
  );
}

function illustrationOf(slug: string): LessonDetail["illustration"] {
  const pub = ls(p("public/illustrations", slug)).filter((f) => f.endsWith(".webp")).length;
  const dir = "company/design/illustration-requests";
  let request: string | null = null;
  let status = "none requested";
  for (const f of ls(p(dir))) {
    if (!f.endsWith(".md") || f === "TEMPLATE.md") continue;
    const fm = front(read(p(dir, f)) ?? "");
    if (fm.slug === slug) {
      request = `${dir}/${f}`;
      status = fm.status || "requested";
    }
  }
  if (status !== "accepted" && ls(p("company/design/illustration-inbox", slug)).length) status = `${status} · delivered to inbox`;
  if (pub) status = "accepted";
  return { status, request, images: pub };
}

export function conceptDetail(key: string): ConceptDetail | null {
  const idx = designIndex();
  const concept = idx.concepts.find((c) => c.key === key) ?? idx.concepts.find((c) => c.id === key);
  if (!concept) return null;
  const board = (readJson<{ items: { id: string; title: string; owner: string; state: string; links?: string[] }[] }>(p("company/ops/board.json"))?.items ?? []).filter((i) => !["done", "dropped"].includes(i.state));
  const metas = new Map(lessons().map((m) => [m.slug, m]));
  const lessonsOut: LessonDetail[] = concept.slugs.map((slug) => {
    const m = metas.get(slug)!;
    const r = latestLearnerReview(slug);
    const re = new RegExp(`(^|[^a-z0-9-])${slug.replace(/[-]/g, "\\-")}([^a-z0-9-]|$)`);
    return {
      slug,
      title: m.title,
      hook: m.hook ?? "",
      domain: m.domain,
      version: typeof m.version === "number" ? m.version : null,
      status: m.status,
      format: m.format || "single card (assumed)",
      review: r ? { file: r.file, verdict: verdictOf(r.text), findings: findingsOf(r.text), layout: layoutSnippets(r.text) } : null,
      designReviews: ls(p("company/reviews", slug))
        .filter((f) => f.endsWith("-design.md"))
        .sort()
        .map((f) => ({ file: `company/reviews/${slug}/${f}`, text: read(p("company/reviews", slug, f)) ?? "" })),
      illustration: illustrationOf(slug),
      board: board.filter((i) => re.test(i.title) || (i.links ?? []).some((l) => re.test(l))).map(({ id, title, owner, state }) => ({ id, title, owner, state })),
      sheet: { exists: fs.existsSync(sheetPath(slug)), command: `npm run walkthrough -- ${slug}` },
    };
  });
  const notesPath = `company/design/concepts/${concept.id}.md`;
  return { concept, lessons: lessonsOut, notes: { path: notesPath, text: read(p(notesPath)) } };
}

/** The contact sheet PNG for a known lesson, or null. The slug must be a lesson on disk. */
export function sheetFile(slug: string): string | null {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || !lessonSlugs().has(slug)) return null;
  const f = sheetPath(slug);
  return fs.existsSync(f) ? f : null;
}
