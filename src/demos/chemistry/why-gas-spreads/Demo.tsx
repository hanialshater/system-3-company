"use client";

// A box with an open divider. Each button takes 1,000 snapshots of N molecules, each molecule
// independently on the left or right half (seeded), draws the last snapshot and tallies how many
// snapshots had every molecule on the left. With 4 that happens often; with 20, never.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SIZES = [4, 10, 20] as const;
const ASK = 20;
const SNAPS = 1000;
const SEED = 20; // untuned: the stream for all snapshots
const ODDS = 2 ** ASK; // 1,048,576

const W = 320;
const H = 130;
const BX = 10;
const BW = 300;
const BY = 18;
const BH = 100;

type Tally = Record<number, { all: number; snaps: number }>;
type Mol = { left: boolean; u: number; v: number };

export default function WhyGasSpreads({ slug }: { slug: string }) {
  const rng = useRef(mulberry32(SEED));
  const [tally, setTally] = useState<Tally>({});
  const [last, setLast] = useState<Mol[]>([]);
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["small", "twenty"]);

  const snap = (n: number) => {
    const r = rng.current;
    let all = 0;
    let shot: Mol[] = [];
    for (let k = 0; k < SNAPS; k++) {
      shot = Array.from({ length: n }, () => ({ left: r() < 0.5, u: r(), v: r() }));
      if (shot.every((m) => m.left)) all++;
    }
    setLast(shot);
    setTally((t) => ({ ...t, [n]: { all: (t[n]?.all ?? 0) + all, snaps: (t[n]?.snaps ?? 0) + SNAPS } }));
    reach(n === ASK ? "twenty" : "small");
  };

  const leftNow = last.filter((m) => m.left).length;
  const t20 = tally[ASK];
  const t4 = tally[SIZES[0]];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${ASK} molecules bounce randomly in a box with an open divider. At one instant, the chance that all ${ASK} are on the left half is about…`,
        options: ["1 in 40", "1 in 1,000", "1 in a million"],
        answer: 2,
      }}
      exploreHint="Snapshot a small crowd, then 20. Count the all-left snapshots."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {t20 ? `In your ${t20.snaps.toLocaleString("en-US")} snapshots of ${ASK}, all-left showed up ${t20.all} times` : `Snapshot ${ASK} molecules and all-left never shows up`}
            {t4 ? `; with ${SIZES[0]} molecules it was ${t4.all} in ${t4.snaps.toLocaleString("en-US")}` : ""}. Each molecule
            is on the left half by chance, 1 time in 2, so all {ASK} at once is ½ × ½ × … {ASK} times: 1 in{" "}
            <strong>{ODDS.toLocaleString("en-US")}</strong>, about one in a million.
          </p>
          <p>
            No force pushes the gas apart. There are simply vastly more ways to be spread out than to be bunched up, so
            spread out is what you see. A real sample of gas holds about 10²³ molecules or more, and the chance of all of them
            on one side is ½ to that power: it never happens.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={last.length ? `Last snapshot: ${leftNow} of ${last.length} on the left` : "Empty box"}>
              <rect x={BX} y={BY} width={BW / 2} height={BH} className={s.leftHalf} />
              <rect x={BX} y={BY} width={BW} height={BH} className={s.box} />
              <line x1={BX + BW / 2} x2={BX + BW / 2} y1={BY} y2={BY + BH * 0.3} className={s.divider} />
              <line x1={BX + BW / 2} x2={BX + BW / 2} y1={BY + BH * 0.7} y2={BY + BH} className={s.divider} />
              {last.map((m, i) => (
                <circle
                  key={i}
                  cx={BX + 8 + (m.left ? 0 : BW / 2) + m.u * (BW / 2 - 16)}
                  cy={BY + 8 + m.v * (BH - 16)}
                  r={5}
                  className={s.mol}
                />
              ))}
              <text x={BX} y={12} className={s.small}>
                {last.length ? `last snapshot: ${leftNow} of ${last.length} on the left` : "left half shaded"}
              </text>
            </svg>
            <Row>
              {SIZES.map((n) => (
                <Control key={n} onClick={() => snap(n)} disabled={locked}>
                  {SNAPS.toLocaleString("en-US")} snaps of {n}
                </Control>
              ))}
            </Row>
            <Row>
              {SIZES.map((n) => (
                <Readout key={n} label={`${n}: all left`} value={tally[n] ? `${tally[n].all} / ${tally[n].snaps.toLocaleString("en-US")}` : "–"} />
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
