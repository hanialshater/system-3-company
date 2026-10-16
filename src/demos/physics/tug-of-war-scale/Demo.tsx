"use client";

// Tug of war on a spring scale. A massless spring scale sits in the middle of a rope. At rest its net
// force is zero (T_right - T_left = m a = 0 with m ~ 0), so both ends carry the same tension and the
// spring carries that one tension: it reads 100 N when each friend pulls 100 N, 100 N when the right
// end is tied to a wall (the wall pulls back 100 N, third law), and 200 N when both pull 200 N.
// Brief: company/domains/briefs/physics.md round 4, #56. Numbers: artifacts/scratch/cm-physics-r4/check.mjs.
//
// One picture: rope, two pullers (or a wall), the scale's spring with two equal tension arrows (the
// cause; the spring stretches in proportion to the tension) and a dial. The rope starts slack, dial 0.
// Earned reveal: milestones "pair-100" (the question's case), "wall-100", "pair-200". The Seen row
// records each reading when its milestone fires and is never cleared.
// QA path (DOM order): Both pull 100 N, Tie right end to a wall, Both pull 200 N.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Mode = "slack" | "pair100" | "wall100" | "pair200";
const PULL: Record<Mode, number> = { slack: 0, pair100: 100, wall100: 100, pair200: 200 };
const MILESTONES = ["pair-100", "wall-100", "pair-200"] as const;

const W = 320;
const H = 150;
const RY = 112; // rope height
const CX = 160; // scale centre
const PX_PER_N = 0.12; // arrow length
const DCY = 46; // dial centre
const DR = 26;
const DMAX = 250;
const dialPt = (n: number, r: number) => {
  // 0 N at lower left, 250 N at lower right, sweeping 240 degrees over the top
  const th = ((210 - (240 * Math.min(n, DMAX)) / DMAX) * Math.PI) / 180;
  return { x: CX + r * Math.cos(th), y: DCY - r * Math.sin(th) };
};

function spring(x1: number, x2: number, y: number) {
  const n = 8;
  const step = (x2 - x1) / (n * 2);
  let d = `M${x1},${y}`;
  for (let i = 0; i < n * 2; i++) d += ` L${x1 + step * (i + 1)},${y + (i % 2 === 0 ? -6 : 6)}`;
  return d + ` L${x2},${y}`;
}

function Person({ x, flip }: { x: number; flip: boolean }) {
  const f = flip ? -1 : 1; // leans away from the middle
  return (
    <g>
      <circle cx={x - 6 * f} cy={RY - 40} r={7} className={s.body} />
      <line x1={x - 5 * f} y1={RY - 33} x2={x + 2 * f} y2={RY - 8} className={s.limb} />
      <line x1={x - 2 * f} y1={RY - 22} x2={x + 14 * f} y2={RY} className={s.limb} />
      <line x1={x + 2 * f} y1={RY - 8} x2={x - 6 * f} y2={RY + 22} className={s.limb} />
      <line x1={x + 2 * f} y1={RY - 8} x2={x + 10 * f} y2={RY + 22} className={s.limb} />
    </g>
  );
}

export default function TugOfWarScale({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("slack");
  const [seen, setSeen] = useState<{ pair100?: number; wall100?: number; pair200?: number }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two friends pull the ends of a rope, each with 100 N. A spring scale in the middle reads...",
        options: ["0 N", "100 N", "200 N"],
        answer: 1,
      }}
      exploreHint="Try each pull and read the dial."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With each friend pulling 100 N, your scale read <strong>{seen.pair100 ?? "?"} N</strong>, not 200. Tied to a
            wall, one friend&apos;s 100 N pull also read {seen.wall100 ?? "?"} N: the wall pulls back exactly as hard, just as
            the second friend did.
          </p>
          <p>
            A scale measures the tension in the rope, the pull passed through it, and at rest it is stretched only when both
            ends are pulled equally. Only when both pulled 200 N did it read {seen.pair200 ?? "?"} N.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (m: Mode) => {
              setMode(m);
              if (m === "pair100") {
                setSeen((x) => ({ ...x, pair100: PULL[m] }));
                reach("pair-100");
              }
              if (m === "wall100") {
                setSeen((x) => ({ ...x, wall100: PULL[m] }));
                reach("wall-100");
              }
              if (m === "pair200") {
                setSeen((x) => ({ ...x, pair200: PULL[m] }));
                reach("pair-200");
              }
            };
            const T = PULL[mode];
            const wall = mode === "wall100";
            const half = 22 + T * 0.05; // the spring stretches with the tension
            const lx = CX - half;
            const rx = CX + half;
            const leftEnd = 48;
            const rightEnd = wall ? 296 : 272;
            const aLen = T * PX_PER_N;
            const needle = dialPt(T, DR - 6);
            const slack = T === 0;
            const caption = locked
              ? "Make a prediction to start."
              : slack
                ? "The rope is slack. Pick a pull."
                : wall
                  ? "Right end tied to a wall. The wall pulls back."
                  : `Each friend pulls ${T} N.`;
            const seenText = [
              `100 + 100: ${seen.pair100 !== undefined ? `${seen.pair100} N` : "–"}`,
              `wall: ${seen.wall100 !== undefined ? `${seen.wall100} N` : "–"}`,
              `200 + 200: ${seen.pair200 !== undefined ? `${seen.pair200} N` : "–"}`,
            ].join(" · ");
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked ? "A slack rope with a spring scale in the middle" : `${caption} The scale reads ${T} N.`}
                >
                  <defs>
                    {[
                      ["tw-end", s.headEnd],
                      ["tw-t", s.headT],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>

                  {/* rope: sags when slack */}
                  {slack ? (
                    <>
                      <path d={`M${leftEnd},${RY} Q${(leftEnd + lx) / 2},${RY + 18} ${lx},${RY}`} className={s.rope} />
                      <path d={`M${rx},${RY} Q${(rx + rightEnd) / 2},${RY + 18} ${rightEnd},${RY}`} className={s.rope} />
                    </>
                  ) : (
                    <>
                      <line x1={leftEnd} y1={RY} x2={lx} y2={RY} className={s.rope} />
                      <line x1={rx} y1={RY} x2={rightEnd} y2={RY} className={s.rope} />
                    </>
                  )}

                  {/* left friend */}
                  <Person x={34} flip={false} />
                  {/* right friend, or the wall */}
                  {wall ? (
                    <g>
                      <rect x={296} y={58} width={14} height={78} className={s.wall} />
                      {[66, 80, 94, 108, 122].map((y) => (
                        <line key={y} x1={296} y1={y + 10} x2={310} y2={y} className={s.hatch} />
                      ))}
                      <text x={303} y={52} textAnchor="middle" className={s.lab}>
                        wall
                      </text>
                    </g>
                  ) : (
                    <Person x={286} flip={true} />
                  )}

                  {/* forces at the two ends */}
                  {!slack && !locked && (
                    <>
                      <line x1={78} y1={RY - 14} x2={78 - aLen} y2={RY - 14} className={s.endArrow} markerEnd="url(#tw-end)" />
                      <text x={80} y={RY - 22} textAnchor="end" className={s.lab}>
                        {T} N
                      </text>
                      <line x1={244} y1={RY - 14} x2={244 + aLen} y2={RY - 14} className={s.endArrow} markerEnd="url(#tw-end)" />
                      <text x={240} y={RY - 22} className={s.lab}>
                        {T} N
                      </text>
                    </>
                  )}

                  {/* the scale: hooks, spring, two equal tension arrows, dial */}
                  <line x1={CX} y1={DCY + DR} x2={CX} y2={RY - 8} className={s.stem} />
                  <rect x={lx - 3} y={RY - 4} width={6} height={8} rx={2} className={s.hook} />
                  <rect x={rx - 3} y={RY - 4} width={6} height={8} rx={2} className={s.hook} />
                  <path d={spring(lx + 3, rx - 3, RY)} className={s.spring} />
                  {!slack && !locked && (
                    <>
                      <line x1={lx} y1={RY + 13} x2={lx - aLen * 0.6} y2={RY + 13} className={s.tArrow} markerEnd="url(#tw-t)" />
                      <line x1={rx} y1={RY + 13} x2={rx + aLen * 0.6} y2={RY + 13} className={s.tArrow} markerEnd="url(#tw-t)" />
                      <text x={CX} y={RY + 27} textAnchor="middle" className={s.labT}>
                        tension {T} N
                      </text>
                    </>
                  )}
                  <circle cx={CX} cy={DCY} r={DR} className={s.dial} />
                  {[0, 50, 100, 150, 200, 250].map((v) => {
                    const p1 = dialPt(v, DR);
                    const p2 = dialPt(v, DR - 4);
                    return <line key={v} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={s.tick} />;
                  })}
                  {[0, 100, 200].map((v) => {
                    const p = dialPt(v, DR + 5);
                    const anchor = v === 0 ? "end" : v === 200 ? "start" : "middle";
                    return (
                      <text key={v} x={p.x} y={p.y + (v === 100 ? -1 : 4)} textAnchor={anchor} className={s.tickLabel}>
                        {v}
                      </text>
                    );
                  })}
                  <line x1={CX} y1={DCY} x2={needle.x} y2={needle.y} className={s.needle} />
                  <circle cx={CX} cy={DCY} r={2.5} className={s.hub} />
                  <text x={CX} y={DCY + 17} textAnchor="middle" className={s.big}>
                    {T} N
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control className={mode === "pair100" ? "active" : ""} disabled={locked || mode === "pair100"} onClick={() => pick("pair100")}>
                    Both pull 100 N
                  </Control>
                  <Control className={mode === "wall100" ? "active" : ""} disabled={locked || mode === "wall100"} onClick={() => pick("wall100")}>
                    Tie right end to a wall
                  </Control>
                  <Control className={mode === "pair200" ? "active" : ""} disabled={locked || mode === "pair200"} onClick={() => pick("pair200")}>
                    Both pull 200 N
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
