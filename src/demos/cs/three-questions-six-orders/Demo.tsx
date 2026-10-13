"use client";

// Three cards A, B, C in an unknown order have 3! = 6 possible orders, drawn as six tiles (biggest
// first). Each question "is X bigger than Y?" is answered with whichever answer keeps MORE orders
// (a tie answers "yes"): the worst case the question must survive. The tiles, the counts and the
// reveal all come from the same ORDERS list and the same `narrow` function. 2^q >= 6 needs q = 3.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CARDS = ["A", "B", "C"];
const permute = (a: string[]): string[][] =>
  a.length <= 1 ? [a] : a.flatMap((x, i) => permute([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));
const ORDERS = permute(CARDS).map((p) => p.join(" ")); // biggest first, e.g. "B A C"
const N = ORDERS.length; // 6
const PAIRS: [string, string][] = [["A", "B"], ["A", "C"], ["B", "C"]];
const bigger = (o: string, x: string, y: string) => o.split(" ").indexOf(x) < o.split(" ").indexOf(y);
const MIN_Q = Math.ceil(Math.log2(N)); // 3

// Orders still possible after asking the pairs in `asked` (in order), answering to keep more orders.
function narrow(asked: number[]) {
  let alive = ORDERS.slice();
  const says: boolean[] = [];
  for (const k of asked) {
    const [x, y] = PAIRS[k];
    const yes = alive.filter((o) => bigger(o, x, y));
    const no = alive.filter((o) => !bigger(o, x, y));
    const sayYes = yes.length >= no.length;
    says.push(sayYes);
    alive = sayYes ? yes : no;
  }
  return { alive, says };
}

export default function ThreeQuestionsSixOrders({ slug }: { slug: string }) {
  const [asked, setAsked] = useState<number[]>([]);
  const { alive, says } = narrow(asked);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${CARDS.length} different cards are in an unknown order. Each question is "is X bigger than Y?". What is the fewest questions that always suffices?`,
        options: ["2", String(MIN_Q), String(N)],
        answer: 1,
      }}
      exploreHint="Ask all three questions. The answers are the unluckiest ones."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Three cards have {N} orders. After two questions you still had {narrow([0, 1]).alive.length} left, so you
            could not name the order yet; the third question left {alive.length}.
          </p>
          <p>
            Each answer can at most halve the orders. Two questions tell apart at most {2 ** 2}, but {N} are possible;
            three tell apart {2 ** 3}. So {MIN_Q} is the fewest that always works. For n cards you need about log2(n!)
            questions, which grows like n log n.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["two-left", "one-left"]}>
          {(reach) => {
            const ask = (k: number) => {
              if (locked || asked.includes(k)) return;
              const next = [...asked, k];
              const left = narrow(next).alive.length;
              setAsked(next);
              if (next.length === 2 && left > 1) reach("two-left");
              if (left === 1) reach("one-left");
            };
            const lastK = asked[asked.length - 1];
            const msg = locked
              ? "Make a prediction to start."
              : asked.length === 0
                ? "Each tile is one possible order, biggest first. Ask a question."
                : `${PAIRS[lastK][0]} is ${says[says.length - 1] ? "" : "not "}bigger than ${PAIRS[lastK][1]}. ${alive.length} order${alive.length === 1 ? "" : "s"} left.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.tiles}>
                  {ORDERS.map((o) => {
                    const on = locked || alive.includes(o);
                    return (
                      <div key={o} className={`${s.tile} ${on ? "" : s.out}`} aria-label={`Order ${o}${on ? "" : ", ruled out"}`}>
                        {o}
                      </div>
                    );
                  })}
                </div>
                <div className={s.qs}>
                  {PAIRS.map(([x, y], k) => (
                    <Control key={k} aria-label={`Ask: is ${x} bigger than ${y}?`}
                      disabled={locked || asked.includes(k)} onClick={() => ask(k)}>
                      {x} &gt; {y} ?
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Questions asked" value={locked ? "–" : asked.length} />
                  <Readout label="Orders left" value={locked ? "–" : alive.length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
