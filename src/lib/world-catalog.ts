import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { domains, visibleDemos } from "./catalog";
import { buildWorld, type WorldConcept } from "./lessons-world";
import { buildWorldConnections } from "./world-connections";
const curriculum = cache(() => {
  const concepts: Record<string, (WorldConcept & { prerequisites?: string[] })[]> = {};
  for (const domain of domains) {
    try { concepts[domain.id] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "curriculum", `${domain.id}.json`), "utf8")).concepts ?? []; }
    catch { concepts[domain.id] = []; }
  }
  return concepts;
});
export const worldCatalog = cache(() => buildWorld(visibleDemos(), domains, curriculum()));
export const worldConnections = cache(() => buildWorldConnections(worldCatalog(), visibleDemos().map(({slug,domain,concept})=>({slug,domain,concept})), curriculum()));
