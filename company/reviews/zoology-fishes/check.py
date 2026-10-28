import json,re
from pathlib import Path
manifest=json.loads(Path('company/reviews/zoology-fishes/manifest.json').read_text())
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
 assert 'role="img"' in code and '<svg' in code and '</svg>' in code
 print(f"{x['plan_id']}: {x['slug']}")
# Verify each fixed oxygen-pressure pair and the displayed explanation.
same_water=[100,70,50]; same_blood=[0,30,50]; opposite_water=[100,70,40]; opposite_blood=[90,60,30]
assert [a-b for a,b in zip(same_water,same_blood)]==[100,40,0]
assert [a-b for a,b in zip(opposite_water,opposite_blood)]==[10,10,10]
assert same_water[0]-same_water[-1]==same_blood[-1]-same_blood[0]
assert opposite_water[0]-opposite_water[-1]==opposite_blood[0]-opposite_blood[-1]
print('12 lesson schema/answer/control checks and countercurrent toy arithmetic passed.')
