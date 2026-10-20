"use client";

// A cosine wave of frequency f (Hz) is sampled FS = 5 times a second (dots at t = n / 5, n = 0..5).
// The slower "alias" is the lowest-frequency cosine through the same dots: |f - FS * round(f / FS)|.
// Below FS / 2 it is the wave itself; above, it is a slower wave. Dots, both curves, readouts and
// the reveal all use the same f, FS and alias() below.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FS = 5; // samples per second
const QUESTION_F = 4; // Hz, the wave in the question
const alias = (f: number) => Math.abs(f - FS * Math.round(f / FS));
const ALIAS_OF_Q = alias(QUESTION_F); // 1
const NYQ = FS / 2; // 2.5
const W = 320, H = 170, X0 = 14, X1 = 306, YC = 85, AMP = 55;
const px = (t: number) => X0 + t * (X1 - X0);
const py = (v: number) => YC - v * AMP;
const curve = (f: number) =>
  Array.from({ length: 241 }, (_, i) => {
    const t = i / 240;
    return `${i === 0 ? "M" : "L"}${px(t).toFixed(1)} ${py(Math.cos(2 * Math.PI * f * t)).toFixed(1)}`;
  }).join(" ");
const dots = Array.from({ length: FS + 1 }, (_, n) => n / FS);

export default function AliasWaveWagonWheel({ slug }: { slug: string }) {
  const [f, setF] = useState(1.5);
  const fa = alias(f);
  const slower = fa !== f;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your sensor samples a ${QUESTION_F} Hz wave (${QUESTION_F} full ups and downs a second) ${FS} times a second, one dot per sample. Which slower wave passes through exactly the same dots?`,
        options: ["2 Hz", `${ALIAS_OF_Q} Hz`, "0.5 Hz"],
        answer: 1,
      }}
      exploreHint={`Set the wave to ${QUESTION_F} Hz, then slide the frequency up and down.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At {QUESTION_F} Hz, with {FS} samples a second, the dots sat exactly on a <strong>{ALIAS_OF_Q} Hz</strong>{" "}
            wave too. The samples cannot tell the two apart.
          </p>
          <p>
            A wave faster than half the sample rate ({NYQ} Hz here) looks like a slower one. That is why audio is
            sampled at more than twice its highest frequency.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["fast-wave"]}>
          {(reach) => {
            const set = (v: number) => {
              if (locked) return;
              setF(v);
              if (v === QUESTION_F) reach("fast-wave");
            };
            const msg = locked
              ? "Make a prediction to start."
              : slower
                ? `${f} Hz is above ${NYQ} Hz, half the sample rate. A ${fa} Hz wave hits the same dots.`
                : `${f} Hz is at or below ${NYQ} Hz, half the sample rate. No slower wave fits these dots.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg className="stage-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Wave of ${f} Hz sampled ${FS} times a second`}>
                  <line x1={X0} y1={YC} x2={X1} y2={YC} stroke="var(--line)" />
                  {slower && !locked && (
                    <path d={curve(fa)} fill="none" stroke="var(--good)" strokeWidth={3} strokeDasharray="6 4" />
                  )}
                  <path d={curve(f)} fill="none" stroke="var(--domain)" strokeWidth={2.5} />
                  {dots.map((t, n) => (
                    <circle key={n} cx={px(t)} cy={py(Math.cos(2 * Math.PI * f * t))} r={6} fill="var(--fg)" stroke="var(--bg)" strokeWidth={2} />
                  ))}
                  <text x={X0} y={H - 6} fontSize={11} fill="var(--muted)">1 second</text>
                </svg>
                <Row>
                  <Readout label="Wave" value={`${f} Hz`} />
                  <Readout label="Same dots as" value={locked ? "–" : slower ? `${fa} Hz` : "none slower"} />
                </Row>
                <div className={s.btns}>
                  <Control aria-label={`Set the wave to ${QUESTION_F} Hz`} disabled={locked || f === QUESTION_F} onClick={() => set(QUESTION_F)}>
                    {QUESTION_F} Hz
                  </Control>
                  <Control aria-label="Set the wave to 2 Hz" disabled={locked || f === 2} onClick={() => set(2)}>
                    2 Hz
                  </Control>
                </div>
                <Slider label="Wave frequency" value={f} min={0.5} max={4} step={0.5} disabled={locked} onChange={set}
                  format={(v) => `${v} Hz`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
