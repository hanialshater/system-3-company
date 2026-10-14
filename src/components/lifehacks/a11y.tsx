"use client";

// Shared accessibility pieces for the Life Hacks engines (accessibility review 2026-10-14, W-557/W-558).
// Kept here, not in the kit, so the fix ships across the engines without touching protected kit files.

import { useEffect, useLayoutEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Control } from "@/kit/controls";
import a from "./a11y.module.css";

/**
 * W-557: a stage button that is "done" or "not available yet" after the prediction stays focusable
 * (aria-disabled) instead of becoming `disabled`, so keyboard focus never falls to <body>.
 * Before the prediction (`locked`) it is natively disabled, as the predict-first contract requires.
 */
export function StageControl({ locked, inactive = false, onClick, className = "", children, ...rest }:
  ButtonHTMLAttributes<HTMLButtonElement> & { locked: boolean; inactive?: boolean; children: ReactNode }) {
  const off = !locked && inactive;
  return <Control {...rest} disabled={locked} aria-disabled={off ? true : undefined}
    className={`${className} ${a.inactive}`.trim()}
    onClick={(event) => { if (locked || inactive) return; onClick?.(event); }}>{children}</Control>;
}

/**
 * W-558: one atomic, polite status region per stage. It speaks only when the visible result `text`
 * changes after the prediction (debounced so a slider drag is read once). Nothing is spoken while
 * locked, on mount, or on unlocking; an empty text (only "?" placeholders) clears the region.
 */
export function StageStatus({ text, locked }: { text: string; locked: boolean }) {
  const [said, setSaid] = useState("");
  const previous = useRef(text);
  useEffect(() => {
    if (locked || text === previous.current) { previous.current = text; return; }
    previous.current = text;
    if (!text) { setSaid(""); return; }
    const timer = window.setTimeout(() => setSaid(text), 350);
    return () => window.clearTimeout(timer);
  }, [text, locked]);
  // The display:contents wrapper keeps the hidden region from being an absolutely positioned sibling of the
  // picture, which would stop the card's reveal fit from shrinking that picture (DemoCard canShrink, W-287).
  return <div className={a.statusWrap}><div role="status" aria-live="polite" aria-atomic="true" className={a.status}>{said}</div></div>;
}

/** Join visible result chips into the status sentence, skipping "?" placeholders. */
export function resultText(items: Array<[string, string | number]>): string {
  return items.filter(([, value]) => value !== "?" && value !== "").map(([label, value]) => `${label} ${value}`).join("; ");
}

/**
 * W-557 backstop for stages whose buttons live in lesson files (Resource): if the focused stage
 * control becomes disabled, move focus to the next enabled stage control, else the first, else the stage.
 */
export function useKeepFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const last = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onFocus = (event: FocusEvent) => { last.current = event.target as HTMLElement; };
    // Focus that moves on to somewhere else on the page is the learner's choice; forget the control.
    const onBlur = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !el.contains(next)) last.current = null;
    };
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", onBlur);
    return () => { el.removeEventListener("focusin", onFocus); el.removeEventListener("focusout", onBlur); };
  }, []);
  useLayoutEffect(() => {
    const el = ref.current, previous = last.current;
    if (!el || !previous) return;
    const lost = !previous.isConnected || (previous as HTMLButtonElement).disabled === true;
    const active = document.activeElement;
    if (!lost || (active && active !== document.body && active !== previous)) return;
    const enabled = Array.from(el.querySelectorAll<HTMLElement>('[data-qa="control"]'))
      .filter((c) => !(c as HTMLButtonElement).disabled && c.getAttribute("aria-disabled") !== "true");
    const next = previous.isConnected
      ? enabled.find((c) => previous.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING)
      : undefined;
    const target = next ?? enabled[0];
    last.current = null;
    if (target) target.focus();
    else { el.tabIndex = -1; el.focus(); }
  });
  return ref;
}
