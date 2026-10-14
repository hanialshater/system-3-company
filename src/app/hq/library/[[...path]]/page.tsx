import { notFound, redirect } from "next/navigation";
import { hqEnabled, loadOrg } from "@/lib/hq";
import { DEFAULT_TYPES, TYPES, buildIndex, loadDoc, parseTypes, search, typeCounts } from "@/lib/hq-library";
import Library from "../Library";

export const dynamic = "force-dynamic";
export const metadata = { title: "Library — System 3 HQ" };

// Links: /hq/library?q=<text>&type=report,decision&sort=newest   and   /hq/library/<path under company/>
// (for example /hq/library/rituals/records/2026-10-13-wbr.md; a progress entry is ops/progress.md@<slug>).
export default async function LibraryPage({ params, searchParams }: { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const [{ path }, sp] = await Promise.all([params, searchParams]);
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const rel = (path ?? []).map(decodeURIComponent).join("/");
  const doc = rel ? loadDoc(rel) : null;
  if (rel && !doc) notFound();
  // An old progress link (slug from the heading) lands on the entry's stable address.
  if (doc && doc.path !== rel) redirect(`/hq/library/${doc.path.split("/").map(encodeURIComponent).join("/").replace(/%40/g, "@")}`);
  const q = one(sp.q).slice(0, 200);
  const typeParam = one(sp.type);
  const types = parseTypes(typeParam);
  // A deep link to a doc in a hidden type turns that type on, so the list shows it too.
  if (doc && !types.includes(doc.type)) types.push(doc.type);
  const sort = one(sp.sort);
  const sortKey = sort === "newest" || sort === "oldest" || sort === "relevance" ? sort : undefined;
  const docs = buildIndex();
  const first = search(docs, { q, types, sort: sortKey });
  return (
    <Library
      org={loadOrg().map((o) => ({ id: o.id, title: o.title }))}
      typeDefs={TYPES}
      defaults={DEFAULT_TYPES}
      all={typeCounts(docs)}
      initial={{ q, types, sort: sortKey ?? null, result: first, doc }}
    />
  );
}
