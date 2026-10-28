import type { WorldIsland } from "./lessons-world";

export interface WorldConnection {
  fromIsland: string;
  toIsland: string;
  topics: Array<{
    fromConcept: string;
    toConcept: string;
    fromLabel: string;
    toLabel: string;
  }>;
}

interface ConnectionLesson { slug: string; domain: string; concept: string }
interface ConnectionConcept { id: string; name: string; prerequisites?: readonly string[] }
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;

/** Actual curriculum relationships between available islands, not whole-island prerequisites.
 * Membership spokes belong to the view: an absent curriculum edge is never invented here.
 * Aggregating concepts into islands can produce cycles, so no topological ordering is assumed.
 */
export function buildWorldConnections(
  islands: readonly WorldIsland[],
  lessons: readonly ConnectionLesson[],
  concepts: Record<string, readonly ConnectionConcept[]>,
): WorldConnection[] {
  const definitions = new Map<string, ConnectionConcept>();
  for (const [domain, entries] of Object.entries(concepts)) {
    for (const entry of entries) definitions.set(`${domain}:${entry.id}`, entry);
  }

  const slugIslands = new Map<string, Set<string>>();
  const islandOrder = new Map(islands.map(island => [island.id, island.index]));
  for (const island of islands) {
    for (const region of island.regions) {
      for (const lesson of region.lessons) {
        const members = slugIslands.get(lesson.slug) ?? new Set<string>();
        members.add(island.id);
        slugIslands.set(lesson.slug, members);
      }
    }
  }
  const conceptIslands = new Map<string, Set<string>>();
  for (const lesson of lessons) {
    const key = `${lesson.domain}:${lesson.concept}`;
    if (!definitions.has(key)) continue;
    const members = conceptIslands.get(key) ?? new Set<string>();
    for (const island of slugIslands.get(lesson.slug) ?? []) members.add(island);
    if (members.size) conceptIslands.set(key, members);
  }

  const connections = new Map<string, WorldConnection>();
  const reasons = new Map<string, Set<string>>();
  for (const [domain, entries] of Object.entries(concepts)) {
    for (const entry of entries) {
      const toConcept = `${domain}:${entry.id}`;
      const targets = conceptIslands.get(toConcept);
      if (!targets) continue;
      for (const prerequisite of entry.prerequisites ?? []) {
        const fromConcept = prerequisite.includes(":") ? prerequisite : `${domain}:${prerequisite}`;
        const definition = definitions.get(fromConcept);
        const sources = conceptIslands.get(fromConcept);
        if (!definition || !sources) continue;
        for (const fromIsland of sources) {
          for (const toIsland of targets) {
            if (fromIsland === toIsland) continue;
            const key = JSON.stringify([fromIsland, toIsland]);
            const reasonKey = JSON.stringify([fromConcept, toConcept]);
            const seen = reasons.get(key) ?? new Set<string>();
            if (seen.has(reasonKey)) continue;
            seen.add(reasonKey);
            reasons.set(key, seen);
            const connection: WorldConnection = connections.get(key) ?? { fromIsland, toIsland, topics: [] };
            connection.topics.push({ fromConcept, toConcept, fromLabel: definition.name, toLabel: entry.name });
            connections.set(key, connection);
          }
        }
      }
    }
  }

  for (const connection of connections.values()) {
    connection.topics.sort((a, b) => compare(a.fromConcept, b.fromConcept) || compare(a.toConcept, b.toConcept));
  }
  const order = (a: string, b: string) => (islandOrder.get(a) ?? 0) - (islandOrder.get(b) ?? 0) || compare(a, b);
  return [...connections.values()].sort((a, b) => order(a.fromIsland, b.fromIsland) || order(a.toIsland, b.toIsland));
}
