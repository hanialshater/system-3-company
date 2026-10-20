"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PublicMeta } from "@/lib/trust";
import { feedSequence } from '@/lib/feed-sequence';
import type { FeedItem, FeedPage } from "@/lib/feed-types";
import { dayMsFromLocation, loadProgress, revisitDue, track, updateProgress } from "@/kit/progress";
import { DemoCard, type DomainInfo } from "./DemoCard";
import AccountFeedController, { type AccountFeedPage } from "./account/AccountFeedController";

/**
 * One loaded list per filter: the cards fetched so far and the next page to ask for (null at the end).
 * `failed`: the last fetch failed. Prefetch stops for this list until the learner taps retry
 * (review 2026-10-14 finding 1: no automatic retry loop against the CDN).
 */
type List = { items: FeedItem[]; next: number | null; loading: boolean; failed: boolean };

/** Fetch more when the active card is this close to the end of what is loaded. */
const PREFETCH_CARDS = 8;
/** At most this many revisit metas are fetched per visit (each is one small static JSON). */
const MAX_REVISITS = 12;

/**
 * EDD-001 options 2+3: the server sends the first page of the slim index (`first`); later pages and
 * other subjects come from /api/feed/<filter>/<page> (static JSON). Order is decided on the server
 * (src/lib/feed-index.ts). Revisits need the recall question, so they fetch /api/meta/<slug>.
 */
export function Feed({ first, counts, domains }: { first: FeedPage; counts: Record<string, number>; domains: DomainInfo[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [lists, setLists] = useState<Record<string, List>>({ all: { items: first.items, next: first.next, loading: false, failed: false } });
  const [revisits, setRevisits] = useState<PublicMeta[]>([]);
  // Revisits go only at item positions after this one, frozen when they arrive, so the card the
  // learner is on (and the ones above it) never shift (review finding 3).
  const [revisitFrom, setRevisitFrom] = useState(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;
  const scroller = useRef<HTMLDivElement>(null);
  const domainById = useMemo(() => Object.fromEntries(domains.map((d) => [d.id, d])), [domains]);
  const inflight = useRef(new Set<string>());
  const requestGeneration = useRef(0);
  const personal = useRef<AccountFeedPage | null>(null);
  const checkingRef=useRef(false);
  const [checkingPreferences,setCheckingPreferences]=useState(false);
  const checkPreferences=useCallback((checking:boolean)=>{checkingRef.current=checking;setCheckingPreferences(checking);if(checking){requestGeneration.current++;inflight.current.clear();setLists(prev=>Object.fromEntries(Object.entries(prev).map(([key,value])=>[key,{...value,loading:false}])));}},[]);
  const [personalPage, setPersonalPage] = useState<AccountFeedPage | null>(null);
  const [pendingPersonal, setPendingPersonal] = useState<AccountFeedPage | null>(null);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const [reasons, setReasons] = useState<Record<string,string>>({});
  const applyPersonal = useCallback((page:AccountFeedPage|null) => {
    if(page&&activeRef.current===0)setRevisitFrom(1);
    ++requestGeneration.current;inflight.current.clear();personal.current=page;setPersonalPage(page);setReasons(page?.reasons??{});setPendingPersonal(null);setRefreshRequired(false);
    setLists(prev=>({...prev,all:{items:page?.items??first.items,next:page?page.next:first.next,loading:false,failed:false}}));
  },[first]);
  const receivePersonal = useCallback((page:AccountFeedPage|null)=>{
    if(!page){if(personal.current){applyPersonal(null);setActive(0);scroller.current?.scrollTo({top:0});}setPendingPersonal(null);return;}
    if(personal.current&&personal.current.accountTag!==page.accountTag){applyPersonal(null);setActive(0);activeRef.current=0;scroller.current?.scrollTo({top:0});}
    if(personal.current?.snapshot===page.snapshot&&personal.current.accountTag===page.accountTag)return;
    if(activeRef.current===0)applyPersonal(page);else setPendingPersonal(page);
  },[applyPersonal]);

  const load = useCallback((f: string, page: number, replace: boolean) => {
    if(f==='all'&&checkingRef.current)return;
    const generation=requestGeneration.current;
    const snapshot=f==='all'?personal.current:null;
    const key = `${generation}/${f}/${page}`;
    if (inflight.current.has(key)) return;
    inflight.current.add(key);
    setLists((prev) => ({ ...prev, [f]: { ...(prev[f] ?? { items: [], next: page }), loading: true, failed: false } }));
    fetch(snapshot?`/api/account/feed?page=${page}&snapshot=${encodeURIComponent(snapshot.snapshot)}`:`/api/feed/${encodeURIComponent(f)}/${page}`,snapshot?{credentials:'same-origin',cache:'no-store'}:undefined)
      .then((r) => {
        if(snapshot&&!r.ok&&generation===requestGeneration.current){applyPersonal(null);setActive(0);scroller.current?.scrollTo({top:0});setRefreshRequired(true);}
        return r.ok ? (r.json() as Promise<FeedPage>) : Promise.reject(new Error(String(r.status)));
      })
      .then((p) => {
        if(generation!==requestGeneration.current)return;
        if(snapshot){const result=p as AccountFeedPage;if(result.accountTag!==snapshot.accountTag||result.snapshot!==snapshot.snapshot||!result.matching){applyPersonal(null);setActive(0);scroller.current?.scrollTo({top:0});setRefreshRequired(true);return;}setReasons(prev=>({...prev,...result.reasons}));}
        setLists((prev) => {
          const have = replace ? [] : (prev[f]?.items ?? []);
          const seen = new Set(have.map((i) => i.slug));
          return { ...prev, [f]: { items: [...have, ...p.items.filter((i) => !seen.has(i.slug))], next: p.next, loading: false, failed: false } };
        });
      })
      .catch(() => {if(generation!==requestGeneration.current)return;if(snapshot)setRefreshRequired(true);setLists((prev) => ({ ...prev, [f]: { ...(prev[f] ?? { items: [], next: page }), loading: false, failed: true } }));})
      .finally(() => inflight.current.delete(key));
  }, [applyPersonal]);

  useEffect(() => {
    const progress = loadProgress();
    const dayMs = dayMsFromLocation();
    const due = Object.keys(progress).filter((slug) => revisitDue(progress[slug], Date.now(), dayMs));
    if (!due.length) return;
    let live = true;
    const fetchMeta = (slug: string) =>
      fetch(`/api/meta/${encodeURIComponent(slug)}`)
        .then((r) => (r.ok ? (r.json() as Promise<PublicMeta>) : null))
        .catch(() => null);
    // The cap applies after the status filter: fetch in batches of MAX_REVISITS until enough are shown
    // or the due list runs out, so retired or renamed slugs (404s) cannot starve valid ones.
    (async () => {
      const shown: PublicMeta[] = [];
      for (let at = 0; at < due.length && shown.length < MAX_REVISITS && live; at += MAX_REVISITS) {
        const metas = await Promise.all(due.slice(at, at + MAX_REVISITS).map(fetchMeta));
        // Only lessons the feed shows come back (drafts and retired lessons stay out, as before).
        for (const m of metas) if (m && (m.status === "published" || m.status === "review")) shown.push(m);
      }
      if (!live || !shown.length) return;
      setRevisitFrom(personal.current&&activeRef.current===0?1:activeRef.current + 2);
      setRevisits(shown.slice(0, MAX_REVISITS));
    })();
    return () => {
      live = false;
    };
  }, []);

  const list = lists[filter] ?? { items: [], next: 0, loading: false, failed: false };

  const items = useMemo(() => feedSequence(list.items,revisits,filter,revisitFrom,!!personalPage,list.next===null),[list,filter,revisits,revisitFrom,personalPage]);

  // EDD-001 option 3: load the next page before the learner reaches the end of what is loaded.
  useEffect(() => {
    // After a failure, wait for the learner's tap (retry below): no automatic retry.
    if (list.next !== null && !list.loading && !list.failed && active >= items.length - PREFETCH_CARDS && !checkingPreferences)
      load(filter, list.next, false);
  }, [active, items.length, list.next, list.loading, list.failed, filter, load, checkingPreferences]);

  // A subject's page 0 replaces the seed taken from "all"; later pages append.
  const retry = () => {
    if (list.next !== null) load(filter, list.next, list.next === 0);
  };

  // Track which card fills the viewport; only it (and its neighbours) mount a demo.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const go = useCallback((delta: number) => {
    const root = scroller.current;
    if (!root || document.querySelector("[role=dialog]")) return;
    const index = Math.max(0, Math.min(root.children.length - 1, Math.round(root.scrollTop / root.clientHeight) + delta));
    root.scrollTo({ top: index * root.clientHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input, textarea, select, button, a, [contenteditable], [role=dialog], [role=slider]") || document.querySelector("[role=dialog]")) return;
      if (e.key === "ArrowDown" || e.key === "j") (e.preventDefault(), go(1));
      if (e.key === "ArrowUp" || e.key === "k") (e.preventDefault(), go(-1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // At a nested scroll boundary, a deliberate vertical swipe advances the feed.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    let start: { x: number; y: number; target: Element } | null = null;
    const begin = (e: TouchEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      start = e.touches.length === 1 && target && !target.closest("button, a, input, textarea, select, [role=slider], [role=dialog], svg, canvas")
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY, target } : null;
    };
    const move = (e: TouchEvent) => {
      if (!start || e.touches.length !== 1) return;
      const dy = start.y - e.touches[0].clientY;
      const dx = start.x - e.touches[0].clientX;
      if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx) * 1.5) return;
      for (let el: Element | null = start.target; el && el !== root; el = el.parentElement) {
        if (el instanceof HTMLElement && /auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 2) {
          if (dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2) return;
        }
      }
      e.preventDefault();
      go(dy > 0 ? 1 : -1);
      start = null;
    };
    root.addEventListener("touchstart", begin, { passive: true });
    root.addEventListener("touchmove", move, { passive: false });
    return () => { root.removeEventListener("touchstart", begin); root.removeEventListener("touchmove", move); };
  }, [go]);

  const chooseFilter = (id: string) => {
    if (!lists[id]) {
      // Show at once what is already loaded (a prefix of that subject's order, see feedOrder), then
      // replace it with the subject's first page from the server.
      const seed = (personal.current ? first.items : (lists.all?.items ?? [])).filter((d) => d.domain === id);
      setLists((prev) => ({ ...prev, [id]: { items: seed, next: 0, loading: false, failed: false } }));
      load(id, 0, true);
    }
    setFilter(id);
    setActive(0);
    setRevisitFrom(0);
    scroller.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="feed-wrap">
      <AccountFeedController onChange={receivePersonal} onChecking={checkPreferences}/>
      <nav className="topbar" aria-label="Subjects">
        <a className="brand" href="/">
          S3
        </a>
        <div className="chips" role="tablist">
          {[{ id: "all", short: "All", color: "var(--fg)" }, ...domains].map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={filter === d.id}
              className={`chip ${filter === d.id ? "on" : ""}`}
              style={{ ["--domain" as string]: d.color }}
              onClick={() => chooseFilter(d.id)}
              data-testid={`chip-${d.id}`}
            >
              {d.short}
            </button>
          ))}
        </div>
        <div className="feed-personal-links"><a href="/library" aria-label="Library" title="Saved lessons"><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg></a><a href="/profile" aria-label="Profile" title="Profile and sign in"><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 22v-2a8 8 0 0 1 16 0v2" /></svg></a></div>
        <a href="/preferences" aria-label="Feed preferences">Preferences</a>
        <a className="brand-link" href="/catalog">
          Map
        </a>
      </nav>

      <nav className="feed-navigation" aria-label="Lesson navigation">
        <button type="button" aria-label="Previous lesson" disabled={active === 0} onClick={() => go(-1)}>↑</button>
        <button type="button" aria-label="Next lesson" onClick={() => go(1)}>↓</button>
      </nav>
      {(pendingPersonal||refreshRequired)&&<div role="status" style={{position:'fixed',bottom:12,left:12,zIndex:25,background:'var(--bg)',padding:12,borderRadius:12}}><button type="button" style={{minHeight:44}} onClick={()=>{activeRef.current=0;if(pendingPersonal)applyPersonal(pendingPersonal);else window.location.reload();setFilter('all');setActive(0);scroller.current?.scrollTo({top:0});}}>Refresh feed to apply your choices</button></div>}
      <div className="feed" ref={scroller} data-testid="feed">
        {items.map((it, i) => (
          <section key={it.key} className="slot-screen" data-index={i} style={{position:"relative"}}>
            {it.kind === "intro" && <><IntroCard onStart={() => go(1)} count={counts[filter] ?? 0} /><div style={{position:'absolute',bottom:24,left:24,right:24}}>
              {checkingPreferences?<p>Checking saved choices…</p>:filter==='all'&&personalPage?<p>Based on your saved choices. <a href="/preferences">Edit preferences</a></p>:<p>Default order — not personalized. <a href="/preferences">Choose preferences</a></p>}
              {(pendingPersonal||refreshRequired)&&<button type="button" onClick={()=>{activeRef.current=0;if(pendingPersonal)applyPersonal(pendingPersonal);else window.location.reload();setActive(0);scroller.current?.scrollTo({top:0});}}>Refresh feed to apply your choices</button>}
            </div></>}
            {it.kind === "lesson" && (
              <><DemoCard meta={it.meta} domain={domainById[it.meta.domain]} active={Math.abs(active - i) <= 1} />
              {filter==='all'&&!checkingPreferences&&reasons[it.meta.slug]&&<details style={{position:'absolute',bottom:12,left:20,right:20,background:'var(--bg)',color:'var(--fg)',padding:8}}><summary>Why this pick?</summary><p>{reasons[it.meta.slug]}</p><a href="/preferences">Edit preferences</a></details>}</>
            )}
            {it.kind === "revisit" && <RevisitCard meta={it.meta} domain={domainById[it.meta.domain]} />}
          </section>
        ))}
        {list.next !== null && (
          <section className="slot-screen">
            <div className="card-shell center" aria-live="polite">
              {list.failed ? (
                <>
                  <p className="muted" data-testid="feed-load-error">
                    Couldn&rsquo;t load more lessons.
                  </p>
                  <button type="button" className="primary" style={{ minHeight: 44 }} onClick={retry} data-testid="feed-retry">
                    Tap to retry
                  </button>
                </>
              ) : (
                <p className="muted">Loading more lessons…</p>
              )}
            </div>
          </section>
        )}
        <section className="slot-screen end">
          <div className="card-shell center">
            <h2 className="card-title">That is everything for now.</h2>
            <p className="card-hook">Come back tomorrow: some of these will return as one-question revisits.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function IntroCard({ onStart, count }: { onStart: () => void; count: number }) {
  return (
    <div className="card-shell center intro" data-testid="intro-card">
      <p className="tag domain">Fresh picks</p>
      <h1 className="card-title big">Sixty seconds. One idea. Guess first.</h1>
      <p className="card-hook">
        Every lesson asks you to commit to a prediction before it shows you anything. Then you play with it, and it
        tells you why. Lessons come back days later as one quick question, because remembering is not knowing.
      </p>
      <p className="muted small">
        We know nothing about you yet, so this feed is not &ldquo;for you&rdquo;. It alternates subjects. {count} lessons
        today.
      </p>
      <button type="button" className="primary" onClick={onStart} data-testid="start">
        Start
      </button>
      <p className="muted tiny">Swipe up, scroll, or press ↓</p>
    </div>
  );
}

function RevisitCard({ meta, domain }: { meta: PublicMeta; domain: DomainInfo }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === meta.recall.answer;
    const p = loadProgress()[meta.slug];
    const spacedDays = p?.completedAt ? Math.round((Date.now() - p.completedAt) / 86_400_000) : 0;
    updateProgress(meta.slug, (prev) => ({ ...prev, recalls: [...prev.recalls, { at: Date.now(), correct }] }));
    track({ type: "recall", slug: meta.slug, correct, spacedDays });
  };
  return (
    <div className="card-shell center" data-testid="revisit-card" style={{ ["--domain" as string]: domain.color }}>
      <p className="tag domain">Revisit · {meta.title}</p>
      <h2 className="card-title">{meta.recall.question}</h2>
      <div className="options">
        {meta.recall.options.map((o, i) => (
          <button
            type="button"
            key={i}
            className={`option ${picked === i ? (i === meta.recall.answer ? "right" : "wrong") : ""} ${picked !== null && i === meta.recall.answer ? "right" : ""}`}
            onClick={() => answer(i)}
            data-testid="recall-option"
          >
            {o}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="why" data-testid="recall-why">
          {picked === meta.recall.answer ? "Still there. " : "Worth another look. "}
          {meta.recall.why}
        </p>
      )}
    </div>
  );
}
