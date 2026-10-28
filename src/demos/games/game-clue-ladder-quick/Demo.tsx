"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-clue-ladder-quick",
  "baseId": "clue-ladder",
  "name": "Clue Ladder",
  "title": "Clue Ladder · Quick round",
  "family": "detective",
  "familyName": "Guessing & deduction",
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
  "setup": "The lead writes the name of a familiar object and prepares three truthful clues, from broad to specific.",
  "turn": "The lead reads the clues one at a time; the others may guess after each one.",
  "success": "A player guesses the written object by the third clue.",
  "format": "Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Clue Ladder, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "A player guesses the written object by the third clue.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: The lead writes the name of a familiar object and prepares three truthful clues, from broad to specific. Turn: The lead reads the clues one at a time; the others may guess after each one. Success: A player guesses the written object by the third clue. Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
