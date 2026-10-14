"use client";

// A 1 cm cube cut into n × n × n smaller cubes. Pieces = n³; each has edge 10/n mm and
// outside area 6 (1/n)² cm²; total outside area = n³ × 6/n² = 6n cm².
// Key state (milestone `thousand`): n = 10, 1,000 pieces of 1 mm, total outside area 60 cm².
// The drawing shows the front face (n × n squares) pulled apart so the cuts are visible.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SIDE_CM = 1;
const area1 = (n: number) => Math.round(n ** 3 * 6 * (SIDE_CM / n) ** 2 * 1e6) / 1e6;
const STEPS = [1, 2, 5, 10];
const BIG = 10;
const BAR_MAX = 100; // scale of the bar; deliberately not the answer

const NAMES = ["thousand"] as const;
const fmt = (v: number) => v.toLocaleString("en-US");

const SIZE = 180;
const OX = 70;
const OY = 10;

export default function CutTheCube({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const pieces = n ** 3;
  const area = area1(n);
  const cell = SIZE / n;
  const gap = n === 1 ? 0 : Math.min(6, 40 / n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A 1 cm cube (outside area ${area1(1)} cm²) is cut into ${fmt(BIG ** 3)} small cubes, each 1 mm on a side. The total outside area of all the pieces becomes…`,
        options: [`the same, ${area1(1)} cm²`, `${area1(BIG) / area1(1)} times more, ${area1(BIG)} cm²`, `${fmt(BIG ** 3)} times more, ${fmt(area1(BIG) * 100)} cm²`],
        answer: 1,
      }}
      exploreHint="Cut each edge into more pieces. Go all the way to 1,000 pieces."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            At {fmt(BIG ** 3)} pieces the total outside area was <strong>{area1(BIG)} cm²</strong>, {area1(BIG) / area1(1)} times the original {area1(1)} cm².
          </p>
          <p>
            Each tiny cube has outside area 6 × (0.1 cm)² = {(6 * 0.01).toFixed(2)} cm², the "one piece" readout you saw, and {fmt(BIG ** 3)} of them add up to {area1(BIG)} cm². Cutting keeps the
            volume but exposes new faces, so the bar grew while the cube did not. A reaction only touches the outside, so at {area1(BIG) / area1(1)} times the surface a reaction has {area1(BIG) / area1(1)} times as much to work on: finer pieces react faster.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setN(v);
              if (v === BIG) reach("thousand");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 262" className="stage-svg" role="img" aria-label={`${pieces} pieces, outside area ${area} cm²`}>
                  {Array.from({ length: n * n }, (_, i) => {
                    const r = Math.floor(i / n);
                    const c = i % n;
                    const w = Math.max(1, cell - gap);
                    return (
                      <rect key={i} x={OX + c * cell + gap / 2} y={OY + r * cell + gap / 2} width={w} height={w} className={s.piece} />
                    );
                  })}
                  <text x={160} y={204} textAnchor="middle" className={s.small}>
                    front face only; cuts also make hidden faces
                  </text>
                  <text x={30} y={226} className={s.small}>
                    total outside area
                  </text>
                  <rect x={30} y={232} width={260} height={16} className={s.track} />
                  <rect x={30} y={232} width={(260 * area) / BAR_MAX} height={16} className={s.fill} />
                  <line x1={30 + (260 * area1(1)) / BAR_MAX} x2={30 + (260 * area1(1)) / BAR_MAX} y1={228} y2={252} className={s.tick} />
                  <text x={30 + (260 * area1(1)) / BAR_MAX + 3} y={260} className={s.small}>
                    whole cube, {area1(1)} cm²
                  </text>
                </svg>
                <Row>
                  {STEPS.map((k) => (
                    <Control key={k} onClick={() => set(k)} disabled={locked || n === k} className={n === k ? "active" : ""}>
                      {k === 1 ? "Whole cube" : `${k} per edge`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Pieces" value={fmt(pieces)} />
                  <Readout label="Edge of each" value={`${10 / n} mm`} />
                  <Readout label="Total outside area" value={`${area} cm²`} />
                </Row>
                <Row>
                  <Readout label="Outside of one piece" value={`${+(6 * (SIDE_CM / n) ** 2).toFixed(2)} cm²`} />
                  <Readout label="Surface a reaction can touch" value={`×${area / area1(1)}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
