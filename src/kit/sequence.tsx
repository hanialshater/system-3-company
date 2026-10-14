"use client";

// Multi-card sequence (EDD-006, company/engineering/edd/EDD-006-multi-card-sequence.md): 2-4 sub-cards
// inside the explore stage, each with its own picture and its own milestones. Predict and reveal stay
// single, so the lesson contract (src/kit/Lesson.tsx) is unchanged: this is a stage component.
//
//   <Lesson minInteractions={4} …>                       // = the sum of every sub-card's milestones
//     {({ phase, locked, interact }) => (
//       <CardSequence label="Euclid's proof" phase={phase} locked={locked} interact={interact}>
//         <SubCard id="list" title="Multiply" milestones={["listed"]} trace="6 primes">
//           {({ reach }) => <ListCard onPick={() => reach("listed")} />}
//         </SubCard>
//         <SubCard id="add" title="Add 1" milestones={["added"]} trace="30031">…</SubCard>
//       </CardSequence>
//     )}
//   </Lesson>
//
// DOM order is the QA path (tests/qa/contract.spec.ts presses the first 16 controls once each, skipping
// hidden and disabled ones): the step trail comes first and is entirely disabled when QA reaches it
// (current step and unvisited steps are disabled), then each sub-card's own controls, then its "Next"
// button. Pressing Next shows the following sub-card, whose controls are next in DOM order. So pressing
// every control once walks every sub-card. Hidden sub-cards stay mounted (state kept) and use the
// `hidden` attribute, so the contract's visibility and tap-target checks skip them.
//
// Budget: trail steps + every sub-card's controls + (sub-cards - 1) Next buttons <= 16.

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Control } from "./controls";
import type { Phase } from "./Lesson";
import s from "./sequence.module.css";

export interface SubCardContext {
  /** Mark one of this sub-card's milestones reached. Each counts once and calls the lesson's interact(). */
  reach: (name: string) => void;
  reached: (name: string) => boolean;
  /** This sub-card is the one on screen. */
  active: boolean;
  locked: boolean;
  phase: Phase;
  index: number;
  count: number;
}

export interface SubCardProps {
  /** Stable id, unique in the sequence (kebab-case). Milestones are namespaced by it. */
  id: string;
  /** One or two words: the step's name in the trail (it is stage text: counts toward the 25 words). */
  title: string;
  /** Milestones local to this sub-card. The lesson's minInteractions is the sum over all sub-cards. */
  milestones?: readonly string[];
  /**
   * The recorded result of this step, shown under its trail step once all its milestones are reached
   * (<= 12 characters, e.g. "30031"). This is the stage trace the reveal may quote from a sub-card that is
   * not on screen at the reveal (demo-standard: "the quoted state is still visible on the stage").
   */
  trace?: string;
  children: ReactNode | ((ctx: SubCardContext) => ReactNode);
}

/** Declares one sub-card. Only meaningful as a direct child of <CardSequence>, which renders it. */
export function SubCard(_props: SubCardProps): null {
  return null;
}

const SubCardCtx = createContext<SubCardContext | null>(null);

/** Inside a sub-card's subtree: the same context the render prop receives. */
export function useSubCard(): SubCardContext {
  const ctx = useContext(SubCardCtx);
  if (!ctx) throw new Error("useSubCard must be used inside a <SubCard> of a <CardSequence>");
  return ctx;
}

export interface CardSequenceProps {
  /** Accessible name of the whole sequence, e.g. "Euclid's proof in three steps". Not shown. */
  label: string;
  phase: Phase;
  locked: boolean;
  interact: () => void;
  /** Sub-card shown when the reveal opens (default: the last). The reveal may point at its picture. */
  revealCard?: string;
  children: ReactNode;
}

const SWIPE_MIN_PX = 48;
const NO_SWIPE = 'button,input,select,textarea,a[href],[data-qa="control"],[data-no-swipe]';

export function CardSequence({ label, phase, locked, interact, revealCard, children }: CardSequenceProps) {
  const cards = Children.toArray(children).filter(
    (c): c is ReactElement<SubCardProps> => isValidElement(c) && c.type === SubCard,
  );
  const n = cards.length;
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [dir, setDir] = useState<"none" | "fwd" | "back">("none");
  const [live, setLive] = useState("");
  const done = useRef(new Set<string>());
  const [, bump] = useState(0);
  const interactRef = useRef(interact);
  interactRef.current = interact;
  const focusOnShow = useRef(false);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const lastPhase = useRef(phase);

  const go = (to: number, how: "button" | "swipe") => {
    if (locked || to < 0 || to >= n || to === active) return;
    setDir(to > active ? "fwd" : "back");
    setActive(to);
    setVisited((v) => (v.has(to) ? v : new Set(v).add(to)));
    focusOnShow.current = how === "button";
    setLive(how === "swipe" ? `Step ${to + 1} of ${n}: ${cards[to].props.title}` : "");
  };

  // Focus the newly shown sub-card after a button press: the Next button that had focus is now hidden.
  useLayoutEffect(() => {
    if (!focusOnShow.current) return;
    focusOnShow.current = false;
    rootRef.current?.querySelector<HTMLElement>(`[data-subcard-index="${active}"]`)?.focus({ preventScroll: true });
  }, [active]);

  // At the reveal, show the reveal card (decided before the reveal's first paint, so nothing jumps after).
  useLayoutEffect(() => {
    const entering = phase === "reveal" && lastPhase.current !== "reveal";
    lastPhase.current = phase;
    if (!entering) return;
    const at = revealCard ? cards.findIndex((c) => c.props.id === revealCard) : n - 1;
    if (at >= 0 && at !== active) {
      setDir("none");
      setActive(at);
      setVisited((v) => (v.has(at) ? v : new Set(v).add(at)));
    }
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (n < 2 || n > 4) console.warn(`CardSequence "${label}": ${n} sub-cards; the format allows 2-4 (EDD-006).`);
    const ids = cards.map((c) => c.props.id);
    if (new Set(ids).size !== ids.length) console.warn(`CardSequence "${label}": sub-card ids must be unique.`);
    const stage = rootRef.current?.closest('[data-testid="stage"]');
    const total = stage?.querySelectorAll('[data-qa="control"]').length ?? 0;
    if (total > 16) console.warn(`CardSequence "${label}": ${total} stage controls; QA presses only the first 16 (EDD-006 budget).`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctxFor = (i: number, card: SubCardProps): SubCardContext => {
    const names = card.milestones ?? [];
    return {
      reach: (name) => {
        if (locked || !names.includes(name)) return;
        const key = `${card.id}:${name}`;
        if (done.current.has(key)) return;
        done.current.add(key);
        bump((x) => x + 1);
        interactRef.current();
      },
      reached: (name) => done.current.has(`${card.id}:${name}`),
      active: i === active,
      locked,
      phase,
      index: i,
      count: n,
    };
  };
  const cardDone = (card: SubCardProps, i: number) =>
    (card.milestones ?? []).length > 0
      ? (card.milestones ?? []).every((m) => done.current.has(`${card.id}:${m}`))
      : visited.has(i) && !locked;

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (locked || e.pointerType === "mouse" || (e.target as Element).closest(NO_SWIPE)) return;
    swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < 1.5 * Math.abs(dy)) return;
    if (dx < 0) go(active + 1, "swipe");
    else if (visited.has(active - 1)) go(active - 1, "swipe");
  };

  return (
    <div className={s.seq} ref={rootRef} role="group" aria-roledescription="card sequence" aria-label={label}>
      <ol className={s.trail} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {cards.map((c, i) => {
          const isDone = cardDone(c.props, i);
          return (
            <li key={c.props.id}>
              <Control
                className={`${s.step} ${i === active ? "active" : ""}`}
                aria-current={i === active ? "step" : undefined}
                aria-controls={`${baseId}-${i}`}
                disabled={locked || i === active || !visited.has(i)}
                onClick={() => go(i, "button")}
              >
                <span className={s.stepHead}>
                  <span className={s.num}>
                    <span className={s.sr}>Step </span>
                    {i + 1}
                  </span>{" "}
                  {c.props.title}
                  {isDone && (
                    <>
                      <span className={s.tick} aria-hidden="true">
                        {" "}
                        ✓
                      </span>
                      <span className={s.sr}>, done</span>
                    </>
                  )}
                </span>
                {isDone && c.props.trace && (
                  <span className={s.trace}>
                    <span className={s.sr}>: </span>
                    {c.props.trace}
                  </span>
                )}
              </Control>
            </li>
          );
        })}
      </ol>

      <div className={s.viewport} data-dir={dir} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
        {cards.map((c, i) => {
          const ctx = ctxFor(i, c.props);
          const body = typeof c.props.children === "function" ? c.props.children(ctx) : c.props.children;
          const next = cards[i + 1];
          return (
            <section
              key={c.props.id}
              id={`${baseId}-${i}`}
              className={s.card}
              hidden={i !== active}
              role="group"
              aria-roledescription="step"
              aria-label={`Step ${i + 1} of ${n}: ${c.props.title}`}
              tabIndex={-1}
              data-subcard={c.props.id}
              data-subcard-index={i}
            >
              <SubCardCtx.Provider value={ctx}>{body}</SubCardCtx.Provider>
              {next && (
                <div className={s.nav}>
                  <Control className={s.next} disabled={locked} onClick={() => go(i + 1, "button")}>
                    Next: {next.props.title}{" "}
                    <span aria-hidden="true">→</span>
                  </Control>
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className={s.sr} aria-live="polite">
        {live}
      </p>
    </div>
  );
}
