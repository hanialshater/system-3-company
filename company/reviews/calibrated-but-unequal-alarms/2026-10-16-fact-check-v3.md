# Fact-check: calibrated-but-unequal-alarms v3 (2026-10-16)

## FC pass mail-34bf (2026-10-16)

Checker: fact-checker (Ingrid). Brief: company/ops/mailboxes/dispatcher/20261016T154559740Z-evaluation-steward-49b534bf.md (F-42 mailbox pilot, lane 10, SO-10-2, [project:wave-j]). Checkout: main at bf6fde86961edff82325289e54bb1e93d24c3c60, which contains 169e88d (`git merge-base --is-ancestor 169e88d HEAD` exit 0). No shared server and no walkthrough this pass (the brief allows a code read): I read Demo.tsx (and model.ts), then meta.json, then sources. I did not read build.md or any builder note. Independence: the v3 claim text and lesson text were written by demo-builder (169e88d); this pass wrote no claim or lesson text. Full per-claim notes start 'FC pass mail-34bf' in meta.json.

Scope: c3, c4, c7 (reset to unverified by 169e88d). c4 was disputed at v2 (2026-10-16-fact-check.md); checked here on the v3 wording only. Result: 3 of 3 verified, 0 disputed, 0 unverifiable.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own port of rates(): B reoffenders 23/32/41/50 at h = 5/20/35/50; false alarms 1.30/5.88/11.86/20.00%, misses 82.61/50.00/31.71/20.00%; A 20/20. Equal only at h = 50 (base rate 50% = A's). Reveal 'match/do' at 50, 'matched/did' elsewhere; trace strings 'Earlier at 32: false alarms 6%, misses 50%.' and 'Earlier at 50: both errors 20%.' match the code's conditions and rates(). |
| c4 | verified | Own derivation: FNR = b(1-f)/p, dFNR/df = -ab/p^2; FPR = (1-a)f/(1-p), dFPR/df = (1-a)(1-b)/(1-p)^2. Both flat only at (a,b) = (1,0) or (0,1), so otherwise equal errors force equal f and equal base rates. Grid (step 1/40, 2,687,960 pairs with different base rates): only exceptions a = 0, b = 1, the label wrong about everyone (high/low swapped perfect label). Learner sentence 'no high/low score that makes mistakes is honest with matching errors' holds for any label where high means higher risk. The scope to a two-level label removes FC 62's multi-level counterexample. |
| c7 | verified | p = 0.05 + 0.25f; refused share of repayers 0.7f/(0.95 - 0.25f), strictly increasing; node p = 5/10/15/20/25/30% gives 0/15.56/32.94/52.50/74.67/100%. '7 in 10 of them repay' = 1 - 0.30. Answer index 0 correct. |

Non-blocking notes (cm-ai owns text; no change needed to publish):
1. c4 claim text: 'unless the label makes no mistakes' omits the degenerate always-wrong label (a = 0, b = 1). Exact form: '... unless the label makes no mistakes (or is wrong about everyone)'. The learner text's 'high/low' already implies a > b.
2. c7 recall why: 'has more people labelled high' is true as a share; with unequal town sizes the head count need not be larger. 'a larger share of its people' would be exact.
3. c3 claim text paraphrases the reveal ('sits in the ringed rows'); the learner reads 'more of A is ringed, guilty or not', also true (A 40 + 10 ringed vs B 16 + 4 at h = 20).

Unrecorded-claim scan: predict 'Among A's non-reoffenders, the share flagged is higher than B's' is c2's numbers (20% vs 6% at the start value); no new unrecorded claims found in Demo.tsx.

Commands (scripts in the session scratchpad, reproduced here):
```
const N=100;const reo=(i,h)=>{const r=Math.floor(i/10);return i<h?(i+r)%5!==4:(i+r)%5===1;};
function rates(h){let re=0,fa=0,miss=0,rr=0;for(let i=0;i<N;i++){const r=reo(i,h);if(r)re++;if(i<h&&r)rr++;if(i<h&&!r)fa++;if(i>=h&&r)miss++;}return{h,re,rr,fa,inn:N-re,miss,faPct:+(100*fa/(N-re)).toFixed(2),missPct:+(100*miss/re).toFixed(2)};}
for(const h of [5,20,35,50]) console.log(JSON.stringify(rates(h)));
// c4: two-level label, a = P(re|high), b = P(re|low) same in both groups; flagged share f.
// Search for f1 != f2 (so p1 != p2) with equal FPR and FNR, excluding a=1,b=0.
const S=new Set();let ex=0,tested=0;const g=[];for(let k=0;k<=40;k++)g.push(k/40);
const err=(a,b,f)=>{const p=a*f+b*(1-f);return{p,fnr:p>0?b*(1-f)/p:NaN,fpr:p<1?(1-a)*f/(1-p):NaN};};
for(const a of g)for(const b of g){if(a===1&&b===0)continue;for(const f1 of g)for(const f2 of g){if(f1===f2)continue;const e1=err(a,b,f1),e2=err(a,b,f2);if(Math.abs(e1.p-e2.p)<1e-12)continue;tested++;
 const eq=(x,y)=>(Number.isNaN(x)&&Number.isNaN(y))||Math.abs(x-y)<1e-9; if(eq(e1.fnr,e2.fnr)&&eq(e1.fpr,e2.fpr)){ex++; S.add(a+","+b);}}}
console.log('c4 grid: pairs with different base rates tested',tested,'exceptions',ex);
// symbolic: dFNR/df = -a b / p^2 ; dFPR/df = (1-a)(1-b)/(1-p)^2
// c7: high 30% default, low 5%. f = high share, p = 0.05+0.25 f; refused repayers share = 0.7 f/(1-p)
for(const p of [0.05,0.10,0.15,0.20,0.25,0.30]){const f=(p-0.05)/0.25;console.log('p',p,'f',f.toFixed(3),'refusedRepayers',(100*0.7*f/(1-p)).toFixed(2)+'%');}
// monotone check
let prev=-1,mono=true;for(let f=0;f<=1.00001;f+=0.001){const v=0.7*f/(0.95-0.25*f);if(v<=prev)mono=false;prev=v;}console.log('c7 strictly increasing in f:',mono);
console.log("exception (a,b) pairs:",[...S]);
```
Output:
```
{"h":5,"re":23,"rr":4,"fa":1,"inn":77,"miss":19,"faPct":1.3,"missPct":82.61}
{"h":20,"re":32,"rr":16,"fa":4,"inn":68,"miss":16,"faPct":5.88,"missPct":50}
{"h":35,"re":41,"rr":28,"fa":7,"inn":59,"miss":13,"faPct":11.86,"missPct":31.71}
{"h":50,"re":50,"rr":40,"fa":10,"inn":50,"miss":10,"faPct":20,"missPct":20}
c4 grid: pairs with different base rates tested 2687960 exceptions 1482
p 0.05 f 0.000 refusedRepayers 0.00%
p 0.1 f 0.200 refusedRepayers 15.56%
p 0.15 f 0.400 refusedRepayers 32.94%
p 0.2 f 0.600 refusedRepayers 52.50%
p 0.25 f 0.800 refusedRepayers 74.67%
p 0.3 f 1.000 refusedRepayers 100.00%
c7 strictly increasing in f: true
exception (a,b) pairs: [ '0,1' ]
```
