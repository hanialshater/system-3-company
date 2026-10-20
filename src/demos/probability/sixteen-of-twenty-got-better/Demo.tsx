"use client";

// Control groups. Two rows of 20 people with an invented cold. In this model the invented pill does nothing:
// both rows recover on the same deterministic list of days (brief 57), placed in a different order.
// Recovered by day 3: 3 of 20; by day 7: 16 of 20, in both rows. No randomness, no seed.
// Presets in DOM order: Day 3, Day 7, Show the no-pill group (one-way; disabled once shown).
// Milestones: day7 (pill row at day 7), compare (no-pill row shown while the day is 7). The day-7 counts are
// recorded when they fire; if the learner steps back to day 3 the caption keeps them as a trace.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const DAYS = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 8, 9, 10, 12];
const PILL_ORDER = [5, 12, 2, 9, 0, 15, 7, 18, 3, 10, 14, 1, 17, 6, 11, 19, 4, 13, 8, 16];
const NONE_ORDER = [11, 3, 16, 0, 8, 19, 5, 13, 1, 9, 17, 6, 2, 14, 10, 7, 18, 4, 12, 15];
const PILL = PILL_ORDER.map((i) => DAYS[i]);
const NONE = NONE_ORDER.map((i) => DAYS[i]);
const better = (row: number[], day: number) => row.filter((d) => d <= day).length;
const MILESTONES = ["day7", "compare"] as const;

const W = 320;
const STEP = W / 20;

function Person({ x, y, well, dashed }: { x: number; y: number; well: boolean; dashed: boolean }) {
  const cls = dashed ? s.ghost : well ? s.well : s.ill;
  return (
    <g className={cls}>
      <circle cx={x} cy={y + 4} r={3.4} />
      <path d={`M${x - 5},${y + 21}v-6a5,5 0 0,1 10,0v6z`} />
    </g>
  );
}

type Seen = { pill: number; none: number } | null;

function Stage({ locked, reach, day, setDay, shown, setShown, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  day: number;
  setDay: (v: number) => void;
  shown: boolean;
  setShown: (v: boolean) => void;
  seen: Seen;
  setSeen: (v: Seen) => void;
}) {
  const d = locked ? 0 : day;
  const pillN = better(PILL, d);
  const noneN = better(NONE, d);
  const note = (nd: number, ns: boolean) => {
    if (nd !== 7) return;
    reach("day7");
    if (ns) {
      setSeen({ pill: better(PILL, 7), none: better(NONE, 7) });
      reach("compare");
    }
  };
  const goDay = (v: number) => {
    if (locked || v === day) return;
    setDay(v);
    note(v, shown);
  };
  const show = () => {
    if (locked || shown) return;
    setShown(true);
    note(day, true);
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Day ${d}. Invented cold, invented pill. Filled = feels better.${seen && d !== 7 ? ` (Day 7: ${seen.pill} and ${seen.none}.)` : ""}`}
      </p>
      <svg viewBox={`0 0 ${W} 92`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Day ${d}: took the pill, ${pillN} of 20 better; took nothing, ${shown ? `${noneN} of 20 better` : "not shown yet"}`}>
        <text x={2} y={11} className={s.label}>
          Took the pill · better: {pillN} of 20
        </text>
        {PILL.map((rd, i) => (
          <Person key={i} x={STEP * i + STEP / 2} y={16} well={rd <= d} dashed={false} />
        ))}
        <text x={2} y={58} className={s.label}>
          {shown ? `Took nothing · better: ${noneN} of 20` : "Took nothing · not shown yet"}
        </text>
        {NONE.map((rd, i) => (
          <Person key={i} x={STEP * i + STEP / 2} y={63} well={shown && rd <= d} dashed={!shown} />
        ))}
      </svg>
      <Row>
        {[3, 7].map((v) => (
          <Control key={v} disabled={locked} className={!locked && day === v ? "active" : ""} aria-pressed={!locked && day === v} onClick={() => goDay(v)}>
            Day {v}
          </Control>
        ))}
        <Control disabled={locked || shown} className={!locked && shown ? "active" : ""} aria-pressed={!locked && shown} onClick={show}>
          Show the no-pill group
        </Control>
      </Row>
    </div>
  );
}

export default function SixteenOfTwentyGotBetter({ slug }: { slug: string }) {
  const [day, setDay] = useState(0);
  const [shown, setShown] = useState(false);
  const [seen, setSeen] = useState<Seen>(null);
  const pill = seen?.pill ?? better(PILL, 7);
  const none = seen?.none ?? better(NONE, 7);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Your pharmacy starts selling a new cold pill. Of 20 customers with a cold who take it, 16 feel better within a week. To judge the pill, what do you most need?",
        options: ["More people taking the pill", "How fast each of the 16 recovered", "How many get better with no pill"],
        answer: 2,
      }}
      exploreHint="Step through the days, then show the no-pill group."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            By day 7, {pill} of 20 felt better with the pill. The group that took nothing: {none} of 20, the same. In this
            model colds clear up by themselves, so getting better after the pill was going to happen anyway.
          </p>
          <p>
            More pill-takers would still leave the no-pill row missing. Only the comparison row shows what the pill added, and
            here it added nothing.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage locked={locked} reach={reach} day={day} setDay={setDay} shown={shown} setShown={setShown} seen={seen} setSeen={setSeen} />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
