"use client";

// Depth-first search finds a path, not the shortest one. The learner steps the search on the
// question's three places (S, A, G): it takes A first (alphabetical) and goes deeper, so it
// returns S, A, G although S links straight to G. Then the shortest path is overlaid, and a
// bigger maze shows a dead end, a back-up and a long winding find. One representation: the graph.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Graph = { name: string; pos: Record<string, [number, number]>; edges: [string, string][] };

const TRIANGLE: Graph = {
  name: "3-place map",
  pos: { S: [50, 150], A: [160, 40], G: [270, 150] },
  edges: [
    ["S", "A"],
    ["S", "G"],
    ["A", "G"],
  ],
};
const MAZE: Graph = {
  name: "bigger maze",
  pos: { S: [30, 120], A: [95, 50], B: [160, 18], C: [170, 95], D: [245, 60], E: [160, 175], G: [290, 130] },
  edges: [
    ["S", "A"],
    ["S", "E"],
    ["A", "B"],
    ["A", "C"],
    ["C", "D"],
    ["D", "G"],
    ["E", "G"],
  ],
};
const GRAPHS = [TRIANGLE, MAZE];

const nbrs = (g: Graph, u: string) =>
  g.edges
    .flatMap(([a, b]) => (a === u ? [b] : b === u ? [a] : []))
    .sort();

type Step = { stack: string[]; visited: string[]; text: string; backed?: string };

/** Depth-first search from S to G, neighbours tried alphabetically; one entry per step. */
function dfsSteps(g: Graph): Step[] {
  const steps: Step[] = [{ stack: ["S"], visited: ["S"], text: "Start at S." }];
  const stack = ["S"];
  const visited = new Set(["S"]);
  while (stack.length && stack[stack.length - 1] !== "G") {
    const u = stack[stack.length - 1];
    const v = nbrs(g, u).find((x) => !visited.has(x));
    if (v) {
      stack.push(v);
      visited.add(v);
      steps.push({ stack: [...stack], visited: [...visited], text: v === "G" ? `Reached G: ${stack.join(", ")}.` : `${u} → ${v}, go deeper.` });
    } else {
      stack.pop();
      steps.push({ stack: [...stack], visited: [...visited], text: `${u} is a dead end. Back up to ${stack[stack.length - 1]}.`, backed: u });
    }
  }
  return steps;
}

/** Fewest-links path from S to G (breadth-first). */
function shortest(g: Graph): string[] {
  const prev: Record<string, string | null> = { S: null };
  const q = ["S"];
  while (q.length) {
    const u = q.shift()!;
    for (const v of nbrs(g, u)) {
      if (v in prev) continue;
      prev[v] = u;
      q.push(v);
    }
  }
  const path: string[] = [];
  for (let x: string | null = "G"; x; x = prev[x] ?? null) path.unshift(x);
  return path;
}

const found = (g: Graph) => dfsSteps(g)[dfsSteps(g).length - 1].stack;

export default function MazeDepthFirst({ slug }: { slug: string }) {
  const [gi, setGi] = useState(0);
  const [at, setAt] = useState(0); // index into the step list
  const [showShort, setShowShort] = useState(false);
  const [results, setResults] = useState<Record<string, string[]>>({}); // graph name -> path DFS returned

  const g = GRAPHS[gi];
  const steps = dfsSteps(g);
  const step = steps[at];
  const done = at === steps.length - 1;
  const top = step.stack[step.stack.length - 1];
  const nextIsBack = !done && steps[at + 1].backed !== undefined;
  const best = shortest(g);
  const triDfs = found(TRIANGLE);
  const triBest = shortest(TRIANGLE);
  const mazeDfs = found(MAZE);
  const mazeBest = shortest(MAZE);

  const onStack = (u: string) => step.stack.includes(u);
  const pathEdge = (path: string[], a: string, b: string) =>
    path.some((x, i) => i > 0 && ((path[i - 1] === a && x === b) || (path[i - 1] === b && x === a)));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Three places: S links to A and G, and A links to G. Depth-first search from S goes as deep as it can before trying anything else, and picks neighbours alphabetically. Which path to G does it return?",
        options: ["S, G", triDfs.join(", "), "S, A, S, G"],
        answer: 1,
      }}
      exploreHint="Step the search to G, show the shortest path, then run the bigger maze."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            {Object.keys(results).length
              ? `You saw depth-first return ${Object.entries(results)
                  .map(([k, v]) => `${v.join(", ")} on the ${k}`)
                  .join(" and ")}. `
              : ""}
            From S it takes A first, because A comes first alphabetically, and goes deeper before trying anything else.
            A&apos;s next unvisited neighbour is G, so it returns <strong>{triDfs.join(", ")}</strong>: {triDfs.length - 1}{" "}
            links, though {triBest.join(", ")} is {triBest.length - 1}.
          </p>
          <p>
            Depth-first search commits to one branch and only backs up at a dead end. That makes it simple and it always
            finds a path if one exists, but not the shortest: in the bigger maze it returns {mazeDfs.length - 1} links where{" "}
            {mazeBest.length - 1} would do. For fewest links, search breadth-first (every place one link away, then two, and so on).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["found", "compared", "maze"]}>
          {(reach) => {
            const arrive = (i: number) => {
              setAt(i);
              if (i === steps.length - 1) {
                setResults((r) => ({ ...r, [g.name]: steps[i].stack }));
                reach(gi === 0 ? "found" : "maze");
              }
            };
            const next = () => {
              if (locked || done) return;
              arrive(at + 1);
            };
            const run = () => {
              if (locked || done) return;
              arrive(steps.length - 1);
            };
            const toggleShort = () => {
              if (locked || !done) return;
              setShowShort(!showShort);
              if (!showShort) reach("compared");
            };
            const switchGraph = () => {
              if (locked) return;
              const ng = 1 - gi;
              setGi(ng);
              if (ng === 1) {
                // The bigger maze runs at once and shows the shortest path beside it.
                const ns = dfsSteps(MAZE);
                setAt(ns.length - 1);
                setShowShort(true);
                setResults((r) => ({ ...r, [MAZE.name]: ns[ns.length - 1].stack }));
                reach("maze");
              } else {
                setAt(0);
                setShowShort(false);
              }
            };
            const restart = () => {
              if (locked) return;
              setAt(0);
              setShowShort(false);
            };

            const msg = locked
              ? "Make a prediction to start."
              : showShort
                ? `Shortest: ${best.join(", ")} (${best.length - 1}). Depth-first: ${step.stack.length - 1}.${gi === 1 ? " B was a dead end." : ""}`
                : step.text;

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={`${g.name}: stack ${step.stack.join(", ")}`}>
                  {g.edges.map(([a, b]) => {
                    const [x1, y1] = g.pos[a];
                    const [x2, y2] = g.pos[b];
                    const live = !locked && pathEdge(step.stack, a, b);
                    return (
                      <line
                        key={`${a}${b}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={live ? "var(--domain)" : "var(--line)"}
                        strokeWidth={live ? 5 : 3}
                        strokeLinecap="round"
                      />
                    );
                  })}
                  {showShort &&
                    best.slice(1).map((v, i) => {
                      const [x1, y1] = g.pos[best[i]];
                      const [x2, y2] = g.pos[v];
                      return (
                        <line key={`b${v}`} x1={x1} y1={y1 + 9} x2={x2} y2={y2 + 9} stroke="var(--good)" strokeWidth={3} strokeDasharray="6 5" />
                      );
                    })}
                  {Object.entries(g.pos).map(([u, [x, y]]) => {
                    const vis = !locked && step.visited.includes(u);
                    return (
                      <g key={u}>
                        <circle
                          cx={x}
                          cy={y}
                          r={16}
                          fill={!locked && onStack(u) ? "var(--domain)" : vis ? "var(--muted)" : "var(--bg-2)"}
                          stroke={!locked && u === top ? "var(--fg)" : "var(--line)"}
                          strokeWidth={!locked && u === top ? 3 : 2}
                        />
                        <text x={x} y={y + 5} textAnchor="middle" className={s.label}>
                          {u}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className={s.stack} aria-label="Stack of places">
                  <span className="muted small">Path so far (the stack):</span>
                  {(locked ? [] : step.stack).map((u, i) => (
                    <span key={`${u}${i}`} className={s.chip}>
                      {u}
                    </span>
                  ))}
                </p>

                <Row>
                  <Control className="active" disabled={locked || done} onClick={next}>
                    {nextIsBack ? "Dead end: back up" : "Step"}
                  </Control>
                  <Control disabled={locked || done} onClick={run}>
                    Run to G
                  </Control>
                  <Control disabled={locked || !done} onClick={toggleShort}>
                    {showShort ? "Hide shortest" : "Show shortest"}
                  </Control>
                </Row>
                <Row>
                  <Control disabled={locked} onClick={switchGraph}>
                    {gi === 0 ? "Run the bigger maze" : "Back to the 3-place map"}
                  </Control>
                  <Control disabled={locked || at === 0} onClick={restart}>
                    Start over
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
