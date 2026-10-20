"use client";

// Binary fingers. Ten fingers, each up or down, worth 512, 256 ... 2, 1 from left to right (so the
// hands read like a binary number). The number shown is the sum of the raised fingers, and the
// caption spells it out. Everything comes from VALUES.
// v3: coverage is shown, not told. A grid of 1024 cells (one per number 0..1023) lights a cell for
// each number the learner makes. "+1" and "Count to 16" tick the fingers up one number at a time;
// at 16 the caption shows the doubling (0..15 used the four right fingers; finger 16 starts them
// all again). The reveal waits for counting to 16 and for all ten fingers up (1023).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const F = 10;
const VALUES = Array.from({ length: F }, (_, i) => 2 ** (F - 1 - i)); // 512 .. 1
const MAXN = VALUES.reduce((a, b) => a + b, 0); // 1023
const COUNT_TO = 16;
const MILESTONES = ["counted", "all-up"] as const;
const pattern = (n: number) => VALUES.map((v) => (n & v) !== 0);
const valueOf = (u: boolean[]) => u.reduce((a, x, j) => a + (x ? VALUES[j] : 0), 0);

// Coverage grid: 64 × 16 cells of 5 px, cell n is number n.
const COLS = 64;
const CELL = 5;

export default function BinaryFingers({ slug }: { slug: string }) {
  const [up, setUp] = useState<boolean[]>(Array(F).fill(false));
  const [made, setMade] = useState<Set<number>>(() => new Set([0]));
  const [counting, setCounting] = useState(false);
  const reachRef = useRef<(name: string) => void>(() => {});
  const n = valueOf(up);

  const show = (u: boolean[]) => {
    setUp(u);
    const v = valueOf(u);
    setMade((m) => (m.has(v) ? m : new Set(m).add(v)));
    if (u.every(Boolean)) reachRef.current("all-up");
    if (v === COUNT_TO) {
      let all = true;
      for (let k = 0; k < COUNT_TO; k++) all &&= made.has(k) || k === v;
      if (all) reachRef.current("counted");
    }
  };

  // "Count to 16": one number every 25 ms, so the fingers and the grid tick through each pattern.
  useEffect(() => {
    if (!counting) return;
    if (n >= COUNT_TO) {
      setCounting(false);
      return;
    }
    const id = setTimeout(() => show(pattern(n + 1)), 25);
    return () => clearTimeout(id);
  });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Using only your hands, let each of your ${F} fingers be either up or down. How many different numbers (0 included) can you show?`,
        options: [String(F), String(F * F), String(2 ** F)],
        answer: 2,
      }}
      exploreHint="Count up to 16 and watch the grid. Then raise all ten fingers."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{2 ** F}.</strong> Counting up, each new pattern lit its own cell: 0, 1, 2 … {COUNT_TO}, none skipped,
            none twice. All {F} fingers up made {MAXN}, the last cell. Every number from 0 to {MAXN} has exactly one
            pattern, so that is {MAXN} + 1 = {2 ** F} numbers. You lit {made.size} of them.
          </p>
          <p>
            At {COUNT_TO}, the four right fingers had made all of 0 to 15, and the next finger started them all again.
            Each finger doubles the count: down (all the old numbers) or up (all of them again, plus its value). Ten
            doublings: 2 × 2 × … × 2 = {2 ** F}. Two states per place: that is binary.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            reachRef.current = reach;
            const busy = locked;
            const press = (u: boolean[]) => {
              setCounting(false);
              show(u);
            };
            const caption = locked
              ? "Make a prediction to start."
              : n === COUNT_TO && made.has(COUNT_TO - 1)
                ? `0 to 15 used the four right fingers: 16 numbers. Finger 16 starts them all again.`
                : n === 0
                  ? "All fingers down: 0. Count up, or tap a finger."
                  : VALUES.filter((_, j) => up[j]).length <= 5
                    ? `${n} = ${VALUES.filter((_, j) => up[j]).join(" + ")}`
                    : `${VALUES.filter((_, j) => up[j]).length} fingers up: ${n}`;
            return (
              <div className={s.wrap}>
                <Row>
                  <Control disabled={busy || n >= MAXN} onClick={() => press(pattern(n + 1))}>
                    +1
                  </Control>
                  <Control disabled={busy || counting || n >= COUNT_TO} onClick={() => setCounting(true)}>
                    Count to {COUNT_TO}
                  </Control>
                  <Control disabled={busy || n === 0} onClick={() => press(Array(F).fill(false))}>
                    All down
                  </Control>
                </Row>
                <div className={s.hands}>
                  {[0, 1].map((h) => (
                    <div key={h} className={s.hand}>
                      {VALUES.slice(h * 5, h * 5 + 5).map((v, k) => {
                        const i = h * 5 + k;
                        return (
                          <Control
                            key={v}
                            disabled={busy}
                            className={`${s.finger} ${up[i] ? s.up : ""}`}
                            aria-pressed={up[i]}
                            aria-label={locked ? "Finger" : `Finger worth ${v}: ${up[i] ? "up" : "down"}`}
                            onClick={() => press(up.map((x, j) => (j === i ? !x : x)))}
                          >
                            <span className={s.val}>{locked ? "" : v}</span>
                          </Control>
                        );
                      })}
                      <div className={s.palm} />
                    </div>
                  ))}
                </div>
                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <Row>
                  <Readout label="Number shown" value={locked ? "?" : n} />
                  <Readout label="Numbers made" value={locked ? "?" : made.size} />
                </Row>
                {!locked && (
                  <svg viewBox={`0 0 ${COLS * CELL} ${(MAXN + 1) / COLS * CELL + 12}`} className="stage-svg" role="img" aria-label={`${made.size} numbers made; one cell per number from 0 to ${MAXN}`}>
                    {Array.from({ length: MAXN + 1 }, (_, k) => (
                      <rect
                        key={k}
                        x={(k % COLS) * CELL}
                        y={Math.floor(k / COLS) * CELL}
                        width={CELL - 0.6}
                        height={CELL - 0.6}
                        fill={k === n ? "var(--fg)" : made.has(k) ? "var(--domain)" : "var(--bg-2)"}
                      />
                    ))}
                    <text x={0} y={(MAXN + 1) / COLS * CELL + 10} fontSize={8} fill="var(--muted)">
                      one cell per number, 0 (top left) to {MAXN} (bottom right)
                    </text>
                  </svg>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
