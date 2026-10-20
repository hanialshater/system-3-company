"use client";

// Two speakers, one tone. Top view: speakers A and B 1.5 m apart play the same 343 Hz
// tone in step (wavelength 343 / 343 = 1.00 m). The listener walks along a line 4 m in
// front of them. The slider offers the spots where B's path is shorter than A's by
// 0, 1/4, 1/2, 3/4 and 1 wavelength (solved below by bisection).
//
// Superposition: with equal amplitudes, the combined amplitude is |2 cos(pi D / lambda)|
// times one speaker's, where D is the path difference: 2x at D = 0, 0 at D = lambda/2.
// Idealised: each speaker is taken as equally loud at the listener (no 1/r falloff
// difference), open air, no reflections. Solid rings are crests, dashed rings troughs,
// at one instant. The strip at the top draws A's and B's waves as they arrive at the
// listener, and their sum, so "crest meets trough" is on the stage.
// v2: the reveal unlocks once the listener stands at the cancelling spot (QA path: the
// slider's two steps land on it). The B on/off toggle was removed so the last screen
// always has both speakers; the one-speaker reference is A's own trace (height 1).

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const LAMBDA = 343 / 343; // m
const HALF = 0.75; // speakers at x = -0.75 and +0.75 m
const Y_L = 4; // listener line, m in front
const pathA = (x: number) => Math.hypot(x + HALF, Y_L);
const pathB = (x: number) => Math.hypot(x - HALF, Y_L);
const diff = (x: number) => pathA(x) - pathB(x);

function xFor(target: number) {
  let lo = 0;
  let hi = 50;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if (diff(m) < target) lo = m;
    else hi = m;
  }
  return lo;
}
const FRACS = ["0", "¼", "½", "¾", "1"];
const SPOTS = [0, 1, 2, 3, 4].map((k) => xFor((k * LAMBDA) / 4));
const CANCEL = 2; // index of the half-wavelength spot
const amp = (d: number) => Math.abs(2 * Math.cos((Math.PI * d) / LAMBDA));

const W = 320;
const H = 280;
const OX = 80;
const OY = 270;
const K = 44; // px per m
const px = (x: number) => OX + x * K;
const py = (y: number) => OY - y * K;

// Wave strip at the top: two cycles of each arriving wave.
const TX0 = 40;
const TX1 = 312;
const trace = (yc: number, a: number, f: (t: number) => number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * 2;
    pts.push(`${(TX0 + (i / 80) * (TX1 - TX0)).toFixed(1)},${(yc - a * f(t)).toFixed(1)}`);
  }
  return pts.join(" ");
};

const loud = (v: number) => (v < 0.05 ? "0×" : `${v.toFixed(1)}×`);

export default function TwoRipplesCancel({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [seenFar, setSeenFar] = useState(false);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["cancel-spot"]);
  const x = SPOTS[k];
  const d = diff(x);
  const a = amp(d);
  const silent = a < 0.05;
  const lag = (2 * Math.PI * d) / LAMBDA;
  const wB = (t: number) => Math.sin(2 * Math.PI * t);
  const wA = (t: number) => Math.sin(2 * Math.PI * t - lag);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At an outdoor concert, two identical speakers play the same note. A wavelength is the length of one full wave. You stand where A's sound travels half a wavelength farther than B's. What do you hear?",
        options: ["louder than one speaker", "the same as one speaker", "almost nothing"],
        answer: 2,
      }}
      exploreHint="Walk the listener out until A's path is half a wave longer."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Straight ahead, with equal paths, the waves arrived in step and the sum was {amp(0).toFixed(1)}× one
            speaker&apos;s height. Where A&apos;s path was <strong>{diff(SPOTS[CANCEL]).toFixed(2)} m</strong> longer,
            half of the 1.00 m wave, the sum went <strong>flat</strong>.
            {seenFar
              ? " At a whole wave extra, you saw them back in step."
              : " Further out, with a whole wave extra, they come back in step."}
          </p>
          <p>
            Waves add by height. Half a wave late, A&apos;s crest arrives with B&apos;s trough, and they cancel.
          </p>
          <p className="muted">Idealised: equal loudness from each speaker, no echoes. A real room leaves a quiet spot, not silence.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = silent
          ? "Crest meets trough: the sum is flat."
          : "Orange rings: A. Grey: B. Solid: crests, dashed: troughs. One wave (wavelength) = 1.00 m.";
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Listener ${x.toFixed(2)} m to the side: sum ${loud(a)} one speaker`}>
              {[-HALF, HALF].map((sx) =>
                Array.from({ length: 12 }, (_, n) => {
                  const r = ((n + 1) / 2) * LAMBDA * K;
                  return (
                    <path
                      key={`${sx}-${n}`}
                      d={`M ${px(sx) - r} ${OY} A ${r} ${r} 0 0 1 ${px(sx) + r} ${OY}`}
                      className={`${sx < 0 ? s.ringA : s.ringB} ${n % 2 === 0 ? s.trough : ""}`}
                    />
                  );
                }),
              )}
              <rect x={0} y={0} width={W} height={72} className={s.band} />
              <text x={4} y={20} className={s.tagA}>A</text>
              <text x={16} y={20} className={s.tagB}>B</text>
              <polyline points={trace(17, 9, wB)} className={s.waveB} />
              <polyline points={trace(17, 9, wA)} className={s.waveA} />
              <text x={4} y={54} className={s.tagSum}>A+B</text>
              <line x1={TX0} y1={50} x2={TX1} y2={50} className={s.axis} />
              <polyline points={trace(50, 9, (t) => wA(t) + wB(t))} className={s.waveSum} />

              <line x1={0} y1={py(Y_L)} x2={W} y2={py(Y_L)} className={s.walk} />
              <line x1={px(-HALF)} y1={OY} x2={px(x)} y2={py(Y_L)} className={s.pathA} />
              <line x1={px(HALF)} y1={OY} x2={px(x)} y2={py(Y_L)} className={s.pathB} />
              <rect x={px(-HALF) - 7} y={OY - 6} width={14} height={10} rx={2} className={s.spkA} />
              <text x={px(-HALF)} y={OY + 1} textAnchor="middle" className={s.spkLabel}>A</text>
              <rect x={px(HALF) - 7} y={OY - 6} width={14} height={10} rx={2} className={s.spkB} />
              <text x={px(HALF)} y={OY + 1} textAnchor="middle" className={s.spkLabel}>B</text>
              <circle cx={px(x)} cy={py(Y_L)} r={6 + 4 * a} className={silent ? s.quiet : s.listener} />
              <text x={px(x)} y={py(Y_L) + 26} textAnchor="middle" className={s.small}>you</text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Listener"
              value={k}
              min={0}
              max={SPOTS.length - 1}
              step={1}
              disabled={locked}
              format={(v) => `${SPOTS[v].toFixed(2)} m right`}
              onChange={(v) => {
                setK(v);
                if (v === CANCEL) reach("cancel-spot");
                if (v === SPOTS.length - 1) setSeenFar(true);
              }}
            />
            <Row>
              <Readout label="A's path longer by" value={locked ? "?" : `${d.toFixed(2)} m = ${FRACS[k]} wave`} />
              <Readout label="Sum vs one" value={locked ? "?" : loud(a)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
