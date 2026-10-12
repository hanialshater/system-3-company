"use client";

import Link from "next/link";
import { useState } from "react";
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

      <div className="card-body">{active ? <DemoHost slug={meta.slug} /> : <div className="loading">Swipe here to start</div>}</div>

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
