import "server-only";
import fs from "node:fs";
import path from "node:path";
import { domains, visibleDemos } from "./catalog";
import { buildWorld, type WorldConcept } from "./lessons-world";

export function worldCatalog() {
  const concepts: Record<string, WorldConcept[]> = {};
  for (const domain of domains) {
    try { concepts[domain.id] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "curriculum", `${domain.id}.json`), "utf8")).concepts ?? []; }
    catch { concepts[domain.id] = []; }
  }
  return buildWorld(visibleDemos(), domains, concepts);
}
