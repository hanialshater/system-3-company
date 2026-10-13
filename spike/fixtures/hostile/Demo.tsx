"use client";

// SPIKE-001 negative security fixture. NOT a lesson: it lives outside src/demos and is never in
// the registry. It is built through the same lesson pipeline and loaded in the same sandboxed
// frame as a real lesson, then tries everything a malicious or buggy lesson might try against the
// host. Each probe records "blocked" or "LEAK"; spike/qa/security.spec.ts also checks the host side
// (cookie, storage, DOM, URL, network) independently, so a lying probe cannot pass the test.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";

type Outcome = { name: string; outcome: "blocked" | "LEAK"; detail: string };

function hostOrigin() {
  return new URLSearchParams(location.hash.slice(1)).get("host") ?? "http://localhost:3140";
}

async function probe(): Promise<Outcome[]> {
  const out: Outcome[] = [];
  const host = hostOrigin();
  const tryIt = async (name: string, fn: () => unknown | Promise<unknown>, leaked: (v: unknown) => boolean) => {
    try {
      const v = await fn();
      out.push({ name, outcome: leaked(v) ? "LEAK" : "blocked", detail: String(v).slice(0, 120) });
    } catch (e) {
      out.push({ name, outcome: "blocked", detail: `${(e as Error).name}: ${(e as Error).message}`.slice(0, 120) });
    }
  };
  const secret = (v: unknown) => typeof v === "string" && v.includes("SECRET");

  await tryIt("read document.cookie", () => document.cookie, secret);
  await tryIt("write document.cookie", () => ((document.cookie = "pwned=1"), document.cookie), (v) => String(v).includes("pwned"));
  await tryIt("read localStorage", () => window.localStorage.getItem("s3c:secret"), secret);
  await tryIt("read sessionStorage", () => window.sessionStorage.getItem("s3c:secret"), secret);
  await tryIt("open indexedDB", () => new Promise((res, rej) => {
    const r = indexedDB.open("s3c-probe");
    r.onsuccess = () => res("opened");
    r.onerror = () => rej(r.error);
  }), (v) => v === "opened");
  await tryIt("read parent DOM", () => window.parent.document.getElementById("host-secret")?.textContent, secret);
  await tryIt("read top DOM", () => window.top!.document.body.innerHTML, secret);
  await tryIt("read parent localStorage", () => window.parent.localStorage.getItem("s3c:secret"), secret);
  await tryIt("read parent cookie", () => window.parent.document.cookie, secret);
  await tryIt("read sibling frame DOM", () => {
    for (let i = 0; i < window.parent.frames.length; i++) {
      const f = window.parent.frames[i];
      if (f !== window) return f.document.body.innerHTML;
    }
    return "no sibling";
  }, (v) => typeof v === "string" && v !== "no sibling");
  await tryIt("navigate top window", () => {
    window.top!.location.href = `${host}/?pwned=top`;
    return "assigned";
  }, () => false /* judged on the host side: the host URL must not change */);
  await tryIt("window.open popup", () => window.open(`${host}/?pwned=popup`), (v) => v !== null);
  await tryIt("fetch host API with credentials", async () => {
    const r = await fetch(`${host}/api/events`, { method: "POST", credentials: "include", body: JSON.stringify({ type: "view", slug: "pwned-fetch" }) });
    return `status ${r.status}`;
  }, (v) => String(v).startsWith("status"));
  await tryIt("sendBeacon to host API", () => navigator.sendBeacon(`${host}/api/events`, JSON.stringify({ type: "view", slug: "pwned-beacon" })), () => false /* judged by the network log */);
  await tryIt("image beacon to host", () => {
    const img = new Image();
    img.src = `${host}/api/events?pwned=img`;
    return "set";
  }, () => false /* judged by the network log */);
  await tryIt("submit form to _top", () => {
    const f = document.createElement("form");
    f.action = `${host}/?pwned=form`;
    f.method = "GET";
    f.target = "_top";
    document.body.appendChild(f);
    f.submit();
    return "submitted";
  }, () => false /* judged on the host side */);
  await tryIt("set document.domain", () => ((document.domain = "localhost"), document.domain), () => false);
  await tryIt("forge progress for another lesson", () => {
    window.parent.postMessage({ s3c: 1, type: "progress", slug: "why-seven-wins", value: { completedAt: 1, recalls: [] } }, "*");
    return "posted";
  }, () => false /* judged on the host side: the host must reject it */);
  await tryIt("forge event for another lesson", () => {
    window.parent.postMessage({ s3c: 1, type: "track", event: { type: "complete", slug: "why-seven-wins", dwellMs: 1 } }, "*");
    return "posted";
  }, () => false /* judged on the host side */);
  return out;
}

export default function Hostile({ slug }: { slug: string }) {
  const [results, setResults] = useState<Outcome[] | null>(null);
  useEffect(() => {
    probe().then(setResults);
  }, []);
  return (
    <Lesson
      slug={slug}
      predict={{ question: "Can this frame reach the host?", options: ["Yes", "No"], answer: 1 }}
      reveal={() => <p>Probe finished.</p>}
    >
      {({ locked, interact }) => (
        <div>
          <Control disabled={locked} onClick={interact}>
            Poke
          </Control>
          <pre data-testid="probe" data-done={results ? "1" : "0"} style={{ fontSize: 9, whiteSpace: "pre-wrap" }}>
            {results ? JSON.stringify(results, null, 1) : "probing…"}
          </pre>
        </div>
      )}
    </Lesson>
  );
}
