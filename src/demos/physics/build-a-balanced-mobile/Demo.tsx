"use client";

// Balance a loaded ruler. A uniform 1 m ruler (0.10 kg) carries a 0.10 kg lump on its
// 100 cm end. The learner moves the pivot; the beam hangs level only when the pivot is
// under the centre of mass, x = (0.10 x 50 + 0.10 x 100) / 0.20 = 75 cm.
//
// Physics: a rigid beam on a knife-edge pivot either balances (net torque zero) or
// tips until it rests on a stop; it has no in-between tilt, so the stage draws a fixed
// 8 degree tip in the direction of the net torque. Weightless pivot, rigid beam,
// the ruler's weight acts at its middle. The reveal unlocks once the loaded ruler is level.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const RULER_KG = 0.1;
const LUMP_KG = 0.1;
const LUMP_AT = 100; // cm
const G = 9.81;

const W = 320;
const H = 150;
const X0 = 24;
const PXCM = 2.72; // px per cm
const PIV_Y = 92; // pivot apex
const TABLE = 128;
const TIP = 8; // degrees

function com(lump: boolean) {
  const m = RULER_KG + (lump ? LUMP_KG : 0);
  return (RULER_KG * 50 + (lump ? LUMP_KG * LUMP_AT : 0)) / m;
}

/** Net torque about the pivot in N m, positive = right end goes down. */
function torque(p: number, lump: boolean) {
  const t = RULER_KG * G * (50 - p) + (lump ? LUMP_KG * G * (LUMP_AT - p) : 0);
  return t / 100;
}

export default function BalancedMobile({ slug }: { slug: string }) {
  const [p, setP] = useState(50);
  const [lump, setLump] = useState(true);
  const [levelAt, setLevelAt] = useState<number | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["balanced"]);

  const tq = torque(p, lump);
  const level = Math.abs(tq) < 1e-9;
  const angle = level ? 0 : tq > 0 ? TIP : -TIP;
  const check = (pp: number, ll: boolean) => {
    if (ll && Math.abs(torque(pp, ll)) < 1e-9) {
      setLevelAt(pp);
      reach("balanced");
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A uniform 1 m ruler (0.10 kg) has a 0.10 kg lump on its 100 cm end. Where must the pivot go to balance it?",
        options: ["50 cm", "75 cm", "90 cm"],
        answer: 1,
      }}
      exploreHint="Slide the pivot until the loaded ruler hangs level."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            It hung level with the pivot at <strong>{levelAt ?? com(true)} cm</strong>. With the pivot left of that, the lump
            end drops; right of it, the long end does. The ruler&apos;s own 0.10 kg acts at its middle, 50 cm, so there are two equal
            masses at 50 cm and 100 cm, and their average position is 75 cm.
          </p>
          <p>
            Each side then turns the beam equally: 0.10 kg sitting 25 cm to the left against 0.10 kg sitting 25 cm to the
            right. A heavier lump would pull the balance point further toward it.
          </p>
          <p className="muted">The balance point is the average position of all the mass, weighted by mass.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : level
            ? lump
              ? "Level."
              : "The bare ruler is level on its middle."
            : tq > 0
              ? "The right end drops."
              : "The left end drops.";
        const px = X0 + p * PXCM;
        const L = 100 * PXCM;
        return (
          <div className={s.wrap}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className={`stage-svg ${s.fit}`}
              role="img"
              aria-label={`Ruler on a pivot at ${p} cm: ${level ? "level" : tq > 0 ? "right end down" : "left end down"}`}
            >
              <line x1={4} y1={TABLE} x2={W - 4} y2={TABLE} className={s.table} />
              <path d={`M ${px} ${PIV_Y} L ${px - 11} ${TABLE} L ${px + 11} ${TABLE} Z`} className={s.pivot} />
              <g transform={`rotate(${angle} ${px} ${PIV_Y})`}>
                <rect x={X0} y={PIV_Y - 8} width={L} height={8} rx={1} className={s.ruler} />
                {Array.from({ length: 11 }, (_, i) => (
                  <line
                    key={i}
                    x1={X0 + i * 10 * PXCM}
                    y1={PIV_Y - 8}
                    x2={X0 + i * 10 * PXCM}
                    y2={PIV_Y - (i % 5 === 0 ? 2 : 4.5)}
                    className={s.tick}
                  />
                ))}
                {[0, 25, 50, 75].map((c) => (
                  <text key={c} x={X0 + c * PXCM} y={PIV_Y - 11} textAnchor="middle" className={s.small}>
                    {c}
                  </text>
                ))}
                {lump && (
                  <g>
                    <rect x={X0 + L - 20} y={PIV_Y - 30} width={20} height={22} rx={3} className={s.lump} />
                    <text x={X0 + L - 10} y={PIV_Y - 34} textAnchor="middle" className={s.small}>
                      0.10 kg
                    </text>
                  </g>
                )}
                <text x={X0 + 30 * PXCM} y={PIV_Y + 10} textAnchor="middle" className={s.small}>
                  ruler 0.10 kg
                </text>
              </g>
              <text x={px} y={TABLE + 13} textAnchor="middle" className={s.pivLabel}>
                {p} cm
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Pivot at"
              value={p}
              min={0}
              max={100}
              step={12.5}
              disabled={locked}
              format={(v) => `${v} cm`}
              onChange={(v) => {
                setP(v);
                check(v, lump);
              }}
            />
            <Row>
              <Control
                className={lump ? "active" : ""}
                disabled={locked}
                onClick={() => {
                  setLump((l) => !l);
                  check(p, !lump);
                }}
              >
                {lump ? "Lump: on" : "Lump: off"}
              </Control>
              <Readout label="Beam" value={locked ? "?" : level ? "level" : tq > 0 ? "right down" : "left down"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
