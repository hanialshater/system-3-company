"use client";

// Sieve crossing out. The numbers 1 to 100 on a 10 x 10 grid. Each prime button crosses out its
// multiples (2p, 3p ...), leaving the prime itself, and the caption says how many were new. 11 is
// there to show that it crosses out nothing new once 2, 3, 5 and 7 are done. Survivors (2 to 100,
// not crossed) are counted from the same struck set the grid draws.
// Key state: 2, 3, 5 and 7 swept (25 left), then 11 tried and found idle.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 100;
const SMALL = [2, 3, 5, 7];
const EXTRA = 11;
const BUTTONS = [...SMALL, EXTRA];
const MILESTONES = ["four-sweeps", "eleven-idle"] as const;

const multiples = (p: number) => {
  const out: number[] = [];
  for (let m = 2 * p; m <= N; m += p) out.push(m);
  return out;
};
/** Who crossed each number out first. */
type Struck = Record<number, number>;
const survivors = (st: Struck) => {
  let c = 0;
  for (let k = 2; k <= N; k++) if (!st[k]) c++;
  return c;
};
const sweep = (st: Struck, p: number) => {
  const next = { ...st };
  let fresh = 0;
  for (const m of multiples(p)) if (!next[m]) {
    next[m] = p;
    fresh++;
  }
  return { next, fresh };
};
const FINAL_LEFT = survivors(SMALL.reduce((st, p) => sweep(st, p).next, {} as Struck));

export default function Sieve({ slug }: { slug: string }) {
  const [struck, setStruck] = useState<Struck>({});
  const [swept, setSwept] = useState<number[]>([]);
  const [last, setLast] = useState<{ p: number; fresh: number } | null>(null);
  const [idle11, setIdle11] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Hunting for every prime up to ${N} on a number chart, you cross out multiples. Which primes must you cross out the multiples of?`,
        options: [SMALL.join(", "), "All primes up to 50", [...SMALL, 11, 13].join(", ")],
        answer: 0,
      }}
      exploreHint={`Cross out the multiples of ${SMALL.join(", ")}, then try ${EXTRA}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>Just {SMALL.join(", ")}.</strong> After those four sweeps {FINAL_LEFT} numbers were left, and they are exactly
            the primes up to {N}.{idle11 ? ` Your sweep of ${EXTRA} crossed out nothing new.` : ""}
          </p>
          <p>
            A number that is not prime splits as a × b, and the smaller part is at most its square root. Up to {N}, that is at
            most 10, so every non-prime has a factor of {SMALL.join(", ")} and is already gone.
          </p>
          <p>
            {EXTRA}&apos;s first new multiple would be {EXTRA} × {EXTRA} = {EXTRA * EXTRA}, past {N}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const press = (p: number) => {
              const { next, fresh } = sweep(struck, p);
              const sw = [...swept, p];
              setStruck(next);
              setSwept(sw);
              setLast({ p, fresh });
              const allSmall = SMALL.every((q) => sw.includes(q));
              if (allSmall) reach("four-sweeps");
              if (p === EXTRA && SMALL.every((q) => swept.includes(q)) && fresh === 0) {
                setIdle11(true);
                reach("eleven-idle");
              }
            };
            const reset = () => {
              setStruck({});
              setSwept([]);
              setLast(null);
            };
            return <Stage locked={locked} struck={struck} swept={swept} last={last} onPress={press} onReset={reset} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

const C = 30;
const PAD = 2;

function Stage({
  locked,
  struck,
  swept,
  last,
  onPress,
  onReset,
}: {
  locked: boolean;
  struck: Struck;
  swept: number[];
  last: { p: number; fresh: number } | null;
  onPress: (p: number) => void;
  onReset: () => void;
}) {
  const left = survivors(struck);
  const ringed = last ? new Set(multiples(last.p)) : new Set<number>();
  let caption = "Make a prediction to start.";
  if (!locked && !last) caption = "Tap a prime to cross out its multiples.";
  if (last)
    caption =
      last.fresh > 0
        ? `Multiples of ${last.p}: ${last.fresh} newly crossed out.`
        : `Multiples of ${last.p}: nothing new. Every one was already crossed out.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${10 * C + 2 * PAD} ${10 * C + 2 * PAD}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${left} numbers left`}>
        {Array.from({ length: N }, (_, i) => {
          const k = i + 1;
          const x = PAD + (i % 10) * C;
          const y = PAD + Math.floor(i / 10) * C;
          const by = struck[k];
          const isSweeper = swept.includes(k);
          const cls = k === 1 ? s.one : by ? s.struck : isSweeper ? s.sweeper : s.alive;
          return (
            <g key={k}>
              <rect x={x + 1} y={y + 1} width={C - 2} height={C - 2} rx={4} className={cls} data-by={by ?? 0} />
              <text x={x + C / 2} y={y + C / 2} className={by ? s.numOff : s.num}>
                {k}
              </text>
              {by && <line x1={x + 5} y1={y + C - 5} x2={x + C - 5} y2={y + 5} className={s.slash} />}
              {ringed.has(k) && <rect x={x + 2.5} y={y + 2.5} width={C - 5} height={C - 5} rx={3} className={s.ring} />}
            </g>
          );
        })}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        {BUTTONS.map((p) => (
          <Control
            key={p}
            disabled={locked || swept.includes(p)}
            className={swept.includes(p) ? "active" : ""}
            aria-pressed={swept.includes(p)}
            aria-label={`Cross out multiples of ${p}`}
            onClick={() => onPress(p)}
          >
            {p}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Left (not 1)" value={locked ? "?" : left} />
        <Control disabled={locked || swept.length === 0} onClick={onReset}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
