"use client";

// Brief history.md #10. Eleven maps of the Great Lakes, 1688-1818, against the true positions of 39 points.
// ACTUAL and MAPS are copied from the pinned file (history-data.mjs: oldmaps, OldMaps.csv, columns lat and long,
// absolute values because the file has sign typos, longitude then made west-negative). Errors are computed here
// as in company/domains/briefs/checks/history-cycle1-check.mjs section 10: north-south = |dlat| x 111.32 km,
// east-west = |dlon| x 111.32 x cos(true latitude), averaged over the 39 points. Coronelli 1688: 59 / 363 km;
// Melish 1818: 24 / 41 km; east-west worse on 9 of 11 maps.
// Projection: conic equal-area (parallels 42 and 47 N, centred on 84 W), fitted once to every point of every map.
// Presets in DOM order (no Reset): Coronelli 1688, Popple 1733, Mitchell 1755, Melish 1818, Errors in km.
// Milestones: coronelli, melish, all. "Errors in km" swaps the map for a two-bar chart of all 11 maps, which
// carries the Coronelli and Melish values and the 9-of-11 count the reveal quotes.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, geoConicEqualArea } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number]; // [lat, lon]
const ACTUAL: Pt[] = [[41.68,-82.85],[41.9,-82.52],[42.25,-81.92],[42.55,-80.03],[44.05,-83.03],[43.65,-83.95],[44.25,-83.45],[45.87,-84.87],[45.93,-80.9],[46.23,-83.57],[45.8,-81.58],[45.9,-83.22],[44.25,-86.33],[43.95,-86.45],[43.07,-86.25],[42.4,-86.28],[42.12,-86.48],[41.88,-87.62],[44.53,-88],[45.95,-86.25],[47.93,-84.85],[46.93,-84.53],[48.18,-88.42],[47.85,-89.23],[46.75,-92.1],[46.87,-89.33],[46.75,-88.45],[47.4,-87.7],[43.27,-79.03],[44.22,-76.48],[43.63,-79.47],[44.2,-76.97],[44.1,-77.58],[42.9,-78.92],[42.37,-82.92],[42.62,-82.53],[45.27,-81.65],[45.3,-86.98],[46.48,-84.63]];
const MAPS: { maker: string; year: number; pts: Pt[] }[] = [
  { maker: "Coronelli", year: 1688, pts: [[41.62,-87.67],[42.12,-87],[42.07,-85.97],[42.47,-84.17],[43.42,-87.25],[43.12,-87.92],[43.63,-87.62],[45.05,-89.62],[45.38,-85.58],[45.6,-87.75],[45.38,-86.57],[45.22,-87.67],[43.53,-89.87],[43.17,-89.83],[42.2,-90.13],[41.87,-90.33],[41.75,-90.65],[41.88,-93.63],[43.58,-93.92],[45.47,-90.7],[48.75,-88],[47.67,-88.7],[47.92,-94.28],[47.53,-95.75],[46.2,-99.22],[45.85,-95.95],[45.6,-94.42],[46.88,-93.55],[43,-83.42],[44.12,-80.5],[43.55,-83.92],[43.13,-80.03],[43.12,-81],[42.87,-83.57],[42.53,-87.33],[42.8,-86.92],[44.3,-84.92],[44.37,-91.92],[46.1,-89.45]] },
  { maker: "Del'Isle", year: 1703, pts: [[41.12,-83.03],[41.88,-82],[42.13,-80.78],[42.13,-79.55],[44.23,-83.6],[43.25,-84.48],[44.43,-83.83],[45.12,-85.08],[45.57,-85.37],[45.73,-84.42],[45.17,-82.55],[45.33,-84.18],[44,-87.03],[43.93,-86],[43.12,-86.18],[42.47,-86.2],[41.88,-86.22],[42.17,-88.12],[43.82,-89.15],[45.12,-87.03],[48.08,-85.28],[47.28,-85.55],[47.75,-89.62],[47.67,-90.78],[46.08,-93.15],[46.13,-91.12],[45.97,-89.57],[46.82,-89.05],[43.2,-78.58],[44.23,-79.1],[43.85,-79.15],[44,-76.07],[44,-77.02],[42.68,-78.78],[42.48,-82.05],[42.97,-81.88],[44.52,-81.57],[45.17,-86.15],[46.13,-88.02]] },
  { maker: "Popple", year: 1733, pts: [[41.03,-85.1],[41.87,-85.37],[41.98,-83.78],[42,-83.18],[44.13,-86.85],[43.8,-87.1],[44.2,-87],[45.13,-87.15],[45.15,-83.9],[45.1,-87.22],[44.9,-85.08],[44.85,-86.95],[43.15,-89.1],[43.57,-88.77],[42.97,-89.1],[42.2,-89.22],[41.87,-89.58],[41.67,-90.65],[43.22,-91.53],[45.13,-89.1],[47.9,-88.13],[47.2,-88.53],[48.63,-91.47],[48.6,-92.45],[47.92,-94.57],[46.15,-93],[46.15,-91.77],[47.92,-91.53],[42.8,-80.5],[45,-77.95],[43.72,-81.05],[43.15,-78.13],[43.13,-79.08],[42.15,-80.47],[42.28,-85.28],[42.6,-85.1],[44.32,-84.42],[44.48,-90.45],[46.07,-88.63]] },
  { maker: "Belin", year: 1744, pts: [[41.28,-82.42],[42.08,-81.17],[42.22,-80.2],[42.07,-80.27],[44.6,-83.5],[43.72,-83.23],[44.78,-83.83],[45.67,-85.62],[45.75,-78.73],[46,-84.3],[45.82,-81.33],[45.85,-83.8],[44.25,-85.92],[44.08,-85.77],[42.87,-85.13],[41.85,-84.92],[41.63,-85.25],[41.75,-86.5],[43.42,-88.33],[45.58,-87.67],[49.25,-85.75],[46.88,-85.08],[48.12,-90.63],[47.8,-92.33],[46.42,-94.22],[46.58,-90.78],[46,-89.17],[47.08,-89.25],[42.93,-76.43],[44.13,-72.83],[44.08,-76.72],[44.42,-74],[44.53,-75.08],[42.98,-76.75],[42.55,-82],[42.82,-81.75],[44.8,-80.37],[44.58,-87.67],[46.2,-85.7]] },
  { maker: "Belin", year: 1755, pts: [[43.13,-82.25],[42.35,-81.77],[42.62,-81.37],[42.83,-79.92],[44.62,-85.5],[43.62,-85.25],[44.82,-85.75],[45.67,-87.67],[45.9,-80.78],[45.95,-86.25],[45.78,-83.33],[45.7,-86.28],[44.2,-88.17],[43.75,-87.8],[42.8,-87.17],[41.72,-87.05],[41.55,-87.38],[41.75,-88.67],[43.33,-90.33],[45.62,-89.58],[49.25,-87.7],[46.72,-87.17],[48.08,-92.55],[47.8,-94.33],[46.53,-96.5],[46.48,-92.78],[45.83,-91.08],[46.98,-91.17],[43.5,-78.75],[44.5,-77],[43.08,-79],[44.03,-75.08],[44.38,-77.85],[43.33,-78.83],[42.88,-82.83],[43.25,-82.75],[44.83,-81.5],[44.57,-89.57],[46.1,-87.57]] },
  { maker: "Mitchell", year: 1755, pts: [[42.05,-82.88],[42.23,-82.35],[42.37,-81.3],[42.37,-80.03],[44.75,-83.57],[44.03,-83.47],[44.95,-83.72],[45.55,-85.1],[45.88,-80.03],[45.8,-84.03],[45.7,-81.97],[45.67,-83.68],[44.45,-85.38],[44.33,-85.28],[43.42,-84.85],[42.58,-84.75],[42.43,-85.12],[42.63,-86.08],[43.83,-87.15],[45.5,-86.67],[48.33,-84.92],[46.42,-84.6],[47.37,-88.57],[47.22,-89.78],[46.1,-91.53],[46.22,-88.78],[45.72,-87.62],[46.62,-87.6],[43.42,-78.25],[44.45,-75.87],[43.8,-78.7],[44.57,-76.27],[44.65,-76.72],[42.97,-78.37],[42.88,-82.62],[43.08,-82.38],[44.97,-81.25],[44.73,-86.58],[45.9,-85.03]] },
  { maker: "D'Anville", year: 1755, pts: [[42.15,-81.63],[42.38,-80.78],[42.53,-80.35],[42.87,-78.73],[44.47,-81.75],[44.03,-81.72],[44.62,-81.97],[45.18,-84.08],[46,-79.93],[45.48,-81.83],[45.57,-79.52],[45.33,-81.35],[44.15,-83.55],[43.93,-83.52],[43.47,-83.97],[42.77,-84.52],[42.53,-84.82],[42.62,-85.63],[44,-85.67],[45.3,-84],[47.7,-83.47],[46.3,-82.58],[46.68,-86.35],[46.38,-87.05],[45.65,-89.47],[45.77,-87.13],[45.45,-86.05],[46.23,-85.75],[43.52,-77.48],[44.78,-74.9],[43.8,-77.52],[44.8,-75.35],[44.7,-75.63],[43.13,-77.52],[42.77,-81.27],[42.87,-80.88],[45.08,-79.55],[44.7,-84.63],[45.77,-82.93]] },
  { maker: "Lattre", year: 1784, pts: [[42.03,-83.53],[42.25,-82.45],[42.33,-81.98],[42.33,-80.65],[44.75,-84.33],[44.03,-84.22],[44.92,-84.47],[45.1,-85.03],[45.63,-80.68],[45.72,-84.68],[45.67,-82.6],[45.55,-84.25],[44.45,-86],[44.37,-85.88],[43.43,-85.55],[42.55,-85.63],[42.25,-85.77],[42.63,-86.8],[43.82,-87.85],[45.52,-87.18],[48.22,-85.63],[46.4,-85.27],[47.42,-89.17],[47.12,-90.5],[45.97,-92.23],[46.15,-89.42],[45.72,-88.38],[46.57,-88.22],[43.35,-79],[44.4,-76.5],[43.85,-79.55],[44.58,-77],[44.78,-77.48],[42.97,-79.08],[42.8,-83.25],[43.02,-83.07],[44.92,-82.02],[44.75,-87.25],[45.88,-85.72]] },
  { maker: "Arrowsmith", year: 1802, pts: [[42.02,-82.9],[42.12,-82.42],[42.5,-81.87],[42.68,-80.15],[44.35,-82.9],[44.07,-83.6],[44.5,-83.15],[46,-84.07],[45.83,-81.05],[46.08,-82.73],[45.15,-81.05],[46,-82.13],[44.22,-84.87],[44.02,-84.88],[43.33,-84.9],[42.72,-85.08],[42.5,-85.22],[42.52,-86.03],[44.28,-86.35],[45.6,-85.25],[47.95,-84.97],[47.3,-84.37],[48.28,-88.63],[48.05,-89.42],[46.8,-92.17],[46.88,-89.42],[46.83,-88.63],[45.58,-88.05],[43.27,-79.07],[44.17,-76.72],[43.67,-79.52],[44.12,-77.25],[44.05,-77.77],[42.88,-78.98],[42.62,-82.77],[42.82,-82.28],[45.4,-80.83],[45.08,-85.52],[46.42,-84.33]] },
  { maker: "Cary", year: 1805, pts: [[42,-82.9],[42.08,-82.37],[42.48,-81.87],[42.67,-80.18],[44.32,-82.9],[44.03,-83.57],[44.47,-83.13],[46,-84.08],[45.8,-81.05],[46.05,-82.72],[45.15,-81.05],[46,-82.13],[44.2,-84.92],[44,-84.9],[43.3,-84.93],[42.7,-85.08],[42.5,-85.18],[42.52,-86.03],[44.3,-86.33],[45.55,-85.22],[47.92,-84.93],[46.15,-84.02],[48.27,-88.68],[48.07,-89.37],[46.78,-92.18],[46.92,-89.4],[46.83,-88.67],[47.58,-88.05],[43.23,-79.07],[44.15,-76.72],[43.63,-79.53],[44.13,-77.23],[44.05,-77.78],[42.88,-78.98],[42.63,-82.7],[42.82,-82.22],[45.42,-80.83],[45.07,-85.52],[46.4,-84.32]] },
  { maker: "Melish", year: 1818, pts: [[41.12,-82.12],[42,-82.08],[42.32,-81.75],[42.55,-80.08],[44.27,-83],[44.07,-83.12],[44.63,-83.13],[46.13,-84.1],[45.72,-81.38],[45.92,-83.82],[46.15,-81.08],[46.13,-83],[44.08,-85.25],[43.82,-85.25],[42.92,-85.12],[42.18,-85.12],[42,-85.18],[42.08,-86.15],[44.18,-86.88],[45.63,-85.45],[47.92,-85],[47.13,-84.03],[48.27,-88.73],[48.13,-89.4],[46.73,-92.17],[46.92,-89.32],[46.82,-88.73],[47.73,-88.13],[43.27,-79],[44.27,-76.5],[44.07,-79.08],[45.02,-77.02],[44.08,-77.57],[42.73,-80.65],[42.68,-82.63],[43,-82.13],[45.08,-81.65],[45.08,-86.07],[46.45,-84.88]] },
];

const KM = 111.32;
const errors = (pts: Pt[]) => {
  let ns = 0, ew = 0;
  pts.forEach(([la, lo], i) => {
    const [tla, tlo] = ACTUAL[i];
    ns += Math.abs(la - tla) * KM;
    ew += Math.abs(lo - tlo) * KM * Math.cos((tla * Math.PI) / 180);
  });
  return { ns: ns / pts.length, ew: ew / pts.length };
};
const ERR = MAPS.map((m) => ({ ...m, ...errors(m.pts) }));
const find = (maker: string, year: number) => ERR.find((m) => m.maker === maker && m.year === year)!;
const CORONELLI = find("Coronelli", 1688);
const MELISH = find("Melish", 1818);
const EW_WORSE = ERR.filter((m) => m.ew > m.ns).length;
const km = (x: number) => String(Math.round(x));

type Mode = "coronelli" | "popple" | "mitchell" | "melish" | "all";
const MILESTONES = ["coronelli", "melish", "all"] as const;
const PRESETS: { id: Mode; label: string; map?: [string, number] }[] = [
  { id: "coronelli", label: "Coronelli 1688", map: ["Coronelli", 1688] },
  { id: "popple", label: "Popple 1733", map: ["Popple", 1733] },
  { id: "mitchell", label: "Mitchell 1755", map: ["Mitchell", 1755] },
  { id: "melish", label: "Melish 1818", map: ["Melish", 1818] },
  { id: "all", label: "Errors in km" },
];

const W = 340;
const H = 210;

function ErrorChart() {
  // X1 leaves room right of the longest bar (Coronelli's east-west) for its "59 / 363" label, which v2 clipped at
  // 340 (learner r1, W-989). The scale is shorter; the text size is unchanged.
  const X0 = 98, X1 = 278, TOPY = 34, ROW = 15.5;
  const max = Math.max(...ERR.map((m) => Math.max(m.ns, m.ew)));
  const len = (v: number) => ((X1 - X0) * v) / max;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img"
      aria-label={`Average error in km on each of ${ERR.length} maps, north-south and east-west`}>
      <text x={4} y={14} className={s.title}>Average error, km · E-W worse on {EW_WORSE} of {ERR.length}</text>
      <rect x={4} y={20} width={9} height={6} className={s.barNs} />
      <text x={16} y={26} className={s.small}>north-south</text>
      <rect x={90} y={20} width={9} height={6} className={s.barEw} />
      <text x={102} y={26} className={s.small}>east-west</text>
      {ERR.map((m, i) => {
        const y = TOPY + i * ROW;
        const key = m === CORONELLI || m === MELISH;
        return (
          <g key={`${m.maker}${m.year}`}>
            <text x={X0 - 4} y={y + 9} textAnchor="end" className={key ? s.rowKey : s.row}>{m.maker} {m.year}</text>
            <rect x={X0} y={y + 1} width={len(m.ns)} height={5} className={s.barNs} />
            <rect x={X0} y={y + 6.5} width={len(m.ew)} height={6} className={s.barEw} />
            {key && (
              <text x={X0 + Math.max(len(m.ns), len(m.ew)) + 4} y={y + 10} className={s.val}>
                {km(m.ns)} / {km(m.ew)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Stage({ locked, reach, mode, pick }: {
  locked: boolean;
  reach: (n: string) => void;
  mode: Mode | null;
  pick: (m: Mode) => void;
}) {
  const projection = useMemo(() => {
    const all = [ACTUAL, ...MAPS.map((m) => m.pts)].flat().map(([la, lo]) => [lo, la]);
    return geoConicEqualArea().parallels([42, 47]).rotate([84, 0]).fitExtent([[8, 30], [W - 8, H - 6]], { type: "MultiPoint", coordinates: all });
  }, []);
  const press = (m: Mode) => {
    if (locked || m === mode) return;
    pick(m);
    reach(m);
  };
  const preset = PRESETS.find((p) => p.id === mode);
  const chosen = !locked && preset?.map ? find(preset.map[0], preset.map[1]) : null;
  const xy = ([la, lo]: Pt) => projection([lo, la]) ?? [0, 0];

  return (
    <div className={s.wrap}>
      {locked && <p className={s.msg}>Make a prediction to start.</p>}
      <div className={s.pic}>
        {!locked && mode === "all" ? (
          <ErrorChart />
        ) : (
          <WorldMap projection={projection} width={W} height={H} graticule={false}
            label={chosen ? `Great Lakes: true positions of 39 points and where ${chosen.maker} ${chosen.year} put them` : "Great Lakes: true positions of 39 points"}>
            {() => (
              <>
                {chosen && chosen.pts.map((p, i) => {
                  const [x1, y1] = xy(ACTUAL[i]);
                  const [x2, y2] = xy(p);
                  return <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} className={s.err} />;
                })}
                {ACTUAL.map((p, i) => {
                  const [x, y] = xy(p);
                  return <circle key={`a${i}`} cx={x} cy={y} r={2.2} className={s.actual} />;
                })}
                {chosen && chosen.pts.map((p, i) => {
                  const [x, y] = xy(p);
                  return <circle key={`m${i}`} cx={x} cy={y} r={2.6} className={s.ring} />;
                })}
                <circle cx={10} cy={11} r={2.6} className={s.actual} />
                <text x={16} y={15} className={`${s.small} ${s.halo}`}>true position</text>
                {chosen && (
                  <>
                    <circle cx={98} cy={11} r={2.6} className={s.ring} />
                    <text x={104} y={15} className={`${s.small} ${s.halo}`}>on the map</text>
                    <text x={W - 6} y={15} textAnchor="end" className={`${s.maker} ${s.halo}`}>{chosen.maker} {chosen.year}</text>
                  </>
                )}
              </>
            )}
          </WorldMap>
        )}
      </div>
      <div className={s.presets}>
        {PRESETS.map((p) => (
          <Control key={p.id} disabled={locked} className={!locked && mode === p.id ? "active" : ""}
            aria-pressed={!locked && mode === p.id} onClick={() => press(p.id)}>
            {p.label}
          </Control>
        ))}
      </div>
      <Row>
        {!locked && mode === "all" ? (
          <Readout label="Maps where east-west was worse" value={`${EW_WORSE} of ${ERR.length}`} />
        ) : (
          <Readout label="Average error" value={chosen ? `${km(chosen.ns)} km N-S · ${km(chosen.ew)} km E-W` : "-"} />
        )}
      </Row>
    </div>
  );
}

export default function LakesMisplacedEastWest({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Coronelli's 1688 map of the Great Lakes misplaced 39 known points. Which error was bigger, in kilometres: north-south or east-west?",
        options: ["North-south", "East-west", "About equal"],
        answer: 1,
      }}
      exploreHint="Press each map, oldest first, then compare the errors in km."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On Coronelli&apos;s map the points were on average {km(CORONELLI.ns)} km off north-south but {km(CORONELLI.ew)} km
            off east-west. By Melish&apos;s map of 1818 the east-west error was down to {km(MELISH.ew)} km. East-west was the
            worse error on {EW_WORSE} of the {ERR.length} maps.
          </p>
          <p>Latitude can be taken from the height of the Sun or a star, while longitude needs a time difference.</p>
          <p>Where it stops: each map&apos;s 39 points were read off by hand.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} mode={mode} pick={setMode} />}
        </Milestones>
      )}
    </Lesson>
  );
}
