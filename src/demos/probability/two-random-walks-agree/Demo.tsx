"use client";

// Spurious correlation between random walks. The top panel draws one pair of independent 100-step walks and its
// correlation r; the strip below plots r for every pair seen. The learner draws 1, then 10 more, then 30 more pairs,
// and can jump to the strongest pair seen. Key state: at least 41 pairs seen. All from model.ts (seeded).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { STEPS, STRONG, bestIndex, fmtR, pairs, strongCount } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["first", "many"] as const;
const MANY = 41;
const W = 320;
const TOP_H = 92;
const H = 170;
const PL = 8;

function Stage({ locked, reach, m, setM }: { locked: boolean; reach: (n: string) => void; m: number; setM: (m: number) => void }) {
  const [best, setBest] = useState(false);
  const ps = pairs(m);
  const bi = m > 0 ? bestIndex(ps) : 0;
  const shownIdx = m === 0 ? -1 : best ? bi : m - 1;
  const cur = shownIdx >= 0 ? ps[shownIdx] : null;
  const add = (d: number) => {
    setM(m + d);
    setBest(false);
    reach("first");
    if (m + d >= MANY) reach("many");
  };

  const all = cur ? [...cur.a, ...cur.b] : [0];
  const lo = Math.min(...all);
  const hi = Math.max(...all, lo + 1);
  const px = (n: number) => PL + (n / STEPS) * (W - 2 * PL);
  const py = (v: number) => TOP_H - 6 - ((v - lo) / (hi - lo)) * (TOP_H - 14);
  const line = (a: number[]) => a.map((v, n) => `${px(n).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const sx = (i: number) => PL + 4 + (i / Math.max(m - 1, 1)) * (W - 2 * PL - 8);
  const sy = (r: number) => TOP_H + 12 + ((1 - r) / 2) * (H - TOP_H - 22);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Two lines, each moved by its own coin flips. r near +1 or -1 means they move together. Dots below: r of each pair."}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={cur ? `Pair ${shownIdx + 1} of ${m}: r = ${fmtR(cur.r)}` : "No pair yet"}>
        {cur && (
          <>
            <polyline points={line(cur.a)} fill="none" className={s.la} />
            <polyline points={line(cur.b)} fill="none" className={s.lb} />
          </>
        )}
        <text x={W - PL} y={10} textAnchor="end" className={s.big}>{cur ? `r = ${fmtR(cur.r)}` : ""}</text>
        <line x1={PL} x2={W - PL} y1={sy(STRONG)} y2={sy(STRONG)} className={s.edge} />
        <line x1={PL} x2={W - PL} y1={sy(-STRONG)} y2={sy(-STRONG)} className={s.edge} />
        <text x={PL} y={sy(STRONG) - 2} className={s.lab}>r = +0.5</text>
        <text x={PL} y={sy(-STRONG) + 9} className={s.lab}>r = -0.5</text>
        {ps.map((p, i) => (
          <circle key={i} cx={sx(i)} cy={sy(p.r)} r={i === shownIdx ? 4 : 2.4} className={i === shownIdx ? s.cur : Math.abs(p.r) > STRONG ? s.strong : s.weak} />
        ))}
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => add(1)}>New pair</Control>
        <Control disabled={locked} onClick={() => add(10)}>Show 10 more</Control>
        <Control disabled={locked} onClick={() => add(30)}>Show 30 more</Control>
        <Control className={best ? "active" : ""} disabled={locked || m < 2} onClick={() => setBest(!best)}>
          {best ? "Back to latest" : "Show strongest"}
        </Control>
      </Row>
      <Row>
        <Readout label="Pairs seen" value={locked ? "?" : m} />
        <Readout label={`Strong (|r| > ${STRONG})`} value={locked || m === 0 ? "-" : `${strongCount(ps)} of ${m}`} />
      </Row>
    </div>
  );
}

export default function TwoRandomWalksAgree({ slug }: { slug: string }) {
  const [m, setM] = useState(0);
  const ps = pairs(m);
  const best = m > 0 ? ps[bestIndex(ps)].r : 0;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On your screen, two lines each take ${STEPS} steps up or down, each by its own coin flips; neither affects the other. How often is their correlation stronger than 0.5 in either direction?`,
        options: ["about 5%", "about 40%", "about 80%"],
        answer: 1,
      }}
      exploreHint="Draw one pair, then 10 more and 30 more, then show the strongest."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of your {m} pairs, {strongCount(ps)} had |r| above 0.5, and the strongest reached r = {fmtR(best)}, yet no pair shared any cause. Over 100,000 seeded pairs the share is about 40% (39.8%).
          </p>
          <p>
            Random walks drift in slow trends, so two of them often rise or fall together by accident. Lines that track each other do not prove a shared cause.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} m={m} setM={setM} />}
        </Milestones>
      )}
    </Lesson>
  );
}
