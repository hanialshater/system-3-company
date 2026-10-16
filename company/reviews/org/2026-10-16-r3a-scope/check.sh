#!/usr/bin/env bash
# R3a scope test (evaluation steward ruling R3a, company/ops/dispatch-requests/2026-10-16-r3-quality.md).
# usage (from the main checkout): bash company/reviews/org/2026-10-16-r3a-scope/check.sh <server-sha> <src/demos/<d>/<slug>> [tip]
# exit 0 = the lesson as it is at <tip> renders exactly as it did at <server-sha>: a record on that server stands.
# exit 1 = it does not (the lesson waits for a rebuild). Evidence only; tools-lead may productise it.
set -u
S=$1; D=$2; T=${3:-origin/ccr-4c6c7654-ew9ko1}; HERE=$(dirname "$0")
# (1) lesson code: every file in the lesson dir except meta.json is byte-identical.
git diff --quiet "$S" "$T" -- "$D" ":!$D/meta.json" || { echo "R3a-1 fail: lesson files other than meta.json differ"; exit 1; }
# (2) meta.json: only record fields differ (evidence.*; claims[].status/note/checkedBy/checkedOn; claims appended as unverified).
node -e '
const {execSync:x}=require("child_process");const [S,T,f]=process.argv.slice(1);
const j=r=>{try{return JSON.parse(x(`git show ${r}:${f}`,{encoding:"utf8",stdio:["ignore","pipe","ignore"]}))}catch{return null}};
const a=j(S),b=j(T);if(!a||!b){console.log("R3a-2 fail: meta.json missing at one side");process.exit(1);}
const REC=new Set(["status","note","checkedBy","checkedOn"]);const bad=[];
for(const k of new Set([...Object.keys(a),...Object.keys(b)])){if(k==="evidence"||k==="claims")continue;if(JSON.stringify(a[k])!==JSON.stringify(b[k]))bad.push(k);}
const ac=a.claims||[],bc=b.claims||[];
ac.forEach(c=>{const d=bc.find(y=>y.id===c.id);if(!d){bad.push("removed "+c.id);return;}for(const k of new Set([...Object.keys(c),...Object.keys(d)]))if(!REC.has(k)&&JSON.stringify(c[k])!==JSON.stringify(d[k]))bad.push(c.id+"."+k);});
bc.filter(d=>!ac.find(c=>c.id===d.id)).forEach(d=>{if(d.status!=="unverified")bad.push("added "+d.id+" is not unverified");else console.log("note: claim appended (confirm the committer is an evaluator, not the builder):",d.id);});
if(bad.length){console.log("R3a-2 fail: meta.json lesson content differs:",bad.join(", "));process.exit(1);}' "$S" "$T" "$D/meta.json" || exit 1
# (3) shared files: each changed file must be outside the lesson's static/dynamic import closure AND not part of the shell.
CH=$(git diff --name-only "$S" "$T" -- src/kit src/components src/lib src/app public content next.config.ts next.config.mjs package-lock.json)
fail=0
for f in $CH; do
  case "$f" in
    src/kit/*|src/app/*) case "$f" in src/app/api/*) ;; *) echo "R3a-3 fail: shell file changed: $f"; fail=1; continue;; esac;;
    src/components/*/*|src/lib/*) ;;
    src/components/*) echo "R3a-3 fail: shared component changed: $f"; fail=1; continue;;
    *) echo "R3a-3 fail: build input changed: $f"; fail=1; continue;;
  esac
done
for line in $(node "$HERE/closure.mjs" "$T" "$D" $CH | grep '^IN-CLOSURE' | awk '{print $3}'); do echo "R3a-3 fail: in the lesson's import closure: $line"; fail=1; done
git diff --quiet "$S" "$T" -- package.json || { git diff "$S" "$T" -- package.json | grep '^[-+] ' | grep -qv '^[-+] *"\(test:\|verify\|check\|qa\|walkthrough\|metrics\|deploy\|company\)[^"]*":' && { echo "R3a-3 fail: package.json changed beyond scripts"; fail=1; }; }
[ $fail = 0 ] && echo "R3a pass ($D at $T renders as at $S)"; exit $fail
