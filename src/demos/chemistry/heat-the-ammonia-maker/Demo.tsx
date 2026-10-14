"use client";

// Heat the ammonia maker. Brief: company/domains/briefs/chemistry.energy-rates.md #11.
// N2 + 3H2 ⇌ 2NH3. ΔH° = 2(−45.94) = −91.88 kJ/mol; ΔS° = 2(192.77) − 191.61 − 3(130.68) = −198.1 J/(mol K)
// (CODATA / CRC, 25 °C). Holding both constant (stated in the claims): K = exp(−(ΔH° − TΔS°)/RT).
//   25 °C: K = 5.6e5 · 200 °C: K = 0.62 · 450 °C: K = 1.9e-4 (a factor of about 3e9).
// The bar under the plot is the ammonia share of the settled gas, starting from 1 N2 : 3 H2 at 1 bar
// total (ideal gas): K = 4ξ²(4 − 2ξ)² / (27(1 − ξ)⁴), solved for the extent ξ by bisection; share = 2ξ/(4 − 2ξ).
//   25 °C: 94% · 200 °C: 17% · 450 °C: 0.45%.
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

const R = 8.314;
const DH = 2 * -45.94e3; // J/mol
const DS = 2 * 192.77 - 191.61 - 3 * 130.68; // J/(mol K)
const kAt = (c: number) => {
  const T = c + 273.15;
  return Math.exp(-(DH - T * DS) / (R * T));
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
          "N₂ + 3H₂ ⇌ 2NH₃ releases heat. Heat it from 25 °C to 450 °C and let it settle. The ammonia at equilibrium…",
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
          className={speed ? "active" : ""}
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
