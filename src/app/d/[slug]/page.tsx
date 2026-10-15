import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoCard } from "@/components/DemoCard";
import { domains, findDemo, visibleDemos } from "@/lib/catalog";
import { toFeedItem } from "@/lib/feed-index";
import { publicMeta } from "@/lib/trust";

// W-945: only slugs generateStaticParams returned may render. Any other slug (a draft on a production build,
// a typo) is a 404 from the router, never an on-demand render, so the build alone decides what is reachable,
// whatever VERCEL/VERCEL_ENV say at runtime, and no 200 for a hidden lesson can be rendered and cached.
// Dev-safe: `next dev` calls generateStaticParams per request with the dev server's env (no VERCEL vars), so
// drafts stay openable for builders. Same rule as src/app/api/meta/[slug]/route.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleDemos({ includeDrafts: true }).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const meta = findDemo((await params).slug);
  return { title: meta ? `${meta.title} — System 3` : "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const meta = findDemo((await params).slug);
  if (!meta || meta.status === "retired") notFound();
  const domain = domains.find((d) => d.id === meta.domain)!;
  return (
    <main className="single">
      <nav className="topbar">
        <Link className="brand" href="/">
          S3
        </Link>
        <span className="muted small">{domain.name}</span>
        <Link className="brand-link" href="/catalog">
          Map
        </Link>
      </nav>
      <div className="slot-screen">
        <DemoCard meta={toFeedItem(meta)} full={publicMeta(meta)} domain={domain} active standalone />
      </div>
    </main>
  );
}
