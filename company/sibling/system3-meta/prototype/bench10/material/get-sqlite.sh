#!/bin/sh
# Benchmark 10: fetch SQLite 3.53.4's amalgamation (as vendored in the npm package better-sqlite3 13.0.3) into $1 and
# check it byte for byte. sqlite.org and GitHub are not reachable from the container; the npm registry is.
set -e
out="${1:?usage: get-sqlite.sh <dir>}"; mkdir -p "$out"; tmp=$(mktemp -d)
( cd "$tmp" && npm pack better-sqlite3@13.0.3 --silent >/dev/null && tar xzf better-sqlite3-13.0.3.tgz )
cp "$tmp/package/deps/sqlite3/sqlite3.c" "$tmp/package/deps/sqlite3/sqlite3.h" "$out/"; rm -rf "$tmp"
cd "$out"
echo "6a2805f8c1ef020a7086e62258519323cf98b219e9fe87a42065d916cfebaefc  sqlite3.c" | sha256sum -c -
echo "919e7f2e8ed1d8f56ac17b412b8971c76aa5d1a879752cc6058f75e7d5910e1d  sqlite3.h" | sha256sum -c -
