"use client";

// Seven odds leave one. Seven odd numbers drawn as dot columns: pairs side by side, one leftover
// dot on top. Tapping a column adds a pair (1, 3, 5 ... 13, then back to 1), so every column stays
// odd. "Pair up the leftovers" pulls the seven leftover dots into a tray and pairs them: three
// pairs and one alone. Key state: at least two numbers changed, and the leftovers paired.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const START = [1, 3, 5, 7, 9, 11, 13];
const K = START.length;
const MAX = 13;
const MILESTONES = ["changed-two", "paired"] as const;
const next = (v: number) => (v + 2 > MAX ? 1 : v + 2);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export default function SevenOdds({ slug }: { slug: string }) {
  const [vals, setVals] = useState<number[]>(START);
  const [paired, setPaired] = useState(false);
  const [totals, setTotals] = useState<number[]>([sum(START)]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At a shop where every price is an odd number, you buy ${K} items, any odd prices you like. Is the bill even or odd?`,
        options: ["Even", "Odd", "Depends on which numbers"],
        answer: 1,
      }}
      exploreHint="Change the numbers to try for an even total, then pair up the leftovers."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>Odd, every time.</strong> You made {totals.length} different total{totals.length === 1 ? "" : "s"} (
            {totals.slice(-5).join(", ")}) and none was even.
          </p>
          <p>
            Each odd number is some pairs plus one leftover dot. The pairs never matter. The {K} leftovers make{" "}
            {Math.floor(K / 2)} pairs and one dot alone, so the total is always odd.
          </p>
          <p>The leftovers decide: an even count of odd numbers pairs off completely and gives an even total.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const bump = (i: number) => {
              const v = vals.map((x, j) => (j === i ? next(x) : x));
              setVals(v);
              const t = sum(v);
              if (!totals.includes(t)) setTotals([...totals, t]);
              if (v.filter((x, j) => x !== START[j]).length >= 2) reach("changed-two");
            };
            const pair = () => {
              setPaired(!paired);
              if (!paired) reach("paired");
            };
            return <Stage locked={locked} vals={vals} paired={paired} onBump={bump} onPair={pair} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  vals,
  paired,
  onBump,
  onPair,
}: {
  locked: boolean;
  vals: number[];
  paired: boolean;
  onBump: (i: number) => void;
  onPair: () => void;
}) {
  const total = sum(vals);
  return (
    <div className={s.wrap}>
      <p className={s.caption} aria-live="polite">
        {locked ? "Make a prediction to start." : "Tap a number to add a pair. Each stays odd."}
      </p>
      <div className={s.cols}>
        {vals.map((v, i) => (
          <Control key={i} disabled={locked} className={s.col} aria-label={`Number ${i + 1}: ${v}`} onClick={() => onBump(i)}>
            <span className={s.dots}>
              <span className={`${s.dot} ${s.left} ${paired ? s.gone : ""}`} />
              {Array.from({ length: (v - 1) / 2 }, (_, r) => (
                <span key={r} className={s.pair}>
                  <span className={s.dot} />
                  <span className={s.dot} />
                </span>
              ))}
            </span>
            <span className={s.num}>{v}</span>
          </Control>
        ))}
      </div>

      <div className={s.tray} aria-label="Leftover dots">
        {paired ? (
          <>
            {Array.from({ length: Math.floor(K / 2) }, (_, r) => (
              <span key={r} className={s.trayPair}>
                <span className={`${s.dot} ${s.left}`} />
                <span className={`${s.dot} ${s.left}`} />
              </span>
            ))}
            {K % 2 === 1 && (
              <span className={s.alone}>
                <span className={`${s.dot} ${s.left}`} />
              </span>
            )}
          </>
        ) : (
          <span className={s.trayHint}>Leftover dots: one on top of each number</span>
        )}
      </div>

      <Row>
        <Readout label="Total" value={locked ? "?" : total} />
        <Control disabled={locked} className={paired ? "active" : ""} aria-pressed={paired} onClick={onPair}>
          {paired ? "Put leftovers back" : "Pair up the leftovers"}
        </Control>
      </Row>
    </div>
  );
}
