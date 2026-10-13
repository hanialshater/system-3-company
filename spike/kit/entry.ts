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

  function Shell() {
    // Ready = the lesson's first render is committed (predict options are in the DOM). Not rAF:
    // Chrome pauses rAF in off-screen cross-origin frames, so a pre-created next card never paints.
    react.useEffect(() => {
      post({ type: "ready", slug, bundle, kit: KIT_VERSION });
    }, []);
    return react.createElement(Demo, { slug });
  }
  createRoot(el).render(react.createElement(Shell));
}
