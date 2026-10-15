// The First Light war room: one phone-readable page for the initiative's status, read live from
// company/initiatives/first-light/status.json plus the board, risks, founder inbox and stand-up records.
import Link from "next/link";
import { HqTop } from "../HqTop";
import hq from "../hq.module.css";
import { daysUntil, nextOccurrence, overallRag, riskScore, workstreamViews, type WsStatus } from "@/lib/hq-firstlight";
import type { FirstLightData, Record_ } from "@/lib/hq-firstlight-server";
import s from "./first-light.module.css";

const STATUS_CLASS: Record<WsStatus, string> = { "not started": s.sNot, "in progress": s.sGo, blocked: s.sBlocked, done: s.sDone };
const dayWord = (n: number) => (n < 0 ? `${-n} days ago` : n === 0 ? "today" : n === 1 ? "tomorrow" : `${n} days`);

function Countdown({ label, date, now }: { label: string; date: string; now: Date }) {
  const n = daysUntil(date, now);
  return (
    <div className={s.count}>
      <span className={s.countN}>{n < 0 ? "passed" : n}</span>
      <span className={s.countL}>{n < 0 ? "" : n === 1 ? "day to " : "days to "}{label}</span>
      <span className={s.muted}>{date}</span>
    </div>
  );
}

function RecordCard({ title, r, empty }: { title: string; r: Record_ | null; empty: string }) {
  return (
    <div className={s.rec}>
      <h3>{title}</h3>
      {r ? (
        <details open>
          <summary>{r.file.slice(0, 10)}</summary>
          <pre className={s.pre}>{r.text}</pre>
        </details>
      ) : (
        <p className={s.muted}>{empty}</p>
      )}
    </div>
  );
}

export default function FirstLight({ data, nowIso }: { data: FirstLightData; nowIso: string }) {
  const st = data.status;
  const now = new Date(nowIso);
  if (!st)
    return (
      <div className={hq.hq}>
        <HqTop on="first-light" subtitle="First Light war room" />
        <p role="alert" className={s.error}>{data.error}</p>
      </div>
    );
  const views = workstreamViews(st, data.board);
  const inbox = new Map(data.inbox.map((i) => [i.id, i]));
  const decisions = st.founder_decisions.map((d) => {
    const i = inbox.get(d.id);
    return { id: d.id, title: i?.title ?? d.title ?? d.id, status: i?.status ?? d.status ?? "open", rec: i?.recommendation, why: d.why, priority: i?.priority };
  });
  const open = decisions.filter((d) => d.status !== "decided");
  const { rag, why } = overallRag(views, open.length, st.dates.go_no_go, now);
  const riskById = new Map(data.risks.map((r) => [r.id, r]));
  const risks = st.risks
    .map((r) => {
      const real = riskById.get(r.id);
      const x = real ?? { id: r.id, title: r.title ?? r.id, likelihood: r.likelihood ?? 0, impact: r.impact ?? 0, owner: r.owner ?? "" };
      return { ...x, proposed: r.status === "proposed", why: r.why, score: riskScore(x) };
    })
    .sort((a, b) => b.score - a.score);
  const tally = (["blocked", "in progress", "not started", "done"] as WsStatus[]).map((k) => `${views.filter((v) => v.status === k).length} ${k}`);

  return (
    <div className={hq.hq}>
      <HqTop on="first-light" subtitle="First Light war room" />
      <main className={s.page}>
        {data.error && <p role="alert" className={s.error}>{data.error}</p>}

        <header className={s.header}>
          <div className={s.titleRow}>
            <h1>{st.code_name}</h1>
            <span className={`${s.rag} ${s[rag]}`} title={why}>{rag.toUpperCase()}</span>
          </div>
          <p className={s.muted}>Why {rag}: {why}.</p>
          <p className={s.muted}>{tally.join(" · ")}</p>
          <dl className={s.meta}>
            <div><dt>Owner</dt><dd>{st.owner}{st.owner_interim ? ` (interim: ${st.owner_interim})` : ""}</dd></div>
            <div><dt>Tech lead</dt><dd>{st.tech_lead}</dd></div>
            <div><dt>Status as of</dt><dd>{st.updated}</dd></div>
          </dl>
          <div className={s.counts}>
            <Countdown label="go/no-go" date={st.dates.go_no_go} now={now} />
            <Countdown label="launch" date={st.dates.launch} now={now} />
          </div>
          {st.dates.note && <p className={s.muted}>{st.dates.note}</p>}
          <p className={s.links}>
            <Link href={`/hq/whiteboard/${st.whiteboard}`}>Whiteboard</Link>
            <Link href="/hq/library/company/initiatives/first-light/charter.md">Charter</Link>
            <Link href="/hq/library/company/decisions/2026-10-15-founder-first-light.md">Founder decision</Link>
          </p>
        </header>

        <section aria-labelledby="ws">
          <h2 id="ws">Workstreams</h2>
          <table className={s.table}>
            <thead>
              <tr><th>Workstream</th><th>Owner</th><th>Status</th><th>Board items</th><th>Next step</th></tr>
            </thead>
            <tbody>
              {views.map((v) => (
                <tr key={v.id} id={v.id}>
                  <td data-label="Workstream"><strong>{v.name}</strong></td>
                  <td data-label="Owner" className={s.owner}>{v.owner}</td>
                  <td data-label="Status">
                    <span className={`${s.status} ${STATUS_CLASS[v.status]}`}>{v.status}</span>
                    {v.overridden && (
                      <span className={s.note}>
                        {v.derived !== v.status ? `Set by hand (board says ${v.derived}). ` : "Set by hand. "}{v.override!.note}
                      </span>
                    )}
                  </td>
                  <td data-label="Board items">
                    {v.items.length ? (
                      <ul className={s.items}>
                        {v.items.map((i) => (
                          <li key={i.id} title={i.title}>
                            <span className={s.itemId}>{i.id}</span> <span className={`${s.state} ${s["st_" + i.state]}`}>{i.state}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className={s.muted}>none yet</span>
                    )}
                  </td>
                  <td data-label="Next step">{v.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="fd">
          <h2 id="fd">Waiting on the founder ({open.length})</h2>
          {decisions.length ? (
            <ol className={s.cards}>
              {decisions.map((d) => (
                <li key={d.id} className={s.card}>
                  <div className={s.cardHead}>
                    <strong>{d.id}</strong>
                    <span className={`${s.status} ${d.status === "decided" ? s.sDone : s.sBlocked}`}>{d.status}</span>
                  </div>
                  <p>{d.title}</p>
                  <p className={s.muted}>{d.why}</p>
                  {d.rec && <p className={s.muted}><b>Recommended:</b> {d.rec}</p>}
                </li>
              ))}
            </ol>
          ) : (
            <p className={s.muted}>Nothing is waiting on you.</p>
          )}
        </section>

        <section aria-labelledby="rk">
          <h2 id="rk">Risks watched</h2>
          <ul className={s.cards}>
            {risks.map((r) => (
              <li key={r.id} className={s.card}>
                <div className={s.cardHead}>
                  <strong>{r.id}</strong>
                  <span className={s.score}>{r.likelihood} x {r.impact} = {r.score}</span>
                  {r.proposed && <span className={`${s.status} ${s.sNot}`}>proposed</span>}
                </div>
                <p>{r.title}</p>
                <p className={s.muted}>{r.why}{r.owner ? ` Owner: ${r.owner}.` : ""}</p>
              </li>
            ))}
          </ul>
          <p className={s.muted}>Proposed risks are not in company/ops/risks.json until principal-engineer-ops adds them.</p>
        </section>

        <section aria-labelledby="jf">
          <h2 id="jf">Jour fixe</h2>
          <ul className={s.cards}>
            {st.jour_fixe.map((f) => (
              <li key={f.id} className={s.card}>
                <div className={s.cardHead}>
                  <strong>{f.name}</strong>
                  <span className={s.muted}>{f.days.join(" and ")}{f.minutes ? `, ${f.minutes} min` : ""}</span>
                </div>
                <p className={s.muted}>{f.kind}. Next: {nextOccurrence(f.days, now)}.</p>
              </li>
            ))}
          </ul>
          <div className={s.recs}>
            <RecordCard title="Latest stand-up" r={data.standup} empty="No stand-up recorded yet. Records go in company/initiatives/first-light/standups/." />
            <RecordCard title="Latest founder review" r={data.review} empty="No founder review recorded yet." />
          </div>
        </section>

        <section aria-labelledby="an">
          <h2 id="an">Announcements</h2>
          <pre className={s.pre}>{data.announcements}</pre>
        </section>
      </main>
    </div>
  );
}
