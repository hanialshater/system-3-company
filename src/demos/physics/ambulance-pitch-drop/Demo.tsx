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

const W = 320;
const H = 170;
const MID = 160;
const ROAD = 92;
const K = 1.6; // px per m
const px = (x: number) => MID + x * K;

export default function AmbulancePitchDrop({ slug }: { slug: string }) {
  const [x, setX] = useState(-20);
  const [heardHi, setHeardHi] = useState(heard(-20));
  const [heardLo, setHeardLo] = useState<number | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["going-away"]);
  const f = heard(x);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An ambulance siren sounds 700 Hz to its driver. As it drives past you at 25 m/s, the pitch you hear…",
        options: ["stays 700 Hz", "drops from about 755 Hz to about 652 Hz", "drops from 700 Hz to 600 Hz"],
        answer: 1,
      }}
      exploreHint="Drive the ambulance past you. Watch the rings and the pitch you hear."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Coming toward you it sounded <strong>{Math.round(heardHi)} Hz</strong>; going away,{" "}
            <strong>{Math.round(heardLo ?? heard(20))} Hz</strong>. The driver heard 700 Hz the whole time: the siren never
            changed.
          </p>
          <p>
            Each crest leaves from a spot a little further along the road, so ahead of the ambulance they bunch up and
            arrive more often (higher pitch); behind, they spread out (lower). Head-on the limits are{" "}
            {Math.round(LIMIT_UP)} and {Math.round(LIMIT_DOWN)} Hz.
          </p>
          <p className="muted">Still air, sound at 343 m/s. The drop is quick because you stand close to the road.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : "Rings: sound sent 0.1 s apart, from where the ambulance was. 25 m/s, siren 700 Hz.";
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
                const hz = heard(v);
                if (v < 0) setHeardHi(Math.max(heardHi, hz));
                if (v > 0) {
                  setHeardLo(heardLo === null ? hz : Math.min(heardLo, hz));
                  reach("going-away");
                }
              }}
            />
            <Row>
              <Readout label="Siren (driver)" value={`${F0} Hz`} />
              <Readout label="You hear" value={locked ? "?" : `${Math.round(f)} Hz`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
