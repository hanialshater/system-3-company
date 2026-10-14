// Minimal, anonymous event intake. On Vercel these land in the function logs;
// locally they print to the dev server. No cookies, no identifiers.
// The Analytics Steward owns what these events are taken to mean
// (company/product/surface-value.md). A click count is not a learning outcome.
// Writes from sandboxed frames (Origin: null), other origins and the /spike harness are refused
// (W-477; src/lib/spike.ts eventWriteAllowed).

import { eventWriteAllowed } from "@/lib/spike";

const ALLOWED = new Set(["view", "predict", "interact", "reveal", "recall", "complete"]);

export async function POST(req: Request) {
  if (!eventWriteAllowed(req)) return new Response(null, { status: 403 });
  try {
    const body = await req.json();
    if (body && ALLOWED.has(body.type) && typeof body.slug === "string") {
      console.log(JSON.stringify({ at: new Date().toISOString(), ...body }));
    }
  } catch {
    /* malformed events are dropped */
  }
  return new Response(null, { status: 204 });
}
