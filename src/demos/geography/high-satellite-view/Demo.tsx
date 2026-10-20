"use client";

// Geography: how much of the Earth a satellite sees. One orthographic globe; the visible cap is
// a small circle of half-angle acos(R / (R + h)) around the point below the satellite. The
// question, the readout and the drawn circle all come from the same function (capAngleDeg).
// Key state: altitude set to 35,786 km (geostationary), where the cap is drawn and the share reads out.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { EARTH_RADIUS_KM, WorldMap, geoCircle, geoOrthographic } from "@/kit/geo";

const W = 320;
const H = 214;
const GEO_KM = 35786;
const START_KM = 1000;
const MILESTONES = ["low", "geostationary"] as const;
const LOW_KM = 5000; // a "low" satellite for this lesson

/** Half-angle (degrees) of the cap a satellite h km up can see. */
function capAngleDeg(h: number) {
  return (Math.acos(EARTH_RADIUS_KM / (EARTH_RADIUS_KM + h)) * 180) / Math.PI;
}
/** Share of the sphere's surface inside that cap: (1 - cos(angle)) / 2. */
function share(h: number) {
  return (1 - EARTH_RADIUS_KM / (EARTH_RADIUS_KM + h)) / 2;
}
const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
const km = (v: number) => `${v.toLocaleString("en-US")} km`;

const PRESETS = [
  { label: "Space station", h: 400 },
  { label: "GPS satellite", h: 20200 },
  { label: "Geostationary", h: GEO_KM },
];

function Stage({ locked, reach, onLow }: { locked: boolean; reach: (n: string) => void; onLow: (h: number) => void }) {
  const [h, setH] = useState(START_KM);
  const projection = useMemo(
    () => geoOrthographic().rotate([0, -30]).scale(98).translate([W / 2, H / 2 + 2]).clipAngle(90),
    [],
  );
  const set = (v: number) => {
    setH(v);
    if (v === GEO_KM) reach("geostationary");
    if (v < LOW_KM) {
      onLow(v);
      reach("low");
    }
  };
  const angle = capAngleDeg(h);
  const cap = useMemo(() => geoCircle().center([0, 0]).radius(angle)(), [angle]);
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={`Orthographic globe. A satellite ${km(h)} above the equator at longitude 0 sees a circle out to ${angle.toFixed(1)} degrees from the point below it.`}
      >
        {({ path }) => {
          const sub = projection([0, 0]);
          return (
            <>
              <path
                d={`${path({ type: "Sphere" })} ${path(cap)}`}
                fillRule="evenodd"
                fill="var(--bg)"
                fillOpacity={0.72}
              />
              <path d={path(cap)} fill="none" stroke="var(--domain)" strokeWidth={1.6} />
              {sub && (
                <>
                  <circle cx={sub[0]} cy={sub[1]} r={3.5} fill="var(--bad)" stroke="var(--fg)" strokeWidth={0.8} />
                  <text x={sub[0] + 6} y={sub[1] + 4} fontSize={9} fill="var(--fg)">
                    below the satellite
                  </text>
                </>
              )}
            </>
          );
        }}
      </WorldMap>
      <p className="muted tiny">Orthographic globe. Satellite is above the equator. Clear area is what it can see.</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p.h} disabled={locked} className={h === p.h ? "active" : ""} onClick={() => set(p.h)}>
            {p.label}
          </Control>
        ))}
      </Row>
      <Row>
        <Slider
          label="Height above ground"
          value={h}
          min={200}
          max={60000}
          step={2}
          disabled={locked}
          format={km}
          onChange={set}
        />
        <Readout label="Share of Earth in view" value={locked ? "?" : pct(share(h))} />
      </Row>
    </div>
  );
}

export default function HighSatelliteView({ slug }: { slug: string }) {
  const geo = share(GEO_KM);
  const geoAngle = capAngleDeg(GEO_KM);
  const [lowH, setLowH] = useState<number | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A geostationary satellite hangs ${km(GEO_KM)} above the equator. What share of the planet's surface can it see?`,
        options: ["About half (50%)", "Less than half (about 40%)", "About a quarter (25%)"],
        answer: 1,
      }}
      exploreHint="Press a low satellite, then the Geostationary button, and compare."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From {km(GEO_KM)} the satellite sees about {Math.round(geo * 100)}% of the surface: everything within{" "}
            {geoAngle.toFixed(0)}° of the point below it. The poles remain out of view. {lowH !== null && (
              <>
                From {km(lowH)} it saw only {pct(share(lowH))}.
              </>
            )}
          </p>
          <p>
            The edge of view is where your sightline just grazes the ball, and it creeps outward as you climb. Exactly
            half needs an infinite height. Near the edge, a dish sees the satellite on the horizon.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} onLow={(v) => setLowH((p) => (p === null ? v : Math.min(p, v)))} />}
        </Milestones>
      )}
    </Lesson>
  );
}
