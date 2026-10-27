"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { islandLessons, readWorldLocation, worldHref, worldPlayerHref, type WorldIsland, type WorldView } from "@/lib/lessons-world";
import { LESSON_STATUS_LABEL } from "@/lib/lesson-status";
import { STOP_POINTS, WorldScene } from "./WorldScene";
import styles from "./world.module.css";

const STORAGE_KEY = "s3:world-position:v1";
export function LessonsWorld({ islands }: { islands: WorldIsland[] }) {
  const initial = islands[0] && islandLessons(islands[0])[0];
  const [selected, setSelected] = useState(initial?.slug ?? "");
  const [view, setView] = useState<WorldView>("map");
  const [limit, setLimit] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const restoration = useRef<number | null>(null);
  const island = islands.find(i => islandLessons(i).some(l => l.slug === selected)) ?? islands[0];
  const lesson = island && islandLessons(island).find(l => l.slug === selected);
  const total = islands.reduce((n, i) => n + islandLessons(i).length, 0);
  const domainStarts = islands.filter((i, index) => index === 0 || i.domain !== islands[index - 1].domain);

  useEffect(() => {
    const read = () => {
      const location = readWorldLocation(window.location.hash, islands);
      setSelected(location.slug); setView(location.view);
      const index = islands.findIndex(i => i.id === location.island?.id);
      let nextLimit = Math.max(2, index + 2);
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
        if (saved && saved.slug === location.slug && saved.view === location.view && Number.isFinite(saved.y)) {
          nextLimit = Math.max(nextLimit, Number(saved.limit) || 2); restoration.current = Math.max(0, saved.y);
        } else if (new URLSearchParams(window.location.hash.slice(1)).get("stop") === location.slug) restoration.current = -index - 1;
      } catch { /* Navigation still works without storage. */ }
      setLimit(Math.min(islands.length, nextLimit)); setReady(true);
    };
    read(); window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [islands]);
  useEffect(() => {
    if (!ready || restoration.current === null) return;
    const y = restoration.current; restoration.current = null;
    const frame = requestAnimationFrame(() => {
      if (y >= 0) window.scrollTo({ top: y, behavior: "instant" });
      else (document.getElementById(`world-stop-${selected}`) ?? document.getElementById(`island-${islands[-y - 1]?.id}`))?.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(frame);
  }, [ready, limit, islands, selected]);
  useEffect(() => {
    const target = sentinel.current;
    if (!target || limit >= islands.length) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) setLimit(n => Math.min(islands.length, n + 2));
    }, { rootMargin: "1200px" });
    observer.observe(target); return () => observer.disconnect();
  }, [limit, islands.length, view]);

  function select(slug: string, nextView = view) {
    setSelected(slug); setView(nextView);
    history.replaceState(null, "", worldHref(slug, nextView));
  }
  function save() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ slug: selected, view, y: window.scrollY, limit })); } catch { /* Optional return-position persistence. */ }
  }
  function jump(id: string) {
    const index = islands.findIndex(i => i.id === id);
    if (index < 0) return;
    setLimit(n => Math.max(n, index + 2));
    select(islandLessons(islands[index])[0].slug);
    requestAnimationFrame(() => document.getElementById(`island-${id}`)?.scrollIntoView({ block: "start", behavior: "instant" }));
  }
  if (!island || !lesson) return <main className={styles.world}><h1>Your world of ideas</h1><p>No lessons are available yet.</p><Link href="/">Back to feed</Link></main>;
  return <main className={styles.world} data-testid="lessons-world">
    <header className={styles.chrome}>
      <Link href="/" className={styles.wordmark} aria-label="System 3 feed">s3<span> / world</span></Link>
      <div className={styles.switch} aria-label="World view">
        <button type="button" aria-pressed={view === "map"} onClick={() => select(selected, "map")}>Map</button>
        <button type="button" aria-pressed={view === "list"} onClick={() => select(selected, "list")}>List</button>
      </div>
      <Link href="/" className={styles.feedLink}>Feed ↗</Link>
    </header>
    <div className={styles.layout}>
      <div className={styles.landscape}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>A little curiosity. A whole world.</p>
          <h1><span className={styles.desktopTitle}>Follow your<br/><em>wonder.</em></span><span className={styles.mobileTitle}>World of <em>wonder.</em></span></h1>
          <p>{total.toLocaleString()} lessons, {islands.length} islands.<br/>Pick a question. See where it takes you.</p>
          <label className={styles.jump}>Jump to a subject
            <select aria-label="Jump to a subject" value={island.id === "number-island" ? island.id : domainStarts.find(i => i.domain === island.domain && i.id !== "number-island")?.id ?? island.id} onChange={e => jump(e.target.value)}>
              {domainStarts.map(i => <option key={i.id} value={i.id}>{i.id === "number-island" ? "Start · Number Island" : i.domainName}</option>)}
              {islands.some(i => i.domain === "math" && i.id !== "number-island") && <option value={islands.find(i => i.domain === "math" && i.id !== "number-island")!.id}>More Mathematics</option>}
            </select>
          </label>
          <div className={styles.inspection}><span>Inspection preview</span> Lessons marked Unchecked are open to explore while independent reviews continue.</div>
        </section>
        {view === "map" ? <>
          {islands.slice(0, limit).map((item, index) => <WorldIslandMap key={item.id} island={item} selected={selected} suggested={initial?.slug ?? ""} variant={index} onSelect={select} />)}
          <div ref={sentinel} className={styles.loadMore}>
            {limit < islands.length && <button type="button" onClick={() => setLimit(n => Math.min(islands.length, n + 2))}>Keep exploring ↓</button>}
          </div>
        </> : <div className={styles.list}>
          {islands.map(item => <section id={`island-${item.id}`} key={item.id} className={styles.listIsland}>
            <p className={styles.eyebrow}>{item.domainName}</p><h2>{item.name}</h2>
            {item.regions.map(region => <section key={region.id}><h3>{region.name}</h3><ol>{region.lessons.map(l => <li key={l.slug}>
              <button id={`world-stop-${l.slug}`} type="button" aria-current={l.slug === selected ? "true" : undefined} onClick={() => select(l.slug)}><strong>{l.title}</strong><span>{l.durationSec}s · Unchecked{l.status !== "published" ? ` · ${LESSON_STATUS_LABEL[l.status]}` : ""}</span></button>
              <Link href={worldPlayerHref(item.id, l.slug, view)} onClick={() => { select(l.slug); try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ slug: l.slug, view, y: window.scrollY, limit })); } catch {} }} aria-label={`Open ${l.title}`}>Open ↗</Link>
            </li>)}</ol></section>)}
          </section>)}
        </div>}
        {(view === "list" || limit >= islands.length) && <section className={styles.end}><span aria-hidden="true">✦</span><h2>You’ve reached the horizon.</h2><p>Every available lesson is here.<br/>There’s always another question in the feed.</p><Link href="/">Explore the feed ↗</Link></section>}
      </div>
      <aside className={`${styles.detail} ${expanded ? styles.expanded : ""}`} aria-label="Selected lesson">
        <button type="button" className={styles.sheetToggle} aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>{expanded ? "Less detail ⌄" : "Lesson detail ⌃"}</button>
        <div className={styles.detailBody}>
          <div className={styles.detailMeta}><span>{island.name}</span><span>{lesson.durationSec}s · Unchecked</span></div>
          <h2 aria-live="polite">{lesson.title}</h2>
          <p className={styles.hook}>{lesson.hook}</p>
          {lesson.status !== "published" && <div className={styles.badges}><span>{LESSON_STATUS_LABEL[lesson.status]}</span></div>}
          <p className={styles.detailNote}>Open to explore. Independent lesson reviews are still in progress.</p>
        </div>
        <Link href={worldPlayerHref(island.id, selected, view)} onClick={save} className={styles.openLesson}>Open lesson <span aria-hidden="true">↗</span></Link>
        <p className={styles.playerHint}>Predict. Explore. Swipe to the next idea.</p>
      </aside>
    </div>
  </main>;
}

function WorldIslandMap({ island, selected, suggested, variant, onSelect }: { island: WorldIsland; selected: string; suggested: string; variant: number; onSelect: (slug: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(island.index === 0);
  const showTerrain = seen || islandLessons(island).some(l => l.slug === selected);
  useEffect(() => {
    if (seen || !root.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setSeen(true); observer.disconnect(); }
    }, { rootMargin: "1000px" });
    observer.observe(root.current); return () => observer.disconnect();
  }, [seen]);
  let order = 0;
  return <section ref={root} id={`island-${island.id}`} className={styles.island} aria-label={island.name}>
    <header className={styles.islandHeading}><span className={styles.islandNumber}>{String(island.index + 1).padStart(2, "0")}</span><div><p>{island.domainName}</p><h2>{island.name}</h2><span>{islandLessons(island).length} questions to explore</span></div><span aria-hidden="true" className={styles.headingStar}>✧</span></header>
    {showTerrain ? island.regions.map((region, regionIndex) => <section key={region.id} className={styles.region} aria-label={region.name}>
      <WorldScene variant={variant + regionIndex}/>
      <div className={styles.regionLabel}><span>{String(regionIndex + 1).padStart(2, "0")} / {String(island.regions.length).padStart(2, "0")}</span><h3>{region.name}</h3><p>{region.hint}</p></div>
      {region.lessons.map((l, index) => {
        const number = ++order, point = STOP_POINTS[index];
        return <div key={l.slug} className={styles.stopWrap} style={{ left: `${point.x / 4}%`, top: `${point.y / 6.8}%` }}>
          {l.slug === suggested && <span className={styles.next}>Start here</span>}
          <button id={`world-stop-${l.slug}`} type="button" className={`${styles.stop} ${l.slug === selected ? styles.selected : ""}`} aria-label={`${number}. ${l.title}. Unchecked.`} aria-pressed={l.slug === selected} onClick={() => onSelect(l.slug)}><span>{String(number).padStart(2, "0")}</span></button>
          <span className={styles.tooltip} role="tooltip">{l.title}</span>
        </div>;
      })}
    </section>) : <div className={styles.regionPlaceholder} style={{ aspectRatio: `400 / ${680 * island.regions.length}` }} aria-label="Island scenery loads as you approach" />}
  </section>;
}
