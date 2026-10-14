// A lesson's walkthrough contact sheet (artifacts/walkthroughs/<slug>/sheet.png), shared by the HQ
// inspectors (/hq/design and /hq/curriculum).
// Gated like HQ. The slug must name a lesson on disk, so no path can escape the folder.
import fs from "node:fs";
import { hqEnabled } from "@/lib/hq";
import { sheetFile } from "@/lib/hq-lessons";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const { slug } = await ctx.params;
  const f = sheetFile(slug);
  if (!f) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(fs.readFileSync(f)), { headers: { "content-type": "image/png", "cache-control": "no-store" } });
}
