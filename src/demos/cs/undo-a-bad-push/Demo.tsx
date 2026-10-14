"use client";

// Max flow with a greedy trap. Five one-unit pipes: s-a, s-b, a-b, a-t, b-t. Pushing the zig-zag
// s->a->b->t first leaves no forward route (stuck at 1). Sending that unit back along a-b opens
// s->b->a->t, total 2, which equals the two pipes leaving s (the smallest cut).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Pipe = "sa" | "sb" | "ab" | "at" | "bt";
const PIPES: Pipe[] = ["sa", "sb", "ab", "at", "bt"];
const P = { s: { x: 34, y: 90 }, a: { x: 160, y: 30 }, b: { x: 160, y: 150 }, t: { x: 286, y: 90 } };
type Flow = Record<Pipe, number>;
const ZERO: Flow = { sa: 0, sb: 0, ab: 0, at: 0, bt: 0 };

const ROUTES = [
  { id: "zig", label: "s → a → b → t", pipes: ["sa", "ab", "bt"] as Pipe[] },
  { id: "top", label: "s → a → t", pipes: ["sa", "at"] as Pipe[] },
  { id: "bottom", label: "s → b → t", pipes: ["sb", "bt"] as Pipe[] },
];
const total = (f: Flow) => f.at + f.bt;
const stuck = (f: Flow) => ROUTES.every((r) => r.pipes.some((p) => f[p] >= 1));
const name = (p: Pipe) => `${p[0]}→${p[1]}`;

export default function UndoABadPush({ slug }: { slug: string }) {
  const [f, setF] = useState<Flow>(ZERO);
  const [note, setNote] = useState("");
  const [wasStuck, setWasStuck] = useState(false);
  const [usedBack, setUsedBack] = useState(false);
  const tot = total(f);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Pipes s–a, s–b, a–b, a–t, b–t each carry 1 unit. You send 1 unit along s → a → b → t, then keep adding water along any route with room, never taking water back. How much reaches t in the end?",
        options: ["1: stuck", "2", "3"],
        answer: 0,
      }}
      exploreHint="Push s → a → b → t. Try the other routes. Then find a second unit."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Pushing s → a → b → t first used the a–b pipe and left every forward route blocked: stuck at 1, so adding
            water without ever taking any back falls short. A new route may run backwards along a pipe that carries water.
            Going back along a–b undid the zig-zag and opened s → b → a → t: total <strong>2</strong>.
          </p>
          <p>
            Both pipes out of s are now full. Those two pipes are a cut: cut them and s is cut off from t. No flow is bigger
            than the smallest cut, so nothing can beat 2. Letting a new
            route cancel an earlier push is how the Ford–Fulkerson method fixes greedy mistakes. When no route is left,
            the flow equals the smallest cut.
          </p>
          <p className="muted">The best flow sometimes means taking water back.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["stuck-at-1", "two-by-sending-back"]}>
          {(reach) => {
            const push = (r: (typeof ROUTES)[number]) => {
              if (locked) return;
              const full = r.pipes.find((p) => f[p] >= 1);
              if (full) {
                setNote(`${r.label}: pipe ${name(full)} is full.${stuck(f) ? " No forward route left." : ""}`);
                return;
              }
              const next = { ...f };
              r.pipes.forEach((p) => next[p]++);
              setF(next);
              const st = stuck(next) && total(next) < 2;
              setNote(st ? `Total ${total(next)}. Every forward route has a full pipe. A route may go backwards along a loaded pipe.` : `Pushed 1 unit along ${r.label}.`);
              if (st) {
                setWasStuck(true);
                reach("stuck-at-1");
              }
            };
            const sendBack = () => {
              if (locked || f.ab < 1 || f.sb >= 1 || f.at >= 1) return;
              const next = { ...f, ab: f.ab - 1, sb: f.sb + 1, at: f.at + 1 };
              setF(next);
              setUsedBack(true);
              setNote("Water went s → b, back along a–b, then a → t: total 2.");
              if (wasStuck && total(next) === 2) reach("two-by-sending-back");
            };
            const reset = () => {
              if (locked) return;
              setF(ZERO);
              setWasStuck(false);
              setUsedBack(false);
              setNote("Pipes empty.");
            };

            const msg = locked ? "Make a prediction to start." : note || "Tap a route to push one unit of water.";
            const line = (p: Pipe) => {
              const A = P[p[0] as keyof typeof P];
              const B = P[p[1] as keyof typeof P];
              const on = f[p] >= 1;
              const back = p === "ab" && usedBack && !on;
              return (
                <g key={p}>
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--line)" strokeWidth={12} strokeLinecap="round" />
                  <line
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke={on ? "var(--domain)" : back ? "var(--warn)" : "transparent"}
                    strokeWidth={on ? 8 : 3}
                    strokeDasharray={back ? "5 4" : undefined}
                    strokeLinecap="round"
                    markerEnd={on ? "url(#flowArrow)" : undefined}
                  />
                  <text x={(A.x + B.x) / 2 + (p === "ab" ? 10 : 0)} y={(A.y + B.y) / 2 - 9} className={s.cap}>
                    {f[p]}/1
                  </text>
                </g>
              );
            };

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg viewBox="0 0 320 180" className="stage-svg" role="img" aria-label={`Total flow ${tot}`}>
                  <defs>
                    <marker id="flowArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="3" markerHeight="3" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--domain)" />
                    </marker>
                  </defs>
                  {PIPES.map(line)}
                  {tot === 2 && (
                    <>
                      <path d="M 80 10 C 60 60, 60 120, 80 172" stroke="var(--good)" strokeDasharray="5 4" fill="none" strokeWidth={1.5} />
                      <text x={84} y={176} className={s.cut}>
                        cut: 2 pipes leave s
                      </text>
                    </>
                  )}
                  {(Object.keys(P) as (keyof typeof P)[]).map((k) => (
                    <g key={k}>
                      <circle cx={P[k].x} cy={P[k].y} r={16} fill={k === "s" || k === "t" ? "var(--domain)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={1.2} />
                      <text x={P[k].x} y={P[k].y + 5} textAnchor="middle" className={s.node}>
                        {k}
                      </text>
                    </g>
                  ))}
                  <text x={312} y={16} textAnchor="end" className={`${s.total} ${tot === 2 ? s.good : ""}`}>
                    Total {tot}
                  </text>
                </svg>
                <div className={s.routes}>
                  <Control disabled={locked || tot === 0} onClick={reset}>
                    Empty the pipes
                  </Control>
                  {ROUTES.map((r) => (
                    <Control key={r.id} className={r.id === "zig" ? "active" : ""} disabled={locked} aria-label={`Push along ${r.label}`} onClick={() => push(r)}>
                      {r.label}
                    </Control>
                  ))}
                  <Control disabled={locked || f.ab < 1 || f.sb >= 1 || f.at >= 1} onClick={sendBack}>
                    Route s → b → a → t (back along a–b)
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
