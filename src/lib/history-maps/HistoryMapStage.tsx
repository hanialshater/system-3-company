"use client";

import { useState, type ReactNode } from "react";
import type { HistoryMapSpec, MapShape } from "./types";
import s from "./history-maps.module.css";

const relationText: Record<string,string> = { same: "Same label", different: "Different labels", unlabelled: "Coverage missing" };
const colour = (shape: MapShape) => shape.focus === "other" ? "var(--muted)" : shape.focus === "b" ? "var(--domain)" : "var(--good)";

export function useHistoryMapState() {
  const [mode,setMode] = useState<number | null>(null);
  const [seen,setSeen] = useState([false,false]);
  return { mode, seen, choose: (next: number) => {
    setMode(next);
    if (next < 2) setSeen((prior) => prior.map((v,i) => v || i === next));
  } };
}

export function HistoryMapStage({ spec, mode, seen, locked, children }: {
  spec: HistoryMapSpec;
  mode: number | null;
  seen: boolean[];
  locked: boolean;
  children: ReactNode;
}) {
  const active = !locked && mode !== null;
  const frame = active && mode < 2 ? spec.frames[mode] : null;
  const layers = !active ? [] : mode === 2 ? spec.frames : [spec.frames[mode]];
  const identical = frame && JSON.stringify(frame.labels[0]) === JSON.stringify(frame.labels[1]);
  const labelText = (labels: string[], short: string[]) => labels.length > 1 ? `${labels.length} overlapping labels` : short.join(" / ") || "Unlabelled";
  return <div className={s.stage}>
    <div className={s.locations}>{spec.points.map((p,i) => <span key={p.name}><b>{i === 0 ? "A" : "B"}</b> {p.name}</span>)}</div>
    <svg viewBox="0 0 360 192" className={`stage-svg ${s.map}`} role="img"
      aria-label={`${spec.title}: ${!active ? "fixed dots, commit a prediction to view historical labels" : mode === 2 ? "earlier outlines over later fills" : spec.years[mode]}`}>
      <rect x="0" y="0" width="360" height="192" fill="var(--bg-2)" />
      <path d={spec.coast} fill="var(--line)" fillOpacity="0.5" stroke="var(--muted)" strokeWidth="0.45" />
      {layers.map((f,layer) => <g key={f.year}>
        {f.shapes.map((shape) => {
          const outline = mode === 2 && layer === 0;
          return <path key={shape.featureIndex} d={shape.d} fill={outline ? "none" : colour(shape)}
            fillOpacity={shape.focus === "other" ? 0.08 : 0.32} stroke={outline ? "var(--fg)" : colour(shape)}
            strokeOpacity={shape.focus === "other" ? 0.35 : 0.9} strokeWidth={outline ? 1.1 : 0.7}
            strokeDasharray={outline ? "4 3" : "2 1"}>
            <title>{f.year}: {shape.label} · approximate reconstruction</title>
          </path>;
        })}
      </g>)}
      {spec.points.map((p,i) => <g key={p.name}>
        <circle cx={p.xy[0]} cy={p.xy[1]} r="9" fill="var(--fg)" stroke="var(--bg)" strokeWidth="2" />
        <text x={p.xy[0]} y={p.xy[1]+3.7} textAnchor="middle" fill="var(--bg)" fontSize="11" fontWeight="700">{i === 0 ? "A" : "B"}</text>
      </g>)}
      {!active && <text x="180" y="181" textAnchor="middle" fill="var(--fg)" fontSize="11">Predict to open the record</text>}
      {active && mode === 2 && <text x="8" y="182" fill="var(--fg)" stroke="var(--bg-2)" strokeWidth="3" paintOrder="stroke" fontSize="11">Earlier outlines · Later fills</text>}
    </svg>
    <div className={s.caption}>Area anchors · Approximate reconstruction · Mercator</div>
    {children}
    <div className={s.trace} aria-label="Snapshots visited" aria-live="polite">
      {spec.frames.map((f,i) => <span key={f.year}><b>{f.year}</b> {seen[i] ? relationText[f.relation] : "—"}</span>)}
    </div>
    {frame && <div className={s.labels}>{identical
      ? <span className={s.both} title={frame.labels[0].join(" / ") || "No NAME label at either point"}><b>A = B</b> {labelText(frame.labels[0],frame.shortLabels[0])}</span>
      : frame.shortLabels.map((labels,i) => <span key={i} title={frame.labels[i].join(" / ") || "No NAME label at this point"}>
        <b>{i === 0 ? "A" : "B"}</b> {labelText(frame.labels[i],labels)}
      </span>)}</div>}
  </div>;
}
