// The release log: one card per production deploy, newest first, with "what was added" folded open on demand,
// and a "Next release (unreleased)" section computed from the commits since the last release.
import Link from "next/link";
import { commitUrl, newestFirst, shortDate, type LessonGroup, type Release, type Unreleased } from "@/lib/hq-releases";
import s from "./releases.module.css";

const when = (iso: string) => iso.slice(0, 16).replace("T", " ") + " UTC";

function Lessons({ label, g }: { label: string; g: LessonGroup }) {
  if (!g.count) return null;
  return (
    <details className={s.slugs}>
      <summary>
        {label}: {g.count}
      </summary>
      <p>{g.slugs.join(", ")}</p>
    </details>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className={s.group}>
      <h4>{title}</h4>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Card({ r, open }: { r: Release; open: boolean }) {
  const a = r.added;
  const nothing = !a.features.length && !a.fixes.length && !a.known_issues.length && !a.lessons.published.count && !a.lessons.in_review.count;
  return (
    <li className={s.card} id={`v${r.version}`}>
      <div className={s.head}>
        <h2 className={s.version}>{r.version} · {shortDate(r.date)}</h2>
        <span className={s.badge}>{r.target}</span>
        <span className={s.muted}>{when(r.date)}</span>
        <a className={s.commit} href={commitUrl(r.commit)} target="_blank" rel="noreferrer">
          {r.commit.slice(0, 7)}
        </a>
      </div>
      <p className={s.summary}>{r.summary}</p>
      <p className={s.muted}>
        Approved by {r.approved_by.who}: {r.approved_by.record}
      </p>
      <details open={open} className={s.added}>
        <summary>What was added</summary>
        {nothing && <p className={s.muted}>Nothing recorded.</p>}
        <List title="Features" items={a.features} />
        <div className={s.group}>
          <h4>Lessons</h4>
          {a.lessons.published.count + a.lessons.in_review.count === 0 && <p className={s.muted}>No lesson changed status.</p>}
          <Lessons label="Published" g={a.lessons.published} />
          <Lessons label="Newly on the feed, In review" g={a.lessons.in_review} />
        </div>
        <List title="Fixes" items={a.fixes} />
        <List title="Known issues and holds" items={a.known_issues} />
        {r.backfill && <p className={s.muted}>Backfill: {r.backfill}</p>}
      </details>
    </li>
  );
}

export default function Releases({ releases, error, unreleased }: { releases: Release[]; error: string | null; unreleased: Unreleased }) {
  const last = releases[releases.length - 1];
  return (
    <main className={s.page}>
      <nav className={s.top}>
        <Link className="brand" href="/">
          S3
        </Link>
        <div className={s.title}>
          <strong>Releases</strong>
          <span className={s.muted}>
            {last ? `${releases.length} production releases · latest ${last.version} · ${shortDate(last.date)}` : "no releases recorded"}
          </span>
        </div>
        <span className={s.spacer} />
        <Link className="brand-link" href="/hq">
          ← HQ
        </Link>
      </nav>

      {error && (
        <p role="alert" className={s.error}>
          The release log is invalid: {error}
        </p>
      )}

      <section className={`${s.card} ${s.next}`} aria-label="Next release (unreleased)">
        <h2 className={s.nextTitle}>Next release (unreleased)</h2>
        <p className={s.muted}>
          {unreleased.error
            ? unreleased.error
            : `${unreleased.commits.length} commits on this branch since ${unreleased.base ? unreleased.base.slice(0, 7) + (last ? ` (${last.version})` : "") : "the start"}. Nothing here is live until the founder approves a deploy.`}
        </p>
        {unreleased.commits.length > 0 && (
          <details>
            <summary>Commits since the last release</summary>
            <ul className={s.commits}>
              {unreleased.commits.map((c) => (
                <li key={c.hash}>
                  <a href={commitUrl(c.hash)} target="_blank" rel="noreferrer">
                    {c.hash.slice(0, 7)}
                  </a>{" "}
                  {c.subject}
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>

      <ol className={s.list}>
        {newestFirst(releases).map((r, i) => (
          <Card key={r.version} r={r} open={i === 0} />
        ))}
      </ol>
    </main>
  );
}
