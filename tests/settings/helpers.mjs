// Shared fixtures for the settings API tests (W-1717). Fake data only; no database, no network.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const lib = (f) => new URL(`../../src/lib/server/personalization/${f}`, import.meta.url).href;
export const settingsMod = () => import(lib("settings.ts"));
export const handlerMod = () => import(lib("settings-handler.ts"));
export const storeMod = () => import(lib("settings-store.ts"));

/** A small fake catalog: the overlap case ("overfitting" is both a concept and a lesson) is deliberate. */
export const FAKE = {
  domains: new Set(["math", "cs", "history"]),
  concepts: new Set(["binary-search", "overfitting"]),
  lessons: new Set(["fake-lesson", "overfitting"]),
};

/** The real catalog, built from the files the wiring reads (content/domains.json, content/curriculum, src/demos). */
export async function realCatalog() {
  const { buildSettingsCatalog } = await settingsMod();
  const domains = JSON.parse(fs.readFileSync(path.join(REPO, "content/domains.json"), "utf8")).domains.map((d) => d.id);
  const curricula = domains
    .map((id) => path.join(REPO, "content/curriculum", `${id}.json`))
    .filter((p) => fs.existsSync(p))
    .map((p) => JSON.parse(fs.readFileSync(p, "utf8")));
  const slugs = [];
  const demos = path.join(REPO, "src/demos");
  for (const d of fs.readdirSync(demos, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const s of fs.readdirSync(path.join(demos, d.name), { withFileTypes: true })) {
      if (s.isDirectory() && fs.existsSync(path.join(demos, d.name, s.name, "meta.json"))) slugs.push(s.name);
    }
  }
  return buildSettingsCatalog(domains, curricula, slugs);
}

const { applyWrite, sameSettings } = await settingsMod();

/**
 * An in-memory store standing in for the `settings` table with a stub auth_user, as in W-1942's SQL test.
 * It models the store's atomicity contract (D2a): put applies the write rule (applyWrite, the reference model of the
 * single SQL statement) to the row as it is at that moment, with no await between reading and writing the row, which
 * is what one Postgres statement on a locked row gives. It does not prove the SQL; test-settings-write-sql.mjs does.
 * `calls.put` counts calls; `calls.writes` counts rows actually created or changed.
 * `hold()` makes the next put wait until the returned release() is called (to interleave requests).
 */
export function memoryStore({ failWith } = {}) {
  const rows = new Map();
  const calls = { get: 0, put: [], writes: [] };
  let gate = null;
  return {
    rows,
    calls,
    hold() {
      let release;
      gate = new Promise((r) => (release = r));
      return () => release();
    },
    async get(userId) {
      calls.get++;
      if (failWith) throw failWith;
      const r = rows.get(userId);
      return r ? structuredClone(r) : null;
    },
    async put(userId, patch) {
      calls.put.push({ userId, keys: Object.keys(patch).sort(), patch: structuredClone(patch) });
      if (gate) {
        const g = gate;
        gate = null;
        await g;
      }
      if (failWith) throw failWith;
      // From here to the return there is no await: one atomic step, like the single statement.
      const before = rows.get(userId) ?? null;
      const after = applyWrite(before, patch);
      if (after && !(before && sameSettings(before, after))) {
        calls.writes.push({ userId, value: structuredClone(after) });
        rows.set(userId, structuredClone(after));
      }
      return after ? structuredClone(after) : null;
    },
  };
}

export function deps(store, over = {}) {
  const lines = [];
  return {
    lines,
    enabled: () => true,
    userId: async () => "u-fake-1",
    store,
    catalog: () => FAKE,
    log: (l) => lines.push(l),
    ...over,
  };
}

export const URL_ = "https://s3c.example/api/account/settings";
export function put(body, { origin = "https://s3c.example", headers = {} } = {}) {
  const h = { "content-type": "application/json", ...headers };
  if (origin) h.origin = origin;
  return new Request(URL_, { method: "PUT", headers: h, body: typeof body === "string" ? body : JSON.stringify(body) });
}
export const get = () => new Request(URL_, { method: "GET" });
