// Minimal, anonymous event intake. On Vercel these land in the function logs;
// locally they print to the dev server. No cookies, no identifiers.
// The Analytics Steward owns what these events are taken to mean
// (company/product/surface-value.md). A click count is not a learning outcome.
// Writes from sandboxed frames (Origin: null), other origins and the /spike harness are refused
// (W-477; src/lib/spike.ts eventWriteAllowed).
// What is logged is an explicit pick of fields per type, never the body (privacy ruling C1 and C2,
// company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md): see src/lib/events-intake.ts.

import { handleEventPost } from "@/lib/events-intake";

// The catalog is loaded only for an `exp` event that has passed every other check, so the common
// beacon path never pays for it. REGISTERED_EXPERIMENTS is empty in this change, so it is never loaded yet.
const isCatalogSlug = async (slug: string) => {
  const { allDemos } = await import("@/lib/catalog");
  return allDemos.some((d) => d.slug === slug);
};

export async function POST(req: Request) {
  return handleEventPost(req, { isCatalogSlug });
}
