// Read side of the HQ Library (/hq/library): a search index over the markdown in company/.
// Read-only. Only .md files under <root>/company are ever indexed or served; see safeDocPath.
// Plain JS search (tokenised titles, headings, path, and term frequency in the body), no dependency.
// This file imports only node built-ins so tests/hq-library can load it directly. Owner: hq-engineer.
import fs from "node:fs";
import path from "node:path";

export type DocType = "report" | "decision" | "tech" | "strategy" | "requirements" | "constitution" | "courses" | "review" | "lesson-review" | "progress" | "handbook";

export const TYPES: { id: DocType; label: string; hint: string }[] = [
  { id: "report", label: "Reports", hint: "WBR, MBR, planning, retros, launch and eng reviews (rituals/records)" },
  { id: "decision", label: "Decisions", hint: "company/decisions" },
  { id: "tech", label: "Tech design", hint: "EDDs, ADRs, engineering reviews and notes (engineering/)" },
  { id: "strategy", label: "Strategy", hint: "product/ and domains/: charters, briefs, scope, verticals" },
  { id: "requirements", label: "Requirements", hint: "PRDs and BRDs" },
  { id: "constitution", label: "Constitution", hint: "The constitution and its amendments" },
  { id: "courses", label: "Courses", hint: "company/courses" },
  { id: "review", label: "Reviews", hint: "Company-level reviews (not per lesson)" },
  { id: "lesson-review", label: "Lesson reviews", hint: "Per-lesson reviews: thousands of files, off by default" },
  { id: "progress", label: "Progress log", hint: "ops/progress.md, one entry per handoff" },
  { id: "handbook", label: "Handbook", hint: "Roles, design, knowledge, R&D and everything else" },
];
export const DEFAULT_TYPES: DocType[] = TYPES.map((t) => t.id).filter((t) => t !== "lesson-review");

export interface Doc {
  /** Path relative to company/, e.g. "rituals/records/2026-10-13-wbr.md". Progress entries: "ops/progress.md@<slug>". */
  path: string;
  type: DocType;
  title: string;
  date: string | null;
  owner: string | null;
  headings: string[];
  body: string;
  /** Lowercased body, for matching. */
  low: string;
}
export type DocMeta = Pick<Doc, "path" | "type" | "title" | "date" | "owner">;
export interface Hit extends DocMeta {
  score: number;
  snippet: string;
}

const MAX_BYTES = 200_000; // per file; a longer file is cut (the reader says so)
const DENY = /(^|\/)\.|\.env|secret|credential|password|token|\.pem$|\.key$|id_rsa|\.p12$|\.pfx$/i;

/** The company/ directory. */
export const companyRoot = (cwd = process.cwd()) => path.join(cwd, "company");

/** Path guard. Returns the absolute file path for a library path, or null. Never leaves <root>/company, never serves non-.md. */
export function safeDocPath(rel: string, root = companyRoot()): string | null {
  if (typeof rel !== "string") return null;
  const file = rel.split("@")[0];
  if (!file || file.length > 300 || /[\0\\]/.test(file) || file.startsWith("/") || /%2e|%2f|%5c/i.test(file)) return null;
  const segs = file.split("/");
  if (segs.some((s) => s === "" || s === "." || s === "..")) return null;
  if (DENY.test(file) || !file.endsWith(".md")) return null;
  const abs = path.resolve(root, file);
  if (!abs.startsWith(path.resolve(root) + path.sep)) return null;
  try {
    const real = fs.realpathSync(abs); // a symlink must not lead out
    if (!real.startsWith(fs.realpathSync(root) + path.sep) || !fs.statSync(real).isFile()) return null;
  } catch {
    return null;
  }
  return abs;
}

export function typeOf(rel: string): DocType {
  const d = rel.split("/");
  const name = d[d.length - 1];
  if (rel === "ops/progress.md") return "progress";
  if (d[0] === "reviews") return d.length > 2 ? "lesson-review" : "review";
  if (d[0] === "product" && d[1] === "prds") return "requirements";
  if (/(^|[-_ ])(prd|brd)([-_. ]|$)/i.test(name) || /^(prd|brd)\b/i.test(name)) return "requirements";
  if (d[0] === "rituals" && d[1] === "records") return "report";
  if (d[0] === "decisions") return "decision";
  if (d[0] === "engineering") return "tech";
  if (d[0] === "product" || d[0] === "domains") return "strategy";
  if (d[0] === "constitution") return "constitution";
  if (d[0] === "courses") return "courses";
  return "handbook";
}

const DATE = /\b(20\d\d-[01]\d-[0-3]\d)\b/;

function describe(rel: string, text: string) {
  const lines = text.split("\n", 40);
  let title = "";
  let inFence = false;
  for (const l of text.split("\n", 200)) {
    if (/^```/.test(l)) inFence = !inFence;
    const m = !inFence && /^#\s+(.+?)\s*#*$/.exec(l);
    if (m) {
      title = m[1];
      break;
    }
  }
  if (!title) title = path.basename(rel, ".md");
  const head = lines.slice(0, 25);
  let owner: string | null = null;
  let date: string | null = null;
  const fn = DATE.exec(path.basename(rel));
  if (fn) date = fn[1];
  for (const l of head) {
    const o = /^\W{0,4}(owner|owners|author|chair)\W{0,4}\s*:\s*(.+)$/i.exec(l.replace(/\*\*/g, ""));
    if (o && !owner) owner = o[2].split(/\s+[·|]\s+|;\s+/)[0].replace(/[*_`]/g, "").trim().slice(0, 120) || null;
    const flat = l.replace(/\*\*/g, "");
    if (!date && /(^|[\s·|])\W{0,2}(date|status|updated)\W{0,2}\s*:/i.test(flat)) date = DATE.exec(flat)?.[1] ?? null;
  }
  if (!date) date = DATE.exec(title)?.[1] ?? null;
  const headings: string[] = [];
  inFence = false;
  for (const l of text.split("\n")) {
    if (/^```/.test(l)) inFence = !inFence;
    const m = !inFence && /^#{2,4}\s+(.+?)\s*#*$/.exec(l);
    if (m) headings.push(m[1].replace(/[*_`]/g, ""));
  }
  return { title: title.replace(/[*_`]/g, ""), owner, date, headings };
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

/** Split ops/progress.md at "## <date> ..." headings; the intro above the first entry is dropped. */
export function splitProgress(text: string): { slug: string; heading: string; date: string | null; owner: string | null; body: string }[] {
  const out: { slug: string; heading: string; date: string | null; owner: string | null; body: string }[] = [];
  const seen = new Map<string, number>();
  let cur: { heading: string; lines: string[] } | null = null;
  const flush = () => {
    if (!cur) return;
    const date = DATE.exec(cur.heading)?.[1] ?? null;
    const paren = /\(([^,)]+)/.exec(cur.heading);
    const owner = paren ? paren[1].trim() : null;
    let slug = slugify(cur.heading);
    const n = (seen.get(slug) ?? 0) + 1;
    seen.set(slug, n);
    if (n > 1) slug += `-${n}`;
    out.push({ slug, heading: cur.heading, date, owner, body: cur.lines.join("\n").trim() });
  };
  let fence = false;
  for (const l of text.split("\n")) {
    if (/^```/.test(l)) fence = !fence;
    const m = !fence && /^##\s+(\d{4}-\d{2}-\d{2}.*)$/.exec(l);
    if (m) {
      flush();
      cur = { heading: m[1].trim(), lines: [] };
    } else cur?.lines.push(l);
  }
  flush();
  return out;
}

function walk(dir: string, rel: string, out: { rel: string; abs: string }[]) {
  let ents: fs.Dirent[];
  try {
    ents = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (e.name.startsWith(".") || e.isSymbolicLink()) continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walk(path.join(dir, e.name), r, out);
    else if (e.isFile() && e.name.endsWith(".md") && !DENY.test(r)) out.push({ rel: r, abs: path.join(dir, e.name) });
  }
}

interface Entry {
  mtimeMs: number;
  size: number;
  docs: Doc[];
}
const cache = new Map<string, Entry>();
let built: { at: number; root: string; docs: Doc[] } | null = null;

function toDocs(rel: string, text: string): Doc[] {
  if (rel === "ops/progress.md") {
    return splitProgress(text).map((e) => ({
      path: `${rel}@${e.slug}`,
      type: "progress" as const,
      title: e.heading,
      date: e.date,
      owner: e.owner,
      headings: [],
      body: e.body,
      low: (e.heading + "\n" + e.body).toLowerCase(),
    }));
  }
  const d = describe(rel, text);
  return [{ path: rel, type: typeOf(rel), title: d.title, date: d.date, owner: d.owner, headings: d.headings, body: text, low: text.toLowerCase() }];
}

/** The whole index. Cheap to call: files are re-read only when their mtime or size changed, and the walk is cached for 5 s. */
export function buildIndex(root = companyRoot(), ttlMs = 5000): Doc[] {
  if (built && built.root === root && Date.now() - built.at < ttlMs) return built.docs;
  const files: { rel: string; abs: string }[] = [];
  walk(root, "", files);
  const docs: Doc[] = [];
  const live = new Set<string>();
  for (const f of files) {
    const key = `${root}\0${f.rel}`;
    live.add(key);
    let st: fs.Stats;
    try {
      st = fs.statSync(f.abs);
    } catch {
      continue;
    }
    let e = cache.get(key);
    if (!e || e.mtimeMs !== st.mtimeMs || e.size !== st.size) {
      let text = "";
      try {
        text = fs.readFileSync(f.abs, "utf8").slice(0, MAX_BYTES);
      } catch {
        continue;
      }
      e = { mtimeMs: st.mtimeMs, size: st.size, docs: toDocs(f.rel, text) };
      cache.set(key, e);
    }
    docs.push(...e.docs);
  }
  for (const k of cache.keys()) if (k.startsWith(root + "\0") && !live.has(k)) cache.delete(k);
  built = { at: Date.now(), root, docs };
  return docs;
}

export const tokenize = (q: string) =>
  [...new Set(q.toLowerCase().split(/[^a-z0-9_]+/).filter((t) => t.length > 1 || /^\d$/.test(t)))].slice(0, 8);

const count = (hay: string, needle: string) => {
  let n = 0;
  for (let i = hay.indexOf(needle); i !== -1 && n < 50; i = hay.indexOf(needle, i + needle.length)) n++;
  return n;
};

function snippetOf(d: Doc, terms: string[], phrase: string): string {
  const flat = (s: string) => s.replace(/\s+/g, " ");
  if (!terms.length) {
    const body = d.body.split("\n").filter((l) => l.trim() && !/^#/.test(l) && !/^(owner|author|date|status)\s*:/i.test(l.replace(/\*\*/g, "")));
    return flat(body.slice(0, 3).join(" ")).slice(0, 180);
  }
  let at = phrase.length > 2 ? d.low.indexOf(phrase) : -1;
  if (at < 0) {
    for (const t of terms) {
      const i = d.low.indexOf(t);
      if (i >= 0 && (at < 0 || i < at)) at = i;
    }
  }
  if (at < 0) return flat(d.headings.slice(0, 3).join(" · ")).slice(0, 180);
  const from = Math.max(0, at - 70);
  return (from > 0 ? "…" : "") + flat(d.body.slice(from, at + 130)).replace(/(^|\s)#{1,6}\s/g, "$1").trim() + "…";
}

export interface Query {
  q?: string;
  types?: DocType[];
  sort?: "relevance" | "newest" | "oldest";
}

/** Ranked search. Every term must appear somewhere in the doc (title, headings, path or body). With no query, newest first. */
export function search(docs: Doc[], { q = "", types = DEFAULT_TYPES, sort }: Query): { total: number; hits: Hit[]; counts: Record<string, number> } {
  const terms = tokenize(q);
  const phrase = q.trim().toLowerCase().replace(/\s+/g, " ");
  const counts: Record<string, number> = {};
  const want = new Set(types);
  const hits: Hit[] = [];
  for (const d of docs) {
    let score = 0;
    if (terms.length) {
      const title = d.title.toLowerCase();
      const heads = d.headings.join(" \n ").toLowerCase();
      const p = d.path.toLowerCase();
      let ok = true;
      for (const t of terms) {
        const inTitle = title.includes(t);
        const inHead = heads.includes(t);
        const inPath = p.includes(t);
        const tf = count(d.low, t);
        if (!inTitle && !inHead && !inPath && !tf) {
          ok = false;
          break;
        }
        score += (inTitle ? 12 : 0) + (inHead ? 5 : 0) + (inPath ? 4 : 0) + Math.min(10, Math.log2(1 + tf) * (tf > 0 ? 1.6 : 0));
      }
      if (!ok) continue;
      if (phrase.length > 2 && terms.length > 1) score += (title.includes(phrase) ? 25 : 0) + (d.low.includes(phrase) ? 8 : 0);
      if (title === phrase) score += 30;
      score += d.type === "lesson-review" ? -2 : 0;
    }
    counts[d.type] = (counts[d.type] ?? 0) + 1;
    if (!want.has(d.type)) continue;
    hits.push({ path: d.path, type: d.type, title: d.title, date: d.date, owner: d.owner, score, snippet: "" });
  }
  const byDate = (a: Hit, b: Hit, dir: 1 | -1) => (a.date && b.date ? dir * b.date.localeCompare(a.date) : a.date ? -1 : b.date ? 1 : 0);
  const mode = sort ?? (terms.length ? "relevance" : "newest");
  hits.sort((a, b) =>
    mode === "newest" ? byDate(a, b, 1) || b.score - a.score || a.path.localeCompare(b.path)
    : mode === "oldest" ? byDate(a, b, -1) || b.score - a.score || a.path.localeCompare(b.path)
    : b.score - a.score || byDate(a, b, 1) || a.path.localeCompare(b.path),
  );
  const top = hits.slice(0, 300);
  const byPath = new Map(docs.map((d) => [d.path, d]));
  for (const h of top) h.snippet = snippetOf(byPath.get(h.path)!, terms, phrase);
  return { total: hits.length, hits: top, counts };
}

export interface LoadedDoc extends DocMeta {
  body: string;
  truncated: boolean;
  /** Raw link target (as written in the body) to a library path, for links that point at another indexed doc. */
  links: Record<string, string>;
}

/** One doc for the reader, or null when the path is not a servable, indexed doc. */
export function loadDoc(rel: string, root = companyRoot()): LoadedDoc | null {
  if (!safeDocPath(rel, root)) return null;
  const docs = buildIndex(root);
  const d = docs.find((x) => x.path === rel);
  if (!d) return null;
  const known = new Set(docs.map((x) => x.path));
  const file = rel.split("@")[0];
  const links: Record<string, string> = {};
  const resolve = (raw: string) => {
    const t = raw.split("#")[0].split("?")[0].trim();
    if (!t || /^[a-z][a-z0-9+.-]*:/i.test(t) || !t.endsWith(".md")) return;
    let r = t.startsWith("company/") ? t.slice(8) : t.startsWith("/") ? "" : path.posix.normalize(path.posix.join(path.posix.dirname(file), t));
    if (!r || r.startsWith("..")) r = t.startsWith("company/") ? "" : path.posix.normalize(t);
    if (r && !r.startsWith("..") && known.has(r)) links[raw] = r;
  };
  for (const m of d.body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) resolve(m[1]);
  for (const m of d.body.matchAll(/`([A-Za-z0-9_./-]+\.md)`/g)) resolve(m[1]);
  return { path: d.path, type: d.type, title: d.title, date: d.date, owner: d.owner, body: d.body, truncated: d.body.length >= MAX_BYTES, links };
}

/** Counts per type, for the filter chips, ignoring the query. */
export const typeCounts = (docs: Doc[]) => {
  const c: Record<string, number> = {};
  for (const d of docs) c[d.type] = (c[d.type] ?? 0) + 1;
  return c;
};

export const parseTypes = (v: string | null | undefined): DocType[] => {
  if (!v) return DEFAULT_TYPES;
  const ids = new Set(TYPES.map((t) => t.id));
  const got = v.split(",").filter((x): x is DocType => ids.has(x as DocType));
  return got.length ? got : DEFAULT_TYPES;
};
