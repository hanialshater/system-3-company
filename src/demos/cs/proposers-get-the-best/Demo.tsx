"use client";

// Before / after toggle: the same four rankings, run twice. Press a free proposer to make
// its next offer; the receiver keeps the better offer. A toggle swaps who proposes and
// starts a fresh run; finished runs stay in the log so the two outcomes sit side by side.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Name = "Ann" | "Bea" | "X" | "Y";
type Mode = "S" | "H";

const PREF: Record<Name, Name[]> = {
  Ann: ["X", "Y"],
  Bea: ["Y", "X"],
  X: ["Bea", "Ann"],
  Y: ["Ann", "Bea"],
};
const STUDENTS: Name[] = ["Ann", "Bea"];
const HOSPITALS: Name[] = ["X", "Y"];

type Run = {
  held: Partial<Record<Name, Name>>; // receiver -> proposer it holds
  next: Record<Name, number>;
  refused: [Name, Name][]; // [proposer, receiver] pairs turned down
};
const FRESH: Run = { held: {}, next: { Ann: 0, Bea: 0, X: 0, Y: 0 }, refused: [] };

const heldBy = (run: Run, p: Name) => (Object.keys(run.held) as Name[]).find((r) => run.held[r] === p);

// A matching is stable if no student and hospital both prefer each other to their partners.
function isStable(pairs: [Name, Name][]) {
  const hospOf = (st: Name) => pairs.find(([a]) => a === st)![1];
  const studOf = (h: Name) => pairs.find(([, b]) => b === h)![0];
  return !STUDENTS.some((st) =>
    HOSPITALS.some(
      (h) =>
        PREF[st].indexOf(h) < PREF[st].indexOf(hospOf(st)) && PREF[h].indexOf(st) < PREF[h].indexOf(studOf(h)),
    ),
  );
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [mode, setMode] = useState<Mode>("S");
  const [run, setRun] = useState<Run>(FRESH);
  const [log, setLog] = useState<Partial<Record<Mode, string>>>({});

  const proposers = mode === "S" ? STUDENTS : HOSPITALS;
  const done = proposers.every((p) => heldBy(run, p));
  // partner of each person in the finished run
  const partner = (n: Name): Name | undefined =>
    proposers.includes(n) ? heldBy(run, n) : run.held[n];

  const offer = (p: Name) => {
    if (locked || done || heldBy(run, p) || !proposers.includes(p)) return;
    const r = PREF[p][run.next[p]];
    if (!r) return;
    const cur = run.held[r];
    const nr: Run = { held: { ...run.held }, next: { ...run.next }, refused: [...run.refused] };
    if (!cur) nr.held[r] = p;
    else if (PREF[r].indexOf(p) < PREF[r].indexOf(cur)) {
      nr.held[r] = p;
      nr.next[cur]++;
      nr.refused.push([cur, r]);
    } else {
      nr.next[p]++;
      nr.refused.push([p, r]);
    }
    setRun(nr);
    if (proposers.every((q) => heldBy(nr, q))) {
      const pairs = proposers.map((q) => [q, heldBy(nr, q)!] as [Name, Name]);
      const asStudentHospital = pairs.map(([a, b]) => (mode === "S" ? [a, b] : [b, a]) as [Name, Name]);
      const text = pairs.map(([a, b]) => `${a}–${b}${PREF[a][0] === b ? " ★" : ""}`).join(", ");
      setLog({
        ...log,
        [mode]: `${mode === "S" ? "Students" : "Hospitals"} proposed: ${text}${isStable(asStudentHospital) ? " · stable" : " · unstable"}`,
      });
      reach(mode === "S" ? "students-proposed" : "hospitals-proposed");
    }
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
              {i > 0 ? " › " : ""}
              {o}
            </span>
          ))}
        </span>
      </button>
    );
  };

  const xOf = (n: Name) => (n === "Ann" || n === "X" ? 90 : 270);
  const top = (n: Name) => STUDENTS.includes(n);
  const lineFor = (p: Name, r: Name, kind: "held" | "refused") => {
    const prop = top(p);
    const y1 = prop ? 2 : 78;
    const y2 = prop ? 78 : 2;
    return (
      <g key={`${kind}${p}${r}`}>
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
          <text x={(xOf(p) + xOf(r)) / 2} y={44} textAnchor="middle" className={s.x}>
            ✕
          </text>
        )}
      </g>
    );
  };

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Offer to your next choice. Receivers keep their best offer.</p>
      <div className={s.row}>{STUDENTS.map(card)}</div>
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
      <svg viewBox="0 0 360 80" className={`stage-svg ${s.lines}`} role="img" aria-label="Offers between students and hospitals">
        <defs>
          <marker id="offer-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--fg)" />
          </marker>
        </defs>
        {run.refused.map(([p, r]) => lineFor(p, r, "refused"))}
        {(Object.keys(run.held) as Name[]).map((r) => lineFor(run.held[r]!, r, "held"))}
      </svg>
      <div className={s.row}>{HOSPITALS.map(card)}</div>
      <div className={s.log} aria-live="polite">
        {log.S || log.H ? (
          <>
            {log.S && <p>{log.S}</p>}
            {log.H && <p>{log.H}</p>}
          </>
        ) : (
          <p>First choices: ?</p>
        )}
      </div>
    </div>
  );
}

export default function ProposersGetTheBest({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ann prefers hospital X then Y; Bea prefers Y then X. X prefers Bea; Y prefers Ann. If the students propose, who gets their first choice?",
        options: ["Both students", "Both hospitals", "One of each"],
        answer: 0,
      }}
      exploreHint="Run the proposals with students proposing, then flip the switch and run them again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            When students proposed, both students got their first choice. When hospitals proposed, both hospitals did.
            Same four rankings; both matchings were stable, so neither answer was an error.
          </p>
          <p>
            Deferred acceptance always ends stable and gives the proposing side its best stable partner (Gale and
            Shapley 1962). The US residency match switched to students proposing in 1998, a change studied by Roth and Peranson (1999).
          </p>
          <p className="muted">A fair-looking procedure can still have a side it favours.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["students-proposed", "hospitals-proposed"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
