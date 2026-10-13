"use client";

// Central limit. One histogram of 2,000 seeded group averages of a lopsided die (five 1s, one 6) on a
// fixed 1-6 axis. Group-size buttons 1 (start), 2, 5, 10, 30 in DOM order; the two spikes at size 1
// become one hump around 1.83 by size 30. Key state: size 30 reached.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { GROUPS, MEAN, SIZES, mean, run, valueOf } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["thirty"] as const;
const BIG = SIZES[SIZES.length - 1];
const RUNS = new Map(SIZES.map((n) => [n, run(n)] as const));
const get = (n: number) => RUNS.get(n) ?? run(n);
const fmt = (v: number) => v.toLocaleString("en-US");
const X0 = 20;
const X1 = 320;
const BASE = 150;
const H = 130;
const x = (v: number) => X0 + ((v - 1) / 5) * (X1 - X0);

function Stage({ locked, interact, size, setSize }: { locked: boolean; interact: () => void; size: number; setSize: (n: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const { counts, avgs } = get(size);
  const top = Math.max(...counts);
  const w = Math.min(24, ((X1 - X0) / 5 / size) * 5 * 0.82);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Die: five faces show 1, one shows 6. Each bar: how many of ${fmt(GROUPS)} groups of ${size} rolls had that average.`}
      </p>
      <svg viewBox="0 0 340 186" className={`stage-svg ${s.svg}`} role="img" aria-label={`Averages of ${size} rolls, ${GROUPS} groups`}>
        <line x1={X0 - 4} y1={BASE} x2={X1 + 4} y2={BASE} className={s.axis} />
        {counts.map((c, k) =>
          c === 0 ? null : (
            <rect key={k} x={x(valueOf(size, k)) - w / 2} y={BASE - (c / top) * H} width={w} height={(c / top) * H} rx={1.5} className={s.bar} />
          ),
        )}
        <line x1={x(MEAN)} y1={12} x2={x(MEAN)} y2={BASE} className={s.mean} />
        <text x={x(MEAN) + 4} y={20} className={s.meanLabel}>
          {MEAN.toFixed(2)}
        </text>
        {[1, 2, 3, 4, 5, 6].map((t) => (
          <text key={t} x={x(t)} y={BASE + 14} textAnchor="middle" className={s.tick}>
            {t}
          </text>
        ))}
        <text x={(X0 + X1) / 2} y={BASE + 30} textAnchor="middle" className={s.tick}>
          average of the group
        </text>
      </svg>
      <Row>
        {SIZES.map((n) => (
          <Control
            key={n}
            className={size === n ? "active" : ""}
            disabled={locked || size === n}
            onClick={() => {
              setSize(n);
              if (n === BIG) reach("thirty");
            }}
          >
            {n === 1 ? "1 roll" : `${n} rolls`}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Group size" value={size} />
        <Readout label="Average of the averages" value={locked ? "?" : mean(avgs).toFixed(2)} />
      </Row>
    </div>
  );
}

export default function AveragesTurnBellShaped({ slug }: { slug: string }) {
  const [size, setSize] = useState(SIZES[0]);
  const one = get(1).counts;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A die has five faces showing 1 and one showing 6. Average ${BIG} rolls, and do that ${fmt(GROUPS)} times. The bar chart of those ${fmt(GROUPS)} averages looks:`,
        options: ["lopsided, like one roll", `one hump around ${MEAN.toFixed(2)}, like a bell`, "flat"],
        answer: 1,
      }}
      exploreHint={`Raise the group size from 1 roll to ${BIG}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 1 roll you saw two spikes: {fmt(one[0])} ones and {fmt(one[1])} sixes. At {BIG} rolls your {fmt(GROUPS)} averages formed{" "}
            <strong>one hump around {MEAN.toFixed(2)}</strong> (they averaged {mean(get(BIG).avgs).toFixed(2)}), only slightly lopsided.
          </p>
          <p>
            Averaging mixes many rolls, so the rare sixes spread out and extreme averages become rare. Many small random pieces added
            up tend to a bell: the central limit theorem.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} size={size} setSize={setSize} />}
    </Lesson>
  );
}
