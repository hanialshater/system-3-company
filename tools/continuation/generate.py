from pathlib import Path
import csv,json,sys,math,re,subprocess
from math_ops import OPS
import behavioral_extra
import probability_ops
import inference_ops
import process_ops
batch=sys.argv[1];domain=sys.argv[2];curation=Path(sys.argv[3])
root=Path.cwd();rows=list(csv.DictReader(curation.open(),delimiter='\t'))
remaining=json.load(open(f'company/domains/briefs/continuation/{domain}-remaining.json'))
source={r['id']:r for r in remaining};records=[];fixtures=[]
wrapper='''"use client";
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {useMiniLab,MiniLabStage,MiniLabReveal} from '@/components/mini-lab/TraceLesson';
import {spec} from './spec';
export default function Demo({slug}:{slug:string}) {
 const lab=useMiniLab(spec);
 return <Lesson slug={slug} predict={lab.spec.predict} minInteractions={2} exploreHint={lab.spec.hint} reveal={()=><MiniLabReveal lab={lab}/>}>
 {({locked,interact})=><MiniLabStage lab={lab} locked={locked}>
 <Control disabled={locked||!lab.enabled.run} onClick={()=>lab.apply('run',interact)}>Run case</Control>
 <Control disabled={locked||!lab.enabled.compare} onClick={()=>lab.apply('compare',interact)}>Compare</Control>
 <Control disabled={locked||!lab.enabled.step} onClick={()=>lab.apply('step',interact)}>Step</Control>
 <Control disabled={locked||!lab.enabled.reset} onClick={()=>lab.apply('reset',interact)}>Reset</Control>
 </MiniLabStage>}</Lesson>;
}
'''
for row in rows:
 id=int(row['id']);s=source[id];o=OPS[row['op']];a=list(map(float,row['A'].split(',')));b=list(map(float,row['B'].split(',')))
 assert len(a)==len(b)==len(o['labels']),id
 av=o['py'](a);bv=o['py'](b)
 assert all(math.isfinite(x) and abs(x)<=1e15 for x in av+bv),id
 slug=('be' if domain=='behavioral' else 'cp')+f'-source-{id:04}'
 d=root/'src/demos'/domain/slug;assert not d.exists(),slug;d.mkdir(parents=True)
 (d/'Demo.tsx').write_text(wrapper)
 (d/'model.ts').write_text('''// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==%d || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 %s
 const result:number[]=%s;
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
'''%(len(a),"if("+o['guard']+")throw Error('Outside model domain');" if o.get('guard') else '',o['ts']))
 question=o['question'].format(**dict(zip(o['labels'],map(lambda x:f'{x:g}',a))))
 config=dict(id=slug,title=row['title'],op=row['op'],labels=o['labels'],outputs=o['out'],a=a,b=b,question=question,questionTemplate=o['question'],explain=o['explain'],lens=row['lens'],kind=o['kind'],answerPosition=id%3)
 if 'plot' in o: config['plot']=o['plot']
 if 'graph' in o:config['graph']=o['graph']
 if o.get('binary'):config['binary']=True
 if row.get('Recall'):config['recall']=list(map(float,row['Recall'].split(',')))
 (d/'spec.ts').write_text("import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';\nimport {compute} from './model';\nconst c:CuratedCase="+json.dumps(config,ensure_ascii=False)+";\nexport const spec=makeCuratedSpec(c,compute);\nexport const curation=c;\n")
 records.append(dict(slug=slug,domain=domain,sourceEntryId=id,sourceSection=s['section'],sourceText=s['line'],sourceFile=s['file'],title=row['title'],lens=row['lens'],model=row['op']))
 fixtures.append(dict(slug=slug,domain=domain,a=a,b=b,expectedA=av,expectedB=bv))
folder=root/'company/reviews'/f'continuation-{batch}';folder.mkdir(parents=True,exist_ok=True)
(folder/'curation.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
(folder/'fixtures.json').write_text(json.dumps(fixtures,indent=2)+'\n')
print(f'Wrote {len(records)} curated local models for {batch}')
