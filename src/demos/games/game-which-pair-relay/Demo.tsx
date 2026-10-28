"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-which-pair-relay",
  "baseId": "which-pair",
  "name": "Which Pair?",
  "title": "Which Pair? · Pair relay",
  "family": "detective",
  "familyName": "Guessing & deduction",
  "mode": "relay",
  "modeName": "Pair relay",
  "minPlayers": 4,
  "maxPlayers": 8,
  "allowedPlayers": [
    4,
    6,
    8
  ],
  "playersLabel": "4, 6 or 8",
  "materials": "Paper and pencil",
  "setup": "The lead writes four familiar objects, with exactly two that share an agreed visible property.",
  "turn": "The lead reads the list and names the property without identifying the pair.",
  "success": "The others identify the two objects that share the property.",
  "format": "Form pairs. On each pair’s turn, both people make separate attempts with fresh challenges, helping only their partner. The pair earns one point only if both succeed. Each pair has two turns. Highest score wins."
};
const prompt = {
  "question": "In Which Pair?, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The others identify the two objects that share the property.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: The lead writes four familiar objects, with exactly two that share an agreed visible property. Turn: The lead reads the list and names the property without identifying the pair. Success: The others identify the two objects that share the property. Form pairs. On each pair’s turn, both people make separate attempts with fresh challenges, helping only their partner. The pair earns one point only if both succeed. Each pair has two turns. Highest score wins."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
