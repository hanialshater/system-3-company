import { notFound } from "next/navigation";
import { hqEnabled, loadEvents, loadOrg } from "@/lib/hq";
import { kudosOf } from "@/lib/hq-kudos";
import { kudosWritable } from "@/lib/hq-kudos-server";
import Kudos from "./Kudos";

export const dynamic = "force-dynamic";
export const metadata = { title: "Kudos — System 3 HQ" };

export default function KudosPage() {
  if (!hqEnabled()) notFound();
  return <Kudos kudos={kudosOf(loadEvents())} org={loadOrg()} now={Date.now()} canGive={kudosWritable()} />;
}
