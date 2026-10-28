"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-secret-position-relay",
  "baseId": "secret-position",
  "name": "Secret Position",
  "title": "Secret Position · Pair relay",
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
  "materials": "Three cups and one paper ball",
  "setup": "Place three cups in a row and secretly put a paper ball under one cup.",
  "turn": "The lead gives one truthful clue about the position, and a partner points to a cup.",
  "success": "The selected cup contains the paper ball.",
  "format": "Form pairs. On each pair’s turn, both people make separate attempts with fresh challenges, helping only their partner. The pair earns one point only if both succeed. Each pair has two turns. Highest score wins."
};
const prompt = {
  "question": "In Secret Position, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The selected cup contains the paper ball.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: Place three cups in a row and secretly put a paper ball under one cup. Turn: The lead gives one truthful clue about the position, and a partner points to a cup. Success: The selected cup contains the paper ball. Form pairs. On each pair’s turn, both people make separate attempts with fresh challenges, helping only their partner. The pair earns one point only if both succeed. Each pair has two turns. Highest score wins."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
