// HQ simulation lab API (W-1503): GET /api/hq/personalization?op=run|saved|compare|meta&…
// Read-only. Runs the offline simulator (simulated personas only) through its JSON CLI; never imports it
// (W-1498). 404 when HQ is off; an error (never a run) in production, even with HQ_PUBLIC=1.
import { hqEnabled } from "@/lib/hq";
import { parseSimRequest } from "@/lib/hq-personalization";
import { BUSY, runSim } from "@/lib/hq-personalization-server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const r = parseSimRequest(new URL(req.url).searchParams);
  if (typeof r === "string") return Response.json({ error: r }, { status: 400 });
  const out = await runSim(r);
  if (out.ok) return Response.json(out.data);
  // One simulator process at a time (W-1530): a second, different request is refused, not queued.
  return Response.json({ error: out.error }, { status: out.error === BUSY ? 429 : 422 });
}
