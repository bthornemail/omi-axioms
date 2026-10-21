# TETRA — XOR byte-distance is a metric — the tetrahedron's six edges

- **status:** P1
- **category:** distance
- **applets:** od, tr, grep, paste
- **owner:** `busybox/catalog/B-TETRA.sh`
- **result:** holds

## Claim

over four equal-length vertices (WORD GOD OF of), each of the six unordered pairs has an XOR mask whose popcount is a Hamming distance, and that distance obeys the three metric laws: d(A,A)=0 (identity — distance 0 is only a copy, the mirror), d(A,B)=d(B,A) (symmetry), d(A,C)<=d(A,B)+d(B,C) (triangle). The count of six edges is a consequence of four vertices, not evidence of anything. (The author's tetra-mask, as a check that can say no.)

## Statements

- identity — a vertex against itself is distance 0 (a copy, the mirror)
- symmetry — d(A,B) = d(B,A) over all six unordered pairs
- triangle inequality — d(A,C) <= d(A,B) + d(B,C) for all triples
