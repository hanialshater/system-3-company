"use client";

// Bend at double speed. Top view of a flat dry bend. Grip supplies at most mu m g of sideways force
// and a bend of radius r needs m v^2 / r, so the tightest safe bend is r_min = v^2 / (mu g).
// mu is fixed by the question's premise (50 m is just safe at 15 m/s): mu = 15^2 / (g 50) = 0.459.
// Controls: speed slider (54..135 km/h, step 27; starts at 54 so two arrow presses reach 108) and
// bend-radius slider (50..400 m, step 50; starts at 100 so two presses reach 200).
// Milestones: "fast" (108 km/h set) and "cleared" (108 km/h and a bend of at least r_min).
// Every number comes from rMin(), MU and the constants below.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const BASE_KMH = 54;
const BASE_R = 50;
const FAST_KMH = 2 * BASE_KMH;
const ms = (kmh: number) => kmh / 3.6;
const MU = ms(BASE_KMH) ** 2 / (G * BASE_R);
const rMin = (kmh: number) => Math.round((ms(kmh) ** 2 / (MU * G)) * 10) / 10;
const MID_KMH = 1.5 * BASE_KMH;
const MILESTONES = ["mid", "fast", "cleared"] as const;
const SC = 0.36; // px per metre
const X0 = 44;
const Y0 = 172;

export default function BendAtDoubleSpeed({ slug }: { slug: string }) {
  const [kmh, setKmh] = useState(BASE_KMH);
  const [r, setR] = useState(BASE_R);
  const [clearedR, setClearedR] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([BASE_KMH]); // speeds the learner has set (54 is on screen at unlock)

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a country road, your car takes a bend of radius ${BASE_R} m at ${BASE_KMH} km/h (${ms(BASE_KMH)} m/s), just within grip. At ${FAST_KMH} km/h with the same grip, what is the smallest radius you can hold?`,
        options: [`${2 * BASE_R} m`, `${rMin(FAST_KMH)} m`, `${4 * BASE_R * 2} m`],
        answer: 1,
      }}
      exploreHint={`Raise the speed to ${MID_KMH} then ${FAST_KMH} km/h, watching the dashed arc. Then widen the bend until the car grips.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The dashed grip limit swelled from <strong>{rMin(BASE_KMH)} m</strong> at {BASE_KMH} km/h
            {seen.includes(MID_KMH) ? ` to ${rMin(MID_KMH)} m at ${MID_KMH} km/h and` : " to"}{" "}
            <strong>{rMin(FAST_KMH)} m</strong> at {FAST_KMH} km/h: double the speed, {rMin(FAST_KMH) / rMin(BASE_KMH)} times the radius
            {clearedR !== null ? `; your ${clearedR} m bend cleared it` : ""}.
          </p>
          <p>
            Grip gives a fixed sideways push. Turning a faster car takes a bigger push, growing with speed squared, and a
            wider bend needs less. So the safe radius grows with speed squared. Flat, dry road, grip μ = {MU.toFixed(2)} (illustrative).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const need = rMin(kmh);
            const grips = r >= need;
            const check = (k: number, rr: number) => {
              if (k === MID_KMH) reach("mid");
              if (k === FAST_KMH) reach("fast");
              if (k === FAST_KMH && rr >= rMin(k)) {
                setClearedR(rr);
                reach("cleared");
              }
            };
            const arc = (rad: number) => `M${X0} ${Y0} A${rad * SC} ${rad * SC} 0 0 1 ${X0 + rad * SC} ${Y0 - rad * SC}`;
            const caption = locked
              ? "Make a prediction to start."
              : "Dashed arc: the tightest bend the grip allows at this speed. A tighter road skids.";
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 200" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <line x1={X0} y1={Y0} x2={X0} y2={198} className={s.road} />
                  <path d={arc(r)} className={s.road} />
                  <path d={arc(need)} className={s.limit} />
                  {!grips && <line x1={X0} y1={Y0} x2={X0} y2={Y0 - 52} className={s.slide} />}
                  <polygon points={`${X0},${Y0 - 9} ${X0 - 5},${Y0 + 4} ${X0 + 5},${Y0 + 4}`} className={grips ? s.carOk : s.carBad} />
                  <text x={316} y={170} className={s.chip}>
                    Flat dry bend, grip μ = {MU.toFixed(2)}
                  </text>
                  <text x={316} y={192} className={grips ? s.ok : s.bad}>
                    {locked ? "" : grips ? "Grips" : "Skids"}
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                {!locked && (
                  <p className={s.caption}>
                    Tightest safe bend so far:{" "}
                    {[...seen]
                      .sort((a, b) => a - b)
                      .map((k) => `${k} km/h → ${rMin(k)} m`)
                      .join(" · ")}
                  </p>
                )}

                <Slider
                  label="Speed (km/h)"
                  value={kmh}
                  min={BASE_KMH}
                  max={BASE_KMH * 2.5}
                  step={BASE_KMH / 2}
                  disabled={locked}
                  onChange={(v) => {
                    setKmh(v);
                    setSeen((a) => (a.includes(v) ? a : [...a, v]));
                    check(v, r);
                  }}
                />
                <Slider
                  label="Bend radius (m)"
                  value={r}
                  min={BASE_R}
                  max={350}
                  step={75}
                  disabled={locked}
                  onChange={(v) => {
                    setR(v);
                    check(kmh, v);
                  }}
                />
                <Row>
                  <Readout label="Speed" value={locked ? "?" : `${ms(kmh)} m/s`} />
                  <Readout label="Tightest safe bend" value={locked ? "?" : `${need} m`} />
                  <Readout label="Car" value={locked ? "?" : grips ? "Grips" : "Skids"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
