"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { islandLessons, readWorldLocation, worldHref, worldPlayerHref, type WorldIsland, type WorldView } from "@/lib/lessons-world";
import { readCamera, type WorldCamera } from "@/lib/world-camera";
import type { WorldConnection } from "@/lib/world-connections";
import { LESSON_STATUS_LABEL } from "@/lib/lesson-status";
import { WorldMapViewport } from "./WorldMapViewport";
import { BranchIsland } from "./BranchIsland";
import { WorldIcon } from "./WorldIcon";
import styles from "./world.module.css";

const STORAGE_KEY = "s3:world-position:v2";
type Focus = "atlas" | "subject" | "island";
export function LessonsWorld({ islands, connections = [] }: { islands: WorldIsland[]; connections?: WorldConnection[] }) {
  const initial = islands[0] && islandLessons(islands[0])[0];
  const [selected, setSelected] = useState(initial?.slug ?? ""), [view,setView] = useState<WorldView>("map");
  const [focus,setFocus] = useState<Focus>("island"), [subject,setSubject] = useState(islands[0]?.domain ?? "math");
  const [camera,setCamera] = useState<WorldCamera>({zoom:1,pan:0}), [immersive,setImmersive] = useState(false), [expanded,setExpanded] = useState(false);
  const [ready,setReady] = useState(false);
  const restoreY = useRef<number|null>(null), focusSlug = useRef("");
  const island = islands.find(i=>islandLessons(i).some(l=>l.slug===selected)) ?? islands[0];
  const lesson = island && islandLessons(island).find(l=>l.slug===selected);
  const total = islands.reduce((n,i)=>n+islandLessons(i).length,0);
  const subjects = islands.filter((i,index)=>!islands.slice(0,index).some(other=>other.domain===i.domain));
  const subjectIslands = islands.filter(i=>i.domain===subject);

  useEffect(()=>{
    const read=()=>{
      const location=readWorldLocation(window.location.hash,islands);setSelected(location.slug);setView(location.view);setSubject(location.island?.domain??"math");
      try {
        const saved=JSON.parse(sessionStorage.getItem(STORAGE_KEY)??"null");
        if(saved&&saved.slug===location.slug&&saved.islandId===location.island?.id&&saved.view===location.view&&Number.isFinite(saved.y)) {
          setCamera(readCamera(saved.camera));setImmersive(saved.immersive===true);setFocus(["atlas","subject","island"].includes(saved.focus)?saved.focus:"island");
          setSubject(typeof saved.subject==="string"&&islands.some(i=>i.domain===saved.subject)?saved.subject:location.island?.domain??"math");restoreY.current=Math.max(0,saved.y);
        } else if(new URLSearchParams(window.location.hash.slice(1)).get("stop")===location.slug){setFocus("island");focusSlug.current=location.slug;}
      }catch{/* Optional navigation snapshot; the URL remains authoritative. */}
      setReady(true);
    };read();window.addEventListener("hashchange",read);return()=>window.removeEventListener("hashchange",read);
  },[islands]);
  useEffect(()=>{
    if(!ready)return;
    // The camera reserves measured layout before a delayed frame restores document scroll.
    let b=0; const a=requestAnimationFrame(()=>{b=requestAnimationFrame(()=>{
      if(restoreY.current!==null){window.scrollTo({top:restoreY.current,behavior:"instant"});restoreY.current=null;}
      else if(focusSlug.current){document.getElementById(`world-stop-${focusSlug.current}`)?.scrollIntoView({block:"center"});focusSlug.current="";}
    });});return()=>{cancelAnimationFrame(a);cancelAnimationFrame(b);};
  },[ready,view,focus,island?.id,immersive]);
  useEffect(()=>{const exit=(e:KeyboardEvent)=>{if(e.key==="Escape")setImmersive(false);};window.addEventListener("keydown",exit);return()=>window.removeEventListener("keydown",exit);},[]);
  function select(slug:string,nextView=view){setSelected(slug);setView(nextView);history.replaceState(null,"",worldHref(slug,nextView));}
  function snapshot(slug=selected){try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify({slug,islandId:islands.find(i=>islandLessons(i).some(l=>l.slug===slug))?.id,view,y:window.scrollY,camera,immersive,focus,subject}));}catch{/* Optional navigation state. */}}
  function changeView(next:WorldView){select(selected,next);if(next==="map"){setFocus("island");setSubject(island.domain);focusSlug.current=selected;}window.scrollTo({top:0,behavior:"instant"});}
  function openIsland(next:WorldIsland){select(islandLessons(next)[0].slug,"map");setSubject(next.domain);setFocus("island");setCamera({zoom:1,pan:0});window.scrollTo({top:0,behavior:"instant"});}
  function overview(next:Focus){setFocus(next);setExpanded(false);window.scrollTo({top:0,behavior:"instant"});}
  function toggleImmersive(){const rect=document.getElementById(`world-stop-${selected}`)?.getBoundingClientRect();setImmersive(v=>!v);if(rect)requestAnimationFrame(()=>document.getElementById(`world-stop-${selected}`)?.scrollIntoView({block:"center"}));}
  if(!island||!lesson)return <main className={styles.world}><h1>Your world of ideas</h1><Link href="/">Back to feed</Link></main>;
  const navigationDomain = view === "map" && focus === "subject" ? subject : island.domain;
  const navigationSubject = subjects.find(s => s.domain === navigationDomain) ?? island;
  const related = connections.filter(c=>c.fromIsland===island.id||c.toIsland===island.id).slice(0,8);
  return <main className={`${styles.world} ${immersive?styles.immersive:""}`} data-testid="lessons-world" data-focus={focus}>
    <header className={styles.chrome}>
      <button type="button" className={styles.wordmark} aria-label="World atlas" onClick={()=>{setView("map");overview("atlas");}}>s3<span> / world</span></button>
      <div className={styles.switch} aria-label="World view"><button type="button" aria-pressed={view==="map"} onClick={()=>changeView("map")}>Map</button><button type="button" aria-pressed={view==="list"} onClick={()=>changeView("list")}>List</button></div>
      <div className={styles.chromeActions}><button type="button" className={styles.expandButton} aria-label={immersive?"Exit immersive view":"Expand world"} aria-pressed={immersive} onClick={toggleImmersive}><WorldIcon name={immersive?"close":"expand"}/><span>{immersive?"Exit":"Expand"}</span></button><Link href="/" className={styles.feedLink}>Feed <WorldIcon name="feed"/></Link></div>
    </header>
    <div className={styles.layout}><div className={styles.landscape}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Follow your curiosity</p><h1>A world of<br/><em>possibilities.</em></h1>
        <p>{total.toLocaleString()} questions. {islands.length} islands.<br/>Choose a branch. Find a new perspective.</p>
        <div className={styles.inspection}>Unchecked lessons are open to explore while independent reviews continue.</div>
      </section>
      <nav className={styles.breadcrumbs} aria-label="World location"><button type="button" onClick={()=>{setView("map");overview("atlas");}}>Atlas</button>{(focus!=="atlas"||view==="list")&&<><span aria-hidden="true">/</span><button type="button" onClick={()=>{setView("map");setSubject(navigationDomain);overview("subject");}}>{navigationSubject.domainName}</button></>}{focus==="island"&&view==="map"&&<><span aria-hidden="true">/</span><span aria-current="page">{island.name}</span></>}<button type="button" className={styles.overviewButton} onClick={()=>{setView("map");overview("atlas");}}>Overview</button></nav>
      {view==="map"&&focus==="atlas"?<section className={styles.atlas} aria-label="Subject atlas"><div className={styles.sectionIntro}><p className={styles.eyebrow}>An atlas, not a checklist</p><h2>Where will you wander?</h2><p>Every subject is an open direction.</p></div><div className={styles.subjectGrid}>{subjects.map((s,i)=><button key={s.domain} type="button" className={styles.subjectCard} onClick={()=>{setSubject(s.domain);overview("subject");}}><AtlasMotif variant={i}/><strong>{s.domainName}</strong><span>{islands.filter(a=>a.domain===s.domain).length} islands · {islands.filter(a=>a.domain===s.domain).reduce((n,a)=>n+islandLessons(a).length,0)} questions</span><WorldIcon name="arrow"/></button>)}</div></section>
      :view==="map"&&focus==="subject"?<section className={styles.atlas} aria-label={`${subjectIslands[0]?.domainName} islands`}><div className={styles.sectionIntro}><p className={styles.eyebrow}>Choose an island</p><h2>{subjectIslands[0]?.domainName}</h2><p>Different questions. More than one way through.</p></div><div className={styles.subjectGrid}>{subjectIslands.map((item,i)=><button key={item.id} type="button" className={`${styles.subjectCard} ${item.id===island.id?styles.activeCard:""}`} onClick={()=>openIsland(item)}><AtlasMotif variant={i}/><strong>{item.name}</strong><span>{item.regions.length} topic branches · {islandLessons(item).length} questions</span><WorldIcon name="arrow"/></button>)}</div></section>
      :view==="map"?<>
        <IslandHeading island={island}/>
        <WorldMapViewport focusSlug={focusSlug.current} camera={camera} onCameraChange={setCamera}><BranchIsland island={island} selected={selected} onSelect={slug=>select(slug)}/></WorldMapViewport>
        {related.length>0&&<section className={styles.connections} aria-label="Topic connections"><p className={styles.eyebrow}>Topic connections</p><h2>Ideas meet across islands.</h2><p>Connections from the curriculum. Each island remains open.</p>{related.map(connection=>{const other=islands.find(i=>i.id===(connection.fromIsland===island.id?connection.toIsland:connection.fromIsland));return other&&<button type="button" key={`${connection.fromIsland}:${connection.toIsland}`} onClick={()=>openIsland(other)}><span><strong>{other.name}</strong><small>{connection.topics.map(t=>`${t.fromLabel} → ${t.toLabel}`).join(" · ")}</small></span><WorldIcon name="arrow"/></button>;})}</section>}
      </>:<div className={styles.list} aria-label="All world questions">{islands.map((item,index)=><section id={`island-${item.id}`} key={item.id} className={styles.listIsland}><IslandHeading island={item} motif={index}/>{item.regions.map(region=><section className={styles.journalRegion} key={region.id}><header><span aria-hidden="true"/><div><h3>{region.name}</h3><p>{region.hint}</p></div></header><ol>{region.lessons.map(l=><li key={l.slug} className={l.slug===selected?styles.selectedRow:""}><button id={`world-stop-${l.slug}`} type="button" aria-current={l.slug===selected?"true":undefined} onClick={()=>select(l.slug)}><span className={styles.journalMark} aria-hidden="true">✦</span><span><strong>{l.title}</strong><small>{l.durationSec}s · Unchecked{l.status!=="published"?` · ${LESSON_STATUS_LABEL[l.status]}`:""}</small></span></button><Link href={worldPlayerHref(item.id,l.slug,view)} onClick={()=>{select(l.slug);snapshot(l.slug);}} aria-label={`Open ${l.title}`}><WorldIcon name="arrow"/></Link></li>)}</ol></section>)}</section>)}</div>}
      {view==="list"&&<section className={styles.end}><span aria-hidden="true">✦</span><h2>There’s more than one way through.</h2><p>All {total.toLocaleString()} available questions are here.</p><button type="button" onClick={()=>{setView("map");overview("atlas");}}>Back to the atlas</button></section>}
    </div>
      {(view==="list"||focus==="island")&&<aside className={`${styles.detail} ${expanded?styles.expanded:""}`} aria-label="Selected lesson"><button type="button" className={styles.sheetToggle} aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?"Less detail":"Lesson detail"}</button><div className={styles.detailBody}><div className={styles.detailMeta}><span>{island.name}</span><span>{lesson.durationSec}s · Unchecked</span></div><h2 aria-live="polite">{lesson.title}</h2><p className={styles.hook}>{lesson.hook}</p>{lesson.status!=="published"&&<div className={styles.badges}><span>{LESSON_STATUS_LABEL[lesson.status]}</span></div>}<p className={styles.detailNote}>Choose any question. The lesson opens in your vertical player.</p></div><Link href={worldPlayerHref(island.id,selected,view)} onClick={()=>snapshot()} className={styles.openLesson}>Open lesson <WorldIcon name="arrow"/></Link><p className={styles.playerHint}>Predict. Explore. Follow your curiosity.</p></aside>}
    </div>
  </main>;
}
function IslandHeading({island,motif}:{island:WorldIsland;motif?:number}){return <header className={styles.islandHeading}><span className={styles.islandNumber} aria-hidden="true"><WorldIcon name="expand"/></span><div><p>{island.domainName}</p><h2>{island.name}</h2><span>{island.regions.length} topic branches · {islandLessons(island).length} open questions</span></div>{motif!==undefined&&<AtlasMotif variant={motif}/>}</header>;}
function AtlasMotif({variant}:{variant:number}){const colors=["#BCE58B","#9ED7B8","#CDD6A1","#C6C0DF"];return <svg viewBox="0 0 130 100" aria-hidden="true" focusable="false"><path d="M26 20Q59 0 98 18T117 67Q101 94 64 91T12 62Q1 37 26 20Z" fill={colors[variant%4]} stroke="#F4D79F" strokeWidth="7"/><path d="M62 73V42M62 51 35 30M62 51 90 31" stroke="#FFF7DA" strokeWidth="6" strokeLinecap="round"/><circle cx="35" cy="30" r="7" fill="#FDF8E8"/><circle cx="90" cy="31" r="7" fill="#FDF8E8"/><path d="m47 52 16-21 17 21v22H47Z" fill="#FFF5D7"/><path d="m42 51 21-26 22 26-22 8Z" fill="#E88869"/></svg>;}
