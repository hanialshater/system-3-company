"use client";

// The HQ Library: search and read the markdown in company/ (reports, decisions, tech design, strategy,
// requirements, constitution, courses, reviews, progress log). Results and docs come from /api/hq/library,
// which only serves indexed .md files under company/. The URL always names the state, so every view is a link:
//   /hq/library?q=<text>&type=report,decision&sort=newest   and   /hq/library/<path under company/>
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { DocType, Hit, LoadedDoc } from "@/lib/hq-library";
import { HOME } from "../people";
import Markdown from "./Markdown";
import s from "./library.module.css";

type Sort = "relevance" | "newest" | "oldest";
interface Result {
  total: number;
  hits: Hit[];
  counts: Record<string, number>;
}
interface Props {
  org: { id: string; title: string }[];
  typeDefs: { id: DocType; label: string; hint: string }[];
  defaults: DocType[];
  all: Record<string, number>;
  initial: { q: string; types: DocType[]; sort: Sort | null; result: Result; doc: LoadedDoc | null };
}

const terms = (q: string) => [...new Set(q.toLowerCase().split(/[^a-z0-9_]+/).filter((t) => t.length > 1 || /^\d$/.test(t)))].slice(0, 8);

function Mark({ text, q }: { text: string; q: string }) {
  const t = terms(q);
  if (!t.length) return <>{text}</>;
  const re = new RegExp(`(${t.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}
    </>
  );
}

/** A room on the floor plan for each kind of doc (the HQ page names rooms; see ROOMS in src/lib/hq.ts). */
function roomFor(d: { type: DocType; path: string }): { id: string; label: string } | null {
  const p = d.path.toLowerCase();
  if (d.type === "report") {
    if (p.includes("wbr") || p.includes("mbr")) return { id: "meeting-wbr", label: "WBR room" };
    if (p.includes("retro")) return { id: "meeting-retro", label: "Retro room" };
    if (p.includes("planning")) return { id: "meeting-planning", label: "Planning room" };
    if (p.includes("launch")) return { id: "launch-room", label: "Launch room" };
    if (p.includes("eng-review")) return { id: "engineering", label: "Engineering review room" };
    return { id: "meeting-wbr", label: "WBR room" };
  }
  if (d.type === "tech") return { id: "engineering", label: "Engineering review room" };
  if (d.type === "requirements") return { id: "product", label: "Product" };
  if (d.type === "strategy") return { id: p.startsWith("domains/") ? "strategy" : "product", label: p.startsWith("domains/") ? "Strategy" : "Product" };
  if (d.type === "constitution") return { id: "constitution", label: "Constitution" };
  if (d.type === "courses") return { id: "courses", label: "Courses" };
  if (d.type === "decision") return { id: "product", label: "Product" };
  return null;
}

const urlFor = (path: string | null, q: string, types: DocType[], defaults: DocType[], sort: Sort | null) => {
  const u = new URLSearchParams();
  if (q) u.set("q", q);
  if (types.slice().sort().join() !== defaults.slice().sort().join()) u.set("type", types.join(","));
  if (sort) u.set("sort", sort);
  const qs = u.toString();
  return `/hq/library${path ? `/${path.split("/").map(encodeURIComponent).join("/").replace(/%40/g, "@")}` : ""}${qs ? `?${qs}` : ""}`;
};

export default function Library({ org, typeDefs, defaults, all, initial }: Props) {
  const [q, setQ] = useState(initial.q);
  const [types, setTypes] = useState<DocType[]>(initial.types);
  const [sort, setSort] = useState<Sort | null>(initial.sort);
  const [result, setResult] = useState<Result>(initial.result);
  const [doc, setDoc] = useState<LoadedDoc | null>(initial.doc);
  const [docErr, setDocErr] = useState<string | null>(null);
  const [limit, setLimit] = useState(50);
  const [busy, setBusy] = useState(false);
  const first = useRef(true);
  const paneRef = useRef<HTMLElement>(null);
  const label = useMemo(() => Object.fromEntries(typeDefs.map((t) => [t.id, t.label])) as Record<string, string>, [typeDefs]);

  // Search as you type (200 ms), keep the URL in step without a navigation.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const ctl = new AbortController();
    const id = setTimeout(() => {
      setBusy(true);
      const u = new URLSearchParams({ q, type: types.join(",") });
      if (sort) u.set("sort", sort);
      fetch(`/api/hq/library?${u}`, { signal: ctl.signal })
        .then((r) => r.json())
        .then((r: Result) => (setResult(r), setLimit(50), setBusy(false)))
        .catch(() => undefined);
    }, 200);
    window.history.replaceState(null, "", urlFor(doc?.path ?? null, q, types, defaults, sort));
    return () => (clearTimeout(id), ctl.abort());
  }, [q, types, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  const open = useCallback(
    async (path: string, push = true) => {
      setDocErr(null);
      const r = await fetch(`/api/hq/library/doc?path=${encodeURIComponent(path)}`);
      if (!r.ok) return setDocErr(`Not found in the Library: ${path}`);
      const d: LoadedDoc = await r.json();
      setDoc(d);
      if (!types.includes(d.type)) setTypes((t) => [...t, d.type]);
      if (push) window.history.pushState(null, "", urlFor(d.path, q, types, defaults, sort));
      paneRef.current?.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
    },
    [q, types, defaults, sort],
  );
  const close = () => (setDoc(null), setDocErr(null), window.history.pushState(null, "", urlFor(null, q, types, defaults, sort)));

  // Back and forward: re-read the URL.
  useEffect(() => {
    const on = () => {
      const u = new URL(window.location.href);
      const path = decodeURIComponent(u.pathname.replace(/^\/hq\/library\/?/, ""));
      setQ(u.searchParams.get("q") ?? "");
      const t = (u.searchParams.get("type") ?? "").split(",").filter(Boolean) as DocType[];
      setTypes(t.length ? t : defaults);
      setSort((u.searchParams.get("sort") as Sort) || null);
      if (path) open(path, false);
      else setDoc(null);
    };
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, [defaults, open]);

  const toggle = (t: DocType) => setTypes((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]));
  const owners = useMemo(() => {
    if (!doc?.owner) return [];
    const o = doc.owner.toLowerCase();
    return org.filter((r) => new RegExp(`(^|[^a-z0-9-])${r.id}([^a-z0-9-]|$)`).test(o)).slice(0, 4);
  }, [doc, org]);
  const room = doc ? roomFor(doc) : null;
  const shown = result.hits.slice(0, limit);
  const effSort: Sort = sort ?? (q.trim() ? "relevance" : "newest");

  return (
    <main className={s.page}>
      <nav className={s.top}>
        <Link className="brand" href="/">
          S3
        </Link>
        <div className={s.title}>
          <strong>System 3 HQ</strong>
          <span className={s.muted}>Library · {Object.values(all).reduce((a, b) => a + b, 0).toLocaleString()} documents from company/</span>
        </div>
        <span className={s.spacer} />
        <div className={s.tabs} role="tablist">
          {[["Office", "/hq"], ["People", "/hq?view=people"], ["Kudos", "/hq/kudos"], ["Design", "/hq/design"], ["Curriculum", "/hq/curriculum"]].map(([l, h]) => (
            <Link key={l} role="tab" aria-selected={false} className={s.tab} href={h}>
              {l}
            </Link>
          ))}
          <span role="tab" aria-selected className={s.tabOn}>
            Library
          </span>
        </div>
        <Link className="brand-link" href="/catalog">
          Map
        </Link>
      </nav>

      <div className={`${s.layout} ${doc || docErr ? s.reading : ""}`}>
        <section className={s.list} aria-label="Search">
          <input
            className={s.search}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reports, decisions, designs, PRDs…"
            aria-label="Search the Library"
            autoFocus={!initial.doc}
          />
          <div className={s.chips} role="group" aria-label="Type">
            {typeDefs.map((t) => {
              const n = q.trim() ? (result.counts[t.id] ?? 0) : (all[t.id] ?? 0);
              const on = types.includes(t.id);
              return (
                <button key={t.id} className={on ? s.chipOn : s.chipOff} aria-pressed={on} title={t.hint} onClick={() => toggle(t.id)}>
                  {t.label} <span className={s.n}>{n.toLocaleString()}</span>
                </button>
              );
            })}
            <button className={s.chipLink} onClick={() => setTypes(typeDefs.map((t) => t.id))}>all</button>
            <button className={s.chipLink} onClick={() => setTypes(defaults)}>default</button>
          </div>
          <div className={s.bar}>
            <span className={s.muted} aria-live="polite">
              {busy ? "Searching…" : `${result.total.toLocaleString()} ${result.total === 1 ? "document" : "documents"}${result.total > result.hits.length ? `, top ${result.hits.length}` : ""}`}
            </span>
            <label className={s.sort}>
              Sort{" "}
              <select value={effSort} onChange={(e) => setSort(e.target.value as Sort)}>
                {q.trim() && <option value="relevance">Best match</option>}
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
          </div>
          <ul className={s.results}>
            {shown.map((h) => (
              <li key={h.path}>
                <a
                  className={`${s.hit} ${doc?.path === h.path ? s.hitOn : ""}`}
                  href={`/hq/library/${h.path}`}
                  onClick={(e) => (e.preventDefault(), open(h.path))}
                >
                  <span className={s.hitTitle}>
                    <Mark text={h.title} q={q} />
                  </span>
                  <span className={s.meta}>
                    <span className={`${s.type} ${s[`t_${h.type}`] ?? ""}`}>{label[h.type]}</span>
                    {h.date && <span>{h.date}</span>}
                    {h.owner && <span className={s.owner}>{h.owner}</span>}
                  </span>
                  {h.snippet && (
                    <span className={s.snip}>
                      <Mark text={h.snippet} q={q} />
                    </span>
                  )}
                  <span className={s.path}>{h.path}</span>
                </a>
              </li>
            ))}
          </ul>
          {result.total === 0 && !busy && (
            <p className={s.empty}>
              Nothing matches{q ? ` "${q}"` : ""} in the chosen types.
              {!types.includes("lesson-review") && <> Per-lesson reviews are off by default: <button className={s.chipLink} onClick={() => toggle("lesson-review")}>include them</button>.</>}
            </p>
          )}
          {result.hits.length > limit && (
            <button className={s.more} onClick={() => setLimit((l) => l + 50)}>
              Show 50 more
            </button>
          )}
        </section>

        <article className={s.reader} ref={paneRef} aria-label="Document">
          {docErr && <p className={s.empty}>{docErr}</p>}
          {!doc && !docErr && (
            <p className={s.empty}>
              Pick a document to read it here. Try <button className={s.chipLink} onClick={() => setQ("launch review")}>launch review</button>,{" "}
              <button className={s.chipLink} onClick={() => setQ("EDD")}>EDD</button> or{" "}
              <button className={s.chipLink} onClick={() => setQ("PRD")}>PRD</button>.
            </p>
          )}
          {doc && (
            <>
              <button className={s.back} onClick={close}>
                ← Results
              </button>
              <h1 className={s.docTitle}>{doc.title}</h1>
              <div className={s.meta}>
                <span className={`${s.type} ${s[`t_${doc.type}`] ?? ""}`}>{label[doc.type]}</span>
                {doc.date && <span>{doc.date}</span>}
                {doc.owner && <span className={s.owner}>owner: {doc.owner}</span>}
              </div>
              <div className={s.meta}>
                <code className={s.path}>company/{doc.path.replace("@", " › ")}</code>
              </div>
              {(owners.length > 0 || room) && (
                <div className={s.plan}>
                  <span className={s.muted}>On the floor plan:</span>
                  {owners.map((r) => (
                    <Link key={r.id} className={s.planLink} href={`/hq?room=${HOME[r.id] ?? "lobby"}`}>
                      {r.title}
                    </Link>
                  ))}
                  {room && (
                    <Link className={s.planLink} href={`/hq?room=${room.id}`}>
                      {room.label}
                    </Link>
                  )}
                </div>
              )}
              {doc.truncated && <p className={s.warn}>This file is long, so only the first 200 KB is shown.</p>}
              <Markdown text={doc.body} links={doc.links} onOpen={(p) => open(p)} />
            </>
          )}
        </article>
      </div>
    </main>
  );
}
