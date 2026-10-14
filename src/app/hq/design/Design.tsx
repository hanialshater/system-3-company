"use client";

// HQ Design inspector: every UI concept (lesson formats, interaction patterns, visual styles) from
// company/design/concepts/, with a live specimen, the lessons that use it (contact sheets in a grid),
// the review findings that touch it, and its variants side by side. The index comes with the page;
// one concept's findings are fetched from /api/hq/design/concept/<id>; sheets stream from
// /api/hq/sheet/<slug>. Owner: design-engineer. (Curriculum concepts are at /hq/curriculum.)

import { useEffect, useMemo, useRef, useState } from "react";
import type { ConceptDetail, DesignIndex, Finding, FindingTag, Kind, LessonLite, Status, UiConcept } from "@/lib/hq-design";
import { HqTop } from "../HqTop";
import s from "../hq.module.css";
import d from "./design.module.css";
import { Specimen } from "./specimens";

type View = "concepts" | "proposals";
type Initial = { concept: string | null; lessons: string[]; vs: string | null; view: View };

const KIND_LABEL: Record<Kind, string> = { format: "Formats", interaction: "Interaction patterns", visual: "Visual styles" };
const KIND_ONE: Record<Kind, string> = { format: "format", interaction: "interaction", visual: "visual" };
const STATUS_CLASS: Record<Status, string> = { proposed: d.stProposed, approved: d.stApproved, "kit-supported": d.stKit, retired: d.stRetired };
const TAG_LABEL: Record<FindingTag, string> = { layout: "layout", "told-not-shown": "told, not shown", contrast: "contrast", "tap-size": "tap size", motion: "motion", pattern: "touches the pattern", code: "in the code" };
const VERDICT_CLASS: Record<string, string> = { launch: d.vLaunch, revise: d.vRevise, fatal: d.vFatal };
const PAGE = 24;
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

function StatusChip({ st }: { st: Status }) {
  return <span className={`${d.chip} ${STATUS_CLASS[st]}`}>{st}</span>;
}
function Verdict({ v }: { v: LessonLite["verdict"] }) {
  return <span className={`${d.verdict} ${v ? VERDICT_CLASS[v] : d.vNone}`}>{v ?? "no review"}</span>;
}

export default function Design({ index, initial }: { index: DesignIndex; initial: Initial }) {
  const { concepts, lessons, domains, errors } = index;
  const byId = useMemo(() => new Map(concepts.map((c) => [c.id, c])), [concepts]);
  const lessonBySlug = useMemo(() => new Map(lessons.map((l) => [l.slug, l])), [lessons]);

  const [sel, setSel] = useState<string | null>(initial.concept && byId.has(initial.concept) ? initial.concept : null);
  const [vs, setVs] = useState<string | null>(initial.vs && byId.has(initial.vs) ? initial.vs : null);
  const [view, setView] = useState<View>(initial.view);
  const [picked, setPicked] = useState<string[]>(initial.lessons.filter((x) => lessonBySlug.has(x)));
  const [showPicked, setShowPicked] = useState(false);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"" | Kind>("");
  const [status, setStatus] = useState<"" | Status>("");
  const [kit, setKit] = useState<"" | UiConcept["kitClass"]>("");
  const [withFindings, setWithFindings] = useState(false);
  const detailRef = useRef<HTMLElement>(null);

  // Keep the URL linkable: ?concept=<id>&vs=<id>&lessons=a,b&view=proposals
  useEffect(() => {
    const u = new URLSearchParams();
    if (view === "proposals") u.set("view", "proposals");
    if (sel) u.set("concept", sel);
    if (sel && vs) u.set("vs", vs);
    if (picked.length) u.set("lessons", picked.join(","));
    const qs = u.toString().replace(/%2C/g, ",");
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [sel, vs, picked, view]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return concepts.filter((c) => {
      if (kind && c.kind !== kind) return false;
      if (status && c.status !== status) return false;
      if (kit && c.kitClass !== kit) return false;
      if (withFindings && !c.findings) return false;
      if (needle && ![c.id, c.name, c.summary, c.kit, c.owner].join(" ").toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [concepts, q, kind, status, kit, withFindings]);
  const proposals = concepts.filter((c) => c.status === "proposed");
  const filtered = Boolean(q || kind || status || kit || withFindings);

  const pick = (id: string) => {
    setSel(id);
    setVs(null);
    setShowPicked(false);
    setView("concepts");
    if (window.matchMedia("(max-width: 900px)").matches) requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "start" }));
  };
  const togglePick = (slug: string) => setPicked((xs) => (xs.includes(slug) ? xs.filter((x) => x !== slug) : xs.length >= 3 ? xs : [...xs, slug]));
  const selC = sel ? byId.get(sel) : undefined;
  const vsC = vs ? byId.get(vs) : undefined;

  return (
    <main className={s.hq}>
      <HqTop
        on="design"
        subtitle={
          <>
            Design inspector: formats, interactions, visual styles · {plural(concepts.length, "UI concept")} · {plural(lessons.length, "lesson")}
          </>
        }
      />

      {errors.length > 0 && (
        <section className={d.errors} aria-label="Concept file problems">
          <b>{plural(errors.length, "problem")} in company/design/concepts/</b>
          <ul>
            {errors.slice(0, 6).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={d.filters} aria-label="Filters">
        <div className={s.tabs} role="tablist" aria-label="View">
          <button role="tab" aria-selected={view === "concepts"} className={view === "concepts" ? s.tabOn : s.tab} onClick={() => setView("concepts")}>
            Concepts
          </button>
          <button role="tab" aria-selected={view === "proposals"} className={view === "proposals" ? s.tabOn : s.tab} onClick={() => setView("proposals")}>
            Proposals · {proposals.length}
          </button>
        </div>
        <input className={d.search} type="search" placeholder="Search UI concepts…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        <select className={d.select} value={kind} onChange={(e) => setKind(e.target.value as "" | Kind)} aria-label="Kind">
          <option value="">Any kind</option>
          <option value="format">Formats</option>
          <option value="interaction">Interactions</option>
          <option value="visual">Visual</option>
        </select>
        <select className={d.select} value={status} onChange={(e) => setStatus(e.target.value as "" | Status)} aria-label="Status">
          <option value="">Any status</option>
          <option value="proposed">Proposed</option>
          <option value="approved">Approved</option>
          <option value="kit-supported">Kit-supported</option>
          <option value="retired">Retired</option>
        </select>
        <select className={d.select} value={kit} onChange={(e) => setKit(e.target.value as "" | UiConcept["kitClass"])} aria-label="Kit support">
          <option value="">Any kit support</option>
          <option value="kit">A kit component</option>
          <option value="by hand">By hand</option>
          <option value="none">Not buildable yet</option>
        </select>
        <label className={d.check}>
          <input type="checkbox" checked={withFindings} onChange={(e) => setWithFindings(e.target.checked)} /> Has findings
        </label>
        <span className={s.muted}>{plural(shown.length, "concept")}</span>
        {filtered && (
          <button className={s.roomLink} onClick={() => (setQ(""), setKind(""), setStatus(""), setKit(""), setWithFindings(false))}>
            Clear filters
          </button>
        )}
      </section>

      {picked.length > 0 && (
        <section className={d.compareBar} aria-label="Compare lessons">
          <b>Compare lessons</b>
          {picked.map((slug) => (
            <span key={slug} className={d.pill}>
              {lessonBySlug.get(slug)?.title ?? slug}
              <button aria-label={`Remove ${slug}`} onClick={() => togglePick(slug)}>
                ×
              </button>
            </span>
          ))}
          <span className={s.muted}>{picked.length < 2 ? "tick one more lesson" : `${picked.length} of 3`}</span>
          <span className={s.spacer} />
          {picked.length >= 2 && (
            <button className={`${s.btn} ${showPicked ? s.on : ""}`} onClick={() => setShowPicked((x) => !x)}>
              {showPicked ? "Back to concept" : "Side by side"}
            </button>
          )}
        </section>
      )}

      <div className={d.layout} data-sel={sel || showPicked || view === "proposals" ? "1" : "0"}>
        <aside className={d.list} aria-label="UI concepts">
          {shown.length === 0 && <p className={s.muted}>No concept matches these filters.</p>}
          {(["format", "interaction", "visual"] as Kind[]).map((k) => {
            const mine = shown.filter((c) => c.kind === k);
            if (!mine.length) return null;
            return (
              <section key={k} className={d.group}>
                <h2 className={d.groupHead}>
                  {KIND_LABEL[k]} <span className={s.muted}>{mine.length}</span>
                </h2>
                <ul className={d.items}>
                  {mine.map((c) => (
                    <li key={c.id}>
                      <button className={c.id === sel && view === "concepts" ? d.itemOn : d.item} onClick={() => pick(c.id)} aria-current={c.id === sel}>
                        <span className={d.iName}>{c.name}</span>
                        <span className={c.usage.length ? d.count : d.countZero} title="lessons that use it">
                          {c.usage.length}
                        </span>
                        <span className={d.iMeta}>
                          <StatusChip st={c.status} />
                          <span>{c.kitClass === "kit" ? c.kit.split(" (")[0] : c.kitClass}</span>
                          {c.findings > 0 && <span className={d.tFind}>{plural(c.findings, "finding")}</span>}
                          {c.seeded && <span title="seeded by design-engineer; design lead to confirm">seeded</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </aside>

        <section className={d.detail} ref={detailRef} aria-live="polite">
          <button className={d.back} onClick={() => (setSel(null), setShowPicked(false), setView("concepts"))}>
            ← All UI concepts
          </button>
          {showPicked && picked.length >= 2 ? (
            <LessonCompare slugs={picked} lessons={lessonBySlug} concepts={concepts} onConcept={pick} onRemove={togglePick} />
          ) : view === "proposals" ? (
            <Proposals items={proposals} onConcept={pick} />
          ) : selC && vsC ? (
            <ConceptCompare a={selC} b={vsC} all={concepts} domains={domains} lessons={lessonBySlug} onClose={() => setVs(null)} onPickB={setVs} onConcept={pick} />
          ) : selC ? (
            <ConceptView key={selC.id} c={selC} byId={byId} domains={domains} lessons={lessonBySlug} picked={picked} onPick={togglePick} onConcept={pick} onVs={setVs} />
          ) : (
            <div className={d.empty}>
              <h2>Pick a UI concept</h2>
              <p className={s.muted}>
                Every lesson format, interaction pattern and visual style in <code>company/design/concepts/</code>. Each shows a live specimen, the lessons that use it (detected from their <code>Demo.tsx</code>) with their contact sheets, review findings that touch it, and its variants side by side.
              </p>
              <p className={s.muted}>
                Link one with <code>/hq/design?concept=&lt;id&gt;</code>. Curriculum concepts moved to <a href="/hq/curriculum">/hq/curriculum</a>.
              </p>
              <Overview concepts={concepts} lessons={lessons.length} onConcept={pick} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Overview({ concepts, lessons, onConcept }: { concepts: UiConcept[]; lessons: number; onConcept: (id: string) => void }) {
  const formats = concepts.filter((c) => c.kind === "format").sort((a, b) => b.usage.length - a.usage.length);
  return (
    <>
      <h3 className={d.h3}>Formats across {plural(lessons, "lesson")}</h3>
      <div className={d.bars}>
        {formats.map((c) => (
          <button key={c.id} className={d.bar} onClick={() => onConcept(c.id)}>
            <span>{c.name}</span>
            <span className={d.barTrack}>
              <i style={{ width: `${(c.usage.length / Math.max(1, lessons)) * 100}%` }} />
            </span>
            <b>{c.usage.length}</b>
          </button>
        ))}
      </div>
      <p className={s.muted}>Detected from code; formats overlap (a simulation can also be a storyboard). Single card counts lessons where no other format is detected.</p>
    </>
  );
}

function Facts({ c }: { c: UiConcept }) {
  return (
    <div className={d.facts}>
      <span className={d.chip}>{KIND_ONE[c.kind]}</span>
      <StatusChip st={c.status} />
      <span>owner: {c.owner}</span>
      <span>kit: {c.kit}</span>
      <code>{c.path}</code>
      {c.seeded && <span className={d.seeded}>seeded by design-engineer; design lead to confirm</span>}
    </div>
  );
}

function Sections({ c, only }: { c: UiConcept; only?: string[] }) {
  return (
    <div className={d.sections}>
      {c.sections
        .filter((x) => !only || only.includes(x.title))
        .map((x) => (
          <div key={x.title}>
            <h4>{x.title}</h4>
            <ul>
              {x.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function SpecimenCard({ c, domains }: { c: UiConcept; domains: DesignIndex["domains"] }) {
  const [dom, setDom] = useState("");
  const color = domains.find((x) => x.id === dom)?.color ?? "var(--accent)";
  return (
    <div className={d.specWrap}>
      <div className={d.specHead}>
        <h4>Specimen</h4>
        <select className={d.selectSmall} value={dom} onChange={(e) => setDom(e.target.value)} aria-label="Domain colour">
          <option value="">accent colour</option>
          {domains.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <Specimen id={c.id} domains={domains} color={color} />
      {c.mockups.length > 0 && <p className={d.path}>mockups: {c.mockups.join(", ")}</p>}
    </div>
  );
}

function ConceptView({ c, byId, domains, lessons, picked, onPick, onConcept, onVs }: { c: UiConcept; byId: Map<string, UiConcept>; domains: DesignIndex["domains"]; lessons: Map<string, LessonLite>; picked: string[]; onPick: (slug: string) => void; onConcept: (id: string) => void; onVs: (id: string) => void }) {
  const [detail, setDetail] = useState<ConceptDetail | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    let live = true;
    fetch(`/api/hq/design/concept/${encodeURIComponent(c.id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((x: ConceptDetail | null) => live && (setDetail(x), setState(x ? "ok" : "error")))
      .catch(() => live && setState("error"));
    return () => {
      live = false;
    };
  }, [c.id]);

  const users = c.usage.map((u) => ({ ...u, l: lessons.get(u.slug) })).filter((u) => u.l);
  const sum = {
    published: users.filter((u) => u.l!.status === "published").length,
    launch: users.filter((u) => u.l!.verdict === "launch").length,
    revise: users.filter((u) => u.l!.verdict === "revise").length,
    fatal: users.filter((u) => u.l!.verdict === "fatal").length,
    sheets: users.filter((u) => u.l!.hasSheet).length,
  };
  const variants = c.variants.map((v) => byId.get(v)).filter((x): x is UiConcept => Boolean(x));
  const siblings = [...byId.values()].filter((x) => x.kind === c.kind && x.id !== c.id && !c.variants.includes(x.id));

  return (
    <article>
      <header className={d.cHead}>
        <h2>{c.name}</h2>
        <p className={d.summary}>{c.summary}</p>
        <Facts c={c} />
        {c.provenance && <p className={d.prov}>{c.provenance}</p>}
      </header>

      <section className={`${d.card} ${d.twoCol}`}>
        <SpecimenCard c={c} domains={domains} />
        <Sections c={c} />
      </section>

      <section className={d.card}>
        <div className={d.lHead}>
          <h3>Lessons that use it · {users.length}</h3>
        </div>
        <div className={d.facts}>
          <span>{sum.published} published</span>
          <span className={d.tLaunch}>{sum.launch} launch</span>
          <span className={d.tRevise}>{sum.revise} revise</span>
          <span className={d.tFatal}>{sum.fatal} fatal</span>
          <span>{sum.sheets} with contact sheets</span>
        </div>
        <p className={d.small}>
          <b>Detected by</b> {c.detect.how} · confidence <b className={d[`conf_${c.detect.confidence}`]}>{c.detect.confidence}</b>
          {c.detect.note ? ` · ${c.detect.note}` : ""}
        </p>
        {c.detect.signals.length > 1 && (
          <ul className={d.signals}>
            {c.detect.signals.map((sg, i) => (
              <li key={sg}>
                {sg}: <b>{users.filter((u) => u.s.includes(i)).length}</b>
              </li>
            ))}
          </ul>
        )}
        <SheetGrid users={users.map((u) => ({ slug: u.slug, l: u.l!, why: u.s.map((i) => (i === -1 ? "reference lesson" : c.detect.signals[i])).join(" · ") }))} domains={domains} picked={picked} onPick={onPick} />
      </section>

      <section className={d.card}>
        <h3>Review findings that touch it{detail ? ` · ${detail.total}` : ""}</h3>
        <p className={d.small}>
          Sentences from the latest learner review, design reviews (<code>*-design.md</code>) and accessibility records (<code>*-a11y.md</code>, <code>*-accessibility.md</code>) of the lessons above, that mention this pattern with a problem word or carry a layout / told-not-shown / contrast / tap-size / motion tag, plus problems visible in the code.
        </p>
        {state === "loading" ? <p className={s.muted}>Loading…</p> : state === "error" || !detail ? <p className={s.muted}>Could not load.</p> : <Findings items={detail.findings} total={detail.total} lessons={lessons} />}
      </section>

      <section className={d.card}>
        <h3>Variants side by side</h3>
        <div className={d.facts}>
          {variants.map((v) => (
            <button key={v.id} className={d.prereq} onClick={() => onVs(v.id)}>
              {c.name} vs {v.name}
            </button>
          ))}
          {variants.length === 0 && <span className={s.muted}>No variants named in the file.</span>}
        </div>
        <div className={d.facts}>
          <span>or compare with</span>
          <select className={d.selectSmall} value="" onChange={(e) => e.target.value && onVs(e.target.value)} aria-label="Compare with another concept">
            <option value="">another concept…</option>
            {[...byId.values()]
              .filter((x) => x.id !== c.id)
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {KIND_ONE[x.kind]} · {x.name}
                </option>
              ))}
          </select>
        </div>
        <p className={d.small}>To compare lessons, tick 2 or 3 contact sheets above. Same kind: {siblings.slice(0, 6).map((x, i) => (
          <span key={x.id}>
            {i ? ", " : ""}
            <button className={d.linkBtn} onClick={() => onConcept(x.id)}>
              {x.name}
            </button>
          </span>
        ))}
        .</p>
      </section>
    </article>
  );
}

function SheetGrid({ users, domains, picked, onPick }: { users: { slug: string; l: LessonLite; why: string }[]; domains: DesignIndex["domains"]; picked: string[]; onPick: (slug: string) => void }) {
  const [n, setN] = useState(PAGE);
  const [dom, setDom] = useState("");
  const [sheetsOnly, setSheetsOnly] = useState(true);
  const list = users.filter((u) => (!dom || u.l.domain === dom) && (!sheetsOnly || u.l.hasSheet));
  const noSheet = users.filter((u) => (!dom || u.l.domain === dom) && !u.l.hasSheet).length;
  return (
    <>
      <div className={d.facts}>
        <select className={d.selectSmall} value={dom} onChange={(e) => (setDom(e.target.value), setN(PAGE))} aria-label="Domain">
          <option value="">All domains</option>
          {domains
            .filter((x) => users.some((u) => u.l.domain === x.id))
            .map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} ({users.filter((u) => u.l.domain === x.id).length})
              </option>
            ))}
        </select>
        <label className={d.check}>
          <input type="checkbox" checked={sheetsOnly} onChange={(e) => (setSheetsOnly(e.target.checked), setN(PAGE))} /> Only lessons with a sheet
        </label>
        <span>{plural(list.length, "lesson")} shown{sheetsOnly && noSheet ? ` · ${noSheet} without a sheet hidden` : ""}</span>
      </div>
      {list.length === 0 ? (
        <p className={s.muted}>{users.length ? "None with a contact sheet yet. Make one with npm run walkthrough -- <slug>." : "No lesson uses it yet."}</p>
      ) : (
        <div className={d.sheetGrid}>
          {list.slice(0, n).map((u) => {
            const on = picked.includes(u.slug);
            return (
              <figure key={u.slug} className={on ? d.thumbOn : d.thumb}>
                {u.l.hasSheet ? (
                  <a href={`/api/hq/sheet/${u.slug}`} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/api/hq/sheet/${u.slug}`} alt={`Walkthrough frames of ${u.l.title}`} loading="lazy" />
                  </a>
                ) : (
                  <div className={d.noSheet}>
                    no sheet · <code>npm run walkthrough -- {u.slug}</code>
                  </div>
                )}
                <figcaption>
                  <span className={d.thumbTitle}>
                    <a href={`/d/${u.slug}`}>{u.l.title}</a>
                  </span>
                  <span className={d.thumbMeta}>
                    <Verdict v={u.l.verdict} />
                    <span>{u.l.status}</span>
                    <label className={d.check} title={picked.length >= 3 && !on ? "Three lessons ticked already" : "Compare"}>
                      <input type="checkbox" checked={on} disabled={picked.length >= 3 && !on} onChange={() => onPick(u.slug)} /> compare
                    </label>
                  </span>
                  <span className={d.why} title={u.why}>
                    {u.why}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
      {list.length > n && (
        <button className={s.btn} onClick={() => setN(n + PAGE * 2)}>
          Show {Math.min(PAGE * 2, list.length - n)} more of {list.length - n}
        </button>
      )}
    </>
  );
}

function Findings({ items, total, lessons }: { items: Finding[]; total: number; lessons: Map<string, LessonLite> }) {
  const [tag, setTag] = useState<FindingTag | "">("");
  const [n, setN] = useState(12);
  const tags = [...new Set(items.flatMap((f) => f.tags))];
  const shown = items.filter((f) => !tag || f.tags.includes(tag));
  if (!items.length) return <p className={s.muted}>None found in the lessons that use it.</p>;
  return (
    <>
      <div className={d.facts}>
        <button className={!tag ? d.tagOn : d.tag} onClick={() => (setTag(""), setN(12))}>
          all {items.length}
        </button>
        {tags.map((t) => (
          <button key={t} className={tag === t ? d.tagOn : d.tag} onClick={() => (setTag(t), setN(12))}>
            {TAG_LABEL[t]} {items.filter((f) => f.tags.includes(t)).length}
          </button>
        ))}
        {total > items.length && <span className={s.muted}>showing the first {items.length} of {total}</span>}
      </div>
      <ul className={d.findings}>
        {shown.slice(0, n).map((f, i) => (
          <li key={i}>
            <span className={d.fMeta}>
              {f.tags.map((t) => (
                <span key={t} className={`${d.chip} ${t === "pattern" ? "" : d.fTag}`}>
                  {TAG_LABEL[t]}
                </span>
              ))}
              <span className={d.chip}>{f.source}</span>
              <a href={`/d/${f.slug}`}>{lessons.get(f.slug)?.title ?? f.slug}</a>
            </span>
            <span className={d.fText}>{f.text}</span>
            {f.href ? (
              <a className={d.path} href={f.href} target="_blank" rel="noreferrer">
                {f.file}
              </a>
            ) : (
              <span className={d.path}>{f.file}</span>
            )}
          </li>
        ))}
      </ul>
      {shown.length > n && (
        <button className={`${s.btn} ${d.more}`} onClick={() => setN(n + 24)}>
          Show {Math.min(24, shown.length - n)} more of {shown.length - n}
        </button>
      )}
    </>
  );
}

function ConceptCompare({ a, b, all, domains, lessons, onClose, onPickB, onConcept }: { a: UiConcept; b: UiConcept; all: UiConcept[]; domains: DesignIndex["domains"]; lessons: Map<string, LessonLite>; onClose: () => void; onPickB: (id: string) => void; onConcept: (id: string) => void }) {
  return (
    <article>
      <header className={d.cHead}>
        <h2>
          {a.name} vs {b.name}
        </h2>
        <div className={d.facts}>
          <button className={s.roomLink} onClick={onClose}>
            ← back to {a.name}
          </button>
          <span>compare with</span>
          <select className={d.selectSmall} value={b.id} onChange={(e) => onPickB(e.target.value)} aria-label="Second concept">
            {all
              .filter((x) => x.id !== a.id)
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {KIND_ONE[x.kind]} · {x.name}
                </option>
              ))}
          </select>
        </div>
      </header>
      <div className={d.compare} style={{ ["--cols" as string]: 2 }}>
        {[a, b].map((c) => {
          const users = c.usage.map((u) => lessons.get(u.slug)).filter((x): x is LessonLite => Boolean(x));
          const withSheet = users.filter((l) => l.hasSheet).slice(0, 4);
          return (
            <section key={c.id} className={d.card}>
              <div className={d.lHead}>
                <h3>
                  <button className={d.linkBtn} onClick={() => onConcept(c.id)}>
                    {c.name}
                  </button>
                </h3>
                <StatusChip st={c.status} />
              </div>
              <p className={d.summary}>{c.summary}</p>
              <div className={d.facts}>
                <span>kit: {c.kit}</span>
                <span>{plural(users.length, "lesson")}</span>
                <span>{users.filter((l) => l.verdict === "launch").length} launch</span>
                <span>{plural(c.findings, "finding")}</span>
              </div>
              <Specimen id={c.id} domains={domains} color="var(--accent)" />
              <Sections c={c} only={["When to use", "When not to", "Anatomy"]} />
              <h4 className={d.h4}>Sample lessons</h4>
              {withSheet.length ? (
                <div className={d.miniGrid}>
                  {withSheet.map((l) => (
                    <a key={l.slug} href={`/api/hq/sheet/${l.slug}`} target="_blank" rel="noreferrer" title={l.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/api/hq/sheet/${l.slug}`} alt={`Walkthrough frames of ${l.title}`} loading="lazy" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className={s.muted}>No lesson with a contact sheet uses it yet.</p>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}

function LessonCompare({ slugs, lessons, concepts, onConcept, onRemove }: { slugs: string[]; lessons: Map<string, LessonLite>; concepts: UiConcept[]; onConcept: (id: string) => void; onRemove: (slug: string) => void }) {
  return (
    <article>
      <header className={d.cHead}>
        <h2>Lessons side by side</h2>
        <p className={s.muted}>Contact sheets of the ticked lessons, with the UI concepts each one uses.</p>
      </header>
      <div className={d.compare} style={{ ["--cols" as string]: slugs.length }}>
        {slugs.map((slug) => {
          const l = lessons.get(slug)!;
          const uses = concepts.filter((c) => c.kind !== "visual" && c.usage.some((u) => u.slug === slug));
          return (
            <section key={slug} className={d.card}>
              <div className={d.lHead}>
                <h3>{l.title}</h3>
                <Verdict v={l.verdict} />
              </div>
              <div className={d.facts}>
                <a href={`/d/${slug}`}>
                  <code>{slug}</code>
                </a>
                <span>{l.status}</span>
                <button className={s.roomLink} onClick={() => onRemove(slug)}>
                  remove
                </button>
              </div>
              <div className={d.facts}>
                {uses.map((c) => (
                  <button key={c.id} className={d.prereq} onClick={() => onConcept(c.id)}>
                    {c.name}
                  </button>
                ))}
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

function Proposals({ items, onConcept }: { items: UiConcept[]; onConcept: (id: string) => void }) {
  return (
    <article>
      <header className={d.cHead}>
        <h2>Proposals · {items.length}</h2>
        <p className={d.summary}>UI concepts with status proposed: not yet approved by the design lead for builders to use.</p>
      </header>
      <section className={`${d.card} ${d.howTo}`}>
        <h3>How to propose a UI concept</h3>
        <ol className={d.steps}>
          <li>
            Add <code>company/design/concepts/&lt;id&gt;.md</code> with frontmatter <code>id</code>, <code>name</code>, <code>kind</code> (format | interaction | visual), <code>status: proposed</code>, <code>owner</code> and <code>kit</code> (a component or &quot;by hand&quot;), and the sections When to use, When not to, Anatomy, Rules, Open questions. The schema is in <code>company/design/concepts/README.md</code>.
          </li>
          <li>
            Add a mockup in <code>company/design/specs/</code> named <code>&lt;id&gt;.svg</code> (or .png, .md). It is listed on the concept here.
          </li>
          <li>The design lead approves it in design review and changes the status. Kit support needs the platform engineer.</li>
        </ol>
        <p className={s.muted}>This page only reads files; there is nothing to click to propose.</p>
      </section>
      {items.length === 0 && <p className={s.muted}>No proposals right now.</p>}
      {items.map((c) => (
        <section key={c.id} className={d.card}>
          <div className={d.lHead}>
            <h3>
              <button className={d.linkBtn} onClick={() => onConcept(c.id)}>
                {c.name}
              </button>
            </h3>
            <span className={d.chip}>{KIND_ONE[c.kind]}</span>
          </div>
          <p className={d.summary}>{c.summary}</p>
          <div className={d.facts}>
            <span>owner: {c.owner}</span>
            <span>kit: {c.kit}</span>
            <span>{plural(c.usage.length, "lesson")} already use it</span>
            <span>{c.mockups.length ? `mockups: ${c.mockups.join(", ")}` : "no mockup in company/design/specs/ yet"}</span>
          </div>
          <Sections c={c} only={["Open questions"]} />
        </section>
      ))}
    </article>
  );
}
