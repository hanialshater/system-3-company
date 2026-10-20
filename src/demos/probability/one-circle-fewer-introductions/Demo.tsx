"use client";

// Correlated tries. Five friends, each 10% a week (five fixed readouts that never change). Chips set
// the share of weeks the friends' one circle meets (100, 50, 25, 10%); a strip of 20 weeks fills the
// meeting weeks, and one bar shows the chance you are introduced in a week, q(1 - (1 - 0.1/q)^5).
// After the first chip press a tick marks the 41% of five separate circles; every share visited
// leaves a mark on the bar, so the reveal's 34% and 10% stay on stage. Key state: 50% and 10% visited.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import { FRIENDS, P, SHARES, WEEKS, inMeetingWeek, oneCircle, separate } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["half", "tenth"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const BX = 20;
const BWID = 300;
const bx = (p: number) => BX + p * BWID;
const SEP = separate();

function Stage({ locked, reach, q, setQ, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  q: number;
  setQ: (v: number) => void;
  seen: number[];
  setSeen: (v: number[]) => void;
}) {
  const meet = oneCircle(q);
  const meetWeeks = Math.round(q * WEEKS);
  const moved = seen.length > 0;
  const pick = (v: number) => {
    setQ(v);
    if (!seen.includes(v)) setSeen([...seen, v]);
    if (v === 0.5) reach("half");
    if (v === 0.1) reach("tenth");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Pick how often the circle meets."}</p>
      <svg viewBox="0 0 340 158" className={`stage-svg ${s.svg}`} role="img" aria-label={`circle meets in ${pct(q)} of weeks; chance you meet ${pct(meet)}`}>
        <text x={BX} y={11} className={s.label}>Each friend alone: {pct(P)} a week</text>
        {Array.from({ length: FRIENDS }, (_, i) => (
          <g key={i}>
            <circle cx={50 + i * 60} cy={32} r={15} className={s.friend} />
            <text x={50 + i * 60} y={36} textAnchor="middle" className={s.friendText}>{pct(P)}</text>
          </g>
        ))}
        <text x={BX} y={63} className={s.label}>
          Weeks the circle meets: {meetWeeks} of {WEEKS} · then {pct(inMeetingWeek(q))} each
        </text>
        {Array.from({ length: WEEKS }, (_, i) => (
          <rect key={i} x={BX + i * 15} y={69} width={13} height={13} rx={2} className={i < meetWeeks ? s.weekOn : s.weekOff} />
        ))}
        <text x={BX} y={100} className={s.label}>Chance you are introduced this week</text>
        <rect x={BX} y={116} width={BWID} height={18} rx={3} className={s.track} />
        {!locked && <rect x={BX} y={116} width={meet * BWID} height={18} rx={3} className={s.fill} />}
        {!locked &&
          seen.filter((v) => v !== q).map((v) => (
            <g key={v}>
              <line x1={bx(oneCircle(v))} y1={114} x2={bx(oneCircle(v))} y2={136} className={s.mark} />
              <text x={bx(oneCircle(v))} y={111} textAnchor="middle" className={s.markText}>{pct(oneCircle(v))}</text>
            </g>
          ))}
        {!locked && (
          <text x={bx(meet)} y={111} textAnchor="middle" className={s.now}>{pct(meet)}</text>
        )}
        {moved && (
          <g>
            <line x1={bx(SEP)} y1={114} x2={bx(SEP)} y2={142} className={s.sep} />
            <text x={bx(SEP)} y={153} textAnchor="middle" className={s.sepText}>{pct(SEP)}: 5 separate circles</text>
          </g>
        )}
        <text x={BX} y={153} className={s.tick}>0%</text>
        <text x={BX + BWID} y={153} textAnchor="end" className={s.tick}>100%</text>
      </svg>
      <Row>
        {SHARES.map((v) => (
          <Control key={v} className={v === q ? "active" : ""} aria-pressed={v === q} disabled={locked || v === q} onClick={() => pick(v)}>
            Meets {pct(v)}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function OneCircleFewerIntroductions({ slug }: { slug: string }) {
  const [q, setQ] = useState(1);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${FRIENDS} friends, each ${pct(P)} a week to introduce you. They are in ${FRIENDS} separate circles, or one circle that meets only some weeks. Which is better?`,
        options: ["Separate circles give better odds", "The same either way", "One circle gives better odds"],
        answer: 0,
      }}
      exploreHint="Make the circle meet half the weeks, then 10% of weeks."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Friends in five separate circles give you {pct(SEP)}: you miss only if all five fail, and 0.9 to the fifth is{" "}
            {pct(1 - SEP)}.
          </p>
          <p>
            In one circle that meets half the weeks, the bar fell to {pct(oneCircle(0.5))}, and at 10% of weeks to{" "}
            {pct(oneCircle(0.1))}, though each friend alone stayed at {pct(P)}. Their chances rise and fall together: in the
            weeks the circle stays home, all five fail at once.
          </p>
          <p>Friends who share a circle are not independent tries, so counting them separately overstates your odds.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} q={q} setQ={setQ} seen={seen} setSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}
