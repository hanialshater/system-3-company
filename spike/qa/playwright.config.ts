import { defineConfig, devices } from "@playwright/test";

// SPIKE-001: runs the spike-only specs (contract copy through frames, security, rollback) against
// the app on SPIKE_HOST_PORT (default 3140) and the lesson CDN on SPIKE_CDN_PORT (default 3141).
//   NEXT_DIST_DIR=.next-spike npx next build && node spike/build.mjs
//   PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npx playwright test -c spike/qa/playwright.config.ts
const hostPort = Number(process.env.SPIKE_HOST_PORT ?? 3140);
const cdnPort = Number(process.env.SPIKE_CDN_PORT ?? 3141);
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: ".",
  testMatch: /.*\.spec\.ts$/,
  outputDir: process.env.QA_OUT || "../../test-results-spike",
  timeout: 45_000,
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["json", { outputFile: `${process.env.QA_OUT || "../../test-results-spike"}/qa-report.json` }]],
  use: {
    baseURL: `http://localhost:${hostPort}`,
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } },
  ],
  webServer: [
    // W-477: /spike is 404 in production unless SPIKE_ENABLED=1; the CDN must be allow-listed.
    {
      command: `npx next start -p ${hostPort}`,
      port: hostPort,
      reuseExistingServer: true,
      timeout: 60_000,
      cwd: "../..",
      env: { SPIKE_ENABLED: "1", SPIKE_CDN_ORIGINS: `http://localhost:${cdnPort}` },
    },
    { command: `node spike/cdn-server.mjs --port=${cdnPort}`, port: cdnPort, reuseExistingServer: true, cwd: "../.." },
  ],
});
