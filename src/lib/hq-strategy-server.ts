// The HQ Strategy page, disk side: company/strategy/master-plan.md read through the Library's loader (loadDoc).
// Pure side: hq-strategy.ts. Owner: hq-engineer.
import { loadDoc, type LoadedDoc } from "./hq-library";
import { parseAsOf } from "./hq-strategy";

export const MASTER_PLAN = "strategy/master-plan.md";

/**
 * The plan names files as bare paths ("company/initiatives/first-light/charter.md"), which the Library only links
 * when they are in backticks or a markdown link. Backtick each bare path that is a Library doc and map it to its
 * Library path, so it opens in the Library. Paths that are not Library docs stay plain text.
 */
export function linkBarePaths(body: string, exists: (libPath: string) => boolean): { body: string; links: Record<string, string> } {
  const links: Record<string, string> = {};
  const out = body.replace(/(?<!\]\()(?<![`\w/.-])company\/[A-Za-z0-9_./-]+\.md(?!`)/g, (m) => {
    const lib = m.slice("company/".length);
    if (!exists(lib)) return m;
    links[m] = lib;
    return `\`${m}\``;
  });
  return { body: out, links };
}

export function loadStrategy(): { doc: LoadedDoc | null; asOf: string | null } {
  const doc = loadDoc(MASTER_PLAN);
  if (!doc) return { doc: null, asOf: null };
  const bare = linkBarePaths(doc.body, (p) => loadDoc(p) !== null);
  return { doc: { ...doc, body: bare.body, links: { ...bare.links, ...doc.links } }, asOf: parseAsOf(doc.body) };
}
