"use client";

// Budget constraint. One picture: a $20 cart drawn as ten $2 slots. An apple fills one slot, a loaf
// fills two. Any loaf added takes the room of two apples, so the trade-off is the price ratio.
// Key state: 3 loaves in the cart, then the rest filled with apples (4 apples, $0 left).
// Prices are illustrative.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BUDGET = 20;
const APPLE = 2;
const LOAF = 4;
const Q_LOAVES = 3;
const START_LOAVES = 1;
const MAX_LOAVES = BUDGET / LOAF;
const SLOT = APPLE; // each slot is one apple's price
const SLOTS = BUDGET / SLOT;
const PER_LOAF = LOAF / APPLE; // apples given up per loaf
const MILESTONES = ["three-loaves", "filled"] as const;

const maxApples = (loaves: number) => Math.floor((BUDGET - LOAF * loaves) / APPLE);
const ANSWER = maxApples(Q_LOAVES); // 4

// Geometry (viewBox 320 × 130): ten slots in one row.
const X0 = 10;
const SW = 30;
const Y0 = 34;
const SH = 58;

export default function TwentyDollarBasket({ slug }: { slug: string }) {
  const [loaves, setLoaves] = useState(START_LOAVES);
  const [apples, setApples] = useState(0);
  const [filled, setFilled] = useState<Record<number, number>>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You have $${BUDGET}. Apples cost $${APPLE} each, loaves $${LOAF}. You buy ${Q_LOAVES} loaves. What is the most apples you can add?`,
        options: [String(ANSWER), String(ANSWER + 2), String(ANSWER + 4)],
        answer: 0,
      }}
      exploreHint={`Put ${Q_LOAVES} loaves in the cart, then fill the rest with apples.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = Object.entries(filled)
          .map(([l, a]) => [Number(l), a] as const)
          .filter(([l]) => l !== Q_LOAVES)
          .sort((a, b) => a[0] - b[0]);
        return (
          <>
            <p>
              With {Q_LOAVES} loaves the cart had ${BUDGET - LOAF * Q_LOAVES} left, and that held{" "}
              <strong>{ANSWER} apples</strong>. Then the ${BUDGET} was gone.
              {others.length > 0 &&
                ` You also filled it at ${others.map(([l, a]) => `${l} loaves (${a} apples)`).join(" and ")}.`}
            </p>
            <p>
              Each loaf takes the room of {PER_LOAF} apples, because ${LOAF} / ${APPLE} = {PER_LOAF}. Inside a fixed budget,
              nothing extra is free: one more loaf always means {PER_LOAF} fewer apples. The trade-off is the ratio of the
              prices.
            </p>
            <p className="muted">Prices are made up for the example.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const spent = LOAF * loaves + APPLE * apples;
            const left = BUDGET - spent;
            const room = maxApples(loaves);
            const setL = (l: number) => {
              setLoaves(l);
              setApples((a) => Math.min(a, maxApples(l)));
              if (l === Q_LOAVES) reach("three-loaves");
            };
            const setA = (a: number) => {
              setApples(a);
              if (a === maxApples(loaves)) {
                setFilled((f) => ({ ...f, [loaves]: a }));
                if (loaves === Q_LOAVES) reach("filled");
              }
            };
            // Lay the cart out: loaves first (two slots each), then apples.
            const items: { kind: "loaf" | "apple"; slot: number }[] = [];
            for (let i = 0; i < loaves; i++) items.push({ kind: "loaf", slot: i * PER_LOAF });
            for (let i = 0; i < apples; i++) items.push({ kind: "apple", slot: loaves * PER_LOAF + i });
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Apples ${APPLE} · loaves ${LOAF} · made-up prices</p>
                <svg
                  viewBox="0 0 320 130"
                  className="stage-svg"
                  role="img"
                  aria-label={`Cart: ${loaves} loaves and ${apples} apples, $${left} left of $${BUDGET}`}
                >
                  <text x={160} y={20} textAnchor="middle" className={s.value}>
                    ${BUDGET} cart
                  </text>
                  {Array.from({ length: SLOTS }, (_, i) => (
                    <rect key={i} x={X0 + i * SW + 1} y={Y0} width={SW - 2} height={SH} rx={5} className={s.ghostFill} />
                  ))}
                  {items.map((it, i) =>
                    it.kind === "loaf" ? (
                      <g key={i}>
                        <rect x={X0 + it.slot * SW + 2} y={Y0 + 10} width={SW * PER_LOAF - 4} height={SH - 20} rx={14} className={s.loaf} />
                        <text x={X0 + (it.slot + 1) * SW} y={Y0 + SH / 2 + 4} textAnchor="middle" className={s.small}>
                          ${LOAF}
                        </text>
                      </g>
                    ) : (
                      <g key={i}>
                        <circle cx={X0 + (it.slot + 0.5) * SW} cy={Y0 + SH / 2} r={11} className={s.apple} />
                        <text x={X0 + (it.slot + 0.5) * SW} y={Y0 + SH / 2 + 4} textAnchor="middle" className={s.small}>
                          ${APPLE}
                        </text>
                      </g>
                    ),
                  )}
                  {[0, 5, 10].map((k) => (
                    <text key={k} x={X0 + k * SW} y={Y0 + SH + 16} textAnchor={k === 0 ? "start" : k === 10 ? "end" : "middle"} className={s.axis}>
                      ${k * SLOT}
                    </text>
                  ))}
                </svg>

                <Row>
                  <Readout label="Apples" value={apples} />
                  <Readout label="Spent" value={`$${spent}`} />
                  <Readout label="Left" value={locked ? "?" : `$${left}`} />
                </Row>
                <Slider label="Loaves" value={loaves} min={0} max={MAX_LOAVES} disabled={locked} onChange={setL} />
                <Row>
                  <Control disabled={locked || apples >= room} onClick={() => setA(room)}>
                    Fill with apples
                  </Control>
                  <Control disabled={locked || apples >= room} onClick={() => setA(apples + 1)} aria-label="Add one apple">
                    + apple
                  </Control>
                  <Control disabled={locked || apples <= 0} onClick={() => setA(apples - 1)} aria-label="Remove one apple">
                    − apple
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
