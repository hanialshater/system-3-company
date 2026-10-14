"use client";

// Toy sky, real geometry: a side view of the sky at noon, facing east, so south is on the right.
// Noon altitude of the Sun = 90° - latitude + declination. The equinox position (declination 0) sits
// at 90° - 51.5° = 38.5° for London; the tilt moves the Sun 23.44° above or below it. Every number on
// the stage and in the question comes from noonAltitude(). No refraction.
// v2: a latitude slider (the learner can move away from London and see 90° - latitude change), the Sun's
// height is shown from the moment the stage opens, and the ground patch lit by one sunbeam is drawn
// (length 1/sin(altitude)). Key state: at London, the equinox and 21 December both visited.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W = 320;
const H = 214;
const OX = 150;
const OY = 186;
const RS = 140; // sky radius, px
const RAD = Math.PI / 180;
const LAT = 51.5072; // London
const TILT = 23.44;
const MIN_LAT = 24; // north of the tropics, so the noon Sun is always in the south
const MAX_LAT = 60; // keeps the December Sun above the horizon (90 - 60 - 23.44 > 0)
const DATES = [
  { label: "21 June", dec: TILT, key: "" },
  { label: "Equinox", dec: 0, key: "equinox" },
  { label: "21 December", dec: -TILT, key: "december" },
];
const altAt = (lat: number, dec: number) => 90 - lat + dec;
const noonAltitude = (dec: number) => altAt(LAT, dec);
const at = (alt: number, r = RS) => [OX + r * Math.cos(alt * RAD), OY - r * Math.sin(alt * RAD)] as const;
const f1 = (v: number) => v.toFixed(1);
/** How many times more ground one sunbeam covers than when the Sun is overhead; 0 if the Sun is down. */
const spread = (alt: number) => (alt > 0.5 ? 1 / Math.sin(alt * RAD) : 0);

export default function LondonDecemberNoonSun({ slug }: { slug: string }) {
  const [i, setI] = useState(0);
  const [lat, setLat] = useState(LAT);
  const [seen, setSeen] = useState<number[]>([0]);
  const atLondon = lat === LAT;
  const alt = altAt(lat, DATES[i].dec);
  const eq = altAt(lat, 0);
  const [sx, sy] = at(alt);
  const sp = spread(alt);
  const patch = sp > 0 ? Math.min(150, 22 * sp) : 0;
  const arc = (from: number, to: number, r: number) => {
    const [x0, y0] = at(from, r);
    const [x1, y1] = at(to, r);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 ${to > from ? 0 : 1} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const dec = DATES[i].dec;
  const formula = `90° − ${f1(lat)}° ${dec >= 0 ? "+" : "−"} ${f1(Math.abs(dec))}° = ${f1(alt)}°`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In London (${f1(LAT)}°N), how high above the horizon is the Sun at noon on 21 December?`,
        options: [
          `About ${Math.round(noonAltitude(0))}°`,
          `About ${Math.round(noonAltitude(-TILT))}°`,
          `About ${Math.round(noonAltitude(TILT))}°`,
        ],
        answer: 1,
      }}
      exploreHint="Step the date through the equinox to December. Then move north or south and watch the height."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {Math.round(noonAltitude(-TILT))}°</strong>, barely a sixth of the way up the sky. Start from 90° (overhead) and
            subtract London&rsquo;s latitude: {f1(noonAltitude(0))}°, where the noon Sun sits at the equinox. The Earth&rsquo;s {TILT}° tilt then lifts
            it to {f1(noonAltitude(TILT))}° in June or drops it to {f1(noonAltitude(-TILT))}° in December.
          </p>
          <p>
            So London&rsquo;s winter noon Sun is {f1(noonAltitude(TILT) - noonAltitude(-TILT))}° lower than its summer noon Sun: twice the tilt,
            not a little lower. Low is why it is weak: the same sunbeam covers {f1(spread(noonAltitude(-TILT)))} times the ground in December,
            against {f1(spread(noonAltitude(TILT)))} times in June.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["equinox", "december"]}>
          {(reach) => (
            <div className={s.wrap}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="stage-svg"
                role="img"
                aria-label={`Side view of the sky at noon at ${f1(lat)}°N on ${DATES[i].label}.${locked ? "" : ` The Sun is ${f1(alt)} degrees above the southern horizon.`}`}
              >
                <path d={arc(0, 180, RS)} className={s.sky} />
                <line x1={OX - RS - 6} y1={OY} x2={OX + RS + 6} y2={OY} className={s.ground} />
                {!locked && sp > 0 && <line x1={OX - patch / 2} y1={OY} x2={OX + patch / 2} y2={OY} className={s.patch} />}
                <text x={OX - RS} y={OY + 13} className={s.small}>
                  N
                </text>
                <text x={OX + RS} y={OY + 13} className={s.small} textAnchor="end">
                  S
                </text>
                {/* Equinox height and the tilt band either side of it */}
                {!locked && <path d={arc(altAt(lat, -TILT), altAt(lat, TILT), RS)} className={s.band} />}
                {!locked && <line x1={OX} y1={OY} x2={at(eq)[0]} y2={at(eq)[1]} className={s.eqLine} />}
                {!locked && (
                  <text x={at(eq, RS + 6)[0]} y={at(eq, RS + 6)[1] + 3} className={s.small}>
                    equinox
                  </text>
                )}
                {!locked && (
                  <text x={at(altAt(lat, TILT) + 4, RS + 6)[0]} y={at(altAt(lat, TILT) + 4, RS + 6)[1]} className={s.small}>
                    ±{f1(TILT)}° tilt
                  </text>
                )}
                {seen
                  .filter((k) => k !== i)
                  .map((k) => {
                    const [gx, gy] = at(altAt(lat, DATES[k].dec));
                    return <circle key={k} cx={gx} cy={gy} r={7} className={s.ghost} />;
                  })}
                <line x1={OX} y1={OY} x2={sx} y2={sy} className={s.ray} />
                {!locked && <path d={arc(0, alt, 46)} className={s.protractor} />}
                {!locked && (
                  <text x={at(alt / 2, 56)[0]} y={at(alt / 2, 56)[1] + 4} className={s.angle}>
                    {f1(alt)}°
                  </text>
                )}
                <circle cx={sx} cy={sy} r={9} className={s.sun} />
                <circle cx={OX} cy={OY - 4} r={4} className={s.you} />
                <text x={OX} y={OY + 13} className={s.small} textAnchor="middle">
                  {atLondon ? "you, London" : `you, ${f1(lat)}°N`}
                </text>
                <text x={4} y={12} className={s.small}>
                  Toy sky, true angles. Side view at noon: south on the right.
                </text>
              </svg>
              <p className={s.note}>Equinox: a spring or autumn day when day and night are nearly equal. Tilt: how far the Earth leans, 23.4°. Orange bar: the ground one sunbeam lights.</p>
              <Row>
                <Slider
                  label="Date"
                  value={i}
                  min={0}
                  max={2}
                  disabled={locked}
                  format={(v) => DATES[v].label}
                  onChange={(v) => {
                    setI(v);
                    setSeen((p) => (p.includes(v) ? p : [...p, v]));
                    if (DATES[v].key && atLondon) reach(DATES[v].key);
                  }}
                />
              </Row>
              <Row>
                <Slider
                  label="Where you stand (latitude)"
                  value={Math.round(lat * 2) / 2}
                  min={MIN_LAT}
                  max={MAX_LAT}
                  step={0.5}
                  disabled={locked}
                  format={(v) => `${v}°N`}
                  onChange={(v) => {
                    setLat(Math.abs(v - Math.round(LAT * 2) / 2) < 0.01 ? LAT : v);
                  }}
                />
              </Row>
              {!atLondon && (
                <Row>
                  <Control disabled={locked} onClick={() => setLat(LAT)}>
                    Back to London ({f1(LAT)}°N)
                  </Control>
                </Row>
              )}
              <Row>
                <Readout label="Noon Sun height" value={locked ? "?" : formula} />
                <Readout label="One sunbeam covers" value={locked ? "?" : sp > 0 ? `${f1(sp)}× the ground` : "no ground: Sun is down"} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
