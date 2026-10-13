import { notFound } from "next/navigation";
import { ROOMS, founderQueue, hqEnabled, loadEvents, ritualsDue } from "@/lib/hq";
import HQ from "./HQ";

export const dynamic = "force-dynamic";
export const metadata = { title: "HQ — System 3 Company" };

export default function HqPage() {
  if (!hqEnabled()) notFound();
  return <HQ events={loadEvents()} rooms={ROOMS} founderQueue={founderQueue()} due={ritualsDue()} />;
}
