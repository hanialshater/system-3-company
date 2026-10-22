"use client";

// Not every circle is red. Four circles start red; a tap toggles one to blue (hatched, "B").
// Four sentence rows carry live ✓/✗ marks; a row whose truth matches row 1 ("Not every circle is red")
// in the current state carries "=".
// Two kept columns record the states the milestones fired in (the first state with a blue circle,
// always exactly one blue because each tap toggles one circle, and all four blue), so Reset cannot
// erase what the reveal quotes: both states stay on the stage beside the reveal.
// Brief: company/domains/briefs/math.discrete.md, Wave J, brief 2 (check D2).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const MILESTONES = ["one-blue", "all-blue"] as const;
type Colours = boolean[]; // true = blue

const SENTENCES: { text: string; holds: (c: Colours) => boolean }[] = [
  { text: "Not every circle is red", holds: (c) => !c.every((b) => !b) },
  { text: "No circle is red", holds: (c) => c.every((b) => b) },
  { text: "Some circle is not red", holds: (c) => c.some((b) => b) },
  { text: "Some circle is red", holds: (c) => c.some((b) => !b) },
];

const ALL_RED: Colours = [false, false, false, false];

type Kept = { oneBlue: Colours | null; allBlue: Colours | null };

export default function NotEveryCircleIsRed({ slug }: { slug: string }) {
  const [colours, setColours] = useState<Colours>(ALL_RED);
  const kept = useRef<Kept>({ oneBlue: null, allBlue: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You have four circles, each painted red or blue. A friend looks at them and says: “Not every circle is red.” Which sentence means exactly the same, whatever the colours?",
        options: ["No circle is red", "Some circle is not red", "Some circle is red"],
        answer: 1,
      }}
      exploreHint="Tap the circles to paint them blue and watch the four sentences."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With one circle blue, &lsquo;Not every circle is red&rsquo; turned true while &lsquo;No circle is
            red&rsquo; stayed false, so they do not mean the same. &lsquo;Some circle is not red&rsquo; matched it in
            every state you made.
          </p>
          <p>
            One exception is enough to deny &lsquo;every&rsquo;. The opposite of &lsquo;all are&rsquo; is &lsquo;at
            least one is not&rsquo;, and the opposite of &lsquo;none are&rsquo; is &lsquo;at least one is&rsquo;.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} colours={colours} setColours={setColours} kept={kept.current} />}
    </Lesson>
  );
}

function Dots({ c, label }: { c: Colours | null; label: string }) {
  if (!c) return <span className={s.dotsEmpty} aria-label="not reached yet" />;
  return (
    <svg className={s.dots} width={46} height={12} role="img" aria-label={label}>
      {c.map((blue, i) => (
        <circle
          key={i}
          cx={6 + i * 11.3}
          cy={6}
          r={5}
          fill={blue ? "url(#necr-hatch)" : "var(--bad)"}
          stroke={blue ? "var(--accent)" : "var(--bad)"}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

const describe = (c: Colours) => {
  const n = c.filter(Boolean).length;
  return n === 0 ? "all red" : n === 4 ? "all blue" : `${n} blue, ${4 - n} red`;
};

function Mark({ v }: { v: boolean | null }) {
  if (v === null) return <span className={s.mark} aria-label="not reached yet" />;
  return (
    <span className={`${s.mark} ${v ? s.yes : s.no}`} aria-label={v ? "true" : "false"}>
      {v ? "✓" : "✗"}
    </span>
  );
}

function Stage({
  locked,
  interact,
  colours,
  setColours,
  kept,
}: StageContext & { colours: Colours; setColours: (c: Colours) => void; kept: Kept }) {
  const { reach } = useMilestones(interact, MILESTONES);

  const toggle = (i: number) => {
    const next = colours.map((b, j) => (j === i ? !b : b));
    setColours(next);
    const n = next.filter(Boolean).length;
    if (n > 0 && n < 4 && !kept.oneBlue) {
      kept.oneBlue = next;
      reach("one-blue");
    }
    if (n === 4 && !kept.allBlue) {
      kept.allBlue = next;
      reach("all-blue");
    }
  };

  const first = SENTENCES[0].holds(colours);

  return (
    <div className={s.wrap}>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <pattern id="necr-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="4" height="4" fill="var(--bg-2)" />
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--accent)" strokeWidth="2.2" />
          </pattern>
        </defs>
      </svg>
      <div className={s.circles}>
        {colours.map((blue, i) => (
          <Control
            key={i}
            disabled={locked}
            className={s.circleBtn}
            aria-pressed={blue}
            aria-label={`Circle ${i + 1}: ${blue ? "blue" : "red"}`}
            onClick={() => toggle(i)}
          >
            <svg width={56} height={56} className={s.circleSvg} aria-hidden>
              <circle
                cx={28}
                cy={28}
                r={25}
                fill={blue ? "url(#necr-hatch)" : "var(--bad)"}
                stroke={blue ? "var(--accent)" : "var(--bad)"}
                strokeWidth={2}
              />
              <rect x={19} y={18} width={18} height={20} rx={4} fill="var(--bg)" opacity={0.9} />
              <text x={28} y={33} textAnchor="middle" className={s.circleLabel}>
                {blue ? "B" : "R"}
              </text>
            </svg>
          </Control>
        ))}
      </div>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col" className={s.sentenceHead} />
            <th scope="col" className={s.nowHead} aria-label={`now: ${describe(colours)}`} />
            <th scope="col" className={s.matchHead} />
            <th scope="col" className={s.keptHead}>
              <Dots c={kept.oneBlue} label={kept.oneBlue ? `kept: ${describe(kept.oneBlue)}` : ""} />
            </th>
            <th scope="col" className={s.keptHead}>
              <Dots c={kept.allBlue} label={kept.allBlue ? `kept: ${describe(kept.allBlue)}` : ""} />
            </th>
          </tr>
        </thead>
        <tbody>
          {SENTENCES.map((row, r) => {
            const v = row.holds(colours);
            const match = r > 0 && v === first;
            return (
              <tr key={row.text} className={r === 0 ? s.firstRow : ""}>
                <th scope="row" className={s.sentence}>
                  {row.text}
                </th>
                <td>
                  <Mark v={v} />
                </td>
                <td className={s.match} aria-label={match ? "matches the first row now" : undefined}>
                  {match ? "=" : ""}
                </td>
                <td className={s.kept}>
                  <Mark v={kept.oneBlue ? row.holds(kept.oneBlue) : null} />
                </td>
                <td className={s.kept}>
                  <Mark v={kept.allBlue ? row.holds(kept.allBlue) : null} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Row>
        <Control
          disabled={locked || colours.every((b) => !b)}
          className={s.tap}
          onClick={() => setColours(ALL_RED)}
        >
          Reset
        </Control>
      </Row>
    </div>
  );
}
