# BUSYBOX-PROOF-INDEX

The BusyBox P1 checks, built from `busybox/catalog/`. Each check calls real
`busybox` applets and exits nonzero when its claim does not hold.

| tag | title | category | applets | holds |
|-----|-------|----------|---------|-------|
| `CATID` | cat is a byte identity | carrier | cat cmp wc tr | ✓ |
| `COMMUTE` | the encoding switch and the direction switch commute | switches | tr rev | ✓ |
| `FANO` | every 7-bit margin state resolves to one of the 16 Fano constants in at most two steps | fano | sh-arithmetic | ✓ |
| `FRAME` | svg-switch toggles the payload, never the frame; twice is identity | literal | grep cmp | ✓ |
| `GROW` | append extends the file; the complement of truncate | redirection | cat wc tr | ✓ |
| `LIST` | an applet's name is the leaf of its install path | frame | tr wc sed cmp | ✓ |
| `NOFIX` | the self-append loop has no fixed point | awareness | cat wc tr | ✓ |
| `REV2` | rev is its own inverse | direction | rev | ✓ |
| `ROT2` | rot13 (tr) is its own inverse | encoding | tr | ✓ |
| `TETRA` | XOR byte-distance is a metric — the tetrahedron's six edges | distance | od tr grep paste | ✓ |
| `TRUNC` | redirection truncates the file before the command runs | redirection | cat wc tr | ✓ |

11 of 11 hold.
