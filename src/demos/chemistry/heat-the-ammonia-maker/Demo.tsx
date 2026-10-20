"use client";

// Heat the ammonia maker. Brief: company/domains/briefs/chemistry.energy-rates.md #11.
// N2 + 3H2 ⇌ 2NH3. ΔH° and ΔS° change with temperature, so K comes from full temperature-dependent data:
// the NASA-7 polynomials of McBride, Gordon & Reno, NASA TM-4513 (1993), as in Cantera data/nasa_gas.yaml
// (200-1000 K range; every temperature here is inside it). At 25 °C they give ΔH° = −91.88 kJ/mol and
// ΔS° = −198.1 J/(mol K) (the CODATA values); at 450 °C ΔH° is −105.9 kJ/mol. K = exp(−ΔG°/RT):
//   25 °C: K = 5.6e5 · 200 °C: K = 0.39 · 450 °C: K = 4.9e-5 (a factor of about 1e10).
// v1 held ΔH° and ΔS° at their 25 °C values (0.62, 1.9e-4) with no caveat; disputed in the 2026-10-14 fact-check.
// The bar under the plot is the ammonia share of the settled gas, starting from 1 N2 : 3 H2 at 1 bar
// total (ideal gas): K = 4ξ²(4 − 2ξ)² / (27(1 − ξ)⁴), solved for the extent ξ by bisection; share = 2ξ/(4 − 2ξ).
//   25 °C: 94% · 200 °C: 15% · 450 °C: 0.23%.
//
// One plot: log K (10^-5 to 10^6, a gridline per decade, labels every other decade) against temperature.
// Locked: the axis, three empty temperature columns, an empty bar. Each chip plots K at that temperature
// and leaves its dot (with its value), so the dots fall. "Show speed" labels the 450 °C dot
// "reaches equilibrium faster" (qualitative, no number). Milestones: "t25", "t450" (the question's case),
// "speed". QA path: 25, 200, 450, Show speed, once each in DOM order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// NASA-7 coefficients a1..a7, 200-1000 K (NASA TM-4513). H/RT = a1 + a2T/2 + a3T²/3 + a4T³/4 + a5T⁴/5 + a6/T;
// S/R = a1 ln T + a2T + a3T²/2 + a4T³/3 + a5T⁴/4 + a7.
const NASA = {
  NH3: [4.30177808, -4.7712733e-3, 2.19341619e-5, -2.29856489e-8, 8.28992268e-12, -6748.06394, -0.690644393],
  N2: [3.53100528, -1.23660987e-4, -5.02999437e-7, 2.43530612e-9, -1.40881235e-12, -1046.97628, 2.96747468],
  H2: [2.34433112, 7.98052075e-3, -1.9478151e-5, 2.01572094e-8, -7.37611761e-12, -917.935173, 0.683010238],
};
const gRT = (a: number[], T: number) =>
  a[0] + (a[1] * T) / 2 + (a[2] * T ** 2) / 3 + (a[3] * T ** 3) / 4 + (a[4] * T ** 4) / 5 + a[5] / T -
  (a[0] * Math.log(T) + a[1] * T + (a[2] * T ** 2) / 2 + (a[3] * T ** 3) / 3 + (a[4] * T ** 4) / 4 + a[6]);
const kAt = (c: number) => {
  const T = c + 273.15;
  const dGRT = 2 * gRT(NASA.NH3, T) - gRT(NASA.N2, T) - 3 * gRT(NASA.H2, T);
  return Math.exp(-dGRT);
};
const shareAt = (K: number) => {
  const f = (x: number) => (4 * x * x * (4 - 2 * x) ** 2) / (27 * (1 - x) ** 4) - K;
  let lo = 0;
  let hi = 1 - 1e-12;
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2;
    if (f(m) > 0) hi = m;
    else lo = m;
  }
  const xi = (lo + hi) / 2;
  return (2 * xi) / (4 - 2 * xi);
};

const TEMPS = [25, 200, 450] as const;
type Temp = (typeof TEMPS)[number];

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((ch) => SUP[ch]).join("");
function fmtK(k: number) {
  if (k >= 0.01 && k < 1000) return String(Number(k.toPrecision(2)));
  const e = Math.floor(Math.log10(k));
  let m = Number((k / 10 ** e).toPrecision(2));
  let ee = e;
  if (m >= 10) {
    m = m / 10;
    ee = e + 1;
  }
  return `${m} × 10${sup(ee)}`;
}
const pct = (x: number) => {
  const p = x * 100;
  return `${p >= 10 ? Math.round(p) : Number(p.toPrecision(2))}%`;
};

const W = 320;
const H = 198;
const L = 44;
const RR = 308;
const TOP = 14;
const BOT = 144;
const KHI = 6;
const KLO = -5;
const X = (c: number) => 56 + (c / 500) * 240;
const Y = (logK: number) => TOP + ((KHI - logK) / (KHI - KLO)) * (BOT - TOP);
const BAR_Y = 180;
const BAR_H = 13;

export default function HeatTheAmmoniaMaker({ slug }: { slug: string }) {
  const [plotted, setPlotted] = useState<Temp[]>([]);
  const [now, setNow] = useState<Temp | null>(null);
  const [speed, setSpeed] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A sealed reactor holds N₂ + 3H₂ ⇌ 2NH₃, a reaction that releases heat. You heat it from 25 °C to 450 °C and let it settle. What happens to the ammonia at equilibrium?",
        options: ["rises a lot", "stays about the same", "falls a lot"],
        answer: 2,
      }}
      exploreHint="Plot K at each temperature, then show what heat does to speed."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Heating did not help the ammonia: K fell from about {fmtK(kAt(25))} at 25 °C to about{" "}
            <strong>{fmtK(kAt(450))}</strong> at 450 °C, a factor of billions. Making ammonia releases heat, so heat pushes
            the balance back toward nitrogen and hydrogen.
          </p>
          <p>
            Heat still makes the reaction faster, which is why factories run hot anyway, with an iron catalyst and high
            pressure to win some yield back. Temperature is the one change that moves K itself.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          plotted={plotted}
          setPlotted={setPlotted}
          now={now}
          setNow={setNow}
          speed={speed}
          setSpeed={setSpeed}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  plotted,
  setPlotted,
  now,
  setNow,
  speed,
  setSpeed,
}: {
  locked: boolean;
  interact: () => void;
  plotted: Temp[];
  setPlotted: (t: Temp[]) => void;
  now: Temp | null;
  setNow: (t: Temp) => void;
  speed: boolean;
  setSpeed: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, ["t25", "t450", "speed"]);

  const plot = (t: Temp) => {
    setNow(t);
    if (!plotted.includes(t)) setPlotted([...plotted, t]);
    if (t === 25) reach("t25");
    if (t === 450) reach("t450");
  };

  const share = now === null ? null : shareAt(kAt(now));
  const ticks = Array.from({ length: KHI - KLO + 1 }, (_, i) => KHI - i);
  const x450 = X(450);
  const y450 = Y(Math.log10(kAt(450)));

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`K against temperature. ${plotted.map((t) => `${t} °C: K ${fmtK(kAt(t))}`).join(". ")}${speed ? ". 450 °C reaches equilibrium faster" : ""}`}
      >
        {ticks.map((e) => (
          <g key={e}>
            <line x1={L} x2={RR} y1={Y(e)} y2={Y(e)} className={s.grid} />
            {e % 2 === 0 && (
              <text x={L - 5} y={Y(e) + 3.5} textAnchor="end" className={s.tick}>
                {e === 0 ? "1" : `10${sup(e)}`}
              </text>
            )}
          </g>
        ))}
        <line x1={L} x2={L} y1={TOP} y2={BOT} className={s.axis} />
        <text x={4} y={TOP - 3} className={s.tick}>
          K
        </text>
        <text x={RR} y={TOP + 12} textAnchor="end" className={s.caption}>
          large K: mostly ammonia
        </text>
        {TEMPS.map((t) => (
          <text key={t} x={X(t)} y={BOT + 14} textAnchor="middle" className={s.tick}>
            {t} °C
          </text>
        ))}

        {plotted.map((t) => {
          const k = kAt(t);
          const y = Y(Math.log10(k));
          const x = X(t);
          return (
            <g key={t}>
              <circle cx={x} cy={y} r={5} className={t === now ? s.dotNow : s.dot} />
              <text x={t === 450 ? x : x + 9} y={t === 450 ? y - 9 : y - 6} textAnchor={t === 450 ? "middle" : "start"} className={s.label}>
                {fmtK(k)}
              </text>
            </g>
          );
        })}

        {speed && (
          <g>
            <text x={x450 - 22} y={y450 + 4} textAnchor="end" className={s.speed}>
              reaches equilibrium faster
            </text>
            <path d={`M ${x450 - 19} ${y450} L ${x450 - 8} ${y450} M ${x450 - 12} ${y450 - 3} L ${x450 - 8} ${y450} L ${x450 - 12} ${y450 + 3}`} className={s.speedArrow} />
          </g>
        )}

        <text x={L} y={BAR_Y - 4} className={s.label}>
          {share === null ? "NH₃ at the end (1 bar)" : `NH₃ at the end, ${now} °C: ${pct(share)}`}
        </text>
        <text x={RR} y={BAR_Y - 4} textAnchor="end" className={s.tick}>
          N₂ + H₂
        </text>
        {share === null ? (
          <rect x={L} y={BAR_Y} width={RR - L} height={BAR_H} className={s.slot} />
        ) : (
          <>
            <rect x={L} y={BAR_Y} width={RR - L} height={BAR_H} className={s.rest} />
            <rect x={L} y={BAR_Y} width={Math.max(1.5, share * (RR - L))} height={BAR_H} className={s.nh3} />
          </>
        )}
      </svg>
      <Row>
        {TEMPS.map((t) => (
          <Control key={t} className={now === t ? "active" : ""} disabled={locked || now === t} onClick={() => plot(t)}>
            {t} °C
          </Control>
        ))}
        <Control
          className={`${s.wide} ${speed ? "active" : ""}`}
          aria-pressed={speed}
          disabled={locked}
          onClick={() => {
            setSpeed(!speed);
            reach("speed");
          }}
        >
          {speed ? "Hide speed" : "Show speed"}
        </Control>
      </Row>
    </div>
  );
}
