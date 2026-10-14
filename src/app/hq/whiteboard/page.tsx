import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOMS, hqEnabled } from "@/lib/hq";
import { listSketches } from "@/lib/hq-whiteboard-server";
import { HqTop } from "../HqTop";
import s from "./whiteboard.module.css";
import hq from "../hq.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Whiteboards — System 3 HQ" };

// The board list: one whiteboard per meeting room, with its saved sketches.
export default function BoardsPage() {
  if (!hqEnabled()) notFound();
  const rooms = ROOMS.filter((r) => r.kind === "meeting");
  return (
    <div className={hq.hq}>
      <HqTop on="office" subtitle="Whiteboards" />
      <div className={s.page}>
        <h1 style={{ fontSize: 20 }}>Meeting whiteboards</h1>
        <p style={{ fontSize: 13, opacity: 0.8 }}>Sketches are JSON files under company/meetings/whiteboards/. Agents can write them by hand (see the README there).</p>
        <div className={s.list}>
          {rooms.map((r) => {
            const files = listSketches(r.id);
            return (
              <div key={r.id} className={s.card}>
                <h2>
                  <Link href={`/hq/whiteboard/${r.id}`}>{r.name}</Link>
                </h2>
                {files.length === 0 ? (
                  <span style={{ fontSize: 13, opacity: 0.7 }}>No sketches yet</span>
                ) : (
                  <ul>
                    {files.map((f) => (
                      <li key={f}>
                        <Link href={`/hq/whiteboard/${r.id}?f=${encodeURIComponent(f)}`}>{f.replace(/\.json$/, "")}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
