"use client";

// Tax incidence. One picture: a price ladder. Before the tax, bread sells at $6. A $2 tax opens a
// gap between what buyers pay and what bakers keep; the gap is split at the old $6 line into the
// buyers' share and the bakers' share. The split is the same whichever side the tax is collected from.
// Model: bakers bake 10p − 20; buyers want A − b·p with A = 40 + 6b, so the untaxed price stays $6
// for every slope b. The brief's market (100 − 10p) is b = 10.
// Key state: the tax collected from bakers and from buyers, both seen at the usual slope (b = 10).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TAX = 2;
const P0 = 6;
const SUPPLY_SLOPE = 10;
const BASE_B = 10;
const SLOPES = [
  { b: 5, label: "little" },
  { b: BASE_B, label: "usual" },
  { b: 20, label: "lots" },
] as const;
const MILESTONES = ["bakers", "buyers"] as const;

type Side = "none" | "bakers" | "buyers";

const supply = (p: number) => SUPPLY_SLOPE * p - 20;
const demandA = (b: number) => supply(P0) + b * P0; // keeps the untaxed price at $6
const demand = (b: number, p: number) => demandA(b) - b * p;

/** Market with a $TAX tax. Returns what buyers pay, what bakers keep and loaves sold. */
function market(side: Side, b: number) {
  const A = demandA(b);
  if (side === "none") {
    const p = (A + 20) / (SUPPLY_SLOPE + b);
    return { buyersPay: p, bakersKeep: p, q: demand(b, p) };
  }
  if (side === "bakers") {
    // bakers receive p − TAX: supply(p − TAX) = demand(p)
    const p = (A + 20 + SUPPLY_SLOPE * TAX) / (SUPPLY_SLOPE + b);
    return { buyersPay: p, bakersKeep: p - TAX, q: demand(b, p) };
  }
  // buyers pay p + TAX on top of the shelf price p: supply(p) = demand(p + TAX)
  const p = (A + 20 - b * TAX) / (SUPPLY_SLOPE + b);
  return { buyersPay: p + TAX, bakersKeep: p, q: supply(p) };
}

const base = market("bakers", BASE_B);
const BUYERS_RISE = base.buyersPay - P0; // 1
const money = (v: number) => `$${v.toFixed(2)}`;
const loaves = (q: number) => q.toFixed(q % 1 ? 1 : 0);

// Geometry (viewBox 320 × 200): price $4..$8.5 up.
const TOP = 14;
const BOT = 186;
const PMIN = 4;
const PMAX = 8.5;
const py = (p: number) => BOT - ((p - PMIN) / (PMAX - PMIN)) * (BOT - TOP);
const BX = 110;
const BW = 60;

export default function TaxWhoPays({ slug }: { slug: string }) {
  const [side, setSide] = useState<Side>("none");
  const [b, setB] = useState<number>(BASE_B);
  const [tried, setTried] = useState<number[]>([]);

  const shareAt = (bb: number) => market("bakers", bb).buyersPay - P0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy bread market: buyers want 100 − 10p loaves, bakers bake 10p − 20, price $${P0}. The government taxes bakers $${TAX} a loaf. How much more do buyers pay?`,
        options: ["$0", money(BUYERS_RISE).replace(".00", ""), `$${TAX}`],
        answer: 1,
      }}
      exploreHint="Collect the $2 from bakers, then from buyers."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const other = tried.filter((x) => x !== BASE_B);
        return (
          <>
            <p>
              You collected the ${TAX} from bakers and from buyers. Both ways buyers paid{" "}
              <strong>{money(base.buyersPay)}</strong> and bakers kept <strong>{money(base.bakersKeep)}</strong>: the tax split{" "}
              {money(base.buyersPay - P0)} and {money(P0 - base.bakersKeep)}, and sales fell from {loaves(market("none", BASE_B).q)} to{" "}
              {loaves(base.q)} loaves.
            </p>
            <p>
              The tax opens a ${TAX} gap between what buyers pay and what bakers keep. Where that gap sits depends on who
              backs away faster when the price moves, not on who hands over the money.
              {other.length > 0 &&
                ` You saw it: ${other
                  .map((x) => `buyers who reacted ${x < BASE_B ? "less" : "more"} to price carried ${money(shareAt(x))}`)
                  .join(", and ")}.`}
            </p>
            <p className="muted">
              A model: straight-line supply and demand, nothing else changes. It says nothing about whether any tax is good.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const m = market(side, b);
            const taxed = side !== "none" && !locked;
            const pickSide = (v: Side) => {
              setSide(v);
              if (b === BASE_B && v !== "none") reach(v);
            };
            const pickB = (v: number) => {
              setB(v);
              setTried((t) => (t.includes(v) ? t : [...t, v]));
              if (v === BASE_B && side !== "none") reach(side);
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Toy market</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={taxed ? `Buyers pay ${money(m.buyersPay)}, bakers keep ${money(m.bakersKeep)}` : "Bread price $6"}
                >
                  {[4, 5, 6, 7, 8].map((p) => (
                    <g key={p}>
                      <line x1={60} y1={py(p)} x2={300} y2={py(p)} stroke="var(--line)" strokeDasharray="2 4" />
                      <text x={54} y={py(p) + 4} textAnchor="end" className={s.axis}>
                        ${p}
                      </text>
                    </g>
                  ))}
                  {taxed && (
                    <>
                      <text x={160} y={14} textAnchor="middle" className={s.value}>
                        {side} pay the ${TAX}
                      </text>
                      <rect x={BX} y={py(m.buyersPay)} width={BW} height={py(P0) - py(m.buyersPay)} className={s.badFill} />
                      <rect x={BX} y={py(P0)} width={BW} height={py(m.bakersKeep) - py(P0)} className={s.soft} />
                      <text x={BX + BW / 2} y={(py(m.buyersPay) + py(P0)) / 2 + 4} textAnchor="middle" className={s.value}>
                        +{money(m.buyersPay - P0)}
                      </text>
                      <text x={BX + BW / 2} y={(py(P0) + py(m.bakersKeep)) / 2 + 4} textAnchor="middle" className={s.value}>
                        −{money(P0 - m.bakersKeep)}
                      </text>
                      <text x={BX + BW + 10} y={py(m.buyersPay) + 4} className={s.value}>
                        buyers pay {money(m.buyersPay)}
                      </text>
                      <text x={BX + BW + 10} y={py(m.bakersKeep) + 4} className={s.value}>
                        bakers keep {money(m.bakersKeep)}
                      </text>
                    </>
                  )}
                  <line x1={BX - 14} y1={py(P0)} x2={BX + BW + 6} y2={py(P0)} stroke="var(--fg)" strokeWidth={2.5} strokeDasharray="6 3" />
                  <text x={BX + BW + 10} y={py(P0) + 4} className={s.axis}>
                    {taxed ? "before" : "price"}
                  </text>
                </svg>

                <Row>
                  <span className={s.rowLabel}>Collect from:</span>
                  <Control
                    className={side === "bakers" ? "active" : ""}
                    disabled={locked || side === "bakers"}
                    aria-pressed={side === "bakers"}
                    aria-label="Collect the tax from bakers"
                    onClick={() => pickSide("bakers")}
                  >
                    bakers
                  </Control>
                  <Control
                    className={side === "buyers" ? "active" : ""}
                    disabled={locked || side === "buyers"}
                    aria-pressed={side === "buyers"}
                    aria-label="Collect the tax from buyers"
                    onClick={() => pickSide("buyers")}
                  >
                    buyers
                  </Control>
                  <Readout label="Loaves" value={locked ? "?" : loaves(m.q)} />
                </Row>
                <Row>
                  <span className={s.rowLabel}>Buyers react:</span>
                  {SLOPES.map((o) => (
                    <Control
                      key={o.b}
                      className={b === o.b ? "active" : ""}
                      disabled={locked || side === "none" || b === o.b}
                      aria-pressed={b === o.b}
                      aria-label={`Buyers react ${o.label}`}
                      onClick={() => pickB(o.b)}
                    >
                      {o.label}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
