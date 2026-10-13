"use client";

// Static friction. A 20 kg crate on a floor with mu_s = 0.50 (illustrative): the floor can
// grip with up to mu_s m g = 0.50 x 20 x 9.81 = 98.1 N. While the crate stays still the net
// force is zero, so static friction equals the push exactly (it adjusts). Only a push above
// 98.1 N makes it slip. Side view, both arrows on one scale (0.9 px per N), with a tick on
// the friction line marking the 98.1 N limit. Sliding friction is not modelled (no number).
//
// Earned reveal: milestone "matched-twice" when the learner has held the crate still at two
// different nonzero pushes and seen friction match each. QA: two slider presses, 20 -> 30 -> 40 N.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M = 20;
const MU_S = 0.5;
const LIMIT = MU_S * M * G; // 98.1 N
const K = 0.9; // px per N
const W = 320;
const H = 150;
const FLOOR = 112;
const CRATE_X = 128;
const CRATE_W = 64;
const n0 = (v: number) => `${v.toFixed(0)} N`;

export default function CrateWontBudge({ slug }: { slug: string }) {
  const [push, setPush] = useState(20);
  const [held, setHeld] = useState<number[]>([]);
  const [slipped, setSlipped] = useState(false);
  const slips = push > LIMIT;
  const friction = slips ? null : push;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${M} kg crate can grip the floor with up to ${LIMIT.toFixed(1)} N of friction before it slips. You push with 50 N and it does not move. The friction on it is…`,
        options: [`${LIMIT.toFixed(1)} N`, "50 N", "0 N"],
        answer: 1,
      }}
      exploreHint="Push at a few strengths and compare friction with your push."
      reveal={() => (
        <>
          <p>
            You pushed with {held.slice(0, 3).map(n0).join(", ")} and the crate stayed put; friction read{" "}
            <strong>exactly your push</strong> each time.{" "}
            {slipped ? `Past ${LIMIT.toFixed(1)} N it broke free.` : `Only past ${LIMIT.toFixed(1)} N would it slip.`}
          </p>
          <p>
            A crate that is not moving has no net force on it, so friction must cancel the push: at 50 N it is 50 N, not{" "}
            {LIMIT.toFixed(1)} N. The {LIMIT.toFixed(1)} N (μs × m × g = 0.50 × 20 × 9.81) is a ceiling, not a fixed amount.
          </p>
          <p className="muted">μs = 0.50 is an illustrative value; real crates and floors vary.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["matched-twice"]}>
          {(reach) => {
            const shift = slips && !locked ? 46 : 0;
            const cx = CRATE_X + shift;
            const midY = FLOOR - 26;
            const fx = cx + CRATE_W / 2;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Push ${n0(push)}; ${slips ? "slipping" : "still"}`}>
                  <defs>
                    {[
                      ["cw-p", s.headP],
                      ["cw-f", s.headF],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>
                  <line x1={4} y1={FLOOR} x2={W - 4} y2={FLOOR} className={s.floor} />
                  {slips && !locked && (
                    <g className={s.motion}>
                      {[0, 1, 2].map((i) => (
                        <line key={i} x1={CRATE_X + 6} y1={FLOOR - 14 - i * 14} x2={cx - 6} y2={FLOOR - 14 - i * 14} />
                      ))}
                    </g>
                  )}
                  <rect x={cx} y={FLOOR - 52} width={CRATE_W} height={52} className={s.crate} />
                  <text x={cx + CRATE_W / 2} y={FLOOR - 22} textAnchor="middle" className={s.crateLabel}>
                    {M} kg
                  </text>
                  {/* push */}
                  {push > 0 && (
                    <line x1={cx - push * K - 2} y1={midY} x2={cx - 2} y2={midY} className={s.push} markerEnd="url(#cw-p)" />
                  )}
                  <text x={Math.max(4, cx - push * K - 2)} y={midY - 8} className={s.labP}>
                    push {n0(push)}
                  </text>
                  {/* friction from the floor, along the contact, pointing back */}
                  {!locked && (
                    <>
                      <line x1={fx - LIMIT * K} y1={FLOOR + 8} x2={fx - LIMIT * K} y2={FLOOR + 18} className={s.limit} />
                      <text x={fx - LIMIT * K} y={FLOOR + 30} textAnchor="middle" className={s.labLimit}>
                        grip limit {LIMIT.toFixed(1)} N
                      </text>
                      {friction !== null && friction > 0 && (
                        <line x1={fx} y1={FLOOR + 13} x2={fx - friction * K} y2={FLOOR + 13} className={s.fric} markerEnd="url(#cw-f)" />
                      )}
                      <text x={fx + 6} y={FLOOR + 16} className={s.labF}>
                        {friction === null ? "slips!" : `friction ${n0(friction)}`}
                      </text>
                    </>
                  )}
                  <text x={4} y={12} className={s.chip}>
                    Side view. Floor grip μs = 0.50 (illustrative).
                  </text>
                </svg>

                <Slider
                  label="Your push"
                  value={push}
                  min={0}
                  max={120}
                  step={10}
                  disabled={locked}
                  format={n0}
                  onChange={(v) => {
                    setPush(v);
                    if (v > LIMIT) setSlipped(true);
                    if (v > 0 && v <= LIMIT && !held.includes(v)) {
                      const next = [...held, v];
                      setHeld(next);
                      if (next.length >= 2) reach("matched-twice");
                    }
                  }}
                />
                <Row>
                  <Readout label="Push" value={n0(push)} />
                  <Readout label="Friction" value={locked ? "?" : friction === null ? "sliding" : n0(friction)} />
                  <Readout label="Crate" value={locked ? "?" : slips ? "slides" : "still"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
