import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true});
const results=[];
for(const slug of ['fossil-tracks-and-bones','birds-among-dinosaurs']) for(const screen of [{name:'phone',width:390,height:844},{name:'desktop',width:1280,height:800}]) for(const correct of [true,false]) {
 const page=await browser.newPage({viewport:{width:screen.width,height:screen.height}});const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',e=>{if(e.type()==='error')errs.push(e.text())});
 page.setDefaultTimeout(5000); const row={slug,screen:screen.name,correct,errors:errs,checks:{}};
 try {
  await page.goto('http://127.0.0.1:4927/?slug='+slug); await page.locator('[data-testid=lesson]').waitFor();
  const control=page.locator('[data-testid=stage] [data-qa=control]'), reveal=page.locator('[data-testid=reveal-button]'), choice=page.locator('[data-testid=predict-option]'), commit=page.locator('[data-testid=commit-prediction]');
  row.checks.initialLocked=await control.isDisabled()&&await commit.isDisabled()&&await reveal.count()===0;
  let answer=slug==='birds-among-dinosaurs'?0:1;let selected=correct?answer:(answer+1)%3;
  await choice.nth(selected).click();await commit.click();
  row.checks.revealGated=await reveal.isDisabled();
  let before=await page.locator('[data-testid=stage]').innerHTML();await control.click();let after=await page.locator('[data-testid=stage]').innerHTML();
  row.checks.interactionChangesStage=before!==after; row.checks.revealEnabled=await reveal.isEnabled();await reveal.click();
  row.checks.feedbackCorrect=(await page.locator('.verdict').innerText()).startsWith(correct?'Your prediction held.':'Not quite:');
  row.checks.revealLength=(await page.locator('[data-testid=reveal]').innerText()).length; row.checks.documentOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  row.geometry=await page.evaluate(()=>{let names={stage:'[data-testid=stage]',svg:'[data-testid=stage] svg',reveal:'[data-testid=reveal]',body:'.card-body',control:'[data-testid=stage] [data-qa=control]'};return Object.fromEntries(Object.entries(names).map(([name,selector])=>{let r=document.querySelector(selector).getBoundingClientRect();return [name,{x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}]}))});
  row.control=await control.isDisabled();
  if(screen.name==='phone' && !correct) await page.screenshot({path:`artifacts/zoology-exploration/${slug}-phone-reveal.png`});
  await page.reload();row.checks.reloadReturnsPredict=(await page.locator('[data-testid=lesson]').getAttribute('data-phase'))==='predict';
 } catch(e) {row.failure=e.message.split('\n').slice(0,4).join(' ')}
 results.push(row);await page.close();
}
for(const slug of ['fossil-tracks-and-bones','birds-among-dinosaurs']) {
 const page=await browser.newPage({viewport:{width:390,height:844}}); page.setDefaultTimeout(5000); const row={slug,screen:'phone keyboard',checks:{}};
 try {await page.goto('http://127.0.0.1:4927/?slug='+slug);await page.locator('[data-testid=lesson]').waitFor();
  async function tabTo(testid) {for(let i=0;i<25;i++){await page.keyboard.press('Tab');if(await page.evaluate((id)=>document.activeElement?.getAttribute('data-testid')===id,testid))return true}return false}
  row.checks.optionTab=await tabTo('predict-option');await page.keyboard.press('Space');row.checks.commitTab=await tabTo('commit-prediction');await page.keyboard.press('Enter');
  let found=false;for(let i=0;i<25;i++){await page.keyboard.press('Tab');if(await page.evaluate(()=>document.activeElement?.getAttribute('data-qa')==='control')){found=true;break}}row.checks.controlTab=found; if(found) await page.keyboard.press('Enter');row.checks.revealTab=await tabTo('reveal-button');await page.keyboard.press('Enter');row.checks.revealVisible=await page.locator('[data-testid=reveal]').isVisible();
 }catch(e){row.failure=e.message.split('\n').slice(0,4).join(' ')}results.push(row);await page.close();
}
fs.writeFileSync('artifacts/zoology-exploration/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();
