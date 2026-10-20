"use client";

// Euclid in three steps. The reference lesson for the multi-card sequence format (EDD-006,
// src/kit/sequence.tsx). Three sub-cards, each with its own picture:
//   1. Multiply: chips pick a list of primes (2, 3 / 2, 3, 5 / 2 to 7 / 2 to 13); tiles show the list and
//      its product. Milestone: the question's own list, 2 to 13.
//   2. Add 1: the product as a block every listed prime divides, plus a one-unit nub. Milestone: added.
//   3. Divide: one row per listed prime, the block splits into q groups of p and the nub is left over
//      (remainder 1); then trial division shows product + 1's own primes, none on the list.
//      Milestones: divided, factored.
// The trail under the steps records each step's result (list size, product + 1, its primes), so the
// reveal's numbers stay on the stage while card 3 is the one showing.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CardSequence, SubCard } from "@/kit/sequence";
import { useState } from "react";
import s from "./styles.module.css";

const PRIMES = [2, 3, 5, 7, 11, 13];
const LISTS = [2, 3, 4, 6]; // list lengths offered: 2, 3 / 2, 3, 5 / 2 to 7 / 2 to 13
const START = 3;
const M_LIST = ["all-six"] as const;
const M_ADD = ["added"] as const;
const M_DIV = ["divided", "factored"] as const;
const MILESTONES = M_LIST.length + M_ADD.length + M_DIV.length;

function factor(n: number): number[] {
  const f: number[] = [];
  for (let d = 2; d * d <= n; d++) while (n % d === 0) (f.push(d), (n /= d));
  if (n > 1) f.push(n);
  return f;
}
const listName = (k: number) => (k <= 3 ? PRIMES.slice(0, k).join(", ") : `2 to ${PRIMES[k - 1]}`);

export default function EuclidThreeSteps({ slug }: { slug: string }) {
  const [k, setK] = useState(START);
  const [added, setAdded] = useState(false);
  const [divided, setDivided] = useState(false);
  const [factored, setFactored] = useState(false);
  const list = PRIMES.slice(0, k);
  const prod = list.reduce((a, b) => a * b, 1);
  const N = prod + 1;
  const f = factor(N);
  const prime = f.length === 1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Someone says 2, 3, 5, 7, 11 and 13 are all the primes. Euclid multiplies them, adds 1, then divides. What does he find?",
        options: ["A prime missing from the list", "A number one of them divides", "Nothing: the list could be complete"],
        answer: 0,
      }}
      exploreHint="Work through the three cards: multiply, add 1, divide."
      minInteractions={MILESTONES}
      reveal={() => (
        <>
          <p>
            Your list was {list.join(", ")}. Product + 1 is {N}, and every listed prime left remainder 1, so none of them
            divides it. Yet {prime ? `${N} is itself prime` : `${N} = ${f.join(" × ")}`}: {prime ? "a prime" : "primes"} not
            on your list.
          </p>
          <p>
            Any finite list gets the same three steps, so no finite list holds every prime. This is Euclid&apos;s proof in the
            Elements, Book IX, Proposition 20.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <CardSequence label="Euclid's proof in three steps" phase={phase} locked={locked} interact={interact}>
          <SubCard id="multiply" title="Multiply" milestones={M_LIST} trace={`${k} primes`}>
            {({ reach }) => (
              <>
                <MultiplyPicture list={list} prod={prod} />
                <p className={s.caption}>
                  {locked ? "Make a prediction to start." : k === 6 ? "The full list, multiplied." : "Pick a list. Try 2 to 13."}
                </p>
                <Row>
                  {LISTS.map((n) => (
                    <Control
                      key={n}
                      className={`${s.tap} ${n === k ? "active" : ""}`}
                      disabled={locked || n === k}
                      aria-label={`List ${listName(n)}`}
                      onClick={() => {
                        setK(n);
                        if (n === 6) reach("all-six");
                      }}
                    >
                      {listName(n)}
                    </Control>
                  ))}
                </Row>
              </>
            )}
          </SubCard>

          <SubCard id="add" title="Add 1" milestones={M_ADD} trace={`${N}`}>
            {({ reach }) => (
              <>
                <AddPicture prod={prod} added={added} />
                <p className={s.caption}>{added ? "Every listed prime divides the block. Not the +1." : "Add one to the product."}</p>
                <Row>
                  <Control
                    className={`${s.tap} ${added ? "active" : ""}`}
                    disabled={locked || added}
                    onClick={() => {
                      setAdded(true);
                      reach("added");
                    }}
                  >
                    {added ? "Added 1" : "Add 1"}
                  </Control>
                </Row>
              </>
            )}
          </SubCard>

          <SubCard id="divide" title="Divide" milestones={M_DIV} trace={prime ? "prime" : f.join("×")}>
            {({ reach }) => (
              <>
                <DividePicture list={list} N={N} divided={divided} factors={factored ? f : null} />
                <p className={s.caption}>
                  {factored ? "Its primes are not on your list." : divided ? "Remainder 1 every time." : "Divide by each listed prime."}
                </p>
                <Row>
                  <Control
                    className={`${s.tap} ${divided ? "active" : ""}`}
                    disabled={locked || divided}
                    onClick={() => {
                      setDivided(true);
                      reach("divided");
                    }}
                  >
                    Divide by each
                  </Control>
                  <Control
                    className={`${s.tap} ${factored ? "active" : ""}`}
                    disabled={locked || factored}
                    onClick={() => {
                      setFactored(true);
                      reach("factored");
                    }}
                  >
                    Find its primes
                  </Control>
                </Row>
              </>
            )}
          </SubCard>
        </CardSequence>
      )}
    </Lesson>
  );
}

function MultiplyPicture({ list, prod }: { list: number[]; prod: number }) {
  return (
    <svg viewBox="0 0 320 92" className={`stage-svg ${s.pic}`} role="img" aria-label={`Your list: ${list.join(", ")}. Product ${prod}.`}>
      {PRIMES.map((p, i) => {
        const on = i < list.length;
        return (
          <g key={p}>
            <rect x={12 + i * 50} y={8} width={46} height={40} rx={8} className={on ? s.tileOn : s.tileOff} />
            <text x={35 + i * 50} y={34} className={on ? s.tileText : s.tileTextOff}>
              {p}
            </text>
          </g>
        );
      })}
      <text x={160} y={78} className={s.sum}>
        {list.join(" × ")} = {prod}
      </text>
    </svg>
  );
}

function AddPicture({ prod, added }: { prod: number; added: boolean }) {
  return (
    <svg viewBox="0 0 320 100" className={`stage-svg ${s.pic}`} role="img" aria-label={added ? `${prod} plus 1 is ${prod + 1}.` : `The product ${prod}, waiting for one more.`}>
      <rect x={10} y={10} width={254} height={44} rx={6} className={s.block} />
      <text x={137} y={38} className={s.blockText}>
        {prod}
      </text>
      <rect x={270} y={10} width={40} height={44} rx={6} className={added ? s.nubOn : s.nubOff} />
      <text x={290} y={38} className={added ? s.nubText : s.tileTextOff}>
        {added ? "+1" : "?"}
      </text>
      <text x={160} y={84} className={s.sum}>
        {added ? `${prod} + 1 = ${prod + 1}` : `${prod} + ?`}
      </text>
    </svg>
  );
}

function DividePicture({ list, N, divided, factors }: { list: number[]; N: number; divided: boolean; factors: number[] | null }) {
  const rowH = 20;
  const top = 6;
  const fy = top + list.length * rowH + 22;
  const H = fy + 12;
  return (
    <svg
      viewBox={`0 0 320 ${H}`}
      className={`stage-svg ${s.pic}`}
      role="img"
      aria-label={`${N} divided by each of ${list.join(", ")}${divided ? " leaves remainder 1" : ""}.${factors ? ` ${N} = ${factors.join(" × ")}.` : ""}`}
    >
      {list.map((p, i) => {
        const y = top + i * rowH;
        return (
          <g key={p}>
            <text x={34} y={y + 14} className={s.rowLabel}>
              ÷ {p}
            </text>
            <rect x={42} y={y + 2} width={214} height={15} rx={3} className={divided ? s.block : s.blockOff} />
            {divided && (
              <text x={149} y={y + 14} className={s.rowText}>
                {(N - 1) / p} × {p}
              </text>
            )}
            <rect x={262} y={y + 2} width={15} height={15} rx={3} className={divided ? s.nubOn : s.nubOff} />
            <text x={300} y={y + 14} className={divided ? s.rem : s.tileTextOff}>
              {divided ? "r 1" : "?"}
            </text>
          </g>
        );
      })}
      <text x={160} y={fy} className={factors ? s.found : s.sum}>
        {factors ? (factors.length === 1 ? `${N} is prime: not on the list` : `${N} = ${factors.join(" × ")}: not on the list`) : `${N} = ?`}
      </text>
    </svg>
  );
}
