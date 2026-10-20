"use client";

// Which item does a full cache throw out? The learner steps through the stream from the
// question (A, B, C, A, D) into a 3-slot cache, then flips the rule from least recently used
// to first in, first out and replays the same stream. Under LRU, B goes (A was just used);
// under first-in, A goes. One representation: the three cache slots under the request tape.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STREAM = ["A", "B", "C", "A", "D"];
const SLOTS = 3;
type Rule = "lru" | "fifo";
const RULE_NAME: Record<Rule, string> = { lru: "least recently used", fifo: "first in, first out" };

type Slot = { item: string; arrived: number; used: number };
type Run = { slots: (Slot | null)[]; hits: number; misses: number; last: null | { item: string; hit: boolean; evicted?: string } };

/** Play the first `n` requests of the stream into the cache. Steps are numbered from 1. */
function simulate(n: number, rule: Rule): Run {
  const slots: (Slot | null)[] = Array(SLOTS).fill(null);
  let hits = 0;
  let misses = 0;
  let last: Run["last"] = null;
  for (let i = 0; i < n; i++) {
    const step = i + 1;
    const item = STREAM[i];
    const at = slots.findIndex((x) => x?.item === item);
    if (at >= 0) {
      hits++;
      slots[at] = { ...slots[at]!, used: step };
      last = { item, hit: true };
      continue;
    }
    misses++;
    const free = slots.findIndex((x) => x === null);
    if (free >= 0) {
      slots[free] = { item, arrived: step, used: step };
      last = { item, hit: false };
      continue;
    }
    const key = (x: Slot) => (rule === "lru" ? x.used : x.arrived);
    let out = 0;
    slots.forEach((x, j) => {
      if (key(x!) < key(slots[out]!)) out = j;
    });
    const evicted = slots[out]!.item;
    slots[out] = { item, arrived: step, used: step };
    last = { item, hit: false, evicted };
  }
  return { slots, hits, misses, last };
}

export default function LruEvictionOrder({ slug }: { slug: string }) {
  const [pos, setPos] = useState(0);
  const [rule, setRule] = useState<Rule>("lru");
  const [seen, setSeen] = useState<Partial<Record<Rule, string>>>({}); // rule -> item it evicted at D

  const run = simulate(pos, rule);
  const full = run.slots.every(Boolean);
  const key = (x: Slot) => (rule === "lru" ? x.used : x.arrived);
  const nextOut = full && pos < STREAM.length ? run.slots.reduce((a, b) => (key(b!) < key(a!) ? b : a))!.item : null;
  const lruOut = simulate(STREAM.length, "lru").last?.evicted;
  const fifoOut = simulate(STREAM.length, "fifo").last?.evicted;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your phone's cache holds ${SLOTS} items, and you request ${STREAM.join(", ")} in that order. It drops the least recently used item. Which one goes when ${
          STREAM[STREAM.length - 1]
        } arrives?`,
        options: ["A", "B", "C"],
        answer: 1,
      }}
      exploreHint="Play the stream to D. Then switch the rule and compare."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {seen.lru ? `You saw ${seen.lru} evicted under least recently used` : "Under least recently used, B is evicted"}
            {seen.fifo ? ` and ${seen.fifo} under first in, first out. ` : ". "}
            When D arrives, B was last used at step 2, C at step 3 and A at step 4, because asking for A again refreshed
            it. B has waited longest, so <strong>{lruOut}</strong> goes. First in, first out ignores use and drops{" "}
            {fifoOut}, the oldest arrival, even though it was just asked for.
          </p>
          <p>
            Both rules scored the same on this short stream. They differ in who they throw out: if B is asked for again,
            first in, first out keeps it, but if A is asked for again, least recently used keeps it. Things used
            recently tend to be used again soon, so operating systems and web caches use this rule or cheap
            approximations of it.
          </p>
          <p className="muted">Recency, not arrival, decides who stays.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["lru-evict", "fifo-evict"]}>
          {(reach) => {
            const arrive = (p: number, r: Rule) => {
              if (p < STREAM.length) return;
              const out = simulate(p, r).last?.evicted;
              if (out) setSeen((x) => ({ ...x, [r]: out }));
              reach(r === "lru" ? "lru-evict" : "fifo-evict");
            };
            const next = () => {
              if (locked || pos >= STREAM.length) return;
              setPos(pos + 1);
              arrive(pos + 1, rule);
            };
            const toEnd = () => {
              if (locked || pos >= STREAM.length) return;
              setPos(STREAM.length);
              arrive(STREAM.length, rule);
            };
            const flip = () => {
              if (locked) return;
              const r: Rule = rule === "lru" ? "fifo" : "lru";
              setRule(r);
              arrive(pos, r);
            };
            const restart = () => {
              if (locked) return;
              setPos(0);
            };

            const l = run.last;
            const msg = locked
              ? "Make a prediction to start."
              : !l
                ? "Empty cache. Send the first request."
                : l.hit
                  ? `Step ${pos}: ${l.item} is already in. Hit.`
                  : l.evicted
                    ? `Step ${pos}: ${l.item} misses. ${l.evicted} is evicted.`
                    : `Step ${pos}: ${l.item} misses and moves in.`;

            return (
              <div className={s.wrap}>
                <p className={`${s.msg} ${l?.evicted ? s.bad : ""}`} aria-live="polite">
                  {msg}
                </p>

                <div className={s.tape} aria-label={`Requests: ${STREAM.join(", ")}`}>
                  {STREAM.map((x, i) => (
                    <span key={i} className={`${s.req} ${i < pos ? s.done : ""} ${i === pos - 1 ? s.now : ""}`}>
                      <b>{x}</b>
                      <span className={s.step}>{i + 1}</span>
                    </span>
                  ))}
                </div>

                <div className={s.cache} aria-label={`Cache: ${run.slots.map((x) => x?.item ?? "empty").join(", ")}`}>
                  {run.slots.map((x, i) => (
                    <div key={i} className={`${s.slot} ${x && x.item === l?.item ? s.fresh : ""}`}>
                      {x ? (
                        <>
                          <b>{x.item}</b>
                          <span className={s.tag}>
                            {rule === "lru" ? `used step ${x.used}` : `in since step ${x.arrived}`}
                          </span>
                          <span className={s.out}>{!locked && nextOut === x.item ? "next out" : " "}</span>
                        </>
                      ) : (
                        <span className={s.tag}>empty</span>
                      )}
                    </div>
                  ))}
                </div>

                <Row>
                  <Readout label="Hits" value={run.hits} />
                  <Readout label="Misses" value={run.misses} />
                </Row>
                <Row>
                  <Control className="active" disabled={locked || pos >= STREAM.length} onClick={next}>
                    Next request
                  </Control>
                  <Control disabled={locked || pos >= STREAM.length} onClick={toEnd}>
                    Play to the end
                  </Control>
                  <Control disabled={locked} onClick={flip} aria-label={`Rule: ${RULE_NAME[rule]}. Tap to switch.`}>
                    Rule: {RULE_NAME[rule]}
                  </Control>
                  <Control disabled={locked || pos === 0} onClick={restart}>
                    Restart
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
