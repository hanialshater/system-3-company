/** Navigation-only camera math. No learner progress or account state. */
export interface WorldCamera { zoom: number; pan: number }
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 2;
export const DEFAULT_CAMERA: WorldCamera = { zoom: 1, pan: .5 };
const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n));
export function readCamera(value: unknown): WorldCamera {
  const v = value && typeof value === "object" ? value as Partial<WorldCamera> : {};
  const zoom = typeof v.zoom === "number" && Number.isFinite(v.zoom) ? clamp(v.zoom, MIN_ZOOM, MAX_ZOOM) : 1;
  const pan = typeof v.pan === "number" && Number.isFinite(v.pan) ? clamp(v.pan, 0, 1) : .5;
  return { zoom, pan };
}
export function cameraOffset(camera: WorldCamera, width: number, canvasWidth = width) { const offset = -Math.max(0, canvasWidth * camera.zoom - width) * camera.pan; return offset === 0 ? 0 : offset; }
export function cameraForOffset(zoom: number, offset: number, width: number, canvasWidth = width): WorldCamera {
  const bounded = readCamera({ zoom, pan: 0 });
  const overflow = Math.max(0, canvasWidth * bounded.zoom - width);
  return { zoom: bounded.zoom, pan: overflow > 0 ? clamp(-offset / overflow, 0, 1) : 0 };
}
/** Retain the content coordinate under a viewport anchor when changing magnification. */
export function zoomCamera(camera: WorldCamera, nextZoom: number, width: number, anchorX: number, canvasWidth = width): WorldCamera {
  const point = (anchorX - cameraOffset(camera, width, canvasWidth)) / camera.zoom;
  const zoom = readCamera({ zoom: nextZoom }).zoom;
  return cameraForOffset(zoom, anchorX - point * zoom, width, canvasWidth);
}
