"use client";

// 8 players, knockout rounds, the stronger player always wins. After 7 matches the champion is
// known. Who could be second best? Only someone who lost to the champion: anyone else lost to a
// player who is not the champion, and that player is stronger. The champion played 3 matches,
// so there are 3 candidates, and 2 more matches among them find the runner-up: 9 in all, not 13.
// One picture: the bracket. Strengths stay hidden until the learner asks.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];
// Chosen (not random) so the true second best is beaten in round 1, not in the final.
const STRENGTH = [3, 5, 1, 6, 8, 7, 2, 4];
const P = NAMES.length;
const ROUNDS = Math.log2(P); // 3

type Match = { round: number; a: number; b: number; w: number; l: number };
function playAll() {
  const matches: Match[] = [];
  let field = NAMES.map((_, i) => i);
  const fields = [field];
  for (let r = 0; r < ROUNDS; r++) {
    const next: number[] = [];
    for (let i = 0; i < field.length; i += 2) {
      const a = field[i];
      const b = field[i + 1];
      const w = STRENGTH[a] > STRENGTH[b] ? a : b;
      matches.push({ round: r, a, b, w, l: w === a ? b : a });
      next.push(w);
    }
    field = next;
    fields.push(field);
  }
  return { matches, fields };
}
const { matches: MATCHES, fields: FIELDS } = playAll();
const CHAMP = FIELDS[ROUNDS][0];
const VICTIMS = MATCHES.filter((m) => m.w === CHAMP).map((m) => m.l);
const SECOND = STRENGTH.indexOf([...STRENGTH].sort((x, y) => y - x)[1]);
const FINAL_LOSER = MATCHES[MATCHES.length - 1].l;
const lostTo = (p: number) => MATCHES.find((m) => m.l === p);
const TOTAL = P - 1; // 7
const EXTRA = VICTIMS.length - 1; // 2
const NAIVE_EXTRA = P - 2; // 6

// layout
const COLX = [8, 104, 184, 258];
const rowY = (r: number, i: number) => {
  const span = 2 ** r;
  return 14 + (i * span + (span - 1) / 2) * 27;
};
const BOX_W = 46;
const BOX_H = 20;

export default function TournamentSecondBest({ slug }: { slug: string }) {
  const [played, setPlayed] = useState(0); // rounds played
  const [picked, setPicked] = useState<number | null>(null);
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const [shown, setShown] = useState(false);

  const done = played === ROUNDS;
  const info = (() => {
    if (picked === null) return done ? "Tap a player: who beat them?" : "Stronger player always wins. Play the rounds.";
    if (picked === CHAMP) return `${NAMES[CHAMP]} is the champion. It beat ${VICTIMS.map((v) => NAMES[v]).join(", ")}.`;
    const m = lostTo(picked)!;
    if (m.w === CHAMP) return `${NAMES[picked]} lost only to the champion: could be second.`;
    return `${NAMES[picked]} lost to ${NAMES[m.w]}, not the champion. ${NAMES[m.w]} is stronger: ${NAMES[picked]} can't be second.`;
  })();

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${P} players play knockout rounds and the stronger always wins. The champion is found in ${TOTAL} matches. Which players could be the second best?`,
        options: [`All ${P - 1} others`, `Only the ${VICTIMS.length} the champion beat`, "Only the final's loser"],
        answer: 1,
      }}
      exploreHint="Play to the final. Then tap the champion, and tap someone else."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {NAMES[CHAMP]} beat exactly {VICTIMS.length} players: {VICTIMS.map((v) => NAMES[v]).join(", ")}.
            {ruledOut.length
              ? ` You ruled out ${ruledOut.map((p) => NAMES[p]).join(", ")}: each lost to someone who is not the champion, and that winner is stronger.`
              : ""}{" "}
            The second best can only lose to the best, so it must be one of the champion&apos;s victims.
            {shown
              ? ` Here it was ${NAMES[SECOND]}, knocked out in round ${lostTo(SECOND)!.round + 1}, not ${NAMES[FINAL_LOSER]}, the final's loser.`
              : ""}
          </p>
          <p>
            So the knockout gives a free shortlist. {EXTRA} more matches among the {VICTIMS.length} find the runner-up:{" "}
            {TOTAL + EXTRA} matches in all, instead of {TOTAL} + {NAIVE_EXTRA} = {TOTAL + NAIVE_EXTRA} if you searched the other{" "}
            {P - 1} again. Splitting into pairs does the work once and keeps the record.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["champion", "ruled-out"]}>
          {(reach) => {
            const pick = (p: number) => {
              if (locked || !done) return;
              setPicked(p);
              if (p === CHAMP) reach("champion");
              else if (lostTo(p)!.w !== CHAMP) {
                setRuledOut((x) => (x.includes(p) ? x : [...x, p]));
                reach("ruled-out");
              }
            };
            const pm = picked !== null && picked !== CHAMP ? lostTo(picked) : undefined;
            const hot = (p: number) =>
              (picked === CHAMP && VICTIMS.includes(p)) || (pm && pm.w !== CHAMP && p === pm.w) ? true : false;

            return (
              <div className={s.wrap}>
                <p className={s.info}>{info}</p>
                <svg viewBox="0 0 320 228" className="stage-svg" role="img" aria-label="Knockout bracket">
                  {MATCHES.filter((m) => m.round < played).map((m, k) => {
                    const i = FIELDS[m.round].indexOf(m.a) / 2;
                    const ya = rowY(m.round, i * 2);
                    const yb = rowY(m.round, i * 2 + 1);
                    const yw = rowY(m.round + 1, i);
                    const x1 = COLX[m.round] + BOX_W;
                    const x2 = COLX[m.round + 1];
                    const xm = (x1 + x2) / 2;
                    const lostHere = picked !== null && m.l === picked;
                    return (
                      <path
                        key={k}
                        d={`M${x1} ${ya}H${xm}V${yb}H${x1}M${xm} ${yw}H${x2}`}
                        fill="none"
                        stroke={lostHere ? (m.w === CHAMP ? "var(--good)" : "var(--bad)") : "var(--line)"}
                        strokeWidth={lostHere ? 2.5 : 1.5}
                      />
                    );
                  })}
                  {FIELDS.slice(0, played + 1).map((field, r) =>
                    field.map((p, i) => {
                      const y = rowY(r, i);
                      const champ = done && p === CHAMP;
                      return (
                        <g key={`${r}-${p}`}>
                          <rect
                            x={COLX[r]}
                            y={y - BOX_H / 2}
                            width={BOX_W}
                            height={BOX_H}
                            rx={5}
                            fill={champ ? "var(--domain)" : hot(p) && r === 0 ? "color-mix(in srgb, var(--domain) 35%, var(--bg-2))" : "var(--bg-2)"}
                            stroke={picked === p ? "var(--fg)" : "var(--line)"}
                            strokeWidth={picked === p ? 2 : 1}
                          />
                          <text x={COLX[r] + (r === 0 && shown ? 12 : BOX_W / 2)} y={y + 4} textAnchor="middle" className={`${s.name} ${champ ? s.onChamp : ""}`}>
                            {NAMES[p]}
                          </text>
                          {r === 0 && shown && (
                            <text x={COLX[r] + 34} y={y + 4} textAnchor="middle" className={`${s.str} ${p === SECOND ? s.second : ""} ${champ ? s.onChamp : ""}`}>
                              {STRENGTH[p]}
                            </text>
                          )}
                        </g>
                      );
                    }),
                  )}
                </svg>
                <Row>
                  <Control className="active" disabled={locked || done} onClick={() => setPlayed((x) => Math.min(ROUNDS, x + 1))}>
                    {done ? `${TOTAL} matches played` : `Play round ${played + 1}`}
                  </Control>
                  <Control disabled={locked || done} onClick={() => setPlayed(ROUNDS)}>
                    Play to the final
                  </Control>
                </Row>
                <Row>
                  {NAMES.map((n, p) => (
                    <Control key={n} className={`${s.player} ${picked === p ? "active" : ""}`} disabled={locked || !done} onClick={() => pick(p)}>
                      {n}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control disabled={locked || !done || shown} onClick={() => setShown(true)}>
                    {shown ? "Strengths shown" : "Show true strengths"}
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
