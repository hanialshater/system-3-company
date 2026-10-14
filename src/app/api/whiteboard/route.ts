// Saves a sketch to company/meetings/whiteboards/<board>/<file>. Same-origin only, size-capped, path
// allow-listed (src/lib/hq-whiteboard.ts). Off in production unless WHITEBOARD_WRITE=1.
import { eventWriteAllowed } from "@/lib/spike";
import { WB_MAX_BYTES, whiteboardWritable, whiteboardWriteAllowed } from "@/lib/hq-whiteboard";
import { saveSketch } from "@/lib/hq-whiteboard-server";

export const dynamic = "force-dynamic";
const json = (body: unknown, status: number) => Response.json(body, { status });

export async function POST(req: Request) {
  if (!whiteboardWritable()) return json({ error: "whiteboard writes are disabled here" }, 403);
  if (!whiteboardWriteAllowed(req, eventWriteAllowed)) return new Response(null, { status: 403 });
  const text = await req.text();
  if (text.length > WB_MAX_BYTES) return json({ error: "sketch too large" }, 413);
  let body: { file?: unknown; sketch?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "not JSON" }, 400);
  }
  const r = saveSketch(body.file, body.sketch);
  return r.ok ? json(r, 200) : json(r, 400);
}
