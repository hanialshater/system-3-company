import type { WorldIsland } from "@/lib/lessons-world";
import { hasIslandArtwork, IslandArtwork } from "./IslandArtwork";
import styles from "./world.module.css";

/** Spokes express topic membership and choice; they are not prerequisite or completion gates. */
export function BranchIsland({ island, selected, onSelect, motionEnabled = false }: { island: WorldIsland; selected: string; onSelect: (slug: string) => void; motionEnabled?: boolean }) {
  const artworkId = hasIslandArtwork(island.id) ? island.id : undefined;
  const bespoke = artworkId !== undefined;
  const positions = island.regions.length === 3 ? [[230,240],[770,240],[500,1050]] : [[230,240],[770,240],[230,1050],[770,1050],[500,1580]];
  const height = island.regions.length > 4 ? 1920 : 1400;
  const leaves = [[70,35],[330,35],[40,255],[360,255],[200,345]];
  return <div className={styles.branchIsland} style={{ height }} aria-label={`${island.name}: choose any topic branch`} data-scene={bespoke ? "bespoke" : "generic"}>
    {artworkId && <IslandArtwork islandId={artworkId} motionEnabled={motionEnabled}/>}
    <svg className={styles.branchTerrain} viewBox={`0 0 1000 ${height}`} aria-hidden="true" focusable="false">
      {!bespoke && <><defs><linearGradient id="branch-land" x2="0" y2="1"><stop stopColor="#DDF0A8"/><stop offset="1" stopColor="#A9D69C"/></linearGradient></defs>
      <path d={`M195 25Q30 55 22 230L34 ${height-250}Q5 ${height-30} 230 ${height-25}L770 ${height-25}Q990 ${height-15} 975 ${height-240}L975 230Q1000 20 805 30Q500 5 195 25Z`} fill="#063D5525" transform="translate(0 15)"/>
      <path d={`M195 25Q30 55 22 230L34 ${height-250}Q5 ${height-30} 230 ${height-25}L770 ${height-25}Q990 ${height-15} 975 ${height-240}L975 230Q1000 20 805 30Q500 5 195 25Z`} fill="url(#branch-land)" stroke="#F5DBA5" strokeWidth="24"/>
      <path d={`M60 475q90-70 140 20t140 0M730 ${height-100}q80-70 160-20M760 580q100-50 170 20`} fill="none" stroke="#E4F0BD" strokeWidth="55" strokeLinecap="round"/>
      </>}
      {positions.slice(0,island.regions.length).map(([x,y],i)=><g key={i}><path d={`M500 650Q${500+(x-500)*.4} ${y} ${x} ${y}`} fill="none" stroke="#A38663" strokeWidth="15" opacity=".35"/><path d={`M500 650Q${500+(x-500)*.4} ${y} ${x} ${y}`} fill="none" stroke="#FFF4D5" strokeWidth="10"/></g>)}
      {!bespoke && <>
      {[[65,555],[900,715],[85,height-130],[855,85]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><ellipse cy="16" rx="30" ry="12" fill="#35665330"/><path d="M0 20V-45" stroke="#806849" strokeWidth="8"/><ellipse cy="-33" rx="29" ry="40" fill={i%2?"#1A7E69":"#339C70"}/><ellipse cx="-10" cy="-45" rx="18" ry="26" fill="#61B17A"/></g>)}
      <g transform="translate(500 610)"><ellipse cy="65" rx="85" ry="24" fill="#2B685C30"/><path d="M-55-5 0-35 55-5V55L0 82-55 55Z" fill="#FFF5D9"/><path d="M0-35 55-5V55L0 82Z" fill="#E5C694"/><path d="M-72-7 0-79 72-7 0 24Z" fill="#ED8B69"/><path d="M0-79 72-7 0 24Z" fill="#D36E59"/><path d="M-25 20v28l14 8V28M15 29v27l17-9V21" fill="#447E7C"/></g>
      <g fill="none" stroke="#FFF4CC" opacity=".6" strokeWidth="3"><path d="M0 560H17M0 570H10M985 900h15M978 910h22M0 1250h14"/></g>
      </>}
    </svg>
    <div className={styles.islandHub}><span>{island.domainName}</span><strong>{island.name}</strong><small>Choose a branch. Every question is open.</small></div>
    {island.regions.map((region,i)=>{
      const [x,y]=positions[i];
      return <section key={region.id} className={styles.branchRegion} style={{left:x-200,top:y-155}} aria-label={region.name}>
        <svg viewBox="0 0 400 390" aria-hidden="true" focusable="false">{leaves.slice(0,region.lessons.length).map(([lx,ly],j)=><g key={j}><path d={`M200 155Q${lx} 155 ${lx} ${ly}`} fill="none" stroke="#8BA078" strokeWidth="9"/><path d={`M200 155Q${lx} 155 ${lx} ${ly}`} fill="none" stroke="#FFF5D9" strokeWidth="5"/></g>)}</svg>
        <div className={styles.topicHub}><span>Topic branch</span><h3>{region.name}</h3><p>{region.hint}</p></div>
        {region.lessons.map((lesson,j)=><button id={`world-stop-${lesson.slug}`} key={lesson.slug} type="button" className={`${styles.lessonLeaf} ${selected===lesson.slug?styles.selectedLeaf:""}`} style={{left:leaves[j][0],top:leaves[j][1]}} aria-pressed={selected===lesson.slug} aria-label={`${lesson.title}. Unchecked.`} title={lesson.hook} onClick={()=>onSelect(lesson.slug)}><span aria-hidden="true" className={styles.leafMark}>✦</span><strong>{lesson.title}</strong><small>{lesson.durationSec}s · Unchecked</small></button>)}
      </section>;
    })}
  </div>;
}
