"use client";

// Flatten the cube to a dot. Cauchy's argument for corners − edges + faces = 2, on the cube, in a multi-card
// sequence (EDD-006, src/kit/sequence.tsx). Built from company/design/specs/flatten-the-cube-to-a-dot.md (W-2042).
//   1. Slice: one press slices the front-top-right corner; 8 − 12 + 6 = 2 becomes 10 − 15 + 7 = 2. Milestone: done.
//   2. Flatten: one press lifts the top face off (parked as a tile) and stretches the rest flat: 8 − 12 + 5 = 1.
//      Milestone: done (on the press; the 700 ms animation never races QA).
//   3. Shrink: "Remove an edge" removes the next edge in a fixed order; "Remove the rest" (after the first removal)
//      commits the remaining removals at the press and plays them at 220 ms each. Every removal takes an edge with a
//      region or a corner, so the total stays 1 down to one dot; the tile then slides back beside it.
//      Milestones: region (first removal), corner (first corner removal, press 3), dot (12th removal committed).
// The trail records each card's result once its picture has finished moving, and a strip of twelve "1" cells
// (squares where a region went, circles where a corner went) keeps "the total never moved" on the stage.

import { Lesson, type Phase } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CardSequence, SubCard } from "@/kit/sequence";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import s from "./styles.module.css";

type Pt = readonly [number, number];
type V3 = readonly [number, number, number];

const M_SLICE = ["done"] as const;
const M_FLAT = ["done"] as const;
const M_SHRINK = ["region", "corner", "dot"] as const;
const MILESTONES = M_SLICE.length + M_FLAT.length + M_SHRINK.length; // 5

// ---------- the solid (cards 1 and 2) ----------
// Vertex i of the cube is vertex i of the flat drawing: 0-3 the top face's rim (the outer square, cyclic),
// 4-7 the bottom face (the inner square), spokes i-(i+4) the four upright edges. y = 1 is the top, z = 1 the back.
const CUBE: readonly V3[] = [
  [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0],
  [0, 0, 1], [1, 0, 1], [1, 0, 0], [0, 0, 0],
];
const ALL_E: readonly (readonly [number, number])[] = [
  [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
];
const SS = 104, OX = 74, OY = 152; // oblique view, viewBox 0 0 300 174 (spec and mockup script)
const P = ([x, y, z]: V3): Pt => [OX + SS * x + 0.45 * SS * z, OY - SS * y - 0.32 * SS * z];
const HIDDEN = 4; // back-bottom-left: its corner and 3 edges are drawn faint and dashed
const CUT = 2; // front-top-right: the corner the slice takes
const T_CUT = 0.34; // the cut is about a third of the way along each edge
const CUT_NB = ALL_E.filter(([a, b]) => a === CUT || b === CUT).map(([a, b]) => (a === CUT ? b : a));
const CUT_PTS: Pt[] = CUT_NB.map((o) => P(CUBE[CUT].map((v, k) => v + (CUBE[o][k] - v) * T_CUT) as unknown as V3));
const PC = CUBE.map(P);

// ---------- the flat drawing (cards 2 and 3): copied from flatten-the-cube-to-a-dot-mockup.mjs ----------
const FP: Record<number, Pt> = { 0: [60, 8], 1: [240, 8], 2: [240, 166], 3: [60, 166], 4: [116, 52], 5: [184, 52], 6: [184, 122], 7: [116, 122] };
const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
const REGIONS: { id: string; poly: number[]; edges: Set<string> }[] = [{ id: "bottom", poly: [4, 5, 6, 7], edges: new Set() }];
for (let i = 0; i < 4; i++) {
  const j = (i + 1) % 4;
  REGIONS.push({ id: `side${i}`, poly: [i, j, j + 4, i + 4], edges: new Set() });
}
for (const r of REGIONS) r.edges = new Set(r.poly.map((v, k) => key(v, r.poly[(k + 1) % r.poly.length])));
// The spec's order: a corner goes on press 3, so the hand presses show both kinds of removal.
const ORDER: readonly (readonly [number, number])[] = [[0, 1], [3, 0], [0, 4], [1, 2], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7], [7, 4]];
const TILE: Pt = [258, 8]; // the lifted top face, parked top right (30 × 30)
const TILE_TOP: Pt[] = [[258, 8], [288, 8], [288, 38], [258, 38]]; // where top-face corners 0..3 land

interface Flat {
  V: number[];
  E: (readonly [number, number])[];
  R: string[];
  step: { a: number; b: number; kind: "region" | "corner"; gone: string | number } | null;
}
// States after 0..12 removals (recomputed as the mockup script does; the spec's table is the check).
const STATES: Flat[] = (() => {
  let V = [0, 1, 2, 3, 4, 5, 6, 7];
  let E = [...ALL_E];
  let R = REGIONS.map((r) => r.id);
  const out: Flat[] = [{ V, E, R, step: null }];
  for (const [a, b] of ORDER) {
    const k = key(a, b);
    E = E.filter(([x, y]) => key(x, y) !== k);
    const touching = R.filter((id) => REGIONS.find((r) => r.id === id)!.edges.has(k));
    let step: Flat["step"];
    if (touching.length === 1) {
      R = R.filter((id) => id !== touching[0]);
      step = { a, b, kind: "region", gone: touching[0] };
    } else {
      const deg = (v: number) => E.filter(([x, y]) => x === v || y === v).length;
      const loose = [a, b].filter((v) => deg(v) === 0)[0];
      V = V.filter((v) => v !== loose);
      step = { a, b, kind: "corner", gone: loose };
    }
    out.push({ V, E, R, step });
  }
  return out;
})();
const N_REMOVE = ORDER.length; // 12
const KINDS = STATES.slice(1).map((st) => st.step!.kind);
const DOT = STATES[N_REMOVE].V[0]; // corner 4
const TILE_END: Pt = [FP[DOT][0] + 14, FP[DOT][1] - 15];

// ---------- motion ----------
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** 0 → 1 over `ms` once `on` is true; 1 at once when `instant`. Never goes back (every chip is one-way). */
function useTween(on: boolean, ms: number, instant: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on || instant) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      setV(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, ms, instant]);
  if (!on) return 0;
  return instant ? 1 : v;
}
const lerp = (a: Pt, b: Pt, k: number): Pt => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - 2 * (1 - k) * (1 - k));
const clamp01 = (k: number) => Math.max(0, Math.min(1, k));
const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

// ---------- the lesson ----------
export default function FlattenTheCubeToADot({ slug }: { slug: string }) {
  const reduced = useReducedMotion();
  const [sliced, setSliced] = useState(false);
  const [flat, setFlat] = useState(false);
  const [n, setN] = useState(0); // removals committed
  const [shown, setShown] = useState(0); // removals presented (the playback catches up with n)
  const [ghost, setGhost] = useState<number | null>(null); // the removal flashing now (index into ORDER)
  const [rest, setRest] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A cube: 8 corners − 12 edges + 6 faces = 2. Slice one corner off. Now corners − edges + faces is…",
        options: ["less than 2", "still 2", "more than 2"],
        answer: 1,
      }}
      exploreHint="Work through the three cards: slice, flatten, shrink."
      minInteractions={MILESTONES}
      reveal={() => (
        <>
          <p>
            Slicing kept the total at 2. Then you took the top face off, flattened the cube and got 1. Each edge you removed
            took a region or a corner with it, so the total never moved, down to a single dot: 1. Put the top face back: 2.
          </p>
          <p>
            Any convex solid can be flattened and shrunk the same way, so corners − edges + faces is always 2. This is
            Euler&apos;s formula.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Stage
          phase={phase}
          locked={locked}
          interact={interact}
          reduced={reduced}
          sliced={sliced}
          onSlice={() => setSliced(true)}
          flat={flat}
          onFlat={() => setFlat(true)}
          n={n}
          shown={shown}
          ghost={ghost}
          rest={rest}
          setN={setN}
          setShown={setShown}
          setGhost={setGhost}
          setRest={setRest}
        />
      )}
    </Lesson>
  );
}

interface StageProps {
  phase: Phase;
  locked: boolean;
  interact: () => void;
  reduced: boolean;
  sliced: boolean;
  onSlice: () => void;
  flat: boolean;
  onFlat: () => void;
  n: number;
  shown: number;
  ghost: number | null;
  rest: boolean;
  setN: (n: number) => void;
  setShown: (f: (s: number) => number) => void;
  setGhost: (g: number | null) => void;
  setRest: (r: boolean) => void;
}

function Stage(p: StageProps) {
  const { phase, locked, interact, reduced, sliced, flat, n, ghost, rest } = p;
  const snap = reduced || phase === "reveal"; // the playback jumps to the end: the reveal always sees the dot
  const shown = snap ? n : p.shown;
  const playing = shown < n;

  const sliceK = useTween(sliced, 300, reduced);
  const flatK = useTween(flat, 700, reduced);
  const endK = useTween(shown === N_REMOVE, 250, reduced);

  // Playback: one removal every 220 ms until the presented count reaches the committed one.
  const { setShown, setGhost } = p;
  useEffect(() => {
    if (snap || p.shown >= n) return;
    const at = p.shown;
    const t = setTimeout(() => {
      setShown((x) => x + 1);
      setGhost(at);
    }, 220);
    return () => clearTimeout(t);
  }, [snap, p.shown, n, setShown, setGhost]);
  // Each removal flashes --warn for 120 ms and fades for 200 ms (CSS); then the ghost goes.
  useEffect(() => {
    if (ghost === null) return;
    const t = setTimeout(() => setGhost(null), 320);
    return () => clearTimeout(t);
  }, [ghost, setGhost]);

  const commitTo = (to: number, reach: (m: string) => void) => {
    const from = n;
    p.setN(to);
    p.setShown(() => from + 1);
    p.setGhost(from);
    const kinds = KINDS.slice(0, to);
    if (kinds.includes("region")) reach("region");
    if (kinds.includes("corner")) reach("corner");
    if (to === N_REMOVE) reach("dot");
  };

  const st = STATES[shown];
  const lastKind = shown > 0 ? STATES[shown].step!.kind : null;

  return (
    <CardSequence label="Flatten the cube to a dot, in three steps" phase={phase} locked={locked} interact={interact}>
      <SubCard id="slice" title="Slice" milestones={M_SLICE} trace={sliceK === 1 ? "10−15+7=2" : undefined}>
        {({ reach }) => (
          <>
            <SolidPicture slice={sliceK} />
            <Equation v={sliced ? 10 : 8} e={sliced ? 15 : 12} f={sliced ? 7 : 6} fKey="faces" changed={sliced ? "vef" : ""} />
            <p className={s.line}>{sliced ? "+2 corners, +3 edges, +1 face" : ""}</p>
            <Row>
              <Control
                className={`${s.tap} ${sliced ? "active" : ""}`}
                disabled={locked || sliced}
                onClick={() => {
                  p.onSlice();
                  reach("done");
                }}
              >
                Slice a corner
              </Control>
            </Row>
          </>
        )}
      </SubCard>

      <SubCard id="flatten" title="Flatten" milestones={M_FLAT} trace={flatK === 1 ? "8−12+5=1" : undefined}>
        {({ reach }) => (
          <>
            <FlattenPicture k={flatK} />
            <Equation v={8} e={12} f={flat ? 5 : 6} fKey={flatK === 1 ? "regions" : "faces"} changed={flat ? "ft" : ""} />
            <p className={s.line}>{flat ? "top face off: 1 short" : ""}</p>
            <Row>
              <Control
                className={`${s.tap} ${flat ? "active" : ""}`}
                disabled={locked || flat}
                onClick={() => {
                  p.onFlat();
                  reach("done");
                }}
              >
                Take the top off
              </Control>
            </Row>
          </>
        )}
      </SubCard>

      <SubCard id="shrink" title="Shrink" milestones={M_SHRINK} trace={shown === N_REMOVE ? "1−0+0=1" : undefined}>
        {({ reach }) => (
          <>
            <ShrinkPicture st={st} ghost={snap ? null : ghost} end={endK} />
            <Equation
              v={st.V.length}
              e={st.E.length}
              f={st.R.length}
              fKey="regions"
              changed={lastKind === "region" ? "ef" : lastKind === "corner" ? "ve" : ""}
            />
            <p className={s.line}>{lastKind ? `−1 edge, −1 ${lastKind}` : ""}</p>
            <p className={s.stripLabel}>total after each removal</p>
            <Strip shown={shown} />
            <p className={s.end}>{shown === N_REMOVE ? "+ the top face = 2" : ""}</p>
            <Row>
              <Control
                className={`${s.tap} ${s.chip}`}
                disabled={locked || n >= N_REMOVE || playing}
                onClick={() => commitTo(n + 1, reach)}
              >
                Remove an edge
              </Control>
              <Control
                className={`${s.tap} ${s.chip} ${rest ? "active" : ""}`}
                disabled={locked || n < 1 || n >= N_REMOVE || playing}
                onClick={() => {
                  p.setRest(true);
                  commitTo(N_REMOVE, reach);
                }}
              >
                Remove the rest
              </Control>
            </Row>
          </>
        )}
      </SubCard>
    </CardSequence>
  );
}

// ---------- the readout: one equation line ----------
function Equation({ v, e, f, fKey, changed }: { v: number; e: number; f: number; fKey: "faces" | "regions"; changed: string }) {
  const t = v - e + f;
  const c = (k: string) => `${s.num} ${changed.includes(k) ? s.changed : ""}`;
  return (
    <div className={s.eq} role="status" aria-live="polite">
      <span className={s.sr}>{`${v} corners minus ${e} edges plus ${f} ${fKey} equals ${t}`}</span>
      <span className={s.term} aria-hidden="true">
        <span className={c("v")}>{v}</span>
        <span className={s.key}>corners</span>
      </span>
      <span className={s.op} aria-hidden="true">−</span>
      <span className={s.term} aria-hidden="true">
        <span className={c("e")}>{e}</span>
        <span className={s.key}>edges</span>
      </span>
      <span className={s.op} aria-hidden="true">+</span>
      <span className={s.term} aria-hidden="true">
        <span className={c("f")}>{f}</span>
        <span className={s.key}>{fKey}</span>
      </span>
      <span className={s.op} aria-hidden="true">=</span>
      <span className={s.term} aria-hidden="true">
        <span className={c("t")}>{t}</span>
      </span>
    </div>
  );
}

// ---------- card 1: the cube and its slice ----------
function SolidPicture({ slice }: { slice: number }) {
  const k = ease(slice);
  const cutAt = CUT_PTS.map((q) => lerp(PC[CUT], q, k));
  return (
    <svg
      viewBox="0 0 300 174"
      className={`stage-svg ${s.pic}`}
      role="img"
      aria-label={
        slice > 0
          ? "The cube with one corner sliced off: a small triangle face with 3 corners and 3 edges in its place."
          : "A cube drawn as a wireframe: 8 corners and 12 edges, the hidden ones dashed."
      }
    >
      {slice > 0 && <polygon points={pts(cutAt)} className={s.cutFace} />}
      {ALL_E.map(([a, b]) => {
        const hidden = a === HIDDEN || b === HIDDEN;
        if (slice > 0 && (a === CUT || b === CUT)) {
          const o = a === CUT ? b : a;
          const q = cutAt[CUT_NB.indexOf(o)];
          return <line key={key(a, b)} x1={PC[o][0]} y1={PC[o][1]} x2={q[0]} y2={q[1]} className={s.edge} />;
        }
        return <line key={key(a, b)} x1={PC[a][0]} y1={PC[a][1]} x2={PC[b][0]} y2={PC[b][1]} className={hidden ? s.edgeHidden : s.edge} />;
      })}
      {slice > 0 && cutAt.map((q, i) => <line key={`t${i}`} x1={q[0]} y1={q[1]} x2={cutAt[(i + 1) % 3][0]} y2={cutAt[(i + 1) % 3][1]} className={s.edgeNew} />)}
      {PC.map((c, i) => (
        <circle
          key={i}
          cx={c[0]}
          cy={c[1]}
          r={3.6}
          className={i === HIDDEN ? s.dotHidden : s.dot}
          opacity={i === CUT ? 1 - k : undefined}
        />
      ))}
      {slice > 0 && cutAt.map((q, i) => <circle key={`n${i}`} cx={q[0]} cy={q[1]} r={3.6} className={s.dotNew} />)}
    </svg>
  );
}

// ---------- card 2: take the top off and stretch flat ----------
function FlattenPicture({ k }: { k: number }) {
  const ms = k * 700;
  const lift = clamp01(ms / 250); // 250 ms: the top face lifts 22 units and shrinks into the tile
  const stretch = ease(clamp01((ms - 250) / 450)); // 450 ms: the corners move to their flat places
  const pos = PC.map((c, i) => lerp(c, FP[i], stretch));
  const top = [0, 1, 2, 3].map((i) => lerp([PC[i][0], PC[i][1] - 22 * Math.min(1, 2 * lift)], TILE_TOP[i], Math.max(0, 2 * lift - 1)));
  const done = k === 1;
  return (
    <svg
      viewBox="0 0 300 174"
      className={`stage-svg ${s.pic}`}
      role="img"
      aria-label={
        done
          ? "The cube without its top face, stretched flat: a square inside a square, joined at the corners. 8 corners, 12 edges, 5 regions. The top face sits aside, top right."
          : k > 0
            ? "The top face lifts off and the rest of the cube stretches flat."
            : "A cube drawn as a wireframe: 8 corners and 12 edges, the hidden ones dashed."
      }
    >
      {stretch > 0 &&
        REGIONS.map((r) => <polygon key={r.id} points={pts(r.poly.map((v) => pos[v]))} className={s.region} opacity={stretch} />)}
      {k > 0 && <polygon points={pts(top)} className={s.tile} />}
      {ALL_E.map(([a, b]) => (
        <line
          key={key(a, b)}
          x1={pos[a][0]}
          y1={pos[a][1]}
          x2={pos[b][0]}
          y2={pos[b][1]}
          className={(a === HIDDEN || b === HIDDEN) && stretch < 0.5 ? s.edgeHidden : s.edge}
        />
      ))}
      {pos.map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r={done ? 4 : 3.6} className={i === HIDDEN && stretch < 0.5 ? s.dotHidden : s.dot} />
      ))}
    </svg>
  );
}

// ---------- card 3: remove edges down to a dot ----------
function ShrinkPicture({ st, ghost, end }: { st: Flat; ghost: number | null; end: number }) {
  const g = ghost !== null ? STATES[ghost + 1].step! : null;
  const tile = lerp(TILE, TILE_END, ease(end));
  const one = st.V.length === 1;
  return (
    <svg
      viewBox="0 0 300 174"
      className={`stage-svg ${s.pic}`}
      role="img"
      aria-label={
        one
          ? "One dot is left, with the top face beside it."
          : `The flat drawing: ${st.V.length} corners, ${st.E.length} edges, ${st.R.length} regions. The top face sits aside.`
      }
    >
      {REGIONS.filter((r) => st.R.includes(r.id)).map((r) => (
        <polygon key={r.id} points={pts(r.poly.map((v) => FP[v]))} className={s.region} />
      ))}
      {g && g.kind === "region" && (
        <polygon
          key={`gr${ghost}`}
          points={pts(REGIONS.find((r) => r.id === g.gone)!.poly.map((v) => FP[v]))}
          className={`${s.ghostRegion} ${s.flash}`}
        />
      )}
      {st.E.map(([a, b]) => (
        <line key={key(a, b)} x1={FP[a][0]} y1={FP[a][1]} x2={FP[b][0]} y2={FP[b][1]} className={s.edge} />
      ))}
      {g && <line key={`ge${ghost}`} x1={FP[g.a][0]} y1={FP[g.a][1]} x2={FP[g.b][0]} y2={FP[g.b][1]} className={`${s.ghostEdge} ${s.flash}`} />}
      {g && g.kind === "corner" && (
        <circle key={`gc${ghost}`} cx={FP[g.gone as number][0]} cy={FP[g.gone as number][1]} r={4} className={`${s.ghostDot} ${s.flash}`} />
      )}
      {st.V.map((v) => (
        <circle key={v} cx={FP[v][0]} cy={FP[v][1]} r={one ? 4 + 2 * end : 4} className={s.dot} />
      ))}
      <rect x={tile[0]} y={tile[1]} width={30} height={30} rx={3} className={s.tile} />
    </svg>
  );
}

function Strip({ shown }: { shown: number }) {
  return (
    <svg viewBox="0 0 284 20" width={284} height={20} className={s.strip} aria-hidden="true">
      {KINDS.map((kind, i) => {
        const on = i < shown;
        const x = i * 24;
        return (
          <g key={i}>
            {kind === "region" ? (
              <rect x={x + 0.75} y={0.75} width={18.5} height={18.5} rx={3} className={on ? s.cellOn : s.cellOff} />
            ) : (
              <circle cx={x + 10} cy={10} r={9.25} className={on ? s.cellOn : s.cellOff} />
            )}
            {on && (
              <text x={x + 10} y={14.2} className={s.cellText}>
                1
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
