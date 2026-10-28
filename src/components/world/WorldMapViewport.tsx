"use client";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cameraForOffset, cameraOffset, DEFAULT_CAMERA, MAX_ZOOM, MIN_ZOOM, zoomCamera, type WorldCamera } from "@/lib/world-camera";
import { WorldIcon } from "./WorldIcon";
import styles from "./world.module.css";

/** One scaleable canvas; native document scrolling remains the vertical camera coordinate. */
export function WorldMapViewport({ camera, onCameraChange, children, focusSlug }: { camera: WorldCamera; onCameraChange: (camera: WorldCamera) => void; children: ReactNode; focusSlug?: string }) {
  const viewport = useRef<HTMLDivElement>(null), content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0), [width, setWidth] = useState(0), [canvasWidth, setCanvasWidth] = useState(0), [dragging, setDragging] = useState(false);
  const live = useRef({ camera, onCameraChange, width, canvasWidth }); live.current = { camera, onCameraChange, width, canvasWidth };
  const pendingScroll = useRef<number | null>(null), suppressClick = useRef(false);
  const mouse = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  useLayoutEffect(() => {
    if (!viewport.current || !content.current) return;
    const observer = new ResizeObserver(() => { setWidth(viewport.current?.clientWidth ?? 0); setHeight(content.current?.offsetHeight ?? 0); setCanvasWidth(content.current?.offsetWidth ?? 0); });
    observer.observe(viewport.current); observer.observe(content.current);
    setWidth(viewport.current.clientWidth); setHeight(content.current.offsetHeight); setCanvasWidth(content.current.offsetWidth);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (pendingScroll.current !== null) { window.scrollTo({ top: Math.max(0, pendingScroll.current), behavior: "instant" }); pendingScroll.current = null; }
  }, [camera, height]);
  function reveal(target: HTMLElement) {
    const node = viewport.current; if (!node || !live.current.width) return;
    const rect = node.getBoundingClientRect(), leaf = target.getBoundingClientRect();
    if (leaf.left >= rect.left && leaf.right <= rect.right) return;
    const { camera, width, canvasWidth } = live.current;
    const point = (leaf.left + leaf.width / 2 - rect.left - cameraOffset(camera, width, canvasWidth)) / camera.zoom;
    onCameraChange(cameraForOffset(camera.zoom, width / 2 - point * camera.zoom, width, canvasWidth));
  }
  useLayoutEffect(() => { if (focusSlug && width && canvasWidth) { const target = document.getElementById(`world-stop-${focusSlug}`); if (target) reveal(target); } }, [focusSlug, width, canvasWidth]);
  function zoom(next: number, x?: number, y?: number) {
    const node = viewport.current; if (!node || !live.current.width) return;
    const rect = node.getBoundingClientRect(), old = live.current.camera;
    const anchorX = x ?? rect.left + rect.width / 2;
    const anchorY = y ?? Math.max(110, Math.min(window.innerHeight * .45, rect.bottom));
    const nextCamera = zoomCamera(old, next, live.current.width, anchorX - rect.left, live.current.canvasWidth);
    if (nextCamera.zoom === old.zoom) return;
    pendingScroll.current = window.scrollY + ((anchorY - rect.top) / old.zoom) * (nextCamera.zoom - old.zoom);
    live.current.onCameraChange(nextCamera);
  }
  function reset() {
    const node = viewport.current; if (!node || !width) return;
    const rect = node.getBoundingClientRect(), target = node.querySelector<HTMLElement>('[aria-pressed="true"]')?.getBoundingClientRect();
    const pointX = target ? (target.left + target.width / 2 - rect.left - cameraOffset(camera, width, canvasWidth)) / camera.zoom : canvasWidth / 2;
    const pointY = target ? (target.top + target.height / 2 - rect.top) / camera.zoom : 0;
    pendingScroll.current = Math.max(0, rect.top + window.scrollY + pointY - window.innerHeight * .42);
    onCameraChange(cameraForOffset(DEFAULT_CAMERA.zoom, width / 2 - pointX, width, canvasWidth));
  }
  useEffect(() => {
    const node = viewport.current; if (!node) return;
    type Finger = { x: number; y: number; moved: boolean; horizontal: boolean };
    type Pinch = { distance: number; zoom: number; pointX: number; pointY: number; documentTop: number };
    let finger: Finger | null = null, pinch: Pinch | null = null;
    const start = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const [a, b] = Array.from(event.touches), rect = node.getBoundingClientRect(), { camera, width, canvasWidth } = live.current;
        const x = (a.clientX + b.clientX) / 2, y = (a.clientY + b.clientY) / 2;
        pinch = { distance: Math.max(1, Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)), zoom: camera.zoom, pointX: (x - rect.left - cameraOffset(camera, width, canvasWidth)) / camera.zoom, pointY: (y - rect.top) / camera.zoom, documentTop: rect.top + window.scrollY };
        finger = null; suppressClick.current = true; event.preventDefault();
      } else if (event.touches.length === 1) {
        const t = event.touches[0]; finger = { x: t.clientX, y: t.clientY, moved: false, horizontal: false }; pinch = null; suppressClick.current = false;
      }
    };
    const move = (event: TouchEvent) => {
      if (pinch && event.touches.length === 2) {
        event.preventDefault(); const [a, b] = Array.from(event.touches), rect = node.getBoundingClientRect(), { width, canvasWidth } = live.current;
        const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinch.zoom * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / pinch.distance));
        pendingScroll.current = pinch.documentTop + pinch.pointY * zoom - (a.clientY + b.clientY) / 2;
        live.current.onCameraChange(cameraForOffset(zoom, (a.clientX + b.clientX) / 2 - rect.left - pinch.pointX * zoom, width, canvasWidth));
      } else if (finger && event.touches.length === 1 && live.current.canvasWidth * live.current.camera.zoom > live.current.width) {
        const t = event.touches[0], dx = t.clientX - finger.x, dy = t.clientY - finger.y;
        if (!finger.moved && Math.hypot(dx, dy) > 8) { finger.moved = true; finger.horizontal = Math.abs(dx) > Math.abs(dy) * 1.15; }
        if (finger.horizontal) {
          event.preventDefault(); suppressClick.current = true;
          const { camera, width, canvasWidth } = live.current;
          live.current.onCameraChange(cameraForOffset(camera.zoom, cameraOffset(camera, width, canvasWidth) + dx, width, canvasWidth));
          finger.x = t.clientX; finger.y = t.clientY;
        }
      }
    };
    const end = (event: TouchEvent) => {
      if (event.touches.length === 1 && pinch) { const t = event.touches[0]; finger = { x: t.clientX, y: t.clientY, moved: true, horizontal: false }; }
      else if (!event.touches.length) finger = null;
      pinch = null; setDragging(false);
    };
    const cancel = () => { finger = null; pinch = null; setDragging(false); };
    const wheel = (event: WheelEvent) => { if (event.ctrlKey) { event.preventDefault(); zoom(live.current.camera.zoom * Math.exp(-event.deltaY * .007), event.clientX, event.clientY); } };
    node.addEventListener("touchstart", start, { passive: false }); node.addEventListener("touchmove", move, { passive: false });
    node.addEventListener("touchend", end); node.addEventListener("touchcancel", cancel); node.addEventListener("wheel", wheel, { passive: false });
    return () => { node.removeEventListener("touchstart", start); node.removeEventListener("touchmove", move); node.removeEventListener("touchend", end); node.removeEventListener("touchcancel", cancel); node.removeEventListener("wheel", wheel); };
  }, []);
  const release = () => { const node = viewport.current, active = mouse.current; if (active && node?.hasPointerCapture(active.id)) node.releasePointerCapture(active.id); mouse.current = null; setDragging(false); };
  useEffect(() => { const cancel = (event: KeyboardEvent) => { if (event.key === "Escape") release(); }; window.addEventListener("keydown", cancel); return () => window.removeEventListener("keydown", cancel); }, []);
  useEffect(() => () => { const active = mouse.current; if (active && viewport.current?.hasPointerCapture(active.id)) viewport.current.releasePointerCapture(active.id); }, []);
  return <>
    <div className={styles.mapTools} aria-label="Map zoom controls" data-world-control>
      <button type="button" aria-label="Zoom out" disabled={camera.zoom <= MIN_ZOOM} onClick={() => zoom(camera.zoom - .25)}><WorldIcon name="minus"/></button>
      <output aria-live="polite" aria-label="Map magnification">{Math.round(camera.zoom * 100)}%</output>
      <button type="button" aria-label="Zoom in" disabled={camera.zoom >= MAX_ZOOM} onClick={() => zoom(camera.zoom + .25)}><WorldIcon name="plus"/></button>
      <button type="button" aria-label="Reset zoom and position" onClick={reset}><WorldIcon name="reset"/></button>
      <span className={styles.mapHint}>{"Drag sideways · pinch to zoom"}</span>
    </div>
    <div ref={viewport} className={`${styles.mapViewport} ${canvasWidth * camera.zoom > width ? styles.zoomed : ""} ${dragging ? styles.dragging : ""}`} style={height ? { height: height * camera.zoom } : undefined} data-testid="world-map-viewport" data-zoom={camera.zoom} tabIndex={0} aria-label="World map. Use plus and minus to zoom, zero to reset."
      onFocusCapture={event => { const target = event.target as HTMLElement; if (target.id.startsWith("world-stop-")) reveal(target); }}
      onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(camera.zoom + .25); } else if (event.key === "-") { event.preventDefault(); zoom(camera.zoom - .25); } else if (event.key === "0") { event.preventDefault(); reset(); } else if (event.key === "Escape") release(); }}
      onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
      onPointerDown={event => { if (event.pointerType === "mouse" && event.button === 0) suppressClick.current = false; if (event.pointerType !== "mouse" || event.button !== 0 || canvasWidth * camera.zoom <= width || (event.target as HTMLElement).closest("a,input,select,textarea")) return; suppressClick.current = false; mouse.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }; }}
      onPointerMove={event => { const active = mouse.current; if (!active || event.pointerId !== active.id) return; const dx = event.clientX - active.x, dy = event.clientY - active.y; if (!active.moved && Math.hypot(dx, dy) < 8) return; active.moved = true; suppressClick.current = true; setDragging(true); if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId); onCameraChange(cameraForOffset(camera.zoom, cameraOffset(camera, width, canvasWidth) + dx, width, canvasWidth)); window.scrollBy(0, -dy); active.x = event.clientX; active.y = event.clientY; }}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
      <div ref={content} className={styles.mapCanvas} style={{ transform: `translateX(${cameraOffset(camera, width, canvasWidth)}px) scale(${camera.zoom})`, position: height ? "absolute" : "relative" }}>{children}</div>
    </div>
  </>;
}
