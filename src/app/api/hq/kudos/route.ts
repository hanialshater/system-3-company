// Founder gives kudos from HQ. POST only, local only: fails closed (404) in production, even with HQ_PUBLIC.
import { hqEnabled } from "@/lib/hq";
import { giveKudos, kudosWritable } from "@/lib/hq-kudos-server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!hqEnabled() || !kudosWritable()) return new Response(null, { status: 404 });
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return Response.json({ error: "cross-origin" }, { status: 403 });
  const text = await req.text();
  if (text.length > 4000) return Response.json({ error: "too large" }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }
  const r = giveKudos(body);
  return r.ok ? Response.json(r) : Response.json(r, { status: 400 });
}
