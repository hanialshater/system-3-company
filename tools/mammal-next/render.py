import json, re, html, subprocess
from pathlib import Path
from PIL import Image, ImageDraw
m=json.loads(Path('company/reviews/zoology-mammal-next/manifest.json').read_text());outdir=Path('company/reviews/zoology-mammal-next/rendered');outdir.mkdir(parents=True,exist_ok=True)
for theme,background,line,ink in [('light','#ffffff','#d9dde8','#141824'),('dark','#191b22','#596271','#f7f7f8')]:
 imgs=[]
 for x in m:
  s=(Path('src/demos/life')/x['slug']/'Demo.tsx').read_text();model=json.loads(re.search(r'const model = (.*?);\nexport default',s,re.S).group(1))
  def box(pos,key,idx):return f'<g transform="translate({pos} 10)"><rect width="155" height="150" rx="12" fill="{background}" stroke="{line}"/>{model["base"]}{model[key]}<text x="78" y="142" text-anchor="middle" fill="{ink}" font-size="12">{html.escape(model["labels"][idx])}</text></g>'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="340" height="175" viewBox="0 0 340 175">{box(5,"one",0)}{box(180,"two",1)}</svg>'
  f=outdir/(x['slug']+'-'+theme+'.svg');o=outdir/(x['slug']+'-'+theme+'.png');f.write_text(svg);subprocess.run(['inkscape',str(f),'--export-filename='+str(o)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);imgs.append((x,Image.open(o).convert('RGB')))
 sheet=Image.new('RGB',(1360,((len(imgs)+3)//4)*205),'#edf0ef' if theme=='light' else '#252933');draw=ImageDraw.Draw(sheet)
 for n,(x,img) in enumerate(imgs):
  px=(n%4)*340;py=(n//4)*205;sheet.paste(img,(px,py));draw.text((px+5,py+177),f"{x['plan_id']} {x['slug']}",fill='#111111' if theme=='light' else '#ffffff')
 sheet.save(f'company/reviews/zoology-mammal-next/{theme}-contact.png')
 print('Rendered',len(imgs),theme,'static stage pairs')
