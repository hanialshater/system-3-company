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

// Group labels, drawn once the learner has tried all three groups.
const TAGS: [string, number, number][] = [
  ["IN", 50, 22], ["CORE", 160, 70], ["OUT", 270, 36], ["TENDRIL", 50, 280], ["DETACHED", 165, 280],
];

type Firsts = { core?: string; in?: string; out?: string };

export default function WebBowTieReach({ slug }: { slug: string }) {
  const [start, setStart] = useState<string | null>(null);
  const [firsts, setFirsts] = useState<Firsts>({});
  
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "12 small pages with one-way links. Ignoring direction, 10 of them are joined to the central group. Start on page A in that group and click links the way they point. How many pages can you reach, counting A?",
        options: ["7", "10", "4"],
        answer: 0,
      }}
      exploreHint="Tap pages to start there. Try a page in the middle, one at the far left and one at the far right."
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
              The stage shows the first core page you tried{firsts.core ? `, ${firsts.core}` : ""}; rings mark the first IN and OUT pages
              you tried. {said} Links point one way, so &ldquo;joined&rdquo; is not &ldquo;reachable&rdquo;. From CORE you can click out
              to OUT, but nothing leads back to IN, and OUT leads almost nowhere.
            </p>
            <p>
              The real web has this shape too. Broder and colleagues (2000) mapped about 200 million pages and found a tightly linked
              core, pages that lead into it, pages it leads out to, tendrils hanging off those, and disconnected pieces. This 12-page
              graph is a toy, not to scale.
            </p>
            <p className="muted">Connected is not the same as reachable.</p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
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
            const showing = phase === "reveal" && firsts.core ? firsts.core : start;
            const shown = showing ? reach(showing) : new Set<string>();
            const quoted = phase === "reveal" ? [firsts.core, firsts.in, firsts.out] : [];
            const tags = Object.keys(firsts).length === 3 || phase === "reveal";
            const label = showing
              ? `Start ${showing}: reach ${shown.size} of 12 pages.`
              : "12 pages, no start chosen.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {showing ? <>From {showing}: reach <b>{shown.size}</b> of 12</> : "Tap a page to start there."}
                </p>
                <div className={s.stage}>
                  <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
                    {EDGES.map(([a, b]) => {
                      const { sx, sy, bx, by, head } = arrow(a, b);
                      const live = shown.has(a);
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
                      const on = shown.has(id);
                      const isStart = id === showing;
                      const quotedRing = !isStart && quoted.includes(id);
                      return (
                        <g key={id}>
                          {isStart && <circle cx={x} cy={y} r={R + 5} fill="none" stroke="var(--fg)" strokeWidth={3} />}
                          {quotedRing && <circle cx={x} cy={y} r={R + 5} fill="none" stroke="var(--fg)" strokeWidth={2} strokeDasharray="4 3" />}
                          <circle cx={x} cy={y} r={R} fill={on ? "var(--fg)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={2} />
                          <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill={on ? "var(--bg)" : "var(--fg)"}>
                            {id}
                          </text>
                        </g>
                      );
                    })}
                    {tags && TAGS.map(([txt, x, y]) => (
                      <text key={txt} x={x} y={y} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1} fill="var(--muted, var(--fg))">
                        {txt}
                      </text>
                    ))}
                  </svg>
                  {IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      data-qa="control"
                      className={s.hit}
                      style={{ left: `calc(${(POS[id][0] / W) * 100}% - ${HIT / 2}px)`, top: `calc(${(POS[id][1] / H) * 100}% - ${HIT / 2}px)`, width: HIT, height: HIT }}
                      disabled={locked || phase === "reveal"}
                      aria-pressed={id === showing}
                      aria-label={`Page ${id}${id === showing ? `, start, reaches ${shown.size} of 12` : ""}`}
                      onClick={() => pick(id)}
                    />
                  ))}
                </div>
                <p className="muted small" style={{ margin: 0, textAlign: "center" }}>
                  {phase === "reveal" ? "Ring: shown start. Dashed: other pages you tried. Filled: reachable." : "Ring: start. Filled: reachable."}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
