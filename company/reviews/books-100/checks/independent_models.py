#!/usr/bin/env python3
"""Fact-checker's independent exact-rational model audit; no shared evaluator imported.
Run from repository root. Writes only checker outputs beside this file.
"""
from fractions import Fraction as F
from pathlib import Path
import hashlib,json,math,subprocess
ROOT=Path(__file__).resolve().parents[4]
OUT=Path(__file__).resolve().parent

def q(x):
    if not isinstance(x,(int,float)) or isinstance(x,bool) or not math.isfinite(x) or abs(x)>10**9: raise ValueError('finite input bound')
    return F(str(x))

def whole(x,lo,hi):
    return x.denominator==1 and lo<=x<=hi

def independent(family,raw):
    v=list(map(q,raw))
    required={'payoff':3,'compound':4,'selection':4,'network':3,'feedback':4,'intervals':3}
    if family in required and len(v)!=required[family]: raise ValueError('arity')
    if family=='flow':
        if not 2<=len(v)<=4 or min(v)<0: raise ValueError('flow domain')
        z=sorted(v)[0]
    elif family=='payoff':
        p,w,l=v
        if not 0<=p<=100: raise ValueError('probability')
        z=(p*w+(100-p)*l)/100
    elif family=='compound':
        a,r,n,d=v
        if min(a,d)<0 or not -100<=r<=1000 or not whole(n,0,12): raise ValueError('compound domain')
        multiplier=1+r/100
        # Closed-form geometric sum, distinct from production's recurrence.
        z=a*multiplier**int(n)+(d*n if multiplier==1 else d*(multiplier**int(n)-1)/(multiplier-1))
    elif family=='selection':
        na,ra,nb,rb=v
        if not whole(na,0,10**9) or not whole(nb,0,10**9) or na+nb==0 or not 0<=ra<=100 or not 0<=rb<=100: raise ValueError('selection domain')
        z=(na*ra/100+nb*rb/100)/(na+nb)*100
    elif family=='network':
        cap,branch,rounds=v
        if not whole(cap,1,10**6) or not whole(branch,1,6) or not whole(rounds,0,12): raise ValueError('network domain')
        # Closed geometric-series size including origin; cap once at the end.
        z=min(cap,rounds+1 if branch==1 else (branch**(int(rounds)+1)-1)/(branch-1))
    elif family=='feedback':
        a,incoming,outgoing,n=v
        if min(a,incoming,outgoing)<0 or not whole(n,0,12): raise ValueError('feedback domain')
        # With constant signed net rate, truncation cannot cause a rebound.
        z=max(F(0),a+n*(incoming-outgoing))
    elif family=='intervals':
        budget,work,setup=v
        if budget<0 or work<=0 or setup<0: raise ValueError('interval domain')
        count=budget//(work+setup)
        if count>12: raise ValueError('chunk cap')
        z=count*work
    else: raise ValueError('family')
    if abs(z)>10**12: raise ValueError('output bound')
    return z

def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def close(a,b):return math.isclose(float(a),float(b),rel_tol=1e-12,abs_tol=1e-8)

def main():
    briefs=[]; sources=[]
    for strand in ['business','psychology','science-history']:
        p=ROOT/f'company/domains/briefs/books-100/{strand}.json'
        sources.append({'path':str(p.relative_to(ROOT)),'sha256':digest(p)})
        for b in json.loads(p.read_text())['briefs']:briefs.append((strand,b))
    batches=[]; batch=[]; claims=0
    for strand,b in briefs:
        if len(batch)==15 or claims+len(b['claims'])>40:
            batches.append(batch);batch=[];claims=0
        batch.append((strand,b));claims+=len(b['claims'])
    if batch:batches.append(batch)
    report={'sources':sources,'batchLimits':{'lessons':15,'claims':40},'batches':[],'results':[],'issues':[]}
    requests=[]
    for number,batch in enumerate(batches,1):
        report['batches'].append({'number':number,'slugs':[b['slug'] for _,b in batch],'claims':sum(len(b['claims']) for _,b in batch)})
        for strand,b in batch:
            idea=b['idea']; name=b['slug']; outputs=[]
            for j,s in enumerate(idea['scenarios']):
                expected=independent(idea['family'],s['values']);outputs.append(expected)
                requests.append({'key':f'{name}:{j}','family':idea['family'],'values':s['values'],'expected':float(expected)})
            row={'batch':number,'slug':name,'strand':strand,'family':idea['family'],'claimIds':[c['id'] for c in b['claims']],'claimCount':len(b['claims']),
                'scenarioExact':[str(x) for x in outputs],'scenarioNumeric':[float(x) for x in outputs],
                'predictQuestion':idea['predict']['question'],'predictOptions':idea['predict']['options'],'predictIndex':idea['predict']['answer'],
                'predictKey':idea['predict']['options'][idea['predict']['answer']],
                'recall':b['recall'],'bookIdeaWords':len(idea['bookIdea'].split()),'book':idea['book'],
                'bookIdea':idea['bookIdea'],'boundary':idea['modelBoundary'],'world':idea['doesItHoldUp'],
                'statuses':{c['id']:c['status'] for c in b['claims']},'recallIndependent':None}
            author=b.get('answerCheck',{})
            given=[author.get('A'),author.get('B')] if author else b.get('model',{}).get('answers',[])
            if len(given)==2:
                for j,(x,y) in enumerate(zip(outputs,given)):
                    if not close(x,y):report['issues'].append({'slug':name,'where':f'author scenario {j}','independent':float(x),'author':y})
            transfer=author.get('recall')
            if isinstance(transfer,dict) and 'inputs' in transfer:
                answer=independent(transfer['family'],transfer['inputs'])
                row['recallIndependent']={'exact':str(answer),'value':float(answer),'inputs':transfer['inputs'],'family':transfer['family']}
                if not close(answer,transfer['result']):report['issues'].append({'slug':name,'where':'author recall','independent':float(answer),'author':transfer['result']})
            if row['bookIdeaWords']>20:report['issues'].append({'slug':name,'where':'bookIdea words','value':row['bookIdeaWords']})
            if any(c['status']!='unverified' for c in b['claims']):report['issues'].append({'slug':name,'where':'source status unexpectedly not unverified'})
            report['results'].append(row)
    # Explicit valid domain boundaries and invalid-input rejection checks for all 7 families.
    valid=[('flow',[0,10**9]),('flow',[10**9]*4),('payoff',[0,10**9,-10**9]),('payoff',[100,10**9,-10**9]),
        ('compound',[3,-100,12,2]),('compound',[3,0,0,2]),('compound',[0,1000,12,0]),
        ('selection',[0,100,1,0]),('selection',[10**9,100,10**9,100]),
        ('network',[1,1,0]),('network',[10**6,6,12]),('network',[10**6,1,12]),
        ('feedback',[0,0,1,12]),('feedback',[10**9,10**9,0,12]),('feedback',[3,0,0,0]),
        ('intervals',[0,1,0]),('intervals',[12,1,0]),('intervals',[12.9,1,0])]
    invalid=[('flow',[1]),('flow',[-1,2]),('payoff',[101,1,-1]),('payoff',[-1,1,-1]),('compound',[1,-101,1,0]),
        ('compound',[1,1001,1,0]),('compound',[1,1,12.5,0]),('compound',[10**9,1000,12,0]),('selection',[0,50,0,50]),
        ('selection',[1.5,50,1,50]),('network',[0,1,1]),('network',[1,7,1]),('network',[10,2,13]),
        ('feedback',[0,-1,0,1]),('feedback',[0,0,0,13]),('intervals',[13,1,0]),('intervals',[1,0,0]),('payoff',[50,float('nan'),0]),('payoff',[50,10**9+1,0])]
    report['boundaries']={'valid':[],'invalid':[]}
    for j,(f,v) in enumerate(valid):
        x=independent(f,v);requests.append({'key':f'boundary:{j}','family':f,'values':v,'expected':float(x)})
        report['boundaries']['valid'].append({'family':f,'values':v,'exact':str(x)})
    for j,(f,v) in enumerate(invalid):
        try:independent(f,v)
        except ValueError as e:report['boundaries']['invalid'].append({'family':f,'values':[str(x) if isinstance(x,float) and not math.isfinite(x) else x for x in v],'rejected':str(e)})
        else:raise AssertionError((f,v,'accepted invalid'))
        # NaN needs a JS-specific fixture, not invalid JSON.
        if all(not isinstance(x,float) or math.isfinite(x) for x in v):requests.append({'key':f'invalid:{j}','family':f,'values':v,'reject':True})
    (OUT/'engine-requests.json').write_text(json.dumps(requests,indent=2)+'\n')
    (OUT/'independent-results.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'lessons':len(briefs),'claims':sum(len(b['claims']) for _,b in briefs),'batches':len(batches),'scenarios':len(briefs)*2,'issues':report['issues'],'requests':len(requests)},indent=2))
if __name__=='__main__':main()
