// End-to-end atlas/story checks beyond the protected lesson contract.
// STORY_BASE_URL=http://127.0.0.1:3430 node tests/history/story-flow.mjs
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.STORY_BASE_URL??'http://127.0.0.1:3430';
const stories=JSON.parse(fs.readFileSync('content/history-stories/collection.json','utf8'));
const symbols=JSON.parse(fs.readFileSync('content/history-stories/symbols.json','utf8'));
const out=process.env.STORY_OUT??'artifacts/history-stories';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch();const results=[];
try {
 for(const viewport of [{width:390,height:844},{width:1280,height:800}]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/history');await page.getByRole('heading',{name:'History moves.'}).waitFor().catch(()=>page.locator('h1').waitFor());
  assert.equal(await page.locator('a[href^="/d/story-"]').count(),24);
  assert(await page.getByText('Draft collection',{exact:true}).isVisible());
  await page.screenshot({path:`${out}/atlas-${viewport.width}.png`,fullPage:viewport.width>500});
  if(viewport.width===390){await page.goto(base+'/catalog');await page.getByRole('link',{name:'Explore interactive history map stories →'}).click();await page.waitForURL('**/history');assert.equal(new URL(page.url()).pathname,'/history');}
  for(const entry of stories){
   await page.goto(base+'/d/'+entry.slug);const stage=page.getByTestId('stage');const buttons=stage.getByRole('group',{name:'Story checkpoints'}).getByRole('button');
   await page.getByTestId('lesson').waitFor();assert.equal(await stage.locator('svg circle').count(),0,'historical markers hidden before prediction');
   assert.equal(await stage.locator('[data-story-symbol]').count(),0,'illustrations hidden before prediction');
   await page.getByTestId('predict-option').last().click();await page.getByTestId('commit-prediction').click();
   const reveal=page.getByTestId('reveal-button');assert(await reveal.isDisabled());
   // Neither repeatedly selecting a checkpoint nor reset can earn the unseen story.
   await buttons.nth(0).click();await buttons.nth(0).click();assert(await reveal.isDisabled());
   if(symbols[entry.slug]?.frames[0])assert.equal(await stage.locator('[data-story-symbol]').getAttribute('data-story-symbol'),symbols[entry.slug].frames[0]);
   await buttons.nth(3).click();assert(await reveal.isDisabled());
   await stage.getByRole('button',{name:'Reset',exact:true}).click();assert(await reveal.isDisabled());
   assert.match(await stage.innerText(),/2\/4 visited/);
   const timeline=stage.locator('input[aria-label="Timeline"]');await timeline.focus();await page.keyboard.press('ArrowRight');assert(await reveal.isDisabled());
   await buttons.nth(2).click();assert(await reveal.isEnabled());
   if(symbols[entry.slug]?.frames[2])assert.equal(await stage.locator('[data-story-symbol]').getAttribute('data-story-symbol'),symbols[entry.slug].frames[2]);
   if(symbols[entry.slug]?.frames[2]==='camp')await page.screenshot({path:`${out}/${entry.slug}-camp-${viewport.width}.png`});
   await stage.getByRole('button',{name:'Compare',exact:true}).click();assert.match(await stage.innerText(),/white: earlier/);
   await stage.getByRole('button',{name:'Reset',exact:true}).click();assert.equal(await timeline.inputValue(),'0');assert.match(await stage.innerText(),/4\/4 visited/);assert(await reveal.isEnabled());
   if(entry.slug==='story-suez-canal'){await buttons.nth(2).click();assert(await stage.getByText('Closed',{exact:true}).isVisible());}
   if(entry.slug==='story-panama-locks'){await buttons.nth(1).click();assert(await stage.getByText('26 m elevation',{exact:true}).isVisible());}
   await reveal.click();assert.equal(await timeline.inputValue(),'3','reveal pins final evidence even after reset');
   const explanation=page.getByTestId('reveal');assert((await explanation.innerText()).length>120);
   await page.waitForTimeout(250);
   const layout=await page.evaluate(()=>{
    const map=document.querySelector('[data-testid="stage"] svg').getBoundingClientRect();
    const why=document.querySelector('[data-testid="reveal"]').getBoundingClientRect();
    const card=document.querySelector('.card-shell').getBoundingClientRect();
    const caption=document.querySelector('[data-story] strong').getBoundingClientRect();
    const body=document.querySelector('.card-body').getBoundingClientRect();
    const art=document.querySelector('[data-story-symbol]')?.getBoundingClientRect();
    const overlaps=art?[...document.querySelectorAll('[data-testid="stage"] svg text')].filter(t=>{const b=t.getBoundingClientRect();return Math.min(b.right,art.right)-Math.max(b.left,art.left)>1&&Math.min(b.bottom,art.bottom)-Math.max(b.top,art.top)>1;}).map(t=>t.textContent):[];
    return {symbolLabelOverlaps:overlaps,captionTop:caption.top,bodyTop:body.top,overflow:document.documentElement.scrollWidth-innerWidth,mapHeight:map.height,mapTop:map.top,revealBottom:why.bottom,cardBottom:card.bottom};
   });
   assert.deepEqual(layout.symbolLabelOverlaps,[],entry.slug+' illustration overlaps labels');assert(layout.captionTop>=layout.bodyTop-1,entry.slug+' caption clipped '+JSON.stringify(layout));assert(layout.overflow<=1);assert(layout.mapHeight>=90,JSON.stringify(layout));assert(layout.revealBottom<=layout.cardBottom+1,entry.slug+' reveal clipped '+JSON.stringify(layout));
   if(symbols[entry.slug])await page.screenshot({path:`${out}/${entry.slug}-${viewport.width}.png`});
   results.push({slug:entry.slug,viewport,pass:true,layout});
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log(`PASS ${results.length} complete story flows plus atlas/catalog navigation`);
} finally {await browser.close();fs.writeFileSync(out+'/flow-results.json',JSON.stringify(results,null,2)+'\n');}
