"use client";

// Exchange power on a path. Two people (Ann–Bo) split $1 evenly: no one else to turn to.
// Three people (Ann–Bo–Cy): Bo can split $1 with Ann or with Cy, not both. Each round the end Bo
// left out offers to take 10 cents less than the end Bo is dealing with, and Bo switches.
// The ends' asks fall 50, 40, 30, 20, 10, 0 cents; Bo's share rises to the whole $1, where no one can
// undercut and no pair can both gain (the stable outcome).
// Key states: three people chosen, and the asks run down to $0.
// Model: one deal per person, 10-cent undercuts, two people alone split evenly (lesson rules).
// v2 (r6): title no longer says "takes all". A trace under the bar keeps Bo's share for every round
// reached in the 3-person run (it survives "2 people"), so each step of the bid-down is on stage and the
// reveal quotes the trace. A left-out person's number is labelled as their last ask.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START_ASK = 50; // cents
const CUT = 10; // cents per round
const LAST = START_ASK / CUT; // 5 rounds
const MILESTONES = ["three", "settled"] as const;

/** Round k on the 3-path: who Bo deals with, and each end's ask in cents. */
function round(k: number) {
  const partner = k % 2 === 0 ? "Ann" : "Cy";
  const matched = START_ASK - CUT * k;
  const leftOut = k === 0 ? START_ASK : START_ASK - CUT * (k - 1);
  const ask = partner === "Ann" ? { Ann: matched, Cy: leftOut } : { Ann: leftOut, Cy: matched };
  return { partner, ask, bo: 100 - matched };
}
const c$ = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const NX = { Ann: 60, Bo: 160, Cy: 260 } as const;
const NY = 52;

export default function MiddleOfThree({ slug }: { slug: string }) {
  const [three, setThree] = useState(false);
  const [k, setK] = useState(0);
  const [best, setBest] = useState(-1); // furthest round reached with 3 people (kept through "2 people")

  const r = round(k);
  const partner = three ? r.partner : "Ann";
  const boShare = three ? r.bo : 50;
  const partnerShare = 100 - boShare;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Ann–Bo–Cy in a line. Bo can split $1 with Ann or with Cy, not both. In repeated rounds, what share does Bo end up with?",
        options: ["About half", "About two thirds", "All, or nearly all"],
        answer: 2,
      }}
      exploreHint="Add Cy, then run the rounds and watch the left-out person's ask."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Each round, whoever Bo left out offered to take {CUT}¢ less, and Bo switched. Your trace shows Bo&apos;s share
            going {Array.from({ length: Math.max(best, LAST) + 1 }, (_, i) => c$(round(i).bo)).join(", ")}: the asks fell from{" "}
            {c$(START_ASK)} to {c$(100 - round(Math.max(best, LAST)).bo)}, and Bo got <strong>the whole $1</strong>.
          </p>
          <p>
            There it stops: no one can ask less than nothing, and no pair can both do better by dealing together. That is the stable
            outcome on a line of three: the centre gets everything (in the limit). With just Ann and Bo, the split stayed even. Bo&apos;s
            power came from the spare partner, not from being a better bargainer.
          </p>
          <p className="muted">A simplified model: one deal each, {CUT}¢ undercuts, two people alone split evenly.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const goTo = (n: number) => {
              setK(n);
              setBest((b) => Math.max(b, n));
              if (three && n === LAST) reach("settled");
            };
            const people = (three ? ["Ann", "Bo", "Cy"] : ["Ann", "Bo"]) as (keyof typeof NX)[];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: each person makes one deal</p>
                <svg
                  viewBox="0 0 320 222"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "People in a line splitting $1" : `Bo deals with ${partner}; Bo gets ${c$(boShare)}`}
                >
                  {three && <line x1={NX.Bo} y1={NY} x2={NX.Cy} y2={NY} className={partner === "Cy" ? s.edgeOn : s.edge} />}
                  <line x1={NX.Ann} y1={NY} x2={NX.Bo} y2={NY} className={partner === "Ann" ? s.edgeOn : s.edge} />
                  {people.map((p) => {
                    const on = p === "Bo" || p === partner;
                    const ask = p === "Bo" ? null : three ? r.ask[p as "Ann" | "Cy"] : 50;
                    return (
                      <g key={p}>
                        <circle cx={NX[p]} cy={NY} r={22} className={on ? s.nodeOn : s.node} strokeDasharray={on ? undefined : "4 3"} />
                        <text x={NX[p]} y={NY} className={s.nodeText}>
                          {p}
                        </text>
                        {ask !== null && !locked && (
                          <text x={NX[p]} y={NY + 38} className={on ? s.value : s.axis} textAnchor="middle">
                            {on ? `asks ${c$(ask)}` : `left out (last ask ${c$(ask)})`}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={20} y={118} className={s.axis}>
                    The $1 between Bo and {partner}
                  </text>
                  <rect x={20} y={126} width={280} height={26} rx={5} className={s.track} />
                  {!locked && (
                    <g>
                      <rect x={20} y={126} width={(280 * boShare) / 100} height={26} rx={5} className={s.soft} />
                      <text x={26} y={143} className={s.small}>
                        {boShare >= 25 ? `Bo ${c$(boShare)}` : ""}
                      </text>
                      {partnerShare > 0 && (
                        <text x={294} y={143} className={s.small} textAnchor="end">
                          {partner} {c$(partnerShare)}
                        </text>
                      )}
                    </g>
                  )}
                  <text x={20} y={166} className={s.axis}>
                    {best >= 0 ? "3 people: Bo's share, round by round" : "3 people: no rounds yet"}
                  </text>
                  {Array.from({ length: best + 1 }, (_, i) => {
                    const h = (round(i).bo / 100) * 28;
                    const x = 20 + i * 47;
                    return (
                      <g key={i}>
                        <rect x={x} y={214 - h} width={40} height={h} rx={3} className={three && i === k ? s.main : s.soft} />
                        <text x={x + 20} y={210 - h} textAnchor="middle" className={s.small}>
                          {c$(round(i).bo)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="Round" value={locked ? "?" : three ? k : "–"} />
                  <Readout label="Bo gets" value={locked ? "?" : c$(boShare)} />
                </Row>
                <p className={s.msg}>
                  {locked
                    ? ""
                    : !three
                      ? "No one else to turn to: they split evenly."
                      : k === LAST
                        ? "No one can ask less than $0. Stable."
                        : k === 0
                          ? `Bo deals with Ann; Cy is left out.`
                          : `${r.partner} undercut to ${c$(r.ask[r.partner as "Ann" | "Cy"])}; Bo switched.`}
                </p>
                <Row>
                  <Control
                    className={three ? "active" : ""}
                    disabled={locked || three}
                    onClick={() => {
                      setThree(true);
                      setK(0);
                      setBest((b) => Math.max(b, 0));
                      reach("three");
                    }}
                  >
                    3 people
                  </Control>
                  <Control disabled={locked || !three || k >= LAST} onClick={() => goTo(k + 1)}>
                    Next round
                  </Control>
                  <Control disabled={locked || !three || k >= LAST} onClick={() => goTo(LAST)}>
                    All rounds
                  </Control>
                  <Control
                    className={!three ? "active" : ""}
                    disabled={locked || !three}
                    onClick={() => {
                      setThree(false);
                      setK(0);
                    }}
                  >
                    2 people
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
