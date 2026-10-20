"use client";

// Union by size. 8 people; tap one to see how many hops it is up to their leader, tap a second
// to merge their groups (the smaller group's leader hangs under the bigger group's leader; on a
// tie, the second under the first). However you merge, nobody ends more than 3 hops from the
// leader: a person only moves one hop further when their group at least doubles. A seeded batch
// of 1,000 random merge orders (mulberry32 seed 1, not chosen) checks the ceiling.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];
const N = NAMES.length;

type UF = { parent: number[]; size: number[] };
const fresh = (): UF => ({ parent: NAMES.map((_, i) => i), size: NAMES.map(() => 1) });
function root(u: UF, x: number) {
  let h = 0;
  while (u.parent[x] !== x) {
    x = u.parent[x];
    h++;
  }
  return { r: x, hops: h };
}
function union(u: UF, a: number, b: number): UF {
  let ra = root(u, a).r;
  let rb = root(u, b).r;
  if (ra === rb) return u;
  if (u.size[ra] < u.size[rb]) [ra, rb] = [rb, ra];
  const parent = [...u.parent];
  const size = [...u.size];
  parent[rb] = ra;
  size[ra] += size[rb];
  return { parent, size };
}
const height = (u: UF) => Math.max(...NAMES.map((_, i) => root(u, i).hops));
const groups = (u: UF) => NAMES.map((_, i) => i).filter((i) => u.parent[i] === i);

// 1,000 random merge orders: random pairs of people until everyone is in one group.
function randomBatch() {
  const rng = mulberry32(1);
  let worst = 0;
  for (let t = 0; t < 1000; t++) {
    let u = fresh();
    while (groups(u).length > 1) u = union(u, Math.floor(rng() * N), Math.floor(rng() * N));
    worst = Math.max(worst, height(u));
  }
  return worst;
}

// Tree layout: leaves get x slots left to right, parents sit over their children.
function layout(u: UF) {
  const kids = NAMES.map((_, i) => NAMES.map((__, j) => j).filter((j) => j !== i && u.parent[j] === i));
  const pos: { x: number; y: number }[] = Array(N);
  let slot = 0;
  const place = (v: number, d: number): number => {
    if (!kids[v].length) {
      pos[v] = { x: slot++, y: d };
      return pos[v].x;
    }
    const xs = kids[v].map((k) => place(k, d + 1));
    pos[v] = { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: d };
    return pos[v].x;
  };
  for (const r of groups(u)) place(r, 0);
  return pos;
}

export default function UnionFindShortcut({ slug }: { slug: string }) {
  const [u, setU] = useState<UF>(fresh);
  const [sel, setSel] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [tallest, setTallest] = useState(0); // tallest tree built by hand
  const [auto, setAuto] = useState<number | null>(null); // height after "Merge the rest"
  const [batch, setBatch] = useState<number | null>(null);

  const pos = layout(u);
  const g = groups(u);
  const h = height(u);
  const X = (x: number) => 18 + x * 34;
  const Y = (y: number) => 22 + y * 40;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At a meetup, 8 people merge into groups, always hanging the smaller group under the bigger group's leader. In the worst case, how many hops from anyone up to their leader?",
        options: ["7", "3", "1"],
        answer: 1,
      }}
      exploreHint="Merge groups and try to build the tallest tree you can."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {auto !== null ? (
              <>
                Merging the smallest groups first made a tree <strong>{auto}</strong> hops from the bottom to the leader.{" "}
              </>
            ) : null}
            {tallest > 0 ? `By hand you built up to ${tallest} hop${tallest === 1 ? "" : "s"}.` : ""}
            {batch !== null ? ` In 1,000 random merge orders the worst was ${batch}.` : ""} With the smaller group hung
            under the bigger, nobody gets past 3.
          </p>
          <p>
            A person moves one hop further from their leader only when their group joins one at least as big, so their
            group at least doubles. From 1 to 8 that can happen only 3 times. Finding a leader stays short however the
            groups grow.
          </p>
          <p className="muted">Small trees by rule make &quot;are we connected?&quot; a few hops, not a search.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const commit = (next: UF, msg: string, byHand = true) => {
          setU(next);
          if (byHand) setTallest((t) => Math.max(t, height(next)));
          setNote(msg);
          if (groups(next).length === 1) interact();
        };
        const tap = (i: number) => {
          if (locked) return;
          if (sel === null || sel === i) {
            const f = root(u, i);
            setSel(i);
            setNote(`${NAMES[i]}: ${f.hops} hop${f.hops === 1 ? "" : "s"} up to leader ${NAMES[f.r]}. Tap someone to merge.`);
            return;
          }
          const a = root(u, sel).r;
          const b = root(u, i).r;
          setSel(null);
          if (a === b) {
            setNote(`${NAMES[sel]} and ${NAMES[i]} already share leader ${NAMES[a]}.`);
            return;
          }
          const next = union(u, sel, i);
          const top = root(next, i).r;
          commit(next, `Merged: leader ${NAMES[top]}, group of ${next.size[top]}. Tallest: ${height(next)} hop${height(next) === 1 ? "" : "s"}. Tap two leaders (filled circles) to merge more.`);
        };
        const pairUp = () => {
          if (locked || g.length === 1) return;
          // Merge groups two at a time, equal sizes together: the tallest possible tree.
          let next = u;
          while (groups(next).length > 1) {
            const rs = groups(next).sort((x, y) => next.size[x] - next.size[y]);
            next = union(next, rs[1], rs[0]);
          }
          setSel(null);
          setAuto(height(next));
          commit(next, `Everyone merged, smallest groups first. Tallest: ${height(next)} hops.`, false);
        };
        const runBatch = () => {
          if (locked || batch !== null) return;
          const w = randomBatch();
          setBatch(w);
          setNote(`1,000 random merge orders: the worst tree was ${w} hops tall.`);
        };
        const reset = () => {
          if (locked) return;
          setU(fresh());
          setSel(null);
          setNote("Everyone on their own again.");
        };

        const msg = locked ? "Make a prediction to start." : note || "Tap a person, then another, to merge their groups.";

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 172" className="stage-svg" role="img" aria-label={`${g.length} groups; tallest tree ${h} hops`}>
              {NAMES.map((_, i) =>
                u.parent[i] !== i ? (
                  <line key={`l${i}`} x1={X(pos[i].x)} y1={Y(pos[i].y)} x2={X(pos[u.parent[i]].x)} y2={Y(pos[u.parent[i]].y)} stroke="var(--muted)" strokeWidth={2} />
                ) : null,
              )}
              {NAMES.map((name, i) => {
                const isRoot = u.parent[i] === i;
                return (
                  <g key={name}>
                    <circle
                      cx={X(pos[i].x)}
                      cy={Y(pos[i].y)}
                      r={13}
                      fill={isRoot ? "var(--domain)" : "var(--bg-2)"}
                      stroke={sel === i ? "var(--warn)" : "var(--fg)"}
                      strokeWidth={sel === i ? 3 : 1.2}
                    />
                    <text x={X(pos[i].x)} y={Y(pos[i].y) + 4} textAnchor="middle" className={s.node}>
                      {name}
                    </text>
                  </g>
                );
              })}
              {[0, 1, 2, 3].filter((d) => !locked && d <= h).map((d) => (
                <text key={d} x={316} y={Y(d) + 4} textAnchor="end" className={s.axis}>
                  {d === 0 ? "leader" : `${d} hop${d === 1 ? "" : "s"}`}
                </text>
              ))}
            </svg>
            <div className={s.people}>
              {NAMES.map((name, i) => (
                <Control key={name} className={sel === i ? "active" : ""} disabled={locked} aria-label={`Person ${name}`} onClick={() => tap(i)}>
                  {name}
                </Control>
              ))}
            </div>
            <Row>
              <Control disabled={locked || g.length === N} onClick={reset}>
                Start over
              </Control>
              <Control className="active" disabled={locked || g.length === 1} onClick={pairUp}>
                Merge the rest, tallest way
              </Control>
              <Control disabled={locked || batch !== null} onClick={runBatch}>
                1,000 random orders
              </Control>
            </Row>
            <p className={s.count}>
              Groups {g.length} · tallest now {h} · tallest you built by hand {tallest}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
