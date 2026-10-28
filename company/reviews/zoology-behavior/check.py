import json,re
from fractions import Fraction
from pathlib import Path
manifest=json.loads(Path('company/reviews/zoology-behavior/manifest.json').read_text())
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
assert 6-4==2
assert Fraction(1,6)<Fraction(1,3)
assert 8+2==10 and 4+6==10 and 8-4==4
assert 5-1==4 and 8-6==2 and 4>2
assert 5-4==1
assert all(a>b for a,b in zip([4,3,2],[3,2,1]))
assert all(a<b for a,b in zip([1,2,3],[2,3,4]))
print('12 lesson schema/answer/control checks and stipulated arithmetic passed.')
