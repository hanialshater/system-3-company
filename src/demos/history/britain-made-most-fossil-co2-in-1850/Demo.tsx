"use client";

// Where the fossil-fuel CO2 came from in 1850 (v3). Brief: company/domains/briefs/history.md #9 (check section 9,
// company/domains/briefs/checks/history-cycle1-check.mjs). Data: OWID CO2 data (history-data.mjs: co2,
// owid-co2-data.csv, column co2, million tonnes of fossil CO2), every year 1750-1950 for World, United
// Kingdom, United States, Germany and France, rounded to 0.1 Mt. A country with no row yet (US before 1800,
// Germany before 1792, France before 1802) is drawn as zero. "Others" = World minus the four.
//
// Presets in DOM order (each sets the whole view; no Reset):
//   "1800", "1850", "1900", "1950"  shares (100% stacked), the record drawn from 1750 up to that year only,
//                                    with each band's share at that year labelled at the right edge.
//                                    "1850" is milestone `y1850` (records the UK's share), "1900" `y1900`.
//   "Tonnes, not shares"             the same five bands stacked in million tonnes, 1750-1950; milestone
//                                    `tonnes` records world growth 1850 -> 1900.
// The locked frame shows empty axes: no band is drawn before the commit, so no share is visible.
// The reveal is gated on all three milestones (the brief gated on y1850 and tonnes; the reveal also quotes
// the 1900 share, so y1900 is gated too; it is press 3 of 5 on the QA path).
// v3 (W-1038, W-1205): the data's entity is "United Kingdom". The question and reveal say "the United
// Kingdom"; the stage labels and readouts say "UK", glossed once on the stage ("UK = United Kingdom"),
// because "United Kingdom" does not fit at 11 px in the label column at 390 wide (brief 9, "Labels").
// The reveal's limit sentence is told, not shown (no land-use toggle, brief care line): history-data.mjs:
// co2, column co2_including_luc, 1850: UK 131.8 of World 2,910.9 Mt = 4.5%, "under 5%" (check section 9).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Y0 = 1750;
const Y1 = 1950;
// history-data.mjs: co2, owid-co2-data.csv, column co2 (Mt), 1750..1950, one value per year.
const RAW = {"World":"9.3,9.4,9.5,9.6,9.7,9.8,9.9,10.1,10.2,10.3,10.5,10.7,11,11.2,11.4,11.6,11.9,12.2,12.5,12.8,13.1,13.4,13.6,13.8,14,14.3,14.7,15,15.2,15.5,15.9,16.2,16.6,17.1,17.5,18,18.4,18.9,19.3,19.9,20.4,20.9,21.9,22.3,22.5,22.3,22.1,22.1,23.1,27.5,32.8,32,40.3,29.5,31.8,31.3,32.7,36.2,35.5,36.3,39.5,40.2,40.8,41.2,42.2,43.6,45.5,49.3,51.4,50.9,50.7,52.1,54,56.4,57.6,60.7,61.4,65.7,66.7,66.3,89,83.3,82.1,83.2,88.8,97.4,106.9,106.2,105.8,109.7,118.8,122.2,129.4,132.4,142,155.1,157.7,170.8,173.6,185,196.8,198.8,207.6,217.2,255,260.3,278.2,281.2,285.5,302.6,332.3,349.2,356,379.5,409.5,434.9,449.1,480.8,494.5,524.7,536.1,569.8,631,670.5,628.7,681,690.6,704,709.7,759.8,858.2,888.2,938.2,997.9,1009.8,1017.5,1033,1084.3,1201.3,1202.1,1307.3,1369.6,1380.5,1363.2,1412.2,1496,1545.5,1618.4,1707,1864.4,1962.9,2025.6,2077,2264.6,2290.3,2440.6,2549,2904.9,2790.4,2907.1,3050.3,3097.2,3253.9,3524.8,3197.8,3148,3400.2,3556.5,3506.1,3041.1,3546.8,3115,3264.7,3703,3716.1,3740.6,3677.4,4012.9,3996.3,4288.2,3958.1,3539.3,3192.6,3362.7,3656.2,3835.7,4207.9,4496.7,4229.6,4470.1,4884.7,4999.1,4982.5,5075.3,5162.5,4289.3,4608.5,5165.2,5447.9,5204,5930.4","United Kingdom":"9.3,9.4,9.5,9.6,9.7,9.8,9.9,10.1,10.2,10.3,10.5,10.7,11,11.2,11.4,11.6,11.9,12.2,12.5,12.8,13.1,13.4,13.6,13.8,14,14.3,14.7,15,15.2,15.5,15.9,16.2,16.6,17.1,17.5,18,18.4,18.9,19.3,19.9,20.4,20.9,21.5,21.8,22.1,21.9,21.6,21.5,22.5,26.9,31.3,30.7,30.4,28.2,27.8,29.3,30.9,32.6,33.7,34.5,35.4,36.2,36.7,37.4,38.2,39,39.3,41.8,43.8,43.3,42.6,43.5,45.1,46.7,48.1,49.6,50.1,52,52.6,53.2,67.7,64.5,62.6,61.9,65.8,72.2,78.5,75.3,73.6,75.8,80.8,81.3,85.2,88.6,94,99.8,95.5,101.8,109,117.4,122.4,116.4,116,115.4,139,130.2,140.1,137.6,134.8,149.7,168,175,169.5,180.2,193.9,205.5,211.7,217.4,213.2,223.7,228.5,242,255,264.7,257.2,271.5,271,275.9,271,272.6,297.1,312.3,315,327.7,319.1,315.3,312.4,320.4,333.2,345,353,360.5,353,316.2,362.1,365.6,376,386,386.9,414.6,419.7,410.7,426.6,430,432,437.7,453.4,473.6,462,466.1,469.7,481.4,455.9,498.3,483.2,489.5,507.1,501.2,466.8,456.1,480.5,332.2,439.6,466.1,488.2,461,261.1,481.3,454.5,478.2,460.8,431,414.6,412.3,445.3,451.2,476.5,491.7,472.8,474.3,500.1,499.8,493,490.2,489.7,453.1,464.4,485.2,503.5,507.6,499.2","United States":"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.6,0.6,0.7,0.7,0.8,0.8,0.8,0.8,0.9,0.9,1,1.1,1.3,1.4,1.6,1.8,2.1,2.3,3,3.5,3.4,4.3,4.7,5.3,5,5.5,5.9,6.2,6.9,7.8,9.3,11.2,12.7,15.1,16.8,18.2,19.8,24.6,26.8,30.2,33.2,38.2,40,41.1,41.6,45.3,47.4,45.7,47.4,54.8,58.7,58.8,59.2,72.9,82.4,93.7,98.6,103,126.3,139.5,134.3,135.7,132.8,147.2,143.9,175.5,198.9,210.4,235.7,254.2,267.9,272.5,287.8,307.9,374.4,336.1,402.4,428.1,451.2,454.8,425.7,480.7,481.7,501.2,546.3,626.8,664.1,723.2,766.7,897,884.8,990,1040,1208.5,1057.5,1171.7,1278.5,1265.8,1351,1450.9,1325.9,1375.5,1527.2,1679.3,1754.1,1486.4,1747.2,1432.5,1446,1909,1711.7,1758.2,1906,1862.8,1831,1963.5,1744.9,1485,1257.8,1348.9,1436.2,1492.3,1713.4,1792.6,1515.8,1670.9,1875,2043.6,2198.3,2272.1,2444.9,2359.6,2257.5,2485.9,2582.6,2164.9,2541.5","Germany":"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.5,0.4,0.4,0.5,0.6,0.6,0.6,0.8,0.5,0.6,0.5,1,1,0.9,2.7,0.9,0.9,1,0.9,0.9,0.9,0.9,1,2.4,3.4,3.5,3.3,3.4,3.5,3.6,4,3.2,4.3,4.2,4.5,4.5,3.6,4.8,4.6,3.4,4.4,4.4,4.9,5.2,6,6.6,7,9.2,9.5,10.9,10.3,10.9,12.6,13.2,13.8,12.8,13.6,15.1,16.9,19.2,20.8,24.4,28.6,30.9,32.9,35.6,33.8,36.4,41.3,45.5,49.4,56.6,63.5,62.9,69.2,74.4,77.6,76.6,85.3,92.1,98.4,71.6,101.5,103.4,101.3,104.5,110.8,124.5,134.3,143.7,153.1,157.5,161.2,163,170.4,186.3,198.8,208.2,220.8,215,220.7,229.5,238.3,256.3,273.6,285.4,303.3,326.8,325.6,319.2,343.6,356.1,382.3,361.9,442.2,446.6,445.6,445.4,458.6,499.1,535.1,497.9,462.9,500.7,524.6,503.4,387.4,429.2,473.2,455.5,331.9,451.8,458.1,413.2,481.2,505,539.2,462.1,386,347.5,365,408.6,452.3,499.6,563.5,601.3,648.6,654.3,660.8,667.9,679.4,600.3,116.1,271.7,317.7,377.8,432.1,510.5","France":"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.2,0,2.2,0,0,0,0,0,2.1,2.1,2.2,2,2.1,2.3,2.5,2.7,2.4,2.6,2.9,3,3.2,3.2,3.5,4,4.1,5.9,6.2,6.1,6.6,6.1,6.7,7.2,8.9,9.3,10.6,11.4,11.9,11.6,11.8,13.8,14.5,14.6,15.3,17.8,18.5,20.8,16.7,17.4,19.6,20,21.6,25.3,29.2,33.1,34.6,35.3,34.6,35,38.1,41.2,43.5,44.2,46.8,49.3,53.6,54.3,55.5,56.9,50.5,50.3,60.9,65.8,62.6,65.3,65.4,63.9,65.2,67.5,76.1,78,82.3,86.3,82.9,79.7,79.1,83.3,86.7,88.8,97.8,98,98.1,96.3,101.9,102.8,106.3,111.3,115,120.3,129.3,125,117.7,129.3,126,127.4,136.6,145.6,146.7,150.1,150.6,156.9,158.6,171.1,118.4,103.2,109.7,121.6,108.5,116.1,151.8,137.9,163.2,184.2,206.6,213.8,213.7,213,211.6,234.3,237.6,217.5,191.8,199.4,201.4,195.4,198.1,217.7,201.8,194.6,137.7,119.9,122.5,125.2,80,107.2,165.2,183.6,196.5,229.1,202.5"} as Record<string, string>;
const ser = (k: string) => RAW[k].split(",").map(Number);
const WORLD = ser("World");
const BANDS = [
  { key: "uk", name: "UK", v: ser("United Kingdom"), cls: s.uk },
  { key: "us", name: "US", v: ser("United States"), cls: s.us },
  { key: "de", name: "Germany", v: ser("Germany"), cls: s.de },
  { key: "fr", name: "France", v: ser("France"), cls: s.fr },
] as const;
const REST = WORLD.map((w, i) => Math.max(0, w - BANDS.reduce((t, b) => t + b.v[i], 0)));
const ALL = [...BANDS, { key: "rest", name: "Others", v: REST, cls: s.rest }];

const share = (i: number, y: number) => (100 * ALL[i].v[y - Y0]) / WORLD[y - Y0];
const pct = (x: number) => `${Math.round(x)}%`;

type View = "none" | 1800 | 1850 | 1900 | 1950 | "tonnes";

const W = 320;
const H = 188;
const L = 34;
const R = 236;
const T = 20;
const B = 164;
const X = (y: number) => L + ((y - Y0) / (Y1 - Y0)) * (R - L);
const TMAX = 6000;

export default function BritainMadeMostFossilCo2In1850({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [uk1850, setUk1850] = useState<number | null>(null);
  const [uk1900, setUk1900] = useState<number | null>(null);
  const [growth, setGrowth] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In 1850, what share of the world's carbon dioxide from burning fossil fuels came from the United Kingdom?",
        options: ["About 5%", "About 25%", "About 60%"],
        answer: 2,
      }}
      exploreHint="Step through the years, then switch to tonnes."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            In 1850 the United Kingdom produced <strong>{uk1850 !== null ? pct(uk1850) : "?"}</strong> of the world&apos;s
            fossil-fuel CO2. By 1900 its share had fallen to <strong>{uk1900 !== null ? pct(uk1900) : "?"}</strong> as
            the United States, Germany and others burned more coal, and world emissions had grown{" "}
            {growth !== null ? growth : "?"} times. A falling share can hide a rising total.
          </p>
          <p>
            Where it stops: this counts fuel burned in each country, not land clearing; counting land cleared for
            farms too, the United Kingdom&apos;s 1850 share was under 5%.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          view={view}
          setView={setView}
          uk1850={uk1850}
          uk1900={uk1900}
          growth={growth}
          rec={{ setUk1850, setUk1900, setGrowth }}
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
  uk1850,
  uk1900,
  growth,
  rec,
}: {
  locked: boolean;
  interact: () => void;
  view: View;
  setView: (v: View) => void;
  uk1850: number | null;
  uk1900: number | null;
  growth: number | null;
  rec: { setUk1850: (v: number) => void; setUk1900: (v: number) => void; setGrowth: (v: number) => void };
}) {
  const { reach } = useMilestones(interact, ["y1850", "y1900", "tonnes"]);

  const go = (v: View) => {
    setView(v);
    if (v === 1850) {
      if (uk1850 === null) rec.setUk1850(share(0, 1850));
      reach("y1850");
    }
    if (v === 1900) {
      if (uk1900 === null) rec.setUk1900(share(0, 1900));
      reach("y1900");
    }
    if (v === "tonnes") {
      if (growth === null) rec.setGrowth(Math.round(WORLD[1900 - Y0] / WORLD[1850 - Y0]));
      reach("tonnes");
    }
  };

  const tonnes = view === "tonnes";
  const cut = view === "none" ? null : tonnes ? Y1 : view;
  const yv = (v: number) => B - (v / (tonnes ? TMAX : 100)) * (B - T);
  const ticks = tonnes ? [0, 2000, 4000, 6000] : [0, 25, 50, 75, 100];

  // Stacked bands from 1750 to the cut year.
  const areas: { d: string; cls: string; key: string }[] = [];
  if (cut !== null) {
    const base = new Array(cut - Y0 + 1).fill(0);
    ALL.forEach((b) => {
      let top = "";
      let bot = "";
      for (let y = Y0; y <= cut; y++) {
        const i = y - Y0;
        const val = tonnes ? b.v[i] : (100 * b.v[i]) / WORLD[i];
        top += `${top ? "L" : "M"}${X(y).toFixed(1)},${yv(base[i] + val).toFixed(1)}`;
        base[i] += val;
      }
      for (let y = cut; y >= Y0; y--) bot += `L${X(y).toFixed(1)},${yv(base[y - Y0] - (tonnes ? b.v[y - Y0] : (100 * b.v[y - Y0]) / WORLD[y - Y0])).toFixed(1)}`;
      areas.push({ d: `${top}${bot}Z`, cls: b.cls, key: b.key });
    });
  }

  // End labels at the cut year: band middles, spread at least 12 units apart.
  const labels: { key: string; name: string; y: number; mid: number; text: string }[] = [];
  if (cut !== null) {
    let acc = 0;
    const i = cut - Y0;
    ALL.forEach((b) => {
      const val = tonnes ? b.v[i] : (100 * b.v[i]) / WORLD[i];
      const mid = yv(acc + val / 2);
      acc += val;
      labels.push({ key: b.key, name: b.name, y: mid, mid, text: tonnes ? b.name : `${b.name} ${pct(val)}` });
    });
    const GAP = 12.5;
    labels.sort((a, b) => b.mid - a.mid);
    for (let k = 0; k < labels.length; k++) {
      const lo = k === 0 ? B + 2 : labels[k - 1].y - GAP;
      labels[k].y = Math.min(labels[k].mid, lo);
    }
    const over = T + 4 - labels[labels.length - 1].y;
    if (over > 0) for (let k = labels.length - 1; k >= 0; k--) labels[k].y = Math.max(labels[k].y, T + 4 + (labels.length - 1 - k) * GAP);
  }

  const title = tonnes ? "Fossil CO2, million tonnes a year" : "Share of world fossil CO2";
  const presets: [View, string][] = [
    [1800, "1800"],
    [1850, "1850"],
    [1900, "1900"],
    [1950, "1950"],
    ["tonnes", "Tonnes, not shares"],
  ];

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={cut === null ? `${title}: nothing drawn yet` : `${title}, 1750 to ${cut}`}
      >
        <text x={4} y={11} className={s.title}>
          {title}
        </text>
        <text x={W - 2} y={11} textAnchor="end" className={s.gloss}>
          UK = United Kingdom
        </text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={R} y1={yv(t)} y2={yv(t)} className={s.grid} />
            <text x={L - 4} y={yv(t) + 3.5} textAnchor="end" className={s.tick}>
              {tonnes ? t.toLocaleString("en-US") : `${t}%`}
            </text>
          </g>
        ))}
        {[1750, 1800, 1850, 1900, 1950].map((y) => (
          <text key={y} x={X(y)} y={B + 14} textAnchor="middle" className={s.tick}>
            {y}
          </text>
        ))}
        {areas.map((a) => (
          <path key={a.key} d={a.d} className={a.cls} />
        ))}
        {tonnes &&
          [1850, 1900].map((y) => (
            <line key={y} x1={X(y)} x2={X(y)} y1={T} y2={B} className={s.guide} />
          ))}
        {cut !== null && !tonnes && <line x1={X(cut)} x2={X(cut)} y1={T} y2={B} className={s.cut} />}
        <line x1={L} x2={L} y1={T} y2={B} className={s.axis} />
        <line x1={L} x2={R} y1={B} y2={B} className={s.axis} />
        {cut !== null &&
          labels.map((l) => (
            <g key={l.key}>
              <line x1={X(cut) + 1} x2={X(cut) + 6} y1={l.mid} y2={l.y - 3.5} className={s.leader} />
              <text x={X(cut) + 8} y={l.y} className={l.key === "uk" ? s.labelUk : s.label}>
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
        <Readout label="UK, 1850" value={uk1850 !== null ? pct(uk1850) : "–"} />
        <Readout label="UK, 1900" value={uk1900 !== null ? pct(uk1900) : "–"} />
        <Readout label="1850 to 1900" value={growth !== null ? `World ×${growth}` : "–"} />
      </Row>
    </div>
  );
}
