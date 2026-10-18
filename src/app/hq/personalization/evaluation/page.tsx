import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import index from "@/data/hq-personalization-eval/evaluation.json";
import Evaluation, { type EvalIndex } from "./Evaluation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Evaluation — Personalization — System 3 HQ" };

// The eval org's record (W-1648; batch 5 §20.3). The index is bundled at build time from committed records
// (tools/hq-eval-index.mjs); nothing reads company/ or runs anything when the page is served.
export default function EvaluationPage() {
  if (!hqEnabled()) notFound();
  return <Evaluation index={index as unknown as EvalIndex} />;
}
