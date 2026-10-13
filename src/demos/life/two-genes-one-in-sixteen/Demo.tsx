"use client";

// Two-gene cross (made-up plant). Both parents carry one dominant and one hidden (recessive) copy
// of a colour gene (purple over white) and a seed-shape gene (round over wrinkled). The genes are
// inherited independently, so each parent makes four equally likely sperm/egg types. The 4 x 4
// grid is every egg x pollen pairing, one equally likely seed per square. Deterministic.
// Each seed is drawn as one glyph: fill = flower colour it will grow, outline = seed shape.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// A gamete carries one copy of each gene: [purple?, round?]
const GAMETES: [boolean, boolean][] = [[true, true], [true, false], [false, true], [false, false]];
interface Seed { white: boolean; wrinkled: boolean }
const GRID: Seed[] = GAMETES.flatMap((egg) =>
  GAMETES.map((pollen) => ({ white: !egg[0] && !pollen[0], wrinkled: !egg[1] && !pollen[1] })),
);
type Mark = "none" | "white" | "wrinkled" | "both";
const TEST: Record<Mark, (x: Seed) => boolean> = {
  none: () => false,
  white: (x) => x.white,
  wrinkled: (x) => x.wrinkled,
  both: (x) => x.white && x.wrinkled,
};
const COUNT = {
  white: GRID.filter(TEST.white).length, // 4
  wrinkled: GRID.filter(TEST.wrinkled).length, // 4
  both: GRID.filter(TEST.both).length, // 1
};
const N = GRID.length; // 16
const MILESTONES = ["one-trait", "both"] as const;
const LABEL: Record<Exclude<Mark, "none">, string> = { white: "White flowers", wrinkled: "Wrinkled seeds", both: "White and wrinkled" };

const CELL = 44, OFF = 40;

function wrinkle(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 16 }, (_, k) => {
    const a = (k / 16) * 2 * Math.PI;
    const rr = k % 2 ? r * 0.72 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
}

function Glyph({ cx, cy, r, white, wrinkled }: { cx: number; cy: number; r: number; white: boolean; wrinkled: boolean }) {
  const cls = white ? s.white : s.purple;
  return wrinkled ? <path d={wrinkle(cx, cy, r)} className={cls} /> : <circle cx={cx} cy={cy} r={r * 0.9} className={cls} />;
}

function Stage({ locked, crossed, mark, onCross, onMark }: {
  locked: boolean; crossed: boolean; mark: Mark; onCross: () => void; onMark: (m: Exclude<Mark, "none">) => void;
}) {
  const msg = locked
    ? "Made-up plant. Both parents carry one hidden copy of each form; the genes are inherited separately."
    : !crossed
      ? "Rows: eggs. Columns: pollen. Cross them to fill the 16 equally likely seeds."
      : mark === "none"
        ? "Fill: flower colour the seed grows. Outline: seed shape."
        : `${LABEL[mark]}: ${COUNT[mark]} of ${N} seeds.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${OFF + 4 * CELL + 4} ${OFF + 4 * CELL + 4}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {GAMETES.map(([p, r], i) => (
          <g key={`h${i}`}>
            <Glyph cx={OFF + i * CELL + CELL / 2} cy={OFF / 2} r={9} white={!p} wrinkled={!r} />
            <Glyph cx={OFF / 2} cy={OFF + i * CELL + CELL / 2} r={9} white={!p} wrinkled={!r} />
          </g>
        ))}
        {GRID.map((x, k) => {
          const i = Math.floor(k / 4), j = k % 4;
          const X = OFF + j * CELL, Y = OFF + i * CELL;
          const hit = crossed && TEST[mark](x);
          return (
            <g key={k}>
              <rect x={X + 1} y={Y + 1} width={CELL - 2} height={CELL - 2} rx={4} className={hit ? s.hit : s.cell} />
              {crossed && <Glyph cx={X + CELL / 2} cy={Y + CELL / 2} r={15} white={x.white} wrinkled={x.wrinkled} />}
            </g>
          );
        })}
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lp} />purple</span>
        <span><i className={s.lw} />white</span>
        <span><i className={s.lr} />round</span>
        <span><i className={s.lk} />wrinkled</span>
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        <Control disabled={locked || crossed} onClick={onCross}>Cross them</Control>
        {(["white", "wrinkled", "both"] as const).map((m) => (
          <Control key={m} className={mark === m ? "active" : ""} disabled={locked || mark === m} onClick={() => onMark(m)}>
            {m === "both" ? "Mark both" : `Mark ${m}`}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function TwoGenesOneInSixteen({ slug }: { slug: string }) {
  const [crossed, setCrossed] = useState(false);
  const [mark, setMark] = useState<Mark>("none");
  const [seen, setSeen] = useState<Mark[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Made-up plant. White flowers and wrinkled seeds each show only with two hidden copies. Both parents carry one hidden copy of each. What share of their seeds is white AND wrinkled?",
        options: ["1 in 4", "1 in 8", `1 in ${N / COUNT.both}`],
        answer: 2,
      }}
      exploreHint="Cross them, mark one trait, then mark both."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const one = seen.filter((m) => m === "white" || m === "wrinkled");
        return (
          <>
            <p>
              {one.length ? `${one.map((m) => `${LABEL[m as "white"]}: ${COUNT[m as "white"]} of ${N}`).join("; ")}, 1 in 4. ` : ""}
              White and wrinkled together: <strong>{COUNT.both} of {N}</strong>, the one square where both parents passed both hidden copies.
            </p>
            <p>
              The genes are inherited separately, so a quarter of the white seeds are also wrinkled: 1/4 x 1/4 = 1/16. Independent chances
              multiply, so a mix of two rare forms is rarer than either. Genes that sit close together on a chromosome break this rule.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              crossed={crossed}
              mark={mark}
              onCross={() => setCrossed(true)}
              onMark={(m) => {
                setCrossed(true);
                setMark(m);
                setSeen((x) => (x.includes(m) ? x : [...x, m]));
                reach(m === "both" ? "both" : "one-trait");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
