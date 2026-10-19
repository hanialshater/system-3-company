import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { loadRnd } from "@/lib/hq-rnd";
import Rnd from "./Rnd";

export const dynamic = "force-dynamic";
export const metadata = { title: "R&D — System 3 HQ" };

export default function RndPage() {
  if (!hqEnabled()) notFound();
  const { projects, error } = loadRnd();
  return <Rnd projects={projects} error={error} />;
}
