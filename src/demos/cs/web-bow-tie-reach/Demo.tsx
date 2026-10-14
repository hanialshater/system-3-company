"use client";

// Which pages can you click your way to? A 12-page directed graph drawn as a bow tie. Tap a page
// to start there; the pages reachable by following links the way they point fill in, with a count.
// Hand-built to the interim network-stage rules (company/design/reviews/2026-10-14-design-lead-ncm-rulings.md §2):
// one-character labels, 44 px hit targets, centres >= 48 px apart, arrowheads ending at the rim.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W = 340;
const H = 290;
const R = 15; // drawn node radius
const HIT = 44; // target size in px (stage is shown at most 340 px wide, so 1 unit <= 1 px)

const IDS = "ABCDEFGHIJKL".split("");
const POS: Record<string, [number, number]> = {
  A: [130, 165], B: [130, 95], C: [190, 95], D: [190, 165], // core
  E: [50, 165], F: [50, 50], // IN
  G: [265, 70], H: [275, 165], I: [285, 250], // OUT
  J: [50, 250], // tendril off IN
  K: [130, 250], L: [200, 250], // detached pair
};
const EDGES: [string, string][] = [
  ["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["D", "B"],
  ["C", "G"], ["D", "H"], ["E", "A"], ["E", "F"], ["E", "J"], ["F", "B"],
  ["G", "H"], ["H", "I"], ["K", "L"],
];
const GROUP: Record<string, "core" | "in" | "out" | "other"> = {
  A: "core", B: "core", C: "core", D: "core", E: "in", F: "in", G: "out", H: "out", I: "out",
  J: "other", K: "other", L: "other",
};

function reach(start: string): Set<string> {
  const seen = new Set([start]);
  const q = [start];
  while (q.length) {
    const c = q.shift()!;
    for (const [a, b] of EDGES) if (a === c && !seen.has(b)) { seen.add(b); q.push(b); }
  }
  return seen;
}

function arrow(a: string, b: string) {
  const [x1, y1] = POS[a];
  const [x2, y2] = POS[b];
  const d = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / d;
  const uy = (y2 - y1) / d;
  const sx = x1 + ux * R, sy = y1 + uy * R; // leaves the source rim
  const tx = x2 - ux * (R + 2), ty = y2 - uy * (R + 2); // tip just outside the target rim
  const bx = tx - ux * 10, by = ty - uy * 10; // head 10 long, 10 wide
  const head = `${tx},${ty} ${bx - uy * 5},${by + ux * 5} ${bx + uy * 5},${by - ux * 5}`;
  return { sx, sy, bx, by, head };
}

type Firsts = { core?: string; in?: string; out?: string };

export default function WebBowTieReach({ slug }: { slug: string }) {
  const [start, setStart] = useState<string | null>(null);
  const [firsts, setFirsts] = useState<Firsts>({});
  const set = start ? reach(start) : new Set<string>();

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "12 small pages with one-way links. Ignoring direction, 10 of them are joined to the central group. Start on page A in that group and click links the way they point. How many pages can you reach, counting A?",
        options: ["10", "7", "4"],
        answer: 1,
      }}
      exploreHint="Tap pages to start there. Try the middle, the left and the right."
      minInteractions={3}
      reveal={() => {
        const said = (["core", "in", "out"] as const)
          .filter((g) => firsts[g])
          .map((g) => {
            const p = firsts[g]!;
            const n = reach(p).size;
            return n === 1 ? `From ${p} only itself.` : `From ${p} you reach ${n} of 12.`;
          })
          .join(" ");
        return (
          <>
            <p>
              {said} Links point one way, so &ldquo;joined&rdquo; is not &ldquo;reachable&rdquo;. From the middle group you can click out
              to the right, but nothing leads back to the left, and the right end leads almost nowhere.
            </p>
            <p>
              The real web has this shape too. Broder and colleagues (2000) mapped about 200 million pages and found a tightly linked
              core, pages that lead into it, pages it leads out to, and a few detached pieces. This 12-page graph is a toy, not to scale.
            </p>
            <p className="muted">Connected is not the same as reachable.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["core", "in", "out"]}>
          {(reachM) => {
            const pick = (id: string) => {
              if (locked) return;
              setStart(id);
              const g = GROUP[id];
              if (g === "core" || g === "in" || g === "out") {
                setFirsts((f) => (f[g] ? f : { ...f, [g]: id }));
                reachM(g);
              }
            };
            const label = start
              ? `Start ${start}: reach ${set.size} of 12 pages.`
              : "12 pages, no start chosen.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {start ? <>From {start}: reach <b>{set.size}</b> of 12</> : "Tap a page to start there."}
                </p>
                <div className={s.stage}>
                  <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
                    {EDGES.map(([a, b]) => {
                      const { sx, sy, bx, by, head } = arrow(a, b);
                      const live = set.has(a);
                      const col = live ? "var(--fg)" : "var(--line)";
                      return (
                        <g key={a + b}>
                          <line x1={sx} y1={sy} x2={bx} y2={by} stroke={col} strokeWidth={2} />
                          <polygon points={head} fill={col} />
                        </g>
                      );
                    })}
                    {IDS.map((id) => {
                      const [x, y] = POS[id];
                      const on = set.has(id);
                      const isStart = id === start;
                      return (
                        <g key={id}>
                          {isStart && <circle cx={x} cy={y} r={R + 5} fill="none" stroke="var(--fg)" strokeWidth={3} />}
                          <circle cx={x} cy={y} r={R} fill={on ? "var(--fg)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={2} />
                          <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill={on ? "var(--bg)" : "var(--fg)"}>
                            {id}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  {IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      data-qa="control"
                      className={s.hit}
                      style={{ left: `calc(${(POS[id][0] / W) * 100}% - ${HIT / 2}px)`, top: `calc(${(POS[id][1] / H) * 100}% - ${HIT / 2}px)`, width: HIT, height: HIT }}
                      disabled={locked}
                      aria-pressed={id === start}
                      aria-label={`Page ${id}${id === start ? `, start, reaches ${set.size} of 12` : ""}`}
                      onClick={() => pick(id)}
                    />
                  ))}
                </div>
                <p className="muted small" style={{ margin: 0, textAlign: "center" }}>
                  Ring: start. Filled: reachable.
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
