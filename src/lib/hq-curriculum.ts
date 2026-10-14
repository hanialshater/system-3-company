// Read side of the HQ Curriculum inspector (/hq/curriculum, category management): every curriculum
// concept and every lesson for it, with the evidence a category manager needs (learner verdicts,
// design reviews, illustrations, board items, walkthrough contact sheets, concept notes). Repo files
// only; nothing is written here. Built by design-engineer; used by the category managers. The index
// is light (sent with the page); the per-concept detail is fetched from /api/hq/curriculum/concept/<key>.
import { LAYOUT_RE, type Verdict, front, hasSheet, latestLearnerReview, lessonMetas, ls, p, read, readJson, verdictOf } from "./hq-lessons";

export { LAYOUT_RE, type Verdict };

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

export interface CurriculumIndex {
  domains: DomainInfo[];
  concepts: ConceptRow[];
  lessons: LessonRow[];
}

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

function curricula(): { domain: string; concepts: { id: string; name: string; level: string; demand: number; prerequisites?: string[]; subarea?: string }[] }[] {
  return ls(p("content/curriculum"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<{ domain: string; concepts: never[] }>(p("content/curriculum", f)))
    .filter((x): x is NonNullable<typeof x> => Boolean(x?.domain && Array.isArray(x.concepts)));
}

export function curriculumIndex(): CurriculumIndex {
  const df = readJson<{ domains: DomainInfo[] }>(p("content/domains.json"));
  const domains: DomainInfo[] = (df?.domains ?? []).map(({ id, name, short, color, subareas }) => ({ id, name, short, color, subareas: (subareas ?? []).map(({ id, name }) => ({ id, name })) }));

  const rows: LessonRow[] = lessonMetas().map((m) => {
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
      illustrated: ls(p("public/illustrations", m.slug)).some((f) => f.endsWith(".webp")),
      hasSheet: hasSheet(m.slug),
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
  const idx = curriculumIndex();
  const concept = idx.concepts.find((c) => c.key === key) ?? idx.concepts.find((c) => c.id === key);
  if (!concept) return null;
  const board = (readJson<{ items: { id: string; title: string; owner: string; state: string; links?: string[] }[] }>(p("company/ops/board.json"))?.items ?? []).filter((i) => !["done", "dropped"].includes(i.state));
  const metas = new Map(lessonMetas().map((m) => [m.slug, m]));
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
      sheet: { exists: hasSheet(slug), command: `npm run walkthrough -- ${slug}` },
    };
  });
  // Category managers' notes per curriculum concept. (company/design/concepts/ now holds UI concepts.)
  const notesPath = `company/domains/concepts/${concept.id}.md`;
  return { concept, lessons: lessonsOut, notes: { path: notesPath, text: read(p(notesPath)) } };
}
