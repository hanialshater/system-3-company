"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-whisper-volume-together",
  "baseId": "whisper-volume",
  "name": "Soft and Normal",
  "title": "Soft and Normal · Together",
  "family": "rhythm",
  "familyName": "Rhythm & sound",
  "mode": "together",
  "modeName": "Together",
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
  "setup": "Agree on a three-beat pattern of soft and normal claps.",
  "turn": "The lead performs the pattern and a partner copies it.",
  "success": "The partner repeats the soft and normal claps in order.",
  "format": "Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
const prompt = {
  "question": "In Soft and Normal, what counts as a successful turn?",
  "choices": [
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays.",
    "The partner repeats the soft and normal claps in order."
  ],
  "correct": 2,
  "explanation": "Setup: Agree on a three-beat pattern of soft and normal claps. Turn: The lead performs the pattern and a partner copies it. Success: The partner repeats the soft and normal claps in order. Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
