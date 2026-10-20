"use client";

// An Equal Earth map zoomed on Europe. The learner sets the distance from Paris and from Rome; each
// distance is a ring (a circle on the sphere) and the places that fit both are where the rings cross.
// A third ring from Madrid, sized to pass through one crossing, removes the other. All crossing points
// are computed by spherical geometry from the same radii the rings are drawn with.
// Key state: Paris 1,000 km and Rome 800 km (two crossings) with the Madrid ring added (one survives).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM as R, geoCircle, geoDistance, geoEqualEarth } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
type V = [number, number, number];
const W = 320;
const H = 186;
const PARIS: P = [2.3522, 48.8566];
const ROME: P = [12.4964, 41.9028];
const MADRID: P = [-3.7038, 40.4168];
const rad = Math.PI / 180;
const km = (v: number) => Math.round(v).toLocaleString("en-US");
const dist = (a: P, b: P) => geoDistance(a, b) * R;

const vec = (p: P): V => [Math.cos(p[1] * rad) * Math.cos(p[0] * rad), Math.cos(p[1] * rad) * Math.sin(p[0] * rad), Math.sin(p[1] * rad)];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Points on the sphere at distance r1 from c1 and r2 from c2 (0, 1 or 2 of them). */
function crossings(c1: P, r1: number, c2: P, r2: number): P[] {
  const a = vec(c1);
  const b = vec(c2);
  const A = Math.cos(r1 / R);
  const B = Math.cos(r2 / R);
  const d = dot(a, b);
  const den = 1 - d * d;
  const x = (A - B * d) / den;
  const y = (B - A * d) / den;
  const n = cross(a, b);
  const base = [0, 1, 2].map((i) => x * a[i] + y * b[i]) as V;
  const q = 1 - dot(base, base);
  if (q < 0) return [];
  const z = Math.sqrt(q / dot(n, n));
  return [z, -z].map((t) => {
    const p = [0, 1, 2].map((i) => base[i] + t * n[i]);
    return [Math.atan2(p[1], p[0]) / rad, Math.asin(p[2]) / rad] as P;
  });
}

const SIGNAL = { paris: 1000, rome: 800 };
const SIGNAL_POINTS = crossings(PARIS, SIGNAL.paris, ROME, SIGNAL.rome);
// The Madrid ring is sized to pass through the crossing nearer Madrid.
const MADRID_R = Math.round(Math.min(...SIGNAL_POINTS.map((p) => dist(MADRID, p))));
const FAR_POINT_MADRID = Math.round(Math.max(...SIGNAL_POINTS.map((p) => dist(MADRID, p))));

export default function TwoDistancesTwoPlaces({ slug }: { slug: string }) {
  const [paris, setParis] = useState(600);
  const [rome, setRome] = useState(400);
  const [madrid, setMadrid] = useState(false);
  const projection = useMemo(
    () =>
      geoEqualEarth().fitExtent(
        [
          [4, 4],
          [W - 4, H - 4],
        ],
        { type: "MultiPoint", coordinates: [[-14, 33], [32, 33], [32, 61], [-14, 61]] },
      ),
    [],
  );
  const ring = (c: P, r: number) => geoCircle().center(c).radius((r / R) / rad)();
  const pts = crossings(PARIS, paris, ROME, rome);
  const fits = (p: P) => !madrid || Math.abs(dist(MADRID, p) - MADRID_R) < 5;
  const count = pts.filter(fits).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Your phone gets a signal saying you are 1,000 km from Paris and 800 km from Rome, and nothing more. How many places on the map could you be standing?",
        options: ["Exactly one", "Two", "A whole line of them"],
        answer: 1,
      }}
      exploreHint="Set the signal's distances, then add the Madrid ring."
      minInteractions={2}
      reveal={() => (
        <p>
          Two. Each distance alone puts you somewhere on a circle, and two circles cross twice: one crossing is over Austria,
          the other is in the Mediterranean near the Balearic Islands. A third distance, {MADRID_R} km from Madrid, fits
          only the sea crossing (the Austrian one is {km(FAR_POINT_MADRID)} km from Madrid). Position fixing works this way:
          each distance is a circle and a further circle removes the extra crossing. Satellite positioning uses the same
          idea in three dimensions.
        </p>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["two", "third"]}>
          {(reach) => {
            const check = (pa: number, ro: number, ma: boolean) => {
              if (pa === SIGNAL.paris && ro === SIGNAL.rome) {
                reach("two");
                if (ma) reach("third");
              }
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Equal Earth map of Europe. Rings ${km(paris)} km from Paris and ${km(rome)} km from Rome${madrid ? `, and ${MADRID_R} km from Madrid` : ""}. They meet at ${count} place${count === 1 ? "" : "s"}.`}
                >
                  {({ path, projection: proj }) => (
                    <>
                      <path d={path(ring(PARIS, paris))} className={s.ringA} />
                      <path d={path(ring(ROME, rome))} className={s.ringB} />
                      {madrid && <path d={path(ring(MADRID, MADRID_R))} className={s.ringC} />}
                      {([["Paris", PARIS], ["Rome", ROME], ["Madrid", MADRID]] as [string, P][]).map(([n, c]) => {
                        const p = proj(c)!;
                        return (
                          <g key={n}>
                            <circle cx={p[0]} cy={p[1]} r={2.6} className={s.city} />
                            <text x={p[0]} y={p[1] - 5} textAnchor="middle" className={s.name}>
                              {n}
                            </text>
                          </g>
                        );
                      })}
                      {!locked &&
                        pts.map((p, i) => {
                          const q = proj(p)!;
                          return <circle key={i} cx={q[0]} cy={q[1]} r={4.2} className={!madrid ? s.hit : fits(p) ? s.keep : s.drop} />;
                        })}
                    </>
                  )}
                </WorldMap>
                <p className={s.note}>Equal Earth map, zoomed on Europe. Each ring is one distance; dots are where rings meet.</p>
                <div className={s.chips}>
                  <Control
                    disabled={locked || (paris === SIGNAL.paris && rome === SIGNAL.rome)}
                    onClick={() => {
                      setParis(SIGNAL.paris);
                      setRome(SIGNAL.rome);
                      check(SIGNAL.paris, SIGNAL.rome, madrid);
                    }}
                  >
                    Set the signal: 1,000 and 800 km
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      setMadrid(!madrid);
                      check(paris, rome, !madrid);
                    }}
                  >
                    {madrid ? "Remove Madrid ring" : `Add Madrid ring (${MADRID_R} km)`}
                  </Control>
                </div>
                <Row>
                  <Slider
                    label="Distance from Paris"
                    value={paris}
                    min={200}
                    max={1500}
                    step={100}
                    disabled={locked}
                    format={(v) => `${km(v)} km`}
                    onChange={(v) => {
                      setParis(v);
                      check(v, rome, madrid);
                    }}
                  />
                </Row>
                <Row>
                  <Slider
                    label="Distance from Rome"
                    value={rome}
                    min={200}
                    max={1500}
                    step={100}
                    disabled={locked}
                    format={(v) => `${km(v)} km`}
                    onChange={(v) => {
                      setRome(v);
                      check(paris, v, madrid);
                    }}
                  />
                </Row>
                <Row>
                  <Readout label="Places that fit" value={locked ? "?" : String(count)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
