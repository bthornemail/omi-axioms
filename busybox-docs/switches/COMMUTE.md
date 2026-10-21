# COMMUTE — the encoding switch and the direction switch commute

- **status:** P1
- **category:** switches
- **applets:** tr, rev
- **owner:** `busybox/catalog/B-COMMUTE.sh`
- **result:** holds

## Claim

a per-character map (tr) and a reversal (rev) commute — tr then rev equals rev then tr — because a per-character map does not depend on position.

## Statements

- tr|rev == rev|tr for several strings
