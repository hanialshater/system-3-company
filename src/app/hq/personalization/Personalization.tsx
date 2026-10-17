"use client";
// HQ simulation lab (W-1503): pick a simulated persona, a policy and a seed, run (or load) the phase A
// simulation, and inspect it: fingerprint, need curves with the persona's point, per-signal contributions
// with reasons, the served timeline, every composed slot with its score terms, and an UNSCORED policy table.
// Read-only: curves are edited in code (company/personalization/model/README.md, change rule).
// Simulated personas only: no real learner data is read or shown.
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HqTop } from "../HqTop";
import hq from "../hq.module.css";
import {
  NEED_ORDER, UNSCORED_LABEL, curvePath, fmt, precomputedLine, pwlAt, servableGroups, stepLine, yesNo,
  type CurveView, type NeedExplanation, type NewStep, type PersonaView, type SimCompare, type SimMeta, type SimTrace, type SlotTrace, type Step,
} from "@/lib/hq-personalization";
import s from "./personalization.module.css";

type Initial = { persona: string | null; policy: string | null; seed: number | null; days: number | null; step: number | null };
type Filter = "all" | "new" | "moved" | "revisit";

const W = 200, H = 110;

function CurveChart({ c, persona, step }: { c: CurveView; persona: number | null; step: number | null }) {
  const pt = (x: number) => ({ cx: x * W, cy: (1 - pwlAt(x, c.points)) * H });
  const label = `${c.need} curve on ${c.signal}: ${c.points.map((p) => `(${p.x}, ${p.y})`).join(" ")}` +
    `${persona !== null ? `; persona at x=${fmt(persona, 2)}, y=${fmt(pwlAt(persona, c.points), 2)}` : ""}` +
    `${step !== null ? `; selected step at x=${fmt(step, 2)}, y=${fmt(pwlAt(step, c.points), 2)}` : ""}`;
  return (
    <svg className={s.chart} viewBox={`-14 -8 ${W + 22} ${H + 26}`} role="img" aria-label={label}>
      <rect x={0} y={0} width={W} height={H} className={s.frame} />
      {[0.25, 0.5, 0.75].map((g) => (
        <g key={g}>
          <line x1={g * W} x2={g * W} y1={0} y2={H} className={s.grid} />
          <line x1={0} x2={W} y1={g * H} y2={g * H} className={s.grid} />
        </g>
      ))}
      <path d={curvePath(c.points, W, H)} className={s.curve} />
      {c.points.map((p, i) => <circle key={i} cx={p.x * W} cy={(1 - p.y) * H} r={2.2} className={s.knot} />)}
      {step !== null && <circle {...pt(step)} r={6} className={s.stepPt} />}
      {persona !== null && <circle {...pt(persona)} r={4.2} className={s.personaPt} />}
      <text x={0} y={H + 13} className={s.axis}>0</text>
      <text x={W} y={H + 13} className={s.axis} textAnchor="end">1</text>
      <text x={W / 2} y={H + 13} className={s.axis} textAnchor="middle">{c.signal}</text>
      <text x={-4} y={4} className={s.axis} textAnchor="end">1</text>
      <text x={-4} y={H} className={s.axis} textAnchor="end">0</text>
    </svg>
  );
}

function NeedCard({ need, ex, curves, personaFp, stepFp }: {
  need: string; ex: NeedExplanation | undefined; curves: CurveView[]; personaFp: Record<string, unknown>; stepFp: Record<string, unknown> | null;
}) {
  const num = (fp: Record<string, unknown> | null, k: string) => (fp && typeof fp[k] === "number" ? (fp[k] as number) : null);
  return (
    <section className={s.need} aria-labelledby={`need-${need}`}>
      <div className={s.needHead}>
        <h3 id={`need-${need}`}>{need}</h3>
        {ex && <span className={s.big}>{fmt(ex.score, 3)}</span>}
      </div>
      {ex && <p className={s.muted}>raw {fmt(ex.raw, 3)} × dampener {fmt(ex.dampener, 2)} = {fmt(ex.score, 3)}</p>}
      {curves.map((c) => {
        const t = ex?.terms.find((x) => x.signal === c.signal);
        return (
          <div key={c.signal} className={s.term}>
            <CurveChart c={c} persona={num(personaFp, c.signal)} step={num(stepFp, c.signal)} />
            <div className={s.termText}>
              <p><code>{c.signal}</code> w {c.w} · <span className={s.priv}>{c.privacy}</span></p>
              {t && <p className={s.mono}>x {fmt(t.x, 3)} → y {fmt(t.y, 3)} · contribution {fmt(t.contribution, 3)}</p>}
              <p className={s.why}>{c.why}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function SlotView({ slot, served }: { slot: SlotTrace; served: string }) {
  const termNames = slot.candidates[0]?.terms.map((t) => t.name) ?? [];
  return (
    <div className={s.slot}>
      <dl className={s.kv}>
        <div><dt>default card</dt><dd>{slot.defaultCard ?? "–"} {slot.defaultScore !== null && <span className={s.mono}>({fmt(slot.defaultScore)})</span>}</dd></div>
        <div><dt>winner</dt><dd><strong>{slot.winner ?? "–"}</strong>{slot.winner === served ? " (served)" : ""}</dd></div>
        <div><dt>decided by</dt><dd>{slot.constraint ?? "score (no hard constraint applied)"}</dd></div>
        <div><dt>reason · moved · margin</dt><dd>{slot.reason} · {yesNo(slot.moved)} · {fmt(slot.margin)}</dd></div>
        <div><dt>candidates considered</dt><dd>{slot.candidatesConsidered}</dd></div>
        {slot.engagementFloor && <div><dt>engagement floor</dt><dd>{slot.engagementFloor}</dd></div>}
      </dl>
      {slot.remainingBefore && slot.remainingAfter && (
        <p className={s.mono}>
          remaining need: {NEED_ORDER.map((n) => `${n} ${fmt(slot.remainingBefore![n], 2)}→${fmt(slot.remainingAfter![n], 2)}`).join(" · ")}
        </p>
      )}
      {slot.candidates.length > 0 && (
        <div className={s.scroll} tabIndex={0} role="region" aria-label={`Slot ${slot.slot} candidates and score terms`}>
          <table className={s.table}>
            <caption className={s.cap}>Top candidates with every score term (sum = score)</caption>
            <thead>
              <tr><th scope="col">card</th>{termNames.map((n) => <th key={n} scope="col">{n}</th>)}<th scope="col">score</th><th scope="col">eligible</th></tr>
            </thead>
            <tbody>
              {slot.candidates.map((c) => (
                <tr key={c.slug} className={c.slug === slot.winner ? s.win : c.slug === slot.defaultCard ? s.def : undefined}>
                  <th scope="row">
                    <span className={s.slug}>{c.slug}</span>
                    {c.slug === slot.winner && <span className={s.tagWin}>winner</span>}
                    {c.slug === slot.defaultCard && <span className={s.tagDef}>default</span>}
                    <span className={s.sub}>{c.concept} · {c.level}</span>
                  </th>
                  {termNames.map((n) => {
                    const v = c.terms.find((t) => t.name === n)?.value ?? 0;
                    return <td key={n} className={v === 0 ? s.zero : v < 0 ? s.neg : undefined}>{fmt(v)}</td>;
                  })}
                  <td><strong>{fmt(c.score)}</strong></td>
                  <td>{c.eligibleToMove ? "yes" : <span title={c.note}>no{c.note ? `: ${c.note}` : ""}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {slot.rejected.length > 0 && (
        <>
          <h5 className={s.h5}>Rejected and why</h5>
          <ul className={s.rejected}>
            {slot.rejected.map((r) => <li key={r.slug}><span className={s.slug}>{r.slug}</span> <span className={s.muted}>{r.why}</span></li>)}
          </ul>
        </>
      )}
    </div>
  );
}

function StepView({ step, trace, onGo }: { step: Step; trace: SimTrace; onGo: (i: number) => void }) {
  if (step.kind === "revisit") {
    const origin = trace.steps.find((x) => x.kind === "new" && x.served === step.slug);
    return (
      <div className={s.stepBody}>
        <p>Day {step.day}: first revisit of <strong>{step.slug}</strong>, simulated recall: <strong>{step.recalled ? "recalled" : "forgot"}</strong>.</p>
        <p className={s.muted}>Due revisits always come first (constraint dueRevisitsFirst); no policy chooses them.</p>
        {origin && <button type="button" className={hq.btn} onClick={() => onGo(origin.step)}>Go to step {origin.step}, where it was served</button>}
      </div>
    );
  }
  const st: NewStep = step;
  return (
    <div className={s.stepBody}>
      <dl className={s.kv}>
        <div><dt>served</dt><dd><strong>{st.served}</strong></dd></div>
        <div><dt>reason · moved</dt><dd>{st.reason} · {yesNo(st.moved)}</dd></div>
        <div><dt>composer note</dt><dd>{st.note} ({st.personalised ? "personalised" : "not personalised"})</dd></div>
        <div><dt>shown before a prerequisite</dt><dd>{yesNo(st.shownBeforePrerequisites)}</dd></div>
        <div><dt>simulated prediction</dt><dd>{st.simulated.predictedRight ? "right" : "wrong"}</dd></div>
        <div><dt>simulated reveal · stopped</dt><dd>{yesNo(st.simulated.revealed)} · {yesNo(st.simulated.stopped)}</dd></div>
        <div><dt>simulated first recall</dt><dd>{st.simulated.firstRecall === null ? "no revisit (not revealed or out of time)" : st.simulated.firstRecall ? "recalled" : "forgot"}</dd></div>
        <div><dt>need scores at this step</dt><dd className={s.mono}>{st.needs.map((n) => `${n.need} ${fmt(n.score, 2)}`).join(" · ")}</dd></div>
      </dl>
      {st.slots.map((sl) => (
        <details key={sl.slot} className={s.slotBox} open={sl.slot === 0}>
          <summary>
            Slot {sl.slot}{sl.slot === 0 ? " (served now)" : " (look-ahead; recomputed after this card)"}: {sl.winner ?? "–"}
            {sl.constraint ? ` · ${sl.constraint}` : ""}
          </summary>
          <SlotView slot={sl} served={st.served} />
        </details>
      ))}
    </div>
  );
}

function Compare({ meta, persona, days: liveDays }: { meta: SimMeta; persona: string; days: number }) {
  // Precomputed (released HQ): only the stored comparisons can be served, so seeds and days are fixed and only
  // the stored policy sets are offered (W-1572 H1).
  const pre = meta.precomputed?.compare;
  const days = pre ? pre.days : liveDays;
  const [scope, setScope] = useState<"persona" | "all">("persona");
  const [seedsLive, setSeeds] = useState(5);
  const seeds = pre ? pre.seeds : seedsLive;
  const [set, setSet] = useState<"main" | "all">(pre && !pre.sets.includes("main") ? pre.sets[0] : "main");
  const [res, setRes] = useState<SimCompare | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const run = async () => {
    setBusy(true); setErr(null);
    const q = new URLSearchParams({ op: "compare", persona: scope === "all" ? "all" : persona, seeds: String(seeds), set, days: String(days) });
    try {
      const r = await fetch(`/api/hq/personalization?${q}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? r.statusText);
      setRes(j);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  const name = (id: string) => meta.personas.find((p) => p.id === id)?.name ?? id;
  const cols: [keyof SimCompare["rows"][number], string, number][] = [
    ["recall", "recall", 3], ["recallSe", "± se", 3], ["recallSd", "sd", 3], ["concepts", "concepts", 1], ["domains", "domains", 2],
    ["prereqFirst", "prereq first", 3], ["reveal", "reveal", 3], ["gain", "gain", 1], ["movedShare", "moved", 3], ["cards", "cards", 1],
  ];
  return (
    <section className={s.panel} aria-labelledby="cmp-h">
      <h2 id="cmp-h">Policy comparison</h2>
      <p className={s.unscored} role="note">{UNSCORED_LABEL}</p>
      <p className={s.muted}>{meta.provisional}. No row is better than another until a criterion is committed (W-1496).</p>
      <form className={s.controls} onSubmit={(e) => { e.preventDefault(); run(); }}>
        <label>Simulated personas
          <select value={scope} onChange={(e) => setScope(e.target.value as "persona" | "all")}>
            <option value="persona">{name(persona)}</option>
            <option value="all">all six simulated personas</option>
          </select>
        </label>
        {pre ? (
          <p className={s.fixed}>Seeds {pre.seeds} · {pre.days} days <span className={s.muted}>(precomputed)</span></p>
        ) : (
          <label>Seeds
            <input type="number" min={1} max={10} value={seeds} onChange={(e) => setSeeds(Math.max(1, Math.min(10, Number(e.target.value) || 1)))} />
          </label>
        )}
        <label>Policies
          <select value={set} onChange={(e) => setSet(e.target.value as "main" | "all")}>
            {(!pre || pre.sets.includes("main")) && <option value="main">model policies ({meta.policies.model.filter((p) => meta.policies.all.includes(p)).length})</option>}
            {(!pre || pre.sets.includes("all")) && <option value="all">with ablations ({meta.policies.all.length})</option>}
          </select>
        </label>
        <button type="submit" className={hq.btn} disabled={busy}>{busy ? (pre ? "Loading…" : "Running…") : pre ? "Show comparison" : "Run comparison"}</button>
      </form>
      {err && <p role="alert" className={s.error}>{err}</p>}
      {res && (
        <div className={s.scroll} tabIndex={0} role="region" aria-label="Policy comparison table">
          <table className={s.table}>
            <caption className={s.cap}>
              {UNSCORED_LABEL}. {res.personas.length === 1 ? `simulated persona ${name(res.personas[0])}` : `${res.personas.length} simulated personas`} × {res.seeds} seeds, {res.days} days ({meta.precomputed ? precomputedLine(meta.precomputed).replace(/, seed .*$/, "") : `${(res.ms / 1000).toFixed(1)} s, ${res.modelVersion}`})
            </caption>
            <thead><tr><th scope="col">policy</th><th scope="col">episodes</th>{cols.map(([k, l]) => <th key={k} scope="col" title={res.columns[k as string]}>{l}</th>)}</tr></thead>
            <tbody>
              {res.rows.map((r) => (
                <tr key={r.policy}>
                  <th scope="row" className={s.slug}>{r.policy}</th>
                  <td>{r.episodes}</td>
                  {cols.map(([k, , d]) => <td key={k}>{fmt(r[k] as number | null, d)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className={s.legend}>
            {Object.entries(res.columns).map(([k, v]) => <li key={k}><code>{k}</code>: {v}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

function FingerprintTable({ persona, trace, step, meta }: { persona: PersonaView; trace: SimTrace | null; step: NewStep | null; meta: SimMeta }) {
  const sigs = Object.keys(persona.fingerprintMeans);
  return (
    <div className={s.scroll} tabIndex={0} role="region" aria-label="Simulated fingerprint">
      <table className={s.table}>
        <caption className={s.cap}>Simulated fingerprint (what a composer sees; never the latent truth)</caption>
        <thead><tr><th scope="col">signal</th><th scope="col">persona mean</th>{trace && <th scope="col">this run (jittered)</th>}{step && <th scope="col">step {step.step}</th>}<th scope="col">privacy</th></tr></thead>
        <tbody>
          {sigs.map((k) => (
            <tr key={k}>
              <th scope="row"><code>{k}</code></th>
              <td>{fmt(persona.fingerprintMeans[k], 2)}</td>
              {trace && <td>{k in trace.persona.jitteredMeans ? fmt(trace.persona.jitteredMeans[k], 2) : "–"}</td>}
              {step && <td>{typeof step.fingerprint[k] === "number" ? fmt(step.fingerprint[k] as number, 2) : "–"}</td>}
              <td className={s.priv}>{meta.model.signals.find((x) => x.signal === k)?.privacy ?? "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Personalization({ meta, error, initial }: { meta: SimMeta | null; error: string | null; initial: Initial }) {
  // Precomputed (released HQ, W-1572 H1): only stored runs can be served, so the choices are limited to them.
  const pre = meta?.precomputed;
  const personaIds = (meta?.personas.map((p) => p.id) ?? []).filter((id) => !pre || pre.personas.includes(id));
  const policyIds = pre ? pre.policies : meta?.policies.all ?? [];
  const [personaId, setPersonaId] = useState(initial.persona && personaIds.includes(initial.persona) ? initial.persona : personaIds[0] ?? "");
  const [policy, setPolicy] = useState(initial.policy && policyIds.includes(initial.policy) ? initial.policy : policyIds.includes("gam") ? "gam" : policyIds[0] ?? "gam");
  const [seed, setSeed] = useState(pre ? (initial.seed && pre.seeds.includes(initial.seed) ? initial.seed : pre.seeds[0]) : initial.seed && initial.seed >= 1 ? initial.seed : 1);
  const [days, setDays] = useState(pre ? pre.days : initial.days && initial.days >= 1 && initial.days <= 14 ? initial.days : meta?.sim.defaultDays ?? 7);
  const [trace, setTrace] = useState<SimTrace | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [stepNo, setStepNo] = useState<number | null>(initial.step);
  const [filter, setFilter] = useState<Filter>("all");
  const [at, setAt] = useState<"persona" | "step">("persona");
  const [savedFile, setSavedFile] = useState("");

  const persona = meta?.personas.find((p) => p.id === (trace?.persona.id ?? personaId)) ?? meta?.personas[0] ?? null;

  const load = useCallback(async (q: URLSearchParams, keepStep: number | null = null) => {
    setBusy(true); setErr(null);
    try {
      const r = await fetch(`/api/hq/personalization?${q}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? r.statusText);
      setTrace(j as SimTrace);
      const first = (j as SimTrace).steps.find((x) => x.kind === "new");
      setStepNo(keepStep !== null && keepStep < j.steps.length ? keepStep : first?.step ?? 0);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }, []);

  const runLive = useCallback((keep: number | null = null) =>
    load(new URLSearchParams({ op: "run", persona: personaId, policy, seed: String(seed), days: String(days) }), keep), [load, personaId, policy, seed, days]);

  // First visit: run once with the initial (or default) choice so the page has something to inspect.
  useEffect(() => { if (meta && personaId) runLive(initial.step); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  // Keep the URL shareable.
  useEffect(() => {
    if (!trace || trace.run.source.startsWith("saved")) return;
    const q = new URLSearchParams({ persona: trace.run.persona, policy: trace.run.policy, seed: String(trace.run.seed), days: String(trace.run.days ?? days) });
    if (stepNo !== null) q.set("step", String(stepNo));
    window.history.replaceState(null, "", `/hq/personalization?${q}`);
  }, [trace, stepNo, days]);

  const steps = useMemo(() => (trace?.steps ?? []).filter((x) =>
    filter === "all" ? true : filter === "new" ? x.kind === "new" : filter === "revisit" ? x.kind === "revisit" : x.kind === "new" && x.moved), [trace, filter]);
  const step = trace && stepNo !== null ? trace.steps[stepNo] ?? null : null;
  const newStep = step && step.kind === "new" ? step : null;
  const go = (i: number) => { setStepNo(i); requestAnimationFrame(() => document.getElementById("step-inspector")?.focus()); };
  const move = (d: number) => {
    if (!trace || stepNo === null) return;
    const i = steps.findIndex((x) => x.step === stepNo);
    const n = steps[Math.max(0, Math.min(steps.length - 1, (i < 0 ? 0 : i) + d))];
    if (n) setStepNo(n.step);
  };

  if (!meta || !persona)
    return (
      <div className={hq.hq}>
        <HqTop on="personalization" subtitle="Personalization lab (simulation)" />
        <p role="alert" className={s.error}>{error ?? "No personas were returned by the simulator."}</p>
      </div>
    );

  const curvesFor = (need: string) => meta.model.curves.filter((c) => c.need === need);
  const useStep = at === "step" && newStep;
  const explain = useStep ? newStep.needs : persona.needsAtMeans;
  const personaFp = persona.fingerprintMeans;
  const stepFp = newStep ? newStep.fingerprint : null;
  const damp = curvesFor("dampener")[0];
  const groups = servableGroups(meta.policies, pre);

  return (
    <div className={hq.hq}>
      <HqTop on="personalization" subtitle="Personalization lab (simulation)" />
      <main className={s.page}>
        <header className={s.header}>
          <h1>Personalization lab</h1>
          <p className={s.badges}>
            <span className={s.badge}>{meta.modelVersion}</span>
            <span className={s.badge}>{meta.personasVersion}</span>
            <span className={s.badge}>{meta.composerVersion}</span>
            <span className={s.badgeWarn}>simulated personas only</span>
            <span className={s.badgeWarn}>read-only</span>
          </p>
          <p className={s.muted}>
            {meta.simulatedOnly}. Curves, weights and personas are edited in code, not here: change the number and its reason, bump the version,
            add a line to <Link href={`/hq/library/${meta.decision.replace(/^company\//, "")}`}>the decision record</Link> (
            <Link href="/hq/library/personalization/model/README.md">change rule</Link>).
          </p>
          <p className={s.unscored} role="note">{UNSCORED_LABEL}</p>
          <p className={s.muted}>
            Also here, read-only: the <Link href="/hq/personalization/candidates">frozen candidates</Link> (reachable-v2, reachable-v3; not live, go/no-go pending)
            and the <Link href="/hq/personalization/evaluation">Evaluation record</Link> (studies, reviews, decisions).
          </p>
          {pre && (
            <p className={s.precomputed} role="note">
              Precomputed: this lab runs nothing. It shows simulator runs {precomputedLine(pre)}, generated locally with <code>{pre.command}</code>{" "}
              for {pre.personas.length} simulated personas × {pre.policies.length} policies, and comparisons at {pre.compare.seeds} seeds.
              Other seeds, days, ablation runs and saved traces need a local lab (npm run dev).
            </p>
          )}
        </header>

        <section className={s.panel} aria-labelledby="run-h">
          <h2 id="run-h">{pre ? "Load a precomputed simulation" : "Run or load a simulation"}</h2>
          <form className={s.controls} onSubmit={(e) => { e.preventDefault(); runLive(); }}>
            <label>Simulated persona
              <select value={personaId} onChange={(e) => setPersonaId(e.target.value)}>
                {meta.personas.filter((p) => personaIds.includes(p.id)).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </label>
            <label>Policy
              <select value={policy} onChange={(e) => setPolicy(e.target.value)}>
                {groups.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.items.map((p) => <option key={p} value={p}>{p}{meta.policies.ablations[p]?.length ? ` (off: ${meta.policies.ablations[p].join(", ")})` : ""}</option>)}
                  </optgroup>
                ))}
              </select>
            </label>
            {pre ? (
              <>
                {pre.seeds.length > 1 ? (
                  <label>Seed
                    <select value={seed} onChange={(e) => setSeed(Number(e.target.value))}>
                      {pre.seeds.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </label>
                ) : null}
                <p className={s.fixed}>{pre.seeds.length > 1 ? "" : `Seed ${pre.seeds[0]} · `}{pre.days} days <span className={s.muted}>(precomputed)</span></p>
              </>
            ) : (
              <>
                <label>Seed
                  <input type="number" min={1} max={999} value={seed} onChange={(e) => setSeed(Math.max(1, Math.min(999, Number(e.target.value) || 1)))} />
                </label>
                <label>Days
                  <input type="number" min={1} max={14} value={days} onChange={(e) => setDays(Math.max(1, Math.min(14, Number(e.target.value) || 1)))} />
                </label>
              </>
            )}
            <button type="submit" className={hq.btn} disabled={busy}>{busy ? (pre ? "Loading…" : "Running…") : pre ? "Show" : "Run"}</button>
          </form>
          {meta.saved.length > 0 && (
            <form className={s.controls} onSubmit={(e) => { e.preventDefault(); if (savedFile) load(new URLSearchParams({ op: "saved", file: savedFile })); }}>
              <label>Saved trace (run.mjs output)
                <select value={savedFile} onChange={(e) => setSavedFile(e.target.value)}>
                  <option value="">choose…</option>
                  {meta.saved.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </label>
              <button type="submit" className={hq.btn} disabled={busy || !savedFile}>Load</button>
            </form>
          )}
          {err && <p role="alert" className={s.error}>{err}</p>}
          {trace && (
            <p className={s.muted} aria-live="polite">
              Showing {trace.persona.name} · {trace.run.policy} · seed {trace.run.seed}{trace.run.days ? ` · ${trace.run.days} days` : ""} · {trace.run.source} · {trace.modelVersion} ·
              {" "}{trace.preHistoryCount} pre-history lessons · episode recall {fmt(trace.score.recall)} over {trace.score.nRecalls} revisits, {trace.score.cards} cards ({UNSCORED_LABEL})
            </p>
          )}
        </section>

        <section className={s.panel} aria-labelledby="persona-h">
          <h2 id="persona-h">Simulated persona: {persona.name}</h2>
          <p>{persona.description}</p>
          <p className={s.muted}>Why it exists: {persona.why} · source: {persona.source}</p>
          <FingerprintTable persona={persona} trace={trace} step={newStep} meta={meta} />
          <details className={s.slotBox}>
            <summary>Simulator ground truth (no policy reads this)</summary>
            <pre className={s.pre}>{JSON.stringify(persona.groundTruth.latent, null, 2)}</pre>
            {trace && <pre className={s.pre}>{JSON.stringify({ learnerParams: trace.groundTruth.params }, null, 2)}</pre>}
          </details>
        </section>

        <section className={s.panel} aria-labelledby="needs-h">
          <h2 id="needs-h">Needs and their curves</h2>
          <fieldset className={s.radio}>
            <legend>Explain at</legend>
            <label><input type="radio" name="at" checked={at === "persona"} onChange={() => setAt("persona")} /> persona means</label>
            <label><input type="radio" name="at" checked={at === "step"} disabled={!newStep} onChange={() => setAt("step")} /> selected step{newStep ? ` (${newStep.step})` : ""}</label>
          </fieldset>
          <p className={s.muted}>
            <span className={s.keyPersona} aria-hidden="true" /> simulated persona mean
            {stepFp && <> · <span className={s.keyStep} aria-hidden="true" /> selected step&apos;s simulated fingerprint</>}
            {" "}· contributions shown at: {useStep ? `step ${newStep.step}` : "persona means"} · need = Σ w·curve(x) / Σ w × dampener(historySize)
          </p>
          {damp && (
            <div className={s.needs}>
              <NeedCard need="dampener" ex={undefined} curves={[damp]} personaFp={personaFp} stepFp={stepFp} />
            </div>
          )}
          <div className={s.needs}>
            {NEED_ORDER.map((n) => (
              <NeedCard key={n} need={n} ex={explain.find((e) => e.need === n)} curves={curvesFor(n)} personaFp={personaFp} stepFp={stepFp} />
            ))}
          </div>
        </section>

        {trace && (
          <section className={s.panel} aria-labelledby="tl-h">
            <h2 id="tl-h">Timeline</h2>
            <div className={s.controls}>
              <label>Show
                <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
                  <option value="all">all steps ({trace.steps.length})</option>
                  <option value="new">new cards</option>
                  <option value="moved">moved off the default order</option>
                  <option value="revisit">revisits</option>
                </select>
              </label>
              <button type="button" className={hq.btn} onClick={() => move(-1)}>Previous</button>
              <button type="button" className={hq.btn} onClick={() => move(1)}>Next</button>
            </div>
            <div className={s.layout}>
              <ol className={s.timeline} aria-label="Steps">
                {steps.map((x) => (
                  <li key={x.step}>
                    <button type="button" aria-current={x.step === stepNo ? "step" : undefined}
                      className={`${s.stepBtn} ${x.step === stepNo ? s.stepOn : ""} ${x.kind === "revisit" ? s.rev : ""}`} onClick={() => go(x.step)}>
                      <span className={s.stepNo}>{x.step}</span>
                      <span className={s.stepDay}>d{x.day}</span>
                      <span className={s.stepText}>{stepLine(x)}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <div id="step-inspector" tabIndex={-1} className={s.inspector} aria-live="polite">
                {step ? (
                  <>
                    <h3>Step {step.step} · day {step.day} · {step.kind}</h3>
                    <StepView step={step} trace={trace} onGo={go} />
                  </>
                ) : <p className={s.muted}>Choose a step.</p>}
              </div>
            </div>
          </section>
        )}

        <Compare meta={meta} persona={personaId} days={days} />
      </main>
    </div>
  );
}
