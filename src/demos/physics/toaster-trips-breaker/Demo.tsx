"use client";

// Breaker counts amps. One 120 V circuit with an ideal 15 A breaker (opens the moment the
// total current exceeds 15 A). Each device draws I = P / V at its nameplate power: heater
// 1500 W = 12.5 A (on at the start), TV 200 W = 1.67 A, blender 600 W = 5 A, toaster
// 1200 W = 10 A. Heater + TV = 14.2 A holds; heater + blender = 17.5 A and heater + toaster
// = 22.5 A trip. Without the heater, TV + blender + toaster = 16.7 A trips too: it is the
// total current, not the number of plugs. One gauge (0-25 A, red above 15 A) plus the
// strip of sockets below it.
//
// Earned reveal: milestones "holds" (heater plus one more device, breaker holding) and
// "trips". QA path: TV (14.2 A, holds), then blender (19.2 A, trips).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const V = 120;
const LIMIT = 15;
const DEVICES = [
  { id: "tv", name: "TV", w: 200 },
  { id: "blender", name: "Blender", w: 600 },
  { id: "toaster", name: "Toaster", w: 1200 },
  { id: "heater", name: "Heater", w: 1500 },
] as const;
type Id = (typeof DEVICES)[number]["id"];
const amps = (w: number) => w / V;
const fmtA = (a: number) => `${a.toFixed(1)} A`;

const W = 320;
const H = 176;
const GX = 160;
const GY = 92;
const GR = 70;
const GMAX = 25;
const gpt = (a: number, r: number) => {
  const th = Math.PI - (Math.PI * Math.min(a, GMAX)) / GMAX;
  return { x: GX + r * Math.cos(th), y: GY - r * Math.sin(th) };
};

export default function ToasterTripsBreaker({ slug }: { slug: string }) {
  const [on, setOn] = useState<Record<Id, boolean>>({ tv: false, blender: false, toaster: false, heater: true });
  const [tripped, setTripped] = useState<number | null>(null); // demand (A) that tripped it
  const [held, setHeld] = useState<{ names: string[]; a: number } | null>(null);
  const [trip, setTrip] = useState<{ names: string[]; a: number } | null>(null);

  const demandOf = (o: Record<Id, boolean>) => DEVICES.reduce((t, d) => t + (o[d.id] ? amps(d.w) : 0), 0);
  const demand = demandOf(on);
  const current = tripped === null ? demand : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a cold morning, your 1500 W heater is already running on a ${V} V kitchen circuit with an ideal 15 A breaker. Which extra device will NOT trip it?`,
        options: ["A 200 W TV", "A 600 W blender", "A 1200 W toaster"],
        answer: 0,
      }}
      exploreHint="Plug devices in and watch the amps against the red line."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {held ? `${held.names.join(" + ")} drew ${fmtA(held.a)} and the breaker held. ` : ""}
            {trip ? (
              <>
                {trip.names.join(" + ")} asked for <strong>{fmtA(trip.a)}</strong>, over 15 A, and it tripped.
              </>
            ) : null}
          </p>
          <p>
            A breaker counts amps, and amps are watts divided by volts: the heater alone is 1500 ÷ 120 = 12.5 A, leaving
            2.5 A of room. 200 W is 1.7 A and fits; 600 W is 5 A and does not. It is the total that matters, not how many
            plugs.
          </p>
          <p className="muted">
            Ideal breaker. Real ones trip on a time curve: a small overload can take minutes or longer, a big one is fast.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["holds", "trips"]}>
          {(reach) => {
            const toggle = (id: Id) => {
              const next = { ...on, [id]: !on[id] };
              setOn(next);
              if (tripped !== null) return; // power is off until reset
              const a = demandOf(next);
              const names = DEVICES.filter((d) => next[d.id]).map((d) => `${d.name} (${d.w} W)`);
              if (a > LIMIT) {
                setTripped(a);
                setTrip((t) => t ?? { names, a });
                reach("trips");
              } else if (next.heater && names.length >= 2) {
                setHeld((h) => h ?? { names, a });
                reach("holds");
              }
            };
            const needle = gpt(locked ? 0 : current, GR - 10);
            const red0 = gpt(LIMIT, GR);
            const red1 = gpt(GMAX, GR);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Circuit ${tripped !== null ? "tripped" : fmtA(current)}`}>
                  <path d={`M${GX - GR},${GY} A${GR},${GR} 0 0 1 ${GX + GR},${GY}`} className={s.dial} />
                  <path d={`M${red0.x},${red0.y} A${GR},${GR} 0 0 1 ${red1.x},${red1.y}`} className={s.red} />
                  {[0, 5, 10, 15, 20, 25].map((a) => {
                    const p1 = gpt(a, GR);
                    const p2 = gpt(a, GR - 7);
                    const pl = gpt(a, GR - 16);
                    return (
                      <g key={a}>
                        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={s.tick} />
                        <text x={pl.x} y={pl.y + 3} textAnchor="middle" className={a === LIMIT ? s.tickRed : s.tickLabel}>
                          {a}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={GX} y1={GY} x2={needle.x} y2={needle.y} className={s.needle} />
                  <circle cx={GX} cy={GY} r={3.5} className={s.hub} />
                  <text x={GX} y={GY + 22} textAnchor="middle" className={tripped !== null && !locked ? s.big + " " + s.bad : s.big}>
                    {locked ? "? A" : tripped !== null ? "TRIPPED: 0 A" : fmtA(current)}
                  </text>
                  {/* sockets */}
                  {DEVICES.map((d, i) => {
                    const x = 12 + i * 76;
                    const plugged = on[d.id];
                    return (
                      <g key={d.id}>
                        <rect x={x} y={128} width={68} height={34} rx={5} className={plugged ? s.sockOn : s.sockOff} />
                        <text x={x + 34} y={142} textAnchor="middle" className={s.devName}>
                          {d.name}
                        </text>
                        <text x={x + 34} y={155} textAnchor="middle" className={s.devW}>
                          {plugged ? `${d.w} W` : "unplugged"}
                        </text>
                      </g>
                    );
                  })}
                  <text x={4} y={H - 4} className={s.chip}>
                    One 120 V circuit, ideal 15 A breaker.
                  </text>
                </svg>

                <Row>
                  {DEVICES.map((d) => (
                    <Control key={d.id} className={on[d.id] ? "active" : ""} disabled={locked} onClick={() => toggle(d.id)}>
                      {on[d.id] ? `Unplug ${d.name}` : `Plug ${d.name}`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control
                    disabled={locked || tripped === null || demand > LIMIT}
                    onClick={() => {
                      setTripped(null);
                    }}
                  >
                    Reset breaker
                  </Control>
                  <Readout label="Devices ask for" value={locked ? "?" : fmtA(demand)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
