"use client";

// Opposite flows swap more (brief: company/domains/briefs/life.ecology-body.md #4, check E4).
// S sections. Each tick, in every section blood and water move to the average of the two (k = 0.5 of the
// gap); then the blood leaving the last section is read, blood moves one section along (fresh blood at 0
// enters section 1), and water moves one section along its own direction (fresh water at 100 enters at its
// inlet). 2,000 ticks to steady state, computed instantly. Deterministic.
// The stage shows each section's levels as they arrive (before that tick's exchange): the blood level and the
// water level side by side, so the learner can see where water is still richer than the blood beside it.
// Same way gives 50 for any S; opposite gives 100·S/(S + 1): 50 (1), 80 (4), 90.9 (10).
// Milestones: "opp10" (opposite at 10 sections, the question's case) and "oppOther" (opposite at 1 or 4).
// At the reveal the question's case (opposite, 10 sections) is put back on the stage; the results row keeps
// every combination tried.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SECTIONS = [1, 4, 10] as const;
type Sections = (typeof SECTIONS)[number];
const MILESTONES = ["opp10", "oppOther"] as const;

export interface Exchange {
  out: number;
  blood: number[]; // arriving blood level in each section (left to right)
  water: number[]; // arriving water level in each section
}

export function exchanger(S: number, opposite: boolean, k = 0.5, ticks = 2000): Exchange {
  let b = new Array<number>(S).fill(0);
  let w = new Array<number>(S).fill(100);
  let out = 0;
  let arrB = b, arrW = w;
  for (let t = 0; t < ticks; t++) {
    arrB = [...b];
    arrW = [...w];
    for (let i = 0; i < S; i++) {
      const d = k * (w[i] - b[i]);
      b[i] += d;
      w[i] -= d;
    }
    out = b[S - 1];
    b = [0, ...b.slice(0, S - 1)];
    w = opposite ? [...w.slice(1), 100] : [100, ...w.slice(0, S - 1)];
  }
  return { out, blood: arrB, water: arrW };
}

const key = (opp: boolean, n: Sections) => `${opp ? "o" : "s"}${n}`;
const CASES: Record<string, Exchange> = {};
for (const n of SECTIONS) for (const opp of [false, true]) CASES[key(opp, n)] = exchanger(n, opp);
const r0 = (v: number) => Math.round(v);

// Geometry.
const W = 360, H = 132;
const PX0 = 46, PX1 = 312;
const WY = 26, BY = 78, PH = 34;

function Stage({
  locked,
  opp,
  n,
  tried,
  onDir,
  onSections,
}: {
  locked: boolean;
  opp: boolean;
  n: Sections;
  tried: string[];
  onDir: (opp: boolean) => void;
  onSections: (n: Sections) => void;
}) {
  const ex = CASES[key(opp, n)];
  const cw = (PX1 - PX0) / n;
  const arrow = (y: number, right: boolean) => {
    const x1 = right ? PX0 + 20 : PX1 - 20;
    const x2 = right ? PX1 - 20 : PX0 + 20;
    const hx = right ? x2 - 8 : x2 + 8;
    return (
      <g className={s.arrow}>
        <line x1={x1} y1={y} x2={x2} y2={y} />
        <path d={`M${hx},${y - 5}L${x2},${y}L${hx},${y + 5}`} />
      </g>
    );
  };
  const results = tried
    .filter((t) => CASES[t])
    .sort((a, b) => (a[0] === b[0] ? Number(a.slice(1)) - Number(b.slice(1)) : a[0] === "s" ? -1 : 1))
    .map((t) => `${t[0] === "o" ? "opposite" : "same"} ${t.slice(1)}: ${r0(CASES[t].out)}`)
    .join(" · ");

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Water with oxygen level 100 flows past blood starting at 0, through 10 sections. In each section the two level off halfway between them."
          : "In each section the two level off halfway. Numbers: level as each arrives."}
      </p>
      <p className={s.readout} data-testid="blood-out">
        {locked ? "blood leaves at ?" : `blood leaves at ${r0(ex.out)}`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={locked ? "Two pipes, water above and blood below, ten sections, no flow yet" : `${opp ? "Opposite" : "Same"} way, ${n} ${n === 1 ? "section" : "sections"}: blood leaves at ${r0(ex.out)}`}>
        <text x={2} y={WY + PH / 2 + 4} className={s.side}>water</text>
        <text x={2} y={BY + PH / 2 + 4} className={s.side}>blood</text>
        {Array.from({ length: locked ? 10 : n }, (_, i) => {
          const w = locked ? (PX1 - PX0) / 10 : cw;
          const x = PX0 + i * w;
          return (
            <g key={i}>
              <rect x={x} y={WY} width={w} height={PH} className={s.water} style={locked ? undefined : { fillOpacity: 0.12 + 0.6 * (ex.water[i] / 100) }} />
              <rect x={x} y={BY} width={w} height={PH} className={s.blood} style={locked ? undefined : { fillOpacity: 0.12 + 0.6 * (ex.blood[i] / 100) }} />
              {!locked && (
                <>
                  <text x={x + w / 2} y={WY + PH / 2 + 4} className={s.level}>{r0(ex.water[i])}</text>
                  <text x={x + w / 2} y={BY + PH / 2 + 4} className={s.level}>{r0(ex.blood[i])}</text>
                </>
              )}
            </g>
          );
        })}
        {!locked && (
          <>
            {arrow(WY - 10, !opp)}
            {arrow(BY + PH + 10, true)}
            <text x={opp ? PX1 + 4 : PX0 - 4} y={WY - 6} textAnchor={opp ? "start" : "end"} className={s.inlet}>100 in</text>
            <text x={PX0 - 4} y={BY + PH + 14} textAnchor="end" className={s.inlet}>0 in</text>
            <text x={PX1 + 4} y={BY + PH / 2 + 4} className={s.outText}>{r0(ex.out)}</text>
            <text x={PX1 + 4} y={BY + PH / 2 + 16} className={s.inlet}>out</text>
          </>
        )}
      </svg>
      {!locked && results && <p className={s.log} data-testid="results">Blood out: {results}</p>}
      <Row>
        <Control className={!opp ? "active" : ""} aria-pressed={!opp} disabled={locked || !opp} onClick={() => onDir(false)}>
          Same way
        </Control>
        <Control className={opp ? "active" : ""} aria-pressed={opp} disabled={locked || opp} onClick={() => onDir(true)}>
          Opposite way
        </Control>
      </Row>
      <Row>
        {SECTIONS.map((k) => (
          <Control key={k} className={n === k ? "active" : ""} aria-pressed={n === k} disabled={locked || n === k} onClick={() => onSections(k)}>
            {k} {k === 1 ? "section" : "sections"}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function OppositeFlowsSwapMore({ slug }: { slug: string }) {
  const [opp, setOpp] = useState(false);
  const [n, setN] = useState<Sections>(10);
  const [tried, setTried] = useState<string[]>([]);
  const opp10 = r0(CASES[key(true, 10)].out);
  const same = r0(CASES[key(false, 10)].out);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Flowing the same way, blood leaves at 50. Flowing opposite ways, blood leaves at about:",
        options: ["50", "70", "90"],
        answer: 2,
      }}
      exploreHint="Flip the water's direction, then try fewer sections."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Flowing the same way, blood and water met at {same} and stopped exchanging. Flowing opposite ways, the blood
            about to leave met the freshest water, so in every section the water was still richer than the blood beside it.
          </p>
          <p>
            The blood left at {opp10} of 100, with the same pipes and speeds. More sections push it closer to 100; the
            same-way pipe stays at {same} however long it is. Toy model.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const record = (o: boolean, k: Sections) => {
              setTried((t) => {
                const base = t.length ? t : [key(false, 10)];
                return base.includes(key(o, k)) ? base : [...base, key(o, k)];
              });
              if (o && k === 10) reach("opp10");
              if (o && k !== 10) reach("oppOther");
            };
            return (
              <RevealSync atReveal={phase === "reveal"} onOpen={() => { setOpp(true); setN(10); }}>
                <Stage
                  locked={locked}
                  opp={opp}
                  n={n}
                  tried={tried}
                  onDir={(o) => {
                    setOpp(o);
                    record(o, n);
                  }}
                  onSections={(k) => {
                    setN(k);
                    record(opp, k);
                  }}
                />
              </RevealSync>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

/** When the reveal opens, put the question's case (opposite, 10 sections) on the stage. */
function RevealSync({ atReveal, onOpen, children }: { atReveal: boolean; onOpen: () => void; children: ReactNode }) {
  const open = useRef(onOpen);
  open.current = onOpen;
  useEffect(() => {
    if (atReveal) open.current();
  }, [atReveal]);
  return <>{children}</>;
}
