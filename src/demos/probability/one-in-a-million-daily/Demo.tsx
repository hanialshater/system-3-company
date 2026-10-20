"use client";

// Truly large numbers. A field of 1,000 dots is a city; each dot is a thousandth of it.
// Every person has a 1-in-a-million chance per day. At 10,000 people nothing happens for
// months; at 8 million the field lights up about 8 times every day.
// Key state: a day at 8 million, then a whole year there.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CITY, DOTS, POPS, YEAR, expectedPerDay, pNone, summary, year } from "./model";
import s from "./styles.module.css";

const YEARS = POPS.map((p) => year(p));
const CITY_I = POPS.indexOf(CITY as (typeof POPS)[number]);
const MILESTONES = ["day-in-city", "year-in-city"] as const;
const fmt = (n: number) => n.toLocaleString("en-US");
const short = (n: number) => (n >= 1e6 ? `${n / 1e6} million` : fmt(n));
const COLS = 40;
const GAP = 8.4;
const PER_DAY = expectedPerDay(CITY); // 8
const CITY_YEAR = summary(YEARS[CITY_I]);

interface State {
  pop: number; // index into POPS
  day: number; // days shown so far
}

function Stage({ locked, interact, st, set }: { locked: boolean; interact: () => void; st: State; set: (s: State) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const days = YEARS[st.pop].slice(0, st.day);
  const today = days[days.length - 1];
  const sum = summary(days);
  const lit = useMemo(() => new Set(today?.dots ?? []), [today]);
  const pop = POPS[st.pop];

  const advance = (n: number) => {
    const day = Math.min(YEAR, st.day + n);
    set({ ...st, day });
    if (st.pop !== CITY_I) return;
    reach("day-in-city");
    if (day === YEAR) reach("year-in-city");
  };

  const msg = locked
    ? "Make a prediction to start."
    : st.day === 0
      ? "Step through the days."
      : st.day === YEAR
        ? `A year: ${fmt(sum.total)} events, ${sum.none} days with none. Dots: day ${YEAR}.`
        : `Day ${st.day}: ${today.count} ${today.count === 1 ? "event" : "events"} today.`;

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 228" className={`stage-svg ${s.svg}`} role="img" aria-label={`${fmt(pop)} people, day ${st.day}, ${today?.count ?? 0} events`}>
        <text x={4} y={11} className={s.label}>
          {short(pop)} people · each dot {fmt(pop / DOTS)}
        </text>
        {Array.from({ length: DOTS }, (_, i) => (
          <circle key={i} cx={6 + (i % COLS) * GAP} cy={24 + Math.floor(i / COLS) * GAP} r={2.3} className={s.dot} />
        ))}
        {[...lit].map((i) => (
          <circle key={`l${i}`} cx={6 + (i % COLS) * GAP} cy={24 + Math.floor(i / COLS) * GAP} r={5.5} className={s.lit} />
        ))}
      </svg>
      <p className={s.chip}>1 in a million, per person, per day</p>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <Row>
        {POPS.map((p, i) => (
          <Control
            key={p}
            className={i === st.pop ? "active" : ""}
            aria-pressed={i === st.pop}
            disabled={locked || i === st.pop}
            onClick={() => set({ pop: i, day: 0 })}
          >
            {short(p)}
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked || st.day >= YEAR} onClick={() => advance(1)}>
          Next day
        </Control>
        <Control disabled={locked || st.day >= YEAR} onClick={() => advance(YEAR)}>
          Run a year
        </Control>
      </Row>
      <Row>
        <Readout label="Days" value={st.day} />
        <Readout label="Events per day" value={locked || !st.day ? "?" : sum.mean.toFixed(st.pop === CITY_I ? 1 : 2)} />
        <Readout label="Days with none" value={locked || !st.day ? "?" : sum.none} />
      </Row>
    </div>
  );
}

export default function OneInAMillionDaily({ slug }: { slug: string }) {
  const [st, set] = useState<State>({ pop: 0, day: 0 });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You live in a city of ${fmt(CITY)} people. Some lucky fluke has a 1-in-1,000,000 chance of happening to each person each day. How often does it happen somewhere in your city?`,
        options: ["Almost never", `About ${PER_DAY} times a day`, "About once a year"],
        answer: 1,
      }}
      exploreHint={`Go to ${short(CITY)} people. Step a day, then run a year.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your year at {short(CITY)} people the event happened {fmt(CITY_YEAR.total)} times: about{" "}
            <strong>{CITY_YEAR.mean.toFixed(0)} a day</strong>, and {CITY_YEAR.none === 0 ? "not one day" : `only ${CITY_YEAR.none} days`} went
            without. That is {fmt(CITY)} chances times 1 in a million: {PER_DAY} a day on average.
          </p>
          <p>
            A day with none would itself be the oddity:
            its chance is about {(pNone(CITY) * 100).toFixed(2)}%.
          </p>
          <p className="muted">
            Assumes everyone faces the same chance, independently, every day.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} set={set} />}
    </Lesson>
  );
}
