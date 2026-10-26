import { defineConfig, devices } from "@playwright/test";

// Lesson frames pilot: the frame QA copy (contract-pilot.spec.ts) against a running app built with
// NEXT_PUBLIC_LESSON_FRAMES=pilot-50 whose manifest names a reachable artifact origin. Start both yourself:
//   node tools/lesson-frames.mjs build && NEXT_PUBLIC_LESSON_FRAMES=pilot-50 NEXT_DIST_DIR=.next-frames npx next build
//   node tools/lesson-frames.mjs serve --port=4801 --frame-ancestors=http://localhost:3150   (or the real origin)
//   NEXT_DIST_DIR=.next-frames npx next start -p 3150
//   FRAMES_BASE_URL=http://localhost:3150 npx playwright test -c spike/qa/pilot/playwright.config.ts
// On a preview: FRAMES_BASE_URL=<preview URL>. Measurement, not gate evidence (C7, W-087).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: ".",
  testMatch: /contract-pilot\.spec\.ts$/,
  outputDir: process.env.QA_OUT || "../../../test-results-frames",
  timeout: 60_000,
  fullyParallel: true,
  workers: Number(process.env.QA_WORKERS ?? 3),
  reporter: [["list"], ["json", { outputFile: `${process.env.QA_OUT || "../../../test-results-frames"}/qa-report.json` }]],
  use: {
    baseURL: process.env.FRAMES_BASE_URL ?? "http://localhost:3150",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } },
  ],
});
