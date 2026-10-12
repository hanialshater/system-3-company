"use client";

// Track shape and final speed. A frictionless cart starts from rest 5 m up and
// runs down a track to the floor. The learner changes the ramp's length (steep
// to gentle) and its curve (bulging up or dipping). Each change races the new
// track against the previous one: the times differ, the speed at the bottom
// does not.
//
// Physics: the track is a 240-piece polyline; on each straight piece the cart
// has constant acceleration g * (drop / length) along the track (Newton's second
// law with gravity and a normal force only, no friction, no rolling energy).
// v1^2 = v0^2 + 2 a l and t = 2 l / (v0 + v1) per piece, exactly. The speed is
// computed piece by piece, not from the energy formula; the energy result
// v = sqrt(2 g h) = 9.90 m/s comes out of it. g = 9.81 m/s^2.
// Track: y(u) = h (1 - u) + c h sin(pi u), u = x / L; monotonic for |c| <= 0.3.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
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
  { c: 0.15, name: "bulges a bit" },
  { c: 0.3, name: "bulges high" },
];

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

/** Position on the track at time tt (clamped to the bottom). */
function where(tr: Track, tt: number) {
  const T = tr.t[N];
  if (tt >= T) return tr.pts[N];
  let i = 0;
  while (i < N - 1 && tr.t[i + 1] <= tt) i++;
  const a = tr.pts[i], b = tr.pts[i + 1];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const v0 = tr.v[i], v1 = tr.v[i + 1];
  const dtSeg = tr.t[i + 1] - tr.t[i];
  const acc = (v1 - v0) / dtSeg;
  const tau = tt - tr.t[i];
  const f = Math.min(1, (v0 * tau + 0.5 * acc * tau * tau) / len);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

const W = 320;
const HV = 162;
const X0 = 34;
const FLOOR = 128;
const K = (W - X0 - 14) / 20; // px per metre, both axes

const path = (tr: Track) =>
  "M " + tr.pts.filter((_, i) => i % 4 === 0 || i === N).map((p) => `${(X0 + p.x * K).toFixed(1)} ${(FLOOR - p.y * K).toFixed(1)}`).join(" L ");

export default function CoasterTrackShape({ slug }: { slug: string }) {
  const [li, setLi] = useState(1);
  const [ci, setCi] = useState(2);
  const [prev, setPrev] = useState<{ li: number; ci: number } | null>(null);
  const [t, setT] = useState(0);
  const [runId, setRunId] = useState(0);

  const track = useMemo(() => buildTrack(LENGTHS[li], CURVES[ci].c), [li, ci]);
  const ghost = useMemo(() => (prev ? buildTrack(LENGTHS[prev.li], CURVES[prev.ci].c) : null), [prev]);
  const tEnd = Math.max(track.t[N], ghost ? ghost.t[N] : 0);

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
  // Results are shown as soon as a track is chosen (computed, not waited for), so the
  // two tracks needed for the reveal are always seen with their bottom speeds.
  const arrived = runId > 0;
  const ghostArrived = ghost !== null && runId > 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A frictionless cart starts from rest 5 m up. It rolls to the floor down either a steep ramp or a gentle one. Which gives the higher speed at the bottom?",
        options: ["The steep ramp", "The gentle ramp", "The same speed"],
        answer: 2,
      }}
      exploreHint="Change the ramp, then change it again. Compare speeds at the bottom."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Every track you tried ended at <strong>{vBottom.toFixed(2)} m/s</strong>.
            {ghost
              ? ` Your last two took ${Math.min(ghost.t[N], track.t[N]).toFixed(2)} s and ${Math.max(ghost.t[N], track.t[N]).toFixed(2)} s to get there: the shape changed the time, not the final speed.`
              : " The shape changed the time, not the final speed."}
          </p>
          <p>
            The cart&rsquo;s motion was worked out piece by piece from gravity alone. Steep pieces speed it up hard but
            briefly; gentle pieces gently, for longer. Either way, what counts is the 5 m of height it lost: that height
            becomes speed, v = &radic;(2 g h).
          </p>
          <p className="muted">Without friction, only the drop matters, not the road taken.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const change = (nli: number, nci: number) => {
          setPrev({ li, ci });
          setLi(nli);
          setCi(nci);
          setT(0);
          setRunId((r) => r + 1);
          interact();
        };
        const cart = where(track, runId > 0 ? t : 0);
        const gcart = ghost ? where(ghost, t) : null;
        const caption = locked
          ? "Make a prediction to start."
          : runId === 0
            ? "Change the track to roll the cart."
            : "Dashed: the last track. Readouts: speed at the bottom, time taken.";

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${HV}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Track ${LENGTHS[li]} metres long, ${CURVES[ci].name}`}>
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

              {ghost && <path d={path(ghost)} className={s.ghost} />}
              <path d={path(track)} className={s.track} />

              {ghost && gcart && <circle cx={X0 + gcart.x * K} cy={FLOOR - gcart.y * K - 5} r={4.5} className={s.ghostCart} />}
              <circle cx={X0 + cart.x * K} cy={FLOOR - cart.y * K - 5} r={5.5} className={s.cart} />

              {ghost && ghostArrived && (
                <text x={Math.min(W - 28, X0 + LENGTHS[prev!.li] * K)} y={FLOOR + 27} textAnchor="middle" className={s.ghostLabel}>
                  {ghost.v[N].toFixed(2)} m/s
                </text>
              )}
              {!locked && arrived && (
                <text
                  x={Math.min(W - 28, X0 + LENGTHS[li] * K)}
                  y={FLOOR + 14}
                  textAnchor="middle"
                  className={s.label}
                >
                  {vBottom.toFixed(2)} m/s
                </text>
              )}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Slider
                label="Ramp length"
                value={li}
                min={0}
                max={LENGTHS.length - 1}
                step={1}
                disabled={locked}
                format={(v) => `${LENGTHS[v]} m`}
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
              <Readout label="This track" value={!locked && arrived ? `${vBottom.toFixed(2)} m/s, ${track.t[N].toFixed(2)} s` : "?"} />
              <Readout label="Last track" value={ghost && ghostArrived ? `${ghost.v[N].toFixed(2)} m/s, ${ghost.t[N].toFixed(2)} s` : "?"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
