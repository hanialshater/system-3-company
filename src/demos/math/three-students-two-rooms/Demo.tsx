"use client";

// Constricted set (Hall's condition). Four students, four rooms, each student accepts two rooms:
// A 1,2 · B 1,3 · C 2,3 · D 1,3. Together they accept only rooms 1, 2, 3, so no assignment houses all
// four. Enumerating all 24 one-to-one assignments (node, 2026-10-14): 0 work, the best houses 3.
// Letting D also accept room 4 gives 2 working assignments.
// The slug predates the edited brief (it now has four students and three acceptable rooms); kept, see build note.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STUDENTS = ["A", "B", "C", "D"] as const;
const ROOMS = [1, 2, 3, 4];
const BASE: number[][] = [
  [1, 2],
  [1, 3],
  [2, 3],
  [1, 3],
];
const listsFor = (d4: boolean) => BASE.map((l, i) => (i === 3 && d4 ? [...l, 4] : l));

const perms = (a: number[]): number[][] =>
  a.length ? a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])) : [[]];
const ALL = perms(ROOMS); // 24 assignments: student i gets room p[i]

function survey(lists: number[][]) {
  let ok = 0;
  let best = -1;
  let bestAssign: (number | null)[] = [];
  let firstOk: (number | null)[] | null = null;
  for (const p of ALL) {
    const housed = p.map((r, i) => (lists[i].includes(r) ? r : null));
    const n = housed.filter((r) => r !== null).length;
    if (n === 4) {
      ok++;
      if (!firstOk) firstOk = housed;
    }
    if (n > best) {
      best = n;
      bestAssign = housed;
    }
  }
  return { ok, best, show: firstOk ?? bestAssign };
}

const SX = 70;
const RX = 250;
const Y = (i: number) => 34 + i * 46;

export default function ThreeStudentsTwoRooms({ slug }: { slug: string }) {
  const [d4, setD4] = useState(false);
  const [assign, setAssign] = useState<(number | null)[]>([null, null, null, null]);
  const [sel, setSel] = useState<number | null>(null);
  const [tried, setTried] = useState(false);
  const [group, setGroup] = useState(false);
  const [msg, setMsg] = useState("");

  const lists = listsFor(d4);
  const res = survey(lists);
  const union = ROOMS.filter((r) => lists.some((l) => l.includes(r)));
  const housed = assign.filter((r) => r !== null).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You are assigning four students to four dorm rooms; each accepts two. A: rooms 1,2. B: 1,3. C: 2,3. D: 1,3. Can everyone get a room they accept?",
        options: ["Yes", "No", "Only if D takes room 1"],
        answer: 1,
      }}
      exploreHint="Try to house all four, let the stage try all 24 ways, then ask which rooms the four accept together."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Whichever way the four are placed, someone is left out: trying all 24 ways found none that works, and the best houses three.
          </p>
          <p>
            The reason lit up when you asked which rooms the four accept together: only 1, 2 and 3. Four people, three acceptable
            rooms, so one must miss out, even though each accepts two. A group that together accepts fewer rooms than it has members
            is a constricted set, and it is the only thing that can block a full matching (Hall&apos;s matching theorem).
          </p>
          <p>Let D also accept room 4 and the group opens up: 2 of the 24 ways then work.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["all-fail", "constricted"]}>
          {(reach) => {
            const tryAll = () => {
              if (locked) return;
              setTried(true);
              setAssign(res.show);
              setSel(null);
              setMsg(res.ok === 0 ? `All 24 ways tried: none houses everyone. Best: ${res.best}.` : `${res.ok} of 24 ways house everyone.`);
              if (!d4) reach("all-fail");
            };
            const toggleGroup = () => {
              if (locked) return;
              const g = !group;
              setGroup(g);
              setMsg(g ? `Together they accept rooms ${union.join(", ")}: 4 students, ${union.length} rooms.` : "Group view off.");
              if (g && !d4) reach("constricted");
            };
            const toggleD4 = () => {
              if (locked) return;
              const nd = !d4;
              setD4(nd);
              setTried(false);
              const next = assign.map((r, i) => (i === 3 && r === 4 && !nd ? null : r));
              setAssign(next);
              setMsg(nd ? "D now also accepts room 4." : "D accepts rooms 1 and 3 again.");
            };
            const pickStudent = (i: number) => {
              if (locked) return;
              setSel(i);
              setMsg(`${STUDENTS[i]} accepts rooms ${lists[i].join(" and ").replace(/ and (?=.* and )/g, ", ")}. Pick a room.`);
            };
            const pickRoom = (r: number) => {
              if (locked || sel === null) return;
              if (!lists[sel].includes(r)) {
                setMsg(`${STUDENTS[sel]} does not accept room ${r}.`);
                return;
              }
              const bumped = assign.findIndex((x, i) => x === r && i !== sel);
              const next = assign.map((x, i) => (i === sel ? r : i === bumped ? null : x));
              setAssign(next);
              setMsg(bumped >= 0 ? `${STUDENTS[sel]} takes room ${r}; ${STUDENTS[bumped]} is out.` : `${STUDENTS[sel]} takes room ${r}.`);
            };
            const clear = () => {
              if (locked) return;
              setAssign([null, null, null, null]);
              setSel(null);
              setMsg("Cleared.");
            };
            const note = msg || "Each line: a room that student accepts.";
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`${housed} of 4 students housed`}>
                  {lists.map((l, i) =>
                    l.map((r) => {
                      const used = assign[i] === r;
                      return (
                        <line
                          key={`e${i}${r}`}
                          x1={SX + 16}
                          y1={Y(i)}
                          x2={RX - 16}
                          y2={Y(r - 1)}
                          className={used ? s.edgeUsed : group ? s.edgeGroup : s.edge}
                        />
                      );
                    }),
                  )}
                  {STUDENTS.map((n, i) => (
                    <g key={n} onClick={() => pickStudent(i)} className={s.hit}>
                      <circle cx={SX} cy={Y(i)} r={16} className={`${assign[i] !== null ? s.housed : s.student} ${sel === i ? s.sel : ""}`} />
                      <text x={SX} y={Y(i) + 5} textAnchor="middle" className={s.lab}>
                        {n}
                      </text>
                      {assign[i] === null && (tried || housed === 3) && (
                        <text x={SX - 24} y={Y(i) + 4} textAnchor="end" className={s.out}>
                          no room
                        </text>
                      )}
                    </g>
                  ))}
                  {ROOMS.map((r) => {
                    const inUnion = union.includes(r);
                    return (
                      <g key={r} onClick={() => pickRoom(r)} className={s.hit}>
                        <rect
                          x={RX - 16}
                          y={Y(r - 1) - 16}
                          width={32}
                          height={32}
                          rx={6}
                          className={`${assign.includes(r) ? s.roomFull : s.room} ${group && inUnion ? s.roomGroup : ""}`}
                        />
                        <text x={RX} y={Y(r - 1) + 5} textAnchor="middle" className={s.lab}>
                          {r}
                        </text>
                        {group && !inUnion && (
                          <text x={RX + 22} y={Y(r - 1) + 4} className={s.out}>
                            nobody
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control disabled={locked || tried} onClick={tryAll}>
                    Try all 24
                  </Control>
                  <Control className={group ? "active" : ""} disabled={locked} onClick={toggleGroup}>
                    {group ? "Hide group" : "Rooms all four accept"}
                  </Control>
                  <Control className={d4 ? "active" : ""} disabled={locked} onClick={toggleD4}>
                    {d4 ? "D: rooms 1, 3 only" : "D also accepts 4"}
                  </Control>
                </Row>
                <Row>
                  {STUDENTS.map((n, i) => (
                    <Control key={n} className={sel === i ? "active" : ""} disabled={locked || sel === i} onClick={() => pickStudent(i)}>
                      {n}
                    </Control>
                  ))}
                  <span className={s.arrow}>→</span>
                  {ROOMS.map((r) => (
                    <Control
                      key={r}
                      className={sel !== null && assign[sel] === r ? "active" : ""}
                      disabled={locked || sel === null || assign[sel] === r}
                      onClick={() => pickRoom(r)}
                      aria-label={`Room ${r}`}
                    >
                      {r}
                    </Control>
                  ))}
                  <Control disabled={locked || housed === 0} onClick={clear}>
                    Clear
                  </Control>
                </Row>
                <Row>
                  <Readout label="Housed" value={`${housed} / 4`} />
                  <Readout label="Ways that work" value={tried ? `${res.ok} / 24` : "?"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
