"use client";

// A relation is a direction. On a hand-made toy map: man (0,0), woman (0,1), king (1,0),
// queen (1,1), crown (1,0.4), prince (1,-0.5). king + (woman - man) = (1,1), exactly queen;
// crown is 0.6 away and prince 1.5 away. The same parallelogram read the other way,
// woman + (king - man), also lands on queen.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Vec = [number, number];
const WORDS: Record<string, Vec> = {
  man: [0, 0],
  woman: [0, 1],
  king: [1, 0],
  queen: [1, 1],
  crown: [1, 0.4],
  prince: [1, -0.5],
};
// A messier map, also placed by hand: every word nudged, so the relation is only roughly a direction.
const MESSY: Record<string, Vec> = {
  man: [0, 0],
  woman: [-0.1, 1],
  king: [1, 0.1],
  queen: [1.3, 1.3],
  crown: [1, 0.75],
  prince: [0.9, -0.4],
};
const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]];
const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
const dist = (a: Vec, b: Vec) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Nearest word to a point, skipping the words used to build it. */
function nearest(p: Vec, skip: string[], map: Record<string, Vec> = WORDS) {
  let best = "";
  for (const w of Object.keys(map)) if (!skip.includes(w) && (!best || dist(p, map[w]) < dist(p, map[best]))) best = w;
  return best;
}
// MODEL END

type Step = "none" | "measured" | "king" | "woman";
const PLAN: Record<Exclude<Step, "none">, { from: string; arrow: [string, string] }> = {
  measured: { from: "man", arrow: ["man", "woman"] },
  king: { from: "king", arrow: ["man", "woman"] },
  woman: { from: "woman", arrow: ["man", "king"] },
};

// Map x in [-0.45, 1.75] -> 20..300, y in [-0.8, 1.35] -> 214..22.
const X = (x: number) => 20 + ((x + 0.45) / 2.2) * 280;
const Y = (y: number) => 214 - ((y + 0.8) / 2.15) * 192;

export default function KingQueenArrow({ slug }: { slug: string }) {
  const [step, setStep] = useState<Step>("none");
  const interactRef = useRef<() => void>(() => {});
  const [messy, setMessy] = useState(false);
  const { reach } = useMilestones(() => interactRef.current(), ["applied-to-king", "messy-map"]);
  const W = messy ? MESSY : WORDS;

  const plan = step === "none" ? null : PLAN[step];
  const tip = plan ? add(W[plan.from], sub(W[plan.arrow[1]], W[plan.arrow[0]])) : null;
  const skip = plan ? [plan.from, ...plan.arrow] : [];
  const near = tip && step !== "measured" ? nearest(tip, skip, W) : null;
  const cand = ["queen", "crown", "prince"];

  const go = (st: Step) => {
    setStep(st);
    if (st === "king" && !messy) reach("applied-to-king");
  };
  const toggleMap = () => {
    const m = !messy;
    setMessy(m);
    setStep("king");
    reach(m ? "messy-map" : "applied-to-king");
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a tidy toy map, man is (0,0), woman (0,1), king (1,0), queen (1,1), crown (1,0.4), prince (1,-0.5): king + (woman - man) lands exactly on queen. On a messier map, with every word nudged a little, would that arrow land nearest queen?",
        options: ["Always", "Often, not always", "Never"],
        answer: 1,
      }}
      exploreHint="Measure the arrow, carry it to king, then try the messier map."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            On the tidy map the man → woman arrow, (0, 1), carried to king landed on (1, 1): <strong>queen</strong>,{" "}
            {dist([1, 1], WORDS.queen).toFixed(2)} away, with crown {dist([1, 1], WORDS.crown).toFixed(2)} and prince{" "}
            {dist([1, 1], WORDS.prince).toFixed(2)} behind. Nothing was looked up: an analogy became arithmetic on positions.
          </p>
          <p>
            On the messier map the same move landed at (0.9, 1.1), {dist([0.9, 1.1], MESSY.queen).toFixed(2)} from queen but{" "}
            {dist([0.9, 1.1], MESSY.crown).toFixed(2)} from crown, so the nearest word was{" "}
            <strong>{nearest([0.9, 1.1], ["king", "man", "woman"], MESSY)}</strong>. Both maps were placed by hand; in real learned
            word vectors such analogies hold only roughly.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const arrow = plan ? { a: W[plan.arrow[0]], b: W[plan.arrow[1]] } : null;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 236" className="stage-svg" role="img" aria-label={near ? `Arrow lands nearest ${near}` : "Toy word map"}>
              <defs>
                <marker id="kqa-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--domain)" />
                </marker>
              </defs>
              <text x={160} y={12} textAnchor="middle" className={s.small} fill="var(--muted)">
                {messy ? "Messier toy map" : "Tidy toy map"}: positions placed by hand
              </text>
              {arrow && step !== "measured" && (
                <line x1={X(arrow.a[0])} y1={Y(arrow.a[1])} x2={X(arrow.b[0])} y2={Y(arrow.b[1])} stroke="var(--domain)" strokeWidth={2} strokeDasharray="4 3" opacity={0.6} />
              )}
              {plan && tip && (
                <line
                  x1={X(W[plan.from][0])}
                  y1={Y(W[plan.from][1])}
                  x2={X(tip[0])}
                  y2={Y(tip[1])}
                  stroke="var(--domain)"
                  strokeWidth={3.5}
                  markerEnd="url(#kqa-head)"
                />
              )}
              {Object.entries(W).map(([w, [x, y]]) => {
                const hit = w === near;
                return (
                  <g key={w}>
                    <circle cx={X(x)} cy={Y(y)} r={hit ? 8 : 6} fill={hit ? "var(--good)" : "var(--fg)"} />
                    <text
                      x={x < 0.5 ? X(x) - 11 : X(x) + 15}
                      y={Y(y) + 4}
                      textAnchor={x < 0.5 ? "end" : "start"}
                      className={s.label}
                      fill={hit ? "var(--good)" : "var(--fg)"}
                    >
                      {w}
                    </text>
                  </g>
                );
              })}
              {tip && step !== "measured" && <circle cx={X(tip[0])} cy={Y(tip[1])} r={13} fill="none" stroke="var(--domain)" strokeWidth={2} />}
            </svg>
            <Row>
              <Control disabled={locked || step === "measured"} onClick={() => go("measured")}>
                Measure man → woman
              </Control>
              <Control disabled={locked || step === "king"} onClick={() => go("king")}>
                Carry it to king
              </Control>
              <Control disabled={locked || step === "woman"} onClick={() => go("woman")}>
                Carry man → king to woman
              </Control>
              <Control disabled={locked} onClick={toggleMap}>
                {messy ? "Back to the tidy map" : "Try a messier map"}
              </Control>
            </Row>
            <Row>
              <Readout label="Arrow" value={plan ? `(${sub(W[plan.arrow[1]], W[plan.arrow[0]]).join(", ")})` : "–"} />
              <Readout label="Lands nearest" value={near && tip ? `${near}, ${dist(tip, W[near]).toFixed(2)} away` : "–"} />
            </Row>
            <Row>
              <Readout
                label="Distance from where it lands"
                value={tip && step !== "measured" ? cand.map((w) => `${w} ${dist(tip, W[w]).toFixed(2)}`).join(" · ") : "–"}
              />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
