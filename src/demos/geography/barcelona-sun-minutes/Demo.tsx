"use client";

// Geography: solar noon moves 4 minutes per degree of longitude. A north-south "noon line" crosses an
// equirectangular map of Spain, moving west as time passes; the learner puts it over Barcelona and over
// Madrid and reads how long ago (or how soon) the Sun is highest in each. The distance in the question,
// the line position and the minutes all come from the two city coordinates below.
// Key state: the noon line has been over Barcelona and over Madrid.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { EARTH_RADIUS_KM, WorldMap, geoDistance, geoEquirectangular } from "@/kit/geo";

const W = 320;
const H = 190;
const MADRID: [number, number] = [-3.7038, 40.4168];
const BARCELONA: [number, number] = [2.1686, 41.3874];
const GAP_MIN = (BARCELONA[0] - MADRID[0]) * 4; // minutes of solar time: 4 per degree of longitude
const GAP_KM = geoDistance(MADRID, BARCELONA) * EARTH_RADIUS_KM;
const MILESTONES = ["barcelona", "madrid"] as const;

const mins = (m: number) => `${m.toFixed(1)} min`;
function describe(offset: number) {
  // offset = minutes since the Sun was highest here (negative = still to come)
  if (Math.abs(offset) < 0.05) return "Sun highest now";
  return offset > 0 ? `Peaked ${mins(offset)} ago` : `Peaks in ${mins(-offset)}`;
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [m, setM] = useState<number | null>(null); // minutes since the Sun was highest over Barcelona
  const projection = useMemo(() => geoEquirectangular().scale(1310).center([-2.5, 39.85]).translate([W / 2, H / 2]), []);
  const set = (v: number) => {
    setM(v);
    if (v === 0) reach("barcelona");
    if (Math.abs(v - GAP_MIN) < 0.3) reach("madrid");
  };
  const shown = m ?? 0;
  const lineLon = BARCELONA[0] - shown / 4;
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        highlight={["Spain"]}
        label={m === null ? "Equirectangular map of Spain with Madrid and Barcelona marked." : `Equirectangular map of Spain. The noon line, where the Sun is highest, is ${shown.toFixed(0)} minutes west of Barcelona's noon.`}
      >
        {({ projection: proj }) => {
          const a = proj(MADRID);
          const b = proj(BARCELONA);
          const x = proj([lineLon, 39.85]);
          return (
            <>
              {m !== null && x && <line x1={x[0]} y1={0} x2={x[0]} y2={H} stroke="#f5b301" strokeWidth={2.2} />}
              {m !== null && x && (
                <text x={Math.min(Math.max(x[0], 40), W - 40)} y={10} fontSize={9} fill="var(--fg)" textAnchor="middle">
                  Sun highest on this line
                </text>
              )}
              {a && (
                <g>
                  <circle cx={a[0]} cy={a[1]} r={3.5} fill="var(--fg)" />
                  <text x={a[0] - 5} y={a[1] + 12} fontSize={9} fill="var(--fg)" textAnchor="middle">
                    Madrid
                  </text>
                </g>
              )}
              {b && (
                <g>
                  <circle cx={b[0]} cy={b[1]} r={3.5} fill="var(--fg)" />
                  <text x={b[0] - 5} y={b[1] - 6} fontSize={9} fill="var(--fg)" textAnchor="middle">
                    Barcelona
                  </text>
                </g>
              )}
            </>
          );
        }}
      </WorldMap>
      <p className="muted tiny">Equirectangular map. Both cities share one official clock. The Sun moves west.</p>
      <Row>
        <Control disabled={locked} className={m === 0 ? "active" : ""} onClick={() => set(0)}>
          Sun highest over Barcelona
        </Control>
        <Control disabled={locked} className={m !== null && Math.abs(m - GAP_MIN) < 0.3 ? "active" : ""} onClick={() => set(GAP_MIN)}>
          Sun highest over Madrid
        </Control>
      </Row>
      <Row>
        <Slider label="Minutes after Barcelona's noon" value={Math.round(shown * 10) / 10} min={0} max={30} step={0.1} disabled={locked} format={(v) => v.toFixed(1)} onChange={set} />
      </Row>
      <Row>
        <Readout label="Barcelona" value={locked || m === null ? "?" : describe(shown)} />
        <Readout label="Madrid" value={locked || m === null ? "?" : describe(shown - GAP_MIN)} />
      </Row>
    </div>
  );
}

export default function BarcelonaSunMinutes({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a trip across Spain, your phone never changes time. Madrid and Barcelona keep the same official clock. Barcelona is about ${Math.round(GAP_KM)} km east of Madrid. How much earlier does the Sun reach its highest point there?`,
        options: ["5 minutes", "23 minutes", "1 hour"],
        answer: 1,
      }}
      exploreHint="Put the noon line over Barcelona, then over Madrid, and read both cities."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            About {Math.round(GAP_MIN)} minutes ({GAP_MIN.toFixed(1)}). When the Sun was highest over Barcelona it still had {mins(GAP_MIN)} to go before
            Madrid, on the same official clock.
          </p>
          <p>
            Earth turns 360° in 24 hours: 4 minutes per degree of longitude. The cities are{" "}
            {(BARCELONA[0] - MADRID[0]).toFixed(1)}° apart.
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
