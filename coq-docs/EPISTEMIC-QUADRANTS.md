# Epistemic Quadrants for Proof Documentation

Every migrated proof page separates established theorem content from open
interpretation and integration risk.

## Known Knowns

Claims checked by Coq in the addressed `.v` file. These must name concrete
theorem anchors and must not exceed what those theorems establish.

## Known Unknowns

Questions or obligations that the proof intentionally leaves open. Typical
examples include geometric realization, protocol integration, completeness,
and runtime acceptance.

## Unknown Knowns

Assumptions, encodings, enumeration choices, and imported lemmas that are
already carrying part of the argument but may not yet be prominent in canon
documentation.

## Unknown Unknowns

Risks not bounded by the current theorem surface, including encoding drift,
unreviewed downstream reinterpretation, and accidental promotion of a
projection into authority.

## Doctrine Boundary

Coq proves bounded propositions. Canon may name those propositions.
OMI-Lisp may declare them. OMI-ISA may provide executable witnesses. Receipt
may record an accepted result after the proper validation path.

The Markdown mirror explains proof authority; it is not proof authority.
