"use client";

// Pick two or pick four: 6 friends A to F. Each pair that "goes" leaves exactly four that "stay".
// The friends row has two bands: "go" on top, "stay" below, with the stayers boxed together as one group.
// "Next pair" steps through the 15 pairs in order (AB, AC, …, EF); "All pairs" lists them all at once.
// Each pair is listed as a chip of six dots (two filled = go, four hollow = stay), so every chip is both a pair
// and the four it leaves behind. "Groups of 3" shows one 3-and-3 split and the count 20.
// Counts are computed (choose(), every subset enumerated), never typed.
// Milestones: "one" (a pair and its four seen together), "all" (15 pairs and 15 fours seen). What the reveal
// quotes is recorded when it happens and re-shown at the reveal, so Reset cannot erase it.
// Brief: company/domains/briefs/math.discrete.md, Wave J, brief 5 (check D5).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const FRIENDS = ["A", "B", "C", "D", "E", "F"] as const;
const N = FRIENDS.length;
const MILESTONES = ["one", "all"] as const;

/** Every k-subset of 0..n-1, in lexicographic order. */
const subsets = (n: number, k: number): number[][] => {
  const out: number[][] = [];
  const go = (start: number, acc: number[]) => {
    if (acc.length === k) return void out.push(acc);
    for (let i = start; i < n; i++) go(i + 1, [...acc, i]);
  };
  go(0, []);
  return out;
};
const PAIRS = subsets(N, 2); // 15
const FOURS = subsets(N, 4); // 15
const THREES = subsets(N, 3); // 20
const key = (g: number[]) => g.join(",");
const stayOf = (go: number[]) => FRIENDS.map((_, i) => i).filter((i) => !go.includes(i));
// The four left behind by each pair: one per pair, all different, and every four is hit (the matching).
const FOUR_OF_PAIR = PAIRS.map((p) => key(stayOf(p)));
if (new Set(FOUR_OF_PAIR).size !== FOURS.length || !FOURS.every((f) => FOUR_OF_PAIR.includes(key(f))))
  throw new Error("pick-two-or-pick-four: pairs and fours do not match one to one");

type View = { mode: "none" | "pair" | "three"; pair: number }; // pair: index into PAIRS
type Seen = { pairs: Set<number>; one: boolean; all: boolean; three: boolean };

export default function PickTwoOrPickFour({ slug }: { slug: string }) {
  const [view, setView] = useState<View>({ mode: "none", pair: -1 });
  const [shown, setShown] = useState<Set<number>>(new Set());
  const seen = useRef<Seen>({ pairs: new Set(), one: false, all: false, three: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You have 6 friends. You can take 2 of them on a trip, or else 4 of them. Which choice gives more possible groups to take?",
        options: ["Taking 2", "Taking 4", "The same"],
        answer: 2,
      }}
      exploreHint="Step through the pairs, then list them all."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every pair you picked left exactly four behind, and each four left behind exactly one pair. So the groups
            match one to one: {PAIRS.length} pairs, {FOURS.length} fours. Choosing who goes is the same as choosing who
            stays.
          </p>
          <p>
            {seen.current.three &&
              `Groups of 3 are the most, ${THREES.length}, where goers and stayers are the same size. `}
            In general, choosing k of n has as many ways as choosing n − k.
          </p>
        </>
      )}
    >
      {(ctx) => (
        <Stage {...ctx} view={view} setView={setView} shown={shown} setShown={setShown} seen={seen.current} />
      )}
    </Lesson>
  );
}

const X0 = 64; // first friend's centre
const DX = 46;
const R = 16;
const GO_Y = 22;
const STAY_Y = 76;

function Friends({ go }: { go: number[] | null }) {
  const split = go !== null;
  return (
    <svg
      viewBox="0 0 340 104"
      className={`stage-svg ${s.friends}`}
      role="img"
      aria-label={
        split ? `Go: ${go.map((i) => FRIENDS[i]).join(", ")}. Stay: ${stayOf(go).map((i) => FRIENDS[i]).join(", ")}.` : "Six friends, A to F"
      }
    >
      <text x={4} y={GO_Y + 5} className={s.band}>
        go
      </text>
      <text x={4} y={STAY_Y + 5} className={s.band}>
        stay
      </text>
      {split && (
        <rect
          x={X0 - R - 8}
          y={STAY_Y - R - 8}
          width={(N - 1) * DX + 2 * R + 16}
          height={2 * R + 16}
          rx={14}
          className={s.stayBox}
        />
      )}
      {FRIENDS.map((f, i) => {
        const isGo = split && go.includes(i);
        const x = X0 + i * DX;
        const y = isGo ? GO_Y : STAY_Y;
        return (
          <g key={f}>
            <circle cx={x} cy={y} r={R} className={isGo ? s.goDot : s.stayDot} />
            <text x={x} y={y + 5} textAnchor="middle" className={isGo ? s.goLetter : s.letter}>
              {f}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** One pair as six small dots: the two that go filled, the four that stay hollow. No letters. */
function Chip({ pair }: { pair: number[] }) {
  return (
    <svg width={52} height={14} className={s.chip} aria-hidden>
      {FRIENDS.map((_, i) => (
        <circle key={i} cx={6 + i * 8} cy={7} r={3.2} className={pair.includes(i) ? s.chipGo : s.chipStay} />
      ))}
    </svg>
  );
}

function Stage({
  phase,
  locked,
  interact,
  view,
  setView,
  shown,
  setShown,
  seen,
}: StageContext & {
  view: View;
  setView: (v: View) => void;
  shown: Set<number>;
  setShown: (v: Set<number>) => void;
  seen: Seen;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const done = phase === "reveal";

  const record = (idx: number[]) => {
    const next = new Set(shown);
    for (const i of idx) {
      next.add(i);
      seen.pairs.add(i);
    }
    setShown(next);
    seen.one = true;
    reach("one");
    if (next.size === PAIRS.length) {
      seen.all = true;
      reach("all");
    }
  };
  const nextPair = () => {
    const i = (view.pair + 1) % PAIRS.length; // from the start (-1) or after the last pair, back to AB
    setView({ mode: "pair", pair: i });
    record([i]);
  };
  const allPairs = () => {
    const last = PAIRS.length - 1;
    setView({ mode: "pair", pair: last });
    record(PAIRS.map((_, i) => i));
  };
  const threes = () => {
    setView({ ...view, mode: "three" });
    seen.three = true;
  };
  const reset = () => {
    setView({ mode: "none", pair: -1 });
    setShown(new Set());
  };

  // At the reveal the stage shows what the learner reached, even after Reset: the last pair split, every pair
  // seen as a chip, both counters, and the groups-of-3 count if it was shown.
  const list = done ? seen.pairs : shown;
  const pairGo = done ? PAIRS[Math.max(0, view.pair)] : view.mode === "pair" ? PAIRS[view.pair] : view.mode === "three" ? THREES[0] : null;
  const allShown = list.size === PAIRS.length;
  const showThree = done ? seen.three : view.mode === "three";
  const total = (n: number) => (list.size > 0 ? ` of ${n}` : "");

  return (
    <div className={s.wrap}>
      <Friends go={pairGo} />
      <div className={s.counters} aria-live="polite">
        <p className={s.readout}>
          pairs seen: {list.size}
          {total(PAIRS.length)}
        </p>
        <p className={s.readout}>
          fours seen: {list.size}
          {total(FOURS.length)}
        </p>
      </div>
      <div className={s.grid} aria-label={`${list.size} pairs listed`}>
        {PAIRS.map((p, i) => (
          <div key={i} className={s.cell}>
            {list.has(i) && <Chip pair={p} />}
          </div>
        ))}
      </div>
      <p className={s.three}>{showThree ? `groups of 3: ${THREES.length}` : " "}</p>
      <Row>
        <Control disabled={locked || done} className={s.tap} onClick={nextPair}>
          Next pair
        </Control>
        <Control
          disabled={locked || done || allShown}
          className={`${s.tap} ${allShown ? "active" : ""}`}
          aria-pressed={allShown}
          onClick={allPairs}
        >
          All pairs
        </Control>
      </Row>
      <Row>
        <Control
          disabled={locked || done || view.mode === "three"}
          className={`${s.tap} ${view.mode === "three" ? "active" : ""}`}
          aria-pressed={view.mode === "three"}
          onClick={threes}
        >
          Groups of 3
        </Control>
        <Control
          disabled={locked || done || (view.mode === "none" && shown.size === 0)}
          className={s.tap}
          onClick={reset}
        >
          Reset
        </Control>
      </Row>
    </div>
  );
}
