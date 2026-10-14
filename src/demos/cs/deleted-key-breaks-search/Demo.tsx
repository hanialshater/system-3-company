"use client";

// Toy hash table, 8 slots; A, B, C all hash to slot 1 and sit in 1, 2, 3. The learner deletes B (slot 2 blank
// or a "gone" marker, chosen by a toggle), searches for C, and sees the probe trace stop or pass slot 2.
// Before/after toggle: the toggle redoes the delete and reruns the search; both log lines stay on the stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

type Mode = "empty" | "marker";
type Slot = string | null; // key, "gone" or null (empty)
type Probe = { slot: number; what: Slot };
type Result = { probes: Probe[]; found: number | null; stop: number | null; passedGone: boolean };

const SIZE = 8;
const X = (i: number) => 6 + i * 44;

function table(deleted: boolean, mode: Mode): Slot[] {
  const t: Slot[] = [null, "A", "B", "C", null, null, null, null];
  if (deleted) t[2] = mode === "empty" ? null : "gone";
  return t;
}

// Linear probing search for C from its home slot 1: stop on the key or on an empty slot, pass over "gone".
function search(t: Slot[]): Result {
  const probes: Probe[] = [];
  let passedGone = false;
  for (let n = 0; n < SIZE; n++) {
    const slot = (1 + n) % SIZE;
    probes.push({ slot, what: t[slot] });
    if (t[slot] === "C") return { probes, found: slot, stop: null, passedGone };
    if (t[slot] === null) return { probes, found: null, stop: slot, passedGone };
    if (t[slot] === "gone") passedGone = true;
  }
  return { probes, found: null, stop: null, passedGone };
}

function line(deleted: boolean, mode: Mode, r: Result): string {
  const tag = !deleted ? "Nothing deleted" : mode === "empty" ? "Emptied slot" : "Gone marker";
  if (r.found !== null) return `${tag}: ${r.passedGone ? "search C passed slot 2. " : ""}Found in slot ${r.found}.`;
  return `${tag}: search C stopped at slot ${r.stop}. Not found.`;
}

export default function DeletedKeyBreaksSearch({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("empty");
  const [deleted, setDeleted] = useState(false);
  const [searched, setSearched] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const t = table(deleted, mode);
  const res = searched ? search(t) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A tiny hash table uses linear probing: a key that finds its slot taken moves to the next one. A, B and C all hash to slot 1 and sit in slots 1, 2, 3. You delete B by emptying slot 2. Now you search for C. What happens?",
        options: ["C is found in slot 3", "The search says C is not there", "The search finds B"],
        answer: 1,
      }}
      exploreHint="Delete B, search for C, then flip how the delete is done."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Emptying slot 2 made your search stop there: C, one slot further, was not found. With a gone marker, the
            same search kept going and found C in slot 3.
          </p>
          <p>
            A search treats an empty slot as <strong>the run ends here</strong>. Emptying B&apos;s slot breaks that for
            every key stored past it. A marker says <strong>keep looking</strong>.
          </p>
          <p className="muted">Markers pile up and slow searches, so tables get rebuilt now and then.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["missed-after-empty", "found-past-marker"]}>
          {(reach) => {
            const run = (d: boolean, m: Mode) => {
              const r = search(table(d, m));
              setSearched(true);
              setLogs((l) => [...l, line(d, m, r)]);
              if (d && m === "empty" && r.stop !== null && r.found === null) reach("missed-after-empty");
              if (d && m === "marker" && r.found !== null && r.passedGone) reach("found-past-marker");
            };
            const del = () => {
              if (locked || deleted) return;
              setDeleted(true);
              setSearched(false);
            };
            const doSearch = () => {
              if (locked) return;
              run(deleted, mode);
            };
            const flip = () => {
              if (locked) return;
              const m: Mode = mode === "empty" ? "marker" : "empty";
              setMode(m);
              if (deleted && searched) run(true, m);
            };

            const lastLines = logs.slice(-2);
            const stopSlot = res?.stop ?? null;
            const foundSlot = res?.found ?? null;
            const probes = res?.probes ?? [];

            return (
              <div className={s.wrap}>
                <p className={s.rule}>A, B, C all hash to slot 1.</p>
                <svg
                  viewBox="0 0 360 150"
                  className="stage-svg"
                  role="img"
                  aria-label={`Slots 0 to 7: ${t.map((v, i) => `${i} ${v ?? "empty"}`).join(", ")}`}
                >
                  <defs>
                    <pattern id="gone-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="6" height="6" fill="var(--bg-2)" />
                      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <text x={X(1) + 20} y={12} textAnchor="middle" className={s.small}>
                    hash → 1
                  </text>
                  {t.map((v, i) => {
                    const isStop = stopSlot === i;
                    const isFound = foundSlot === i;
                    return (
                      <g key={i}>
                        <rect
                          x={X(i)}
                          y={56}
                          width={40}
                          height={56}
                          rx={6}
                          fill={v === "gone" ? "url(#gone-hatch)" : "var(--bg-2)"}
                          stroke={isStop ? "var(--bad)" : isFound ? "var(--good)" : "var(--line)"}
                          strokeWidth={isStop || isFound ? 3 : 1}
                        />
                        {v && v !== "gone" && (
                          <text x={X(i) + 20} y={90} textAnchor="middle" className={s.key}>
                            {v}
                          </text>
                        )}
                        {v === "gone" && (
                          <text x={X(i) + 20} y={88} textAnchor="middle" className={s.gone}>
                            gone
                          </text>
                        )}
                        <text x={X(i) + 20} y={127} textAnchor="middle" className={s.small}>
                          {i}
                        </text>
                      </g>
                    );
                  })}
                  {probes.map((p, k) => {
                    const cx = X(p.slot) + 20;
                    const prev = k > 0 ? X(probes[k - 1].slot) + 20 : null;
                    return (
                      <g key={k}>
                        {prev !== null && (
                          <path
                            d={`M ${prev} 50 Q ${(prev + cx) / 2} 22 ${cx} 50`}
                            fill="none"
                            stroke="var(--fg)"
                            strokeWidth={1.5}
                          />
                        )}
                        <circle cx={cx} cy={46} r={8} fill="var(--fg)" />
                        <text x={cx} y={50} textAnchor="middle" className={s.hop}>
                          {k + 1}
                        </text>
                      </g>
                    );
                  })}
                  {stopSlot !== null && (
                    <text x={X(stopSlot) + 20} y={144} textAnchor="middle" className={s.stop}>
                      stop: empty
                    </text>
                  )}
                  {foundSlot !== null && (
                    <text x={X(foundSlot) + 20} y={144} textAnchor="middle" className={s.ok}>
                      C ✓
                    </text>
                  )}
                </svg>
                <div className={s.log} aria-live="polite">
                  {lastLines.length === 0 ? <p>Search C: ?</p> : lastLines.map((l, i) => <p key={i}>{l}</p>)}
                </div>
                <Row>
                  <Control className={s.tap} disabled={locked || deleted} onClick={del}>
                    {deleted ? "B deleted" : "Delete B"}
                  </Control>
                  <Control className={s.tap} disabled={locked} onClick={doSearch}>
                    Search C
                  </Control>
                </Row>
                <Row>
                  <Control
                    className={`${s.tap} ${s.wide} active`}
                    aria-pressed={mode === "marker"}
                    disabled={locked}
                    onClick={flip}
                  >
                    {mode === "empty" ? "Delete by: emptying the slot" : "Delete by: leaving a gone marker"}
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
