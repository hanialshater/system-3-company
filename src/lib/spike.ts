// Guards for the SPIKE-001 host route (src/app/spike) and the event intake (W-477, S1).
//
// The spike frames lesson bundles from a second origin. In production nobody can reach it: the
// route answers 404 unless NODE_ENV is "development" or the server-side flag SPIKE_ENABLED=1 is
// set. When it is reachable, the lesson origin comes from a server-side allow-list
// (SPIKE_CDN_ORIGINS, comma-separated; default http://localhost:3141). A `?cdn=` value only
// *selects* an allow-listed entry; the string from the URL never becomes a frame or script source.
// Pure functions of their inputs so tests/spike/spike-guard.test.mjs can check them without a build.

type Env = Record<string, string | undefined>;

export const SPIKE_DEFAULT_CDN = "http://localhost:3141";

/** True only in `next dev`, or when an operator sets SPIKE_ENABLED=1 on the server. */
export function spikeEnabled(env: Env = process.env): boolean {
  return env.NODE_ENV === "development" || env.SPIKE_ENABLED === "1";
}

/** Normalise to a bare http(s) origin, or null. Rejects userinfo, paths and other schemes. */
export function originOf(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const u = new URL(value);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (u.username || u.password) return null;
    return u.origin;
  } catch {
    return null;
  }
}

export function spikeCdnAllowlist(env: Env = process.env): string[] {
  const raw = env.SPIKE_CDN_ORIGINS ?? SPIKE_DEFAULT_CDN;
  const list = raw
    .split(",")
    .map((s) => originOf(s.trim()))
    .filter((o): o is string => !!o);
  return list.length ? [...new Set(list)] : [SPIKE_DEFAULT_CDN];
}

/** The allow-listed origin the request asked for, else the first allow-listed origin. */
export function resolveSpikeCdn(requested: string | null | undefined, allowlist: string[]): string {
  const want = originOf(requested);
  return allowlist.find((o) => o === want) ?? allowlist[0];
}

/** Absolute URL of a manifest path on the CDN, or null if it would leave the CDN origin. */
export function frameUrlOn(cdn: string, path: string): string | null {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return null;
  try {
    const u = new URL(path, cdn);
    return u.origin === cdn ? u.href : null;
  } catch {
    return null;
  }
}

/**
 * May this request write to /api/events? Refused when:
 * - the Origin header is "null" (a sandboxed frame such as the spike's lessons) or another origin;
 * - Sec-Fetch-Site says cross-site or cross-origin;
 * - its Referer is another origin, or the /spike page (spike traffic never enters the metrics).
 * Requests with no Origin header (curl, older beacons) pass; the intake is anonymous anyway.
 */
export function eventWriteAllowed(req: { url: string; headers: { get(name: string): string | null } }): boolean {
  // Our own host as the browser saw it (proxies such as Vercel's may rewrite req.url).
  const hosts = new Set<string>();
  try {
    hosts.add(new URL(req.url).host);
  } catch {
    /* ignore */
  }
  for (const h of [req.headers.get("x-forwarded-host"), req.headers.get("host")]) if (h) hosts.add(h.split(",")[0].trim());
  const sameHost = (value: string) => {
    const o = originOf(value);
    return !!o && hosts.has(new URL(o).host);
  };
  const origin = req.headers.get("origin");
  if (origin !== null && (origin === "null" || !sameHost(origin))) return false;
  const site = req.headers.get("sec-fetch-site");
  if (site === "cross-site" || site === "cross-origin") return false;
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const r = new URL(referer);
      if (!sameHost(r.origin)) return false;
      // Spike traffic is a harness, never a learner: it stays out of the metrics in every env.
      if (/^\/spike(\/|$)/.test(r.pathname)) return false;
    } catch {
      return false;
    }
  }
  return true;
}
