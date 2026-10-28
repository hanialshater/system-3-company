"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-machine-parts-classic",
  "baseId": "machine-parts",
  "name": "Human Machine",
  "title": "Human Machine · Classic",
  "family": "mime",
  "familyName": "Acting & movement",
  "mode": "classic",
  "modeName": "Classic",
  "minPlayers": 2,
  "maxPlayers": 8,
  "allowedPlayers": [
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "playersLabel": "2–8",
  "materials": "None",
  "setup": "Think of a familiar machine such as a fan or washing machine.",
  "turn": "The lead silently repeats one motion that suggests how the machine works.",
  "success": "The others identify the machine.",
  "format": "Each player takes two turns. Give the lead one point for each successful turn. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Human Machine, what counts as a successful turn?",
  "choices": [
    "The others identify the machine.",
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays."
  ],
  "correct": 0,
  "explanation": "Setup: Think of a familiar machine such as a fan or washing machine. Turn: The lead silently repeats one motion that suggests how the machine works. Success: The others identify the machine. Each player takes two turns. Give the lead one point for each successful turn. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
