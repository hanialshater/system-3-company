"use client";

// Sunlight per square metre of level ground at the top of the atmosphere through 21 June, hour by hour.
// I(t) = S0 (a/r)^2 max(0, sin(lat) sin(dec) + cos(lat) cos(dec) cos(h)), h = 15 degrees per hour from noon.
// The daily mean is the closed form Q = (S0/pi)(a/r)^2 (h0 sin(lat) sin(dec) + cos(lat) cos(dec) sin(h0))
// (Berger 1978), the same as section `june` of company/domains/briefs/checks/geography-wave-j.mjs.
// S0 = 1,361 W/m^2, declination 23.44 degrees, Earth-Sun distance 1.0163 AU on 21 June.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const S0 = 1361;
const DEC = 23.44;
const D2 = 1 / 1.0163 ** 2;
const rad = (d: number) => (d * Math.PI) / 180;

const PLACES = [
  { key: "eq", lat: 0, name: "Equator", btn: "Equator", dash: "" },
  { key: "mid", lat: 45, name: "45° N", btn: "45 degrees N", dash: "6 3" },
  { key: "pole", lat: 90, name: "Pole", btn: "North Pole", dash: "2 2.5" },
] as const;
const MILESTONES = PLACES.map((p) => p.key);

const flux = (lat: number, hour: number) => {
  const p = rad(lat), d = rad(DEC), h = rad(15 * (hour - 12));
  return S0 * D2 * Math.max(0, Math.sin(p) * Math.sin(d) + Math.cos(p) * Math.cos(d) * Math.cos(h));
};
const dailyMean = (lat: number) => {
  const p = rad(lat), d = rad(DEC);
  const c = -Math.tan(p) * Math.tan(d);
  const h0 = c >= 1 ? 0 : c <= -1 ? Math.PI : Math.acos(c);
  return (S0 / Math.PI) * D2 * (h0 * Math.sin(p) * Math.sin(d) + Math.cos(p) * Math.cos(d) * Math.sin(h0));
};
const dayLen = (lat: number) => {
  const c = -Math.tan(rad(lat)) * Math.tan(rad(DEC));
  return c >= 1 ? 0 : c <= -1 ? 24 : (24 * Math.acos(c)) / Math.PI;
};
const kwh = (lat: number) => (dailyMean(lat) * 24) / 1000;
const noonSun = (lat: number) => 90 - Math.abs(lat - DEC);
const fmtKwh = (lat: number) => kwh(lat).toFixed(1);
const fmtDay = (lat: number) => (dayLen(lat) >= 23.95 ? "24" : dayLen(lat).toFixed(dayLen(lat) % 1 < 0.05 ? 0 : 1)) + " h";
const fmtSun = (lat: number) => `${Math.round(noonSun(lat))}°`;

const VW = 320;
const PX = { l: 36, r: 312, t: 10, b: 140 };
const YMAX = 1400;
const xOf = (h: number) => PX.l + ((PX.r - PX.l) * h) / 24;
const yOf = (w: number) => PX.b - ((PX.b - PX.t) * w) / YMAX;
const curve = (lat: number) =>
  Array.from({ length: 97 }, (_, i) => `${xOf(i / 4).toFixed(1)},${yOf(flux(lat, i / 4)).toFixed(1)}`).join(" ");

export default function JuneSunshine({ slug }: { slug: string }) {
  const [cur, setCur] = useState<number | null>(null);
  const [traces, setTraces] = useState<string[]>([]);
  const curPlace = PLACES.find((p) => p.lat === cur);
  const rows = [
    ...PLACES.filter((p) => traces.includes(p.key)).map((p) => ({ key: p.key, name: p.name, lat: p.lat, dash: p.dash })),
    ...(cur !== null && !curPlace ? [{ key: "slider", name: `${cur}° N`, lat: cur, dash: "" }] : []),
  ];
  const VH = PX.b + 46 + 14 * Math.max(3, rows.length);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On 21 June, counting all 24 hours, which place gets the most sunlight per square metre at the top of the atmosphere?",
        options: ["The equator", "The North Pole", "45 degrees north"],
        answer: 1,
      }}
      exploreHint="Draw the equator, 45 degrees N and the North Pole, and compare the areas."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The pole won: {fmtKwh(90)} kWh per square metre against the equator&rsquo;s {fmtKwh(0)}. At the pole the Sun
            stays {fmtSun(90).replace("°", "")} degrees up for all 24 hours; at the equator it climbs to{" "}
            {fmtSun(0).replace("°", "")} degrees but sets after 12.
          </p>
          <p>
            In June, tilt gives the north both a higher Sun and longer days, and near the pole never setting beats being
            high. This is sunlight arriving above the air, not warmth at the ground.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (lat: number) => {
              setCur(lat);
              const p = PLACES.find((q) => q.lat === lat);
              if (p) {
                setTraces((t) => (t.includes(p.key) ? t : [...t, p.key]));
                reach(p.key);
              }
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="stage-svg"
                  role="img"
                  aria-label={
                    cur === null
                      ? "Empty chart: hour of day across, sunlight in watts per square metre up."
                      : `Sunlight through 21 June at ${cur}° N: ${fmtKwh(cur)} kWh per square metre in the day.`
                  }
                >
                  {/* Axes */}
                  {[0, 500, 1000].map((w) => (
                    <g key={w}>
                      <line x1={PX.l} y1={yOf(w)} x2={PX.r} y2={yOf(w)} className={s.grid} />
                      <text x={PX.l - 3} y={yOf(w) + 3.5} textAnchor="end" className={s.tick}>
                        {w}
                      </text>
                    </g>
                  ))}
                  {[0, 6, 12, 18, 24].map((h) => (
                    <text key={h} x={xOf(h)} y={PX.b + 12} textAnchor="middle" className={s.tick}>
                      {h}
                    </text>
                  ))}
                  <text x={PX.l} y={PX.t + 2} className={s.tick} dx={2} dy={6}>
                    W/m²
                  </text>
                  <text x={PX.r} y={PX.b + 24} textAnchor="end" className={s.tick}>
                    hour, 21 June, top of atmosphere
                  </text>
                  <line x1={PX.l} y1={PX.b} x2={PX.r} y2={PX.b} className={s.axis} />

                  {/* Faint traces of places already drawn */}
                  {PLACES.filter((p) => traces.includes(p.key) && p.lat !== cur).map((p) => (
                    <polyline key={p.key} points={curve(p.lat)} className={s.trace} strokeDasharray={p.dash || undefined} />
                  ))}
                  {cur !== null && (
                    <>
                      <polygon points={`${xOf(0)},${PX.b} ${curve(cur)} ${xOf(24)},${PX.b}`} className={s.area} />
                      <polyline points={curve(cur)} className={s.current} strokeDasharray={curPlace?.dash || undefined} />
                    </>
                  )}

                  {/* Legend in the picture: one row per place drawn */}
                  <g transform={`translate(0, ${PX.b + 40})`}>
                    <text x={150} y={0} textAnchor="end" className={s.head}>
                      day
                    </text>
                    <text x={205} y={0} textAnchor="end" className={s.head}>
                      noon Sun
                    </text>
                    <text x={PX.r} y={0} textAnchor="end" className={s.head}>
                      kWh/m²
                    </text>
                    {rows.map((r, i) => (
                      <g key={r.key} transform={`translate(0, ${14 * (i + 1)})`} className={r.lat === cur ? s.rowNow : s.row}>
                        <line x1={PX.l} y1={-3.5} x2={PX.l + 18} y2={-3.5} className={r.lat === cur ? s.swatchNow : s.swatch} strokeDasharray={r.dash || undefined} />
                        <text x={PX.l + 24} y={0}>{r.name}</text>
                        <text x={150} y={0} textAnchor="end">{fmtDay(r.lat)}</text>
                        <text x={205} y={0} textAnchor="end">{fmtSun(r.lat)}</text>
                        <text x={PX.r} y={0} textAnchor="end">{fmtKwh(r.lat)}</text>
                      </g>
                    ))}
                  </g>
                </svg>
                <div className={s.chips}>
                  {PLACES.map((p) => (
                    <Control key={p.key} disabled={locked || cur === p.lat} className={cur === p.lat ? "active" : ""} onClick={() => pick(p.lat)}>
                      {p.btn}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider
                    label="Latitude"
                    value={cur ?? 30}
                    min={0}
                    max={90}
                    disabled={locked}
                    format={() => (cur === null ? "none yet" : `${cur}° N`)}
                    onChange={(v) => pick(v)}
                  />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
