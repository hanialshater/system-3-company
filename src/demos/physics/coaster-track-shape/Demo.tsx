"use client";

// Track shape and final speed. A frictionless cart starts from rest 5 m up and
// runs down a track to the floor. The learner changes the ramp's slope (steep to
// gentle) and its curve (arching up or dipping). Each change races the learner's
// track against a fixed reference, the steepest straight ramp (dashed): the times
// differ, the speed at the bottom does not.
//
// Physics: the track is a 240-piece polyline; on each straight piece the cart
// has constant acceleration g * (drop / length) along the track (Newton's second
// law with gravity and a normal force only, no friction, no rolling energy).
// v1^2 = v0^2 + 2 a l and t = 2 l / (v0 + v1) per piece, exactly. The speed is
// computed piece by piece, not from the energy formula; the energy result
// v = sqrt(2 g h) = 9.90 m/s comes out of it. g = 9.81 m/s^2.
// Track: y(u) = h (1 - u) + c h sin(pi u), u = x / L; monotonic for |c| <= 0.3,
// so no track rises above its 5 m start.
//
// v2: fixed steep reference instead of "last track" (the QA path ends far from it, so the
// gap is visible); slider shows the slope in degrees; live speed labels on both carts;
// reveal gated by <Milestones> (a gentle ramp, a curved track); the reveal glosses g and h.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useMemo, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const H_M = 5; // m
const N = 240;
const LENGTHS = [3, 5, 8, 12, 16, 20]; // m of floor covered by the ramp
const CURVES = [
  { c: -0.3, name: "dips low" },
  { c: -0.15, name: "dips a bit" },
  { c: 0, name: "straight" },
  { c: 0.15, name: "arches a bit" },
  { c: 0.3, name: "arches more" },
];
const STRAIGHT = 2;
const slopeDeg = (L: number) => Math.round((Math.atan(H_M / L) * 180) / Math.PI);

interface Track {
  pts: { x: number; y: number }[];
  t: number[]; // time at each vertex
  v: number[]; // speed at each vertex
}

function buildTrack(L: number, c: number): Track {
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N;
    return { x: L * u, y: H_M * (1 - u) + c * H_M * Math.sin(Math.PI * u) };
  });
  const t = [0];
  const v = [0];
  for (let i = 0; i < N; i++) {
    const a = pts[i], b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const acc = (G * (a.y - b.y)) / len; // along the piece
    const v0 = v[i];
    const v1 = Math.sqrt(Math.max(0, v0 * v0 + 2 * acc * len));
    t.push(t[i] + (2 * len) / (v0 + v1));
    v.push(v1);
  }
  return { pts, t, v };
}

/** Position and speed on the track at time tt (clamped to the bottom). */
function where(tr: Track, tt: number) {
  const T = tr.t[N];
  if (tt >= T) return { ...tr.pts[N], v: tr.v[N] };
  let i = 0;
  while (i < N - 1 && tr.t[i + 1] <= tt) i++;
  const a = tr.pts[i], b = tr.pts[i + 1];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const v0 = tr.v[i], v1 = tr.v[i + 1];
  const dtSeg = tr.t[i + 1] - tr.t[i];
  const acc = (v1 - v0) / dtSeg;
  const tau = Math.max(0, tt - tr.t[i]);
  const f = Math.min(1, (v0 * tau + 0.5 * acc * tau * tau) / len);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, v: Math.min(v1, v0 + acc * tau) };
}

const REF = buildTrack(LENGTHS[0], 0); // the steep straight ramp

const W = 320;
const HV = 112;
const X0 = 34;
const FLOOR = 92;
const K = (W - X0 - 14) / 20; // px per metre, both axes

const path = (tr: Track) =>
  "M " + tr.pts.filter((_, i) => i % 4 === 0 || i === N).map((p) => `${(X0 + p.x * K).toFixed(1)} ${(FLOOR - p.y * K).toFixed(1)}`).join(" L ");

export default function CoasterTrackShape({ slug }: { slug: string }) {
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(STRAIGHT);
  const [t, setT] = useState(0);
  const [runId, setRunId] = useState(0);
  const [slowest, setSlowest] = useState<number | null>(null);

  const track = useMemo(() => buildTrack(LENGTHS[li], CURVES[ci].c), [li, ci]);
  const tEnd = Math.max(track.t[N], REF.t[N]);

  useEffect(() => {
    if (runId === 0) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(tEnd, (now - start) / 1000);
      setT(tt);
      if (tt < tEnd) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [runId, tEnd]);

  const vBottom = track.v[N];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A cart with nothing slowing it (no friction) starts from rest 5 m up and rolls to the floor down either a steep ramp or a gentle one. Which gives the higher speed at the bottom?",
        options: ["The steep ramp", "The gentle ramp", "Both end at the same speed"],
        answer: 2,
      }}
      exploreHint="Make the ramp gentler, then curve it. Compare the speed at the bottom."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Every track you tried ended at <strong>{vBottom.toFixed(2)} m/s</strong>, the same as the steep ramp.
            {slowest !== null && slowest > REF.t[N]
              ? ` Your slowest took ${slowest.toFixed(2)} s to get there, against ${REF.t[N].toFixed(2)} s: arriving sooner is not arriving faster.`
              : " The shape changed the time, not the final speed."}
          </p>
          <p>
            What sets the speed is the height lost: in each race the labels climbed as the carts dropped, and both
            readouts ended at the same bottom speed. All 5 m of drop becomes 9.90 m/s: v = &radic;(2 g h), with g = 9.81 m/s&sup2; (gravity) and h =
            5 m.
          </p>
          <p className="muted">Without friction, only the drop matters, not the road taken.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["gentle", "curved"]}>
          {(reach) => {
            const change = (nli: number, nci: number) => {
              setLi(nli);
              setCi(nci);
              setT(0);
              setRunId((r) => r + 1);
              const tr = buildTrack(LENGTHS[nli], CURVES[nci].c);
              setSlowest((sl) => Math.max(sl ?? 0, tr.t[N]));
              if (nli > 0) reach("gentle");
              if (nci !== STRAIGHT) reach("curved");
            };
            const racing = runId > 0;
            const cart = where(track, racing ? t : 0);
            const rcart = where(REF, racing ? t : 0);
            const caption = locked
              ? "Dashed: the steep ramp. Solid: your track. Both drop 5 m."
              : !racing
                ? "Change the slope or the curve to race the two carts."
                : "Each label is that cart's speed so far. Watch them climb to the bottom.";

            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${HV}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Track at ${slopeDeg(LENGTHS[li])} degrees, ${CURVES[ci].name}; speed at the bottom ${vBottom.toFixed(2)} m/s`}>
                  {/* height ruler */}
                  {[0, 1, 2, 3, 4, 5].map((m) => (
                    <g key={m}>
                      <line x1={X0 - 6} y1={FLOOR - m * K} x2={X0 - 2} y2={FLOOR - m * K} className={s.tick} />
                      <text x={X0 - 9} y={FLOOR - m * K + 3} textAnchor="end" className={s.tickLabel}>
                        {m} m
                      </text>
                    </g>
                  ))}
                  <line x1={X0 - 4} y1={FLOOR} x2={X0 - 4} y2={FLOOR - H_M * K} className={s.tick} />
                  <line x1={X0} y1={FLOOR} x2={W} y2={FLOOR} className={s.floor} />
                  <line x1={X0} y1={FLOOR - H_M * K} x2={W} y2={FLOOR - H_M * K} className={s.topLine} />

                  <path d={path(REF)} className={s.ghost} />
                  <path d={path(track)} className={s.track} />

                  <circle cx={X0 + rcart.x * K} cy={FLOOR - rcart.y * K - 5} r={4.5} className={s.ghostCart} />
                  <circle cx={X0 + cart.x * K} cy={FLOOR - cart.y * K - 5} r={5.5} className={s.cart} />
                  {racing && (
                    <>
                      <text x={X0 + rcart.x * K + 8} y={FLOOR - rcart.y * K - 3} className={s.ghostLabel}>
                        {rcart.v.toFixed(1)}
                      </text>
                      <text x={Math.min(W - 16, X0 + cart.x * K + 9)} y={FLOOR - cart.y * K - 12} className={s.label}>
                        {cart.v.toFixed(1)} m/s
                      </text>
                    </>
                  )}
                  <text x={X0 + LENGTHS[0] * K + 4} y={FLOOR + 14} className={s.ghostLabel}>
                    steep ramp
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Slider
                    label="Slope"
                    value={li}
                    min={0}
                    max={LENGTHS.length - 1}
                    step={1}
                    disabled={locked}
                    format={(v) => `${slopeDeg(LENGTHS[v])}°`}
                    onChange={(v) => change(v, ci)}
                  />
                  <Slider
                    label="Curve"
                    value={ci}
                    min={0}
                    max={CURVES.length - 1}
                    step={1}
                    disabled={locked}
                    format={(v) => CURVES[v].name}
                    onChange={(v) => change(li, v)}
                  />
                </Row>
                <Row>
                  <Control disabled={locked || !racing || t < tEnd} onClick={() => { setT(0); setRunId((r) => r + 1); }}>
                    Race again
                  </Control>
                </Row>
                <Row>
                  <Readout label="Steep ramp: bottom speed, time" value={locked ? "?" : `${REF.v[N].toFixed(2)} m/s, ${REF.t[N].toFixed(2)} s`} />
                  <Readout label="Your track: bottom speed, time" value={locked ? "?" : `${vBottom.toFixed(2)} m/s, ${track.t[N].toFixed(2)} s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
