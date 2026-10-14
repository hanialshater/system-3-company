// HQ whiteboard: sketch format, path allow-list, origin guard, production flag. Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { eventWriteAllowed } from "../../src/lib/spike.ts";
import { validateSketch, validateShape, sketchRelPath, sketchFileName, whiteboardWriteAllowed, whiteboardWritable, WB_ROOT } from "../../src/lib/hq-whiteboard.ts";

const boards = ["meeting-wbr", "launch-room"];
const base = { id: "s1", color: "#e5484d", author: "founder" };
const sketch = (shapes) => ({ version: 1, board: "meeting-wbr", title: "t", shapes });
const allowed = (r) => whiteboardWriteAllowed(r, eventWriteAllowed);
const req = (headers, url = "http://localhost:3000/api/whiteboard") => ({ url, headers: { get: (n) => headers[n.toLowerCase()] ?? null } });

test("every shape type validates", () => {
  const shapes = [
    { ...base, id: "a", type: "stroke", points: [[1, 2], [3, 4]] },
    { ...base, id: "b", type: "rect", x: 1, y: 2, w: 3, h: 4 },
    { ...base, id: "c", type: "ellipse", x: 1, y: 2, w: 3, h: 4 },
    { ...base, id: "d", type: "line", x1: 0, y1: 0, x2: 5, y2: 5 },
    { ...base, id: "e", type: "arrow", x1: 0, y1: 0, x2: 5, y2: 5 },
    { ...base, id: "f", type: "text", x: 1, y: 2, text: "hi" },
    { ...base, id: "g", type: "svg", svg: '<svg viewBox="0 0 1000 700"><circle r="5"/></svg>' },
  ];
  assert.equal(validateSketch(sketch(shapes), boards), null);
});

test("bad sketches are rejected with a reason", () => {
  const bad = (s) => assert.notEqual(validateSketch(s, boards), null);
  bad(null);
  bad({ ...sketch([]), version: 2 });
  bad({ ...sketch([]), board: "not-a-room" });
  bad({ ...sketch([]), title: "" });
  bad(sketch([{ ...base, type: "blob" }]));
  bad(sketch([{ ...base, type: "rect", x: 1, y: 2, w: "3", h: 4 }]));
  bad(sketch([{ ...base, type: "stroke", points: [] }]));
  bad(sketch([{ ...base, type: "stroke", points: [[1, "x"]] }]));
  bad(sketch([{ ...base, color: "red", type: "line", x1: 0, y1: 0, x2: 1, y2: 1 }]));
  bad(sketch([{ ...base, author: "", type: "line", x1: 0, y1: 0, x2: 1, y2: 1 }]));
  bad(sketch([{ ...base, type: "line", x1: 0, y1: 0, x2: NaN, y2: 1 }]));
  bad(sketch([{ ...base, type: "line", x1: 0, y1: 0, x2: 1, y2: 1 }, { ...base, type: "line", x1: 0, y1: 0, x2: 1, y2: 1 }])); // duplicate id
});

test("svg shapes may not carry scripts, handlers or links", () => {
  for (const svg of ['<svg><script>1</script></svg>', '<svg onload="x()"></svg>', '<svg><a href="https://x"/></svg>', '<svg><foreignObject/></svg>', "<div/>"]) {
    assert.notEqual(validateShape({ ...base, type: "svg", svg }), null, svg);
  }
});

test("path allow-list", () => {
  assert.equal(sketchRelPath("meeting-wbr", "2026-10-14-plan.json", boards), `${WB_ROOT}/meeting-wbr/2026-10-14-plan.json`);
  for (const [b, f] of [
    ["meeting-wbr", "../../../etc/passwd"],
    ["meeting-wbr", "../x/2026-10-14-a.json"],
    ["meeting-wbr", "2026-10-14-a/../b.json"],
    ["meeting-wbr", "2026-10-14-a.json/../../x"],
    ["meeting-wbr", "notes.json"],
    ["meeting-wbr", "2026-10-14-a.txt"],
    ["..", "2026-10-14-a.json"],
    ["meeting-wbr/..", "2026-10-14-a.json"],
    ["not-a-room", "2026-10-14-a.json"],
    ["product", "2026-10-14-a.json"], // an office, not a meeting room
    [undefined, "2026-10-14-a.json"],
  ]) assert.equal(sketchRelPath(b, f, boards), null, `${b} ${f}`);
  assert.equal(sketchFileName("Plan: Q4 / launch!", "2026-10-14"), "2026-10-14-plan-q4-launch.json");
});

test("origin guard", () => {
  const ok = { origin: "http://localhost:3000", host: "localhost:3000" };
  assert.equal(allowed(req(ok)), true);
  assert.equal(allowed(req({ ...ok, origin: "https://evil.example" })), false);
  assert.equal(allowed(req({ ...ok, origin: "null" })), false);
  assert.equal(allowed(req({ host: "localhost:3000" })), false, "no Origin header is refused, unlike /api/events");
  assert.equal(allowed(req({ ...ok, "sec-fetch-site": "cross-site" })), false);
  assert.equal(allowed(req({ ...ok, referer: "https://evil.example/x" })), false);
});

test("production writes need WHITEBOARD_WRITE=1", () => {
  assert.equal(whiteboardWritable({ NODE_ENV: "development" }), true);
  assert.equal(whiteboardWritable({ NODE_ENV: "production" }), false);
  assert.equal(whiteboardWritable({ NODE_ENV: "production", WHITEBOARD_WRITE: "1" }), true);
});

test("every sketch committed under company/meetings/whiteboards is valid and in the right folder", () => {
  const root = path.join(process.cwd(), WB_ROOT);
  for (const dir of fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const f of fs.readdirSync(path.join(root, dir.name)).filter((x) => x.endsWith(".json"))) {
      const j = JSON.parse(fs.readFileSync(path.join(root, dir.name, f), "utf8"));
      assert.equal(validateSketch(j), null, `${dir.name}/${f}`);
      assert.equal(j.board, dir.name, `${dir.name}/${f} board field matches its folder`);
      assert.notEqual(sketchRelPath(dir.name, f, [dir.name]), null, `${dir.name}/${f} file name`);
    }
  }
});
