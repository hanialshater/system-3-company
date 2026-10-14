"use client";

// A queue made of two stacks. The question fixes the script, interleaved so a second pour happens:
// add 1, add 2, remove, add 3, add 4, remove, remove, remove (v3; v2 was all adds then all removes).
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

const OPS = ["add", "add", "rem", "add", "add", "rem", "rem", "rem"] as const;
const LABEL = (() => {
  let a = 0;
  let r = 0;
  return OPS.map((o) => (o === "add" ? `Add ${++a}` : `Remove ${["1st", "2nd", "3rd", "4th"][r++]}`));
})();

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
    if (OPS[i] === "add") {
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
// Indices of the tape tiles whose removal pours (first and second pour).
const POURS = OPS.map((_, i) => i).filter((i) => FRAMES[i + 1].op === "pour");

const SLOT_H = 44;
const slotY = (slot: number) => 170 - slot * SLOT_H;
const rowY = (idx: number) => 38 + idx * SLOT_H;
const X = { wait: 34, in: 124, out: 234, left: 322 };

function where(f: Frame, k: number): { x: number; y: number; pourIdx: number } {
  let i = f.waiting.indexOf(k);
  if (i >= 0) return { x: X.wait, y: rowY(i), pourIdx: 0 };
  i = f.inS.indexOf(k);
  if (i >= 0) return { x: X.in, y: slotY(i), pourIdx: 0 };
  i = f.outS.indexOf(k);
  if (i >= 0) return { x: X.out, y: slotY(i), pourIdx: i };
  i = f.left.indexOf(k);
  return { x: X.left, y: rowY(i), pourIdx: 0 };
}

function Stage({ locked, phase, interact }: { locked: boolean; phase: string; interact: () => void }) {
  return (
    <Milestones interact={interact} names={["poured", "second-pour", "all-out"]}>
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
    if (i === POURS[0]) reach("poured");
    if (i === POURS[1]) reach("second-pour");
    if (i === OPS.length - 1) reach("all-out");
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
        {OPS.map((_, i) => {
          const current = view === i + 1;
          return (
            <Control
              key={i}
              className={`tap ${s.tile} ${current ? "active" : ""}`}
              disabled={locked || reveal || i > furthest || current}
              onClick={() => press(i)}
            >
              {OPS[i] === "add" ? (
                LABEL[i]
              ) : (
                <>
                  Remove <small>{LABEL[i].slice(7)}</small>
                </>
              )}
            </Control>
          );
        })}
      </div>
    </div>
  );
}

const END = FRAMES[FRAMES.length - 1];

export default function TwoStacksMakeAQueue({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Adds go on an in-stack. To remove, pop an out-stack; only when it is empty, pour the whole in-stack into it. Add 1, 2, remove, add 3, 4, remove three times. How often is each item poured?",
        options: ["Once each", "Once per removal", "1 and 2 twice, 3 and 4 once"],
        answer: 0,
      }}
      exploreHint="Play the tape left to right. Watch the moved badges on each pour."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            You saw <strong>{END.pours} pours</strong>: the first moved 2 and 1, the second moved 4 and 3. Every badge
            stopped at <strong>moved {Math.max(...Object.values(END.moved))}</strong>, the other removals moved nothing,
            and the items left in order {END.left.join(" ")}.
          </p>
          <p>
            The second pour never touched 1 or 2: they were already in out. An item crosses from in to out once in its
            life, so a slow removal pays for the fast ones around it and the average cost per operation stays constant.
          </p>
          <p className="muted">The same accounting as list doubling.</p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} />}
    </Lesson>
  );
}
