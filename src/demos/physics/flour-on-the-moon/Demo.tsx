"use client";

// Mass vs weight. A 1 kg bag of flour hangs from a spring scale (which measures
// the pull of gravity, in newtons) and sits on a balance against a 1 kg mass
// (which compares masses). Change the world: the spring scale reading changes,
// the balance stays level.
//
// Physics: weight W = m g. Surface gravity (NASA planetary fact sheets): Earth
// 9.81, Moon 1.62, Mars 3.71, Jupiter 24.79 m/s^2 (Jupiter's at the 1 bar level;
// it has no solid surface). Ideal linear spring: stretch proportional to force.
// A balance compares two weights in the same gravity, so g cancels.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const WORLDS = [
  { name: "Earth", g: 9.81 },
  { name: "Moon", g: 1.62 },
  { name: "Mars", g: 3.71 },
  { name: "Jupiter", g: 24.79 },
];
const M = 1; // kg

const W = 300;
const H = 200;
const SX = 70; // spring scale x
const S_TOP = 22;
const PX_PER_N = 4.4; // spring stretch
const SPRING0 = 26; // unstretched length, px
const BX = 210; // balance pivot x
const BY = 120;

function springPath(x: number, y0: number, len: number) {
  const coils = 10;
  const pts = [`M ${x} ${y0}`, `L ${x} ${y0 + 4}`];
  for (let i = 0; i < coils; i++) {
    const y = y0 + 4 + ((i + 0.5) * (len - 8)) / coils;
    pts.push(`L ${x + (i % 2 ? -7 : 7)} ${y.toFixed(1)}`);
  }
  pts.push(`L ${x} ${y0 + len - 4}`, `L ${x} ${y0 + len}`);
  return pts.join(" ");
}

export default function FlourOnTheMoon({ slug }: { slug: string }) {
  const [world, setWorld] = useState(0);
  const [wobble, setWobble] = useState(0);
  const [seenMoon, setSeenMoon] = useState(false);
  const w = WORLDS[world];
  const weight = M * w.g;
  const len = SPRING0 + weight * PX_PER_N;
  const bagY = S_TOP + len;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You take a 1 kg bag of flour from Earth to the Moon, where gravity is weaker. What changes?",
        options: ["Its mass", "Its weight", "Both its mass and its weight"],
        answer: 1,
      }}
      exploreHint="Take the flour to the Moon, then to the other worlds. Watch both instruments."
      reveal={() => (
        <>
          <p>
            The spring scale fell from <strong>9.81 N</strong> on Earth to <strong>1.62 N</strong> on the Moon: that is
            weight, how hard a world pulls on the flour. The balance stayed level everywhere, because it compares the
            flour with a 1 kg mass and gravity pulls both equally.
          </p>
          <p>
            So the mass, how much flour there is, stays 1 kg anywhere. Weight is mass times the local gravity: W = m g.
          </p>
          <p className="muted">A bathroom scale is a spring scale: on the Moon it would read about a sixth.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (i: number) => {
          if (locked || i === world) return;
          setWorld(i);
          setWobble((n) => n + 1);
          if (seenMoon || i === 1) {
            setSeenMoon(true);
            interact(); // the reveal needs the Moon reading to have been seen
          }
        };
        const caption = locked
          ? "Make a prediction to start."
          : world === 0
            ? "Spring scale: measures the pull. Balance: compares masses."
            : `On ${w.name}: the spring changed. The balance did not.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`On ${w.name}, the spring scale reads ${weight.toFixed(2)} newtons and the balance is level`}>
              {/* spring scale */}
              <line x1={SX - 24} y1={S_TOP} x2={SX + 24} y2={S_TOP} className={s.beam} />
              <path d={springPath(SX, S_TOP, len)} className={s.spring} />
              {/* newton scale beside the spring */}
              <line x1={SX + 22} y1={S_TOP + SPRING0} x2={SX + 22} y2={S_TOP + SPRING0 + 25 * PX_PER_N} className={s.scale} />
              {[0, 5, 10, 15, 20, 25].map((n) => (
                <g key={n}>
                  <line x1={SX + 18} y1={S_TOP + SPRING0 + n * PX_PER_N} x2={SX + 26} y2={S_TOP + SPRING0 + n * PX_PER_N} className={s.scale} />
                  <text x={SX + 30} y={S_TOP + SPRING0 + n * PX_PER_N + 3} className={s.tick}>
                    {n} N
                  </text>
                </g>
              ))}
              <path d={`M ${SX + 8} ${bagY} L ${SX + 20} ${bagY}`} className={s.pointer} />
              <g transform={`translate(${SX} ${bagY})`}>
                <path d="M -13 4 L 13 4 L 15 30 Q 0 34 -15 30 Z" className={s.bag} />
                <text x={0} y={22} textAnchor="middle" className={s.bagText}>
                  1 kg
                </text>
              </g>

              {/* balance: flour vs a 1 kg mass */}
              <g key={wobble} className={wobble ? s.wobble : undefined} style={{ transformOrigin: `${BX}px ${BY}px` }}>
                <line x1={BX - 52} y1={BY} x2={BX + 52} y2={BY} className={s.beam} />
                <line x1={BX - 48} y1={BY} x2={BX - 48} y2={BY + 22} className={s.hanger} />
                <line x1={BX + 48} y1={BY} x2={BX + 48} y2={BY + 22} className={s.hanger} />
                <line x1={BX - 64} y1={BY + 22} x2={BX - 32} y2={BY + 22} className={s.pan} />
                <line x1={BX + 32} y1={BY + 22} x2={BX + 64} y2={BY + 22} className={s.pan} />
                <path d={`M ${BX - 60} ${BY + 21} L ${BX - 36} ${BY + 21} L ${BX - 38} ${BY + 2} Q ${BX - 48} ${BY - 1} ${BX - 58} ${BY + 2} Z`} className={s.bag} />
                <rect x={BX + 38} y={BY + 6} width={20} height={15} rx={2} className={s.weight} />
                <text x={BX + 48} y={BY + 17} textAnchor="middle" className={s.weightText}>
                  1 kg
                </text>
              </g>
              <path d={`M ${BX} ${BY} L ${BX - 9} ${BY + 60} L ${BX + 9} ${BY + 60} Z`} className={s.stand} />
              <line x1={BX - 30} y1={BY + 60} x2={BX + 30} y2={BY + 60} className={s.beam} />
              <text x={BX} y={BY + 76} textAnchor="middle" className={s.level}>
                level
              </text>
              <text x={W / 2} y={H - 4} textAnchor="middle" className={s.world}>
                {w.name}
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              {WORLDS.map((wd, i) => (
                <Control key={wd.name} className={i === world ? "active" : ""} disabled={locked || i === world} aria-pressed={i === world} onClick={() => go(i)}>
                  {wd.name}
                </Control>
              ))}
            </Row>
            <Row>
              <Readout label="Spring scale" value={`${weight.toFixed(2)} N`} />
              <Readout label="Gravity" value={`${w.g} m/s²`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
