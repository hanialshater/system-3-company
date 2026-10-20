"use client";

// Deduction vs credit in a made-up tax system. Income $10,000, tax rate 20% (slider 10-40%).
// Deduction of $1,000: taxable income falls by 1,000, so tax falls by rate x 1,000.
// Credit of $1,000: the tax bill falls by 1,000 directly.
// Stage: three bars (no relief, deduction, credit), each with its working. Key states (milestones): deduction shown at 20%
// (cut $200), credit shown at 20% (cut $1,000), and the deduction shown at a higher rate (cut grows; the credit's does not).
// Model: fictional system, no real country, no tax advice.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const INCOME = 10000;
const RELIEF = 1000;
const Q_RATE = 20;
const MILESTONES = ["deduction", "credit", "higher"] as const;

const baseTax = (r: number) => (INCOME * r) / 100;
const dedBill = (r: number) => ((INCOME - RELIEF) * r) / 100;
const credBill = (r: number) => Math.max(0, baseTax(r) - RELIEF);
const usd = (v: number) => `$${v.toLocaleString("en-US")}`;

const L = 12;
const W = 296;
const BAR_H = 20;
const MAX_TAX = baseTax(40);

export default function DeductionCredit({ slug }: { slug: string }) {
  const [ded, setDed] = useState(false);
  const [cred, setCred] = useState(false);
  const [rate, setRate] = useState(Q_RATE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Filing your taxes in a made-up system with a ${Q_RATE}% tax rate, you claim a ${usd(RELIEF)} deduction. How much does it cut your tax bill?`,
        options: [usd(RELIEF), usd((RELIEF * Q_RATE) / 100), "$0"],
        answer: 1,
      }}
      exploreHint="Show the deduction, then the credit, then raise the tax rate."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_RATE}% the {usd(RELIEF)} deduction left {usd(INCOME - RELIEF)} to be taxed, so the bill fell from {usd(baseTax(Q_RATE))} to {usd(dedBill(Q_RATE))}: a cut of{" "}
            <strong>{usd(baseTax(Q_RATE) - dedBill(Q_RATE))}</strong>, which is {Q_RATE}% of {usd(RELIEF)}. The {usd(RELIEF)} credit came off the bill itself, a cut of{" "}
            <strong>{usd(baseTax(Q_RATE) - credBill(Q_RATE))}</strong>.
          </p>
          <p>A deduction saves the rate times its size, so it was worth more at a higher rate, while the credit saved its full size at every rate. A made-up system, not advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const update = (d: boolean, c: boolean, r: number) => {
              setDed(d);
              setCred(c);
              setRate(r);
              if (d && r === Q_RATE) reach("deduction");
              if (c && r === Q_RATE) reach("credit");
              if (d && r > Q_RATE) reach("higher");
            };
            const base = baseTax(rate);
            const rows = [
              { key: "none", label: `No relief: ${rate}% of ${usd(INCOME)} = ${usd(base)}`, on: true, v: base, cls: s.ghostFill },
              { key: "ded", label: `Deduction: ${rate}% of ${usd(INCOME - RELIEF)} = ${usd(dedBill(rate))}`, on: ded, v: dedBill(rate), cls: s.main },
              { key: "cred", label: `Credit: ${usd(base)} - ${usd(RELIEF)} = ${usd(credBill(rate))}`, on: cred, v: credBill(rate), cls: s.goodFill },
            ];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Made-up system: income $10,000, one flat rate</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={locked ? "Tax bill bars" : `No relief ${usd(base)}`}>
                  {rows.map((row, i) => {
                    const y = 6 + i * 42;
                    const shown = row.on && !locked;
                    return (
                      <g key={row.key}>
                        <text x={L} y={y + 10} className={s.axis}>
                          {shown ? row.label : row.key === "none" ? "" : row.key === "ded" ? "Deduction: ?" : "Credit: ?"}
                        </text>
                        <rect x={L} y={y + 15} width={W} height={BAR_H} rx={3} className={s.ghost} />
                        {shown && <rect x={L} y={y + 15} width={Math.max(0, (row.v / MAX_TAX) * W)} height={BAR_H} className={row.cls} />}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="Tax rate" value={`${rate}%`} />
                  <Readout label="Deduction cuts" value={locked || !ded ? "?" : usd(base - dedBill(rate))} />
                  <Readout label="Credit cuts" value={locked || !cred ? "?" : usd(base - credBill(rate))} />
                </Row>
                <Row>
                  <Control className={ded ? "active" : ""} disabled={locked || ded} onClick={() => update(true, cred, rate)}>
                    Show {usd(RELIEF)} deduction
                  </Control>
                  <Control className={cred ? "active" : ""} disabled={locked || cred} onClick={() => update(ded, true, rate)}>
                    Show {usd(RELIEF)} credit
                  </Control>
                </Row>
                <Slider label="Tax rate" value={rate} min={10} max={40} step={10} format={(v) => `${v}%`} disabled={locked} onChange={(v) => update(ded, cred, v)} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
