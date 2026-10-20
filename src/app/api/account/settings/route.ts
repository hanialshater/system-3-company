// The learner's feed settings (W-1717): GET reads them, PUT is the only writer of the `settings` table (B2).
// Owner: learner-data-engineer. Privacy ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3.
// Design note: company/personalization/data/2026-10-16-settings-api-note.md
// Mounted at /api/account/settings (principal-engineer review 2026-10-16 ruling 1, C1; privacy B2a): ADR-008 scopes
// the session cookie to Path=/api/account, and ADR-008 item 8 makes every /api/account/* route 404 when
// ACCOUNTS_ENABLED is off. Lazy account session/database wiring lives in settings-wiring.ts. The B2 test fails if a route file reappears under src/app/api/settings/.
// No request body, value or error text is logged here or in the handler (B4). Only GET and PUT are exported.

import { handleSettingsGet, handleSettingsPut } from "@/lib/server/personalization/settings-handler";
import { settingsDeps } from "@/lib/server/personalization/settings-wiring";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

const notFound = () => new Response(null, { status: 404, headers: { "cache-control": "no-store" } });

export async function GET(req: Request) {
  const deps = settingsDeps();
  return deps ? handleSettingsGet(req, deps) : notFound();
}

export async function PUT(req: Request) {
  const deps = settingsDeps();
  return deps ? handleSettingsPut(req, deps) : notFound();
}
