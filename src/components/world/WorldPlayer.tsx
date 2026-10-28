"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DemoCard, type DomainInfo } from "@/components/DemoCard";
import type { FeedItem } from "@/lib/feed-types";
import { worldHref } from "@/lib/lessons-world";
import styles from "./world-player.module.css";

export function WorldPlayer({ islandId, islandName, items, domains }: { islandId: string; islandName: string; items: FeedItem[]; domains: DomainInfo[] }) {
  const params = useSearchParams();
  const initial = Math.max(0, items.findIndex(l => l.slug === params.get("stop")));
  const view = params.get("view") === "list" ? "list" : "map";
  const [active, setActive] = useState(initial);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    root.scrollTop = initial * root.clientHeight;
    const observer = new IntersectionObserver(entries => {
      const best = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!best || best.intersectionRatio < .6) return;
      const index = Number((best.target as HTMLElement).dataset.worldIndex);
      setActive(index);
      const url = new URL(window.location.href); url.searchParams.set("stop", items[index].slug);
      history.replaceState(null, "", url);
    }, { root, threshold: [.6, .8] });
    root.querySelectorAll("[data-world-index]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
    // The initial URL selects a card once; swiping then owns position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandId, items]);
  function returnPosition() {
    try {
      const saved = JSON.parse(sessionStorage.getItem("s3:world-position:v1") ?? "null");
      if (saved) sessionStorage.setItem("s3:world-position:v1", JSON.stringify({ ...saved, slug: items[active].slug, view }));
    } catch { /* Return selection still travels in the URL. */ }
  }
  function move(delta: number) {
    const next = Math.max(0, Math.min(items.length - 1, active + delta));
    container.current?.scrollTo({ top: next * container.current.clientHeight, behavior: "instant" });
  }
  return <main className={`single ${styles.player}`} data-testid="world-player">
    <nav className={styles.nav} aria-label="Island lesson navigation">
      <Link href={worldHref(items[active].slug, view)} onClick={returnPosition}>← World</Link>
      <span>{islandName}<small>Unchecked · {active + 1} / {items.length}</small></span>
      <div><button type="button" aria-label="Previous lesson" disabled={active === 0} onClick={() => move(-1)}>↑</button><button type="button" aria-label="Next lesson" disabled={active === items.length - 1} onClick={() => move(1)}>↓</button></div>
    </nav>
    <div className={styles.scroll} ref={container} tabIndex={0} aria-label="Swipe vertically through island lessons" onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); move(e.key === "ArrowDown" ? 1 : -1); } }}>
      {items.map((item, index) => <section key={item.slug} className="slot-screen" data-world-index={index} aria-label={`Lesson ${index + 1}: ${item.title}`}>
        {Math.abs(index - active) <= 1 ? <DemoCard meta={item} domain={domains.find(d => d.id === item.domain)!} active={index === active} standalone /> : <div className={styles.placeholder}>{item.title}</div>}
      </section>)}
      <section className={`slot-screen ${styles.finish}`}><h1>Another island awaits.</h1><p>You’ve reached the end of this island.</p><Link href={worldHref(items[items.length - 1].slug, view)} onClick={returnPosition}>Back to your world ↗</Link></section>
    </div>
  </main>;
}
