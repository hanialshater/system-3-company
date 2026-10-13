"use client";

// Ambulance pitch drop. An ambulance drives east at 25 m/s; its siren sounds 700 Hz to
// the driver. You stand 3 m from its line. Rings show where the sound sent out 0.1,
// 0.2, ... 0.6 s ago has reached (centred where the ambulance was then): bunched ahead,
// stretched behind. Only every 70th crest is drawn (700 Hz x 0.1 s).
//
// Pitch you hear right now: find the emission time tau with |source(t - tau) - you| =
// c tau, then f' = f c / (c - v cos phi), phi the angle between the ambulance's motion
// and the line to you at emission. Far ahead this tends to 700 x 343 / 318 = 755 Hz,
// far behind to 700 x 343 / 368 = 652 Hz. c = 343 m/s (20 C), still air.
// The reveal unlocks once the learner has heard the ambulance going away.
// v2: options are qualitative (no numbers to derive); the caption defines ring = crest and
// Hz = crests per second and compares the gaps with a parked siren's 34.3 m, and the reveal
// turns that ratio into the pitch (34.3 / 31.8 x 700 = 755).

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const C = 343;
const V = 25;
const F0 = 700;
const OFF = 3; // m, your distance from the road line

function heard(x: number) {
  const a = C * C - V * V;
  const b = 2 * x * V;
  const c = -(x * x + OFF * OFF);
  const tau = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const xe = x - V * tau;
  const r = Math.hypot(xe, OFF);
  const toward = (V * -xe) / r; // velocity component toward you
  return (F0 * C) / (C - toward);
}
const LIMIT_UP = (F0 * C) / (C - V);
const LIMIT_DOWN = (F0 * C) / (C + V);
const DT = 0.1; // s between drawn rings
const GAP0 = C * DT; // parked: 34.3 m
const GAP_AHEAD = (C - V) * DT; // 31.8 m
const GAP_BEHIND = (C + V) * DT; // 36.8 m

const W = 320;
const H = 170;
const MID = 160;
const ROAD = 92;
const K = 1.6; // px per m
const px = (x: number) => MID + x * K;

export default function AmbulancePitchDrop({ slug }: { slug: string }) {
  const [x, setX] = useState(-20);
  const [log, setLog] = useState<Record<number, number>>({});
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["heard-approach", "heard-going-away"]);
  const f = heard(x);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An ambulance siren sounds 700 Hz to its driver. As it drives past you at 25 m/s, the pitch you hear…",
        options: [
          "stays 700 Hz the whole way",
          "starts above 700 Hz, ends below it",
          "starts at 700 Hz, then drops below it",
        ],
        answer: 1,
      }}
      exploreHint="Drive the ambulance past you. Watch the rings and the pitch you hear."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Coming toward you, you heard <strong>{Math.round(heard(-20))} Hz</strong> at 20 m before you; going away,{" "}
            <strong>{Math.round(heard(20))} Hz</strong> at 20 m past you. The siren itself stayed 700 Hz.
          </p>
          <p>
            Each crest leaves from a spot further along the road. Ahead, the rings were {GAP_AHEAD.toFixed(1)} m apart
            instead of a parked siren&apos;s {GAP0.toFixed(1)} m, so crests reach you {(GAP0 / GAP_AHEAD).toFixed(2)} times
            as often: up to {Math.round(LIMIT_UP)} Hz. Behind, {GAP_BEHIND.toFixed(1)} m apart: down to{" "}
            {Math.round(LIMIT_DOWN)} Hz. Beside you it read {Math.round(log[0] ?? heard(0))} Hz, because that sound left a moment
            earlier, still approaching.
          </p>
          <p className="muted">Still air, sound at 343 m/s.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Each ring marks every 70th crest, 0.1 s apart. Hz = crests per second."
          : `Gaps: ${GAP_AHEAD.toFixed(1)} m ahead, ${GAP_BEHIND.toFixed(1)} m behind. Parked, they'd be ${GAP0.toFixed(1)} m.`;
        const rings = Array.from({ length: 6 }, (_, i) => {
          const tau = (i + 1) * 0.1;
          return { cx: px(x - V * tau), r: C * tau * K };
        });
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Ambulance ${Math.abs(x)} m ${x < 0 ? "before" : "past"} you; you hear ${Math.round(f)} Hz`}>
              <rect x={0} y={ROAD - 14} width={W} height={28} className={s.road} />
              <line x1={0} y1={ROAD} x2={W} y2={ROAD} className={s.lane} />
              {rings.map((r, i) => (
                <circle key={i} cx={r.cx} cy={ROAD} r={r.r} className={s.ring} />
              ))}
              {/* crest gaps: (c - v) x 0.1 s ahead, (c + v) x 0.1 s behind */}
              {[
                { a: x + (C - V) * 0.1, b: x + (C - V) * 0.2 },
                { a: x - (C + V) * 0.1, b: x - (C + V) * 0.2 },
              ].map((g, i) => (
                <g key={i}>
                  <line x1={px(g.a)} y1={ROAD - 22} x2={px(g.b)} y2={ROAD - 22} className={s.gap} />
                  <text x={(px(g.a) + px(g.b)) / 2} y={ROAD - 26} textAnchor="middle" className={s.gapLabel}>
                    {Math.abs(g.b - g.a).toFixed(1)} m
                  </text>
                </g>
              ))}
              <g transform={`translate(${px(x)} ${ROAD})`}>
                <rect x={-14} y={-7} width={28} height={14} rx={3} className={s.van} />
                <rect x={-3} y={-5} width={6} height={10} className={s.cross} />
                <rect x={-5} y={-2} width={10} height={4} className={s.cross} />
                <path d="M 18 0 L 13 -4 L 13 4 Z" className={s.dir} />
              </g>
              <circle cx={px(0)} cy={ROAD + OFF * K + 14} r={5} className={s.you} />
              <text x={px(0)} y={ROAD + OFF * K + 30} textAnchor="middle" className={s.small}>
                you
              </text>
              {[-80, -40, 0, 40, 80].map((m) => (
                <text key={m} x={px(m)} y={H - 4} textAnchor="middle" className={s.small}>
                  {m} m
                </text>
              ))}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Ambulance"
              value={x}
              min={-80}
              max={80}
              step={20}
              disabled={locked}
              format={(v) => (v === 0 ? "beside you" : v < 0 ? `${-v} m before you` : `${v} m past you`)}
              onChange={(v) => {
                setX(v);
                // the starting position (-20 m) was on screen once unlocked: count it as heard
                setLog((l) => ({ [-20]: heard(-20), ...l, [v]: heard(v) }));
                if (v >= -20 || x >= -20) reach("heard-approach");
                if (v > 0) reach("heard-going-away");
              }}
            />
            <Row>
              <Readout label="Siren (driver)" value={`${F0} Hz`} />
              <Readout label="You hear" value={locked ? "?" : `${Math.round(f)} Hz`} />
              <Readout
                label="Heard at -20 / 0 / +20 m"
                value={locked ? "?" : [-20, 0, 20].map((m) => (m === -20 || log[m] !== undefined ? Math.round(heard(m)) : "–")).join(" / ")}
              />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
