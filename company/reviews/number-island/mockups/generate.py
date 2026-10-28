from pathlib import Path
from html import escape
import json
OUT=Path(__file__).resolve().parent
INK='#17332d'; SEA='#173c48'; PAPER='#f5f1e6'; SAND='#e8dcb9'; MINT='#b8d8ad'; GREEN='#789d70'; GOLD='#f5c45c'; MUTED='#52625a'
def t(x,y,s,size=16,fill=INK,weight=400,anchor='start',family='system-ui, sans-serif'):
 return f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{escape(s)}</text>'
def box(x,y,w,h,fill=PAPER,r=14,stroke='none',sw=1):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def tree(x,y,k=1):return f'<g transform="translate({x} {y}) scale({k})"><path d="M0 0v22" stroke="{INK}" stroke-width="4"/><ellipse cx="0" cy="-8" rx="15" ry="22" fill="#567c5b" stroke="{INK}" stroke-width="2"/><path d="M0 -18v20" stroke="#a7c898" stroke-width="2"/></g>'
def pine(x,y,k=1):return f'<g transform="translate({x} {y}) scale({k})"><path d="M0 3v16" stroke="{INK}" stroke-width="4"/><path d="M0 -42L-20 0H20z" fill="#355d4b" stroke="{INK}" stroke-width="2"/></g>'
def house(x,y,k=1):return f'<g transform="translate({x} {y}) scale({k})"><path d="M-22 -5v30h44V-5" fill="#f1e1b9" stroke="{INK}" stroke-width="2"/><path d="M-30 -4L0 -29L30 -4z" fill="#b9664d" stroke="{INK}" stroke-width="2"/><path d="M-4 25V9H7v16" fill="#567c5b" stroke="{INK}" stroke-width="2"/><path d="M-15 4h7v8h-7zM13 4h7v8h-7z" fill="#f5c45c" stroke="{INK}" stroke-width="1.5"/></g>'
def waves(w,h):
 s=''
 for y in range(24,h,57):
  for x in range(20,w,87):s+=f'<path d="M{x} {y}q7 6 15 0t15 0" fill="none" stroke="#40707a" stroke-width="1.4" opacity=".55"/>'
 return f'<defs><clipPath id="water-{w}-{h}"><rect width="{w}" height="{h}" rx="20"/></clipPath></defs><g clip-path="url(#water-{w}-{h})">'+s+'</g>'

def node(x,y,n,sel=False):
 return f'<g>{"<circle cx=\"%s\" cy=\"%s\" r=\"30\" fill=\"none\" stroke=\"%s\" stroke-width=\"2\"/>"%(x,y,GOLD) if sel else ""}<circle cx="{x}" cy="{y}" r="24" fill="{GOLD if sel else PAPER}" stroke="{INK}" stroke-width="3"/>'+t(x,y+6,str(n),17,INK,750,'middle')+'</g>'
def mountain(x,y,k=1):
 return f'<g transform="translate({x} {y}) scale({k})"><path d="M-72 60L-20 -66L60 60z" fill="#789d70" stroke="{INK}" stroke-width="2"/><path d="M-20 -66L-2 -26L-21 -32L-34 -25z" fill="#eef0d9"/><path d="M-5 60L48 -40L108 60z" fill="#9cb68c" stroke="{INK}" stroke-width="2"/><path d="M48 -40L64 -13L49 -18L35 -13z" fill="#eef0d9"/><path d="M-20 -66v-29h27l-10 10 10 10h-27" fill="#b9664d" stroke="{INK}" stroke-width="2"/></g>'
def boat(x,y,k=1):return f'<g transform="translate({x} {y}) scale({k})"><path d="M-24 5h48L12 18h-26z" fill="#e8dcb9" stroke="{INK}" stroke-width="2"/><path d="M0 5v-43L-19 -5H0M3 -36L20 -7H3" fill="#faf4dd" stroke="{INK}" stroke-width="2"/></g>'
def lighthouse(x,y,k=1):return f'<g transform="translate({x} {y}) scale({k})"><path d="M-13 40L-8 -12h16l5 52z" fill="#f5f1e6" stroke="{INK}" stroke-width="2"/><path d="M-9 0h18M-11 20h22" stroke="#b9664d" stroke-width="8"/><path d="M-12 -12v-12h24v12z" fill="{GOLD}" stroke="{INK}" stroke-width="2"/><path d="M-15 -24L0 -34l15 10z" fill="#b9664d" stroke="{INK}" stroke-width="2"/></g>'
def trail(d):return f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="{d}" fill="none" stroke="{SAND}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="{d}" fill="none" stroke="#958c68" stroke-width="1.5" stroke-dasharray="3 9"/>'
def scene(region,w=350,h=320):
 s=box(0,0,w,h,SEA,20)+waves(w,h)
 coast='M30 208C8 162 40 70 91 49C130 18 220 27 269 62C327 89 342 145 317 204C301 258 247 282 181 286C115 302 49 270 30 208Z'
 s+=f'<path d="{coast}" transform="translate(0 9)" fill="#0b2b32"/><path d="{coast}" fill="{SAND}" stroke="{INK}" stroke-width="2"/><path d="M42 201C29 157 58 79 104 63C145 34 215 47 263 77C310 104 323 151 302 198C280 246 233 265 178 272C118 284 60 254 42 201Z" fill="{MINT}"/>'
 if region=='village':
  s+=f'<path d="M66 180C76 90 203 64 278 145C283 217 165 255 86 218z" fill="#c8dfb5"/>'
  s+=house(160,97,.82)+house(220,137,.65)+house(103,140,.65)
  s+=tree(69,191,.8)+tree(267,198,.8)+tree(239,72,.6)+tree(114,72,.6)
  s+=trail('M78 229C105 220 97 175 143 173C196 171 173 231 221 229C252 228 268 212 270 185')
  s+=node(90,223,1,True)+node(163,179,2)+node(241,223,3)
 elif region=='mountain':
  s+=mountain(197,111,.8)+pine(76,147,.7)+pine(284,164,.7)+pine(94,94,.5)
  s+=trail('M69 237C90 224 109 223 126 236C150 262 201 251 209 213C218 173 128 190 148 152C164 121 242 159 259 122C267 103 247 83 233 75')
  for x,y,n,sel in [(70,237,8,False),(134,242,9,False),(209,213,10,False),(149,151,11,False),(244,87,12,True)]:s+=node(x,y,n,sel)
 return s

def phone_top():
 return box(0,0,390,844,PAPER,0)+t(22,36,'S3',20,INK,800)+t(258,35,'Feed',13)+t(309,35,'Curriculum',13)+f'<path d="M20 54h350" stroke="#d6d7c8"/>'+t(20,87,'MATHEMATICS · 12 LESSONS',11,MUTED,700)+t(20,126,'Number Island',34,INK,750)+t(20,151,'Choose any stop to explore a lesson.',13,MUTED)+box(20,169,350,45,'#e3e5d9',12)+box(24,173,171,37,INK,9)+t(109,197,'Map',14,PAPER,650,'middle')+t(281,197,'List',14,INK,600,'middle')
def regions(selected,y=225):
 s=''
 for i,ls in enumerate([['Number','Village'],['Fraction','Harbour'],['Scaling','Mountain']]):
  x=20+i*119
  s+=box(x,y,112,48,INK if i==selected else PAPER,10,INK,1.5)
  s+=t(x+56,y+19,ls[0],12,PAPER if i==selected else INK,650,'middle')+t(x+56,y+35,ls[1],12,PAPER if i==selected else INK,650,'middle')
 return s

def detail(x,y,w,num,region,lines):
 s=box(x,y,w,176,'#fffdf5',16,'#c9cdbd')+t(x+18,y+25,f'SELECTED STOP {num} · {region.upper()}',10,MUTED,700)
 for i,line in enumerate(lines):s+=t(x+18,y+54+i*25,line,21,INK,700)
 by=y+68+(len(lines)-1)*25
 s+=box(x+18,by,82,23,'#e1ebd8',7)+t(x+59,by+16,'Published',11,INK,650,'middle')+t(x+w-18,by+16,'60 sec',11,MUTED,400,'end')
 s+=box(x+18,y+123,w-36,44,INK,10)+t(x+w/2,y+151,'Open lesson  →',14,PAPER,700,'middle')
 return s

def svg(body,w,h):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>Number Island internal composition mockup</title>{body}</svg>'
# Region-focused alternatives
for region,n,label,lines in [('village',1,'Number Village',['Times ten: just add a zero?']),('mountain',12,'Scaling Mountain',['Three times as wide,','how heavy?'])]:
 s=phone_top()+regions(0 if region=='village' else 2)+f'<g transform="translate(20 286)">{scene(region,350,310)}</g>'
 s+=detail(20,608,350,n,label,lines)+t(20,817,'Open collection · choose any available stop',11,MUTED)+t(370,838,'B · REGION-FOCUSED MOCKUP',8,MUTED,600,'end')
 (OUT/f'phone-b-regions-{region}.svg').write_text(svg(s,390,844))
# Continuous alternative: a broad sequential journey showing first viewport, clipped map continuation.
s=phone_top()
s+=t(20,242,'NUMBER VILLAGE',12,INK,750)+f'<g transform="translate(20 258)">{scene("village",350,310)}</g>'
s+=t(20,598,'FRACTION HARBOUR',12,INK,750)+box(20,614,350,170,SEA,20)+f'<g transform="translate(20 614)">{waves(350,170)}<path d="M26 120C32 60 99 20 192 29C251 25 312 61 326 122L322 170H30Z" fill="{SAND}"/><path d="M40 126C45 75 107 40 191 43C246 40 297 76 310 130L306 170H40Z" fill="{MINT}"/>{lighthouse(100,99,.55)}{boat(274,100,.65)}{trail("M70 142Q170 93 271 147")}{node(70,142,4)}{node(170,118,5)}{node(271,147,6)}</g>'
s+=box(18,791,354,38,'#fffdf5',8,'#b5bcaa')+t(195,815,'Scroll continues ↓ · selected details follow map',11,INK,500,'middle')+t(370,840,'A · CONTINUOUS MOCKUP / FIRST VIEWPORT',8,MUTED,600,'end')
(OUT/'phone-a-continuous.svg').write_text(svg(s,390,844))
# Annotated second viewport: long document consequence remains explicit.
s=box(0,0,390,844,PAPER,0)+t(20,36,'A · continuation lower on page',14,INK,700)+t(20,67,'SCALING MOUNTAIN',12,INK,750)+f'<g transform="translate(20 84)">{scene("mountain",350,310)}</g>'+detail(20,416,350,12,'Scaling Mountain',['Three times as wide,','how heavy?'])+box(20,620,350,148,'#e7e7d9',12)+t(36,646,'LAYOUT QUESTION',11,INK,750)+t(36,673,'The details sit after all three regions.',13)+t(36,696,'A stop near the start can be far from',13)+t(36,719,'its Open action. Avoid a fixed overlay;',13)+t(36,742,'resolve this relationship before building.',13)+t(20,815,'Internal annotation · not user-facing copy',10,MUTED)
(OUT/'phone-a-continuation.svg').write_text(svg(s,390,844))
# Desktop all-island overview
s=box(0,0,1440,1000,PAPER,0)+t(64,58,'S3',25,INK,800)+t(1110,56,'Feed',15)+t(1180,56,'Curriculum',15)+t(1300,56,'Explore',15)+f'<path d="M64 83H1376" stroke="#cfd2c3"/>'+t(64,131,'MATHEMATICS / LEVEL 01',12,MUTED,750)+t(64,191,'Number Island',56,INK,750)+t(65,226,'Twelve ideas. Three places to explore. Choose any stop.',18,MUTED)
s+=box(1160,136,216,48,'#e3e5d9',14)+box(1164,140,104,40,INK,10)+t(1216,166,'Map',15,PAPER,650,'middle')+t(1322,166,'List',15,INK,600,'middle')
s+=f'<g transform="translate(64 270)">{box(0,0,900,650,SEA,24)}{waves(900,650)}'
coast='M72 448C28 376 78 286 132 250C171 218 215 253 263 220C316 184 335 109 429 112C502 107 499 54 605 57C709 35 770 101 799 150C873 193 873 278 826 332C804 379 750 364 710 408C667 478 600 442 549 479C474 541 380 509 327 551C235 613 111 549 72 448Z'
s+=f'<path d="{coast}" transform="translate(0 13)" fill="#0b2b32"/><path d="{coast}" fill="{SAND}" stroke="{INK}" stroke-width="3"/><path d="{coast}" transform="translate(30 20) scale(.93 .91)" fill="{MINT}"/>'
s+=f'<path d="M514 147Q630 64 752 154L790 266Q655 349 565 286z" fill="#99b78a"/>'
s+=mountain(674,139,1.05)+mountain(755,210,.57)+pine(598,148,.7)+pine(795,287,.7)+pine(555,233,.75)
s+=house(193,351,1)+house(278,316,.8)+house(135,398,.7)+tree(100,337,1)+tree(323,372,.9)+tree(230,285,.7)+tree(161,305,.65)
s+=f'<path d="M369 295C420 275 435 297 443 330C461 367 475 351 509 351C540 349 554 390 535 425C473 409 449 429 416 402C376 373 364 337 369 295Z" fill="{SEA}"/><path d="M423 328l57 -12M438 323v45M451 320v44M465 318v44" stroke="#bc9670" stroke-width="8"/>'
s+=lighthouse(378,280,.8)+boat(481,392,.9)+boat(839,433,.7)
s+=trail('M141 470C158 432 194 477 224 450C263 418 265 388 304 414C344 438 372 405 360 373C346 342 359 302 401 304C440 303 447 270 482 281C535 301 493 346 527 355C573 370 580 332 567 307C542 261 603 236 627 268C660 313 676 270 668 239C660 210 693 205 729 213C775 223 790 191 756 161')
coords=[(141,470),(224,450),(304,414),(360,373),(401,304),(482,281),(527,355),(567,307),(627,268),(668,239),(729,213),(756,161)]
for i,(x,y) in enumerate(coords,1):s+=node(x,y,i,i==12)
s+=box(126,510,218,36,PAPER,9)+t(235,534,'NUMBER VILLAGE',13,INK,750,'middle')+box(371,451,226,36,PAPER,9)+t(484,475,'FRACTION HARBOUR',13,INK,750,'middle')+box(548,83,232,36,PAPER,9)+t(664,107,'SCALING MOUNTAIN',13,INK,750,'middle')
s+=t(28,618,'Illustrative map · every available stop is open',12,'#d7e4da')+'</g>'
s+=box(996,270,380,650,'#fffdf5',22,'#c9cdbd')+t(1024,310,'YOUR NEXT EXPLORATION',11,MUTED,750)+t(1024,351,'Selected stop 12',21,INK,700)+t(1024,383,'Scaling Mountain',15,MUTED)+f'<path d="M1024 408H1348" stroke="#d6d7c8"/>'
s+=t(1024,451,'Three times as wide,',27,INK,750)+t(1024,486,'how heavy?',27,INK,750)+box(1024,514,90,27,'#e1ebd8',8)+t(1069,533,'Published',12,INK,650,'middle')+t(1348,533,'60 sec',12,MUTED,400,'end')
s+=box(1024,568,324,52,INK,13)+t(1186,601,'Open lesson  →',16,PAPER,700,'middle')+t(1024,657,'Browse the island',14,INK,700)
for i,(lab,nums) in enumerate([('Number Village','Stops 1–3'),('Fraction Harbour','Stops 4–7'),('Scaling Mountain','Stops 8–12')]):
 y=682+i*62;s+=box(1024,y,324,52,'#e1ebd8' if i==2 else '#f5f1e6',10,INK if i==2 else '#d6d7c8',1.5)+t(1040,y+23,lab,14,INK,650)+t(1040,y+41,nums,11,MUTED)
s+=t(64,960,'Open collection · suggested order, no locked stops',12,MUTED)+t(1376,968,'INTERNAL DESKTOP COMPOSITION · NOT A LIVE PAGE',10,MUTED,600,'end')
(OUT/'desktop.svg').write_text(svg(s,1440,1000))
print('Wrote five SVG composition frames')
