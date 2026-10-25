import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import collection from "../../../content/history-stories/collection.json";
import { visibleDemos } from "@/lib/catalog";
import { StorySymbol, storySymbol } from "@/components/history-story/StorySymbol";
import type { StoryMap } from "@/components/history-story/types";
import styles from "./history.module.css";

export const metadata = { title: "History in maps — System 3", description: "Explore history through interactive maps: campaigns, empires, voyages, migration, trade and more." };
const anchor = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

export default function HistoryStories() {
  const visible = new Set(visibleDemos().map(d => d.slug));
  const stories = collection.filter(s => visible.has(s.slug));
  const families = [...new Set(stories.map(s => s.family))];
  return <main className={styles.page}>
    <nav className={styles.top}><Link className="brand" href="/">S3</Link><Link href="/catalog">All subjects</Link><Link href="/">Feed →</Link></nav>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>THE INTERACTIVE HISTORY ATLAS</p>
      <h1>History moves.<br /><span>Follow it on a map.</span></h1>
      <p className={styles.intro}>Cross an ocean. Watch a network grow. Follow the moment a route changes. Make a prediction, then explore the evidence one checkpoint at a time.</p>
      <div className={styles.stats}><span><strong>{stories.length}</strong> map stories</span><span><strong>{families.length}</strong> ways into history</span><span><strong>4</strong> checkpoints each</span></div>
      <p className={styles.draft}>Draft collection</p>
    </header>
    <nav className={styles.index} aria-label="Story families">{families.map(f => <a key={f} href={`#${anchor(f)}`}>{f}</a>)}</nav>
    {families.map((family,i) => <section key={family} id={anchor(family)} className={styles.section}>
      <h2><span>{String(i+1).padStart(2,"0")}</span>{family}</h2>
      <div className={styles.grid}>{stories.filter(s => s.family===family).map(story => {
        const map:StoryMap=JSON.parse(fs.readFileSync(path.join(process.cwd(),"src/demos/history",story.slug,"map.json"),"utf8"));
        const symbol = storySymbol(story.slug);
        return <Link key={story.slug} href={`/d/${story.slug}`} className={styles.card}>
          <svg viewBox="0 0 360 190" aria-hidden="true"><rect width="360" height="190" fill="#142b36"/><path d={map.land} fill="#344c49" stroke="#7f9c8b" strokeWidth=".6"/>{map.river&&<path d={map.river} fill="none" stroke="#72aec5" strokeWidth="7"/>}{map.edges.map((e,j)=><path key={j} d={e.path} fill="none" stroke="#ffd18b" strokeWidth="2" strokeDasharray={e.kind==='objective'?'4 4':undefined}/>)}{map.nodes.map(n=><circle key={n.id} cx={n.x} cy={n.y} r="4" fill="#ffd18b" stroke="#142b36" strokeWidth="1.5"/>)}{symbol && <StorySymbol kind={symbol} x={306} y={12} size={42} />}</svg>
          <div className={styles.body}><p className={styles.period}>{story.period}</p><h3>{story.title}</h3><p>{story.hook}</p><span className={styles.open}>Explore story <span aria-hidden="true">↗</span></span></div>
        </Link>;
      })}</div>
    </section>)}
    <footer className={styles.footer}>Modern coastlines. Schematic connections. Each story explains the limits of its map.</footer>
  </main>;
}
