import ast,subprocess
from pathlib import Path
from PIL import Image,ImageDraw
p=Path('tools/zoology-ecology-second/build.py');t=ast.parse(p.read_text());expr=next(x.value for x in t.body if isinstance(x,ast.Assign) and any(isinstance(z,ast.Name) and z.id=='C' for z in x.targets));cases=eval(compile(ast.Expression(expr),str(p),'eval'),{'dict':dict});out=Path('company/reviews/zoology-ecology-second/stages');out.mkdir(exist_ok=True)
for mode,colors in [('dark',{'fg':'#eef1f7','muted':'#9aa3b5','good':'#4fd1a5','warn':'#f6c453','bg':'#161a22'}),('light',{'fg':'#141824','muted':'#5d6578','good':'#09704d','warn':'#7d5200','bg':'#ffffff'})]:
 for c in cases:
  a,b=c['a'],c['b'];body=f'<g transform="translate(6 8)">{a}</g><g transform="translate(184 8)">{b}</g>'
  for k,v in colors.items():body=body.replace(f'var(--{k})',v)
  for a,b in [('textAnchor','text-anchor'),('strokeWidth','stroke-width'),('markerEnd','marker-end')]:body=body.replace(a,b)
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="340" height="150" viewBox="0 0 340 150"><rect width="340" height="150" fill="{colors["bg"]}"/>{body}</svg>'
  sp=out/f"{c['id']}-{mode}.svg";sp.write_text(svg);subprocess.run(['inkscape',str(sp),'--export-filename',str(sp.with_suffix('.png'))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 for n in (0,1):
  group=cases[n*7:(n+1)*7];canvas=Image.new('RGB',(680,150*len(group)+20*len(group)),colors['bg']);d=ImageDraw.Draw(canvas)
  for idx,c in enumerate(group):
   im=Image.open(out/f"{c['id']}-{mode}.png").convert('RGB');y=idx*170;canvas.paste(im,(0,y+20));d.text((5,y+3),f"{c['id']} {c['slug']}",fill=colors['fg'])
  canvas.save(f'company/reviews/zoology-ecology-second/{mode}-sheet-{n+1}.png')
print('Rendered 13 light/dark final-state schematics; not a browser QA')
