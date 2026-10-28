"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-place-problem-solution-together",
  "baseId": "place-problem-solution",
  "name": "Place, Problem, Solution",
  "title": "Place, Problem, Solution · Together",
  "family": "story",
  "familyName": "Storytelling",
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
  "setup": "Choose a place and a lighthearted problem.",
  "turn": "The lead tells a short story set in the place and gives the problem a solution.",
  "success": "The story contains the place, the problem and its solution.",
  "format": "Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
const prompt = {
  "question": "In Place, Problem, Solution, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The story contains the place, the problem and its solution.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: Choose a place and a lighthearted problem. Turn: The lead tells a short story set in the place and gives the problem a solution. Success: The story contains the place, the problem and its solution. Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
