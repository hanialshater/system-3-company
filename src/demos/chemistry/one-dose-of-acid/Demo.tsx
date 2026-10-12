"use client";

// One chart, two liquids, the same doses of strong acid. Each tap adds 0.001 mol to
// 1 L of pure water and to 1 L of acetic acid / acetate buffer (0.10 mol/L of each).
// The water's pH line falls off a cliff on the first dose; the buffer's barely tilts.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const DOSE = 0.001; // mol of strong acid per tap, into 1 L
const MAX_DOSES = 10;
const PKA = 4.76;
const KW = 1e-14;
const BUF = 0.1; // mol/L of acetic acid and of acetate

const W = 320;
const H = 220;
const L = 30;
const R = 58;
const TOP = 24;
const BOT = 30;
const PW = W - L - R;
const PH = H - TOP - BOT;

function waterPH(n: number) {
  const h = (n + Math.sqrt(n * n + 4 * KW)) / 2;
  return -Math.log10(h);
}
const bufferPH = (n: number) => PKA + Math.log10((BUF - n) / (BUF + n));

const X = (doses: number) => L + (doses / MAX_DOSES) * PW;
const Y = (ph: number) => TOP + (1 - ph / 14) * PH;

function trace(doses: number, f: (n: number) => number) {
  const pts = Array.from({ length: doses + 1 }, (_, d) => `${X(d).toFixed(1)} ${Y(f(d * DOSE)).toFixed(1)}`);
  return `M ${pts.join(" L ")}`;
}

export default function OneDoseOfAcid({ slug }: { slug: string }) {
  const [doses, setDoses] = useState(0);
  const [most, setMost] = useState(0);

  const n = doses * DOSE;
  const pw = waterPH(n);
  const pb = bufferPH(n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Add 0.010 mol of strong acid to 1 L of pure water, and to 1 L of acetic acid / acetate buffer (0.10 mol/L of each). The pH falls by about…",
        options: ["Water 5 units, buffer 0.1", "Water 5 units, buffer 5", "Water 0.1, buffer 5"],
        answer: 0,
      }}
      exploreHint="Add the acid one dose at a time, all ten doses (0.010 mol)."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {most >= MAX_DOSES ? "After all ten doses" : `You added ${most} of 10 doses; after all ten`}, the water fell
            from pH 7 to <strong>2</strong>, five units, most of it on the very first dose. The buffer went from 4.76 to{" "}
            <strong>4.67</strong>, under 0.1.
          </p>
          <p>
            Pure water has nothing to catch the acid, so every hydrogen ion stays free. The buffer holds a stock of
            acetate, a base: each added hydrogen ion turns an acetate into acetic acid. The ratio of the two moves from
            1 : 1 to 0.09 : 0.11, and pH follows that ratio, not the dose.
          </p>
          <p className="muted">Blood is buffered too, so it stays near pH 7.4.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`After ${doses} doses: water pH ${pw.toFixed(2)}, buffer pH ${pb.toFixed(2)}`}>
            {[0, 2, 4, 6, 8, 10, 12, 14].map((p) => (
              <g key={p}>
                <line x1={L} x2={L + PW} y1={Y(p)} y2={Y(p)} className={s.grid} />
                <text x={L - 5} y={Y(p) + 3} textAnchor="end" className={s.axisLabel}>
                  {p}
                </text>
              </g>
            ))}
            {Array.from({ length: MAX_DOSES + 1 }, (_, d) => (
              <line key={d} x1={X(d)} x2={X(d)} y1={Y(0)} y2={Y(0) + 4} className={s.axis} />
            ))}
            <text x={L + PW / 2} y={H - 6} textAnchor="middle" className={s.axisLabel}>
              doses of acid
            </text>
            <text x={L - 5} y={TOP - 10} className={s.axisLabel} textAnchor="end">
              pH
            </text>

            <path d={trace(doses, waterPH)} className={s.water} />
            <path d={trace(doses, bufferPH)} className={s.buffer} />
            <circle cx={X(doses)} cy={Y(pw)} r={5} className={s.waterDot} />
            <circle cx={X(doses)} cy={Y(pb)} r={5} className={s.bufferDot} />
            <text x={X(doses) + 9} y={Y(pw) + 4} className={s.lineLabel}>
              water
            </text>
            <text x={X(doses) + 9} y={Y(pb) + 4} className={s.lineLabelB}>
              buffer
            </text>
          </svg>
          <Row>
            <Control
              disabled={locked || doses >= MAX_DOSES}
              onClick={() => {
                setDoses((d) => d + 1);
                setMost((m) => Math.max(m, doses + 1));
                interact();
              }}
            >
              Add 0.001 mol acid
            </Control>
            <Control
              disabled={locked || doses === 0}
              onClick={() => {
                setDoses(0);
                interact();
              }}
            >
              Start over
            </Control>
          </Row>
          <Row>
            <Readout label="Water pH" value={pw.toFixed(2)} />
            <Readout label="Buffer pH" value={pb.toFixed(2)} />
            <Readout label="Acid added" value={`${n.toFixed(3)} mol`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
