"use client";

// Shortcut learning. 20 training photos of cows and camels: the background (grass or sand)
// matches the label on 19 (95%); the shape clue (hump = camel) is right on 16 (80%).
// The model keeps whichever single clue scores best on training: background. On 20 test
// photos with backgrounds shuffled (10 match), it scores 50%; shape still scores 80%.
// Four buttons run each clue on each set of photos; the reveal waits until all four have been run,
// because it quotes all four scores.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Animal = "cow" | "camel";
type Photo = { animal: Animal; grass: boolean; hump: boolean };
type Clue = "background" | "shape";

/** n photos of one animal: `onGrass` of them on grass, `humped` of them with a visible hump. */
function make(animal: Animal, n: number, onGrass: number, humped: number): Photo[] {
  return Array.from({ length: n }, (_, i) => ({ animal, grass: i < onGrass, hump: (i * 7) % n < humped }));
}
// Training: cows on grass 9 of 10, camels on sand 10 of 10; 2 cows show a hump, 2 camels hide theirs.
const TRAIN = interleave(make("cow", 10, 9, 2), make("camel", 10, 0, 8));
// Test: backgrounds shuffled, so half the cows are on sand and half the camels on grass.
const TEST = interleave(make("cow", 10, 5, 2), make("camel", 10, 5, 8));

function interleave(a: Photo[], b: Photo[]) {
  const out: Photo[] = [];
  const order = [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0]; // fixed shuffle of cows (0) and camels (1)
  let i = 0;
  let j = 0;
  for (const o of order) out.push(o === 0 ? a[i++] : b[j++]);
  return out;
}

const guess = (p: Photo, clue: Clue): Animal => (clue === "background" ? (p.grass ? "cow" : "camel") : p.hump ? "camel" : "cow");
const accuracy = (set: Photo[], clue: Clue) => set.filter((p) => guess(p, clue) === p.animal).length / set.length;
const LEARNED: Clue = accuracy(TRAIN, "background") >= accuracy(TRAIN, "shape") ? "background" : "shape";
// MODEL END

const TW = 60;
const TH = 46;
const GAP = 4;

function Tile({ p, x, y, mark }: { p: Photo; x: number; y: number; mark: boolean | null }) {
  const camel = p.animal === "camel";
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={TW} height={TH} rx={5} fill={p.grass ? "var(--good)" : "var(--warn)"} opacity={0.35} />
      <rect y={TH - 12} width={TW} height={12} rx={0} fill={p.grass ? "var(--good)" : "var(--warn)"} opacity={0.45} />
      <g fill="var(--fg)" stroke="var(--fg)">
        <ellipse cx={33} cy={25} rx={13} ry={6.5} stroke="none" />
        {p.hump && <ellipse cx={34} cy={19} rx={6} ry={5} stroke="none" />}
        {[23, 27, 39, 43].map((lx) => (
          <line key={lx} x1={lx} y1={29} x2={lx} y2={camel ? 41 : 38} strokeWidth={2} />
        ))}
        {camel ? (
          <>
            <path d="M22,24 L15,10" strokeWidth={3.5} fill="none" />
            <ellipse cx={12} cy={10} rx={5} ry={3} stroke="none" />
          </>
        ) : (
          <>
            <rect x={11} y={18} width={10} height={8} rx={2} stroke="none" />
            <path d="M13,18 L11,13 M19,18 L21,13" strokeWidth={1.5} fill="none" />
          </>
        )}
      </g>
      {mark !== null && (
        <g>
          <circle cx={TW - 9} cy={9} r={7} fill={mark ? "var(--good)" : "var(--bad)"} />
          <path
            d={mark ? `M${TW - 12},9 L${TW - 9.5},11.5 L${TW - 5.5},6` : `M${TW - 12},6 L${TW - 6},12 M${TW - 6},6 L${TW - 12},12`}
            stroke="#0d0f14"
            strokeWidth={1.8}
            fill="none"
          />
        </g>
      )}
    </g>
  );
}

const pct = (x: number) => `${Math.round(100 * x)}%`;

type Cell = { clue: Clue; test: boolean };
const CELLS: Cell[] = [
  { clue: "background", test: false },
  { clue: "background", test: true },
  { clue: "shape", test: false },
  { clue: "shape", test: true },
];
const key = (c: Cell) => `${c.clue}-${c.test ? "shuffled" : "training"}`;
const NAMES = CELLS.map(key);

export default function BackgroundShortcut({ slug }: { slug: string }) {
  const [view, setView] = useState<Cell | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const set = view?.test ? TEST : TRAIN;

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (!view) return "Run a clue on a set of photos. Ticks are right, crosses are wrong.";
    return `${view.clue === "background" ? "Background" : "Shape"} clue on ${view.test ? "photos with shuffled backgrounds" : "training photos"}: ${Math.round(20 * accuracy(set, view.clue))} of 20 right.`;
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You train a model to sort photos into cow or camel. In training, the background (grass or sand) matches the label 95% of the time; the shape clue is right 80%. It picks the more reliable clue, then meets photos with backgrounds shuffled. About what accuracy does it get?",
        options: ["95%", "80%", "50%"],
        answer: 2,
      }}
      exploreHint="Run each clue on each set of photos: four buttons."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            The toy model kept the background clue: right on {Math.round(20 * accuracy(TRAIN, "background"))} of 20
            training photos ({pct(accuracy(TRAIN, "background"))}), against {pct(accuracy(TRAIN, "shape"))} for shape.
            With backgrounds shuffled it got <strong>{Math.round(20 * accuracy(TEST, "background"))} of 20: {pct(accuracy(TEST, "background"))}</strong>,
            a coin flip, because grass no longer meant cow. Shape held {pct(accuracy(TEST, "shape"))} on both sets.
          </p>
          <p>
            Models tend to take an easy clue that works on their training data. A high score proves the clue worked
            there, not that it is the clue you meant, and test photos from the same source share the shortcut.
          </p>
          <p className="muted">
            This toy uses one clue at a time. Real image models have been caught using backgrounds in the same way.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox="0 0 316 196" className="stage-svg" role="img" aria-label={view ? `${view.test ? "Shuffled" : "Training"} photos; right on ${Math.round(accuracy(set, view.clue) * 20)} of 20` : "Training photos"}>
                {set.map((p, i) => (
                  <Tile
                    key={i}
                    p={p}
                    x={(i % 5) * (TW + GAP)}
                    y={Math.floor(i / 5) * (TH + GAP)}
                    mark={locked || !view ? null : guess(p, view.clue) === p.animal}
                  />
                ))}
              </svg>
              <p className={s.msg} aria-live="polite">
                {message(locked)}
              </p>
              <span className={s.small}>If the model used the clue below, on these photos:</span>
              {(["background", "shape"] as const).map((c) => (
                <Row key={c}>
                  {[false, true].map((test) => {
                    const cell = { clue: c, test };
                    const done = seen.includes(key(cell));
                    const on = view?.clue === c && view.test === test;
                    return (
                      <Control
                        key={String(test)}
                        className={on ? "active" : ""}
                        aria-pressed={on}
                        disabled={locked}
                        onClick={() => {
                          setView(cell);
                          setSeen((x) => (x.includes(key(cell)) ? x : [...x, key(cell)]));
                          reach(key(cell));
                        }}
                      >
                        {c === "background" ? "Background" : "Shape"}, {test ? "shuffled" : "training"}
                        {done ? `: ${pct(accuracy(test ? TEST : TRAIN, c))}` : ""}
                      </Control>
                    );
                  })}
                </Row>
              ))}
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
