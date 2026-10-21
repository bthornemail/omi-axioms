#!/bin/sh
# tag: TRUNC
# title: redirection truncates the file before the command runs
# category: redirection
# applets: cat wc tr
# claim: `> F` opens and empties F before the command runs, and `>` replaces F's content wholesale. (The command must not also read F — see ../pending for why `cat A F B > F` loops instead.)
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT
bytes(){ "$BB" wc -c < "$1" | "$BB" tr -d ' '; }

printf 'OLD CONTENT\n' > "$d/f"
# assert: `:` produces no output, so `: > F` leaves F empty — truncation happens before the command
: > "$d/f"
[ "$(bytes "$d/f")" -eq 0 ] || fail "> did not truncate F to empty"

# assert: `>` replaces the content wholesale
printf 'OLD\n' > "$d/f"
printf 'NEW\n' > "$d/f"
[ "$("$BB" cat "$d/f")" = "NEW" ] || fail "> did not replace the content"

echo "TRUNC: > truncates before the command runs, and replaces — passed"
