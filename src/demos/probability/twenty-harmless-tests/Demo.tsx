"use client";

// Multiple comparisons. Twenty things with no real effect, each tested with a 5% false-alarm
// rate. The learner runs a batch card by card, then runs 1,000 batches.
// The payoff: about 64% of batches contain at least one "finding". Look at enough noise
// and some of it will look like a result.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { TESTS, batch, many } from "./model";
import s from "./styles.module.css";



export default function TwentyHarmlessTests({ slug }: { slug: string }) {
  const [b, setB] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => Array(TESTS).fill(false));
  const [bulk, setBulk] = useState({ runs: 0, any: 0, alarms: 0 });
  const result = batch(b); // manual batches 0, 1, 2...; bulk runs start at batch 1,000
  const ran = done.filter(Boolean).length;
  const alarms = result.filter((r, i) => r && done[i]).length;

  const runOne = (i: number, interact: () => void) => {
    const next = done.map((d, j) => d || j === i);
    setDone(next);
    if (next.every(Boolean)) interact();
  };

  const pct = bulk.runs ? Math.round((100 * bulk.any) / bulk.runs) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your nutrition lab tests 20 foods for a link to a disease. None truly has one, and each test has a 5% false-alarm rate. What is the chance at least one looks significant?",
        options: ["About 5%", "About 64%", "100%"],
        answer: 1,
      }}
      exploreHint="Run all 20 tests in a batch. Then run 1,000 batches and count."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {pct !== null ? `Of your ${bulk.runs.toLocaleString("en-US")} batches, ${pct}% had at least one false alarm. ` : ""}
            The exact chance is <strong>64%</strong>. Each test is 95% likely to stay quiet, but all 20 staying quiet is
            0.95 multiplied by itself 20 times: only 36%.
          </p>
          <p>
            On average a batch of 20 null tests produces one false alarm.
          </p>
          <p className="muted">
            This assumes the tests are independent. Report how many things you tested, or raise the bar for each one.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <Row>
            <Control
              disabled={locked || ran === TESTS}
              onClick={() => {
                setDone(Array(TESTS).fill(true));
                interact();
              }}
            >
              Run all 20
            </Control>
            <Control
              disabled={locked || ran === 0}
              onClick={() => {
                setB((x) => x + 1);
                setDone(Array(TESTS).fill(false));
              }}
            >
              New batch
            </Control>
            <Control
              disabled={locked}
              onClick={() => {
                const m = many(1000 + bulk.runs, 1000);
                setBulk((x) => ({ runs: x.runs + 1000, any: x.any + m.anyAlarm, alarms: x.alarms + m.alarms }));
                interact();
              }}
            >
              Run 1,000 batches
            </Control>
          </Row>
          <p className={s.msg}>No test has a real effect. Each has a 5% false-alarm chance.</p>
          <div className={s.grid}>
            {result.map((r, i) => (
              <Control
                key={i}
                className={`${s.card} ${done[i] ? (r ? s.alarm : s.quiet) : ""}`}
                disabled={locked || done[i]}
                aria-label={`Test ${i + 1}`}
                onClick={() => runOne(i, interact)}
              >
                {done[i] ? (r ? "!" : "–") : i + 1}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Alarms, this batch" value={ran ? `${alarms} of ${ran}` : "—"} />
            <Readout
              label="Batches with an alarm"
              value={locked || !bulk.runs ? "—" : `${bulk.any.toLocaleString("en-US")}/${bulk.runs.toLocaleString("en-US")} (${pct}%)`}
            />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
