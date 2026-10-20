"use client";

// Balance a loaded ruler. A uniform 1 m ruler (0.10 kg) carries a 0.10 kg lump on its
// 100 cm end. The learner moves the pivot; the beam hangs level only when the pivot is
// under the centre of mass, x = (0.10 x 50 + 0.10 x 100) / 0.20 = 75 cm.
//
// Physics: a rigid beam on a knife-edge pivot either balances (net torque zero) or
// tips until it rests on a stop; it has no in-between tilt, so the stage draws a fixed
// 8 degree tip in the direction of the net torque. Weightless pivot, rigid beam,
// the ruler's weight acts at its middle (drawn as an arrow there).
//
// v2: the lump starts off (bare ruler level on its middle) and the "Add lump" button comes
// first in DOM order, so the QA path is: add lump (lump end drops), then two slider steps
// 50 -> 62.5 -> 75 cm (level). The last screen before the reveal is the loaded ruler, level.
// Each weight's distance from the pivot is drawn on the beam, and the "Turn" readouts show
// kg x cm on each side, so "equal turning" is on the stage before the reveal uses it.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const RULER_KG = 0.1;
const RULER_AT = 50; // cm
const LUMP_KG = 0.1;
const LUMP_AT = 100; // cm

const W = 320;
const H = 160;
const X0 = 24;
const PXCM = 2.72; // px per cm
const PIV_Y = 102; // pivot apex
const TABLE = 138;
const TIP = 8; // degrees

function com(lump: boolean) {
  const m = RULER_KG + (lump ? LUMP_KG : 0);
  return (RULER_KG * RULER_AT + (lump ? LUMP_KG * LUMP_AT : 0)) / m;
}

/** Turning effect (kg x cm) on each side of the pivot. */
function turns(p: number, lump: boolean) {
  const masses = [{ m: RULER_KG, x: RULER_AT }, ...(lump ? [{ m: LUMP_KG, x: LUMP_AT }] : [])];
  let left = 0;
  let right = 0;
  for (const { m, x } of masses) {
    if (x < p) left += m * (p - x);
    else right += m * (x - p);
  }
  return { left, right };
}

const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? v.toFixed(0) : String(Number(v.toFixed(3))));

export default function BalancedMobile({ slug }: { slug: string }) {
  const [p, setP] = useState(50);
  const [lump, setLump] = useState(false);
  const [levelAt, setLevelAt] = useState<number | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["balanced"]);

  const { left, right } = turns(p, lump);
  const tq = right - left; // positive = right (lump) end goes down
  const level = Math.abs(tq) < 1e-9;
  const angle = level ? 0 : tq > 0 ? TIP : -TIP;
  const check = (pp: number, ll: boolean) => {
    const t = turns(pp, ll);
    if (ll && Math.abs(t.right - t.left) < 1e-9) {
      setLevelAt(pp);
      reach("balanced");
    }
  };
  const balanceAt = levelAt ?? com(true);
  const arm = LUMP_AT - balanceAt;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Building a mobile, you hang a uniform 1 m ruler (0.10 kg) with a 0.10 kg lump on its 100 cm end. Where must the string (the pivot) go to balance it?",
        options: ["50 cm", "75 cm", "90 cm"],
        answer: 1,
      }}
      exploreHint="Add the lump, then slide the pivot until the ruler hangs level."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            With the lump on, the ruler hung level with the pivot at <strong>{balanceAt} cm</strong>. The ruler&apos;s own
            0.10 kg acts at its middle, 50 cm, which is why the bare ruler balanced there.
          </p>
          <p>
            A weight turns the beam more the further it sits from the pivot: weight × distance. At {balanceAt} cm the
            ruler&apos;s weight sits {balanceAt - RULER_AT} cm left and the lump {arm} cm right: 0.10 × {arm} on each
            side, so neither side wins. The balance point is the average position of all the mass, weighted by mass.
          </p>
          <p className="muted">A heavier lump would pull the balance point further toward it.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "The arrow marks where the ruler's own weight acts."
          : level
            ? lump
              ? "Level: equal turning on both sides."
              : "The bare ruler is level on its middle."
            : tq > 0
              ? `The ${lump ? "lump" : "right"} end drops.`
              : `The ${lump ? "bare" : "left"} end drops.`;
        const px = X0 + p * PXCM;
        const L = 100 * PXCM;
        const xr = X0 + RULER_AT * PXCM;
        const xl = X0 + LUMP_AT * PXCM;
        const armY = PIV_Y - 48;
        const arms = [
          { x: xr, d: Math.abs(RULER_AT - p), key: "r" },
          ...(lump ? [{ x: xl - 10, d: Math.abs(LUMP_AT - p), key: "l" }] : []),
        ].filter((a) => a.d > 0);
        return (
          <div className={s.wrap}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className={`stage-svg ${s.fit}`}
              role="img"
              aria-label={`Ruler on a pivot at ${p} cm, lump ${lump ? "on" : "off"}: ${level ? "level" : tq > 0 ? "right end down" : "left end down"}`}
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
                {/* the ruler's own weight, acting at its middle */}
                <line x1={xr} y1={PIV_Y} x2={xr} y2={PIV_Y + 16} className={s.wArrow} />
                <path d={`M ${xr - 3.5} ${PIV_Y + 12} L ${xr} ${PIV_Y + 18} L ${xr + 3.5} ${PIV_Y + 12} Z`} className={s.wHead} />
                <text x={xr - 6} y={PIV_Y + 28} textAnchor="end" className={s.small}>
                  ruler&apos;s weight 0.10 kg
                </text>
                {lump ? (
                  <rect x={xl - 20} y={PIV_Y - 30} width={20} height={22} rx={3} className={s.lump} />
                ) : (
                  <rect x={xl - 20} y={PIV_Y - 30} width={20} height={22} rx={3} className={s.ghost} />
                )}
                <text x={xl - 10} y={PIV_Y - 34} textAnchor="middle" className={s.small}>
                  {lump ? "lump 0.10 kg" : "lump (off)"}
                </text>
                {/* distance of each weight from the pivot */}
                {!locked &&
                  arms.map((a) => {
                    const y = a.key === "l" ? armY - 12 : armY;
                    return (
                    <g key={a.key}>
                      <line x1={px} y1={y} x2={a.x} y2={y} className={s.arm} />
                      <line x1={a.x} y1={y - 3} x2={a.x} y2={y + 3} className={s.arm} />
                      <text x={(px + a.x) / 2} y={y - 4} textAnchor="middle" className={s.armLabel}>
                        {fmt(a.d)} cm
                      </text>
                    </g>
                    );
                  })}
                {!locked && <line x1={px} y1={armY - 16} x2={px} y2={PIV_Y - 8} className={s.armTick} />}
              </g>
              <text x={px} y={TABLE + 13} textAnchor="middle" className={s.pivLabel}>
                {p} cm
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Control
                className={lump ? "active" : ""}
                disabled={locked}
                onClick={() => {
                  setLump((l) => !l);
                  check(p, !lump);
                }}
              >
                {lump ? "Remove lump" : "Add lump"}
              </Control>
              <Readout label="Left turn (kg×cm)" value={locked ? "?" : fmt(left)} />
              <Readout label="Right turn (kg×cm)" value={locked ? "?" : fmt(right)} />
            </Row>
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
          </div>
        );
      }}
    </Lesson>
  );
}
