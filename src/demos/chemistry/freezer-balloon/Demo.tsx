"use client";

// A balloon on a volume-versus-Celsius chart. The learner drags the temperature; the
// balloon rides a straight line and leaves a trace. Once they have traced 20 °C of it,
// the line's dashed continuation appears and lands on zero volume at about −273 °C:
// the reason volume follows kelvins, not Celsius degrees.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const ABS0 = -273.15;
const T_START = 27; // °C, 300 K
const V_START = 1.0; // L
const vol = (c: number) => (V_START * (c - ABS0)) / (T_START - ABS0);

const W = 320;
const H = 210;
const L = 30;
const R = 12;
const TOP = 14;
const BASE = 176;
const C0 = -300;
const C1 = 50;
const VMAX = 1.25;
const X = (c: number) => L + ((c - C0) / (C1 - C0)) * (W - L - R);
const Y = (v: number) => BASE - (v / VMAX) * (BASE - TOP);
const fmtC = (c: number) => `${c < 0 ? "−" : ""}${Math.abs(c)} °C`;

export default function FreezerBalloon({ slug }: { slug: string }) {
  const [c, setC] = useState(T_START);
  const [lo, setLo] = useState(T_START);
  const [hi, setHi] = useState(T_START);

  const v = vol(c);
  const showLine = hi - lo >= 20;
  const r = 14 * Math.cbrt(v);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1.00 L balloon at 27 °C goes into a freezer at −18 °C, at the same pressure. Add about 273 to a Celsius temperature to get kelvin (K): 27 °C is 300 K and −18 °C is 255 K. The balloon's volume becomes about…",
        options: ["0.85 L", "0.50 L", "1.00 L"],
        answer: 0,
      }}
      exploreHint="Slide the temperature down to −18 °C or colder, then look where the line is heading."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At −18 °C you saw <strong>0.85 L</strong>: it shrank by
            15%, not by half. Volume goes with the kelvin temperature: 255 K ÷ 300 K = 0.85.
          </p>
          <p>
            The line you traced points down to zero volume at about{" "}
            <strong>−273 °C</strong>. That is 0 K, where the kelvin scale starts. Celsius has its zero at freezing water,
            so 27 °C to −18 °C is not a fall to nothing: it is 300 K to 255 K.
          </p>
          <p className="muted">A real gas such as the air in the balloon turns liquid long before it gets that cold.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const moveTo = (t: number) => {
          setC(t);
          setLo((x) => Math.min(x, t));
          setHi((x) => Math.max(x, t));
          if (t <= -18 && lo > -18) interact(); // the reveal needs the −18 °C reading the question names
        };
        return (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`At ${fmtC(c)} the balloon is ${v.toFixed(2)} litres`}>
            {[0, 0.5, 1].map((g) => (
              <g key={g}>
                <line x1={L} x2={W - R} y1={Y(g)} y2={Y(g)} className={s.grid} />
                <text x={L - 4} y={Y(g) + 3} textAnchor="end" className={s.axisLabel}>
                  {g === 0 ? "0" : `${g} L`}
                </text>
              </g>
            ))}
            {[-273, -200, -100, 0].map((t) => (
              <text key={t} x={X(t)} y={BASE + 13} textAnchor="middle" className={s.axisLabel}>
                {fmtC(t)}
              </text>
            ))}
            <line x1={X(0)} x2={X(0)} y1={TOP} y2={BASE} className={s.zeroC} />
            {showLine && (
              <>
                <line x1={X(ABS0)} y1={Y(0)} x2={X(lo)} y2={Y(vol(lo))} className={s.extra} />
                <circle cx={X(ABS0)} cy={Y(0)} r={4} className={s.zeroDot} />
                <text x={X(ABS0) + 6} y={Y(0) - 8} className={s.note}>
                  zero volume
                </text>
              </>
            )}
            {hi > lo && <line x1={X(lo)} y1={Y(vol(lo))} x2={X(hi)} y2={Y(vol(hi))} className={s.trace} />}
            {/* the balloon */}
            <g className={s.balloon} style={{ transform: `translate(${X(c)}px, ${Y(v)}px)` }}>
              <line x1={0} y1={r} x2={0} y2={r + 10} className={s.string} />
              <circle r={r} cy={0} className={s.skin} />
            </g>
            <text x={W / 2} y={H - 4} textAnchor="middle" className={s.axisLabel}>
              temperature
            </text>
          </svg>
          <Slider
            label="Temperature"
            value={c}
            min={-40}
            max={40}
            disabled={locked}
            format={fmtC}
            onChange={moveTo}
          />
          <Row>
            <Control disabled={locked || c === -18} onClick={() => moveTo(-18)}>
              Put it in the freezer (−18 °C)
            </Control>
            <Control disabled={locked || c === T_START} onClick={() => moveTo(T_START)}>
              Back to the room (27 °C)
            </Control>
          </Row>
          <Row>
            <Readout label="Volume" value={`${v.toFixed(2)} L`} />
            <Readout label="In kelvin" value={`${Math.round(c - ABS0)} K`} />
          </Row>
        </div>
        );
      }}
    </Lesson>
  );
}
