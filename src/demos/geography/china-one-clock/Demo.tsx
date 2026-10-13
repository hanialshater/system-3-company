"use client";

// The learner moves world time (UTC). A vertical line marks where the Sun is highest (mean solar
// noon, ignoring the equation of time). Two cities in China show their official clock and their
// Sun time. The official clocks never differ: China keeps one standard time, UTC+8.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, country, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 150;
const OFFSET = 8; // UTC+8, Beijing time
const CITIES: { name: string; p: Pt }[] = [
  { name: "Kashgar", p: [75.99, 39.47] },
  { name: "Shanghai", p: [121.47, 31.23] },
];
const hm = (h: number) => {
  const t = ((h % 24) + 24) % 24;
  let H_ = Math.floor(t);
  let M = Math.round((t - H_) * 60);
  if (M === 60) {
    H_ = (H_ + 1) % 24;
    M = 0;
  }
  return `${String(H_).padStart(2, "0")}:${String(M).padStart(2, "0")}`;
};
/** UTC hour at which the mean Sun is highest over longitude lon. */
const noonUtc = (lon: number) => 12 - lon / 15;

// China's east-west extent in the kit's 1:110m outline.
const EXTENT = (() => {
  let lo = Infinity;
  let hi = -Infinity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (c: any) => {
    if (typeof c[0] === "number") {
      lo = Math.min(lo, c[0]);
      hi = Math.max(hi, c[0]);
    } else c.forEach(walk);
  };
  walk((country("China")!.geometry as { coordinates: unknown }).coordinates);
  return { lo, hi };
})();

export default function ChinaOneClock({ slug }: { slug: string }) {
  // Minutes after 00:00 UTC; start at 04:00 UTC (12:00 Beijing time).
  const [utcMin, setUtcMin] = useState(240);
  const [seenKashgar, setSeenKashgar] = useState(false);
  const projection = useMemo(
    () => geoEquirectangular().scale(W / (Math.PI / 2)).center([105, 35]).translate([W / 2, H / 2]).clipExtent([[0, 0], [W, H]]),
    [],
  );
  const utc = utcMin / 60;
  const sunLon = 15 * (12 - utc);
  const official = utc + OFFSET;
  const kash = CITIES[0];
  const kashNoonOfficial = noonUtc(kash.p[0]) + OFFSET;
  const shNoonOfficial = noonUtc(CITIES[1].p[0]) + OFFSET;
  const spanDeg = EXTENT.hi - EXTENT.lo;

  const setTime = (m: number, interact: () => void) => {
    setUtcMin(m);
    const lon = 15 * (12 - m / 60);
    if (!seenKashgar && Math.abs(lon - kash.p[0]) <= 1.5) {
      setSeenKashgar(true);
      interact();
    }
  };

  const x = projection([sunLon, 0])![0];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `China spans about ${Math.round(spanDeg)}° of longitude, roughly ${(spanDeg / 15).toFixed(0)} hours of the Sun's travel. How many official time zones does it use?`,
        options: ["5", "4", "1"],
        answer: 2,
      }}
      exploreHint="Move the Sun's noon line to Kashgar and read its clock."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>One.</strong> All of China keeps Beijing time, UTC+8. Both cities&rsquo; official clocks always agreed,
            while the Sun did not: it is highest over Shanghai at about {hm(shNoonOfficial)} on the official clock, and over
            Kashgar at about {hm(kashNoonOfficial)}, nearly 3 p.m.
          </p>
          <p>
            The Sun crosses China&rsquo;s {Math.round(spanDeg)}° of longitude in about {(spanDeg / 15).toFixed(1)} hours,
            and the dashed 15° bands are what geometry alone would suggest. A time zone is a decision made by law, not a
            line drawn by the Sun. (Times are mean Sun time; the real Sun runs up to about 16 minutes early or late
            during the year.)
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            graticule={false}
            highlight={["China"]}
            label={`Map of China, equirectangular projection. The Sun is highest at ${sunLon.toFixed(0)}°E.`}
          >
            {() => (
              <>
                {[67.5, 82.5, 97.5, 112.5, 127.5, 142.5].map((lon) => {
                  const xx = projection([lon, 0])![0];
                  return <line key={lon} x1={xx} x2={xx} y1={0} y2={H} className={s.band} />;
                })}
                <line x1={x} x2={x} y1={0} y2={H} className={s.sun} />
                <circle cx={x} cy={9} r={6} className={s.sunDisc} />
                {CITIES.map((c) => {
                  const q = projection(c.p)!;
                  return (
                    <g key={c.name}>
                      <circle cx={q[0]} cy={q[1]} r={2.6} className={s.city} />
                      <text x={q[0]} y={q[1] + 12} className={s.label} textAnchor="middle">
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </WorldMap>
          <p className="muted tiny">Equirectangular projection. Yellow: where the Sun is highest. Dashed: 15° bands.</p>
          <Row>
            <Slider
              label="World time (UTC)"
              value={utcMin}
              min={120}
              max={480}
              step={1}
              disabled={locked}
              format={(v) => hm(v / 60)}
              onChange={(v) => setTime(v, interact)}
            />
          </Row>
          <div className={s.chips}>
            {CITIES.map((c) => {
              const m = Math.round(noonUtc(c.p[0]) * 60);
              return (
                <Control key={c.name} disabled={locked || utcMin === m} onClick={() => setTime(m, interact)}>
                  Noon Sun at {c.name}
                </Control>
              );
            })}
          </div>
          <Row>
            {CITIES.map((c) => (
              <Readout
                key={c.name}
                label={`${c.name}: clock / Sun`}
                value={locked ? "? / ?" : `${hm(official)} / ${hm(utc + c.p[0] / 15)}`}
              />
            ))}
          </Row>
        </div>
      )}
    </Lesson>
  );
}
