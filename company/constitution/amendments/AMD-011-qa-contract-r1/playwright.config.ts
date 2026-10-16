import { defineConfig, devices } from "@playwright/test";
// Scratch config for AMD-011 measurement. Not the contract: no stamp, no qa-record from it.
export default defineConfig({
  testDir: ".",
  testMatch: process.env.AMD_SPECS ? process.env.AMD_SPECS.split(",") : ["*.spec.ts"],
  outputDir: process.env.QA_OUT || "out",
  timeout: 120_000,
  fullyParallel: true,
  reporter: [["line"], ["json", { outputFile: `${process.env.QA_OUT || "out"}/report.json` }]],
  use: { baseURL: process.env.QA_BASE_URL, trace: "off", screenshot: "off" },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    ...(process.env.AMD_DESKTOP ? [{ name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" as const } }] : []),
  ],
});
