"use client";

// Left or right? (brief: company/domains/briefs/math.discrete.md "Knots, batch 1" #4, version B2;
// spec: company/design/specs/left-or-right.md with the design lead's L-1..L-6 and cm-math-discrete's
// W-1581 rulings; card ruling: company/engineering/reviews/2026-10-16-knots-left-or-right-card.md C1-C4.)
//
// One knot on a two-sided card. "Turn over" turns the card in 3-D: the back face is the mirror drawing
// AUTHORED ALREADY REFLECTED (PE-C1: inside translate(100 0) scale(-1 1)), so at rest the screen shows
// the knot turned over, and the marks do not change. "Mirror" reflects the card with scaleX(-1) on a
// wrapper round it (B2), shown as an opacity dip (L-2), and every mark flips. Both end on the same outline.
//
// Kit rules (src/kit/knots/README.md rules 1 and 2(a); design-lead S1, S2):
// - import only from '@/kit/knots'; `layout` once per chip (useMemo), shared by both faces (DL-C1);
// - both faces draw(..., { layout: L, gap: 0.5 }); never size, margin or relax; viewBox -8 -8 116 116;
// - turnOver is called for numbers only (the readout), never passed to draw or layout.
// Rest-state geometry, readouts and badge placement live in ./card.ts; ./card.test.mjs tests them (K21, L-1).

import { useEffect, useMemo, useRef, useState, type TransitionEvent } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { knot, layout, draw, mirror, turnOver, signs, type Drawing, type PD } from "@/kit/knots";
import { STATES, stateOf, logicalPd, placeBadges, type Badge, type RestState, type StateName } from "./card";
import s from "./styles.module.css";

type Chip = "3_1" | "4_1";
const CHIPS: { id: Chip; label: string }[] = [
  { id: "3_1", label: "Trefoil" },
  { id: "4_1", label: "Figure-eight" },
];
const FLIP_MS = 300; // DL-C3, kept by the design lead
const DIP_MS = 100; // L-2: 100 ms out, 100 ms in
const VB = "-8 -8 116 116"; // S1

type StateModel = { signs: number[]; sum: number; badges: Badge[] };
type ChipModel = { front: Drawing; back: Drawing; states: Record<StateName, StateModel> };

const fmt = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");
const word = (n: number) => (n > 0 ? "plus" : "minus");
const hand = (sum: number) => (sum < 0 ? "Left-handed" : sum > 0 ? "Right-handed" : "");

function ariaLabel(chip: Chip, st: RestState, m: StateModel): string {
  const knotName = chip === "3_1" ? "Trefoil" : "Figure-eight";
  const how = st.turned && st.mirrored ? "mirrored and turned over" : st.turned ? "turned over" : st.mirrored ? "mirrored" : "front";
  const marks = m.signs.map(word).join(", ");
  const sum = m.sum === 0 ? "Sum 0." : `Sum ${m.sum > 0 ? "plus" : "minus"} ${Math.abs(m.sum)}, ${hand(m.sum).toLowerCase()}.`;
  return `${knotName}, ${how}. Marks ${marks}. ${sum}`;
}

export type Seen = { turned?: number; mirror?: number };

function seenText(seen: Seen): string {
  const parts: string[] = [];
  if (seen.turned !== undefined) parts.push(`turned over ${fmt(seen.turned)}`);
  if (seen.mirror !== undefined) parts.push(`mirror ${fmt(seen.mirror)}`);
  return parts.length ? `Trefoil: ${parts.join(" · ")}` : "";
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Face({ D, back }: { D: Drawing; back: boolean }) {
  const c0 = D.crossings[0];
  const body = (
    <>
      {D.edges.map((e) => (
        <path key={e.label} d={e.d} className={s.strand} />
      ))}
      {/* PE-C1 probe point: crossing 0 of this face, read by company/reviews/left-or-right/c1-check.mjs. */}
      <circle cx={c0.x} cy={c0.y} r={0.5} className={s.probe} data-c1={back ? "back" : "front"} />
    </>
  );
  return (
    <svg
      viewBox={VB}
      className={`stage-svg ${s.face} ${back ? s.back : s.front}`}
      data-face={back ? "back" : "front"}
      aria-hidden="true"
      // PE-C3: the build's CSS minifier drops the -webkit- prefix from the module CSS, so it is set inline too.
      style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
    >
      {back ? <g transform="translate(100 0) scale(-1 1)">{body}</g> : body}
    </svg>
  );
}

function Stage({
  ctx,
  seen,
  record,
  onEightMirror,
}: {
  ctx: StageContext;
  seen: Seen;
  record: (key: keyof Seen, sum: number) => void;
  onEightMirror: () => void;
}) {
  const { locked } = ctx;
  const { reach } = useMilestones(ctx.interact, ["turned", "mirrored"]);
  const reduced = useReducedMotion();

  // Rule 1 / DL-C1: one stored layout per chip, computed once, shared by both faces.
  const model = useMemo(() => {
    const out = {} as Record<Chip, ChipModel>;
    for (const { id } of CHIPS) {
      const pd: PD = knot(id)!.pd;
      const L = layout(pd);
      const front = draw(pd, { layout: L, gap: 0.5 });
      const back = draw(mirror(pd), { layout: L, gap: 0.5 });
      const states = {} as Record<StateName, StateModel>;
      for (const st of STATES) {
        const sg = signs(logicalPd(st, pd, { mirror, turnOver })); // numbers only (PE-C2)
        states[st.name] = {
          signs: sg,
          sum: sg.reduce((a, b) => a + b, 0),
          badges: placeBadges(st.face === "front" ? front : back, st.reflect),
        };
      }
      out[id] = { front, back, states };
    }
    return out;
  }, []);

  const [chip, setChip] = useState<Chip>("3_1");
  const [turned, setTurned] = useState(false); // card target (drives rotateY)
  const [mirrorOn, setMirrorOn] = useState(false); // Mirror target (drives aria-pressed)
  const [wrapMirror, setWrapMirror] = useState(false); // scaleX(-1) actually on the wrapper
  const [faded, setFaded] = useState(false); // wrapper opacity 0 (the dip)
  const [rest, setRest] = useState<RestState>(STATES[0]); // what the readout, marks and label show
  const [marksHidden, setMarksHidden] = useState(false);
  const [turnedLabel, setTurnedLabel] = useState(false); // reduced motion only (DL-C3)

  const r = useRef({
    chip: "3_1" as Chip,
    turned: false,
    mirror: false, // Mirror target
    flipping: false,
    dip: "none" as "none" | "out" | "in",
    flipT: 0 as ReturnType<typeof setTimeout> | 0,
    dipT: 0 as ReturnType<typeof setTimeout> | 0,
    labelT: 0 as ReturnType<typeof setTimeout> | 0,
  });
  useEffect(() => {
    const ref = r.current;
    return () => {
      clearTimeout(ref.flipT);
      clearTimeout(ref.dipT);
      clearTimeout(ref.labelT);
    };
  }, []);

  // At rest (no flip, no dip): update the readout, marks and label, and fire milestones (L-3, L-4).
  const settle = () => {
    const x = r.current;
    if (x.flipping || x.dip !== "none") return;
    const st = stateOf(x.turned, x.mirror);
    setRest(st);
    setMarksHidden(false);
    const sum = model[x.chip].states[st.name].sum;
    if (x.chip === "3_1" && st.turned && !st.mirrored) {
      record("turned", sum);
      reach("turned");
    }
    if (x.chip === "3_1" && st.mirrored) {
      record("mirror", sum);
      reach("mirrored");
    }
    if (x.chip === "4_1" && st.mirrored) onEightMirror();
  };

  const endFlip = () => {
    const x = r.current;
    if (!x.flipping) return;
    x.flipping = false;
    clearTimeout(x.flipT);
    settle();
  };
  const dipOut = () => {
    const x = r.current;
    if (x.dip !== "out") return;
    clearTimeout(x.dipT);
    setWrapMirror(x.mirror); // at opacity 0; the wrapper transitions opacity only, so this is one unseen frame
    setFaded(false);
    x.dip = "in";
    // Rest fallback: 150 ms (out) + 100 ms (in) = the spec's 250 ms when no transitionend arrives (L-3).
    x.dipT = setTimeout(dipIn, DIP_MS);
  };
  const dipIn = () => {
    const x = r.current;
    if (x.dip !== "in") return;
    clearTimeout(x.dipT);
    x.dip = "none";
    settle();
  };

  const turnOver_ = () => {
    if (locked) return;
    const x = r.current;
    x.turned = !x.turned;
    setTurned(x.turned);
    setMarksHidden(true);
    if (reduced) {
      clearTimeout(x.labelT);
      setTurnedLabel(x.turned);
      if (x.turned) x.labelT = setTimeout(() => setTurnedLabel(false), 1000);
      settle();
      return;
    }
    x.flipping = true; // a second press mid-flip reverses the CSS transition from the current angle
    clearTimeout(x.flipT);
    x.flipT = setTimeout(endFlip, FLIP_MS + 50); // L-3 fallback
  };

  const mirror_ = () => {
    if (locked) return;
    const x = r.current;
    x.mirror = !x.mirror;
    setMirrorOn(x.mirror);
    setMarksHidden(true);
    if (reduced) {
      setWrapMirror(x.mirror);
      settle();
      return;
    }
    if (x.dip === "out") return; // mid fade-out: the new target is applied at opacity 0
    x.dip = "out";
    setFaded(true);
    clearTimeout(x.dipT);
    x.dipT = setTimeout(dipOut, DIP_MS + 50); // L-2 fallback at 150 ms
  };

  const pick = (c: Chip) => {
    if (locked) return;
    const x = r.current;
    clearTimeout(x.flipT);
    clearTimeout(x.dipT);
    clearTimeout(x.labelT);
    Object.assign(x, { chip: c, turned: false, mirror: false, flipping: false, dip: "none" });
    setChip(c);
    setTurned(false);
    setMirrorOn(false);
    setWrapMirror(false);
    setFaded(false);
    setRest(STATES[0]);
    setMarksHidden(false);
    setTurnedLabel(false);
  };

  const onCardEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === "transform") endFlip();
  };
  const onWrapEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity") return;
    if (r.current.dip === "out") dipOut();
    else if (r.current.dip === "in") dipIn();
  };

  const m = model[chip];
  const sm = m.states[rest.name];
  const seenLine = seenText(seen);

  return (
    <div className={`${s.wrapAll} ${ctx.phase === "reveal" ? s.atReveal : ""}`}>
      <p className={s.readout} role="status" aria-live="polite">
        <span>Sum {fmt(sm.sum)}</span>
        <span className={s.hand}>{hand(sm.sum) || " "}</span>
      </p>
      <p className={s.seen} data-testid="seen-line">
        {seenLine || " "}
      </p>
      <div className={s.picArea}>
        <div className={s.pic} role="img" aria-label={ariaLabel(chip, rest, sm)}>
          <div className={s.room}>
            <div className={s.box}>
              {/* Mirror wrapper: scaleX(-1) when mirrored; opacity is its only transition (L-2). It is also the
                  card's parent, so it carries the perspective (L-5). Keyed by chip: a chip change has no animation. */}
              <div
                key={chip}
                className={s.mirrorWrap}
                data-testid="mirror-wrap"
                style={{ transform: wrapMirror ? "scaleX(-1)" : "none", opacity: faded ? 0 : 1 }}
                onTransitionEnd={onWrapEnd}
              >
                <div
                  className={s.card}
                  data-testid="card"
                  style={{ transform: `rotateY(${turned ? 180 : 0}deg)` }}
                  onTransitionEnd={onCardEnd}
                >
                  <Face D={m.front} back={false} />
                  <Face D={m.back} back={true} />
                </div>
              </div>
              {/* Marks overlay: never transformed, so no glyph is mirrored (DL-C4, L-1). */}
              <svg
                viewBox={VB}
                className={`${s.marks} ${marksHidden ? s.marksHidden : ""}`}
                data-testid="marks"
                data-state={rest.name}
                aria-hidden="true"
              >
                {sm.badges.map((b) => (
                  <g key={b.i} className={s.badge}>
                    <circle cx={b.x} cy={b.y} r={4.6} />
                    <text x={b.x} y={b.y}>
                      {sm.signs[b.i] > 0 ? "+" : "−"}
                    </text>
                  </g>
                ))}
              </svg>
              {turnedLabel && <span className={s.turnedLabel}>Turned over</span>}
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Control className={turned ? "active" : ""} aria-pressed={turned} disabled={locked} onClick={turnOver_}>
          Turn over
        </Control>
        <Control className={mirrorOn ? "active" : ""} aria-pressed={mirrorOn} disabled={locked} onClick={mirror_}>
          Mirror
        </Control>
      </Row>
      <Row>
        {CHIPS.map((c) => (
          <Control
            key={c.id}
            className={chip === c.id ? "active" : ""}
            aria-pressed={chip === c.id}
            disabled={locked || chip === c.id}
            onClick={() => pick(c.id)}
          >
            {c.label}
          </Control>
        ))}
      </Row>
    </div>
  );
}

function Reveal({ eightMirror }: { eightMirror: boolean }) {
  return (
    <>
      <p>
        Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left. Mirroring
        turned every mark plus, and no wiggling gets back: the trefoil is not its own mirror image, as Max Dehn proved in 1914.
      </p>
      <p>
        {eightMirror
          ? "The figure-eight's marks summed to 0 both ways, and it is its own mirror image."
          : "The figure-eight is different: it is its own mirror image."}{" "}
        So a trefoil comes in a left and a right version, and turning one over never swaps them.
      </p>
    </>
  );
}

export default function LeftOrRight({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({});
  const [eightMirror, setEightMirror] = useState(false);
  // The seen line only grows: each segment is written once, when its milestone first fires (W-1581 ruling 4).
  const record = (key: keyof Seen, sum: number) => setSeen((p) => (p[key] !== undefined ? p : { ...p, [key]: sum }));
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A left-handed trefoil and its mirror image, the right-handed one. Can you wiggle one into the other without cutting?",
        options: ["Yes, wiggle it", "No, never", "Only by picking it up and turning it over"],
        answer: 1,
      }}
      exploreHint="Turn the card over, then mirror it. Watch the marks at each crossing."
      minInteractions={2}
      reveal={() => <Reveal eightMirror={eightMirror} />}
    >
      {(ctx) => <Stage ctx={ctx} seen={seen} record={record} onEightMirror={() => setEightMirror(true)} />}
    </Lesson>
  );
}
