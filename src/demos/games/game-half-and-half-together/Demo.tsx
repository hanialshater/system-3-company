"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { GameVisual, type HomeGame } from "@/components/games/GameVisual";
const game: HomeGame = {
  "slug": "game-half-and-half-together",
  "baseId": "half-and-half",
  "name": "Half and Half",
  "title": "Half and Half · Together",
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
  "setup": "Choose a familiar object and a partner.",
  "turn": "The lead draws one half and the partner completes the other half without discussing the object.",
  "success": "The other players can recognize the completed object.",
  "format": "Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
const prompt = {
  "question": "In Half and Half, what counts as a successful turn?",
  "choices": [
    "The lead skips the turn without attempting it.",
    "The group ends the round before anyone plays.",
    "The other players can recognize the completed object."
  ],
  "correct": 2,
  "explanation": "Setup: Choose a familiar object and a partner. Turn: The lead draws one half and the partner completes the other half without discussing the object. Success: The other players can recognize the completed object. Play eight turns in total, rotating the lead. The group wins together if at least five turns succeed."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:prompt.question,options:prompt.choices,answer:prompt.correct}} exploreHint="See the turn, then open the full rules." reveal={()=><p>{prompt.explanation}</p>}>
 {({locked,interact})=><div><GameVisual family={game.family} baseId={game.baseId} step={shown?1:0}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>See the turn</Control></Row><p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--muted)',margin:'4px 0'}}>{game.playersLabel} players · {game.materials}</p><p style={{textAlign:'center',fontSize:'0.8rem',margin:'4px 0'}}><a href={`/games/${game.slug}`}>Open complete game instructions</a></p></div>}
 </Lesson>;
}
