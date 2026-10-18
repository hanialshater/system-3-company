// HQ Personalization Lab: the frozen candidates reachable-v2 and reachable-v3, read-only, on the six simulated
// personas, next to the default order (W-1648; batch 5 §20.2, company/personalization/batches/2026-10-17-batch-5.md).
// Server-rendered from committed precomputed documents (src/data/hq-personalization/candidates/); no network request, no state.
// Shows: rank's order and its reason codes (v2, v3); for v3, `moves`' key, direction and named lesson, and the RC
// line the key would render, as draft lines. Never: rank's numeric fields, harness output, K6/K7/R4/R5 numbers,
// learner data, simulated scores. Showing a candidate here decides nothing.
import Link from "next/link";
import { HqTop } from "../../HqTop";
import hq from "../../hq.module.css";
import {
  CANDIDATE_LABEL, CANDIDATE_NAMES, DRAFT_LINES_LABEL, G_RECORD, L3_PENDING, RC_LINES, RC_RECORD, renderLine,
  type CandidateDoc, type StoredMove,
} from "@/lib/hq-personalization-candidates";
import s from "../personalization.module.css";

export type CandidatesProps = {
  doc: CandidateDoc | null; error: string | null;
  personas: { id: string; name: string }[]; persona: string; policy: string; all: boolean;
};

const href = (persona: string, policy: string, all = false) =>
  `/hq/personalization/candidates?persona=${encodeURIComponent(persona)}&policy=${encodeURIComponent(policy)}${all ? "&rows=all" : ""}`;

function Label() {
  return <p className={s.label} role="note" data-candidate-label="">{CANDIDATE_LABEL}</p>;
}

function Line({ m }: { m: StoredMove | undefined }) {
  const r = renderLine(m);
  if (!m || !m.moved) return <span className={s.muted}>not moved</span>;
  if (!r) return <span className={s.error}>no line for {m.key ?? "a move with no code"}</span>;
  return (
    <span className={s.draft}>
      {r.id}: {r.text}{r.pending ? <> <span className={s.pending}>{L3_PENDING}</span></> : null}
    </span>
  );
}

function MoveCells({ m }: { m: StoredMove | undefined }) {
  return (
    <>
      <td>{m?.moved ? m.direction : "–"}</td>
      <td><code>{m?.key ?? "–"}</code></td>
      <td>{m?.named ? <>{m.namedTitle} <span className={s.slug}>({m.named})</span></> : "–"}</td>
      <td><Line m={m} /></td>
    </>
  );
}

export default function Candidates({ doc, error, personas, persona, policy, all }: CandidatesProps) {
  const moves = !!doc?.candidate.hasMoves;
  const rows = doc ? (all ? doc.start.rows : doc.start.rows.slice(0, 30)) : [];
  const steps = doc ? doc.steps.filter((x) => x.kind === "new") : [];
  return (
    <div className={hq.hq}>
      <HqTop on="personalization" subtitle="Personalization lab: frozen candidates (simulation)" />
      <main className={s.page}>
        <header className={s.header}>
          <h1>Frozen candidates</h1>
          <Label />
          <p className={s.badges}>
            <span className={s.badgeWarn}>simulated personas only</span>
            <span className={s.badgeWarn}>read-only</span>
            <span className={s.badgeWarn}>not live</span>
          </p>
          <p className={s.muted}>
            reachable-v2 and reachable-v3, imported unchanged and only when their bytes match the frozen sha256, run on the lab simulator
            (not criterion 3b&apos;s world) for the six simulated personas, seed 1, 7 days. Their lab results are not scores and were never a go/no-go input; the website go/no-go is NO-GO (<Link href={`/hq/library/${G_RECORD.replace(/^company\//, "")}`}>G record</Link>)
            (<Link href="/hq/library/personalization/batches/2026-10-17-batch-5.md">batch 5 §20</Link>). Verdicts live in the{" "}
            <Link href="/hq/personalization/evaluation">Evaluation view</Link>. Back to the <Link href="/hq/personalization">lab</Link>.
          </p>
          <nav className={s.picker} aria-label="Candidate">
            <span className={s.muted}>Candidate</span>
            {CANDIDATE_NAMES.map((c) => (
              <Link key={c} href={href(persona, c)} className={`${s.pick} ${c === policy ? s.pickOn : ""}`} aria-current={c === policy ? "page" : undefined}>{c}</Link>
            ))}
          </nav>
          <nav className={s.picker} aria-label="Simulated persona">
            <span className={s.muted}>Simulated persona</span>
            {personas.map((p) => (
              <Link key={p.id} href={href(p.id, policy)} className={`${s.pick} ${p.id === persona ? s.pickOn : ""}`} aria-current={p.id === persona ? "page" : undefined}>{p.name}</Link>
            ))}
          </nav>
        </header>

        {error || !doc ? <p role="alert" className={s.error}>{error ?? "No candidate document."}</p> : (
          <>
            <section className={s.panel} aria-labelledby="cand-h">
              <h2 id="cand-h">{doc.candidate.name} · simulated persona: {doc.persona.name}</h2>
              <Label />
              <p className={s.muted}>
                File <code>{doc.candidate.file}</code> · sha256 <code className={s.mono}>{doc.candidate.sha256}</code> (checked when generated) ·
                version {doc.candidate.version} · {doc.run.simulator} · adapter <code>{doc.run.adapter}</code> · {doc.simulatedOnly}
              </p>
              <ul className={s.cite}>{doc.run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              {!moves && <p className={s.muted}>reachable-v2 has no <code>moves</code>: this view shows its order and <code>rank</code>&apos;s reason codes only, and no reason line.</p>}
            </section>

            <section className={s.panel} aria-labelledby="start-h">
              <h2 id="start-h">Order at the first new card, next to the default order</h2>
              <Label />
              <p className={s.muted}>
                After the simulated persona&apos;s {doc.start.preHistory} pre-history lessons. Position 0 is first. &quot;Reason code&quot; is <code>rank</code>&apos;s code against the next
                ranked lesson (named); its numeric fields are not stored.
                {moves && <> The last columns are v3&apos;s <code>moves</code> (direction, key, named lesson) and the line RC&apos;s key would render: <strong>{DRAFT_LINES_LABEL}</strong>.</>}
              </p>
              <div className={s.scroll}>
                <table className={`${s.table} ${s.wrap}`}>
                  <thead>
                    <tr><th>rank</th><th>default</th><th>lesson</th><th>reason code (vs)</th>{moves && <><th>direction</th><th>key</th><th>named lesson</th><th>{DRAFT_LINES_LABEL}</th></>}</tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.slug}>
                        <td>{r.rankPos}</td><td>{r.defaultPos}</td>
                        <td>{r.title} <span className={s.slug}>({r.slug})</span></td>
                        <td><code>{r.rankCode}</code>{r.versus ? <span className={s.slug}> vs {r.versus}</span> : null}</td>
                        {moves && <MoveCells m={r.move} />}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {doc.start.rows.length > rows.length
                ? <p><Link href={href(persona, policy, true)}>Show all {doc.start.rows.length} lessons</Link></p>
                : all && <p><Link href={href(persona, policy)}>Show the first 30</Link></p>}
            </section>

            <section className={s.panel} aria-labelledby="ep-h">
              <h2 id="ep-h">Episode: the card served at each new step, next to the default card</h2>
              <Label />
              <p className={s.muted}>
                {steps.length} new cards over {doc.run.days} simulated days (revisit steps omitted). &quot;Default card&quot; is the first lesson of the default order not yet finished at that step.
                No simulated outcome or score is shown for a candidate.
              </p>
              <div className={s.scroll}>
                <table className={`${s.table} ${s.wrap}`}>
                  <thead>
                    <tr><th>step</th><th>day</th><th>served</th><th>default card</th><th>moved</th><th>reason code (vs)</th>{moves && <><th>direction</th><th>key</th><th>named lesson</th><th>{DRAFT_LINES_LABEL}</th></>}</tr>
                  </thead>
                  <tbody>
                    {steps.map((x) => x.kind === "new" && (
                      <tr key={x.step}>
                        <td>{x.step}</td><td>{x.day}</td>
                        <td>{x.servedTitle} <span className={s.slug}>({x.served})</span></td>
                        <td><span className={s.slug}>{x.defaultCard ?? "–"}</span></td>
                        <td>{x.moved ? "yes" : "no"}</td>
                        <td><code>{x.rankCode}</code>{x.versus ? <span className={s.slug}> vs {x.versus}</span> : null}</td>
                        {moves && <MoveCells m={x.move} />}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {moves && (
              <section className={s.panel} aria-labelledby="rc-h">
                <h2 id="rc-h">RC&apos;s seven lines ({DRAFT_LINES_LABEL})</h2>
                <Label />
                <p className={s.muted}>Templates verbatim from <Link href={`/hq/library/${RC_RECORD.replace(/^company\//, "")}`}>{RC_RECORD}</Link> §2. <code>{"{title}"}</code> is the named lesson&apos;s title.</p>
                <table className={`${s.table} ${s.wrap}`}>
                  <thead><tr><th>line</th><th>key</th><th>template</th></tr></thead>
                  <tbody>
                    {RC_LINES.map((l) => (
                      <tr key={l.id}><td>{l.id}</td><td><code>{l.key}</code></td>
                        <td className={s.draft}>{l.template}{l.id === "L3" ? <> <span className={s.pending}>{L3_PENDING}</span></> : null}</td></tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
