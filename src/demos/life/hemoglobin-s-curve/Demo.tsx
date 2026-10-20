"use client";

// Oxygen binding toy model: Hill curve S = 1 / (1 + (P50 / P)^n) with P50 = 26.8 mmHg.
// Real haemoglobin n = 2.7 (cooperative); a one-site carrier has n = 1 (same half-point).
// The learner moves local oxygen pressure P. Key states: P = 40 (resting tissue) and P = 20 (working
// tissue), so they have seen both ends of the drop. Saturations come from sat() for the curve,
// the readouts, the question and the reveal. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const P50 = 26.8, N_REAL = 2.7, N_ONE = 1;
const REST = 40, WORK = 20, LUNG = 100, PMIN = 10;
const MILESTONES = ["rest-40", "work-20"] as const;

const sat = (p: number, n: number) => 100 / (1 + Math.pow(P50 / p, n));
const drop = (n: number) => sat(REST, n) - sat(WORK, n);
const f1 = (x: number) => x.toFixed(1);
const REAL_DROP = drop(N_REAL), ONE_DROP = drop(N_ONE);
const RATIO = REAL_DROP / ONE_DROP;

const X0 = 38, X1 = 330, Y0 = 130, Y1 = 10; // plot box
const px = (p: number) => X0 + (p / 100) * (X1 - X0);
const py = (v: number) => Y0 - (v / 100) * (Y0 - Y1);
const path = (n: number) =>
  Array.from({ length: 100 }, (_, i) => {
    const p = 1 + i;
    return `${i === 0 ? "M" : "L"}${px(p).toFixed(1)},${py(sat(p, n)).toFixed(1)}`;
  }).join(" ");
const PATH_REAL = path(N_REAL), PATH_ONE = path(N_ONE);

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [p, setP] = useState(LUNG);
  const go = (v: number) => {
    setP(v);
    if (v === REST) reach("rest-40");
    if (v === WORK) reach("work-20");
  };
  const real = sat(p, N_REAL), one = sat(p, N_ONE);
  const fell = p < REST;
  const msg = locked
    ? "Toy: Hill curve, adult haemoglobin, pH and CO2 held fixed."
    : `Oxygen pressure ${p} mmHg. The carrier holds ${f1(real)}% of its oxygen.`;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 168" className={`stage-svg ${s.svg}`} role="img" aria-label={`Saturation at ${p} mmHg: four-site carrier ${f1(real)} percent, one-site carrier ${f1(one)} percent`}>
        <line className={s.axis} x1={X0} x2={X1} y1={Y0} y2={Y0} />
        <line className={s.axis} x1={X0} x2={X0} y1={Y1} y2={Y0} />
        {[0, 50, 100].map((v) => (
          <text key={v} className={s.tickR} x={X0 - 4} y={py(v) + 3}>{v}%</text>
        ))}
        {[0, 20, 40, 60, 80, 100].map((t) => (
          <text key={t} className={s.tick} x={px(t)} y={Y0 + 11}>{t}</text>
        ))}
        <line className={s.guide} x1={px(REST)} x2={px(REST)} y1={Y1} y2={Y0} />
        <line className={s.guide} x1={px(WORK)} x2={px(WORK)} y1={Y1} y2={Y0} />
        <text className={s.tick} x={px(REST)} y={Y1 + 8}>rest</text>
        <text className={s.tick} x={px(WORK)} y={Y1 + 8}>work</text>
        <path className={s.one} d={PATH_ONE} />
        <path className={s.real} d={PATH_REAL} />
        <line className={s.cursor} x1={px(p)} x2={px(p)} y1={Y1} y2={Y0} />
        <circle className={s.dotOne} cx={px(p)} cy={py(one)} r={4} />
        <circle className={s.dotReal} cx={px(p)} cy={py(real)} r={4.5} />
        <text className={s.tick} x={(X0 + X1) / 2} y={Y0 + 24}>oxygen pressure (mmHg)</text>
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lReal} />4 sites, cooperative</span>
        <span><i className={s.lOne} />One site</span>
      </div>
      <Row>
        <Control className={p === REST ? "active" : ""} disabled={locked || p === REST} onClick={() => go(REST)}>Resting tissue: {REST}</Control>
        <Control className={p === WORK ? "active" : ""} disabled={locked || p === WORK} onClick={() => go(WORK)}>Working muscle: {WORK}</Control>
        <Control className={p === LUNG ? "active" : ""} disabled={locked || p === LUNG} onClick={() => go(LUNG)}>Lungs: {LUNG}</Control>
      </Row>
      <Slider label="Oxygen pressure" value={p} min={PMIN} max={100} step={5} disabled={locked} onChange={go} format={(v) => `${v} mmHg`} />
      <Row>
        <Readout label="4-site full" value={locked ? "?" : `${f1(real)}%`} />
        <Readout label="One-site full" value={locked ? "?" : `${f1(one)}%`} />
        {!locked && fell && (
          <Readout label={`Lost since ${REST}`} value={`${f1(sat(REST, N_REAL) - real)} vs ${f1(sat(REST, N_ONE) - one)} pts`} />
        )}
      </Row>
    </div>
  );
}

export default function HemoglobinSCurve({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A carrier with one oxygen site and half-point ${P50} mmHg loses about ${Math.round(ONE_DROP)} points of saturation when local oxygen falls from ${REST} to ${WORK} mmHg. The four-site carrier loses about:`,
        options: ["The same", `${f1(RATIO).replace(/\.0$/, "")} times as much`, "10 times as much"],
        answer: 1,
      }}
      exploreHint={`Move oxygen to ${REST}, then ${WORK} mmHg, and compare the two curves.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From {REST} to {WORK} mmHg you saw the four-site carrier fall from {f1(sat(REST, N_REAL))}% to {f1(sat(WORK, N_REAL))}%: {f1(REAL_DROP)} points. The one-site
            carrier fell {f1(ONE_DROP)}. That is <strong>{f1(RATIO)} times</strong> as much.
          </p>
          <p>
            Each site that lets go makes the others let go more easily. The steep middle of the S sits where tissue oxygen is scarce, so the
            carrier gives up most oxygen exactly there.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
