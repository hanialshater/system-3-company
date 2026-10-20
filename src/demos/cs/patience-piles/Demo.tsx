"use client";

// Patience sorting finds the longest rising run with skips. Deal 3 1 4 1 5 9 2 6 one at a time
// onto the leftmost pile whose top is not smaller; open a new pile when none fits. The number of
// piles (4) is the length of the longest rising run. Each card remembers the top of the pile to
// its left when it landed (its back-link), so tracing from a pile follows those links back and the
// links are drawn as arrows between piles.
//
// "Deal the rest" plays the remaining cards one at a time with a caption per card, so the learner
// watches the rule decide 1 onto 3, 4 to a new pile, 2 onto 4. The deal is committed at the press;
// any other press snaps the playback to the end (so "Trace" works at once).

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CARDS = [3, 1, 4, 1, 5, 9, 2, 6];
type Placed = { i: number; v: number; prev: number | null }; // prev = index of the card it points back to

function target(piles: Placed[][], v: number) {
  const k = piles.findIndex((p) => p[p.length - 1].v >= v);
  return k < 0 ? piles.length : k;
}
function place(piles: Placed[][], i: number): Placed[][] {
  const v = CARDS[i];
  const k = target(piles, v);
  const prev = k > 0 ? piles[k - 1][piles[k - 1].length - 1].i : null;
  const next = piles.map((p) => [...p]);
  if (k === piles.length) next.push([{ i, v, prev }]);
  else next[k].push({ i, v, prev });
  return next;
}
function deal(n: number) {
  let p: Placed[][] = [];
  for (let i = 0; i < n; i++) p = place(p, i);
  return p;
}
/** Caption for card i landing on the piles as they stood before it. */
function why(i: number) {
  const before = deal(i);
  const v = CARDS[i];
  const k = target(before, v);
  if (k === before.length)
    return before.length === 0 ? `${v} → a new pile (no piles yet).` : `${v} → a new pile: every top is smaller.`;
  const top = before[k][before[k].length - 1].v;
  return k === 0
    ? `${v} → pile 1: top ${top} is not smaller.`
    : `${v} → pile ${k + 1}: top ${top} is not smaller; ${before[k - 1][before[k - 1].length - 1].v} on pile ${k} was.`;
}

const STEP_MS = 900;
type Link = { x1: number; y1: number; x2: number; y2: number };

function Stage({ locked, reach, onTrace }: { locked: boolean; reach: (n: string) => void; onTrace: (run: number[]) => void }) {
  const [dealt, setDealt] = useState(0); // committed
  const [shown, setShown] = useState(0); // drawn (catches up during playback)
  const [note, setNote] = useState("");
  const [trace, setTrace] = useState<number[]>([]); // card indices of a traced run
  const [links, setLinks] = useState<Link[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const stopPlay = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stopPlay, []);

  const piles = deal(shown);
  const next = shown < CARDS.length ? CARDS[shown] : null;

  // Back-link arrows between the traced cards, measured from the rendered piles.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || trace.length < 2) {
      setLinks([]);
      return;
    }
    const o = el.getBoundingClientRect();
    const at = (i: number) => {
      const r = el.querySelector(`[data-ci="${i}"]`)?.getBoundingClientRect();
      return r ? { l: r.left - o.left, r: r.right - o.left, y: r.top - o.top + r.height / 2 } : null;
    };
    const out: Link[] = [];
    for (let k = trace.length - 1; k > 0; k--) {
      const a = at(trace[k]);
      const b = at(trace[k - 1]);
      if (a && b) out.push({ x1: a.l, y1: a.y, x2: b.r + 4, y2: b.y });
    }
    setLinks(out);
  }, [trace, shown]);

  const snap = () => {
    if (timer.current) {
      stopPlay();
      setShown(dealt);
      setNote("Every card dealt by the rule.");
    }
  };
  const commit = (n: number) => {
    setDealt(n);
    setTrace([]);
    onTrace([]);
    if (n === CARDS.length) reach("dealt-all");
  };
  const dealOne = () => {
    if (locked || dealt >= CARDS.length) return;
    snap();
    setNote(why(dealt));
    setShown(dealt + 1);
    commit(dealt + 1);
  };
  const dealAll = () => {
    if (locked || dealt >= CARDS.length) return;
    stopPlay();
    const from = dealt;
    commit(CARDS.length);
    let k = from;
    const tick = () => {
      setNote(why(k));
      setShown(k + 1);
      k += 1;
      if (k >= CARDS.length) stopPlay();
    };
    tick();
    if (k < CARDS.length) timer.current = setInterval(tick, STEP_MS);
  };
  const traceFrom = (k: number) => {
    const ps = deal(CARDS.length);
    if (k < 0 || k >= ps.length) return;
    const flat = ps.flat();
    const run: number[] = [];
    let cur: number | null = ps[k][ps[k].length - 1].i;
    while (cur !== null) {
      run.unshift(cur);
      const c: Placed = flat.find((x) => x.i === cur)!;
      cur = c.prev;
    }
    setTrace(run);
    onTrace(run);
    if (run.length === 4) reach("traced-4");
    setNote(
      run.length > 1
        ? `Pile ${k + 1} back: ${[...run].reverse().map((i) => CARDS[i]).join(" → ")}. Each arrow: the smaller top on the pile to the left when that card landed.`
        : `Pile ${k + 1} back: ${CARDS[run[0]]}. Pile 1 has no pile to its left.`,
    );
  };
  const tapPile = (k: number) => {
    if (locked) return;
    if (dealt === CARDS.length) {
      if (timer.current) snap();
      traceFrom(k);
      return;
    }
    const v = CARDS[dealt];
    const now = deal(dealt);
    const want = target(now, v);
    if (k === want) {
      setNote(why(dealt));
      setShown(dealt + 1);
      commit(dealt + 1);
    } else if (k < now.length && now[k][now[k].length - 1].v < v) {
      setNote(`${v} cannot go on ${now[k][now[k].length - 1].v}: the top must not be smaller.`);
    } else {
      setNote(`Card ${v} (${dealt + 1} of 8): the leftmost pile that fits is ${want === now.length ? "a new one" : `pile ${want + 1}`}.`);
    }
  };

  const msg = locked ? "Make a prediction to start." : note || `Next card: ${next}. Tap the pile it goes on.`;
  const slots = dealt === CARDS.length ? piles.length : piles.length + 1;

  return (
    <div className={s.wrap}>
      <div className={s.hand} aria-label="Cards to deal">
        {CARDS.map((v, i) => (
          <span key={i} className={`${s.card} ${i < shown ? s.gone : ""} ${i === shown ? s.next : ""} ${trace.includes(i) ? s.traced : ""}`}>
            {v}
          </span>
        ))}
      </div>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <Row>
        <Control className="active" disabled={locked || dealt >= CARDS.length} onClick={dealOne}>
          Deal one by the rule
        </Control>
        <Control disabled={locked || dealt >= CARDS.length} onClick={dealAll}>
          Deal the rest
        </Control>
        <Control
          disabled={locked || dealt < CARDS.length}
          onClick={() => {
            snap();
            traceFrom(deal(CARDS.length).length - 1);
          }}
        >
          Trace from last pile
        </Control>
      </Row>
      <div className={s.piles} ref={box}>
        {Array.from({ length: slots }, (_, k) => {
          const p = piles[k];
          return (
            <Control
              key={k}
              className={`${s.pile} ${p ? "" : s.empty}`}
              disabled={locked}
              aria-label={p ? (dealt === CARDS.length ? `Trace back from pile ${k + 1}` : `Put ${next} on pile ${k + 1}`) : `Put ${next} on a new pile`}
              onClick={() => tapPile(k)}
            >
              <span className={s.pileName}>{p ? `pile ${k + 1} · top` : "new"}</span>
              {p ? (
                [...p].reverse().map((c, j) => (
                  <span key={c.i} data-ci={c.i} className={`${s.pcard} ${j === 0 ? s.top : ""} ${trace.includes(c.i) ? s.traced : ""}`}>
                    {c.v}
                  </span>
                ))
              ) : (
                <span className={s.plus}>+</span>
              )}
            </Control>
          );
        })}
        {links.length > 0 && (
          <svg className={s.links} aria-hidden="true">
            <defs>
              <marker id="pp-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="var(--good)" />
              </marker>
            </defs>
            {links.map((l, k) => (
              <line key={k} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--good)" strokeWidth={2.5} markerEnd="url(#pp-head)" />
            ))}
          </svg>
        )}
      </div>
      <p className={s.count}>
        Dealt {shown} of 8 · piles <strong>{piles.length}</strong>
      </p>
    </div>
  );
}

export default function PatiencePiles({ slug }: { slug: string }) {
  const [traced, setTraced] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You are dealt 3 1 4 1 5 9 2 6 in a row. Picking cards left to right, skipping any, each must be bigger than the last. What is the longest run you can pick?",
        options: ["3", "4", "5"],
        answer: 1,
      }}
      exploreHint="Deal each card onto the leftmost pile whose top is not smaller (watch the captions), then trace back from the last pile."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            All 8 cards made <strong>4</strong> piles, and the longest rising run has 4 cards
            {traced.length === 4 ? `: you traced ${traced.map((i) => CARDS[i]).join(" ")}` : ""}. 3 4 5 9 is another, so a
            longest run need not start at the smallest card.
          </p>
          <p>
            A rising run can use at most one card from each pile, since each pile goes downward. And every card on pile k
            has an arrow back to a smaller, earlier card on pile k − 1, as your trace drew, so a run as long as the number of
            piles always exists.
          </p>
          <p className="muted">One pass of a card game measures the longest rising run.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["dealt-all", "traced-4"]}>
          {(reach) => <Stage locked={locked} reach={reach} onTrace={setTraced} />}
        </Milestones>
      )}
    </Lesson>
  );
}
