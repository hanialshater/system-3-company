"use client";

// How much of the globe lies between two parallels? A band is shaded on an orthographic globe and
// two shares are read out: its share of the latitude range ((n − s)/180°) and its share of the
// surface ((sin n − sin s)/2, Archimedes' hat-box theorem on a sphere). Key state: the ±30° band
// at 50%, compared with the 60°N-to-pole cap, which spans as many degrees but holds 6.7%.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, geoCircle, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

const W = 300;
const H = 300;
const RAD = Math.PI / 180;
type Band = { s: number; n: number; label: string };
const BANDS: Band[] = [
  { s: -30, n: 30, label: "30°S to 30°N" },
  { s: 60, n: 90, label: "60°N to the pole" },
  { s: -10, n: 10, label: "10°S to 10°N" },
  { s: -60, n: 60, label: "60°S to 60°N" },
];
const START: Band = { s: -20, n: 20, label: "20°S to 20°N" };
const surfaceShare = (b: Band) => (Math.sin(b.n * RAD) - Math.sin(b.s * RAD)) / 2;
const rangeShare = (b: Band) => (b.n - b.s) / 180;
const pct = (x: number) => `${(x * 100).toFixed(1).replace(/\.0$/, "")}%`;

/** The band as a polygon: the cap north of s, with the cap north of n cut out. */
function bandPolygon(b: Band) {
  const cap = (lat: number) => geoCircle().center([0, 90]).radius(90 - lat).precision(2)().coordinates[0];
  const rings = [cap(b.s)];
  if (b.n < 90) rings.push(cap(b.n).slice().reverse());
  return { type: "Polygon" as const, coordinates: rings };
}

const projection = geoOrthographic().rotate([-15, -20]).fitExtent([[8, 18], [W - 8, H - 8]], { type: "Sphere" });

export default function HalfTheGlobe30Band({ slug }: { slug: string }) {
  const [band, setBand] = useState<Band>(START);
  const poly = useMemo(() => bandPolygon(band), [band]);
  const [sawCap, setSawCap] = useState(false);
  const half = BANDS[0];
  const cap = BANDS[1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "What share of the Earth's surface lies between 30°S and 30°N?",
        options: ["About 33%", "About 50%", "About 25%"],
        answer: 1,
      }}
      exploreHint="Shade 30°S to 30°N, then the cap from 60°N to the pole."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Half: {pct(surfaceShare(half))}.</strong> That band is only a third of the latitude range (60° of 180°), but it is the fat
            middle of the ball.{sawCap && ` The cap from 60°N to the pole spans 30° too, yet holds only ${pct(surfaceShare(cap))}.`}
          </p>
          <p>
            Area grows with the sine of latitude, not with the degrees: sin 30° is one half, so half of each hemisphere lies within
            30° of the equator. Degrees near the poles cover far less ground.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["half", "cap"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                label={`Globe with the band ${band.label} shaded${locked ? "" : `: ${pct(surfaceShare(band))} of the surface`}.`}
              >
                {({ path }) => (
                  <>
                    <path d={path(poly)} className={s.band} />
                    <text x={4} y={12} className={s.lab}>
                      Globe (a sphere). Shaded: {band.label}.
                    </text>
                  </>
                )}
              </WorldMap>
              <Row>
                {BANDS.map((b, i) => (
                  <Control
                    key={b.label}
                    disabled={locked}
                    className={band === b ? "active" : ""}
                    onClick={() => {
                      setBand(b);
                      if (i === 0) reach("half");
                      if (i === 1) {
                        reach("cap");
                        setSawCap(true);
                      }
                    }}
                  >
                    {b.label}
                  </Control>
                ))}
              </Row>
              <Row>
                <Readout label="Share of the degrees" value={locked ? "?" : pct(rangeShare(band))} />
                <Readout label="Share of the surface" value={locked ? "?" : pct(surfaceShare(band))} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
