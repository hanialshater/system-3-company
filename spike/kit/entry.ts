// SPIKE-001 (never merged): the shared, versioned kit bundle that runs inside lesson frames.
//
// One ES module holds React, react-dom/client and the kit (Lesson, controls, milestones, random).
// Lesson bundles leave all of these external and import them from "@s3c/kit@<major>", which the
// frame's import map resolves to a content-hashed file. Each kit module is exported as its own
// namespace, so a lesson's `import { useState } from "react"` becomes `kit.react.useState`.

import * as react from "react";
import * as jsx_runtime from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as kit_Lesson from "@/kit/Lesson";
import * as kit_controls from "@/kit/controls";
import * as kit_milestones from "@/kit/milestones";
import * as kit_random from "@/kit/random";
import { createFoldStore, FoldScope } from "@/kit/controls";
import { useRevealFit } from "@/kit/reveal-fit";
import { configureBridge, post } from "./progress-bridge";

export const KIT_VERSION = "1.0.0";
export { react, jsx_runtime, kit_Lesson, kit_controls, kit_milestones, kit_random };

/** Used by lesson CSS modules: constructable stylesheets need no 'unsafe-inline' style CSP. */
export const runtime = {
  style(css: string) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  },
};

const NAV_KEYS = new Set(["ArrowDown", "ArrowUp", "j", "k"]);

function meta(name: string) {
  return document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? "";
}

/** Boots the lesson named by the frame document's <meta> tags. Called by boot.js. */
export async function mount() {
  const slug = meta("s3c-slug");
  const bundle = meta("s3c-lesson");
  const params = new URLSearchParams(location.hash.slice(1));
  const host = params.get("host");
  configureBridge(host && /^https?:\/\/[^/]+$/.test(host) ? host : null);
  const domain = params.get("domain");
  if (domain && /^#[0-9a-fA-F]{3,8}$/.test(domain)) document.documentElement.style.setProperty("--domain", domain);

  window.addEventListener("error", (e) => post({ type: "error", slug, message: String(e.message) }));
  window.addEventListener("unhandledrejection", (e) => post({ type: "error", slug, message: String(e.reason) }));

  const mod = await import(/* webpackIgnore: true */ bundle);
  const Demo = mod.default as react.ComponentType<{ slug: string }>;
  const el = document.getElementById("root")!;

  // Phase changes: Lesson.tsx (constitutional) exposes the phase as data-phase; observe it.
  let last = "";
  new MutationObserver(() => {
    const phase = el.querySelector("[data-testid=lesson]")?.getAttribute("data-phase") ?? "";
    if (phase && phase !== last) {
      last = phase;
      post({ type: "phase", slug, phase });
    }
  }).observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-phase"] });

  new ResizeObserver(() => post({ type: "resize", slug, height: el.scrollHeight })).observe(el);

  // The feed's swipe keys (src/components/Feed.tsx: ArrowDown/j, ArrowUp/k) pressed inside the frame go to the host,
  // with the feed's own filter: never from a control, a field, a link or a dialog (a slider owns its arrows).
  window.addEventListener("keydown", (e) => {
    if (!NAV_KEYS.has(e.key) || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target instanceof Element ? e.target : null;
    if (t?.closest("input, textarea, select, button, a, [contenteditable], [role=dialog], [role=slider]")) return;
    e.preventDefault();
    post({ type: "key", slug, key: e.key });
  });

  // C3: the frame document plays DemoCard's .card-body: #root is the scroller (spike/kit/frame.css), so the host's
  // reveal fit and the EDD-005 fold run here on it, with the frame's own fold store, exactly as in the app.
  const rootRef = { current: el as HTMLDivElement };
  const fold = createFoldStore();
  function Shell() {
    // Ready = the lesson's first render is committed (predict options are in the DOM). Not rAF:
    // Chrome pauses rAF in off-screen cross-origin frames, so a pre-created next card never paints.
    react.useEffect(() => {
      post({ type: "ready", slug, bundle, kit: KIT_VERSION });
    }, []);
    useRevealFit(rootRef, true, fold);
    return react.createElement(FoldScope, { store: fold, children: react.createElement(Demo, { slug }) });
  }
  createRoot(el).render(react.createElement(Shell));
}
