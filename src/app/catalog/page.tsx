import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { allDemos, domains } from "@/lib/catalog";

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
          const lessons = allDemos.filter((x) => x.domain === d.id && x.status !== "retired" && x.status !== "draft");
          return (
            <section key={d.id} className="domain-block" style={{ ["--domain" as string]: d.color }}>
              <h2>
                <span className="tag domain">{d.short}</span> {d.name}
                {d.status !== "active" && <span className="tag status">{d.status}</span>}
              </h2>
              <ul className="concepts">
                {concepts.map((c) => {
                  const ls = lessons.filter((l) => l.concept === c.id);
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
