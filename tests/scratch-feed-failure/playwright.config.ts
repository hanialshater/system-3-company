import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  outputDir: "../../test-results-scale-failure",
  timeout: 60_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3580", launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {} },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } },
  ],
});
