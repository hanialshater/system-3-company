"use client";

// Two speakers, one tone. Top view: speakers A and B 1.5 m apart play the same 343 Hz
// tone in step (wavelength 343 / 343 = 1.00 m). The listener walks along a line 4 m in
// front of them. The stage offers the spots where B's path is shorter than A's by
// 0, 1/4, 1/2, 3/4 and 1 wavelength (solved below by bisection).
//
// Superposition: with equal amplitudes, the combined amplitude is |2 cos(pi D / lambda)|
// times one speaker's, where D is the path difference: 2x at D = 0, 0 at D = lambda/2.
// Idealised: each speaker is taken as equally loud at the listener (no 1/r falloff
// difference), open air, no reflections. The rings are crests at one instant.
// The reveal unlocks once the listener stands at a silent spot with both speakers on.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
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
const SPOTS = [0, 1, 2, 3, 4].map((k) => xFor((k * LAMBDA) / 4));
const amp = (d: number) => Math.abs(2 * Math.cos((Math.PI * d) / LAMBDA));

const W = 320;
const H = 222;
const OX = 80;
const OY = 212;
const K = 44; // px per m
const px = (x: number) => OX + x * K;
const py = (y: number) => OY - y * K;

export default function TwoRipplesCancel({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [bOn, setBOn] = useState(true);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["silent-spot"]);
  const x = SPOTS[k];
  const d = diff(x);
  const a = bOn ? amp(d) : 1;
  const silent = bOn && a < 0.05;
  const check = (kk: number, on: boolean) => {
    if (on && amp(diff(SPOTS[kk])) < 0.05) reach("silent-spot");
  };
  const loud = (v: number) => (v < 0.05 ? "silent" : `${v.toFixed(1)}×`);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two identical speakers play the same pure tone. Where one speaker's path is half a wavelength longer, the sound is…",
        options: ["twice as loud", "the same as one speaker", "almost silent"],
        answer: 2,
      }}
      exploreHint="Walk the listener sideways. Find where the extra path is half a wave."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Where A&apos;s path was <strong>{diff(SPOTS[2]).toFixed(2)} m</strong> longer, half of the 1.00 m wavelength,
            the sound dropped to <strong>silent</strong>. Straight ahead, with equal paths, it was {amp(0).toFixed(1)}× one
            speaker; one more step out, with a whole wavelength extra, loud again.
          </p>
          <p>
            Waves add by height. Half a wave late, A&apos;s crest arrives with B&apos;s trough, and they cancel. In step,
            crest meets crest and they build. Two sounds can make less than one.
          </p>
          <p className="muted">Idealised: equal loudness from each speaker, no echoes. Real rooms leave a quiet spot, not silence.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : silent
            ? "Crest meets trough here."
            : "Top view. Rings are crests, 1.00 m apart (343 Hz). Each speaker equally loud.";
        const speakers = bOn ? [-HALF, HALF] : [-HALF];
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Listener ${x.toFixed(2)} m to the side: ${loud(a)}`}>
              {speakers.map((sx) =>
                Array.from({ length: 6 }, (_, n) => {
                  const r = (n + 1) * LAMBDA * K;
                  return (
                    <path
                      key={`${sx}-${n}`}
                      d={`M ${px(sx) - r} ${OY} A ${r} ${r} 0 0 1 ${px(sx) + r} ${OY}`}
                      className={sx < 0 ? s.ringA : s.ringB}
                    />
                  );
                }),
              )}
              <line x1={0} y1={py(Y_L)} x2={W} y2={py(Y_L)} className={s.walk} />
              {speakers.map((sx) => (
                <line key={sx} x1={px(sx)} y1={OY} x2={px(x)} y2={py(Y_L)} className={s.path} />
              ))}
              <rect x={px(-HALF) - 7} y={OY - 6} width={14} height={10} rx={2} className={s.spkA} />
              <text x={px(-HALF)} y={OY + 1} textAnchor="middle" className={s.spkLabel}>
                A
              </text>
              {bOn && (
                <>
                  <rect x={px(HALF) - 7} y={OY - 6} width={14} height={10} rx={2} className={s.spkB} />
                  <text x={px(HALF)} y={OY + 1} textAnchor="middle" className={s.spkLabel}>
                    B
                  </text>
                </>
              )}
              <circle cx={px(x)} cy={py(Y_L)} r={6 + 4 * a} className={silent ? s.quiet : s.listener} />
              <text x={px(x)} y={py(Y_L) - 14} textAnchor="middle" className={s.small}>
                you
              </text>
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
                check(v, bOn);
              }}
            />
            <Row>
              <Control
                className={bOn ? "active" : ""}
                disabled={locked}
                onClick={() => {
                  setBOn(!bOn);
                  check(k, !bOn);
                }}
              >
                {bOn ? "Speaker B: on" : "Speaker B: off"}
              </Control>
              <Readout label="A's extra path" value={locked ? "?" : `${d.toFixed(2)} m`} />
              <Readout label="Sound vs one" value={locked ? "?" : loud(a)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
