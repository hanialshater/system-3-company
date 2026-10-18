// HQ simulation lab API (W-1503): GET /api/hq/personalization?op=run|saved|compare|meta&…
// Read-only. Locally it runs the offline simulator (simulated personas only) through its JSON CLI; never imports
// it (W-1498). 404 when HQ is off. In production (HQ_PUBLIC=1) it serves only the committed precomputed runs and
// never runs anything (W-1572 H1; src/lib/hq-personalization-precomputed.ts); missing data is an error, not a run.
import { hqEnabled } from "@/lib/hq";
import { parseSimRequest } from "@/lib/hq-personalization";
import { runSim } from "@/lib/hq-personalization-server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const r = parseSimRequest(new URL(req.url).searchParams);
  if (typeof r === "string") return Response.json({ error: r }, { status: 400 });
  const out = await runSim(r);
  if (out.ok) return Response.json(out.data);
  // One simulator process at a time (W-1530): a second, different request is refused, not queued. The result
  // carries `busy: true` (W-1539 N2), so this does not depend on the message text.
  if (!out.ok && out.busy) return Response.json({ error: out.error }, { status: 429, headers: { "Retry-After": "5" } });
  return Response.json({ error: out.error }, { status: 422 });
}
