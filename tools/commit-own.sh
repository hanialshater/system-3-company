#!/usr/bin/env bash
# Commit only the paths you name, and refuse if the shared index holds anyone else's staged work.
# Board W-1200 (retro 2026-10-16 H5/C6(a)); batch company/ops/dispatch-requests/2026-10-16-r2-tools.md#B3.
# Usage:
#   tools/commit-own.sh "<message>" <path> [<path> ...]
# Outside a merge: refuses if any staged path is outside the list, else runs `git commit -m <msg> -- <paths>`.
# During a merge (MERGE_HEAD exists, conflict resolved): refuses if any staged path is neither listed nor
#   changed on the merged branch, else commits the merge with -m <msg>.
# Listed paths are staged (git add -A -- <paths>) only after the check passes, so new files work.
# Sets S3_COMMIT_PATHS for tools/git-hooks/pre-commit (when installed) so the hook checks the same list.
# Extra env: GIT_AUTHOR_NAME etc. pass through to git unchanged.
set -euo pipefail

usage() { sed -n 2,11p "$0" >&2; exit 2; }
[ $# -ge 2 ] || usage
msg=$1; shift
case "$msg" in -*) echo "commit-own: the first argument is the message; got an option ($msg)" >&2; usage ;; esac
[ -n "$msg" ] || usage
for p in "$@"; do
  case "$p" in -*) echo "commit-own: options are not accepted after the message ($p); name paths only" >&2; exit 2 ;; esac
done

G() { git -c core.quotePath=false "$@"; }
gitdir=$(G rev-parse --absolute-git-dir)
merging=0; [ -f "$gitdir/MERGE_HEAD" ] && merging=1

all=$(G diff --cached --name-only --no-renames | sort -u)
mine=$(G diff --cached --name-only --no-renames -- "$@" | sort -u)
allowed=$mine
if [ $merging -eq 1 ]; then
  incoming=$(G diff --name-only --no-renames HEAD...MERGE_HEAD | sort -u)
  allowed=$(printf '%s\n%s\n' "$mine" "$incoming" | sed '/^$/d' | sort -u)
fi
foreign=$(comm -23 <(printf '%s\n' "$all" | sed '/^$/d') <(printf '%s\n' "$allowed" | sed '/^$/d'))

if [ -n "$foreign" ]; then
  {
    echo "commit-own: refused. The index holds staged paths you did not name:"
    printf '%s\n' "$foreign" | sed 's/^/    /'
    if [ $merging -eq 1 ]; then
      echo "  They are not changes from the merged branch either, so the merge commit would sweep them in (as 2e2ccd9 did)."
      echo "  Do not unstage them. Wait for the owner of the listed paths, then run this again (a merge cannot be a partial commit)."
    else
      echo "  They are someone else's work in flight in the shared index. Do not unstage them."
      echo "  Wait for their owner, or (outside a merge) \`git commit -m \"<msg>\" -- <paths>\` commits only your paths."
    fi
  } >&2
  exit 1
fi

# Only now stage the listed paths (new files included: `git commit -- <path>` does not take untracked files, and
# a merge cannot be a partial commit). They are yours by naming them; nothing else is staged or unstaged, and a
# refusal above leaves the index exactly as it was.
G add -A -- "$@"

export S3_COMMIT_PATHS
S3_COMMIT_PATHS=$(printf '%s\n' "$@")
if [ $merging -eq 1 ]; then
  G commit -m "$msg"
else
  G commit -m "$msg" -- "$@"
fi
