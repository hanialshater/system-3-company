"use client";

// Coal or oil in 2024? Brief: company/domains/briefs/history.md #17 (check section 17,
// company/domains/briefs/checks/history-cycle2-check.mjs). Data: OWID CO2 data (history-data.mjs: co2,
// owid-co2-data.csv), row World, columns coal_co2, oil_co2, gas_co2 and co2 (million tonnes), every year
// 1750-2024, rounded to 0.1 Mt. "Other" = co2 minus coal, oil and gas. World only: no country is named
// (care line of brief 9). Each source has a pattern as well as a colour (oil hatched, gas dotted).
//
// Presets in DOM order (each sets the whole view; no Reset):
//   "1900", "1968", "2005", "2024"  shares (100% stacked) drawn from 1750 up to that year, each band's share
//                                    labelled at the right edge. Milestones: `y1900` (records coal's share),
//                                    `y2005` (records the years oil was ahead; draws the "oil ahead" bracket),
//                                    `y2024` (records coal's and oil's 2024 shares).
//   "Tonnes, not shares"             the same bands in million tonnes, 1750-2024; milestone `tonnes` records
//                                    coal 2024 / coal 1968.
// The locked frame shows empty axes. The reveal is gated on y1900, y2005, y2024 and tonnes, every value it
// quotes (the brief gated y2024 and tonnes; it also quotes 1900 and 2005, which are presses 1 and 3).

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Y0 = 1750;
const Y1 = 2024;
// history-data.mjs: co2, owid-co2-data.csv, row World, 1750..2024, one value per year (Mt).
const RAW = {"coal":"9.3,9.4,9.5,9.6,9.7,9.8,9.9,10.1,10.2,10.3,10.5,10.7,11,11.2,11.4,11.6,11.9,12.2,12.5,12.8,13.1,13.4,13.6,13.8,14,14.3,14.7,15,15.2,15.5,15.9,16.2,16.6,17.1,17.5,18,18.4,18.9,19.3,19.9,20.4,20.9,21.9,22.3,22.5,22.3,22.1,22.1,23.1,27.5,32.8,32,40.3,29.5,31.8,31.3,32.7,36.2,35.5,36.3,39.5,40.2,40.8,41.2,42.2,43.6,45.5,49.3,51.4,50.9,50.7,52.1,54,56.4,57.6,60.7,61.4,65.7,66.7,66.3,89,83.3,82.1,83.2,88.8,97.4,106.9,106.2,105.8,109.7,118.8,122.2,129.4,132.4,142,155.1,157.7,170.8,173.6,185,196.8,198.8,207.6,217.2,255,260.2,278.2,281.1,285.5,302.5,332,348.2,354.6,378.2,408.4,433.5,447.1,478.8,492.2,522.1,533,566.5,627.3,664.8,622.4,675.2,684,695.2,699.6,747.1,842.7,870.7,918.8,980.6,989.9,994.5,1003.1,1048.5,1159.4,1160.9,1260.3,1319.1,1331.8,1312.7,1363.1,1439.7,1485.2,1554.7,1640.3,1792.2,1882.6,1936.4,1980.3,2162,2174.4,2320.9,2425.4,2759,2635.3,2740.8,2871.8,2909.1,3058.5,3302.4,2971.2,2908.3,3135.5,3265.6,3215.9,2720.2,3132.6,2672.1,2773.4,3149.7,3156,3153.7,3084,3364.4,3307.6,3523.9,3216.3,2833.2,2522.4,2638.8,2880.5,2998.4,3287.7,3466,3230.6,3435.8,3795.5,3886,3910.6,3926.7,3869.1,2999.9,3236,3623.2,3740.7,3547.3,3880,4084.1,4030.1,4061.1,4053.7,4386.1,4608.3,4691.6,4761.5,4953.9,5158.3,4944.2,4928.6,5107.9,5213.2,5289.1,5350,5261.9,5319.7,5518.3,5698.9,5700.1,5691.3,5860.9,5857.7,6018.3,6226.3,6375,6510.1,6799.9,6985,6942.9,7067,7269.2,7586.1,8144.8,8261.5,8549.2,8836.4,8827.8,8659.8,8574.1,8361.2,8470,8513.7,8758.4,8977,8927.3,8689,8809.1,9156.6,9208.4,9630.2,10466.6,10813.4,11498.5,12136.2,12724.5,13149.7,13003.2,13918.2,14704.2,14867.8,14953.2,15014.9,14655,14323,14494.2,14762.7,14703,14267,14969.2,15449.2,15636.4,15805.3","oil":"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1,0.1,0.1,0.3,0.9,1.4,1.3,1.1,1.3,2,2,2.3,2.6,3.1,3.3,3.7,5.7,6.2,5.8,6.5,8.8,10,12.7,15.4,17.2,18.9,16.5,18.3,19,21.8,23.5,24.6,28.4,34.6,40.8,40.2,42.5,41.7,48.5,52.6,55.5,57.2,60,67.3,74.7,80.8,85.6,96.1,97,97.9,119.4,128.8,134.4,144.1,152.8,157.2,182,186,197.6,215.2,239.4,245,273.4,361,397.3,438.3,485.5,484.2,505.5,506.5,554.1,567.6,621.7,599.8,580.5,556,607.6,643.6,692,753.4,846.6,822.8,854.5,901,912.3,863.5,926.6,1068.8,1045.8,1108.4,1246.5,1370.6,1293.9,1551.8,1720.2,1819.1,1938.1,2054.2,2299.5,2499,2612.1,2719.2,2897.7,3120,3309.1,3558.3,3803.7,4104.3,4409.4,4758.9,5074.5,5528.2,5978.5,6799,7201,7764.7,8219.7,8099.3,8005.1,8475.6,8767.4,9133.7,9224.3,8912.5,8483.4,8276.3,8214.7,8238.7,8247.6,8490.6,8579.3,8889.3,9037.4,9196.4,9656.5,9154.7,9172.3,9196.2,9283.9,9562.1,9702.2,9822,10064.2,10211.6,10283.6,10269.4,10540.9,10924.6,11030.3,11142.9,11184.3,11143.3,10899.6,11253.7,11310.1,11432.7,11516.6,11561.8,11770,11900.3,12085.3,12142.8,12325.9,10932.3,11513.2,11914.9,12278.2,12470.6","gas":"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0.4,1.2,3.7,7.7,11.8,16.8,12.2,11.7,8.9,7.8,7.3,6.7,7,6.8,7.3,8.5,10.9,11.5,12.9,13.7,14.5,15.2,17.2,19,19.9,19.7,23.5,24.9,25.7,28.3,29.6,30.1,31.9,38.4,40.5,36.5,37.9,41.7,35,40.1,52.5,59.7,63.9,69.1,76,82.6,102.9,104.2,92.9,88.2,90.9,102,111.4,125.5,140.6,135.5,141.3,153.5,153.5,166,182.9,197.6,216.7,223.8,247.9,280.1,300.5,353.2,416.2,447.1,474.5,501.4,547.2,587.2,646.7,705.9,758.3,834.6,882.1,967.8,1047,1153,1230.7,1340,1433.1,1559.8,1708.7,1790.9,1933.6,2052.3,2202.7,2256.5,2241.3,2359,2411.7,2541.7,2668.1,2741.5,2763.4,2701.5,2743.1,2972,3089.7,3014.6,3281.6,3436,3605,3790.2,3851.5,3901.4,4007.8,4040.2,4196.8,4381.6,4395.1,4443.5,4586.2,4727.8,4771.7,4913.7,5096.2,5257.7,5376.3,5531,5736.6,5905.5,5765.7,6205.8,6389.3,6523.1,6573.1,6605,6729,6914.9,7084.6,7419.4,7574.1,7520.8,7878.7,7758.7,7802.8,8009.8","co2":"9.3,9.4,9.5,9.6,9.7,9.8,9.9,10.1,10.2,10.3,10.5,10.7,11,11.2,11.4,11.6,11.9,12.2,12.5,12.8,13.1,13.4,13.6,13.8,14,14.3,14.7,15,15.2,15.5,15.9,16.2,16.6,17.1,17.5,18,18.4,18.9,19.3,19.9,20.4,20.9,21.9,22.3,22.5,22.3,22.1,22.1,23.1,27.5,32.8,32,40.3,29.5,31.8,31.3,32.7,36.2,35.5,36.3,39.5,40.2,40.8,41.2,42.2,43.6,45.5,49.3,51.4,50.9,50.7,52.1,54,56.4,57.6,60.7,61.4,65.7,66.7,66.3,89,83.3,82.1,83.2,88.8,97.4,106.9,106.2,105.8,109.7,118.8,122.2,129.4,132.4,142,155.1,157.7,170.8,173.6,185,196.8,198.8,207.6,217.2,255,260.3,278.2,281.2,285.5,302.6,332.3,349.2,356,379.5,409.5,434.9,449.1,480.8,494.5,524.7,536.1,569.8,631,670.5,628.7,681,690.6,704,709.7,759.8,858.2,888.2,938.2,997.9,1009.8,1017.5,1033,1084.3,1201.3,1202.1,1307.3,1369.6,1380.5,1363.2,1412.2,1496,1545.5,1618.4,1707,1864.4,1962.9,2025.6,2077,2264.6,2290.3,2440.6,2549,2904.9,2790.4,2907.1,3050.3,3097.2,3253.9,3524.8,3197.8,3148,3400.2,3556.5,3506.1,3041.1,3546.8,3115,3264.7,3703,3716.1,3740.6,3677.4,4012.9,3996.3,4288.2,3958.1,3539.3,3192.6,3362.7,3656.2,3835.7,4207.9,4496.7,4229.6,4470.1,4884.7,4999.1,4982.5,5075.3,5162.5,4289.3,4608.5,5165.2,5447.9,5204,5930.4,6381.7,6467.7,6651,6789.7,7444.1,7926.3,8186,8417.5,8855.1,9387,9415,9747.2,10266.8,10824.5,11310.6,11862.6,12237.4,12905.3,13761.8,14899.1,15503.9,16224.6,17077.3,16997.9,16988.5,17862.5,18358,19024.7,19508.6,19409.8,18879.8,18729.7,18901.8,19457.3,20144.9,20438,21106.2,21918.8,22200.2,22732.1,23205.6,22520.4,22749.9,22974.6,23516.6,24233.5,24380.3,24295.7,24837.8,25511.5,25693,26265.3,27652.7,28610,29599,30594.2,31499.3,32049.7,31513,33317.7,34480,34954.7,35275.8,35465.7,35403.5,35392.8,35974.6,36734,37086.6,35158.2,36866.9,37527.8,38094,38598.6"} as Record<string, string>;
const ser = (k: string) => RAW[k].split(",").map(Number);
const TOTAL = ser("co2");
const COAL = ser("coal");
const OIL = ser("oil");
const GAS = ser("gas");
const OTHER = TOTAL.map((t, i) => Math.max(0, t - COAL[i] - OIL[i] - GAS[i]));
const ALL = [
  { key: "coal", name: "Coal", v: COAL },
  { key: "oil", name: "Oil", v: OIL },
  { key: "gas", name: "Gas", v: GAS },
  { key: "other", name: "Other", v: OTHER },
] as const;
const ix = (y: number) => y - Y0;
const shareOf = (v: number[], y: number) => (100 * v[ix(y)]) / TOTAL[ix(y)];
const pct = (x: number) => `${Math.round(x)}%`;
const AHEAD = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i).filter((y) => OIL[ix(y)] > COAL[ix(y)]);
const tidy = (x: number) => Number(x.toFixed(1));

type View = "none" | 1900 | 1968 | 2005 | 2024 | "tonnes";
type Ahead = { first: number; last: number; back: number };

const W = 320;
const H = 200;
const L = 48;
const R = 248;
const T = 20;
const B = 160;
const X = (y: number) => L + ((y - Y0) / (Y1 - Y0)) * (R - L);
const TMAX = 40000;

export default function CoalCameBack({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [c1900, setC1900] = useState<number | null>(null);
  const [ahead, setAhead] = useState<Ahead | null>(null);
  const [s2024, setS2024] = useState<{ coal: number; oil: number } | null>(null);
  const [times, setTimes] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Oil overtook coal as the world's biggest source of fossil carbon dioxide in 1968. Which was bigger in 2024?",
        options: ["Coal", "Oil", "About equal"],
        answer: 0,
      }}
      exploreHint="Step through the years, then switch to tonnes."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            In 1900 coal made {c1900 !== null ? pct(c1900) : "?"} of the world&apos;s fossil CO2. Oil passed it in{" "}
            {ahead ? ahead.first : "?"}, but coal took the lead back in <strong>{ahead ? ahead.back : "?"}</strong>, and
            in 2024 coal made <strong>{s2024 ? pct(s2024.coal) : "?"}</strong> against oil&apos;s{" "}
            {s2024 ? pct(s2024.oil) : "?"}. Coal&apos;s emissions in 2024 were {times !== null ? times : "?"} times
            those of 1968: a fuel can lose first place and still burn more.
          </p>
          <p>Where it stops: these are estimates rebuilt from records of fuel use, and the file is revised every year.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          view={view}
          setView={setView}
          state={{ c1900, ahead, s2024, times }}
          rec={{ setC1900, setAhead, setS2024, setTimes }}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  view,
  setView,
  state,
  rec,
}: {
  locked: boolean;
  interact: () => void;
  view: View;
  setView: (v: View) => void;
  state: { c1900: number | null; ahead: Ahead | null; s2024: { coal: number; oil: number } | null; times: number | null };
  rec: {
    setC1900: (v: number) => void;
    setAhead: (v: Ahead) => void;
    setS2024: (v: { coal: number; oil: number }) => void;
    setTimes: (v: number) => void;
  };
}) {
  const { reach } = useMilestones(interact, ["y1900", "y2005", "y2024", "tonnes"]);
  const pid = useId().replace(/:/g, "");

  const go = (v: View) => {
    setView(v);
    if (v === 1900) {
      if (state.c1900 === null) rec.setC1900(shareOf(COAL, 1900));
      reach("y1900");
    }
    if (v === 2005) {
      if (!state.ahead) rec.setAhead({ first: AHEAD[0], last: AHEAD[AHEAD.length - 1], back: AHEAD[AHEAD.length - 1] + 1 });
      reach("y2005");
    }
    if (v === 2024) {
      if (!state.s2024) rec.setS2024({ coal: shareOf(COAL, 2024), oil: shareOf(OIL, 2024) });
      reach("y2024");
    }
    if (v === "tonnes") {
      if (state.times === null) rec.setTimes(tidy(COAL[ix(2024)] / COAL[ix(1968)]));
      reach("tonnes");
    }
  };

  const tonnes = view === "tonnes";
  const cut = view === "none" ? null : tonnes ? Y1 : view;
  const yv = (v: number) => B - (v / (tonnes ? TMAX : 100)) * (B - T);
  const ticks = tonnes ? [0, 10000, 20000, 30000, 40000] : [0, 25, 50, 75, 100];
  const val = (v: readonly number[], i: number) => (tonnes ? v[i] : (100 * v[i]) / TOTAL[i]);

  const areas: { d: string; key: string }[] = [];
  const labels: { name: string; y: number; mid: number; text: string }[] = [];
  if (cut !== null) {
    const base = new Array(cut - Y0 + 1).fill(0);
    ALL.forEach((b) => {
      let top = "";
      let bot = "";
      for (let y = Y0; y <= cut; y++) {
        const i = ix(y);
        top += `${top ? "L" : "M"}${X(y).toFixed(1)},${yv(base[i] + val(b.v, i)).toFixed(1)}`;
        base[i] += val(b.v, i);
      }
      for (let y = cut; y >= Y0; y--) bot += `L${X(y).toFixed(1)},${yv(base[ix(y)] - val(b.v, ix(y))).toFixed(1)}`;
      areas.push({ d: `${top}${bot}Z`, key: b.key });
    });
    let acc = 0;
    ALL.forEach((b) => {
      const v = val(b.v, ix(cut));
      const mid = yv(acc + v / 2);
      acc += v;
      labels.push({ name: b.name, y: mid, mid, text: tonnes ? b.name : `${b.name} ${pct(v)}` });
    });
    const GAP = 12.5;
    for (let k = 0; k < labels.length; k++) {
      const lo = k === 0 ? B + 2 : labels[k - 1].y - GAP;
      labels[k].y = Math.min(labels[k].mid, lo);
    }
    const over = T + 4 - labels[labels.length - 1].y;
    if (over > 0) for (let k = labels.length - 1; k >= 0; k--) labels[k].y = Math.max(labels[k].y, T + 4 + (labels.length - 1 - k) * GAP);
  }

  const cls: Record<string, string> = { coal: s.coal, oil: s.oil, gas: s.gas, other: s.other };
  const pat: Record<string, string | undefined> = { oil: `url(#${pid}-hatch)`, gas: `url(#${pid}-dots)` };
  const title = tonnes ? "World fossil CO2 by source, million tonnes" : "Share of world fossil CO2, by source";
  const presets: [View, string][] = [
    [1900, "1900"],
    [1968, "1968"],
    [2005, "2005"],
    [2024, "2024"],
    ["tonnes", "Tonnes, not shares"],
  ];
  const a = state.ahead;
  const bracketShown = a !== null && cut !== null && cut >= a.first;
  const bEnd = a ? Math.min(cut ?? a.last, a.last) : 0;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={cut === null ? `${title}: nothing drawn yet` : `${title}, 1750 to ${cut}`}
      >
        <defs>
          <pattern id={`${pid}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" className={s.patLine} />
          </pattern>
          <pattern id={`${pid}-dots`} width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="0.9" className={s.patDot} />
          </pattern>
        </defs>
        <text x={4} y={11} className={s.title}>
          {title}
        </text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={R} y1={yv(t)} y2={yv(t)} className={s.grid} />
            <text x={L - 4} y={yv(t) + 3.5} textAnchor="end" className={s.tick}>
              {tonnes ? t.toLocaleString("en-US") : `${t}%`}
            </text>
          </g>
        ))}
        {[1750, 1800, 1850, 1900, 1950, 2000].map((y) => (
          <text key={y} x={X(y)} y={B + 14} textAnchor="middle" className={s.tick}>
            {y}
          </text>
        ))}
        {areas.map((ar) => (
          <g key={ar.key}>
            <path d={ar.d} className={cls[ar.key]} />
            {pat[ar.key] && <path d={ar.d} fill={pat[ar.key]} />}
          </g>
        ))}
        {cut !== null && !tonnes && <line x1={X(cut)} x2={X(cut)} y1={T} y2={B} className={s.cut} />}
        <line x1={L} x2={L} y1={T} y2={B} className={s.axis} />
        <line x1={L} x2={R} y1={B} y2={B} className={s.axis} />
        {bracketShown && a && (
          <g>
            <path
              d={`M${X(a.first)},${B + 20}v4H${X(bEnd)}v-4`}
              className={s.bracket}
            />
            <text x={X(a.first) - 3} y={B + 35} textAnchor="end" className={s.bracketText}>
              oil ahead, {a.first}-{a.last}
            </text>
          </g>
        )}
        {cut !== null &&
          labels.map((l) => (
            <g key={l.name}>
              <line x1={X(cut) + 1} x2={X(cut) + 6} y1={l.mid} y2={l.y - 3.5} className={s.leader} />
              <text x={X(cut) + 8} y={l.y} className={l.name === "Coal" ? s.labelStrong : s.label}>
                {l.text}
              </text>
            </g>
          ))}
      </svg>
      <div className={s.presets}>
        <Row>
          {presets.map(([v, name]) => (
            <Control
              key={String(v)}
              className={`${view === v ? "active" : ""} ${v === "tonnes" ? s.wide : ""}`}
              aria-pressed={view === v}
              disabled={locked || view === v}
              onClick={() => go(v)}
            >
              {name}
            </Control>
          ))}
        </Row>
      </div>
      <Row>
        <Readout label="Coal 1900" value={state.c1900 !== null ? pct(state.c1900) : "–"} />
        <Readout label="Coal, oil 2024" value={state.s2024 ? `${pct(state.s2024.coal)}, ${pct(state.s2024.oil)}` : "–"} />
        <Readout label="Coal since 1968" value={state.times !== null ? `×${state.times} tonnes` : "–"} />
      </Row>
    </div>
  );
}
