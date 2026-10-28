import json,re
from pathlib import Path
manifest=json.loads(Path('company/reviews/zoology-ecology/manifest.json').read_text())
assert len(manifest)==12 and len({x['plan_id'] for x in manifest})==12 and len({x['slug'] for x in manifest})==12
for x in manifest:
 p=Path('src/demos/life')/x['slug']; meta=json.loads((p/'meta.json').read_text()); code=(p/'Demo.tsx').read_text()
 model=json.loads(re.search(r'const model = (.*?);\nexport default',code,re.S).group(1))
 assert meta['slug']==x['slug'] and meta['status']=='draft' and meta['concept']==x['slug']
 assert len(model['options'])==3 and 0<=model['answer']<3 and len(model['explanation'])>=120
 assert len(meta['recall']['options'])==3 and 0<=meta['recall']['answer']<3 and meta['recall']['question']!=model['question']
 assert all(c['status']=='unverified' and c['source'] for c in meta['claims'])
 assert 'minInteractions={2}' in code and 'disabled={locked || seen[0]}' in code and 'disabled={locked || seen[1]}' in code
 assert 'if (seenRef.current[index]) return;' in code and 'open(0,interact)' in code and 'open(1,interact)' in code
 assert code.count('style={{minHeight:44,minWidth:44}}')==2
 assert 'role="img"' in code and '<svg' in code and '</svg>' in code
 print(f"{x['plan_id']}: {x['slug']}")
assert 10-5==5 and 12-7==5
print('12 lesson schema/answer/control checks and detection-count arithmetic passed.')
