// One HQ event with its body (a dispatch brief, a report, a founder message). Off in production
// unless HQ_PUBLIC=1, like the HQ page itself.
import { hqEnabled, loadEvent } from "@/lib/hq";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const { id } = await ctx.params;
  const e = loadEvent(id);
  return e ? Response.json(e) : new Response(null, { status: 404 });
}
