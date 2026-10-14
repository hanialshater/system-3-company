"use client";

// The giant appears. 200 people, random friendships added in place (G(n,m), seed 1). The chips
// show the same world after 50, 100, 125, 150, 200 and 300 links; the biggest connected group is
// gold and its share printed; the second biggest is green so merging is visible. Graph is texture (design-lead rulings 2026-10-14 §2.6): dots
// r >= 3, 1 px edges, no names, no taps. The learner reads the readout.
// Key state: the learner has seen 1.5 and 2 friends each (the jump), not only the start.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CHIPS, LINKS, N, POS, biggest, linksFor } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["one-and-a-half", "two"] as const;
const START = 1;
const pct = (size: number) => `${Math.round((size / N) * 100)}%`;
const fmt = (f: number) => f.toFixed(Math.round(f * 100) % 10 === 0 ? 1 : 2);

function Stage({ locked, interact, chip, setChip }: { locked: boolean; interact: () => void; chip: number; setChip: (c: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const m = linksFor(chip);
  const { size, inGiant, secondSize, inSecond } = biggest(m);

  const choose = (c: number) => {
    setChip(c);
    if (c === 1.5) reach("one-and-a-half");
    if (c === 2) reach("two");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 170" className={`stage-svg ${s.svg}`} role="img" aria-label={`${m} random friendships among ${N} people. Biggest group: ${size} people, ${pct(size)}. Second biggest: ${secondSize}.`}>
        {LINKS.slice(0, m).map(([a, b], i) => (
          <line key={i} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} className={inGiant[a] ? s.edgeBig : inSecond[a] ? s.edgeSecond : s.edge} />
        ))}
        {POS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={inGiant[i] ? 4.5 : inSecond[i] ? 3.8 : 3} className={inGiant[i] ? s.dotBig : inSecond[i] ? s.dotSecond : s.dot} />
        ))}
      </svg>
      <p className={s.legend}>Gold: biggest group · Green: second biggest</p>
      <Row>
        <Readout label="Friends each" value={fmt(chip)} />
        <Readout label="Biggest group" value={`${size} (${pct(size)})`} />
        <Readout label="Second" value={`${secondSize}`} />
      </Row>
      <div className={`row ${s.chips}`} role="group" aria-label="Average friends each">
        {CHIPS.map((c) => (
          <Control key={c} disabled={locked} className={c === chip ? "active" : ""} aria-pressed={c === chip} onClick={() => choose(c)}>
            {fmt(c)}
          </Control>
        ))}
      </div>
    </div>
  );
}

export default function TheGiantAppears({ slug }: { slug: string }) {
  const [chip, setChip] = useState<number>(START);
  const [seen, setSeen] = useState<Record<string, number>>({});
  const pick = (c: number) => {
    setChip(c);
    setSeen((o) => ({ ...o, [fmt(c)]: biggest(linksFor(c)).size }));
  };
  const keys = Object.keys(seen).sort((a, b) => Number(a) - Number(b));
  const one = biggest(linksFor(1)).size;
  const two = biggest(linksFor(2)).size;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${N} people, with 100 random friendships (one friend each, on average). The biggest connected group is ${one} people (${pct(one)}). Add 100 more random friendships. The biggest group is now about:`,
        options: ["about 36% of people", "about 55% of people", "about 75% of people"],
        answer: 2,
      }}
      exploreHint="Press the friend counts in order, from 0.5 up. Watch the green group."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Doubling the links took the biggest group from <strong>{one} people ({pct(one)})</strong> to{" "}
            <strong>{two} ({pct(two)})</strong>. You saw (friends each: biggest group) {keys.map((k) => `${k}: ${seen[k]}`).join("; ")}.
          </p>
          <p>
            Early on, a new link joins two small groups. Once groups are big, a new link merges both, so the gold giant
            swallows the green group and the rest. The jump comes near one friend each.
          </p>
          <p className="muted">A model of random links in one made-up crowd, not a measurement of any real network.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} chip={chip} setChip={pick} />}
    </Lesson>
  );
}
