"use client";

// A letter tree (trie) holding 10 words, then 1,000. The learner walks c, a, t down the tree by tapping letters,
// then adds 990 words with a toggle. The walk is kept and re-traced in the new tree: 3 hops either way.
// The 990 extra words are seeded invented letter strings (mulberry32, seed 1000), not a real dictionary.
// Layout: top-down. Small tree: every branch drawn. Big tree: 26 first-letter stubs, a grey fan under each
// with its word count (counted from the list); the walked path stays three rows deep.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32, randInt } from "@/kit/random";
import s from "./styles.module.css";

const START = ["cat", "car", "cap", "dog", "dot", "sun", "sea", "art", "ant", "bat"];
const WORD = "cat";

function makeWords(): string[] {
  const rng = mulberry32(1000);
  const seen = new Set(START);
  const out = [...START];
  while (out.length < 1000) {
    const len = randInt(rng, 3, 8);
    let w = "";
    for (let i = 0; i < len; i++) w += String.fromCharCode(97 + randInt(rng, 0, 25));
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }
  return out;
}
const WORDS = makeWords();
const FIRST: Record<string, number> = {};
for (const w of WORDS) FIRST[w[0]] = (FIRST[w[0]] ?? 0) + 1;
const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

// ---- small tree layout (levels 1..3 from the 10 starting words) ----
const W = 358;
const Y = [22, 76, 134, 192];
const ROOT_X = W / 2;
type TNode = { ch: string; x: number; depth: number; end: boolean; kids: TNode[]; word: string };
function buildSmall(): TNode {
  const root: TNode = { ch: "", x: 0, depth: 0, end: false, kids: [], word: "" };
  for (const w of [...START].sort()) {
    let n = root;
    for (let d = 0; d < w.length; d++) {
      let k = n.kids.find((c) => c.ch === w[d]);
      if (!k) {
        k = { ch: w[d], x: 0, depth: d + 1, end: false, kids: [], word: w.slice(0, d + 1) };
        n.kids.push(k);
      }
      n = k;
    }
    n.end = true;
  }
  let leaf = 0;
  const place = (n: TNode) => {
    if (!n.kids.length) {
      n.x = 19 + leaf * 35.5;
      leaf++;
      return;
    }
    n.kids.forEach(place);
    n.x = n.kids.reduce((a, k) => a + k.x, 0) / n.kids.length;
  };
  place(root);
  root.x = ROOT_X;
  return root;
}
const SMALL = buildSmall();
const flat = (n: TNode): TNode[] => [n, ...n.kids.flatMap(flat)];
const SMALL_NODES = flat(SMALL);
const smallAt = (prefix: string) => SMALL_NODES.find((n) => n.word === prefix)!;
const SMALL_PATH = [ROOT_X, smallAt("c").x, smallAt("ca").x, smallAt("cat").x];

// ---- big tree layout ----
const STUB_X = (i: number) => 17 + i * 13.5;
const BIG_PATH = [ROOT_X, STUB_X(2), STUB_X(2), STUB_X(2) + 20];

type Pin = { small: number; big: number };
const steps = (n: number) => `${n} step${n === 1 ? "" : "s"}`;

function Stage({ locked, phase, interact }: { locked: boolean; phase: string; interact: () => void }) {
  return (
    <Milestones interact={interact} names={["walked-small", "walked-big"]}>
      {(reach) => <Walk locked={locked} phase={phase} reach={reach} />}
    </Milestones>
  );
}

function Walk({ locked, phase, reach }: { locked: boolean; phase: string; reach: (n: string) => void }) {
  const [big, setBig] = useState(false);
  const [depth, setDepth] = useState(0); // letters the learner has walked
  const [shown, setShown] = useState(0); // letters drawn now (differs from depth only while re-tracing)
  const [busy, setBusy] = useState(false);
  const [pin, setPin] = useState<Pin>({ small: 0, big: 0 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reveal = phase === "reveal";
  const isBig = reveal ? true : big;
  const n = reveal ? 3 : shown;
  const path = isBig ? BIG_PATH : SMALL_PATH;

  const mark = (nn: number, inBig: boolean) => {
    setShown(nn);
    setPin((p) => (inBig ? { ...p, big: nn } : { ...p, small: nn }));
    if (nn === 3) reach(inBig ? "walked-big" : "walked-small");
  };
  const press = (to: number) => {
    setDepth(to);
    mark(to, big);
  };
  const toggle = () => {
    const nb = !big;
    setBig(nb);
    setShown(0);
    if (depth === 0) return;
    setBusy(true);
    for (let k = 1; k <= depth; k++) {
      timers.current.push(
        setTimeout(() => {
          mark(k, nb);
          if (k === depth) setBusy(false);
        }, 90 * k),
      );
    }
  };

  const other = isBig ? "10 words" : "1,000 words";
  const otherPin = isBig ? pin.small : pin.big;
  const pinText = locked ? "1,000 words: ?" : `${other}: ${otherPin ? steps(otherPin) : "?"}`;
  const letters = WORD.split("");

  return (
    <div className={s.wrap}>
      <p className={s.model}>One step = follow one letter down the tree.</p>
      <p className={s.readout} aria-live="polite">
        <span>Words: {isBig ? "1,000" : "10"}</span> · <span>Steps: {n}</span>
        {n === 3 ? <span className={s.good}> · cat ✓</span> : null}
      </p>
      <p className={s.pin}>{reveal ? "Your walk, 1,000 words" : pinText}</p>
      <svg
        viewBox="0 0 358 244"
        className="stage-svg"
        role="img"
        aria-label={`${isBig ? "1,000" : "10"} words. Path ${letters.slice(0, n).join(", ") || "none"}: ${n} steps${n === 3 ? ", cat found" : ""}`}
      >
        <g key={isBig ? "big" : "small"} className={s.fade}>
          {isBig ? (
            <>
              {LETTERS.map((ch, i) => {
                const x = STUB_X(i);
                return (
                  <g key={ch}>
                    <line x1={ROOT_X} y1={Y[0]} x2={x} y2={Y[1] - 8} stroke="var(--line)" />
                    <polygon points={`${x - 3},${Y[1] + 8} ${x + 3},${Y[1] + 8} ${x + 6.5},214 ${x - 6.5},214`} fill="var(--muted)" opacity={0.3} />
                    <rect x={x - 6} y={Y[1] - 8} width={12} height={16} rx={3} fill="var(--bg-2)" stroke="var(--line)" />
                    <text x={x} y={Y[1] + 3.5} textAnchor="middle" className={s.stubLetter}>
                      {ch}
                    </text>
                    <text x={x} y={226} textAnchor="middle" className={s.count}>
                      {FIRST[ch]}
                    </text>
                  </g>
                );
              })}
              <text x={W / 2} y={241} textAnchor="middle" className={s.count}>
                words under each first letter
              </text>
            </>
          ) : (
            <>
              {SMALL_NODES.filter((nd) => nd.depth > 0).map((nd) => {
                const parent = SMALL_NODES.find((p) => p.kids.includes(nd))!;
                return <line key={nd.word} x1={parent.x} y1={Y[parent.depth]} x2={nd.x} y2={Y[nd.depth]} stroke="var(--line)" strokeWidth={1.5} />;
              })}
              {SMALL_NODES.filter((nd) => nd.depth > 0).map((nd) => (
                <g key={nd.word}>
                  {nd.end ? <circle cx={nd.x} cy={Y[nd.depth]} r={15} fill="none" stroke="var(--line)" /> : null}
                  <circle cx={nd.x} cy={Y[nd.depth]} r={11} fill="var(--bg-2)" stroke="var(--line)" />
                  <text x={nd.x} y={Y[nd.depth] + 4} textAnchor="middle" className={s.nodeLetter}>
                    {nd.ch}
                  </text>
                </g>
              ))}
            </>
          )}
          <circle cx={ROOT_X} cy={Y[0]} r={6} fill="var(--bg-2)" stroke="var(--fg)" />
          {/* the walked path, on top */}
          {letters.slice(0, n).map((ch, i) => {
            const x0 = path[i];
            const y0 = Y[i];
            const x1 = path[i + 1];
            const y1 = Y[i + 1];
            const r = isBig ? 9 : 11;
            const last = i === n - 1;
            return (
              <g key={i}>
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--fg)" strokeWidth={3} />
                {i === 2 ? <circle cx={x1} cy={y1} r={r + 4} fill="none" stroke="var(--good)" strokeWidth={2} /> : null}
                <circle cx={x1} cy={y1} r={r} fill="var(--domain)" stroke="var(--fg)" strokeWidth={2} className={last ? s.pop : undefined} />
                <text x={x1} y={y1 + 4} textAnchor="middle" className={s.nodeLetterOn}>
                  {ch}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className={s.keys}>
        {letters.map((ch, i) => (
          <Control
            key={ch}
            className={`tap ${s.key}`}
            disabled={locked || reveal || busy || (i === 0 ? !(depth === 0 || depth === 3) : depth !== i)}
            onClick={() => press(i + 1)}
          >
            {ch}
          </Control>
        ))}
      </div>
      <Control className={`tap ${s.toggle} ${big ? "active" : ""}`} aria-pressed={big} disabled={locked || reveal || busy} onClick={toggle}>
        {big ? "Back to 10 words" : "Add 990 words"}
      </Control>
    </div>
  );
}

export default function TrieWordLengthNotCount({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your spell-checker stores 10 words in a letter tree. You add 990 more. How many steps does checking for \"cat\" now take?",
        options: ["About 100 times more", "About 10 times more", "The same 3 steps"],
        answer: 2,
      }}
      exploreHint="Walk c, a, t down the tree. Then add 990 words."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your walk to <strong>cat</strong> took <strong>3 steps</strong> among 10 words and <strong>3 steps</strong> among 1,000.
          </p>
          <p>
            Each step follows the next letter, so the cost is the length of the word, not how many words the tree holds. The 990
            new words grew branches beside your path; the path stayed three hops long.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} />}
    </Lesson>
  );
}
