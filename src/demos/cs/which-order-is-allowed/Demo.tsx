"use client";

// Topological order. Four tasks with arrows A→B, A→C, B→D, C→D ("X before Y"). The learner
// places tasks in a line, but only a task whose arrows-in are all already placed. A full line is
// a valid order and is recorded. Swap buttons between neighbours in the line try a swap: refused
// if it breaks an arrow. Adding D→A makes a loop: every task waits for another and nothing can go
// first. Valid orders are counted by brute force over all 24 orders (VALID).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type T = "A" | "B" | "C" | "D";
const TASKS: T[] = ["A", "B", "C", "D"];
const BASE: [T, T][] = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]];
const LOOP: [T, T] = ["D", "A"];
const POS: Record<T, { x: number; y: number }> = { A: { x: 40, y: 70 }, B: { x: 150, y: 28 }, C: { x: 150, y: 112 }, D: { x: 260, y: 70 } };

function perms<X>(xs: X[]): X[][] {
  if (xs.length <= 1) return [xs];
  return xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p]));
}
const obeys = (order: T[], arrows: [T, T][]) => arrows.every(([a, b]) => order.indexOf(a) < order.indexOf(b));
const VALID = perms(TASKS).filter((o) => obeys(o, BASE));
const VALID_COUNT = VALID.length; // 2
const ruleText = BASE.map(([a, b]) => `${a} before ${b}`).join(", ");

export default function WhichOrderIsAllowed({ slug }: { slug: string }) {
  const [line, setLine] = useState<T[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [loop, setLoop] = useState(false);
  const [sawLoop, setSawLoop] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const arrows: [T, T][] = loop ? [...BASE, LOOP] : BASE;
  const waitsFor = (t: T, placed: T[]) => arrows.filter(([a, b]) => b === t && !placed.includes(a)).map(([a]) => a);
  const ready = (placed: T[]) => TASKS.filter((t) => !placed.includes(t) && waitsFor(t, placed).length === 0);
  const full = line.length === TASKS.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Tasks: ${ruleText}. How many orders of all four tasks obey every rule?`,
        options: ["1", String(VALID_COUNT), "4"],
        answer: 1,
      }}
      exploreHint="Build an order, then find another. Then add the arrow D before A."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You found {found.map((f) => f.split("").join(" ")).join(" and ")}.
            {sawLoop ? " With D before A added, every task waited for another, so nothing could go first." : ""}
          </p>
          <p>
            The rule that built them: take any task with nothing left before it. After A, both B and C are free, and
            that one choice is the only freedom, so there are exactly <strong>{VALID_COUNT}</strong> orders. A loop
            leaves no task free, so it has no order at all.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["two-orders", "cycle"]}>
          {(reach) => {
            const record = (order: T[]) => {
              const key = order.join("");
              const f = found.includes(key) ? found : [...found, key];
              setFound(f);
              if (f.length >= 2) reach("two-orders");
              return f.length;
            };
            const place = (t: T) => {
              if (locked) return;
              if (line.includes(t)) return setNote(`${t} is already in the line.`);
              if (full) return setNote("The line is full. Swap two, or clear it.");
              const w = waitsFor(t, line);
              if (w.length) return setNote(`${t} waits for ${w.join(" and ")}.`);
              const next = [...line, t];
              setLine(next);
              if (next.length === TASKS.length) {
                const n = record(next);
                setNote(`${next.join(" ")} works. Orders found: ${n}.`);
              } else {
                const r = ready(next);
                setNote(`${t} placed. Free now: ${r.join(", ") || "none"}.`);
              }
            };
            const swap = (i: number) => {
              if (locked || !full) return;
              const next = [...line];
              [next[i], next[i + 1]] = [next[i + 1], next[i]];
              const broken = arrows.find(([a, b]) => a === line[i] && b === line[i + 1]);
              if (broken) return setNote(`No: ${broken[0]} must come before ${broken[1]}.`);
              setLine(next);
              const n = record(next);
              setNote(`${next.join(" ")} works too. Orders found: ${n}.`);
            };
            const clear = () => {
              if (locked || line.length === 0) return;
              setLine([]);
              setNote(null);
            };
            const toggleLoop = () => {
              if (locked) return;
              const on = !loop;
              setLoop(on);
              setLine([]);
              if (on) {
                setSawLoop(true);
                reach("cycle");
                setNote("A waits for D, D for B and C, they wait for A. Nothing is free.");
              } else setNote("Arrow D before A removed.");
            };
            const msg = locked
              ? "Make a prediction to start."
              : note ?? `Arrow X → Y: X must come before Y. Free now: ${ready(line).join(", ")}.`;
            const free = ready(line);
            return (
              <div className={s.wrap}>
                <Control className={s.clear} disabled={locked || line.length === 0} onClick={clear}>Clear the line</Control>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox="0 0 300 150" className="stage-svg" role="img"
                  aria-label={`Tasks with arrows ${arrows.map(([a, b]) => `${a} to ${b}`).join(", ")}`}>
                  <defs>
                    <marker id="topo-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" className={s.head} />
                    </marker>
                    <marker id="topo-head-bad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headBad} />
                    </marker>
                  </defs>
                  {BASE.map(([a, b]) => {
                    const p = POS[a], q = POS[b];
                    const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy);
                    return <line key={a + b} x1={p.x + (dx / d) * 20} y1={p.y + (dy / d) * 20} x2={q.x - (dx / d) * 22} y2={q.y - (dy / d) * 22}
                      className={s.arrow} markerEnd="url(#topo-head)" />;
                  })}
                  {loop && (
                    <path d={`M ${POS.D.x} ${POS.D.y + 20} Q 150 180 ${POS.A.x + 6} ${POS.A.y + 22}`} className={s.loop} markerEnd="url(#topo-head-bad)" />
                  )}
                  {TASKS.map((t) => (
                    <g key={t}>
                      <circle cx={POS[t].x} cy={POS[t].y} r={18}
                        className={`${s.node} ${line.includes(t) ? s.placed : !locked && free.includes(t) ? s.free : ""}`} />
                      <text x={POS[t].x} y={POS[t].y + 6} className={s.label}>{t}</text>
                    </g>
                  ))}
                </svg>
                <div className={s.tasks}>
                  {TASKS.map((t) => (
                    <Control key={t} aria-label={`Place ${t}`} disabled={locked}
                      className={`${s.task} ${line.includes(t) ? "active" : ""}`} onClick={() => place(t)}>
                      {t}
                    </Control>
                  ))}
                </div>
                <div className={s.line} aria-label={`Line: ${line.join(" ") || "empty"}`}>
                  {TASKS.map((_, i) => (
                    <span key={i} className={s.cellGroup}>
                      <span className={`${s.slot} ${i < line.length ? s.filled : ""}`}>{line[i] ?? ""}</span>
                      {i < TASKS.length - 1 && (
                        <Control className={s.swap} aria-label={`Swap places ${i + 1} and ${i + 2}`} disabled={locked || !full}
                          onClick={() => swap(i)}>
                          ⇄
                        </Control>
                      )}
                    </span>
                  ))}
                </div>
                <p className={s.found}>{locked ? "" : `Orders found: ${found.length ? found.map((f) => f.split("").join(" ")).join(" · ") : "none yet"}`}</p>
                <div className={s.bottom}>
                  <Control disabled={locked} onClick={toggleLoop}>{loop ? "Remove D before A" : "Add arrow: D before A"}</Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
