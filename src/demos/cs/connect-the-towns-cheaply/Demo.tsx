"use client";

// Kruskal on four towns. Six possible cables, listed cheapest first: AB 1, CD 1, BC 2, BD 3, AC 4,
// AD 5. The learner taps the cheapest cable not yet decided; it is laid unless it would close a loop
// (then it turns red and is refused). Laid cables are drawn solid on the map, refused ones dashed red.
// The minimum (4) is checked by brute force over every 3-cable set that joins all four towns.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Town = "A" | "B" | "C" | "D";
type Cable = { a: Town; b: Town; cost: number };
const TOWNS: Town[] = ["A", "B", "C", "D"];
const CABLES_RAW: Cable[] = [
  { a: "A", b: "B", cost: 1 },
  { a: "B", b: "C", cost: 2 },
  { a: "C", b: "D", cost: 1 },
  { a: "A", b: "D", cost: 5 },
  { a: "A", b: "C", cost: 4 },
  { a: "B", b: "D", cost: 3 },
];
const CABLES = [...CABLES_RAW].sort((x, y) => x.cost - y.cost); // stable: AB, CD, BC, BD, AC, AD
const name = (c: Cable) => `${c.a}${c.b}`;
const POS: Record<Town, { x: number; y: number }> = { A: { x: 50, y: 30 }, B: { x: 250, y: 30 }, C: { x: 250, y: 150 }, D: { x: 50, y: 150 } };

/** Union-find over a set of laid cables: does a–b already connect? */
function joined(laid: Cable[], a: Town, b: Town) {
  const seen = new Set<Town>([a]);
  const stack: Town[] = [a];
  while (stack.length) {
    const t = stack.pop()!;
    for (const c of laid) {
      const o = c.a === t ? c.b : c.b === t ? c.a : null;
      if (o && !seen.has(o)) {
        seen.add(o);
        stack.push(o);
      }
    }
  }
  return seen.has(b);
}
const allJoined = (laid: Cable[]) => TOWNS.every((t) => joined(laid, "A", t));
function bruteMin() {
  let best = Infinity;
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) for (let k = j + 1; k < 6; k++) {
    const set = [CABLES[i], CABLES[j], CABLES[k]];
    if (allJoined(set)) best = Math.min(best, set.reduce((n, c) => n + c.cost, 0));
  }
  return best;
}
const MIN = bruteMin(); // 4
const LIST = CABLES_RAW.map((c) => `${name(c)} ${c.cost}`).join(", ");

export default function ConnectTheTownsCheaply({ slug }: { slug: string }) {
  const [laid, setLaid] = useState<Cable[]>([]);
  const [refused, setRefused] = useState<Cable[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const decided = (c: Cable) => laid.includes(c) || refused.includes(c);
  const open = CABLES.filter((c) => !decided(c));
  const total = laid.reduce((n, c) => n + c.cost, 0);
  const connected = allJoined(laid);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Possible cables between four towns, with costs: ${LIST}. What is the lowest total cost that connects all four towns?`,
        options: [String(MIN), "5", "7"],
        answer: 0,
      }}
      exploreHint="Take the cheapest cable left, unless it closes a loop."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You laid {laid.map((c) => `${name(c)} ${c.cost}`).join(", ")}: total <strong>{total}</strong>, all four towns
            joined.{refused.length ? ` ${refused.map(name).join(", ")} would each have closed a loop, so they were refused.` : ""}
          </p>
          <p>
            Joining four towns takes at least 3 cables, and the three cheapest cost 1 + 1 + 2 = {MIN}, so nothing beats
            it. Cheapest first, skipping loops, always gives the cheapest network (Kruskal&apos;s algorithm): unlike
            coins, a skipped loop never blocks a better choice later.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-cable", "connected"]}>
          {(reach) => {
            const tap = (c: Cable) => {
              if (locked || decided(c)) return;
              const cheapest = open[0];
              if (c.cost > cheapest.cost) {
                setNote(`Cheapest first: ${name(cheapest)} costs ${cheapest.cost}, less than ${c.cost}.`);
                return;
              }
              if (joined(laid, c.a, c.b)) {
                setRefused([...refused, c]);
                setNote(`${name(c)} refused: ${c.a} and ${c.b} are already joined, so it would close a loop.`);
                return;
              }
              const next = [...laid, c];
              setLaid(next);
              reach("first-cable");
              const n = next.reduce((m, x) => m + x.cost, 0);
              if (allJoined(next)) {
                reach("connected");
                setNote(`${name(c)} laid. All four towns joined for ${n}.`);
              } else setNote(`${name(c)} laid. Total so far: ${n}.`);
            };
            const reset = () => {
              if (locked || (laid.length === 0 && refused.length === 0)) return;
              setLaid([]);
              setRefused([]);
              setNote(null);
            };
            const msg = locked ? "Make a prediction to start." : note ?? "Tap the cheapest cable left. A cable that closes a loop is refused.";
            return (
              <div className={s.wrap}>
                <Control className={s.reset} disabled={locked || (laid.length === 0 && refused.length === 0)} onClick={reset}>
                  Start again
                </Control>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox="0 0 300 180" className="stage-svg" role="img"
                  aria-label={`Four towns. Laid: ${laid.map(name).join(", ") || "none"}. Refused: ${refused.map(name).join(", ") || "none"}.`}>
                  {CABLES.map((c) => {
                    const p = POS[c.a], q = POS[c.b];
                    const st = laid.includes(c) ? s.laid : refused.includes(c) ? s.refused : s.possible;
                    const diag = p.x !== q.x && p.y !== q.y;
                    const t = diag ? 0.3 : 0.5; // diagonals cross in the middle, so label them nearer their first town
                    const mx = p.x + (q.x - p.x) * t, my = p.y + (q.y - p.y) * t;
                    const off = 0;
                    return (
                      <g key={name(c)}>
                        <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={st} />
                        <rect x={mx + off - 11} y={my - 10} width={22} height={18} rx={4} className={s.tagBox} />
                        <text x={mx + off} y={my + 4} className={s.tag}>{c.cost}</text>
                      </g>
                    );
                  })}
                  {TOWNS.map((t) => (
                    <g key={t}>
                      <circle cx={POS[t].x} cy={POS[t].y} r={17} className={`${s.town} ${connected && !locked ? s.joined : ""}`} />
                      <text x={POS[t].x} y={POS[t].y + 6} className={s.townLabel}>{t}</text>
                    </g>
                  ))}
                </svg>
                <div className={s.list}>
                  {CABLES.map((c) => (
                    <Control key={name(c)} aria-label={`Cable ${name(c)}, cost ${c.cost}`} disabled={locked || decided(c)}
                      className={`${s.cable} ${laid.includes(c) ? "active" : ""} ${refused.includes(c) ? s.cableRefused : ""}`}
                      onClick={() => tap(c)}>
                      {name(c)} {c.cost}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Cables laid" value={locked ? "–" : laid.length} />
                  <Readout label="Total cost" value={locked ? "–" : total} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
