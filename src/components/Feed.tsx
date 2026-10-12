"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DemoMeta } from "@/kit/types";
import { dayMsFromLocation, loadProgress, revisitDue, track, updateProgress } from "@/kit/progress";
import { DemoCard, type DomainInfo } from "./DemoCard";

type Item =
  | { kind: "intro"; key: string }
  | { kind: "lesson"; key: string; meta: DemoMeta }
  | { kind: "revisit"; key: string; meta: DemoMeta };

/** Round-robin across domains so the feed alternates subjects; published lessons first. */
function interleave(demos: DemoMeta[]): DemoMeta[] {
  const rank = (d: DemoMeta) => (d.status === "published" ? 0 : 1);
  const byDomain = new Map<string, DemoMeta[]>();
  for (const d of [...demos].sort((a, b) => rank(a) - rank(b) || a.slug.localeCompare(b.slug))) {
    byDomain.set(d.domain, [...(byDomain.get(d.domain) ?? []), d]);
  }
  const queues = [...byDomain.values()];
  const out: DemoMeta[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

export function Feed({ demos, domains }: { demos: DemoMeta[]; domains: DomainInfo[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [revisits, setRevisits] = useState<DemoMeta[]>([]);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const domainById = useMemo(() => Object.fromEntries(domains.map((d) => [d.id, d])), [domains]);

  useEffect(() => {
    const progress = loadProgress();
    const dayMs = dayMsFromLocation();
    setRevisits(demos.filter((d) => progress[d.slug] && revisitDue(progress[d.slug], Date.now(), dayMs)));
  }, [demos]);

  const items: Item[] = useMemo(() => {
    const lessons = interleave(filter === "all" ? demos : demos.filter((d) => d.domain === filter));
    const due = revisits.filter((r) => filter === "all" || r.domain === filter);
    const out: Item[] = [{ kind: "intro", key: "intro" }];
    lessons.forEach((meta, i) => {
      // Revisits come back between new lessons: retrieval before more input.
      if (i % 3 === 1 && due.length) {
        const r = due.shift()!;
        out.push({ kind: "revisit", key: `revisit-${r.slug}`, meta: r });
      }
      out.push({ kind: "lesson", key: meta.slug, meta });
    });
    for (const r of due) out.push({ kind: "revisit", key: `revisit-${r.slug}`, meta: r });
    return out;
  }, [demos, filter, revisits]);

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
    if (!root) return;
    root.scrollBy({ top: delta * root.clientHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowDown" || e.key === "j") (e.preventDefault(), go(1));
      if (e.key === "ArrowUp" || e.key === "k") (e.preventDefault(), go(-1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const chooseFilter = (id: string) => {
    setFilter(id);
    scroller.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="feed-wrap">
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
        <a className="brand-link" href="/catalog">
          Map
        </a>
      </nav>

      <div className="feed" ref={scroller} data-testid="feed">
        {items.map((it, i) => (
          <section key={it.key} className="slot-screen" data-index={i}>
            {it.kind === "intro" && <IntroCard onStart={() => go(1)} count={items.filter((x) => x.kind === "lesson").length} />}
            {it.kind === "lesson" && (
              <DemoCard meta={it.meta} domain={domainById[it.meta.domain]} active={Math.abs(active - i) <= 1} />
            )}
            {it.kind === "revisit" && <RevisitCard meta={it.meta} domain={domainById[it.meta.domain]} />}
          </section>
        ))}
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

function RevisitCard({ meta, domain }: { meta: DemoMeta; domain: DomainInfo }) {
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
