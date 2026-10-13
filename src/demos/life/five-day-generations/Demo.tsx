"use client";

// Toy model of R as growth per generation of infection. A made-up infection; generations are
// 5 days apart and do not overlap; every generation has R times the previous generation's new
// cases. Generation 0 has 20 new cases. Each dot is one new case in the generation shown, lit
// from the centre out. Deterministic: no randomness.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 20;
const GEN_DAYS = 5;
const MAX_GEN = 6;
const R_Q = 1.5; // the question's R
const RS = [0.8, 1.2, R_Q, 2];
const COLS = 40;
const ROWS = 32; // 1,280 = 20 x 2^6, the largest count on the stage
const GAP = 8;
const KEY_GEN = 4; // "clearly past 100" (101 at R 1.5)
const MILESTONES = ["past-100", "shrinks"] as const;

const cases = (r: number, g: number) => START * r ** g;
const fmt = (x: number) => Math.round(x).toLocaleString("en-US");
const ANSWER = cases(R_Q, MAX_GEN); // 227.8
const ANSWER_ROUND = Math.round(ANSWER / 10) * 10; // 230
const NAIVE = START * R_Q; // 30: "50% more" once

// Dot order: by distance from the centre, ties broken by a fixed hash (layout only).
const ORDER = (() => {
  const cx = (COLS - 1) / 2, cy = (ROWS - 1) / 2;
  const idx = Array.from({ length: COLS * ROWS }, (_, i) => i);
  const key = (i: number) => Math.hypot((i % COLS) - cx, Math.floor(i / COLS) - cy) + ((i * 2654435761) % 1000) / 1e5;
  idx.sort((a, b) => key(a) - key(b));
  const rank = Array(COLS * ROWS).fill(0);
  idx.forEach((i, r) => (rank[i] = r));
  return rank;
})();

interface Seen {
  maxGenAtQ: number;
  shrink: { r: number; g: number } | null;
}

function Stage({
  locked,
  reach,
  onSeen,
}: {
  locked: boolean;
  reach: (n: string) => void;
  onSeen: (f: (s: Seen) => Seen) => void;
}) {
  const [gen, setGen] = useState(0);
  const [r, setR] = useState(R_Q);

  const go = (g: number, rr: number) => {
    setGen(g);
    setR(rr);
    if (rr === R_Q && g >= KEY_GEN) {
      reach("past-100");
      onSeen((x) => ({ ...x, maxGenAtQ: Math.max(x.maxGenAtQ, g) }));
    }
    if (rr < 1 && g >= 1) {
      reach("shrinks");
      onSeen((x) => ({ ...x, shrink: x.shrink && x.shrink.g >= g ? x.shrink : { r: rr, g } }));
    }
  };

  const n = Math.round(cases(r, gen));
  const lit = locked ? START : n;
  const dots = useMemo(() => ORDER.map((rank) => rank < lit), [lit]);
  const history = Array.from({ length: gen + 1 }, (_, g) => fmt(cases(r, g))).join(" → ");

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * GAP} ${ROWS * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${n} new cases`}>
        {dots.map((on, i) => (
          <circle key={i} cx={(i % COLS) * GAP + GAP / 2} cy={Math.floor(i / COLS) * GAP + GAP / 2} r={on ? 3.2 : 1.2} className={on ? s.on : s.off} />
        ))}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? `Make a prediction to start. Toy: R fixed, generations ${GEN_DAYS} days apart. Each dot is a new case.`
          : `R ${r}, gen ${gen} (day ${gen * GEN_DAYS}): ${fmt(n)} new cases.`}
      </p>
      <p className={s.hist} aria-hidden>{locked ? " " : history}</p>

      <Row>
        <Control disabled={locked || gen >= MAX_GEN} onClick={() => go(gen + 1, r)}>Next generation</Control>
        <Control disabled={locked || gen === MAX_GEN} onClick={() => go(MAX_GEN, r)}>Gen {MAX_GEN}</Control>
      </Row>
      <Row>
        {RS.map((x) => (
          <Control key={x} className={r === x ? "active" : ""} aria-pressed={r === x} disabled={locked || r === x} onClick={() => go(gen, x)}>
            R {x}
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked || gen === 0} onClick={() => go(0, r)}>Restart</Control>
      </Row>
    </div>
  );
}

export default function FiveDayGenerations({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({ maxGenAtQ: 0, shrink: null });
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up infection, R = ${R_Q}: each generation (${GEN_DAYS} days) has ${R_Q} times the last one's new cases. ${START} new cases now. New cases in generation ${MAX_GEN}?`,
        options: [`About ${NAIVE}`, `About ${ANSWER_ROUND}`, "About 1,000"],
        answer: 1,
      }}
      exploreHint={`Step to generation ${KEY_GEN} or later at R ${R_Q}. Then try R below 1.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You stepped to generation {seen.maxGenAtQ} at R {R_Q}. Each generation multiplies the last: {START} &times; {R_Q}
            <sup>{MAX_GEN}</sup> = {ANSWER.toFixed(1)}, so about <strong>{fmt(ANSWER)}</strong> new cases in generation {MAX_GEN}
            (day {MAX_GEN * GEN_DAYS}). &ldquo;50% more&rdquo; happens {MAX_GEN} times, not once.
          </p>
          <p>
            {seen.shrink
              ? `At R ${seen.shrink.r}, generation ${seen.shrink.g} had ${fmt(cases(seen.shrink.r, seen.shrink.g))} new cases. `
              : ""}
            Below 1 the same compounding runs the other way: each generation is smaller, and the outbreak fades.
          </p>
          <p className="muted">
            Toy model: R never changes and generations do not overlap. In real outbreaks R changes with behaviour and immunity.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} onSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}
