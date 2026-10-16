"use client";

import { useState, type ReactNode } from 'react';
import type { LessonProps, StageContext } from '@/kit/Lesson';
import { Slider } from '@/kit/controls';
import { ModeControl, StageControl, StageStatus } from './a11y';
import { SeenTable } from './SeenTable';
import { useMilestones } from '@/kit/milestones';
import { homeLessons } from '@/lib/lifehacks/home-lessons';
import { evaluateHome, fmt, sourceConditionedCordTrials, rectangularPackingScene, homeRulerScene, homeCordScene, type HomeSpec, type HomeResult } from '@/lib/lifehacks/home-models';
import { homeColumn, homeModeLabels, homeResultLabel, homeRevealLine, homeSliderMatters, type Mode } from '@/lib/lifehacks/engine-v2';
import s from './HomeLesson.module.css';
import a11y from './a11y.module.css';

/**
 * TP-1 (W-598, W-1066; engines-v2 spec section 1 and R1) for the v1 Home stages: the layout in effect is drawn
 * selected (tint, 2 px border, leading check mark), carries aria-pressed="true" and stays focusable (aria-disabled,
 * W-557). It is never dimmed. The other layout is outlined, aria-pressed="false", and pressable. Button text is
 * unchanged; v2 lessons use ModeControl, which adds the A/B letter.
 */
function HomeMode({ locked, pressed, onPress, children }: { locked: boolean; pressed: boolean; onPress: () => void; children: ReactNode }) {
  return <StageControl locked={locked} inactive={pressed} aria-pressed={!locked && pressed}
    className={`${a11y.mode}${!locked && pressed ? ' active' : ''}`} onClick={onPress}>
    {!locked && pressed && <span aria-hidden="true">✓ </span>}{children}
  </StageControl>;
}

/**
 * v2 only (W-608): `override` replaces the drawing, `extra` is drawn on top, `className`/`label` replace the svg's. v1 passes none.
 * `neutral` (W-1258, engines-v2 spec R2 "Predict (locked)" row): no mode is in effect (locked, or before the first press).
 * The picture keeps A's arrangement but draws no text that states a count, amount or result for either mode, and no
 * highlight that marks what to look at (W-1299). Givens the question states may stay (tests/lifehacks/home-locked.test.mjs).
 */
type SceneV2Props = { className?: string; label?: string; override?: ReactNode; extra?: ReactNode; caption?: string; neutral?: boolean };
function Scene({ spec, p, after, result, locked, v2 }: { spec:HomeSpec; p:number; after:boolean; result:HomeResult; locked:boolean; v2?:SceneV2Props }) {
  const n = Math.min(12,Math.max(2,Math.round(p)));
  const v=spec.values, model=spec.model, neutral=v2?.neutral===true;
  const rect=(x:number,y:number,w:number,h:number,key:string,target=false)=><rect key={key} x={x} y={y} width={Math.max(1,w)} height={Math.max(1,h)} rx={3} className={target?s.target:s.object}/>;
  let art:React.ReactNode;
  if(spec.view==='cloth') {
    const layers=model==='dry'?(after?1:4):model==='layers'?(after?4:2):model==='split-area'?(after?2:1):model==='nest'?Math.min(n,7):1;
    const widths=model==='dry'?Math.max(80,180/layers):model==='layers'?180/layers:180;
    if(model==='gaps') art=<>{Array.from({length:5},(_,i)=>rect(35+i*(after?48:26),42,24,130,`cloth${i}`))}<line x1="25" x2="275" y1="38" y2="38" className={s.line}/>{after&&[0,1,2,3].map(i=><path key={i} d={`M${72+i*48},174v-55l-4,8m4,-8l4,8`} className={s.air}/>)}</>;
    else if(model==='overlap') art=<>{rect(35,45,140,100,'cloth1')}{rect(after?180:80,after?45:75,after?85:140,100,'cloth2')}<path d={`M${after?210:150},32v-15m-4,5l4,-5l4,5`} className={s.air}/></>;
    else if(model==='support-load') art=<><path d={`M40,50 L70,${after?80:150} L230,${after?80:150} L260,50 Z`} className={s.object}/>{Array.from({length:after?6:2},(_,i)=><circle key={i} cx={40+i*220/((after?6:2)-1)} cy={50} r={5} fill="var(--good)"/>)}<path d="M150,90v45l-4,-6m4,6l4,-6" className={s.line}/></>;
    else if(model==='label-rule') art=<><path d={after?'M35,85h45l25,-20h65l25,20h65v60H35z':'M90,45h120l25,35l-25,20v70H90v-70l-25,-20z'} className={s.object}/><line x1={after?35:100} y1={after?152:35} x2={after?260:200} y2={after?152:35} className={s.line}/></>;
    else if(model==='conserve') art=after?<><ellipse cx="150" cy="75" rx="70" ry="22" className={s.object}/><path d="M80,75v70a70,22 0 0 0 140,0V75" className={s.object}/><ellipse cx="150" cy="145" rx="70" ry="22" className={s.object}/></>:<>{Array.from({length:4},(_,i)=>rect(65,65+i*16,170,25,`fold${i}`))}</>;
    else art=<>{Array.from({length:Math.min(8,layers)},(_,i)=>rect(150-widths/2,42+i*23,widths,20+(model==='area-volume'?Math.min(25,p*3*(after?2:1)):0),`face${i}`))}{[0,1,2,3].map(i=><path key={i} d={`M${160-widths/2+i*widths/4},${38+(model==='humidity'?p/4:0)}v-18l-4,6m4,-6l4,6`} className={s.air}/>)}<path d={`M${after?220:195},170q-20,-20 -40,0`} className={s.air}/></>;
  } else if(spec.view==='grid') {
    if(model==='pairpack') art=<><path d="M40,50q45,-15 65,5v115q-25,15 -35,-5z" className={s.object}/><path d={after?'M115,55q30,-15 40,5v95q-25,35 -55,10z':'M155,50q45,-15 65,5v115q-25,15 -35,-5z'} className={s.target}/></>;
    else if(model==='circle-fit') {
      const diameter=v[0],columns=Math.floor(p/diameter),scale=170/p,x=65,y=30;
      art=<><rect x={x} y={y} width={170} height={170} className={s.outline}/>{Array.from({length:columns*columns},(_,i)=><circle key={i} cx={x+(i%columns+0.5)*diameter*scale} cy={y+(Math.floor(i/columns)+0.5)*diameter*scale} r={diameter*scale/2} className={s.object}/>)}<path d="M132,222q20,-16 37,0m-8,-2l8,2l-3,-8" transform={`rotate(${after?90:0},150,220)`} className={s.air}/></>;
    } else if(model==='handle-envelope') {
      const diameter=v[0],handle=v[1],pitch=diameter+(after?handle:0),scale=230/p,columns=Math.floor(p/pitch),r=diameter*scale/2,h=handle*scale;
      art=<><rect x="35" y="55" width="230" height="100" className={s.outline}/>{Array.from({length:columns},(_,i)=>{
        const cx=35+i*pitch*scale+r,cy=105;
        return <g key={i}><circle cx={cx} cy={cy} r={r} className={s.object}/><path d={`M${cx+r},${cy-r/2}C${cx+r+4*h/3},${cy-r/2} ${cx+r+4*h/3},${cy+r/2} ${cx+r},${cy+r/2}`} className={s.line}/></g>;
      })}</>;
    } else if(model==='divider') {
      const scale=230/p,compartment=result.value*scale,wall=after?v[1]*scale:0;
      art=<><rect x="35" y="45" width="230" height="130" className={s.outline}/>{[1,2,3].map(i=><rect key={i} x={35+i*compartment+(i-1)*wall} y={45} width={after?wall:0.5} height={130} className={after?s.object:s.hidden}/>)}</>;
    }
    else if(model==='shelf-height') art=<><rect x="35" y="35" width="230" height="165" className={s.outline}/><line x1="35" x2="265" y1={after?100:45} y2={after?100:45} className={s.line}/>{rect(65,after?130:145,85,45,'box')}{after&&rect(170,52,65,42,'extra')}</>;
    else if(model==='contain') art=<>{after&&<rect x="50" y="32" width="200" height="160" rx="20" className={s.outline}/>} {Array.from({length:n},(_,i)=>rect(after?75+(i%4)*36:25+(i%4)*65,50+Math.floor(i/4)*45,22,30,`item${i}`,i===0))}{after&&<path d="M60,40h180m-170,0v140m30,-140v140m30,-140v140m30,-140v140m30,-140v140m30,-140v140" stroke="var(--line)" fill="none"/>}</>;
    else if(model==='transparent') art=<>{Array.from({length:n},(_,i)=><g key={i}><rect x={35+(i%4)*60} y={35+Math.floor(i/4)*55} width="50" height="44" className={s.outline}/>{after&&rect(44+(i%4)*60,46+Math.floor(i/4)*55,30,24,`inside${i}`,i===n-1)}</g>)}</>;
    else if(model==='gridfit') {
      const scene=rectangularPackingScene(p,v[0],after?v[2]:v[1],after?v[1]:v[2]);
      art=<><rect x={scene.x} y={scene.y} width={scene.width} height={scene.height} className={s.outline}/>{scene.items.map((item,i)=>rect(item.x,item.y,item.width,item.height,`tile${i}`,i===scene.items.length-1))}</>;
    } else {
      art=<><rect x="35" y="30" width="230" height="170" className={s.outline}/>{Array.from({length:n},(_,i)=>rect(43+(i%4)*52,40+Math.floor(i/4)*52,42,40,`tile${i}`,i===n-1))}</>;
    }
  } else if(spec.view==='volume') {
    if(model==='hollow') art=<><path d="M40,80h120l60,60v35H40z" className={s.outline}/><ellipse cx="105" cy="86" rx="45" ry="20" className={s.hidden}/>{rect(after?90:230,after?74:135,38,30,'socks',true)}</>;
    else if(model==='nested-wall') art=<>{Array.from({length:Math.min(n,7)},(_,i)=><path key={i} d={`M${55+i*5},${40+i*(after?14:23)}h${190-i*10}l-12,55h-${166-i*10}z`} className={s.object}/>)}</>;
    else if(model==='flat-pack') art=after?<>{Array.from({length:n},(_,i)=>rect(70,45+i*12,160,8,`panel${i}`))}</>:<><path d="M60,60l50,-30h150v125l-50,40H60z" className={s.outline}/><path d="M60,60h150v135M210,60l50,-30" className={s.line}/></>;
    else art=<><path d="M50,60l40,-25h155l25,25v120H50z" className={s.outline}/><path d="M50,60h220M90,35v25" className={s.line}/><rect x={after?70:50} y={after?80:60} width={after?180:220} height={after?80:120} className={s.object}/>{model==='weight-limit'&&<path d={`M150,185v${Math.min(20,p*2)}m-5,-4l5,4l5,-4`} className={s.target}/>}</>;
  } else if(spec.view==='order') {
    const row=after, target=model==='label-face'?false:true;
    if(model==='combinations') art=<>{Array.from({length:n},(_,i)=><g key={i}><path d={`M${40+(i%5)*48},${45+Math.floor(i/5)*85}h18v25h-10v12h-18v-15h10z`} className={s.object}/>{after&&<text x={42+(i%5)*48} y={60+Math.floor(i/5)*85}>{Math.floor(i/2)+1}</text>}</g>)}</>;
    else art=<>{Array.from({length:n},(_,i)=>{
      const x=row?30+(i%n)*(240/n):70+(i%2)*85;
      const y=row?68:36+Math.floor(i/2)*28;
      const w=row?Math.max(13,220/n):75,h=row?92:24;
      return <g key={i}>{rect(x,y,w,h,`item${i}`,target&&i===(row?0:n-1))}{(model==='label-face'?after:true)&&<text x={x+w/2} y={row?120:y+16} textAnchor="middle">{model==='binary-search'&&after?String.fromCharCode(65+i):i+1}</text>}</g>;
    })}{['access','reverse-order','weighted-access','nest-access'].includes(model)&&<path d={after?'M30,174h30l-5,-5m5,5l-5,5':'M150,180v-30l-5,5m5,-5l5,5'} className={s.air}/>}</>;
  } else if(spec.view==='route') {
    const roundTrip=model!=='two-stations';
    const journeys=model==='trips'?(after?1:Math.round(p)):(after?0:v[0]);
    const oneWay=model==='trips'?v[0]:p;
    art=<><rect x="20" y="30" width="260" height="165" className={s.outline}/>{rect(38,80,40,45,'desk')}{rect(225,80,40,45,'bin')}{Array.from({length:journeys},(_,i)=>{
      const y=58+i*(journeys>8?9:14),reverse=!roundTrip&&i%2===1;
      return <g key={i}><path d={reverse?`M220,${y}H80l6,-3m-6,3l6,3`:`M80,${y}H220l-6,-3m6,3l-6,3`} className={after?s.air:s.line} strokeDasharray={after?'0':'5 4'}/>{roundTrip&&<path d={`M220,${y+5}H80l6,-3m-6,3l6,3`} className={after?s.air:s.line} strokeDasharray={after?'0':'5 4'}/>}</g>;
    })}{model!=='trips'&&rect(49,94,16,16,'tool',true)}{after&&model==='two-stations'&&rect(236,94,16,16,'copy',true)}<text x="150" y="182" textAnchor="middle">{fmt(oneWay)}m {roundTrip?'one-way':'between desks'}</text></>;
  } else if(spec.view==='mechanics') {
    if(model==='balance') art=<><path d="M50,75h200l-20,110H70z" className={s.outline}/><path d="M95,75q0,-50 55,-50t55,50" className={s.line}/>{rect(70,95,after?50:80,62,'left')}{rect(182,after?95:130,after?50:35,after?62:27,'right',true)}<line x1={150+result.value*2} y1="65" x2={150+result.value*2} y2="190" className={s.air}/></>;
    else if(model==='pressure') art=<><line x1="30" x2="270" y1="175" y2="175" className={s.line}/>{rect(after?60:105,110,after?180:90,64,'load')}<path d="M150,60v45l-5,-7m5,7l5,-7" className={s.line}/><text x="150" y="50" textAnchor="middle">{fmt(p)}kg</text></>;
    else art=<><line x1="55" x2="55" y1="35" y2="195" className={s.line}/><path d="M55,190h215" className={s.line}/>{rect(after?70:190,80,40,65,'book')}<path d={`M${after?90:210},150v28l-5,-6m5,6l5,-6`} className={s.target}/><line x1="55" y1="65" x2={after?90:210} y2="65" className={s.air}/><text x={after?74:135} y="56" textAnchor="middle">{result.other}cm</text></>;
  } else if(spec.view==='ruler') {
    const scene=homeRulerScene(spec,p,after),offset=model==='ruler-offset',mark=model==='mark-error',conversion=model==='conversion';
    const labelled=(i:number)=>mark?[0,50,100].includes(i):conversion?[0,20,40].includes(i):i%5===0;
    const tickStep=mark?10:1;
    art=<><rect x={scene.zero-5} y="130" width={scene.max*scene.scale+10} height="35" className={s.outline}/>{Array.from({length:Math.floor(scene.max/tickStep)+1},(_,i)=>{
      const cm=i*tickStep,x=scene.zero+cm*scene.scale;
      return <g key={i}><line x1={x} x2={x} y1="130" y2={labelled(cm)?151:141} className={s.line}/>{labelled(cm)&&<text x={x} y="163" textAnchor="middle">{cm}</text>}</g>;
    })}{mark?scene.marks.map((m,i)=><g key={i}><line x1={m.target} x2={m.target} y1="75" y2="110" className={s.hidden}/><line x1={m.actual} x2={m.actual} y1="68" y2="105" className={s.air}/><circle cx={m.actual} cy="68" r="3" fill="var(--good)"/></g>):rect(scene.objectStart,75,scene.objectEnd-scene.objectStart,30,'measured')}
      <path d={`M${scene.measureStart},112H${scene.measureEnd}`} className={s.air}/>{scene.folds.map((x,i)=><line key={i} x1={x} x2={x} y1="75" y2="105" className={s.line}/>)}
      {conversion&&Array.from({length:16},(_,inch)=>{
        const x=scene.zero+inch*(after?v[0]:v[1])*scene.scale;
        return <g key={inch}><line x1={x} x2={x} y1="185" y2={inch%5===0?203:195} className={s.air}/>{inch%5===0&&<text x={x} y="216" textAnchor="middle">{inch}in</text>}</g>;
      })}
    </>;
  } else if(spec.view==='swing') {
    const theta=after?Math.PI/2:Math.PI/4;
    art=<><path d="M45,35v160h220" className={s.line}/><path d="M45,195V45A150,150 0 0 1 195,195Z" fill="var(--domain)" fillOpacity=".08" stroke="var(--line)"/><line x1="45" y1="195" x2={45+150*Math.cos(theta)} y2={195-150*Math.sin(theta)} className={s.object}/>{rect(after?230:105,after?110:115,35,35,'basket',true)}<circle cx="45" cy="195" r="5" fill="var(--fg)"/></>;
  } else if(spec.view==='diagonal') {
    const theta=model==='square-test'&&!after?20:0;
    art=<g transform={`translate(25,30) skewX(${theta})`}><rect x="25" y="15" width="200" height="145" className={s.outline}/><path d={model==='square-test'?'M25,15L225,160M225,15L25,160':after?'M25,160L225,15':'M25,160H225'} className={s.air}/><text x="125" y="188" textAnchor="middle">{fmt(p)}×{v[0]}cm</text></g>;
  } else if(spec.view==='fit') {
    const envelope=model==='fit'?(after?v[1]:v[0]):model==='clearance'?(v[0]+(after?2*v[1]:0)):model==='inside-width'?(after?p-2*v[0]:p):model==='tolerance'?(after?p-2*v[1]:p):p;
    const width=Math.min(250,Math.max(30,envelope*3));
    art=<><path d="M45,35v155M255,35v155M45,35h210" className={s.line}/>{rect(150-width/2,65,width,105,'object',result.value<0)}{model==='clearance'&&after&&<><path d={`M${150-width/2},90h-12v45h12M${150+width/2},90h12v45h-12`} className={s.line}/></>}<line x1="45" x2="255" y1="205" y2="205" className={s.air}/><text x="150" y="222" textAnchor="middle">{fmt(p)}cm opening</text></>;
  } else if(spec.view==='cord') {
    // W-358: plain cord only (safety records forbid plugs, devices, power or snap-back).
    const c=homeCordScene(spec,p,after);
    if(c?.kind==='end-paths') art=<>{c.strands.map((strand,i)=><path key={i} d={strand.d} className={s.line}/>)}{c.ties.map((t,i)=><rect key={`tie${i}`} x={t.x} y={t.y} width={t.width} height={t.height} rx={3} className={s.object}/>)}{c.ends.map((e,i)=><circle key={`end${i}`} cx={e.x} cy={e.y} r={4} className={neutral?s.object:s.target}/>)}{!neutral&&<text x="150" y="222" textAnchor="middle">{after?'Ends tucked into end ties':`${c.ends.length} loose ends`}</text>}</>;
    else if(c?.kind==='loop-release') art=<><rect x="12" y="138" width="12" height="24" className={s.outline}/><path d={c.cord} className={s.line}/>{c.crossings.map((x,i)=><circle key={i} cx={x.x} cy={x.y} r={5} className={s.target}/>)}{after&&<><ellipse cx={c.end+14} cy={150} rx={8} ry={22} className={s.hidden}/><path d={`M150,118H${c.end+10}m-6,-4l6,4l-6,4`} className={s.air}/></>}<circle cx={c.end} cy={150} r={3} fill="var(--good)"/><path d={`M${c.start},180v6H${c.end}v-6`} className={s.line}/><text x={(c.start+c.end)/2} y="202" textAnchor="middle">free end {fmt(p)}cm</text></>;
    else if(c?.kind==='coil-radius') art=<>{c.loops.map((l,i)=><circle key={i} cx={l.cx} cy={l.cy} r={l.r} className={s.line} fill="none"/>)}{c.partial&&<path d={c.partial} className={s.line}/>}<line x1={c.cx} y1={c.cy} x2={c.cx-c.r} y2={c.cy} className={s.air}/><circle cx={c.cx} cy={c.cy} r={2.5} fill="var(--good)"/>{!neutral&&<><text x={c.cx} y={c.cy-c.r-8} textAnchor="middle">r={fmt(c.radius)}cm</text><text x="150" y="234" textAnchor="middle">{fmt(c.turns)} turns of {fmt(v[0])}cm</text></>}</>;
  } else {
    if(model==='circle-area') art=<><rect x="60" y="30" width="180" height="180" className={s.outline}/>{after?<circle cx="150" cy="120" r="90" className={s.object}/>:rect(60,30,180,180,'square')}</>;
    else if(model==='diameter-match') art=<><circle cx="90" cy="120" r={Math.min(60,p*2.5)} className={s.outline}/><circle cx="215" cy="120" r={Math.min(60,(after?p:v[1])*2.5)} className={s.object}/></>;
    else if(model==='rug-clearance') art=<><rect x={after?35:80} y={after?25:50} width={after?230:140} height={after?180:130} className={s.object}/><rect x="80" y="60" width="140" height="110" className={s.outline}/>{rect(125,after?28:65,50,30,'chair-top',true)}{rect(125,after?174:135,50,30,'chair-bottom',true)}<path d={after?'M150,68v-28M150,162v28':'M150,75v12M150,148v-12'} className={s.air}/></>;
    else if(model==='aspect-fit') art=<><rect x="30" y="35" width="240" height="160" className={s.outline}/>{rect(after?60:30,after?45:35,after?180:240,after?135:160,'photo')}<path d={after?'M70,170l50,-80l80,80z':'M45,180l75,-95l100,95z'} className={s.line}/></>;
    else if(model==='reach') art=<><rect x="40" y="40" width="220" height="140" className={s.outline}/>{rect(after?50:165,after?155:95,75,45,'tray')}{rect(after?67:184,after?155:96,35,27,'item',true)}<path d={`M150,210L${after?80:200},${after?180:120}`} className={s.air}/></>;
    else art=<><path d="M60,70l45,-35h140v125l-45,35H60z" className={s.outline}/><path d="M60,70h140v125M200,70l45,-35" className={s.line}/>{after&&<path d={model==='ribbon'?'M130,40v153M62,132h137l45,-40':'M60,70l140,125M60,195l140,-125'} className={s.air}/>}</>;
  }
  // v2: the stage caption is drawn inside the picture, under the drawing (demo-standard fit order: fold stage text into the picture).
  const vbWidth=model==='ruler-offset'?350:300;
  if(v2?.caption!==undefined) return <svg viewBox={`0 0 ${vbWidth} 266`} className={v2.className??s.scene} role="img" aria-label={v2.label}>{v2.override??art}{v2.extra}<text x={vbWidth/2} y="258" textAnchor="middle" className={s.captionV2}>{v2.caption}</text></svg>;
  return <svg viewBox={model==='ruler-offset'?"0 0 350 240":"0 0 300 240"} className={v2?.className??s.scene} role="img" aria-label={v2?.label??(locked?`${spec.title}: ${spec.choices[after?1:0]}; illustrative arrangement before prediction`:`${spec.title}: ${spec.choices[after?1:0]}; ${result.label} ${fmt(result.value)} ${result.unit}`)}>{v2?.override??art}{v2?.extra}</svg>;
}

const caption=(spec:HomeSpec)=>spec.slug==='door-swing-clearance'?'Model; keep exits clear':spec.slug==='rug-chair-pullback'?'Model; keep paths clear':spec.view==='cord'?'Plain cord; storage only':spec.view==='mechanics'?'Model; no safe load limit':'Illustrative model';

/**
 * Wave W2 pictures (r11 fix plan, laundry drying): each draws the arrangement the mode puts on the stage, with the
 * quantity the lesson asks about visible (touching faces, the overlapped patch, the two halves apart, the vapour in
 * the air, the breeze, the stack height, every shirt counted). `mode` null (neutral start) draws A's arrangement.
 */
function w2Picture(spec:HomeSpec,p:number,mode:Mode|null):ReactNode|null {
  const v=spec.values,b=mode==='b';
  const up=(x:number,y:number,len:number,key:string)=><path key={key} d={`M${x},${y}v-${len}l-4,6m4,-6l4,6`} className={s.air}/>;
  switch(spec.model) {
    case 'exposed': return b
      ? <><circle cx="90" cy="40" r="6" fill="var(--fg)"/><circle cx="210" cy="40" r="6" fill="var(--fg)"/>
          <rect x="84" y="32" width="132" height="8" rx="3" className={s.object}/><rect x="74" y="38" width="10" height="150" rx="3" className={s.object}/><rect x="216" y="38" width="10" height="150" rx="3" className={s.object}/>
          {[110,150,190].map((x,i)=>up(x,190,40,`a${i}`))}{[54,246].map((x,i)=>up(x,190,40,`o${i}`))}</>
      : <><circle cx="150" cy="40" r="6" fill="var(--fg)"/><path d="M140,46a10,10 0 0 1 20,0" className={s.line}/>
          <rect x="139" y="46" width="11" height="150" rx="3" className={s.object}/><rect x="150" y="46" width="11" height="150" rx="3" className={s.object}/>
          <rect x="145" y="50" width="10" height="144" className={s.overlap}/>{[124,176].map((x,i)=>up(x,190,40,`o${i}`))}</>;
    case 'overlap': {
      const k=1.3,w=v[0]*k,h=v[1]*k,y=70,x1=b?12:20,x2=b?158:20+w-p*k;
      return <><rect x={x1} y={y} width={w} height={h} rx="3" className={s.object}/><rect x={x2} y={y} width={w} height={h} rx="3" className={s.object}/>
        {!b&&<rect x={x2} y={y} width={p*k} height={h} className={s.overlap}/>}<line x1="5" x2="295" y1={y-12} y2={y-12} className={s.line}/></>;
    }
    case 'split-area': {
      const k=1.2,w=p*k,h=120*k;
      return b
        ? <><rect x={150-w-8} y={50+h/4} width={w} height={h/2} rx="3" className={s.object}/><rect x={158} y={50+h/4} width={w} height={h/2} rx="3" className={s.object}/></>
        : <rect x={150-w/2} y={50} width={w} height={h} rx="3" className={s.object}/>;
    }
    case 'humidity': {
      const rh=b?Math.max(0,p-v[1]):p,push=100-rh,dots=Math.round(rh/5);
      return <><rect x="115" y="70" width="70" height="140" rx="3" className={s.object}/>
        {Array.from({length:dots},(_,i)=>{ const col=i%4,left=Math.floor(i/4)%2===0,row=Math.floor(i/8); return <circle key={i} cx={left?20+col*22:216+col*22} cy={50+row*32+(col%2)*14} r="4" className={s.hidden}/>; })}
        {[130,150,170].map((x,i)=>up(x,64,Math.max(8,push*0.55),`p${i}`))}</>;
    }
    case 'flux': {
      const w=40+p*40;
      return <><rect x={150-w/2+20} y="70" width={w} height="130" rx="3" className={s.object}/>
        {b&&[95,135,175].map((y,i)=><path key={i} d={`M8,${y}q12,-8 24,0t24,0t24,0m-8,-5l8,5l-8,5`} className={s.air}/>)}
        {[150-w/4+20,170,150+w/4+20].map((x,i)=>up(x,64,b?44:22,`u${i}`))}</>;
    }
    case 'layers': {
      const n=Math.min(12,Math.max(1,Math.round(p))),t=(b?2*v[1]:v[1])*v[0]*8,w=b?100:200;
      return <><line x1="20" x2="280" y1="226" y2="226" className={s.line}/>{Array.from({length:n},(_,i)=><rect key={i} x={150-w/2} y={226-(i+1)*t} width={w} height={t} rx="1" className={s.object}/>)}</>;
    }
    case 'water-load': {
      const n=Math.min(16,Math.max(1,Math.round(p)));
      return <>{Array.from({length:n},(_,i)=>{ const x=40+(i%4)*62,y=30+Math.floor(i/4)*52,on=b||i===0;
        return <path key={i} d={`M${x},${y}l12,-6h16l12,6l-6,10h-6v26h-20v-26h-6z`} className={on?s.target:s.hidden}/>; })}</>;
    }
    default: return null;
  }
}

/** A small sock (about 20 × 32 units) at (x, y), turned by `turn` degrees; pattern 0 striped, 1 dotted, 2 plain. */
function sock(x:number,y:number,turn:number,pattern:number,cls:string,key:string|number) {
  return <g key={key} transform={`translate(${x},${y}) rotate(${turn})`}>
    <path d="M-8,-16h12v16l8,6q3,5 -2,10h-12q-6,0 -6,-6z" className={cls}/>
    {pattern===0&&<path d="M-8,-10h12M-8,-4h12" className={s.line} strokeWidth={1.5}/>}
    {pattern===1&&<><circle cx="-2" cy="-10" r="2" fill="var(--fg)"/><circle cx="-2" cy="-2" r="2" fill="var(--fg)"/></>}
  </g>;
}
/** The use order in jacket-last-first: the jacket first, the sweater next, the shoes last; extra items sit between. */
const useOrder=(n:number)=>['Jacket','Sweater',...['T-shirt','Towel','Book','Hat'].slice(0,Math.max(0,n-3)),'Shoes'].slice(0,Math.max(2,n));

/**
 * Wave W3 pictures (r11 fix plan, cords, socks and travel): each draws what the lesson asks about, to the model's
 * numbers: the hair tie on the cord, the mixed pile and the pattern bins, every pairing, the nested corners, the
 * two shoes touching without overlap, the tote hanging from its handle, and stacks with the item you need marked.
 * `mode` null (neutral start) draws A's arrangement.
 */
function w3Picture(spec:HomeSpec,p:number,mode:Mode|null):ReactNode|null {
  const v=spec.values,b=mode==='b';
  switch(spec.model) {
    case 'loop-release': {
      // The hair tie is a closed elastic loop twisted round the cord (one crossing); B slides it, unstretched, off the free end.
      const fig8='M161,140C141,108 119,112 119,140C119,168 141,172 161,140C181,108 203,112 203,140C203,168 181,172 161,140Z';
      return <>
        <rect x="6" y="118" width="16" height="44" rx="3" className={s.outline}/>
        <g style={{transform:`translateX(${b?92:0}px)`,transition:'transform .7s ease-out'}}>
          {b?<ellipse cx="180" cy="140" rx="12" ry="26" fill="none" stroke="var(--warn)" strokeWidth="4"/>:<path d={fig8} fill="none" stroke="var(--warn)" strokeWidth="4" strokeOpacity=".55"/>}
        </g>
        <path d="M22,140H232" stroke="var(--fg)" strokeWidth="6" strokeLinecap="round"/>
        {!b&&<><path d="M161,140C181,108 203,112 203,140M119,140C119,168 141,172 161,140" fill="none" stroke="var(--warn)" strokeWidth="4"/><circle cx="161" cy="140" r="6" className={s.target}/></>}
        {b&&<path d="M150,182H246m-8,-5l8,5l-8,5" className={s.air}/>}
        <text x={b?250:161} y="94" textAnchor="middle">hair tie</text>
        <text x="200" y="214" textAnchor="middle">free end</text>
      </>;
    }
    case 'pair-search': {
      const n=Math.max(3,Math.round(p));
      // A heap: socks on a golden-angle spiral, patterns interleaved, so no pattern sits in its own corner.
      if(!b) return <>{Array.from({length:n},(_,i)=>{ const t=i*2.39996,r=22*Math.sqrt(i+0.5); return sock(150+r*Math.cos(t)*1.2,122+r*Math.sin(t),(i*67)%360-180,i%3,i===0?s.target:s.object,i); })}</>;
      return <>{[0,1,2].map(k=><rect key={`bin${k}`} x={8+k*96} y="40" width="88" height="186" rx="6" className={k===0?s.outline:s.hidden}/>)}
        {Array.from({length:n},(_,i)=>{ const k=i%3,j=Math.floor(i/3),col=j%2,row=Math.floor(j/2);
          return sock(36+k*96+col*36,76+row*58,0,k,i===0?s.target:k===0?s.object:s.hidden,i); })}</>;
    }
    case 'combinations': {
      const n=2*Math.floor(p/2),cx=150,cy=122,r=88;
      const at=(i:number)=>({x:cx+r*Math.sin(2*Math.PI*i/n),y:cy-r*Math.cos(2*Math.PI*i/n)});
      const lines:ReactNode[]=[];
      if(!b) for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) { const P=at(i),Q=at(j); lines.push(<line key={`${i}-${j}`} x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} className={s.line} strokeWidth={1} strokeOpacity={.55}/>); }
      else for(let k=0;k<n/2;k++) { const P=at(2*k),Q=at(2*k+1); lines.push(<line key={k} x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} className={s.air} strokeWidth={4}/>); }
      return <>{lines}{Array.from({length:n},(_,i)=>{ const P=at(i),inner={x:cx+(r-34)*Math.sin(2*Math.PI*i/n),y:cy-(r-34)*Math.cos(2*Math.PI*i/n)};
        return <g key={`s${i}`}>{sock(P.x,P.y,0,2,s.object,i)}{b&&<text x={inner.x} y={inner.y+7} textAnchor="middle">{Math.floor(i/2)+1}</text>}</g>; })}</>;
    }
    case 'nest': {
      // 5.5 units per cm: an 8 cm corner is 44 units deep; nested, each extra corner adds 2 cm (11 units).
      const k=5.5,n=Math.round(p),depth=v[0]*k,layer=v[1]*k,floor=226,total=b?depth+(n-1)*layer:n*depth;
      const cup=(bottom:number,i:number)=><path key={i} d={`M100,${bottom-depth}L112,${bottom}H208L220,${bottom-depth}`} className={s.object}/>;
      return <>{Array.from({length:n},(_,i)=>cup(floor-i*(b?layer:depth),i))}
        <path d={`M246,${floor}V${floor-total}M240,${floor}h12M240,${floor-total}h12`} className={s.line}/>
        {mode&&<text x="246" y={floor-total-8} textAnchor="middle">{fmt(total/k)} cm</text>}</>;
    }
    case 'pairpack': {
      // 7 units per cm, top view, toes up: each shoe narrows evenly from a 12 cm toe to a 6 cm heel over 24 cm.
      const k=7,toe=v[0]*k,heel=v[1]*k,top=52,bottom=52+24*k,bag=p*k,L=150-bag/2,x0=L+2,width=b?toe+heel:2*toe;
      // Rounded toe and heel caps beyond y1 and y2; between them the reversed shoe's edge lies on the first one's, so they touch without overlap.
      const y1=top+12,y2=bottom-12,cap=(xa:number,xb:number,y:number,d:number)=>`Q${(xa+xb)/2},${y+d} ${xb},${y}`;
      const one=`M${x0},${y1}${cap(x0,x0+toe,y1,-24)}L${x0+heel},${y2}${cap(x0+heel,x0,y2,24)}Z`;
      const two=b?`M${x0+toe},${y1}${cap(x0+toe,x0+toe+heel,y1,-24)}V${y2}${cap(x0+toe+heel,x0+heel,y2,24)}Z`
        :`M${x0+toe},${y1}${cap(x0+toe,x0+2*toe,y1,-24)}V${y2}${cap(x0+2*toe,x0+2*toe-heel,y2,24)}Z`;
      return <><rect x={L} y="44" width={bag} height={bottom-36} rx="4" className={s.outline}/>
        <path d={one} className={s.object} strokeLinejoin="round"/><path d={two} className={s.target} strokeLinejoin="round"/>
        <path d={`M${x0},32H${x0+width}M${x0},25v14M${x0+width},25v14`} className={s.line}/>
        {mode&&<text x={x0+width/2} y="22" textAnchor="middle">{fmt(width/k)} cm</text>}</>;
    }
    case 'balance': {
      // 3 units per cm; the two loads sit 20 cm either side of the handle. The bag hangs from the handle top, so it
      // turns until the balance point is under it: a straight bag means a centred balance point.
      const k=2.5,[right=1,pos=20]=v,left=b?(p+right)/2:p,rightKg=b?(p+right)/2:right;
      const centre=(-pos*left+pos*rightKg)/(left+rightKg),hL=14*left,hR=14*rightKg;
      // E1 (FC54 note, W-1300): the lever arm is the dot's distance below the pivot (208 − 20 = 188), so the dot lands on the vertical.
      const turn=Math.atan2(centre*k,188)*180/Math.PI;
      return <><path d="M150,14V236" stroke="var(--line)" strokeDasharray="4 5"/>
        <g transform={`rotate(${turn},150,20)`}>
          <path d="M108,82Q108,20 150,20Q192,20 192,82" className={s.line}/>
          <path d="M58,82H242L232,200H68Z" className={s.outline}/>
          <rect x={150-pos*k-25} y={196-hL} width="50" height={hL} rx="3" className={s.object}/>
          <rect x={150+pos*k-25} y={196-hR} width="50" height={hR} rx="3" className={s.object}/>
          <text x={150-pos*k} y={190-hL} textAnchor="middle">{fmt(left)} kg</text>
          <text x={150+pos*k} y={190-hR} textAnchor="middle">{fmt(rightKg)} kg</text>
          <circle cx={150+centre*k} cy="208" r="6" className={s.target}/>
        </g>
        <circle cx="150" cy="20" r="5" fill="var(--fg)"/></>;
    }
    case 'reverse-order': {
      const n=Math.round(p),names=useOrder(n),stack=b?[...names].reverse():names,h=Math.min(40,190/n);
      // W-1299 (content patch r3): with no mode in effect, the bag is empty and the items lie beside it, unstacked, in use
      // order (reading order, two columns), with no arrows and no highlight. A stack in either order would show a mode.
      if(!mode) return <><path d="M206,60V226H292V60" className={s.line}/>
        {names.map((name,i)=>{ const x=8+(i%2)*94,y=40+Math.floor(i/2)*44;
          return <g key={name}><rect x={x} y={y} width="86" height="34" rx="3" className={s.object}/><text x={x+43} y={y+24} textAnchor="middle">{name}</text></g>; })}</>;
      return <><path d="M70,28V226H230V28" className={s.line}/>
        {stack.map((name,j)=>{ const y=224-(j+1)*h,jacket=name==='Jacket';
          return <g key={name}><rect x="76" y={y+1} width="148" height={h-3} rx="3" className={jacket?s.target:s.object}/>
            <text x="150" y={y+h/2+6} textAnchor="middle">{name}</text></g>; })}
        {stack.slice(stack.indexOf('Jacket')+1).map((_,i)=>{ const y=224-(stack.indexOf('Jacket')+2+i)*h+h/2;
          return <path key={i} d={`M250,${y+8}v-16m-5,5l5,-5l5,5`} className={s.air}/>; })}</>;
    }
    case 'access': {
      const n=Math.round(p),h=Math.min(30,180/n),jacketAt=b?n-1:0;
      return <><rect x="40" y="26" width="168" height="202" rx="10" className={s.line}/>
        {Array.from({length:n},(_,j)=>{ const y=222-(j+1)*h; return <rect key={j} x="48" y={y+1} width="152" height={h-3} rx="3" className={j===jacketAt?s.target:s.object}/>; })}
        <text x="212" y={222-(jacketAt+0.5)*h+7}>jacket</text>
        {Array.from({length:n-1-jacketAt},(_,i)=>{ const y=222-(jacketAt+1.5+i)*h; return <path key={i} d={`M26,${y+7}v-14m-5,5l5,-5l5,5`} className={s.air}/>; })}</>;
    }
    case 'hollow': {
      // Areas stand for volumes (6.5 square units per cm³): the hollow ellipse is the shoe's 600 cm³ of empty space.
      const [hollow=600]=v,inside=b?Math.min(p,hollow):0,outside=b?Math.max(0,p-hollow):p,side=(x:number)=>Math.sqrt(x*6.5);
      const rx=50,ry=25,f=Math.sqrt(inside/hollow);
      return <><path d="M20,120Q20,95 45,95H95Q120,95 135,120L185,150Q200,160 200,180V205H20Z" className={s.outline}/>
        <ellipse cx="80" cy="150" rx={rx} ry={ry} fill="none" stroke="var(--line)" strokeDasharray="5 4"/>
        {inside>0&&<ellipse cx="80" cy="150" rx={rx*f} ry={ry*f} className={s.target}/>}
        {outside>0&&<rect x={b?60:206} y={(b?95:205)-side(outside)} width={side(outside)} height={side(outside)} rx="4" className={s.target}/>}
        {mode&&<text x="80" y="60" textAnchor="middle">{fmt(hollow)} cm³ empty</text>}</>;
    }
    default: return null;
  }
}

/** v2 picture marks (spec section 3): a to-scale fit drawing with a dimension line, or a radius stripe per disc. */
function v2Marks(spec:HomeSpec,p:number,mode:Mode|null):SceneV2Props {
  const v=spec.values;
  const w2=w2Picture(spec,p,mode)??w3Picture(spec,p,mode);
  if(w2) return {override:w2};
  if(spec.pictureMark==='dimension'&&spec.model==='clearance') {
    // 4 px per cm, centred: opening, body and both handles share one scale, so the outermost points can be judged by eye.
    const k=4,body=v[0]*k,h=v[1]*k,open=p*k,L=150-open/2,R=150+open/2,env=body+2*h;
    const tested=mode==='b'?env:body,over=mode==='b'&&env>open;
    return {override:<>
      <path d={`M${L},35v155M${R},35v155M${L},35h${open}`} className={s.line}/>
      <rect x={150-body/2} y={85} width={body} height={85} rx={3} className={s.object}/>
      {[-1,1].map(side=><rect key={side} x={side<0?150-body/2-h:150+body/2} y={110} width={h} height={32} rx={2} className={s.object}/>)}
      {over&&[-1,1].map(side=><rect key={`o${side}`} x={side<0?150-env/2:R} y={104} width={(env-open)/2} height={44} className={s.overlap}/>)}
      {mode&&<><path d={`M${150-tested/2},70h${tested}M${150-tested/2},63v14M${150+tested/2},63v14`} className={s.line}/>
        <text x="150" y="60" textAnchor="middle">{fmt(tested/k)} cm</text></>}
      <line x1={L} x2={R} y1="205" y2="205" className={s.air}/><text x="150" y="228" textAnchor="middle">{fmt(p)} cm opening</text>
    </>};
  }
  if(spec.pictureMark==='radius-stripe'&&spec.model==='circle-fit') {
    const diameter=v[0],columns=Math.floor(p/diameter),scale=170/p,x=65,y=30,r=diameter*scale/2,turn=mode==='b'?-Math.PI/4:0;
    return {extra:<g aria-hidden="true">{Array.from({length:columns*columns},(_,i)=>{
      const cx=x+(i%columns+0.5)*diameter*scale,cy=y+(Math.floor(i/columns)+0.5)*diameter*scale;
      return <line key={i} x1={cx} y1={cy} x2={cx+r*Math.cos(turn)} y2={cy+r*Math.sin(turn)} className={s.line}/>;
    })}</g>};
  }
  return {};
}

/**
 * Engines v2 Home stage (W-608): neutral start, mode buttons A then B (R1, R2, R8), a Seen table that keeps both
 * columns and recomputes them live with the slider (R3, R4), and words on signed results (R5).
 */
function StageV2({spec,p,setP,mode,setMode,seen,setSeen,locked,interact}:{spec:HomeSpec;p:number;setP:(p:number)=>void;mode:Mode|null;setMode:(m:Mode)=>void;seen:Record<Mode,boolean>;setSeen:(f:(s:Record<Mode,boolean>)=>Record<Mode,boolean>)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,['tested-a','tested-b']);
  const [A,B]=homeModeLabels(spec);
  const press=(m:Mode)=>{setMode(m);setSeen(prev=>({...prev,[m]:true}));reach(m==='a'?'tested-a':'tested-b');};
  const cols={a:homeColumn(spec,p,'a'),b:homeColumn(spec,p,'b')};
  // TP-2(a) (W-1066): once the prediction is in, both columns show their numbers side by side, live with the slider;
  // "?" stays only while locked. The A and B presses still switch the picture and earn the reveal (tested-a, tested-b).
  void seen;
  const shown=(_m:Mode)=>!locked;
  const resultLabel=homeResultLabel(spec,p);
  const rows=[...(spec.amounts??[]).map((r,i)=>({label:r.label,cells:(['a','b'] as Mode[]).map(m=>shown(m)?cols[m].amounts[i]:'?')})),
    {label:resultLabel,cells:(['a','b'] as Mode[]).map(m=>shown(m)?cols[m].result:'?')}];
  const after=mode==='b',result=evaluateHome(spec,p,after);
  // A picture that already carries labels gets the caption inside it (it shrinks with the picture, never below the text floor);
  // a text-free picture keeps the HTML caption, so the card may still shrink that picture to its 40% floor.
  const textInPicture=spec.pictureMark==='dimension'||['route','mechanics','ruler','cord','diagonal','fit'].includes(spec.view);
  const label=locked||!mode?`${spec.title}: shared setup, drawn as ${A}; no result shown`:`${spec.title}: showing ${mode==='a'?A:B}; ${resultLabel} ${cols[mode].result}`;
  const status=locked||!mode?'':`${mode==='a'?A:B}: ${rows.map(r=>`${r.label} ${r.cells[mode==='a'?0:1]}`).join('; ')}`;
  return <div className={s.stage}>
    <Scene spec={spec} p={p} after={after} result={result} locked={locked} v2={{className:`${s.scene} ${s.sceneV2}`,label,caption:textInPicture?caption(spec):undefined,neutral:locked||!mode,...v2Marks(spec,p,locked?null:mode)}}/>
    <SeenTable label="Seen results" columns={[{head:'A',current:!locked&&mode==='a'},{head:'B',current:!locked&&mode==='b'}]} rows={rows}/>
    <div className={s.controls}>
      <ModeControl locked={locked} pressed={!locked&&mode==='a'} letter="A" label={A} onPress={()=>press('a')}/>
      <ModeControl locked={locked} pressed={!locked&&mode==='b'} letter="B" label={B} onPress={()=>press('b')}/>
    </div>
    {/* TP-2(c): a slider that changes no cell in either column is not drawn. */}
    {homeSliderMatters(spec)&&<Slider label={spec.inputLabel} value={p} min={spec.min} max={spec.max} step={spec.step} format={v=>`${fmt(v)} ${spec.unit}`.trim()} disabled={locked} onChange={setP}/>}
    <StageStatus locked={locked} text={status}/>
    {!textInPicture&&<p className={s.caption}>{caption(spec)}</p>}
  </div>;
}

function Stage({spec,p,setP,after,setAfter,locked,interact}:{spec:HomeSpec;p:number;setP:(p:number)=>void;after:boolean;setAfter:(a:boolean)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,['comparison']);
  const result=evaluateHome(spec,p,after);
  return <div className={s.stage}>
    <Scene spec={spec} p={p} after={after} result={result} locked={locked}/>
    <div className={s.controls}>
      <HomeMode locked={locked} pressed={!after} onPress={()=>{setAfter(false);}}>{spec.choices[0]}</HomeMode>
      <HomeMode locked={locked} pressed={after} onPress={()=>{setAfter(true);reach('comparison');}}>{spec.choices[1]}</HomeMode>
    </div>
    <Slider label={spec.inputLabel} value={p} min={spec.min} max={spec.max} step={spec.step} format={v=>`${fmt(v)}${spec.unit}`} disabled={locked} onChange={setP}/>
    <p className={s.inputs}>{result.inputs}</p>
    <div className={s.data}><span>{result.label}</span><strong>{locked?'?':`${fmt(result.value)}${result.unit}`}</strong></div>
    <StageStatus locked={locked} text={`${result.label} ${fmt(result.value)}${result.unit}`}/>
    <p className={s.caption}>{spec.slug==='door-swing-clearance'?'Model; keep exits clear':spec.slug==='rug-chair-pullback'?'Model; keep paths clear':spec.view==='cord'?'Plain cord; storage only':spec.view==='mechanics'?'Model; no safe load limit':'Illustrative model'}</p>
  </div>;
}

function WobbleStage({p,setP,locked,interact}:{p:number;setP:(p:number)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,['zero']);
  const gap=4*Math.cos(2*p*Math.PI/180);
  return <div className={s.stage}>
    <svg viewBox="0 0 300 230" className={s.scene} role="img" aria-label="Empty square table over continuous gentle ground">
      <path d="M30,150Q85,115 150,150T275,140" className={s.hidden}/>
      <g transform={`translate(150,92) rotate(${p})`}><rect x="-65" y="-65" width="130" height="130" className={s.outline}/>{[[-60,-60],[60,-60],[60,60],[-60,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={6} fill={Math.abs(gap)<0.01?'var(--good)':i===3?'var(--warn)':'var(--domain)'}/>)}</g>
      <path d="M35,200h230" className={s.line}/><path d={`M90,165v${35-gap*4}`} className={s.object}/><path d={`M190,165v${35+gap*4}`} className={s.target}/><path d="M70,164h140" className={s.line}/><circle cx="90" cy={200-gap*4} r="4" fill="var(--domain)"/><circle cx="190" cy={200+gap*4} r="4" fill="var(--good)"/>
      <text x="150" y="222" textAnchor="middle">Signed-contact schematic</text>
    </svg>
    <div className={s.controls}><HomeMode locked={locked} pressed={p===0} onPress={()=>setP(0)}>Start angle</HomeMode><HomeMode locked={locked} pressed={p===45} onPress={()=>{setP(45);reach('zero');}}>Find balance</HomeMode></div>
    <Slider label="Turn" value={p} min={0} max={90} disabled={locked} format={n=>`${n}°`} onChange={n=>{setP(n);if(n===45)reach('zero');}}/>
    <p className={s.inputs}>Equal legs · gentle continuous ground</p><div className={s.data}><span>Signed gap</span><strong>{locked?'?':`${fmt(gap)}mm`}</strong></div><StageStatus locked={locked} text={`Signed gap ${fmt(gap)}mm`}/>
    <p className={s.caption}>Not necessarily level. Clear hot drinks.</p>
  </div>;
}

/**
 * W2 / TP-2 (square-bow-stays-tied): both bows are drawn from the start, the twisted one (both knot stages the same
 * way round) and the flat one (the second stage reversed). Walking shrinks both loops; the twisted bow's loops run
 * out first. No loss rates or step counters on screen (TP-2d).
 */
const bowLoops=(steps:number,spec:HomeSpec)=>{ const [start=20,twist=0.8,flat=0.3]=spec.values; return {twisted:Math.max(0,start-steps*twist),flat:Math.max(0,start-steps*flat)}; };
const WALK=25;
function BowStage({spec,steps,setSteps,locked,interact}:{spec:HomeSpec;steps:number;setSteps:(n:number)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,['walk']);
  const {twisted,flat}=bowLoops(steps,spec);
  const loopText=(mm:number)=>locked?'?':mm<=0?'undone':`${fmt(mm)} mm`;
  const shoe=(x:number,balanced:boolean,remaining:number)=><g transform={`translate(${x},20)`}><path d="M-35,180V50Q-35,0 0,0T35,50v130z" className={s.outline}/>{remaining>0&&[-1,1].map(i=><g key={i} transform={`rotate(${balanced?0:90},0,105)`}><ellipse cx={i*(15+remaining/2)} cy="105" rx={Math.max(2,remaining)} ry="12" className={i<0?s.object:s.target}/></g>)}<path d="M-30,72L30,92" className={s.object}/><path d="M-30,92L30,72" className={s.target}/><path d="M-7,86l14,-7" stroke="var(--bg-2)" strokeWidth="5"/><path d="M-8,86l16,-7" className={s.target}/>{remaining>0&&<><path d={balanced?"M-22,115C-16,83 18,82 22,115L-15,103":"M22,115C16,83 -18,82 -22,115L15,103"} className={s.object}/><path d={balanced?"M-8,105l12,3":"M8,105l-12,3"} stroke="var(--bg-2)" strokeWidth="6"/><path d={balanced?"M-8,105l12,3":"M8,105l-12,3"} className={s.target}/></>}<text x="0" y="205" textAnchor="middle">{balanced?'Flat':'Twisted'}</text><text x="0" y="222" textAnchor="middle">{loopText(remaining)}</text></g>;
  const walkTo=(n:number)=>{setSteps(n);if(n>=WALK)reach('walk');};
  return <div className={s.stage}>
    <svg viewBox="0 0 300 265" className={s.scene} role="img" aria-label={`Two shoelace bows: twisted, loops ${loopText(twisted)}; flat, loops ${loopText(flat)}`}>{shoe(75,false,twisted)}{shoe(225,true,flat)}</svg>
    <div className={s.controls}><StageControl locked={locked} inactive={steps>=WALK} onClick={()=>walkTo(WALK)}>Walk {WALK} steps</StageControl></div>
    <Slider label="Steps walked" value={steps} min={spec.min} max={spec.max} step={spec.step} format={n=>`${n}`} disabled={locked} onChange={walkTo}/>
    <p className={s.caption}>Illustrative model</p>
    <StageStatus locked={locked} text={`Twisted ${loopText(twisted)}; flat ${loopText(flat)}`}/>
  </div>;
}

/**
 * W3 / TP-2(d) (long-cord-knots-itself): the experiment is named in plain words on the stage, and the 20 strings
 * per length are said to be a simulation of its rates. No seed, "p=" or "model draws" on screen.
 */
const CORD_RATES={short:0,long:0.55};
const cordCounts=()=>({short:sourceConditionedCordTrials(CORD_RATES.short).filter(Boolean).length,long:sourceConditionedCordTrials(CORD_RATES.long).filter(Boolean).length});
function CordStage({runs,setRuns,locked,interact}:{runs:number;setRuns:(n:number)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,['short','long']);
  // W-1241: "Tumble 3 m" draws both lengths (runs=2) and leaves "Tumble 0.3 m" pressed, so it reaches both milestones.
  // Reaching only 'long' left a learner who tapped 3 m first with no way to unlock the reveal.
  const short=sourceConditionedCordTrials(CORD_RATES.short),long=sourceConditionedCordTrials(CORD_RATES.long);
  return <div className={s.stage}>
    <svg viewBox="0 0 300 230" className={s.scene} role="img" aria-label="Twenty simulated strings at each length, knotted or not">
      <rect x="25" y="20" width="250" height="178" className={s.outline}/>
      <text x="38" y="40">0.3 m strings</text><text x="170" y="40">3 m strings</text>
      {[short,long].map((outcomes,group)=>outcomes.map((k,i)=>{
       const shown=runs>=(group===0?1:2),x=38+group*132+(i%4)*25,y=57+Math.floor(i/4)*25;
       return <g key={`${group}-${i}`}><path d={shown&&k?`M${x},${y+12}c-8,-18 26,-20 15,0c-10,18 -15,-10 5,-10`:`M${x},${y}q8,15 17,0`} className={shown?(k?s.target:s.air):s.hidden}/></g>;
      }))}
      <text x="76" y="218" textAnchor="middle">{runs>=1?`${short.filter(Boolean).length} of 20 knotted`:'?'}</text><text x="207" y="218" textAnchor="middle">{runs>=2?`${long.filter(Boolean).length} of 20 knotted`:'?'}</text>
    </svg>
    <div className={s.controls}><HomeMode locked={locked} pressed={runs>=1} onPress={()=>{setRuns(1);reach('short');}}>Tumble 0.3 m</HomeMode><HomeMode locked={locked} pressed={runs>=2} onPress={()=>{setRuns(2);reach('short');reach('long');}}>Tumble 3 m</HomeMode></div>
    <p className={s.inputs}>Raymer and Smith (2007) tumbled one string at a time in a 30 cm box, one turn a second, for 10 seconds.</p>
    <p className={s.caption}>Each drawing is a simulated string at the study&apos;s rate. Plain cord; storage only.</p>
    <StageStatus locked={locked} text={runs<1?'':`0.3 m: ${short.filter(Boolean).length} of 20 knotted${runs>=2?`; 3 m: ${long.filter(Boolean).length} of 20 knotted`:''}`}/>
  </div>;
}

type HomeStageState = { spec: HomeSpec; p: number; setP: (n:number)=>void; after: boolean; setAfter: (v:boolean)=>void; runs: number; setRuns: (n:number)=>void;
  mode: Mode|null; setMode: (m:Mode)=>void; seen: Record<Mode,boolean>; setSeen: (f:(s:Record<Mode,boolean>)=>Record<Mode,boolean>)=>void };
const isV2=(spec:HomeSpec)=>spec.engine===2&&!['wobble','bow','cord'].includes(spec.model);
export function Controls({spec,p,setP,after,setAfter,runs,setRuns,mode,setMode,seen,setSeen,locked,interact}:HomeStageState & StageContext) {
  if(isV2(spec)) return <StageV2 spec={spec} p={p} setP={setP} mode={mode} setMode={setMode} seen={seen} setSeen={setSeen} locked={locked} interact={interact}/>;
  return spec.model==='wobble'?<WobbleStage p={p} setP={setP} locked={locked} interact={interact}/>:spec.model==='bow'?<BowStage spec={spec} steps={p} setSteps={setP} locked={locked} interact={interact}/>:spec.model==='cord'?<CordStage runs={runs} setRuns={setRuns} locked={locked} interact={interact}/>:<Stage spec={spec} p={p} setP={setP} after={after} setAfter={setAfter} locked={locked} interact={interact}/>;
}
export function useHomeLesson(slug:string): {lessonProps:Omit<LessonProps,'children'>;stage:HomeStageState} {
  const spec=homeLessons.find(d=>d.slug===slug);
  const [p,setP]=useState(spec?.initial??0),[after,setAfter]=useState(false),[runs,setRuns]=useState(0);
  const [mode,setMode]=useState<Mode|null>(null),[seen,setSeen]=useState<Record<Mode,boolean>>({a:false,b:false});
  if(!spec)throw new Error(`Missing household lesson: ${slug}`);
  const stage={spec,p,setP,after,setAfter,runs,setRuns,mode,setMode,seen,setSeen};
  if(isV2(spec)) return {stage,lessonProps:{
    slug:spec.slug,predict:{question:spec.question,options:spec.options??[spec.choices[0],spec.choices[1],'Same outcome'],answer:spec.answer},
    exploreHint:homeSliderMatters(spec)?'Press A, then B. Then move the slider.':'Press A, then B.',minInteractions:2,
    // R6: the first sentence quotes both Seen columns; the kit already prints the verdict line, so it is not repeated.
    reveal:()=><div className={s.reveal}><p>{homeRevealLine(spec,p)}</p><p>{spec.idea}</p><p>{spec.limit}</p>{spec.warning&&<p>{spec.warning}</p>}</div>
  }};
  // r2 ruling (b): the cord stage has one reveal, for any engine. The v1 cord sentence ("At seed 17 …") is gone: no v1
  // lesson used model 'cord', so it was unreachable (tests/lifehacks/engines-v2.test.mjs pins which lessons are v1).
  if(spec.model==='cord') { const n=cordCounts();
    return {stage,lessonProps:{
      slug:spec.slug,predict:{question:spec.question,options:spec.options??[spec.choices[0],spec.choices[1],'Same outcome'],answer:spec.answer},
      exploreHint:'Tumble both lengths, then compare.',minInteractions:2,
      // TP-2(b, e): the reveal compares both simulated lengths with the study's rate; the kit prints the only verdict line.
      reveal:()=><div className={s.reveal}><p>{`This simulation knotted ${n.short} of 20 short strings and ${n.long} of 20 long ones; the study's 55% is about 11 in 20.`}</p><p>{spec.idea}</p><p>{spec.limit}</p></div>
    }}; }
  if(spec.model==='bow') { const {twisted,flat}=bowLoops(p,spec), mm=(x:number)=>x<=0?'undone (0 mm)':`${fmt(x)} mm`;
    return {stage,lessonProps:{
      slug:spec.slug,predict:{question:spec.question,options:spec.options??[spec.choices[0],spec.choices[1],'Same outcome'],answer:spec.answer},
      exploreHint:`Walk ${WALK} steps, then try other step counts.`,minInteractions:1,
      // TP-2(b, e): the reveal compares both bows at the learner's step count; the kit prints the only verdict line.
      reveal:()=><div className={s.reveal}><p>{`After ${p} steps: the twisted bow's loops are ${mm(twisted)}, the flat bow's ${mm(flat)}.`}</p><p>{spec.idea}</p><p>{spec.limit}</p></div>
    }}; }
  // Cord and bow return above for any engine, so neither reaches this v1 branch.
  const result=evaluateHome(spec,p,after);
  return {stage,lessonProps:{
    slug:spec.slug,predict:{question:spec.question,options:[spec.choices[0],spec.choices[1],'Same outcome'],answer:spec.answer},
    exploreHint:'Try the second layout; vary the shown input.',minInteractions:1,
    reveal:({correct})=><div className={s.reveal}>
      <p><strong>{correct?'Your prediction held.':'Not quite.'}</strong>{' '}{spec.model==='wobble'?`You visited the zero-gap position; the current illustrated gap is ${fmt(result.value)}mm.`:`The current ${spec.choices[after?1:0].toLowerCase()} setting gives ${fmt(result.value)}${result.unit}.`}</p>
      <p>{spec.idea}</p><p>{spec.limit}</p>{spec.warning&&<p>{spec.warning}</p>}
    </div>
  }};
}
