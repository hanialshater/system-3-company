// SPIKE-001 negative security test. A hostile, lesson-shaped bundle (spike/fixtures/hostile) runs
// in the same sandboxed cross-origin frame as a real lesson, next to a real lesson, and tries to
// reach the host. The test judges from BOTH sides: the probe's own report, and independent
// host-side checks (cookie, storage, DOM, URL, popups, network log, bridge rejections).
// A positive control first proves the same reads succeed when code runs in the host page, so a
// broken probe cannot pass by detecting nothing.

import { expect, test } from "@playwright/test";

test("positive control: host-page code can read the secrets the frame must not", async ({ page }) => {
  await page.goto("/spike?only=why-seven-wins&mode=single");
  await expect(page.locator('iframe[data-slug="why-seven-wins"]')).toHaveAttribute("data-ready", "1", { timeout: 15_000 });
  const got = await page.evaluate(() => ({
    cookie: document.cookie,
    ls: localStorage.getItem("s3c:secret"),
    dom: document.getElementById("host-secret")?.textContent,
  }));
  expect(got.cookie).toContain("SECRET-host-cookie");
  expect(got.ls).toBe("SECRET-host-localStorage");
  expect(got.dom).toContain("SECRET-host-DOM");
});

test("a lesson frame cannot read host cookies, storage or DOM, nor navigate or call the host", async ({ page, context }) => {
  const hostOrigin = new URL(page.url() === "about:blank" ? "http://localhost:3140" : page.url()).origin;
  const fromFrames: string[] = [];
  const popups: string[] = [];
  context.on("page", (p) => popups.push(p.url()));
  // Count only requests that got a response: a request the browser cancels (CSP, sandbox) never
  // reaches the server. Cancelled attempts are logged so the doc can say what was tried.
  const attempted: string[] = [];
  page.on("requestfinished", async (r) => {
    if (r.frame() !== page.mainFrame() && r.url().startsWith(hostOrigin)) fromFrames.push(`${r.method()} ${r.url()} -> ${(await r.response())?.status()}`);
  });
  page.on("requestfailed", (r) => {
    if (r.frame() !== page.mainFrame() && r.url().startsWith(hostOrigin)) attempted.push(`${r.method()} ${r.url()} failed: ${r.failure()?.errorText}`);
  });

  await page.goto("/spike?only=why-seven-wins,__hostile&mode=single");
  const startUrl = page.url();
  const hostile = page.frameLocator('iframe[data-slug="__hostile"]');
  await expect(hostile.locator('[data-testid="probe"]')).toHaveAttribute("data-done", "1", { timeout: 15_000 });
  await page.waitForTimeout(1000); // let any navigation, beacon or popup attempt land

  const report = JSON.parse(await hostile.locator('[data-testid="probe"]').innerText()) as { name: string; outcome: string; detail: string }[];
  console.log(report.map((r) => `${r.outcome.padEnd(7)} ${r.name}: ${r.detail}`).join("\n"));
  expect(report.length).toBeGreaterThanOrEqual(19);
  expect(report.filter((r) => r.outcome !== "blocked"), "probes that leaked").toEqual([]);

  // Host-side, independent of what the probe says.
  console.log(`cancelled by the browser: ${JSON.stringify(attempted)}\nreached the host: ${JSON.stringify(fromFrames)}`);
  expect(page.url(), "top window was not navigated").toBe(startUrl);
  expect(popups, "no popup opened").toEqual([]);
  expect(fromFrames, "no request from a frame reached the host origin").toEqual([]);
  const host = await page.evaluate(() => ({
    cookie: document.cookie,
    ls: localStorage.getItem("s3c:secret"),
    dom: document.getElementById("host-secret")?.textContent?.trim(),
    progress: localStorage.getItem("s3c:progress:v1"),
    spike: window.__spike,
  }));
  expect(host.cookie).not.toContain("pwned");
  expect(host.ls).toBe("SECRET-host-localStorage");
  expect(host.dom).toBe("SECRET-host-DOM");
  // Forged messages (progress and an event for another lesson) were rejected, not applied.
  expect(host.progress ?? "", "forged progress was not written").not.toContain("why-seven-wins");
  const reasons = host.spike!.rejected.filter((r) => r.slug === "__hostile").map((r) => r.reason).sort();
  expect(reasons).toEqual(["event", "progress"]);
  expect(host.spike!.events.filter((e) => (e as { slug: string }).slug === "why-seven-wins" && (e as { type: string }).type === "complete")).toEqual([]);
});
