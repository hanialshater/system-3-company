"use client";

// Binary fingers. Ten fingers, each up or down, worth 512, 256 ... 2, 1 from left to right (so the
// hands read like a binary number). The number shown is the sum of the raised fingers, and the
// caption spells it out. Everything comes from VALUES.
// Key state: all ten fingers up, showing the largest number, 1023.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const F = 10;
const VALUES = Array.from({ length: F }, (_, i) => 2 ** (F - 1 - i)); // 512 .. 1
const MAXN = VALUES.reduce((a, b) => a + b, 0); // 1023
const MILESTONES = ["all-up"] as const;

export default function BinaryFingers({ slug }: { slug: string }) {
  const [up, setUp] = useState<boolean[]>(Array(F).fill(false));
  const [shown, setShown] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Each of ${F} fingers is either up or down. How many different numbers (0 included) can you show?`,
        options: [String(F), String(F * F), String(2 ** F)],
        answer: 2,
      }}
      exploreHint="Raise fingers to make numbers. What is the biggest you can show?"
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{2 ** F}.</strong> With all {F} fingers up you showed {MAXN}, the biggest. Every number from 0 to {MAXN} has
            exactly one pattern, so that is {MAXN} + 1 = {2 ** F} numbers.
          </p>
          <p>
            Each finger is worth double the one to its right. Adding a finger doubles the count: it can be down (all the old
            numbers) or up (all of them again, plus its value). Ten doublings: 2 × 2 × … × 2 = {2 ** F}.
          </p>
          <p>{shown.length > 1 ? `You made ${shown.length} different numbers on the way. ` : ""}Two states per place, ten places: that is binary.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const flip = (i: number) => {
              const u = up.map((x, j) => (j === i ? !x : x));
              setUp(u);
              const n = u.reduce((a, x, j) => a + (x ? VALUES[j] : 0), 0);
              if (!shown.includes(n)) setShown([...shown, n]);
              if (u.every(Boolean)) reach("all-up");
            };
            return <Stage locked={locked} up={up} onFlip={flip} onClear={() => setUp(Array(F).fill(false))} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, up, onFlip, onClear }: { locked: boolean; up: boolean[]; onFlip: (i: number) => void; onClear: () => void }) {
  const n = up.reduce((a, x, j) => a + (x ? VALUES[j] : 0), 0);
  const parts = VALUES.filter((_, j) => up[j]);
  const caption = locked
    ? "Make a prediction to start."
    : parts.length === 0
      ? "All fingers down: 0. Tap a finger to raise it."
      : parts.length <= 5
        ? `${n} = ${parts.join(" + ")}`
        : `${parts.length} fingers up: ${n}`;

  return (
    <div className={s.wrap}>
      <div className={s.hands}>
        {[0, 1].map((h) => (
          <div key={h} className={s.hand}>
            {VALUES.slice(h * 5, h * 5 + 5).map((v, k) => {
              const i = h * 5 + k;
              return (
                <Control
                  key={v}
                  disabled={locked}
                  className={`${s.finger} ${up[i] ? s.up : ""}`}
                  aria-pressed={up[i]}
                  aria-label={`Finger worth ${v}: ${up[i] ? "up" : "down"}`}
                  onClick={() => onFlip(i)}
                >
                  <span className={s.val}>{v}</span>
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
        <Control disabled={locked || n === 0} onClick={onClear}>
          All down
        </Control>
      </Row>
    </div>
  );
}
