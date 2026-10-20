// Lazy account-session/database wiring for explicit account choices. No runtime DDL.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { allDemos, domains } from "@/lib/catalog";
import { buildSettingsCatalog, type SettingsCatalog } from "./settings";
import { accountUserId, accountsEnabled, query } from "../account-route";
import { accountTag } from "../http";
import { pgSettingsStore } from "./settings-store";
import type { SettingsDeps } from "./settings-handler";

let catalogMemo: SettingsCatalog | null = null;

/**
 * The membership catalog. Cached per server instance: it is published content, not learner data (the "no cache"
 * rule, D2, is about the learner's row, which is read on every request). Lesson slugs: every meta.json in the
 * registry, drafts included, so a "less of" on a lesson that is later published or unpublished is still a valid id.
 * UNVERIFIED: that Vercel's file tracing ships content/curriculum/*.json with this function (src/app/catalog/page.tsx
 * reads them the same way, but at build time).
 */
export function settingsCatalog(): SettingsCatalog {
  if (catalogMemo) return catalogMemo;
  const curricula = domains.map((d) => {
    const p = path.join(process.cwd(), "content/curriculum", `${d.id}.json`);
    return fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as { concepts?: { id?: unknown }[] }) : { concepts: [] };
  });
  catalogMemo = buildSettingsCatalog(
    domains.map((d) => d.id),
    curricula,
    allDemos.map((d) => d.slug),
  );
  return catalogMemo;
}

/** Lazy wiring: importing the route does not construct auth or a database pool. */
export function settingsDeps(): SettingsDeps {
  return {
    enabled: () => accountsEnabled(process.env),
    userId: accountUserId,
    accountTag: (id) => {
      const secret = process.env.BETTER_AUTH_SECRET;
      if (!secret) throw Object.assign(new Error("auth secret missing"), { code: "SECR0" });
      return accountTag(secret, id);
    },
    store: pgSettingsStore(query),
    catalog: settingsCatalog,
  };
}
