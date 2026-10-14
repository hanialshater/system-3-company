"use client";

// Same four talks, one room per rule. Each lane books talks one at a time by its own rule; a talk that
// overlaps a booked one turns grey ("clash"). Touching is allowed: a talk may start the minute another ends.
// One representation: three stacked lanes on one shared hour axis.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Talk = { id: string; start: number; end: number };
const TALKS: Talk[] = [
  { id: "A", start: 0, end: 10 },
  { id: "B", start: 1, end: 4 },
  { id: "C", start: 3, end: 5 },
  { id: "D", start: 4, end: 7 },
];

// Each rule is an order to try the talks in (ties broken alphabetically).
const byKey = (key: (t: Talk) => number) =>
  [...TALKS].sort((a, b) => key(a) - key(b) || a.id.localeCompare(b.id)).map((t) => t.id);
const LANES = [
  { name: "Earliest start first", aria: "earliest start", order: byKey((t) => t.start) },
  { name: "Shortest first", aria: "shortest", order: byKey((t) => t.end - t.start) },
  { name: "Earliest finish first", aria: "earliest finish", order: byKey((t) => t.end) },
];

const talk = (id: string) => TALKS.find((t) => t.id === id)!;
// Half-open [start, end): touching talks do not clash.
const clash = (a: Talk, b: Talk) => a.start < b.end && b.start < a.end;

/** Bookings after `picks` presses of a lane: each press books the first talk in rule order that fits. */
function lane(order: string[], picks: number) {
  const booked: string[] = [];
  for (let p = 0; p < picks; p++) {
    const next = order.find((id) => !booked.includes(id) && !booked.some((b) => clash(talk(id), talk(b))));
    if (!next) break;
    booked.push(next);
  }
  const state = (id: string) =>
    booked.includes(id) ? "booked" : booked.some((b) => clash(talk(id), talk(b))) ? "clash" : "open";
  const open = TALKS.filter((t) => state(t.id) === "open").length;
  return { booked, state, open };
}

const X0 = 22;
const PX = 32; // px per hour
const RH = 20;

export default function EarliestFinishWins({ slug }: { slug: string }) {
  const [picks, setPicks] = useState([0, 0, 0]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Talks: A 0-10, B 1-4, C 3-5, D 4-7 (hours). One room, no overlaps. A talk may start the minute another ends, so B (ends at 4) and D (starts at 4) fit together. Which rule fits the most talks?",
        options: ["Earliest start first", "Shortest first", "Earliest finish first"],
        answer: 2,
      }}
      exploreHint="Book talks in every room until no room has an open talk."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Earliest start took A (0-10) and the room was full: <strong>1 talk</strong>. Shortest took C (3-5), which
            clashed with B and D: <strong>1 talk</strong>. Earliest finish took B, which ended at 4, so D (4-7) still
            fit: <strong>2 talks</strong>.
          </p>
          <p>
            A clashes with every talk, and C clashes with both B and D, so no room holds 3. Ending first leaves the most
            day for what is left, and swapping it into any schedule never makes it worse.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={["first-picks", "all-full"]}>
          {(reach) => {
            const lanes = LANES.map((l, i) => lane(l.order, picks[i]));
            const apply = (next: number[]) => {
              setPicks(next);
              const ls = LANES.map((l, i) => lane(l.order, next[i]));
              if (ls.every((x) => x.booked.length >= 1)) reach("first-picks");
              if (ls.every((x) => x.open === 0)) reach("all-full");
            };
            const press = (i: number) => {
              if (locked || lanes[i].open === 0) return;
              const next = [...picks];
              next[i]++;
              apply(next);
            };
            const pressAll = () => {
              if (locked) return;
              apply(picks.map((p, i) => (lanes[i].open > 0 ? p + 1 : p)));
            };
            const anyOpen = lanes.some((l) => l.open > 0);

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  Same four talks, one room per rule.
                  <br />A talk may start the minute another ends.
                </p>
                <Control className={s.tap} disabled={locked || !anyOpen} onClick={pressAll}>
                  Book next in every room
                </Control>
                {LANES.map((l, i) => {
                  const st = lanes[i];
                  const full = st.open === 0;
                  const label =
                    st.booked.length === 0
                      ? "Booked: ?"
                      : `Booked: ${st.booked.length}${full ? " · full" : " · a talk still fits"}`;
                  return (
                    <div key={l.name} className={s.lane}>
                      <div className={s.head}>
                        <div>
                          <div className={s.name}>{l.name}</div>
                          <div className={s.booked} aria-live="polite">
                            {label}
                          </div>
                        </div>
                        <Control
                          className={s.tap}
                          aria-label={`Book next: ${l.aria}`}
                          disabled={locked || full}
                          onClick={() => press(i)}
                        >
                          Book next
                        </Control>
                      </div>
                      <svg
                        viewBox="0 0 350 82"
                        className="stage-svg"
                        role="img"
                        aria-label={`${l.name}: ${TALKS.map((t) => `${t.id} ${st.state(t.id)}`).join(", ")}`}
                      >
                        {phase === "reveal" && i === 2 && (
                          <rect x={1} y={1} width={348} height={80} rx={6} fill="none" stroke="var(--fg)" strokeWidth={2} />
                        )}
                        {TALKS.map((t, r) => {
                          const state = st.state(t.id);
                          const x = X0 + t.start * PX;
                          const w = (t.end - t.start) * PX;
                          const y = 3 + r * RH;
                          const text = `${t.id} ${t.start}-${t.end}${state === "clash" ? " clash" : ""}`;
                          const inside = t.end - t.start > 6;
                          return (
                            <g key={t.id}>
                              <rect
                                x={x}
                                y={y}
                                width={w}
                                height={RH - 4}
                                rx={3}
                                fill={
                                  state === "booked" ? "var(--domain)" : state === "clash" ? "var(--bg-3, var(--line))" : "var(--bg)"
                                }
                                stroke={state === "clash" ? "var(--muted)" : "var(--fg)"}
                                strokeDasharray={state === "clash" ? "4 3" : undefined}
                                strokeWidth={1.2}
                                opacity={state === "clash" ? 0.7 : 1}
                              />
                              <text x={inside ? x + 6 : x + w + 4} y={y + 12} className={state === "booked" ? s.tb : s.t}>
                                {text}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  );
                })}
                <svg viewBox="0 0 350 24" className="stage-svg" role="img" aria-label="Hour axis from 0 to 10">
                  {Array.from({ length: 11 }, (_, h) => (
                    <g key={h}>
                      <line x1={X0 + h * PX} x2={X0 + h * PX} y1={1} y2={6} stroke="var(--muted)" />
                      <text x={X0 + h * PX} y={17} textAnchor="middle" className={s.axis}>
                        {h}
                      </text>
                    </g>
                  ))}
                  <text x={346} y={23} textAnchor="end" className={s.axis}>
                    hour
                  </text>
                </svg>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
