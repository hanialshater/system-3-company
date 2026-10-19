// HQ R&D page (/hq/rnd, W-1833): read side of the code-evolution leaderboards. It serves only the committed file
// src/data/hq-rnd/leaderboards.json, written by `node tools/hq-rnd-precompute.mjs` from the same functions that
// print `node tools/evolve.mjs board <project>` (tools/evolve-board.mjs). It scores nothing, spawns nothing and
// reads nothing under src/lab/, which a deployed build does not carry. Owner: hq-engineer; data owner: rnd-lead.
import { readFileSync } from "node:fs";
import path from "node:path";

export const RND_DATA = "src/data/hq-rnd/leaderboards.json";
export const RND_REGENERATE = "node tools/hq-rnd-precompute.mjs";

export interface RndRow {
  rank: number; id: string; score: number; pass: number; fail: number; gzBytes: number; seed: number | null;
  parents: string[]; gated: boolean; problems: string[]; ts: string; kit: boolean;
}
export interface RndDoc { path: string; name: string; title: string }
export interface RndProject {
  name: string; archive: string; command: string; records: number; weights: Record<string, number> | null;
  warning: string | null; lines: string[]; rows: RndRow[];
  kit: { dir: string; ids: string[]; how: string }; notes: RndDoc[]; edds: RndDoc[];
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export function loadRnd(root = process.cwd()): { projects: RndProject[]; error: string | null } {
  try {
    const d = JSON.parse(readFileSync(path.join(root, RND_DATA), "utf8"));
    if (!isObj(d) || d.schema !== "hq-rnd-leaderboards-v1" || !Array.isArray(d.projects)) throw new Error("unknown shape");
    for (const p of d.projects as unknown[]) {
      if (!isObj(p) || typeof p.name !== "string" || !Array.isArray(p.rows) || !Array.isArray(p.lines) || !isObj(p.kit)) throw new Error("a project is malformed");
    }
    return { projects: d.projects as RndProject[], error: null };
  } catch (e) {
    return { projects: [], error: `The R&D leaderboard data is unavailable (${(e as Error).message}). Regenerate it locally with \`${RND_REGENERATE}\` and commit ${RND_DATA}.` };
  }
}

/** Where a note is read in HQ: the Library serves any markdown under company/. */
export const noteHref = (d: RndDoc) => `/hq/library/${d.path}`;
export const tests = (r: RndRow) => `${r.pass}/${r.pass + r.fail}`;
