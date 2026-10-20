"use client";

// Geography toy (labelled on the stage): where on the horizon the Sun rises and sets over London.
// Top-down compass. Declination from the date with a circular-orbit model (dec = asin(sin 23.44deg *
// sin(lambda)), lambda = 360 (day - 80) / 365.25), rise bearing A from north: cos A = sin(dec) / cos(lat),
// set bearing 360 - A. The question's June value and the readout come from the same riseBearing().
// Key state: the learner has looked at both 21 June and 21 December.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";

const LAT = 51.5072;
const EPS = 23.44;
const RAD = Math.PI / 180;
const JUNE = 172; // 21 June (non-leap year)
const DECEMBER = 355; // 21 December
const EQUINOX = 80; // 21 March
const START = 105; // 15 April
const MILESTONES = ["june", "december"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dateLabel(day: number) {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d <= LENGTHS[m]) return `${d} ${MONTHS[m]}`;
    d -= LENGTHS[m];
  }
  return "31 Dec";
}
function declination(day: number) {
  return Math.asin(Math.sin(EPS * RAD) * Math.sin(((day - 80) * 360 * RAD) / 365.25)) / RAD;
}
/** Compass bearing (degrees clockwise from north) of sunrise at London, flat geometric horizon. */
function riseBearing(day: number) {
  return Math.acos(Math.sin(declination(day) * RAD) / Math.cos(LAT * RAD)) / RAD;
}
const compass = (b: number) => {
  const names = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
  return names[Math.round((((b % 360) + 360) % 360) / 45) % 8];
};

const CX = 160;
const CY = 96;
const R = 76;
const at = (bearing: number, r: number): [number, number] => [CX + r * Math.sin(bearing * RAD), CY - r * Math.cos(bearing * RAD)];

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [day, setDay] = useState(START);
  const rise = riseBearing(day);
  const set = 360 - rise;
  const go = (d: number) => {
    setDay(d);
    if (d === JUNE) reach("june");
    if (d === DECEMBER) reach("december");
  };
  const [rx, ry] = at(rise, R);
  const [sx, sy] = at(set, R);
  return (
    <div>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Top-down compass of London's horizon." : `Top-down compass. On ${dateLabel(day)} the Sun rises at ${rise.toFixed(0)} degrees, ${compass(rise)}, and sets at ${set.toFixed(0)} degrees.`}>
        <circle cx={CX} cy={CY} r={R} fill="var(--bg-2)" stroke="var(--line)" strokeWidth={1.5} />
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="var(--line)" strokeDasharray="3 3" />
        <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="var(--line)" strokeDasharray="3 3" />
        {[
          ["N 0°", 0],
          ["E 90°", 90],
          ["S 180°", 180],
          ["W 270°", 270],
        ].map(([t, b]) => {
          const [x, y] = at(b as number, (b as number) % 180 === 90 ? R + 24 : R + 13);
          return (
            <text key={t as string} x={x} y={y + 3} fontSize={10} fill="var(--fg)" textAnchor="middle">
              {t}
            </text>
          );
        })}
        {!locked && (
          <>
            <line x1={CX} y1={CY} x2={rx} y2={ry} stroke="var(--domain)" strokeWidth={1.2} />
            <line x1={CX} y1={CY} x2={sx} y2={sy} stroke="var(--bad)" strokeWidth={1.2} />
            <circle cx={rx} cy={ry} r={6} fill="#f5b301" stroke="var(--fg)" strokeWidth={0.8} />
            <circle cx={sx} cy={sy} r={6} fill="#f5b301" stroke="var(--fg)" strokeWidth={0.8} />
            <text x={at(rise, R - 18)[0]} y={at(rise, R - 18)[1] + 3} fontSize={9} fill="var(--fg)" textAnchor="middle">
              rise
            </text>
            <text x={at(set, R - 16)[0]} y={at(set, R - 16)[1] + 3} fontSize={9} fill="var(--fg)" textAnchor="middle">
              set
            </text>
          </>
        )}
        <circle cx={CX} cy={CY} r={2.5} fill="var(--fg)" />
      </svg>
      <p className="muted tiny">Toy: flat horizon seen from above, London 51.5°N, no air. Bearing counts from north.</p>
      <Row>
        <Control disabled={locked} className={day === JUNE ? "active" : ""} onClick={() => go(JUNE)}>
          21 June
        </Control>
        <Control disabled={locked} className={day === DECEMBER ? "active" : ""} onClick={() => go(DECEMBER)}>
          21 December
        </Control>
        <Control disabled={locked} className={day === EQUINOX ? "active" : ""} onClick={() => go(EQUINOX)}>
          21 March
        </Control>
      </Row>
      <Row>
        <Slider label="Date" value={day} min={1} max={365} disabled={locked} format={dateLabel} onChange={go} />
        <Readout label="Sunrise bearing" value={locked ? "?" : `${rise.toFixed(0)}° ${compass(rise)}`} />
      </Row>
    </div>
  );
}

export default function JuneSunrise({ slug }: { slug: string }) {
  const june = riseBearing(JUNE);
  const dec = riseBearing(DECEMBER);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Up before dawn in London (51.5°N) on 21 June, you wait to watch the sunrise. In which compass direction does the Sun rise? (North is 0°, east is 90°.)",
        options: ["Due east, 90°", "North-east, about 50°", "Almost due north, about 10°"],
        answer: 1,
      }}
      exploreHint="Press 21 June, then 21 December, and watch the rise mark."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On 21 June the Sun rose at {june.toFixed(0)}°, north-east; on 21 December at {dec.toFixed(0)}°, south-east.
            It is due east only when day and night are equal, in March and September.
          </p>
          <p>
            The rise point slides north and south of east with the seasons: at London&rsquo;s latitude it swings about{" "}
            {Math.round(dec - june)}° between the two. This is flat-horizon geometry; air bends the light by under 1°.
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
