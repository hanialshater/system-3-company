"use client";

// Toy attention over three words. Word vectors: dog (1,0), man (0,1), bites (1,1).
// "bites" is the query; scores are dot products with every token (itself included); softmax gives
// weights; the summary is the weighted sum of token vectors. Position tags (toy, not the real
// sine/cosine scheme) add (0, 0), (0.5, 0), (1, 0) to tokens 1, 2, 3 before everything above.
// Deterministic, no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Vec = [number, number];
const WORD: Record<string, Vec> = { dog: [1, 0], man: [0, 1], bites: [1, 1] };
const POS: Vec[] = [
  [0, 0],
  [0.5, 0],
  [1, 0],
];
const SENTENCES = [
  ["dog", "bites", "man"],
  ["man", "bites", "dog"],
];
/** What the middle word "bites" gathers from the whole sentence. */
function summary(order: number, position: boolean): Vec {
  const toks: Vec[] = SENTENCES[order].map((w, i) => [
    WORD[w][0] + (position ? POS[i][0] : 0),
    WORD[w][1] + (position ? POS[i][1] : 0),
  ]);
  const q = toks[1];
  const scores = toks.map((k) => q[0] * k[0] + q[1] * k[1]);
  const mx = Math.max(...scores);
  const e = scores.map((v) => Math.exp(v - mx));
  const z = e.reduce((a, b) => a + b, 0);
  const a = e.map((v) => v / z);
  return [0, 1].map((d) => toks.reduce((t, k, i) => t + a[i] * k[d], 0)) as Vec;
}
// MODEL END

const f2 = (v: number) => v.toFixed(2);
const vec = (v: Vec) => `(${f2(v[0])}, ${f2(v[1])})`;
const sentence = (order: number) => SENTENCES[order].join(" ");
const key = (order: number, pos: boolean) => `${order}-${pos ? "on" : "off"}`;

// plane geometry
const OX = 48;
const OY = 238;
const U = 86;
const px = (x: number) => OX + x * U;
const py = (y: number) => OY - y * U;

export default function DogBitesManTwice({ slug }: { slug: string }) {
  const [order, setOrder] = useState(0);
  const [pos, setPos] = useState(false);
  const [seen, setSeen] = useState<string[]>([key(0, false)]);

  const noPos = summary(0, false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy vectors: dog (1, 0), man (0, 1), bites (1, 1). "bites" gathers a summary of its sentence: a blend of the word arrows, weighted by attention. With no position information, is the summary the same in "dog bites man" and "man bites dog"?`,
        options: ["Yes, identical", "No, it differs with word order", "Only if the sentence is longer"],
        answer: 0,
      }}
      exploreHint="Swap the end words, then turn position tags on."
      minInteractions={2}
      reveal={() => {
        return (
          <>
            <p>
              With no position tags, both orders gave the summary {vec(noPos)}. In this toy, attention sees which words are
              present, not where.
            </p>
            <p>
              With tags on, “{sentence(0)}” gave {vec(summary(0, true))} and “{sentence(1)}” gave {vec(summary(1, true))}: the
              arrows differ.
            </p>
            <p>Position tags are what let order change the answer. Real transformers add them too; this toy's tags are simpler.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["swapped", "position-on"]}>
          {(reach) => {
            const visit = (o: number, p: boolean) => {
              const next = seen.includes(key(o, p)) ? seen : [...seen, key(o, p)];
              setSeen(next);
              if (o === 1) reach("swapped");
              if (p) reach("position-on");
            };
            const swap = () => {
              const o = 1 - order;
              setOrder(o);
              visit(o, pos);
            };
            const toggle = () => {
              const p = !pos;
              setPos(p);
              visit(order, p);
            };
            const cur = summary(order, pos);
            const trail = seen.map((k) => ({ k, v: summary(Number(k[0]), k.endsWith("on")) }));
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy vectors</span>
                <p className={s.caption}>Blue arrow: the summary “bites” gathers. Rings: summaries you have seen.</p>
                <svg viewBox="0 0 320 262" className="stage-svg" role="img" aria-label={`Sentence ${sentence(order)}, position tags ${pos ? "on" : "off"}`}>
                  <defs>
                    <marker id="dbm-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--domain)" />
                    </marker>
                  </defs>
                  {SENTENCES[order].map((w, i) => (
                    <g key={i}>
                      <rect x={14 + i * 100} y={6} width={92} height={28} rx={8} fill="var(--bg-2)" stroke={w === "bites" ? "var(--domain)" : "var(--muted)"} strokeWidth={2} />
                      <text x={60 + i * 100} y={25} textAnchor="middle" className={s.small} fill="var(--fg)">
                        {w}
                        {pos ? ` #${i + 1}` : ""}
                      </text>
                    </g>
                  ))}
                  <line x1={OX} y1={OY} x2={px(2)} y2={OY} stroke="var(--line)" strokeWidth={1.5} />
                  <line x1={OX} y1={OY} x2={OX} y2={py(2)} stroke="var(--line)" strokeWidth={1.5} />
                  {[1, 2].map((t) => (
                    <g key={t}>
                      <text x={px(t)} y={OY + 13} textAnchor="middle" className={s.tiny} fill="var(--muted)">{t}</text>
                      <text x={OX - 8} y={py(t) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">{t}</text>
                    </g>
                  ))}
                  {Object.entries(WORD).map(([w, v]) => (
                    <g key={w}>
                      <circle cx={px(v[0])} cy={py(v[1])} r={4} fill="var(--muted)" />
                      <text x={px(v[0]) + 7} y={py(v[1]) - 6} className={s.tiny} fill="var(--muted)">{w}</text>
                    </g>
                  ))}
                  {!locked && (
                    <>
                      {trail.map((t) => (
                        <circle key={t.k} cx={px(t.v[0])} cy={py(t.v[1])} r={5} fill="none" stroke="var(--fg)" strokeWidth={1.5} opacity={0.5} />
                      ))}
                      <line x1={OX} y1={OY} x2={px(cur[0])} y2={py(cur[1])} stroke="var(--domain)" strokeWidth={3.5} markerEnd="url(#dbm-head)" />
                    </>
                  )}
                </svg>
                <Row>
                  <Control disabled={locked} onClick={swap}>Swap dog and man</Control>
                  <Control className={pos ? "active" : ""} disabled={locked} onClick={toggle}>
                    Position tags: {pos ? "on" : "off"}
                  </Control>
                </Row>
                <Row>
                  {[0, 1].map((o) => (
                    <Readout key={o} label={sentence(o)} value={locked ? "–" : vec(summary(o, pos))} />
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
