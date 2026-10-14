"use client";

// HQ Evaluation: Bradley-Terry leaderboard over pairwise lesson judgements, per criterion and overall.
// Data: leaderboard.generated.json from `npm run eval` (tools/eval/bt.mjs). Records: company/evaluation/pairwise/*.jsonl.

import { useMemo, useState } from "react";
import Link from "next/link";
import { HqTop } from "../HqTop";
import type { Leaderboard, Row } from "./types";
import s from "../hq.module.css";
import d from "./evaluation.module.css";

type Sort = "rating" | "comparisons";

export default function Evaluation({ data }: { data: Leaderboard | null }) {
  const [criterion, setCriterion] = useState("overall");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [strand, setStrand] = useState("");
  const [minN, setMinN] = useState(0);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("rating");
  const [disc, setDisc] = useState(false);

  const rows = data?.rows ?? [];
  const mine = useMemo(() => rows.filter((r) => r.criterion === criterion), [rows, criterion]);
  const opts = useMemo(() => {
    const u = (f: (r: Row) => string | null) => [...new Set(rows.map(f).filter((x): x is string => Boolean(x)))].sort();
    return { domain: u((r) => r.domain), status: u((r) => r.status), strand: u((r) => r.strand) };
  }, [rows]);

  const ranked = useMemo(() => {
    // Rank is by rating within the criterion and the connected component filter, before the other filters.
    const base = mine.filter((r) => disc || !r.disconnected);
    const rank = new Map(base.map((r, i) => [r.item, i + 1]));
    const needle = q.trim().toLowerCase();
    const list = base.filter(
      (r) =>
        (!domain || r.domain === domain) &&
        (!status || r.status === status) &&
        (!strand || r.strand === strand) &&
        r.comparisons >= minN &&
        (!needle || `${r.title} ${r.item}`.toLowerCase().includes(needle)),
    );
    const sorted = [...list].sort((a, b) => (sort === "rating" ? b.rating - a.rating : b.comparisons - a.comparisons || b.rating - a.rating));
    return sorted.map((r) => ({ r, rank: rank.get(r.item) ?? 0 }));
  }, [mine, disc, domain, status, strand, minN, q, sort]);

  const hiddenDisc = mine.filter((r) => r.disconnected).length;
  const [lo, hi] = useMemo(() => {
    const all = mine.length ? mine : rows;
    return [Math.floor(Math.min(...all.map((r) => r.lo), 1000) / 50) * 50, Math.ceil(Math.max(...all.map((r) => r.hi), 1000) / 50) * 50];
  }, [mine, rows]);
  const pct = (v: number) => `${((v - lo) / (hi - lo || 1)) * 100}%`;
  const title = (id: string) => {
    const r = rows.find((x) => x.item === id);
    return r ? `${r.title} v${r.version}` : id;
  };
  const critName = (id: string) => data?.criteria.find((c) => c.id === id)?.name ?? id;

  return (
    <main className={s.hq}>
      <HqTop on="evaluation" subtitle="Pairwise leaderboard (Bradley-Terry)" />

      {!data || data.totalRecords === 0 ? (
        <section className={d.empty} aria-label="No judgements yet">
          <h2>No pairwise judgements yet</h2>
          <p>
            The leaderboard is fitted from one-line judgements, each saying which of two lessons won on one criterion. Add them as JSON lines under{" "}
            <code>company/evaluation/pairwise/*.jsonl</code> (format in <code>company/evaluation/README.md</code>), then run:
          </p>
          <pre>npm run eval</pre>
          <p>That rewrites <code>src/app/hq/evaluation/leaderboard.generated.json</code>; reload this page.</p>
          {data && data.errors.length > 0 && (
            <ul className={d.errors}>
              {data.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <>
          <div className={d.filters} role="search" aria-label="Leaderboard filters">
            <label className={d.field}>
              <span>Criterion</span>
              <select className={d.select} value={criterion} onChange={(e) => setCriterion(e.target.value)}>
                {data.criteria.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={d.field}>
              <span>Domain</span>
              <select className={d.select} value={domain} onChange={(e) => setDomain(e.target.value)}>
                <option value="">All</option>
                {opts.domain.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className={d.field}>
              <span>Status</span>
              <select className={d.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                {opts.status.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className={d.field}>
              <span>Strand</span>
              <select className={d.select} value={strand} onChange={(e) => setStrand(e.target.value)}>
                <option value="">All</option>
                {opts.strand.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className={d.field}>
              <span>Min comparisons</span>
              <input className={d.select} type="number" min={0} value={minN} onChange={(e) => setMinN(Math.max(0, Number(e.target.value) || 0))} style={{ width: 90 }} />
            </label>
            <label className={d.field}>
              <span>Sort by</span>
              <select className={d.select} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="rating">Rating</option>
                <option value="comparisons">Comparisons</option>
              </select>
            </label>
            <label className={`${d.field} ${d.grow}`}>
              <span>Search</span>
              <input className={d.search} type="search" placeholder="Title or slug" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <label className={d.check}>
              <input type="checkbox" checked={disc} onChange={(e) => setDisc(e.target.checked)} /> Show disconnected{hiddenDisc ? ` (${hiddenDisc})` : ""}
            </label>
          </div>

          <div className={d.layout}>
            <section aria-label="Leaderboard">
              <table className={d.table}>
                <caption className={d.caption}>
                  {critName(criterion)}: {ranked.length} of {mine.length} lessons. Rating is Elo-like (mean 1000, 400 points = 10x strength); bar is the 95% interval.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Lesson</th>
                    <th scope="col">Domain</th>
                    <th scope="col">Status</th>
                    <th scope="col">Rating (95% interval)</th>
                    <th scope="col">Comparisons</th>
                    <th scope="col">W-L-T</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map(({ r, rank }) => (
                    <tr key={r.item} className={r.disconnected ? d.disc : undefined}>
                      <td data-label="Rank" className={d.num}>
                        {rank || "–"}
                      </td>
                      <th scope="row" data-label="Lesson" className={d.lesson}>
                        {r.known ? <Link href={`/d/${r.slug}`}>{r.title}</Link> : <span>{r.title}</span>} <span className={s.muted}>v{r.version}</span>
                        {r.currentVersion && r.currentVersion !== r.version && <span className={d.tag} title={`The lesson is now at v${r.currentVersion}`}>stale</span>}
                        {r.disconnected && <span className={d.tag} title="Not connected to the main comparison group; the rating is not comparable">disconnected</span>}
                        {!r.known && <span className={d.tag}>no meta</span>}
                      </th>
                      <td data-label="Domain">{r.domain ?? "–"}</td>
                      <td data-label="Status">{r.status ?? "–"}</td>
                      <td data-label="Rating" className={d.ratingCell}>
                        <span className={d.ratingNum}>{Math.round(r.rating)}</span>
                        <span className={d.bar} role="img" aria-label={`95% interval ${Math.round(r.lo)} to ${Math.round(r.hi)}`}>
                          <span className={d.span} style={{ left: pct(r.lo), width: `calc(${pct(r.hi)} - ${pct(r.lo)})` }} />
                          <span className={d.dot} style={{ left: pct(r.rating) }} />
                          <span className={d.mean} style={{ left: pct(1000) }} />
                        </span>
                        <span className={d.range}>
                          {Math.round(r.lo)}–{Math.round(r.hi)}
                        </span>
                      </td>
                      <td data-label="Comparisons" className={d.num}>
                        <span>
                          {r.comparisons} <span className={s.muted}>({r.opponents} opp.)</span>
                        </span>
                      </td>
                      <td data-label="W-L-T" className={d.num}>
                        {r.wins}-{r.losses}-{r.ties}
                      </td>
                    </tr>
                  ))}
                  {ranked.length === 0 && (
                    <tr>
                      <td colSpan={7} className={d.none}>
                        No lessons match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            <aside className={d.panel} aria-label="Evaluation summary">
              <h2>Summary</h2>
              <dl className={d.facts}>
                <dt>Records</dt>
                <dd>
                  {data.totalRecords} ({data.blindRecords} blind)
                </dd>
                <dt>Judges</dt>
                <dd>{data.judges.join(", ") || "–"}</dd>
                <dt>Last record</dt>
                <dd>{data.lastRecordDate ?? "–"}</dd>
                <dt>Judge agreement</dt>
                <dd>{data.agreement.rate === null ? "no pair judged by two judges yet" : `${Math.round(data.agreement.rate * 100)}% (${data.agreement.agree} of ${data.agreement.comparable} shared pairs)`}</dd>
              </dl>
              {data.errors.length > 0 && (
                <details className={d.errBox} open>
                  <summary>{data.errors.length} rejected line(s)</summary>
                  <ul className={d.errors}>
                    {data.errors.slice(0, 10).map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </details>
              )}
              <h3>Suggested next pairs</h3>
              {(() => {
                const sug = data.suggestions.filter((x) => x.criterion === criterion);
                return sug.length ? (
                  <ol className={d.sug}>
                    {sug.map((x) => (
                      <li key={`${x.a}|${x.b}`}>
                        {title(x.a)} vs {title(x.b)}
                        <span className={s.muted}> intervals overlap by {Math.round(x.overlap)}; compared {x.direct}x</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className={s.muted}>None: no adjacent intervals overlap for {critName(criterion)}.</p>
                );
              })()}
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
