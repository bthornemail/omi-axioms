#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mapfile -d '' active_sources < <(
  find coq -path coq/_archive -prune -o -name '*.v' -print0
)

forbidden='^[[:space:]]*(Axiom|Parameter|Conjecture|Admitted|admit|Abort)([[:space:]]|\.|$)'
if grep -En "$forbidden" "${active_sources[@]}"; then
  echo "strict Coq check failed: active proof assumptions found" >&2
  exit 1
fi

project_sources="$(
  awk '/^coq\/.*\.v$/' _CoqProject | sort
)"
active_manifest="$(
  printf '%s\n' "${active_sources[@]}" | sort
)"

if [[ "$project_sources" != "$active_manifest" ]]; then
  echo "strict Coq check failed: _CoqProject does not match active sources" >&2
  diff -u <(printf '%s\n' "$project_sources") <(printf '%s\n' "$active_manifest") || true
  exit 1
fi

./tools/check-proof-book.sh

mapfile -t misplaced_artifacts < <(
  find coq -type f \( \
    -name '*.vo' -o -name '*.vos' -o -name '*.vok' -o \
    -name '*.glob' -o -name '*.aux' -o -name '.*.aux' \
  \)
)
if (( ${#misplaced_artifacts[@]} != 0 )); then
  echo "strict Coq check failed: generated artifacts found under coq/" >&2
  printf '%s\n' "${misplaced_artifacts[@]}" >&2
  exit 1
fi

echo "strict Coq source check passed: ${#active_sources[@]} active modules"
