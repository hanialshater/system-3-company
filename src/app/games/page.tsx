import Link from "next/link";
import { homeGames } from "@/lib/home-games";
import { GameBrowser } from "@/components/games/GameBrowser";
export const metadata={title:'Games to Play Together — System 3'};
export default function GamesPage(){return <main className="games-page"><nav className="games-nav"><Link href="/">S3</Link><Link href="/catalog">All categories</Link></nav><header className="games-hero"><p className="games-eyebrow">A little more play</p><h1>Games to play together</h1><p>Find something fun for the people in the room. Choose a game, then pick the format that fits your group.</p><p className="games-meta">200 base games · 5 house-rule formats each · Draft collection</p></header><GameBrowser games={homeGames.games} families={homeGames.families}/></main>}
