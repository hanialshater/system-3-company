"use client";

// Domino chain. Twelve dominoes stand in a row that trails off ("..."). The caption states the two
// facts: the rule (a falling domino knocks the next) and the start (push domino 1). One control
// pushes domino 1; the chain falls in a 0.3 s stagger. A second control moves domino 6 (and the
// rest) out of reach and re-runs the fall: 1-5 fall, 6-12 stand. Key states: all 12 fell; the
// broken chain stopped at the gap. Counts come from fallen(), the same function that draws the row.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 12;
const GAP_AT = 6; // domino moved out of reach (1-based)
const MILESTONES = ["all-fell", "chain-broken"] as const;

const SP = 24;
const X0 = 16;
const DW = 8;
const DH = 52;
const BASE = 86;
const SHIFT = 44;
const W = X0 + (N - 1) * SP + SHIFT + DW + 40;

/** How many dominoes are down, counting from the first. */
const fallen = (pushed: boolean, broken: boolean) => (!pushed ? 0 : broken ? GAP_AT - 1 : N);

export default function DominoChain({ slug }: { slug: string }) {
  const [pushed, setPushed] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You set up an endless row of dominoes. The first domino falls, and any falling domino knocks over the next. Which dominoes fall?",
        options: ["Only the first few", "All of them", "Only the even ones"],
        answer: 1,
      }}
      exploreHint="Push the first domino, then move one out of reach."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With every link intact, one push dropped all {N}. With domino {GAP_AT} out of reach the rule
            failed once, and {GAP_AT} to {N} stood.
          </p>
          <p>
            So two facts are enough: domino 1 falls, and whenever one falls the next does. Then 2 falls, so 3 falls, and so on
            past any number you name, a million included. This is proof by induction: prove it for 1, prove &quot;true for n means
            true for n + 1&quot;, and it holds for every positive whole number. Dominoes picture it; they do not prove it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              pushed={pushed}
              broken={broken}
              onPush={() => {
                setPushed(true);
                if (broken) reach("chain-broken");
                else reach("all-fell");
              }}
              onToggle={() => {
                const b = !broken;
                setBroken(b);
                if (pushed) reach(b ? "chain-broken" : "all-fell");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  pushed,
  broken,
  onPush,
  onToggle,
}: {
  locked: boolean;
  pushed: boolean;
  broken: boolean;
  onPush: () => void;
  onToggle: () => void;
}) {
  const down = fallen(pushed, broken);
  const caption = locked
    ? "Make a prediction to start."
    : !pushed
      ? broken
        ? `Domino ${GAP_AT} is now out of reach of domino ${GAP_AT - 1}. Push domino 1.`
        : "Rule: a falling domino knocks over the next. Start: push domino 1."
      : broken
        ? `Domino ${GAP_AT} is out of reach: 1 to ${GAP_AT - 1} fell, ${GAP_AT} to ${N} still stand.`
        : `1 knocked 2, 2 knocked 3, and on: all ${N} fell. The row could go on forever.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${BASE + 26}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <line x1={4} y1={BASE} x2={W - 4} y2={BASE} className={s.ground} />
        {Array.from({ length: N }, (_, i) => {
          const n = i + 1;
          const x = X0 + i * SP + (broken && n >= GAP_AT ? SHIFT : 0);
          const isDown = i < down;
          const last = isDown && (i === down - 1);
          const angle = isDown ? (last ? 84 : 28) : 0;
          return (
            <g key={n}>
              <rect
                x={x}
                y={BASE - DH}
                width={DW}
                height={DH}
                rx={1.5}
                className={isDown ? s.down : n === GAP_AT && broken ? s.moved : s.up}
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `${x + DW}px ${BASE}px`,
                  transitionDelay: `${i * 22}ms`,
                }}
              />
              <text x={x + DW / 2} y={BASE + 16} className={s.num}>
                {n}
              </text>
            </g>
          );
        })}
        <text x={W - 22} y={BASE - 10} className={s.more}>
          …
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.controls}>
        <Control disabled={locked || pushed} className={pushed ? "active" : ""} onClick={onPush}>
          {pushed ? "Domino 1 pushed" : "Push domino 1"}
        </Control>
        <Control disabled={locked} className={broken ? "active" : ""} onClick={onToggle}>
          {broken ? `Put domino ${GAP_AT} back` : `Move domino ${GAP_AT} out of reach`}
        </Control>
      </div>
      <Row>
        <Readout label="Fallen" value={`${down} of ${N}`} />
      </Row>
    </div>
  );
}
