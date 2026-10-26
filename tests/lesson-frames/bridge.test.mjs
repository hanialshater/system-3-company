// C2: the host side of the frame bridge (src/lib/lesson-frame-bridge.ts) and its effect on the real src/kit/progress.ts.
// A fake frame window posts forged slugs, forged sources, wrong types and oversized payloads: all refused. A valid
// progress message reaches updateProgress and the account sink exactly as an in-app lesson's reveal does.
import assert from "node:assert/strict";
import test from "node:test";
import { MAX_MESSAGE_BYTES, frameSrc, progressUpdate, readFrameMessage } from "../../src/lib/lesson-frame-bridge.ts";

const frame = { name: "this card's frame" };
const other = { name: "another card's frame" };
const card = { slug: "why-seven-wins", frameWindow: frame };
const msg = (data, over = {}) => readFrameMessage({ source: frame, origin: "null", data, ...over }, card, 1_800_000_000_000);
const NOW = 1_800_000_000_000;

test("only this card's own frame window is heard; everything else is ignored silently", () => {
  assert.deepEqual(readFrameMessage({ source: other, origin: "null", data: { s3c: 1, type: "ready", slug: card.slug } }, card), { kind: "ignore", reason: "source" });
  assert.deepEqual(readFrameMessage({ source: null, origin: "null", data: { s3c: 1, type: "ready", slug: card.slug } }, card), { kind: "ignore", reason: "source" });
  assert.deepEqual(readFrameMessage({ source: frame, origin: "null", data: {} }, { slug: card.slug, frameWindow: null }), { kind: "ignore", reason: "source" });
});
test("a message from the right window but a real origin is refused (frames are opaque-origin)", () => {
  assert.equal(msg({ s3c: 1, type: "ready", slug: card.slug }, { origin: "https://system3-content-hub-artifacts.vercel.app" }).reason, "origin");
});
test("forged slugs are refused, in every message type that names one", () => {
  for (const type of ["ready", "phase", "progress", "resize", "error", "key"]) assert.equal(msg({ s3c: 1, type, slug: "some-other-lesson" }).reason, "slug", type);
  assert.equal(msg({ s3c: 1, type: "track", event: { type: "view", slug: "some-other-lesson" } }).reason, "event");
});
test("wrong shapes and unknown types are refused", () => {
  for (const d of [null, 1, "x", [], { type: "ready", slug: card.slug }, { s3c: 2, type: "ready", slug: card.slug }, { s3c: 1, type: 7 }]) assert.equal(msg(d).kind, "reject", JSON.stringify(d));
  assert.equal(msg({ s3c: 1, type: "storage", slug: card.slug }).reason, "type");
  assert.equal(msg({ s3c: 1, type: "phase", slug: card.slug, phase: "done" }).reason, "phase");
  assert.equal(msg({ s3c: 1, type: "key", slug: card.slug, key: "Enter" }).reason, "key");
  assert.equal(msg({ s3c: 1, type: "resize", slug: card.slug, height: "tall" }).reason, "resize");
});
test("oversized and unserialisable payloads are refused", () => {
  assert.equal(msg({ s3c: 1, type: "error", slug: card.slug, message: "x".repeat(MAX_MESSAGE_BYTES) }).reason, "size");
  const cyclic = { s3c: 1, type: "ready", slug: card.slug };
  cyclic.self = cyclic;
  assert.equal(msg(cyclic).reason, "size");
});
test("track: only the five lesson event types, rebuilt field by field; recall is refused", () => {
  assert.deepEqual(msg({ s3c: 1, type: "track", event: { type: "predict", slug: card.slug, option: 2, correct: false, extra: "learner@example.com" } }), {
    kind: "track",
    event: { type: "predict", slug: card.slug, option: 2, correct: false },
  });
  assert.deepEqual(msg({ s3c: 1, type: "track", event: { type: "complete", slug: card.slug, dwellMs: 41000 } }).event, { type: "complete", slug: card.slug, dwellMs: 41000 });
  for (const e of [
    { type: "recall", slug: card.slug, correct: true, spacedDays: 3 },
    { type: "exp", slug: card.slug },
    { type: "predict", slug: card.slug, option: "2", correct: false },
    { type: "predict", slug: card.slug, option: 99, correct: false },
    { type: "complete", slug: card.slug, dwellMs: -1 },
    { type: "complete", slug: card.slug, dwellMs: Infinity },
  ])
    assert.equal(msg({ s3c: 1, type: "track", event: e }).reason, "event", JSON.stringify(e));
});
test("progress: only completedAt (finite, not in the future) and predictedCorrectly (boolean) are taken", () => {
  assert.deepEqual(msg({ s3c: 1, type: "progress", slug: card.slug, value: { completedAt: NOW - 5, predictedCorrectly: true, recalls: [{ at: 1, correct: true }] } }), {
    kind: "progress",
    completedAt: NOW - 5,
    predictedCorrectly: true,
  });
  for (const v of [null, [], { completedAt: "now" }, { completedAt: NOW + 3_600_000 }, { completedAt: 0 }, { completedAt: NaN }, { completedAt: NOW, predictedCorrectly: "yes" }])
    assert.equal(msg({ s3c: 1, type: "progress", slug: card.slug, value: v }).reason, "progress", JSON.stringify(v));
});
test("a valid progress message reaches the real updateProgress and the account sink, as Lesson.tsx's reveal does", async () => {
  const store = new Map();
  globalThis.window = { localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)) } };
  const progress = await import("../../src/kit/progress.ts");
  const seen = [];
  progress.setProgressSink((slug, before, after) => seen.push({ slug, before, after }));
  try {
    const a = msg({ s3c: 1, type: "progress", slug: card.slug, value: { completedAt: NOW - 10, predictedCorrectly: false } });
    assert.equal(a.kind, "progress");
    progress.updateProgress(card.slug, progressUpdate(a));
    assert.deepEqual(progress.loadProgress()[card.slug], { recalls: [], completedAt: NOW - 10, predictedCorrectly: false });
    assert.equal(seen.length, 1);
    assert.equal(seen[0].after.completedAt, NOW - 10);
    // A second completion keeps the first completedAt and replaces predictedCorrectly, as in the app.
    progress.updateProgress(card.slug, progressUpdate({ completedAt: NOW, predictedCorrectly: true }));
    assert.deepEqual(progress.loadProgress()[card.slug], { recalls: [], completedAt: NOW - 10, predictedCorrectly: true });
    // A forged message never gets as far as updateProgress.
    const forged = readFrameMessage({ source: other, origin: "null", data: { s3c: 1, type: "progress", slug: card.slug, value: { completedAt: NOW } } }, card, NOW);
    assert.equal(forged.kind, "ignore");
  } finally {
    progress.setProgressSink(null);
    delete globalThis.window;
  }
});
test("frameSrc: built only from the manifest origin and a 64-hex hash", () => {
  const h = "a".repeat(64);
  assert.equal(frameSrc("https://system3-content-hub-artifacts.vercel.app", h, "https://system-3-company.vercel.app", "#ff7a7a"), `https://system3-content-hub-artifacts.vercel.app/f/${h}.html#host=https%3A%2F%2Fsystem-3-company.vercel.app&domain=%23ff7a7a`);
  assert.equal(frameSrc("https://x.example", "../evil", "https://h"), null);
  assert.equal(frameSrc("https://x.example/path", h, "https://h"), null);
  assert.equal(frameSrc("http://x.example", h, "https://h"), null, "plain http only for a local development origin");
  assert.ok(frameSrc("http://127.0.0.1:4801", h, "http://localhost:3000"));
  assert.doesNotMatch(frameSrc("https://x.example", h, "https://h", "red;x") ?? "", /domain=/);
});
