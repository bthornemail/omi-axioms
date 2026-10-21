# FRAME — svg-switch toggles the payload, never the frame; twice is identity

- **status:** P1
- **category:** literal
- **applets:** grep, cmp
- **owner:** `busybox/catalog/B-FRAME.sh`
- **result:** holds

## Claim

scripts/svg-switch --rev reverses only the content of <text>/<tspan>, leaves tags and attributes byte-identical, and applied twice returns the exact original. Frame vs payload = literal vs reading.

## Statements

- the frame is untouched — the text tag with its attributes survives byte-for-byte
- a non-text element is untouched
- the payload did change — direction toggled
- twice is the identity — byte-identical to the original
