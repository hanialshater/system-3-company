"use client";

// Geography: the compass heading from the Atlantic end of the Panama Canal to the Pacific end.
// Mercator map zoomed on Panama (1:110m outline). Ends: Colon 9.36 N 79.90 W and Balboa 8.95 N 79.57 W.
// The heading is the initial great-circle bearing between the two end points (bearing()), used for the ship
// triangle, the readout and the reveal. It is the straight-line heading, not the canal's winding course.
// Key state: the ship has sailed to the Pacific end, where the readout shows the heading.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { EARTH_RADIUS_KM, WorldMap, geoDistance, geoMercator } from "@/kit/geo";

const W = 320;
const H = 190;
const RAD = Math.PI / 180;
const COLON: [number, number] = [-79.9, 9.36];
const BALBOA: [number, number] = [-79.57, 8.95];
const MILESTONES = ["pacific"] as const;

function bearing(a: [number, number], b: [number, number]) {
  const y = Math.sin((b[0] - a[0]) * RAD) * Math.cos(b[1] * RAD);
  const x = Math.cos(a[1] * RAD) * Math.sin(b[1] * RAD) - Math.sin(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.cos((b[0] - a[0]) * RAD);
  return (((Math.atan2(y, x) / RAD) % 360) + 360) % 360;
}
const HEADING = bearing(COLON, BALBOA);
const KM = geoDistance(COLON, BALBOA) * EARTH_RADIUS_KM;
const compass = (b: number) => ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(b / 45) % 8];

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [t, setT] = useState(0); // 0 = Atlantic end, 100 = Pacific end
  const projection = useMemo(() => geoMercator().scale(5400).center([-79.75, 9.15]).translate([W / 2, H / 2]), []);
  const go = (v: number) => {
    setT(v);
    if (v >= 100) reach("pacific");
  };
  const f = t / 100;
  const pos: [number, number] = [COLON[0] + (BALBOA[0] - COLON[0]) * f, COLON[1] + (BALBOA[1] - COLON[1]) * f];
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        highlight={["Panama"]}
        graticule={false}
        label={locked ? "Mercator map of Panama." : `Mercator map of Panama. A ship ${t} percent of the way from the Atlantic end to the Pacific end of the canal, heading ${HEADING.toFixed(0)} degrees, ${compass(HEADING)}.`}
      >
        {({ projection: proj }) => {
          const a = proj(COLON);
          const b = proj(BALBOA);
          const p = proj(pos);
          if (locked || !a || !b || !p) return null;
          return (
            <>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--fg)" strokeWidth={1} strokeDasharray="3 2" />
              <circle cx={a[0]} cy={a[1]} r={3.5} fill="var(--fg)" />
              <circle cx={b[0]} cy={b[1]} r={3.5} fill="var(--fg)" />
              <text x={a[0] - 6} y={a[1] - 7} fontSize={9} fill="var(--fg)" textAnchor="end">
                Atlantic end
              </text>
              <text x={b[0] + 7} y={b[1] + 12} fontSize={9} fill="var(--fg)">
                Pacific end
              </text>
              <g transform={`translate(${p[0]} ${p[1]}) rotate(${HEADING})`}>
                <path d="M0 -8 L5 6 L0 3 L-5 6 Z" fill="var(--bad)" stroke="var(--fg)" strokeWidth={0.8} />
              </g>
              <text x={W - 6} y={14} fontSize={10} fill="var(--fg)" textAnchor="end">
                N ↑
              </text>
            </>
          );
        }}
      </WorldMap>
      <p className="muted tiny">Mercator map zoomed on Panama, north up. Straight line between the two canal ends.</p>
      <Row>
        <Control disabled={locked} className={t >= 100 ? "active" : ""} onClick={() => go(100)}>
          Sail to the Pacific end
        </Control>
        <Control disabled={locked} className={t === 0 ? "active" : ""} onClick={() => go(0)}>
          Back to the Atlantic end
        </Control>
      </Row>
      <Row>
        <Slider label="Along the canal" value={t} min={0} max={100} step={5} disabled={locked} format={(v) => `${v}%`} onChange={go} />
        <Readout label="Overall heading" value={locked ? "?" : `${HEADING.toFixed(0)}° ${compass(HEADING)}`} />
      </Row>
    </div>
  );
}

export default function AtlanticToPacificHeading({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A ship enters the Panama Canal from the Atlantic and leaves into the Pacific. Which way is it heading overall?",
        options: ["South-east", "West", "South-west"],
        answer: 0,
      }}
      exploreHint="Sail the ship to the Pacific end and read its heading."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            South-east, at {HEADING.toFixed(0)}° (north is 0°, east 90°). The straight line between the two ends is{" "}
            {Math.round(KM)} km long, and the Pacific end lies {(BALBOA[0] - COLON[0]).toFixed(2)}° of longitude east of the
            Atlantic end.
          </p>
          <p>
            Panama&rsquo;s isthmus curves like an S, running east-west, so the Pacific end of the canal is further east. The
            canal itself winds, so this is its overall direction, not every turn.
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
