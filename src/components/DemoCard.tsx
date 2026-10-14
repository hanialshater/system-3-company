"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { DemoMeta } from "@/kit/types";
import { DemoHost } from "./DemoHost";

export interface DomainInfo {
  id: string;
  name: string;
  short: string;
  color: string;
}

export function DemoCard({
  meta,
  domain,
  active,
  standalone = false,
}: {
  meta: DemoMeta;
  domain: DomainInfo;
  active: boolean;
  standalone?: boolean;
}) {
  const [trustOpen, setTrustOpen] = useState(false);
  const verified = meta.claims.filter((c) => c.status === "verified").length;
  const bodyRef = useRef<HTMLDivElement>(null);
  useRevealFit(bodyRef, active);

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
          {meta.status !== "published" && <span className="tag status">{meta.status === "review" ? "In review" : meta.status}</span>}
        </div>
        <h2 className="card-title">{meta.title}</h2>
        <p className="card-hook">{meta.hook}</p>
      </header>

      <div className="card-body" ref={bodyRef}>{active ? <DemoHost slug={meta.slug} /> : <div className="loading">Swipe here to start</div>}</div>

      <footer className="card-foot">
        <button type="button" className="link" data-testid="trust-button" onClick={() => setTrustOpen(true)}>
          Why trust this? <span className="muted">({verified}/{meta.claims.length} claims checked)</span>
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
            <ul className="claims">
              {meta.claims.map((c) => (
                <li key={c.id}>
                  <p>{c.text}</p>
                  <p className="muted small">
                    <span className={`pill ${c.status}`}>{c.status}</span> rests on {c.support}: {c.source}
                    {c.checkedBy ? ` · checked by ${c.checkedBy}, ${c.checkedOn}` : ""}
                  </p>
                  <p className="muted tiny">address: {c.id}</p>
                </li>
              ))}
            </ul>
            <p className="muted small">
              Teaching evidence: {meta.evidence.humanLearners.length} human-learner studies,{" "}
              {meta.evidence.simulatedLearner.length} simulated-learner reviews, {meta.evidence.qa.length} browser QA
              runs. Simulated learners find problems; only people can show that a lesson teaches.
            </p>
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
 */
function useRevealFit(bodyRef: RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || !active || typeof MutationObserver === "undefined") return;
    let revealed = false;
    let userScrolled = false;
    let expectedTop = -1; // the scrollTop we set last; any other scroll position is the learner's
    let lastWidth = body.clientWidth;
    const timers: number[] = [];
    const bringIntoView = () => {
      if (!revealed || userScrolled) return;
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
      if (!isReveal) return;
      userScrolled = false;
      expectedTop = body.scrollTop;
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
    body.addEventListener("wheel", onIntent, { passive: true });
    body.addEventListener("touchmove", onIntent, { passive: true });
    onChange();
    return () => {
      mo.disconnect();
      ro?.disconnect();
      window.removeEventListener("orientationchange", onResize);
      body.removeEventListener("scroll", onScroll);
      body.removeEventListener("wheel", onIntent);
      body.removeEventListener("touchmove", onIntent);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [bodyRef, active]);
}
