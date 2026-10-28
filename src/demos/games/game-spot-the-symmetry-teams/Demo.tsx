"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-spot-the-symmetry-teams",
  "baseId": "spot-the-symmetry",
  "name": "Spot the Symmetry",
  "title": "Spot the Symmetry · Teams",
  "family": "observation",
  "familyName": "Observation",
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
  "materials": "Paper and pencil",
  "setup": "A partner draws two simple shapes, one with a clear line of symmetry and one without.",
  "turn": "The lead points to the symmetric shape and indicates a line that divides it into matching halves.",
  "success": "The selected shape and line match the drawing.",
  "format": "Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
const prompt = {
  "question": "In Spot the Symmetry, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The selected shape and line match the drawing.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: A partner draws two simple shapes, one with a clear line of symmetry and one without. Turn: The lead points to the symmetric shape and indicates a line that divides it into matching halves. Success: The selected shape and line match the drawing. Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
