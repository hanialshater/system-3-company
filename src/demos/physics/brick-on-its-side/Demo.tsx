"use client";

// Brick on its side. A 2 kg brick (24 x 12 x 4 cm, illustrative) is pulled at steady
// speed across a table (mu = 0.40) by a spring scale. Each face button turns the brick
// onto that face and pulls it; the scale reads the kinetic friction f = mu m g, which has
// no area term (Amontons). The contact area readout changes 288 / 96 / 48 cm^2; the pull
// does not. A mass slider shows what does change it: how hard the brick presses down.
// Side view, one scale: 4 px per cm.
//
// Earned reveal: milestones "first-pull" and "second-face" (pulled on two different faces).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const MU = 0.4;
const pull = (m: number) => MU * m * G; // N
const FACES = [
  { id: "wide", label: "Wide face", len: 24, ht: 4, area: 24 * 12 },
  { id: "side", label: "Long side", len: 24, ht: 12, area: 24 * 4 },
  { id: "end", label: "End", len: 4, ht: 24, area: 12 * 4 },
] as const;

const W = 320;
const H = 132;
const K = 4; // px per cm
const TABLE_Y = 112;
const X_START = 24;

export default function BrickOnItsSide({ slug }: { slug: string }) {
  const [face, setFace] = useState(0);
  const [mass, setMass] = useState(2);
  const [log, setLog] = useState<{ i: number; m: number }[]>([]); // pulls, in order, with the mass used
  const pulled = log.map((e) => e.i);
  const [shift, setShift] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 2 kg brick, wide face down, needs a steady pull of 7.8 N on a table (μ = 0.40). Stood on a face with one third of the area, it needs…",
        options: ["About 7.8 N", "About 2.6 N", "About 23 N"],
        answer: 0,
      }}
      exploreHint="Pull the brick on two different faces and read the scale."
      minInteractions={2}
      reveal={() => {
        const reads = log.map((e) => `${FACES[e.i].label.toLowerCase()} (${FACES[e.i].area} cm²) ${pull(e.m).toFixed(1)} N at ${e.m} kg`);
        return (
          <>
            <p>
              You pulled the {reads.join("; the ")}. At the same mass the pull did not depend on the contact area.
            </p>
            <p>
              Sliding friction depends on how hard the surfaces press together (here the brick&apos;s weight) and on the
              materials: f = μ × m × g. Less area means each bit of it is pressed harder, and the two
              effects cancel. Mass does change the pull: 0.40 × 4 × 9.81 = {pull(4).toFixed(1)} N at 4 kg.
            </p>
            <p className="muted">True for hard, dry surfaces; soft or sticky ones (like racing tyres) break the rule.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-pull", "second-face"]}>
          {(reach) => {
            const f = FACES[face];
            const isPulled = pulled.includes(face);
            const bx = X_START + shift;
            const bw = f.len * K;
            const bh = f.ht * K;
            const hookX = bx + bw;
            const hookY = TABLE_Y - Math.min(bh, 4 * K) / 2;
            const scaleX = 238;
            const doPull = (i: number) => {
              setFace(i);
              const next = log.some((e) => e.i === i) ? log : [...log, { i, m: mass }];
              setLog(next);
              setShift((x) => (x >= 90 ? 0 : x + 30));
              reach("first-pull");
              if (new Set(next.map((e) => e.i)).size >= 2) reach("second-face");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Brick on its ${f.label}`}>
                  <line x1={4} y1={TABLE_Y} x2={W - 4} y2={TABLE_Y} className={s.table} />
                  {shift > 0 && <line x1={X_START} y1={TABLE_Y + 6} x2={bx} y2={TABLE_Y + 6} className={s.trail} />}
                  <rect x={bx} y={TABLE_Y - bh} width={bw} height={bh} className={s.brick} />
                  {/* contact patch */}
                  <line x1={bx} y1={TABLE_Y} x2={bx + bw} y2={TABLE_Y} className={s.patch} />
                  {/* spring scale */}
                  <line x1={hookX} y1={hookY} x2={scaleX} y2={hookY} className={s.string} />
                  <rect x={scaleX} y={hookY - 9} width={52} height={18} rx={4} className={s.scale} />
                  <text x={scaleX + 26} y={hookY + 4} textAnchor="middle" className={s.reading}>
                    {locked || !isPulled ? "– N" : `${pull(mass).toFixed(1)} N`}
                  </text>
                  <line x1={scaleX + 52} y1={hookY} x2={W - 6} y2={hookY} className={s.string} />
                  <text x={8} y={H - 3} className={s.chip}>
                    Steady pull. Dry table, μ = 0.40.
                  </text>
                </svg>

                <Row>
                  {FACES.map((ff, i) => (
                    <Control
                      key={ff.id}
                      className={face === i && isPulled ? "active" : ""}
                      disabled={locked || (face === i && isPulled)}
                      onClick={() => doPull(i)}
                    >
                      {ff.label}
                    </Control>
                  ))}
                </Row>
                <Slider label="Brick mass" value={mass} min={1} max={4} step={1} disabled={locked} format={(m) => `${m} kg`} onChange={setMass} />
                <Row>
                  <Readout label="Contact area" value={locked ? "?" : `${f.area} cm²`} />
                  <Readout label="Pull" value={locked || !isPulled ? "?" : `${pull(mass).toFixed(1)} N`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
