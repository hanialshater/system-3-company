"use client";

// Two lanes sort the same four cards by grade (A before B). Left: slide each card left past
// higher grades only (insertion). Right: swap the first smallest grade to the front (selection).
// Each step adds one row to the lane's trail. Rows are computed once by code that mirrors the
// node check recorded in meta.json. No randomness.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Card = { name: string; grade: "A" | "B"; pos: number };
const START: Card[] = [
  { name: "Ana", grade: "B", pos: 1 },
  { name: "Ben", grade: "A", pos: 2 },
  { name: "Cal", grade: "B", pos: 3 },
  { name: "Dee", grade: "A", pos: 4 },
];
const rank = (c: Card) => (c.grade === "A" ? 0 : 1);

type Row = { order: Card[]; moved: string[]; tag: string; note: string; passed: string[]; label: string };

function insertion(): Row[] {
  const a = [...START];
  const rows: Row[] = [];
  for (let i = 1; i < a.length; i++) {
    const mover = a[i].name;
    let j = i;
    while (j > 0 && rank(a[j - 1]) > rank(a[j])) {
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      j--;
    }
    const stays = j === i;
    rows.push({
      order: [...a],
      moved: stays ? [] : [mover],
      tag: "",
      note: stays ? `${mover} stays` : "",
      passed: [],
      label: `Step ${i}: ${a.map((c) => c.name).join(", ")}`,
    });
  }
  return rows;
}

function selection(): Row[] {
  const a = [...START];
  const rows: Row[] = [];
  for (let i = 0; i < a.length - 1; i++) {
    let m = i;
    for (let k = i + 1; k < a.length; k++) if (rank(a[k]) < rank(a[m])) m = k; // first smallest
    const before = [...a];
    [a[i], a[m]] = [a[m], a[i]];
    let tag = "";
    let note = "";
    let passed: string[] = [];
    let moved: string[] = [];
    if (m === i) note = "already smallest";
    else {
      moved = [a[i].name, a[m].name];
      // The card sent back (from slot i to slot m) jumps over the cards between; any tie passed?
      for (let k = i + 1; k < m; k++) {
        if (before[k].grade === before[i].grade) {
          tag = `${before[i].name} passed ${before[k].name}`;
          passed = [before[i].name, before[k].name];
        }
      }
    }
    rows.push({
      order: [...a],
      moved,
      tag,
      note,
      passed,
      label: `Swap ${i + 1}: ${a.map((c) => c.name).join(", ")}${tag ? ". " + tag : ""}`,
    });
  }
  return rows;
}

const LEFT = insertion();
const RIGHT = selection();
const START_ROW: Row = { order: START, moved: [], tag: "", note: "", passed: [], label: "Start" };

const CW = 38;
const CH = 34;
const SLOT = 43;
const PITCH = 46;
const W = 4 * SLOT + 4;

function Lane({ rows, count, name }: { rows: Row[]; count: number; name: string }) {
  const all = [START_ROW, ...rows.slice(0, count)];
  const H = 3 * PITCH + CH + 14;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${name} trail`}>
      <defs>
        <pattern id={`h-${name}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="var(--bg-2)" />
          <rect width="2.4" height="5" fill="var(--warn-fill)" />
        </pattern>
        <marker id={`ar-${name}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="var(--fg)" />
        </marker>
      </defs>
      {all.map((row, r) => {
        const y = 2 + r * PITCH;
        const prev = r > 0 ? all[r - 1] : null;
        return (
          <g key={r} role="group" aria-label={row.label}>
            {row.order.map((c, slot) => {
              const x = 2 + slot * SLOT + (SLOT - CW) / 2;
              const bad = row.passed.includes(c.name);
              const B = c.grade === "B";
              const solid = c.name === "Ana";
              const fill = !B ? "none" : solid ? "var(--warn-fill)" : `url(#h-${name})`;
              const cx = x + CW / 2;
              return (
                <g key={c.name}>
                  <rect
                    x={x}
                    y={y}
                    width={CW}
                    height={CH}
                    rx={5}
                    fill={fill}
                    stroke={bad ? "var(--bad)" : B ? "var(--warn)" : "var(--line)"}
                    strokeWidth={bad ? 2.5 : 1.2}
                  />
                  <text x={cx} y={y + 11} textAnchor="middle" className={solid ? s.nmB : s.nm}>
                    {c.name}
                  </text>
                  <text
                    x={x + 11}
                    y={y + 28}
                    textAnchor="middle"
                    className={solid ? s.grB : s.gr}
                    style={B && !solid ? { paintOrder: "stroke", stroke: "var(--bg-2)", strokeWidth: 3 } : undefined}
                  >
                    {c.grade}
                  </text>
                  <circle cx={x + CW - 9} cy={y + CH - 9} r={6.5} fill="var(--fg)" />
                  <text x={x + CW - 9} y={y + CH - 6} textAnchor="middle" className={s.bd}>
                    {c.pos}
                  </text>
                </g>
              );
            })}
            {prev &&
              row.moved.map((nm) => {
                const from = prev.order.findIndex((c) => c.name === nm);
                const to = row.order.findIndex((c) => c.name === nm);
                if (from === to) return null;
                const x1 = 2 + from * SLOT + SLOT / 2;
                const x2 = 2 + to * SLOT + SLOT / 2;
                return (
                  <line
                    key={nm}
                    x1={x1}
                    y1={y - PITCH + CH + 1}
                    x2={x2}
                    y2={y - 1}
                    stroke="var(--fg)"
                    strokeWidth={1.3}
                    markerEnd={`url(#ar-${name})`}
                  />
                );
              })}
            {row.tag && (
              <text x={W / 2} y={y + CH + 10} textAnchor="middle" className={s.tagt}>
                {row.tag}
              </text>
            )}
            {row.note && !row.tag && (
              <text x={W / 2} y={y + CH + 10} textAnchor="middle" className={s.note}>
                {row.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const inB = (rows: Row[]) =>
  rows[rows.length - 1].order.filter((c) => c.grade === "B").map((c) => c.name);

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [n, setN] = useState({ l: 0, r: 0 });
  const ref = useRef({ l: 0, r: 0 });

  // Swap 2 is the moment a tie is thrown past its equal: the learner makes it with the swap button.
  const KEY_SWAP = RIGHT.findIndex((row) => row.passed.length > 0) + 1; // 2
  const sync = () => {
    setN({ ...ref.current });
    if (ref.current.l === 3) reach("slide-done");
    if (ref.current.r >= KEY_SWAP) reach("swap-passed");
  };
  const bump = (lane: "l" | "r") => {
    if (ref.current[lane] >= 3) return;
    ref.current[lane]++;
    sync();
  };
  // Finish the slide lane and bring the swap lane up to (not past) the key swap.
  const fastForward = () => {
    ref.current.l = 3;
    ref.current.r = Math.max(ref.current.r, KEY_SWAP - 1);
    sync();
  };

  const doneL = n.l === 3;
  const doneR = n.r >= KEY_SWAP; // the B order is final after the key swap
  const result = (rows: Row[], done: boolean) => {
    if (!done) return <p className={s.result}>Inside B: ?</p>;
    const names = inB(rows);
    const kept = names.join(",") === "Ana,Cal";
    return (
      <p className={`${s.result} ${kept ? s.kept : s.lost}`}>
        Inside B: {names.join(", ")} · name order {kept ? "kept" : "lost"}
      </p>
    );
  };

  return (
    <div className={s.wrap}>
      <p className={s.model}>Same four cards. Sort by grade only, A before B.</p>
      <div className={s.lanes}>
        <div className={s.lane}>
          <p className={s.head}>Slide left past higher grades</p>
          <Lane rows={LEFT} count={n.l} name="slide" />
          {result(LEFT, doneL)}
        </div>
        <div className={s.lane}>
          <p className={s.head}>Swap smallest grade to front</p>
          <Lane rows={RIGHT} count={n.r} name="swap" />
          {result(RIGHT, doneR)}
        </div>
      </div>
      <Control className={`${s.tap} ${s.full}`} disabled={locked || (doneL && n.r >= KEY_SWAP - 1)} onClick={fastForward}>
        Fast-forward to swap {KEY_SWAP}
      </Control>
      <div className={s.btns}>
        <Control className={s.tap} disabled={locked || doneL} onClick={() => bump("l")}>
          Slide next card
        </Control>
        <Control className={s.tap} disabled={locked || n.r === 3} onClick={() => bump("r")}>
          {n.r === KEY_SWAP - 1 ? `Swap ${KEY_SWAP}: watch Ana` : "Swap smallest to front"}
        </Control>
      </div>
    </div>
  );
}

export default function TiesKeepTheirOrder({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Four students, listed alphabetically: Ana (B), Ben (A), Cal (B), Dee (A). You sort them by grade, A before B. Inside grade B, who comes first?",
        options: ["Ana, as before", "Cal", "It depends on the sorting method"],
        answer: 2,
      }}
      exploreHint="Fast-forward, then make swap 2 yourself and watch Ana. Read the Bs."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Both lanes put the As before the Bs. Sliding never moved a card past an equal one, so the Bs kept name order:
            Ana, Cal. Your swap 2 sent Ana from slot 2 to the end, a long jump that threw her past Cal (red outlines):
            Cal, Ana.
          </p>
          <p>
            A sort that never lets equal items pass is called <strong>stable</strong> (sliding is insertion sort; swapping is
            selection sort). That is why sorting a spreadsheet by name and then by grade keeps names in order inside each
            grade.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["slide-done", "swap-passed"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
