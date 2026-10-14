"use client";

import { useState, type ReactNode } from "react";
import { evaluateResource, resourceAmount, resourceAxisEnd, resourceCylinderDimensions, resourceFormula, resourceGraphicScale, resourceNumber, resourcePair, type ResourceSpec } from "@/lib/lifehacks/resource-model";
import s from "./ResourceLesson.module.css";

export function useResourceState(spec: ResourceSpec) {
  const [x, setX] = useState(spec.variable.start);
  const [selected, setSelected] = useState<number | null>(null);
  const [seen, setSeen] = useState<[boolean, boolean]>([false, false]);
  function choose(index: 0 | 1, reach: (name: string) => void) {
    setSelected(index);
    setSeen((previous) => index === 0 ? [true, previous[1]] : [previous[0], true]);
    reach(index === 0 ? "tested-a" : "tested-b");
  }
  return { x, setX, selected, seen, choose };
}

/** Every picture responds to quantities; families use receipts, vessels, routes or timelines. */
function ResourcePicture({ spec, x, seen, selected }: { spec: ResourceSpec; x: number; seen: [boolean, boolean]; selected: number | null }) {
  const values = resourcePair(spec, x);
  const max = resourceGraphicScale(spec);
  const proportion = (index: number) => seen[index] ? Math.max(0, Math.min(1, values[index] / max)) : 0;
  const imageName = `${spec.title}. ${seen[0] ? `${spec.aLabel}: ${resourceAmount(values[0], spec.unit)}` : "A not tested"}; ${seen[1] ? `${spec.bLabel}: ${resourceAmount(values[1], spec.unit)}` : "B not tested"}. ${spec.variable.label}: ${x}${spec.variable.unit}.`;
  return (
    <svg viewBox="0 0 320 130" className={s.picture} role="img" aria-label={imageName}>
      {[0, 1].map((i) => {
        const left = 14 + i * 158;
        const selectedClass = selected === i ? s.active : "";
        const p = proportion(i);
        if (spec.family === "receipt") return (
          <g key={i}>
            <path d={`M${left + 24} 8h84v107l-7-5-7 5-7-5-7 5-7-5-7 5-7-5-7 5-7-5-7 5V8Z`} className={`${s.paper} ${selectedClass}`} />
            {[0, 1, 2, 3].map((line) => <line key={line} x1={left + 36} y1={26 + line * 17} x2={left + 43 + 52 * p} y2={26 + line * 17} className={line === 3 ? s.ink : s.path} />)}
            <circle cx={left + 65} cy={94} r={seen[i] ? 6 + p * 7 : 3} className={seen[i] ? s.solid : s.ghost} />
          </g>
        );
        if (spec.family === "geometry") {
          // Internal dimensions, radius and routes come from the same declared inputs as the arithmetic.
          if (spec.slug === "lh-double-container-radius") {
            const { rx, ry, height } = resourceCylinderDimensions(i, x);
            const center = left + 69;
            return <g key={i}>
              <path d={`M${center - rx} 20v${height}a${rx} ${ry} 0 0 0 ${rx * 2} 0V20`} className={`${s.paper} ${selectedClass}`} />
              <ellipse cx={center} cy={20} rx={rx} ry={ry} className={s.ink} />
              <path d={`M${center} 20h${rx}M${left + 119} 20v${height}`} className={s.path} />
            </g>;
          }
          if (spec.slug === "lh-area-scales-square") {
            const side = x * 8 * (i === 0 ? 1 : 2);
            return <g key={i}>
              <rect x={left + 69 - side / 2} y={65 - side / 2} width={side} height={side} className={`${seen[i] ? s.solid : s.ghost} ${selectedClass}`} opacity={seen[i] ? 0.6 : 1} />
              {i === 1 && <path d={`M${left + 69} ${65 - side / 2}v${side}M${left + 69 - side / 2} 65h${side}`} className={s.ink} />}
            </g>;
          }
          if (spec.slug === "lh-subtract-openings-area") {
            const width = x * 14;
            return <g key={i}>
              <rect x={left + 69 - width / 2} y={29} width={width} height={66} className={`${seen[i] ? s.solid : s.ghost} ${selectedClass}`} opacity={seen[i] ? 0.65 : 1} />
              {i === 0 && <rect x={left + 55} y={51} width={28} height={22} className={s.paper} />}
            </g>;
          }
          if (spec.slug === "lh-overlap-material-area") {
            const width = (x + (i === 0 ? 2 : 0)) * 1.5;
            const begin = left + 69 - width / 2;
            return <g key={i}>
              <rect x={begin} y={43} width={width} height={40} className={`${s.paper} ${selectedClass}`} />
              {i === 0 && <rect x={begin + x * 1.5} y={43} width={3} height={40} className={s.solid} />}
              <path d={`M${begin} 95h${width}`} className={s.path} />
            </g>;
          }
          if (spec.slug === "lh-around-versus-across") {
            const width = x * 10;
            const begin = left + 69 - width / 2;
            return <g key={i}>
              <rect x={begin} y={44} width={width} height={30} className={s.ghost} />
              {i === 0 ? <rect x={begin} y={44} width={width} height={30} className={`${s.ink} ${selectedClass}`} /> : <path d={`M${begin} 74l${width}-30`} className={`${s.ink} ${selectedClass}`} />}
            </g>;
          }
          const width = i === 0 ? 30 : x * 3;
          const height = i === 0 ? x * 3 : 30;
          const begin = left + 69 - width / 2;
          return <g key={i}>
            <path d={`M${begin} 25h${width}v${height}h${-width}Z`} className={`${s.paper} ${selectedClass}`} />
            <path d={`M${begin} 25l16-12h${width}v${height}l-16 12M${begin + width} 25l16-12`} className={s.ink} />
          </g>;
        }
        if (spec.family === "water" && spec.unit === "min") {
          const center = left + 68;
          const end = -Math.PI / 2 + p * Math.PI * 2;
          const px = center + Math.cos(end) * 29;
          const py = 47 + Math.sin(end) * 29;
          return <g key={i}>
            <circle cx={center} cy={47} r={29} className={`${s.paper} ${selectedClass}`} />
            {p >= 1 ? <circle cx={center} cy={47} r={29} className={s.solid} opacity="0.6" /> : p > 0 && <path d={`M${center} 47V18A29 29 0 ${p > 0.5 ? 1 : 0} 1 ${px} ${py}Z`} className={s.solid} opacity="0.6" />}
            <path d={`M${center} 47L${px} ${py}`} className={s.ink} />
            <path d={`M${left + 47} 91v24h42V91`} className={s.ink} />
            <rect x={left + 50} y={115 - x / spec.variable.max * 21} width={36} height={x / spec.variable.max * 21} className={s.solid} opacity="0.6" />
          </g>;
        }
        if (spec.family === "water") return (
          <g key={i}>
            <path d={`M${left + 45} 8h39l-5 17H${left + 36}Z`} className={s.ghost} />
            <path d={`M${left + 22} 20v94q46 14 92 0V20`} className={`${s.ink} ${selectedClass}`} />
            <path d={`M${left + 25} ${116 - p * 88}h86v${p * 88}q-43 12-86 0Z`} className={s.solid} opacity="0.65" />
            {[0, 1, 2, 3].map((tick) => <path key={tick} d={`M${left + 115} ${108 - tick * 24}h8`} className={s.ink} />)}
          </g>
        );
        if (spec.family === "energy") {
          const samples = [0, 1, 2, 3, 4].map((tick) => {
            const amount = evaluateResource(i === 0 ? spec.formulaA : spec.formulaB, x * tick / 4);
            return { x: left + 20 + tick * 23, y: 102 - (seen[i] ? amount / max * 87 : 0) };
          });
          return (
          <g key={i}>
            <path d={`M${left + 20} 102V15M${left + 20} 102h111`} className={s.ink} />
            <path d={samples.map((point, tick) => `${tick === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ")} className={`${s.ink} ${selectedClass}`} />
            {samples.map((point, tick) => <circle key={tick} cx={point.x} cy={point.y} r={seen[i] ? 4 : 2} className={seen[i] ? s.solid : s.ghost} />)}
            <text x={left + 20} y={10} fill="var(--muted)" fontSize="9">{resourceAmount(max, spec.unit)}</text>
            <text x={left + 70} y={122} textAnchor="middle" fill="var(--muted)" fontSize="9">{resourceAxisEnd(spec, i, x)}</text>
          </g>
        );
        }
        if (spec.family === "inventory") return (
          <g key={i}>
            <path d={`M${left + 21} 25h91v80H${left + 21}Z`} className={`${s.paper} ${selectedClass}`} />
            <path d={`M${left + 30} 46h75M${left + 30} 71h75`} className={s.path} />
            {[0, 1, 2].map((row) => <rect key={row} x={left + 30} y={27 + row * 26} width={75 * p} height={16} rx={2} className={s.solid} opacity="0.65" />)}
            <path d={`M${left + 118} 30q17 33 0 68m0-8v8h8`} className={s.ink} />
          </g>
        );
        if (spec.family === "reuse") return (
          <g key={i}>
            <path d={`M${left + 32} 30a40 40 0 1 1 0 65m0-10v10h10`} className={`${s.ink} ${selectedClass}`} />
            <circle cx={left + 70} cy={63} r={30} className={s.path} />
            <circle cx={left + 70} cy={63} r={30} fill="none" stroke="var(--domain)" strokeWidth="6" strokeDasharray={`${p * Math.PI * 60} ${Math.PI * 60}`} transform={`rotate(-90 ${left + 70} 63)`} />
            <rect x={left + 58} y={48} width={24} height={30} rx={5} className={s.paper} />
          </g>
        );
        return (
          <g key={i}>
            <path d={`M${left + 17} 34v74q52 16 105 0V34`} className={`${s.ink} ${selectedClass}`} />
            <path d={`M${left + 20} ${109 - p * 67}h99v${p * 67}q-50 13-99 0Z`} className={s.solid} opacity="0.65" />
            <path d={`M${left + 70} 8v18m-5-5 5 5 5-5`} className={s.ink} />
          </g>
        );
      })}
    </svg>
  );
}

export function ResourceStage({ spec, x, selected, seen, children }: { spec: ResourceSpec; x: number; selected: number | null; seen: [boolean, boolean]; children: ReactNode }) {
  const values = resourcePair(spec, x);
  return (
    <div className={s.wrap}>
      <ResourcePicture spec={spec} x={x} seen={seen} selected={selected} />
      <div className={s.results} aria-live="polite">
        {[0, 1].map((i) => <div key={i} className={s.result} data-active={selected === i}>
          <span className={s.label}>{i === 0 ? "A" : "B"}: {i === 0 ? spec.aLabel : spec.bLabel}</span>
          <output className={s.value}>{seen[i] ? resourceAmount(values[i], spec.unit) : "?"}</output>
          <span className={s.formula}>{seen[i] ? resourceFormula(i === 0 ? spec.formulaA : spec.formulaB, x) : "—"}</span>
        </div>)}
      </div>
      <p className={s.assumptions}>{spec.family === "geometry" ? spec.assumptions : spec.assumptions.replace("Scaled model;", `Full scale:${resourceAmount(resourceGraphicScale(spec), spec.unit)};`)}</p>
      {children}
    </div>
  );
}

export function ResourceReveal({ spec, x }: { spec: ResourceSpec; x: number }) {
  const initial = resourcePair(spec, spec.variable.start);
  const now = resourcePair(spec, x);
  return <>
    <p>At the prediction’s {resourceNumber(spec.variable.start)}{spec.variable.unit}, A gives <strong>{resourceAmount(initial[0], spec.unit)}</strong> and B gives <strong>{resourceAmount(initial[1], spec.unit)}</strong>. Your stage now uses {resourceNumber(x)}{spec.variable.unit}: A {resourceAmount(now[0], spec.unit)}, B {resourceAmount(now[1], spec.unit)}.</p>
    <p>{spec.principle}</p>
  </>;
}

export const resourceControlClass = s.controls;
export const resourceExploreHint = "Test both cases, then move the labelled slider. Compare the displayed expressions.";
