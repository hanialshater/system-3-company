#!/bin/bash
# AMD-001 (c2) + rider R1 side-by-side and planted violations. Works on a COPY; never touches the given tree.
#   bash side-by-side.sh <repo> pre    before ratification: copy, apply (c2)+R1 with the reference split generator
#   bash side-by-side.sh <repo> post   after the applying commit: copy the applied tree as it is
# Prints PASS/FAIL per expectation and exits non-zero if any expectation fails.
set -u
REPO=$(cd "$1" && pwd); MODE=${2:-pre}; HERE=$(cd "$(dirname "$0")" && pwd)
W=$(mktemp -d "${TMPDIR:-/tmp}/amd001c2.XXXXXX"); mkdir -p "$W/base" "$W/new"
copy() { (cd "$REPO" && tar --exclude=./node_modules --exclude=./.next --exclude=./artifacts --exclude=./.git --exclude=./.claude/worktrees -cf - .) | (cd "$1" && tar xf -); }
copy "$W/base"; copy "$W/new"
counts() { node tools/company.mjs check 2>&1 | grep -oE '[0-9]+ lessons, [0-9]+ claims' ; }
BAD=0; expect() { if [ "$2" = "$3" ]; then echo "PASS $1"; else echo "FAIL $1 (wanted: $3; got: $2)"; BAD=1; fi; }
BASE=$(cd "$W/base" && counts); echo "baseline: ${BASE:-check failed}"
applied() { grep -q 'registryFiles(demos)' tools/company.mjs && grep -q 'Rider R1 (W-946)' tools/company.mjs; }
cd "$W/new"
if [ "$MODE" = post ] && ! applied; then echo "ABORT: post mode, but tools/company.mjs does not contain (c2)+R1"; rm -rf "$W"; exit 2; fi
if [ "$MODE" = pre ]; then
  cp "$HERE/registry.one-file.reference.mjs" tools/registry.mjs; node "$HERE/apply-c2-r1.mjs" "$W/new" >/dev/null || { echo "ABORT: (c2) hunks do not apply to this tree"; exit 2; }
  grep -q "registryFiles(demos)" tools/company.mjs || { echo "ABORT: (c2) not applied"; exit 2; }
  node tools/company.mjs registry >/dev/null
  expect "(c2) alone regenerates registry.generated.ts byte-identical" "$(cmp -s src/demos/registry.generated.ts "$W/base/src/demos/registry.generated.ts" && echo same)" same
  expect "(c2) alone: check passes with the same counts" "$(counts)" "$BASE"
  rm -rf "$W/new"; mkdir -p "$W/new"; copy "$W/new"; cd "$W/new"
  cp "$HERE/registry.one-file.reference.mjs" tools/registry.mjs; node "$HERE/apply-c2-r1.mjs" "$W/new" rider >/dev/null || { echo "ABORT: (c2)+R1 hunks do not apply to this tree"; exit 2; }
  applied || { echo "ABORT: R1 not applied"; exit 2; }
  expect "R1 with the one-file generator fails invariant 5 (so R1 must land with the split)" "$(node tools/company.mjs check 2>&1 | grep -c 'must not hold both metas and loaders')" 1
  cp "$HERE/registry.split.reference.mjs" tools/registry.mjs; rm -f src/demos/*.generated.ts; node tools/company.mjs registry >/dev/null
fi
expect "(c2)+R1 with the split: check passes with the same counts" "$(counts)" "$BASE"
cp tools/registry.mjs tools/registry-real.mjs
tamper() { cat > tools/registry.mjs <<EOF
import { registryFiles as real } from "./registry-real.mjs";
export function registryFiles(demos) { const f = real(demos); const K = Object.keys(f); const I = K.find((k) => /index/.test(k)), L = K.find((k) => /loaders/.test(k)); $2; return f; }
EOF
  rm -f src/demos/*.generated.ts; node tools/company.mjs registry >/dev/null
  local out; out=$(node tools/company.mjs check 2>&1 | grep '^error' | grep -c "$3"); expect "$1" "$([ "$out" -ge 1 ] && echo caught || echo missed)" "${4:-caught}"; }
tamper "T1 loader pointed at another lesson" 'f[L]=f[L].replace(/("[^"]+": \(\) => import\(")[^"]+(")/, (m,a,b)=>a+f[L].match(/import\("([^"]+)"\)/g)[1].slice(8,-2)+b)' "not that lesson's Demo"
tamper "T2 metas merged back into the loaders file" 'f[L]=f[I]+f[L]' "must not hold both"
tamper "T3 extra computed import()" 'f[L]=f[L]+"export const x = (s: string) => import(\`./\${s}/Demo\`);\n"' "not a lesson loader"
tamper "T4 second loader key for one Demo" 'f[L]=f[L].replace(/("[^"]+")(: \(\) => import\("[^"]+"\),\n)/, (m,k,r)=>m+"  \"zz-extra\""+r)' "exactly one loader"
tamper "T5 one loader dropped" 'f[L]=f[L].replace(/^  "[^"]+": \(\) => import.*\n/m,"")' "exactly one loader"
tamper "T6 status literal in generated code" 'f[I]=f[I].replace("[m0 as DemoMeta", "[{...m0, status: \"published\"} as DemoMeta")' "status literal"
tamper "T7 one meta import dropped" 'f[I]=f[I].replace(/^import m0 from.*\n/m,"")' "not imported from its meta.json"
tamper "T8 registry.generated.ts kept as a re-export of both" 'f["src/demos/registry.generated.ts"]="export * from \"./index.generated\";\nexport * from \"./loaders.generated\";\n"' "another generated file"
tamper "T9 KNOWN GAP: meta imported but left out of demos[] (expected missed)" 'f[I]=f[I].replace("[m0 as DemoMeta, ","[")' "." missed
cp tools/registry-real.mjs tools/registry.mjs; rm -f tools/registry-real.mjs src/demos/*.generated.ts; node tools/company.mjs registry >/dev/null
expect "restored generator passes again" "$(counts)" "$BASE"
rm -rf "$W"; exit $BAD
