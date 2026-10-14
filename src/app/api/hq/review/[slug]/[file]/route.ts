// One review record (company/reviews/<slug>/<file>.md) as plain text, so the HQ inspectors can link a
// finding to the record it came from. Gated like HQ. The slug must be a lesson on disk and the file
// must be a .md file listed in that lesson's review folder, so no path can escape it.
import { hqEnabled } from "@/lib/hq";
import { reviewFile } from "@/lib/hq-lessons";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string; file: string }> }) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const { slug, file } = await ctx.params;
  const text = reviewFile(slug, decodeURIComponent(file));
  if (text == null) return new Response(null, { status: 404 });
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
