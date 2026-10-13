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

const MILESTONES = ["city", "half-the-crowd"] as const;
const SMALL = POPS[POPS.length - 1];
const n = (v: number) => v.toLocaleString("en-US");
const label = (N: number) => (N >= 1_000_000 ? `${n(N / 1_000_000)} million` : n(N));
const m2 = (N: number) => `±${margin(N).toFixed(2)}`;
const share = (N: number) => {
  const p = (SAMPLE / N) * 100;
  return p >= 1 ? `${Math.round(p)}%` : `${p.toPrecision(2)}%`;
};
const POLLS_BY_N = new Map(POPS.map((N) => [N, polls(N)] as const));

const LO = 44;
const HI = 56;
const X0 = 20;
const X1 = 320;
const BASE = 150;
const x = (p: number) => X0 + ((p - LO) / (HI - LO)) * (X1 - X0);

function Stage({ locked, interact, pop, setPop }: { locked: boolean; interact: () => void; pop: number; setPop: (N: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const ps = POLLS_BY_N.get(pop) ?? [];
  const mg = margin(pop);
  const stacks = new Map<number, number>();
  const dots = ps.map((p) => {
    const bin = Math.round(p * 2) / 2;
    const k = stacks.get(bin) ?? 0;
    stacks.set(bin, k + 1);
    return { cx: x(bin), cy: BASE - 6 - k * 8, inside: Math.abs(p - 50) <= mg };
  });

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Dot: one poll of ${n(SAMPLE)} random people (truth 50% yes). Shaded: margin of error, where 95% of polls land.`}
      </p>
      <svg viewBox="0 0 340 172" className={`stage-svg ${s.svg}`} role="img" aria-label={`${POLLS} polls of ${n(SAMPLE)} people in a population of ${label(pop)}`}>
        {!locked && (
          <>
            <rect x={x(50 - mg)} y={30} width={x(50 + mg) - x(50 - mg)} height={BASE - 30} className={s.band} />
            <line x1={x(50 - mg)} y1={30} x2={x(50 - mg)} y2={BASE} className={s.bandEdge} />
            <line x1={x(50 + mg)} y1={30} x2={x(50 + mg)} y2={BASE} className={s.bandEdge} />
            <text x={x(50)} y={22} textAnchor="middle" className={s.bandLabel}>
              {m2(pop)} points
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
              if (N === CITY) reach("city");
              if (N === SMALL) reach("half-the-crowd");
            }}
          >
            {label(N)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Share polled" value={share(pop)} />
        <Readout label="Margin of error" value={locked ? "?" : m2(pop)} />
      </Row>
    </div>
  );
}

export default function CityPollNationPoll({ slug }: { slug: string }) {
  const [pop, setPop] = useState<number>(NATION);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Poll ${n(SAMPLE)} random people in a city of ${n(CITY)}, and ${n(SAMPLE)} in a nation of ${label(NATION)}. Margin of error = how far a poll may miss, 95% of the time. Which is bigger?`,
        options: ["The city's", "The nation's", "About the same"],
        answer: 2,
      }}
      exploreHint={`Change who lives there: try ${n(CITY)}, then ${n(SMALL)}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw the nation of {label(NATION)} give {m2(NATION)} points and the city of {n(CITY)} give {m2(CITY)}. Polling{" "}
            {share(CITY)} of the city instead of {share(NATION)} of the nation changed almost nothing.
          </p>
          <p>
            A poll&apos;s accuracy comes from how many people it asks, not what share of the crowd they are. Only at {n(SMALL)}{" "}
            people, where your poll was {share(SMALL)} of everyone, did the margin shrink, to {m2(SMALL)}. This assumes truly random
            picks; real polls only approximate that.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} pop={pop} setPop={setPop} />}
    </Lesson>
  );
}
