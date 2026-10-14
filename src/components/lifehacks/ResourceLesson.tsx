"use client";

import { useState, type ReactNode } from "react";
import { evaluateResource, resourceAmount, resourceFormula, resourceNumber, resourcePair, type ResourceSpec } from "@/lib/lifehacks/resource-model";
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
  const max = Math.max(...values.map(Math.abs), 0.001);
  const proportion = (index: number) => seen[index] ? Math.max(0, Math.min(1, values[index] / max)) : 0;
  const cells = (index: number) => Math.round(proportion(index) * 12);
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
            const radius = i === 0 ? 3 : 6;
            const width = radius * 14;
            const height = x * 4;
            const center = left + 69;
            return <g key={i}>
              <path d={`M${center - width / 2} 15v${height}a${width / 2} 9 0 0 0 ${width} 0V15`} className={`${s.paper} ${selectedClass}`} />
              <ellipse cx={center} cy={15} rx={width / 2} ry={9} className={s.ink} />
              <path d={`M${center} 15h${width / 2}M${left + 119} 15v${height}`} className={s.path} />
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
        if (spec.family === "water") return (
          <g key={i}>
            <path d={`M${left + 45} 8h39l-5 17H50Z`} className={s.ghost} />
            <path d={`M${left + 22} 20v94q46 14 92 0V20`} className={`${s.ink} ${selectedClass}`} />
            <path d={`M${left + 25} ${116 - p * 88}h86v${p * 88}q-43 12-86 0Z`} className={s.solid} opacity="0.65" />
            {[0, 1, 2, 3].map((tick) => <path key={tick} d={`M${left + 115} ${108 - tick * 24}h8`} className={s.ink} />)}
          </g>
        );
        if (spec.family === "energy") {
          const samples = [0, 1, 2, 3, 4].map((tick) => {
            const amount = evaluateResource(i === 0 ? spec.formulaA : spec.formulaB, x * tick / 4);
            return { x: left + 20 + tick * 23, y: 102 - (seen[i] ? amount / max * 72 : 0) };
          });
          return (
          <g key={i}>
            <path d={`M${left + 20} 102V15M${left + 20} 102h111`} className={s.ink} />
            <path d={samples.map((point, tick) => `${tick === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ")} className={`${s.ink} ${selectedClass}`} />
            {samples.map((point, tick) => <circle key={tick} cx={point.x} cy={point.y} r={seen[i] ? 4 : 2} className={seen[i] ? s.solid : s.ghost} />)}
            <text x={left + 20} y={10} fill="var(--muted)" fontSize="9">{spec.unit}</text>
            <text x={left + 70} y={122} textAnchor="middle" fill="var(--muted)" fontSize="9">0→{resourceNumber(x)}{spec.variable.unit}</text>
          </g>
        );
        }
        if (spec.family === "inventory") return (
          <g key={i}>
            <path d={`M${left + 21} 25h91v80H${left + 21}Z`} className={`${s.paper} ${selectedClass}`} />
            <path d={`M${left + 30} 46h75M${left + 30} 71h75`} className={s.path} />
            {Array.from({ length: 12 }, (_, j) => <rect key={j} x={left + 30 + j % 4 * 20} y={27 + Math.floor(j / 4) * 26} width={13} height={16} rx={2} className={j < cells(i) ? s.solid : s.ghost} />)}
            <path d={`M${left + 118} 30q17 33 0 68m0-8v8h8`} className={s.ink} />
          </g>
        );
        if (spec.family === "reuse") return (
          <g key={i}>
            <path d={`M${left + 32} 30a40 40 0 1 1 0 65m0-10v10h10`} className={`${s.ink} ${selectedClass}`} />
            {Array.from({ length: 12 }, (_, j) => {
              const angle = j / 12 * Math.PI * 2;
              return <circle key={j} cx={left + 70 + Math.cos(angle) * 37} cy={63 + Math.sin(angle) * 37} r={5} className={j < cells(i) ? s.solid : s.ghost} />;
            })}
            <rect x={left + 58} y={48} width={24} height={30} rx={5} className={s.paper} />
          </g>
        );
        return (
          <g key={i}>
            <path d={`M${left + 17} 34v74q52 16 105 0V34`} className={`${s.ink} ${selectedClass}`} />
            {Array.from({ length: 12 }, (_, j) => <circle key={j} cx={left + 33 + j % 4 * 23} cy={49 + Math.floor(j / 4) * 23} r={7} className={j < cells(i) ? s.solid : s.ghost} />)}
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
      <p className={s.assumptions}>{spec.assumptions}</p>
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
