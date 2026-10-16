#!/usr/bin/env bash
# AMD-011 companion: reproduce the fixtures and the measurement OUTSIDE tests/qa (nothing here edits a protected path).
# Usage: run.sh <scratch-dir> [server-url] [server-tree]
#   1. copies this folder to <scratch-dir> and links node_modules from the main checkout;
#   2. fixtures (no server): fixture.spec.ts must pass 7/7 (each check fails its bad case and passes its good one);
#   3. probe (needs a server): one phone page load per lesson, reverse-order check v3.1, JSON line per lesson;
#   4. the proposed protected change, applied to a COPY of tests/qa, run against the same server on chosen lessons.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"; main="$(git -C "$here" rev-parse --show-toplevel)"
dst="${1:?scratch dir}"; url="${2:-http://localhost:3591}"; tree="${3:-/home/user/s3c-qa}"
mkdir -p "$dst"; cp "$here"/{checks.ts,fixture.spec.ts,probe.spec.ts,lessons.ts,playwright.config.ts} "$dst"/
ln -sfn "$main/node_modules" "$dst/node_modules"
cd "$dst"
AMD_SPECS=fixture.spec.ts QA_OUT="$dst/out-fixture" npx playwright test --workers=2
[ -n "${PROBE:-}" ] && LESSONS_ROOT="$tree" QA_BASE_URL="$url" PROBE_OUT="$dst/probe.jsonl" AMD_SPECS=probe.spec.ts QA_OUT="$dst/out-probe" npx playwright test --workers=2 || true
# Patched contract on a copy (set ONLY=<slugs>):
if [ -n "${ONLY:-}" ]; then
  mkdir -p "$dst/run"; cp -r "$main/tests" "$dst/run/"; (cd "$dst/run" && patch -p1 < "$here/tests-qa.amd011.diff")
  ln -sfn "$tree/src" "$dst/run/src"; ln -sfn "$main/node_modules" "$dst/run/node_modules"
  cat > "$dst/run/playwright.config.ts" <<'CFG'
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({ testDir: "tests/qa", outputDir: "out", timeout: 45_000, fullyParallel: true, reporter: [["list"]],
  use: { baseURL: process.env.QA_BASE_URL, trace: "off", screenshot: "off" },
  projects: [{ name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
             { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } }] });
CFG
  (cd "$dst/run" && QA_ONLY="$ONLY" QA_BASE_URL="$url" npx playwright test --workers=2)
fi
