#!/bin/sh
# validation only (W7): chibicc behind the Benchmark 8 compiler contract with W7's -D (-I dir, -D name[=value],
# --batch list | in.c -o out.s); chibicc takes -I and -D attached
D=$(dirname "$0"); FL=""
while [ $# -gt 0 ]; do
  case "$1" in
    -I) FL="$FL -I$2"; shift 2;;
    -D) FL="$FL -D$2"; shift 2;;
    --batch) LIST=$2; shift 2;;
    -o) OUT=$2; shift 2;;
    *) IN=$1; shift;;
  esac
done
if [ -n "$LIST" ]; then
  while read -r in out; do [ -n "$in" ] && "$D/chibicc" -S "-I$D/include" $FL -o "$out" "$in" 2>/dev/null; done < "$LIST"; exit 0
else
  exec "$D/chibicc" -S "-I$D/include" $FL -o "$OUT" "$IN"
fi
