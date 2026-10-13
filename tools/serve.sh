#!/usr/bin/env bash
# Start or stop a local `next start` server by port, tracked with a pid file (never pkill -f: the
# pattern matches the shell running it — 2026-10-13 retro). Usage:
#   tools/serve.sh start <port> <distDir> [ENV=VAL ...]   e.g. tools/serve.sh start 3399 .next-wt4 HQ_PUBLIC=1
#   tools/serve.sh stop <port>
#   tools/serve.sh status
cd "$(dirname "$0")/.." || exit 1
RUN=.serve; mkdir -p "$RUN"
cmd=$1; port=$2
case "$cmd" in
  start)
    dist=${3:-.next}; shift 3 2>/dev/null
    if [ -f "$RUN/$port.pid" ] && kill -0 "$(cat "$RUN/$port.pid")" 2>/dev/null; then echo "port $port already served (pid $(cat "$RUN/$port.pid"))"; exit 0; fi
    want=$(find src/demos -name meta.json | wc -l); have=$(ls "$dist"/server/app/d/*.html 2>/dev/null | wc -l)
    [ "$have" -ne "$want" ] && echo "warning: $dist has $have lesson pages, the tree has $want (stale build?)"
    env "$@" NEXT_DIST_DIR="$dist" setsid npx next start -p "$port" >"$RUN/$port.log" 2>&1 &
    echo $! >"$RUN/$port.pid"; sleep 5
    curl -s -o /dev/null -w "port $port: HTTP %{http_code}\n" "localhost:$port/" ;;
  stop)
    [ -f "$RUN/$port.pid" ] || { echo "no pid file for port $port"; exit 1; }
    pid=$(cat "$RUN/$port.pid"); kill -- -"$pid" 2>/dev/null || kill "$pid" 2>/dev/null
    rm -f "$RUN/$port.pid"; echo "stopped port $port (pid group $pid)" ;;
  status)
    for f in "$RUN"/*.pid; do [ -e "$f" ] || continue; p=$(basename "$f" .pid); kill -0 "$(cat "$f")" 2>/dev/null && echo "$p up (pid $(cat "$f"))" || echo "$p dead"; done ;;
  *) sed -n 2,6p "$0" ;;
esac
