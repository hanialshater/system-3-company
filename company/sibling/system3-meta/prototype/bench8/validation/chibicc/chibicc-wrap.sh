#!/bin/sh
# validation only: chibicc behind the Benchmark 8 compiler contract (-I dir, --batch list | in.c -o out.s)
D=$(dirname "$0"); INC=""
while [ $# -gt 0 ]; do
  case "$1" in
    -I) INC="$INC -I$2"; shift 2;;
    --batch) LIST=$2; shift 2;;
    -o) OUT=$2; shift 2;;
    *) IN=$1; shift;;
  esac
done
if [ -n "$LIST" ]; then
  while read -r in out; do [ -n "$in" ] && "$D/chibicc" -S "-I$D/include" $INC -o "$out" "$in" 2>/dev/null; done < "$LIST"; exit 0
else
  exec "$D/chibicc" -S "-I$D/include" $INC -o "$OUT" "$IN"
fi
