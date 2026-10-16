// AMD-011 fixtures: each proposed check must fail on the case it is for and pass on the fixed case.
// No server: page.setContent with the contract's DOM hooks (data-testid lesson/stage/reveal-button, data-qa=control).
import { expect, test } from "@playwright/test";
import { orderCheck, rule3 } from "./checks";

/**
 * Copy of long-cord-knots-itself's tap order (src/components/lifehacks/HomeLesson.tsx CordStage at lhw3 5d9de52,
 * identical on main 3523e83): A "Tumble 0.3 m" -> runs=1, reach('short'); B "Tumble 3 m" -> runs=2, reach('long');
 * a button is pressed when runs>=1 (A) / runs>=2 (B), and a pressed HomeMode is aria-disabled and a no-op
 * (StageControl inactive). The reveal needs both milestones (minInteractions 2). `fixed` makes B also reach 'short'.
 */
function cord(variant: "buggy" | "fixed", ariaDisabledOnPressed = true) {
  return `<!doctype html><meta name=viewport content="width=device-width"><div data-testid="lesson" data-phase="explore">
  <div data-testid="stage"><p id="rows">? | ?</p>
  <button data-qa="control" id="a" style="width:120px;height:44px">Tumble 0.3 m</button>
  <button data-qa="control" id="b" style="width:120px;height:44px">Tumble 3 m</button></div>
  <button data-testid="reveal-button" id="rv" disabled>Show me why</button></div>
  <script>
  let runs=0; const seen=new Set(); const VARIANT=${JSON.stringify(variant)}; const AD=${ariaDisabledOnPressed};
  const reach=(m)=>{seen.add(m)};
  function render(){
    for (const [id,on] of [["a",runs>=1],["b",runs>=2]]) { const el=document.getElementById(id);
      el.setAttribute("aria-pressed", String(on)); if (on && AD) el.setAttribute("aria-disabled","true"); else el.removeAttribute("aria-disabled"); }
    document.getElementById("rows").textContent=(runs>=1?"0 of 20":"?")+" | "+(runs>=2?"13 of 20":"?");
    document.getElementById("rv").disabled = seen.size < 2;
  }
  document.getElementById("a").onclick=()=>{ if(runs>=1) return; runs=1; reach("short"); render(); };
  document.getElementById("b").onclick=()=>{ if(runs>=2) return; runs=2; reach("long"); if(VARIANT==="fixed") reach("short"); render(); };
  render();
  </script>`;
}

/** W-1128: a two-way mode row (A selected) after W-1114: the selected button is aria-pressed, NOT aria-disabled, and a no-op. */
function modeRow() {
  return `<!doctype html><div data-testid="lesson" data-phase="explore"><div data-testid="stage"><p id="v">A: 12 L</p>
  <button data-qa="control" id="a" aria-pressed="true" style="width:120px;height:44px">A · tall box</button>
  <button data-qa="control" id="b" aria-pressed="false" style="width:120px;height:44px">B · flat box</button></div>
  <button data-testid="reveal-button" id="rv" disabled>Show me why</button></div>
  <script>
  let mode="a"; const press=(m)=>{ if(mode===m) return; mode=m; document.getElementById("a").setAttribute("aria-pressed",String(m==="a"));
    document.getElementById("b").setAttribute("aria-pressed",String(m==="b")); document.getElementById("v").textContent=m==="a"?"A: 12 L":"B: 9 L";
    document.getElementById("rv").disabled=false; };
  document.getElementById("a").onclick=()=>press("a"); document.getElementById("b").onclick=()=>press("b");
  </script>`;
}

/** word-in-pieces shape: on/off toggles that start pressed; turning them off is the milestone. */
function toggles() {
  return `<!doctype html><div data-testid="lesson" data-phase="explore"><div data-testid="stage"><p id="v">3 on</p>
  ${["un", "happi", "ness"].map((p) => `<button data-qa="control" aria-pressed="true" style="width:90px;height:44px">${p}</button>`).join("")}</div>
  <button data-testid="reveal-button" id="rv" disabled>Show me why</button></div>
  <script>
  const bs=[...document.querySelectorAll("[data-qa=control]")];
  bs.forEach(b=>b.onclick=()=>{ b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed")!=="true"));
    const on=bs.filter(x=>x.getAttribute("aria-pressed")==="true").length; document.getElementById("v").textContent=on+" on";
    if(on===0) document.getElementById("rv").disabled=false; });
  </script>`;
}

test.describe("part 2: reverse order never dead-ends", () => {
  test("FAILS the long-cord tap order at 5d9de52 (the soft lock)", async ({ page }) => {
    await page.setContent(cord("buggy"));
    const r = await orderCheck(page, { settleMs: 50 });
    expect(r.deadEnd).toBe(true);
    expect(r.presses).toBe(1); // B; then A and B are aria-disabled and nothing is left to press
  });
  test("still FAILS it after W-1114 (pressed buttons lose aria-disabled but stay no-ops)", async ({ page }) => {
    await page.setContent(cord("buggy", false));
    expect((await orderCheck(page, { settleMs: 50 })).deadEnd).toBe(true);
  });
  test("today's contract (DOM order A, B) PASSES the same page: the gap W-1242 names", async ({ page }) => {
    await page.setContent(cord("buggy"));
    expect((await rule3(page, { part1: false, settleMs: 50 })).dead).toEqual([]);
    await expect(page.locator('[data-testid="reveal-button"]')).toBeEnabled();
  });
  test("PASSES the fixed tap order (B also reaches short)", async ({ page }) => {
    await page.setContent(cord("fixed"));
    const r = await orderCheck(page, { settleMs: 50 });
    expect(r.unlocked).toBe(true);
    expect(r.deadEnd).toBe(false);
  });
});

test.describe("part 1: a pressed control that changes nothing is not dead", () => {
  test("today's rule 3 reports the selected mode button dead (the W-1128 probe failure)", async ({ page }) => {
    await page.setContent(modeRow());
    expect((await rule3(page, { part1: false, settleMs: 50 })).dead).toEqual(["A · tall box"]);
  });
  test("part 1's rule 3 does not, and still checks B", async ({ page }) => {
    await page.setContent(modeRow());
    const r = await rule3(page, { part1: true, settleMs: 50 });
    expect(r.dead).toEqual([]);
    expect(r.pressedNoops).toBe(1);
    await expect(page.locator('[data-testid="reveal-button"]')).toBeEnabled();
  });
  test("a pressed toggle that is the way to the reveal is still pressed (word-in-pieces shape)", async ({ page }) => {
    await page.setContent(toggles());
    const r = await rule3(page, { part1: true, settleMs: 50 });
    expect(r.dead).toEqual([]);
    await expect(page.locator('[data-testid="reveal-button"]')).toBeEnabled();
  });
});
