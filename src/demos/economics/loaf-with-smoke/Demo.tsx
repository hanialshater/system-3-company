"use client";

// Externality. One graph: buyers' price falls with loaves, bakers' cost rises; the market makes the
// loaves where they cross. A third line adds the harm to neighbours per loaf; where it crosses the
// buyers' line is the quantity that matches the true cost.
// Key state: harm $1 per loaf: true-cost crossing at 35 loaves, left of the market's 40.
// Model: straight lines, harm valued at an illustrative dollar amount; no claim about any policy.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q_HARM = 1;
const MILESTONES = ["harm-one"] as const;

const buyers = (q: number) => (100 - q) / 10;
const bakers = (q: number) => (q + 20) / 10;
/** Loaves where buyers' price equals bakers' cost plus an extra per-loaf amount. */
const crossing = (extra: number) => (100 - 20 - 10 * extra) / 2;
const MARKET = crossing(0); // 40
const TRUE_Q = crossing(Q_HARM); // 35
const usd = (v: number) => `$${v.toFixed(2)}`;
const usd1 = (v: number) => `$${v % 1 === 0 ? v : v.toFixed(1)}`;

const X0 = 36;
const X1 = 304;
const Y0 = 126;
const Y1 = 12;
const QMAX = 100;
const PMAX = 12;
const px = (q: number) => X0 + (q / QMAX) * (X1 - X0);
const py = (p: number) => Y0 - (p / PMAX) * (Y0 - Y1);

export default function LoafWithSmoke({ slug }: { slug: string }) {
  const [harm, setHarm] = useState(0);
  const [tax, setTax] = useState(false);
  const [taxSeen, setTaxSeen] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Buyers pay less for each extra loaf; bakers' cost per loaf rises. They meet at ${MARKET} loaves. But each loaf also causes $${Q_HARM} of smoke damage to neighbours. At how many loaves does the buyers' price equal the true cost (bakers' cost plus smoke)?`,
        options: [String(MARKET), String(TRUE_Q), "0"],
        answer: 1,
      }}
      exploreHint={`Add $${Q_HARM} of smoke harm per loaf and find where the lines cross.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The market stops at <strong>{MARKET}</strong> loaves, where buyers&apos; price equals the bakers&apos; cost. With ${Q_HARM} of
            smoke per loaf, the true cost line meets the buyers&apos; line at <strong>{TRUE_Q}</strong>. Loaves past {TRUE_Q}, up to {MARKET}, are worth less to buyers than they truly cost: the shaded wedge.
          </p>
          <p>
            A cost that falls on others is left out of the price, so more is made than the true cost justifies.
            {taxSeen && ` In this model a $${Q_HARM} cost on bakers moves the market to ${TRUE_Q}; it is not a policy claim.`}
          </p>
          <p className="muted">A model: straight lines, harm valued at $1 for illustration.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const setH = (v: number) => {
              setHarm(v);
              if (v === Q_HARM) reach("harm-one");
            };
            const t = tax ? Q_HARM : 0;
            const marketQ = crossing(t);
            const trueQ = crossing(harm);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: straight lines, invented numbers</p>
                <svg viewBox="0 0 320 156" className="stage-svg" role="img" aria-label="Buyers' price and costs against loaves">
                  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--line)" strokeWidth={1.5} />
                  <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--line)" strokeWidth={1.5} />
                  <text x={X1} y={Y0 + 14} textAnchor="end" className={s.axis}>
                    loaves (q)
                  </text>
                  <text x={X0 + 4} y={Y1 + 2} className={s.axis}>
                    price ($)
                  </text>
                  <line x1={px(0)} y1={py(buyers(0))} x2={px(QMAX)} y2={py(buyers(QMAX))} className={s.line} />
                  <text x={px(8)} y={py(buyers(8)) - 4} className={s.small}>
                    buyers
                  </text>
                  <line x1={px(0)} y1={py(bakers(0) + t)} x2={px(QMAX)} y2={py(bakers(QMAX) + t)} className={s.line2} />
                  <text x={px(72)} y={py(bakers(72) + t) + 14} className={s.small}>
                    bakers{tax ? " + $1 cost" : ""}
                  </text>
                  {!locked && harm > 0 && (
                    <>
                      {trueQ < MARKET && (
                        <polygon
                          points={`${px(trueQ)},${py(buyers(trueQ))} ${px(MARKET)},${py(buyers(MARKET))} ${px(MARKET)},${py(bakers(MARKET) + harm)}`}
                          fill="var(--bad)"
                          opacity={0.35}
                        />
                      )}
                      <line x1={px(0)} y1={py(bakers(0) + harm)} x2={px(QMAX)} y2={py(bakers(QMAX) + harm)} stroke="var(--bad)" strokeWidth={3} strokeDasharray="5 4" />
                      <text x={px(6)} y={py(bakers(6) + harm) - 6} className={s.small}>
                        true cost
                      </text>
                      <line x1={px(trueQ)} y1={Y0} x2={px(trueQ)} y2={py(buyers(trueQ))} stroke="var(--bad)" strokeWidth={1.5} />
                      <text x={px(trueQ)} y={Y0 + 14} textAnchor="end" className={s.small}>
                        {trueQ}
                      </text>
                    </>
                  )}
                  <line x1={px(marketQ)} y1={Y0} x2={px(marketQ)} y2={py(buyers(marketQ))} stroke="var(--fg)" strokeWidth={1.5} />
                  <text x={px(marketQ) + 3} y={Y0 + 14} className={s.small}>
                    {marketQ}
                  </text>
                </svg>
                <p className={s.msg} aria-live="polite">
                  {!locked && harm > 0 ? `Shaded: loaves past ${trueQ} cost more than buyers pay.` : ""}
                </p>
                <Row>
                  <Readout label="Market makes" value={`${marketQ} loaves`} />
                  <Readout label="True cost says" value={locked ? "?" : `${trueQ} loaves`} />
                  <Readout label="Smoke per loaf" value={usd1(harm)} />
                </Row>
                <Row>
                  <Control className={harm === Q_HARM ? "active" : ""} disabled={locked || harm === Q_HARM} onClick={() => setH(Q_HARM)}>
                    Smoke harm ${Q_HARM}
                  </Control>
                  <Control
                    className={tax ? "active" : ""}
                    disabled={locked}
                    onClick={() => {
                      setTax(!tax);
                      setTaxSeen(true);
                    }}
                  >
                    {tax ? "Remove $1 on bakers" : "Put $1 cost on bakers"}
                  </Control>
                </Row>
                <Slider label="Smoke harm per loaf" value={harm} min={0} max={3} step={0.5} format={usd1} disabled={locked} onChange={setH} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
