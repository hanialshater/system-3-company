import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { loadFirstLight } from "@/lib/hq-firstlight-server";
import FirstLight from "./FirstLight";

export const dynamic = "force-dynamic";
export const metadata = { title: "First Light war room — System 3 HQ" };

export default function FirstLightPage() {
  if (!hqEnabled()) notFound();
  return <FirstLight data={loadFirstLight()} nowIso={new Date().toISOString()} />;
}
