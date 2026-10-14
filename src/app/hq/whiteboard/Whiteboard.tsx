"use client";

// The meeting whiteboard: plain SVG and pointer events (mouse, pen and touch). Shapes live in a
// 1000x700 board space. Saving writes company/meetings/whiteboards/<board>/<file> through /api/whiteboard.
import { useRef, useState } from "react";
import Link from "next/link";
import { WB_COLORS, WB_H, WB_W, sketchFileName, type Shape, type Sketch } from "@/lib/hq-whiteboard";
import s from "./whiteboard.module.css";

type Tool = "pen" | "rect" | "ellipse" | "line" | "arrow" | "text";
const TOOLS: { id: Tool; label: string }[] = [
  { id: "pen", label: "Pen" },
  { id: "rect", label: "Box" },
  { id: "ellipse", label: "Oval" },
  { id: "line", label: "Line" },
  { id: "arrow", label: "Arrow" },
  { id: "text", label: "Text" },
];
const AUTHOR = "founder";
const FONT = "system-ui, -apple-system, Segoe UI, sans-serif";

function arrowHead(x1: number, y1: number, x2: number, y2: number) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const l = 16;
  const p = (d: number) => `${x2 - l * Math.cos(a + d)},${y2 - l * Math.sin(a + d)}`;
  return `${x2},${y2} ${p(0.45)} ${p(-0.45)}`;
}

function bbox(sh: Shape): [number, number] {
  switch (sh.type) {
    case "stroke":
      return [Math.min(...sh.points.map((p) => p[0])), Math.min(...sh.points.map((p) => p[1]))];
    case "rect":
    case "ellipse":
      return [Math.min(sh.x, sh.x + sh.w), Math.min(sh.y, sh.y + sh.h)];
    case "line":
    case "arrow":
      return [Math.min(sh.x1, sh.x2), Math.min(sh.y1, sh.y2)];
    case "text":
      return [sh.x, sh.y - (sh.size ?? 22)];
    default:
      return [8, 8];
  }
}

function Draw({ sh, names }: { sh: Shape; names: boolean }) {
  const stroke = { stroke: sh.color, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let body = null;
  switch (sh.type) {
    case "stroke":
      body = sh.points.length === 1 ? <circle cx={sh.points[0][0]} cy={sh.points[0][1]} r={(sh.width ?? 3) / 2} fill={sh.color} /> : <polyline points={sh.points.map((p) => p.join(",")).join(" ")} {...stroke} strokeWidth={sh.width ?? 3} />;
      break;
    case "rect":
      body = <rect x={Math.min(sh.x, sh.x + sh.w)} y={Math.min(sh.y, sh.y + sh.h)} width={Math.abs(sh.w)} height={Math.abs(sh.h)} rx={4} {...stroke} />;
      break;
    case "ellipse":
      body = <ellipse cx={sh.x + sh.w / 2} cy={sh.y + sh.h / 2} rx={Math.abs(sh.w) / 2} ry={Math.abs(sh.h) / 2} {...stroke} />;
      break;
    case "line":
      body = <line x1={sh.x1} y1={sh.y1} x2={sh.x2} y2={sh.y2} {...stroke} />;
      break;
    case "arrow":
      body = (
        <>
          <line x1={sh.x1} y1={sh.y1} x2={sh.x2} y2={sh.y2} {...stroke} />
          <polygon points={arrowHead(sh.x1, sh.y1, sh.x2, sh.y2)} fill={sh.color} />
        </>
      );
      break;
    case "text":
      body = (
        <text x={sh.x} y={sh.y} fill={sh.color} fontSize={sh.size ?? 22} fontFamily={FONT}>
          {sh.text}
        </text>
      );
      break;
    case "svg":
      // An <image> never runs scripts, so a hand-written SVG is safe to show.
      body = <image href={`data:image/svg+xml;utf8,${encodeURIComponent(sh.svg)}`} x={0} y={0} width={WB_W} height={WB_H} />;
      break;
  }
  const [bx, by] = bbox(sh);
  return (
    <g data-author={sh.author}>
      {body}
      {names && (
        <text x={bx} y={Math.max(11, by - 5)} fontSize={11} fill={sh.color} opacity={0.85} fontFamily={FONT}>
          {sh.author}
        </text>
      )}
    </g>
  );
}

export default function Whiteboard({ board, boardName, file, initial, files, writable, writeNote }: { board: string; boardName: string; file: string | null; initial: Sketch | null; files: string[]; writable: boolean; writeNote: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const [shapes, setShapes] = useState<Shape[]>(initial?.shapes ?? []);
  const [past, setPast] = useState<Shape[][]>([]);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState<string>(WB_COLORS[0]);
  const [names, setNames] = useState(true);
  const [text, setText] = useState("");
  const [draft, setDraft] = useState<Shape | null>(null);
  const [msg, setMsg] = useState("");
  const [saved, setSaved] = useState<string | null>(file);
  const svg = useRef<SVGSVGElement>(null);
  const start = useRef<[number, number] | null>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const id = () => `f${Date.now().toString(36)}${nextId.current++}`;

  const at = (e: React.PointerEvent): [number, number] => {
    const r = svg.current!.getBoundingClientRect();
    const c = (v: number) => Math.round(v * 10) / 10;
    return [c(Math.max(0, Math.min(WB_W, ((e.clientX - r.left) / r.width) * WB_W))), c(Math.max(0, Math.min(WB_H, ((e.clientY - r.top) / r.height) * WB_H)))];
  };
  const commit = (sh: Shape) => {
    setPast((p) => [...p.slice(-49), shapes]);
    setShapes((cur) => [...cur, sh]);
    setMsg("");
  };
  const shapeTo = (t: Tool, [x0, y0]: [number, number], [x, y]: [number, number], prev?: Shape): Shape | null => {
    const base = { id: prev?.id ?? id(), color, author: AUTHOR };
    if (t === "pen") return { ...base, type: "stroke", points: [...(prev && prev.type === "stroke" ? prev.points : [[x0, y0] as [number, number]]), [x, y]] };
    if (t === "rect" || t === "ellipse") return { ...base, type: t, x: Math.min(x0, x), y: Math.min(y0, y), w: Math.abs(x - x0), h: Math.abs(y - y0) };
    if (t === "line" || t === "arrow") return { ...base, type: t, x1: x0, y1: y0, x2: x, y2: y };
    return null;
  };

  const down = (e: React.PointerEvent) => {
    if (e.button > 0) return;
    const p = at(e);
    if (tool === "text") {
      if (!text.trim()) {
        textRef.current?.focus();
        setMsg("Type the text first, then tap the board to place it.");
        return;
      }
      commit({ id: id(), type: "text", x: p[0], y: p[1], text: text.trim().slice(0, 500), size: 22, color, author: AUTHOR });
      setText("");
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = p;
    setDraft(shapeTo(tool, p, p));
  };
  const move = (e: React.PointerEvent) => {
    if (!start.current) return;
    const p = at(e);
    setDraft((d) => (tool === "pen" && d ? shapeTo("pen", start.current!, p, d) : shapeTo(tool, start.current!, p, d ?? undefined)));
  };
  const up = () => {
    if (start.current && draft) {
      const tiny = (draft.type === "rect" || draft.type === "ellipse") && draft.w < 3 && draft.h < 3;
      const nil = (draft.type === "line" || draft.type === "arrow") && Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1) < 3;
      if (!tiny && !nil) commit(draft);
    }
    start.current = null;
    setDraft(null);
  };

  const undo = () => {
    setPast((p) => {
      if (!p.length) return p;
      setShapes(p[p.length - 1]);
      return p.slice(0, -1);
    });
  };
  const clear = () => {
    if (!shapes.length) return;
    setPast((p) => [...p.slice(-49), shapes]);
    setShapes([]);
  };

  const save = async () => {
    const name = saved ?? sketchFileName(title || "sketch", today);
    const sketch: Sketch = { version: 1, board, title: title.trim() || "Sketch", created: initial?.created ?? new Date().toISOString(), shapes };
    setMsg("Saving…");
    try {
      const r = await fetch("/api/whiteboard", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ file: name, sketch }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setSaved(name);
        setMsg(`Saved to company/meetings/whiteboards/${board}/${name}. Commit it to keep it.`);
        if (!file) window.history.replaceState(null, "", `/hq/whiteboard/${board}?f=${encodeURIComponent(name)}`);
      } else setMsg(`Not saved: ${j.error ?? r.status}`);
    } catch {
      setMsg("Not saved: network error");
    }
  };

  const exportPng = () => {
    const el = svg.current;
    if (!el) return;
    const clone = el.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(WB_W * 2));
    clone.setAttribute("height", String(WB_H * 2));
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = WB_W * 2;
      c.height = WB_H * 2;
      const g = c.getContext("2d")!;
      g.fillStyle = "#ffffff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => {
        if (!b) return setMsg("Export failed");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = (saved ?? sketchFileName(title || "sketch", today)).replace(/\.json$/, ".png");
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      }, "image/png");
    };
    img.onerror = () => setMsg("Export failed");
    img.src = url;
  };

  const authors = [...new Set(shapes.map((x) => x.author))];
  return (
    <div className={s.wrap}>
      <div className={s.head}>
        <Link href="/hq/whiteboard" className={s.back}>
          All boards
        </Link>
        <h1>{boardName} whiteboard</h1>
      </div>
      <div className={s.files}>
        <Link href={`/hq/whiteboard/${board}`} className={!file ? s.on : ""}>
          + New sketch
        </Link>
        {files.map((f) => (
          <Link key={f} href={`/hq/whiteboard/${board}?f=${encodeURIComponent(f)}`} className={f === file ? s.on : ""}>
            {f.replace(/\.json$/, "")}
          </Link>
        ))}
      </div>
      <div className={s.bar} role="toolbar" aria-label="Whiteboard tools">
        {TOOLS.map((t) => (
          <button key={t.id} className={tool === t.id ? s.btnOn : s.btn} aria-pressed={tool === t.id} onClick={() => setTool(t.id)}>
            {t.label}
          </button>
        ))}
        <span className={s.sep} />
        {WB_COLORS.map((c) => (
          <button key={c} className={`${s.swatch} ${color === c ? s.swatchOn : ""}`} style={{ background: c }} aria-label={`Colour ${c}`} aria-pressed={color === c} onClick={() => setColor(c)} />
        ))}
        <span className={s.sep} />
        <button className={s.btn} onClick={undo} disabled={!past.length}>
          Undo
        </button>
        <button className={s.btn} onClick={clear} disabled={!shapes.length}>
          Clear
        </button>
        <button className={s.btn} onClick={exportPng}>
          PNG
        </button>
        <button className={s.btnSave} onClick={save} disabled={!writable}>
          Save
        </button>
      </div>
      {tool === "text" && <input ref={textRef} className={s.text} value={text} maxLength={500} placeholder="Type, then tap the board to place" onChange={(e) => setText(e.target.value)} />}
      <svg ref={svg} className={s.board} viewBox={`0 0 ${WB_W} ${WB_H}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="img" aria-label={`${boardName} whiteboard`}>
        <rect width={WB_W} height={WB_H} fill="#ffffff" />
        {shapes.map((sh) => (
          <Draw key={sh.id} sh={sh} names={names} />
        ))}
        {draft && <Draw sh={draft} names={false} />}
      </svg>
      <div className={s.foot}>
        <input className={s.title} value={title} maxLength={120} placeholder="Sketch title" onChange={(e) => setTitle(e.target.value)} aria-label="Sketch title" />
        <label className={s.check}>
          <input type="checkbox" checked={names} onChange={(e) => setNames(e.target.checked)} /> Show authors
        </label>
        {authors.length > 0 && <span className={s.authors}>By {authors.join(", ")}</span>}
      </div>
      {!writable && <p className={s.warn}>{writeNote}</p>}
      {msg && (
        <p className={s.msg} role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
