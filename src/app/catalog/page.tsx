import Link from "next/link";
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
          return (
            <section key={d.id} className="domain-block" style={{ ["--domain" as string]: d.color }}>
              <h2>
                <span className="tag domain">{d.short}</span> {d.name}
                {d.status !== "active" && <span className="tag status">{d.status}</span>}
              </h2>
              {d.id === "cs" && <section id="algorithms" className="algorithm-topics" aria-labelledby="algorithms-heading">
                <h3 id="algorithms-heading">Algorithms</h3>
                <p className="muted small">200 planned lessons across 20 topics. Links appear as lessons become visible.</p>
                <nav className="algorithm-topic-index" aria-label="Algorithm topics">
                  {topics.map((topic) => <a key={topic.id} href={`#algorithm-topic-${topic.id}`}>{topic.name}</a>)}
                </nav>
                {topics.map((topic) => {
                  const topicLessons = lessons.filter((lesson) => topic.slugs.includes(lesson.slug));
                  return <section key={topic.id} id={`algorithm-topic-${topic.id}`} className="algorithm-topic" aria-labelledby={`algorithm-heading-${topic.id}`}>
                    <h4 id={`algorithm-heading-${topic.id}`}>{topic.name}</h4>
                    <p className="muted small">{topicLessons.length} visible · {topic.slugs.length} planned</p>
                    {!topicLessons.length && <p className="muted small">Not yet visible</p>}
                    <ul className="concepts">
                      {topic.concepts.map((concept) => {
                        const matching = topicLessons.filter((lesson) => lesson.concept === concept.id);
                        return <li key={concept.id} className={matching.length ? "has" : "unmet"}>
                          <span className="concept-name">{concept.name}</span>
                          {matching.length ? matching.map((lesson) => <Link key={lesson.slug} href={`/d/${lesson.slug}`} className="concept-lesson">
                            {lesson.title}{lesson.status !== "published" && <span className="muted tiny"> · in review</span>}
                          </Link>) : <span className="muted tiny">not yet visible</span>}
                        </li>;
                      })}
                    </ul>
                  </section>;
                })}
              </section>}
              <ul className="concepts">
                {concepts.filter((c) => d.id !== "cs" || !groupedConcepts.has(c.id)).map((c) => {
                  const ls = lessons.filter((l) => l.concept === c.id && (d.id !== "cs" || !groupedSlugs.has(l.slug)));
                  return (
                    <li key={c.id} className={ls.length ? "has" : "unmet"}>
                      <span className="concept-name">{c.name}</span>
                      {ls.length ? (
                        ls.map((l) => (
                          <Link key={l.slug} href={`/d/${l.slug}`} className="concept-lesson">
                            {l.title}
                            {l.status !== "published" && <span className="muted tiny"> · in review</span>}
                          </Link>
                        ))
                      ) : (
                        <span className="muted tiny">not yet taught</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
