import { Suspense } from "react";
import { notFound } from "next/navigation";
import { worldCatalog } from "@/lib/world-catalog";
import { domains, visibleDemos } from "@/lib/catalog";
import { islandLessons } from "@/lib/lessons-world";
import { toFeedItem } from "@/lib/feed-index";
import { WorldPlayer } from "@/components/world/WorldPlayer";

export const dynamicParams = false;
export function generateStaticParams() { return worldCatalog().map(i => ({ island: i.id })); }
export const metadata = { title: "Explore an island — System 3" };
export default async function WorldPlayerPage({ params }: { params: Promise<{ island: string }> }) {
  const id = (await params).island;
  const found = worldCatalog().find(i => i.id === id);
  if (!found) notFound();
  const inventory = new Map(visibleDemos().map(d => [d.slug, d]));
  const items = islandLessons(found).map(d => toFeedItem(inventory.get(d.slug)!));
  return <Suspense fallback={<main className="single"><p>Opening island…</p></main>}><WorldPlayer islandId={found.id} islandName={found.name} items={items} domains={domains.map(d => ({ id: d.id, name: d.name, short: d.short, color: d.color }))} /></Suspense>;
}
