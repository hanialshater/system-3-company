import { notFound } from "next/navigation";
import { ROOMS, hqEnabled } from "@/lib/hq";
import { isSketchFile, whiteboardWritable } from "@/lib/hq-whiteboard";
import { boardIds, listSketches, loadSketch } from "@/lib/hq-whiteboard-server";
import { HqTop } from "../../HqTop";
import Whiteboard from "../Whiteboard";
import s from "../whiteboard.module.css";
import hq from "../../hq.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Whiteboard — System 3 HQ" };

// /hq/whiteboard/<meeting room id>            a new sketch
// /hq/whiteboard/<meeting room id>?f=<file>   an existing sketch (company/meetings/whiteboards/<room>/<file>)
export default async function BoardPage({ params, searchParams }: { params: Promise<{ board: string }>; searchParams: Promise<{ f?: string | string[] }> }) {
  if (!hqEnabled()) notFound();
  const [{ board }, sp] = await Promise.all([params, searchParams]);
  if (!boardIds().includes(board)) notFound();
  const f = Array.isArray(sp.f) ? sp.f[0] : sp.f;
  const initial = f && isSketchFile(f) ? loadSketch(board, f) : null;
  if (f && !initial) notFound();
  const room = ROOMS.find((r) => r.id === board)!;
  const writable = whiteboardWritable();
  return (
    <div className={hq.hq}>
      <HqTop on="office" subtitle="Whiteboard" />
      <div className={s.page}>
        <Whiteboard
          key={f ?? "new"}
          board={board}
          boardName={room.name}
          file={initial ? f! : null}
          initial={initial}
          files={listSketches(board)}
          writable={writable}
          writeNote="Saving is off on this deployment: sketches would live outside git. You can draw and export a PNG; set WHITEBOARD_WRITE=1 to allow saves, or run HQ locally."
        />
      </div>
    </div>
  );
}
