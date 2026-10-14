"use client";

// One circle of 20 keys, two rules for which server holds each key. Under "key mod n" the server is k mod n
// (A = 0, B = 1, ...). On the "Ring" a key belongs to the next server clockwise. Adding server E repaints the
// letters: under mod 16 discs change, scattered all round; on the ring 4 adjacent discs change, all to E.
// The ring is a DESIGNED layout, not a hash (disclosed in claim c2): key k sits at k/20 of the circle,
// A, B, C, D sit just after keys 4, 9, 14, 19, and E just after key 3, so E takes an even fifth (keys 0-3)
// from its neighbour A. One representation: the circle; the two-row table is a readout of what was pressed.
// v2: the question counts keys that MOVE (as every readout does); Add and Remove are separate buttons that keep
// their labels, in the order Add E, key mod n, Ring, Remove E, so one press each records both counts.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Mode = "mod" | "ring";
const KEYS = Array.from({ length: 20 }, (_, k) => k);
const LETTERS = ["A", "B", "C", "D", "E"] as const;
// Positions on the ring, in key units (key k sits at k).
const RING_POS: Record<string, number> = { A: 4.5, B: 9.5, C: 14.5, D: 19.5, E: 3.5 };
// Five categorical hues; every disc also carries its letter, so colour is never the only cue.
const HUE: Record<string, string> = { A: "#3b8fd9", B: "#e69f00", C: "#2aa876", D: "#c46aa0", E: "#d9534f" };

function owner(mode: Mode, withE: boolean, k: number): string {
  const n = withE ? 5 : 4;
  if (mode === "mod") return LETTERS[k % n];
  let best = "A";
  let bd = Infinity;
  for (const L of LETTERS.slice(0, n)) {
    const d = (((RING_POS[L] - k) % 20) + 20) % 20; // clockwise distance to the server
    if (d < bd) {
      bd = d;
      best = L;
    }
  }
  return best;
}
const owners = (mode: Mode, withE: boolean) => KEYS.map((k) => owner(mode, withE, k));

const C = 185;
const R_DISC = 130;
const R_RING = 160;
const ang = (p: number) => -Math.PI / 2 + (p / 20) * 2 * Math.PI;
const at = (p: number, r: number) => ({ x: C + r * Math.cos(ang(p)), y: C + r * Math.sin(ang(p)) });
function arc(p0: number, p1: number, r: number) {
  const a = at(p0, r);
  const b = at(p1, r);
  const span = (((p1 - p0) % 20) + 20) % 20;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${span > 10 ? 1 : 0} 1 ${b.x} ${b.y}`;
}

type Change = { moved: number[]; was: Record<number, string> };

export default function NewServerMovesFewKeys({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("mod");
  const [withE, setWithE] = useState(false);
  const [change, setChange] = useState<Change>({ moved: [], was: {} });
  const [table, setTable] = useState<Partial<Record<Mode, number>>>({});

  const now = owners(mode, withE);
  const n = withE ? 5 : 4;
  const servers = LETTERS.slice(0, n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Keys sit on 4 servers by (key mod 4). A fifth server is added, so it is now (key mod 5). Of 20 consecutive key numbers, how many move to a different server?",
        options: ["4", "10", "16"],
        answer: 2,
      }}
      exploreHint="Add server E, then try the same on the ring."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {table.mod !== undefined
              ? `Under key mod n, adding E moved ${table.mod} of your 20 keys: only 0 to 3 kept their server.`
              : "Under key mod n, adding E moves 16 of the 20 keys."}{" "}
            {table.ring !== undefined
              ? `On the ring it moved ${table.ring}, all to E, all from its neighbour A.`
              : ""}
          </p>
          <p>
            On a ring a key belongs to the next server clockwise, so a new server only takes keys from the one after
            it. A formula like key mod n reassigns nearly every key when n changes.
          </p>
          <p>
            Here E&apos;s spot was picked to give it an even fifth. With hashed spots, 1,000 per server, and 20,000
            keys, about 20% moved, all to E: about 1/n. This is consistent hashing (Karger and others, 1997).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["mod-moved", "ring-moved"]}>
          {(reach) => {
            const record = (m: Mode, count: number) => {
              setTable((t) => ({ ...t, [m]: count }));
              reach(m === "mod" ? "mod-moved" : "ring-moved");
            };
            const diff = (m: Mode, fromE: boolean, toE: boolean): Change => {
              const a = owners(m, fromE);
              const b = owners(m, toE);
              const moved = KEYS.filter((k) => a[k] !== b[k]);
              return { moved, was: Object.fromEntries(moved.map((k) => [k, a[k]])) };
            };
            const setE = (to: boolean) => {
              if (locked || to === withE) return;
              const c = diff(mode, withE, to);
              setWithE(to);
              setChange(c);
              if (to) record(mode, c.moved.length);
            };
            const pick = (m: Mode) => {
              if (locked || m === mode) return;
              setMode(m);
              if (withE) {
                const c = diff(m, false, true);
                setChange(c);
                record(m, c.moved.length);
              } else {
                setChange({ moved: [], was: {} });
              }
            };

            const movedSet = new Set(change.moved);
            const allToE = change.moved.length > 0 && change.moved.every((k) => now[k] === "E");
            const label =
              mode === "ring"
                ? `Ring, ${n} servers${change.moved.length ? `: ${change.moved.length} of 20 keys moved${allToE ? ", all to E" : ""}` : ""}`
                : `Key mod ${n}${change.moved.length ? `: ${change.moved.length} of 20 keys moved` : ""}`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  {mode === "mod"
                    ? `Server = key mod n (A=0, B=1, …). n = ${n}.`
                    : "Ring: the circle is now spots. Each key goes to the next server clockwise."}
                </p>
                <svg viewBox="0 0 370 370" className={`stage-svg ${s.circle}`} role="img" aria-label={label}>
                  {mode === "ring" && (
                    <g>
                      <circle cx={C} cy={C} r={R_RING} fill="none" stroke="var(--line)" strokeWidth={2} />
                      {servers.map((L) => {
                        // the arc a server owns runs from the previous server (anticlockwise) to it
                        const others = servers.filter((o) => o !== L).map((o) => RING_POS[o]);
                        const p = RING_POS[L];
                        const prev = others.reduce((best, q) => {
                          const d = (((p - q) % 20) + 20) % 20;
                          const bd = (((p - best) % 20) + 20) % 20;
                          return d < bd ? q : best;
                        }, others[0]);
                        return (
                          <path
                            key={L}
                            d={arc(prev, p, R_RING)}
                            fill="none"
                            stroke={HUE[L]}
                            strokeOpacity={0.45}
                            strokeWidth={10}
                          />
                        );
                      })}
                      {servers.map((L) => {
                        const p = RING_POS[L];
                        const a = at(p, R_RING - 9);
                        const b = at(p, R_RING + 9);
                        const t = at(p, R_RING + 19);
                        return (
                          <g key={L}>
                            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--fg)" strokeWidth={3} />
                            <text x={t.x} y={t.y + 5} textAnchor="middle" className={s.server}>
                              {L}
                            </text>
                          </g>
                        );
                      })}
                      <defs>
                        <marker id="nsArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
                        </marker>
                      </defs>
                      <path d={arc(16, 19, 52)} fill="none" stroke="var(--muted)" strokeWidth={2} opacity={0.7} markerEnd="url(#nsArrow)" />
                    </g>
                  )}
                  {KEYS.map((k) => {
                    const p = at(k, R_DISC);
                    const L = now[k];
                    const mv = movedSet.has(k);
                    const g = at(k, R_DISC - 30);
                    return (
                      <g key={k}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={16}
                          className={s.disc}
                          style={{
                            fill: `color-mix(in srgb, ${HUE[L]} 45%, var(--bg-2))`,
                            transitionDelay: `${k * 15}ms`,
                          }}
                          stroke={mv ? "var(--bad-fill)" : "var(--line)"}
                          strokeWidth={mv ? 3 : 1}
                        />
                        <text x={p.x} y={p.y - 2} textAnchor="middle" className={s.key}>
                          {k}
                        </text>
                        <text x={p.x} y={p.y + 12} textAnchor="middle" className={s.letter}>
                          {L}
                        </text>
                        {mv && (
                          <text x={g.x} y={g.y + 4} textAnchor="middle" className={s.ghost}>
                            {change.was[k]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <div className={s.table} role="group" aria-label="Keys moved by adding E">
                  <span className={s.th}>key mod n:</span>
                  <span className={`${s.td} ${table.mod !== undefined ? s.on : ""}`}>
                    {table.mod !== undefined ? table.mod : "?"} of 20 moved
                  </span>
                  <span className={s.th}>Ring:</span>
                  <span className={`${s.td} ${table.ring !== undefined ? s.on : ""}`}>
                    {table.ring !== undefined ? table.ring : "?"} of 20 moved
                  </span>
                </div>
                <Row>
                  <Control className={`tap ${withE ? "active" : ""}`} disabled={locked || withE} onClick={() => setE(true)}>
                    Add server E
                  </Control>
                  <span className={s.lab}>Scheme</span>
                  <Control
                    className={`tap ${mode === "mod" ? "active" : ""}`}
                    disabled={locked || mode === "mod"}
                    onClick={() => pick("mod")}
                  >
                    key mod n
                  </Control>
                  <Control
                    className={`tap ${mode === "ring" ? "active" : ""}`}
                    disabled={locked || mode === "ring"}
                    onClick={() => pick("ring")}
                  >
                    Ring
                  </Control>
                  <Control className="tap" disabled={locked || !withE} onClick={() => setE(false)}>
                    Remove server E
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
