"use client";

// p-values by counting. Each press runs 250 seeded batches of 100 fair flips and drops their head
// counts into a histogram. Batches at or past the marker are shaded; their share is the p-value.
// Key state: at least 250 batches seen with the marker at 60 (the question's threshold), with some
// batches landing there. The reveal quotes the counts the learner saw at 60, not a typical run.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { FLIPS, MARK, MAX_BATCHES, STEP, batches, exactTail, tail } from "./model";
import s from "./styles.module.css";

const HEADS = batches();
const LO = 30;
const HI = 70;
const BINS = HI - LO + 1;
const MILESTONES = ["tail-at-60"] as const;
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
const EXACT = exactTail(MARK);
const X0 = 20;
const W = 320;
const BW = W / BINS;
const BASE = 160;
const H = 140;
const bx = (heads: number) => X0 + (heads - LO) * BW;

type Seen = { n: number; k: number } | null;

function Stage({
  locked,
  interact,
  n,
  setN,
  mark,
  setMark,
  setSeen,
}: {
  locked: boolean;
  interact: () => void;
  n: number;
  setN: (v: number) => void;
  mark: number;
  setMark: (v: number) => void;
  setSeen: (v: Seen) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const hist = new Array(BINS).fill(0);
  for (let i = 0; i < n; i++) if (HEADS[i] >= LO && HEADS[i] <= HI) hist[HEADS[i] - LO]++;
  const k = tail(HEADS, n, mark);
  const ymax = Math.max(8, ...hist);

  const note = (nn: number, m: number) => {
    if (m !== MARK || nn === 0) return;
    const kk = tail(HEADS, nn, MARK);
    setSeen({ n: nn, k: kk });
    if (kk > 0) reach("tail-at-60");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : n === 0
            ? `Each batch: ${FLIPS} flips of a fair coin. Run some.`
            : "Shaded: batches at or past the marker."}
      </p>
      <svg viewBox="0 0 360 186" className={`stage-svg ${s.svg}`} role="img" aria-label={`${n} batches; ${k} with ${mark} or more heads`}>
        <line x1={X0} y1={BASE} x2={X0 + W} y2={BASE} className={s.axisLine} />
        {hist.map((c, i) => {
          const h = (c / ymax) * H;
          return <rect key={i} x={X0 + i * BW + 0.6} y={BASE - h} width={BW - 1.2} height={h} className={LO + i >= mark ? s.barTail : s.bar} />;
        })}
        <line x1={bx(mark)} y1={BASE - H - 6} x2={bx(mark)} y2={BASE + 4} className={s.marker} />
        <text x={bx(mark) + 3} y={BASE - H + 4} className={s.markLabel}>
          {mark}+
        </text>
        {[30, 40, 50, 60, 70].map((t) => (
          <text key={t} x={bx(t) + BW / 2} y={BASE + 14} textAnchor="middle" className={s.tick}>
            {t}
          </text>
        ))}
        <text x={X0 + W / 2} y={BASE + 25} textAnchor="middle" className={s.tick}>
          heads in a batch of {FLIPS}
        </text>
      </svg>
      <Row>
        <Control
          disabled={locked || n >= MAX_BATCHES}
          onClick={() => {
            const nn = Math.min(MAX_BATCHES, n + STEP);
            setN(nn);
            note(nn, mark);
          }}
        >
          {n >= MAX_BATCHES ? `All ${MAX_BATCHES.toLocaleString("en-US")} run` : `Run ${STEP} batches`}
        </Control>
      </Row>
      <Row>
        <Slider
          label="Marker"
          value={mark}
          min={50}
          max={75}
          disabled={locked}
          format={(v) => `${v}+ heads`}
          onChange={(v) => {
            setMark(v);
            note(n, v);
          }}
        />
      </Row>
      <Row>
        <Readout label="Batches" value={n.toLocaleString("en-US")} />
        <Readout label="At or past marker" value={n === 0 ? "-" : `${k} (${pct1(k / n)})`} />
      </Row>
    </div>
  );
}

export default function HowSurprisingIsSixty({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [mark, setMark] = useState(MARK);
  const [seen, setSeen] = useState<Seen>(null);
  const kNow = tail(HEADS, n, mark);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your friend says her coin is fair. If it is, and she flips it ${FLIPS} times, how often will she get ${MARK} or more heads?`,
        options: ["about 0.3%", `about ${Math.round(EXACT * 100)}%`, "about 30%"],
        answer: 1,
      }}
      exploreHint={`Run batches with the marker at ${MARK}. Then slide the marker.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the marker at {MARK}, {seen?.k ?? 0} of your {(seen?.n ?? 0).toLocaleString("en-US")} batches had {MARK} or more
            heads ({pct1((seen?.k ?? 0) / Math.max(1, seen?.n ?? 1))}). The exact figure for a fair coin is{" "}
            <strong>{pct1(EXACT)}</strong>: about {Math.round(EXACT * 100)}%.
            {mark !== MARK && n > 0 ? ` At ${mark}+ it was ${kNow} of ${n.toLocaleString("en-US")}.` : ""}
          </p>
          <p>
            That share is a p-value: how often luck alone, with a coin known to be fair, goes at least this far. It is not the
            chance that the coin is fair. Working that out would also need to know how common unfair coins are.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} n={n} setN={setN} mark={mark} setMark={setMark} setSeen={setSeen} />
      )}
    </Lesson>
  );
}
