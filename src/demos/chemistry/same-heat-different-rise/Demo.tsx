"use client";

// One chart: temperature rise against heat added, for 1 kg of water and 1 kg of iron given the
// same heat. Each line is drawn only as far as the learner has turned the heat up. Iron's line
// climbs about 9 times as steeply: it needs about 9 times less energy per degree.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const C_WATER = 4.18; // kJ/(kg K), about 25 °C
const C_IRON = 0.449; // kJ/(kg K), about 25 °C
const Q_ASK = 4.2; // kJ
const STEP = 2.1;
const Q_MAX = 8.4;
const riseW = (q: number) => q / C_WATER;
const riseI = (q: number) => q / C_IRON;
const TIMES = Math.round(riseI(Q_ASK) / riseW(Q_ASK)); // 9

const W = 320;
const H = 200;
const L = 34;
const R = 54;
const TOP = 24;
const BASE = 168;
const YMAX = 20;
const X = (q: number) => L + (q / Q_MAX) * (W - L - R);
const Y = (t: number) => BASE - (t / YMAX) * (BASE - TOP);
const kJ = (q: number) => `${q.toFixed(1)} kJ`;
const deg = (t: number) => `${t < 10 ? t.toFixed(1) : t.toFixed(0)} °C`;

export default function SameHeatDifferentRise({ slug }: { slug: string }) {
  const [q, setQ] = useState(0);
  const [most, setMost] = useState(0);
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["gave-4.2"]);

  const sawAsk = most >= Q_ASK - 1e-9;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On the stove, you give 1 kg of water and a 1 kg iron skillet the same ${Q_ASK} kJ of heat each. The iron's temperature rises by about…`,
        options: ["The same as the water's", `${TIMES} times as much as the water's`, "Half as much as the water's"],
        answer: 1,
      }}
      exploreHint={`Turn the heat up to ${Q_ASK} kJ and compare the two lines.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {sawAsk ? "You saw it" : "Turn the heat up and you see it"}: {Q_ASK} kJ warms the water by about{" "}
            <strong>{deg(riseW(Q_ASK))}</strong> and the iron by about <strong>{deg(riseI(Q_ASK))}</strong>, about{" "}
            {TIMES} times as much.
          </p>
          <p>
            Each material needs its own amount of energy per degree. Water takes about {C_WATER} kJ to warm 1 kg by 1 °C;
            iron takes only about {C_IRON} kJ. Few common substances soak up as much energy per degree as water, which is
            why seas and lakes warm and cool so slowly.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`At ${kJ(q)} water rose ${deg(riseW(q))} and iron ${deg(riseI(q))}`}>
              {[0, 5, 10, 15, 20].map((t) => (
                <g key={t}>
                  <line x1={L} x2={W - R} y1={Y(t)} y2={Y(t)} className={s.grid} />
                  <text x={L - 4} y={Y(t) + 3} textAnchor="end" className={s.small}>
                    {t === 0 ? "0" : `+${t}`}
                  </text>
                </g>
              ))}
              {[0, 2.1, 4.2, 6.3, 8.4].map((x) => (
                <text key={x} x={X(x)} y={BASE + 13} textAnchor="middle" className={s.small}>
                  {x}
                </text>
              ))}
              <text x={(L + W - R) / 2} y={BASE + 27} textAnchor="middle" className={s.small}>
                heat added, kJ (1 kg each)
              </text>
              <text x={4} y={11} className={s.small}>
                °C rise
              </text>
              {most > 0 && (
                <>
                  <line x1={X(0)} y1={Y(0)} x2={X(most)} y2={Y(riseI(most))} className={s.iron} />
                  <line x1={X(0)} y1={Y(0)} x2={X(most)} y2={Y(riseW(most))} className={s.water} />
                </>
              )}
              <circle cx={X(q)} cy={Y(riseI(q))} r={5} className={s.ironDot} />
              <circle cx={X(q)} cy={Y(riseW(q))} r={5} className={s.waterDot} />
              {most > 0 && (
                <>
                  <text x={X(most) + 8} y={Y(riseI(most)) + 4} className={s.label}>
                    iron
                  </text>
                  <text x={X(most) + 8} y={Y(riseW(most)) + 4} className={s.label}>
                    water
                  </text>
                </>
              )}
            </svg>
            <Slider
              label="Heat added to each"
              value={q}
              min={0}
              max={Q_MAX}
              step={STEP}
              disabled={locked}
              format={kJ}
              onChange={(v) => {
                const r = Math.round(v * 10) / 10;
                setQ(r);
                setMost((m) => Math.max(m, r));
                if (Math.abs(r - Q_ASK) < 1e-6) reach("gave-4.2");
              }}
            />
            <Row>
              <Readout label="Water rose" value={deg(riseW(q))} />
              <Readout label="Iron rose" value={deg(riseI(q))} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
