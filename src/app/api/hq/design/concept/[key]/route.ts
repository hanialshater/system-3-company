// One concept for the HQ Design inspector: its lessons with verdicts, findings, design reviews,
// illustrations, board items and sheet status, plus the concept's design notes. Gated like HQ.
import { hqEnabled } from "@/lib/hq";
import { conceptDetail } from "@/lib/hq-design";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ key: string }> }) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const { key } = await ctx.params;
  const d = conceptDetail(decodeURIComponent(key));
  return d ? Response.json(d) : new Response(null, { status: 404 });
}
