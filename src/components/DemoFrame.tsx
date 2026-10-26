"use client";

// Lesson frames pilot (EDD-003 stage 1; company/engineering/reviews/2026-10-25-content-hub-production-review.md, C1-C3).
// Reached only through DemoHost's dynamic import when NEXT_PUBLIC_LESSON_FRAMES=pilot-50, so with the flag off no
// client chunk holds this file or the manifest (prediction P4, company/experiments/EXP-010-lesson-frames-pilot-predictions.md).
//
// A pilot lesson runs in <iframe sandbox="allow-scripts"> on the artifact origin named by the committed manifest
// (src/lib/lesson-frames.manifest.json, ADR-007). The frame has an opaque origin: no cookies, no storage, no network
// (its CSP has connect-src 'none'). Everything it may change goes through src/lib/lesson-frame-bridge.ts: progress and
// events reach the real src/kit/progress.ts exactly as an in-app lesson's do. The host never posts into the frame.
// A slug the manifest does not hold (or an entry that fails the URL rules) renders in-app: every pilot lesson stays in
// src/demos/loaders.generated.ts.

import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
// The client projection of the manifest (origin + slug → frameDoc), never the record itself: tools/lib/lesson-frames.mjs.
import client from "@/lib/lesson-frames.frames.json";
import { track, updateProgress } from "@/kit/progress";
import { frameSrc, progressUpdate, readFrameMessage } from "@/lib/lesson-frame-bridge";

const frames = client.frames as Record<string, string | undefined>;

/** The marker P4 greps for: it must never appear in a flag-off build's client chunks. */
const MARKER = "s3c-lesson-frame-v1";

export default function DemoFrame({ slug, fallback: Fallback }: { slug: string; fallback: ComponentType<{ slug: string }> }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const frameDoc = frames[slug];
  // undefined: not computed yet (first commit); null: refused, render in-app. Computed before paint, from this card.
  const [src, setSrc] = useState<string | null | undefined>(undefined);
  useLayoutEffect(() => {
    setSrc(frameDoc ? frameSrc(client.origin, frameDoc, window.location.origin, domainColorOf(wrap.current)) : null);
  }, [frameDoc]);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe || !src) return;
    const card = iframe.closest<HTMLElement>(".card-shell");
    performance.mark(`s3c-frame-activate:${slug}`);
    const onMessage = (ev: MessageEvent) => {
      const a = readFrameMessage({ source: ev.source, origin: ev.origin, data: ev.data }, { slug, frameWindow: iframe.contentWindow });
      switch (a.kind) {
        case "ignore":
          return;
        case "reject":
          if (process.env.NODE_ENV !== "production") console.warn(`lesson frame ${slug}: refused a message (${a.reason})`);
          return;
        case "ready":
          iframe.dataset.ready = "1";
          card?.setAttribute("data-frame-ready", "");
          try {
            performance.mark(`s3c-frame-ready:${slug}`);
            performance.measure(`s3c-frame:${slug}`, `s3c-frame-activate:${slug}`, `s3c-frame-ready:${slug}`);
          } catch {
            /* timing must never break a lesson */
          }
          return;
        case "phase":
          // The host's useRevealFit (src/kit/reveal-fit.ts) sees this data-phase change, finds no [data-testid="lesson"] in the host document, and does nothing: intended, the frame fits its own reveal (review R5).
          iframe.dataset.phase = a.phase;
          card?.setAttribute("data-frame-phase", a.phase);
          return;
        case "track":
          track(a.event);
          return;
        case "progress":
          updateProgress(slug, progressUpdate(a));
          return;
        case "key":
          // Re-dispatched on the iframe element so it bubbles to the feed's window listener with a real target.
          iframe.dispatchEvent(new KeyboardEvent("keydown", { key: a.key, bubbles: true, cancelable: true }));
          return;
        case "resize":
        case "error":
          return;
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      card?.removeAttribute("data-frame-ready");
      card?.removeAttribute("data-frame-phase");
    };
  }, [slug, src]);

  if (src === null) return <Fallback slug={slug} />;
  return (
    <div ref={wrap} style={{ flex: 1, minHeight: 0, display: "flex" }}>
      {src && (
    <iframe
      ref={ref}
      src={src}
      title="Lesson"
      sandbox="allow-scripts"
      allow=""
      referrerPolicy="no-referrer"
      data-slug={slug}
      data-lesson-frame={MARKER}
      data-testid="lesson-frame"
      style={{ border: 0, width: "100%", height: "100%", display: "block", flex: 1, minHeight: 0, background: "transparent" }}
    />
      )}
    </div>
  );
}

/** The card's --domain colour (DemoCard sets it on .card-shell), passed in the frame URL's hash. */
function domainColorOf(el: HTMLElement | null): string | undefined {
  const shell = el?.closest(".card-shell");
  const v = shell ? getComputedStyle(shell).getPropertyValue("--domain").trim() : "";
  return v || undefined;
}
