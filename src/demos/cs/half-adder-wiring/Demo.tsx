"use client";

// Adding is two gates side by side. Inputs A and B both feed two gate slots; the learner picks
// the gate in each slot (AND, OR, XOR) and flips the inputs, watching the carry and sum lamps.
// A counter says on how many of the four input pairs the circuit adds correctly. XOR for the
// sum and AND for the carry gets all four. One representation: the circuit.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const GATES = ["AND", "OR", "XOR"] as const;
type Gate = (typeof GATES)[number];
const apply = (g: Gate, a: number, b: number) => (g === "AND" ? a & b : g === "OR" ? a | b : a ^ b);
const nextGate = (g: Gate) => GATES[(GATES.indexOf(g) + 1) % GATES.length];

const PAIRS: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];
/** On how many input pairs do (carry, sum) equal the two binary digits of a + b? */
const rightOn = (sumG: Gate, carryG: Gate) =>
  PAIRS.filter(([a, b]) => apply(sumG, a, b) === (a + b) % 2 && apply(carryG, a, b) === Math.floor((a + b) / 2)).length;

const RULE: Record<Gate, string> = {
  AND: "AND: 1 only if both are 1.",
  OR: "OR: 1 if either is 1.",
  XOR: "XOR: 1 if exactly one is 1.",
};

const START = { a: 0, b: 0, sum: "OR" as Gate, carry: "XOR" as Gate };

export default function HalfAdderWiring({ slug }: { slug: string }) {
  const [a, setA] = useState(START.a);
  const [b, setB] = useState(START.b);
  const [sumG, setSumG] = useState<Gate>(START.sum);
  const [carryG, setCarryG] = useState<Gate>(START.carry);
  const [seen11, setSeen11] = useState<{ carry: number; sum: number } | null>(null);

  const sum = apply(sumG, a, b);
  const carry = apply(carryG, a, b);
  const score = rightOn(sumG, carryG);
  const atStart = a === START.a && b === START.b && sumG === START.sum && carryG === START.carry;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A circuit adds two one-bit numbers (each is 0 or 1). Its answer has two digits: carry on the left, sum on the right. In binary, counting goes 0, 1, 10, 11. For 1 + 1, what are the digits (carry, sum)?",
        options: ["carry 1, sum 1", "carry 1, sum 0", "carry 0, sum 1"],
        answer: 1,
      }}
      exploreHint="Pick a gate for each output until all 4 inputs add up. Then try 1 + 1."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {seen11 ? `When you had the circuit adding right, 1 + 1 gave carry ${seen11.carry}, sum ${seen11.sum}. ` : ""}1 + 1 = 2, and 2
            in binary is 10: <strong>carry 1, sum 0</strong>. The sum digit is 1 when exactly one input is 1: that is XOR.
            The carry is 1 only when both are 1: that is AND.
          </p>
          <p>
            So adding two bits is nothing more than two gates side by side, called a half adder. The machine does not know
            arithmetic; the wiring does it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["wired", "one-plus-one"]}>
          {(reach) => {
            const after = (na: number, nb: number, sg: Gate, cg: Gate) => {
              if (rightOn(sg, cg) !== PAIRS.length) return;
              reach("wired");
              if (na === 1 && nb === 1) {
                setSeen11({ carry: apply(cg, 1, 1), sum: apply(sg, 1, 1) });
                reach("one-plus-one");
              }
            };
            const flipA = () => {
              if (locked) return;
              setA(1 - a);
              after(1 - a, b, sumG, carryG);
            };
            const flipB = () => {
              if (locked) return;
              setB(1 - b);
              after(a, 1 - b, sumG, carryG);
            };
            const cycleSum = () => {
              if (locked) return;
              setSumG(nextGate(sumG));
              after(a, b, nextGate(sumG), carryG);
            };
            const cycleCarry = () => {
              if (locked) return;
              setCarryG(nextGate(carryG));
              after(a, b, sumG, nextGate(carryG));
            };
            const reset = () => {
              if (locked) return;
              setA(START.a);
              setB(START.b);
              setSumG(START.sum);
              setCarryG(START.carry);
            };

            const wire = (v: number) => (!locked && v ? "var(--domain)" : "var(--muted)");
            const lamp = (v: number) => (locked ? "var(--bg-2)" : v ? "var(--domain)" : "var(--bg-2)");

            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`A ${a}, B ${b}; sum gate ${sumG}, carry gate ${carryG}`}>
                  {/* input wires: A and B each feed both gates */}
                  <path d={`M52 55 H96 V48 H150`} stroke={wire(a)} strokeWidth={4} fill="none" />
                  <path d={`M96 55 V140 H150`} stroke={wire(a)} strokeWidth={4} fill="none" />
                  <path d={`M52 135 H80 V72 H150`} stroke={wire(b)} strokeWidth={4} fill="none" />
                  <path d={`M80 135 V160 H150`} stroke={wire(b)} strokeWidth={4} fill="none" />
                  <circle cx={96} cy={55} r={4} fill={wire(a)} />
                  <circle cx={80} cy={135} r={4} fill={wire(b)} />

                  {[
                    { y: 35, g: sumG, label: "sum", v: sum },
                    { y: 125, g: carryG, label: "carry", v: carry },
                  ].map((x) => (
                    <g key={x.label}>
                      <rect x={150} y={x.y} width={70} height={50} rx={10} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={2} />
                      <text x={185} y={x.y + 31} textAnchor="middle" className={s.gate}>
                        {x.g}
                      </text>
                      <line x1={220} y1={x.y + 25} x2={262} y2={x.y + 25} stroke={wire(x.v)} strokeWidth={4} />
                      <circle cx={282} cy={x.y + 25} r={20} fill={lamp(x.v)} stroke="var(--fg)" strokeWidth={2} />
                      <text x={282} y={x.y + 31} textAnchor="middle" className={s.bit}>
                        {locked ? "" : x.v}
                      </text>
                      <text x={282} y={x.y + 60} textAnchor="middle" className={s.small}>
                        {x.label}
                      </text>
                    </g>
                  ))}

                  {[
                    { y: 55, n: "A", v: a },
                    { y: 135, n: "B", v: b },
                  ].map((x) => (
                    <g key={x.n}>
                      <rect x={14} y={x.y - 18} width={38} height={36} rx={8} fill={lamp(x.v)} stroke="var(--fg)" strokeWidth={2} />
                      <text x={33} y={x.y + 6} textAnchor="middle" className={s.bit}>
                        {x.v}
                      </text>
                      <text x={33} y={x.y - 24} textAnchor="middle" className={s.small}>
                        {x.n}
                      </text>
                    </g>
                  ))}
                </svg>

                <Row>
                  <Control className="active" disabled={locked} onClick={flipA} aria-label={`Input A is ${a}. Flip it.`}>
                    A = {a}
                  </Control>
                  <Control className="active" disabled={locked} onClick={flipB} aria-label={`Input B is ${b}. Flip it.`}>
                    B = {b}
                  </Control>
                  <Control disabled={locked} onClick={cycleSum}>
                    Sum gate: {sumG}
                  </Control>
                  <Control disabled={locked} onClick={cycleCarry}>
                    Carry gate: {carryG}
                  </Control>
                </Row>
                <p className={s.rules}>
                  {locked
                    ? "Goal: carry,sum = 00, 01, 01, 10 for 0+0, 0+1, 1+0, 1+1."
                    : `Goal: 00, 01, 01, 10 for 0+0, 0+1, 1+0, 1+1. ${RULE[sumG]} ${RULE[carryG]}`}
                </p>
                <Row>
                  <Readout label="Adds right on" value={locked ? "–" : `${score} of 4 inputs`} />
                  <Control disabled={locked || atStart} onClick={reset}>
                    Reset
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
