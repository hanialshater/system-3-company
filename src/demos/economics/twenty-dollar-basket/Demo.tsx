"use client";

// Budget constraint. One picture: a $20 cart drawn as ten $2 slots. An apple fills one slot, a loaf
// fills two. Any loaf added takes the room of two apples, so the trade-off is the price ratio.
// Start: a full cart, 3 loaves and 4 apples, $0 left. Key state (milestone): the learner adds a loaf to the full cart
// and watches 2 apples pushed out.
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
const START_LOAVES = Q_LOAVES;
const MAX_LOAVES = BUDGET / LOAF;
const SLOT = APPLE; // each slot is one apple's price
const SLOTS = BUDGET / SLOT;
const PER_LOAF = LOAF / APPLE; // apples given up per loaf
const MILESTONES = ["pushed-out"] as const;

const maxApples = (loaves: number) => Math.floor((BUDGET - LOAF * loaves) / APPLE);
const ANSWER = maxApples(Q_LOAVES); // 4

// Geometry (viewBox 320 × 130): ten slots in one row.
const X0 = 10;
const SW = 30;
const Y0 = 34;
const SH = 58;

export default function TwentyDollarBasket({ slug }: { slug: string }) {
  const [loaves, setLoaves] = useState(START_LOAVES);
  const [apples, setApples] = useState(maxApples(START_LOAVES));
  const [note, setNote] = useState("");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At the market with $${BUDGET}, you fill your cart to the last cent: ${Q_LOAVES} loaves at $${LOAF} and ${ANSWER} apples at $${APPLE}, $0 left. You grab one more loaf. What happens to the apples?`,
        options: ["None leave: it still fits", "1 apple leaves", `${PER_LOAF} apples leave`],
        answer: 2,
      }}
      exploreHint="Slide the loaves up and watch the apples."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You added a loaf to a full cart ({Q_LOAVES} loaves, {ANSWER} apples, $0 left) and <strong>{PER_LOAF} apples</strong> had to leave: a ${LOAF} loaf takes the room of two ${APPLE} apples, because ${LOAF} / ${APPLE} = {PER_LOAF}.
          </p>
          <p>
            Inside a fixed budget, once the money is all spent nothing extra is free: one more loaf means {PER_LOAF} fewer apples. The trade-off is the ratio of the prices.
          </p>
          <p className="muted">Prices are made up for the example.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const spent = LOAF * loaves + APPLE * apples;
            const left = BUDGET - spent;
            const room = maxApples(loaves);
            const setL = (l: number) => {
              const pushed = Math.max(0, apples - maxApples(l));
              setLoaves(l);
              setApples(Math.min(apples, maxApples(l)));
              setNote(
                pushed > 0
                  ? `${l > loaves ? "The extra loaf" : "Fewer loaves"} left room for ${maxApples(l)} apples: ${pushed} pushed out.`
                  : l < loaves
                    ? `A loaf removed frees room for ${PER_LOAF} apples.`
                    : "",
              );
              if (l > loaves && pushed > 0 && loaves * LOAF + apples * APPLE === BUDGET) reach("pushed-out");
            };
            const setA = (a: number) => {
              setApples(a);
              setNote("");
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

                <p className={s.msg} aria-live="polite">
                  {locked ? "" : note}
                </p>
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
