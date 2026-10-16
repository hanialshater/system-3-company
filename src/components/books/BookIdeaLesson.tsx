"use client";

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import {
  calculateModel, canResetObservation, fillSeen, formatBookValue, formatCompoundOperation, initialObservation, observeScenario,
  resetObservation, validateBookIdeaSpec, type BookIdeaSpec, type CaseIndex,
  type ModelResult, type Observation, type ValidatedBookIdeaSpec,
} from "@/lib/books/model";
import s from "./books.module.css";

export type { BookIdeaSpec } from "@/lib/books/model";

/** Each consumer imports only its own original idea payload, never the Books corpus. */
export default function BookIdeaLesson({ slug, idea }: { slug: string; idea: BookIdeaSpec }) {
  const spec = validateBookIdeaSpec(idea);
  const [observation, setObservation] = useState<Observation>(initialObservation);
  return (
    <Lesson slug={slug} predict={spec.predict} exploreHint={spec.exploreHint} minInteractions={2}
      reveal={() => <>
        <p><em>{spec.book.title}</em> · {spec.book.author} ({spec.book.year})</p>
        <p>{fillSeen(spec.bookIdea, observation.seen)}</p>
        <p>{fillSeen(spec.modelBoundary, observation.seen)}</p>
        <p>{fillSeen(spec.doesItHoldUp, observation.seen)}</p>
      </>}
    >
      {(context) => <BookStage spec={spec} observation={observation} setObservation={setObservation} {...context} />}
    </Lesson>
  );
}
export { BookIdeaLesson };

function BookStage({ spec, observation, setObservation, locked, interact }: StageContext & {
  spec: ValidatedBookIdeaSpec; observation: Observation;
  setObservation: (value: Observation) => void;
}) {
  const { reach } = useMilestones(interact, ["scenario-a", "scenario-b"]);
  const active = locked ? null : observation.active;
  const values = active === null ? null : spec.scenarios[active].values;
  const result = values === null ? null : calculateModel(spec.family, values);
  const apply = (which: CaseIndex) => {
    if (locked || observation.active === which) return;
    const output = calculateModel(spec.family, spec.scenarios[which].values).output;
    setObservation(observeScenario(observation, which, output));
    reach(which === 0 ? "scenario-a" : "scenario-b");
  };
  return <div className={s.wrap}>
    <p className={s.model}>Toy model</p>
    <Row>
      {spec.scenarios.map((scenario, i) => <Control key={scenario.label}
        className={active === i ? "active" : ""} aria-pressed={active === i}
        aria-label={`Case ${i === 0 ? "A" : "B"}: ${scenario.label}`}
        disabled={locked || active === i} onClick={() => apply(i as CaseIndex)}>{i === 0 ? "A" : "B"}: {scenario.label}</Control>)}
      <Control disabled={locked || !canResetObservation(observation)} onClick={() => setObservation(resetObservation(observation))}>Reset</Control>
    </Row>
    <svg viewBox="0 0 320 152" className={`stage-svg ${s.picture}`} role="img"
      aria-label={active === null ? `${spec.family} toy, results hidden` : `${spec.scenarios[active].label}: ${formatBookValue(result!.output)} ${spec.unit}`}>
      <CausalPicture spec={spec} values={values} result={result} />
      <text x="160" y="147" textAnchor="middle" className={s.answer}>{result === null ? "?" : spec.family === "payoff"
        ? `${formatBookValue(result.trace[0])} + (${formatBookValue(result.trace[1])}) = ${formatBookValue(result.output)} ${spec.unit}`
        : `→ ${formatBookValue(result.output)} ${spec.unit}`}</text>
    </svg>
    <div className={s.seen} aria-live="polite" aria-atomic="true">
      <span className={s.seenLabel}>Seen</span>
      {spec.scenarios.map((scenario, i) => <span key={scenario.label}>
        {i === 0 ? "A" : "B"}: <strong>{locked || observation.seen[i] === null ? "?" : formatBookValue(observation.seen[i]!)}{spec.unit ? ` ${spec.unit}` : ""}</strong>
      </span>)}
    </div>
  </div>;
}

function CausalPicture({ spec, values, result }: {
  spec: ValidatedBookIdeaSpec; values: number[] | null; result: ModelResult | null;
}) {
  const fmt = formatBookValue;
  const v = values;
  const label = (i: number) => spec.labels[i] ?? "";
  switch (spec.family) {
    case "flow": {
      const n = spec.scenarios[0].values.length;
      const step = 296 / n;
      return <>
        <path d="M 4 76 H 316" className={s.connector} />
        {Array.from({ length: n }, (_, i) => {
          const x = 18 + i * step;
          const width = Math.min(54, step - 22);
          const slow = v && v[i] === result!.output;
          return <g key={i}>
            <text x={x + width / 2} y="28" textAnchor="middle">{label(i)}</text>
            <rect x={x} y="47" width={width} height="56" rx="8" className={slow ? s.constraint : s.box} />
            <text x={x + width / 2} y="80" textAnchor="middle" className={s.number}>{v ? fmt(v[i]) : "?"}</text>
            {slow && <path d={`M ${x + 6} 111 h ${width - 12}`} className={s.highlight} />}
          </g>;
        })}
      </>;
    }
    case "payoff": {
      const p = v ? v[0] : null;
      return <>
        <path d="M 42 69 L 130 32 M 42 69 L 130 103" className={s.connector} />
        <circle cx="42" cy="69" r="17" className={s.box} />
        <text x="42" y="74" textAnchor="middle">?</text>
        {[0, 1].map((i) => <g key={i}>
          <text x="85" y={i ? 113 : 26} textAnchor="middle">{p === null ? "?" : `${fmt(i ? 100 - p : p)}%`}</text>
          <rect x="132" y={i ? 79 : 8} width="176" height="47" rx="8" className={s.box} />
          <text x="144" y={i ? 98 : 27}>{label(i)}</text>
          <text x="297" y={i ? 98 : 27} textAnchor="end" className={s.number}>{v ? fmt(v[i + 1]) : "?"}</text>
          <text x="220" y={i ? 117 : 46} textAnchor="middle">{v ? `${fmt((i ? 100 - v[0] : v[0]) / 100)} × ${fmt(v[i + 1])} = ${fmt(result!.trace[i])}` : "? × ? = ?"}</text>
        </g>)}
      </>;
    }
    case "compound": {
      const all = spec.scenarios.flatMap((scenario) => calculateModel("compound", scenario.values).trace);
      const max = Math.max(1, ...all);
      const trace = result?.trace ?? [0, 0, 0, 0];
      const x = (i: number) => 25 + i * 272 / Math.max(1, trace.length - 1);
      const y = (n: number) => 118 - n / max * 77;
      const path = trace.map((n, i) => i ? `H ${x(i)} V ${y(n)}` : `M ${x(i)} ${y(n)}`).join(" ");
      return <>
        <text x="160" y="21" textAnchor="middle">{v ? formatCompoundOperation(v[1], v[3]) : "× ? + ?"}</text>
        <path d="M 25 37 V 118 H 302" className={s.axis} />
        {v ? <>
          <path d={path} className={s.highlight} />
          {trace.map((n, i) => <circle key={i} cx={x(i)} cy={y(n)} r="3" className={s.solid} />)}
          <text x="29" y={Math.max(36, y(trace[0]) - 7)}>{fmt(trace[0])}</text>
          <text x="298" y={Math.max(36, y(trace.at(-1)!) - 7)} textAnchor="end">{fmt(trace.at(-1)!)}</text>
        </> : <text x="160" y="82" textAnchor="middle">?</text>}
        <text x="160" y="132" textAnchor="middle">{label(0)} {v ? v[2] : "?"}</text>
      </>;
    }
    case "selection": {
      const maxCount = Math.max(1, ...spec.scenarios.map((scenario) => scenario.values[0] + scenario.values[2]));
      return <>
        {[0, 1].map((i) => {
          const count = v ? v[i * 2] : 0;
          const rate = v ? v[i * 2 + 1] : 0;
          const width = 208 * count / maxCount;
          const y = 34 + i * 52;
          return <g key={i}>
            <text x="8" y={y - 10}>{label(i)}</text>
            <rect x="8" y={y} width={v ? Math.max(1, width) : 208} height="22" className={s.box} />
            {v && <rect x="8" y={y} width={width * rate / 100} height="22" className={s.solid} />}
            <text x="308" y={y + 15} textAnchor="end">{v ? `${fmt(result!.trace[i])}/${fmt(count)}` : "?/?"}</text>
          </g>;
        })}
        <text x="160" y="126" textAnchor="middle">{v ? `${fmt(result!.trace[0] + result!.trace[1])}/${fmt(v[0] + v[2])}` : "?/?"}</text>
      </>;
    }
    case "network": {
      // At most 12 decorative nodes. A count label explicitly names any aggregate.
      const shown = v ? Math.min(12, result!.output) : 1;
      const branch = v ? v[1] : 2;
      const nodes: { x: number; y: number; parent: number }[] = [];
      if (branch === 1) {
        // Fold a unary path rather than silently dropping later generations.
        for (let i = 0; i < shown; i++) {
          const row = Math.floor(i / 4);
          const col = row % 2 ? 3 - i % 4 : i % 4;
          nodes.push({ x: 40 + col * 80, y: 27 + row * 31, parent: i - 1 });
        }
      } else {
        let start = 0;
        let previousStart = 0;
        let count = 1;
        let depth = 0;
        while (nodes.length < shown) {
          const available = Math.min(count, shown - nodes.length);
          for (let i = 0; i < available; i++) nodes.push({ x: 20 + (i + .5) * 280 / available, y: 27 + depth * 23, parent: depth === 0 ? -1 : previousStart + Math.floor(i / branch) });
          previousStart = start;
          start += available;
          count *= branch;
          depth++;
        }
      }
      return <>
        {nodes.map((node, i) => node.parent >= 0 && nodes[node.parent] ? <path key={`edge-${i}`} d={`M ${nodes[node.parent].x} ${nodes[node.parent].y} L ${node.x} ${node.y}`} className={v ? s.highlight : s.connector} /> : null)}
        {nodes.map((node, i) => i === 0
          ? <g key={i}><rect x={node.x - 8} y={node.y - 8} width="16" height="16" className={v ? s.node : s.box} /><text x={node.x} y={node.y - 13} textAnchor="middle">Origin</text></g>
          : <circle key={i} cx={node.x} cy={node.y} r="8" className={v ? s.node : s.box} />)}
        <text x="160" y="115" textAnchor="middle">{v ? `× ${v[1]} · ${v[2]} ${label(0)}` : "× ?"}</text>
        <text x="160" y="132" textAnchor="middle">{v ? `${nodes.length} pictured / ${fmt(result!.output)} reached` : "?"}</text>
      </>;
    }
    case "feedback": {
      const max = Math.max(1, ...spec.scenarios.flatMap((scenario) => calculateModel("feedback", scenario.values).trace));
      const stock = result?.output ?? 0;
      const height = Math.min(78, stock / max * 78);
      return <>
        <path d="M 9 64 H 99 l -8 -5 m 8 5 l -8 5 M 221 64 H 310 l -8 -5 m 8 5 l -8 5" className={s.connector} />
        <text x="52" y="35" textAnchor="middle">{label(0)}</text>
        <text x="268" y="35" textAnchor="middle">{label(1)}</text>
        <text x="52" y="54" textAnchor="middle">+{v ? fmt(v[1]) : "?"}</text>
        <text x="268" y="54" textAnchor="middle">−{v ? fmt(v[2]) : "?"}</text>
        <path d="M 112 18 V 106 H 208 V 18" className={s.tank} />
        {v && <rect x="116" y={103 - height} width="88" height={height} className={s.water} />}
        <text x="160" y="67" textAnchor="middle" className={s.number}>{v ? `${fmt(v[0])} → ${fmt(stock)}` : "?"}</text>
        <text x="160" y="128" textAnchor="middle">{v ? v[3] : "?"} {label(2)}</text>
      </>;
    }
    case "intervals": {
      const budget = v ? v[0] : 1;
      const chunks = result?.trace.length ?? 3;
      const scale = 296 / Math.max(1, budget);
      return <>
        <rect x="16" y="18" width="12" height="12" className={s.work} />
        <text x="34" y="29">{label(0)}</text>
        <rect x="172" y="18" width="12" height="12" className={s.overhead} />
        <text x="190" y="29">{label(1)}</text>
        <rect x="12" y="55" width="296" height="33" className={s.box} />
        {v && Array.from({ length: chunks }, (_, i) => {
          const x = 12 + i * (v[1] + v[2]) * scale;
          return <g key={i}>
            <rect x={x} y="55" width={v[2] * scale} height="33" className={s.overhead} />
            <rect x={x + v[2] * scale} y="55" width={v[1] * scale} height="33" className={s.work} />
          </g>;
        })}
        <text x="12" y="107">0</text>
        <text x="308" y="107" textAnchor="end">{v ? fmt(budget) : "?"}</text>
        <text x="160" y="126" textAnchor="middle">{v ? `${chunks} × (${fmt(v[2])} + ${fmt(v[1])})` : "? × (? + ?)"}</text>
      </>;
    }
  }
}
