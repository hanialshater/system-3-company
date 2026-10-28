"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-tap-triangle-quick",
  "baseId": "tap-triangle",
  "name": "Three-Sound Cycle",
  "title": "Three-Sound Cycle · Quick round",
  "family": "rhythm",
  "familyName": "Rhythm & sound",
  "mode": "quick",
  "modeName": "Quick round",
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
  "materials": "A timer",
  "setup": "Agree on a sequence of three gentle sounds: clap, tap and hum.",
  "turn": "The lead performs the sounds in that order twice.",
  "success": "Both cycles follow the agreed order.",
  "format": "Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Three-Sound Cycle, what counts as a successful turn?",
  "choices": [
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays.",
    "Both cycles follow the agreed order."
  ],
  "correct": 2,
  "explanation": "Setup: Agree on a sequence of three gentle sounds: clap, tap and hum. Turn: The lead performs the sounds in that order twice. Success: Both cycles follow the agreed order. Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
