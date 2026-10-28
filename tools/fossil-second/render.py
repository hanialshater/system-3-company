from pathlib import Path
import ast,html,re
source=Path('tools/fossil-second/build.py').read_text();tree=ast.parse(source);cases=[]
for n in tree.body:
 if isinstance(n,ast.Expr) and isinstance(n.value,ast.Call) and isinstance(n.value.func,ast.Name) and n.value.func.id=='add':
  args=[ast.literal_eval(a) for a in n.value.args];cases.append((args[0],args[2],args[-2],args[-1]))
assert len(cases)==14
parts=['<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="%s" viewBox="0 0 1000 %s">'%(len(cases)*160,len(cases)*160),'<rect width="100%" height="100%" fill="#111216"/>']
for i,(num,title,labels,svgs) in enumerate(cases):
 y=i*160;parts.append(f'<text x="10" y="{y+20}" fill="#f7f7f8" font-size="16">{num}: {html.escape(title)}</text>')
 for j in range(2):
  x=15+j*245;parts.append(f'<rect x="{x}" y="{y+30}" width="225" height="115" rx="10" fill="#191b22" stroke="#a9abb5"/>');frag=svgs[j]
  for a,b in [('strokeWidth','stroke-width'),('strokeLinecap','stroke-linecap'),('textAnchor','text-anchor'),('fontSize','font-size'),('var(--fg)','#f7f7f8'),('var(--muted)','#a9abb5'),('var(--good)','#4fd1a5'),('var(--bad)','#ff7a7a')]:frag=frag.replace(a,b)
  parts.append(f'<g transform="translate({x+35},{y+35})">{frag}</g>');parts.append(f'<text x="{x+112}" y="{y+135}" text-anchor="middle" fill="#f7f7f8" font-size="13">{html.escape(labels[j])}</text>')
parts.append('</svg>');p=Path('company/reviews/zoology-fossil-second/2026-10-28-stages.svg');p.write_text(''.join(parts))
