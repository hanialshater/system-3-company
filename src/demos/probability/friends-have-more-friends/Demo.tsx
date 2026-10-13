"use client";

// Friendship paradox. Five people: a hub friends with four others who know only the hub.
// The learner picks a random person, then one of their friends, and the stage tallies how many
// friends that friend has. Four picks in five land on a leaf, whose only friend is the hub:
// the running average heads for 3.4, while the average person has 1.6.
// Key state: one pick (see the mechanism), then 100+ picks (see the average).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EDGES, PEOPLE, average, degree, meanDegree, meanFriendDegree, picks } from "./model";
import s from "./styles.module.css";

const PICKS = picks();
const MILESTONES = ["one", "hundred"] as const;
const BIG = 100;
const EXACT = meanFriendDegree(); // 3.4
const MEAN = meanDegree(); // 1.6

const POS: [number, number][] = [
  [170, 98],
  [80, 40],
  [260, 40],
  [80, 156],
  [260, 156],
];

function Stage({ locked, interact, n, setN }: { locked: boolean; interact: () => void; n: number; setN: (n: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const last = n > 0 ? PICKS[n - 1] : null;
  const shown = PICKS.slice(0, n);
  const toHub = shown.filter((p) => p.friend === 0).length;

  const pick = (k: number) => {
    const next = Math.min(PICKS.length, n + k);
    setN(next);
    reach("one");
    if (next >= BIG) reach("hundred");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 196" className={`stage-svg ${s.svg}`} role="img" aria-label={last ? `Picked ${PEOPLE[last.person]}, then their friend ${PEOPLE[last.friend]}` : "Five people, four friendships"}>
        {EDGES.map(([a, b]) => {
          const hot = last && ((last.person === a && last.friend === b) || (last.person === b && last.friend === a));
          return <line key={`${a}-${b}`} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} className={hot ? s.edgeHot : s.edge} />;
        })}
        {PEOPLE.map((name, i) => {
          const role = last?.person === i ? s.person : last?.friend === i ? s.friend : s.node;
          const r = i === 0 ? 30 : 22;
          return (
            <g key={name}>
              <circle cx={POS[i][0]} cy={POS[i][1]} r={r} className={role} />
              <text x={POS[i][0]} y={POS[i][1] - 2} textAnchor="middle" className={s.name}>
                {name}
              </text>
              <text x={POS[i][0]} y={POS[i][1] + 12} textAnchor="middle" className={s.deg}>
                {degree(i)} {degree(i) === 1 ? "friend" : "friends"}
              </text>
            </g>
          );
        })}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : last
            ? `Picked ${PEOPLE[last.person]}; their friend ${PEOPLE[last.friend]} has ${degree(last.friend)}.`
            : "Pick a person, then one of their friends."}
      </p>
      <Row>
        <Control disabled={locked || n >= PICKS.length} onClick={() => pick(1)}>
          Pick someone
        </Control>
        <Control disabled={locked || n >= PICKS.length} onClick={() => pick(BIG)}>
          Pick {BIG} more
        </Control>
      </Row>
      <Row>
        <Readout label="Everyone's average" value={locked ? "?" : `${MEAN.toFixed(1)} friends`} />
        <Readout label={`Friend picked (${n})`} value={locked || !n ? "?" : `${average(shown).toFixed(2)} friends`} />
        <Readout label="Friend was the hub" value={locked || !n ? "?" : `${toHub} of ${n}`} />
      </Row>
    </div>
  );
}

export default function FriendsHaveMoreFriends({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const shown = PICKS.slice(0, n);
  const toHub = shown.filter((p) => p.friend === 0).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Five people: one hub is friends with four others, who know only the hub. Pick a random person, then one of their friends at random. On average, how many friends does that friend have?",
        options: [MEAN.toFixed(1), "2.5", EXACT.toFixed(1)],
        answer: 2,
      }}
      exploreHint="Pick once and see who you land on. Then pick 100 more."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {n} picks averaged <strong>{average(shown).toFixed(2)} friends</strong>; the exact answer is {EXACT.toFixed(1)}.
            The average person has only {MEAN.toFixed(1)}.
          </p>
          <p>
            Four people in five are leaves, and a leaf&rsquo;s only friend is the hub, with 4 friends. So {toHub} of your{" "}
            {n} picked friends were the hub: 0.2 × 1 + 0.8 × 4 = 3.4. Popular people sit on many friend lists, so a friend
            you pick tends to be a popular one.
          </p>
          <p className="muted">
            This is a five-person toy. Real networks are less extreme, but in any connected network where friend counts
            differ, a friend picked this way has more friends than a person picked at random, on average.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} n={n} setN={setN} />}
    </Lesson>
  );
}
