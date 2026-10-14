"use client";

// Total internal reflection. Side view: water below a still, flat surface; a torch under
// water aims at one point on the surface. Tilt is measured from straight up (the dashed
// normal). Snell: 1.333 sin(a) = 1.00 sin(b). The exit ray is drawn at b with brightness
// 1 - R, the reflected ray at a with brightness R, R from the Fresnel equations
// (unpolarised average). Past theta_c = asin(1 / 1.333) = 48.6 deg there is no b.
//
// The tilt slider steps through fixed stops (ANGLES, including theta_c itself) so the
// question's 60 deg and the critical angle are both exact stops, with 47 and 48 deg between 45
// and theta_c so the exit ray visibly swings toward the surface. Earned reveal: milestones
// "edge" (theta_c) and "sixty" (the question's angle). QA path: slider 45 -> 47 -> 48 deg,
// "Tilt one step more" -> 48.6 deg, "Jump to 60°" -> 60 deg.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 1.333;
const D2R = Math.PI / 180;
const CRIT = Math.asin(1 / N) / D2R; // 48.61 deg
const ANGLES = [0, 15, 30, 40, 45, 47, 48, CRIT, 60, 70, 80];
const START = 4; // 45 deg
const EDGE = 7;
const SIXTY = 8;

/** Exit angle in air (deg), or null when no light can leave. At theta_c exactly: 90 (skims). */
const snell = (a: number) => {
  const x = N * Math.sin(a * D2R);
  if (x > 1 + 1e-9) return null;
  return Math.asin(Math.min(1, x)) / D2R;
};
const fresnel = (a: number) => {
  const x = N * Math.sin(a * D2R);
  if (x >= 1 - 1e-9) return 1;
  const ci = Math.cos(a * D2R);
  const ct = Math.cos(Math.asin(x));
  const rs = ((N * ci - ct) / (N * ci + ct)) ** 2;
  const rp = ((N * ct - ci) / (N * ct + ci)) ** 2;
  return (rs + rp) / 2;
};
const deg = (a: number) => `${a.toFixed(Number.isInteger(a) ? 0 : 1)}°`;
const pct = (x: number) => `${Math.round(100 * x)}%`;

const W = 320;
const H = 190;
const SY = 78; // surface
const HX = 160; // hit point
const RAY = 92;

export default function TorchUnderwaterTilt({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(START);
  const a = ANGLES[idx];
  const b = snell(a);
  const R = fresnel(a);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Under water, a torch beam hits the flat surface tilted 60° from straight up. The light…",
        options: ["Mostly leaves into the air, at a wide angle", "Is all reflected back down", "Stops, absorbed by the surface"],
        answer: 1,
      }}
      exploreHint="Tilt one step at a time past 45°. Watch the ray that leaves the water, then jump to 60°."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You started at 45°: {pct(1 - fresnel(45))} got out, bent to {deg(snell(45) ?? 0)}, and {pct(fresnel(45))} reflected
            back down. At <strong>{deg(CRIT)}</strong> the exit direction lay flat along the surface and nothing got out. At{" "}
            <strong>60°</strong> there was no exit ray: all of the light reflected back down.
          </p>
          <p>
            Leaving water, light bends away from straight up, more than it was tilted. At {deg(CRIT)} it already leaves at 90°,
            flat along the surface; tilt more and there is no direction left to go out in, so the surface acts as a perfect
            mirror.
          </p>
          <p className="muted">Still, flat surface; light of one colour.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["edge", "sixty"]}>
          {(reach) => {
            const torch = { x: HX - RAY * Math.sin(a * D2R), y: SY + RAY * Math.cos(a * D2R) };
            const refl = { x: HX + RAY * Math.sin(a * D2R), y: SY + RAY * Math.cos(a * D2R) };
            const out = b === null ? null : { x: HX + RAY * Math.sin(b * D2R), y: SY - RAY * Math.cos(b * D2R) };
            const caption = locked
              ? "Still, flat water surface. Tilt is measured from straight up (dashed). Predict first."
              : b === null
                ? "No exit ray: all the light reflects back down."
                : b > 89.9
                  ? `At ${deg(a)} the exit direction lies flat along the surface (dashed): nothing gets out.`
                  : `Tilted ${deg(a)} in water, the light leaves at ${deg(b)}.`;
            const go = (i: number) => {
              setIdx(i);
              if (i === EDGE) reach("edge");
              if (i === SIXTY) reach("sixty");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={0} y={SY} width={W} height={H - SY} className={s.water} />
                  <line x1={0} y1={SY} x2={W} y2={SY} className={s.surface} />
                  <text x={6} y={SY - 6} className={s.tag}>
                    air
                  </text>
                  <text x={6} y={SY + 14} className={s.tag}>
                    water
                  </text>
                  <line x1={HX} y1={8} x2={HX} y2={H - 6} className={s.normal} />
                  {/* angle arc in water */}
                  <path
                    d={`M ${HX} ${SY + 30} A 30 30 0 0 1 ${HX - 30 * Math.sin(a * D2R)} ${SY + 30 * Math.cos(a * D2R)}`}
                    className={s.arc}
                  />
                  <text x={HX - 8} y={SY + 46} textAnchor="end" className={s.angle}>
                    {deg(a)}
                  </text>
                  <line x1={torch.x} y1={torch.y} x2={HX} y2={SY} className={s.beam} />
                  <g transform={`translate(${torch.x} ${torch.y}) rotate(${a})`}>
                    <rect x={-6} y={0} width={12} height={22} rx={2} className={s.torch} />
                  </g>
                  <line x1={HX} y1={SY} x2={refl.x} y2={refl.y} className={s.beam} style={{ opacity: 0.3 + 0.7 * R }} />
                  {!locked && (
                    <text x={refl.x + 4} y={Math.min(H - 4, refl.y)} className={s.angle}>
                      {pct(R)} back
                    </text>
                  )}
                  {out && b !== null && b > 89.9 ? (
                    <line x1={HX} y1={SY - 1.5} x2={out.x} y2={SY - 1.5} className={s.beam} style={{ opacity: 0.7 }} strokeDasharray="4 3" />
                  ) : (
                    out && <line x1={HX} y1={SY} x2={out.x} y2={out.y} className={s.beam} style={{ opacity: 0.3 + 0.7 * (1 - R) }} />
                  )}
                  {!locked && out && b !== null && b <= 89.9 && (
                    <text x={out.x + 4} y={Math.max(12, out.y + 4)} className={s.angle}>
                      {deg(b)}
                    </text>
                  )}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Slider
                    label="Beam tilt"
                    value={idx}
                    min={0}
                    max={ANGLES.length - 1}
                    step={1}
                    format={(i) => deg(ANGLES[i])}
                    disabled={locked}
                    onChange={(i) => {
                      go(i);
                    }}
                  />
                </Row>
                <Row>
                  <Control disabled={locked || idx >= ANGLES.length - 1} onClick={() => go(idx + 1)}>
                    Tilt one step more
                  </Control>
                  <Control disabled={locked || idx === SIXTY} onClick={() => go(SIXTY)}>
                    Jump to 60°
                  </Control>
                </Row>
                <Row>
                  <Readout label="Into the air" value={locked ? "?" : pct(b === null ? 0 : 1 - R)} />
                  <Readout label="Reflected down" value={locked ? "?" : pct(R)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
