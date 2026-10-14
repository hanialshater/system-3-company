"use client";

// Comparative advantage. Two rows of 8 hour cells, Ana's and Ben's; each cell is an hour spent on
// bread or cheese and shows what it makes (Ana 4 loaves or 2 cheeses, Ben 1 or 1). Two sliders move
// hours in 2-hour blocks (Ben toward cheese, Ana toward bread). Start: each splits evenly,
// 20 loaves and 12 cheeses. Key state: the same 12 cheeses and more loaves, which on this grid
// only happens with Ben all on cheese and Ana 6 hours on bread (24 loaves).
// Model: fixed output per hour, no transport or trading costs.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HOURS = 8;
const ANA = { bread: 4, cheese: 2 };
const BEN = { bread: 1, cheese: 1 };
const STEP = 2;
const MILESTONES = ["more-of-both"] as const;

const totals = (anaBread: number, benCheese: number) => ({
  loaves: anaBread * ANA.bread + (HOURS - benCheese) * BEN.bread,
  cheeses: (HOURS - anaBread) * ANA.cheese + benCheese * BEN.cheese,
});
const EVEN = totals(HOURS / 2, HOURS / 2); // 20 loaves, 12 cheeses
const BEST = totals(6, 8); // 24 loaves, 12 cheeses

// Grid geometry (viewBox 320 × 200).
const GX = 56;
const CW = 31;
const CH = 44;
const ROWS = [
  { name: "Ana", y: 24 },
  { name: "Ben", y: 96 },
];

function Stage({ ctx, anaBread, setAnaBread, benCheese, setBenCheese }: {
  ctx: StageContext;
  anaBread: number;
  setAnaBread: (h: number) => void;
  benCheese: number;
  setBenCheese: (h: number) => void;
}) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const check = (a: number, b: number) => {
    const t = totals(a, b);
    if (t.cheeses >= EVEN.cheeses && t.loaves > EVEN.loaves) reach("more-of-both");
  };
  const t = totals(anaBread, benCheese);
  // Ana's most bread hours (in 2-hour blocks) that still leave the even split's cheese count.
  const spare = [8, 6, 4, 2, 0].find((a) => totals(a, benCheese).cheeses >= EVEN.cheeses) ?? 0;
  const better = t.cheeses >= EVEN.cheeses && t.loaves > EVEN.loaves;

  // For each person, which hours are bread (true) or cheese (false). Bread fills from the left.
  const anaCells = Array.from({ length: HOURS }, (_, i) => i < anaBread);
  const benCells = Array.from({ length: HOURS }, (_, i) => i < HOURS - benCheese);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: fixed output per hour</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={`${t.loaves} loaves and ${t.cheeses} cheeses`}>
        {ROWS.map((row, r) => {
          const cells = r === 0 ? anaCells : benCells;
          const rate = r === 0 ? ANA : BEN;
          return (
            <g key={row.name}>
              <text x={GX - 8} y={row.y + CH / 2 + 5} textAnchor="end" className={s.value}>
                {row.name}
              </text>
              {cells.map((isBread, i) => (
                <g key={i}>
                  <rect
                    x={GX + i * CW + 1}
                    y={row.y}
                    width={CW - 2}
                    height={CH}
                    rx={4}
                    className={isBread ? s.main : s.cheese}
                  />
                  <text x={GX + i * CW + CW / 2} y={row.y + CH / 2 + 5} textAnchor="middle" className={isBread ? s.onMain : s.onCheese}>
                    {isBread ? rate.bread : rate.cheese}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        <rect x={GX} y={164} width={14} height={14} rx={3} className={s.main} />
        <text x={GX + 20} y={175} className={s.axis}>
          loaves
        </text>
        <rect x={GX + 90} y={164} width={14} height={14} rx={3} className={s.cheese} />
        <text x={GX + 110} y={175} className={s.axis}>
          cheeses
        </text>
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Lock in a guess to start." : better ? `Cheese kept at ${t.cheeses}, bread up to ${t.loaves}.` : `Now: ${t.loaves} loaves, ${t.cheeses} cheeses (even split: ${EVEN.loaves} and ${EVEN.cheeses}).`}
      </p>
      <p className={s.msg}>
        1 cheese costs Ana {ANA.bread / ANA.cheese} loaves, Ben {BEN.bread / BEN.cheese} loaf.
      </p>

      <Row>
        <Readout label="Loaves" value={<span className={!locked && t.loaves > EVEN.loaves ? s.good : ""}>{t.loaves}</span>} />
        <Readout label="Cheeses" value={<span className={!locked && t.cheeses < EVEN.cheeses ? s.bad : !locked && better ? s.good : ""}>{t.cheeses}</span>} />
      </Row>
      <Row>
        <Slider
          label="Ben: hours on cheese"
          value={benCheese}
          min={0}
          max={HOURS}
          step={STEP}
          disabled={locked}
          onChange={(v) => {
            setBenCheese(v);
            check(anaBread, v);
          }}
        />
      </Row>
      <Row>
        <Control
          disabled={locked || spare === anaBread}
          onClick={() => {
            setAnaBread(spare);
            check(spare, benCheese);
          }}
        >
          Ana bakes in her spare hours
        </Control>
      </Row>
      <Row>
        <Slider
          label="Ana: hours on bread"
          value={anaBread}
          min={0}
          max={HOURS}
          step={STEP}
          disabled={locked}
          onChange={(v) => {
            setAnaBread(v);
            check(v, benCheese);
          }}
        />
      </Row>
    </div>
  );
}

export default function CheeseForBread({ slug }: { slug: string }) {
  const [anaBread, setAnaBread] = useState(HOURS / 2);
  const [benCheese, setBenCheese] = useState(HOURS / 2);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Ana makes ${ANA.bread} loaves or ${ANA.cheese} cheeses an hour; Ben makes ${BEN.bread} loaf or ${BEN.cheese} cheese. Each works ${HOURS} hours, splitting evenly: ${EVEN.loaves} loaves, ${EVEN.cheeses} cheeses. Can they make ${EVEN.cheeses} cheeses and more loaves?`,
        options: ["No: Ana is better at both, so 20 loaves is the most", `Yes: ${BEST.loaves} loaves, if Ben makes the cheese`, `Yes: ${BEST.loaves} loaves, but only Ben gains`],
        answer: 1,
      }}
      exploreHint="Move Ben toward cheese, then let Ana bake. Can you keep 12 cheeses?"
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Ben on cheese all {HOURS} hours ({HOURS} cheeses) plus Ana's 2 cheese hours ({2 * ANA.cheese}) still make {BEST.cheeses} cheeses, and Ana's other 6 hours bake{" "}
            <strong>{BEST.loaves} loaves</strong>, {BEST.loaves - EVEN.loaves} more than before. Same hours, more food.
          </p>
          <p>
            Each cheese costs Ana {ANA.bread / ANA.cheese} loaves but Ben only {BEN.bread / BEN.cheese}, so Ben should make it. When each does the job where they give up least, the total grows, and the extra loaves can be shared so both gain.
          </p>
          <p className="muted">A model: fixed output per hour, no transport or trading costs.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} anaBread={anaBread} setAnaBread={setAnaBread} benCheese={benCheese} setBenCheese={setBenCheese} />}
    </Lesson>
  );
}
