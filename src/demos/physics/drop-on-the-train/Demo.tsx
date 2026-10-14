"use client";

// Drop on the train. A smooth train moves at a steady speed; a passenger drops a ball from 1.8 m.
// The fall takes t = sqrt(2h/g) = sqrt(3.6 / 9.81) = 0.606 s. At release the ball already has the
// train's forward speed and nothing horizontal acts on it, so in that 0.606 s it moves forward exactly
// as far as the train: 12.1 m at 20 m/s, 24.2 m at 40 m/s. It lands 0 cm from the floor spot below
// the hand. Brief: company/domains/briefs/physics.md round 4, #57; numbers from
// artifacts/scratch/cm-physics-r4/check.mjs.
//
// One picture, two frames of the same drop. Inside the carriage: a straight dotted trace down.
// From the platform: the carriage at release (ghost) and at landing, and the ball's parabola.
// Platform view scale: 10 px per m across, 40 px per m up (heights drawn 4x taller; claimed).
// Earned reveal: milestones "drop-20" (the question's case), "platform", "drop-40". Values are
// recorded in the Seen row when each fires. The ball animates for 380 ms; milestones fire on press.
// QA path (DOM order): Drop at 20 m/s, View from the platform, Drop at 40 m/s.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const HAND = 1.8; // m
const T_FALL = Math.sqrt((2 * HAND) / G); // 0.606 s
const OFFSET_CM = 0; // the ball keeps the train's speed: no offset
const MILESTONES = ["drop-20", "platform", "drop-40"] as const;
const m1 = (x: number) => x.toFixed(1);

const W = 320;
const H = 150;
const FLOOR = 128;
// inside view
const IN_HAND_X = 170;
const VY = 40; // px per m, vertical (both views)
const HAND_Y = FLOOR - HAND * VY; // 56
// platform view
const PX = 10; // px per m, horizontal
const P0 = 10; // carriage left at release
const CW = 56; // carriage width in the platform view
const P_HAND = P0 + 30;

function useAnim(key: string) {
  const [p, setP] = useState(1);
  useEffect(() => {
    if (key === "") return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 380);
      setP(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setP(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return p;
}

function Person({ x }: { x: number }) {
  // passenger facing right; the hand is held out at 1.8 m
  return (
    <g>
      <circle cx={x} cy={HAND_Y - 18} r={7} className={s.body} />
      <line x1={x} y1={HAND_Y - 11} x2={x} y2={FLOOR - 34} className={s.limb} />
      <line x1={x} y1={HAND_Y - 4} x2={x + 16} y2={HAND_Y} className={s.limb} />
      <line x1={x} y1={FLOOR - 34} x2={x - 6} y2={FLOOR} className={s.limb} />
      <line x1={x} y1={FLOOR - 34} x2={x + 6} y2={FLOOR} className={s.limb} />
    </g>
  );
}

export default function DropOnTheTrain({ slug }: { slug: string }) {
  const [speed, setSpeed] = useState<20 | 40 | null>(null);
  const [platform, setPlatform] = useState(false);
  const [drops, setDrops] = useState(0);
  const [seen, setSeen] = useState<{ cm20?: number; plat?: number; cm40?: number }>({});
  const p = useAnim(speed === null ? "" : `${speed}-${platform}-${drops}`);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A smooth train cruises at a steady 20 m/s. Standing inside, you drop a ball from your hand. It lands...",
        options: ["Behind your feet", "At your feet", "Ahead of your feet"],
        answer: 1,
      }}
      exploreHint="Drop the ball, then watch the same drop from the platform."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your ball fell straight down beside your legs and landed <strong>{seen.cm20 ?? "?"} cm</strong> from below your
            hand at 20 m/s, and {seen.cm40 ?? "?"} cm at 40 m/s. From the platform the same drop was a long curve: in the{" "}
            {T_FALL.toFixed(2)} s fall the train moved {seen.plat !== undefined ? m1(seen.plat) : "?"} m, and so did the ball.
          </p>
          <p>
            It left your hand already moving at the train&apos;s speed, and nothing slowed it, so it kept pace with you. Inside
            a steadily moving train, things fall just as they do standing still.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const drop = (v: 20 | 40, plat: boolean) => {
              setSpeed(v);
              setPlatform(plat);
              setDrops((n) => n + 1);
              if (v === 20) {
                setSeen((x) => ({ ...x, cm20: OFFSET_CM }));
                reach("drop-20");
              }
              if (v === 40) {
                setSeen((x) => ({ ...x, cm40: OFFSET_CM }));
                reach("drop-40");
              }
              if (plat) {
                setSeen((x) => ({ ...x, plat: v * T_FALL }));
                reach("platform");
              }
            };
            const v = speed ?? 20;
            const dist = v * T_FALL;
            const t = p * T_FALL;
            const fallPx = 0.5 * G * t * t * VY;
            const caption = locked
              ? "Make a prediction to start."
              : speed === null
                ? "Inside the carriage, before the drop."
                : platform
                  ? "Seen from the platform. Heights drawn 4× taller."
                  : "Inside the carriage. Speeds are measured from the ground.";
            const seenText = [
              `20 m/s: ${seen.cm20 !== undefined ? `${seen.cm20} cm` : "–"}`,
              `platform: ${seen.plat !== undefined ? `${m1(seen.plat)} m curve` : "–"}`,
              `40 m/s: ${seen.cm40 !== undefined ? `${seen.cm40} cm` : "–"}`,
            ].join(" · ");

            // the parabola from the platform, sampled
            const curve = (upTo: number) => {
              const pts: string[] = [];
              for (let i = 0; i <= 24; i++) {
                const ti = (i / 24) * upTo;
                pts.push(`${P_HAND + v * ti * PX},${HAND_Y + 0.5 * G * ti * ti * VY}`);
              }
              return pts.join(" ");
            };
            const carX = P0 + dist * PX * p; // carriage left now
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked ? "A passenger in a train carriage holding a ball" : caption}
                >
                  <defs>
                    {[
                      ["dt-b", s.headB],
                      ["dt-t", s.headT],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>

                  {!platform || locked ? (
                    <g>
                      {/* inside the carriage */}
                      <rect x={30} y={18} width={260} height={FLOOR - 18 + 4} rx={8} className={s.car} />
                      <line x1={30} y1={FLOOR} x2={290} y2={FLOOR} className={s.floor} />
                      <Person x={IN_HAND_X - 16} />
                      {/* floor spot below the hand */}
                      <line x1={IN_HAND_X - 6} y1={FLOOR + 6} x2={IN_HAND_X + 6} y2={FLOOR + 6} className={s.mark} />
                      <line x1={IN_HAND_X} y1={FLOOR + 1} x2={IN_HAND_X} y2={FLOOR + 10} className={s.mark} />
                      {speed !== null && !locked && (
                        <>
                          <line x1={IN_HAND_X} y1={HAND_Y + 4} x2={IN_HAND_X} y2={HAND_Y + 4 + fallPx} className={s.trace} />
                          <text x={W / 2} y={FLOOR + 20} textAnchor="middle" className={s.labD}>
                            lands {OFFSET_CM} cm from below your hand
                          </text>
                        </>
                      )}
                      <circle cx={IN_HAND_X} cy={HAND_Y + 4 + (speed !== null && !locked ? fallPx : 0)} r={4.5} className={s.ball} />
                      {!locked && speed !== null && (
                        <>
                          <line x1={IN_HAND_X + 8} y1={HAND_Y - 6} x2={IN_HAND_X + 8 + v * 1.5} y2={HAND_Y - 6} className={s.vBall} markerEnd="url(#dt-b)" />
                          <text x={IN_HAND_X + 12 + v * 1.5} y={HAND_Y - 3} className={s.labD}>
                            ball {v} m/s
                          </text>
                        </>
                      )}
                      <line x1={40} y1={30} x2={40 + v * 1.5} y2={30} className={s.vTrain} markerEnd="url(#dt-t)" />
                      <text x={44 + v * 1.5} y={34} className={s.lab}>
                        train {locked || speed === null ? 20 : v} m/s
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* from the platform */}
                      <line x1={0} y1={FLOOR + 4} x2={W} y2={FLOOR + 4} className={s.floor} />
                      <rect x={P0} y={24} width={CW} height={FLOOR - 24 + 4} rx={6} className={s.ghost} />
                      <rect x={carX} y={24} width={CW} height={FLOOR - 24 + 4} rx={6} className={s.car} />
                      <Person x={carX + 30 - 16} />
                      <polyline points={curve(t)} className={s.trace} />
                      <circle cx={P_HAND + v * t * PX} cy={HAND_Y + fallPx} r={4.5} className={s.ball} />
                      <line x1={carX + 30 - 6} y1={FLOOR + 9} x2={carX + 30 + 6} y2={FLOOR + 9} className={s.mark} />
                      <text x={W / 2} y={14} textAnchor="middle" className={s.labD}>
                        train moved {m1(dist)} m · ball moved {m1(dist)} m
                      </text>
                      <text x={W - 4} y={FLOOR + 20} textAnchor="end" className={s.lab}>
                        lands {OFFSET_CM} cm from below the hand
                      </text>
                    </g>
                  )}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control
                    className={speed === 20 ? "active" : ""}
                    disabled={locked || speed === 20}
                    onClick={() => drop(20, platform)}
                  >
                    Drop at 20 m/s
                  </Control>
                  <Control disabled={locked} onClick={() => drop(speed ?? 20, !platform)}>
                    {platform ? "View from the train" : "View from the platform"}
                  </Control>
                  <Control
                    className={speed === 40 ? "active" : ""}
                    disabled={locked || speed === 40}
                    onClick={() => drop(40, platform)}
                  >
                    Drop at 40 m/s
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
