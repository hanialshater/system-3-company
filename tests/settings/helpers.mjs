// Shared fixtures for the settings API tests (W-1538). Fake data only; no database, no network.
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

/** An in-memory store standing in for the `settings` table with a stub auth_user, as in W-1521's SQL test. */
export function memoryStore({ failWith } = {}) {
  const rows = new Map();
  const calls = { get: 0, put: [] };
  return {
    rows,
    calls,
    async get(userId) {
      calls.get++;
      if (failWith) throw failWith;
      const r = rows.get(userId);
      return r ? structuredClone(r) : null;
    },
    async put(userId, s) {
      if (failWith) throw failWith;
      calls.put.push({ userId, keys: Object.keys(s).sort(), value: structuredClone(s) });
      rows.set(userId, structuredClone(s));
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

export const URL_ = "https://s3c.example/api/settings";
export function put(body, { origin = "https://s3c.example", headers = {} } = {}) {
  const h = { "content-type": "application/json", ...headers };
  if (origin) h.origin = origin;
  return new Request(URL_, { method: "PUT", headers: h, body: typeof body === "string" ? body : JSON.stringify(body) });
}
export const get = () => new Request(URL_, { method: "GET" });
