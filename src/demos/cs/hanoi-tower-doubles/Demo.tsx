"use client";

// Tower of Hanoi, taught by its recursion rather than by its moves. The learner can move
// single disks, but the key control is "move the top n-1 together", priced at what that
// smaller puzzle costs. To move n disks: carry n-1 aside, move the big one, carry n-1 back.
// Each added disk therefore doubles the work, plus one. One representation: the pegs.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const PEGS = ["A", "B", "C"] as const;
const MIN_N = 3;
const MAX_N = 6;
const cost = (k: number) => 2 ** k - 1;

// pegs[p] lists disk sizes bottom to top (1 = smallest).
const startPegs = (n: number) => [Array.from({ length: n }, (_, i) => n - i), [], []] as number[][];

export default function HanoiTowerDoubles({ slug }: { slug: string }) {
  const [n, setN] = useState(MIN_N);
  const [pegs, setPegs] = useState<number[][]>(() => startPegs(MIN_N));
  const [moves, setMoves] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [solved, setSolved] = useState<Record<number, number>>({}); // disks -> moves used
  const [milestones, setMilestones] = useState({ carry: false, added: false });

  const top = (p: number) => pegs[p][pegs[p].length - 1];
  const small = n - 1;
  // The top n-1 disks are the smallest, so if they share a peg they sit on top of it, in order.
  const p1 = pegs.findIndex((pg) => pg.includes(1));
  const towerPeg = small > 0 && Array.from({ length: small }, (_, i) => i + 1).every((d) => pegs[p1].includes(d)) ? p1 : -1;
  const isSolved = pegs[2].length === n;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "With the tower puzzle on your desk, you move the disks to another peg, one disk at a time, never a bigger disk on a smaller one. 3 disks need 7 moves. How many moves do 6 disks need?",
        options: ["12", "36", "63"],
        answer: 2,
      }}
      exploreHint="Use a shortcut to move the top disks as a block, then add a disk. Add more to watch the best count."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {Object.keys(solved).length
              ? `You solved ${Object.entries(solved)
                  .map(([k, v]) => `${k} disks in ${v}`)
                  .join(", ")}. `
              : ""}
            To move a tower you must first carry everything above the biggest disk out of the way, move the biggest disk
            once, then carry the rest back on top: the smaller puzzle, twice, plus one move.
          </p>
          <p>
            So each disk doubles the work and adds one. At best,{" "}
            {Array.from({ length: n - MIN_N + 1 }, (_, i) => `${MIN_N + i} disks take ${cost(MIN_N + i)}`).join(", ")}
            {n < MAX_N ? `, and carrying on the same way, ${MAX_N} disks take ${cost(MAX_N)}` : ""}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const mark = (k: "carry" | "added") => {
          if (!milestones[k]) {
            setMilestones((m) => ({ ...m, [k]: true }));
            interact();
          }
        };
        const finishIfSolved = (next: number[][], m: number) => {
          if (next[2].length === n && solved[n] === undefined) {
            setSolved((x) => ({ ...x, [n]: m }));
          }
        };
        const tapPeg = (p: number) => {
          if (locked || isSolved) return;
          if (sel === null) {
            if (!pegs[p].length) return;
            setSel(p);
            setNote("");
            return;
          }
          if (sel === p) {
            setSel(null);
            return;
          }
          const d = top(sel);
          const t = top(p);
          if (t !== undefined && t < d) {
            setNote("A bigger disk can't sit on a smaller one.");
            setSel(null);
            return;
          }
          const next = pegs.map((pg) => [...pg]);
          next[sel].pop();
          next[p].push(d);
          setPegs(next);
          setMoves(moves + 1);
          setSel(null);
          setNote("");
          finishIfSolved(next, moves + 1);
        };
        const carry = (p: number) => {
          if (locked || towerPeg < 0 || towerPeg === p) return;
          const next = pegs.map((pg) => [...pg]);
          const block = next[towerPeg].splice(next[towerPeg].length - small, small);
          next[p].push(...block);
          setPegs(next);
          setMoves(moves + cost(small));
          setSel(null);
          setNote(`+${cost(small)}: ${small} disks take ${cost(small)} moves at best, done here as one block.`);
          mark("carry");
          finishIfSolved(next, moves + cost(small));
        };
        const addDisk = () => {
          if (locked || n >= MAX_N) return;
          setN(n + 1);
          setPegs(startPegs(n + 1));
          setMoves(0);
          setSel(null);
          setNote(`${n + 1} disks: the ${n}-disk puzzle (${cost(n)} moves), the big disk (1), the ${n}-disk puzzle again (${cost(n)}) = ${cost(n + 1)} at best.`);
          mark("added");
        };
        const restart = () => {
          if (locked) return;
          setPegs(startPegs(n));
          setMoves(0);
          setSel(null);
          setNote("");
        };
        const canCarryTo = (p: number) => !locked && !isSolved && towerPeg >= 0 && towerPeg !== p && (top(p) === undefined || top(p) > small);

        const msg = locked
          ? "Make a prediction to start."
          : isSolved
            ? `${n} disks moved in ${moves}.${n < MAX_N ? " Add a disk." : ""}`
            : moves >= cost(n) && sel === null
              ? `${moves} moves, but the tower is not on C yet. The best, ${cost(n)}, needs every move to count. Restart to try again.`
              : note || (sel !== null ? "Now tap where it goes." : `Move all ${n} disks to C.`);

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <Row>
              <span className={`muted small ${s.shortLabel}`}>
                {locked ? "Shortcut" : `Shortcut: top ${small} together (+${cost(small)})`}
              </span>
              {PEGS.map((name, p) => (
                <Control key={name} disabled={!canCarryTo(p)} onClick={() => carry(p)} aria-label={`Move the top ${small} disks to ${name}`}>
                  → {name}
                </Control>
              ))}
            </Row>
            <div className={s.pegs}>
              {PEGS.map((name, p) => (
                <Control
                  key={name}
                  className={`${s.peg} ${sel === p ? s.sel : ""}`}
                  disabled={locked || isSolved || (sel === null && pegs[p].length === 0)}
                  aria-label={`Peg ${name}: ${pegs[p].length ? `disks ${pegs[p].join(", ")}` : "empty"}`}
                  onClick={() => tapPeg(p)}
                >
                  <span className={s.pole} />
                  <span className={s.stack}>
                    {pegs[p].map((d, i) => (
                      <span
                        key={d}
                        className={`${s.disk} ${d === n ? s.big : d <= small && towerPeg === p ? s.block : ""} ${
                          sel === p && i === pegs[p].length - 1 ? s.lift : ""
                        }`}
                        style={{ width: `${30 + (d / MAX_N) * 66}%` }}
                      />
                    ))}
                  </span>
                  <span className={s.name}>{name}</span>
                </Control>
              ))}
            </div>

            <ul className={s.ladder} aria-label="Fewest moves for each tower size">
              {Array.from({ length: n - MIN_N + 1 }, (_, i) => MIN_N + i).map((k) => (
                <li key={k}>
                  <span className={s.lk}>{k} disks</span>
                  <span className={s.bar} style={{ width: `${(cost(k) / cost(MAX_N)) * 100}%` }} />
                  <span className={s.lv}>{cost(k)}</span>
                </li>
              ))}
            </ul>

            <Row>
              <Readout label="Moves" value={moves} />
              <Control className="active" disabled={locked || n >= MAX_N} onClick={addDisk}>
                Add a disk
              </Control>
              <Control disabled={locked || moves === 0} onClick={restart}>
                Restart
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
