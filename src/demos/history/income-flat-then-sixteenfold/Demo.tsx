"use client";

// How fast did Britain get richer? (v2 title, FC39/FC41 c10.) Brief: company/domains/briefs/history.md #2 (check section 2,
// company/domains/briefs/checks/history-cycle1-check.mjs). Data: Maddison Project Database 2020, OWID's copy
// (history-data.mjs: maddison), entity "United Kingdom", column "GDP per capita", every year 1270-2018,
// rounded to whole numbers. The series is England before 1700 (Maddison README). The copy states no currency
// unit, so the stage shows an index (1700 = 100) and ratios only, never money.
//
// Presets in DOM order (each sets the whole view; no Reset):
//   "1270 to 1700"    linear, zoomed to the early span (0-200); milestone `early` records x2.0 and 0.16%/yr
//   "1700 to 2018"    linear, the full series appears (0-1,600); milestone `late` records x15.8 and 0.87%/yr
//   "Growth per year" linear, adds dashed steady-rate lines through each span's ends (our model, labelled)
//   "Log scale"       the same series and dashed lines on a log axis (caption: each gridline is ×2); the record sags
//                     below the dashed 0.87% average (slower before 1850, faster after; W-989), the reveal names both views
// The locked frame shows the record only to 1700 (the question's given part) on the early zoom, so nothing
// after 1700 is drawn before the commit. The recorded ratios stay in two readouts for the reveal.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Y0 = 1270;
const Y1 = 1700;
const Y2 = 2018;
// history-data.mjs: maddison, United Kingdom, "GDP per capita", 1270..2018, one value per year (rounded).
const GDP = "1192,1177,1220,1149,1143,1304,1146,1222,1265,1048,1058,1118,1078,1019,1048,1055,1034,1125,1085,995,1004,1006,1060,1086,1078,1155,1202,1151,1211,1167,1159,1168,1199,1249,1130,1162,1129,1184,1199,1229,1213,1257,1224,1246,1247,1121,1072,1136,1270,1292,1266,1085,1156,1215,1122,1230,1245,1222,1135,1193,1161,1106,1163,1197,1156,1107,1159,1283,1307,1066,1194,1205,1261,1225,1307,1216,1155,1199,1229,1154,1314,1519,1574,1579,1512,1559,1537,1567,1575,1592,1581,1526,1486,1443,1603,1531,1578,1481,1471,1373,1539,1489,1347,1458,1341,1294,1495,1539,1523,1398,1462,1500,1553,1485,1680,1532,1714,1728,1599,1656,1554,1743,1967,1630,1795,1723,1738,1705,1830,1762,1717,1696,1742,1770,1801,1805,1674,1677,1552,1607,1708,1673,1635,1483,1686,1726,1665,1821,1729,1821,1778,1661,1716,1812,1827,1765,1712,1668,1567,1622,1669,1681,1664,1717,1823,1623,1515,1457,1533,1605,1623,1438,1492,1808,1810,1564,1667,1711,1772,1629,1683,1685,1663,1676,1677,1663,1680,1536,1625,1599,1598,1603,1752,1772,1615,1567,1554,1600,1669,1645,1597,1525,1575,1560,1642,1592,1475,1541,1583,1672,1718,1640,1566,1641,1623,1532,1696,1548,1579,1612,1620,1632,1649,1620,1695,1659,1605,1710,1724,1728,1697,1633,1689,1757,1758,1773,1776,1740,1760,1837,1768,1799,1715,1785,1777,1820,1800,1800,1805,1784,1755,1791,1818,1847,1866,1848,1852,1713,1722,1741,1755,1689,1741,1725,1795,1665,1639,1758,1657,1780,1713,1659,1711,1649,1734,1680,1705,1841,1755,1678,1654,1604,1528,1781,1616,1599,1295,1419,1843,1744,1753,1778,1762,1913,1843,1839,2056,1920,1911,1895,1737,1737,1675,1914,1689,1876,1929,1630,1854,1820,1716,1654,1476,1661,1597,1396,1356,1502,1690,1474,1558,1568,1692,1792,1454,1453,1379,1316,1569,1788,1691,1671,1751,1849,1967,1752,1831,1660,1571,1812,1919,1757,1675,1612,1555,1681,1586,1749,1740,1586,1842,1832,1581,1568,1781,1798,1730,1733,1947,1430,1416,1451,1630,1501,1519,1571,1526,1476,1624,1640,1683,1499,1635,1725,1745,1511,1524,1515,1535,1508,1446,1527,1720,1920,1903,1982,1835,1727,1702,1441,1578,1610,1664,1959,1828,1907,2135,2196,1940,1991,1934,1873,1860,1897,1806,1853,2191,2029,2103,1963,2209,2004,2150,2323,1946,2110,1949,2169,2333,2233,2386,2400,2595,2197,2616,2502,2392,2361,2417,2324,2412,2613,2526,2345,2778,2630,2220,2485,2636,2278,2066,2255,2257,2157,2364,2294,2367,2483,2606,2542,2715,2611,2636,2563,2528,2585,2483,2455,2554,2452,2538,2499,2654,2699,2662,2576,2745,2582,2619,2584,2526,2595,2683,2621,2565,2577,2641,2750,2713,2681,2702,2627,2738,2743,2648,2710,2643,2783,2815,2850,2915,3011,2917,2914,2898,2853,2879,2891,2911,3056,2952,2989,2890,2920,2834,2895,2962,3017,2966,2931,3049,3102,3048,3027,3009,2962,2981,2898,2861,2888,3072,3046,3134,3051,2925,3207,3233,3167,3161,3207,3343,3351,3360,3252,3204,3347,3287,3454,3250,3309,3478,3397,3207,3328,3204,3489,3250,3253,3201,3103,3306,3308,3315,3359,3492,3521,3290,3499,3461,3443,3550,3545,3612,3599,3639,3861,3937,3857,3963,3881,4018,3894,3808,3950,4245,4387,4334,4234,4361,4422,4332,4477,4626,4734,4909,4748,5013,5019,4879,5031,5086,5024,4764,5165,5255,5333,5451,5424,5636,5635,5829,5797,5769,5842,5874,5950,5938,5923,5879,5786,5997,6146,6269,6264,6220,6132,6170,6358,6585,6876,6845,6781,6553,6486,6851,6996,7211,7229,7500,7729,7594,7516,7635,7482,7455,7603,7782,7855,7461,7557,7718,7874,7954,8212,8131,8639,8702,8665,8630,7605,7017,6792,7391,7587,7844,8199,7868,8472,8539,8772,8673,8190,8206,8411,8939,9244,9620,9911,9988,9982,10928,11926,12176,12344,11803,11247,10751,10527,10753,11088,11061,11354,11303,11709,12145,12541,12639,12779,12698,13134,13780,14118,14131,14583,15251,15545,15757,16018,16593,16820,17162,17440,18002,19168,18903,18884,19311,19740,20448,20988,20612,20319,20650,21366,21869,22579,23498,24536,25679,26164,26189,25792,25790,26349,27278,27861,28472,29260,30077,30933,31946,32660,33271,34232,34866,35624,36214,36817,36265,34402,34754,34971,35185,35618,36436,36941,37334,37783,38058".split(",").map(Number);
const at = (y: number) => GDP[y - Y0];
const IDX = GDP.map((g) => (100 * g) / at(Y1));

const ratio = (a: number, b: number) => at(b) / at(a);
const rate = (a: number, b: number) => 100 * (Math.pow(ratio(a, b), 1 / (b - a)) - 1);
const times = (x: number) => `×${x.toFixed(1)}`;
const pct = (x: number) => x.toFixed(2);
const dbl = (r: number) => Math.round(Math.log(2) / Math.log(1 + r / 100));

type View = "none" | "early" | "late" | "rate" | "log";
type Rec = { x: number; r: number };

const W = 320;
const H = 186;
const L = 38;
const R = 312;
const T = 22;
const B = 160;
const X = (y: number) => L + ((y - Y0) / (Y2 - Y0)) * (R - L);
const LOG_MIN = 40;
const LOG_MAX = 1700;

function yScale(view: View) {
  if (view === "log") {
    const a = Math.log(LOG_MIN);
    const b = Math.log(LOG_MAX);
    return { y: (v: number) => B - ((Math.log(v) - a) / (b - a)) * (B - T), ticks: [50, 100, 200, 400, 800, 1600] };
  }
  const max = view === "none" || view === "early" ? 200 : 1600;
  const step = max / 4;
  return { y: (v: number) => B - (v / max) * (B - T), ticks: [0, step, 2 * step, 3 * step, max] };
}

export default function IncomeFlatThenSixteenfold({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [early, setEarly] = useState<Rec | null>(null);
  const [late, setLate] = useState<Rec | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "England's income per person about doubled from 1270 to 1700. From 1700 to 2018 (Britain, then the UK), how many times over did it grow?",
        options: ["About 2 times", "About 4 times", "About 16 times"],
        answer: 2,
      }}
      exploreHint="Press each span, then the growth per year, then the log scale."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In the 430 years to 1700, income per person grew <strong>{early ? early.x.toFixed(1) : "?"}-fold</strong>; in
            the 318 after, <strong>{late ? late.x.toFixed(1) : "?"}-fold</strong>. {early ? pct(early.r) : "?"}% a year is
            invisible in a lifetime; {late ? pct(late.r) : "?"}% a year doubles income about every{" "}
            {late ? dbl(late.r) : "?"} years. On the linear scale most of history looks flat; on the log
            scale the record sags below the dashed {late ? pct(late.r) : "?"}% average, as growth was slower
            before 1850 and faster after.
          </p>
          <p>
            Where it stops: these are modern reconstructions, and the series covers England only before
            1700, so early values are estimates.
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
          early={early}
          setEarly={setEarly}
          late={late}
          setLate={setLate}
        />
      )}
    </Lesson>
  );
}

function path(from: number, to: number, f: (y: number) => number, yv: (v: number) => number, step = 1) {
  let d = "";
  for (let y = from; y <= to; y += step) d += `${d ? "L" : "M"}${X(y).toFixed(1)},${yv(f(y)).toFixed(1)}`;
  return d;
}

function Stage({
  locked,
  interact,
  view,
  setView,
  early,
  setEarly,
  late,
  setLate,
}: {
  locked: boolean;
  interact: () => void;
  view: View;
  setView: (v: View) => void;
  early: Rec | null;
  setEarly: (r: Rec) => void;
  late: Rec | null;
  setLate: (r: Rec) => void;
}) {
  const { reach } = useMilestones(interact, ["early", "late"]);

  const go = (v: View) => {
    setView(v);
    if (v === "early") {
      if (!early) setEarly({ x: ratio(Y0, Y1), r: rate(Y0, Y1) });
      reach("early");
    }
    if (v !== "early" && v !== "none") {
      if (!late) setLate({ x: ratio(Y1, Y2), r: rate(Y1, Y2) });
      reach("late");
    }
  };

  const { y: yv, ticks } = yScale(view);
  const full = view === "late" || view === "rate" || view === "log";
  const end = full ? Y2 : Y1;
  const series = path(Y0, end, (y) => IDX[y - Y0], yv);
  const model = view === "rate" || view === "log";
  const r1 = rate(Y0, Y1) / 100;
  const r2 = rate(Y1, Y2) / 100;
  const i0 = IDX[0];
  const m1 = path(Y0, Y1, (y) => i0 * Math.pow(1 + r1, y - Y0), yv, 5);
  const m2 = path(Y1, Y2, (y) => 100 * Math.pow(1 + r2, y - Y1), yv, 2);
  const band = view === "early" ? [Y0, Y1] : view === "late" ? [Y1, Y2] : null;
  const dots: number[] = view === "early" ? [Y0, Y1] : view === "late" ? [Y1, Y2] : [];
  const fmtTick = (v: number) => v.toLocaleString("en-US");
  const label =
    view === "none"
      ? "Index of income per person, 1270 to 1700, 1700 = 100"
      : `Index of income per person, 1270 to ${end}, ${view === "log" ? "log" : "linear"} scale`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={label}>
        <defs>
          <clipPath id="income-plot">
            <rect x={L} y={T - 2} width={R - L + 2} height={B - T + 2} />
          </clipPath>
        </defs>
        <text x={4} y={11} className={s.title}>
          Income per person, index (1700 = 100)
        </text>
        {band && <rect x={X(band[0])} y={T} width={X(band[1]) - X(band[0])} height={B - T} className={s.band} />}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={R} y1={yv(t)} y2={yv(t)} className={s.grid} />
            <text x={L - 4} y={yv(t) + 3.5} textAnchor="end" className={s.tick}>
              {fmtTick(t)}
            </text>
          </g>
        ))}
        {[1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000].map((y) => (
          <text key={y} x={X(y)} y={B + 14} textAnchor="middle" className={s.tick}>
            {y}
          </text>
        ))}
        <line x1={L} x2={L} y1={T} y2={B} className={s.axis} />
        <line x1={L} x2={R} y1={B} y2={B} className={s.axis} />
        <g clipPath="url(#income-plot)">
          {model && (
            <>
              <path d={m1} className={s.model} />
              <path d={m2} className={s.model} />
            </>
          )}
          <path d={series} className={s.line} />
        </g>
        {dots.map((y) => (
          <circle key={y} cx={X(y)} cy={yv(IDX[y - Y0])} r={3.2} className={s.dot} />
        ))}
        {model && (
          <>
            <text x={X(1440)} y={yv(i0 * Math.pow(1 + r1, 170)) - 12} textAnchor="middle" className={s.rate}>
              {pct(r1 * 100)}% a year
            </text>
            <text
              x={X(1905)}
              y={view === "log" ? yv(100 * Math.pow(1 + r2, 205)) - 10 : yv(100 * Math.pow(1 + r2, 245)) - 6}
              textAnchor="end"
              className={s.rate}
            >
              {pct(r2 * 100)}% a year
            </text>
            <text x={L + 6} y={T + 10} className={s.legend}>
              dashed: steady average rate (our line)
            </text>
            {view === "log" && (
              <text x={L + 6} y={T + 23} className={s.legend}>
                log scale: each gridline is ×2
              </text>
            )}
          </>
        )}
      </svg>
      <div className={s.presets}>
        <Row>
          {(
            [
              ["early", "1270 to 1700"],
              ["late", "1700 to 2018"],
              ["rate", "Growth per year"],
              ["log", "Log scale"],
            ] as const
          ).map(([v, name]) => (
            <Control
              key={v}
              className={view === v ? "active" : ""}
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
        <Readout label="1270 to 1700" value={early ? `${times(early.x)} · ${pct(early.r)}%/yr` : "–"} />
        <Readout label="1700 to 2018" value={late ? `${times(late.x)} · ${pct(late.r)}%/yr` : "–"} />
      </Row>
    </div>
  );
}
