// Shared read side for the HQ inspectors (/hq/curriculum and /hq/design): the lessons on disk, their
// latest learner review, their review files and their walkthrough contact sheets. Repo files only;
// nothing is written here. Owner: design-engineer.
import fs from "node:fs";
import path from "node:path";

const ROOT = () => process.cwd();
// turbopackIgnore: these are runtime reads of repo files (HQ only), not modules to trace into the bundle.
export const p = (...xs: string[]) => path.join(/*turbopackIgnore: true*/ ROOT(), ...xs);
export const read = (f: string) => {
  try {
    return fs.readFileSync(f, "utf8");
  } catch {
    return null;
  }
};
export const readJson = <T>(f: string): T | null => {
  const t = read(f);
  if (t == null) return null;
  try {
    return JSON.parse(t) as T;
  } catch {
    return null;
  }
};
export const ls = (d: string) => {
  try {
    return fs.readdirSync(d);
  } catch {
    return [];
  }
};
export const exists = (f: string) => fs.existsSync(f);

export type Verdict = "launch" | "revise" | "fatal";

export interface Meta {
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

export const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

/** Every lesson's meta.json with the folder it lives in, sorted by slug. */
export function lessonMetas(): (Meta & { dir: string })[] {
  const out: (Meta & { dir: string })[] = [];
  for (const d of ls(p("src/demos"))) {
    for (const s of ls(p("src/demos", d))) {
      const m = readJson<Meta>(p("src/demos", d, s, "meta.json"));
      if (m?.slug) out.push({ ...m, dir: `src/demos/${d}/${s}` });
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** All lesson slugs on disk: the allow-list for the sheet and review routes. */
export function lessonSlugs(): Set<string> {
  return new Set(lessonMetas().map((m) => m.slug));
}

/** Learner review text that points at a layout problem (the "has layout finding" filter). */
// Negations ("not clipped", "no overlap") and an empty "told, not shown: none" field do not count.
export const LAYOUT_RE = /(?<!\b(?:not|no|nothing|without) )(?:clipp|overlap|clutter)|told, not shown(?!\s*:\s*(?:none|nothing|n\/a)\b)/i;

// Learner review files: <date>-learner-<persona>[-vN][-seen].md. Latest = newest date, then highest
// version, then the "-seen" (screenshots seen) read over the transcript-only one.
function reviewRank(f: string): string {
  const date = f.slice(0, 10);
  const v = Number(f.match(/-v(\d+)(?:-seen)?\.md$/)?.[1] ?? 1);
  const seen = /-seen\.md$/.test(f) ? 1 : 0;
  return `${date}|${String(v).padStart(3, "0")}|${seen}`;
}

export function latestLearnerReview(slug: string): { file: string; text: string } | null {
  const files = ls(p("company/reviews", slug)).filter((f) => /learner/.test(f) && f.endsWith(".md"));
  if (!files.length) return null;
  files.sort((a, b) => reviewRank(a).localeCompare(reviewRank(b)));
  const file = files.at(-1)!;
  const text = read(p("company/reviews", slug, file));
  return text == null ? null : { file: `company/reviews/${slug}/${file}`, text };
}

export function verdictOf(text: string): Verdict | null {
  const all = [...text.matchAll(/^\W*verdict\W*:\W*(launch|revise|fatal)/gim)];
  return (all.at(-1)?.[1]?.toLowerCase() as Verdict | undefined) ?? null;
}

/** A markdown file's `key: value` frontmatter (flat, one line per key). */
export function front(t: string): Record<string, string> {
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return Object.fromEntries(
    (m?.[1] ?? "")
      .split("\n")
      .map((l) => l.replace(/\s#.*$/, "").trim())
      .filter((l) => l.includes(":"))
      .map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim().replace(/^"(.*)"$/, "$1")]),
  );
}

export const sheetPath = (slug: string) => p("artifacts/walkthroughs", slug, "sheet.png");
export const hasSheet = (slug: string) => fs.existsSync(sheetPath(slug));

/** The contact sheet PNG for a known lesson, or null. The slug must be a lesson on disk. */
export function sheetFile(slug: string): string | null {
  if (!SLUG_RE.test(slug) || !lessonSlugs().has(slug)) return null;
  const f = sheetPath(slug);
  return fs.existsSync(f) ? f : null;
}

/** A review record of a known lesson (company/reviews/<slug>/<file>.md), or null. No path can escape. */
export function reviewFile(slug: string, file: string): string | null {
  if (!SLUG_RE.test(slug) || !/^[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(file) || file.includes("..")) return null;
  if (!lessonSlugs().has(slug) || !ls(p("company/reviews", slug)).includes(file)) return null;
  return read(p("company/reviews", slug, file));
}
