import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { designIndex } from "@/lib/hq-design";
import Design from "./Design";

export const dynamic = "force-dynamic";
export const metadata = { title: "Design inspector — System 3 HQ" };

export default async function DesignPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;
  return <Design index={designIndex()} initialConcept={one(q.concept)} initialCompare={(one(q.compare) ?? "").split(",").filter(Boolean).slice(0, 3)} />;
}
