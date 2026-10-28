"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { advance, availability, displayedFrame, formatNumber, initialState, validateSpec } from "@/lib/mini-lab/model";
import type { MiniLabAction, MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import styles from "./TraceLesson.module.css";

function extent(values: number[]): [number, number] {
  const min = Math.min(...values), max = Math.max(...values);
  return min === max ? [min - 1, max + 1] : [min, max];
}
const scale = (value: number, range: [number, number], lo: number, hi: number) => lo + (value - range[0]) / (range[1] - range[0]) * (hi - lo);

function describeVisual(visual: MiniLabVisual): string {
  switch (visual.kind) {
    case "bars": return visual.items.map((i) => `${i.label}: ${formatNumber(i.value)}`).join("; ");
    case "grid": return visual.cells.map((i) => `${i.label}: ${formatNumber(i.value)}`).join("; ");
    case "timeline": return visual.events.map((i) => `${i.label}: ${formatNumber(i.value)}`).join("; ");
    case "intervals": return visual.items.map((i) => `${i.label}: ${formatNumber(i.low)} to ${formatNumber(i.high)}, center ${formatNumber(i.mid)}`).join("; ");
    case "curve": case "scatter": {
      const xr = extent(visual.points.map((p) => p.x)), yr = extent(visual.points.map((p) => p.y));
      return `${visual.points.length} points. ${visual.xLabel ?? "x"}: ${formatNumber(xr[0])} to ${formatNumber(xr[1])}; ${visual.yLabel ?? "y"}: ${formatNumber(yr[0])} to ${formatNumber(yr[1])}.`;
    }
    case "graph": return visual.edges.map((e) => `${visual.nodes.find((n) => n.id === e.from)?.label} to ${visual.nodes.find((n) => n.id === e.to)?.label}${e.active === false ? " cut" : ""}${e.label ? `: ${e.label}` : ""}`).join("; ");
    case "table": return visual.rows.map((r) => r.map((c, i) => `${visual.columns[i]}: ${typeof c === "number" ? formatNumber(c) : c}`).join(", ")).join("; ");
  }
}

/** Same geometric primitives in both domains; numerical models remain lesson-local. */
export function TraceVisual({ visual, caption }: { visual: MiniLabVisual; caption: string }) {
  const marker = `mini-arrow-${useId().replace(/:/g, "")}`;
  const accessible = `${caption}. ${describeVisual(visual)}`;
  if (visual.kind === "table") return <div className={styles.tableWrap}>
    <table className={styles.table} aria-label={caption}><thead><tr>{visual.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
      <tbody>{visual.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "number" ? formatNumber(c) : c}</td>)}</tr>)}</tbody></table>
  </div>;
  if (visual.kind === "grid") return <div className={styles.grid} role="img" aria-label={accessible}>
    {visual.cells.map((cell, i) => <div key={i}><span>{cell.label}</span><strong>{formatNumber(cell.value)}</strong></div>)}
  </div>;
  if (visual.kind === "bars") {
    const range = extent([0, ...visual.items.map((i) => i.value)]);
    const x = (v: number) => scale(v, range, 112, 277), zero = x(0);
    const height = 144 / visual.items.length;
    return <svg viewBox="0 0 320 170" className={styles.visual} role="img" aria-label={accessible}>
      <line x1={zero} x2={zero} y1="8" y2="156" className={styles.axis} />
      {visual.items.map((item, i) => <g key={i}>
        <text x="4" y={10 + height * (i + .5)} className={styles.label}>{item.label}</text>
        <rect x={Math.min(zero, x(item.value))} y={height * i + 5} width={Math.max(1, Math.abs(x(item.value) - zero))} height={Math.max(8, height - 8)} rx="3" className={item.value < 0 ? styles.negative : styles.fill} />
        <text x="316" y={10 + height * (i + .5)} textAnchor="end" className={styles.value}>{formatNumber(item.value)}</text>
      </g>)}
    </svg>;
  }
  if (visual.kind === "curve" || visual.kind === "scatter") {
    const xr = extent(visual.points.map((p) => p.x)), yr = extent(visual.points.map((p) => p.y));
    const x = (v: number) => scale(v, xr, 44, 303), y = (v: number) => scale(v, yr, 136, 16);
    return <svg viewBox="0 0 320 170" className={styles.visual} role="img" aria-label={accessible}>
      <path d="M44 10V136H306" className={styles.axis} />
      {visual.kind === "curve" && <polyline points={visual.points.map((p) => `${x(p.x)},${y(p.y)}`).join(" ")} className={styles.line} />}
      {visual.points.map((p, i) => <circle key={i} cx={x(p.x)} cy={y(p.y)} r={visual.kind === "scatter" ? 3.4 : 2.2} className={styles.dot} />)}
      <text x="41" y="151" textAnchor="middle">{formatNumber(xr[0])}</text><text x="301" y="151" textAnchor="middle">{formatNumber(xr[1])}</text>
      <text x="37" y="20" textAnchor="end">{formatNumber(yr[1])}</text><text x="37" y="138" textAnchor="end">{formatNumber(yr[0])}</text>
      {visual.xLabel && <text x="172" y="166" textAnchor="middle">{visual.xLabel}</text>}
      {visual.yLabel && <text x="6" y="9">{visual.yLabel}</text>}
    </svg>;
  }
  if (visual.kind === "graph") {
    const node = new Map(visual.nodes.map((n) => [n.id, n]));
    return <svg viewBox="0 0 320 170" className={styles.visual} role="img" aria-label={accessible}>
      <defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" className={styles.arrow} /></marker></defs>
      {visual.edges.map((edge, i) => {
        const a = node.get(edge.from)!, b = node.get(edge.to)!;
        const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1;
        return <g key={i} className={edge.active === false ? styles.inactive : undefined}>
          <line x1={a.x + dx / length * 18} y1={a.y + dy / length * 18} x2={b.x - dx / length * 20} y2={b.y - dy / length * 20} markerEnd={`url(#${marker})`} className={styles.edge} />
          {edge.label && <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 6} textAnchor="middle">{edge.label}</text>}
        </g>;
      })}
      {visual.nodes.map((n) => <g key={n.id}><circle cx={n.x} cy={n.y} r="18" className={styles.node} /><text x={n.x} y={n.y + 4} textAnchor="middle">{n.label}</text></g>)}
    </svg>;
  }
  if (visual.kind === "timeline") {
    const yr = extent([0, ...visual.events.map((e) => e.value)]);
    const x = (i: number) => visual.events.length === 1 ? 160 : 34 + i * 252 / (visual.events.length - 1);
    const y = (v: number) => scale(v, yr, 119, 20);
    return <svg viewBox="0 0 320 170" className={styles.visual} role="img" aria-label={accessible}>
      <line x1="25" y1="123" x2="300" y2="123" className={styles.axis} />
      <polyline points={visual.events.map((e, i) => `${x(i)},${y(e.value)}`).join(" ")} className={styles.line} />
      {visual.events.map((e, i) => <g key={i}><circle cx={x(i)} cy={y(e.value)} r="4" className={styles.dot} /><text x={x(i)} y={y(e.value) - 8} textAnchor="middle">{formatNumber(e.value)}</text><text x={x(i)} y={144 + (i % 2) * 16} textAnchor="middle">{e.label}</text></g>)}
    </svg>;
  }
  if (visual.kind === "intervals") {
    const xr = extent(visual.items.flatMap((i) => [i.low, i.high]));
    const x = (v: number) => scale(v, xr, 112, 300), step = 135 / visual.items.length;
    return <svg viewBox="0 0 320 170" className={styles.visual} role="img" aria-label={accessible}>
      {visual.items.map((item, i) => {
        const y = 18 + i * step;
        return <g key={i}><text x="4" y={y + 4}>{item.label}</text><line x1={x(item.low)} x2={x(item.high)} y1={y} y2={y} className={styles.interval} /><circle cx={x(item.mid)} cy={y} r="4" className={styles.dot} /><text x={x(item.mid)} y={y + 17} textAnchor="middle">{formatNumber(item.low)} – {formatNumber(item.high)}</text></g>;
      })}
    </svg>;
  }
  return null;
}

function FrameView({ frame, saved }: { frame: MiniLabFrame; saved: boolean }) {
  return <><p className={styles.caption}>{saved ? "Saved case A · " : ""}{frame.caption}</p><div data-mini-picture=""><TraceVisual visual={frame.visual} caption={frame.caption} /></div>
    {frame.metrics && <dl className={styles.metrics} data-mini-metrics="">{frame.metrics.map((m, i) => <div key={i}><dt>{m.label}</dt><dd>{typeof m.value === "number" ? formatNumber(m.value) : m.value}</dd></div>)}</dl>}
  </>;
}

/** Keep contract-bearing Lesson and Control elements in each lesson-owned wrapper. */
export function useMiniLab(input: MiniLabSpec) {
  const spec = useMemo(() => validateSpec(input), [input]);
  const [state, setState] = useState(initialState);
  const current = useRef(state);
  function apply(action: MiniLabAction, interact: () => void) {
    const before = current.current, next = advance(spec, before, action);
    if (before === next) return;
    current.current = next;
    setState(next);
    next.witnessed.forEach((seen, i) => { if (seen && !before.witnessed[i]) interact(); });
  }
  const enabled = availability(spec, state);
  const displayed = displayedFrame(spec, state);
  return { spec, state, enabled, displayed, apply };
}

export type MiniLabController = ReturnType<typeof useMiniLab>;

export function MiniLabReveal({ lab }: { lab: MiniLabController }) {
  return <>{lab.spec.reveal.map((p, i) => <p key={i}>{p}</p>)}</>;
}

/** Children are the lesson's actual controls; this component supplies only their layout. */
export function MiniLabStage({ lab, locked, children }: { lab: MiniLabController; locked: boolean; children: ReactNode }) {
  const { spec, state, displayed } = lab;
  return <div className={styles.stage} data-mini-lab={spec.id} data-mini-family={spec.family} data-mini-scenario={state.scenarioIndex} data-mini-frame={state.frameIndex}>
      {locked || !displayed ? <div className={styles.setup}>
        <p>{spec.setup}</p><svg viewBox="0 0 320 138" className={styles.preview} role="img" aria-label="Two cases awaiting exploration"><rect x="30" y="18" width="112" height="96" rx="12" /><rect x="178" y="18" width="112" height="96" rx="12" /><text x="86" y="80">?</text><text x="234" y="80">?</text></svg>
      </div> : <FrameView frame={displayed.frame} saved={displayed.saved} />}
      <div className={styles.controls}>{children}</div>
      {state.witnessed.some(Boolean) && <div className={styles.witness} aria-live="polite" data-mini-witness="">
        {spec.scenarios.map((scenario, i) => state.witnessed[i] ? <div key={scenario.id}><span>{i === 0 ? "A" : "B"}</span><strong>{scenario.summary}</strong></div> : null)}
      </div>}
    </div>;
}

/** Convenience adapter; repository lessons use the composable exports above for static gates. */
export function TraceLesson({ slug, spec }: { slug: string; spec: MiniLabSpec }) {
  const lab = useMiniLab(spec);
  return <Lesson slug={slug} predict={lab.spec.predict} minInteractions={2} exploreHint={lab.spec.hint} reveal={() => <MiniLabReveal lab={lab} />}>
    {({ locked, interact }) => <MiniLabStage lab={lab} locked={locked}>
      <Control disabled={locked || !lab.enabled.run} onClick={() => lab.apply("run", interact)}>Run case</Control>
      <Control disabled={locked || !lab.enabled.compare} onClick={() => lab.apply("compare", interact)}>Compare</Control>
      <Control disabled={locked || !lab.enabled.step} onClick={() => lab.apply("step", interact)}>Step</Control>
      <Control disabled={locked || !lab.enabled.reset} onClick={() => lab.apply("reset", interact)}>Reset</Control>
    </MiniLabStage>}
  </Lesson>;
}
