import Link from "next/link";
import { notFound } from "next/navigation";
import { visibleDemos } from "@/lib/catalog";
import catalog from "../../../tools/history-maps/catalog.json";
import s from "./history-maps.module.css";

export const metadata = { title: "History map lab — System 3" };
const regions: Record<string,string> = {
  mediterranean: "Around the Mediterranean", west_asia: "West Asia & the Red Sea",
  west_central_africa: "West & Central Africa", africa_indian_ocean: "Africa & the Indian Ocean",
  central_asia: "Central Asia & the Iranian plateau", south_asia: "South Asia",
  east_asia: "East Asia", southeast_asia: "Southeast Asia",
  northern_europe: "Northern & Central Europe", americas_oceania: "The Americas & Oceania",
};

export default function HistoryMapsPage() {
  const allowed = new Set(visibleDemos({ includeDrafts: true }).map((d) => d.slug));
  const cases = catalog.filter((c) => allowed.has(c.slug));
  if (!cases.length) notFound();
  return <main className={s.page}>
    <nav className={s.nav}><Link className="brand" href="/">S3</Link><Link href="/catalog">All subjects ↗</Link></nav>
    <header className={s.hero}>
      <p className={s.eyebrow}>THE HISTORY MAP LAB · DRAFT PRACTICE SET</p>
      <h1>Same place.<br /><em>Another map.</em></h1>
      <p className={s.intro}>Make a prediction. Switch between two snapshots. Discover what their labels show—and where the record stops.</p>
      <div className={s.stats}><span><b>{cases.length}</b> map cases</span><span><b>{new Set(cases.map((c) => c.region)).size}</b> regional groups</span><span>About a minute each</span></div>
      <p className={s.note}>These are approximate reconstructions. Place names orient nearby comparison points. The maps do not establish exact borders or present-day claims.</p>
    </header>
    <nav className={s.index} aria-label="Regional groups">{Object.entries(regions).filter(([id]) => cases.some((c) => c.region === id)).map(([id,name]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav>
    {Object.entries(regions).map(([id,name],group) => {
      const rows = cases.filter((c) => c.region === id);
      if (!rows.length) return null;
      return <section key={id} id={id} className={s.group}>
        <div className={s.heading}><span>{String(group+1).padStart(2,"0")}</span><h2>{name}</h2><small>{rows.length} cases</small></div>
        <div className={s.grid}>{rows.map((c) => <Link key={c.slug} href={`/d/${c.slug}`} className={s.card}>
          <span className={s.years}>{c.years[0]} <span>→</span> {c.years[1]}</span>
          <strong>{c.title}</strong><span className={s.open}>Compare the maps <b aria-hidden="true">↗</b></span>
        </Link>)}</div>
      </section>;
    })}
    <footer className={s.footer}>Map reconstruction: André Ourednik & contributors, Historical Basemaps. Source pins and limitations accompany each case. This practice set awaits independent content and cultural review.</footer>
  </main>;
}
