// R&D code-evolution leaderboards, read-only. Same ranking and numbers as `node tools/evolve.mjs board <project>`;
// the page scores nothing. The kit's candidate and the evaluator's warnings sit beside the top score on purpose,
// and each generation's written note is one click away (decision 2026-10-17-founder-rnd-leaderboard-in-hq).
import Link from "next/link";
import { HqTop } from "../HqTop";
import { noteHref, tests, type RndProject } from "@/lib/hq-rnd";
import s from "./rnd.module.css";

function Board({ p }: { p: RndProject }) {
  const top = p.rows[0], kit = p.rows.filter((r) => r.kit);
  return (
    <section className={s.project} id={p.name} aria-label={`${p.name} leaderboard`}>
      <h2>{p.name}</h2>
      <p className={s.muted}>
        Latest score per candidate, from <code>{p.archive}</code> ({p.records} records). Same as <code>{p.command}</code>.
      </p>
      {p.warning && <p role="alert" className={s.warn}>{p.warning.replace(/^warning: /, "Warning: ")}</p>}
      {top && kit.length > 0 && top.id !== kit[0].id && (
        <p className={s.note}>
          The top score is <strong>{top.id}</strong>, but the kit uses <strong>{kit.map((r) => r.id).join(", ")}</strong> (rank {kit.map((r) => r.rank).join(", ")}).
          The score is not the whole selection: read the notes below.
        </p>
      )}
      {top && kit.length === 0 && <p className={s.muted}>No candidate matches the kit&apos;s <code>{p.kit.dir}/draw.mjs</code>.</p>}
      <table className={s.table}>
        <thead>
          <tr><th>#</th><th>Candidate</th><th>Score</th><th>Tests</th><th>Size (gz B)</th><th>Bench seed</th><th>Parents</th></tr>
        </thead>
        <tbody>
          {p.rows.map((r) => (
            <tr key={r.id} className={r.kit ? s.kitRow : undefined}>
              <td>{r.rank}</td>
              <td>
                <code>{r.id}</code>
                {r.kit && <span className={s.badge} title={p.kit.how}>in the kit</span>}
                {!r.gated && <span className={s.gated} title={r.problems.join("; ") || "failed a test or a gate"}>gated out</span>}
              </td>
              <td className={s.num}>{r.score}</td>
              <td className={s.num}>{tests(r)}</td>
              <td className={s.num}>{r.gzBytes}</td>
              <td className={s.num}>{r.seed ?? "-"}</td>
              <td>{r.parents.join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={s.muted}>The kit&apos;s candidate is found by comparing <code>{p.kit.dir}/draw.mjs</code> with each candidate&apos;s, byte for byte.</p>
      <h3>Generation notes</h3>
      <ul>
        {[...p.notes, ...p.edds].map((n) => (
          <li key={n.path}>
            <Link href={noteHref(n)}>{n.title}</Link> <span className={s.muted}>({n.name})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Rnd({ projects, error }: { projects: RndProject[]; error: string | null }) {
  return (
    <main className={s.page}>
      <HqTop on="rnd" subtitle="R&D code-evolution leaderboard (read-only)" />
      <p className={s.muted}>
        The evaluator is fixed and owned by the R&amp;D lead; this page only shows its archive. Regenerate with <code>node tools/hq-rnd-precompute.mjs</code>.
      </p>
      {error && <p role="alert" className={s.warn}>{error}</p>}
      {projects.map((p) => <Board key={p.name} p={p} />)}
    </main>
  );
}
