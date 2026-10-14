"use client";

// Two name tags, a and b, point at list boxes. Initially `b = a`: both names point at ONE box.
// "b = a.copy()" gives b its own box (a copy of a's items); "b = a" points b at a's box again.
// The boxes, arrows, readouts and reveal all come from `lists` and `bPoints`. Appended values are
// length + 1 so the lists stay 1, 2, 3, ...

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = [1, 2];
const MAX = 5;
const show = (xs: number[]) => `[${xs.join(", ")}]`;
const CELL = 34;
const BOX_X = 120;

type Held = { moved: "a" | "b"; other: string } | null;

export default function TwoNamesOneList({ slug }: { slug: string }) {
  // lists[0] is where a points. lists[1] is b's own list when b has been given a copy.
  const [lists, setLists] = useState<number[][]>([START, START]);
  const [bPoints, setBPoints] = useState<0 | 1>(0);
  const [log, setLog] = useState("");
  const [shared, setShared] = useState<string | null>(null); // a's list after appending via b while aliased
  const [held, setHeld] = useState<Held>(null);
  const aList = lists[0];
  const bList = lists[bPoints];
  const aliased = bPoints === 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "a = [1, 2]. Then b = a. Then b.append(3). What is a?",
        options: [show(START), show([...START, 3]), "An error"],
        answer: 1,
      }}
      exploreHint="Append through b, then give b a copy and append again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Both names pointed at one list. When you appended through b, a showed {shared ?? show([...START, 3])} too.
            {held ? ` While b had its own copy, you changed ${held.moved} and the other stayed ${held.other}.` : ""}
          </p>
          <p>
            Assigning a list copies the name, not the list: two names can point at one list, so a change through
            either shows in both. To get a separate list you must copy it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["shared", "copy-held"]}>
          {(reach) => {
            const append = (who: "a" | "b") => {
              if (locked) return;
              const idx = who === "a" ? 0 : bPoints;
              const next = lists.map((l, i) => (i === idx ? [...l, l.length + 1] : l));
              setLists(next);
              const added = next[idx][next[idx].length - 1];
              setLog(`${who}.append(${added})`);
              const other = who === "a" ? next[bPoints] : next[0];
              if (aliased) {
                if (who === "b" && !shared) setShared(show(next[0]));
                if (who === "b") reach("shared");
              } else {
                setHeld({ moved: who, other: show(other) });
                reach("copy-held");
              }
            };
            const copy = () => {
              if (locked || !aliased) return;
              setLists([lists[0], [...lists[0]]]);
              setBPoints(1);
              setLog("b = a.copy()");
            };
            const alias = () => {
              if (locked || aliased) return;
              setBPoints(0);
              setLog("b = a");
            };
            const msg = locked
              ? "Make a prediction to start."
              : log === ""
                ? "After b = a, both names point at the same list."
                : `Ran ${log}. ${aliased ? "One list, two names." : "Two lists."}`;
            const Box = ({ items, y, label }: { items: number[]; y: number; label: string }) => (
              <g aria-label={label}>
                {items.map((v, i) => (
                  <g key={i}>
                    <rect x={BOX_X + i * CELL} y={y - 16} width={CELL} height={32} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={2} />
                    <text x={BOX_X + i * CELL + CELL / 2} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--fg)">
                      {v}
                    </text>
                  </g>
                ))}
              </g>
            );
            const aY = aliased ? 70 : 50;
            const bY = aliased ? 70 : 130;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg className="stage-svg" viewBox="0 0 320 170" role="img" aria-label="Name tags a and b pointing at list boxes">
                  <defs>
                    <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                      <path d="M0 0 L8 4 L0 8 z" fill="var(--domain)" />
                    </marker>
                  </defs>
                  <g>
                    <rect x={10} y={34} width={44} height={32} rx={6} fill="var(--domain)" opacity={0.25} stroke="var(--domain)" strokeWidth={2} />
                    <text x={32} y={56} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--fg)">a</text>
                    {!locked && (
                      <>
                        <rect x={10} y={114} width={44} height={32} rx={6} fill="var(--domain)" opacity={0.25} stroke="var(--domain)" strokeWidth={2} />
                        <text x={32} y={136} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--fg)">b</text>
                      </>
                    )}
                  </g>
                  <line x1={56} y1={50} x2={BOX_X - 4} y2={locked ? 50 : aY} stroke="var(--domain)" strokeWidth={2.5} markerEnd="url(#arr)" />
                  {!locked && <line x1={56} y1={130} x2={BOX_X - 4} y2={bY} stroke="var(--domain)" strokeWidth={2.5} markerEnd="url(#arr)" />}
                  <Box items={aList} y={locked ? 50 : aY} label={`List a points at: ${show(aList)}`} />
                  {!aliased && <Box items={bList} y={bY} label={`List b points at: ${show(bList)}`} />}
                </svg>
                <Row>
                  <Readout label="a is" value={locked ? "–" : show(aList)} />
                  <Readout label="b is" value={locked ? "–" : show(bList)} />
                </Row>
                <div className={s.btns}>
                  <Control aria-label="Append to the list through b" disabled={locked || bList.length >= MAX} onClick={() => append("b")}>
                    b.append({bList.length + 1})
                  </Control>
                  <Control aria-label="Copy a into b" disabled={locked || !aliased} onClick={copy}>
                    b = a.copy()
                  </Control>
                  <Control aria-label="Append to the list through a" disabled={locked || aList.length >= MAX} onClick={() => append("a")}>
                    a.append({aList.length + 1})
                  </Control>
                  <Control aria-label="Point b at a again" disabled={locked || aliased} onClick={alias}>
                    b = a
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
