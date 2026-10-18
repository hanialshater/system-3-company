// HQ Evaluation view (W-1648; batch 5 §20.3, company/personalization/batches/2026-10-17-batch-5.md): the eval org's
// record, read-only. Studies (criterion hash, verdict table, reproduction status, decision record), the candidate
// reviews with their verdicts, and the timeline of batch 5 and the readout decisions. Every verdict and status is a
// verbatim quote from a committed record, with its path (index: src/data/hq-personalization-eval/evaluation.json,
// written by tools/hq-eval-index.mjs; quotes and hashes re-checked by tests/hq/personalization-evaluation.test.mjs).
// Never harness source or output, and no lab candidate number sits beside a verdict.
import Link from "next/link";
import type { ReactNode } from "react";
import { HqTop } from "../../HqTop";
import hq from "../../hq.module.css";
import s from "../personalization.module.css";

export type Quote = { kind: "text" | "table"; path: string; line: number; quote: string };
type Study = {
  id: string; name: string;
  criterion: { path: string; freezeCommit: string; sha256: string; hashChecked: string; freezeLine: Quote };
  readout: { path: string; verdicts: Quote[] }; repro: { path: string; status: Quote }; decision: { path: string; status: Quote; glance: Quote };
  /** Readout 3b only: rows printed under INVALID, shown after the verdict under printedLabel (batch 5 §21.1). */
  printedLabel?: string; printedRule?: Quote; printed?: Quote[];
  standings?: { candidate: string; quote: Quote }[];
};
export type EvalIndex = {
  schema: string; rule: string; note: string; command: string;
  studies: Study[];
  reviews: { id: string; what: string; path: string; verdict: Quote[]; decision: Quote }[];
  timeline: { date: string; what: string; quote: Quote }[];
};

const lib = (p: string) => `/hq/library/${p.replace(/^company\//, "")}`;

/** Bold and code spans only; everything else is the record's text as written. */
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] !== undefined ? <strong key={k++}><Inline text={m[1]} /></strong> : <code key={k++}>{m[2]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

const cells = (row: string) => row.replace(/^\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());

function Cite({ q }: { q: Quote }) {
  return <p className={s.cite}>quoted from <Link href={lib(q.path)}>{q.path}</Link>, line {q.line}</p>;
}

function QuoteView({ q }: { q: Quote }) {
  if (q.kind === "table") {
    const [head, , ...body] = q.quote.split("\n");
    return (
      <figure>
        <div className={s.scroll}>
          <table className={`${s.table} ${s.wrap}`}>
            <thead><tr>{cells(head).map((c, i) => <th key={i}><Inline text={c} /></th>)}</tr></thead>
            <tbody>{body.map((r, i) => <tr key={i}>{cells(r).map((c, j) => <td key={j}><Inline text={c} /></td>)}</tr>)}</tbody>
          </table>
        </div>
        <figcaption><Cite q={q} /></figcaption>
      </figure>
    );
  }
  return (
    <figure>
      <blockquote className={s.quote}><Inline text={q.quote.replace(/^#+ /, "")} /></blockquote>
      <figcaption><Cite q={q} /></figcaption>
    </figure>
  );
}

export default function Evaluation({ index }: { index: EvalIndex }) {
  return (
    <div className={hq.hq}>
      <HqTop on="personalization" subtitle="Personalization: evaluation record" />
      <main className={s.page}>
        <header className={s.header}>
          <h1>Evaluation</h1>
          <p className={s.badges}><span className={s.badgeWarn}>committed records only</span><span className={s.badgeWarn}>read-only</span></p>
          <p className={s.muted}>
            {index.note} Rule: {index.rule}. Regenerated with <code>{index.command}</code>. The <Link href="/hq/personalization">lab</Link> and its{" "}
            <Link href="/hq/personalization/candidates">frozen candidates</Link> run the lab simulator, not these worlds.
          </p>
          <nav className={s.picker} aria-label="Sections">
            <a className={s.pick} href="#studies">Studies</a><a className={s.pick} href="#reviews">Candidate reviews</a><a className={s.pick} href="#timeline">Timeline</a>
          </nav>
        </header>

        <section className={s.panel} aria-labelledby="studies">
          <h2 id="studies">Studies</h2>
          {index.studies.map((st) => (
            <article key={st.id} className={s.study} aria-labelledby={`st-${st.id}`}>
              <h3 id={`st-${st.id}`}>{st.name}</h3>
              {(
                <>
                  <p>Criterion <Link href={lib(st.criterion.path)}>{st.criterion.path}</Link>, frozen at <code>{st.criterion.freezeCommit}</code>, sha256{" "}
                    <code className={s.mono}>{st.criterion.sha256}</code> <span className={s.cite}>(checked: {st.criterion.hashChecked})</span></p>
                  <QuoteView q={st.criterion.freezeLine} />
                  <h4>Verdicts (<Link href={lib(st.readout.path)}>readout</Link>)</h4>
                  {st.readout.verdicts.map((q, i) => <QuoteView key={i} q={q} />)}
                  {st.standings && (
                    <>
                      <h4>Standing of the candidates and of R4</h4>
                      {st.standings.map((x, i) => <div key={i}><p className={s.muted}>{x.candidate}:</p><QuoteView q={x.quote} /></div>)}
                    </>
                  )}
                  {st.printed && st.printedLabel && (
                    <details data-printed-under-invalid="">
                      <summary className={s.pending}>{st.printedLabel}</summary>
                      {st.printedRule && <QuoteView q={st.printedRule} />}
                      {st.printed.map((q, i) => (
                        <div key={i}><p className={s.pending}>{st.printedLabel}</p><QuoteView q={q} /></div>
                      ))}
                    </details>
                  )}
                  <h4>Reproduction (<Link href={lib(st.repro.path)}>record</Link>)</h4>
                  <QuoteView q={st.repro.status} />
                  <h4>Decision record (<Link href={lib(st.decision.path)}>{st.decision.path}</Link>)</h4>
                  <QuoteView q={st.decision.status} />
                  <details><summary>Decisions at a glance</summary><QuoteView q={st.decision.glance} /></details>
                </>
              )}
            </article>
          ))}
        </section>

        <section className={s.panel} aria-labelledby="reviews">
          <h2 id="reviews">Candidate reviews</h2>
          {index.reviews.map((r) => (
            <article key={r.id} className={s.study} aria-labelledby={`rv-${r.id.replace(/\W+/g, "-")}`}>
              <h3 id={`rv-${r.id.replace(/\W+/g, "-")}`}>{r.id}</h3>
              <p className={s.muted}>{r.what} · <Link href={lib(r.path)}>{r.path}</Link></p>
              {r.verdict.map((q, i) => <QuoteView key={i} q={q} />)}
              <p className={s.muted}>Decision taken on it:</p>
              <QuoteView q={r.decision} />
            </article>
          ))}
        </section>

        <section className={s.panel} aria-labelledby="timeline">
          <h2 id="timeline">Timeline: batch 5 and the readout decisions</h2>
          <ol className={s.cite}>
            {index.timeline.map((t, i) => (
              <li key={i}>
                <strong>{t.date} · {t.what}</strong>: <Inline text={t.quote.quote.replace(/^#+ /, "").replace(/^- /, "")} />{" "}
                (<Link href={lib(t.quote.path)}>{t.quote.path}</Link>, line {t.quote.line})
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
