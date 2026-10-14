"use client";

// Matrix-chain order. A is 10x30, B is 30x5, C is 5x60. A p x q times a q x r costs p*q*r multiplications.
// (AB)C = 1,500 + 3,000 = 4,500; A(BC) = 9,000 + 18,000 = 27,000, six times as much, for the same 10x60 result.
// Each matrix is a box drawn to scale (2 px per row or column), so the middle product is a shape the learner
// makes before they see its price. Two panels stacked (one per order), one shared cost ruler under them.
// Spec: company/design/specs/bracket-order-sets-the-bill.md.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type M = { name: string; r: number; c: number };
const A: M = { name: "A", r: 10, c: 30 };
const B: M = { name: "B", r: 30, c: 5 };
const C: M = { name: "C", r: 5, c: 60 };
const mul = (x: M, y: M, name: string): { m: M; cost: number } => ({
  m: { name, r: x.r, c: y.c },
  cost: x.r * x.c * y.c,
});
const fmt = (n: number) => n.toLocaleString("en-US");
const costText = (x: M, y: M) => `${x.r}·${x.c}·${y.c} = ${fmt(x.r * x.c * y.c)}`;

// The two orders, each as two steps, computed with the same p*q*r rule the stage prints.
const AB = mul(A, B, "AB");
const AB_C = mul(AB.m, C, "R");
const BC = mul(B, C, "BC");
const A_BC = mul(A, BC.m, "R");
const TOP = [AB.cost, AB.cost + AB_C.cost]; // running totals: 1,500 then 4,500
const BOT = [BC.cost, BC.cost + A_BC.cost]; // 9,000 then 27,000
const AXIS_MAX = BOT[1];
const TICK = TOP[1];
const RATIO = BOT[1] / TOP[1];

const PX = 2; // px per row or column
const W = 360;
const BOX_TOP = 26;

function Boxes({ boxes, tint }: { boxes: { m: M; kind: "in" | "mid" | "out" }[]; tint: string }) {
  let x = 10;
  return (
    <>
      {boxes.map(({ m, kind }) => {
        const w = m.c * PX;
        const h = m.r * PX;
        const bx = x;
        x += Math.max(w, 44) + 16;
        return (
          <g key={m.name + kind}>
            <rect
              x={bx}
              y={BOX_TOP}
              width={w}
              height={h}
              fill={kind === "mid" ? tint : kind === "out" ? "url(#hatchR)" : "var(--bg-2)"}
              stroke="var(--fg)"
              strokeWidth={1.2}
            />
            <text x={bx} y={BOX_TOP + h + 13} className={s.size}>
              {m.name} {m.r}×{m.c}
            </text>
          </g>
        );
      })}
    </>
  );
}

export default function BracketOrderSetsTheBill({ slug }: { slug: string }) {
  const [top, setTop] = useState(0); // steps done in panel 1 (0, 1, 2)
  const [bot, setBot] = useState(0); // steps done in panel 2

  const tint = "color-mix(in srgb, var(--domain) 35%, var(--bg-2))";
  const topBoxes =
    top === 0
      ? [
          { m: A, kind: "in" as const },
          { m: B, kind: "in" as const },
          { m: C, kind: "in" as const },
        ]
      : top === 1
        ? [
            { m: AB.m, kind: "mid" as const },
            { m: C, kind: "in" as const },
          ]
        : [{ m: AB_C.m, kind: "out" as const }];
  const botBoxes =
    bot === 0
      ? [
          { m: A, kind: "in" as const },
          { m: B, kind: "in" as const },
          { m: C, kind: "in" as const },
        ]
      : bot === 1
        ? [
            { m: A, kind: "in" as const },
            { m: BC.m, kind: "mid" as const },
          ]
        : [{ m: A_BC.m, kind: "out" as const }];

  const topTotal = top === 0 ? 0 : TOP[top - 1];
  const botTotal = bot === 0 ? 0 : BOT[bot - 1];
  const scale = (v: number) => (v / AXIS_MAX) * 300;
  const anyCost = top > 0 || bot > 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Three matrices: A is ${A.r}x${A.c}, B is ${B.r}x${B.c}, C is ${C.r}x${C.c}. Multiplying a p x q by a q x r costs p*q*r single multiplications. (AB)C versus A(BC): how do the costs compare?`,
        options: ["Equal", "A(BC) is about 2x dearer", "A(BC) is 6x dearer"],
        answer: 2,
      }}
      exploreHint="Price both orders, one multiplication at a time."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The top order cost {fmt(TOP[1])}, the bottom {fmt(BOT[1])}: {RATIO} times as much for the same {AB_C.m.r}×
            {AB_C.m.c} answer. The difference is the middle box you made first: {AB.m.r}×{AB.m.c} against {BC.m.r}×{BC.m.c}.
            That slab alone cost {fmt(BC.cost)}, twice the whole top bill.
          </p>
          <p>
            Matrix multiplication is associative, so every bracketing gives the same matrix, but the sizes in the middle
            differ, and so does the price. For a longer chain, trying every split point of every sub-chain, cheapest
            sub-chains first, finds the cheapest order.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ab-first-priced", "bc-first-priced"]}>
          {(reach) => {
            const stepTop = () => {
              if (locked || top >= 2) return;
              setTop(top + 1);
              if (top + 1 === 2) reach("ab-first-priced");
            };
            const stepBot = () => {
              if (locked || bot >= 2) return;
              setBot(bot + 1);
              if (bot + 1 === 2) reach("bc-first-priced");
            };
            return (
              <div className={s.wrap}>
                <p className={s.rule}>A p×q times a q×r costs p·q·r multiplications. Same answer either order.</p>
                <svg viewBox={`0 0 ${W} 120`} className={`stage-svg ${s.svg}`} role="img"
                  aria-label={`A times B first: ${top >= 1 ? fmt(AB.cost) : "not priced"}${top >= 2 ? ` then ${fmt(AB_C.cost)}, total ${fmt(TOP[1])}` : ""}`}
                  data-steps={top}
                >
                  <defs>
                    <pattern id="hatchR" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="6" height="6" fill="var(--bg-2)" />
                      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--fg)" strokeWidth="1.5" />
                    </pattern>
                  </defs>
                  <text x={10} y={16} className={s.panel}>(AB)C</text>
                  <Boxes boxes={topBoxes} tint={tint} />
                  {top >= 1 && <text x={W - 6} y={40} textAnchor="end" className={s.cost}>{costText(A, B)}</text>}
                  {top >= 2 && <text x={W - 6} y={58} textAnchor="end" className={s.cost}>+ {costText(AB.m, C)}</text>}
                </svg>
                <Row>
                  <Control className="tap" disabled={locked || top !== 0} onClick={stepTop}>
                    Multiply A·B
                  </Control>
                  <Control className="tap" disabled={locked || top !== 1} onClick={stepTop}>
                    Then (AB)·C
                  </Control>
                </Row>
                <svg viewBox={`0 0 ${W} 120`} className={`stage-svg ${s.svg}`} role="img"
                  aria-label={`B times C first: ${bot >= 1 ? fmt(BC.cost) : "not priced"}${bot >= 2 ? ` then ${fmt(A_BC.cost)}, total ${fmt(BOT[1])}` : ""}`}
                  data-steps={bot}
                >
                  <text x={10} y={16} className={s.panel}>A(BC)</text>
                  <Boxes boxes={botBoxes} tint={tint} />
                  {bot >= 1 && <text x={W - 6} y={bot >= 2 ? 40 : 108} textAnchor="end" className={s.cost}>{costText(B, C)}</text>}
                  {bot >= 2 && <text x={W - 6} y={58} textAnchor="end" className={s.cost}>+ {costText(A, BC.m)}</text>}
                  {top >= 2 && bot >= 2 && (
                    <text x={W - 6} y={84} textAnchor="end" className={s.same}>✓ same {A_BC.m.r}×{A_BC.m.c} as above</text>
                  )}
                </svg>
                <Row>
                  <Control className="tap" disabled={locked || bot !== 0} onClick={stepBot}>
                    Multiply B·C
                  </Control>
                  <Control className="tap" disabled={locked || bot !== 1} onClick={stepBot}>
                    Then A·(BC)
                  </Control>
                </Row>
                <svg viewBox={`0 0 ${W} 74`} className={`stage-svg ${s.svg}`} role="img"
                  aria-label={`Cost: (AB)C ${fmt(topTotal)}, A(BC) ${fmt(botTotal)}`}
                >
                  <text x={6} y={12} className={s.axisLab}>Cost</text>
                  {Array.from({ length: AXIS_MAX / TICK + 1 }, (_, i) => (
                    <g key={i}>
                      <line x1={46 + scale(i * TICK)} x2={46 + scale(i * TICK)} y1={18} y2={62} stroke="var(--line)" strokeWidth={1} />
                      {(i === 0 || anyCost) && (
                        <text x={46 + scale(i * TICK)} y={72} textAnchor="middle" className={s.tick}>
                          {i === 0 ? "0" : fmt(i * TICK)}
                        </text>
                      )}
                    </g>
                  ))}
                  <text x={42} y={34} textAnchor="end" className={s.barLab}>top</text>
                  <rect x={46} y={22} width={scale(topTotal)} height={16} fill="var(--domain)" />
                  {topTotal > 0 && <text x={50 + scale(topTotal)} y={35} className={s.total}>{fmt(topTotal)}</text>}
                  <text x={42} y={56} textAnchor="end" className={s.barLab}>bottom</text>
                  <rect x={46} y={44} width={scale(botTotal)} height={16} fill="var(--domain)" />
                  {botTotal > 0 && (
                    <text
                      x={botTotal > AXIS_MAX * 0.75 ? 42 + scale(botTotal) : 50 + scale(botTotal)}
                      y={57}
                      textAnchor={botTotal > AXIS_MAX * 0.75 ? "end" : "start"}
                      className={botTotal > AXIS_MAX * 0.75 ? s.totalIn : s.total}
                    >
                      {fmt(botTotal)}
                    </text>
                  )}
                </svg>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
