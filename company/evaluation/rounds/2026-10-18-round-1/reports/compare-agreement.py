import json,collections,datetime
from pathlib import Path
p=Path('/Users/hani/.codex/worktrees/latest-personalization/system3-company/company/evaluation/rounds/2026-10-18-round-1');pairs=[];stats=collections.defaultdict(collections.Counter)
for f in (p/'reviews/overlap').glob('*.json'):
 b=json.loads(f.read_text())
 if f.name!=b.get('slug','')+'.json':continue
 g=p/'reviews/primary'/f.name
 if not g.exists():continue
 a=json.loads(g.read_text())
 if a.get('status')!='walkthrough-reviewed' or b.get('status')!='walkthrough-reviewed':continue
 row={'slug':a['slug'],'reviewers':[a['reviewer'],b['reviewer']],'differences':[],'complexity':[a['complexity'].get('level'),b['complexity'].get('level')]}
 for group in ['quality','experience']:
  for key,av in a[group].items():
   x=av.get('score');y=b[group].get(key,{}).get('score')
   if x is None or y is None:continue
   c=stats[group];c['compared']+=1;c['exact']+=x==y;c['withinOne']+=abs(x-y)<=1;c['twoOrMore']+=abs(x-y)>=2
   if x!=y:row['differences'].append({'dimension':group+'.'+key,'primary':x,'overlap':y,'absoluteDifference':abs(x-y)})
 stats['complexity']['compared']+=1;stats['complexity']['exact']+=row['complexity'][0]==row['complexity'][1];pairs.append(row)
r={'date':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Raw frozen independent agreement only; not learning validity, not serving approval','pairs':pairs,'summary':{k:dict(v) for k,v in stats.items()},'limitations':['Partial blinding: trust chrome visible.','Eight-percent-showing overlap uses different browser/viewport/theme; clarity comparison confounded.','Root transfer anchor audit exists. Candidate corrections are separate and MUST NOT replace raw independent agreement.','Null accessibility pairs excluded; no comprehensive accessibility evidence.','No significance claims from small overlap samples.']};(p/'reports/agreement-current.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r['summary']));print('largeDifferences',[(x['slug'],d) for x in pairs for d in x['differences'] if d['absoluteDifference']>=2])
