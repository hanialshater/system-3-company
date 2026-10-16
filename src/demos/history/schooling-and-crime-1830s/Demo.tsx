"use client";

// History: literacy and recorded crime across Guerry's 86 French departments. history-data.mjs: guerry
// (HistData Guerry.csv, sha256 13f9ff6a…; Literacy = percent of military conscripts who can read and write;
// Crime_prop, Crime_pers = population per crime against property / persons, Compte général 1825-1830).
// Brief: company/domains/briefs/history.md #24 (amended 2026-10-16, cultural wording edits); numbers: section 24
// of history-cycle2-check.mjs.
//
// RAW below is [Literacy, Crime_prop, Crime_pers] for every row of the file, in file order, copied unchanged.
// Every number on the stage and in the reveal is computed from it with the check script's formulas:
// crimes per 100,000 = 100,000 / population per crime; quarters = the 21 lowest and 21 highest after a stable
// sort by Literacy in file order (ties at 25% are split by file order, as in the script); means are unweighted
// means of departments; r is Pearson's across all 86.
// Care (brief + cultural look): no department or region is named; quarters and dots are labelled by number only.
// Locked stage: panel heads and quarter literacy only, no bars and no values ("?").
// Milestones: lo, hi, pers (the brief gated lo and hi; pers is added because the reveal quotes 5.9 for both).
// The scatter ("All 86 departments") is optional; when the reveal opens on it, the stage returns to the bars,
// which are what the reveal quotes. No Reset.

import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RAW: [number, number, number][] = [
  [37,15890,28870],[51,5521,26226],[13,7925,26747],[46,7289,12935],[69,8174,17488],[27,10263,9474],[67,8847,35203],
  [18,9597,6173],[59,4086,19602],[34,10431,15647],[31,6731,8236],[38,5291,13409],[52,4500,17577],[31,11645,18070],
  [36,13018,24964],[39,5357,18712],[13,10503,21934],[12,12949,15262],[60,9159,32256],[16,7050,28607],[23,20235,37014],
  [18,10237,21585],[73,5914,11560],[42,7759,13396],[51,4774,14795],[54,4016,21368],[15,6842,29872],[40,7990,13115],
  [31,7204,18642],[38,10486,18642],[40,7423,24096],[45,10954,12814],[25,6524,22138],[17,7624,32404],[27,6909,19131],
  [29,8326,18785],[73,8059,26221],[28,6170,17687],[27,6017,21292],[29,12665,27491],[21,18043,16170],[24,9392,19314],
  [42,5042,17722],[24,9049,5883],[31,8943,22969],[27,5990,7710],[23,8520,29692],[43,7424,31078],[63,4950,15602],
  [72,9539,26231],[19,9198,28331],[68,6831,26674],[74,9190,24507],[14,7940,23316],[57,4529,12153],[20,8236,25087],
  [45,6175,26740],[54,6659,28180],[45,8248,28329],[49,4040,23101],[19,12141,17256],[47,8533,16722],[53,9797,12223],
  [31,7632,6728],[62,4920,12309],[71,4915,7343],[45,4504,18793],[59,7770,22339],[32,10708,28391],[30,8294,33913],
  [71,1368,13945],[43,2906,18355],[54,5786,22201],[56,3879,12477],[41,6863,18400],[44,7144,33592],[20,6241,13019],
  [25,8680,14790],[23,9572,13145],[37,5731,13576],[28,7566,20827],[25,4710,15010],[13,6402,16256],[62,9044,18835],
  [47,6516,18006],[49,4589,2199],
];

type Dept = { i: number; lit: number; prop: number; pers: number };
const G: Dept[] = RAW.map(([lit, cp, cq], i) => ({ i, lit, prop: 1e5 / cp, pers: 1e5 / cq }));
const r1 = (x: number) => Number(x.toFixed(1));
const mean = (a: number[]) => a.reduce((t, x) => t + x, 0) / a.length;
const corr = (a: number[], b: number[]) => {
  const ma = mean(a), mb = mean(b);
  let n = 0, da = 0, db = 0;
  a.forEach((x, k) => { n += (x - ma) * (b[k] - mb); da += (x - ma) ** 2; db += (b[k] - mb) ** 2; });
  return n / Math.sqrt(da * db);
};
const SORTED = [...G].sort((a, b) => a.lit - b.lit);
const Q = Math.floor(G.length / 4); // 21
const LO = SORTED.slice(0, Q);
const HI = SORTED.slice(-Q);
const inLo = new Set(LO.map((d) => d.i));
const inHi = new Set(HI.map((d) => d.i));
const m = (rs: Dept[], k: "lit" | "prop" | "pers") => mean(rs.map((d) => d[k]));
const V = {
  loLit: Math.round(m(LO, "lit")),
  hiLit: Math.round(m(HI, "lit")),
  loP: r1(m(LO, "prop")),
  hiP: r1(m(HI, "prop")),
  x: r1(m(HI, "prop") / m(LO, "prop")),
  loQ: r1(m(LO, "pers")),
  hiQ: r1(m(HI, "pers")),
  rP: Number(corr(G.map((d) => d.lit), G.map((d) => d.prop)).toFixed(2)),
};
const f1 = (x: number) => x.toFixed(1);

const MILESTONES = ["lo", "hi", "pers"] as const;
type View = "none" | "lo" | "hi" | "pers" | "all";

const W = 340;
const H = 204;

// ---------- bars: two panels sharing one scale ----------
const BASE = 168;
const TOP = 66; // 20 per 100,000 reaches here
const bh = (v: number) => ((BASE - TOP) * v) / 20;
const PANELS = [
  { key: "lo" as const, cx: 87, head: "Least literate quarter", lit: V.loLit, p: V.loP, q: V.loQ },
  { key: "hi" as const, cx: 253, head: "Most literate quarter", lit: V.hiLit, p: V.hiP, q: V.hiQ },
];
const BW = 44;

function Bars({ view, seen }: { view: View; seen: Set<string> }) {
  const showPers = seen.has("pers");
  const both = seen.has("lo") && seen.has("hi");
  const xP = (cx: number) => cx - 28 - BW / 2;
  const xQ = (cx: number) => cx + 28 - BW / 2;
  return (
    <>
      <text x={4} y={12} className={s.title}>
        Recorded crimes per 100,000
      </text>
      <line x1={8} y1={BASE} x2={W - 8} y2={BASE} className={s.axis} />
      <rect x={10} y={BASE + 7} width={10} height={10} className={s.prop} />
      <text x={24} y={BASE + 16} className={s.tick}>
        crimes against property
      </text>
      <rect x={176} y={BASE + 7} width={10} height={10} className={s.pers} />
      <text x={190} y={BASE + 16} className={s.tick}>
        crimes against persons
      </text>
      {PANELS.map((p) => {
        const on = seen.has(p.key);
        return (
          <g key={p.key}>
            <text x={p.cx} y={32} textAnchor="middle" className={view === p.key ? s.headOn : s.head}>
              {p.head}
            </text>
            <text x={p.cx} y={46} textAnchor="middle" className={s.sub}>
              {p.lit}% literate
            </text>
            {on ? (
              <>
                <rect x={xP(p.cx)} y={BASE - bh(p.p)} width={BW} height={bh(p.p)} className={s.prop} />
                <text x={xP(p.cx) + BW / 2} y={BASE - bh(p.p) - 5} textAnchor="middle" className={s.val}>
                  {f1(p.p)}
                </text>
              </>
            ) : (
              <text x={xP(p.cx) + BW / 2} y={BASE - 8} textAnchor="middle" className={s.q}>
                ?
              </text>
            )}
            {showPers ? (
              <>
                <rect x={xQ(p.cx)} y={BASE - bh(p.q)} width={BW} height={bh(p.q)} className={s.pers} />
                <text x={xQ(p.cx) + BW / 2} y={BASE - bh(p.q) - 5} textAnchor="middle" className={s.val}>
                  {f1(p.q)}
                </text>
              </>
            ) : (
              <text x={xQ(p.cx) + BW / 2} y={BASE - 8} textAnchor="middle" className={s.q}>
                ?
              </text>
            )}
          </g>
        );
      })}
      {both && (
        <>
          <line
            x1={xP(PANELS[0].cx)}
            y1={BASE - bh(V.loP)}
            x2={xP(PANELS[1].cx) + BW}
            y2={BASE - bh(V.loP)}
            className={s.ref}
          />
          <text x={xP(PANELS[1].cx) - 4} y={BASE - bh(V.hiP) + 14} textAnchor="end" className={s.ratio}>
            ×{V.x}
          </text>
        </>
      )}
    </>
  );
}

// ---------- scatter: all 86 departments ----------
const SL = 30, SR = 330, ST = 24, SB = 170;
const sx = (lit: number) => SL + ((lit - 10) / 70) * (SR - SL);
const sy = (v: number) => SB - (v / 80) * (SB - ST);
const range = (rs: Dept[]) => [Math.min(...rs.map((d) => d.lit)), Math.max(...rs.map((d) => d.lit))];
const [loA, loB] = range(LO);
const [hiA, hiB] = range(HI);

function Scatter() {
  return (
    <>
      <text x={4} y={12} className={s.title}>
        Property crimes per 100,000 · each dot a department
      </text>
      {[0, 40, 80].map((v) => (
        <g key={v}>
          <line x1={SL} y1={sy(v)} x2={SR} y2={sy(v)} className={s.grid} />
          <text x={SL - 4} y={sy(v) + 4} textAnchor="end" className={s.tick}>
            {v}
          </text>
        </g>
      ))}
      <line x1={SL} y1={SB} x2={SR} y2={SB} className={s.axis} />
      {[20, 40, 60, 80].map((p) => (
        <text key={p} x={sx(p)} y={SB + 14} textAnchor={p === 80 ? "end" : "middle"} className={s.tick}>
          {p}%
        </text>
      ))}
      <text x={(SL + SR) / 2} y={SB + 30} textAnchor="middle" className={s.sub}>
        of conscripts who could read
      </text>
      {G.map((d) => (
        <circle
          key={d.i}
          cx={sx(d.lit)}
          cy={sy(d.prop)}
          r={2.8}
          className={inLo.has(d.i) ? s.dotLo : inHi.has(d.i) ? s.dotHi : s.dotMid}
        />
      ))}
      <line x1={sx(loA) - 3} y1={sy(V.loP)} x2={sx(loB) + 3} y2={sy(V.loP)} className={s.meanLo} />
      <text x={sx(loA)} y={sy(V.loP) - 22} className={s.val}>
        {f1(V.loP)}
      </text>
      <line x1={sx(hiA) - 3} y1={sy(V.hiP)} x2={sx(hiB) + 3} y2={sy(V.hiP)} className={s.meanHi} />
      <text x={sx(hiB) + 3} y={sy(V.hiP) - 22} textAnchor="end" className={s.val}>
        {f1(V.hiP)}
      </text>
      <text x={SL + 6} y={sy(80) + 16} className={s.ratio}>
        r = {V.rP}
      </text>
    </>
  );
}

function Stage({ locked, phase, reach }: { locked: boolean; phase: Phase; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("none");
  const [seen, setSeen] = useState<Set<string>>(new Set());
  // The reveal quotes the bars; if it opens on the scatter, show the bars again (the scatter stays one press away).
  useEffect(() => {
    if (phase === "reveal") setView((v) => (v === "all" ? "pers" : v));
  }, [phase]);
  const go = (v: Exclude<View, "none">) => {
    setView(v);
    if (v !== "all") {
      setSeen((prev) => (prev.has(v) ? prev : new Set(prev).add(v)));
      reach(v);
    }
  };
  const label =
    view === "all"
      ? `Scatter of 86 departments: literacy against property crimes per 100,000. Least literate quarter averages ${f1(V.loP)}, most literate ${f1(V.hiP)}; r = ${V.rP}.`
      : `Bars of recorded crimes per 100,000 people. Least literate quarter, ${V.loLit}% literate: property ${seen.has("lo") ? f1(V.loP) : "not shown yet"}, persons ${seen.has("pers") ? f1(V.loQ) : "not shown yet"}. Most literate quarter, ${V.hiLit}% literate: property ${seen.has("hi") ? f1(V.hiP) : "not shown yet"}, persons ${seen.has("pers") ? f1(V.hiQ) : "not shown yet"}.`;
  const PRESETS: [Exclude<View, "none">, string][] = [
    ["lo", "Least literate quarter"],
    ["hi", "Most literate quarter"],
    ["pers", "Crimes against persons"],
    ["all", "All 86 departments"],
  ];
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        {view === "all" ? <Scatter /> : <Bars view={view} seen={seen} />}
      </svg>
      <div className={s.presets}>
        <Row foldAtReveal>
          {PRESETS.map(([v, text]) => (
            <Control key={v} disabled={locked} className={view === v ? "active" : ""} onClick={() => go(v)}>
              {text}
            </Control>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default function SchoolingAndCrime1830s({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Compare the most literate quarter of Guerry's French departments with the least literate. Where were recorded property crimes per person higher?",
        options: [
          `In the least literate, about ${V.x} times as high`,
          "About equal",
          `In the most literate, about ${V.x} times as high`,
        ],
        answer: 2,
      }}
      exploreHint="Press both quarters, then crimes against persons."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The most literate quarter of departments recorded {f1(V.hiP)} property crimes per 100,000 people, against{" "}
            {f1(V.loP)} in the least literate: {V.x} times as many. Crimes against persons were the same, {f1(V.hiQ)} per
            100,000 in both. In this record, the more literate departments did not have fewer cases brought to court.
          </p>
          <p>
            Where it stops: these are cases brought to court in 1825 to 1830, which depend on policing as well as
            crime; they compare departments, not people, and two numbers moving together say nothing, alone, about
            what caused what.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} phase={phase} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
