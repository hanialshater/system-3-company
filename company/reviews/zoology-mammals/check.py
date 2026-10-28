import json,re
from pathlib import Path
manifest=json.loads(Path('company/reviews/zoology-mammals/manifest.json').read_text())
assert len(manifest)==14 and len({x['plan_id'] for x in manifest})==14 and len({x['slug'] for x in manifest})==14
for x in manifest:
 p=Path('src/demos/life')/x['slug']; meta=json.loads((p/'meta.json').read_text()); text=(p/'Demo.tsx').read_text()
 model=json.loads(re.search(r'const model = (.*?);\nexport default',text,re.S).group(1))
 assert meta['slug']==x['slug'] and meta['status']=='draft' and meta['concept']==x['slug']
 assert len(model['options'])==3 and 0 <= model['answer'] < 3 and len(model['explanation']) >= 120
 assert len(meta['recall']['options'])==3 and 0 <= meta['recall']['answer'] < 3
 assert meta['recall']['question'] != model['question']
 assert all(c['status']=='unverified' and c['source'] for c in meta['claims'])
 assert 'disabled={locked || shown}' in text and 'setShown(true);interact()' in text
 assert 'role="img"' in text and '<svg' in text and '</svg>' in text
 print(f"{x['plan_id']}: {x['slug']}")
print('14 lesson schema, answer bounds, source-status and interaction wiring checks passed.')
