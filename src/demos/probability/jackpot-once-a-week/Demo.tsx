"use client";

// Lottery odds in human time. A log time axis from 1 year to 10 million years. The learner steps
// through spans (1, 10, 80, 1,000, 100,000 years, the expected wait, and this seeded run's first win);
// readouts show tickets bought, the exact chance of a win by then and the run's wins.
// Key state: the 80-year lifetime and the expected wait both reached. Span buttons come first in DOM order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EXPECTED_YEARS, LIFETIME, ODDS, SPANS, WEEKS_PER_YEAR, chanceBy, firstWinWeek, tickets } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["lifetime", "expected"] as const;
const n = (v: number) => Math.round(v).toLocaleString("en-US");
const yrs = (y: number) => (y >= 1_000_000 ? `${(y / 1_000_000).toFixed(1)} million` : n(y));
const pctSmall = (p: number) => (p >= 0.1 ? `${Math.round(p * 100)}%` : p >= 0.01 ? `${(p * 100).toFixed(1)}%` : `${(p * 100).toPrecision(2)}%`);
const WIN_WEEK = firstWinWeek();
const WIN_YEARS = WIN_WEEK / WEEKS_PER_YEAR;
const ALL: readonly number[] = [...SPANS, WIN_YEARS];
const LABELS = ["1 year", "10 years", `${LIFETIME} years`, "1,000 years", "100,000 years", "Until a win is expected", "Until this run wins"];
const EXPECTED_I = SPANS.length - 1;
const RUN_I = ALL.length - 1;
const LIFE_I = SPANS.indexOf(LIFETIME);

const X0 = 20;
const X1 = 320;
const DEC = 7; // 1 to 10^7 years
const x = (y: number) => X0 + (Math.log10(Math.max(y, 1)) / DEC) * (X1 - X0);
const TICKS = ["1", "10", "100", "1k", "10k", "100k", "1M", "10M"];

function Stage({ locked, interact, at, go }: { locked: boolean; interact: () => void; at: number; go: (i: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const years = at < 0 ? 0 : ALL[at];
  const t = at < 0 ? 0 : tickets(years);
  const wins = at < 0 ? 0 : t >= WIN_WEEK ? 1 : 0;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "One ticket every week. Each tick on the line is 10 times longer than the last."}</p>
      <svg viewBox="0 0 340 92" className={`stage-svg ${s.svg}`} role="img" aria-label={`${yrs(years)} years of weekly tickets`}>
        <rect x={X0} y={40} width={X1 - X0} height={22} rx={4} className={s.track} />
        {at >= 0 && <rect x={X0} y={40} width={x(years) - X0} height={22} rx={4} className={s.fill} />}
        <line x1={x(LIFETIME)} y1={32} x2={x(LIFETIME)} y2={70} className={s.life} />
        <text x={x(LIFETIME)} y={26} textAnchor="middle" className={s.lifeLabel}>
          a lifetime
        </text>
        {wins > 0 && (
          <>
            <circle cx={x(WIN_YEARS)} cy={51} r={6} className={s.win} />
            <text x={x(WIN_YEARS)} y={26} textAnchor="middle" className={s.winLabel}>
              win!
            </text>
          </>
        )}
        {TICKS.map((k, i) => (
          <g key={k}>
            <line x1={x(10 ** i)} y1={62} x2={x(10 ** i)} y2={68} className={s.axis} />
            <text x={x(10 ** i)} y={82} textAnchor="middle" className={s.tick}>
              {k}
            </text>
          </g>
        ))}
      </svg>
      <Row>
        {ALL.map((_, i) => (
          <Control
            key={i}
            className={at === i ? "active" : ""}
            disabled={locked || at === i}
            onClick={() => {
              go(i);
              if (i === LIFE_I) reach("lifetime");
              if (i === EXPECTED_I) reach("expected");
            }}
          >
            {LABELS[i]}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Years" value={yrs(years)} />
        <Readout label="Tickets" value={n(t)} />
        <Readout label="Wins this run" value={wins} />
        <Readout label="Chance of a win by now" value={at < 0 ? "?" : pctSmall(chanceBy(t))} />
      </Row>
    </div>
  );
}

export default function JackpotOnceAWeek({ slug }: { slug: string }) {
  const [at, setAt] = useState(-1);
  const [sawRun, setSawRun] = useState(false);
  const go = (i: number) => {
    setAt(i);
    if (i === RUN_I) setSawRun(true);
  };
  const life = tickets(LIFETIME);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A jackpot's odds are 1 in ${n(ODDS)} per ticket. Buying one ticket every week, about how long until you'd expect your first win?`,
        options: [
          `about ${n(Math.round(EXPECTED_YEARS / 1000 / 100) * 100)} years`,
          `about ${n(Math.round(EXPECTED_YEARS / 100 / 1000) * 1000)} years`,
          `about ${yrs(EXPECTED_YEARS)} years`,
        ],
        answer: 2,
      }}
      exploreHint="Step through the spans, from one year to a lifetime and beyond."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {LIFETIME}-year lifetime was {n(life)} tickets and a {pctSmall(chanceBy(life))} chance of any jackpot. To expect one
            win you need {n(ODDS)} tickets: <strong>{yrs(EXPECTED_YEARS)} years</strong> of weekly play.
          </p>
          <p>
            Even then it is no promise: by that point the chance of a win was {pctSmall(chanceBy(tickets(EXPECTED_YEARS)))}
            {sawRun ? `, and your run's first win came at ${yrs(WIN_YEARS)} years` : ""}. Odds this small sit far outside a human
            life.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} at={at} go={go} />}
    </Lesson>
  );
}
