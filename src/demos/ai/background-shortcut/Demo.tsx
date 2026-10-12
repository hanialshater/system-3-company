"use client";

// Shortcut learning. 20 training photos of cows and camels: the background (grass or sand)
// matches the label on 19 (95%); the shape clue (hump = camel) is right on 16 (80%).
// The model keeps whichever single clue scores best on training: background. On 20 test
// photos with backgrounds shuffled (10 match), it scores 50%; shape still scores 80%.
// The reveal waits until the learner has seen the model's own clue on the shuffled photos.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
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

export default function BackgroundShortcut({ slug }: { slug: string }) {
  const [clue, setClue] = useState<Clue>(LEARNED);
  const [test, setTest] = useState(false);
  const set = test ? TEST : TRAIN;
  const acc = accuracy(set, clue);

  const update = (nextClue: Clue, nextTest: boolean, interact: () => void) => {
    setClue(nextClue);
    setTest(nextTest);
    if (nextTest && nextClue === LEARNED) interact(); // the reveal waits for the learned clue on shuffled photos
  };

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (!test) return clue === "background" ? "Training photos: grass means cow, almost always." : "Training photos, judged by the hump.";
    return "Backgrounds shuffled: same animals, new places.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Photos are labelled cow or camel. In training, the background (grass or sand) matches the label 95% of the time; the shape clue is right 80%. A model that picks the more reliable clue is tested on photos with backgrounds shuffled. Its accuracy is about:",
        options: ["95%", "80%", "50%"],
        answer: 2,
      }}
      exploreHint="Test the model on shuffled photos. Then switch its clue to shape."
      reveal={() => (
        <>
          <p>
            The model kept the background clue: right on {Math.round(20 * accuracy(TRAIN, "background"))} of 20 training
            photos ({pct(accuracy(TRAIN, "background"))}), against {pct(accuracy(TRAIN, "shape"))} for shape. With
            backgrounds shuffled it got <strong>{Math.round(20 * accuracy(TEST, "background"))} of 20: {pct(accuracy(TEST, "background"))}</strong>,
            a coin flip, because grass no longer meant cow. Shape held {pct(accuracy(TEST, "shape"))} on both sets.
          </p>
          <p>
            A model takes the cheapest clue that works on its training data. A high score proves the clue worked there,
            not that it is the clue you meant, and test photos from the same source share the shortcut.
          </p>
          <p className="muted">
            This toy uses one clue at a time. Real image models have been caught using backgrounds in the same way.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 316 196" className="stage-svg" role="img" aria-label={`${test ? "Test" : "Training"} photos; the model is right on ${Math.round(acc * 20)} of 20`}>
            {set.map((p, i) => (
              <Tile
                key={i}
                p={p}
                x={(i % 5) * (TW + GAP)}
                y={Math.floor(i / 5) * (TH + GAP)}
                mark={locked ? null : guess(p, clue) === p.animal}
              />
            ))}
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Row>
            <Control className={test ? "active" : ""} aria-pressed={test} disabled={locked} onClick={() => update(clue, !test, interact)}>
              {test ? "Back to training photos" : "Shuffle backgrounds"}
            </Control>
            <Readout label={test ? "Shuffled" : "Training"} value={locked ? "?" : pct(acc)} />
          </Row>
          <Row>
            <span className={s.small}>Model&apos;s clue:</span>
            {(["background", "shape"] as const).map((c) => (
              <Control
                key={c}
                className={clue === c ? "active" : ""}
                aria-pressed={clue === c}
                disabled={locked || clue === c}
                onClick={() => update(c, test, interact)}
              >
                {c === "background" ? "Background" : "Shape"}
              </Control>
            ))}
          </Row>
        </div>
      )}
    </Lesson>
  );
}
