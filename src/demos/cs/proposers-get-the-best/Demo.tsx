"use client";

// Before / after toggle: the same six rankings, run twice. Press a free proposer to make offers down its list
// until a receiver holds it; a receiver keeps the better offer and turns the other down (dashed line, ✕). A toggle
// swaps who proposes and starts a fresh run; finished runs stay in the log so the two outcomes sit side by side.
// v4 (learner r7): 3 × 3 so each run has a clash (Ann and Bea both want X; Y and Z both want Ann), and the
// question asks whether swapping the proposer changes anything, which is where the misconception lives.
// "Would a pair rather swap?" checks every finished run: for each student and each hospital they did not get, does
// each side want the swap? A matching is stable when no pair says yes twice. The reveal needs both runs and the check.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Row } from "@/kit/controls";
import s from "./styles.module.css";

type Name = "Ann" | "Bea" | "Cal" | "X" | "Y" | "Z";
type Mode = "S" | "H";
type Pairs = [Name, Name][]; // [student, hospital]

const PREF: Record<Name, Name[]> = {
  Ann: ["X", "Y", "Z"],
  Bea: ["X", "Y", "Z"],
  Cal: ["Z", "X", "Y"],
  X: ["Cal", "Ann", "Bea"],
  Y: ["Ann", "Bea", "Cal"],
  Z: ["Ann", "Bea", "Cal"],
};
const STUDENTS: Name[] = ["Ann", "Bea", "Cal"];
const HOSPITALS: Name[] = ["X", "Y", "Z"];

type Run = {
  held: Partial<Record<Name, Name>>; // receiver -> proposer it holds
  next: Record<Name, number>;
  refused: [Name, Name][]; // [proposer, receiver] pairs turned down
};
const FRESH: Run = {
  held: {},
  next: { Ann: 0, Bea: 0, Cal: 0, X: 0, Y: 0, Z: 0 },
  refused: [],
};

const heldBy = (run: Run, p: Name) =>
  (Object.keys(run.held) as Name[]).find((r) => run.held[r] === p);
const prefers = (who: Name, a: Name, b: Name) =>
  PREF[who].indexOf(a) < PREF[who].indexOf(b);

// Every student with every hospital they did not get: how many pairs have one yes, how many two.
function swapCount(pairs: Pairs) {
  const hospOf = (st: Name) => pairs.find(([a]) => a === st)![1];
  const studOf = (h: Name) => pairs.find(([, b]) => b === h)![0];
  let other = 0;
  let one = 0;
  let both = 0;
  for (const st of STUDENTS)
    for (const h of HOSPITALS) {
      if (h === hospOf(st)) continue;
      other++;
      const yes =
        Number(prefers(st, h, hospOf(st))) + Number(prefers(h, st, studOf(h)));
      if (yes === 1) one++;
      if (yes === 2) both++;
    }
  return { other, one, both };
}
const firsts = (pairs: Pairs) => ({
  st: pairs.filter(([a, b]) => PREF[a][0] === b).length,
  ho: pairs.filter(([a, b]) => PREF[b][0] === a).length,
});
const pairText = (pairs: Pairs) =>
  pairs.map(([a, b]) => `${a}–${b}`).join(", ");

function Stage({
  locked,
  compact,
  reach,
  found,
  setFound,
  checked,
  setChecked,
}: {
  locked: boolean;
  compact: boolean;
  reach: (n: string) => void;
  found: Partial<Record<Mode, Pairs>>;
  setFound: (f: Partial<Record<Mode, Pairs>>) => void;
  checked: Partial<Record<Mode, boolean>>;
  setChecked: (c: Partial<Record<Mode, boolean>>) => void;
}) {
  const [mode, setMode] = useState<Mode>("S");
  const [run, setRun] = useState<Run>(FRESH);
  const unchecked = (["S", "H"] as Mode[]).filter(
    (m) => found[m] && !checked[m],
  );

  const proposers = mode === "S" ? STUDENTS : HOSPITALS;
  const done = proposers.every((p) => heldBy(run, p));
  const partner = (n: Name): Name | undefined =>
    proposers.includes(n) ? heldBy(run, n) : run.held[n];

  // p offers down its list until someone holds it. If that bumps a held proposer, the bumped one is free again.
  const offer = (p: Name) => {
    if (locked || done || heldBy(run, p) || !proposers.includes(p)) return;
    const nr: Run = {
      held: { ...run.held },
      next: { ...run.next },
      refused: [...run.refused],
    };
    for (;;) {
      const r = PREF[p][nr.next[p]];
      if (!r) break;
      const cur = nr.held[r];
      if (!cur) {
        nr.held[r] = p;
        break;
      }
      if (prefers(r, p, cur)) {
        nr.held[r] = p;
        nr.next[cur]++;
        nr.refused.push([cur, r]);
        break;
      }
      nr.next[p]++;
      nr.refused.push([p, r]);
    }
    setRun(nr);
    if (proposers.every((q) => heldBy(nr, q))) {
      const pairs = proposers.map((q) => [q, heldBy(nr, q)!] as [Name, Name]);
      const asStudentHospital = pairs
        .map(([a, b]) => (mode === "S" ? [a, b] : [b, a]) as [Name, Name])
        .sort((x, y) => STUDENTS.indexOf(x[0]) - STUDENTS.indexOf(y[0]));
      setFound({ ...found, [mode]: asStudentHospital });
      reach(mode === "S" ? "students-proposed" : "hospitals-proposed");
    }
  };

  const check = () => {
    if (locked || unchecked.length === 0) return;
    const next = { ...checked };
    for (const m of unchecked) next[m] = true;
    setChecked(next);
    if (next.S && next.H) reach("checked-both");
  };

  const toggle = () => {
    if (locked) return;
    setMode(mode === "S" ? "H" : "S");
    setRun(FRESH);
  };

  const card = (n: Name) => {
    const isProp = proposers.includes(n);
    const mate = partner(n);
    const star = done && mate === PREF[n][0];
    return (
      <button
        key={n}
        type="button"
        data-qa="control"
        className={`${s.card} ${HOSPITALS.includes(n) ? s.hosp : s.stud}`}
        disabled={locked || !isProp || done || !!heldBy(run, n)}
        onClick={() => offer(n)}
      >
        <span className={s.who}>
          {HOSPITALS.includes(n) ? "▦ " : ""}
          {n}
          {star && (
            <span aria-label="first choice" className={s.star}>
              {" "}
              ★
            </span>
          )}
        </span>
        <span className={s.list}>
          {PREF[n].map((o, i) => (
            <span key={o} className={done && mate === o ? s.mate : undefined}>
              {i > 0 ? (compact ? "\u2009›\u2009" : " › ") : ""}
              {o}
            </span>
          ))}
        </span>
      </button>
    );
  };

  const xOf = (n: Name) =>
    60 +
    120 * (STUDENTS.includes(n) ? STUDENTS.indexOf(n) : HOSPITALS.indexOf(n));
  const top = (n: Name) => STUDENTS.includes(n);
  // v5 (learner r8): the offer strip is shorter at the reveal so the clash ✕ stays on screen with the cards.
  const H = compact ? 44 : 80;
  const lineFor = (p: Name, r: Name, kind: "held" | "refused", k: number) => {
    const prop = top(p);
    const y1 = prop ? 2 : H - 2;
    const y2 = prop ? H - 2 : 2;
    return (
      <g key={`${kind}${p}${r}${k}`}>
        <line
          x1={xOf(p)}
          y1={y1}
          x2={xOf(r)}
          y2={y2 + (prop ? -6 : 6)}
          stroke="var(--fg)"
          strokeWidth={kind === "held" ? 2.5 : 1.5}
          strokeDasharray={kind === "refused" ? "4 4" : undefined}
          opacity={kind === "refused" ? 0.5 : 1}
          markerEnd="url(#offer-arrow)"
        />
        {kind === "refused" && (
          <text
            x={(xOf(p) + xOf(r)) / 2}
            y={H / 2 + 4}
            textAnchor="middle"
            className={s.x}
          >
            ✕
          </text>
        )}
      </g>
    );
  };

  const runLine = (m: Mode) => {
    const p = found[m]!;
    const f = firsts(p);
    return `${m === "S" ? "Students" : "Hospitals"} proposed: ${pairText(p)}. First choices: students ${f.st}, hospitals ${f.ho}.`;
  };
  const checkLine = (m: Mode) => {
    const c = swapCount(found[m]!);
    return `${c.both === 0 ? "Stable" : "Unstable"}: ${c.both} of ${c.other} other pairs say yes both ways.`;
  };

  return (
    <div className={`${s.wrap} ${compact ? s.compact : ""}`}>
      {!compact && (
        <p className={s.rule}>
          Tap a free card to offer down its list. Receivers keep their best
          offer.
        </p>
      )}
      <div className={s.row}>{STUDENTS.map(card)}</div>
      {/* Fold opt-in (W-330): no Readout, no reveal sentence reads this switch, and the arrow direction shows the mode. */}
      <Row foldAtReveal>
        <button
          type="button"
          data-qa="control"
          className={`control tap ${s.toggle}`}
          aria-pressed={mode === "H"}
          disabled={locked}
          onClick={toggle}
        >
          {mode === "S" ? "Students propose ↓" : "Hospitals propose ↑"}
        </button>
      </Row>
      <svg
        viewBox={`0 0 360 ${H}`}
        style={{ height: H }}
        className={`stage-svg ${s.lines}`}
        role="img"
        aria-label="Offers between students and hospitals"
      >
        <defs>
          <marker
            id="offer-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="var(--fg)" />
          </marker>
        </defs>
        {run.refused.map(([p, r], k) => lineFor(p, r, "refused", k))}
        {(Object.keys(run.held) as Name[]).map((r) =>
          lineFor(run.held[r]!, r, "held", 0),
        )}
      </svg>
      <div className={s.row}>{HOSPITALS.map(card)}</div>
      <div className={s.log} aria-live="polite">
        {found.S || found.H ? (
          <>
            {found.S && <p>{runLine("S")}</p>}
            {checked.S && <p className={s.check}>{checkLine("S")}</p>}
            {found.H && <p>{runLine("H")}</p>}
            {checked.H && <p className={s.check}>{checkLine("H")}</p>}
          </>
        ) : (
          <p>Matchings: ?</p>
        )}
      </div>
      {/* Fold opt-in: the reveal quotes the check lines in the log above, never this button. */}
      <Row foldAtReveal>
        <button
          type="button"
          data-qa="control"
          className={`control tap ${s.toggle}`}
          disabled={locked || unchecked.length === 0}
          onClick={check}
        >
          Would a pair rather swap?
        </button>
      </Row>
    </div>
  );
}

export default function ProposersGetTheBest({ slug }: { slug: string }) {
  const [found, setFound] = useState<Partial<Record<Mode, Pairs>>>({});
  const [checked, setChecked] = useState<Partial<Record<Mode, boolean>>>({});
  const fs = found.S ? firsts(found.S) : null;
  const fh = found.H ? firsts(found.H) : null;
  const cs = found.S ? swapCount(found.S) : null;
  const ch = found.H ? swapCount(found.H) : null;
  const same =
    !!found.S && !!found.H && pairText(found.S) === pairText(found.H);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You run a match for three students and three hospitals who rank each other (lists on the cards). Run it with the students making offers, then with the hospitals. What happens?",
        options: [
          "The same pairs both times",
          "Different pairs; the side making offers does better",
          "Different pairs; the side receiving offers does better",
        ],
        answer: 1,
      }}
      exploreHint="Run it with students proposing, flip the switch, run it again, then check for a swap."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Students proposing gave {found.S ? pairText(found.S) : "(not tried)"}:
            first choices for students {fs ? fs.st : "?"}, hospitals{" "}
            {fs ? fs.ho : "?"}. Hospitals proposing gave{" "}
            {found.H ? pairText(found.H) : "(not tried)"}: students{" "}
            {fh ? fh.st : "?"}, hospitals {fh ? fh.ho : "?"}.
            {same
              ? " Same pairs."
              : " Same rankings, different pairs, and the side making offers did better."}{" "}
            Each run had a clash (dashed ✕): the receiver kept its
            higher-ranked offer.
          </p>
          <p>
            Your swap check found {cs && checked.S ? cs.both : "?"} and{" "}
            {ch && checked.H ? ch.both : "?"} pairs wanting each other both
            ways, so both are stable: deferred acceptance always ends stable
            (Gale and Shapley 1962).
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones
          interact={interact}
          names={["students-proposed", "hospitals-proposed", "checked-both"]}
        >
          {(reach) => (
            <Stage
              locked={locked}
              compact={phase === "reveal"}
              reach={reach}
              found={found}
              setFound={setFound}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
