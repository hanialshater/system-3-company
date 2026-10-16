"use client";

// Clap at a cliff. The echo's delay covers the trip out and back: t = 2 d / c with c = 343 m/s
// (c = sqrt(gamma R T / M) = 343.2 m/s in still air at 20 °C). 85 m gives 0.50 s, 170 m 0.99 s,
// 340 m 1.98 s; a 1.0 s echo means about 171 m.
// Brief: company/domains/briefs/physics.md round 4, #65. Numbers: artifacts/scratch/cm-physics-r4/check.mjs
// (block "68 clap-at-the-cliff").
//
// One picture: a person, the ground, and a cliff placed at the chosen distance (it carries its distance
// as a label). A sound pulse runs out and back in 360 ms (simulated seconds are reported, not real
// ones). The path readout "sound travelled N m" stands for the cause: the round trip.
// Stage word budget (Ruling r3, closed list): controls 6, cliff "340 m" 1, "echo 1.98 s" 2,
// "sound travelled 680 m" 3, Seen row 6, caption 3 = 21. No "Seen:" prefix (not on the list).
// Earned reveal: milestones "d85", "d170" (the question's case), "d340". Seen row recorded when each
// fires, never cleared. QA path (DOM order): 85 m: clap, 170 m: clap, 340 m: clap.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState, type CSSProperties } from "react";
import s from "./styles.module.css";

const C_SOUND = 343; // m/s, still air at 20 °C (343.2 to one decimal)
const DISTS = [85, 170, 340] as const;
type D = (typeof DISTS)[number];
const MILESTONES = ["d85", "d170", "d340"] as const;
const echoS = (d: number) => (2 * d) / C_SOUND;
const fmtS = (t: number) => t.toFixed(2);

const W = 320;
const H = 150;
const GY = 118; // ground
const X0 = 44; // the clapper's hands
const PX_PER_M = 0.74; // 340 m -> 252 px

export default function ClapAtTheCliff({ slug }: { slug: string }) {
  const [d, setD] = useState<D | null>(null);
  const [shot, setShot] = useState(0); // replays the pulse animation
  const [seen, setSeen] = useState<Partial<Record<D, number>>>({});

  const sv = (k: D) => (seen[k] !== undefined ? fmtS(seen[k]!) : "?");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You clap facing a cliff and hear the echo 1.0 s later. Sound travels 343 m each second. The cliff is about...",
        options: ["170 m away", "340 m away", "690 m away"],
        answer: 0,
      }}
      exploreHint="Clap at each cliff and read the echo time."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the cliff 170 m away, your echo came back after <strong>{sv(170)} s</strong>, close to the 1.0 s in the
            question. At 340 m it took {sv(340)} s.
          </p>
          <p>
            The clap has to reach the cliff and come back, so in 1 s the sound covered 343 m in total: half out, half back.
            The distance to a cliff is the speed of sound times the echo time, divided by two.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (k: D) => {
              setD(k);
              setShot((n) => n + 1);
              setSeen((x) => ({ ...x, [k]: x[k] ?? echoS(k) }));
              reach(`d${k}`);
            };
            const cx = d ? X0 + d * PX_PER_M : 0; // cliff face
            const t = d ? echoS(d) : 0;
            const seenText = DISTS.map((k) => `${k} m: ${seen[k] !== undefined ? `${fmtS(seen[k]!)} s` : "–"}`).join(" · ");
            const alt = locked
              ? "A person standing on flat ground, ready to clap. No cliff is placed yet."
              : d
                ? `Cliff ${d} metres away. The echo returns after ${fmtS(t)} seconds; the sound travelled ${2 * d} metres, out and back.`
                : "Pick a cliff distance and clap.";
            const pulseStyle = d ? ({ ["--out" as string]: `${cx - X0 - 4}px` } as CSSProperties) : undefined;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={alt}>
                  <defs>
                    <marker id="cc-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.head} />
                    </marker>
                  </defs>
                  {/* ground */}
                  <line x1={8} y1={GY} x2={W - 4} y2={GY} className={s.ground} />

                  {/* person clapping */}
                  <g>
                    <circle cx={28} cy={GY - 44} r={7} className={s.body} />
                    <line x1={28} y1={GY - 37} x2={28} y2={GY - 16} className={s.limb} />
                    <line x1={28} y1={GY - 31} x2={X0 - 2} y2={GY - 36} className={s.limb} />
                    <line x1={28} y1={GY - 16} x2={22} y2={GY} className={s.limb} />
                    <line x1={28} y1={GY - 16} x2={34} y2={GY} className={s.limb} />
                  </g>

                  {/* cliff at the chosen distance, carrying its distance */}
                  {d && (
                    <g>
                      <path
                        d={`M${cx},${GY} L${cx},${GY - 74} L${cx + 6},${GY - 86} L${cx + 24},${GY - 86} L${cx + 24},${GY} Z`}
                        className={s.cliff}
                        style={{ transition: "d 0.3s ease" }}
                      />
                      <text x={Math.min(cx + 12, W - 4)} y={GY - 92} textAnchor={cx + 40 > W ? "end" : "middle"} className={s.lab}>
                        {d} m
                      </text>
                    </g>
                  )}

                  {/* the round trip: out above, back below */}
                  {d && (
                    <g key={shot}>
                      <line x1={X0 + 2} y1={GY - 56} x2={cx - 4} y2={GY - 56} className={s.path} markerEnd="url(#cc-head)" />
                      <line x1={cx - 4} y1={GY - 46} x2={X0 + 2} y2={GY - 46} className={s.path} markerEnd="url(#cc-head)" />
                      <g className={s.pulse} style={pulseStyle}>
                        <path d={`M${X0},${GY - 64} Q${X0 + 8},${GY - 51} ${X0},${GY - 38}`} className={s.front} />
                      </g>
                    </g>
                  )}

                  {/* readouts */}
                  <text x={X0 + 4} y={GY + 16} className={s.big}>
                    {d ? `echo ${fmtS(t)} s` : "echo –"}
                  </text>
                  <text x={X0 + 4} y={GY + 29} className={s.lab}>
                    {d ? `sound travelled ${2 * d} m` : "sound travelled –"}
                  </text>
                </svg>

                <p className={s.caption}>Still air, 20 °C.</p>
                <p className={s.seen}>{seenText}</p>

                <Row>
                  {DISTS.map((k) => (
                    <Control key={k} className={d === k ? "active" : ""} disabled={locked || d === k} onClick={() => pick(k)}>
                      {k} m: clap
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
