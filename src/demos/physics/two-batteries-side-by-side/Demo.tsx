"use client";

// Two 1.5 V cells in a holder, a voltmeter across them, a 5 ohm bulb and a run-time gauge.
// End to end (series) the cell voltages add: 3.0 V, 0.6 A, 1.8 W, 2,000 mAh / 600 mA = 3.3 h.
// Side by side (parallel) the pair keeps 1.5 V: 0.3 A, 0.45 W, and the two 2,000 mAh cells share the
// current, 4,000 mAh / 300 mA = 13.3 h. One cell: 1.5 V, 0.3 A, 0.45 W, 6.7 h.
// Brief: company/domains/briefs/physics.md round 4, #64. Numbers: artifacts/scratch/cm-physics-r4/check.mjs
// (block "67 two-batteries-side-by-side").
//
// One picture: the holder (empty at first), an arrow inside each cell (the cause: each cell lifts charge
// through 1.5 V; only the first is labelled), a voltmeter readout, a bulb whose glow follows the power,
// and a fuel gauge for run time (fill only, no text). Hours show only in the Seen row.
// Stage word budget (Ruling r3, closed list, at the limit of 25): controls 7, "lifts 1.5 V" 2,
// voltmeter "1.5 V" 1, Seen row 12, caption 3. No other stage word: no "Seen:" prefix, no labels on
// the bulb, meter or gauge. Any added word is a stop (brief #64).
// Earned reveal: milestones "parallel" (the question's case), "series", "one". The Seen row records
// each reading when its milestone fires and is never cleared.
// QA path (DOM order): Side by side, End to end, One.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Mode = "empty" | "parallel" | "series" | "one";
const CELL_V = 1.5;
const R_BULB = 5; // ohm
const CAP_MAH = 2000;
const MILESTONES = ["parallel", "series", "one"] as const;

function circuit(m: Mode) {
  if (m === "empty") return null;
  const V = m === "series" ? 2 * CELL_V : CELL_V;
  const I = V / R_BULB;
  const P = V * I;
  const cap = m === "parallel" ? 2 * CAP_MAH : CAP_MAH;
  const h = cap / (I * 1000);
  return { V, I, P, h };
}
const fmtV = (v: number) => v.toFixed(1);
const fmtH = (h: number) => h.toFixed(1);

const W = 320;
const H = 168;
const TOP = 26; // top wire
const BOT = 142; // bottom wire
const PACK_X = 78; // left edge of the holder
const PACK_W = 84;
const HT = 34; // holder top
const HB = 134; // holder bottom
const MX = 206; // voltmeter centre
const BX = 282; // bulb centre
const BY = 84;
const H_MAX = 13.3; // gauge full scale

function Cell({ x, y, h, label, signsOut }: { x: number; y: number; h: number; label: boolean; signsOut: boolean }) {
  // a cell drawn upright, + at the top, with its "lift" arrow inside (the cause). Short cells (end to end)
  // put their + and − signs outside, so the arrow keeps the cell's full height.
  const w = 26;
  const sx = signsOut ? x + w + 7 : x + w / 2;
  return (
    <g>
      <rect x={x + w / 2 - 5} y={y - 4} width={10} height={4} rx={1} className={s.nub} />
      <rect x={x} y={y} width={w} height={h} rx={4} className={s.cell} />
      <text x={sx} y={signsOut ? y + 10 : y + 12} textAnchor="middle" className={s.sign} aria-hidden="true">
        +
      </text>
      <text x={sx} y={signsOut ? y + h - 1 : y + h - 4} textAnchor="middle" className={s.sign} aria-hidden="true">
        −
      </text>
      <line
        x1={x + w / 2}
        y1={signsOut ? y + h - 5 : y + h - 14}
        x2={x + w / 2}
        y2={signsOut ? y + 9 : y + 18}
        className={s.lift}
        markerEnd="url(#tb-lift)"
      />
      {label && (
        <text x={x - 6} y={y + h / 2 + 4} textAnchor="end" className={s.lab}>
          lifts 1.5 V
        </text>
      )}
    </g>
  );
}

export default function TwoBatteriesSideBySide({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("empty");
  const [seen, setSeen] = useState<{ parallel?: { V: number; h: number }; series?: { V: number; h: number }; one?: { V: number; h: number } }>({});

  const rv = (k: "parallel" | "series" | "one", f: "V" | "h") => {
    const r = seen[k];
    if (!r) return "?";
    return f === "V" ? fmtV(r.V) : fmtH(r.h);
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two 1.5 V batteries are joined side by side: plus to plus, minus to minus. The voltage across the pair is...",
        options: ["0 V", "1.5 V", "3.0 V"],
        answer: 1,
      }}
      exploreHint="Put the batteries in each way and watch the meter, the bulb and the gauge."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Side by side, your voltmeter read <strong>{rv("parallel", "V")} V</strong>, the same as one battery. The bulb
            glowed as brightly as with one, but for {rv("parallel", "h")} hours instead of {rv("one", "h")}.
          </p>
          <p>
            End to end it read {rv("series", "V")} V: the bulb drew twice the current at twice the voltage, four times the
            power, and lasted only {rv("series", "h")} hours. Each battery lifts charge through 1.5 V. In a row the lifts
            add; side by side they share the work.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (m: Exclude<Mode, "empty">) => {
              setMode(m);
              const c = circuit(m)!;
              setSeen((x) => ({ ...x, [m]: x[m] ?? { V: c.V, h: c.h } }));
              reach(m);
            };
            const c = circuit(mode);
            const closed = c !== null;
            const glowR = c ? 20 * Math.sqrt(c.P / 0.45) : 0; // schematic: the glow's area grows with the power (4x end to end)
            const glowO = c ? 0.85 : 0;
            const fill = c ? Math.min(1, c.h / H_MAX) : 0;

            // cells for each arrangement
            const cellH = mode === "series" ? 42 : 62;
            const cells: { x: number; y: number }[] =
              mode === "one"
                ? [{ x: PACK_X + PACK_W / 2 - 13, y: 54 }]
                : mode === "parallel"
                  ? [
                      { x: PACK_X + 12, y: 54 },
                      { x: PACK_X + PACK_W - 38, y: 54 },
                    ]
                  : mode === "series"
                    ? [
                        { x: PACK_X + PACK_W / 2 - 13, y: 42 },
                        { x: PACK_X + PACK_W / 2 - 13, y: 90 },
                      ]
                    : [];

            const seenText = [
              `side by side: ${seen.parallel ? `${fmtV(seen.parallel.V)} V, ${fmtH(seen.parallel.h)} h` : "–"}`,
              `end to end: ${seen.series ? `${fmtV(seen.series.V)} V, ${fmtH(seen.series.h)} h` : "–"}`,
              `one: ${seen.one ? `${fmtH(seen.one.h)} h` : "–"}`,
            ].join(" · ");

            const alt = locked
              ? "An empty battery holder wired to a voltmeter and an unlit bulb, with an empty run-time gauge."
              : !c
                ? "The battery holder is empty. The bulb is off."
                : `${mode === "parallel" ? "Two cells side by side" : mode === "series" ? "Two cells end to end" : "One cell"}. The voltmeter reads ${fmtV(c.V)} volts. The bulb glows${mode === "series" ? " four times as bright" : ""}; the run-time gauge shows ${fmtH(c.h)} hours.`;

            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={alt}>
                  <defs>
                    <marker id="tb-lift" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headLift} />
                    </marker>
                    <radialGradient id="tb-glow">
                      <stop offset="0%" className={s.glowIn} />
                      <stop offset="100%" className={s.glowOut} />
                    </radialGradient>
                  </defs>

                  {/* wires: top and bottom rails from the holder to the bulb */}
                  <line x1={PACK_X + PACK_W / 2} y1={TOP} x2={BX} y2={TOP} className={closed ? s.wire : s.wireOff} />
                  <line x1={PACK_X + PACK_W / 2} y1={BOT} x2={BX} y2={BOT} className={closed ? s.wire : s.wireOff} />
                  <line x1={PACK_X + PACK_W / 2} y1={TOP} x2={PACK_X + PACK_W / 2} y2={HT} className={closed ? s.wire : s.wireOff} />
                  <line x1={PACK_X + PACK_W / 2} y1={BOT} x2={PACK_X + PACK_W / 2} y2={HB} className={closed ? s.wire : s.wireOff} />

                  {/* holder */}
                  <rect x={PACK_X} y={HT} width={PACK_W} height={HB - HT} rx={6} className={closed ? s.holder : s.holderEmpty} />

                  {/* cell leads */}
                  {mode === "parallel" &&
                    cells.map((p, i) => (
                      <g key={i}>
                        <line x1={p.x + 13} y1={44} x2={p.x + 13} y2={p.y - 4} className={s.wire} />
                        <line x1={p.x + 13} y1={p.y + cellH} x2={p.x + 13} y2={124} className={s.wire} />
                      </g>
                    ))}
                  {mode === "parallel" && (
                    <>
                      <line x1={cells[0].x + 13} y1={44} x2={cells[1].x + 13} y2={44} className={s.wire} />
                      <line x1={cells[0].x + 13} y1={124} x2={cells[1].x + 13} y2={124} className={s.wire} />
                      <line x1={PACK_X + PACK_W / 2} y1={HT} x2={PACK_X + PACK_W / 2} y2={44} className={s.wire} />
                      <line x1={PACK_X + PACK_W / 2} y1={124} x2={PACK_X + PACK_W / 2} y2={HB} className={s.wire} />
                    </>
                  )}
                  {mode === "one" && (
                    <>
                      <line x1={PACK_X + PACK_W / 2} y1={HT} x2={PACK_X + PACK_W / 2} y2={50} className={s.wire} />
                      <line x1={PACK_X + PACK_W / 2} y1={116} x2={PACK_X + PACK_W / 2} y2={HB} className={s.wire} />
                    </>
                  )}
                  {mode === "series" && (
                    <>
                      <line x1={PACK_X + PACK_W / 2} y1={HT} x2={PACK_X + PACK_W / 2} y2={38} className={s.wire} />
                      <line x1={PACK_X + PACK_W / 2} y1={84} x2={PACK_X + PACK_W / 2} y2={86} className={s.wire} />
                      <line x1={PACK_X + PACK_W / 2} y1={132} x2={PACK_X + PACK_W / 2} y2={HB} className={s.wire} />
                    </>
                  )}
                  {cells.map((p, i) => (
                    <Cell key={`${mode}-${i}`} x={p.x} y={p.y} h={cellH} label={i === 0} signsOut={mode === "series"} />
                  ))}

                  {/* voltmeter across the pair */}
                  <line x1={MX} y1={TOP} x2={MX} y2={BY - 16} className={closed ? s.wire : s.wireOff} />
                  <line x1={MX} y1={BY + 16} x2={MX} y2={BOT} className={closed ? s.wire : s.wireOff} />
                  <rect x={MX - 26} y={BY - 16} width={52} height={32} rx={6} className={s.meter} />
                  <text x={MX} y={BY + 5} textAnchor="middle" className={s.read}>
                    {c ? `${fmtV(c.V)} V` : "–"}
                  </text>

                  {/* bulb: glow follows the power */}
                  {c && <circle cx={BX} cy={BY - 6} r={glowR} fill="url(#tb-glow)" opacity={glowO} className={s.glow} />}
                  <line x1={BX} y1={TOP} x2={BX} y2={BY - 20} className={closed ? s.wire : s.wireOff} />
                  <line x1={BX} y1={BY + 12} x2={BX} y2={BOT} className={closed ? s.wire : s.wireOff} />
                  <circle cx={BX} cy={BY - 6} r={13} className={c ? s.bulbOn : s.bulb} />
                  <path d={`M${BX - 5},${BY} L${BX - 3},${BY - 9} L${BX},${BY - 5} L${BX + 3},${BY - 9} L${BX + 5},${BY}`} className={s.filament} />
                  <rect x={BX - 7} y={BY + 5} width={14} height={8} rx={1.5} className={s.base} />

                  {/* run-time gauge: fill only */}
                  <g aria-hidden="true">
                    <rect x={190} y={152} width={110} height={11} rx={3} className={s.gauge} />
                    <rect x={300} y={155} width={4} height={5} rx={1} className={s.gaugeNub} />
                    <rect x={191.5} y={153.5} width={Math.max(0, 107 * fill)} height={8} rx={2} className={s.gaugeFill} />
                  </g>
                </svg>

                <p className={s.caption}>Ideal cells, 2,000 mAh.</p>
                <p className={s.seen}>{seenText}</p>

                <Row>
                  <Control className={mode === "parallel" ? "active" : ""} disabled={locked || mode === "parallel"} onClick={() => pick("parallel")}>
                    Side by side
                  </Control>
                  <Control className={mode === "series" ? "active" : ""} disabled={locked || mode === "series"} onClick={() => pick("series")}>
                    End to end
                  </Control>
                  <Control className={mode === "one" ? "active" : ""} disabled={locked || mode === "one"} onClick={() => pick("one")}>
                    One
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
