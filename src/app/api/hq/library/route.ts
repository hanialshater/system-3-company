// HQ Library search: GET /api/hq/library?q=&type=a,b&sort=relevance|newest|oldest. Read-only; off in
// production unless HQ_PUBLIC=1, like the HQ page itself.
import { hqEnabled } from "@/lib/hq";
import { buildIndex, parseTypes, search, typeCounts } from "@/lib/hq-library";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!hqEnabled()) return new Response(null, { status: 404 });
  const u = new URL(req.url);
  const sort = u.searchParams.get("sort");
  const docs = buildIndex();
  const r = search(docs, {
    q: (u.searchParams.get("q") ?? "").slice(0, 200),
    types: parseTypes(u.searchParams.get("type")),
    sort: sort === "newest" || sort === "oldest" || sort === "relevance" ? sort : undefined,
  });
  return Response.json({ ...r, all: typeCounts(docs) });
}
