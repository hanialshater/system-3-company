#!/usr/bin/env python3
"""Frozen source-manifest alignment only; built metadata is a separate later check."""
from pathlib import Path
from collections import Counter
import hashlib,json
P=Path(__file__).resolve().parent
ROOT=P.parents[3]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
mp=ROOT/'company/domains/briefs/books-100/manifest.json';m=json.loads(mp.read_text())
briefs={};hashes={};holds=[]
for name in ['business','psychology','science-history']:
 p=ROOT/f'company/domains/briefs/books-100/{name}.json';hashes[str(p.relative_to(ROOT))]=sha(p)
 for b in json.loads(p.read_text())['briefs']:
  assert b['slug'] not in briefs;briefs[b['slug']]=b
  holds.append({'slug':b['slug'],'book':b['idea']['book'],'sourceVerification':'none; source not supplied/opened in this audit',
   'bookAndBibliographyClaims':[c for c in b['claims'] if c['id'].split('.')[-1] in ['book','bibliography']],
   'worldBoundaryClaims':[c for c in b['claims'] if c['id'].split('.')[-1]=='world']})
issues=[]
if m.get('count')!=100 or len(m['demos'])!=100 or len(briefs)!=100:issues.append('exact-100 count mismatch')
if len({x['slug'] for x in m['demos']})!=100:issues.append('duplicate manifest slug')
if len({x['work'] for x in m['demos']})!=100:issues.append('duplicate work identifier')
if {x['slug'] for x in m['demos']}!=set(briefs):issues.append('manifest/brief slug-set mismatch')
for path,h in hashes.items():
 if m['sourcePayloads'].get(path)!=h:issues.append(f'payload hash mismatch {path}')
for x in m['demos']:
 b=briefs[x['slug']];book=b['idea']['book']
 expected={'title':b['title'],'book':book['title'],'author':book['author'],'work':b['work'],'strand':b['strand'],
  'concept':b['concept'],'family':b['idea']['family'],'path':'/d/'+b['slug'],'status':'draft'}
 for k,v in expected.items():
  if x.get(k)!=v:issues.append(f"{x['slug']} {k}: {x.get(k)!r} != {v!r}")
record={'manifest':str(mp.relative_to(ROOT)),'manifestSha256':sha(mp),'sourcePayloads':hashes,
 'lessons':len(briefs),'manifestEntries':len(m['demos']),'uniqueWorks':len({x['work'] for x in m['demos']}),
 'strandCounts':dict(Counter(b['strand'] for b in briefs.values())),
 'familyCounts':dict(Counter(b['idea']['family'] for b in briefs.values())),
 'claimCount':sum(len(b['claims']) for b in briefs.values()),'claimStatuses':dict(Counter(c['status'] for b in briefs.values() for c in b['claims'])),
 'bookIdeaWordRange':[min(len(b['idea']['bookIdea'].split()) for b in briefs.values()),max(len(b['idea']['bookIdea'].split()) for b in briefs.values())],
 'yearRangeAsStated':[min(b['idea']['book']['year'] for b in briefs.values()),max(b['idea']['book']['year'] for b in briefs.values())],
 'empiricalSourcesOpened':0,'bookSourcesOpened':0,'issues':issues,
 'builtMetadataAlignment':'deferred until final 100 generated artifacts freeze; this is payload/manifest alignment only'}
(P/'manifest-alignment.json').write_text(json.dumps(record,indent=2)+'\n')
(P/'source-holds.json').write_text(json.dumps(holds,indent=2)+'\n')
print(json.dumps(record,indent=2))
if issues:raise SystemExit(1)
