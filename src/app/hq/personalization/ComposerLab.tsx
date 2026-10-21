"use client";
// HQ session lab (W-1998; founder decision 2026-10-20: company/decisions/2026-10-20-founder-edp-faithful-personalization.md).
// The EDP Orchestrator's views for the offline session composer (model-v0.3.0): Composition Flow, Lesson gallery, the v1/v3
// toggle with its edit table, and a curves sandbox where knots and session coefficients are dragged and the session
// recomposes live in this browser tab, by the port in @/lib/hq-personalization-sandbox.
// NOTHING IS SAVED and the sandbox is not the model: the curves change only by the change rule (model/README.md);
// "copy as code diff" is the whole export. Offline inspection only (2026-10-21: the four session variants were scored under a frozen criterion and are closed for serving; a sandbox drag or edit is still unscored): never serving, never evidence of learning.
// SIMULATED PERSONAS ONLY: the documents are simulator output for the personas in personas.ts.
import { useEffect, useMemo, useRef, useState } from "react";
import hq from "../hq.module.css";
import Link from "next/link";
import { NEED_ORDER, LAB_BANNER, SESSION_CLOSED_NOTE, SESSION_DECISION_HREF, SESSION_READOUT_HREF, curvePath, fmt, type SimMeta } from "@/lib/hq-personalization";
import {
  CIRCULAR_LABEL, COEF_KEYS, eligibility as elig, resolvableGain, NEEDS, SANDBOX_BADGE, SESSION_LAB_TITLE, VAL_STEP, codeDiff, emptyEdit, explainNeeds, getCoef, isEdited, pwl, recompose, sandboxRefusal, withCoef, withKnot,
  type CoefKey, type SCurve, type SNeed, type SandboxDoc, type SandboxEdit, type SandboxVariant,
} from "@/lib/hq-personalization-sandbox";
import s from "./personalization.module.css";

type Variant = SandboxVariant;
const VARIANTS = ["v1", "v3", "edpbase"] as const;
const VARIANT_NOTE: Record<Variant, string> = { v1: " (hand-set start)", v3: " (v1 + edits)", edpbase: " (v3 + EDP prior)" };
type Tab = "flow" | "gallery" | "variants" | "curves";
const TABS: [Tab, string][] = [["flow", "Composition Flow"], ["gallery", "Lesson gallery"], ["variants", "v1 ↔ v3 ↔ v3 + EDP prior"], ["curves", "Curves sandbox"]];
const W = 200, H = 110;
type Full = Required<SandboxEdit>;

const pts = (c: SCurve) => c.bps.map((x, i) => ({ x, y: c.vals[i] }));
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** One curve. Interactive: each knot is a slider (drag, or arrow keys; Shift ±0.05, PageUp/PageDown ±0.1, Home/End 0 and 1). */
function KnotChart({ label, curve, original, marker, onKnot }: {
  label: string; curve: SCurve; original: SCurve; marker: number | null; onKnot: ((i: number, v: number) => void) | null;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const valueAt = (e: React.PointerEvent) => {
    const svg = ref.current, m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return clamp01((H - p.matrixTransform(m.inverse()).y) / H);
  };
  const key = (i: number, e: React.KeyboardEvent) => {
    if (!onKnot) return;
    const v = curve.vals[i];
    const big = e.shiftKey ? 5 : 1;
    const next = e.key === "ArrowUp" || e.key === "ArrowRight" ? v + VAL_STEP * big : e.key === "ArrowDown" || e.key === "ArrowLeft" ? v - VAL_STEP * big
      : e.key === "PageUp" ? v + 0.1 : e.key === "PageDown" ? v - 0.1 : e.key === "Home" ? 0 : e.key === "End" ? 1 : null;
    if (next === null) return;
    e.preventDefault();
    onKnot(i, clamp01(next));
  };
  const edited = JSON.stringify(curve.vals) !== JSON.stringify(original.vals);
  const at = (c: SCurve, x: number) => ({ cx: x * W, cy: (1 - pwl(x, c)) * H });
  return (
    <svg ref={ref} className={s.chart} viewBox={`-14 -8 ${W + 22} ${H + 26}`} role="group" aria-label={label}>
      <rect x={0} y={0} width={W} height={H} className={s.frame} />
      {[0.25, 0.5, 0.75].map((g) => (<g key={g}><line x1={g * W} x2={g * W} y1={0} y2={H} className={s.grid} /><line x1={0} x2={W} y1={g * H} y2={g * H} className={s.grid} /></g>))}
      {edited && <path d={curvePath(pts(original), W, H)} className={s.curveOrig} />}
      <path d={curvePath(pts(curve), W, H)} className={s.curve} />
      {marker !== null && <circle {...at(curve, marker)} r={4.2} className={s.personaPt} />}
      {curve.bps.map((x, i) => {
        const cy = (1 - curve.vals[i]) * H;
        if (!onKnot) return <circle key={i} cx={x * W} cy={cy} r={2.2} className={s.knot} />;
        return (
          <g key={i} role="slider" tabIndex={0} aria-label={`${label}, knot ${i + 1} of ${curve.bps.length} at signal ${fmt(x, 2)}`} aria-orientation="vertical"
            aria-valuemin={0} aria-valuemax={1} aria-valuenow={curve.vals[i]} aria-valuetext={`${fmt(curve.vals[i], 2)}${curve.vals[i] !== original.vals[i] ? `, was ${fmt(original.vals[i], 2)}` : ""}`}
            className={`${s.knotHit} ${drag === i ? s.knotDrag : ""}`} onKeyDown={(e) => key(i, e)}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(i); const v = valueAt(e); if (v !== null) onKnot(i, v); }}
            onPointerMove={(e) => { if (drag === i) { const v = valueAt(e); if (v !== null) onKnot(i, v); } }}
            onPointerUp={() => setDrag(null)} onPointerCancel={() => setDrag(null)}>
            <circle cx={x * W} cy={cy} r={13} className={s.knotArea} />
            <circle cx={x * W} cy={cy} r={5} className={s.knotHandle} />
          </g>
        );
      })}
      <text x={0} y={H + 13} className={s.axis}>0</text>
      <text x={W} y={H + 13} className={s.axis} textAnchor="end">1</text>
      <text x={-4} y={4} className={s.axis} textAnchor="end">1</text>
      <text x={-4} y={H} className={s.axis} textAnchor="end">0</text>
    </svg>
  );
}

function Badge() {
  return <p className={s.badges}><span className={s.badgeWarn}>{SANDBOX_BADGE}</span><span className={s.badgeWarn}>offline</span><span className={s.badgeWarn}>unscored</span><span className={s.badgeWarn}>simulated persona only</span></p>;
}

const termCols = (t: { name: string }[]) => t.map((x) => x.name);

function SlotCard({ slot, base }: { slot: ReturnType<typeof recompose>["slots"][number]; base: string | undefined }) {
  const names = termCols(slot.winnerTerms);
  const changed = base !== undefined && base !== slot.winner;
  return (
    <details className={s.slotBox} open={slot.slot === 0}>
      <summary>
        Slot {slot.slot + 1}: <strong>{slot.winner}</strong> · {slot.moved ? `moved off the default (${slot.reason})` : slot.reason === "breadth-floor" ? "default (breadth floor)" : "default card"}
        {changed ? " · changed by your edit" : ""}
      </summary>
      <dl className={s.kv}>
        <div><dt>default card</dt><dd>{slot.defaultCard}</dd></div>
        <div><dt>decided by</dt><dd>{slot.constraint ?? "score (no hard constraint applied)"}</dd></div>
        <div><dt>margin of best departure over default</dt><dd>{fmt(slot.margin)}</dd></div>
        {slot.moved && <div><dt>reason carries the move</dt><dd>{slot.reasonCarriesMove === null ? "–" : slot.reasonCarriesMove ? "yes" : <span className={s.badgeWarn}>NO</span>}{slot.reasonCarriesMove === false ? " The named reason alone did not carry this move; other terms did the work, so do not show this reason to a learner." : ""}</dd></div>}
        <div><dt>score of the winner · resolvable need</dt><dd>{fmt(slot.winnerScore)} · {fmt(slot.gain, 3)}</dd></div>
      </dl>
      <p className={s.mono}>remaining: {NEEDS.map((n) => `${n} ${fmt(slot.remainingBefore[n], 3)}→${fmt(slot.remainingAfter[n], 3)}`).join(" · ")}</p>
      <p className={s.mono}>coverage: {NEEDS.map((n) => `${n} ${fmt(slot.coverageBefore[n], 2)}→${fmt(slot.coverageAfter[n], 2)}`).join(" · ")}</p>
      <div className={s.scroll} tabIndex={0} role="region" aria-label={`Slot ${slot.slot + 1} score terms`}>
        <table className={s.table}>
          <caption className={s.cap}>Top candidates with every score term (sum = score); {slot.eligibleCount} lessons were still in the pool</caption>
          <thead><tr><th scope="col">lesson</th>{names.map((n) => <th key={n} scope="col">{n}</th>)}<th scope="col">gain</th><th scope="col">score</th><th scope="col">eligible</th></tr></thead>
          <tbody>
            {slot.top.map((c) => (
              <tr key={c.slug} className={c.slug === slot.winner ? s.win : c.isDefault ? s.def : undefined}>
                <th scope="row"><span className={s.slug}>{c.slug}</span>
                  {c.slug === slot.winner && <span className={s.tagWin}>winner</span>}{c.isDefault && <span className={s.tagDef}>default</span>}
                  <span className={s.sub}>{c.concept} · {c.level}</span></th>
                {names.map((n) => { const v = c.terms.find((t) => t.name === n)?.value ?? 0; return <td key={n} className={v === 0 ? s.zero : v < 0 ? s.neg : undefined}>{fmt(v)}</td>; })}
                <td>{fmt(c.gain)}</td><td><strong>{fmt(c.score)}</strong></td>
                <td>{c.eligible ? "yes" : c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Flow({ doc, edit, base, fpKeys }: { doc: SandboxDoc; edit: Full; base: ReturnType<typeof recompose>; fpKeys: string[] }) {
  const out = useMemo(() => recompose(doc, edit), [doc, edit]);
  const why = useMemo(() => explainNeeds(doc.fingerprint, edit.needShapes, edit.dampener), [doc, edit]);
  const poolBy = NEEDS.map((n) => doc.candidates.filter((c) => c.addr[n] > 0));
  return (
    <div>
      <h3>1. Fingerprint signals</h3>
      <p className={s.muted}>What the composer sees for this simulated persona (from {doc.historyCount} pre-history lessons). Never the latent truth.</p>
      <ul className={s.chips}>{fpKeys.map((k) => <li key={k}><code>{k}</code> {fmt(doc.fingerprint[k] as number, 2)}</li>)}</ul>
      <h3>2. Need scores</h3>
      <p className={s.muted}>need = Σ w·curve(x) / Σ w × dampener(historySize). The dot is the persona&apos;s signal on the (current) curve.</p>
      <div className={s.needs}>
        {NEEDS.map((n) => (
          <section key={n} className={s.need} aria-labelledby={`flow-need-${n}`}>
            <div className={s.needHead}><h4 id={`flow-need-${n}`}>{n}</h4><span className={s.big}>{fmt(why[n].score, 3)}</span></div>
            <p className={s.muted}>raw {fmt(why[n].raw, 3)} × dampener {fmt(why[n].damp, 2)} = {fmt(why[n].score, 3)}</p>
            {edit.needShapes[n].map((c, i) => (
              <div key={c.signal} className={s.term}>
                <KnotChart label={`${n} curve on ${c.signal}`} curve={c} original={doc.needShapes[n][i]} marker={why[n].terms[i].x} onKnot={null} />
                <div className={s.termText}>
                  <p><code>{c.signal}</code> w {c.w}</p>
                  <p className={s.mono}>x {fmt(why[n].terms[i].x, 3)} → y {fmt(why[n].terms[i].y, 3)} · contribution {fmt(why[n].terms[i].contribution, 3)}</p>
                  <p className={s.why}>{c.why}</p>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
      <h3>3. Candidate lessons and what they address</h3>
      <p className={s.muted}>{doc.candidates.length} eligible lessons in default order (already filtered; addr is fixed for the session). Addressing a need: {NEEDS.map((n, i) => `${n} ${poolBy[i].length}`).join(" · ")}. The full pool is in the Lesson gallery tab.</p>
      <h3>4. The session, filled slot by slot</h3>
      <p className={s.muted}>
        {doc.session.size} slots. Each slot scores every remaining lesson: base + need:* (onRem × remaining × addr) + cov:* (onCov × coverage × addr) − (slotDecay × slot + attentionCost) for departures; the default card pays nothing. A departure must also resolve more need than the attention cost (EDP&apos;s budget). Then the pick consumes addrUse × addr: remaining falls and coverage rises by that.
      </p>
      <ol className={s.sessionList} aria-label="Composed session">
        {out.picks.map((p, i) => <li key={p.slug} className={base.picks[i]?.slug !== p.slug ? s.changed : undefined}><span className={s.slug}>{p.slug}</span> <span className={s.muted}>{p.moved ? `moved: ${p.reason}` : p.reason}</span></li>)}
      </ol>
      {out.slots.map((sl) => <SlotCard key={sl.slot} slot={sl} base={base.slots[sl.slot]?.winner} />)}
      <p className={s.circ} role="note">
        {CIRCULAR_LABEL}: need coverage of this session {fmt(out.circular.coverageRate, 3)} = (Σ needs − Σ remaining) / Σ needs. The model grading its own beliefs, never a pass score, and not simulated recall.
        Final remaining: {NEEDS.map((n) => `${n} ${fmt(out.remaining[n], 3)}`).join(" · ")}
      </p>
    </div>
  );
}

function Gallery({ doc, edit }: { doc: SandboxDoc; edit: Full }) {
  const out = useMemo(() => recompose(doc, edit), [doc, edit]);
  const [need, setNeed] = useState<"any" | SNeed>("any");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const c = edit.coefficients;
  const slotOf = new Map(out.picks.map((p, i) => [p.slug, i + 1]));
  const rows = doc.candidates.filter((x) => (need === "any" || x.addr[need] > 0) && (!q || (x.slug + x.concept + x.domain).includes(q.toLowerCase())));
  const shown = all ? rows : rows.slice(0, 40);
  // Eligibility at slot 1 (nothing covered yet): a departure needs need-term gain > attentionCost and, for stretch, readiness.
  const eligibility = (x: SandboxDoc["candidates"][number]) => {
    if (x.slug === doc.candidates[0].slug) return "default card";
    const gain = resolvableGain(x.addr, out.needs, c.addrUse);
    const e = elig(false, doc.constraints.stretchNeedsSomePrereq && x.stretchBlocked, gain, c);
    return e.ok ? `yes (gain ${fmt(gain, 3)})` : `no: ${e.why}`;
  };
  return (
    <div>
      <p className={s.muted}>The candidate pool (EDP&apos;s Widget Gallery): every lesson the composer may pick, in default order, with what it addresses. Eligibility is shown for the first slot, before anything is covered.</p>
      <ul className={s.chips}>{NEEDS.map((n) => <li key={n}><code>{n}</code> {doc.candidates.filter((x) => x.addr[n] > 0).length} lessons · need {fmt(out.needs[n], 3)}</li>)}</ul>
      <div className={s.controls}>
        <label>Addresses
          <select value={need} onChange={(e) => setNeed(e.target.value as "any" | SNeed)}>
            <option value="any">any need</option>{NEED_ORDER.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label>Search<input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="slug, concept, domain" /></label>
      </div>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Candidate lessons">
        <table className={s.table}>
          <caption className={s.cap}>{rows.length} of {doc.candidates.length} lessons</caption>
          <thead><tr><th scope="col">lesson</th><th scope="col">default rank</th>{NEEDS.map((n) => <th key={n} scope="col">addr {n}</th>)}<th scope="col">slot 1 eligibility</th><th scope="col">in session</th></tr></thead>
          <tbody>
            {shown.map((x) => (
              <tr key={x.slug} className={slotOf.has(x.slug) ? s.win : undefined}>
                <th scope="row"><span className={s.slug}>{x.slug}</span><span className={s.sub}>{x.concept} · {x.level}</span></th>
                <td>{x.defaultRank}</td>
                {NEEDS.map((n) => <td key={n} className={x.addr[n] === 0 ? s.zero : undefined}>{x.addr[n]}</td>)}
                <td>{eligibility(x)}</td>
                <td>{slotOf.has(x.slug) ? `slot ${slotOf.get(x.slug)}` : "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > shown.length && <button type="button" className={hq.btn} onClick={() => setAll(true)}>Show all {rows.length}</button>}
    </div>
  );
}

function Variants({ docs, variant, setVariant }: { docs: Partial<Record<Variant, SandboxDoc>>; variant: Variant; setVariant: (v: Variant) => void }) {
  const a = docs.v1, b = docs.v3, e3 = docs.edpbase;
  const ra = useMemo(() => (a ? recompose(a) : null), [a]);
  const rb = useMemo(() => (b ? recompose(b) : null), [b]);
  const re = useMemo(() => (e3 ? recompose(e3) : null), [e3]);
  if (!a || !b || !ra || !rb) return <p className={s.muted}>Loading the variants…</p>;
  const edits = b.session.edits;
  const eEdits = e3?.session.edpBaseEdits ?? [];
  const eCoefs = e3?.session["v3-edpbase"] ?? e3?.session.coefficients;
  const cell = (r: ReturnType<typeof recompose> | null, i: number) => { const q = r?.picks[i]; return q ? <><span className={s.slug}>{q.slug}</span> <span className={s.muted}>{q.moved ? `moved: ${q.reason}` : q.reason}{q.moved && q.reasonCarriesMove !== null ? ` · reason carries the move: ${q.reasonCarriesMove ? "yes" : "NO (the named reason alone did not carry it)"}` : ""}</span></> : "–"; };
  return (
    <div>
      <fieldset className={s.radio}>
        <legend>Variant composed in the other tabs</legend>
        {VARIANTS.map((v) => <label key={v}><input type="radio" name="session-variant" checked={variant === v} onChange={() => setVariant(v)} disabled={!docs[v]} /> {v}{VARIANT_NOTE[v]}</label>)}
      </fieldset>
      <p className={s.muted}>v3 is v1 with the edit table applied (EDP&apos;s EDITS_V3 mechanism). No edit was chosen from a simulator result; every reason is a guess until reviewed. An edit&apos;s &quot;from&quot; must equal the current value or applying it throws. The third column, v3 + EDP prior (variant edpbase), is v3 with a small positive base (EDP&apos;s need-widget base spread, scaled), written as one row of a separate table, edpBaseEdits; its base is a guess until reviewed.</p>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="v3 edits table">
        <table className={`${s.table} ${s.wrap}`}>
          <caption className={s.cap}>Edits: [target, path, from, to, reason]</caption>
          <thead><tr><th scope="col">target</th><th scope="col">path</th><th scope="col">from</th><th scope="col">to</th><th scope="col">reason</th></tr></thead>
          <tbody>{edits.map((e) => <tr key={e.target + e.path}><td>{e.target}</td><td>{e.path}</td><td>{fmt(e.from, 2)}</td><td><strong>{fmt(e.to, 2)}</strong></td><td>{e.reason}</td></tr>)}</tbody>
        </table>
      </div>
      {e3 ? (
        <div className={s.scroll} tabIndex={0} role="region" aria-label="edpBaseEdits table">
          <table className={`${s.table} ${s.wrap}`}>
            <caption className={s.cap}>edpBaseEdits (variant edpbase = v3 + this row): [target, path, from, to, reason]</caption>
            <thead><tr><th scope="col">target</th><th scope="col">path</th><th scope="col">from</th><th scope="col">to</th><th scope="col">reason</th></tr></thead>
            <tbody>{eEdits.map((e) => <tr key={e.target + e.path}><td>{e.target}</td><td>{e.path}</td><td>{fmt(e.from, 2)}</td><td><strong>{fmt(e.to, 3)}</strong></td><td>{e.reason}</td></tr>)}</tbody>
          </table>
        </div>
      ) : <p className={s.muted}>The edpbase document is not available in this lab (a stale precomputed set; regenerate it).</p>}
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Coefficients by variant">
        <table className={s.table}>
          <caption className={s.cap}>Coefficients</caption>
          <thead><tr><th scope="col">term</th><th scope="col">v1</th><th scope="col">v3</th><th scope="col">v3 + EDP prior</th></tr></thead>
          <tbody>{COEF_KEYS.map((k) => { const x = getCoef(a.session.v1, k), y = getCoef(b.session.v3, k), z = eCoefs ? getCoef(eCoefs, k) : null;
            return <tr key={k} className={x !== y || (z !== null && z !== y) ? s.win : undefined}><th scope="row"><code>{k}</code></th><td>{x}</td><td>{y}</td><td>{z ?? "–"}</td></tr>; })}</tbody>
        </table>
      </div>
      <h4 className={s.h5}>The same persona&apos;s session under each variant</h4>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Session under v1, v3 and v3 plus EDP prior">
        <table className={`${s.table} ${s.wrap}`}>
          <thead><tr><th scope="col">slot</th><th scope="col">v1</th><th scope="col">v3</th><th scope="col">v3 + EDP prior</th></tr></thead>
          <tbody>{ra.picks.map((p, i) => { const q = rb.picks[i]; return (
            <tr key={i} className={(q && q.slug !== p.slug) || (re?.picks[i] && re.picks[i].slug !== p.slug) ? s.win : undefined}><th scope="row">{i + 1}</th>
              <td>{cell(ra, i)}</td><td>{cell(rb, i)}</td><td>{cell(re, i)}</td></tr>); })}</tbody>
        </table>
      </div>
      <p className={s.circ} role="note">{CIRCULAR_LABEL}: session need coverage v1 {fmt(ra.circular.coverageRate, 3)} · v3 {fmt(rb.circular.coverageRate, 3)}{re ? ` · v3 + EDP prior ${fmt(re.circular.coverageRate, 3)}` : ""}. Not a pass score; simulated recall is in the policy comparison below. {LAB_BANNER}</p>
    </div>
  );
}

function Curves({ doc, edit, setEdit, base, fpKeys }: { doc: SandboxDoc; edit: Full; setEdit: (e: Full) => void; base: ReturnType<typeof recompose>; fpKeys: string[] }) {
  const [layer, setLayer] = useState<"l1" | "l2">("l1");
  const [copied, setCopied] = useState<string | null>(null);
  const out = useMemo(() => recompose(doc, edit), [doc, edit]);
  const diff = useMemo(() => codeDiff(doc, edit), [doc, edit]);
  const why = useMemo(() => explainNeeds(doc.fingerprint, edit.needShapes, edit.dampener), [doc, edit]);
  void fpKeys;
  const copy = async () => {
    try { await navigator.clipboard.writeText(diff.text); setCopied("Copied the diff to the clipboard. Nothing was saved."); }
    catch { setCopied("Could not use the clipboard; select the text below and copy it."); }
  };
  const same = out.picks.every((p, i) => p.slug === base.picks[i]?.slug);
  return (
    <div>
      <Badge />
      <p className={s.sandbox}>
        Drag a knot (or focus it and use the arrow keys; Shift for bigger steps) or edit a coefficient: the session below recomposes live in this browser tab.
        {" "}{SANDBOX_BADGE}. Reloading, switching persona or variant, or pressing Reset discards the edit. Fixed for the session: history, fingerprint, pool and addr.
      </p>
      <div className={s.live} aria-live="polite">
        <h3>Live session{isEdited(doc, edit) ? " (edited)" : " (as in model.ts)"}</h3>
        <ol className={s.sessionList}>
          {out.picks.map((p, i) => <li key={p.slug} className={base.picks[i]?.slug !== p.slug ? s.changed : undefined}><span className={s.slug}>{p.slug}</span> <span className={s.muted}>{p.moved ? `moved: ${p.reason}` : p.reason}{base.picks[i]?.slug !== p.slug ? ` · was ${base.picks[i]?.slug ?? "–"}` : ""}</span></li>)}
        </ol>
        <p className={s.mono}>needs: {NEEDS.map((n) => `${n} ${fmt(base.needs[n], 3)}→${fmt(out.needs[n], 3)}`).join(" · ")}</p>
        <p className={s.mono}>{same ? "Same lessons in the same order as model.ts." : "The session differs from model.ts."} {CIRCULAR_LABEL}: coverage {fmt(base.circular.coverageRate, 3)}→{fmt(out.circular.coverageRate, 3)}</p>
      </div>
      <div className={s.controls}>
        <button type="button" className={hq.btn} onClick={() => { setEdit(emptyEdit(doc)); setCopied(null); }} disabled={!isEdited(doc, edit)}>Reset</button>
        <button type="button" className={hq.btn} onClick={copy}>Copy as code diff</button>
        <span role="status" className={s.muted}>{copied}</span>
      </div>
      <div className={s.subtabs} role="tablist" aria-label="Curve layers">
        {([["l1", "Layer 1 · signals → needs"], ["l2", "Layer 2 · session coefficients"]] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={layer === k} className={`${s.subtab} ${layer === k ? s.subtabOn : ""}`} onClick={() => setLayer(k)}>{l}</button>
        ))}
      </div>
      {layer === "l1" ? (
        <div className={s.needs}>
          <section className={s.need} aria-labelledby="sb-damp">
            <div className={s.needHead}><h4 id="sb-damp">dampener</h4><span className={s.muted}>× {fmt(why.repair.damp, 2)} on every need</span></div>
            <div className={s.term}>
              <KnotChart label="dampener curve on historySize" curve={edit.dampener} original={doc.dampener} marker={doc.fingerprint.historySize as number}
                onKnot={(i, v) => setEdit(withKnot(edit, { need: "dampener", term: 0 }, i, v))} />
              <div className={s.termText}><p><code>historySize</code></p><p className={s.why}>{doc.dampener.why}</p></div>
            </div>
          </section>
          {NEEDS.map((n) => (
            <section key={n} className={s.need} aria-labelledby={`sb-${n}`}>
              <div className={s.needHead}><h4 id={`sb-${n}`}>{n}</h4><span className={s.big}>{fmt(why[n].score, 3)}</span></div>
              <p className={s.muted}>was {fmt(base.needs[n], 3)} · raw {fmt(why[n].raw, 3)} × dampener {fmt(why[n].damp, 2)}</p>
              {edit.needShapes[n].map((c, i) => (
                <div key={c.signal} className={s.term}>
                  <KnotChart label={`${n} curve on ${c.signal}`} curve={c} original={doc.needShapes[n][i]} marker={why[n].terms[i].x}
                    onKnot={(k, v) => setEdit(withKnot(edit, { need: n, term: i }, k, v))} />
                  <div className={s.termText}><p><code>{c.signal}</code> w {c.w}</p><p className={s.mono}>x {fmt(why[n].terms[i].x, 3)} → y {fmt(why[n].terms[i].y, 3)}</p><p className={s.why}>{c.why}</p></div>
                </div>
              ))}
            </section>
          ))}
        </div>
      ) : (
        <div className={s.coefs}>
          {COEF_KEYS.map((k) => (
            <label key={k} className={getCoef(edit.coefficients, k) !== getCoef(doc.session.coefficients, k) ? s.coefOn : undefined}>
              <code>{k}</code>
              <input type="number" step={0.01} value={getCoef(edit.coefficients, k)} onChange={(e) => setEdit(withCoef(edit, k, Number(e.target.value)))} aria-describedby={`why-${k}`} />
              <span className={s.muted}>model.ts: {getCoef(doc.session.coefficients, k)}</span>
              <span id={`why-${k}`} className={s.why}>{doc.session.why[k] ?? ""}</span>
            </label>
          ))}
        </div>
      )}
      <h3>Code diff</h3>
      <p className={s.muted}>{diff.changes} changed value{diff.changes === 1 ? "" : "s"}. Apply it in model.ts under the change rule; the sandbox applies nothing.</p>
      <pre className={s.pre} tabIndex={0} aria-label="Code diff against model.ts">{diff.text}</pre>
    </div>
  );
}

export default function ComposerLab({ meta, personaIds, initialPersona }: { meta: SimMeta; personaIds: string[]; initialPersona: string }) {
  const [personaId, setPersonaId] = useState(personaIds.includes(initialPersona) ? initialPersona : personaIds[0] ?? "");
  const [variant, setVariant] = useState<Variant>("v1");
  const [tab, setTab] = useState<Tab>("flow");
  const [docs, setDocs] = useState<Partial<Record<Variant, SandboxDoc>>>({});
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [edit, setEdit] = useState<Full | null>(null);
  const doc = docs[variant] ?? null;

  useEffect(() => {
    if (!personaId) return;
    let live = true;
    setBusy(true); setErr(null); setDocs({});
    (async () => {
      try {
        const got = await Promise.all(VARIANTS.map(async (v) => {
          const q = new URLSearchParams({ op: "sandbox", persona: personaId, variant: v, seed: "1" });
          const r = await fetch(`/api/hq/personalization?${q}`);
          const j = await r.json();
          if (!r.ok) { if (v === "edpbase") return null; throw new Error(j.error ?? r.statusText); } // a stale set may lack edpbase until regenerated
          return [v, j as SandboxDoc] as const;
        }));
        if (live) setDocs(Object.fromEntries(got.filter((x) => x !== null)));
      } catch (e) { if (live) setErr((e as Error).message); } finally { if (live) setBusy(false); }
    })();
    return () => { live = false; };
  }, [personaId]);

  // A new document (persona or variant) starts from model.ts: edits are never carried over.
  useEffect(() => { setEdit(doc ? emptyEdit(doc) : null); }, [doc]);

  const refusal = doc ? sandboxRefusal(doc) : null;
  const base = useMemo(() => (doc && !refusal ? recompose(doc) : null), [doc, refusal]);
  const fpKeys = useMemo(() => (doc ? Object.keys(doc.fingerprint).filter((k) => typeof doc.fingerprint[k] === "number") : []), [doc]);
  const name = meta.personas.find((p) => p.id === personaId)?.name ?? personaId;
  const ready = doc && edit && base && !refusal;

  return (
    <section className={s.panel} aria-labelledby="session-h">
      <h2 id="session-h">{SESSION_LAB_TITLE}</h2>
      <Badge />
      <p>
        The EDP Orchestrator&apos;s session machinery on simulated personas ({meta.session?.version ?? meta.composerVersion}, {meta.modelVersion}): a session of {doc?.session.size ?? meta.session?.size ?? 5} cards filled greedily with
        remaining need, coverage, complementarity, slot decay and an attention cost. {SESSION_CLOSED_NOTE} See the <Link href={SESSION_DECISION_HREF}>decision</Link> and the <Link href={SESSION_READOUT_HREF}>readout</Link>. This lab is offline inspection only: it shows how an EDP-style session composer composes and why a move happened. It is not serving anything and it is not evidence of learning. A sandbox drag or edit is still unscored.
      </p>
      <p className={s.unscored} role="note">{LAB_BANNER}</p>
      <div className={s.controls}>
        <label>Simulated persona
          <select value={personaId} onChange={(e) => setPersonaId(e.target.value)}>
            {meta.personas.filter((p) => personaIds.includes(p.id)).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <fieldset className={s.radio}>
          <legend>Variant</legend>
          {VARIANTS.map((v) => <label key={v}><input type="radio" name="lab-variant" checked={variant === v} onChange={() => setVariant(v)} disabled={!docs[v]} /> {v}</label>)}
        </fieldset>
      </div>
      {busy && <p className={s.muted} aria-live="polite">Loading the session document for {name}…</p>}
      {err && <p role="alert" className={s.error}>{err}</p>}
      {refusal && <p role="alert" className={s.error}>Sandbox refused: {refusal}</p>}
      {ready && (
        <>
          <p className={s.muted}>{name} · {doc.policy} · seed {doc.seed} · {doc.modelVersion} · {doc.composerVersion} · {doc.historyCount} pre-history lessons · pool of {doc.candidates.length} lessons</p>
          <div className={s.subtabs} role="tablist" aria-label="Session lab views">
            {TABS.map(([k, l]) => <button key={k} type="button" role="tab" id={`lab-tab-${k}`} aria-selected={tab === k} aria-controls="lab-panel" className={`${s.subtab} ${tab === k ? s.subtabOn : ""}`} onClick={() => setTab(k)}>{l}</button>)}
          </div>
          <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`}>
            {tab === "flow" && <Flow doc={doc} edit={edit} base={base} fpKeys={fpKeys} />}
            {tab === "gallery" && <Gallery doc={doc} edit={edit} />}
            {tab === "variants" && <Variants docs={docs} variant={variant} setVariant={setVariant} />}
            {tab === "curves" && <Curves doc={doc} edit={edit} setEdit={setEdit} base={base} fpKeys={fpKeys} />}
          </div>
        </>
      )}
    </section>
  );
}
