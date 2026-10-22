"use client";

// A new friend loosens the circle. Ana in the centre; her 4 friends B, C, D, E on an arc, with B–C, C–D
// and D–E friends (3 of their 6 pairs). Every pair of Ana's friends is drawn: a solid line if the two are
// friends, a faint dashed line if not, so the readout's "of 6" / "of 10" can be counted on the picture.
// "Fay knows 1/2/3" adds Fay as Ana's fifth friend, knowing E; D and E; C, D and E. Clustering =
// linked pairs / all pairs, computed from the drawn edges: 0.5 before, then 0.4, 0.5, 0.6 ((3 + k) / 10).
// Milestones: Fay knowing 1 (0.4, the question's case) and knowing 2 (0.5, break-even). Each tried chip
// keeps a trace (✓ and its share), so "No Fay" cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.discrete.md #11 (NCM J2, E&K ch. 3).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const MILESTONES = ["knows1", "knows2"] as const;
type Fay = 1 | 2 | 3 | null; // null: no Fay

const ANA = "Ana";
const OLD = ["B", "C", "D", "E"] as const;
const OLD_LINKS: [string, string][] = [
  ["B", "C"],
  ["C", "D"],
  ["D", "E"],
];
/** Whom Fay knows when she knows k of the four (her neighbours on the arc first). */
const FAY_KNOWS: Record<1 | 2 | 3, string[]> = { 1: ["E"], 2: ["D", "E"], 3: ["C", "D", "E"] };

function network(fay: Fay) {
  const friends: string[] = fay === null ? [...OLD] : [...OLD, "Fay"];
  const links = new Set(OLD_LINKS.map(([a, b]) => `${a}|${b}`));
  if (fay !== null) for (const x of FAY_KNOWS[fay]) links.add(`${x}|Fay`);
  const pairs: { a: string; b: string; linked: boolean }[] = [];
  for (let i = 0; i < friends.length; i++)
    for (let j = i + 1; j < friends.length; j++) {
      const a = friends[i];
      const b = friends[j];
      pairs.push({ a, b, linked: links.has(`${a}|${b}`) || links.has(`${b}|${a}`) });
    }
  const linked = pairs.filter((p) => p.linked).length;
  return { friends, pairs, linked, total: pairs.length, share: linked / pairs.length };
}
const f1 = (v: number) => v.toFixed(1);

// Layout: Ana low in the centre, friends on an arc above her, Fay at the right end of the arc.
const W = 340;
const H = 210;
const POS: Record<string, [number, number]> = {
  Ana: [170, 186],
  B: [38, 160],
  C: [88, 82],
  D: [170, 52],
  E: [252, 82],
  Fay: [302, 160],
};

type Seen = { k1: number | null; k2: number | null; k3: number | null };

export default function NewFriendLoosensTheCircle({ slug }: { slug: string }) {
  const [fay, setFay] = useState<Fay>(null);
  const seen = useRef<Seen>({ k1: null, k2: null, k3: null });
  const before = network(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In your class, Ana has 4 friends. Of the 6 pairs among them, 3 are friends with each other: a share of 0.5, called Ana's clustering. She makes a new friend, Fay, who knows one of the 4. Ana's clustering is now…",
        options: ["Higher than 0.5", "Still 0.5", "Lower than 0.5"],
        answer: 2,
      }}
      exploreHint="Let Fay know 1, then 2, then 3 of Ana's friends, and count the pairs."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sn = seen.current;
        const k1 = network(1);
        return (
          <>
            <p>
              Fay made {k1.total - before.total} new pairs, her with each of Ana&apos;s old friends, so Ana&apos;s pairs went
              from {before.total} to {k1.total}. Knowing 1 of them gave {k1.linked} linked pairs of {k1.total}:{" "}
              {f1(sn.k1 ?? k1.share)}, lower than before.
            </p>
            <p>
              She had to know 2 of the 4, half of them, just to hold {f1(sn.k2 ?? network(2).share)}
              {sn.k3 !== null ? `; knowing 3 lifted it to ${f1(sn.k3)}` : ""}. Clustering is linked pairs over all pairs:
              Fay added {k1.total - before.total} pairs to the bottom but only one to the top for each friend she knew.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} fay={fay} setFay={setFay} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  fay,
  setFay,
  seen,
}: StageContext & { fay: Fay; setFay: (v: Fay) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const net = network(fay);

  const go = (next: Fay) => {
    setFay(next);
    const n = network(next);
    if (next === 1) {
      if (seen.k1 === null) seen.k1 = n.share;
      reach("knows1");
    } else if (next === 2) {
      if (seen.k2 === null) seen.k2 = n.share;
      reach("knows2");
    } else if (next === 3) {
      if (seen.k3 === null) seen.k3 = n.share;
    }
  };

  const chips: { label: string; next: Fay; trace: string | null }[] = [
    { label: "Fay knows 1", next: 1, trace: seen.k1 !== null ? `✓ ${f1(seen.k1)}` : null },
    { label: "Fay knows 2", next: 2, trace: seen.k2 !== null ? `✓ ${f1(seen.k2)}` : null },
    { label: "Fay knows 3", next: 3, trace: seen.k3 !== null ? `✓ ${f1(seen.k3)}` : null },
    { label: "No Fay", next: null, trace: null },
  ];
  const readout = `linked pairs ${net.linked} of ${net.total} = ${f1(net.share)}`;
  const people = [ANA, ...net.friends];

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Ana and her friends: ${readout}`}>
        {/* Ana's friendships */}
        {net.friends.map((f) => (
          <line key={`ana-${f}`} x1={POS.Ana[0]} y1={POS.Ana[1]} x2={POS[f][0]} y2={POS[f][1]} className={s.spoke} />
        ))}
        {/* every pair of Ana's friends: solid if they are friends, dashed if not */}
        {net.pairs
          .filter((p) => !p.linked)
          .map((p) => (
            <line key={`${p.a}-${p.b}`} x1={POS[p.a][0]} y1={POS[p.a][1]} x2={POS[p.b][0]} y2={POS[p.b][1]} className={s.unlinked} />
          ))}
        {net.pairs
          .filter((p) => p.linked)
          .map((p) => (
            <line
              key={`${p.a}-${p.b}`}
              x1={POS[p.a][0]}
              y1={POS[p.a][1]}
              x2={POS[p.b][0]}
              y2={POS[p.b][1]}
              className={p.b === "Fay" ? s.linkedNew : s.linked}
            />
          ))}
        {people.map((p) => (
          <g key={p}>
            <circle cx={POS[p][0]} cy={POS[p][1]} r={p === ANA || p === "Fay" ? 17 : 14} className={p === ANA ? s.ana : p === "Fay" ? s.fay : s.node} />
            <text x={POS[p][0]} y={POS[p][1] + 4.5} textAnchor="middle" className={s.name}>
              {p}
            </text>
          </g>
        ))}
        <text x={W / 2} y={18} textAnchor="middle" className={s.readout}>
          {readout}
        </text>
      </svg>

      <Row>
        {chips.map((c) => {
          const on = fay === c.next;
          return (
            <Control
              key={c.label}
              disabled={locked || on}
              className={`${s.tap} ${on ? "active" : ""}`}
              aria-pressed={on}
              onClick={() => go(c.next)}
            >
              <span>{c.label}</span>
              {c.trace && <span className={s.trace}>{c.trace}</span>}
            </Control>
          );
        })}
      </Row>
    </div>
  );
}
