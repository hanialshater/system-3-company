import fs from "node:fs";
import path from "node:path";

export interface LessonRef {
  slug: string;
  domain: string;
  status: string;
  title: string;
}

/** Read lessons straight from disk so QA does not depend on the app's own registry. */
export function lessons(): LessonRef[] {
  const root = path.join(process.cwd(), "src/demos");
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
  const only = process.env.QA_ONLY?.split(",").filter(Boolean);
  return only ? out.filter((l) => only.includes(l.slug)) : out;
}
