"use client";

// Parallel bulbs. An ideal 6 V battery feeds bulb 1 (6 ohm). Switches add bulb 2 and
// bulb 3 as parallel branches. Each branch has the full 6 V across it, so each draws
// I = V / R = 1.0 A and glows the same (P = V^2 / R = 6 W); the battery meter reads the
// sum (Kirchhoff's current law at the junction). Bulb resistance is held constant
// (real filaments rise in resistance when hot). One representation: the circuit diagram.
//
// Earned reveal: milestone "two-branches" when a second bulb is switched in.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const V = 6; // V
const R = 6; // ohm per bulb
const I_BRANCH = V / R; // 1.0 A
const amps = (a: number) => `${a.toFixed(1)} A`;

const W = 320;
const H = 176;
const TOP = 34;
const BOT = 150;
const BX = 34; // battery x
const XS = [138, 206, 274]; // branch x
const MID = 92;

export default function AddAParallelBulb({ slug }: { slug: string }) {
  const [on, setOn] = useState([true, false, false]);
  const [maxSeen, setMaxSeen] = useState(1);
  const n = on.filter(Boolean).length;
  const total = n * I_BRANCH;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 6 V battery lights one 6 Ω bulb: 1.0 A flows. You add an identical bulb in parallel. The battery now supplies…",
        options: ["0.5 A", "1.0 A", "2.0 A"],
        answer: 2,
      }}
      exploreHint="Switch in bulb 2 and watch the battery's meter."
      reveal={() => (
        <>
          <p>
            Switching in a second bulb took the battery&apos;s meter from 1.0 A to <strong>2.0 A</strong>
            {maxSeen === 3 ? ", and a third took it to 3.0 A" : ""}, while every bulb kept its own 1.0 A and glowed just as
            brightly.
          </p>
          <p>
            Each branch connects straight across the battery, so each gets the full 6 V and draws 6 V ÷ 6 Ω = 1.0 A. The
            currents meet at the junction and add. Parallel bulbs do not share one current; each takes its own, and the
            battery pays for all of them (the pair acts like 3 Ω).
          </p>
          <p className="muted">Ideal battery and fixed 6 Ω bulbs. Real bulbs heat up and their resistance rises.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["two-branches"]}>
          {(reach) => {
            const toggle = (k: number) => {
              const next = on.map((v, i) => (i === k ? !v : v));
              setOn(next);
              const c = next.filter(Boolean).length;
              if (c > maxSeen) setMaxSeen(c);
              if (c >= 2) reach("two-branches");
            };
            const lastOn = Math.max(...on.map((v, i) => (v ? i : 0)));
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${n} bulbs on, battery supplies ${amps(total)}`}>
                  {/* rails */}
                  <line x1={BX} y1={TOP} x2={XS[lastOn]} y2={TOP} className={s.wire} />
                  <line x1={BX} y1={BOT} x2={XS[lastOn]} y2={BOT} className={s.wire} />
                  {lastOn < 2 && (
                    <>
                      <line x1={XS[lastOn]} y1={TOP} x2={XS[2]} y2={TOP} className={s.wireOff} />
                      <line x1={XS[lastOn]} y1={BOT} x2={XS[2]} y2={BOT} className={s.wireOff} />
                    </>
                  )}
                  {/* battery */}
                  <line x1={BX} y1={TOP} x2={BX} y2={MID - 8} className={s.wire} />
                  <line x1={BX} y1={MID + 8} x2={BX} y2={BOT} className={s.wire} />
                  <line x1={BX - 14} y1={MID - 8} x2={BX + 14} y2={MID - 8} className={s.cellLong} />
                  <line x1={BX - 7} y1={MID + 8} x2={BX + 7} y2={MID + 8} className={s.cellShort} />
                  <text x={BX + 18} y={MID + 4} className={s.label}>
                    6 V
                  </text>
                  {/* battery meter */}
                  <circle cx={80} cy={TOP} r={16} className={s.meter} />
                  <text x={80} y={TOP + 3} textAnchor="middle" className={s.meterText}>
                    {locked ? "?" : amps(total)}
                  </text>

                  {XS.map((x, i) => {
                    const lit = on[i];
                    return (
                      <g key={i}>
                        <line x1={x} y1={TOP} x2={x} y2={MID - 12} className={lit ? s.wire : s.wireOff} />
                        <line x1={x} y1={MID + 12} x2={x} y2={i === 0 ? BOT : BOT - 22} className={lit ? s.wire : s.wireOff} />
                        {i > 0 && (
                          <>
                            <line x1={x} y1={BOT - 22} x2={lit ? x : x + 12} y2={BOT - 4} className={lit ? s.wire : s.wireOff} />
                            <line x1={x} y1={BOT - 4} x2={x} y2={BOT} className={lit ? s.wire : s.wireOff} />
                          </>
                        )}
                        {lit && !locked && <circle cx={x} cy={MID} r={22} className={s.glow} />}
                        <circle cx={x} cy={MID} r={12} className={lit && !locked ? s.bulbOn : s.bulb} />
                        <path d={`M ${x - 8} ${MID - 8} L ${x + 8} ${MID + 8} M ${x + 8} ${MID - 8} L ${x - 8} ${MID + 8}`} className={s.filament} />
                        <rect x={x - 22} y={TOP + 8} width={44} height={15} rx={7} className={s.tag} />
                        <text x={x} y={TOP + 19} textAnchor="middle" className={s.meterText}>
                          {locked ? "?" : amps(lit ? I_BRANCH : 0)}
                        </text>
                      </g>
                    );
                  })}
                  <text x={8} y={H - 6} className={s.chip}>
                    Ideal battery. Each bulb 6 Ω.
                  </text>
                </svg>

                <Row>
                  <Control className={on[1] ? "active" : ""} disabled={locked} onClick={() => toggle(1)}>
                    {on[1] ? "Bulb 2 on" : "Bulb 2 off"}
                  </Control>
                  <Control className={on[2] ? "active" : ""} disabled={locked} onClick={() => toggle(2)}>
                    {on[2] ? "Bulb 3 on" : "Bulb 3 off"}
                  </Control>
                  <Readout label="Battery" value={locked ? "?" : amps(total)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
