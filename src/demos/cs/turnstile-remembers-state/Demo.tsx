"use client";

// A coin-operated turnstile is a two-state machine. The learner plays the question's six events
// (coin, push, push, coin, coin, push) by tapping them on the tape, in order, and watches which
// state glows. The second coin in a row finds the turnstile already unlocked and changes nothing,
// so only 2 people get through. One picture: the two-state diagram, with the tape under it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Ev = "coin" | "push";
type St = "locked" | "unlocked";
const EVENTS: Ev[] = ["coin", "push", "push", "coin", "coin", "push"];
type Edge = "coin-unlock" | "push-pass" | "push-blocked" | "coin-wasted";
const SAY: Record<Edge, string> = {
  "coin-unlock": "Coin: it unlocks.",
  "push-pass": "Push: one person passes. It locks.",
  "push-blocked": "Push: locked, so blocked.",
  "coin-wasted": "Coin: already unlocked. No change.",
};

/** Run the first n events from the locked state. */
function run(n: number) {
  let state: St = "locked";
  let passed = 0;
  let edge: Edge | null = null;
  for (let i = 0; i < n; i++) {
    const e = EVENTS[i];
    if (e === "coin") {
      edge = state === "locked" ? "coin-unlock" : "coin-wasted";
      state = "unlocked";
    } else if (state === "unlocked") {
      edge = "push-pass";
      passed++;
      state = "locked";
    } else edge = "push-blocked";
  }
  return { state, passed, edge };
}
const FINAL = run(EVENTS.length);
// The second coin in a row: the first coin whose edge is "coin-wasted".
const WASTED_AT = EVENTS.findIndex((_, i) => run(i + 1).edge === "coin-wasted") + 1; // 5

// diagram geometry
const L = { x: 80, y: 92 };
const U = { x: 240, y: 92 };
const R = 40;

export default function TurnstileRemembersState({ slug }: { slug: string }) {
  const [pos, setPos] = useState(0);
  const now = run(pos);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A turnstile starts locked. Events: ${EVENTS.join(", ")}. How many people get through?`,
        options: [String(FINAL.passed), String(FINAL.passed + 1), String(FINAL.passed + 2)],
        answer: 0,
      }}
      exploreHint="Tap the events in order and watch which state lights up."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your run: coin unlocked it, a push let one person through and locked it, the next push was blocked. The
            second coin in a row (event {WASTED_AT}) found it already unlocked and changed nothing. The last push let a
            second person through: <strong>{FINAL.passed} people</strong>.
          </p>
          <p>
            The turnstile counts nothing. Its whole memory is which of its two states it is in, so the extra coin was
            lost. That is a finite-state machine: fixed states, and a rule for each event in each state.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["second-coin", "last-push"]}>
          {(reach) => {
            const go = (k: number) => {
              if (locked) return;
              setPos(k);
              if (k === WASTED_AT) reach("second-coin");
              if (k === EVENTS.length) reach("last-push");
            };
            const lit = (st: St) => !locked && now.state === st;
            const edgeOn = (e: Edge) => !locked && now.edge === e;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Make a prediction to start." : now.edge ? SAY[now.edge] : "It remembers only: locked or unlocked."}
                </p>
                <svg viewBox="0 0 320 184" className="stage-svg" role="img"
                  aria-label={`Turnstile diagram. Now ${now.state}. ${now.passed} passed.`}>
                  <defs>
                    <marker id="ts-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
                    </marker>
                  </defs>
                  {/* coin: locked -> unlocked (top arc) */}
                  <path d={`M ${L.x + 28} ${L.y - 28} Q 160 18 ${U.x - 28} ${U.y - 28}`} className={`${s.edge} ${edgeOn("coin-unlock") ? s.on : ""}`} markerEnd="url(#ts-arrow)" />
                  <text x={160} y={38} className={s.elabel}>coin</text>
                  {/* push: unlocked -> locked (bottom arc) */}
                  <path d={`M ${U.x - 28} ${U.y + 28} Q 160 166 ${L.x + 28} ${L.y + 28}`} className={`${s.edge} ${edgeOn("push-pass") ? s.on : ""}`} markerEnd="url(#ts-arrow)" />
                  <text x={160} y={154} className={s.elabel}>push</text>
                  {/* push loop on locked */}
                  <path d={`M ${L.x - 30} ${L.y + 26} C ${L.x - 80} ${L.y + 60}, ${L.x - 80} ${L.y - 60}, ${L.x - 30} ${L.y - 26}`} className={`${s.edge} ${edgeOn("push-blocked") ? s.onBad : ""}`} markerEnd="url(#ts-arrow)" />
                  <text x={16} y={L.y + 4} className={s.elabel}>push</text>
                  {/* coin loop on unlocked */}
                  <path d={`M ${U.x + 30} ${U.y - 26} C ${U.x + 80} ${U.y - 60}, ${U.x + 80} ${U.y + 60}, ${U.x + 30} ${U.y + 26}`} className={`${s.edge} ${edgeOn("coin-wasted") ? s.onBad : ""}`} markerEnd="url(#ts-arrow)" />
                  <text x={304} y={U.y + 4} className={s.elabel}>coin</text>

                  <circle cx={L.x} cy={L.y} r={R} className={`${s.state} ${lit("locked") ? s.lit : ""}`} />
                  <text x={L.x} y={L.y + 5} className={s.slabel}>Locked</text>
                  <circle cx={U.x} cy={U.y} r={R} className={`${s.state} ${lit("unlocked") ? s.lit : ""}`} />
                  <text x={U.x} y={U.y + 5} className={s.slabel}>Unlocked</text>
                </svg>

                <div className={s.tape} role="group" aria-label="Events, in order">
                  {EVENTS.map((e, i) => (
                    <Control key={i} disabled={locked || pos === i + 1}
                      className={`${s.chip} ${i < pos ? s.done : ""} ${pos === i + 1 ? "active" : ""}`}
                      aria-label={`Play to event ${i + 1}, ${e}`} onClick={() => go(i + 1)}>
                      <span className={s.num}>{i + 1}</span>
                      {e}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Passed" value={locked ? "–" : now.passed} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
