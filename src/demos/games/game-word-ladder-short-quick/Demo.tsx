"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-word-ladder-short-quick",
  "baseId": "word-ladder-short",
  "name": "Word Ladder",
  "title": "Word Ladder · Quick round",
  "family": "words",
  "familyName": "Word games",
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
  "materials": "Paper and pencil; a timer",
  "setup": "Write two three-letter words that can be linked by changing one letter at a time, such as cat and dog.",
  "turn": "The lead writes a chain of real three-letter words, changing one letter at each step.",
  "success": "The chain reaches the target and every step changes exactly one letter.",
  "format": "Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Word Ladder, what counts as a successful turn?",
  "choices": [
    "The chain reaches the target and every step changes exactly one letter.",
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays."
  ],
  "correct": 0,
  "explanation": "Setup: Write two three-letter words that can be linked by changing one letter at a time, such as cat and dog. Turn: The lead writes a chain of real three-letter words, changing one letter at each step. Success: The chain reaches the target and every step changes exactly one letter. Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
