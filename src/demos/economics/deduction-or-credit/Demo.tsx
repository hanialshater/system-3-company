"use client";

// Deduction vs credit in a made-up tax system. Income $10,000, tax rate 20% (slider 10-40%).
// Deduction of $1,000: taxable income falls by 1,000, so tax falls by rate x 1,000.
// Credit of $1,000: the tax bill falls by 1,000 directly.
// Key states (milestones): deduction at 20% (tax cut $200) and credit at 20% (tax cut $1,000).
// Model: fictional system, no real country, no tax advice.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const INCOME = 10000;
const RELIEF = 1000;
const Q_RATE = 20;
const MILESTONES = ["deduction", "credit"] as const;
type Mode = "none" | "deduction" | "credit";

const baseTax = (r: number) => (INCOME * r) / 100;
const bill = (mode: Mode, r: number) =>
  mode === "deduction" ? ((INCOME - RELIEF) * r) / 100 : mode === "credit" ? Math.max(0, baseTax(r) - RELIEF) : baseTax(r);
const usd = (v: number) => `$${v.toLocaleString("en-US")}`;

const L = 12;
const W = 296;
const MAX_TAX = baseTax(40);

export default function DeductionCredit({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("none");
  const [rate, setRate] = useState(Q_RATE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In a made-up system with a ${Q_RATE}% tax rate, a ${usd(RELIEF)} deduction cuts your tax bill by how much?`,
        options: [usd(RELIEF), usd((RELIEF * Q_RATE) / 100), "$0"],
        answer: 1,
      }}
      exploreHint="Try the deduction, then the credit, both at 20%."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_RATE}% the {usd(RELIEF)} deduction cut the bill from {usd(baseTax(Q_RATE))} to {usd(bill("deduction", Q_RATE))}, a cut of{" "}
            <strong>{usd(baseTax(Q_RATE) - bill("deduction", Q_RATE))}</strong>. The {usd(RELIEF)} credit cut it to {usd(bill("credit", Q_RATE))}, a cut of{" "}
            <strong>{usd(baseTax(Q_RATE) - bill("credit", Q_RATE))}</strong>.
          </p>
          <p>A credit subtracts from the bill; a deduction subtracts from the income the bill is taken from. A made-up system, not advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const update = (m: Mode, r: number) => {
              setMode(m);
              setRate(r);
              if (r === Q_RATE && m === "deduction") reach("deduction");
              if (r === Q_RATE && m === "credit") reach("credit");
            };
            const b = bill(mode, rate);
            const cut = baseTax(rate) - b;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Made-up system: income $10,000, one flat rate</p>
                <p className={s.msg}>Deduction: taken off income first. Credit: taken off the bill.</p>
                <svg viewBox="0 0 320 100" className="stage-svg" role="img" aria-label={locked ? "Tax bill bar" : `Tax bill ${usd(b)}`}>
                  <text x={L} y={16} className={s.axis}>
                    tax bill (dashed: no relief)
                  </text>
                  <rect x={L} y={24} width={(baseTax(rate) / MAX_TAX) * W} height={34} rx={3} className={s.ghostFill} />
                  {!locked && <rect x={L} y={24} width={(b / MAX_TAX) * W} height={34} className={s.main} />}
                  {!locked && (
                    <text x={L + 4} y={46} className={s.small} style={{ fill: "#fff" }}>
                      {usd(b)}
                    </text>
                  )}
                  <text x={L} y={80} className={s.small}>
                    {locked ? "" : `no relief: ${usd(baseTax(rate))}`}
                  </text>
                </svg>
                <Row>
                  <Readout label="Tax rate" value={`${rate}%`} />
                  <Readout label="Bill cut by" value={locked || mode === "none" ? "?" : usd(cut)} />
                </Row>
                <Row>
                  <Control className={mode === "deduction" ? "active" : ""} disabled={locked || mode === "deduction"} onClick={() => update("deduction", rate)}>
                    {usd(RELIEF)} deduction
                  </Control>
                  <Control className={mode === "credit" ? "active" : ""} disabled={locked || mode === "credit"} onClick={() => update("credit", rate)}>
                    {usd(RELIEF)} credit
                  </Control>
                </Row>
                <Slider label="Tax rate" value={rate} min={10} max={40} step={10} format={(v) => `${v}%`} disabled={locked} onChange={(v) => update(mode, v)} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
