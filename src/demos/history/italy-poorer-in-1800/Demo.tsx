"use client";

// History: north and central Italy's long decline, 1310-1871. history-data.mjs: maddison, maddison2020.csv,
// Entity "Italy", column "GDP per capita" (Malanima 2010 for 1310-1871, North Italy, per the Maddison README).
// Brief: company/domains/briefs/history.md #18; numbers: section 18 of history-cycle2-check.mjs.
//
// GDP below is the column for 1310..1871 in order (562 values, one a year, none missing), copied unchanged.
// The copy states no unit, so the stage shows only an index, 1450 = 100, rounded as the script does.
// Locked stage: the axes and the line from 1310 to 1450 only (the question gives 1450 = 100).
// The line is drawn up to the latest preset pressed; marks stay. The 1800 readout already carries the yearly
// change, so the reveal's 0.08% is on the required path. Milestones: y1800 (the brief's gate). No Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIRST = 1310;
const GDP = [
  2857.082,2749.5574,2787.959,2787.959,2841.7213,2926.2049,2926.2049,2811,
  2811,2864.7623,2787.959,2818.6803,2672.7541,2588.2705,2649.7131,2734.1967,
  2757.2377,2688.1148,2618.9918,2473.0656,2488.4262,2672.7541,2741.877,2618.9918,
  2588.2705,2572.9098,2642.0328,2711.1557,2665.0738,2549.8689,2642.0328,2787.959,
  2680.4344,2450.0246,2450.0246,2511.4672,2388.582,2450.0246,2672.7541,2634.3525,
  2972.2869,2734.1967,2511.4672,2634.3525,2780.2787,2841.7213,2910.8443,2933.8852,
  3026.0492,2795.6393,2880.123,3195.0164,3241.0984,3072.1311,3179.6557,3271.8197,
  3064.4508,3156.6148,2726.5164,2757.2377,2096.7295,2242.6557,2388.582,2480.7459,
  2073.6885,2849.4016,2557.5492,2649.7131,2450.0246,2373.2213,2949.2459,2795.6393,
  2841.7213,2657.3934,2642.0328,2703.4754,2680.4344,2926.2049,2626.6721,2511.4672,
  2572.9098,2595.9508,2488.4262,2711.1557,3033.7295,2941.5656,2849.4016,2826.3607,
  2764.918,2803.3197,3087.4918,3118.2131,3026.0492,3325.582,3241.0984,2933.8852,
  2995.3279,2895.4836,2857.082,2880.123,3148.9344,2841.7213,2665.0738,3694.2377,
  3425.4262,3118.2131,2857.082,2956.9262,3271.8197,3141.2541,2933.8852,3187.3361,
  3548.3115,3440.7869,3602.0738,3317.9016,3241.0984,3287.1803,3648.1557,3632.7951,
  3433.1066,3010.6885,2849.4016,3256.459,3325.582,3271.8197,3087.4918,3287.1803,
  3279.5,2979.9672,2979.9672,2964.6066,2741.877,3287.1803,3110.5328,3287.1803,
  3195.0164,3609.7541,3486.8689,3494.5492,3218.0574,3210.377,3325.582,3325.582,
  3248.7787,3079.8115,2926.2049,2903.1639,3317.9016,3494.5492,3663.5164,3663.5164,
  3502.2295,3356.3033,2956.9262,2933.8852,2933.8852,2987.6475,3141.2541,3187.3361,
  3387.0246,3333.2623,3148.9344,2880.123,2811,2849.4016,2757.2377,2811,
  2964.6066,2895.4836,2933.8852,2926.2049,2680.4344,2572.9098,2741.877,2941.5656,
  2818.6803,2787.959,2818.6803,2903.1639,2795.6393,2872.4426,2979.9672,2910.8443,
  2718.8361,2718.8361,2480.7459,2542.1885,2695.7951,2734.1967,2703.4754,2595.9508,
  2557.5492,2580.5902,2434.6639,2634.3525,2887.8033,2864.7623,2979.9672,2995.3279,
  3072.1311,2872.4426,2926.2049,3010.6885,2926.2049,2849.4016,2895.4836,3079.8115,
  3102.8525,3010.6885,2887.8033,2665.0738,2634.3525,2680.4344,3010.6885,2995.3279,
  2711.1557,2488.4262,2457.7049,2603.6311,2465.3852,2542.1885,2534.5082,2503.7869,
  2864.7623,2964.6066,2880.123,2933.8852,2665.0738,2442.3443,2549.8689,2834.041,
  2864.7623,2734.1967,2757.2377,2703.4754,2872.4426,2557.5492,2565.2295,2695.7951,
  2526.8279,2618.9918,2826.3607,2711.1557,2419.3033,2373.2213,2480.7459,2403.9426,
  2457.7049,2411.623,2519.1475,2534.5082,2365.541,2634.3525,2503.7869,2534.5082,
  2572.9098,2734.1967,2588.2705,2419.3033,2572.9098,2511.4672,2542.1885,2634.3525,
  2618.9918,2542.1885,2626.6721,2588.2705,2542.1885,2442.3443,2457.7049,2519.1475,
  2526.8279,2572.9098,2526.8279,2480.7459,2496.1066,2534.5082,2542.1885,2480.7459,
  2396.2623,2327.1393,2350.1803,2465.3852,2403.9426,2396.2623,2273.377,2327.1393,
  2396.2623,2496.1066,2403.9426,2304.0984,2319.459,2426.9836,2350.1803,2373.2213,
  2296.418,2311.7787,2388.582,2496.1066,2565.2295,2534.5082,2496.1066,2480.7459,
  2511.4672,2465.3852,2557.5492,2511.4672,2426.9836,2450.0246,2519.1475,2626.6721,
  2588.2705,2580.5902,2603.6311,2688.1148,2642.0328,2542.1885,2442.3443,2403.9426,
  2557.5492,2703.4754,2857.082,2849.4016,2895.4836,2595.9508,2657.3934,2757.2377,
  2880.123,2880.123,2941.5656,3003.0082,2818.6803,2657.3934,2665.0738,2757.2377,
  2787.959,2657.3934,2542.1885,2488.4262,2465.3852,2718.8361,2741.877,2711.1557,
  2741.877,2749.5574,2672.7541,2595.9508,2572.9098,2572.9098,2618.9918,2672.7541,
  2695.7951,2688.1148,2680.4344,2711.1557,2787.959,2795.6393,2764.918,2672.7541,
  2634.3525,2672.7541,2695.7951,2711.1557,2688.1148,2542.1885,2565.2295,2473.0656,
  2473.0656,2526.8279,2534.5082,2603.6311,2634.3525,2657.3934,2572.9098,2457.7049,
  2526.8279,2657.3934,2634.3525,2626.6721,2473.0656,2480.7459,2542.1885,2511.4672,
  2419.3033,2388.582,2396.2623,2426.9836,2503.7869,2526.8279,2603.6311,2580.5902,
  2565.2295,2595.9508,2611.3115,2618.9918,2588.2705,2665.0738,2657.3934,2511.4672,
  2665.0738,2803.3197,2834.041,2834.041,2872.4426,2818.6803,2811,2834.041,
  2811,2887.8033,3033.7295,2995.3279,2972.2869,3079.8115,3148.9344,3010.6885,
  2949.2459,3010.6885,3026.0492,3033.7295,2979.9672,2880.123,2910.8443,2726.5164,
  2626.6721,2665.0738,2726.5164,2818.6803,2841.7213,2849.4016,2772.5984,2734.1967,
  2803.3197,2780.2787,2787.959,2772.5984,2672.7541,2626.6721,2649.7131,2726.5164,
  2703.4754,2695.7951,2757.2377,2895.4836,2895.4836,2826.3607,2787.959,2787.959,
  2811,2803.3197,2857.082,2887.8033,2903.1639,2849.4016,2787.959,2734.1967,
  2634.3525,2680.4344,2726.5164,2757.2377,2626.6721,2603.6311,2526.8279,2542.1885,
  2503.7869,2473.0656,2588.2705,2511.4672,2450.0246,2557.5492,2657.3934,2588.2705,
  2549.8689,2519.1475,2511.4672,2542.1885,2572.9098,2503.7869,2557.5492,2549.8689,
  2426.9836,2473.0656,2488.4262,2411.623,2442.3443,2511.4672,2519.1475,2549.8689,
  2603.6311,2526.8279,2403.9426,2373.2213,2450.0246,2519.1475,2626.6721,2542.1885,
  2603.6311,2611.3115,2757.2377,2772.5984,2557.5492,2473.0656,2526.8279,2595.9508,
  2626.6721,2511.4672,2473.0656,2496.1066,2688.1148,2665.0738,2665.0738,2618.9918,
  2649.7131,2672.7541,2741.877,2703.4754,2780.2787,2734.1967,2703.4754,2695.7951,
  2657.3934,2749.5574,2772.5984,2787.959,2811,2887.8033,2680.4344,2611.3115,
  2649.7131,2626.6721,2711.1557,2764.918,2787.959,2649.7131,2649.7131,2672.7541,
  2649.7131,2588.2705,2657.3934,2642.0328,2611.3115,2611.3115,2572.9098,2519.1475,
  2350.1803,2373.2213,2380.9016,2572.9098,2672.7541,2588.2705,2572.9098,2557.5492,
  2634.3525,2688.1148,2642.0328,2780.2787,2588.2705,2611.3115,2626.6721,2695.7951,
  2826.3607,2811.12
];
const LAST = FIRST + GDP.length - 1;
const g = (y: number) => GDP[y - FIRST];
const idx = (y: number) => (100 * g(y)) / g(1450);
const I = (y: number) => Math.round(idx(y));
const SPAN = 1800 - 1450;
const RATE = 100 * (Math.pow(g(1800) / g(1450), 1 / SPAN) - 1);
const rateTxt = `${RATE < 0 ? "−" : "+"}${Math.abs(RATE).toFixed(2)}% a year`;

const MILESTONES = ["y1800"] as const;
type View = "none" | "y1450" | "y1800" | "whole" | "rate";

const W = 340;
const H = 178;
const L = 34;
const R = 326;
const T = 26;
const B = 150;
const MAX = 120;
const xs = (y: number) => L + ((y - FIRST) / (LAST - FIRST)) * (R - L);
const ys = (v: number) => B - (v / MAX) * (B - T);
const path = (to: number) =>
  GDP.slice(0, to - FIRST + 1)
    .map((_, i) => `${i ? "L" : "M"}${xs(FIRST + i).toFixed(1)} ${ys(idx(FIRST + i)).toFixed(1)}`)
    .join(" ");

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("none");
  const [drawnTo, setDrawnTo] = useState(1450);
  const [marks, setMarks] = useState<number[]>([]);
  const go = (v: View) => {
    setView(v);
    const to = v === "y1800" || v === "rate" ? 1800 : v === "whole" ? LAST : 1450;
    setDrawnTo((d) => Math.max(d, to));
    if (v === "y1450" || v === "y1800" || v === "rate") {
      const add = v === "y1450" ? [1450] : [1450, 1800];
      setMarks((m) => [...new Set([...m, ...add])]);
    }
    if (v === "y1800" || v === "rate") reach("y1800");
  };
  const readLabel = view === "rate" ? `1450 to 1800, ${SPAN} years` : view === "whole" ? `${FIRST} to ${LAST}` : "Index, 1450 = 100";
  const readValue =
    locked || view === "none"
      ? "?"
      : view === "y1450"
        ? "1450: 100"
        : view === "y1800"
          ? `1800: ${I(1800)} (${rateTxt} since 1450)`
          : view === "whole"
            ? `${FIRST}: ${I(FIRST)} · 1450: 100 · 1800: ${I(1800)} · ${LAST}: ${I(LAST)}`
            : `${rateTxt}: 100 → ${I(1800)}`;
  const label = locked
    ? "Index of income per person in north and central Italy, 1450 = 100, drawn from 1310 to 1450."
    : `Index of income per person in north and central Italy, 1450 = 100, drawn from 1310 to ${drawnTo}.` +
      marks.map((y) => ` ${y}: ${I(y)}.`).join("");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        <text x={4} y={11} className={s.title}>
          index of income per person (1450 = 100)
        </text>
        <line x1={L} y1={B} x2={R} y2={B} className={s.axis} />
        <line x1={L} y1={T} x2={L} y2={B} className={s.axis} />
        <line x1={L} y1={ys(100)} x2={R} y2={ys(100)} className={s.ref} />
        {[0, 50, 100].map((v) => (
          <text key={v} x={L - 4} y={ys(v) + 4} className={s.tick} textAnchor="end">
            {v}
          </text>
        ))}
        {[1350, 1450, 1550, 1650, 1750, 1850].map((y) => (
          <g key={y}>
            <line x1={xs(y)} y1={B} x2={xs(y)} y2={B + 4} className={s.axis} />
            <text x={xs(y)} y={B + 16} className={s.tick} textAnchor="middle">
              {y}
            </text>
          </g>
        ))}
        <path d={path(locked ? 1450 : drawnTo)} className={s.line} />
        {!locked && view === "rate" && (
          <line x1={xs(1450)} y1={ys(100)} x2={xs(1800)} y2={ys(idx(1800))} className={s.trend} />
        )}
        {!locked &&
          marks.map((y) => (
            <g key={y}>
              <circle cx={xs(y)} cy={ys(idx(y))} r={4.5} className={s.on} />
              <text x={xs(y)} y={ys(idx(y)) + 18} className={s.lab} textAnchor="middle">
                {y}: {I(y)}
              </text>
            </g>
          ))}
      </svg>
      <Row foldAtReveal>
        <Control disabled={locked} className={view === "y1450" ? "active" : ""} onClick={() => go("y1450")}>
          1450
        </Control>
        <Control disabled={locked} className={view === "y1800" ? "active" : ""} onClick={() => go("y1800")}>
          1800
        </Control>
        <Control disabled={locked} className={view === "whole" ? "active" : ""} onClick={() => go("whole")}>
          {FIRST} to {LAST}, the whole line
        </Control>
        <Control disabled={locked} className={view === "rate" ? "active" : ""} onClick={() => go("rate")}>
          Change per year
        </Control>
      </Row>
      <Readout label={readLabel} value={readValue} />
    </div>
  );
}

export default function ItalyPoorerIn1800({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Maddison's series puts income per person in north and central Italy at an index of 100 in 1450. What was it in 1800?",
        options: ["About 75", "About 100", "About 150"],
        answer: 0,
      }}
      exploreHint="Press 1450, then 1800, and read the index."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On this series, a person in north and central Italy in 1800 had about {I(1800)}% of the income of one in 1450: a
            fall of about {Math.abs(RATE).toFixed(2)}% a year for {SPAN} years. Income per person can shrink for centuries,
            not only grow.
          </p>
          <p>
            Where it stops: this is one reconstruction, it covers only the north and centre before 1871, and the copy we
            opened states no unit, so it is read as an index.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
