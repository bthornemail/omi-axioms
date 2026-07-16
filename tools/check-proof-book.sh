#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

book="coq-docs/OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md"

if [[ ! -f "$book" ]]; then
  echo "proof-book check failed: missing $book" >&2
  exit 1
fi

mapfile -d '' active_sources < <(
  find coq -path coq/_archive -prune -o -name '*.v' -print0
)

missing=0
theorem_count=0

for source in "${active_sources[@]}"; do
  if ! grep -Fq "\`$source\`" "$book"; then
    echo "proof-book check failed: missing active module $source" >&2
    missing=1
  fi

  while IFS= read -r theorem; do
    [[ -n "$theorem" ]] || continue
    theorem_count=$((theorem_count + 1))
    if ! grep -Fq "\`$theorem\`" "$book"; then
      echo "proof-book check failed: missing theorem $theorem ($source)" >&2
      missing=1
    fi
  done < <(
    sed -nE \
      's/^(Theorem|Lemma|Corollary)[[:space:]]+([^[:space:]:]+).*/\2/p' \
      "$source"
  )
done

if (( missing != 0 )); then
  exit 1
fi

echo "proof-book coverage passed: ${#active_sources[@]} modules, $theorem_count theorem anchors"

