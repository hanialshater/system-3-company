"use client";

// One fixed box of air (say, a lungful). Each dot is 0.5 kPa of air pressure; oxygen dots are
// coloured. Pressure at altitude follows the standard atmosphere (ISA troposphere formula).
// Oxygen stays 20.95% of the dots at every height; what falls is the total, so the oxygen's
// pressure (fraction × total) falls with it.
// Key state: the summit, 8,849 m: about 31 kPa total, about 6.6 kPa oxygen, and still 21%.
// Milestone `summit`. The summit button is the last control so QA ends on it.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const P0 = 101.325; // kPa, sea level
const O2 = 0.2095; // fraction of dry air
const SUMMIT = 8849; // m, Everest
const press = (h: number) => P0 * Math.pow(1 - 2.25577e-5 * h, 5.25588); // ISA, kPa
const PER_DOT = 0.5; // kPa per dot
const SUMMIT_P = press(SUMMIT);
const SUMMIT_O2 = O2 * SUMMIT_P;
const NAMES = ["summit"] as const;

const W = 320;
const H = 150;
const COLS = 21;
const ROWS = 10;

export default function SameAirLessOxygen({ slug }: { slug: string }) {
  const [h, setH] = useState(0);
  const p = press(h);
  const nDots = Math.round(p / PER_DOT);
  const nO2 = Math.round((O2 * p) / PER_DOT);
  // Fixed shuffled grid cells so dots look scattered but stay put as they thin out.
  const cells = useMemo(() => {
    const r = mulberry32(7);
    const c = Array.from({ length: COLS * ROWS }, (_, i) => i);
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c.map((k) => ({ x: 22 + (k % COLS) * 13.5 + (Math.floor(k / COLS) % 2) * 4, y: 14 + Math.floor(k / COLS) * 12.4 }));
  }, []);
  // Oxygen dots spread through the box: every k-th dot.
  const o2Set = new Set(Array.from({ length: nO2 }, (_, j) => Math.floor((j * nDots) / nO2)));
  const isO2 = (i: number) => o2Set.has(i);
  const atSummit = h === SUMMIT;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Air is 21% oxygen at every height. On Everest's summit the air pressure is about ${Math.round(SUMMIT_P)} kPa (sea level: ${Math.round(P0)} kPa). The oxygen's part of that pressure is about…`,
        options: [`${SUMMIT_O2.toFixed(1)} kPa`, "21 kPa", "0.21 kPa"],
        answer: 0,
      }}
      exploreHint="Climb, then go to the summit. Watch the coloured oxygen dots."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            On the summit your box held {Math.round(SUMMIT_P / PER_DOT)} dots instead of {Math.round(P0 / PER_DOT)}, and still 21%
            of them were oxygen: about <strong>{SUMMIT_O2.toFixed(1)} kPa</strong> of oxygen, against {(O2 * P0).toFixed(1)} kPa at
            sea level.
          </p>
          <p>
            Each gas in a mix pushes its share of the total pressure. The air up high is not poorer in oxygen; it is thinner,
            so each breath holds about a third as much.
          </p>
          <p className="muted">Standard-atmosphere model; measured summit pressure is a little higher, about 34 kPa.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const go = (v: number) => {
              setH(v);
              if (v === SUMMIT) reach("summit");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${nDots} air dots, ${nO2} oxygen`}>
                  <rect x={12} y={4} width={W - 24} height={H - 24} rx={8} className={s.box} />
                  {cells.slice(0, nDots).map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={isO2(i) ? 3.6 : 2.4} className={isO2(i) ? s.o2 : s.n2} />
                  ))}
                  <text x={W / 2} y={H - 7} textAnchor="middle" className={s.small}>
                    one box of air · 1 dot = {PER_DOT} kPa · standard atmosphere
                  </text>
                </svg>
                <Row>
                  <Readout label="Air" value={`${p.toFixed(1)} kPa`} />
                  <Readout label="Oxygen share" value={`${Math.round((nO2 / nDots) * 100)}%`} />
                  <Readout label="Oxygen" value={`${(O2 * p).toFixed(1)} kPa`} />
                </Row>
                <Slider
                  label="Height"
                  value={h}
                  min={0}
                  max={SUMMIT}
                  step={1}
                  onChange={go}
                  disabled={locked}
                  format={(v) => `${v.toLocaleString("en-US")} m`}
                />
                <Row>
                  <Control onClick={() => go(0)} disabled={locked || h === 0}>
                    Sea level
                  </Control>
                  <Control onClick={() => go(SUMMIT)} disabled={locked || atSummit} className={atSummit ? "active" : ""}>
                    Summit, {SUMMIT.toLocaleString("en-US")} m
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
