import { notFound } from "next/navigation";
import { ROOMS, hqEnabled, loadEvents } from "@/lib/hq";
import Chat from "./Chat";

export const dynamic = "force-dynamic";
export const metadata = { title: "Chat · HQ — System 3 Company" };

export default function ChatPage() {
  if (!hqEnabled()) notFound();
  return <Chat events={loadEvents().filter((e) => e.type !== "usage")} rooms={ROOMS.map(({ id, name }) => ({ id, name }))} />;
}
