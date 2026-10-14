// A small "board" tab on every meeting room in the floor plan, linking to that room's whiteboard.
import type { Room } from "@/lib/hq";

export function WhiteboardLinks({ rooms }: { rooms: Room[] }) {
  return (
    <>
      {rooms
        .filter((r) => r.kind === "meeting")
        .map((r) => (
          <a key={`wb-${r.id}`} href={`/hq/whiteboard/${r.id}`} aria-label={`${r.name} whiteboard`} onClick={(e) => e.stopPropagation()} style={{ cursor: "pointer" }}>
            <title>{`Whiteboard · ${r.name}`}</title>
            <rect x={r.x + r.w - 40} y={r.y + r.h - 22} width={34} height={16} rx={4} fill="#ffffff" stroke="#7c9cff" />
            <text x={r.x + r.w - 23} y={r.y + r.h - 10.5} textAnchor="middle" fontSize={9} fill="#1f2430" fontWeight={600}>
              board
            </text>
          </a>
        ))}
    </>
  );
}
