"use client";

import Link from "next/link";
import { LESSON_STATUS_LABEL } from "@/lib/lesson-status";
import { SocialActions } from "./SocialActions";
import { useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import { STATUS_LABEL, SUPPORT_LABEL, type PublicMeta } from "@/lib/trust";
import type { FeedItem } from "@/lib/feed-types";
import { createFoldStore, FoldScope, FOLD_TOGGLE_MIN_PX, type FoldStore } from "@/kit/controls";
import { DemoHost } from "./DemoHost";

export interface DomainInfo {
  id: string;
  name: string;
  short: string;
  color: string;
}

/**
 * EDD-001 option 2: a card renders from the slim index (FeedItem). The claims ledger and evidence load
 * only when the learner opens "Why trust this?" (from /api/meta/<slug>), unless the page already has
 * the full meta (`full`, the single-lesson page).
 * W-878: both arrive as PublicMeta (src/lib/trust.ts): the sheet shows a claim's text, what it rests on, whether
 * it is checked, its address and its openable source links. Fact-check and builder notes never reach the browser.
 */
export function DemoCard({
  meta,
  full: fullProp,
  domain,
  active,
  standalone = false,
}: {
  meta: FeedItem;
  full?: PublicMeta;
  domain: DomainInfo;
  active: boolean;
  standalone?: boolean;
}) {
  const [trustOpen, setTrustOpen] = useState(false);
  const [fetched, setFetched] = useState<PublicMeta | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const full = fullProp ?? fetched;
  useEffect(() => {
    if (!trustOpen || full) return;
    let live = true;
    setFetchFailed(false);
    fetch(`/api/meta/${encodeURIComponent(meta.slug)}`)
      .then((r) => (r.ok ? (r.json() as Promise<PublicMeta>) : Promise.reject(new Error(String(r.status)))))
      .then((m) => live && setFetched(m))
      .catch(() => live && setFetchFailed(true));
    return () => {
      live = false;
    };
  }, [trustOpen, full, meta.slug]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [fold] = useState(createFoldStore);
  useRevealFit(bodyRef, active, fold);

  return (
    <article
      className="card-shell"
      data-testid="demo-card"
      data-slug={meta.slug}
      style={{ ["--domain" as string]: domain.color }}
      aria-label={meta.title}
    >
      <header className="card-head">
        <div className="card-tags">
          <span className="tag domain">{domain.short}</span>
          <span className="tag">{Math.round(meta.durationSec / 5) * 5}s</span>
          {meta.status !== "published" && <span className="tag status">{LESSON_STATUS_LABEL[meta.status]}</span>}
        </div>
        <h2 className="card-title">{meta.title}</h2>
        <p className="card-hook">{meta.hook}</p>
      </header>

      <div className="card-body" ref={bodyRef}>{active ? <FoldScope store={fold}><DemoHost slug={meta.slug} /></FoldScope> : <div className="loading">Swipe here to start</div>}</div>

      <SocialActions slug={meta.slug} title={meta.title} />

      <footer className="card-foot">
        <button type="button" className="link" data-testid="trust-button" onClick={() => setTrustOpen(true)}>
          Why trust this? <span className="muted">({meta.claims.verified}/{meta.claims.total} claims checked)</span>
        </button>
        {!standalone && (
          <Link className="link" href={`/d/${meta.slug}`}>
            Open
          </Link>
        )}
      </footer>

      {trustOpen && (
        <div className="sheet" role="dialog" aria-label="Why trust this lesson" data-testid="trust-sheet">
          <div className="sheet-inner">
            <div className="sheet-head">
              <h3>What this lesson claims</h3>
              <button type="button" className="link" onClick={() => setTrustOpen(false)}>
                Close
              </button>
            </div>
            {!full && (
              <p className="muted small" data-testid="trust-loading">
                {fetchFailed ? "Could not load the claims. Close and try again." : "Loading the claims…"}
              </p>
            )}
            {full && (
            <>
            <ul className="claims">
              {full.claims.map((c) => (
                <li key={c.id} data-testid="trust-claim">
                  <p>{c.text}</p>
                  <p className="muted small">
                    <span className={`pill ${c.status}`}>{STATUS_LABEL[c.status] ?? c.status}</span> rests on{" "}
                    {SUPPORT_LABEL[c.support] ?? c.support}
                    {c.links.length > 0 && (
                      <>
                        {" · "}
                        {c.links.map((l, i) => (
                          <span key={l.href}>
                            {i > 0 && ", "}
                            <a href={l.href} target="_blank" rel="noopener noreferrer" data-testid="trust-source">
                              {c.links.length > 1 ? `source ${i + 1}` : "open the source"} ({l.label})
                            </a>
                          </span>
                        ))}
                      </>
                    )}
                  </p>
                  <p className="muted tiny">address: {c.id}</p>
                </li>
              ))}
            </ul>
            <p className="muted small">
              Teaching evidence: {full.evidence.humanLearners} human-learner studies,{" "}
              {full.evidence.simulatedLearner} simulated-learner reviews, {full.evidence.qa} browser QA
              runs. Simulated learners find problems; only people can show that a lesson teaches.
            </p>
            </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/**
 * W-135: at the reveal, the card body scrolls just far enough that the reveal's bottom is on screen
 * (or its top, if the reveal is taller than the card). Before this the reveal started at the card's
 * bottom edge and the rest sat below the fold of an unmarked inner scroll: on a phone it read as
 * text clipped under "Why trust this?". The lesson contract (src/kit/Lesson.tsx) is protected, so
 * the card watches the lesson's data-phase from outside instead of the kit scrolling itself.
 *
 * W-139 (eng review follow-up 2): while the reveal is showing, the fit re-runs when the card body
 * resizes (rotation, dvh changes). A width change (the phone turned) always re-fits, because the old
 * scroll position means nothing in the new layout. Any other re-fit (the 400 ms re-check, a
 * height-only resize) is skipped once the learner has scrolled the card since the reveal began.
 *
 * Stage crop at the reveal (2026-10-14, review W-237): scrolling alone put the reveal on screen by
 * pushing the top of the stage off the card, so reveal text that points at labels near the top pointed
 * at nothing. Now the fit first shrinks the stage's pictures (svg[viewBox], largest first, via an
 * inline max-height so the viewBox letterboxes it) until stage + reveal fit the card body. Controls are
 * never scaled: the QA contract's 24px tap-target rule holds after the reveal (a first version scaled
 * the whole stage with a transform and broke it). An svg that holds a control is left alone. A picture
 * never goes below PICTURE_FLOOR of its natural height; what is still over is scrolled as before, so
 * the reveal stays fully visible either way. Shrunk pictures carry data-reveal-fit (the old height).
 *
 * W-287 (review 2026-10-14-W-237, changes 1-2): a uniform letterbox scale shrinks svg labels with the
 * picture (347 lessons ended below 9 px), which breaks demo-standard's "never shrink text". So:
 * - A labelled picture stops shrinking at the W-289 floors (company/design/system.md, "Accessibility:
 *   minimum text size in lesson pictures"): floor = max(PICTURE_FLOOR, SVG_TEXT_FLOOR_PX / smallest
 *   meaning-carrying label, SVG_DECOR_FLOOR_PX / smallest aria-hidden label). If that is >= 1 it is not
 *   shrunk at all (a label already under 10 px is never shrunk). A text-free picture keeps PICTURE_FLOOR.
 *   The letterbox scale is min(w/vbW, h/vbH), so capping the height at k * h scales the drawing by at least k: text never lands below the minimum.
 * - A shrink that frees less than 1 px of overflow is undone (the picture sits in a row a sibling sizes).
 * - Pictures that would distort or slip out of register are skipped: preserveAspectRatio="none",
 *   an svg that is (or sits inside) position absolute/fixed within the stage, and an svg with absolutely
 *   positioned siblings laid over it (overlays: HTML nodes drawn on top of the picture).
 * W-288 (change 3): an svg holding untagged interactive elements ([tabindex], role button/slider,
 * links, form fields, or any element with cursor: pointer) is skipped too, so a tap target the
 * contract cannot see never shrinks.
 */
const PICTURE_FLOOR = 0.4;
/** W-289 floors (company/design/system.md): smallest rendered svg label (CSS px) the fit may produce. */
export const SVG_TEXT_FLOOR_PX = 10; // meaning-carrying labels (anything not inside aria-hidden="true")
export const SVG_DECOR_FLOOR_PX = 8; // decorative labels inside aria-hidden="true"
const UNTAGGED_INTERACTIVE = '[tabindex],[role="button"],[role="slider"],a[href],button,input,select,textarea';
const isOutOfFlow = (el: Element) => {
  const p = getComputedStyle(el).position;
  return p === "absolute" || p === "fixed";
};
/** Smallest rendered font size (px) of the svg's non-empty <text>, split meaning/decorative; null = none. */
function smallestTextPx(svg: SVGSVGElement): { meaning: number | null; decor: number | null } {
  let meaning = Infinity;
  let decor = Infinity;
  svg.querySelectorAll<SVGTextElement>("text").forEach((t) => {
    if (!t.textContent?.trim()) return;
    const ctm = t.getScreenCTM();
    if (!ctm) return;
    const px = parseFloat(getComputedStyle(t).fontSize) * Math.sqrt(Math.abs(ctm.a * ctm.d - ctm.b * ctm.c));
    if (!(px > 0)) return;
    if (t.closest('[aria-hidden="true"]')) decor = Math.min(decor, px);
    else meaning = Math.min(meaning, px);
  });
  return { meaning: meaning === Infinity ? null : meaning, decor: decor === Infinity ? null : decor };
}
/** Smallest scale the picture may take so no label lands under its W-289 floor (PICTURE_FLOOR if text-free). */
function pictureFloor({ meaning, decor }: { meaning: number | null; decor: number | null }): number {
  return Math.max(
    PICTURE_FLOOR,
    meaning === null ? 0 : SVG_TEXT_FLOOR_PX / meaning,
    decor === null ? 0 : SVG_DECOR_FLOOR_PX / decor,
  );
}
/** W-287: skip pictures that a max-height would distort, misregister, or whose hidden targets would shrink. */
function canShrink(svg: SVGSVGElement, stage: HTMLElement): boolean {
  if (svg.getAttribute("preserveAspectRatio")?.trim().startsWith("none")) return false;
  for (let el: Element | null = svg; el && el !== stage; el = el.parentElement) if (isOutOfFlow(el)) return false;
  const parent = svg.parentElement;
  if (parent && [...parent.children].some((c) => c !== svg && isOutOfFlow(c))) return false;
  if (svg.querySelector(UNTAGGED_INTERACTIVE)) return false;
  // Shapes with an onClick and only a pointer cursor (wheel-needs-four-colours, three-students-two-rooms)
  for (const el of svg.querySelectorAll("*")) if (getComputedStyle(el).cursor === "pointer") return false;
  return true;
}
/**
 * EDD-005 (W-332/W-348/W-349): fold at the reveal. Runs once, inside the MutationObserver callback that
 * sees data-phase become "reveal": a microtask after React's commit and before the browser paints, so the
 * learner never sees rows vanish. It is the first step of the fit (before the W-287 picture shrink, which
 * runs on the next animation frame). Re-fits never call it, so they never fold or unfold.
 * Folds every opted-in Row (<Row foldAtReveal>) that holds no Readout, is not inside an svg and is not
 * nested in another opted row, only if stage + reveal overflow the body and the fold saves at least the
 * toggle's own height after paying for the toggle. Rows are hidden with display: none (never unmounted).
 */
function decideFold(body: HTMLElement, stage: HTMLElement, fold: FoldStore, lastFocus: Element | null) {
  if (body.scrollHeight - body.clientHeight <= 1) return;
  const opted = [...stage.querySelectorAll<HTMLElement>("[data-fold-row]")];
  const rows = opted.filter((row) => {
    const refused = row.querySelector('[data-qa="readout"]')
      ? "readout"
      : row.closest("svg")
        ? "picture"
        : row.parentElement?.closest("[data-fold-row]")
          ? "nested"
          : null;
    if (refused) row.dataset.foldRefused = refused;
    else delete row.dataset.foldRefused;
    return !refused;
  });
  if (rows.length === 0) return;
  const others = [...stage.querySelectorAll<HTMLElement>('[data-qa="control"]')].filter(
    (c) => !rows.some((r) => r.contains(c)) && c.getClientRects().length > 0,
  );
  // Focus inside a folding row moves to the toggle. A lesson may disable its controls in the same commit
  // that shows the reveal, which drops focus to <body> first, so fall back to the last focused element.
  const active = document.activeElement && document.activeElement !== document.body ? document.activeElement : lastFocus;
  const hadFocus = !!active && rows.some((r) => r.contains(active));
  const before = stage.getBoundingClientRect().height;
  flushSync(() =>
    fold.set({ ids: rows.map((r) => r.id), toggleAt: rows[0].id, label: others.length > 0 ? "more" : "all", expanded: false, touched: false }),
  );
  const toggle = stage.querySelector<HTMLElement>("[data-fold-toggle]");
  const saved = before - stage.getBoundingClientRect().height; // the toggle is already paid for
  // Spec item 2 / W-348: (folded rows incl. margins) - (toggle incl. margin) >= the toggle's own height.
  const bar = Math.max(FOLD_TOGGLE_MIN_PX, toggle?.getBoundingClientRect().height ?? Infinity);
  if (!toggle || saved < bar) {
    flushSync(() => fold.reset()); // does not pay: nothing folds
    return;
  }
  if (hadFocus) toggle.focus({ preventScroll: true });
}

function useRevealFit(bodyRef: RefObject<HTMLDivElement | null>, active: boolean, fold: FoldStore) {
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || !active || typeof MutationObserver === "undefined") return;
    let revealed = false;
    let userScrolled = false;
    let expectedTop = -1; // the scrollTop we set last; any other scroll position is the learner's
    let lastWidth = body.clientWidth;
    let lastFocus: Element | null = null; // EDD-005: last element focused inside the card body
    const onFocusIn = (e: FocusEvent) => {
      lastFocus = e.target instanceof Element ? e.target : null;
    };
    const timers: number[] = [];
    const stageOf = () => body.querySelector<HTMLElement>('[data-testid="stage"]');
    const unscale = (stage: HTMLElement | null) => {
      stage?.querySelectorAll<SVGSVGElement>("svg[data-reveal-fit]").forEach((svg) => {
        svg.style.removeProperty("max-height");
        svg.style.removeProperty("min-height");
        delete svg.dataset.revealFit;
      });
    };
    const scaleStage = () => {
      const stage = stageOf();
      if (!stage) return;
      unscale(stage); // measure the natural layout, then fit it
      let over = body.scrollHeight - body.clientHeight;
      if (over <= 1) return;
      const pictures = [...stage.querySelectorAll<SVGSVGElement>("svg[viewBox]")]
        .filter((svg) => !svg.closest('[data-qa="control"]') && !svg.querySelector('[data-qa="control"]'))
        .filter((svg) => !svg.parentElement?.closest("svg")) // outermost svgs only
        .map((svg) => ({ svg, h: svg.getBoundingClientRect().height }))
        .filter((p) => p.h >= 60)
        .filter((p) => canShrink(p.svg, stage))
        .sort((x, y) => y.h - x.h)
        .map((p) => ({ ...p, text: smallestTextPx(p.svg) })); // measured at natural size, before any shrink
      for (const { svg, h, text } of pictures) {
        if (over <= 1) break;
        const floor = pictureFloor(text);
        if (floor >= 1) continue; // labels already at or below the minimum: never shrink them
        const target = Math.max(h * floor, h - over - 4);
        if (h - target < 1) continue;
        svg.style.setProperty("max-height", `${target.toFixed(1)}px`, "important");
        svg.style.setProperty("min-height", "0px", "important"); // a lesson min-height would win over max-height
        svg.dataset.revealFit = h.toFixed(0);
        const before = over;
        over = body.scrollHeight - body.clientHeight;
        if (before - over < 1) {
          // W-287: freed nothing, so the shrink only cost legibility: undo it
          svg.style.removeProperty("max-height");
          svg.style.removeProperty("min-height");
          delete svg.dataset.revealFit;
          over = body.scrollHeight - body.clientHeight;
        }
      }
    };
    const bringIntoView = () => {
      if (!revealed || userScrolled || fold.get().touched) return; // EDD-005: a toggle press is learner intent
      scaleStage();
      expectedTop = body.scrollTop; // the fit may have clamped scrollTop; that is not the learner
      const reveal = body.querySelector<HTMLElement>('[data-testid="reveal"]');
      if (!reveal) return;
      const b = body.getBoundingClientRect();
      const r = reveal.getBoundingClientRect();
      const below = r.bottom - b.bottom + 4;
      if (below <= 0) return;
      const by = Math.max(0, Math.min(below, r.top - b.top - 12));
      if (by < 1) return;
      body.scrollTop += by;
      expectedTop = body.scrollTop;
    };
    const onScroll = () => {
      if (revealed && Math.abs(body.scrollTop - expectedTop) > 1) userScrolled = true;
    };
    const onIntent = () => {
      if (revealed) userScrolled = true;
    };
    const onChange = () => {
      const isReveal = body.querySelector('[data-testid="lesson"]')?.getAttribute("data-phase") === "reveal";
      if (isReveal === revealed) return;
      revealed = isReveal;
      if (!isReveal) {
        unscale(stageOf());
        fold.reset(); // EDD-005 item 7: leaving the reveal unfolds everything and removes the toggle
        return;
      }
      userScrolled = false;
      // Stage crop fix: a stage or reveal that grows after the tap (animation, late annotations) re-fits too.
      const stage = stageOf();
      if (stage) decideFold(body, stage, fold, lastFocus); // EDD-005: once, before first paint, before the picture fit
      expectedTop = body.scrollTop;
      const reveal = body.querySelector<HTMLElement>('[data-testid="reveal"]');
      if (stage) ro?.observe(stage);
      if (reveal) ro?.observe(reveal);
      requestAnimationFrame(bringIntoView);
      timers.push(window.setTimeout(bringIntoView, 400)); // a reveal that animates in may still be growing
    };
    const onResize = () => {
      const turned = Math.abs(body.clientWidth - lastWidth) > 1;
      lastWidth = body.clientWidth;
      if (turned) userScrolled = false;
      expectedTop = body.scrollTop; // the browser may clamp scrollTop on resize; that is not the learner
      requestAnimationFrame(bringIntoView);
    };
    const mo = new MutationObserver(onChange);
    mo.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-phase"] });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
    ro?.observe(body);
    window.addEventListener("orientationchange", onResize);
    body.addEventListener("scroll", onScroll, { passive: true });
    body.addEventListener("focusin", onFocusIn);
    body.addEventListener("wheel", onIntent, { passive: true });
    body.addEventListener("touchmove", onIntent, { passive: true });
    onChange();
    return () => {
      mo.disconnect();
      ro?.disconnect();
      window.removeEventListener("orientationchange", onResize);
      body.removeEventListener("scroll", onScroll);
      body.removeEventListener("focusin", onFocusIn);
      body.removeEventListener("wheel", onIntent);
      body.removeEventListener("touchmove", onIntent);
      timers.forEach((t) => clearTimeout(t));
      fold.reset();
    };
  }, [bodyRef, active, fold]);
}
