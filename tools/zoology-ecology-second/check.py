import json,re
from pathlib import Path
M=json.loads(Path('company/reviews/zoology-ecology-second/manifest.json').read_text()); assert len(M)==13 and len({x['plan_id'] for x in M})==13
answer={451:'Both branches together',455:'The vulture',461:'The 3-patch scenario',462:'Tick and deer',466:'Eating insects at night',467:'No, the intervals are separate',472:'21',473:'21',474:'8',475:'Food per animal',477:'No, additional evidence is needed',493:'4',499:'Locations observed by residents'}
assert 12-3==9 and 12-7==5 and 20+4-3==21 and 20+3-2==21 and 12//4==3 and 12//6==2 and 6-2==4
for row in M:
 path=Path('src/demos/life')/row['slug'];meta=json.loads((path/'meta.json').read_text());source=(path/'Demo.tsx').read_text();model=json.loads(re.search(r'const model=(\{.*?\});',source,re.S).group(1));assert model['options'][model['answer']]==answer[row['plan_id']],row['slug'];assert 0<=meta['recall']['answer']<len(meta['recall']['options']);assert meta['status']=='draft' and all(x['status']=='unverified' for x in meta['claims']);assert len(model['explanation'])>=120
print('13 answer mappings and draft boundaries checked; seven arithmetic assertions passed')
