import { chromium } from "@playwright/test";
const slugs = process.argv.slice(2);
const b = await chromium.launch(process.env.PW_CHROMIUM_PATH?{executablePath:process.env.PW_CHROMIUM_PATH}:{});
for (const [name,vp] of [["phone",{width:412,height:915}],["desktop",{width:1280,height:800}]]) {
 const ctx = await b.newContext({viewport:vp}); 
 for (const s of slugs) {
  const p = await ctx.newPage(); await p.goto(`http://localhost:3951/d/${s}`);
  await p.locator('[data-testid="predict-option"]').last().click();
  await p.locator('[data-testid="commit-prediction"]').click();
  const c = p.locator('[data-testid="stage"] [data-qa="control"]');
  for (let i=0;i<Math.min(await c.count(),16);i++){const e=c.nth(i); if(await e.isVisible()&&await e.isEnabled()){ await e.click({timeout:3000}).catch(()=>{}); await p.waitForTimeout(150);}}
  const r = await p.locator('[data-testid="stage"] [data-qa="control"]').evaluateAll(els=>els.filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return {t:e.tagName+":"+(e.type||""),a:e.getAttribute("aria-label")||e.innerText.slice(0,20),w:Math.round(r.width),h:Math.round(r.height)}}).filter(x=>x.w<24||x.h<24));
  console.log(name,s,JSON.stringify(r)); await p.close();
 }
}
await b.close();
