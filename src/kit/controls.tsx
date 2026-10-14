"use client";

// Stage controls. Every interactive element on a stage must carry data-qa="control"
// so computer-use QA can press it and check that something observable changed.
// A control that changes nothing fails QA ("the beautiful button that does nothing").

import {
  createContext,
  useContext,
  useId,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export function Control({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button type="button" data-qa="control" className={`control ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
  format = (v: number) => String(v),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  format?: (v: number) => string;
}) {
  return (
    <label className="slider">
      <span className="slider-label">
        {label} <output>{format(value)}</output>
      </span>
      <input
        data-qa="control"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function Readout({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="readout" data-qa="readout">
      <span className="readout-label">{label}</span>
      <span className="readout-value">{value}</span>
    </div>
  );
}

/**
 * A row of stage controls. `foldAtReveal` (EDD-005, decision 2026-10-14-reveal-fits-with-its-picture.md,
 * Amendment W-330 items 1-8) lets the card fold this row behind one "Show (more) controls" toggle at the
 * reveal, only if stage + reveal overflow the card and the fold saves at least the toggle's height.
 * Opt in only if the learner loses no evidence: the row holds no Readout (enforced: such a row never
 * folds), no sentence in any reveal branch summarises its state or asks the learner to check something
 * with it, and its state still shows in the picture. Without the prop the row renders exactly as before.
 */
export function Row({ children, foldAtReveal }: { children: ReactNode; foldAtReveal?: boolean }) {
  if (foldAtReveal) return <FoldableRow>{children}</FoldableRow>;
  return <div className="row">{children}</div>;
}

// ---------- fold at the reveal (EDD-005) ----------

export interface FoldState {
  /** Ids of the rows folded at this reveal (empty: nothing folded). */
  ids: string[];
  /** Id of the row the toggle renders before (the first folded row in DOM order). */
  toggleAt: string | null;
  /** "more": other stage controls stay visible ("Show more controls"); "all": none left ("Show controls"). */
  label: "more" | "all";
  expanded: boolean;
  /** The learner pressed the toggle: the fit must not re-run or scroll until the reveal ends. */
  touched: boolean;
}

const UNFOLDED: FoldState = { ids: [], toggleAt: null, label: "more", expanded: false, touched: false };
export const FOLD_TOGGLE_MIN_PX = 44;

export interface FoldStore {
  get: () => FoldState;
  set: (next: Partial<FoldState>) => void;
  reset: () => void;
  subscribe: (fn: () => void) => () => void;
}

export function createFoldStore(): FoldStore {
  let state = UNFOLDED;
  const subs = new Set<() => void>();
  const emit = () => subs.forEach((fn) => fn());
  return {
    get: () => state,
    set: (next) => {
      state = { ...state, ...next };
      emit();
    },
    reset: () => {
      if (state === UNFOLDED) return;
      state = UNFOLDED;
      emit();
    },
    subscribe: (fn) => {
      subs.add(fn);
      return () => subs.delete(fn);
    },
  };
}

const FoldContext = createContext<FoldStore | null>(null);

/** Provided by the card (src/components/DemoCard.tsx); outside it an opted row never folds. */
export function FoldScope({ store, children }: { store: FoldStore; children: ReactNode }) {
  return <FoldContext.Provider value={store}>{children}</FoldContext.Provider>;
}

const noStore: FoldStore = createFoldStore();

function FoldableRow({ children }: { children: ReactNode }) {
  const id = useId();
  const ctx = useContext(FoldContext);
  const store = ctx ?? noStore;
  const state = useSyncExternalStore(store.subscribe, store.get, store.get);
  const folded = ctx !== null && state.ids.includes(id) && !state.expanded;
  return (
    <>
      {ctx !== null && state.toggleAt === id && <FoldToggle store={store} state={state} />}
      <div
        className="row"
        id={id}
        data-fold-row=""
        hidden={folded || undefined}
        style={folded ? { display: "none" } : undefined}
      >
        {children}
      </div>
    </>
  );
}

function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const oy = getComputedStyle(p).overflowY;
    if ((oy === "auto" || oy === "scroll") && p.scrollHeight > p.clientHeight) return p;
  }
  return null;
}

function FoldToggle({ store, state }: { store: FoldStore; state: FoldState }) {
  const label = state.expanded ? "Hide controls" : state.label === "all" ? "Show controls" : "Show more controls";
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const top = btn.getBoundingClientRect().top;
    const scroller = scrollParent(btn);
    const expanding = !store.get().expanded;
    flushSync(() => store.set({ expanded: expanding, touched: true }));
    // Spec item 5: the toggle keeps its on-screen position; rows open (or close) below it.
    const moved = btn.getBoundingClientRect().top - top;
    if (scroller && Math.abs(moved) > 0.5) scroller.scrollTop += moved;
    // Expand: focus stays on the toggle. Hide: focus inside a hidden row returns to it. Explicit, since
    // Safari does not focus a button on click.
    btn.focus({ preventScroll: true });
  };
  return (
    <button
      type="button"
      data-qa="control"
      data-fold-toggle=""
      className={`control fold-toggle ${state.expanded ? "expanded" : ""}`}
      aria-expanded={state.expanded}
      aria-controls={state.ids.join(" ")}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className="fold-chevron" aria-hidden="true">
        ▾
      </span>
    </button>
  );
}
