"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-secret-rule-teams",
  "baseId": "secret-rule",
  "name": "Secret Rule",
  "title": "Secret Rule · Teams",
  "family": "detective",
  "familyName": "Guessing & deduction",
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
  "setup": "The lead secretly chooses a simple rule, such as words starting with B, and writes it down.",
  "turn": "The others suggest words; the lead says whether each follows the rule.",
  "success": "Someone states the hidden rule correctly within six suggestions.",
  "format": "Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
const prompt = {
  "question": "In Secret Rule, what counts as a successful turn?",
  "choices": [
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays.",
    "Someone states the hidden rule correctly within six suggestions."
  ],
  "correct": 2,
  "explanation": "Setup: The lead secretly chooses a simple rule, such as words starting with B, and writes it down. Turn: The others suggest words; the lead says whether each follows the rule. Success: Someone states the hidden rule correctly within six suggestions. Form two teams. Each team has four turns; only the lead’s teammates respond or assist. Each success earns the team one point. The higher team score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
