"use client";

// Constant factors decide small inputs. Two horizontal bars (insertion 8·n², merge 64·n·log2 n), scaled so the
// larger cost at the chosen n fills the track; step counts print at the bar ends and the cheaper bar is
// outlined. Presets n = 20, 43, 44, 100 then Reset (DOM order = the QA path). Each preset is a milestone;
// a four-cell trace keeps every visited n with its winner and both costs, and Reset clears the bars only,
// so every number the reveal quotes is still on the stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import { SIZES, fmt, insertion, merge, winner } from "./model";
import s from "./styles.module.css";

const TRACK_X = 8, TRACK_W = 324;

function Bar({ y, label, cost, max, best }: { y: number; label: string; cost: number | null; max: number; best: boolean }) {
  const w = cost === null ? 0 : Math.max(2, (cost / max) * TRACK_W);
  const inside = w > 120;
  return (
    <g>
      <text x={TRACK_X} y={y - 6} className={s.barLabel}>{label}</text>
      <rect x={TRACK_X} y={y} width={TRACK_W} height={24} rx={4} className={s.track} />
      {cost !== null ? (
        <>
          <rect x={TRACK_X} y={y} width={w} height={24} rx={4} className={best ? s.best : s.bar} />
          <text x={inside ? TRACK_X + w - 6 : TRACK_X + w + 6} y={y + 17} textAnchor={inside ? "end" : "start"}
            className={inside ? s.countIn : s.count}>{fmt(cost)}</text>
        </>
      ) : null}
    </g>
  );
}

function Stage({ locked, interact, n, setN, seen }: {
  locked: boolean; interact: () => void; n: number | null; setN: (n: number | null) => void; seen: number[];
}) {
  const { reach } = useMilestones(interact, SIZES.map((k) => `n${k}`));
  const go = (k: number) => { setN(k); reach(`n${k}`); };
  const ins = n === null ? null : insertion(n);
  const mer = n === null ? null : merge(n);
  const max = Math.max(ins ?? 1, mer ?? 1);
  const w = n === null ? null : winner(n);
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 112" className={`stage-svg ${s.svg}`} role="img"
        aria-label={n === null ? "Two empty bars: insertion sort and merge sort." : `n = ${n}. Insertion sort ${fmt(ins!)} steps, merge sort ${fmt(mer!)} steps. ${w === "insertion" ? "Insertion" : "Merge"} sort is cheaper.`}>
        <text x={332} y={16} textAnchor="end" className={s.nLabel}>n = {n ?? "–"}</text>
        <Bar y={22} label="Insertion sort: 8·n²" cost={ins} max={max} best={w === "insertion"} />
        <Bar y={78} label="Merge sort: 64·n·log₂n" cost={mer} max={max} best={w === "merge"} />
      </svg>
      <p className={s.caption}>Steps from a cost model, not timings. Outlined: fewer steps.</p>
      <Row>
        {SIZES.map((k) => (
          <Control key={k} disabled={locked || n === k} className={n === k ? "active" : ""} onClick={() => go(k)}>n = {k}</Control>
        ))}
        <Control disabled={locked || n === null} onClick={() => setN(null)}>Reset</Control>
      </Row>
      <ol className={s.trace} aria-label="Sizes you tried">
        {SIZES.map((k) => (
          <li key={k} className={seen.includes(k) ? s.cell : `${s.cell} ${s.empty}`}>
            {seen.includes(k) ? (
              <><strong>{k}: {winner(k)}</strong><br />{fmt(insertion(k))} v {fmt(merge(k))}</>
            ) : <>&nbsp;<br />&nbsp;</>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SmallNFavoursTheSlowCurve({ slug }: { slug: string }) {
  const [n, setNState] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const setN = (k: number | null) => {
    setNState(k);
    if (k !== null) setSeen((p) => (p.includes(k) ? p : [...p, k]));
  };
  const left = SIZES.filter((k) => !seen.includes(k));
  const hint = left.length === SIZES.length ? "Try n = 20, the question's case." : left.length ? `Now try n = ${left[0]}.` : "Compare the four sizes in the trace.";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Insertion sort costs 8·n² steps. Merge sort costs 64·n·log₂n. To sort 20 items, which costs fewer steps?",
        options: ["Insertion sort", "Merge sort", "They tie"],
        answer: 0,
      }}
      exploreHint={hint}
      minInteractions={SIZES.length}
      reveal={() => (
        <>
          <p>
            At 20 items insertion sort cost <strong>{fmt(insertion(20))}</strong> steps and merge sort <strong>{fmt(merge(20))}</strong>. The 64 in front of merge sort&rsquo;s cost outweighs its slower growth while n is small. Insertion sort still won at 43 and lost at 44, and at 100 it cost {fmt(insertion(100))} against {fmt(merge(100))}.
          </p>
          <p>
            Growth rate tells you who wins eventually, not who wins at your size. That is why fast merge sorts hand short pieces to insertion sort.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} n={n} setN={setN} seen={seen} />}
    </Lesson>
  );
}
