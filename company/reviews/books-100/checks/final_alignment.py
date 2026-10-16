#!/usr/bin/env python3
"""Read-only final artifact/brief alignment; independent arithmetic uses Fraction oracle.
Run from repo root. Only review outputs are written. git is used read-only against the
explicitly authorized original base e3594f79 to establish original-six tree equality.
"""
from pathlib import Path
from collections import Counter
from datetime import datetime,timezone
import hashlib,json,subprocess,math,re
from decimal import Decimal,ROUND_HALF_UP
from independent_models import independent
P=Path(__file__).resolve().parent
ROOT=P.parents[3]
FREEZE='51c8a4edaf8ee3cd7108b1b195dd43221eac9fcc'
def canonical_sha(obj):return hashlib.sha256(json.dumps(obj,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
def without_qa(meta):
    copy=json.loads(json.dumps(meta))
    if 'evidence' in copy:copy['evidence'].pop('qa',None)
    return copy
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def git(*args):return subprocess.check_output(['git',*args],cwd=ROOT,text=True).strip()
def close(a,b):return math.isclose(float(a),float(b),rel_tol=1e-12,abs_tol=1e-8)
def resolve(address,idea,meta):
    obj={'idea':idea,**meta}
    for part in address.split('.'):
        if isinstance(obj,dict) and part in obj:obj=obj[part]
        elif isinstance(obj,list) and part.isdigit() and int(part)<len(obj):obj=obj[int(part)]
        else:return False
    return True
mfile=ROOT/'company/domains/briefs/books-100/manifest.json';manifest=json.loads(mfile.read_text())
old=json.loads((P/'independent-results.json').read_text());oldrows={r['slug']:r for r in old['results']}
keys=json.loads((P/'visible-answer-results.json').read_text());keyrows={r['slug']:r for r in keys['results']}
briefs={};sourcehash={}
for name in ['business','psychology','science-history']:
 p=ROOT/f'company/domains/briefs/books-100/{name}.json';sourcehash[str(p.relative_to(ROOT))]=sha(p)
 for b in json.loads(p.read_text())['briefs']:briefs[b['slug']]=b
works=json.loads((ROOT/'content/works.json').read_text())['works'];workids=Counter(w['id'] for w in works)
issues=[];allowed=[];normalizations=Counter();rows=[];requests=[];allids=[];statuses=Counter();batchclaims=Counter();batchlessons=Counter()
if len(manifest['demos'])!=100 or set(briefs)!={d['slug'] for d in manifest['demos']}:issues.append('manifest/source slug/count mismatch')
for p,h in sourcehash.items():
 if h!=manifest['sourcePayloads'][p]:issues.append('current payload vs manifest hash '+p)
 # Original audit proves exactly which immutable candidate was read.
 if h!={s['path']:s['sha256'] for s in old['sources']}[p]:issues.append('current payload vs initial audit hash '+p)
for d in manifest['demos']:
 slug=d['slug'];b=briefs[slug];expected=b['idea'];directory=ROOT/'src/demos/books'/slug
 if not all((directory/n).exists() for n in ['idea.json','meta.json','Demo.tsx']):issues.append(slug+' missing artifact');continue
 idea=json.loads((directory/'idea.json').read_text());meta=json.loads((directory/'meta.json').read_text());oldrow=oldrows[slug]
 frozenmeta=json.loads(git('show',FREEZE+':src/demos/books/'+slug+'/meta.json'))
 frozenidea=subprocess.check_output(['git','show',FREEZE+':src/demos/books/'+slug+'/idea.json'],cwd=ROOT)
 if without_qa(meta)!=without_qa(frozenmeta):issues.append(slug+' current metadata differs from runtime freeze beyond evidence.qa')
 if (directory/'idea.json').read_bytes()!=frozenidea:issues.append(slug+' idea differs from runtime freeze')
 for k in set(expected)|set(idea):
  if expected.get(k)==idea.get(k):continue
  if slug=='bk-emyth-owner-bottleneck' and k in ['predict','exploreHint','modelBoundary']:
   if k=='predict' and any(idea[k][x]!=expected[k][x] for x in ['answer','options']):issues.append(slug+' prediction key/options drift')
   allowed.append({'slug':slug,'field':'idea.'+k,'reason':'authorized v4 serial completed-output clarification; same model numbers','before':expected.get(k),'after':idea.get(k)})
  else:issues.append(slug+' unexpected idea drift '+k)
 for k in ['slug','title','hook','concept','misconception','objective','recall','format']:
  if meta.get(k)!=b.get(k):issues.append(slug+' unexpected metadata drift '+k)
 learner={k:([v] if isinstance(v,str) else v) for k,v in b['learner'].items()}
 if learner!=meta['learner']:issues.append(slug+' learner semantic drift')
 elif learner!=b['learner']:normalizations['learner scalar to array']+=1
 if meta.get('domain')!='books' or meta.get('status')!='draft':issues.append(slug+' not books/draft')
 if not isinstance(meta.get('version'),int) or meta['version']<1:issues.append(slug+' missing version')
 curriculum=meta.get('curriculum',{})
 for k in ['also','prerequisites','level','strand','references','tags']:
  value='intro' if k=='level' and b.get(k)==1 else b.get(k)
  if curriculum.get(k)!=value:issues.append(slug+' curriculum drift '+k)
  elif k=='level' and b.get(k)==1:normalizations['level 1 to intro']+=1
 if curriculum.get('primary')!='books:'+b['concept']:issues.append(slug+' primary concept mismatch')
 refs=curriculum.get('references',[])
 if len(refs)!=1 or refs[0].get('work')!=idea['book']['work'] or idea['book']['work']!=d['work']:issues.append(slug+' work reference mismatch')
 if workids[idea['book']['work']]!=1:issues.append(slug+' work missing/duplicate in registry')
 if len(meta['claims'])!=len(b['claims']):issues.append(slug+' claim count drift')
 for c,e in zip(meta['claims'],b['claims']):
  eid=e['id'] if e['id'].startswith('books.') else f"books.{slug}.{e['id']}"
  if c.get('id')!=eid:issues.append(slug+' claim id drift '+str(c.get('id')))
  if e['id']!=eid:normalizations['qualified claim ID']+=1
  allids.append(c.get('id'));statuses[c.get('status')]+=1
  if c.get('status')!='unverified':issues.append(slug+' claim status not unverified '+eid)
  checkfields=[k for k in c if k.lower().startswith(('checked','verified'))]
  if checkfields:issues.append(slug+' checker/verification fields '+eid+str(checkfields))
  if not isinstance(c.get('source'),str) or not c['source'].strip():issues.append(slug+' missing string source '+eid)
  expected_support=e.get('support') or {'book-attribution':'source','bibliographic':'source','derivation':'derivation','world-evidence-boundary':'convention'}.get(e.get('kind'))
  if c.get('support')!=expected_support:issues.append(slug+' support drift '+eid)
  if 'support' not in e:normalizations['explicit support from kind']+=1
  if isinstance(e.get('source'),dict):
   try:source_equal=json.loads(c.get('source',''))==e['source']
   except (ValueError,TypeError):source_equal=False
   normalizations['source object serialized to string']+=1
  else:source_equal=c.get('source')==e.get('source')
  emythtoy=slug=='bk-emyth-owner-bottleneck' and eid.endswith('.toy')
  if emythtoy and (not source_equal or c.get('text')!=e.get('text')):
   if c.get('support')!='derivation' or 'completed' not in c.get('text','') or '5' not in c.get('text','') or not c.get('source','').startswith(e['source']):issues.append(slug+' exception claim lacks original derivation/source')
   allowed.append({'slug':slug,'field':'claim.toy text/source','reason':'authorized v4 clarification; independent min(3,10,10)=3 and min(6,5,10)=5 unchanged'})
  elif 'text' not in e:
   addresses=e.get('addresses') or e.get('address')
   if isinstance(addresses,str):addresses=[addresses]
   def address_value(address):
    obj={'idea':idea,**meta}
    for part in address.split('.'):obj=obj[part]
    return obj
   fallback='; '.join(address+': '+json.dumps(address_value(address),ensure_ascii=False,separators=(',',':')) for address in addresses)
   if c.get('text')!=fallback or not source_equal:issues.append(slug+' nonlossless missing-text normalization '+eid)
   else:normalizations['claim text from exact addressed values']+=1
  elif not source_equal or c.get('text')!=e.get('text'):issues.append(slug+' source/text drift '+eid)
  for k in ['address','addresses','kind']:
   if c.get(k)!=e.get(k):issues.append(slug+' claim '+k+' drift '+eid)
  addresses=c.get('addresses') or c.get('address')
  if isinstance(addresses,str):addresses=[addresses]
  if not isinstance(addresses,list) or not addresses or not all(isinstance(x,str) and x.strip() and resolve(x,idea,meta) for x in addresses):issues.append(slug+' missing/unresolved address '+eid)
 # Rerun the independent oracle against actual idea files, not the candidate briefs.
 actual=[]
 for i,scenario in enumerate(idea['scenarios']):
  exact=independent(idea['family'],scenario['values']);actual.append(float(exact))
  if not close(exact,oldrow['scenarioNumeric'][i]):issues.append(slug+' independent result changed '+str(i))
  requests.append({'key':f'{slug}:{i}','family':idea['family'],'values':scenario['values'],'expected':float(exact)})
 # Reuse manually extracted expected numerical/semantic answers only because the
 # actual full question/options/recall text has been compared above.
 k=keyrows[slug]
 selected=idea['predict']['options'][idea['predict']['answer']]
 def numbers(text):return [float(n) for n in re.findall(r'[+-]?\d+(?:\.\d+)?',text.replace('−','-').replace(',',''))]
 def rounded(n):return Decimal(str(n)).quantize(Decimal('.01'),rounding=ROUND_HALF_UP)
 selectednums=numbers(selected)
 if len(selectednums)!=1 or rounded(selectednums[0])!=rounded(k['predictionExpected']):issues.append(slug+' final prediction answer check failed')
 recallselected=meta['recall']['options'][meta['recall']['answer']]
 derivation=k['recallDerivation']
 if 'expectedOption' in derivation:
  if recallselected!=derivation['expectedOption']:issues.append(slug+' final semantic recall failed')
 else:
  values=derivation['independentExpected'];values=values if isinstance(values,list) else [values]
  found=numbers(recallselected)
  if len(found)!=len(values) or any(rounded(a)!=rounded(b) for a,b in zip(found,values)):issues.append(slug+' final numeric recall failed')
 # Every business structured transfer calculation reruns against metadata question
 # equivalence; other transfer arithmetic/semantics were separately extracted above.
 transfer=b.get('answerCheck',{}).get('recall')
 if isinstance(transfer,dict) and 'inputs' in transfer:
  if not close(independent(transfer['family'],transfer['inputs']),transfer['result']):issues.append(slug+' final recall arithmetic mismatch')
 if len(idea['bookIdea'].split())>20:issues.append(slug+' bookIdea >20 words')
 batch=oldrow['batch'];batchclaims[batch]+=len(meta['claims']);batchlessons[batch]+=1
 rows.append({'slug':slug,'batch':batch,'version':meta['version'],'claims':len(meta['claims']),'work':idea['book']['work'],
  'A':actual[0],'B':actual[1],'predictionKey':selected,'recallKey':recallselected,
  'ideaSha256':sha(directory/'idea.json'),'claimContentSha256':canonical_sha(meta['claims']),
  'metaContentWithoutQaSha256':canonical_sha(without_qa(meta)),
  'qaEvidenceChangedSinceFreeze':meta.get('evidence',{}).get('qa')!=frozenmeta.get('evidence',{}).get('qa'),
  'metaSha256':sha(directory/'meta.json'),'demoSha256':sha(directory/'Demo.tsx')})
for i in batchclaims:
 if batchclaims[i]>40 or batchlessons[i]>15:issues.append('chunk bounds exceeded '+str(i))
if len(set(allids))!=len(allids):issues.append('duplicate claim IDs')
if len(rows)!=100 or len({r['work'] for r in rows})!=100:issues.append('not exact100 unique final works')
# Exact directory tree equality to the authorized pre-project base; no mutations.
original=['slowest-station-sets-pace','one-percent-a-day','born-in-january-picked-first','wheel-number-pulls-guess','total-signups-hide-the-slide','biased-judge-noisy-judge']
originals=[]
for slug in original:
 path='src/demos/books/'+slug
 before=git('rev-parse','e3594f79:'+path);after=git('rev-parse','HEAD:'+path)
 dirty=git('diff','--name-only','HEAD','--',path)
 basefiles=git('ls-tree','-r','--name-only','e3594f79','--',path).splitlines()
 actualfiles=sorted(str(p.relative_to(ROOT)) for p in (ROOT/path).rglob('*') if p.is_file())
 content_equal=sorted(basefiles)==actualfiles and all((ROOT/p).read_bytes()==subprocess.check_output(['git','show','e3594f79:'+p],cwd=ROOT) for p in basefiles)
 originals.append({'slug':slug,'baseTree':before,'headTree':after,'workingChanges':dirty.splitlines(),'filesCompared':len(basefiles),'baseContentEqual':content_equal,'unchanged':before==after and not dirty and content_equal})
 if before!=after or dirty or not content_equal:issues.append(slug+' original modified')
identity={'manifestSha256':sha(mfile),'payloadHashes':sourcehash,'modelSha256':sha(ROOT/'src/lib/books/model.ts'),
 'rendererSha256':sha(ROOT/'src/components/books/BookIdeaLesson.tsx'),'worksSha256':sha(ROOT/'content/works.json'),
 'headObserved':git('rev-parse','HEAD'),'runtimeFreeze':FREEZE,'allowedMetadataChange':'evidence.qa links only; claim content and all other metadata must equal runtime freeze','originalBase':'e3594f79'}
record={'recordedAt':datetime.now(timezone.utc).isoformat(),'scope':'static final100 artifact alignment, not browser/source verification',
 'counts':{'lessons':len(rows),'claims':len(allids),'scenarios':len(requests),'predictionKeys':len(rows),'recallKeys':len(rows),'uniqueWorks':len({r['work'] for r in rows})},
 'statuses':dict(statuses),'normalizations':dict(normalizations),'allowedExceptions':allowed,
 'batches':[{'batch':i,'lessons':batchlessons[i],'claims':batchclaims[i]} for i in sorted(batchclaims)],
 'identity':identity,'originalSix':originals,'sourceHolds':{'bookSourcesOpened':0,'empiricalSourcesOpened':0,'all100Preserved':True},'issues':issues,'rows':rows}
(P/'final-artifact-engine-requests.json').write_text(json.dumps(requests,separators=(',',':'))+'\n')
(P/'final-artifact-alignment.json').write_text(json.dumps(record,separators=(',',':'))+'\n')
print(json.dumps({k:v for k,v in record.items() if k not in ['rows','allowedExceptions','originalSix']},indent=2))
print('allowed exception fields',len(allowed),'original six unchanged',sum(x['unchanged'] for x in originals))
if issues:raise SystemExit(1)
