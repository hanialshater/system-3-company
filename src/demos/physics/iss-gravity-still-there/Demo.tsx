"use client";

// Gravity at the ISS. Earth and orbits drawn to one scale (out to geostationary height).
// The learner moves a satellite between heights; a bar and a readout show gravity
// there as a percentage of ground value, g(r) / g0 = (R / (R + h))^2 (Newton, spherical
// Earth; Earth's spin ignored). At 400 km it is 88.5%: gravity is nearly as strong as on
// the ground, and astronauts float because they and the station are falling together.
//
// Earned reveal: milestones "iss" (satellite at 400 km) and "far" (at 20,200 km or more).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const R_KM = 6371;
const STOPS = [
  { h: 0, label: "0 km", name: "Ground" },
  { h: 400, label: "400 km", name: "ISS height" },
  { h: 6371, label: "6,371 km", name: "One Earth radius up" },
  { h: 20200, label: "20,200 km", name: "GPS satellites" },
  { h: 35786, label: "35,786 km", name: "Geostationary" },
];
const pct = (h: number) => 100 * (R_KM / (R_KM + h)) ** 2;
const fmtPct = (h: number) => `${pct(h).toFixed(1)}%`;

const W = 320;
const H = 272;
const CX = 160;
const CY = 125;
const RMAX = 112; // px for R + 35,786 km
const KPX = RMAX / (R_KM + 35786);
const RP = R_KM * KPX;
const GAUGE = 150; // px for 100% (ground value); Earth's radius is 17 px on this scale

export default function IssGravityStillThere({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const h = STOPS[k].h;
  const r = (R_KM + h) * KPX;
  // satellite sits up and to the right at 45 degrees
  const sx = CX + r * Math.SQRT1_2;
  const sy = CY - r * Math.SQRT1_2;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "The ISS orbits about 400 km up. Compared with gravity at the ground, gravity up there is about…",
        options: ["0% (none)", "90%", "50%"],
        answer: 1,
      }}
      exploreHint="Move the satellite to the ISS's height, then much further out."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 400 km the gravity bar barely shrank: gravity was <strong>{fmtPct(400)}</strong> of its ground value. The ISS
            orbit hardly clears the planet on a true scale. Only far out did it fade: {fmtPct(20200)} at GPS height,{" "}
            {fmtPct(35786)} at geostationary height.
          </p>
          <p>
            Gravity weakens with the square of distance from Earth&apos;s centre, and 400 km adds only 6% to that
            distance. Astronauts float because they and the station fall together, round and round, not because gravity
            switched off.
          </p>
          <p className="muted">Round Earth, its spin ignored. The ISS height varies around 400 km.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["iss", "far"]}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Satellite at ${STOPS[k].label}: gravity ${fmtPct(h)} of ground`}>
                {STOPS.slice(1).map((st) => (
                  <circle key={st.h} cx={CX} cy={CY} r={(R_KM + st.h) * KPX} className={st.h === h ? s.orbitOn : s.orbit} />
                ))}
                <circle cx={CX} cy={CY} r={RP} className={s.earth} />
                <circle cx={sx} cy={sy} r={4} className={s.sat} />
                <text x={W - 6} y={14} textAnchor="end" className={s.name}>
                  {STOPS[k].name}
                </text>
                <rect x={6} y={H - 28} width={GAUGE} height={8} rx={4} className={s.gaugeBg} />
                {!locked && <rect x={6} y={H - 28} width={(pct(h) / 100) * GAUGE} height={8} rx={4} className={s.gauge} />}
                <text x={6} y={H - 6} className={s.chip}>
                  To scale. Round Earth, spin ignored.
                </text>
              </svg>

              <Row>
                {STOPS.map((st, i) => (
                  <Control
                    key={st.h}
                    className={i === k ? "active" : ""}
                    disabled={locked || i === k}
                    onClick={() => {
                      setK(i);
                      if (st.h === 400) reach("iss");
                      if (st.h >= 20200) reach("far");
                    }}
                  >
                    {st.label}
                  </Control>
                ))}
              </Row>
              <Readout label="Gravity vs ground" value={locked ? "?" : fmtPct(h)} />
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
