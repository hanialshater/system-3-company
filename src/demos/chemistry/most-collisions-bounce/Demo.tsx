"use client";

// Toy collision theory. Molecule B is fired at molecule A with random orientations (seeded).
// Each has a reactive face covering a quarter of its directions (a 90° arc). A shot reacts only
// if A's face points at B and B's face points at A: 1/4 x 1/4 = 1/16 of random shots.
// Top: the latest collision. Below: one dot per shot, 16 to a row, filled for a reaction.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const FACE = 90; // degrees of each molecule's surface that can react
const SHARE = (FACE / 360) * (FACE / 360); // 1/16
const ONE_IN = Math.round(1 / SHARE); // 16
const SEED = 1; // untuned: the first seed tried
const MAX = 192;
const NEED = 100;
const NAMES = ["hundred"] as const;

type Shot = { a: number; b: number; hit: boolean };
// Is direction `dir` (degrees) inside the face centred on `face`?
const within = (face: number, dir: number) => Math.abs((((dir - face) % 360) + 540) % 360 - 180) <= FACE / 2;

const W = 320;
const RAD = 24;
const AX = 186;
const BX = AX - 2 * RAD;
const MY = 44;
const GRID_TOP = 104;
const COLS = 16;
const ROW_H = 8;
const H = GRID_TOP + (MAX / COLS) * ROW_H + 6;

const rad = (d: number) => (d * Math.PI) / 180;
function arc(cx: number, cy: number, r: number, centre: number) {
  const a0 = rad(centre - FACE / 2);
  const a1 = rad(centre + FACE / 2);
  return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
}

export default function MostCollisionsBounce({ slug }: { slug: string }) {
  const rng = useRef(mulberry32(SEED));
  const [shots, setShots] = useState<Shot[]>([]);
  const [best, setBest] = useState<{ n: number; hits: number } | null>(null);

  const hits = shots.filter((x) => x.hit).length;
  const last = shots[shots.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Toy model: a reaction needs A's reactive face (a quarter of its surface) to meet B's (also a quarter). Of random, energetic collisions, about how many react?",
        options: ["1 in 2", `1 in ${ONE_IN}`, "1 in 4"],
        answer: 1,
      }}
      exploreHint={`Fire ${NEED} random collisions and count the reactions.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {best
              ? `In your ${best.n} random collisions, ${best.hits} reacted: about 1 in ${(best.n / Math.max(1, best.hits)).toFixed(0)}.`
              : `Fire ${NEED} collisions and only a handful react.`}{" "}
            The rule gives <strong>1 in {ONE_IN}</strong>: A&apos;s face points the right way a quarter of the time, and
            B&apos;s a quarter of those times, ¼ × ¼ = 1/{ONE_IN}. One run of a hundred wobbles around that.
          </p>
          <p>
            Every shot had enough energy; most still bounced. Real molecules also need the right orientation, so the
            reaction rate is far lower than the collision rate. How strict the orientation is varies from reaction to
            reaction; the quarter faces here are a toy.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const fire = (n: number) => {
              const next = [...shots];
              for (let i = 0; i < n; i++) {
                const a = rng.current() * 360; // A's face direction
                const b = rng.current() * 360; // B's face direction
                next.push({ a, b, hit: within(a, 180) && within(b, 0) });
              }
              setShots(next);
              const h = next.filter((x) => x.hit).length;
              if (next.length >= NEED && h >= 1) {
                setBest((p) => (p && p.n >= next.length ? p : { n: next.length, hits: h }));
                reach("hundred");
              }
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${shots.length} collisions, ${hits} reacted${last ? `; the last one ${last.hit ? "reacted" : "bounced"}` : ""}`}
                >
                  <line x1={20} x2={BX - RAD - 6} y1={MY} y2={MY} className={s.path} />
                  <g className={last?.hit ? s.glow : undefined}>
                    <circle cx={BX} cy={MY} r={RAD} className={s.mol} />
                    <circle cx={AX} cy={MY} r={RAD} className={s.mol} />
                    {last && (
                      <>
                        <path d={arc(BX, MY, RAD - 3, last.b)} className={within(last.b, 0) ? s.faceOn : s.face} />
                        <path d={arc(AX, MY, RAD - 3, last.a)} className={within(last.a, 180) ? s.faceOn : s.face} />
                      </>
                    )}
                  </g>
                  <text x={BX} y={MY + 4} textAnchor="middle" className={s.sym}>
                    B
                  </text>
                  <text x={AX} y={MY + 4} textAnchor="middle" className={s.sym}>
                    A
                  </text>
                  <text x={AX + RAD + 8} y={MY + 4} className={s.label}>
                    {last ? (last.hit ? "reacts" : "bounces") : ""}
                  </text>
                  <text x={W / 2} y={GRID_TOP - 16} textAnchor="middle" className={s.small}>
                    Toy model · thick arc = reactive face · one dot per shot
                  </text>
                  {shots.map((x, i) => (
                    <circle
                      key={i}
                      cx={16 + (i % COLS) * 18.5}
                      cy={GRID_TOP + Math.floor(i / COLS) * ROW_H}
                      r={x.hit ? 3.4 : 2.2}
                      className={x.hit ? s.hit : s.miss}
                    />
                  ))}
                </svg>
                <Row>
                  <Control onClick={() => fire(NEED)} disabled={locked || shots.length + NEED > MAX}>
                    Fire {NEED}
                  </Control>
                  <Control onClick={() => fire(10)} disabled={locked || shots.length + 10 > MAX}>
                    Fire 10
                  </Control>
                  <Control onClick={() => fire(1)} disabled={locked || shots.length + 1 > MAX}>
                    Fire 1
                  </Control>
                  <Control onClick={() => setShots([])} disabled={locked || shots.length === 0}>
                    Clear
                  </Control>
                </Row>
                <Row>
                  <Readout label="Collisions" value={shots.length} />
                  <Readout label="Reacted" value={hits} />
                  <Readout label="Share" value={hits ? `1 in ${(shots.length / hits).toFixed(0)}` : "none yet"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
