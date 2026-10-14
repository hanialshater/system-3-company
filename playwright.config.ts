import { defineConfig, devices } from "@playwright/test";
import { gitStamp, type ToolStamp } from "./tools/lib/tool-stamp.mjs";

// Computer-use QA. The browser is the instrument: it uses the artifact the way a
// learner would and records what happened. It is not ground truth about learning.
const port = Number(process.env.QA_PORT ?? 3100);
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
const external = process.env.QA_BASE_URL; // test a deployed URL instead of a local build

// Harness stamp (W-783): qa-report.json carries config.metadata.qaStamp, the commit of the QA contract
// (tests/qa/** and this file) and whether the run used the committed copy (clean). tests/qa/** is protected,
// so the stamp is written here; reading it as a gate (company qa-record refuses unstamped or unclean reports)
// is proposed in company/constitution/amendments/proposed-qa-harness-stamp.md. Computed once, reused by workers.
const QA_FILES = ["tests/qa", "playwright.config.ts"];
const inherited = Boolean(process.env.S3_QA_STAMP);
const qaStamp: ToolStamp = inherited ? JSON.parse(process.env.S3_QA_STAMP as string) : gitStamp(QA_FILES, { from: process.cwd() });
delete qaStamp.root;
process.env.S3_QA_STAMP = JSON.stringify(qaStamp);
if (!inherited && !qaStamp.clean) console.warn(`qa: harness stamp clean: false (${qaStamp.error ?? `modified: ${qaStamp.modified?.join(", ")}`}); this run is not evidence for a QA record`);

export default defineConfig({
  metadata: { qaStamp },
  testDir: "tests/qa",
  outputDir: process.env.QA_OUT || "test-results",
  timeout: 45_000,
  fullyParallel: true,
  reporter: [["list"], ["json", { outputFile: `${process.env.QA_OUT || "test-results"}/qa-report.json` }]],
  use: {
    baseURL: external ?? `http://localhost:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" } },
  ],
  webServer: external
    ? undefined
    : {
        command: `npx next start -p ${port}`,
        port,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
