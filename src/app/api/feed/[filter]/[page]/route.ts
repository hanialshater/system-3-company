// EDD-001 option 3: one static JSON page of the slim feed index per (filter, page).
// Prerendered at build time, so loading more cards costs a CDN hit, not a function call.
import { feedPage, feedPageParams } from "@/lib/feed-index";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return feedPageParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ filter: string; page: string }> }) {
  const { filter, page } = await params;
  return Response.json(feedPage(filter, Number(page)));
}
