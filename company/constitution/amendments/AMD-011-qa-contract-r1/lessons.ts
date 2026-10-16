// Copy of tests/qa/lessons.ts with two changes for the scratch run: the root is LESSONS_ROOT (the shared
// server's tree, read-only), and a second export for AMD-011 part 3 that ignores QA_ONLY.
import fs from "node:fs";
import path from "node:path";
export interface LessonRef { slug: string; domain: string; status: string; title: string }
function all(): LessonRef[] {
  const root = path.join(process.env.LESSONS_ROOT ?? process.cwd(), "src/demos");
  const out: LessonRef[] = [];
  for (const domain of fs.readdirSync(root)) {
    const ddir = path.join(root, domain);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of fs.readdirSync(ddir)) {
      const metaPath = path.join(ddir, slug, "meta.json");
      if (!fs.existsSync(metaPath)) continue;
      const m = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      if (m.status === "retired") continue;
      out.push({ slug: m.slug, domain: m.domain, status: m.status, title: m.title });
    }
  }
  return out;
}
export function lessons(): LessonRef[] {
  const only = process.env.QA_ONLY?.split(",").filter(Boolean);
  const out = all();
  return only ? out.filter((l) => only.includes(l.slug)) : out;
}
/** AMD-011 part 3: the feed's own pool. Not filtered by QA_ONLY; published = listed in every deployment. */
export function feedLessons(): { published: LessonRef[]; listed: LessonRef[] } {
  const out = all().sort((a, b) => a.slug.localeCompare(b.slug));
  return { published: out.filter((l) => l.status === "published"), listed: out.filter((l) => l.status === "published" || l.status === "review") };
}
