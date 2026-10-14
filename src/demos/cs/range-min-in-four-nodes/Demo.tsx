"use client";

// A segment tree over 16 positions, drawn as blocks: level 0 is the whole row, then halves, quarters, eighths and
// single positions. Each block stores the minimum of its positions. A range query takes a block if it lies wholly
// inside the range, skips it if it lies wholly outside, and otherwise asks its two halves. [3, 12] -> [3], [4-7],
// [8-11], [12]: 4 blocks. [1, 14] -> 6. Changing one value rewrites only the 5 blocks above it.
// v2 (r6): title and hook no longer state the answer; readouts sit above the sliders (they were cropped);
// the reveal quotes the learner's own last range (state lifted to the lesson) instead of 1 to 14, and the
// value change is a milestone, so "only the 5 nodes on its path" is something the learner did.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 16;
const LEVELS = 5; // 16, 8, 4, 2, 1 positions per block
const START = [6, 3, 8, 5, 7, 9, 4, 8, 6, 2, 7, 5, 3, 9, 1, 8];
const EDIT_AT = 9; // the "change a value" position (inside 3..12)
const EDIT_VALUES = [2, 8, 4];
const Q_LO = 3;
const Q_HI = 12;

type Block = { d: number; l: number; r: number };
const BLOCKS: Block[] = [];
for (let d = 0; d < LEVELS; d++) {
  const size = N >> d;
  for (let k = 0; k < 1 << d; k++) BLOCKS.push({ d, l: k * size, r: (k + 1) * size - 1 });
}
const key = (b: Block) => `${b.l}-${b.r}`;

// The blocks a query [lo, hi] combines, by the take / skip / split rule.
function cover(lo: number, hi: number, l = 0, r = N - 1, out: Block[] = [], d = 0): Block[] {
  if (hi < l || r < lo) return out;
  if (lo <= l && r <= hi) {
    out.push({ d, l, r });
    return out;
  }
  const m = (l + r) >> 1;
  cover(lo, hi, l, m, out, d + 1);
  cover(lo, hi, m + 1, r, out, d + 1);
  return out;
}
const Q_COVER = cover(Q_LO, Q_HI);
const Q_COUNT = Q_COVER.length; // 4
const Q_KEYS = new Set(Q_COVER.map((b) => `${b.l}-${b.r}`));
const label = (b: Block) => (b.l === b.r ? `[${b.l}]` : `[${b.l} to ${b.r}]`);
const Q_LABELS = Q_COVER.map(label); // [3], [4 to 7], [8 to 11], [12]
let MAX_COUNT = 0;
for (let a = 0; a < N; a++) for (let b = a; b < N; b++) MAX_COUNT = Math.max(MAX_COUNT, cover(a, b).length);
const PATH_LEN = BLOCKS.filter((b) => b.l <= EDIT_AT && EDIT_AT <= b.r).length; // 5

const W = 19;
const X0 = 8;
const RH = 30;
const Y0 = 8;
const bx = (b: Block) => X0 + b.l * W + 1;
const bw = (b: Block) => (b.r - b.l + 1) * W - 2;
const by = (b: Block) => Y0 + b.d * RH;

type Range = { lo: number; hi: number };
function Stage({
  locked,
  reach,
  range,
  setR,
}: {
  locked: boolean;
  reach: (n: string) => void;
  range: Range;
  setR: (r: Range) => void;
}) {
  const { lo, hi } = range;
  const [vals, setVals] = useState(START);
  const [edits, setEdits] = useState(0);
  const [combined, setCombined] = useState<string | null>(null); // "lo-hi-edits" when combined
  const [changed, setChanged] = useState(false);
  const [prev, setPrev] = useState<number | null>(null); // the value at EDIT_AT before the last change
  // Recorded the first time the question's own range is combined, and never rewritten; stays on the
  // stage after the range moves or a value changes.
  const [seenMin, setSeenMin] = useState<number | null>(null);

  const min = (b: Block) => Math.min(...vals.slice(b.l, b.r + 1));
  const used = cover(lo, hi);
  const usedKeys = new Set(used.map(key));
  const isCombined = combined === `${lo}-${hi}-${edits}`;
  const answer = Math.min(...used.map(min));

  const setRange = (a: number, b: number) => {
    if (locked) return;
    setR({ lo: a, hi: b });
    setChanged(false);
    if (a === Q_LO && b === Q_HI) reach("range");
  };
  const combine = () => {
    if (locked || isCombined) return;
    setCombined(`${lo}-${hi}-${edits}`);
    setChanged(false);
    if (lo === Q_LO && hi === Q_HI) {
      if (seenMin === null) setSeenMin(answer);
      reach("combined");
    }
  };
  const change = () => {
    if (locked) return;
    const e = edits + 1;
    setEdits(e);
    setPrev(vals[EDIT_AT]);
    setVals(vals.map((v, i) => (i === EDIT_AT ? EDIT_VALUES[e % EDIT_VALUES.length] : v)));
    setChanged(true);
    reach("changed");
  };

  const msg = locked
    ? "Predict first, then pick a range."
    : changed
      ? `Position ${EDIT_AT} changed from ${prev} to ${vals[EDIT_AT]}: only the ${PATH_LEN} nodes on its path to the top were rewritten.`
      : isCombined
        ? `Minimum of ${lo} to ${hi} is ${answer}, from ${used.length} stored nodes.`
        : `Lit nodes lie wholly inside ${lo} to ${hi}. Combine them.`;

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`Range ${lo} to ${hi} uses ${used.length} nodes`}>
        {BLOCKS.map((b) => {
          const on = usedKeys.has(key(b));
          const onPath = changed && b.l <= EDIT_AT && EDIT_AT <= b.r;
          // The Seen row's blocks keep a dashed outline whenever they are not lit, including when one is
          // also on a change path (then the dashes are drawn in the path's green).
          const dashed = !on && seenMin !== null && Q_KEYS.has(key(b));
          const trace = dashed && !onPath;
          return (
            <g key={key(b)}>
              <rect
                x={bx(b)}
                y={by(b)}
                width={bw(b)}
                height={RH - 5}
                rx={4}
                fill={on ? "var(--domain)" : "var(--bg-2)"}
                fillOpacity={on ? 0.85 : 1}
                stroke={onPath ? "var(--good)" : on ? "var(--fg)" : trace ? "var(--domain)" : "var(--line)"}
                strokeWidth={onPath ? 3 : on ? (isCombined ? 2.5 : 1.5) : trace ? 2 : 1}
                strokeDasharray={dashed ? "4 3" : undefined}
              />
              <text x={bx(b) + bw(b) / 2} y={by(b) + 17} textAnchor="middle" className={`${s.v} ${on ? s.vOn : ""}`}>
                {min(b)}
              </text>
            </g>
          );
        })}
        {Array.from({ length: N }, (_, i) => (
          <text key={i} x={X0 + i * W + W / 2} y={Y0 + LEVELS * RH + 8} textAnchor="middle" className={s.idx}>
            {i}
          </text>
        ))}
        <rect x={X0 + lo * W} y={Y0 + LEVELS * RH + 14} width={(hi - lo + 1) * W} height={6} rx={3} fill="var(--domain)" />
      </svg>
      <Row>
        <Readout label="Positions" value={hi - lo + 1} />
        <Readout label="Nodes used" value={used.length} />
        <Readout label="Minimum" value={isCombined ? answer : "?"} />
      </Row>
      {seenMin !== null && (
        <p className={s.seen}>
          Seen (first combine): {Q_LO} to {Q_HI} = {Q_LABELS.join(" + ")}, {Q_COUNT} nodes, minimum {seenMin}
        </p>
      )}
      <Row>
        <Control className={`${s.tap} active`} disabled={locked || (lo === Q_LO && hi === Q_HI)} onClick={() => setRange(Q_LO, Q_HI)}>
          Positions {Q_LO} to {Q_HI}
        </Control>
        <Control className={s.tap} disabled={locked || isCombined} onClick={combine}>
          Combine the lit nodes
        </Control>
      </Row>
      <Slider label="From" value={lo} min={0} max={N - 1} disabled={locked} onChange={(v) => setRange(v, Math.max(v, hi))} />
      <Slider label="To" value={hi} min={0} max={N - 1} disabled={locked} onChange={(v) => setRange(Math.min(lo, v), v)} />
      <Row>
        <Control className={s.tap} disabled={locked} onClick={change}>
          Change the value at {EDIT_AT}
        </Control>
      </Row>
    </div>
  );
}

export default function RangeMinInFourNodes({ slug }: { slug: string }) {
  const [range, setR] = useState<Range>({ lo: 0, hi: N - 1 });
  const own = cover(range.lo, range.hi).length;
  const isQ = range.lo === Q_LO && range.hi === Q_HI;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A tree over ${N} positions stores the minimum of every aligned half, quarter and eighth. To get the minimum over positions ${Q_LO} to ${Q_HI}, how many stored nodes do you combine?`,
        options: [String(Q_HI - Q_LO + 1), String(Q_COUNT), "2"],
        answer: 1,
      }}
      exploreHint={`Select ${Q_LO} to ${Q_HI}, combine, then drag the range.`}
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Positions {Q_LO} to {Q_HI} are {Q_HI - Q_LO + 1} values, but you combined just <strong>{Q_COUNT}</strong> stored
              nodes: {Q_LABELS.slice(0, -1).join(", ")} and {Q_LABELS[Q_LABELS.length - 1]} (the Seen row; dashed when not lit).
            Only the ragged ends need small nodes; the middle is covered by big
            aligned ones.{" "}
            {isQ ? "" : `Your last range, ${range.lo} to ${range.hi}, needed ${own}. `}No range of these {N} positions needs
            more than {MAX_COUNT}.
          </p>
          <p>
            Every range is a union of at most about 2 log₂ n stored nodes, where log₂ n counts the halvings from n
            down to 1 (4 for {N}). When you changed one value, only the {PATH_LEN} nodes on its path to the top were
            rewritten, so both the question and the update take about log n steps. The same tree works
            for maximum or sum.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["range", "combined", "changed"]}>
          {(reach) => <Stage locked={locked} reach={reach} range={range} setR={setR} />}
        </Milestones>
      )}
    </Lesson>
  );
}
