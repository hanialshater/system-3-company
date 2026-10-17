// Read side of the HQ Library (/hq/library): a search index over the markdown in company/.
// Read-only. Only .md files under <root>/company are ever indexed or served; see safeDocPath.
// Plain JS search (tokenised titles, headings, path, and term frequency in the body), no dependency.
// This file imports only node built-ins so tests/hq-library can load it directly. Owner: hq-engineer.
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

export type DocType = "report" | "decision" | "tech" | "strategy" | "requirements" | "constitution" | "courses" | "review" | "lesson-review" | "progress" | "design" | "template" | "handbook";

export const TYPES: { id: DocType; label: string; hint: string }[] = [
  { id: "report", label: "Reports", hint: "WBR, MBR, planning, retros, launch reviews (rituals/records) and experiment results" },
  { id: "decision", label: "Decisions", hint: "company/decisions" },
  { id: "tech", label: "Tech design", hint: "EDDs, ADRs, engineering reviews and notes (engineering/)" },
  { id: "strategy", label: "Strategy", hint: "product/ and domains/: charters, briefs, scope, verticals" },
  { id: "requirements", label: "Requirements", hint: "PRDs, BRDs and the lesson standards (demo-standard, lesson-metadata)" },
  { id: "constitution", label: "Constitution", hint: "The constitution and its amendments" },
  { id: "courses", label: "Courses", hint: "company/courses" },
  { id: "review", label: "Reviews", hint: "Company, engineering and design reviews (not per lesson)" },
  { id: "lesson-review", label: "Lesson reviews", hint: "Per-lesson reviews: thousands of files, off by default" },
  { id: "progress", label: "Progress log", hint: "ops/progress.md, one entry per handoff" },
  { id: "design", label: "Design", hint: "design/: specs, concepts, illustration requests and notes" },
  { id: "template", label: "Templates", hint: "Blank forms (rituals/templates, TEMPLATE.md): off by default" },
  { id: "handbook", label: "Handbook", hint: "Roles, knowledge, R&D and everything else" },
];
export const DEFAULT_TYPES: DocType[] = TYPES.map((t) => t.id).filter((t) => t !== "lesson-review" && t !== "template");

export interface Doc {
  /** Path relative to company/, e.g. "rituals/records/2026-10-13-wbr.md". Progress entries: "ops/progress.md@<slug>". */
  path: string;
  type: DocType;
  title: string;
  date: string | null;
  owner: string | null;
  headings: string[];
  /** YAML frontmatter as a one-line summary ("kind: format · status: approved"), shown above the doc. */
  meta: string;
  body: string;
  /** Progress entries only: the old-style path, so saved links still resolve (see loadDoc). */
  legacy?: string;
  /** Lowercased body, for matching. */
  low: string;
}
export type DocMeta = Pick<Doc, "path" | "type" | "title" | "date" | "owner">;
export interface Hit extends DocMeta {
  score: number;
  snippet: string;
}

const MAX_BYTES = 200_000; // per file; a longer file is cut (the reader says so)
// Secret-like files only: dotfiles and dot-directories, .env files, key material, and files or directories that are
// named as a secret (secrets.md, prod-credentials.md, a "tokens/" folder). A word inside a longer name is fine:
// the lesson folder reviews/paint-mix-shared-secret/ is not a secret file.
const SECRETISH = "(?:secrets?|credentials?|passwords?|passwd|tokens?|api[-_]?keys?|private[-_]?keys?)";
const DENY_BASE = new RegExp(`^${SECRETISH}(?:[-_.].*)?$|[-_.]${SECRETISH}$|\\.env(?:$|\\.)|\\.(?:pem|key|p12|pfx)$|^id_(?:rsa|dsa|ecdsa|ed25519)`, "i");
const DENY_DIR = new RegExp(`^${SECRETISH}$`, "i");
export function isDenied(rel: string): boolean {
  const segs = rel.split("/");
  if (segs.some((x) => x.startsWith("."))) return true;
  if (segs.slice(0, -1).some((x) => DENY_DIR.test(x))) return true;
  return DENY_BASE.test(segs[segs.length - 1].replace(/\.md$/i, "")) || DENY_BASE.test(segs[segs.length - 1]);
}

/** The company/ directory. */
export const companyRoot = (cwd = process.cwd()) => path.join(/*turbopackIgnore: true*/ cwd, "company");

/** Path guard. Returns the absolute file path for a library path, or null. Never leaves <root>/company, never serves non-.md. */
export function safeDocPath(rel: string, root = companyRoot()): string | null {
  if (typeof rel !== "string") return null;
  const file = rel.split("@")[0];
  if (!file || file.length > 300 || /[\0\\]/.test(file) || file.startsWith("/") || /%2e|%2f|%5c/i.test(file)) return null;
  const segs = file.split("/");
  if (segs.some((s) => s === "" || s === "." || s === "..")) return null;
  if (isDenied(file) || !file.endsWith(".md")) return null;
  const abs = path.resolve(/*turbopackIgnore: true*/ root, file);
  if (!abs.startsWith(path.resolve(/*turbopackIgnore: true*/ root) + path.sep)) return null;
  try {
    const real = fs.realpathSync(/*turbopackIgnore: true*/ abs); // a symlink must not lead out
    if (!real.startsWith(fs.realpathSync(/*turbopackIgnore: true*/ root) + path.sep) || !fs.statSync(real).isFile()) return null;
  } catch {
    return null;
  }
  return abs;
}

export function typeOf(rel: string): DocType {
  const d = rel.split("/");
  const name = d[d.length - 1];
  if (rel === "ops/progress.md") return "progress";
  if ((d[0] === "rituals" && d[1] === "templates") || /^template\.md$/i.test(name)) return "template";
  if (d[0] === "reviews") return d.length > 2 ? "lesson-review" : "review";
  if ((d[0] === "engineering" || d[0] === "design") && d[1] === "reviews") return "review";
  if (d[0] === "experiments") return "report";
  if (d[0] === "design") return "design";
  if (d[0] === "product" && d[1] === "prds") return "requirements";
  if (d[0] === "product" && (name === "demo-standard.md" || name === "lesson-metadata.md")) return "requirements";
  if (d[0] === "product" && name === "pm-handbook.md") return "handbook";
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

/** Leading YAML frontmatter ("---" ... "---"): its simple "key: value" lines, and the text after it. */
export function splitFrontmatter(text: string): { fields: Record<string, string>; body: string } {
  const m = /^---[ \t]*\r?\n/.exec(text);
  if (!m) return { fields: {}, body: text };
  const lines = text.slice(m[0].length).split("\n");
  const end = lines.slice(0, 80).findIndex((l) => /^---[ \t]*\r?$/.test(l));
  if (end < 0) return { fields: {}, body: text };
  const fields: Record<string, string> = {};
  for (const l of lines.slice(0, end)) {
    const kv = /^([A-Za-z][\w-]*)\s*:\s*(.*?)\s*\r?$/.exec(l);
    if (kv && kv[2] && !(kv[1] in fields)) fields[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { fields, body: lines.slice(end + 1).join("\n").replace(/^\s*\n/, "") };
}

function describe(rel: string, full: string) {
  const fm = splitFrontmatter(full);
  const text = fm.body;
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
  if (fm.fields.owner && !owner) owner = fm.fields.owner.split(/\s+[·|(]|;\s+/)[0].replace(/[*_`]/g, "").trim().slice(0, 120) || null;
  if (!date) date = DATE.exec(fm.fields.date ?? fm.fields.updated ?? "")?.[1] ?? null;
  if (!date) date = DATE.exec(title)?.[1] ?? null;
  const headings: string[] = [];
  inFence = false;
  for (const l of text.split("\n")) {
    if (/^```/.test(l)) inFence = !inFence;
    const m = !inFence && /^#{2,4}\s+(.+?)\s*#*$/.exec(l);
    if (m) headings.push(m[1].replace(/[*_`]/g, ""));
  }
  const meta = Object.entries(fm.fields).filter(([k]) => k !== "owner" && k !== "id" && k !== "name").map(([k, v]) => `${k}: ${v}`).join(" · ");
  return { title: title.replace(/[*_`]/g, ""), owner, date, headings, meta, text };
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

export interface ProgressEntry {
  /** Stable slug: <date>-<role>-<6 hex of the heading>. A repeat of the exact same heading gets -2, -3 ... counting from the bottom of the file (oldest first), so a new entry at the top never moves an old link. */
  slug: string;
  /** The pre-W-463 slug (slugified heading, duplicates numbered from the top). Kept only so old links still resolve. */
  legacy: string;
  heading: string;
  date: string | null;
  owner: string | null;
  body: string;
}

/** Split ops/progress.md at "## <date> ..." headings; the intro above the first entry is dropped. */
export function splitProgress(text: string): ProgressEntry[] {
  const out: ProgressEntry[] = [];
  const seen = new Map<string, number>();
  let cur: { heading: string; lines: string[] } | null = null;
  const flush = () => {
    if (!cur) return;
    const date = DATE.exec(cur.heading)?.[1] ?? null;
    const paren = /\(([^,)]+)/.exec(cur.heading);
    const owner = paren ? paren[1].trim() : null;
    let legacy = slugify(cur.heading);
    const n = (seen.get(legacy) ?? 0) + 1;
    seen.set(legacy, n);
    if (n > 1) legacy += `-${n}`;
    const hash = createHash("sha1").update(cur.heading).digest("hex").slice(0, 6);
    const slug = `${date ?? "undated"}-${slugify(owner ?? "entry").slice(0, 30) || "entry"}-${hash}`;
    out.push({ slug, legacy, heading: cur.heading, date, owner, body: cur.lines.join("\n").trim() });
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
  // Number repeats of one slug from the bottom: the oldest keeps the bare slug.
  const below = new Map<string, number>();
  for (let i = out.length - 1; i >= 0; i--) {
    const k = (below.get(out[i].slug) ?? 0) + 1;
    below.set(out[i].slug, k);
    if (k > 1) out[i].slug += `-${k}`;
  }
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
    else if (e.isFile() && e.name.endsWith(".md") && !isDenied(r)) out.push({ rel: r, abs: path.join(dir, e.name) });
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
      legacy: `${rel}@${e.legacy}`,
      path: `${rel}@${e.slug}`,
      type: "progress" as const,
      title: e.heading,
      date: e.date,
      owner: e.owner,
      headings: [],
      meta: "",
      body: e.body,
      low: (e.heading + "\n" + e.body).toLowerCase(),
    }));
  }
  const d = describe(rel, text);
  return [{ path: rel, type: typeOf(rel), title: d.title, date: d.date, owner: d.owner, headings: d.headings, meta: d.meta, body: d.text, low: d.text.toLowerCase() }];
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

/** Terms of 3 letters or fewer ("ci", "qa", "edd") match whole words only; longer terms match anywhere. */
const SHORT = 3;
const wordRe = new Map<string, RegExp>();
const wordOf = (t: string) => {
  let r = wordRe.get(t);
  if (!r) wordRe.set(t, (r = new RegExp(`(?<![a-z0-9])${t.replace(/[^a-z0-9_]/g, "")}(?![a-z0-9])`, "g")));
  r.lastIndex = 0;
  return r;
};
const indexOfTerm = (hay: string, t: string) => (t.length > SHORT ? hay.indexOf(t) : hay.search(wordOf(t)));
const count = (hay: string, needle: string) => {
  let n = 0;
  if (needle.length <= SHORT) {
    const r = wordOf(needle);
    while (n < 50 && r.exec(hay)) n++;
    return n;
  }
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
      const i = indexOfTerm(d.low, t);
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
        const inTitle = indexOfTerm(title, t) >= 0;
        const inHead = indexOfTerm(heads, t) >= 0;
        const inPath = indexOfTerm(p, t) >= 0;
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
  meta: string;
  truncated: boolean;
  /** Raw link target (as written in the body) to a library path, for links that point at another indexed doc. */
  links: Record<string, string>;
}

/** One doc for the reader, or null when the path is not a servable, indexed doc. */
export function loadDoc(rel: string, root = companyRoot()): LoadedDoc | null {
  if (!safeDocPath(rel, root)) return null;
  const docs = buildIndex(root);
  // A progress link saved before W-463 (slug from the heading) resolves to the entry's stable path; the caller redirects.
  const d = docs.find((x) => x.path === rel) ?? (rel.startsWith("ops/progress.md@") ? docs.find((x) => x.legacy === rel) : undefined);
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
  return { path: d.path, type: d.type, title: d.title, date: d.date, owner: d.owner, body: d.body, meta: d.meta, truncated: d.body.length >= MAX_BYTES, links };
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
