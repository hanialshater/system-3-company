"use client";

// News comes from acquaintances. Two groups of four (circles A C D E, squares B F G H), every pair
// inside a group linked and close (K4 + K4), plus the one link A–B. Rule (strong triadic closure):
// any two of your close friends are linked. After the prediction A–B starts at the learner's
// guess ("either" starts close); its pill switches close / acquaintance. Close breaks the rule
// (A close to B and C, no B–C link: drawn red). Two check pills show the rule holding in a
// triangle (A–C–E, B–F–H). Send news: H tells its group, B tells A over A–B, A tells C, D, E.
// Hand-built to the interim network-stage rules (company/design/reviews/2026-10-14-design-lead-ncm-rulings.md §2).
// Key states: A–B seen both ways; news sent with A–B an acquaintance.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Tie = "close" | "weak";
type Check = "CE" | "FH" | null;
const W = 340;
const H = 250;
const P: Record<string, [number, number]> = {
  A: [118, 125], C: [70, 35], D: [70, 215], E: [20, 125],
  B: [222, 125], F: [270, 35], G: [270, 215], H: [320, 125],
};
const G1 = ["A", "C", "D", "E"];
const G2 = ["B", "F", "G", "H"];
const IN: [string, string][] = [];
for (const g of [G1, G2]) for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) IN.push([g[i], g[j]]);
const MILESTONES = ["both-ties", "news-over-weak"] as const;
// News hops: 0 = H tells F, G, B; 1 = B tells A; 2 = A tells C, D, E.
const HOP: Record<string, number> = { "F-H": 0, "G-H": 0, "B-H": 0, "A-B": 1, "A-C": 2, "A-D": 2, "A-E": 2 };
const NODE_HOP: Record<string, number> = { H: -1, F: 0, G: 0, B: 0, A: 1, C: 2, D: 2, E: 2 };
const TRI: Record<"CE" | "FH", string[]> = { CE: ["A-C", "A-E", "C-E"], FH: ["B-F", "B-H", "F-H"] };
const key = (a: string, b: string) => [a, b].sort().join("-");
const mid = (a: string, b: string): [number, number] => [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];
const pct = ([x, y]: [number, number]) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

export default function NewsComesFromAcquaintances({ slug }: { slug: string }) {
  const [tie, setTie] = useState<Tie | null>(null);
  const [check, setCheck] = useState<Check>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [news, setNews] = useState(false);
  const [msg, setMsg] = useState("start");

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Rule: any two of your close friends are linked. A and B both have close friends in their own groups. Their link must be…",
        options: ["a close friend", "an acquaintance", "either could be"],
        answer: 1,
      }}
      exploreHint="Switch the A–B tie with its pill, then send news."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With A–B close, the rule broke: A was close to B and to C, but B and C have no link. As an
            acquaintance, A–B broke nothing{checked.length > 0 ? ", and the triangles you checked held" : ""}.
          </p>
          <p>
            A–B could only be close if A and B had no other close friends. When people have close friends in their own
            group, the one link between two groups must be an acquaintance.
          </p>
          <p>So news from outside your group, like H&rsquo;s, reaches you over a weak tie: you saw it cross A–B.</p>
        </>
      )}
    >
      {({ locked, interact, prediction }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const start: Tie = prediction === 1 ? "weak" : "close";
            const ab: Tie | null = locked ? null : (tie ?? start);
            return (
              <Stage
                locked={locked}
                ab={ab}
                check={check}
                checked={checked}
                news={news}
                msg={locked ? "locked" : msg === "start" ? (ab ?? "locked") : msg}
                onTie={() => {
                  const next: Tie = ab === "close" ? "weak" : "close";
                  setTie(next);
                  setNews(false);
                  setMsg(next);
                  reach("both-ties");
                }}
                onCheck={(c) => {
                  const on = check === c ? null : c;
                  setCheck(on);
                  if (c && !checked.includes(c)) setChecked([...checked, c]);
                  setMsg(on ?? "start");
                }}
                onNews={() => {
                  setNews(true);
                  setMsg(ab === "weak" ? "news-weak" : "news-close");
                  if (ab === "weak") reach("news-over-weak");
                }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

const CAPTION: Record<string, string> = {
  locked: "Predict first.",
  close: "Broken: B and C, both close to A, aren't linked.",
  weak: "A–B acquaintance: the rule holds everywhere.",
  CE: "A is close to C and E: C–E exists ✓",
  FH: "B is close to F and H: F–H exists ✓",
  "news-weak": "News from H crossed the acquaintance A–B.",
  "news-close": "News crossed, but a close A–B breaks the rule.",
};

function Stage({
  locked, ab, check, checked, news, msg, onTie, onCheck, onNews,
}: {
  locked: boolean;
  ab: Tie | null;
  check: Check;
  checked: string[];
  news: boolean;
  msg: string;
  onTie: () => void;
  onCheck: (c: Check) => void;
  onNews: () => void;
}) {
  const broken = ab === "close";
  const tri = check ? TRI[check] : [];
  const line = (a: string, b: string, cls: string, k?: string, delay?: number) => (
    <line
      key={k ?? key(a, b) + cls}
      x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]}
      className={cls}
      style={delay !== undefined ? { animationDelay: `${delay * 90}ms` } : undefined}
    />
  );
  const abWord = ab === null ? "unknown" : ab === "close" ? "close" : "acquaintance";
  const label = `Two groups of four, all close inside. A–B ${abWord}${broken ? ", rule broken" : ""}${news ? ", news from H reached everyone" : ""}.`;
  const handle = (c: "CE" | "FH", a: string, b: string) => (
    <Control
      key={c}
      disabled={locked}
      className={`${s.handle} ${check === c ? s.on : ""}`}
      style={pct(mid(a, b))}
      aria-label={`Check the rule on edge ${a}–${b}`}
      aria-pressed={check === c}
      onClick={() => onCheck(c)}
    >
      <span className={s.pill}>{checked.includes(c) ? "✓" : "?"}</span>
    </Control>
  );

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Rule: any two of your close friends are linked.</p>
      <div className={s.box}>
        <svg viewBox={`0 0 ${W} ${H}`} className={s.svg} role="img" aria-label={label}>
          {tri.map((k) => {
            const [a, b] = k.split("-");
            return line(a, b, s.okTint, "t" + k);
          })}
          {broken && line("A", "B", s.badTint, "bAB")}
          {broken && line("A", "C", s.badTint, "bAC")}
          {news &&
            Object.entries(HOP).map(([k, h]) => {
              const [a, b] = k.split("-");
              return line(a, b, s.lit, "n" + k, h);
            })}
          {IN.map(([a, b]) => line(a, b, s.strong))}
          {line("A", "B", ab === null ? s.unknown : ab === "close" ? s.bridgeStrong : s.weak)}
          {broken && (
            <g>
              {line("C", "B", s.missing, "mCB")}
              <circle cx={mid("C", "B")[0]} cy={mid("C", "B")[1]} r={11} className={s.xDot} />
              <text x={mid("C", "B")[0]} y={mid("C", "B")[1] + 5} className={s.xMark}>✗</text>
            </g>
          )}
          {[...G1, ...G2].map((n) => {
            const [x, y] = P[n];
            const heard = news;
            const cls = heard ? s.heard : s.node;
            const st = heard ? { animationDelay: `${(NODE_HOP[n] + 1) * 90}ms` } : undefined;
            return (
              <g key={n}>
                {G1.includes(n) ? (
                  <circle cx={x} cy={y} r={15} className={cls} style={st} />
                ) : (
                  <rect x={x - 14} y={y - 14} width={28} height={28} rx={4} className={cls} style={st} />
                )}
                <text x={x} y={y + 5} className={heard ? s.nameOn : s.name}>{n}</text>
              </g>
            );
          })}
        </svg>
        <Control
          disabled={locked}
          className={`${s.handle} ${s.ab}`}
          style={pct(mid("A", "B"))}
          aria-label={`Edge A–B, ${abWord}. Tap to switch.`}
          aria-pressed={ab === "close"}
          onClick={onTie}
        >
          <span className={`${s.pill} ${ab === "close" ? s.pillOn : ""}`}>{ab === null ? "?" : ab === "close" ? "♥" : "♡"}</span>
        </Control>
        {handle("CE", "C", "E")}
        {handle("FH", "F", "H")}
      </div>
      <p className={s.legend} aria-hidden="true">
        <span className={s.sw}>━ ♥</span> close · <span className={s.sw}>╌ ♡</span> acquaintance · <span className={s.sw}>●</span> heard news
      </p>
      <p className={s.caption} aria-live="polite">{CAPTION[msg]}</p>
      <Row>
        <Control disabled={locked || news} className={`${s.tap} ${news ? "active" : ""}`} onClick={onNews}>
          Send news
        </Control>
      </Row>
    </div>
  );
}
