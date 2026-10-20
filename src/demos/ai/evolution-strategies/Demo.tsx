"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {probe} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [center,setCenter]=useState(0); const [round,setRound]=useState(0); const [seen,setSeen]=useState(false); const [proof,setProof]=useState<string[]>([]); const result=probe(center);
 return <Lesson slug={slug} predict={{"question": "From center 0, which candidate does the higher-score rule select?", "options": ["\u22121 with score \u221216", "+1 with score \u22124", "0 with score \u22129"], "answer": 1}} exploreHint="Run both probe rounds; Reset and Step to inspect the scored choices again." reveal={()=> <p>The retained first probes scored −16 and −4, so the winner rule moved the center from 0 to 1. Another probe selects 2 with score −1. The hidden evaluator is −(x−3)²; the update receives positions and scores, no derivatives. This fixed-offset ES-style toy is not CMA-ES or an optimality guarantee.</p>}>
 {({locked,interact})=><div className={s.root}><div className={s.equation}>Center {center} / score {locked?"?":result.centerScore}</div>
 <div className={s.candidates}>{result.candidates.map(c=><div className={s.off} key={c.x}>x={c.x}<b>score {locked?"?":c.score}</b></div>)}</div>
 <div className={s.proof}>{seen?proof.map(line=><div key={line}>{line}</div>):'Fixed offsets −1,+1; higher score wins'}</div>
 <Row><Control disabled={locked||seen} onClick={()=>{const first=probe(0);const second=probe(first.winner);setProof([`Retained: 0:${first.centerScore} → −1:${first.candidates[0].score} / 1:${first.candidates[1].score} → ${first.winner}`,`1 → 0:${second.candidates[0].score} / 2:${second.candidates[1].score} → ${second.winner}`]);setCenter(second.winner);setRound(2);setSeen(true);interact();}}>Run two rounds</Control><Control disabled={locked||round===0} onClick={()=>{setCenter(0);setRound(0);}}>Reset</Control><Control disabled={locked||!seen||round===2} onClick={()=>{setCenter(result.winner);setRound(n=>n+1);}}>Step</Control></Row></div>}
 </Lesson>;
}
