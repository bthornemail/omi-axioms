(* extract.v — Generate verified Haskell validator from Coq proofs *)
(* Run: coqc -R theories SabbathProtocol theories/extract.v          *)

Require Import SabbathProtocol.SabbathProtocol.
Require Extraction.

Extraction Language Haskell.

(* Output to extracted/ directory *)
Extraction "extracted/SabbathValidator.hs"
  SabbathProtocol.valid_trace
  SabbathProtocol.valid_trace_strict
  SabbathProtocol.suspend_positions
  SabbathProtocol.final_mode
  SabbathProtocol.step
  SabbathProtocol.step_strict.
