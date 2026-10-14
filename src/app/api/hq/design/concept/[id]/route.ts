// One UI concept for the HQ Design inspector: its file and the review findings that touch it. Gated
// like HQ. An id that is not a UI concept is a link from before the curriculum inspector moved to
// /hq/curriculum (2026-10-13), so it redirects to /api/hq/curriculum/concept/<key>.
import { hqEnabled } from "@/lib/hq";
import { conceptDetail } from "@/lib/hq-design";

export const dynamic = "force-dynamic";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const { id } = await ctx.params;
  const key = decodeURIComponent(id);
  if (/^[a-z0-9][a-z0-9-]*$/.test(key)) {
    const d = conceptDetail(key);
    if (d) return Response.json(d);
  }
  if (!/^[a-z0-9][a-z0-9:-]*$/.test(key)) return new Response(null, { status: 404 });
  return Response.redirect(new URL(`/api/hq/curriculum/concept/${encodeURIComponent(key)}`, req.url), 308);
}
