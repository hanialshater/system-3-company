// Wiring for the settings route (W-1717). Owner: learner-data-engineer; the session and database pieces are
// backend-engineer's and are NOT wired here, so the route answers 404 everywhere until they are.
//
// UNVERIFIED (the accounts branch is not fetchable in this clone, 2026-10-16). backend-engineer to confirm or supply:
// 1. Session: the helper that returns the signed-in auth_user.id for a Request. ADR-008 scopes the session cookie
//    to Path=/api/account; the route is mounted at /api/account/settings (src/app/api/account/settings/route.ts) so
//    it receives it (principal-engineer review 2026-10-16 ruling 1, C1). backend-engineer acknowledges the namespace
//    and that no /api/account catch-all shadows it. See company/personalization/data/2026-10-16-settings-api-note.md §4.
// 2. Database: src/lib/server/db.ts per the env contract (company/engineering/notes/2026-10-15-accounts-env-contract.md);
//    its query function must match `Query` in settings-store.ts (pg Pool#query shape). Each PUT is one autocommit
//    statement (D2a), so the helper needs no transaction or client checkout.
// 3. Flag: src/lib/server/accounts-flag.ts (ACCOUNTS_ENABLED === "on", read per request, ADR-008 C5).
// Until 1–3 exist, settingsDeps() returns null and the route is 404. Nothing here touches a database.

import "server-only";
import fs from "node:fs";
import path from "node:path";
import { allDemos, domains } from "@/lib/catalog";
import { buildSettingsCatalog, type SettingsCatalog } from "./settings";
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

/** null until backend-engineer wires the session helper, the database and the accounts flag (items 1–3 above). */
export function settingsDeps(): SettingsDeps | null {
  return null;
}
