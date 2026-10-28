from pathlib import Path
import subprocess, re
from PIL import Image, ImageDraw
src=Path('tools/zoology-sensory-second/build.py').read_text().split('outroot=Path')[0]
scope={};exec(src,scope);cases=scope['cases'];out=Path('company/reviews/zoology-sensory-second');temp=out/'render-temp';temp.mkdir(exist_ok=True)
for theme in ('dark','light'):
 palette={'var(--bg-2)':'#161a22' if theme=='dark' else '#ffffff','var(--fg)':'#eef1f7' if theme=='dark' else '#141824','var(--good)':'#4fd1a5' if theme=='dark' else '#09704d','var(--warn)':'#f6c453' if theme=='dark' else '#7d5200'}
 images=[]
 for c in cases:
  svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="340" height="184" viewBox="0 0 340 184"><rect width="340" height="184" fill="{'#161a22' if theme=='dark' else '#ffffff'}"/><text x="170" y="22" text-anchor="middle" fill="{palette['var(--fg)']}" font-size="13">{"Constant light · toy record" if c["id"]==416 else "False-color channels" if c["id"]==429 else "Illustrative comparison"}</text><rect x="4" y="33" width="154" height="148" rx="12" fill="none" stroke="{palette['var(--fg)']}"/><rect x="182" y="33" width="154" height="148" rx="12" fill="none" stroke="{palette['var(--fg)']}"/><g transform="translate(6 37)">{c['a']}</g><g transform="translate(184 37)">{c['b']}</g></svg>'''
  for a,b in [('textAnchor','text-anchor'),('fontSize','font-size'),('strokeWidth','stroke-width'),('strokeDasharray','stroke-dasharray')]:svg=svg.replace(a,b)
  for a,b in palette.items():svg=svg.replace(a,b)
  s=temp/f"{c['id']}-{theme}.svg";p=temp/f"{c['id']}-{theme}.png";s.write_text(svg)
  subprocess.run(['inkscape',str(s),'--export-filename',str(p),'--export-width=680'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  images.append((c,Image.open(p).convert('RGB')))
 sheet=Image.new('RGB',(680*3,410*((len(images)+2)//3)), '#f1f1f1' if theme=='light' else '#1b1d25');draw=ImageDraw.Draw(sheet)
 for i,(c,img) in enumerate(images):
  x=(i%3)*680;y=(i//3)*410;draw.text((x+8,y+8),str(c['id'])+' '+c['title'],fill='#141824' if theme=='light' else '#fff');sheet.paste(img,(x,y+35))
 sheet.save(out/f'{theme}-contact.png')
print('Rendered 12 two-panel stages in light and dark')
