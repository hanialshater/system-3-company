import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { curriculumIndex } from "@/lib/hq-curriculum";
import Curriculum from "./Curriculum";

export const dynamic = "force-dynamic";
export const metadata = { title: "Curriculum — System 3 HQ" };

export default async function CurriculumPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;
  return <Curriculum index={curriculumIndex()} initialConcept={one(q.concept)} initialCompare={(one(q.compare) ?? "").split(",").filter(Boolean).slice(0, 3)} />;
}
