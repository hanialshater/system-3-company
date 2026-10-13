"use client";

// SPIKE-001 (EDD-003 stage-1 spike; scratch branch, never merged).
// A host page that loads lessons as content-hashed bundles from a second origin (the "lesson
// CDN", spike/cdn-server.mjs) into <iframe sandbox="allow-scripts"> frames. The frames have an
// opaque origin and talk to this page only through postMessage. This page keeps everything a
// frame must not touch: cookies, storage (progress), the event intake, and its own DOM.
//
//   /spike                      feed of the manifest's lessons (scroll-snap, active ±1 mounted)
//   /spike?only=<slug>&mode=single   one lesson, laid out like /d/<slug>
//   ?cdn=http://localhost:3141  lesson origin (default NEXT_PUBLIC_SPIKE_CDN or :3141)

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface Entry {
  frame: string;
  bundle: string;
  kit: string;
  geo: boolean;
  title: string;
  hook: string;
  domainColor: string;
  domainShort: string;
}
interface Manifest {
  version: number;
  lessons: Record<string, Entry>;
  fixtures: Record<string, Entry>;
}
interface SpikeState {
  manifestVersion: number;
  inserts: Record<string, number[]>;
  ready: Record<string, { ms: number; bundle: string; kit: string }[]>;
  phases: Record<string, string>;
  events: unknown[];
  progressWrites: unknown[];
  rejected: { slug: string; reason: string; data: unknown }[];
  errors: { slug: string; message: string }[];
  heights: Record<string, number>;
  remount: (slug: string) => void;
}
declare global {
  interface Window {
    __spike?: SpikeState;
  }
}

const PROGRESS_KEY = "s3c:progress:v1";
const EVENT_TYPES = new Set(["view", "predict", "interact", "reveal", "recall", "complete"]);

function spikeState(): SpikeState {
  window.__spike ??= {
    manifestVersion: 0,
    inserts: {},
    ready: {},
    phases: {},
    events: [],
    progressWrites: [],
    rejected: [],
    errors: [],
    heights: {},
    remount: () => {},
  };
  return window.__spike;
}

/** Host side of the bridge: progress lives here, and the host decides what a frame may change. */
function mergeProgress(slug: string, v: { completedAt?: unknown; predictedCorrectly?: unknown }) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "{}");
    const prev = all[slug] ?? { recalls: [] };
    all[slug] = {
      ...prev,
      completedAt: prev.completedAt ?? (typeof v.completedAt === "number" ? v.completedAt : undefined),
      predictedCorrectly: typeof v.predictedCorrectly === "boolean" ? v.predictedCorrectly : prev.predictedCorrectly,
      recalls: Array.isArray(prev.recalls) ? prev.recalls : [],
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
}

function LessonFrame({ slug, entry, cdn }: { slug: string; entry: Entry; cdn: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    const s = spikeState();
    const t0 = performance.now();
    (s.inserts[slug] ??= []).push(t0);
    const reject = (reason: string, data: unknown) => s.rejected.push({ slug, reason, data });
    const onMessage = (ev: MessageEvent) => {
      // Only messages from this frame's window count. Origin is "null" for every sandboxed frame,
      // so the source window, not the origin, is the identity.
      if (!ref.current?.contentWindow || ev.source !== ref.current.contentWindow) return;
      const m = ev.data as Record<string, unknown> | null;
      if (!m || m.s3c !== 1 || typeof m.type !== "string") return reject("shape", m);
      switch (m.type) {
        case "ready":
          if (m.slug !== slug) return reject("slug", m);
          (s.ready[slug] ??= []).push({ ms: performance.now() - t0, bundle: String(m.bundle), kit: String(m.kit) });
          ref.current.dataset.ready = "1";
          return;
        case "phase":
          if (m.slug !== slug) return reject("slug", m);
          s.phases[slug] = String(m.phase);
          ref.current.dataset.phase = String(m.phase);
          return;
        case "track": {
          const e = m.event as { type?: unknown; slug?: unknown } | undefined;
          if (!e || e.slug !== slug || !EVENT_TYPES.has(String(e.type))) return reject("event", m);
          s.events.push(e);
          try {
            if (process.env.NEXT_PUBLIC_EVENTS !== "off") navigator.sendBeacon?.("/api/events", JSON.stringify(e));
          } catch {
            /* analytics must never break a lesson */
          }
          return;
        }
        case "progress": {
          if (m.slug !== slug || typeof m.value !== "object" || !m.value) return reject("progress", m);
          s.progressWrites.push({ slug, value: m.value });
          mergeProgress(slug, m.value as Record<string, unknown>);
          return;
        }
        case "resize":
          if (m.slug === slug && typeof m.height === "number") s.heights[slug] = m.height;
          return;
        case "error":
          s.errors.push({ slug, message: String(m.message).slice(0, 300) });
          return;
        default:
          return reject("type", m);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [slug]);

  const src = `${cdn}${entry.frame}#host=${encodeURIComponent(window.location.origin)}&domain=${encodeURIComponent(entry.domainColor)}`;
  return (
    <iframe
      ref={ref}
      src={src}
      sandbox="allow-scripts"
      allow=""
      referrerPolicy="no-referrer"
      title={entry.title}
      data-testid="lesson-frame"
      data-slug={slug}
      style={{ flex: 1, width: "100%", minHeight: 0, border: 0, display: "block" }}
    />
  );
}

function Card({ slug, entry, cdn, mounted, nonce }: { slug: string; entry: Entry; cdn: string; mounted: boolean; nonce: number }) {
  return (
    <article className="card-shell" data-testid="demo-card" data-slug={slug} style={{ ["--domain" as string]: entry.domainColor }} aria-label={entry.title}>
      <header className="card-head">
        <div className="card-tags">
          <span className="tag domain">{entry.domainShort}</span>
          <span className="tag">sandboxed</span>
        </div>
        <h2 className="card-title">{entry.title}</h2>
        <p className="card-hook">{entry.hook}</p>
      </header>
      <div className="card-body">
        {mounted ? <LessonFrame key={nonce} slug={slug} entry={entry} cdn={cdn} /> : <div className="loading">Swipe here to start</div>}
      </div>
      <footer className="card-foot">
        <span className="muted tiny" data-testid="frame-address">
          {entry.frame.slice(3, 15)} · kit {entry.kit}
        </span>
      </footer>
    </article>
  );
}

export function SpikeHost() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [opts, setOpts] = useState<{ cdn: string; only: string[] | null; single: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [nonces, setNonces] = useState<Record<string, number>>({});
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const cdn = (q.get("cdn") ?? process.env.NEXT_PUBLIC_SPIKE_CDN ?? "http://localhost:3141").replace(/\/$/, "");
    const only = q.get("only")?.split(",").filter(Boolean) ?? null;
    setOpts({ cdn, only, single: q.get("mode") === "single" });
    // Secrets the negative security test must not be able to read from inside a frame.
    document.cookie = "s3c_session=SECRET-host-cookie; path=/; SameSite=Lax";
    try {
      localStorage.setItem("s3c:secret", "SECRET-host-localStorage");
      sessionStorage.setItem("s3c:secret", "SECRET-host-sessionStorage");
    } catch {
      /* ignore */
    }
    const s = spikeState();
    s.remount = (slug: string) => setNonces((n) => ({ ...n, [slug]: (n[slug] ?? 0) + 1 }));
    fetch(`${cdn}/manifest.json`, { cache: "no-store" })
      .then((r) => r.json())
      .then((m: Manifest) => {
        s.manifestVersion = m.version;
        setManifest(m);
      })
      .catch((e) => setFailed(String(e)));
  }, []);

  const items = manifest && opts
    ? Object.entries({ ...manifest.lessons, ...(opts.only ? manifest.fixtures : {}) }).filter(([slug]) => !opts.only || opts.only.includes(slug))
    : [];

  useEffect(() => {
    const root = scroller.current;
    if (!root || opts?.single) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items.length, opts?.single]);

  const go = useCallback((delta: number) => {
    scroller.current?.scrollBy({ top: delta * scroller.current.clientHeight, behavior: "smooth" });
  }, []);

  return (
    <div className={opts?.single ? "single" : "feed-wrap"}>
      <nav className="topbar">
        <span className="brand">S3</span>
        <span className="muted small" data-testid="spike-status">
          Spike: sandboxed lessons{manifest ? ` · manifest v${manifest.version}` : ""}
          {failed ? ` · manifest failed: ${failed}` : ""}
        </span>
        {!opts?.single && (
          <button type="button" className="brand-link link" onClick={() => go(1)}>
            Next
          </button>
        )}
      </nav>
      <div id="host-secret" hidden>
        SECRET-host-DOM
      </div>
      <div className={opts?.single ? "" : "feed"} ref={scroller} data-testid="feed">
        {opts &&
          items.map(([slug, entry], i) => (
            <section key={slug} className="slot-screen" data-index={i}>
              <Card slug={slug} entry={entry} cdn={opts.cdn} mounted={opts.single || Math.abs(active - i) <= 1} nonce={nonces[slug] ?? 0} />
            </section>
          ))}
      </div>
    </div>
  );
}
