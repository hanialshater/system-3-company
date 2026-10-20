"use client";

// Price floor. The bread model from supply-demand: buyers want 100 − 10p loaves, bakers bake 10p − 20,
// lines cross at $6 and 40 loaves. A rule sets the lowest legal price. One graph: the floor line, and
// where it binds, the gap between what buyers take and what bakers bake, labelled as unsold loaves.
// Key state: floor $8: buyers 20, bakers 60, 40 unsold. Below $6 the rule does not bind.
// Model: straight lines, one market, bakers bake what they would supply at the floor price.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q_FLOOR = 8;
const MIN_F = 4;
const MAX_F = 10;
const START = 6; // QA's two arrow presses: 6 → 7 → 8
const MILESTONES = ["floor-8"] as const;

const demand = (p: number) => 100 - 10 * p;
const supply = (p: number) => 10 * p - 20;
const P0 = 6; // 100 − 10p = 10p − 20
const Q0 = demand(P0); // 40
/** The price that holds under a floor f, and what is bought, baked and left. */
const market = (f: number) => {
  const p = Math.max(f, P0);
  const bought = demand(p);
  const baked = supply(p);
  return { p, bought, baked, unsold: baked - bought, binds: f > P0 };
};
const QM = market(Q_FLOOR);

// Geometry (viewBox 320 × 200): loaves 0..90 across, price $0..$10 up.
const L = 34;
const R = 308;
const TOP = 10;
const BOT = 176;
const QMAX = 90;
const px = (q: number) => L + (q / QMAX) * (R - L);
const py = (p: number) => BOT - (p / 10) * (BOT - TOP);

export default function PriceFloorGlut({ slug }: { slug: string }) {
  const [floor, setFloor] = useState(START);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In the town bread market, buyers want 100 − 10p loaves at price p and bakers bake 10p − 20, meeting at $${P0} and ${Q0} loaves. A new rule bans selling bread below $${Q_FLOOR}. How many loaves go unsold?`,
        options: ["0", String(QM.bought), String(QM.unsold)],
        answer: 2,
      }}
      exploreHint={`Raise the lowest legal price to $${Q_FLOOR} and read the gap.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the floor at ${Q_FLOOR}, buyers took only <strong>{QM.bought}</strong> loaves while bakers baked{" "}
            <strong>{QM.baked}</strong>: <strong>{QM.unsold} unsold</strong>. The price rose ${Q_FLOOR - P0}, and the loaves actually
            sold fell from {Q0} to {QM.bought}.
          </p>
          <p>
            At ${Q_FLOOR} buyers want fewer loaves, while bakers, promised {`$${Q_FLOOR}`}, bake more. The gap between the two is a surplus.
            {seen.some((f) => f < P0) && ` Below $${P0} the floor changed nothing: the price was already higher.`}
          </p>
          <p className="muted">A model: straight lines, one market, bakers bake for the floor price. Not a claim about any real rule.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (f: number) => {
              setFloor(f);
              setSeen((sn) => (sn.includes(f) ? sn : [...sn, f]));
              if (f === Q_FLOOR) reach("floor-8");
            };
            const m = market(floor);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Toy bread market: straight lines</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Bread market crossing at $6" : m.binds ? `${m.unsold} loaves unsold` : "Floor does not bind"}
                >
                  {[2, 4, 6, 8, 10].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {[0, 30, 60, 90].map((k) => (
                    <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 90 ? "end" : "middle"} className={s.axis}>
                      {k === 90 ? "90 loaves" : k}
                    </text>
                  ))}
                  <line x1={px(0)} y1={py(10)} x2={px(QMAX)} y2={py(1)} className={s.line} />
                  <text x={px(84)} y={py(1) - 8} textAnchor="end" className={s.axis}>
                    buyers
                  </text>
                  <line x1={px(0)} y1={py(2)} x2={px(80)} y2={py(10)} className={s.line2} />
                  <text x={px(80) - 6} y={py(10) + 4} textAnchor="end" className={s.axis}>
                    bakers
                  </text>
                  <circle cx={px(Q0)} cy={py(P0)} r={4} fill="var(--muted)" />
                  {!locked && (
                    <>
                      <line
                        x1={L}
                        y1={py(floor)}
                        x2={R}
                        y2={py(floor)}
                        stroke="var(--fg)"
                        strokeWidth={m.binds ? 2 : 1.5}
                        strokeDasharray={m.binds ? undefined : "4 4"}
                      />
                      <text x={R} y={py(floor) - 6} textAnchor="end" className={s.value}>
                        floor ${floor}
                        {m.binds ? "" : ": no effect"}
                      </text>
                      {m.binds && (
                        <>
                          <line x1={px(m.bought)} y1={py(floor)} x2={px(m.baked)} y2={py(floor)} stroke="var(--bad)" strokeWidth={6} />
                          <circle cx={px(m.bought)} cy={py(floor)} r={5} className={s.dot} />
                          <circle cx={px(m.baked)} cy={py(floor)} r={5} className={s.dot} />
                          <text x={(px(m.bought) + px(m.baked)) / 2} y={py(floor) - 10} textAnchor="middle" className={s.big}>
                            {m.unsold} unsold
                          </text>
                        </>
                      )}
                    </>
                  )}
                </svg>

                <Slider label="Lowest legal price" value={floor} min={MIN_F} max={MAX_F} disabled={locked} format={(v) => `$${v}`} onChange={set} />
                <Row>
                  <Readout label="Bought" value={locked ? "?" : m.bought} />
                  <Readout label="Baked" value={locked ? "?" : m.baked} />
                  <Readout label="Unsold" value={locked ? "?" : m.unsold} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
