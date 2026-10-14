"use client";

// Side view of the Earth at equinox noon, Sun to the left, axis upright. A band of parallel sunbeams of fixed
// width lands on the chosen latitude; the lit patch of ground is 1/cos(latitude) times the band's width.
// Readouts: how much farther from the Sun the place is than the sub-solar point (R (1 - cos lat) along the
// Sun line; at most one Earth radius), and the year's top-of-atmosphere sunlight as a share of the equator's:
// daily-mean insolation (Berger 1978) averaged over a circular orbit, 3,600 steps, as in section
// `insol-annual` of company/domains/briefs/checks/geography-wave-j.mjs.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM } from "@/kit/geo";
import s from "./styles.module.css";

const S0 = 1361;
const EPS = 23.44;
const AU_KM = 149597870.7;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

function dailyQ(phi: number, dec: number) {
  const p = rad(phi), d = rad(dec);
  const c = -Math.tan(p) * Math.tan(d);
  const h0 = c >= 1 ? 0 : c <= -1 ? Math.PI : Math.acos(c);
  return (S0 / Math.PI) * (h0 * Math.sin(p) * Math.sin(d) + Math.cos(p) * Math.cos(d) * Math.sin(h0));
}
const decOf = (lam: number) => deg(Math.asin(Math.sin(rad(EPS)) * Math.sin(rad(lam))));
function annual(phi: number) {
  let sum = 0;
  const n = 3600;
  for (let i = 0; i < n; i++) sum += dailyQ(phi, decOf((360 * (i + 0.5)) / n));
  return sum / n;
}

const START = 30;
const PRESETS = [
  { lat: 0, label: "Equator", key: "eq" },
  { lat: 51.5, label: "51.5 degrees N", key: "" },
  { lat: 60, label: "60 degrees N", key: "" },
  { lat: 90, label: "North Pole", key: "pole" },
];
const MILESTONES = ["eq", "pole"] as const;
const EQ = annual(0);
const SHARE = new Map([START, ...PRESETS.map((p) => p.lat)].map((l) => [l, annual(l) / EQ]));
const extraKm = (lat: number) => EARTH_RADIUS_KM * (1 - Math.cos(rad(lat)));
const fmtPct = (x: number) => `${Math.round(100 * x)}%`;
const fmtKm = (km: number) => `${Math.round(km).toLocaleString("en-GB")} km`;
const fmtDistPct = (km: number) => `${((100 * km) / AU_KM).toFixed(3)}%`;
const latName = (lat: number) => (lat === 0 ? "Equator" : lat === 90 ? "North Pole" : `${lat}° N`);

const VW = 320;
const VH = 200;
const E = { cx: 212, cy: 106, r: 86 };
const BAND = 22; // beam band width, px

export default function WhyThePolesGetLessSun({ slug }: { slug: string }) {
  const [lat, setLat] = useState(START);
  const [poleSeen, setPoleSeen] = useState<{ share: string; km: string; pct: string } | null>(null);

  // Where the band's centre line meets the ground (the sunlit left limb), and the lit arc.
  const yc = Math.min(E.cy - E.r * Math.sin(rad(lat)), E.cy - E.r + 0.001);
  const yTop = yc - BAND / 2;
  const yBot = yc + BAND / 2;
  const hitX = (y: number) => E.cx - Math.sqrt(Math.max(0, E.r * E.r - (y - E.cy) ** 2));
  const yTopHit = Math.max(yTop, E.cy - E.r); // the part of the band above the pole misses the Earth
  const a1 = Math.asin((E.cy - yTopHit) / E.r); // latitude angle where the top beam lands
  const a2 = Math.asin((E.cy - yBot) / E.r);
  const arcPt = (a: number) => `${(E.cx - E.r * Math.cos(a)).toFixed(1)},${(E.cy - E.r * Math.sin(a)).toFixed(1)}`;
  const arc = Array.from({ length: 25 }, (_, i) => arcPt(a2 + ((a1 - a2) * i) / 24)).join(" ");
  const spread = lat >= 89.99 ? null : 1 / Math.cos(rad(lat));
  const beams = Array.from({ length: 5 }, (_, i) => yTop + (BAND * i) / 4);
  const px = E.cx - E.r * Math.cos(rad(lat));
  const py = E.cy - E.r * Math.sin(rad(lat));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Over a whole year, how much sunlight reaches a square metre at the North Pole (top of the atmosphere), compared with a square metre at the equator?",
        options: ["About 99%", "About 10%", "About 40%"],
        answer: 2,
      }}
      exploreHint="Move the beam to the equator, then up to the North Pole, and watch both readouts."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The pole gets about {poleSeen?.share ?? fmtPct(SHARE.get(90)!)} of the equator&rsquo;s yearly sunlight. Distance is
            not why: the pole is at most {poleSeen?.km ?? fmtKm(extraKm(90))} farther from the Sun, {poleSeen?.pct ?? fmtDistPct(extraKm(90))}{" "}
            of the way, worth less than 0.01% of the light.
          </p>
          <p>
            The cause is the angle. Near the poles the same beam lands on more ground, so each square metre gets less.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (p: (typeof PRESETS)[number]) => {
              setLat(p.lat);
              if (p.key === "pole") setPoleSeen({ share: fmtPct(SHARE.get(90)!), km: fmtKm(extraKm(90)), pct: fmtDistPct(extraKm(90)) });
              if (p.key) reach(p.key);
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Side view of the Earth at equinox noon. A fixed-width band of sunbeams lands at ${latName(lat)}${spread ? `, spread over ${spread.toFixed(2)} times its width of ground` : ", grazing the horizon"}.`}
                >
                  <circle cx={E.cx} cy={E.cy} r={E.r} className={s.earth} />
                  <line x1={E.cx} y1={E.cy - E.r - 8} x2={E.cx} y2={E.cy + E.r + 8} className={s.axis} />
                  <line x1={E.cx - E.r} y1={E.cy} x2={E.cx + E.r} y2={E.cy} className={s.equator} />
                  <text x={E.cx + 4} y={E.cy - E.r - 2} className={s.label}>
                    N
                  </text>
                  <text x={E.cx + 8} y={E.cy - 4} className={s.muted}>
                    equator
                  </text>
                  {/* The band of sunbeams, same width at every latitude */}
                  {beams.map((y, i) => (
                    <line key={i} x1={4} y1={y} x2={y < E.cy - E.r ? VW - 4 : hitX(y)} y2={y} className={s.beam} />
                  ))}
                  <text x={4} y={yTop - 5 < 12 ? yBot + 12 : yTop - 5} className={s.label}>
                    same beam
                  </text>
                  {/* Ground it lands on */}
                  <polyline points={arc} className={s.patch} />
                  <circle cx={px} cy={py} r={3.5} className={s.marker} />
                  <text x={px + 8} y={py + (lat > 70 ? 16 : 4)} className={s.halo}>
                    {latName(lat)}
                  </text>
                  {!locked && (
                    <text x={E.cx - E.r - 6} y={Math.min(VH - 20, yTop - 5 < 12 ? yBot + 28 : yBot + 16)} textAnchor="end" className={s.halo}>
                      {spread ? `lit ground ×${spread.toFixed(2)}` : "grazes the ground"}
                    </text>
                  )}
                  <text x={4} y={VH - 6} className={s.muted}>
                    Equinox noon, top of atmosphere
                  </text>
                </svg>
                <div className={s.chips}>
                  {PRESETS.map((p) => (
                    <Control key={p.lat} disabled={locked || lat === p.lat} className={lat === p.lat ? "active" : ""} onClick={() => pick(p)}>
                      {p.label}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Extra distance from the Sun" value={locked ? "—" : `${fmtKm(extraKm(lat))} (${fmtDistPct(extraKm(lat))})`} />
                  <Readout label="Year's sunlight vs equator" value={locked ? "—" : fmtPct(SHARE.get(lat)!)} />
                </Row>
                {poleSeen && lat !== 90 && (
                  <p className={`tiny ${s.seen}`} data-testid="seen">
                    Seen at the pole: {poleSeen.share} of the equator&rsquo;s year, {poleSeen.km} ({poleSeen.pct}) farther.
                  </p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
