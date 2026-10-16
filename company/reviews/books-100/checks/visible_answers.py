#!/usr/bin/env python3
"""Manually extracted visible-question expectations, distinct from scenario/author data.
Values were derived after reading bounded batches of <=40 claims. This is a claim-key
check, not a natural-language parser or source verification. Both questions are retained
in independent-results.json for review. Semantic recall keys have explicit rationales.
"""
import json,re
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
P=Path(__file__).resolve().parent
# Prediction expected values in strand payload order, independently derived from wording.
EXPECTED_PREDICT={
'business':[85.7375,5,40,14.2805,0,11,12,40,-20,5,4,10,6,5,5,18,-12,14.8,25,50,50,45,0,4,0,6.2,30,10,6,6,80,7.5,-3,-2],
'psychology':[80,0,8,12,60,24,15,50,30,16,7,6,12,9,2,9,20,5,80,4,10,12,20,2,50,3,100,0,4,75,30,9,4],
'science-history':[-1.01,3.5,32,-1.3,13,18,-.5,7,2.44140625,2,4,3,20,0,4,8,16,6,7,48,7,24,32,20,0,90,32,7,1000000,2,12,.32,50]}
# Numeric recall results directly computed from visible question; multivalue keys retained.
EXPECTED_RECALL={
'business':[64,1,60,16,3,9,13,40,10,6,0,20,3,3,8,32,0,9,50,60,40,40,8,3,0,2,32,10,8,5,60,6,5,4],
'psychology':[70,-1,None,None,None,15,None,None,60,20,7,3,7,9,10,16,None,2,30,3,12,12,None,None,90,None,3,0,40,None,None,8,0],
'science-history':[-1.2,1,74,None,14,65,1,None,None,1,3,None,None,0,None,[9,27],[4,2.25],None,13,[12,18],20,20,4,None,[0,2],6,None,27,100,3,4,2.7,None]}
# For verbal/non-numeric questions and mixed numeric wording, preserve the derivation.
SEMANTIC={
'bk-habit-cue-policy':'No, the trigger policy was assumed|3×2=6 is stipulated counter behavior; habit formation has no mechanism.',
'bk-influence-social-sample':'One origin|Eight copies retain the single stipulated origin.',
'bk-mindset-small-effect-scale':'A change in the weighted test result|Only task mix changes; no treatment or ability model.',
'bk-scarcity-attention-budget':'No, it only specifies an allocation|An invented reservation supplies no causal evidence.',
'bk-stick-retrieval-evidence':'No, the support condition differs|Shown-answer accuracy supplies no hidden-answer probability.',
'bk-deep-unbroken-block':'No, neither block fits sixteen|12+4=16 exceeds each separate 10-minute block.',
'bk-gorilla-selection-rule':'No, blue events were outside the rule|Excluded events cannot be counted absent.',
'bk-smart-sunk-cost-boundary':'No, future ranking stays the same|A shared unrecoverable fee adds no future branch difference.',
'bk-knowledge-missing-mechanism':'No, the missing intermediate step still blocks it|min(6,0,8)=0 regardless of final-stage increase.',
'bk-crowds-correlated-errors':'No, dependence and aggregation matter|Marginal individual rates do not specify the joint error distribution.',
'bk-range-transfer-rule':'The mix can raise its computed mean under those assumed rates|Weighted arithmetic supplies no causal evidence or guarantee.',
'bk-signal-overfit-validation':'No|0.2×3+0.8×(−1)=−0.2, which is negative.',
'bk-spring-selection-resistance':'Expected survival rises|0.75×80+0.25×20=65%; group rates unchanged.',
'bk-watchmaker-cumulative-retention':'Probabilities|Equal count does not specify a message distribution.',
'bk-climbing-small-valid-steps':'Two updates|1.5²=2.25 exceeds 2.',
'bk-dodo-fragmented-habitat':'No|Reach stays bounded by connected-component premise 9.',
'bk-island-arrival-loss-balance':'No|Zero net rate preserves distinct initial stocks 5 and 12.',
'bk-origin-selection-frequencies':'Their means only|Both average5; coin variance25 differs from certain option variance0.',
'bk-sync-coupling-threshold':'Second|min(10,7,9)=7 at second stage.',
'bk-algorithms-cache-change':'More useful work|floor(24/4)×2=12; floor(24/8)×6=18; no wait or fairness model.',
'bk-law-symmetry-shift':'No|Changing inclusion changes average without changing subgroup rates.',
'bk-drunkard-streak-and-rate':'No|80% and40% give same equal-weight aggregate60%.'}
# These numerical sentences need a dedicated extraction instead of the literal numbers
# elsewhere in the selected sentence (e.g. 'Ninety percent' is written as a word).
SPECIAL={
'bk-minds-sampling-representatives':'Ninety percent of the selected sample agreed|9/10=90%; population and before/after belief unknown.',
'bk-mistakes-selective-evidence':'No, it remains three|Removing seven contrary records leaves the original numerator3.',
'bk-certain-confidence-score':'0 points|0.5×6+0.5×(−6)=0 under stipulated50% rather than reported90%.',
'bk-qed-add-amplitudes':'Signed mean is 0; magnitude is 2|0.5×2+0.5×(−2)=0, while mean absolute magnitude=2.'}

def nums(s):return [float(n) for n in re.findall(r'[+-]?\d+(?:\.\d+)?',s.replace('−','-').replace(',',''))]
def rounded(n):return Decimal(str(n)).quantize(Decimal('.01'),rounding=ROUND_HALF_UP)
r=json.loads((P/'independent-results.json').read_text());rows=[];failures=[]
for strand,predicts in EXPECTED_PREDICT.items():
    lessons=[x for x in r['results'] if x['strand']==strand]
    assert len(lessons)==len(predicts)==len(EXPECTED_RECALL[strand])
    for x,pval,rval in zip(lessons,predicts,EXPECTED_RECALL[strand]):
        pk=x['predictKey'];rk=x['recall']['options'][x['recall']['answer']];slug=x['slug']
        pv=nums(pk);predict_pass=len(pv)==1 and rounded(pv[0])==rounded(pval)
        semantic=SEMANTIC.get(slug) or SPECIAL.get(slug)
        if semantic:
            correct,rationale=semantic.split('|');recall_pass=rk==correct
            recall_detail={'expectedOption':correct,'reason':rationale}
        else:
            assert rval is not None,(slug,'missing expectation')
            values=rval if isinstance(rval,list) else [rval]
            found=nums(rk);recall_pass=len(found)==len(values) and all(rounded(a)==rounded(b) for a,b in zip(found,values))
            recall_detail={'independentExpected':rval,'selectedNumbers':found}
        row={'slug':slug,'batch':x['batch'],'predictionExpected':pval,'predictionSelected':pk,'predictionPass':predict_pass,
            'recallSelected':rk,'recallPass':recall_pass,'recallDerivation':recall_detail}
        rows.append(row)
        if not predict_pass or not recall_pass:failures.append(row)
record={'method':'Manual question-to-computation extraction after bounded reading; numeric equality rounded to visible 2dp; exact semantic options with reasons. No source verification.',
'lessons':len(rows),'predictionChecks':len(rows),'recallChecks':len(rows),'failures':failures,'results':rows}
(P/'visible-answer-results.json').write_text(json.dumps(record,indent=2)+'\n')
print(json.dumps({k:v for k,v in record.items() if k!='results'},indent=2))
if failures:raise SystemExit(1)
