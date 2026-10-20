"use client";

// One chart: temperature of 1.0 kg of ice at 0 °C against heat added. The line is traced only as
// far as the learner has heated. For the first 334 kJ it stays flat at 0 °C while the ice melts;
// after that the water warms by about 1 °C per 4.18 kJ. At 200 kJ: 0.60 kg melted, still 0 °C.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MASS = 1.0; // kg of ice at 0 °C
const LF = 334; // kJ/kg, latent heat of fusion
const C = 4.18; // kJ/(kg K), liquid water
const MELT = MASS * LF; // 334 kJ
const Q_ASK = 200; // kJ
const STEP = 100;
const Q_MAX = 700;
const temp = (q: number) => (q <= MELT ? 0 : Math.min(100, (q - MELT) / (MASS * C)));
const iceLeft = (q: number) => Math.max(0, MASS - q / LF);
const NAIVE = Q_ASK / (MASS * C); // 47.8 °C if no heat went into melting
const NAMES = ["at-200"] as const;

const W = 320;
const H = 196;
const L = 40;
const R = 14;
const TOP = 14;
const BASE = 160;
const TMIN = -10;
const TMAX = 100;
const X = (q: number) => L + (q / Q_MAX) * (W - L - R);
const Y = (t: number) => BASE - ((t - TMIN) / (TMAX - TMIN)) * (BASE - TOP);
const trace = (upTo: number) => {
  const pts = [0, Math.min(upTo, MELT), upTo].filter((q, i, a) => i === 0 || q > a[i - 1]);
  return pts.map((q, i) => `${i ? "L" : "M"} ${X(q).toFixed(1)} ${Y(temp(q)).toFixed(1)}`).join(" ");
};
const deg = (t: number) => `${t.toFixed(t > 0 && t < 10 ? 1 : 0)} °C`;

export default function HeatInNoRise({ slug }: { slug: string }) {
  const [q, setQ] = useState(0);
  const [most, setMost] = useState(0);
  const [saw, setSaw] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You heat a bowl holding ${MASS.toFixed(1)} kg of ice at 0 °C, giving it ${Q_ASK} kJ of heat. Melting it all needs about ${LF} kJ. What is in the bowl then?`,
        options: [`about ${Math.round(NAIVE)} °C water`, "ice and water at 0 °C", "about 100 °C steam"],
        answer: 1,
      }}
      exploreHint={`Add heat up to ${Q_ASK} kJ and watch the thermometer line.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {saw ? "You saw" : "Add it and you see"} {Q_ASK} kJ melt about{" "}
            <strong>{(MASS - iceLeft(Q_ASK)).toFixed(2)} kg</strong> of the ice while the line stayed flat at{" "}
            <strong>0 °C</strong>. {iceLeft(Q_ASK).toFixed(2)} kg of ice was still there.
            {most > MELT ? ` Only past ${MELT} kJ, with the ice gone, did the line start to climb.` : ""}
          </p>
          <p>
            Heat has two jobs. Melting uses it to break molecules free of the ice&apos;s rigid structure, which does not
            make them move faster, so the temperature holds. Only once all the ice has melted does extra heat speed the
            molecules up: about {C} kJ per degree for 1 kg of water. The same {Q_ASK} kJ given to 1 kg of liquid water at 0 °C would have warmed it to about {Math.round(NAIVE)} °C.

          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => (
            <div className={s.wrap}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className={`stage-svg ${s.fit}`}
                role="img"
                aria-label={`After ${q} kJ: ${deg(temp(q))}, ${iceLeft(q).toFixed(2)} kg of ice left`}
              >
                {[0, 50, 100].map((t) => (
                  <g key={t}>
                    <line x1={L} x2={W - R} y1={Y(t)} y2={Y(t)} className={s.grid} />
                    <text x={L - 4} y={Y(t) + 3} textAnchor="end" className={s.small}>
                      {t} °C
                    </text>
                  </g>
                ))}
                {[0, 200, 400, 600].map((x) => (
                  <text key={x} x={X(x)} y={BASE + 13} textAnchor="middle" className={s.small}>
                    {x}
                  </text>
                ))}
                <text x={(L + W - R) / 2} y={BASE + 27} textAnchor="middle" className={s.small}>
                  heat added, kJ · 1.0 kg, starts as ice at 0 °C
                </text>
                {most > 0 && <path d={trace(most)} className={s.trace} />}
                {most > 0 && (
                  <text x={X(Math.min(most, MELT) / 2)} y={Y(0) - 7} textAnchor="middle" className={s.label}>
                    melting
                  </text>
                )}
                <circle cx={X(q)} cy={Y(temp(q))} r={5.5} className={s.dot} />
              </svg>
              <Slider
                label="Heat added"
                value={q}
                min={0}
                max={Q_MAX}
                step={STEP}
                disabled={locked}
                format={(v) => `${v} kJ`}
                onChange={(v) => {
                  setQ(v);
                  setMost((m) => Math.max(m, v));
                  if (v === Q_ASK) {
                    setSaw(true);
                    reach("at-200");
                  }
                }}
              />
              <Row>
                <Readout label="Temperature" value={deg(temp(q))} />
                <Readout label="Ice left" value={`${iceLeft(q).toFixed(2)} kg`} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
