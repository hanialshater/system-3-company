"use client";

// A rubber band round 10 pins, found by one walk: start at the lowest pin, take the other pins in angle order,
// and whenever the newest pin makes a right turn at the previous corner, drop that corner (Graham's scan).
// The learner's taps are the timeline. The walk is a pure function of how many pins have been tapped, so the
// closed band is still on the board in the reveal. Pins are 10 transparent 44 px buttons over the SVG.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type P = [number, number];
const PINS: P[] = [[0, 0], [6, 1], [8, 3], [7, 7], [2, 8], [-1, 4], [3, 3], [4, 5], [2, 2], [5, 2]];

const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
const dist2 = (a: P, b: P) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

// Lowest pin (then leftmost) starts; the rest go round it by angle, nearer first on a tie.
const START = PINS.reduce((m, p) => (p[1] < m[1] || (p[1] === m[1] && p[0] < m[0]) ? p : m));
const ORDER: P[] = PINS.filter((p) => p !== START).sort((a, b) => {
  const c = cross(START, a, b);
  return c !== 0 ? (c > 0 ? -1 : 1) : dist2(START, a) - dist2(START, b);
});

type Walk = { band: P[]; dropped: { pin: number; at: number }[]; justDropped: number | null; kept: P | null };
function walk(t: number): Walk {
  const band: P[] = [START];
  const dropped: Walk["dropped"] = [];
  let justDropped: number | null = null;
  let kept: P | null = null;
  for (let i = 0; i < t; i++) {
    const p = ORDER[i];
    justDropped = null;
    kept = null;
    // pop on a straight or right turn (cross <= 0)
    while (band.length >= 2 && cross(band[band.length - 2], band[band.length - 1], p) <= 0) {
      const gone = band.pop() as P;
      const pin = ORDER.indexOf(gone);
      dropped.push({ pin, at: i });
      justDropped = pin;
    }
    if (justDropped === null && band.length >= 2) kept = band[band.length - 1];
    band.push(p);
  }
  return { band, dropped, justDropped, kept };
}

// Board: x -1..8, y 0..8 at 34 px a unit in a 350 x 320 box.
const W = 350;
const H = 320;
const U = 34;
const px = (x: number) => 24 + (x + 1) * U;
const py = (y: number) => 296 - y * U;

const EXTREME_ARROWS: { at: P; arrow: string; dx: number; dy: number }[] = [
  { at: [-1, 4], arrow: "←", dx: -14, dy: 4 },
  { at: [8, 3], arrow: "→", dx: 14, dy: 4 },
  { at: [2, 8], arrow: "↑", dx: 0, dy: -12 },
  { at: [0, 0], arrow: "↓", dx: 0, dy: 20 },
];

export default function RubberBandHull({ slug }: { slug: string }) {
  const [t, setT] = useState(0);
  const [note, setNote] = useState("");
  const w = walk(t);
  const closed = t === ORDER.length;
  const droppedPins = new Set(w.dropped.map((d) => d.pin));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "10 pins on a board. A rubber band is stretched around them all. How many pins does it touch?",
        options: ["4", "6", "10"],
        answer: 1,
      }}
      exploreHint="Tap the pins in order, 1 to 9, and watch each right turn."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your band closed on <strong>6</strong> pins. The leftmost, rightmost, top and bottom pins are only 4 of
            them: pins 1 and 6 are none of those, yet the band turns there. Your walk dropped 4 pins, each at a
            right turn.
          </p>
          <p>
            Sort the pins round the start once, then one pass of left-or-right checks keeps the corners. That is
            Graham&apos;s scan, about n log n steps for n pins.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={["first-drop", "closed"]}>
          {(reach) => {
            const tap = (i: number) => {
              if (locked) return;
              if (i !== t) {
                setNote(`Pin ${t + 1} is next: the walk goes round in order.`);
                return;
              }
              const nw = walk(t + 1);
              setT(t + 1);
              setNote("");
              if (nw.justDropped !== null) reach("first-drop");
              if (t + 1 === ORDER.length) reach("closed");
            };

            const msg = locked
              ? "10 pins. A rubber band goes round them all."
              : note || (closed ? "The band is closed." : "Tap pins in order round the start. A right turn drops the last pin.");
            const readout = locked
              ? "On band: ?"
              : closed
                ? `Band closed on ${w.band.length} pins`
                : `On band: ${w.band.length} · Dropped: ${w.dropped.length}`;

            const pts = w.band.map((p) => `${px(p[0])},${py(p[1])}`).join(" ");
            const next = !locked && !closed ? ORDER[t] : null;
            const turnAt = w.kept ?? (w.justDropped !== null ? ORDER[w.justDropped] : null);

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <div className={s.board} style={{ aspectRatio: `${W} / ${H}` }}>
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="stage-svg"
                    role="img"
                    aria-label={closed ? `Band closed on ${w.band.length} pins, ${w.dropped.length} dropped` : `${w.band.length} pins on the band`}
                    data-band={w.band.length}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <line key={`v${i}`} x1={px(i - 1)} y1={py(0)} x2={px(i - 1)} y2={py(8)} stroke="var(--line)" opacity={0.35} />
                    ))}
                    {Array.from({ length: 9 }, (_, i) => (
                      <line key={`h${i}`} x1={px(-1)} y1={py(i)} x2={px(8)} y2={py(i)} stroke="var(--line)" opacity={0.35} />
                    ))}
                    {closed && (
                      <polygon points={pts} fill="color-mix(in srgb, var(--domain) 18%, transparent)" stroke="none" />
                    )}
                    {next && (
                      <line
                        x1={px(START[0])}
                        y1={py(START[1])}
                        x2={px(next[0])}
                        y2={py(next[1])}
                        stroke="var(--muted)"
                        strokeDasharray="4 4"
                      />
                    )}
                    {w.band.length > 1 && (
                      <polyline
                        points={closed ? `${pts} ${px(START[0])},${py(START[1])}` : pts}
                        fill="none"
                        stroke="var(--domain)"
                        strokeWidth={4}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    )}
                    {/* the start pin */}
                    <circle cx={px(START[0])} cy={py(START[1])} r={6} fill="var(--fg)" />
                    {!locked && (
                      <text x={px(START[0]) + 10} y={py(START[1]) + 16} className={s.lab}>
                        start
                      </text>
                    )}
                    {ORDER.map((p, i) => {
                      const gone = droppedPins.has(i);
                      const on = w.band.includes(p) || gone;
                      return (
                        <g key={i}>
                          {next === p && <circle cx={px(p[0])} cy={py(p[1])} r={11} fill="none" stroke="var(--domain)" strokeWidth={2} className={s.pulse} />}
                          <circle
                            cx={px(p[0])}
                            cy={py(p[1])}
                            r={5}
                            fill={gone ? "var(--bg)" : "var(--fg)"}
                            stroke="var(--fg)"
                            strokeWidth={gone ? 1.5 : 0}
                            opacity={on || locked || next === p ? 1 : 0.8}
                          />
                          {gone && (
                            <>
                              <line x1={px(p[0]) - 5} y1={py(p[1]) - 5} x2={px(p[0]) + 5} y2={py(p[1]) + 5} stroke="var(--bad)" strokeWidth={1.5} />
                              <line x1={px(p[0]) - 5} y1={py(p[1]) + 5} x2={px(p[0]) + 5} y2={py(p[1]) - 5} stroke="var(--bad)" strokeWidth={1.5} />
                              <text x={px(p[0]) - 16} y={py(p[1]) - 6} className={s.lab}>↻</text>
                            </>
                          )}
                          {!locked && (
                            <text x={px(p[0]) + 8} y={py(p[1]) - 7} className={s.num}>
                              {i + 1}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    {turnAt && !closed && (
                      <text
                        key={t}
                        x={px(turnAt[0]) + 10}
                        y={py(turnAt[1]) + 18}
                        className={`${s.turn} ${w.justDropped !== null ? s.bad : s.good}`}
                      >
                        {w.justDropped !== null ? "↻ drop" : "↺ keep"}
                      </text>
                    )}
                    {phase === "reveal" &&
                      EXTREME_ARROWS.map((e) => (
                        <text key={e.arrow} x={px(e.at[0]) + e.dx} y={py(e.at[1]) + e.dy} textAnchor="middle" className={s.arrow}>
                          {e.arrow}
                        </text>
                      ))}
                  </svg>
                  {ORDER.map((p, i) => {
                    const gone = droppedPins.has(i);
                    return (
                      <Control
                        key={i}
                        className={`tap ${s.hit}`}
                        style={{ left: `${(px(p[0]) / W) * 100}%`, top: `${(py(p[1]) / H) * 100}%` }}
                        disabled={locked || i < t}
                        aria-label={`Pin ${i + 1}${i < t ? (gone ? ", dropped at a right turn" : ", on the band") : i === t ? ", next" : ""}`}
                        onClick={() => tap(i)}
                      >
                        <span className={s.sr}>{i + 1}</span>
                      </Control>
                    );
                  })}
                </div>
                <p className={s.read}>{readout}</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
