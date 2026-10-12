import { defineConfig, devices } from "@playwright/test";

// Computer-use QA. The browser is the instrument: it uses the artifact the way a
// learner would and records what happened. It is not ground truth about learning.
const port = Number(process.env.QA_PORT ?? 3100);
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "tests/qa",
  outputDir: process.env.QA_OUT || "test-results",
  timeout: 45_000,
  fullyParallel: true,
  reporter: [["list"], ["json", { outputFile: `${process.env.QA_OUT || "test-results"}/qa-report.json` }]],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } },
  ],
  webServer: {
    command: `npx next start -p ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
