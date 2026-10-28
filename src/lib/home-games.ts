import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { HomeGame } from "@/components/games/GameVisual";
/** Server-side data loading avoids making TypeScript infer a giant union from 1,000 JSON entries. */
export const homeGames = JSON.parse(fs.readFileSync(path.join(process.cwd(),"content/home-games.json"),"utf8")) as {families:Record<string,string>;games:HomeGame[]};
