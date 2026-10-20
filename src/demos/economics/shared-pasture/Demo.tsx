"use client";

// Tragedy of the commons, played. Ten herders share a pasture, one cow each. Each cow earns
// 20 minus the total number of cows. The learner is one herder: each round they add a cow or
// keep, then the nine others choose in turn by a fixed rule (add a cow if it raises their own
// income). The pasture greys as it crowds; the readouts show your income and everyone's.
// Model: made-up numbers, no ownership, no rules, no talking. Deterministic: no randomness in play.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const HERDERS = 10;
const CAP = 20;
const perCow = (n: number) => Math.max(0, CAP - n);
const income = (k: number, n: number) => k * perCow(n);
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

/** The nine others decide in turn: add one cow if it raises their own income. */
function othersChoose(cows: number[]) {
  const next = [...cows];
  let added = 0;
  for (let i = 1; i < HERDERS; i++) {
    const n = sum(next);
    if (income(next[i] + 1, n + 1) > income(next[i], n)) {
      next[i] += 1;
      added++;
    }
  }
  return { next, added };
}

// Pasture geometry (viewBox 320 × 190). Deterministic cow spots: a jittered grid.
const PX = 10;
const PY = 8;
const PW = 300;
const PH = 150;
const spots = Array.from({ length: 48 }, (_, i) => {
  const col = i % 8;
  const row = Math.floor(i / 8);
  const h = ((i * 2654435761) >>> 0) % 1000;
  return { x: PX + 22 + col * 37 + ((h % 13) - 6), y: PY + 18 + row * 23 + (((h >> 4) % 9) - 4) };
});
// Fill order: a seeded shuffle, so cows spread across the field the same way every time.
const order = (() => {
  const a = Array.from({ length: 48 }, (_, i) => i);
  let x = 0x9e3779b9;
  for (let i = a.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    const j = (x >>> 0) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();

export default function SharedPasture({ slug }: { slug: string }) {
  const [cows, setCows] = useState<number[]>(Array(HERDERS).fill(1));
  const [turn, setTurn] = useState<"you" | "others">("you");
  const [round, setRound] = useState(1);
  const [note, setNote] = useState("");
  const [firstMove, setFirstMove] = useState<"add" | "keep" | null>(null);

  const n = sum(cows);
  const mine = income(cows[0], n);
  const group = n * perCow(n);
  const green = perCow(n) / 10; // 1 at the start, 0 when the pasture is ruined

  // Which herder owns each drawn cow (herder 0 is you).
  const owners = cows.flatMap((k, h) => Array(k).fill(h) as number[]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You are one of 10 herders sharing a pasture, one cow each. Each cow earns 20 minus the total number of cows, so everyone earns 10. You alone add a second cow. What do you earn?",
        options: ["9", "18", "10"],
        answer: 1,
      }}
      exploreHint="Add a cow and read your income. Then let the others choose."
      reveal={() => (
        <>
          <p>
            {firstMove === "keep" ? "A second cow would have paid you " : "Your second cow paid you "}
            <strong>18</strong> instead of 10: a whole extra cow's earnings for you, while the crowding (every cow earns
            1 less) is shared by all 11 cows.
          </p>
          <p>
            Every herder faces the same sum, so the others added cows. With 18 cows each earns 2, and the group's
            income fell from <strong>100</strong> to <strong>36</strong>.{" "}
            {firstMove === "keep" ? "You held back, and it did not save the pasture." : "Holding back would not have saved the pasture."}
          </p>
          <p className="muted">
            A model with made-up numbers and no rules. Real communities often manage shared resources well (Elinor
            Ostrom, Governing the Commons, 1990).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const you = (add: boolean) => {
          const next = [...cows];
          if (add) next[0] += 1;
          setCows(next);
          setTurn("others");
          setNote(add ? `You added a cow. You have ${next[0]}.` : "You kept your cows.");
          if (firstMove === null) setFirstMove(add ? "add" : "keep");
        };
        const others = () => {
          const { next, added } = othersChoose(cows);
          setCows(next);
          setTurn("you");
          setRound((r) => r + 1);
          setNote(added === 0 ? "Nobody else added a cow." : `${added} other herder${added === 1 ? "" : "s"} added a cow.`);
          interact(); // the reveal is earned only once the learner has seen the others respond
        };
        const restart = () => {
          setCows(Array(HERDERS).fill(1));
          setTurn("you");
          setRound(1);
          setNote("");
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`A shared pasture with ${n} cows`}>
              <rect
                x={PX}
                y={PY}
                width={PW}
                height={PH}
                rx={14}
                style={{ fill: `color-mix(in srgb, var(--good) ${Math.round(12 + 50 * green)}%, var(--bg-2))` }}
                stroke="var(--line)"
              />
              {owners.slice(0, spots.length).map((h, i) => {
                const p = spots[order[i]];
                return <circle key={i} cx={p.x} cy={p.y} r={7} className={h === 0 ? s.cowYou : s.cow} />;
              })}
              <text x={160} y={PY + PH + 22} textAnchor="middle" className={s.value} fill="var(--fg)">
                {n} cows · each earns {perCow(n)}
              </text>
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? (
                "Lock in a guess to start."
              ) : (
                <>
                  <i className={s.swYou} /> your cows. {note || `Round ${round}: your move.`}
                </>
              )}
            </p>

            <Row>
              <Readout label="You earn" value={locked ? "?" : mine} />
              <Readout label="All 10 herders earn" value={locked ? "?" : group} />
            </Row>
            <Row>
              <Control disabled={locked || turn !== "you"} onClick={() => you(true)}>
                Add a cow
              </Control>
              <Control disabled={locked || turn !== "you"} onClick={() => you(false)}>
                Keep
              </Control>
              <Control disabled={locked || turn !== "others"} onClick={others}>
                Others choose
              </Control>
              <Control disabled={locked || (n === HERDERS && turn === "you")} onClick={restart}>
                Start over
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
