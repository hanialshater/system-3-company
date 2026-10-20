"use client";

// Count the thunder. Light from a lightning flash reaches you almost at once
// (3.00 x 10^8 m/s); the thunder travels at 343 m/s (dry air, 20 C). The learner sets
// how many seconds they counted between flash and thunder; the strike sits at
// d = 343 x seconds, with arcs marking where the sound front was each second.
//
// 6 s -> 2058 m; light takes 6.9 microseconds. Wind, temperature changes and the
// height of the lightning channel are ignored. The reveal unlocks at a 6 s count.
// v2: the flash time is shown in seconds (0.0000069 s), not microseconds; the flash is drawn
// as a ray reaching you; each arc is labelled 343 m; the caption applies "count / 3 = km"
// against the ruler; the reveal describes the count the learner ends on.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const C_SOUND = 343; // m/s
const C_LIGHT = 3.0e8; // m/s
const dist = (sec: number) => C_SOUND * sec; // m
const km = (m: number) => (m / 1000).toFixed(2);
const lightUs = (m: number) => (m / C_LIGHT) * 1e6;
const lightS = (m: number) => (m / C_LIGHT).toFixed(7);

const W = 320;
const H = 150;
const X0 = 24;
const GROUND = 118;
const K = 280 / 5200; // px per m

export default function CountTheThunder({ slug }: { slug: string }) {
  const [sec, setSec] = useState(0);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["six-seconds"]);
  const d = dist(sec);
  const sx = X0 + d * K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You see a lightning flash and hear the thunder 6 s later. How far away did it strike?",
        options: ["about 200 m", "about 2 km", "about 20 km"],
        answer: 1,
      }}
      exploreHint="Set your count to 6 seconds. Each arc is one second of the thunder's trip."
      minInteractions={1}
      reveal={() => {
        const n = sec > 0 ? sec : 6;
        return (
        <>
          <p>
            Your {n} s count put the strike <strong>{km(dist(n))} km</strong> away: {n} arcs of {C_SOUND} m each
            {n !== 6 ? ` (6 s is ${km(dist(6))} km)` : ""}. The flash covered the same distance in{" "}
            {lightUs(dist(n)).toFixed(1)} millionths of a second ({lightS(dist(n))} s), so the delay is almost all the
            thunder&apos;s trip.
          </p>
          <p>
            Sound in air goes about {C_SOUND} m every second, so every 3 s of counting is about 1 km (
            {(3 * C_SOUND).toLocaleString("en-US")} m). Divide your count by 3 for kilometres.
          </p>
        </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? `Each arc: one second of the thunder's trip, ${C_SOUND} m (air at 20 °C).`
          : sec === 0
            ? "Flash and thunder together: the strike is right here."
            : `Count ÷ 3 = ${sec / 3}: the strike sits near the ${sec / 3} km mark.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Thunder after ${sec} seconds: strike ${km(d)} kilometres away`}>
              <defs>
                <clipPath id="thunderSky">
                  <rect x={0} y={0} width={W} height={GROUND} />
                </clipPath>
              </defs>
              <g clipPath="url(#thunderSky)">
                {Array.from({ length: sec }, (_, i) => {
                  const r = (i + 1) * C_SOUND * K;
                  return (
                    <path
                      key={i}
                      d={`M ${sx - r} ${GROUND} A ${r} ${r} 0 0 1 ${sx + r} ${GROUND}`}
                      className={s.arc}
                    />
                  );
                })}
              </g>
              <line x1={0} y1={GROUND} x2={W} y2={GROUND} className={s.ground} />
              {/* you */}
              <g transform={`translate(${X0} ${GROUND})`}>
                <circle cx={0} cy={-19} r={4} className={s.you} />
                <line x1={0} y1={-15} x2={0} y2={-6} className={s.youLine} />
                <line x1={0} y1={-6} x2={-4} y2={0} className={s.youLine} />
                <line x1={0} y1={-6} x2={4} y2={0} className={s.youLine} />
              </g>
              <text x={X0} y={GROUND - 28} textAnchor="middle" className={s.small}>
                you
              </text>
              {/* the flash: reaches you almost at once */}
              {sec > 0 && (
                <>
                  <line x1={sx - 6} y1={60} x2={X0 + 6} y2={GROUND - 22} className={s.ray} />
                  <text x={(sx + X0) / 2} y={(60 + GROUND - 22) / 2 - 5} textAnchor="middle" className={s.small}>
                    flash
                  </text>
                </>
              )}
              {sec > 0 && (
                <text x={sx - C_SOUND * K - 2} y={GROUND - 4} textAnchor="end" className={s.small}>
                  {C_SOUND} m
                </text>
              )}
              {/* strike */}
              <ellipse cx={sx} cy={18} rx={22} ry={9} className={s.cloud} />
              <path d={`M ${sx + 2} 26 L ${sx - 5} 62 L ${sx + 3} 62 L ${sx - 4} ${GROUND}`} className={s.bolt} />
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <g key={k}>
                  <line x1={X0 + k * 1000 * K} y1={GROUND} x2={X0 + k * 1000 * K} y2={GROUND + 5} className={s.tick} />
                  <text x={X0 + k * 1000 * K} y={GROUND + 16} textAnchor="middle" className={s.small}>
                    {k} km
                  </text>
                </g>
              ))}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Thunder heard after"
              value={sec}
              min={0}
              max={15}
              step={3}
              disabled={locked}
              format={(v) => `${v} s`}
              onChange={(v) => {
                setSec(v);
                if (v === 6) reach("six-seconds");
              }}
            />
            <Row>
              <Readout label="Strike distance" value={locked ? "?" : `${km(d)} km`} />
              <Readout label="Flash took" value={locked ? "?" : `${lightS(d)} s`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
