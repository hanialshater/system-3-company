"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-paper-envelope-quick",
  "baseId": "paper-envelope",
  "name": "Paper Envelope",
  "title": "Paper Envelope · Quick round",
  "family": "paper",
  "familyName": "Paper challenges",
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
  "materials": "Two sheets of paper; a timer",
  "setup": "Give the lead one sheet and a small folded note made from a second sheet.",
  "turn": "The lead folds the sheet into a pocket around the note without cutting or tape.",
  "success": "The note stays inside the pocket when held upright for five seconds.",
  "format": "Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Paper Envelope, what counts as a successful turn?",
  "choices": [
    "The group ends the round before anyone plays.",
    "The note stays inside the pocket when held upright for five seconds.",
    "The lead skips the turn without attempting it."
  ],
  "correct": 1,
  "explanation": "Setup: Give the lead one sheet and a small folded note made from a second sheet. Turn: The lead folds the sheet into a pocket around the note without cutting or tape. Success: The note stays inside the pocket when held upright for five seconds. Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
