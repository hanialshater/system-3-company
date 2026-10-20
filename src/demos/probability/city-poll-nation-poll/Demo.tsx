"use client";

// Sample vs population. 40 seeded polls of 1,000 people from a population that is exactly 50% yes,
// drawn without replacement. The learner changes only the population size; the margin of error
// (shaded band) barely moves from 300 million down to 100,000 and shrinks only when the poll is a big
// share of the population (2,000). Key state: both the city (100,000) and the 2,000 setting seen.
// Population buttons come first in DOM order, so QA visits every value the question and reveal name.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CITY, NATION, POLLS, POPS, SAMPLE, margin, polls } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["city", "half-the-crowd", "ask-fewer", "ask-more"] as const;
const FEW = 250;
const MANY = 4000;
const SMALL = POPS[POPS.length - 1];
const n = (v: number) => v.toLocaleString("en-US");
const label = (N: number) => (N >= 1_000_000 ? `${n(N / 1_000_000)} million` : n(N));
const m2 = (N: number, k = SAMPLE) => `±${margin(N, k).toFixed(2)}`;
const share = (N: number, k = SAMPLE) => {
  const p = (k / N) * 100;
  return p >= 1 ? `${Math.round(p)}%` : `${p.toPrecision(2)}%`;
};
const cache = new Map<string, number[]>();
const pollsFor = (N: number, k: number) => {
  const key = `${N}:${k}`;
  if (!cache.has(key)) cache.set(key, polls(N, undefined, undefined, k));
  return cache.get(key)!;
};

const LO = 44;
const HI = 56;
const X0 = 20;
const X1 = 320;
const BASE = 150;
const x = (p: number) => X0 + ((p - LO) / (HI - LO)) * (X1 - X0);

function Stage({ locked, interact, pop, setPop, size, setSize }: { locked: boolean; interact: () => void; pop: number; setPop: (N: number) => void; size: number; setSize: (k: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const ps = pollsFor(pop, size);
  const mg = margin(pop, size);
  const stacks = new Map<number, number>();
  const dots = ps.map((p) => {
    const bin = Math.min(HI, Math.max(LO, Math.round(p * 2) / 2));
    const k = stacks.get(bin) ?? 0;
    stacks.set(bin, k + 1);
    return { cx: x(bin), cy: BASE - 6 - k * 8, inside: Math.abs(p - 50) <= mg };
  });

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Each dot: a poll of ${n(size)} (truth 50% yes). Shaded: where 95% land. Red: missed.`}
      </p>
      <svg viewBox="0 0 340 172" className={`stage-svg ${s.svg}`} role="img" aria-label={`${POLLS} polls of ${n(size)} people in a population of ${label(pop)}`}>
        {!locked && (
          <>
            <rect x={x(50 - mg)} y={30} width={x(50 + mg) - x(50 - mg)} height={BASE - 30} className={s.band} />
            <line x1={x(50 - mg)} y1={30} x2={x(50 - mg)} y2={BASE} className={s.bandEdge} />
            <line x1={x(50 + mg)} y1={30} x2={x(50 + mg)} y2={BASE} className={s.bandEdge} />
            <text x={x(50)} y={22} textAnchor="middle" className={s.bandLabel}>
              {m2(pop, size)} points
            </text>
          </>
        )}
        <line x1={x(50)} y1={30} x2={x(50)} y2={BASE} className={s.truth} />
        <line x1={X0} y1={BASE} x2={X1} y2={BASE} className={s.axis} />
        {[45, 50, 55].map((t) => (
          <text key={t} x={x(t)} y={BASE + 16} textAnchor="middle" className={s.tick}>
            {t}% yes
          </text>
        ))}
        {!locked && dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={3.4} className={d.inside ? s.dot : s.out} />)}
      </svg>
      <Row>
        {POPS.map((N) => (
          <Control
            key={N}
            className={pop === N ? "active" : ""}
            disabled={locked || pop === N}
            onClick={() => {
              setPop(N);
              setSize(SAMPLE);
              if (N === CITY) reach("city");
              if (N === SMALL) reach("half-the-crowd");
            }}
          >
            {label(N)}
          </Control>
        ))}
      </Row>
      <Row>
        {[FEW, SAMPLE, MANY].map((k) => (
          <Control
            key={k}
            className={size === k ? "active" : ""}
            disabled={locked || size === k}
            onClick={() => {
              setSize(k);
              setPop(NATION);
              if (k === FEW) reach("ask-fewer");
              if (k === MANY) reach("ask-more");
            }}
          >
            Nation, ask {n(k)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Share polled" value={share(pop, size)} />
        <Readout label="Margin of error" value={locked ? "?" : m2(pop, size)} />
      </Row>
    </div>
  );
}

export default function CityPollNationPoll({ slug }: { slug: string }) {
  const [pop, setPop] = useState<number>(NATION);
  const [size, setSize] = useState<number>(SAMPLE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two phone polls each reach ${n(SAMPLE)} random people: one in a city of ${n(CITY)}, one in a nation of ${label(NATION)}. Margin of error is how far a poll may miss, 95% of the time. Which poll's is bigger?`,
        options: ["The city poll's", "The nation poll's", "About the same"],
        answer: 2,
      }}
      exploreHint={`Shrink the population to ${n(CITY)}, then ${n(SMALL)}. Then change how many are asked.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw the nation of {label(NATION)} give {m2(NATION)} points and the city of {n(CITY)} give {m2(CITY)}. Polling{" "}
            {share(CITY)} of the city instead of {share(NATION)} of the nation changed almost nothing.
          </p>
          <p>
            A poll&apos;s accuracy comes from how many people it asks, not what share of the crowd they are. In the nation, asking{" "}
            {n(FEW)} gave {m2(NATION, FEW)} and asking {n(MANY)} gave {m2(NATION, MANY)}. Only at {n(SMALL)} people, where your
            poll was {share(SMALL)} of everyone, did the margin shrink without asking more, to {m2(SMALL)}. This assumes truly random
            picks; real polls only approximate that.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} pop={pop} setPop={setPop} size={size} setSize={setSize} />}
    </Lesson>
  );
}
