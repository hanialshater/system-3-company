"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-paired-countdown-classic",
  "baseId": "paired-countdown",
  "name": "Paired Countdown",
  "title": "Paired Countdown · Classic",
  "family": "team",
  "familyName": "Cooperative play",
  "mode": "classic",
  "modeName": "Classic",
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
  "materials": "None",
  "setup": "Choose two players and agree on a starting number between five and ten.",
  "turn": "The pair takes turns saying the next number down, one number per person.",
  "success": "They reach zero in the correct order without skipping a number.",
  "format": "Each player takes two turns. Give the lead one point for each successful turn. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Paired Countdown, what counts as a successful turn?",
  "choices": [
    "They reach zero in the correct order without skipping a number.",
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays."
  ],
  "correct": 0,
  "explanation": "Setup: Choose two players and agree on a starting number between five and ten. Turn: The pair takes turns saying the next number down, one number per person. Success: They reach zero in the correct order without skipping a number. Each player takes two turns. Give the lead one point for each successful turn. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
