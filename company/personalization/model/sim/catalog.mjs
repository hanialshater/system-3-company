// Pilot lesson catalog for the phase A simulator (W-1494). Offline only; nothing in src/ imports it.
// Reads src/demos/{probability,cs}/*/meta.json and content/curriculum/{probability,cs}.json and derives
// LessonDims as company/personalization/2026-10-16-brief-response.md §2.4 says: domain, concept, level,
// prerequisites from the curriculum, successors as reverse edges. No new meta.json field.
//
// Choices (each a simulator assumption, listed so a reviewer can challenge it):
// - Concept ids are qualified "domain:concept" (curriculum.primary), so cross-domain edges keep their meaning.
// - prerequisites = lesson meta curriculum.prerequisites ∪ the curriculum node's prerequisites, qualified.
//   Prerequisites outside the pilot (e.g. math:exponential-growth) stay listed but can never be completed in
//   the simulation; readiness and the learner model only count IN-PILOT prerequisites (pilotPrereqs()).
// - Visible statuses: published and review (src/lib/visibility.ts: review shows in production, tagged).
//   Drafts and retired are out.
// - misconceptionStrength is a PLACEHOLDER: 1 + (FNV-1a(slug) mod 3). It is NOT a rating; it carries no
//   information about the lesson. The pilot ratings are the CMs' (response §2.4). Until they exist the
//   surprise term ranks lessons by noise, and the simulated learner does not read it (learner.ts).
// - Default order: today's interleave (src/lib/feed-index.ts) restricted to the pilot domains: published
//   first, then slug order, round-robin across domains. The real feed interleaves every domain.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
export const PILOT = ["probability", "cs"];
export const STRENGTH_PLACEHOLDER = { placeholder: true, rule: "1 + FNV-1a(slug) mod 3; not a rating (CMs rate the pilot, response §2.4)" };

const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const q = (domain, id) => (id.includes(":") ? id : `${domain}:${id}`);

export function loadCatalog(root = ROOT) {
  const nodes = {}; // qualified concept -> { level, prerequisites }
  for (const d of PILOT) {
    const cur = JSON.parse(readFileSync(join(root, "content", "curriculum", `${d}.json`), "utf8"));
    for (const c of cur.concepts) nodes[q(d, c.id)] = { level: c.level, prerequisites: (c.prerequisites || []).map((p) => q(d, p)) };
  }
  const lessons = [];
  for (const d of PILOT) {
    const dir = join(root, "src", "demos", d);
    for (const slug of readdirSync(dir).sort()) {
      const f = join(dir, slug, "meta.json");
      if (!existsSync(f)) continue;
      const m = JSON.parse(readFileSync(f, "utf8"));
      if (m.status !== "published" && m.status !== "review") continue;
      const concept = m.curriculum?.primary || q(d, m.concept);
      const node = nodes[concept];
      const prerequisites = [...new Set([...(m.curriculum?.prerequisites || []).map((p) => q(d, p)), ...(node?.prerequisites || [])])]
        .filter((p) => p !== concept);
      lessons.push({ slug, domain: d, concept, level: m.curriculum?.level || node?.level || "intro", prerequisites,
        successors: [], misconceptionStrength: /** @type {1|2|3} */ (1 + (fnv(slug) % 3)), status: m.status });
    }
  }
  // successors: reverse edges over every pilot concept known to the curriculum or a lesson.
  const succ = {};
  const addEdge = (pre, c) => { (succ[pre] ||= new Set()).add(c); };
  for (const [c, n] of Object.entries(nodes)) for (const p of n.prerequisites) addEdge(p, c);
  for (const l of lessons) for (const p of l.prerequisites) addEdge(p, l.concept);
  for (const l of lessons) l.successors = [...(succ[l.concept] || [])].sort();

  // default order (src/lib/feed-index.ts interleave, pilot only)
  const rank = (l) => (l.status === "published" ? 0 : 1);
  const byDomain = new Map();
  for (const l of [...lessons].sort((a, b) => rank(a) - rank(b) || a.slug.localeCompare(b.slug))) byDomain.set(l.domain, [...(byDomain.get(l.domain) || []), l]);
  const queues = [...byDomain.values()].map((x) => [...x]);
  const defaultOrder = [];
  while (queues.some((x) => x.length)) for (const x of queues) if (x.length) defaultOrder.push(x.shift().slug);

  const dims = Object.fromEntries(lessons.map((l) => [l.slug, l]));
  const pilotConcepts = new Set([...Object.keys(nodes), ...lessons.map((l) => l.concept)]);
  const prereqsByConcept = {};
  for (const c of pilotConcepts) {
    const fromLessons = lessons.filter((l) => l.concept === c).flatMap((l) => l.prerequisites);
    prereqsByConcept[c] = [...new Set([...(nodes[c]?.prerequisites || []), ...fromLessons])].filter((p) => pilotConcepts.has(p) && p !== c).sort();
  }
  return { lessons, dims, defaultOrder, pilotConcepts, prereqsByConcept, strength: STRENGTH_PLACEHOLDER };
}
