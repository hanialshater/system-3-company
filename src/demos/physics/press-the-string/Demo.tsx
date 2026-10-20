"use client";

// Fixed string, fundamental mode. f = v / (2 L); same tension and mass per length, so
// f = 110 Hz x 0.65 m / L. A finger presses the string at a stop along it (FRETS: open,
// a quarter, the middle, three quarters); the free part from finger to bridge vibrates as
// one loop. The loop pulses at f / 55 per second (slowed 55x, labelled) and the open
// string's loop stays dashed behind for comparison.
//
// Earned reveal: milestone "middle". QA path: the finger slider starts open; two presses
// step it to a quarter, then the middle (220 Hz), the question's state.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const F0 = 110; // Hz, open string
const L0 = 0.65; // m
const STOPS = [
  { at: 0, name: "open" },
  { at: 0.25, name: "a quarter along" },
  { at: 0.5, name: "the middle" },
  { at: 0.75, name: "three quarters along" },
];
const MIDDLE = 2;
const SLOW = 55;
const len = (at: number) => L0 * (1 - at);
const freq = (at: number) => (F0 * L0) / len(at);
const hz = (f: number) => `${Math.round(f)} Hz`;

const W = 320;
const H = 130;
const NUT = 18;
const BRIDGE = 302;
const SY = 62;
const AMP = 22;
const xAt = (at: number) => NUT + at * (BRIDGE - NUT);

const loop = (x0: number, x1: number, amp: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = x0 + ((x1 - x0) * i) / 40;
    pts.push(`${i ? "L" : "M"} ${x.toFixed(1)} ${(SY - amp * Math.sin((Math.PI * i) / 40)).toFixed(1)}`);
  }
  for (let i = 40; i >= 0; i--) {
    const x = x0 + ((x1 - x0) * i) / 40;
    pts.push(`L ${x.toFixed(1)} ${(SY + amp * Math.sin((Math.PI * i) / 40)).toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
};

const curve = (x0: number, x1: number, amp: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = x0 + ((x1 - x0) * i) / 40;
    pts.push(`${i ? "L" : "M"} ${x.toFixed(1)} ${(SY - amp * Math.sin((Math.PI * i) / 40)).toFixed(1)}`);
  }
  return pts.join(" ");
};

export default function PressTheString({ slug }: { slug: string }) {
  const [stop, setStop] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const at = STOPS[stop].at;
  const f = freq(at);
  const fx = xAt(at);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Tuning your guitar, you pluck an open string that vibrates 110 times a second (110 Hz). You press it down at its middle and pluck again. About how fast does it vibrate now?",
        options: ["55 Hz", "110 Hz", "220 Hz"],
        answer: 2,
      }}
      exploreHint="Slide the finger along and watch the loop and the count per second."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Pressed at the middle, the free string was {len(STOPS[MIDDLE].at).toFixed(3)} m long and vibrated{" "}
            <strong>{hz(freq(STOPS[MIDDLE].at))}</strong>, twice the open {hz(F0)}: one octave up.
            {visited.includes(3) ? ` Three quarters along, a quarter of the string, it gave ${hz(freq(0.75))}.` : ""}
          </p>
          <p>
            The string vibrates as one loop over its free length. A wave runs along it and back once per vibration, so half
            the length means half the time per vibration, and twice as many each second. Frequency goes as one over length.
          </p>
          <p className="muted">Same tension throughout; an ideal string.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["middle"]}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`String pressed ${STOPS[stop].name}`}>
                <text x={4} y={12} className={s.chip}>
                  Hz: vibrations per second. Motion slowed {SLOW}×, width exaggerated.
                </text>
                <path d={loop(NUT, BRIDGE, AMP)} className={s.ghost} />
                <path d={loop(fx, BRIDGE, AMP)} className={s.loop} />
                <g key={stop} className={locked ? undefined : s.pulse} style={{ animationDuration: `${SLOW / f}s`, transformOrigin: `0px ${SY}px` }}>
                  <path d={curve(fx, BRIDGE, AMP)} className={s.wave} />
                </g>
                <line x1={NUT} y1={SY} x2={BRIDGE} y2={SY} className={s.string} />
                <rect x={NUT - 5} y={SY - 30} width={5} height={60} className={s.end} />
                <rect x={BRIDGE} y={SY - 30} width={5} height={60} className={s.end} />
                {stop > 0 && <circle cx={fx} cy={SY - 7} r={7} className={s.finger} />}
                <line x1={fx} y1={SY + 34} x2={BRIDGE} y2={SY + 34} className={s.dim} />
                <text x={(fx + BRIDGE) / 2} y={SY + 46} textAnchor="middle" className={s.label}>
                  vibrating: {len(at).toFixed(3)} m
                </text>
                <text x={NUT} y={H - 4} className={s.chip}>
                  dashed: open string, 0.650 m
                </text>
              </svg>

              <Row>
                <Slider
                  label="Finger"
                  value={stop}
                  min={0}
                  max={STOPS.length - 1}
                  step={1}
                  format={(i) => STOPS[i].name}
                  disabled={locked}
                  onChange={(i) => {
                    setStop(i);
                    setVisited((xs) => (xs.includes(i) ? xs : [...xs, i]));
                    if (i === MIDDLE) reach("middle");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Vibrations per second" value={locked ? "?" : hz(f)} />
                <Readout label="Vs open string" value={locked ? "?" : `×${(f / F0).toFixed(2)}`} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
