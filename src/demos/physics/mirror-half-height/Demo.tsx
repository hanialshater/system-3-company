"use client";

// Half-height mirror. Side view: a person (1.80 m, eyes at 1.70 m) stands d metres from a
// flat wall mirror; her reflection (dashed) stands d metres behind the glass. Two lines run
// from her eye to the reflection's head and toes; they cross the glass at (eye + h) / 2:
// 1.75 m and 0.85 m, at any d. A point of her body at height h is visible if (eye + h) / 2
// lies on the glass, so the visible band is [2 b - eye, 2 t - eye]. All heights in cm
// integers to keep the edges exact. One scale on both axes.
//
// Earned reveal: milestones "half" (mirror 0.85-1.75 m, whole body seen) and "back"
// (distance changed while it holds). QA path: top edge starts at its max 1.85 -> 1.75,
// bottom edge 0.75 -> 0.85, distance 1.0 -> 2.0 m.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useId, useState } from "react";
import s from "./styles.module.css";

const TALL = 180; // cm
const EYE = 170; // cm
const NEED_B = EYE / 2; // 85
const NEED_T = (EYE + TALL) / 2; // 175

const W = 320;
const H = 150;
const K = 0.56; // px per cm (56 px per m), both axes
const FY = 136; // floor
const WX = 160; // mirror plane
const y = (cm: number) => FY - cm * K;
const m = (cm: number) => `${(cm / 100).toFixed(2)} m`;

function Figure({ x, flip, className }: { x: number; flip: boolean; className: string }) {
  const f = flip ? -1 : 1;
  const headR = 11;
  return (
    <g className={className}>
      <circle cx={x} cy={y(TALL) + headR * K * 1.0 + 0} r={headR * K} />
      <line x1={x} y1={y(TALL - 2 * headR)} x2={x} y2={y(90)} />
      <line x1={x} y1={y(90)} x2={x - 10 * K * f} y2={y(0)} />
      <line x1={x} y1={y(90)} x2={x + 10 * K * f} y2={y(0)} />
      <line x1={x} y1={y(140)} x2={x + 22 * K * f} y2={y(100)} />
      <line x1={x} y1={y(140)} x2={x - 18 * K * f} y2={y(102)} />
    </g>
  );
}

export default function MirrorHalfHeight({ slug }: { slug: string }) {
  const [top, setTop] = useState(185);
  const [bot, setBot] = useState(75);
  const [dist, setDist] = useState(100); // cm
  const [halfAt, setHalfAt] = useState<number[]>([]);
  const clip = useId().replace(/:/g, "");

  const lo = Math.max(0, 2 * bot - EYE);
  const hi = Math.min(TALL, 2 * top - EYE);
  const seenFrac = Math.max(0, hi - lo) / TALL;
  const whole = lo <= 0 && hi >= TALL;
  const len = top - bot;
  const isHalf = whole && len === NEED_T - NEED_B;
  const status = whole ? "head to toe" : lo > 0 && hi < TALL ? "head and feet cut off" : lo > 0 ? "feet cut off" : "head cut off";

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A woman 1.80 m tall, eyes at 1.70 m, wants to see all of herself in a flat wall mirror. The shortest mirror that works is…",
        options: ["0.45 m", "1.80 m", "0.90 m"],
        answer: 2,
      }}
      exploreHint="Shrink the mirror from the top and bottom until it just works, then step back."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            A mirror from {m(NEED_B)} to {m(NEED_T)}, just <strong>{m(NEED_T - NEED_B)}</strong> long, showed you head to toe
            {halfAt.length > 1 ? ` at ${halfAt.map(m).join(" and ")} away` : halfAt.length ? ` at ${m(halfAt[0])} away` : ""}.
          </p>
          <p>
            Your reflection stands as far behind the glass as you stand in front. The line from your eye to its toes crosses the
            glass halfway between eye and floor; the line to its head, halfway between eye and the top of the head. So the mirror needs
            half your height, and stepping back moves nothing.
          </p>
          <p className="muted">Flat mirror; the eye treated as a single point.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["half", "back"]}>
          {(reach) => {
            const check = (t: number, b: number, d: number, moved: boolean) => {
              const ok = 2 * b - EYE <= 0 && 2 * t - EYE >= TALL && t - b === NEED_T - NEED_B;
              if (!ok) return;
              reach("half");
              setHalfAt((xs) => (xs.includes(d) ? xs : [...xs, d]));
              if (moved) reach("back");
            };
            const px = WX - dist * K;
            const ix = WX + dist * K;
            const lineCls = (cross: number) => (cross >= bot && cross <= top ? s.sightOk : s.sightBad);
            const caption = locked
              ? "Flat mirror, eye as a point. Dashed: your reflection, as far behind the glass as you stand."
              : `Mirror ${m(len)} long, ${m(bot)} to ${m(top)} up. You see ${status}.`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Mirror ${m(len)} long; you see ${status}`}>
                  <defs>
                    <clipPath id={clip}>
                      <rect x={WX} y={y(hi)} width={W - WX} height={Math.max(0, (hi - lo) * K)} />
                    </clipPath>
                  </defs>
                  <line x1={0} y1={FY} x2={W} y2={FY} className={s.floor} />
                  <line x1={WX} y1={6} x2={WX} y2={FY} className={s.wall} />
                  <rect x={WX - 3} y={y(top)} width={6} height={len * K} rx={2} className={s.mirror} />
                  <Figure x={px} flip={false} className={s.person} />
                  <Figure x={ix} flip className={s.ghost} />
                  <g clipPath={`url(#${clip})`}>
                    <Figure x={ix} flip className={s.seen} />
                  </g>
                  {!locked && (
                    <>
                      <line x1={px} y1={y(EYE)} x2={ix} y2={y(TALL)} className={lineCls(NEED_T)} />
                      <line x1={px} y1={y(EYE)} x2={ix} y2={y(0)} className={lineCls(NEED_B)} />
                      <circle cx={WX} cy={y(NEED_T)} r={2.5} className={s.cross} />
                      <circle cx={WX} cy={y(NEED_B)} r={2.5} className={s.cross} />
                      <text x={WX - 6} y={y(NEED_T) - 4} textAnchor="end" className={s.tick}>
                        {m(NEED_T)}
                      </text>
                      <text x={WX - 6} y={y(NEED_B) + 10} textAnchor="end" className={s.tick}>
                        {m(NEED_B)}
                      </text>
                    </>
                  )}
                  <text x={px} y={y(TALL) - 4} textAnchor="middle" className={s.tick}>
                    you
                  </text>
                  <text x={ix} y={y(TALL) - 4} textAnchor="middle" className={s.tick}>
                    reflection
                  </text>
                  <circle cx={px + 3} cy={y(EYE)} r={1.6} className={s.eye} />
                  <text x={(px + WX) / 2} y={FY + 11} textAnchor="middle" className={s.tick}>
                    {m(dist)}
                  </text>
                  <text x={(ix + WX) / 2} y={FY + 11} textAnchor="middle" className={s.tick}>
                    {m(dist)}
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Slider
                    label="Mirror top"
                    value={top}
                    min={120}
                    max={185}
                    step={5}
                    format={m}
                    disabled={locked}
                    onChange={(v) => {
                      setTop(v);
                      check(v, bot, dist, false);
                    }}
                  />
                  <Slider
                    label="Mirror bottom"
                    value={bot}
                    min={0}
                    max={110}
                    step={5}
                    format={m}
                    disabled={locked}
                    onChange={(v) => {
                      setBot(v);
                      check(top, v, dist, false);
                    }}
                  />
                </Row>
                <Row>
                  <Slider
                    label="Your distance from mirror"
                    value={dist}
                    min={50}
                    max={250}
                    step={50}
                    format={m}
                    disabled={locked}
                    onChange={(v) => {
                      setDist(v);
                      check(top, bot, v, isHalf);
                    }}
                  />
                  <Readout label="You see" value={locked ? "?" : `${Math.round(100 * seenFrac)}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
