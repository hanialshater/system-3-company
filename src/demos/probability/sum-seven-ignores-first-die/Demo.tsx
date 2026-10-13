"use client";

// Independence. A 6 x 6 grid (rows: first die, columns: second die). The target total's cells are
// filled; a first-die clue keeps one row. Readouts show the chance before (cells / 36) and after
// (cells in the row / 6). For 7 every row holds exactly one target cell, so no clue moves it; for 8 it does.
// Key state: a clue tried on total 7, then on total 8. The clue chips come first in DOM order with
// target 7 selected, so QA sweeps first die 1..6 under 7 (including the question's 3), then switches to 8.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { FACES, TARGETS, type Target, after, before, show } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["seven-with-clue", "eight-with-clue"] as const;
const SZ = 38;
const X0 = 34;
const Y0 = 24;
type Seen = Partial<Record<Target, number[]>>; // first-die clues seen per target, in order

function Stage({
  locked,
  interact,
  target,
  setTarget,
  first,
  setFirst,
  seen,
  setSeen,
}: {
  locked: boolean;
  interact: () => void;
  target: Target;
  setTarget: (t: Target) => void;
  first: number | null;
  setFirst: (f: number | null) => void;
  seen: Seen;
  setSeen: (s: Seen) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const note = (t: Target, f: number | null) => {
    if (f === null) return;
    setSeen({ ...seen, [t]: [...(seen[t] ?? []), f] });
    reach(t === 7 ? "seven-with-clue" : "eight-with-clue");
  };
  const b = before(target);
  const a = first === null ? null : after(target, first);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : "Independent: knowing the first die leaves the chance of the total unchanged."}
      </p>
      <svg viewBox="0 0 270 262" className={`stage-svg ${s.svg}`} role="img" aria-label={`Total ${target}: ${show(b)} before, ${a ? show(a) : "no clue"} after`}>
        <text x={X0 + 3 * SZ} y={12} textAnchor="middle" className={s.axis}>
          second die
        </text>
        <text x={10} y={Y0 + 3 * SZ} textAnchor="middle" transform={`rotate(-90 10 ${Y0 + 3 * SZ})`} className={s.axis}>
          first die
        </text>
        {FACES.map((r) =>
          FACES.map((c) => {
            const hit = r + c === target;
            const out = first !== null && r !== first;
            const x = X0 + (c - 1) * SZ;
            const y = Y0 + (r - 1) * SZ;
            return (
              <g key={`${r}${c}`} className={out ? s.out : ""}>
                <rect x={x + 2} y={y + 2} width={SZ - 4} height={SZ - 4} rx={6} className={hit ? s.hit : s.cell} />
                <text x={x + SZ / 2} y={y + SZ / 2 + 4} textAnchor="middle" className={hit ? s.hitText : s.cellText}>
                  {r}+{c}
                </text>
              </g>
            );
          }),
        )}
        {FACES.map((r) => (
          <text key={r} x={X0 - 6} y={Y0 + (r - 1) * SZ + SZ / 2 + 4} textAnchor="end" className={s.axis}>
            {r}
          </text>
        ))}
      </svg>
      <Row>
        <span className={s.label}>1st die:</span>
        {[null, ...FACES].map((f) => (
          <Control
            key={f ?? "none"}
            className={`${s.chip} ${f === first ? "active" : ""}`}
            aria-pressed={f === first}
            aria-label={f === null ? "First die hidden" : `First die is ${f}`}
            disabled={locked || f === first}
            onClick={() => {
              setFirst(f);
              note(target, f);
            }}
          >
            {f ?? "?"}
          </Control>
        ))}
      </Row>
      <Row>
        <span className={s.label}>Total:</span>
        {TARGETS.map((t) => (
          <Control
            key={t}
            className={t === target ? "active" : ""}
            aria-pressed={t === target}
            disabled={locked || t === target}
            onClick={() => {
              setTarget(t);
              note(t, first);
            }}
          >
            Total {t}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Before the clue" value={show(b)} />
        <Readout label={first === null ? "After the clue" : `After "first is ${first}"`} value={a ? show(a) : "-"} />
      </Row>
    </div>
  );
}

export default function SumSevenIgnoresFirstDie({ slug }: { slug: string }) {
  const [target, setTarget] = useState<Target>(7);
  const [first, setFirst] = useState<number | null>(null);
  const [seen, setSeen] = useState<Seen>({});
  // Quote the question's first die (3) if the learner tried it, else the last one they tried.
  const pick = (l: number[] | undefined) => (l?.includes(3) ? 3 : (l?.[l.length - 1] ?? 3));
  const k7 = pick(seen[7]);
  const k8 = pick(seen[8]);
  const a8 = after(8, k8);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You roll two dice. You see that the first die is a 3. How does that change the chance that the total is 7?",
        options: ["It raises it", "It does not change it", "It lowers it"],
        answer: 1,
      }}
      exploreHint="Try first-die clues on total 7. Then switch to total 8."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Total 7 starts at {show(before(7))}. After &ldquo;first die is {k7}&rdquo; it was still{" "}
            <strong>{show(after(7, k7))}</strong>: every row of the grid holds exactly one 7, so whatever the first die shows, one
            second die out of six completes it.
          </p>
          <p>
            Total 8 starts at {show(before(8))}; after &ldquo;first die is {k8}&rdquo; it became {show(a8)}. The first die tells you
            something about 8, so those two are not independent. A total of 7 and the first die are independent: the clue leaves the
            chance unchanged.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          target={target}
          setTarget={setTarget}
          first={first}
          setFirst={setFirst}
          seen={seen}
          setSeen={setSeen}
        />
      )}
    </Lesson>
  );
}
