"use client";

// Next bigger number to the right, two ways, driven by one "Next number" control. Scan: from each position,
// compare rightwards until a bigger value (each comparison is a tick, so the cost is a triangle). Stack: the new
// number is compared with the stack top, pops every smaller top (each pop answers that value), then is pushed
// (each comparison is a tick, so the cost is a thin column). Comparison convention (claim c2): a stack comparison
// is one test of the new value against the current top; the scan stops at the first bigger value.
// 9 8 ... 1: scan 36, stack 8. 8 ... 1 9 (added by the spec): scan 36, stack 15, eight pops in one press.
// Spec: company/design/specs/each-element-pops-once.md.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LISTS = [
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [8, 7, 6, 5, 4, 3, 2, 1, 9],
];
const CHIP = ["9 8 … 1", "8 … 1 9"];

type Step = { scan: number; stack: number; popped: number[]; after: number[] }; // indices
type Run = { steps: Step[]; scanTotal: number; stackTotal: number; pops: number };

function run(a: number[]): Run {
  const steps: Step[] = [];
  const st: number[] = [];
  for (let i = 0; i < a.length; i++) {
    let scan = 0;
    for (let j = i + 1; j < a.length; j++) {
      scan += 1;
      if (a[j] > a[i]) break;
    }
    let stack = 0;
    const popped: number[] = [];
    while (st.length) {
      stack += 1;
      if (a[st[st.length - 1]] < a[i]) popped.push(st.pop() as number);
      else break;
    }
    st.push(i);
    steps.push({ scan, stack, popped, after: [...st] });
  }
  const sum = (f: (x: Step) => number) => steps.reduce((t, x) => t + f(x), 0);
  return { steps, scanTotal: sum((x) => x.scan), stackTotal: sum((x) => x.stack), pops: sum((x) => x.popped.length) };
}
const RUNS = LISTS.map(run);
const N = LISTS[0].length;

const CELL = 36;
const LX = 18;
const ROW = 18;
const PANEL_Y = 92;
const STACK_BOTTOM = PANEL_Y + 14 + N * ROW;

type Done = { scan: number; stack: number };

export default function EachElementPopsOnce({ slug }: { slug: string }) {
  const [list, setList] = useState(0);
  const [k, setK] = useState(0); // numbers fed in so far
  // While a replay shows the latest number's pops one at a time: how many of its pops are shown so far.
  // null means the latest number is complete (all its pops done and it is pushed).
  const [pk, setPk] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [table, setTable] = useState<(Done | null)[]>([null, null]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const a = LISTS[list];
  const R = RUNS[list];
  const finished = k >= N;
  const done = R.steps.slice(0, k);
  // The latest number's step, cut to the pops shown so far (pk), so the stack empties one box at a time.
  const shown = (x: Step, i: number): Step =>
    i === k - 1 && pk !== null ? { ...x, popped: x.popped.slice(0, pk), stack: pk } : x;
  const seen = done.map(shown);
  const scanSoFar = done.reduce((t, x) => t + x.scan, 0);
  const stackSoFar = seen.reduce((t, x) => t + x.stack, 0);
  const before = k > 1 ? R.steps[k - 2].after : [];
  const stackNow = k === 0 ? [] : pk !== null ? before.slice(0, before.length - pk) : R.steps[k - 1].after;
  const answer: (number | null)[] = Array(N).fill(null);
  seen.forEach((x, i) => x.popped.forEach((p) => (answer[p] = a[i])));

  const d0 = RUNS[0];
  const d1 = RUNS[1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `For each of 9 numbers in descending order (${LISTS[0].join(" ")}), find the next bigger number to its right (there is none). Scanning right from each position costs ${d0.scanTotal} comparisons. Keeping a stack of values still waiting (each new number pops the smaller ones on top, then is pushed): how many comparisons?`,
        options: [String(d0.scanTotal), "18", String(d0.stackTotal)],
        answer: 2,
      }}
      exploreHint="Feed in the numbers and watch both counts."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            On {CHIP[0]}, scanning took {d0.scanTotal} comparisons and the stack {d0.stackTotal}: each new number met one
            bigger top (a hollow tick) and was pushed.
            {table[1]
              ? ` On ${CHIP[1]}, look at the 9's row: ${d1.pops} solid ticks marked "${d1.pops} pops", one for each waiting number, while the stack emptied box by box down to the 9. That run cost ${d1.stackTotal} in all, still against ${d1.scanTotal}.`
              : ""}
          </p>
          <p>
            A number waits on the stack until a bigger one arrives, and then it is popped and answered, exactly once. Every
            stack comparison either pops a number or ends that number&apos;s turn, so 9 numbers cost at most 9 pushes and 9
            pops: the work grows like n, not n².
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["descending-done", "pops-seen"]}>
          {(reach) => {
            const finish = (l: number) => {
              setTable((t) => t.map((x, i) => (i === l ? { scan: RUNS[l].scanTotal, stack: RUNS[l].stackTotal } : x)));
              reach(l === 0 ? "descending-done" : "pops-seen");
            };
            const replay = (l: number, from: number) => {
              if (timer.current) clearInterval(timer.current);
              const reduced =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduced || from >= N) {
                setK(N);
                setPk(null);
                finish(l);
                return;
              }
              // One frame per number; a number that pops gets a frame on arrival and one per pop (8 ... 1 9: 18 frames, ~400 ms).
              const frames: [number, number | null][] = [];
              for (let i = from; i < N; i++) {
                const np = RUNS[l].steps[i].popped.length;
                if (np > 0) for (let q = 0; q <= np; q++) frames.push([i + 1, q]);
                frames.push([i + 1, null]);
              }
              setBusy(true);
              let f = 0;
              timer.current = setInterval(() => {
                const [kk, q] = frames[f];
                setK(kk);
                setPk(q);
                f += 1;
                if (f >= frames.length) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setBusy(false);
                  finish(l);
                }
              }, 22);
            };
            const next = () => {
              if (locked || busy || finished) return;
              const kk = k + 1;
              setK(kk);
              setPk(null);
              if (kk >= N) finish(list);
            };
            const rest = () => {
              if (locked || busy || finished) return;
              replay(list, k);
            };
            const pick = (l: number) => {
              if (locked || busy || l === list) return;
              setList(l);
              setK(0);
              setPk(null);
              if (finished) replay(l, 0);
            };

            const caret = k > 0 ? k - 1 : null;
            return (
              <div className={s.wrap}>
                <p className={s.rule}>Stack rule: a new number pops each smaller number waiting on top, then waits too.</p>
                <svg
                  viewBox={`0 0 360 ${STACK_BOTTOM + 6}`}
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={`List ${CHIP[list]}: scan ${scanSoFar} comparisons, stack ${stackSoFar} comparisons, ${done.reduce((t, x) => t + x.popped.length, 0)} pops`}
                  data-fed={k}
                >
                  {a.map((v, i) => {
                    const x = LX + i * CELL;
                    const ans = answer[i];
                    return (
                      <g key={i}>
                        <rect
                          x={x + 2}
                          y={4}
                          width={CELL - 4}
                          height={30}
                          rx={5}
                          fill="var(--bg-2)"
                          stroke={i === caret ? "var(--fg)" : "var(--line)"}
                          strokeWidth={i === caret ? 2.5 : 1}
                        />
                        <text x={x + CELL / 2} y={25} textAnchor="middle" className={s.v}>
                          {v}
                        </text>
                        {i === caret && <path d={`M${x + CELL / 2},38 l-5,7 h10 z`} fill="var(--fg)" />}
                        <text
                          x={x + CELL / 2}
                          y={60}
                          textAnchor="middle"
                          className={ans !== null ? s.ansGood : s.ans}
                        >
                          {ans !== null ? `${ans}✓` : finished ? "none" : "?"}
                        </text>
                      </g>
                    );
                  })}

                  <text x={6} y={PANEL_Y} className={s.head}>
                    Scan: {k === 0 ? "?" : scanSoFar}
                  </text>
                  <text x={186} y={PANEL_Y} className={s.head}>
                    Stack: {k === 0 ? "?" : stackSoFar}
                  </text>
                  <line x1={180} x2={180} y1={PANEL_Y - 12} y2={STACK_BOTTOM} stroke="var(--line)" />

                  {seen.map((x, i) => {
                    const y = PANEL_Y + 14 + i * ROW;
                    const np = x.popped.length;
                    return (
                      <g key={`r${i}`}>
                        <text x={14} y={y + 10} textAnchor="middle" className={s.lab}>
                          {a[i]}
                        </text>
                        {Array.from({ length: x.scan }, (_, t) => (
                          <rect key={t} x={24 + t * 8} y={y + 1} width={6} height={10} fill="var(--muted)" />
                        ))}
                        <text x={236} y={y + 10} textAnchor="middle" className={s.lab}>
                          {a[i]}
                        </text>
                        {Array.from({ length: x.stack }, (_, t) => (
                          <rect
                            key={t}
                            x={246 + t * 8}
                            y={y + 1}
                            width={6}
                            height={10}
                            fill={t < np ? "var(--domain)" : "none"}
                            stroke="var(--domain)"
                            strokeWidth={1}
                          />
                        ))}
                        {np > 0 && (
                          <text x={248 + x.stack * 8} y={y + 10} className={s.pop}>
                            {np === 1 ? "1 pop" : `${np} pops`}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {stackNow.map((idx, j) => (
                    <g key={`s${idx}`}>
                      <rect
                        x={188}
                        y={STACK_BOTTOM - (j + 1) * ROW}
                        width={30}
                        height={ROW - 2}
                        rx={3}
                        fill="color-mix(in srgb, var(--domain) 30%, var(--bg-2))"
                        stroke="var(--fg)"
                        strokeWidth={1}
                      />
                      <text x={203} y={STACK_BOTTOM - (j + 1) * ROW + 12} textAnchor="middle" className={s.sv}>
                        {a[idx]}
                      </text>
                    </g>
                  ))}
                  <line x1={186} x2={220} y1={STACK_BOTTOM} y2={STACK_BOTTOM} stroke="var(--fg)" strokeWidth={2} />
                </svg>
                <Row>
                  <Readout label={CHIP[0]} value={table[0] ? `scan ${table[0].scan} · stack ${table[0].stack}` : "scan ? · stack ?"} />
                  <Readout label={CHIP[1]} value={table[1] ? `scan ${table[1].scan} · stack ${table[1].stack}` : "scan ? · stack ?"} />
                </Row>
                <Row>
                  <Control className="tap" disabled={locked || busy || finished} onClick={next}>
                    Next number
                  </Control>
                  <Control className="tap" disabled={locked || busy || finished} onClick={rest}>
                    All the rest
                  </Control>
                </Row>
                <Row>
                  <span className={s.group}>List</span>
                  {CHIP.map((c, i) => (
                    <Control
                      key={c}
                      className={`tap ${list === i ? "active" : ""}`}
                      disabled={locked || busy || list === i}
                      aria-pressed={list === i}
                      onClick={() => pick(i)}
                    >
                      {c}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
