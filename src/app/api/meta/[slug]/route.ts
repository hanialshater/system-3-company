// EDD-001 option 2: full lesson meta on demand (trust sheet, revisit cards). One static JSON per lesson.
import { findDemo, visibleDemos } from "@/lib/catalog";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleDemos({ includeDrafts: true }).map((d) => ({ slug: d.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const meta = findDemo((await params).slug);
  if (!meta) return Response.json({ error: "unknown lesson" }, { status: 404 });
  return Response.json(meta);
}
