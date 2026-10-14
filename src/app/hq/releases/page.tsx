import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { loadReleases, loadUnreleased } from "@/lib/hq-releases-server";
import Releases from "./Releases";

export const dynamic = "force-dynamic";
export const metadata = { title: "Releases — System 3 HQ" };

export default function ReleasesPage() {
  if (!hqEnabled()) notFound();
  const { releases, error } = loadReleases();
  return <Releases releases={releases} error={error} unreleased={loadUnreleased(releases)} />;
}
