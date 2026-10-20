import json,datetime,collections
from pathlib import Path
p=Path('/Users/hani/.codex/worktrees/latest-personalization/system3-company/company/evaluation/rounds/2026-10-18-round-1')
inv=json.loads((p/'inventory.json').read_text()); by={i['slug']:i for i in inv['items']}; planned={i['slug'] for i in inv['overlaps']}
counts={}; invalid=[]; batches=collections.defaultdict(collections.Counter)
for kind in ['primary','overlap']:
 c=collections.Counter();valid=[]
 for f in (p/'reviews'/kind).glob('*.json'):
  try:
   r=json.loads(f.read_text());i=by[r['slug']];errs=[]
   if f.name != r['slug']+'.json':continue
   for key in ['demoVersion','batchId']:
    if r.get(key)!=i[key]:errs.append(key+' mismatch')
   if r.get('reviewKind')!=kind:errs.append('reviewKind mismatch')
   if r.get('status') not in ['walkthrough-reviewed','partial','blocked','inaccessible']:errs.append('missing or invalid status')
   if r.get('schema')!='catalogue-review-record-v1':errs.append('schema mismatch')
   if r.get('status')=='walkthrough-reviewed':
    if not all(r.get('coverage',{}).get(k) is True for k in ['prediction','exploration','reveal']):errs.append('missing phase')
    if not r.get('observations'):errs.append('missing observations')
    for group,keys in [('quality',['prediction','interaction','payoff','clarity','transfer','accessibility']),('experience',['surprise','visualExplanation','playfulness','practicalValue','depth'])]:
     for k in keys:
      v=r.get(group,{}).get(k,{})
      if not isinstance(v,dict) or not v.get('reason') or not v.get('evidence'):errs.append(group+'.'+k+' missing evidence')
      elif v.get('score') is not None and (type(v['score']) is not int or not 0<=v['score']<=4):errs.append(group+'.'+k+' invalid score')
   if errs:invalid.append({'file':str(f.relative_to(p)),'errors':errs});c['invalid']+=1;continue
   c[r.get('status','unknown')]+=1
   if r.get('status')=='walkthrough-reviewed':
    valid.append(r['slug']);batches[i['batchId']][kind+'Reviewed']+=1
    if kind=='overlap':batches[i['batchId']]['plannedOverlapReviewed' if r['slug'] in planned else 'extraOverlapReviewed']+=1
  except Exception as e: invalid.append({'file':str(f),'errors':[str(e)]});c['invalid']+=1
 counts[kind]={'statuses':dict(c),'reviewed':len(valid),'plannedReviewed':len(set(valid)&planned) if kind=='overlap' else len(valid),'extraReviewed':len(set(valid)-planned) if kind=='overlap' else 0}
for i in inv['items']:batches[i['batchId']]['target']+=1
for i in inv['overlaps']:batches[i['batchId']]['plannedOverlapTarget']+=1
out=dict(schema='catalogue-review-progress-v1',updatedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),target=inv['lessonCount'],overlapPlanned=inv['overlapCount'],state='running',primaryReviewed=counts['primary']['reviewed'],counts=counts,batches={k:dict(v) for k,v in sorted(batches.items())},invalid=invalid,remainingPrimary=inv['lessonCount']-counts['primary']['reviewed'],notApprovedForServing=True)
(p/'progress.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:out[k] for k in ['primaryReviewed','remainingPrimary','counts','invalid']}))
