"use client";

import Link from "next/link";
import { LESSON_STATUS_LABEL } from "@/lib/lesson-status";
import { SocialActions } from "./SocialActions";
import { useEffect, useRef, useState } from "react";
import { STATUS_LABEL, SUPPORT_LABEL, type PublicMeta } from "@/lib/trust";
import type { FeedItem } from "@/lib/feed-types";
import { createFoldStore, FoldScope } from "@/kit/controls";
// The reveal fit and the EDD-005 fold live in the kit since C3 (lesson frames pilot), so the frame kit runs the same code.
import { useRevealFit } from "@/kit/reveal-fit";
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

export { SVG_TEXT_FLOOR_PX, SVG_DECOR_FLOOR_PX } from "@/kit/reveal-fit";
