"use client";

// Greedy change-making with coins 1, 3 and 4. The learner makes 6 by hand, then
// watches "biggest coin first" take 4 + 1 + 1 while 3 + 3 needs only two. Target 8
// shows greedy can also be right, so the lesson is "greedy can fail", not "greedy is bad".
// One representation: rows of coins (yours, greedy's, the fewest).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const COINS = [1, 3, 4];
const TARGETS = [6, 8, 10];

function greedy(t: number) {
  const out: number[] = [];
  for (const c of [...COINS].sort((a, b) => b - a)) while (t >= c) {
    t -= c;
    out.push(c);
  }
  return out;
}
function fewest(t: number) {
  // Exhaustive (dynamic programming) search for the fewest coins.
  const best: (number[] | null)[] = Array(t + 1).fill(null);
  best[0] = [];
  for (let v = 1; v <= t; v++)
    for (const c of COINS) {
      const prev = v >= c ? best[v - c] : null;
      if (prev && (!best[v] || prev.length + 1 < best[v]!.length)) best[v] = [...prev, c].sort((a, b) => b - a);
    }
  return best[t]!;
}

function Coins({ list }: { list: number[] }) {
  return (
    <span className={s.coins}>
      {list.map((c, i) => (
        <span key={i} className={`${s.coin} ${s[`c${c}`]}`}>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function CoinGreedyTrap({ slug }: { slug: string }) {
  const [target, setTarget] = useState(6);
  const [tray, setTray] = useState<number[]>([]);
  const [showGreedy, setShowGreedy] = useState(false);
  const [showBest, setShowBest] = useState(false);
  const [own, setOwn] = useState<Record<number, number>>({}); // target -> fewest coins the learner used
  const [events, setEvents] = useState({ greedy: false, best: false });

  const sum = tray.reduce((a, b) => a + b, 0);
  const g = greedy(target);
  const b = fewest(target);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You have plenty of coins worth 1, 3 and 4. What is the fewest coins that add up to exactly 6?",
        options: ["2", "3", "4"],
        answer: 0,
      }}
      exploreHint="Make 6 with as few coins as you can. Then compare with greedy."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {own[6] ? `You made 6 with ${own[6]} coin${own[6] === 1 ? "" : "s"}. ` : ""}
            Greedy grabs the biggest coin that fits: 4, then 1, then 1, which is 3 coins. But 3 + 3 makes 6 with just{" "}
            <strong>2</strong>. Taking the 4 first leaves 2, which only 1s can fill.
          </p>
          <p>
            Greedy is not always wrong: for 8 it takes 4 + 4, the best possible. It fails when an early grab blocks a
            better combination later; 10 is another trap (4 + 4 + 1 + 1 against 4 + 3 + 3). With everyday coins like
            1, 5, 10 and 25, greedy happens to be always right.
          </p>
          <p className="muted">The best-looking step is not always part of the best answer.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const flag = (k: "greedy" | "best", t: number) => {
          // The reveal waits until the learner has seen greedy lose and the better answer, on a trap target.
          if (events[k] || greedy(t).length === fewest(t).length) return;
          setEvents((e) => ({ ...e, [k]: true }));
          interact();
        };
        const add = (c: number) => {
          if (locked || sum + c > target) return;
          const next = [...tray, c];
          setTray(next);
          if (sum + c === target) {
            setOwn((o) => ({ ...o, [target]: Math.min(o[target] ?? Infinity, next.length) }));
            if (next.length === fewest(target).length && showGreedy) flag("best", target);
          }
        };
        const pickTarget = (t: number) => {
          if (locked) return;
          setTarget(t);
          setTray([]);
          setShowGreedy(false);
          setShowBest(false);
        };
        const runGreedy = () => {
          if (locked) return;
          setShowGreedy(true);
          flag("greedy", target);
          if (own[target] === fewest(target).length) flag("best", target);
        };
        const runBest = () => {
          if (locked) return;
          setShowBest(true);
          flag("best", target);
        };

        const msg = locked
          ? "Make a prediction to start."
          : sum === target
            ? `${target} made with ${tray.length} coin${tray.length === 1 ? "" : "s"}.`
            : `${sum} of ${target}. Tap coins to add them.`;

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <div className={s.rows}>
              <div className={s.line}>
                <span className={s.who}>You</span>
                <Coins list={tray} />
                <span className={s.count}>{tray.length ? `${tray.length}` : ""}</span>
              </div>
              <div className={`${s.line} ${showGreedy ? "" : s.hidden}`}>
                <span className={s.who}>Greedy</span>
                {showGreedy ? <Coins list={g} /> : <span className="muted small">biggest coin that fits, each time</span>}
                <span className={`${s.count} ${showGreedy && g.length > b.length ? s.bad : ""}`}>{showGreedy ? g.length : ""}</span>
              </div>
              <div className={`${s.line} ${showBest ? "" : s.hidden}`}>
                <span className={s.who}>Fewest</span>
                {showBest ? <Coins list={b} /> : <span className="muted small">checks every combination</span>}
                <span className={`${s.count} ${s.good}`}>{showBest ? b.length : ""}</span>
              </div>
            </div>

            <Row>
              {COINS.map((c) => (
                <Control
                  key={c}
                  className={`${s.coinBtn} ${s[`c${c}`]}`}
                  disabled={locked || sum + c > target}
                  aria-label={`Add a ${c} coin`}
                  onClick={() => add(c)}
                >
                  {c}
                </Control>
              ))}
              <Control disabled={locked || tray.length === 0} onClick={() => setTray(tray.slice(0, -1))}>
                Undo
              </Control>
            </Row>
            <Row>
              <Control className="active" disabled={locked || showGreedy} onClick={runGreedy}>
                Greedy&apos;s way
              </Control>
              <Control disabled={locked || showBest || !showGreedy} onClick={runBest}>
                Fewest possible
              </Control>
            </Row>
            <Row>
              <span className="muted small">Target:</span>
              {TARGETS.map((t) => (
                <Control key={t} className={t === target ? "active" : ""} disabled={locked || t === target} onClick={() => pickTarget(t)}>
                  {t}
                </Control>
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
