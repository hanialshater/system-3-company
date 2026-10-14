"use client";

// LZ77 copy that overlaps itself. The decoder has "ab"; the instruction is back 2, copy 6, one letter at a time.
// A scrub over the six copy steps (chips 1-6, each enabled once the step before it was shown). At step 3 the
// back pointer reads a letter this same copy wrote at step 1. Only written cells are drawn: the strip length is
// not shown before it is written.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const START = "ab";
const BACK = 2;
const COPY = 6;
const X = (i: number) => 6 + i * 44;

// Frame k = the strip after k copy steps; step k reads the letter BACK cells before the one it writes.
function decode(k: number): string {
  let out = START;
  for (let n = 0; n < k; n++) out += out[out.length - BACK];
  return out;
}

export default function CopyOverlapsItself({ slug }: { slug: string }) {
  const [frame, setFrame] = useState(0);
  const [maxShown, setMaxShown] = useState(0);

  const text = decode(frame);
  const target = text.length - 1; // the cell just written
  const source = target - BACK;
  const readsNew = frame >= 1 && source >= START.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A decoder has written 'ab'. The next instruction says: go back 2 letters and copy 6. What does it write?",
        options: ["Nothing, there are only 2 letters to copy", "'ababab', making 'abababab'", "'ab' and stops"],
        answer: 1,
      }}
      exploreHint="Step through the six copy steps, 1 to 6."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your decoder wrote <strong>{decode(COPY)}</strong>. From step 3 on, it was copying letters it had written
            two steps earlier, so 2 letters were enough to copy 6.
          </p>
          <p>
            A back-reference is two numbers, <strong>back 2, copy 6</strong>, standing in for a whole repeat. When the
            copy overlaps itself, one instruction rebuilds a whole run. That is the idea inside gzip and PNG.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["read-new-letter", "eight-written"]}>
          {(reach) => {
            const show = (k: number) => {
              if (locked || k > maxShown + 1) return;
              setFrame(k);
              setMaxShown(Math.max(maxShown, k));
              if (k >= 3) reach("read-new-letter");
              if (k === COPY) reach("eight-written");
            };
            const readout =
              frame === 0
                ? "copied 0 of 6"
                : `copied ${frame} of 6 · ${readsNew ? "reading a letter this copy wrote" : "reading the original letters"}`;
            return (
              <div className={s.wrap}>
                <p className={s.rule}>The decoder copies one letter at a time, from 2 back.</p>
                <p className={s.card}>back 2 · copy 6</p>
                <svg
                  viewBox="0 0 360 100"
                  className="stage-svg"
                  role="img"
                  aria-label={`Written: ${text.split("").join(" ")}, copied ${frame} of 6${readsNew ? ", reading a letter this copy wrote" : ""}`}
                >
                  {text.split("").map((ch, i) => {
                    const isNew = i >= START.length;
                    return (
                      <g key={i} className={i === target && frame > 0 ? s.fresh : undefined}>
                        <rect
                          x={X(i)}
                          y={44}
                          width={40}
                          height={44}
                          rx={6}
                          fill={isNew ? "var(--domain)" : "var(--bg-2)"}
                          fillOpacity={isNew ? 0.35 : 1}
                          stroke="var(--line)"
                        />
                        <text x={X(i) + 20} y={73} textAnchor="middle" className={s.letter}>
                          {ch}
                        </text>
                        {isNew && <circle cx={X(i) + 20} cy={95} r={2.5} fill="var(--fg)" />}
                      </g>
                    );
                  })}
                  {frame < COPY && (
                    <g>
                      <rect
                        x={X(text.length)}
                        y={44}
                        width={40}
                        height={44}
                        rx={6}
                        fill="none"
                        stroke="var(--muted)"
                        strokeDasharray="4 3"
                      />
                      <text x={X(text.length) + 20} y={73} textAnchor="middle" className={s.q}>
                        ?
                      </text>
                    </g>
                  )}
                  {frame > 0 && (
                    <g>
                      <path
                        d={`M ${X(source) + 20} 40 Q ${(X(source) + X(target)) / 2 + 20} 4 ${X(target) + 20} 40`}
                        fill="none"
                        stroke="var(--fg)"
                        strokeWidth={1.5}
                      />
                      <text x={(X(source) + X(target)) / 2 + 20} y={14} textAnchor="middle" className={s.small}>
                        2 back
                      </text>
                      {readsNew && (
                        <rect
                          x={X(source) - 2}
                          y={42}
                          width={44}
                          height={48}
                          rx={8}
                          fill="none"
                          stroke="var(--fg)"
                          strokeWidth={2}
                        />
                      )}
                    </g>
                  )}
                </svg>
                <p className={s.readout} aria-live="polite">
                  {readout}
                </p>
                <p className={s.cap}>Copy step</p>
                <Row>
                  {Array.from({ length: COPY }, (_, i) => i + 1).map((k) => (
                    <Control
                      key={k}
                      className={`${s.tap} ${k === frame ? "active" : ""}`}
                      disabled={locked || k > maxShown + 1}
                      aria-pressed={k === frame}
                      onClick={() => show(k)}
                    >
                      {k}
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
