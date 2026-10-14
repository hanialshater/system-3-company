"use client";

// The tie between two groups (slug news-comes-from-acquaintances). Two groups of four (circles
// A C D E, squares B F G H), every pair inside a group tied and close (K4 + K4), plus the one tie
// A–B. Rule (strong triadic closure): two people you're close to must have a tie.
// v2: after the prediction A–B always starts close, so every learner (and the QA path) sees the
// rule break first (A close to B and C, no B–C tie: drawn red). DOM order is C–E check, F–H check,
// A–B pill (close / acquaintance), Send news: the scripted path photographs the broken state at the
// two checks, then switches A–B to an acquaintance and sends news over it.
// Send news: H tells its group, B tells A over A–B, A tells C, D, E.
// Hand-built to the interim network-stage rules (company/design/reviews/2026-10-14-design-lead-ncm-rulings.md §2).
// Legend and A–B pill use inline SVG swatches drawn with the stage's own classes (no glyph fonts).

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
          "Every tie is close or an acquaintance. A and B each have close ties in their group. Under the rule, their tie A–B must be…",
        options: ["an acquaintance", "close", "either could be"],
        answer: 0,
      }}
      exploreHint="Check the triangles, switch A–B with its pill, then send news."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With A–B close, the rule broke: A was close to B and to C, but B and C had no tie. As an
            acquaintance, A–B broke nothing{checked.length > 0 ? ", and the triangles you checked held" : ""}.
          </p>
          <p>
            The same break hits D and E, and on B&rsquo;s side F, G and H. So while A or B has a close friend in their
            own group, the one tie between the groups must be an acquaintance.
          </p>
          <p>
            News from outside your group, like H&rsquo;s, comes in over that tie: you saw it reach A&rsquo;s group
            across the acquaintance A–B.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const ab: Tie | null = locked ? null : (tie ?? "close");
            const shown = locked
              ? "locked"
              : msg === "start"
                ? (ab ?? "locked")
                : msg === "CE" || msg === "FH"
                  ? `${msg}-${ab}`
                  : msg;
            return (
              <Stage
                locked={locked}
                ab={ab}
                check={check}
                checked={checked}
                news={news}
                msg={shown}
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
  close: "Broken: A's close friends B, C have no tie.",
  weak: "A–B is an acquaintance: the rule holds everywhere.",
  "CE-weak": "A is close to C and E: C–E tie ✓",
  "FH-weak": "B is close to F and H: F–H tie ✓",
  "CE-close": "C–E tie ✓, but no B–C tie ✗",
  "FH-close": "F–H tie ✓, but still no B–C tie ✗",
  "news-weak": "H's news reached A's group over the acquaintance A–B.",
  "news-close": "News crossed, but a close A–B breaks the rule.",
};

// Legend and pill marks, drawn with the stage's own classes (design review: swatches, not glyphs).
function Swatch({ kind }: { kind: Tie | "heard" }) {
  return (
    <svg className={s.sw} width={kind === "heard" ? 14 : 22} height={14} aria-hidden="true">
      {kind === "heard" ? (
        <circle cx={7} cy={7} r={5.5} className={s.heardSw} />
      ) : (
        <line x1={0} y1={7} x2={22} y2={7} className={kind === "close" ? s.bridgeStrong : s.weak} />
      )}
    </svg>
  );
}

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
  const label = `Two groups of four, all close inside. A–B ${abWord}${broken ? ", rule broken: B and C have no tie" : ""}${news ? ", news from H reached everyone" : ""}.`;
  const handle = (c: "CE" | "FH", a: string, b: string) => (
    <Control
      key={c}
      disabled={locked}
      className={`${s.handle} ${check === c ? s.on : ""}`}
      style={pct(mid(a, b))}
      aria-label={`Check the rule on tie ${a}–${b}`}
      aria-pressed={check === c}
      onClick={() => onCheck(c)}
    >
      <span className={s.pill}>{checked.includes(c) ? "✓" : "?"}</span>
    </Control>
  );

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Rule: two people you&rsquo;re close to must have a tie.</p>
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
            const cls = news ? s.heard : s.node;
            const st = news ? { animationDelay: `${(NODE_HOP[n] + 1) * 90}ms` } : undefined;
            return (
              <g key={n}>
                {G1.includes(n) ? (
                  <circle cx={x} cy={y} r={15} className={cls} style={st} />
                ) : (
                  <rect x={x - 14} y={y - 14} width={28} height={28} rx={4} className={cls} style={st} />
                )}
                <text x={x} y={y + 5} className={news ? s.nameOn : s.name}>{n}</text>
              </g>
            );
          })}
        </svg>
        {handle("CE", "C", "E")}
        {handle("FH", "F", "H")}
        <Control
          disabled={locked}
          className={`${s.handle} ${s.ab}`}
          style={pct(mid("A", "B"))}
          aria-label={`Tie A–B, ${abWord}. Tap to switch.`}
          aria-pressed={ab === "close"}
          onClick={onTie}
        >
          <span className={`${s.pill} ${s.abPill}`}>{ab === null ? "?" : <Swatch kind={ab} />}</span>
        </Control>
      </div>
      <p className={s.legend} aria-hidden="true">
        <Swatch kind="close" /> close · <Swatch kind="weak" /> acquaintance · <Swatch kind="heard" /> heard news
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
