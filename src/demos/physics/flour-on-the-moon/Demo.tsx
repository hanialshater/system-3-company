"use client";

// Mass vs weight. A 1 kg bag of flour hangs from a spring scale (which measures
// the pull of gravity, in newtons) and sits on a balance against a 1 kg mass
// (which compares masses). Change the world: the spring scale reading changes,
// the balance stays level.
//
// Physics: weight W = m g. Surface gravity: Earth 9.81 (standard), Moon 1.62,
// Mars 3.73 (NASA Mars fact sheet, mean), Jupiter 23.12 m/s^2 (NASA Jupiter fact
// sheet, equatorial at the 1 bar level; it has no solid surface). Ideal linear spring:
// stretch proportional to force. A balance compares two weights in the same gravity,
// so g cancels.
// v3: mass and pull (newtons) are defined on the locked stage, before the question is answered.
// v2: the spring scale is marked in kg for Earth, like a kitchen or bathroom scale, so
// the learner sees a "kg" reading that is really a pull. Pull arrows on both balance pans
// grow and shrink together. Question asks which instrument changes (no definitions needed).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const WORLDS = [
  { name: "Earth", g: 9.81 },
  { name: "Moon", g: 1.62 },
  { name: "Mars", g: 3.73 },
  { name: "Jupiter", g: 23.12 },
];
const G_EARTH = WORLDS[0].g;
const PULL_PX = 1.6; // balance pull arrows, px per N
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
  const w = WORLDS[world];
  const weight = M * w.g;
  const len = SPRING0 + weight * PX_PER_N;
  const bagY = S_TOP + len;
  const shownKg = weight / G_EARTH; // what a spring scale marked in Earth-kg shows
  const pct = Math.round((100 * w.g) / G_EARTH);
  const moonKg = (M * WORLDS[1].g) / G_EARTH;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1 kg bag of flour goes to the Moon, where gravity is weaker. Which reading changes?",
        options: [
          "The balance (flour vs a 1 kg block) tips",
          "The hanging spring scale reads less",
          "Both change",
        ],
        answer: 1,
      }}
      exploreHint="Take the flour to the Moon, then the other worlds. Watch the spring and the arrows."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            On the Moon the pull fell from <strong>{(M * G_EARTH).toFixed(2)} N</strong> to{" "}
            <strong>{(M * WORLDS[1].g).toFixed(2)} N</strong>, so the spring, marked in kg for Earth, showed{" "}
            <strong>{moonKg.toFixed(2)} kg</strong>. The balance stayed level: its two pull arrows shrank together, because
            gravity pulls the flour and the 1 kg block equally.
          </p>
          <p>
            In everyday talk, &ldquo;weight&rdquo; is the kg a scale shows. Physics splits it in two: mass, how much flour
            there is, stays 1 kg anywhere; weight, the pull, is mass times the local gravity (W = m g).
          </p>
          <p className="muted">A bathroom scale is a spring scale marked in kg for Earth: on the Moon it shows about a sixth.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["moon"]}>
          {(reach) => {
        const go = (i: number) => {
          if (locked || i === world) return;
          setWorld(i);
          setWobble((n) => n + 1);
          if (i === 1) reach("moon"); // the reveal quotes the Moon reading
        };
        const caption = locked
          ? "Mass: how much flour (1 kg). Pull: gravity's tug on it, in newtons (N). Predict which reading changes."
          : world === 0
            ? "Earth: gravity pulls the 1 kg bag with 9.81 N. The spring is marked in kg for Earth."
            : `${w.name}: pull is ${pct}% of Earth's. Spring shows ${shownKg.toFixed(2)} kg. Balance still level.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`On ${w.name}, the pull is ${weight.toFixed(2)} newtons, the spring scale shows ${shownKg.toFixed(2)} kg and the balance is level`}>
              {/* spring scale */}
              <line x1={SX - 24} y1={S_TOP} x2={SX + 24} y2={S_TOP} className={s.beam} />
              <path d={springPath(SX, S_TOP, len)} className={s.spring} />
              {/* newton scale beside the spring */}
              <line x1={SX + 22} y1={S_TOP + SPRING0} x2={SX + 22} y2={S_TOP + SPRING0 + 2.5 * G_EARTH * PX_PER_N} className={s.scale} />
              {[0, 0.5, 1, 1.5, 2, 2.5].map((kg) => (
                <g key={kg}>
                  <line x1={SX + 18} y1={S_TOP + SPRING0 + kg * G_EARTH * PX_PER_N} x2={SX + 26} y2={S_TOP + SPRING0 + kg * G_EARTH * PX_PER_N} className={s.scale} />
                  <text x={SX + 30} y={S_TOP + SPRING0 + kg * G_EARTH * PX_PER_N + 3} className={s.tick}>
                    {kg} kg
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
              {[-48, 48].map((dx) => (
                <g key={dx}>
                  <line x1={BX + dx} y1={BY + 24} x2={BX + dx} y2={BY + 24 + weight * PULL_PX} className={s.arrow} />
                  <path d={`M ${BX + dx - 4} ${BY + 20 + weight * PULL_PX} L ${BX + dx} ${BY + 26 + weight * PULL_PX} L ${BX + dx + 4} ${BY + 20 + weight * PULL_PX} Z`} className={s.arrowHead} />
                </g>
              ))}
              <text x={BX + 54} y={BY + 40} textAnchor="start" className={s.tick}>
                pull
              </text>
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
              <Readout label="Pull on bag" value={`${weight.toFixed(2)} N`} />
              <Readout label="Spring shows" value={`${shownKg.toFixed(2)} kg`} />
              <Readout label="Balance" value="level" />
            </Row>
          </div>
        );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
