import {chromium} from 'playwright';
import fs from 'node:fs';
const slugs=JSON.parse(fs.readFileSync('artifacts/zoology-ecology-corrections-exploration/slugs.json','utf8'));
const browser=await chromium.launch({headless:true}), results=[];
for(const [i,slug] of slugs.entries()){
 for(const screen of [{name:'phone',width:390,height:844},{name:'desktop',width:1280,height:800}]){
  const page=await browser.newPage({viewport:{width:screen.width,height:screen.height}});page.setDefaultTimeout(5000);const errors=[],problems=[],actions=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
  const row={slug,screen:screen.name,errors,problems,actions};
  try{
    await page.goto('http://127.0.0.1:4932/?slug='+encodeURIComponent(slug));const root=page.locator('[data-testid=lesson]');await root.waitFor();
    const stage=page.locator('[data-testid=stage]'),controls=stage.locator('[data-qa=control]'),opts=page.locator('[data-testid=predict-option]'),commit=page.locator('[data-testid=commit-prediction]');
    let n=await controls.count();if(n===0)problems.push('no stage controls');
    if(await page.locator('[data-testid=reveal-button]').count())problems.push('reveal exists before prediction');
    if(!await commit.isDisabled())problems.push('commit initially enabled');
    for(let j=0;j<n;j++)if(!(await controls.nth(j).isDisabled()))problems.push('stage control enabled before prediction '+j);
    let op=await opts.count();if(op<2)problems.push('less than two options');else await opts.last().click();await commit.click();
    const reveal=page.locator('[data-testid=reveal-button]');if(!(await reveal.isDisabled()))problems.push('reveal enabled before interaction');
    for(let j=0;j<Math.min(await controls.count(),16);j++){
      const c=controls.nth(j);if(!(await c.isVisible())||await c.isDisabled())continue;
      let before=await stage.innerHTML(), label=(await c.getAttribute('aria-label'))||await c.innerText().catch(()=>''), tag=await c.evaluate(el=>`${el.tagName}:${el.type||''}`);
      if(tag==='INPUT:range'){await c.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight')}
      else await c.click();await page.waitForTimeout(100);
      let after=await stage.innerHTML();actions.push(label);if(before===after)problems.push('no observable control change: '+label);
    }
    if(await reveal.isDisabled())problems.push('reveal still gated after controls in DOM order');
    else{
      await reveal.click();const rv=page.locator('[data-testid=reveal]');await rv.waitFor();row.revealLength=(await rv.innerText()).trim().length;if(row.revealLength<=120)problems.push('reveal text 120 characters or shorter');
      await page.waitForTimeout(500);
      row.geometry=await page.evaluate(()=>{let get=s=>{let el=document.querySelector(s),r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,width:r.width}};return {stage:get('[data-testid=stage]'),reveal:get('[data-testid=reveal]'),body:get('.card-body'),overflow:document.documentElement.scrollWidth-innerWidth,scrollTop:document.querySelector('.card-body').scrollTop}});
      if(row.geometry.overflow>1)problems.push('horizontal overflow '+row.geometry.overflow);
      if(screen.name==='phone'){if(row.geometry.stage.top<row.geometry.body.top-1)problems.push('stage top crop '+(row.geometry.body.top-row.geometry.stage.top).toFixed(1)+' px'); if(row.geometry.reveal.bottom>row.geometry.body.bottom+1)problems.push('reveal bottom outside card by '+(row.geometry.reveal.bottom-row.geometry.body.bottom).toFixed(1)+' px');await page.screenshot({path:`artifacts/zoology-ecology-corrections-exploration/${slug}-phone.png`})}
    }
    let sizes=await controls.evaluateAll(els=>els.filter(e=>e.offsetParent!==null).map(e=>{let r=e.getBoundingClientRect();return {width:r.width,height:r.height}}));row.controlSizes=sizes;
    if(sizes.some(s=>s.width<24||s.height<24))problems.push('control smaller than 24 px');
  }catch(e){problems.push('exception: '+e.message.split('\n')[0])}
  if(errors.length)problems.push('browser errors');results.push(row);await page.close();
 }
 if((i+1)%5===0)console.log('Tested '+(i+1)+'/'+slugs.length+' lessons');
}
fs.writeFileSync('artifacts/zoology-ecology-corrections-exploration/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify({lessons:slugs.length,runs:results.length,errors:results.filter(x=>x.problems.length).map(({slug,screen,problems})=>({slug,screen,problems}))},null,2));await browser.close();
