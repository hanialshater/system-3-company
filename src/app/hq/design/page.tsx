import { notFound, redirect } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { designIndex } from "@/lib/hq-design";
import Design from "./Design";

export const dynamic = "force-dynamic";
export const metadata = { title: "Design inspector — System 3 HQ" };

// Links: /hq/design?concept=<ui-concept>&lessons=a,b&vs=<ui-concept>&view=proposals
// Links from before 2026-10-13 (?concept=<curriculum concept>, ?compare=a,b) go to /hq/curriculum.
export default async function DesignPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;
  const index = designIndex();
  const concept = one(q.concept);
  const isUi = (x: string | null) => Boolean(x && index.concepts.some((c) => c.id === x));
  if ((concept && !isUi(concept)) || (q.compare && !isUi(concept))) {
    const u = new URLSearchParams();
    for (const [k, v] of Object.entries(q)) if (typeof v === "string") u.set(k, v);
    redirect(`/hq/curriculum?${u.toString().replace(/%3A/g, ":").replace(/%2C/g, ",")}`);
  }
  const csv = (v: string | string[] | undefined) => (one(v) ?? "").split(",").filter(Boolean);
  return <Design index={index} initial={{ concept, lessons: csv(q.lessons).slice(0, 3), vs: one(q.vs), view: one(q.view) === "proposals" ? "proposals" : "concepts" }} />;
}
