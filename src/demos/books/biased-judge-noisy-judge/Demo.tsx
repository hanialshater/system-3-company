"use client";

// Biased judge, noisy judge (Noise, Kahneman, Sibony & Sunstein 2021, Part II, unconfirmed; brief
// company/domains/briefs/books.md #14; numbers checked in company/domains/briefs/checks/books-strategy-wave1-check.mjs #14).
// Model (deterministic): ten cases per judge, each plotted by its error in years against a "fair sentence" line.
//   Judge A: every error +2           -> bias² 4 + noise² 0 = squared error 4
//   Judge B: -3,-3,-1,-1,0,0,1,1,3,3   -> bias² 0 + noise² 4 = squared error 4 (mean 0, sd 2)
//   Judge C: B's errors + 2            -> bias² 4 + noise² 4 = squared error 8
// noise² is the population variance of the errors; squared error is the mean of the squared errors.
// Presets (DOM order, each sets the full state, no Reset): "Judge A: biased", "Judge B: noisy", "Judge C: both".
// Milestones a-seen, b-seen, c-seen: each judge's squared error is recorded when its preset fires and stays in the
// Seen row and on its strip. The brief gates on a and b; c is gated too, because the reveal quotes C's score.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const JUDGES = ["A", "B", "C"] as const;
type Judge = (typeof JUDGES)[number];
const B_SORTED = [-3, -3, -1, -1, 0, 0, 1, 1, 3, 3];
/** Case i of Judge B takes a fixed shuffle of B's errors (i x 7 mod 10), so the strip is not a diagonal. */
const B_ERR = B_SORTED.map((_, i) => B_SORTED[(i * 7) % 10]);
const ERR: Record<Judge, number[]> = {
  A: B_ERR.map(() => 2),
  B: B_ERR,
  C: B_ERR.map((e) => e + 2),
};
const LABEL: Record<Judge, string> = { A: "Judge A: biased", B: "Judge B: noisy", C: "Judge C: both" };
const MILESTONES = ["a-seen", "b-seen", "c-seen"] as const;

function stats(e: number[]) {
  const n = e.length;
  const bias = e.reduce((a, x) => a + x, 0) / n;
  const noise2 = e.reduce((a, x) => a + (x - bias) ** 2, 0) / n;
  const mse = e.reduce((a, x) => a + x * x, 0) / n;
  return { bias, bias2: bias * bias, noise2, mse };
}
const STATS: Record<Judge, ReturnType<typeof stats>> = { A: stats(ERR.A), B: stats(ERR.B), C: stats(ERR.C) };
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
/** Squared errors always show one decimal (4.0, 8.0), the same in the strips, readout, Seen row and reveal. */
const fmtErr = (v: number) => v.toFixed(1);

// Geometry (viewBox 320 x 196).
const XL = 58;
const XR = 312;
const LO = -4;
const HI = 6;
const TOP = 24;
const H = 40;
const GAP = 8;
const px = (v: number) => XL + ((v - LO) / (HI - LO)) * (XR - XL);
const stripY = (k: number) => TOP + k * (H + GAP);
const laneY = (k: number, i: number) => stripY(k) + 4 + (i + 0.5) * ((H - 8) / 10);
const AXIS_Y = stripY(3) - GAP + 4;

export default function BiasedJudgeNoisyJudge({ slug }: { slug: string }) {
  const [focus, setFocus] = useState<Judge | null>(null);
  const [rec, setRec] = useState<Partial<Record<Judge, number>>>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Judge A gives every sentence 2 years too long. Judge B is right on average, scattering 2 years either way. Whose squared error is bigger?",
        options: ["Judge A's", "Judge B's", "They are the same"],
        answer: 2,
      }}
      exploreHint="Press each judge in turn and compare their squared errors."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Judge A was off by the same 2 years every time; Judge B was right on average but scattered. Both scored{" "}
            <strong>{fmtErr(rec.A ?? STATS.A.mse)}</strong> on squared error, and Judge C, with both faults, scored{" "}
            <strong>{fmtErr(rec.C ?? STATS.C.mse)}</strong>.
          </p>
          <p>
            <em>Noise</em> argues that scatter is an error as costly as bias, and that it can be measured even when nobody knows the
            right answer.
          </p>
          <p>
            <strong>Does it hold up?</strong> Holds up for the arithmetic: squared error is bias² plus noise², exactly. Real judges
            disagree widely too.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (j: Judge) => {
              setFocus(j);
              setRec((r) => (r[j] === undefined ? { ...r, [j]: STATS[j].mse } : r));
              reach(`${j.toLowerCase()}-seen`);
            };
            const on = !locked;
            const rows: Judge[] = on && rec.C !== undefined ? ["A", "B", "C"] : ["A", "B"];
            const f = focus ? STATS[focus] : null;
            const seen = JUDGES.filter((j) => rec[j] !== undefined).map((j) => `${j} ${fmtErr(rec[j] as number)}`);
            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 320 196"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    on && focus
                      ? `Ten sentences by Judge ${focus}, plotted by years off the fair sentence; squared error ${fmtErr(STATS[focus].mse)}`
                      : "Two empty strips, one per judge, with a fair-sentence line"
                  }
                >
                  <text x={px(0)} y={13} textAnchor="middle" className={s.fairLabel}>
                    fair sentence
                  </text>
                  {rows.map((j, k) => {
                    const shown = on && rec[j] !== undefined;
                    const y0 = stripY(k);
                    return (
                      <g key={j}>
                        <rect x={XL} y={y0} width={XR - XL} height={H} rx={4} className={on && focus === j ? s.focus : s.strip} />
                        <text x={4} y={y0 + H / 2 - 2} className={shown ? s.judge : s.judgeIdle}>
                          Judge {j}
                        </text>
                        {shown && (
                          <text x={4} y={y0 + H / 2 + 12} className={s.axis}>
                            error {fmtErr(STATS[j].mse)}
                          </text>
                        )}
                        {shown && <line x1={px(STATS[j].bias)} y1={y0 + 2} x2={px(STATS[j].bias)} y2={y0 + H - 2} className={s.mean} />}
                        {shown && ERR[j].map((e, i) => <circle key={i} cx={px(e)} cy={laneY(k, i)} r={2.6} className={s.dot} />)}
                      </g>
                    );
                  })}
                  <line x1={px(0)} y1={17} x2={px(0)} y2={AXIS_Y} className={s.fair} />
                  {[-2, 0, 2, 4, 6].map((t) => (
                    <text key={t} x={px(t)} y={AXIS_Y + 13} textAnchor="middle" className={s.axis}>
                      {t > 0 ? `+${t}` : t < 0 ? `−${-t}` : "0"}
                    </text>
                  ))}
                  <text x={4} y={AXIS_Y + 13} className={s.axis}>
                    years off
                  </text>
                </svg>
                <p className={s.readout} aria-live="polite">
                  {on && focus && f
                    ? `Judge ${focus}: error ${fmtErr(f.mse)} = bias² ${fmt(f.bias2)} + noise² ${fmt(f.noise2)}`
                    : ""}
                </p>
                <p className={s.seen}>{on && seen.length > 0 ? `Seen: ${seen.join(" · ")}` : ""}</p>
                <Row>
                  {JUDGES.map((j) => (
                    <Control key={j} className={focus === j ? "active" : ""} disabled={locked || focus === j} onClick={() => go(j)}>
                      {LABEL[j]}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
