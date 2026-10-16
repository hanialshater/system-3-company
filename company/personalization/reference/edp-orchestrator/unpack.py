import re,json,base64,gzip,sys,os
F,out=sys.argv[1],sys.argv[2]
s=open(F).read()
m=re.search(r'<script type="__bundler/manifest">([\s\S]*?)</script>',s).group(1)
t=re.search(r'<script type="__bundler/template">([\s\S]*?)</script>',s).group(1)
man=json.loads(m); tpl=json.loads(t)
open(os.path.join(out,'template.html'),'w').write(tpl)
for u,e in man.items():
    b=base64.b64decode(e['data'])
    if e.get('compressed'): b=gzip.decompress(b)
    ext={'application/javascript':'js','text/javascript':'js','text/css':'css'}.get(e['mime'],e['mime'].replace('/','_'))
    open(os.path.join(out,f'{u}.{ext}'),'wb').write(b)
    print(u,e['mime'],len(b))
