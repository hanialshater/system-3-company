"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-last-letter-chain-teams",
  "baseId": "last-letter-chain",
  "name": "Last-Letter Chain",
  "title": "Last-Letter Chain · Teams",
  "family": "words",
  "familyName": "Word games",
  "mode": "teams",
  "modeName": "Teams",
  "minPlayers": 4,
  "maxPlayers": 8,
  "allowedPlayers": [
    4,
    5,
    6,
    7,
    8
  ],
  "playersLabel": "4–8",
  "materials": "None",
  "setup": "Choose a starting word.",
  "turn": "The lead names two new words in sequence, each beginning with the last letter of the preceding word.",
  "success": "Both links follow the last-letter rule.",
  "format": "Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
const prompt = {
  "question": "In Last-Letter Chain, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "Both links follow the last-letter rule.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: Choose a starting word. Turn: The lead names two new words in sequence, each beginning with the last letter of the preceding word. Success: Both links follow the last-letter rule. Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
