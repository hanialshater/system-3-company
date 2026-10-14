"use client";

// Structural balance on K5. Five people, every pair friends (+) or enemies (−). The learner taps the
// sign on any pair to flip it; unbalanced trios are shaded and counted, and the camps (if the friend
// pairs split everyone cleanly) are named. Start: all enemies (five camps, 10 unbalanced).
// Network stage built by hand to company/design/reviews/2026-10-14-design-lead-ncm-rulings.md §2.
// QA path (edges in DOM order, then the two chips): AB → 4 camps (7), BC → mixed (6), AC → ABC|D|E (3),
// DE → ABC|DE (0), six cross pairs → ABCDE (0), All enemies (10), 3 camps → ABC|D|E (3).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const NAMES = "ABCDE";
// Regular pentagon, radius 135 around (170, 152): ruling §2.1 asks R >= 135 (handles 49 px apart).
const POS: [number, number][] = [
  [170, 17],
  [298.4, 110.3],
  [249.4, 261.2],
  [90.6, 261.2],
  [41.6, 110.3],
];
const W = 340;
const H = 284;
// DOM (tap and QA) order: the ABC camp, then D–E, then the six cross pairs.
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
  [3, 4],
  [0, 3],
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
];
const TRIOS: [number, number, number][] = [];
for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) for (let c = b + 1; c < 5; c++) TRIOS.push([a, b, c]);
const idx = (a: number, b: number) => EDGES.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));

type Signs = number[]; // +1 friends, −1 enemies, indexed like EDGES
const ALL_ENEMIES: Signs = EDGES.map(() => -1);
const CAMP_OF = [0, 0, 0, 1, 2]; // preset: ABC | D | E
const THREE_CAMPS: Signs = EDGES.map(([a, b]) => (CAMP_OF[a] === CAMP_OF[b] ? 1 : -1));
const same = (x: Signs, y: Signs) => x.every((v, i) => v === y[i]);

// A trio is balanced when its three signs multiply to + (three friend pairs, or one friend pair and two enemy pairs).
const unbalancedTrios = (sg: Signs) => TRIOS.filter(([a, b, c]) => sg[idx(a, b)] * sg[idx(b, c)] * sg[idx(a, c)] < 0);

// Camps exist when "friends" splits everyone cleanly: friends inside every group, enemies across.
function camps(sg: Signs): string[] | null {
  const g = [0, 1, 2, 3, 4];
  const find = (x: number): number => (g[x] === x ? x : (g[x] = find(g[x])));
  EDGES.forEach(([a, b], k) => {
    if (sg[k] > 0) g[find(a)] = find(b);
  });
  if (EDGES.some(([a, b], k) => (find(a) === find(b)) !== sg[k] > 0)) return null;
  const m = new Map<number, string>();
  for (let i = 0; i < 5; i++) m.set(find(i), (m.get(find(i)) ?? "") + NAMES[i]);
  return [...m.values()];
}

const MILESTONES = ["zero", "three"] as const;
const mid = (k: number): [number, number] => {
  const [a, b] = EDGES[k];
  return [(POS[a][0] + POS[b][0]) / 2, (POS[a][1] + POS[b][1]) / 2];
};

interface Seen {
  zeros: string[]; // camp splits the learner reached with 0 unbalanced
  three: { split: string; n: number } | null; // fewest unbalanced seen with exactly 3 camps
}

function Stage({
  locked,
  interact,
  signs,
  setSigns,
  seen,
  setSeen,
}: {
  locked: boolean;
  interact: () => void;
  signs: Signs;
  setSigns: (s: Signs) => void;
  seen: Seen;
  setSeen: (f: (p: Seen) => Seen) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [last, setLast] = useState<number | null>(null);
  const bad = unbalancedTrios(signs);
  const cs = camps(signs);

  const apply = (next: Signs, fromTap: boolean) => {
    setSigns(next);
    const n = unbalancedTrios(next).length;
    const c = camps(next);
    const split = c ? c.join(" | ") : "";
    if (fromTap && n === 0 && c) {
      setSeen((p) => (p.zeros.includes(split) ? p : { ...p, zeros: [...p.zeros, split] }));
      reach("zero");
    }
    if (c && c.length === 3) {
      setSeen((p) => (p.three && p.three.n <= n ? p : { ...p, three: { split, n } }));
      reach("three");
    }
  };

  const flip = (k: number) => {
    setLast(k);
    apply(
      signs.map((v, i) => (i === k ? -v : v)),
      true,
    );
  };

  const preset = (p: Signs) => {
    setLast(null);
    apply(p, false);
  };

  const campText = locked ? "?" : cs ? `${cs.length}: ${cs.join(" | ")}` : "mixed";
  const label = locked
    ? "Five people, all pairs enemies"
    : `${bad.length} of 10 trios unbalanced; camps ${cs ? cs.join(", ") : "mixed"}`;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Balanced trio: all +, or one + and two −</p>
      <div className={s.board}>
        <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={label}>
          {!locked &&
            bad.map(([a, b, c]) => (
              <polygon
                key={`t${a}${b}${c}`}
                points={[a, b, c].map((i) => POS[i].join(",")).join(" ")}
                className={s.trio}
              />
            ))}
          {EDGES.map(([a, b], k) => (
            <line
              key={`e${k}`}
              x1={POS[a][0]}
              y1={POS[a][1]}
              x2={POS[b][0]}
              y2={POS[b][1]}
              className={signs[k] > 0 ? s.friend : s.enemy}
            />
          ))}
          {EDGES.map((_, k) => {
            const [x, y] = mid(k);
            const f = signs[k] > 0;
            return (
              <g key={`h${k}`}>
                {last === k && <circle cx={x} cy={y} r={16} className={s.ring} />}
                <circle cx={x} cy={y} r={12} className={f ? s.handleOn : s.handleOff} />
                <text x={x} y={y + 5.5} textAnchor="middle" className={f ? s.glyphOn : s.glyphOff}>
                  {f ? "+" : "−"}
                </text>
              </g>
            );
          })}
          {POS.map(([x, y], i) => (
            <g key={NAMES[i]}>
              <circle cx={x} cy={y} r={16} className={s.node} />
              <text x={x} y={y + 5} textAnchor="middle" className={s.name}>
                {NAMES[i]}
              </text>
            </g>
          ))}
        </svg>
        {EDGES.map(([a, b], k) => {
          const [x, y] = mid(k);
          const f = signs[k] > 0;
          return (
            <button
              key={`b${k}`}
              type="button"
              data-qa="control"
              className={s.hit}
              style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
              disabled={locked}
              aria-pressed={f}
              aria-label={`Pair ${NAMES[a]}–${NAMES[b]}, ${f ? "friends" : "enemies"}`}
              onClick={() => flip(k)}
            />
          );
        })}
      </div>
      <p className={s.legend}>
        <span className={s.keyFriend}>+</span> friends <span className={s.keyEnemy}>−</span> enemies{" "}
        <span className={s.keyTrio} /> unbalanced
      </p>
      <Row>
        <Readout label="Unbalanced" value={locked ? "?" : `${bad.length} of 10`} />
        <Readout label="Camps" value={campText} />
      </Row>
      <Row>
        <Control className={`tap ${s.tap}`} disabled={locked || same(signs, ALL_ENEMIES)} onClick={() => preset(ALL_ENEMIES)}>
          All enemies
        </Control>
        <Control className={`tap ${s.tap}`} disabled={locked || same(signs, THREE_CAMPS)} onClick={() => preset(THREE_CAMPS)}>
          3 camps
        </Control>
      </Row>
    </div>
  );
}

// Keep a camp split on one line in the reveal ("ABC | DE" never wraps at the bar).
const nb = (split: string) => split.replace(/ \| /g, "\u00a0\u2060|\u2060\u00a0"); // word joiners: "|" is a break opportunity

const describe = (split: string) => {
  const k = split.split(" | ").length;
  return `${k === 1 ? "one camp" : k === 2 ? "two camps" : `${k} camps`} (${nb(split)})`;
};

export default function EnemyOfMyEnemy({ slug }: { slug: string }) {
  const [signs, setSigns] = useState<Signs>(ALL_ENEMIES);
  const [seen, setSeen] = useState<Seen>({ zeros: [], three: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Five people; each pair is friends (+) or enemies (−). A trio is balanced if it has three + pairs, or one + and two −. A camp: friends inside, enemies with everyone outside. If every trio is balanced, how many camps can there be?",
        options: ["At most 2", "Up to 3", "Up to 5"],
        answer: 0,
      }}
      exploreHint="Tap a + or − to flip that pair. Get Unbalanced to 0, and try 3 camps."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You got 0 unbalanced trios with {seen.zeros.slice(0, 3).map(describe).join(" and ") || "no setting yet"}.
            {seen.three && (
              <>
                {" "}
                Your three camps ({nb(seen.three.split)}) left <strong>{seen.three.n}</strong> unbalanced.
              </>
            )}
          </p>
          <p>
            Three camps never balance: one person from each camp makes a trio of three enemies, which is unbalanced.
            With five people, three camps leave at least 3 such trios; all enemies leaves all 10.
          </p>
          <p>
            So if every trio is balanced, there is one camp or two: friends inside, enemies across. This is the balance
            theorem (Cartwright and Harary, 1956), and it holds for any number of people.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} signs={signs} setSigns={setSigns} seen={seen} setSeen={setSeen} />
      )}
    </Lesson>
  );
}
