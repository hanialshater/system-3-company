"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {transition} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [position,setPosition]=useState<"A"|"B"|"C">("A"); const [history,setHistory]=useState<string[]>([]); const [seen,setSeen]=useState(false);
 return <Lesson slug={slug} predict={{"question": "At A, the right action leads where in this toy?", "options": ["A with reward 2", "B with reward 0", "C with reward 0"], "answer": 1}} exploreHint="Take two rights; Reset and compare Stay with Right." reveal={()=> <p>The retained path records A → B with reward 0, then B → C with reward +2. Rewards label transitions, separately from positions. Stay gives 0 at A or B; C is terminal. This fully observed deterministic toy supplies a transition table, not a trained agent or a correct-action label.</p>}>
 {({locked,interact})=><div className={s.root}><div className={s.nodes}>{['A','B','C'].map(p=><div className={p===position?s.on:s.off} key={p}>{p}{p==='C'?<small>terminal</small>:null}</div>)}</div>
 <div className={s.trace}>{history.map((r,i)=><div key={i}>{r}</div>)}</div><div className={s.proof}>{seen?'Retained: A → B (0); B → C (+2)':'Deterministic; fully observed'}</div>
 <Row><Control disabled={locked||seen} onClick={()=>{const first=transition('A','right'); const second=transition(first.state,'right');setHistory([`A → ${first.state}: ${first.reward}`,`B → ${second.state}: +${second.reward}`]);setPosition(second.state);setSeen(true);interact();}}>Take two rights</Control><Control disabled={locked||!seen||position==='A'} onClick={()=>{setPosition('A');setHistory([]);}}>Reset</Control><Control disabled={locked||position==='C'} onClick={()=>{const next=transition(position,'stay');setHistory(h=>[...h.slice(-1),`${position} → ${next.state}: ${next.reward}`]);}}>Stay</Control><Control disabled={locked||position==='C'} onClick={()=>{const next=transition(position,'right');setHistory(h=>[...h.slice(-1),`${position} → ${next.state}: ${next.reward}`]);setPosition(next.state);}}>Right</Control></Row></div>}
 </Lesson>;
}
