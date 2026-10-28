"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-draw-an-opposite-quick",
  "baseId": "draw-an-opposite",
  "name": "Draw an Opposite",
  "title": "Draw an Opposite · Quick round",
  "family": "drawing",
  "familyName": "Drawing",
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
  "setup": "A partner writes a pair of opposites such as big and small.",
  "turn": "The lead draws two pictures showing the contrast without words.",
  "success": "The group identifies both intended opposites.",
  "format": "Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
const prompt = {
  "question": "In Draw an Opposite, what counts as a successful turn?",
  "choices": [
    "The group identifies both intended opposites.",
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays."
  ],
  "correct": 0,
  "explanation": "Setup: A partner writes a pair of opposites such as big and small. Turn: The lead draws two pictures showing the contrast without words. Success: The group identifies both intended opposites. Give each attempt 30 seconds. Each player leads two turns and earns one point per success. Highest score wins; ties are shared."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
