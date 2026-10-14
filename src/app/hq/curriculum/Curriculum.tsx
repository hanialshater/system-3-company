"use client";

// HQ Curriculum inspector (category management; moved from /hq/design on 2026-10-13): every
// curriculum concept, grouped by domain and sub-area, and every lesson for it with its evidence
// (learner verdicts, design reviews, illustrations, board items, contact sheets). The index comes with the page; one concept's detail is fetched from
// /api/hq/curriculum/concept/<key>; sheets stream from /api/hq/sheet/<slug>. Built by design-engineer; used by the category managers.

import { useEffect, useMemo, useRef, useState } from "react";
import { HqTop } from "../HqTop";
import type { ConceptDetail, ConceptRow, CurriculumIndex, LessonDetail, LessonRow, Verdict } from "@/lib/hq-curriculum";
import s from "../hq.module.css";
import d from "./curriculum.module.css";

type VerdictFilter = "" | Verdict | "none";
const VERDICT_CLASS: Record<string, string> = { launch: d.vLaunch, revise: d.vRevise, fatal: d.vFatal };

function VerdictBadge({ v }: { v: Verdict | null }) {
  return <span className={`${d.verdict} ${v ? VERDICT_CLASS[v] : d.vNone}`}>{v ?? "no review"}</span>;
}

export default function Curriculum({ index, initialConcept, initialCompare }: { index: CurriculumIndex; initialConcept: string | null; initialCompare: string[] }) {
  const { domains, concepts, lessons } = index;
  const byKey = useMemo(() => new Map(concepts.map((c) => [c.key, c])), [concepts]);
  const lessonBySlug = useMemo(() => new Map(lessons.map((l) => [l.slug, l])), [lessons]);
  const resolve = (k: string | null) => (k ? (byKey.get(k)?.key ?? concepts.find((c) => c.id === k)?.key ?? null) : null);

  const [sel, setSel] = useState<string | null>(() => resolve(initialConcept));
  const [compare, setCompare] = useState<string[]>(() => initialCompare.filter((x) => lessonBySlug.has(x)));
  const [showCompare, setShowCompare] = useState(false);
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("");
  const [sub, setSub] = useState("");
  const [verdict, setVerdict] = useState<VerdictFilter>("");
  const [layout, setLayout] = useState(false);
  const [gaps, setGaps] = useState(false);
  const [detail, setDetail] = useState<ConceptDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const cache = useRef(new Map<string, ConceptDetail>());
  const detailRef = useRef<HTMLElement>(null);

  // ?view=compare opens the comparison directly (read on mount so the first render matches the server).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "compare") setShowCompare(true);
    // Scroll the concept list (not the page) to a deep-linked concept.
    const list = document.querySelector<HTMLElement>('[aria-label="Concepts"]');
    const on = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (list && on) list.scrollTop = on.getBoundingClientRect().top - list.getBoundingClientRect().top - list.clientHeight / 3;
  }, []);

  // Keep the URL linkable: ?concept=<id>&compare=a,b&view=compare
  useEffect(() => {
    const u = new URLSearchParams();
    const c = sel ? byKey.get(sel) : null;
    if (c) u.set("concept", concepts.filter((x) => x.id === c.id).length > 1 ? c.key : c.id);
    if (compare.length) u.set("compare", compare.join(","));
    if (showCompare && compare.length) u.set("view", "compare");
    const qs = u.toString().replace(/%3A/g, ":").replace(/%2C/g, ",");
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [sel, compare, showCompare, byKey, concepts]);

  useEffect(() => {
    if (!sel) return setDetail(null);
    const hit = cache.current.get(sel);
    if (hit) return setDetail(hit);
    let live = true;
    setLoading(true);
    fetch(`/api/hq/curriculum/concept/${encodeURIComponent(sel)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((x: ConceptDetail | null) => {
        if (!live) return;
        if (x) cache.current.set(sel, x);
        setDetail(x);
        setLoading(false);
      })
      .catch(() => live && (setDetail(null), setLoading(false)));
    return () => {
      live = false;
    };
  }, [sel]);

  const hay = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of concepts) m.set(c.key, [c.id, c.name, ...c.slugs, ...c.slugs.map((x) => lessonBySlug.get(x)?.title ?? "")].join(" ").toLowerCase());
    return m;
  }, [concepts, lessonBySlug]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return concepts.filter((c) => {
      if (domain && c.domain !== domain) return false;
      if (sub && (sub === "untagged" ? c.subarea !== "untagged" : `${c.domain}/${c.subarea}` !== sub)) return false;
      if (verdict === "none" && !c.counts.noReview) return false;
      if (verdict && verdict !== "none" && !c.counts[verdict]) return false;
      if (layout && !c.layoutFinding) return false;
      if (gaps && c.counts.lessons) return false;
      if (needle && !hay.get(c.key)!.includes(needle)) return false;
      return true;
    });
  }, [concepts, q, domain, sub, verdict, layout, gaps, hay]);

  const groups = useMemo(() => {
    const out: { domain: (typeof domains)[number]; subs: { id: string; name: string; items: ConceptRow[] }[]; n: number }[] = [];
    for (const dm of domains) {
      const mine = shown.filter((c) => c.domain === dm.id);
      if (!mine.length) continue;
      const subIds = [...dm.subareas.map((x) => x.id), ...new Set(mine.map((c) => c.subarea))].filter((v, i, a) => a.indexOf(v) === i);
      const subs = subIds
        .map((id) => ({ id, name: id === "untagged" ? "Untagged" : (dm.subareas.find((x) => x.id === id)?.name ?? id), items: mine.filter((c) => c.subarea === id) }))
        .filter((g) => g.items.length)
        .sort((a, b) => Number(a.id === "untagged") - Number(b.id === "untagged"));
      out.push({ domain: dm, subs, n: mine.length });
    }
    return out;
  }, [domains, shown]);

  const subOptions = useMemo(() => domains.filter((dm) => !domain || dm.id === domain).flatMap((dm) => dm.subareas.map((x) => ({ value: `${dm.id}/${x.id}`, label: domain ? x.name : `${dm.short} · ${x.name}` }))), [domains, domain]);
  const totals = useMemo(() => ({ lessons: new Set(shown.flatMap((c) => c.slugs)).size, gaps: shown.filter((c) => !c.counts.lessons).length }), [shown]);

  const pick = (key: string) => {
    setSel(key);
    setShowCompare(false);
    // On a phone the list is replaced by the concept: start it at the top.
    if (window.matchMedia("(max-width: 900px)").matches) requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "start" }));
  };
  const toggleCompare = (slug: string) => setCompare((xs) => (xs.includes(slug) ? xs.filter((x) => x !== slug) : xs.length >= 3 ? xs : [...xs, slug]));
  const filtered = Boolean(q || domain || sub || verdict || layout || gaps);
  const clear = () => (setQ(""), setDomain(""), setSub(""), setVerdict(""), setLayout(false), setGaps(false));
  const selRow = sel ? byKey.get(sel) : undefined;

  return (
    <main className={s.hq}>
      <HqTop
        on="curriculum"
        subtitle={
          <>
            Category management: concepts, lessons, verdicts · {concepts.length} concepts · {lessons.length} lessons
          </>
        }
      />

      <section className={d.filters} aria-label="Filters">
        <input className={d.search} type="search" placeholder="Search concepts, lessons, slugs…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        <select className={d.select} value={domain} onChange={(e) => (setDomain(e.target.value), setSub(""))} aria-label="Domain">
          <option value="">All domains</option>
          {domains.map((dm) => (
            <option key={dm.id} value={dm.id}>
              {dm.name}
            </option>
          ))}
        </select>
        <select className={d.select} value={sub} onChange={(e) => setSub(e.target.value)} aria-label="Sub-area">
          <option value="">All sub-areas</option>
          {subOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          <option value="untagged">Untagged</option>
        </select>
        <select className={d.select} value={verdict} onChange={(e) => setVerdict(e.target.value as VerdictFilter)} aria-label="Verdict">
          <option value="">Any verdict</option>
          <option value="launch">Has a launch</option>
          <option value="revise">Has a revise</option>
          <option value="fatal">Has a fatal</option>
          <option value="none">Has a lesson with no review</option>
        </select>
        <label className={d.check}>
          <input type="checkbox" checked={layout} onChange={(e) => setLayout(e.target.checked)} /> Layout finding
        </label>
        <label className={d.check}>
          <input type="checkbox" checked={gaps} onChange={(e) => setGaps(e.target.checked)} /> No lessons yet
        </label>
        <span className={s.muted}>
          {plural(shown.length, "concept")} · {plural(totals.lessons, "lesson")} · {plural(totals.gaps, "gap")}
        </span>
        {filtered && (
          <button className={s.roomLink} onClick={clear}>
            Clear filters
          </button>
        )}
      </section>

      {compare.length > 0 && (
        <section className={d.compareBar} aria-label="Compare">
          <b>Compare</b>
          {compare.map((slug) => (
            <span key={slug} className={d.pill}>
              {lessonBySlug.get(slug)?.title ?? slug}
              <button aria-label={`Remove ${slug}`} onClick={() => toggleCompare(slug)}>
                ×
              </button>
            </span>
          ))}
          <span className={s.muted}>{compare.length < 2 ? "tick one more lesson" : compare.length === 3 ? "3 of 3" : `${compare.length} of 3`}</span>
          <span className={s.spacer} />
          {compare.length >= 2 && (
            <button className={`${s.btn} ${showCompare ? s.on : ""}`} onClick={() => setShowCompare((x) => !x)}>
              {showCompare ? "Back to concept" : "Side by side"}
            </button>
          )}
        </section>
      )}

      <div className={d.layout} data-sel={sel || showCompare ? "1" : "0"}>
        <aside className={d.list} aria-label="Concepts">
          {groups.length === 0 && <p className={s.muted}>No concept matches these filters.</p>}
          {groups.map((g) => (
            <section key={g.domain.id} className={d.group}>
              <h2 className={d.domainHead} style={{ ["--dc" as string]: g.domain.color }}>
                <span className={d.dot} /> {g.domain.name} <span className={s.muted}>{g.n}</span>
              </h2>
              {g.subs.map((sg) => (
                <div key={sg.id}>
                  <h3 className={d.subHead}>{sg.name}</h3>
                  <ul className={d.concepts}>
                    {sg.items.map((c) => (
                      <li key={c.key}>
                        <button className={c.key === sel ? d.conceptOn : d.concept} onClick={() => pick(c.key)} aria-current={c.key === sel}>
                          <span className={d.cName}>{c.name}</span>
                          <span className={c.counts.lessons ? d.count : d.countZero}>{c.counts.lessons}</span>
                          <ConceptStats c={c} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </aside>

        <section className={d.detail} ref={detailRef} aria-live="polite">
          <button className={d.back} onClick={() => (setSel(null), setShowCompare(false))}>
            ← All concepts
          </button>
          {showCompare && compare.length >= 2 ? (
            <CompareView slugs={compare} lessons={lessonBySlug} byKey={byKey} onConcept={pick} onRemove={toggleCompare} />
          ) : !selRow ? (
            <div className={d.empty}>
              <h2>Pick a concept</h2>
              <p className={s.muted}>
                Every concept in <code>content/curriculum/*.json</code>, grouped by domain and sub-area. Select one to see every lesson for it, its learner verdicts, design reviews, illustrations and walkthrough contact sheets. Tick up to three lessons to compare their sheets side by side.
              </p>
              <p className={s.muted}>
                Link a concept with <code>/hq/curriculum?concept=&lt;id&gt;</code>.
              </p>
            </div>
          ) : (
            <ConceptView c={selRow} detail={detail?.concept.key === selRow.key ? detail : null} loading={loading} byKey={byKey} onConcept={pick} compare={compare} onCompare={toggleCompare} />
          )}
        </section>
      </div>
    </main>
  );
}

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

function ConceptStats({ c }: { c: ConceptRow }) {
  const k = c.counts;
  if (!k.lessons) return <span className={d.stats}>no lessons yet</span>;
  const parts: [string, number, string][] = [
    ["published", k.published, ""],
    ["launch", k.launch, d.tLaunch],
    ["revise", k.revise, d.tRevise],
    ["fatal", k.fatal, d.tFatal],
    ["no review", k.noReview, ""],
    ["illustrated", k.illustrated, ""],
  ];
  return (
    <span className={d.stats}>
      {parts
        .filter(([, n]) => n)
        .map(([label, n, cls]) => (
          <span key={label} className={cls}>
            {n} {label}
          </span>
        ))}
      {c.layoutFinding && <span className={d.tLayout}>layout</span>}
    </span>
  );
}

function ConceptView({ c, detail, loading, byKey, onConcept, compare, onCompare }: { c: ConceptRow; detail: ConceptDetail | null; loading: boolean; byKey: Map<string, ConceptRow>; onConcept: (k: string) => void; compare: string[]; onCompare: (slug: string) => void }) {
  return (
    <article>
      <header className={d.cHead}>
        <h2>{c.name}</h2>
        <div className={d.facts}>
          <code>{c.key}</code>
          <span>sub-area: {c.subarea}</span>
          <span>level: {c.level}</span>
          <span title={`demand ${c.demand} of 3`}>demand: {"●".repeat(c.demand) + "○".repeat(Math.max(0, 3 - c.demand))}</span>
        </div>
        <div className={d.facts}>
          <span>prerequisites:</span>
          {c.prerequisites.length === 0 && <span className={s.muted}>none</span>}
          {c.prerequisites.map((pq, i) =>
            c.prereqKeys[i] ? (
              <button key={pq} className={d.prereq} onClick={() => onConcept(c.prereqKeys[i]!)}>
                {byKey.get(c.prereqKeys[i]!)?.name ?? pq}
              </button>
            ) : (
              <span key={pq} className={s.muted} title="Not found in any curriculum">
                {pq} (unknown)
              </span>
            ),
          )}
        </div>
        <div className={d.facts}>
          <span>
            {plural(c.counts.lessons, "lesson")} · {c.counts.published} published · {c.counts.launch} launch · {c.counts.revise} revise · {c.counts.fatal} fatal · {c.counts.noReview} no review · {c.counts.illustrated} illustrated
          </span>
        </div>
      </header>

      <section className={d.card}>
        <h3>Concept notes</h3>
        {!detail ? (
          <p className={s.muted}>{loading ? "Loading…" : "Could not load."}</p>
        ) : detail.notes.text ? (
          <>
            <pre className={s.body}>{detail.notes.text}</pre>
            <p className={s.muted}>
              <code>{detail.notes.path}</code>
            </p>
          </>
        ) : (
          <p className={s.muted}>
            None yet. Category managers write them at <code>{detail.notes.path}</code>.
          </p>
        )}
      </section>

      {c.counts.lessons === 0 ? (
        <section className={d.card}>
          <h3>No lessons yet</h3>
          <p className={s.muted}>A coverage gap: no lesson in src/demos names this concept. Briefing one belongs to the {c.domain} category manager.</p>
        </section>
      ) : !detail ? null : (
        detail.lessons.map((l) => <LessonCard key={l.slug} l={l} ticked={compare.includes(l.slug)} full={compare.length >= 3 && !compare.includes(l.slug)} onCompare={() => onCompare(l.slug)} />)
      )}
    </article>
  );
}

function LessonCard({ l, ticked, full, onCompare }: { l: LessonDetail; ticked: boolean; full: boolean; onCompare: () => void }) {
  return (
    <section className={d.card}>
      <div className={d.lHead}>
        <h3>{l.title}</h3>
        <VerdictBadge v={l.review?.verdict ?? null} />
        <label className={d.check} title={full ? "Three lessons ticked already" : undefined}>
          <input type="checkbox" checked={ticked} disabled={full} onChange={onCompare} /> Compare
        </label>
      </div>
      <div className={d.facts}>
        <a href={`/d/${l.slug}`}>
          <code>{l.slug}</code>
        </a>
        <span>{l.domain}</span>
        <span>v{l.version ?? "?"}</span>
        <span className={l.status === "published" ? d.tLaunch : ""}>{l.status}</span>
        <span>format: {l.format}</span>
      </div>
      {l.hook && <p className={d.hook}>{l.hook}</p>}

      <div className={d.grid}>
        <div>
          <h4>Latest learner review</h4>
          {l.review ? (
            <>
              <ol className={d.findings}>
                {l.review.findings.length ? l.review.findings.map((f, i) => <li key={i}>{f}</li>) : <li className={s.muted}>No findings listed.</li>}
              </ol>
              {l.review.layout.length > 0 && (
                <>
                  <h4 className={d.tFatal}>Layout finding</h4>
                  <ul className={d.findings}>
                    {l.review.layout.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </>
              )}
              <p className={d.path}>{l.review.file}</p>
            </>
          ) : (
            <p className={s.muted}>No learner review yet.</p>
          )}
        </div>
        <div>
          <h4>Design reviews</h4>
          {l.designReviews.length ? (
            l.designReviews.map((r) => (
              <details key={r.file}>
                <summary className={d.path}>{r.file}</summary>
                <pre className={s.body}>{r.text}</pre>
              </details>
            ))
          ) : (
            <p className={s.muted}>None (company/reviews/{l.slug}/*-design.md).</p>
          )}
          <h4>Illustration</h4>
          <p className={d.small}>
            {l.illustration.status}
            {l.illustration.images ? ` · ${l.illustration.images} image(s)` : ""}
            {l.illustration.request && <span className={d.path}> · {l.illustration.request}</span>}
          </p>
          <h4>Open board items</h4>
          {l.board.length ? (
            <ul className={d.findings}>
              {l.board.map((b) => (
                <li key={b.id}>
                  <code>{b.id}</code> {b.title} <span className={s.muted}>({b.owner}, {b.state})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.muted}>None mention this slug.</p>
          )}
        </div>
      </div>

      <h4>Walkthrough contact sheet</h4>
      {l.sheet.exists ? (
        <a href={`/api/hq/sheet/${l.slug}`} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={d.sheet} src={`/api/hq/sheet/${l.slug}`} alt={`Walkthrough frames of ${l.title}`} loading="lazy" />
        </a>
      ) : (
        <p className={s.muted}>
          No sheet yet. Make one (needs a build, or WALKTHROUGH_URL set to a running server): <code className={d.cmd}>{l.sheet.command}</code>
        </p>
      )}
    </section>
  );
}

function CompareView({ slugs, lessons, byKey, onConcept, onRemove }: { slugs: string[]; lessons: Map<string, LessonRow>; byKey: Map<string, ConceptRow>; onConcept: (k: string) => void; onRemove: (slug: string) => void }) {
  return (
    <article>
      <header className={d.cHead}>
        <h2>Side by side</h2>
        <p className={s.muted}>Contact sheets of the ticked lessons, with their latest learner verdicts.</p>
      </header>
      <div className={d.compare} style={{ ["--cols" as string]: slugs.length }}>
        {slugs.map((slug) => {
          const l = lessons.get(slug)!;
          const c = [...byKey.values()].find((x) => x.id === l.concept && x.domain === l.domain) ?? [...byKey.values()].find((x) => x.id === l.concept);
          return (
            <section key={slug} className={d.card}>
              <div className={d.lHead}>
                <h3>{l.title}</h3>
                <VerdictBadge v={l.verdict} />
              </div>
              <div className={d.facts}>
                <a href={`/d/${slug}`}>
                  <code>{slug}</code>
                </a>
                <span>v{l.version ?? "?"}</span>
                <span>{l.status}</span>
                {c && (
                  <button className={d.prereq} onClick={() => onConcept(c.key)}>
                    {c.name}
                  </button>
                )}
                <button className={s.roomLink} onClick={() => onRemove(slug)}>
                  remove
                </button>
              </div>
              {l.hasSheet ? (
                <a href={`/api/hq/sheet/${slug}`} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={d.sheet} src={`/api/hq/sheet/${slug}`} alt={`Walkthrough frames of ${l.title}`} />
                </a>
              ) : (
                <p className={s.muted}>
                  No sheet yet: <code className={d.cmd}>npm run walkthrough -- {slug}</code>
                </p>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}
