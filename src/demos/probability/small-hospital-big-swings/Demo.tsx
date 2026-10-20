"use client";

// Sample size and noise (Kahneman & Tversky's hospital problem). One dot per day for a
// year: the share of babies born that day who were boys. The payoff: the small hospital's
// cloud is wide and spills over the 60% line far more often; the big hospital hugs 50%.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { DAYS, exactOver60, over60, year } from "./model";
import s from "./styles.module.css";

const W = 340;
const H = 200;
const L = 34;
const T = 8;
const B = 18;
const sy = (share: number) => T + (1 - share) * (H - T - B);
const sx = (d: number) => L + (d / (DAYS - 1)) * (W - L - 6);

export default function SmallHospital({ slug }: { slug: string }) {
  const [n, setN] = useState(15);
  const [sawB, setSawB] = useState(false);
  const boys = useMemo(() => year(n), [n]);
  const extreme = boys.filter((b) => over60(b, n)).length;
  const countA = useMemo(() => year(15).filter((b) => over60(b, 15)).length, []);
  const countB = useMemo(() => year(45).filter((b) => over60(b, 45)).length, []);

  const choose = (v: number, interact: () => void) => {
    setN(v);
    if (v === 45 || sawB) interact();
    if (v === 45) setSawB(true);
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Hospital A has 15 births a day, hospital B has 45. Half of all babies are boys. Over a year, which has more days when more than 60% of babies born are boys?",
        options: ["A (smaller)", "B (larger)", "About the same"],
        answer: 0,
      }}
      exploreHint="Compare hospital A with B, then slide the size and watch how wide the dots spread."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In this simulated year, hospital A had <strong>{countA}</strong> days over 60% boys and hospital B had{" "}
            <strong>{countB}</strong>. On average it is about 55 days against 25: a day at the small hospital is more
            than twice as likely to look lopsided.
          </p>
          <p>
            With 15 babies, 10 boys is a small fluke. With 45, getting 28 or more boys needs a much bigger one.
          </p>
          <p className="muted">
            When Tversky and Kahneman asked this, most people said &ldquo;about the same&rdquo;. Real births are about 51% boys; this uses
            50%.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`A year at a hospital with ${n} births a day`}>
            {[0, 0.5, 1].map((v) => (
              <g key={v}>
                <line x1={L} x2={W - 6} y1={sy(v)} y2={sy(v)} className={v === 0.5 ? s.mid : s.grid} />
                <text x={L - 4} y={sy(v) + 3.5} textAnchor="end" className={s.tick}>
                  {v * 100}%
                </text>
              </g>
            ))}
            <line x1={L} x2={W - 6} y1={sy(0.6)} y2={sy(0.6)} className={s.limit} />
            <text x={L - 4} y={sy(0.6) + 3.5} textAnchor="end" className={s.limitText}>
              60%
            </text>
            {boys.map((b, d) => (
              <circle key={d} cx={sx(d)} cy={sy(b / n)} r={1.9} className={over60(b, n) ? s.hot : s.day} />
            ))}
            <text x={W - 6} y={H - 4} textAnchor="end" className={s.tick}>
              each dot: one day&rsquo;s share of boys
            </text>
          </svg>
          <Row>
            <Control
              className={n === 15 ? "active" : ""}
              disabled={locked || n === 15}
              onClick={() => choose(15, interact)}
            >
              A: 15 a day
            </Control>
            <Control
              className={n === 45 ? "active" : ""}
              disabled={locked || n === 45}
              onClick={() => choose(45, interact)}
            >
              B: 45 a day
            </Control>
            <Readout label="Days over 60% boys" value={locked ? "?" : extreme} />
            <Readout label="A vs B" value={locked ? "?" : `${countA} vs ${sawB ? countB : "?"}`} />
          </Row>
          <Row>
            <Slider
              label="Births a day"
              value={n}
              min={5}
              max={100}
              step={5}
              disabled={locked}
              onChange={(v) => choose(v, interact)}
            />
          </Row>
          <p className={s.key}>{locked ? "" : `Expected: ${(365 * exactOver60(n)).toFixed(0)} days a year`}</p>
        </div>
      )}
    </Lesson>
  );
}
