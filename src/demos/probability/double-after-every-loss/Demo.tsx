"use client";

// The doubling system on a fair coin. One line chart: running profit after each seeded round. Wins
// climb in $1 steps; a bust (6 losses in a row) drops $63 at once. Key state: a bust seen.
// "Play 1 round", "Play 10 rounds", "Play until a bust" come in that DOM order, so QA reaches a bust.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BUST, MAX_LOSSES, P_BUST, expected, nextBust, rounds } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["bust", "long-run"] as const;
const RS = rounds();
const money = (v: number) => (v < 0 ? `−$${Math.abs(v)}` : `+$${v}`);
const WIN_ODDS = Math.round(1 / P_BUST) - 1; // 63
const ODDS = Math.round(1 / P_BUST); // 64

function stats(k: number) {
  const played = RS.slice(0, k);
  const busts = played.filter((r) => r < 0).length;
  return { wins: k - busts, busts, total: played.reduce((a, b) => a + b, 0) };
}

const X0 = 34;
const X1 = 330;
const Y0 = 12;
const Y1 = 168;

function Stage({ locked, interact, played, setPlayed }: { locked: boolean; interact: () => void; played: number; setPlayed: (k: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const run = [0];
  for (let i = 0; i < played; i++) run.push(run[i] + RS[i]);
  const hi = Math.max(40, ...run);
  const lo = Math.min(-70, ...run);
  const xs = Math.max(40, played);
  const x = (i: number) => X0 + (i / xs) * (X1 - X0);
  const y = (v: number) => Y0 + ((hi - v) / (hi - lo)) * (Y1 - Y0);
  const st = stats(played);
  const play = (k: number) => {
    const next = Math.min(RS.length, k);
    setPlayed(next);
    if (RS.slice(0, next).some((r) => r < 0)) reach("bust");
    if (next >= RS.length) reach("long-run");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `A round: bet $1, double after each loss. A win ends it at +$1; ${MAX_LOSSES} losses in a row end it at −$${BUST} (1+2+4+8+16+32).`}
      </p>
      <svg viewBox="0 0 340 190" className={`stage-svg ${s.svg}`} role="img" aria-label={`Profit after ${played} rounds: ${money(st.total)}`}>
        <line x1={X0} y1={y(0)} x2={X1} y2={y(0)} className={s.zero} />
        <text x={X0 - 4} y={y(0) + 4} textAnchor="end" className={s.tick}>
          $0
        </text>
        <text x={X0 - 4} y={y(hi) + 8} textAnchor="end" className={s.tick}>
          {money(hi)}
        </text>
        <text x={X0 - 4} y={y(lo)} textAnchor="end" className={s.tick}>
          {money(lo)}
        </text>
        <text x={(X0 + X1) / 2} y={184} textAnchor="middle" className={s.tick}>
          rounds played: {played}
        </text>
        {played > 0 && <polyline points={run.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} className={s.line} />}
        {run.map((v, i) =>
          i > 0 && RS[i - 1] < 0 ? <circle key={i} cx={x(i)} cy={y(v)} r={4} className={s.bust} /> : null,
        )}
      </svg>
      <Row>
        <Control disabled={locked || played >= RS.length} onClick={() => play(played + 1)}>
          Play 1 round
        </Control>
        <Control disabled={locked || played >= RS.length} onClick={() => play(played + 10)}>
          Play 10 rounds
        </Control>
        <Control disabled={locked || played >= RS.length} onClick={() => play(nextBust(RS, played))}>
          Play until a bust
        </Control>
        <Control disabled={locked || played >= RS.length} onClick={() => play(RS.length)}>
          Play to {RS.length.toLocaleString("en-US")} rounds
        </Control>
      </Row>
      <Row>
        <Readout label="$1 wins" value={st.wins} />
        <Readout label={`$${BUST} busts`} value={st.busts} />
        <Readout label="Total" value={money(st.total)} />
        <Readout label="Bust: 1 round in" value={st.busts ? Math.round(played / st.busts) : "–"} />
        <Readout label="Average per round" value={played ? `${st.total / played < 0 ? "−" : "+"}$${Math.abs(st.total / played).toFixed(2)}` : "–"} />
      </Row>
    </div>
  );
}

export default function DoubleAfterEveryLoss({ slug }: { slug: string }) {
  const [played, setPlayed] = useState(0);
  const st = stats(played);
  const ev = expected();

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Fair coin, even money (you win or lose what you bet). Bet $1 and double after each loss; stop at the first win, or after ${MAX_LOSSES} losses in a row ($${BUST} lost). Your average profit per round is:`,
        options: [`about +$${(1 - P_BUST).toFixed(2)}`, "exactly $0", `about −$${(1 - P_BUST).toFixed(2)}`],
        answer: 1,
      }}
      exploreHint="Play until a bust, then play all the way to 5,000 rounds. Watch the average per round."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your run: {st.wins} wins of $1 and {st.busts} {st.busts === 1 ? "bust" : "busts"} of ${BUST} over {played} rounds, a total of{" "}
            {money(st.total)}: {money(Math.round((st.total / played) * 100) / 100)} a round on average. The line climbed in small steps and fell off cliffs. A short run can end well
            above or below the average; only a long one settles near it.
          </p>
          <p>
            Each round wins $1 with chance {WIN_ODDS}/{ODDS} and loses ${BUST} with chance 1/{ODDS}: {WIN_ODDS}/{ODDS} × $1 − 1/{ODDS} × $
            {BUST} = <strong>${Math.abs(ev)}</strong>. Doubling turns many small wins into rare big losses; it cannot move the average of a
            fair game.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} played={played} setPlayed={setPlayed} />}
    </Lesson>
  );
}
