"use client";

// tricolour-check (brief: company/domains/briefs/math.discrete.md, "Knots, batch 1", brief 2; design note
// company/reviews/tricolour-check/design.md). Tap an arc of the kit's trefoil (3_1) or figure-eight (4_1) to cycle its
// colour; each crossing shows a ring and tick when its three arcs are all one colour or all different. Check all counts
// every colouring with the kit. The plain loop (○) is a plain SVG circle with one arc.
// Picture rules (design lead, company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md): S1 draw(pd, { layout: L,
// gap: 0.5 }) on the stored layout, viewBox -8 -8 116 116, never size/margin/relax; S2 stroke 2, butt caps; T1 one
// stroke per arc (edges merged by arcs(pd).edges[k]); T3a labels >= 12 units from every crossing; ticks outside a
// ring of radius 9. Colour identity (visual designer, company/design/reviews/2026-10-16-knots-colour-ruling.md): each
// arc's label ring shows its colour's letter A, B or C, so the colours never rest on hue alone.
// QA path (contract presses controls by index, re-querying; 4 arc slots are always rendered, unused ones hidden):
// arc 1 → (B,A,A), arc 2 → (B,C,A) = trefoil3; arc 3; hidden slot skipped; ○ = loopOne; 3₁; 4₁; Check all = eightAll;
// Reset (disabled: nothing to reset on 4₁, skipped).

import { useMemo, useState, type CSSProperties } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import {
  knot,
  layout,
  draw,
  arcs,
  colourings,
  colouringOk,
  type PD,
} from "@/kit/knots";
import s from "./styles.module.css";

// Arc colour sets, one per theme: the design lead's W-1583 table (company/design/reviews/2026-10-16-knots-specs-review.md),
// from the visual designer's W-1580 sets. Index = colour, letter = LETTERS[index]: A blue (start), B vermillion,
// C yellow (dark) / grey (light). Change the sets here only.
const ARC_SETS = {
  dark: ["#56B4E9", "#D55E00", "#F0E442"],
  light: ["#0072B2", "#C24E00", "#6B6B6B"],
} as const;
const LETTERS = ["A", "B", "C"];
const colourVars = {
  ...Object.fromEntries(ARC_SETS.dark.map((c, i) => [`--arc${i}-dark`, c])),
  ...Object.fromEntries(ARC_SETS.light.map((c, i) => [`--arc${i}-light`, c])),
} as CSSProperties;

type Chip = "loop" | "3_1" | "4_1";
const CHIPS: { id: Chip; text: string; aria: string }[] = [
  { id: "loop", text: "○", aria: "Plain loop" },
  { id: "3_1", text: "3₁", aria: "Trefoil, 3₁" },
  { id: "4_1", text: "4₁", aria: "Figure-eight, 4₁" },
];
const SLOTS = 4; // the most arcs on any chip (4_1); keeps the DOM order of the controls fixed for QA
const MILESTONES = ["trefoil3", "loopOne", "eightAll"] as const;
const VB = { x: -8, w: 116 }; // S1 viewBox -8 -8 116 116

// K16 staggered cycle: arc k steps by 1 + (k mod 2), so arcs 1 and 2 tapped once each give (B,C,A).
const step = (k: number) => 1 + (k % 2);

type Pt = [number, number];
const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);

// One kit edge path is "M x y C x1 y1 x2 y2 x y".
function cubic(d: string): Pt[] {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  return [
    [n[0], n[1]],
    [n[2], n[3]],
    [n[4], n[5]],
    [n[6], n[7]],
  ];
}
function sample(c: Pt[], steps = 40): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    out.push([
      w.reduce((a, wi, j) => a + wi * c[j][0], 0),
      w.reduce((a, wi, j) => a + wi * c[j][1], 0),
    ]);
  }
  return out;
}

interface Picture {
  pd: PD;
  arcD: string[]; // one continuous path per arc (T1)
  label: Pt[]; // T3a label centre per arc
  crossings: { x: number; y: number; tick: Pt }[];
}

// Build the picture once per knot (rule 1: layout once, here inside useMemo).
function buildPicture(name: "3_1" | "4_1"): Picture {
  const pd = knot(name)!.pd;
  const L = layout(pd);
  const D = draw(pd, { layout: L, gap: 0.5 });
  const A = arcs(pd);
  const byLabel = new Map(D.edges.map((e) => [e.label, e]));
  const centres: Pt[] = D.crossings.map((c) => [c.x, c.y]);
  const arcD: string[] = [];
  const arcPts: Pt[][] = [];
  A.edges.forEach((labels) => {
    const cs = labels.map((l) => cubic(byLabel.get(l)!.d));
    // Chain the edges end to start (they meet at the over-crossings the arc passes).
    const first = cs.findIndex(
      (c) => !cs.some((o) => o !== c && dist(o[3], c[0]) < 0.05),
    );
    const order = [first < 0 ? 0 : first];
    while (order.length < cs.length) {
      const end = cs[order[order.length - 1]][3];
      const next = cs.findIndex(
        (c, i) => !order.includes(i) && dist(end, c[0]) < 0.05,
      );
      order.push(next < 0 ? cs.findIndex((_, i) => !order.includes(i)) : next);
    }
    const d = order
      .map((i, j) => {
        const [p0, p1, p2, p3] = cs[i];
        return `${j === 0 ? `M${p0[0]} ${p0[1]}` : ""}C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;
      })
      .join("");
    arcD.push(d);
    arcPts.push(order.flatMap((i) => sample(cs[i])));
  });
  // T3a: each label on its arc, as far as possible from every crossing (>= 12 units) and clear of the other arcs.
  // Labels stay >= 20 units apart, so their 44 px buttons never overlap down to a 260 px stage (20 x 260/116 = 45 px).
  const label: Pt[] = [];
  arcPts.forEach((pts, k) => {
    const others = arcPts.filter((_, j) => j !== k).flat();
    let best = pts[0];
    let score = -Infinity;
    for (const p of pts) {
      const dc = Math.min(...centres.map((c) => dist(p, c)));
      const dO = Math.min(...others.map((o) => dist(p, o)));
      const sc = Math.min(dc, 1.6 * dO);
      if (dc >= 12 && label.every((l) => dist(l, p) >= 20) && sc > score) {
        score = sc;
        best = p;
      }
    }
    label.push(best);
  });
  // Tick glyphs sit outside the crossing's ring (radius 9), where they cover no strand, label or edge of the view.
  const all = arcPts.flat();
  const crossings = centres.map(([x, y]) => {
    let tick: Pt = [x, y - 15];
    let score = -Infinity;
    for (let a = 0; a < 32; a++) {
      const t: Pt = [
        x + 15 * Math.cos((a * Math.PI) / 16),
        y + 15 * Math.sin((a * Math.PI) / 16),
      ];
      if (t[0] < -4 || t[0] > 104 || t[1] < -4 || t[1] > 90) continue;
      if (t[1] < 3 && t[0] > 50) continue; // the counter's band, top right
      const sc = Math.min(
        ...all.map((p) => dist(p, t)),
        ...label.map((l) => dist(l, t) - 3),
      );
      if (sc > score) {
        score = sc;
        tick = t;
      }
    }
    return { x, y, tick };
  });
  return { pd, arcD, label, crossings };
}

interface Census {
  total: number;
  valid: number;
  one: number;
  two: number;
  three: number;
}
// Check all: the kit's colourings(pd, 3) for the count, every assignment through colouringOk for the breakdown.
function census(pd: PD | null, n: number): Census {
  const total = 3 ** n;
  let one = 0,
    two = 0,
    three = 0;
  for (let m = 0; m < total; m++) {
    const c = Array.from({ length: n }, (_, k) => Math.floor(m / 3 ** k) % 3);
    if (pd && !colouringOk(pd, c, 3).every(Boolean)) continue;
    const used = new Set(c).size;
    if (used === 1) one++;
    else if (used === 2) two++;
    else three++;
  }
  const valid = pd ? colourings(pd, 3) : 3; // a plain loop: one arc, no crossings, 3 one-colour colourings
  return { total, valid, one, two, three };
}
const censusText = (c: Census) =>
  c.valid === c.one
    ? `${c.valid} of ${c.total} obey: all one colour`
    : `${c.valid} of ${c.total} obey: ${c.one} one colour, ${c.three} all three` +
      (c.two ? `, ${c.two} two` : "");

const INITIAL: Record<Chip, number[]> = {
  loop: [0],
  "3_1": [0, 0, 0],
  "4_1": [0, 0, 0, 0],
};

interface Seen {
  trefoil: { colours: number; ok: number; of: number } | null;
  census: Partial<Record<Chip, Census>>;
}

function Tick({ at, ok }: { at: Pt; ok: boolean }) {
  const [x, y] = at;
  return ok ? (
    <path
      d={`M${x - 3.2} ${y + 0.2}L${x - 0.9} ${y + 2.6}L${x + 3.4} ${y - 2.6}`}
      className={s.tick}
    />
  ) : (
    <path
      d={`M${x - 2.6} ${y - 2.6}L${x + 2.6} ${y + 2.6}M${x + 2.6} ${y - 2.6}L${x - 2.6} ${y + 2.6}`}
      className={s.cross}
    />
  );
}

function Stage({
  locked,
  reveal,
  interact,
  chip,
  setChip,
  cols,
  setCols,
  seen,
  setSeen,
}: {
  locked: boolean;
  reveal: boolean;
  interact: () => void;
  chip: Chip;
  setChip: (c: Chip) => void;
  cols: Record<Chip, number[]>;
  setCols: (f: (p: Record<Chip, number[]>) => Record<Chip, number[]>) => void;
  seen: Seen;
  setSeen: (f: (p: Seen) => Seen) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const pics = useMemo(
    () => ({ "3_1": buildPicture("3_1"), "4_1": buildPicture("4_1") }),
    [],
  );
  const pic = chip === "loop" ? null : pics[chip];
  const col = cols[chip];
  const ok = pic ? colouringOk(pic.pd, col, 3) : [];
  const nOk = ok.filter(Boolean).length;
  const [said, setSaid] = useState("");

  const loopLabel: Pt = [
    50 + 40 * Math.cos(-Math.PI / 4),
    50 + 40 * Math.sin(-Math.PI / 4),
  ];
  const labels: Pt[] = pic ? pic.label : [loopLabel];

  const tap = (k: number) => {
    const next = col.map((c, i) => (i === k ? (c + step(k)) % 3 : c));
    setCols((p) => ({ ...p, [chip]: next }));
    const okN = pic ? colouringOk(pic.pd, next, 3).filter(Boolean).length : 0;
    const used = new Set(next).size;
    setSaid(
      `Arc ${k + 1} is now colour ${LETTERS[next[k]]}. ` +
        (pic
          ? `Crossings OK: ${okN} of ${pic.crossings.length}.`
          : "The whole loop changed colour."),
    );
    if (chip === "3_1" && pic && used === 3 && okN === pic.crossings.length) {
      setSeen((p) =>
        p.trefoil
          ? p
          : {
              ...p,
              trefoil: { colours: used, ok: okN, of: pic.crossings.length },
            },
      );
      reach("trefoil3");
    }
    if (chip === "loop") reach("loopOne");
  };

  const checkAll = () => {
    const c = pic ? census(pic.pd, col.length) : census(null, 1);
    setSeen((p) => ({ ...p, census: { ...p.census, [chip]: c } }));
    setSaid(censusText(c));
    if (chip === "4_1") reach("eightAll");
    if (chip === "loop") reach("loopOne");
  };

  const choose = (c: Chip) => {
    setChip(c);
    setSaid("");
    // Opening the plain loop shows one arc with one label: the brief's QA path counts it (key state loopOne).
    if (c === "loop") reach("loopOne");
  };

  // Reset acts on the knot on show (so it always changes the picture); seen lines stay.
  const dirty = col.some((v) => v !== 0);
  const reset = () => {
    setCols((p) => ({ ...p, [chip]: INITIAL[chip] }));
    setSaid("Colours reset to A.");
  };

  const pct = ([x, y]: Pt) => ({
    left: `${((x - VB.x) / VB.w) * 100}%`,
    top: `${((y - VB.x) / VB.w) * 100}%`,
  });
  const census_ = seen.census[chip];
  // While exploring, the census line is the current chip's. At the reveal it is 4₁'s, the one the reveal quotes
  // (milestone eightAll), so the quoted "81" is on the stage whichever chip is open.
  const quoted = seen.census["4_1"];
  const shownCensus =
    reveal && quoted
      ? { chip: "4_1" as Chip, c: quoted }
      : census_
        ? { chip, c: census_ }
        : null;
  const ariaPic = pic
    ? `${chip === "3_1" ? "Trefoil" : "Figure-eight"}, ${col.length} arcs coloured ${col.map((c) => LETTERS[c]).join(", ")}; ${nOk} of ${pic.crossings.length} crossings obey the rule`
    : `Plain loop, one arc, colour ${LETTERS[col[0]]}`;

  return (
    <div className={s.wrap} style={colourVars}>
      <div className={s.board}>
        <svg
          viewBox="-8 -8 116 116"
          className={`stage-svg ${s.svg}`}
          role="img"
          aria-label={ariaPic}
        >
          {pic ? (
            <>
              {pic.crossings.map((c, i) => (
                <g key={`x${i}`}>
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={9}
                    className={ok[i] ? s.ringOk : s.ringBad}
                  />
                  <Tick at={c.tick} ok={ok[i]} />
                </g>
              ))}
              {pic.arcD.map((d, k) => (
                <path
                  key={`a${k}`}
                  d={d}
                  className={s.arc}
                  style={{ stroke: `var(--arc${col[k]})` }}
                />
              ))}
              {!locked &&
                pic.arcD.map((d, k) => (
                  <path
                    key={`h${k}`}
                    d={d}
                    className={s.arcHit}
                    onClick={() => tap(k)}
                    aria-hidden="true"
                  />
                ))}
            </>
          ) : (
            <>
              <circle
                cx={50}
                cy={50}
                r={40}
                className={s.arc}
                style={{ stroke: `var(--arc${col[0]})` }}
              />
              {!locked && (
                <circle
                  cx={50}
                  cy={50}
                  r={40}
                  className={s.arcHit}
                  onClick={() => tap(0)}
                  aria-hidden="true"
                />
              )}
            </>
          )}
          {labels.map(([x, y], k) => (
            <g key={`l${k}`} className={s.noHit}>
              <circle
                cx={x}
                cy={y}
                r={5.2}
                className={s.labelRing}
                style={{ stroke: `var(--arc${col[k]})` }}
              />
              <text
                x={x}
                y={y + 2.3}
                textAnchor="middle"
                className={s.labelText}
              >
                {LETTERS[col[k]]}
              </text>
            </g>
          ))}
          {/* Stage text folded into the picture's empty bands (reveal fit): the counter top right, the seen lines
              along the bottom. Strokes, labels and ticks stay above y 93 and out of the top-right band (build.md). */}
          <text x={106} y={-2} textAnchor="end" className={s.counter}>
            {pic
              ? `Crossings OK: ${nOk} of ${pic.crossings.length}`
              : "No crossings"}
          </text>
          {seen.trefoil && (
            <text x={-6} y={100} className={s.seenText}>
              Seen on 3₁: {seen.trefoil.colours} colours, {seen.trefoil.ok} of{" "}
              {seen.trefoil.of} OK
            </text>
          )}
          {shownCensus && (
            <text x={-6} y={106.2} className={s.censusText}>
              {CHIPS.find((c) => c.id === shownCensus.chip)!.text}:{" "}
              {censusText(shownCensus.c)}
            </text>
          )}
        </svg>
        {Array.from({ length: SLOTS }, (_, k) => {
          const here = k < labels.length;
          return (
            <button
              key={`b${k}`}
              type="button"
              data-qa="control"
              className={s.hit}
              style={here ? pct(labels[k]) : { display: "none" }}
              hidden={!here}
              disabled={locked || !here}
              aria-label={
                here ? `Arc ${k + 1}, colour ${LETTERS[col[k]]}` : undefined
              }
              onClick={() => tap(k)}
            />
          );
        })}
      </div>
      <p className={s.sr} aria-live="polite">
        {said}
      </p>
      {/* At the reveal the control row steps aside (precedent: math/enemy-of-my-enemy v4, W-574) so the stage top
          and the reveal's last line share a 390x844 screen. No reveal sentence names a control, and the states the
          reveal quotes are lines inside the picture. Arcs stay tappable. */}
      {!reveal && (
        <div className={`row ${s.controls}`}>
          {CHIPS.map((c) => (
            <Control
              key={c.id}
              className={`${s.chip} ${chip === c.id ? "active" : ""}`}
              disabled={locked || chip === c.id}
              aria-pressed={chip === c.id}
              aria-label={c.aria}
              onClick={() => choose(c.id)}
            >
              {c.text}
            </Control>
          ))}
          <Control
            className={s.btn}
            disabled={locked || !!census_}
            onClick={checkAll}
          >
            Check all
          </Control>
          <Control
            className={s.btn}
            disabled={locked || !dirty}
            onClick={reset}
          >
            Reset
          </Control>
        </div>
      )}
    </div>
  );
}

export default function TricolourCheck({ slug }: { slug: string }) {
  const [chip, setChip] = useState<Chip>("3_1");
  const [cols, setCols] = useState<Record<Chip, number[]>>(INITIAL);
  const [seen, setSeen] = useState<Seen>({ trefoil: null, census: {} });

  const eight = seen.census["4_1"];
  const tre = seen.trefoil;
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You are colouring a drawing of the trefoil. Rule: at each crossing, the three arcs (rope between gaps) are all one colour or all different. Can you use all three colours?",
        options: ["Yes", "No", "Only with two colours"],
        answer: 0,
      }}
      exploreHint="Tap arcs to recolour them: get all three colours on 3₁ with every crossing ticked, then open ○ and 4₁ and press Check all."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          {/* The brief's payoff text (cm-math-discrete); numbers come from the recorded milestones. */}
          <p>
            A plain loop has one arc, so it can only ever be one colour. The
            trefoil took all {tre && tre.colours !== 3 ? tre.colours : "three"}{" "}
            colours with every crossing obeying the rule. Wiggling a knot,
            without cutting, never changes whether it can be coloured this way,
            so the trefoil can never be wiggled into a plain loop.
          </p>
          <p>
            The figure-eight (4₁) failed, and all {eight ? eight.total : 81}{" "}
            ways were checked: only the{" "}
            {eight && eight.one !== 3 ? eight.one : "three"} one-colour ones
            obey the rule. That does not make it a plain loop: this test cannot
            tell the two apart.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => (
        <Stage
          locked={locked}
          reveal={phase === "reveal"}
          interact={interact}
          chip={chip}
          setChip={setChip}
          cols={cols}
          setCols={setCols}
          seen={seen}
          setSeen={setSeen}
        />
      )}
    </Lesson>
  );
}
