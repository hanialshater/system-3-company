import type { DemoMeta, DemoStatus } from "@/kit/types";

export const NUMBER_STOPS = ["add-a-zero", "more-digits-not-bigger", "the-equals-sign-balances", "three-pizzas-four-people", "add-the-slices", "scoops-in-three-cups", "divide-six-by-zero", "split-the-sum", "times-can-shrink", "adding-squashes-the-photo", "double-the-size", "cube-the-size"];
export interface WorldLesson { slug: string; title: string; hook: string; durationSec: number; status: DemoStatus }
export interface WorldRegion { id: string; name: string; hint: string; lessons: WorldLesson[] }
export interface WorldIsland { id: string; name: string; domain: string; domainName: string; index: number; regions: WorldRegion[] }
export interface WorldDomain { id: string; name: string; short: string }
export interface WorldConcept { id: string; name: string }
export type WorldView = "map" | "list";
type InventoryLesson = Pick<DemoMeta, "slug" | "title" | "hook" | "durationSec" | "status" | "domain" | "concept">;
const project = (d: InventoryLesson): WorldLesson => ({ slug: d.slug, title: d.title, hook: d.hook, durationSec: d.durationSec, status: d.status });

/** Every real slug exactly once. Metadata publication and verification are never rewritten. */
export function buildWorld(lessons: readonly InventoryLesson[], domains: readonly WorldDomain[], concepts: Record<string, WorldConcept[]> = {}): WorldIsland[] {
  const unique = new Map(lessons.map(d => [d.slug, d]));
  if (unique.size !== lessons.length) throw new Error("World inventory contains duplicate lesson slugs");
  const first = NUMBER_STOPS.flatMap(slug => unique.has(slug) ? [unique.get(slug)!] : []);
  const islands: WorldIsland[] = [];
  if (first.length) {
    const groups = [NUMBER_STOPS.slice(0, 3), NUMBER_STOPS.slice(3, 7), NUMBER_STOPS.slice(7)];
    const names = ["Number Village", "Fraction Harbour", "Scaling Mountain"];
    const hints = ["Numbers & algebra", "Fractions & sharing", "Scale & proportion"];
    islands.push({ id: "number-island", name: "Number Island", domain: "math", domainName: "Mathematics", index: 0, regions: groups.map((slugs, i) => ({ id: `number-${i}`, name: names[i], hint: hints[i], lessons: slugs.flatMap(slug => unique.has(slug) ? [project(unique.get(slug)!)] : []) })).filter(r => r.lessons.length) });
    first.forEach(d => unique.delete(d.slug));
  }
  const ids = [...domains.map(d => d.id), ...[...new Set([...unique.values()].map(d => d.domain))].filter(id => !domains.some(d => d.id === id))];
  for (const domain of ids) {
    const info = domains.find(d => d.id === domain);
    const orderedConcepts = concepts[domain] ?? [];
    const rank = new Map(orderedConcepts.map((c, i) => [c.id, i]));
    const names = new Map(orderedConcepts.map(c => [c.id, c.name]));
    const items = [...unique.values()].filter(d => d.domain === domain).sort((a, b) => (rank.get(a.concept) ?? 99999) - (rank.get(b.concept) ?? 99999) || a.slug.localeCompare(b.slug));
    for (let start = 0; start < items.length; start += 25) {
      const chunk = items.slice(start, start + 25), n = Math.floor(start / 25) + 1;
      const regions: WorldRegion[] = [];
      for (let r = 0; r < chunk.length; r += 5) {
        const group = chunk.slice(r, r + 5);
        const topics = [...new Set(group.map(d => names.get(d.concept)).filter(Boolean))];
        regions.push({ id: `${domain}-${n}-${r / 5}`, name: topics[0] ?? `${info?.short ?? domain} · ${r / 5 + 1}`, hint: topics.slice(1, 3).join(" · ") || info?.name || domain, lessons: group.map(project) });
      }
      islands.push({ id: `${domain}-${n}`, name: `${info?.short ?? domain} Island ${n}`, domain, domainName: info?.name ?? domain, index: islands.length, regions });
    }
  }
  return islands;
}
export const islandLessons = (island: WorldIsland) => island.regions.flatMap(r => r.lessons);
export function worldHref(slug: string, view: WorldView = "map") { return `/learn/world#${new URLSearchParams({ stop: slug, view })}`; }
export function worldPlayerHref(island: string, slug: string, view: WorldView) { return `/learn/world/play/${encodeURIComponent(island)}?${new URLSearchParams({ stop: slug, view })}`; }
export function readWorldLocation(hash: string, islands: readonly WorldIsland[]) {
  const p = new URLSearchParams(hash.replace(/^#/, ""));
  const slug = p.getAll("stop").length === 1 ? p.get("stop") : null;
  const view: WorldView = p.getAll("view").length === 1 && p.get("view") === "list" ? "list" : "map";
  const island = islands.find(i => islandLessons(i).some(l => l.slug === slug)) ?? islands[0];
  return { island, slug: island && islandLessons(island).find(l => l.slug === slug)?.slug || island && islandLessons(island)[0]?.slug || "", view };
}
