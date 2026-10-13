"use client";

// Ideal osmometer toy: a cell holds a fixed amount of dissolved stuff, 0.3 x volume 1 = 0.3 units.
// Only water crosses the membrane, so at balance 0.3 / V = bath concentration, i.e. V = 0.3 / bath.
// Concentrations are kept in hundredths (bath = pct / 100) to avoid float equality problems.
// Cell area is drawn proportional to volume (radius ~ sqrt(V)).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const C0 = 30; // cell concentration in hundredths (0.30), at volume 1
const Q_BATH = 60; // the question's bath, 0.60
const R1 = 32; // radius at volume 1
const vol = (pct: number) => C0 / pct; // volume at balance
const c2 = (pct: number) => (pct / 100).toFixed(2);
const v2 = (pct: number) => vol(pct).toFixed(2);
const PRESETS = [60, 15, 90, 30];

function Stage({ locked, bath, setBath }: { locked: boolean; bath: number; setBath: (b: number) => void }) {
  const V = vol(bath);
  const r = R1 * Math.sqrt(V);
  const msg = locked
    ? `Toy cell: only water crosses. It holds ${c2(C0)} stuff per volume, volume 1. Bath ${c2(C0)}.`
    : bath === C0
      ? `Bath ${c2(bath)}, same as the cell: volume stays 1.`
      : `Bath ${c2(bath)}. Water moves until inside is ${c2(bath)} too: volume ${v2(bath)}.`;
  const inside = locked ? C0 : bath; // concentration inside at balance (= bath)
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 320 140" className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <rect x={1} y={1} width={318} height={138} rx={8} className={s.bath} style={{ fillOpacity: (locked ? C0 : bath) / 110 }} />
        <circle cx={160} cy={70} r={R1} className={s.ghost} />
        <circle cx={160} cy={70} r={r} className={s.cell} style={{ fillOpacity: inside / 110 + 0.1 }} />
        <text x={160} y={74} textAnchor="middle" className={s.lab}>{locked ? "1.00" : v2(bath)}</text>
        <text x={10} y={16} className={s.axis}>bath {c2(locked ? C0 : bath)}</text>
        <text x={310} y={16} textAnchor="end" className={s.axis}>dashed: starting size</text>
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p} className={bath === p ? "active" : ""} disabled={locked || bath === p} onClick={() => setBath(p)}>
            Bath {c2(p)}
          </Control>
        ))}
      </Row>
      <Slider label="Bath stuff per volume" value={bath} min={10} max={90} step={5} disabled={locked} onChange={setBath} format={(v) => c2(v)} />
    </div>
  );
}

export default function CellShrinksInBrine({ slug }: { slug: string }) {
  const [bath, setBath] = useState(C0);
  const [set, setSet] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy cell: ${c2(C0)} dissolved stuff per volume, volume 1. It goes into a bath with ${c2(Q_BATH)}. Only water can cross. It ends up about:`,
        options: ["the same size", "half its volume", "a quarter of its volume"],
        answer: 1,
      }}
      exploreHint={`Set the bath to ${c2(Q_BATH)} and watch the cell.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You set the bath to {c2(Q_BATH)} and the cell settled at volume <strong>{v2(Q_BATH)}</strong>.
            {set.length > 1 ? ` Other baths you tried: ${set.filter((b) => b !== Q_BATH).map((b) => `${c2(b)} gave ${v2(b)}`).join("; ")}.` : ""}
          </p>
          <p>
            The stuff cannot leave, so the cell still holds {c2(C0)} × 1 = {c2(C0)} units. Water leaves until that amount, spread over the new volume, matches the bath: {c2(C0)} ÷ {v2(Q_BATH)} = {c2(Q_BATH)}. Water follows concentration. Real cells shrink less: this toy ignores walls and the cell&apos;s own bulk.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["stronger-bath"]}>
          {(reach) => (
            <Stage
              locked={locked}
              bath={bath}
              setBath={(b) => {
                setBath(b);
                setSet((x) => (x.includes(b) ? x : [...x, b]));
                if (b === Q_BATH) reach("stronger-bath");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
