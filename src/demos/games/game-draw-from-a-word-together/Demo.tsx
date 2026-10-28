"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-draw-from-a-word-together",
  "baseId": "draw-from-a-word",
  "name": "One-Word Sketch",
  "title": "One-Word Sketch · Together",
  "family": "drawing",
  "familyName": "Drawing",
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
  "materials": "Paper and pencil",
  "setup": "A partner writes one familiar object on a hidden slip and gives it to the lead.",
  "turn": "The lead draws the object without letters, numbers or speech.",
  "success": "The other players identify the object.",
  "format": "Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
const prompt = {
  "question": "In One-Word Sketch, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The other players identify the object.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: A partner writes one familiar object on a hidden slip and gives it to the lead. Turn: The lead draws the object without letters, numbers or speech. Success: The other players identify the object. Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
