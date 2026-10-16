// G5-d (company/ops/dispatch-requests/2026-10-16-r5-tools.md#B3; board W-1310): a PATH whose `git` is a silent stub.
// Why: one tools/dispatch-check.mjs spawn took ~2.8 s, and ~2.7 s of that was R1 (tools/rituals-due.mjs), which
// runs one `git log -1` per ritual record in the real repo (53 files on 2026-10-16) when it is imported. With the
// stub each of those calls fails at once, rituals-due's own catch skips the record, and a spawn takes ~0.15 s.
// Use it only for spawns whose assertions do not read R1 or C3 (the two places dispatch-check runs git).
// The slow suite (S3_SLOW_TESTS=1) cross-checks stub against real git in slots.test.mjs.
// Not a *.test.mjs file, so `node --test tests/dispatch/*.test.mjs` does not run it.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after } from "node:test";

let bin = null;
export function stubGitPath() {
  if (!bin) {
    bin = fs.mkdtempSync(path.join(os.tmpdir(), "git-stub-"));
    fs.writeFileSync(path.join(bin, "git"), "#!/bin/sh\nexit 128\n", { mode: 0o755 });
    const made = bin;
    after(() => fs.rmSync(made, { recursive: true, force: true }));
  }
  return [bin, path.dirname(process.execPath), process.env.PATH].join(path.delimiter);
}
