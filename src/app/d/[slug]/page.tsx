import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoCard } from "@/components/DemoCard";
import { allDemos, domains, findDemo } from "@/lib/catalog";

export function generateStaticParams() {
  return allDemos.filter((d) => d.status !== "retired").map((d) => ({ slug: d.slug }));
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
        <DemoCard meta={meta} domain={domain} active standalone />
      </div>
    </main>
  );
}
