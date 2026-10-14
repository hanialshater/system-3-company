// One HQ Library doc: GET /api/hq/library/doc?path=rituals/records/2026-10-13-wbr.md
// Only indexed .md files under company/ (see safeDocPath). Off in production unless HQ_PUBLIC=1.
import { hqEnabled } from "@/lib/hq";
import { loadDoc } from "@/lib/hq-library";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const d = loadDoc(new URL(req.url).searchParams.get("path") ?? "");
  return d ? Response.json(d) : new Response(null, { status: 404 });
}
