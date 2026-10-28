import Link from "next/link";
import { LESSON_STATUS_LABEL } from "@/lib/lesson-status";
import fs from "node:fs";
import path from "node:path";
import { domains, visibleDemos } from "@/lib/catalog";
import algorithms from "../../../content/algorithms-200.json";

interface Concept {
  id: string;
  name: string;
  level?: string;
  demand?: number;
  prerequisites?: string[];
}

function curriculum(id: string): Concept[] {
  try {
    const p = path.join(process.cwd(), "content/curriculum", `${id}.json`);
    return JSON.parse(fs.readFileSync(p, "utf8")).concepts ?? [];
  } catch {
    return [];
  }
}

export const metadata = { title: "Map — System 3" };

export default function Catalog() {
  const visible = visibleDemos();
  const topics = [...algorithms.topics].sort((a, b) => a.order - b.order);
  const groupedSlugs = new Set(topics.flatMap((topic) => topic.slugs));
  const groupedConcepts = new Set(topics.flatMap((topic) => topic.concepts.map((c) => c.id)));
  return (
    <main className="catalog">
      <nav className="topbar">
        <Link className="brand" href="/">
          S3
        </Link>
        <span className="muted small">The map: what we teach, and what we do not teach yet</span>
        <Link className="brand-link" href="/">
          Feed
        </Link>
      </nav>
      <div className="catalog-inner">
        {domains.map((d) => {
          const concepts = curriculum(d.id);
          const lessons = visible.filter((x) => x.domain === d.id);
          const mapped = new Set(concepts.map((c) => c.id));
          if (d.id === "cs") for (const c of groupedConcepts) mapped.add(c);
          const unmapped = lessons.filter((lesson) => !mapped.has(lesson.concept));
          return (
            <section key={d.id} className="domain-block" style={{ ["--domain" as string]: d.color }}>
              <h2>
                <span className="tag domain">{d.short}</span> {d.name}
                {d.status !== "active" && <span className="tag status">{d.status}</span>}
              </h2>
              {d.id === "games" && <p><Link href="/games" className="concept-lesson">Browse games by group and materials →</Link></p>}
              {d.id === "history" && <p><Link href="/history" className="concept-lesson">Explore interactive history map stories →</Link></p>}
              {/* Algorithms (decision company/decisions/2026-10-16-pr6-catalog-algorithms-section.md R1-R5):
                  only visible lessons; no planned titles or counts; nothing when none is visible. */}
              {d.id === "cs" && (() => {
                const shown = topics
                  .map((topic) => {
                    const topicLessons = lessons.filter((lesson) => topic.slugs.includes(lesson.slug));
                    const rows = topic.concepts
                      .map((concept) => ({ concept, matching: topicLessons.filter((lesson) => lesson.concept === concept.id) }))
                      .filter((row) => row.matching.length);
                    return { topic, rows };
                  })
                  .filter((entry) => entry.rows.length);
                if (!shown.length) return null;
                return <section id="algorithms" className="algorithm-topics" aria-labelledby="algorithms-heading">
                  <h3 id="algorithms-heading">Algorithms</h3>
                  <p className="muted small">Grouped by topic.</p>
                  <nav className="algorithm-topic-index" aria-label="Algorithm topics">
                    {shown.map(({ topic }) => <a key={topic.id} href={`#algorithm-topic-${topic.id}`}>{topic.name}</a>)}
                  </nav>
                  {shown.map(({ topic, rows }) => <section key={topic.id} id={`algorithm-topic-${topic.id}`} className="algorithm-topic" aria-labelledby={`algorithm-heading-${topic.id}`}>
                    <h4 id={`algorithm-heading-${topic.id}`}>{topic.name}</h4>
                    <ul className="concepts">
                      {rows.map(({ concept, matching }) => <li key={concept.id} className="has">
                        <span className="concept-name">{concept.name}</span>
                        {matching.map((lesson) => <Link key={lesson.slug} href={`/d/${lesson.slug}`} className="concept-lesson">
                          {lesson.title}{lesson.status !== "published" && <span className="muted tiny"> · {LESSON_STATUS_LABEL[lesson.status]}</span>}
                        </Link>)}
                      </li>)}
                    </ul>
                  </section>)}
                </section>;
              })()}
              <ul className="concepts">
                {concepts.filter((c) => d.id !== "games" && (d.id !== "cs" || !groupedConcepts.has(c.id))).map((c) => {
                  const ls = lessons.filter((l) => l.concept === c.id && (d.id !== "cs" || !groupedSlugs.has(l.slug)));
                  return (
                    <li key={c.id} className={ls.length ? "has" : "unmet"}>
                      <span className="concept-name">{c.name}</span>
                      {ls.length ? (
                        ls.map((l) => (
                          <Link key={l.slug} href={`/d/${l.slug}`} className="concept-lesson">
                            {l.title}
                            {l.status !== "published" && <span className="muted tiny"> · {LESSON_STATUS_LABEL[l.status]}</span>}
                          </Link>
                        ))
                      ) : (
                        <span className="muted tiny">not yet taught</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              {unmapped.length > 0 && <>
                <h3>More lessons</h3>
                <ul className="concepts">{unmapped.map((lesson) => <li key={lesson.slug} className="has">
                  <Link href={`/d/${lesson.slug}`} className="concept-lesson">{lesson.title}
                    {lesson.status !== "published" && <span className="muted tiny"> · {LESSON_STATUS_LABEL[lesson.status]}</span>}
                  </Link>
                </li>)}</ul>
              </>}
            </section>
          );
        })}
      </div>
    </main>
  );
}
