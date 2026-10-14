"use client";

// A queue made of two stacks. The question fixes the script: add 1, 2, 3, 4, then remove four times.
// The script is an operation tape of 8 tiles. Only the next tile plays a new operation; played tiles scrub
// back to the frame after that operation. Remove pops the out-stack; only when it is empty, the whole
// in-stack is poured over. Every item carries a "moved" badge that counts how often it was poured.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Op = "start" | "add" | "pour" | "nopour";
type Frame = {
  op: Op;
  waiting: number[];
  inS: number[]; // bottom to top
  outS: number[]; // bottom to top
  left: number[];
  moved: Record<number, number>;
  pours: number;
  mid?: Frame; // pour frames: the state after the pour, before the item leaves
};

function simulate(): Frame[] {
  const frames: Frame[] = [{ op: "start", waiting: [1, 2, 3, 4], inS: [], outS: [], left: [], moved: {}, pours: 0 }];
  const clone = (f: Frame): Frame => ({
    ...f,
    waiting: [...f.waiting],
    inS: [...f.inS],
    outS: [...f.outS],
    left: [...f.left],
    moved: { ...f.moved },
    mid: undefined,
  });
  for (let i = 0; i < 8; i++) {
    const f = clone(frames[i]);
    if (i < 4) {
      const x = f.waiting.shift()!;
      f.inS.push(x);
      f.moved[x] = 0;
      f.op = "add";
    } else {
      if (f.outS.length === 0) {
        while (f.inS.length) {
          const x = f.inS.pop()!;
          f.outS.push(x);
          f.moved[x] += 1;
        }
        f.pours += 1;
        f.op = "pour";
        f.mid = clone(f);
      } else f.op = "nopour";
      f.left.push(f.outS.pop()!);
    }
    frames.push(f);
  }
  return frames;
}
const FRAMES = simulate();

const SLOT_H = 44;
const slotY = (slot: number) => 170 - slot * SLOT_H;
const rowY = (idx: number) => 38 + idx * SLOT_H;
const X = { wait: 34, in: 124, out: 234, left: 322 };
const ORD = ["1st", "2nd", "3rd", "4th"];

function where(f: Frame, k: number): { x: number; y: number; pourIdx: number } {
  let i = f.waiting.indexOf(k);
  if (i >= 0) return { x: X.wait, y: rowY(i), pourIdx: 0 };
  i = f.inS.indexOf(k);
  if (i >= 0) return { x: X.in, y: slotY(i), pourIdx: 0 };
  i = f.outS.indexOf(k);
  if (i >= 0) return { x: X.out, y: slotY(i), pourIdx: 4 - k };
  i = f.left.indexOf(k);
  return { x: X.left, y: rowY(i), pourIdx: 0 };
}

function Stage({ locked, phase, interact }: { locked: boolean; phase: string; interact: () => void }) {
  return (
    <Milestones interact={interact} names={["poured", "all-out"]}>
      {(reach) => <Tape locked={locked} phase={phase} reach={reach} />}
    </Milestones>
  );
}

function Tape({ locked, phase, reach }: { locked: boolean; phase: string; reach: (n: string) => void }) {
  const [furthest, setFurthest] = useState(0); // operations played
  const [view, setView] = useState(0); // frame shown
  const [settling, setSettling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const reveal = phase === "reveal";
  const shownIdx = reveal ? furthest : view;
  const full = FRAMES[shownIdx];
  const f = settling && !reveal && full.mid ? full.mid : full;

  const press = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setSettling(false);
    if (i < furthest) {
      setView(i + 1);
      return;
    }
    setFurthest(i + 1);
    setView(i + 1);
    if (FRAMES[i + 1].op === "pour") {
      setSettling(true);
      timer.current = setTimeout(() => setSettling(false), 330);
    }
    if (i === 4) reach("poured");
    if (i === 7) reach("all-out");
  };

  const note =
    locked || f.op === "start"
      ? ""
      : f.op === "add"
        ? `Added ${f.inS[f.inS.length - 1]}.`
        : f.op === "pour"
          ? "Out is empty: pour all of in over."
          : "out not empty: no pour";
  const pourLit = f.op === "pour";
  const live = (k: number) => (f.moved[k] === undefined ? "?" : String(f.moved[k]));

  return (
    <div className={s.wrap}>
      <p className={s.model}>Remove pops the out-stack. Only when it is empty, pour the whole in-stack over.</p>
      <p className={s.readout} aria-live="polite">
        Pours: {locked ? "?" : f.pours} · Left: {f.left.length ? f.left.join(" ") : "—"}
      </p>
      <p className={s.note}>{note || " "}</p>
      <svg
        viewBox="0 0 358 244"
        className="stage-svg"
        role="img"
        aria-label={`In-stack ${f.inS.join(", ") || "empty"}. Out-stack ${f.outS.join(", ") || "empty"}. Left the queue ${f.left.join(", ") || "none"}. Pours ${f.pours}.`}
      >
        <text x={X.wait} y={26} textAnchor="middle" className={s.label}>
          Waiting
        </text>
        <text x={X.left} y={26} textAnchor="middle" className={s.label}>
          Left the queue
        </text>
        <rect x={X.in - 33} y={34} width={66} height={180} rx={8} fill="var(--bg-2)" stroke="var(--line)" />
        <rect x={X.out - 33} y={34} width={66} height={180} rx={8} fill="var(--bg-2)" stroke="var(--line)" />
        <text x={X.in} y={232} textAnchor="middle" className={s.label}>
          in
        </text>
        <text x={X.out} y={232} textAnchor="middle" className={s.label}>
          out
        </text>
        <path
          d="M140 30 Q179 -4 218 30"
          fill="none"
          stroke={pourLit ? "var(--warn-fill)" : "var(--line)"}
          strokeWidth={pourLit ? 4 : 2}
          markerEnd="none"
        />
        <path d="M212 22 L220 31 L209 33 Z" fill={pourLit ? "var(--warn-fill)" : "var(--line)"} />
        <text x={179} y={16} textAnchor="middle" className={pourLit ? s.pourOn : s.label}>
          pour
        </text>
        {[1, 2, 3, 4].map((k) => {
          const p = where(f, k);
          const changed = f.moved[k] > 0;
          return (
            <g
              key={k}
              className={s.item}
              style={{ transform: `translate(${p.x - 24}px, ${p.y}px)`, transitionDelay: settling || f.op === "pour" ? `${p.pourIdx * 60}ms` : "0ms" }}
            >
              <rect width={48} height={40} rx={7} fill="var(--domain)" />
              <text x={24} y={17} textAnchor="middle" className={s.num}>
                {k}
              </text>
              <rect x={5} y={22} width={38} height={14} rx={7} fill="var(--bg-2)" />
              <text x={24} y={32} textAnchor="middle" className={changed ? s.badgeOn : s.badge}>
                moved {live(k)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={s.tape}>
        {Array.from({ length: 8 }, (_, i) => {
          const current = view === i + 1;
          return (
            <Control
              key={i}
              className={`tap ${s.tile} ${current ? "active" : ""}`}
              disabled={locked || reveal || i > furthest || current}
              onClick={() => press(i)}
            >
              {i < 4 ? (
                `Add ${i + 1}`
              ) : (
                <>
                  Remove <small>{ORD[i - 4]}</small>
                </>
              )}
            </Control>
          );
        })}
      </div>
    </div>
  );
}

export default function TwoStacksMakeAQueue({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Add 1, 2, 3, 4 to an in-stack. To remove, pop from an out-stack, and only when it is empty pour the whole in-stack into it. Removing all four, how many times is each item poured?",
        options: ["Once", "Four times", "Once per removal before it"],
        answer: 0,
      }}
      exploreHint="Play the tape: add 1 to 4, then remove four times."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your one pour moved <strong>4 items, each once</strong>. The next three removals moved nothing, and the items
            left in order 1 2 3 4.
          </p>
          <p>
            Each item is poured at most once in its life, so one slow removal pays for the fast ones around it and the
            average cost per operation stays constant.
          </p>
          <p className="muted">The same accounting as list doubling.</p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} />}
    </Lesson>
  );
}
