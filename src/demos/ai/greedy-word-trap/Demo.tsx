"use client";

// Greedy decoding toy. After "The": cat 60%, dog 40%. After "The cat": sat 40%, ran 35%, ate 25%.
// After "The dog": barked 90%, sat 10%. A two-word sentence's chance is the product along its path.
// Greedy takes cat (60%) then sat (40%): 0.24. Best whole sentence: dog barked, 0.4 x 0.9 = 0.36.
// Odds are invented. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Branch = { word: string; p: number; next: { word: string; p: number }[] };
const TREE: Branch[] = [
  {
    word: "cat",
    p: 0.6,
    next: [
      { word: "sat", p: 0.4 },
      { word: "ran", p: 0.35 },
      { word: "ate", p: 0.25 },
    ],
  },
  {
    word: "dog",
    p: 0.4,
    next: [
      { word: "barked", p: 0.9 },
      { word: "sat", p: 0.1 },
    ],
  },
];
const best = <T extends { p: number }>(xs: T[]) => xs.reduce((a, b) => (b.p > a.p ? b : a));
const GREEDY_FIRST = best(TREE);
const GREEDY_SECOND = best(GREEDY_FIRST.next);
const GREEDY_P = GREEDY_FIRST.p * GREEDY_SECOND.p; // 0.24
const OTHER = TREE.find((b) => b !== GREEDY_FIRST)!;
const OTHER_BEST = best(OTHER.next);
const OTHER_P = OTHER.p * OTHER_BEST.p; // 0.36
const MAX_NEXT = Math.max(...TREE.map((f) => f.next.length));
// MODEL END

const pc = (v: number) => `${Math.round(v * 100)}%`;
type Path = [number?, number?];

export default function GreedyWordTrap({ slug }: { slug: string }) {
  const [path, setPath] = useState<Path>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [a, b] = path;
  const first = a !== undefined ? TREE[a] : null;
  const second = first && b !== undefined ? first.next[b] : null;
  const product = first ? first.p * (second ? second.p : 1) : 1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `After "The": ${GREEDY_FIRST.word} ${pc(GREEDY_FIRST.p)}, ${OTHER.word} ${pc(OTHER.p)}. After "${GREEDY_FIRST.word}" the best next word has ${pc(GREEDY_SECOND.p)}. After "${OTHER.word}" the best has ${pc(OTHER_BEST.p)}. Which two-word ending is most likely?`,
        options: [`${GREEDY_FIRST.word} + its best word (greedy's pick)`, `${OTHER.word} + its best word`, "They tie"],
        answer: 1,
      }}
      exploreHint="Tap words to walk the tree. Compare greedy's sentence with the others."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Greedy took {GREEDY_FIRST.word} ({pc(GREEDY_FIRST.p)}), then {GREEDY_SECOND.word} ({pc(GREEDY_SECOND.p)}): {GREEDY_FIRST.p} ×{" "}
            {GREEDY_SECOND.p} = {pc(GREEDY_P)}. You walked {OTHER.word} then {OTHER_BEST.word}: {OTHER.p} × {OTHER_BEST.p} ={" "}
            {pc(OTHER_P)}.
          </p>
          <p>
            A sentence&apos;s chance is the product along its path. Greedy&apos;s first word looked best but led to weaker next words;
            the less likely first word led to a near-certain one.
          </p>
          <p>
            The most likely word at each step need not make the most likely sentence. Some real systems use beam search, keeping
            several partial sentences, to get closer to the best whole one.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["greedy-leaf", "other-best"]}>
          {(reach) => {
            const go = (p: Path) => {
              setPath(p);
              if (p[0] !== undefined && p[1] !== undefined) {
                const f = TREE[p[0]];
                const w = f.next[p[1]];
                setVisited((v) => [...v, `${p[0]}-${p[1]}`]);
                if (f === GREEDY_FIRST && w === GREEDY_SECOND) reach("greedy-leaf");
                if (f === OTHER && w === OTHER_BEST) reach("other-best");
              }
            };
            const gi = TREE.indexOf(GREEDY_FIRST);
            const gj = GREEDY_FIRST.next.indexOf(GREEDY_SECOND);
            // layout: root at left, first words in the middle, leaves at right
            const leaves = TREE.flatMap((f, i) => f.next.map((w, j) => ({ i, j, f, w })));
            const leafY = (k: number) => 18 + k * 30;
            const firstY = (i: number) => {
              const ks = leaves.map((l, k) => (l.i === i ? k : -1)).filter((k) => k >= 0);
              return (leafY(ks[0]) + leafY(ks[ks.length - 1])) / 2;
            };
            const rootY = (firstY(0) + firstY(1)) / 2;
            const onPath = (i: number, j?: number) => a === i && (j === undefined || b === j);
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented word odds</span>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={first ? `The ${first.word} ${second?.word ?? ""}` : "Word tree"}>
                  {TREE.map((f, i) => (
                    <g key={f.word}>
                      <line x1={44} y1={rootY} x2={110} y2={firstY(i)} stroke={!locked && onPath(i) ? "var(--domain)" : "var(--line)"} strokeWidth={!locked && onPath(i) ? 3 : 1.5} />
                      <text x={77} y={(rootY + firstY(i)) / 2 - 4} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                        {pc(f.p)}
                      </text>
                    </g>
                  ))}
                  {leaves.map(({ i, j, f, w }, k) => {
                    const hot = !locked && onPath(i, j) && b !== undefined;
                    const seen = !locked && visited.includes(`${i}-${j}`);
                    return (
                      <g key={`${i}-${j}`}>
                        <line x1={150} y1={firstY(i)} x2={200} y2={leafY(k)} stroke={hot ? "var(--domain)" : "var(--line)"} strokeWidth={hot ? 3 : 1.5} />
                        <text x={182} y={leafY(k) - 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                          {pc(w.p)}
                        </text>
                        <text x={206} y={leafY(k) + 4} className={s.small} fill="var(--fg)">
                          {w.word}
                        </text>
                        {seen && (
                          <text x={312} y={leafY(k) + 4} textAnchor="end" className={s.small} fill={f === OTHER && w === OTHER_BEST ? "var(--good)" : "var(--fg)"}>
                            = {pc(f.p * w.p)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={8} y={rootY + 4} className={s.label} fill="var(--fg)">
                    The
                  </text>
                  {TREE.map((f, i) => (
                    <text key={f.word} x={114} y={firstY(i) + 4} className={`${s.label} ${!locked && onPath(i) ? s.domText : s.fgText}`}>
                      {f.word}
                    </text>
                  ))}
                </svg>
                <Row>
                  <Control disabled={locked || (a === gi && b === gj)} onClick={() => go([gi, gj])}>
                    Greedy path
                  </Control>
                  {TREE.map((f, i) => (
                    <Control key={f.word} className={a === i ? "active" : ""} disabled={locked || (a === i && b === undefined)} onClick={() => go([i])}>
                      {f.word}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {/* a fixed number of slots, so the set of controls never changes size */}
                  {Array.from({ length: MAX_NEXT }, (_, j) => {
                    const w = first?.next[j];
                    return (
                      <Control
                        key={j}
                        className={w && b === j ? "active" : ""}
                        disabled={locked || !w || b === j}
                        onClick={() => go([a, j])}
                      >
                        {w ? `then ${w.word}` : "then …"}
                      </Control>
                    );
                  })}
                </Row>
                <Row>
                  <Readout label="Sentence" value={locked || !first ? "–" : `The ${first.word}${second ? ` ${second.word}` : " …"}`} />
                  <Readout label="Chance (product)" value={locked || !first ? "–" : pc(product)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
