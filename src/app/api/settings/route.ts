// The learner's feed settings (W-1538): GET reads them, PUT is the only writer of the `settings` table (B2).
// Owner: learner-data-engineer. Privacy ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3.
// Design note: company/personalization/data/2026-10-16-settings-api-note.md
// Not wired: 404 until backend-engineer supplies the session, database and flag (settings-wiring.ts). The mount
// path itself is open (ADR-008 scopes the session cookie to /api/account; note §4).
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
