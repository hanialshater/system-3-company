"use client";

// The learner scrubs UTC time from Sunday 00:00 to Wednesday 00:00 over an equirectangular world
// map. Nominal 15-degree bands (UTC-12 to UTC+12, centred on multiples of 15 degrees) are shaded
// by their calendar day. Two dots carry the real extreme clocks: Kiritimati (UTC+14) and
// Baker Island (UTC-12). Monday exists somewhere from the first clock reaching it to the last
// clock leaving it; the readout counts those hours.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 160;
const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed"]; // index = day number + 1, Sunday = 0
const NOMINAL = Array.from({ length: 25 }, (_, i) => i - 12);
const DOTS = [
  { name: "Kiritimati", off: 14, lat: 1.87, lon: -157.36 },
  { name: "Baker Island", off: -12, lat: 0.19, lon: -176.48 },
];
const MAX_OFF = Math.max(...DOTS.map((d) => d.off), ...NOMINAL);
const MIN_OFF = Math.min(...DOTS.map((d) => d.off), ...NOMINAL);
// Hours from Sunday 00:00 UTC. Monday (day 1) runs locally from 24 to 48.
const MON_START = 24 - MAX_OFF;
const MON_END = 48 - MIN_OFF;
const MON_HOURS = MON_END - MON_START;

const dayAt = (t: number, off: number) => Math.floor((t + off) / 24);
const fmtT = (t: number) => {
  const d = Math.floor(t / 24);
  const h = Math.floor(t - d * 24);
  const m = Math.round((t - d * 24 - h) * 60);
  return `${DAYS[d + 1] ?? "Wed"} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} UTC`;
};
const fmtOff = (o: number) => `UTC${o >= 0 ? "+" : "−"}${Math.abs(o)}`;

export default function FiftyHourMonday({ slug }: { slug: string }) {
  const [t, setT] = useState(0);
  const projection = useMemo(() => geoEquirectangular().fitSize([W, H], { type: "Sphere" }), []);
  const x = (lon: number) => projection([lon, 0])![0];
  const top = projection([0, 90])![1];
  const bottom = projection([0, -90])![1];
  const mondaySoFar = Math.max(0, Math.min(t, MON_END) - MON_START);
  const mondayNow = [...NOMINAL, ...DOTS.map((d) => d.off)].some((o) => dayAt(t, o) === 1);
  const cls = (day: number) => (day === 1 ? s.mon : day === 0 ? s.sun : day === 2 ? s.tue : s.other);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Counting every time zone on Earth, for how many hours is it Monday somewhere?",
        options: ["24", "50", "38"],
        answer: 1,
      }}
      exploreHint="Find when Monday first starts, then when the last Monday ends."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Monday exists somewhere for <strong>{MON_HOURS} hours</strong>. It starts first on Kiritimati, at{" "}
            {fmtOff(MAX_OFF)}, when UTC says {fmtT(MON_START)}. It ends last on Baker Island, at {fmtOff(MIN_OFF)}, at{" "}
            {fmtT(MON_END)}.
          </p>
          <p>
            Each place has its own 24-hour Monday, but the places start at different moments. Clocks on Earth are spread
            over {MAX_OFF - MIN_OFF} hours, from {fmtOff(MIN_OFF)} to {fmtOff(MAX_OFF)}, so one date lasts 24 +{" "}
            {MAX_OFF - MIN_OFF} = {MON_HOURS} hours from the first midnight to the last. A date is not one wall of
            midnight; it is a wave that takes two days to cross the world.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["begins", "ends"]}>
          {(reach) => {
            const go = (v: number) => {
              setT(v);
              if (v >= MON_START && v < MON_END) reach("begins");
              if (v >= MON_END) reach("ends");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  graticule={false}
                  label={`World map, equirectangular projection, at ${fmtT(t)}. ${mondayNow ? "It is Monday somewhere." : "It is Monday nowhere."}`}
                >
                  {() => (
                    <>
                      {NOMINAL.map((o) => {
                        const x0 = x(Math.max(-180, o * 15 - 7.5));
                        const x1 = x(Math.min(180, o * 15 + 7.5));
                        return <rect key={o} x={x0} y={top} width={x1 - x0} height={bottom - top} className={cls(dayAt(t, o))} />;
                      })}
                      {DOTS.map((d) => {
                        const [px, py] = projection([d.lon, d.lat])!;
                        return (
                          <g key={d.name}>
                            <circle cx={px} cy={py} r={4.5} className={`${s.dot} ${cls(dayAt(t, d.off))}`} />
                            <text x={px + (d.off > 0 ? 6 : 1)} y={py + (d.off > 0 ? -6 : 14)} className={s.dotLabel} textAnchor="start">
                              {fmtOff(d.off)}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  )}
                </WorldMap>
                <p className="muted tiny">
                  Equirectangular. Bands: nominal 15° zones. Dots: real island clocks.{" "}
                  <span className={s.key}>
                    <i className={s.sun} /> Sun <i className={s.mon} /> Mon <i className={s.tue} /> Tue <i className={s.other} /> other
                  </span>
                </p>
                <div className={s.chips} role="group" aria-label="Jump to a moment">
                  <Control disabled={locked || t === MON_START} className={t === MON_START ? "active" : ""} onClick={() => go(MON_START)}>
                    First Monday starts
                  </Control>
                  <Control disabled={locked || t === MON_END} className={t === MON_END ? "active" : ""} onClick={() => go(MON_END)}>
                    Last Monday ends
                  </Control>
                </div>
                <Row>
                  <Slider label="Time" value={t} min={0} max={72} step={0.5} disabled={locked} format={fmtT} onChange={go} />
                </Row>
                <Row>
                  <Readout label="Monday somewhere?" value={locked ? "?" : mondayNow ? "Yes" : "No"} />
                  <Readout label="Monday has lasted" value={locked ? "?" : `${mondaySoFar} h`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
