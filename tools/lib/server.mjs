// Local servers for tools that drive a browser (W-851: port crosstalk).
//
// 2026-10-14: builders' servers answered requests meant for other builders (hist-1's :3621 got hist-3's
// slug). The cause was a tool picking a port by itself, failing to bind because another builder's server
// already held it, and then talking to that server as if it were its own (its `next start` failed
// silently and the readiness probe got a 200 from the neighbour). Page loads on the wrong server also send
// the lesson's /api/events beacons there, since the app posts same-origin.
//
// The rule here: a tool talks either to a URL it was given explicitly, or to the server it started
// itself and has checked is alive. Nothing falls back to a default port.
import net from "node:net";
import { spawn } from "node:child_process";

/** A port the OS says is free right now (bind :0, read it, release it). */
export function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.unref();
    s.on("error", reject);
    s.listen(0, () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

/** Resolves true if nothing holds the port (a bind on all interfaces succeeds). */
export function portIsFree(port) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.unref();
    s.once("error", () => resolve(false));
    s.listen(port, () => s.close(() => resolve(true)));
  });
}

async function answers(url) {
  try {
    await fetch(url, { signal: AbortSignal.timeout(2000) });
    return true;
  } catch {
    return false;
  }
}

/**
 * Start `next start` on an explicit port, or on a fresh OS-assigned one, and return { base, port, child }.
 * Fails loudly when the port is taken, when the server exits before it is ready, or when it never answers.
 */
export async function startNext({ port = null, env = process.env, timeoutMs = 60_000, label = "tool" } = {}) {
  const p = port == null ? await freePort() : Number(port);
  if (!Number.isInteger(p) || p <= 0) throw new Error(`${label}: bad port ${port}`);
  const base = `http://localhost:${p}`;
  if (!(await portIsFree(p)) || (await answers(base)))
    throw new Error(`${label}: port ${p} is already in use (another builder's server?). Refusing to use it: pass a free --port, or --url for a server you started yourself.`);
  const child = spawn("npx", ["next", "start", "-p", String(p)], { stdio: ["ignore", "ignore", "pipe"], detached: true, env });
  let stderr = "";
  child.stderr.on("data", (d) => (stderr = (stderr + d).slice(-4000)));
  let exited = null;
  child.on("exit", (code, sig) => (exited = { code, sig }));
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (exited) throw new Error(`${label}: next start on port ${p} exited before it was ready (code ${exited.code}${exited.sig ? `, ${exited.sig}` : ""}):\n${stderr.trim()}`);
    try {
      const r = await fetch(base, { signal: AbortSignal.timeout(5000) });
      // A 200 only counts if the server we spawned is still the one alive on the port.
      if (r.ok && !exited && child.exitCode === null) return { base, port: p, child, stop: () => stop(child) };
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  stop(child);
  throw new Error(`${label}: next start on port ${p} did not answer within ${Math.round(timeoutMs / 1000)} s (run \`npm run build\` first?)\n${stderr.trim()}`);
}

function stop(child) {
  try {
    process.kill(-child.pid);
  } catch {}
}

/** Validate an explicitly given base URL: absolute http(s), no trailing slash. */
export function explicitBase(url, label = "tool") {
  let u;
  try {
    u = new URL(String(url));
  } catch {
    throw new Error(`${label}: --url must be an absolute URL such as http://localhost:<your port>, got "${url}"`);
  }
  if (!/^https?:$/.test(u.protocol)) throw new Error(`${label}: --url must be http(s), got "${url}"`);
  return u.origin + u.pathname.replace(/\/+$/, "");
}
