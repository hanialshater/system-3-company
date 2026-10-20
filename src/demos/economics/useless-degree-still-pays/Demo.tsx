"use client";

// Job-market signalling. Able workers produce $100k, others $50k. Firms pay $100k to anyone with
// the degree and $50k to anyone without. The degree teaches nothing; it costs each type a different
// amount (learner sets both). A type gets the degree only if $100k minus its cost beats $50k
// (a tie means it skips). Per type: one bar for pay with the degree (cost shaded off the top),
// one for pay without.
// Key states: others' cost made cheap enough that they buy it too (firms then pay $100k for $50k
// workers), then back to a state where only the able get it.
// Model: two types, fixed firm pay rule, invented numbers (after Spence 1973).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PAY_WITH = 100;
const PAY_WITHOUT = 50;
const OUTPUT = { able: 100, other: 50 } as const;
const START = { able: 20, other: 60 } as const;
const MILESTONES = ["pooling", "separating"] as const;

const net = (cost: number) => PAY_WITH - cost;
const takes = (cost: number) => net(cost) > PAY_WITHOUT;
const k$ = (v: number) => `$${v}k`;

const BASE = 150;
const SCALE = 1.2; // px per $k

function TypeBars({ x, name, cost, locked }: { x: number; name: string; cost: number; locked: boolean }) {
  const gets = takes(cost);
  const n = net(cost);
  return (
    <g>
      <text x={x + 58} y={14} className={s.value} textAnchor="middle">
        {name}
      </text>
      {/* with the degree */}
      <rect x={x} y={BASE - PAY_WITH * SCALE} width={50} height={PAY_WITH * SCALE} className={s.track} />
      {!locked && (
        <g>
          <rect x={x} y={BASE - n * SCALE} width={50} height={Math.max(0, n * SCALE)} className={gets ? s.goodFill : s.mutedFill} />
          <rect x={x} y={BASE - PAY_WITH * SCALE} width={50} height={cost * SCALE} className={s.badFill} />
          {cost >= 12 && (
            <text x={x + 25} y={BASE - PAY_WITH * SCALE + (cost * SCALE) / 2 + 4} className={s.small} textAnchor="middle">
              −{k$(cost)}
            </text>
          )}
          <text x={x + 25} y={BASE - Math.max(n, 0) * SCALE - (cost >= 12 ? -14 : 4)} className={s.small} textAnchor="middle">
            {n > 8 ? k$(n) : ""}
          </text>
        </g>
      )}
      {/* without */}
      <rect x={x + 66} y={BASE - PAY_WITHOUT * SCALE} width={50} height={PAY_WITHOUT * SCALE} className={!locked && !gets ? s.goodFill : s.mutedFill} />
      <text x={x + 91} y={BASE - PAY_WITHOUT * SCALE - 4} className={s.small} textAnchor="middle">
        {k$(PAY_WITHOUT)}
      </text>
      <text x={x + 25} y={BASE + 14} className={s.axis} textAnchor="middle">
        degree
      </text>
      <text x={x + 91} y={BASE + 14} className={s.axis} textAnchor="middle">
        none
      </text>
      {!locked && (
        <text x={x + 58} y={BASE + 32} className={gets ? s.value : s.axis} textAnchor="middle">
          {gets ? "gets it" : cost === PAY_WITH - PAY_WITHOUT ? "tie: skips" : "skips it"}
        </text>
      )}
    </g>
  );
}

export default function UselessDegree({ slug }: { slug: string }) {
  const [able, setAble] = useState<number>(START.able);
  const [other, setOther] = useState<number>(START.other);

  const a = takes(able);
  const o = takes(other);
  const status = a && !o ? "sep" : a && o ? "pool" : !a && !o ? "none" : "odd";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Deciding whether to enrol, you see the numbers. Able workers produce $${OUTPUT.able}k, others $${OUTPUT.other}k; firms pay $${PAY_WITH}k to degree-holders. The degree teaches nothing; it costs the able $${START.able}k, others $${START.other}k. Who gets it?`,
        options: ["Everyone", "Only the able", "No one"],
        answer: 1,
      }}
      exploreHint="Make the degree cheap for the others too, then put it back."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the degree the able net {k$(PAY_WITH)} − {k$(START.able)} = <strong>{k$(net(START.able))}</strong> against{" "}
            {k$(PAY_WITHOUT)} without; the others net {k$(net(START.other))}, less than {k$(PAY_WITHOUT)}. Only the able get it.
          </p>
          <p>
            When you made it cheap for the others, they bought it too, and firms paid {k$(PAY_WITH)} for {k$(OUTPUT.other)} workers: the
            degree stopped meaning anything. It signals ability only because it costs the able less to earn.
          </p>
          <p>So firms are right to pay holders more, though nobody learned a thing. This is Spence&apos;s job-market signalling model.</p>
          <p className="muted">A simplified model with invented numbers. It does not claim real degrees teach nothing.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach, reached) => {
            const check = (ca: number, co: number) => {
              const ta = takes(ca);
              const to = takes(co);
              if (to) reach("pooling");
              if (ta && !to && reached("pooling")) reach("separating");
            };
            const setA = (v: number) => {
              setAble(v);
              check(v, other);
            };
            const setO = (v: number) => {
              setOther(v);
              check(able, v);
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: the degree teaches nothing</p>
                <svg
                  viewBox="0 0 320 196"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Pay with and without the degree, per type" : `Able ${a ? "get" : "skip"} it; others ${o ? "get" : "skip"} it`}
                >
                  <line x1={8} y1={BASE - PAY_WITHOUT * SCALE} x2={312} y2={BASE - PAY_WITHOUT * SCALE} className={s.ghost} />
                  <TypeBars x={20} name={`Able (make ${k$(OUTPUT.able)})`} cost={able} locked={locked} />
                  <TypeBars x={180} name={`Others (make ${k$(OUTPUT.other)})`} cost={other} locked={locked} />
                </svg>
                <p className={s.msg}>
                  {locked
                    ? ""
                    : status === "sep"
                      ? "Only the able get it: the degree reveals ability."
                      : status === "pool"
                        ? `Others get it too: firms pay ${k$(PAY_WITH)} for ${k$(OUTPUT.other)} workers.`
                        : status === "none"
                          ? "No one gets it: it tells firms nothing."
                          : "Only the others get it: firms pay them too much."}
                </p>
                <Row>
                  <Readout label="Degree-holders" value={locked ? "?" : a && o ? "everyone" : a ? "only able" : o ? "only others" : "no one"} />
                </Row>
                <Row>
                  {[
                    { label: "Others' cost $40k", on: other === 40, go: () => setO(40) },
                    { label: "Others' cost $60k", on: other === 60, go: () => setO(60) },
                    { label: "Able's cost $60k", on: able === 60, go: () => setA(60) },
                  ].map((b) => (
                    <Control key={b.label} className={b.on ? "active" : ""} disabled={locked || b.on} onClick={b.go}>
                      {b.label}
                    </Control>
                  ))}
                </Row>
                <Slider label="Cost to the able" value={able} min={0} max={100} step={10} format={k$} disabled={locked} onChange={setA} />
                <Slider label="Cost to the others" value={other} min={0} max={100} step={10} format={k$} disabled={locked} onChange={setO} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
