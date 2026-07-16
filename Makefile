COQC ?= coqc
COQCHK ?= coqchk
COQDIR := coq
ARTIFACTDIR := artifacts/coq
COQARTIFACTS := ../$(ARTIFACTDIR)
COQFLAGS := -Q $(COQARTIFACTS) '' \
	-Q 00-foundations '' \
	-Q 01-incidence '' \
	-Q 02-closure '' \
	-Q 03-projection '' \
	-Q 04-execution ''

define compile_coq
	cd $(COQDIR) && $(COQC) $(COQFLAGS) \
		-o $(COQARTIFACTS)/$(notdir $(basename $(1))).vo \
		-dump-glob $(COQARTIFACTS)/$(notdir $(basename $(1))).glob \
		$(1)
endef

FOUNDATION_MODULES := \
	ProofStatusOrdersClaims FiniteBasicsEnumeratesSets \
	RationalVectorsDefineOperations GoldenFieldDefinesArithmetic \
	FiniteTruthTablesCountFunctions EarnedControlBandsEncode

CLOSURE_MODULES := ComplexityBoundsArity DiagonalGaugeCloses NullRingCloses

INCIDENCE_MODULES := \
	FiniteIncidenceBalancesFlags MiquelIncidenceBalancesFlags

PROJECTION_MODULES := \
	BQFBridgePreservesForms MetricProjectionPreservesBounds \
	PiProjectionPreservesWitnesses

EXECUTION_MODULES := \
	AtomicKernelDefinesReplay Delta16HasExactPeriodEight \
	SabbathProtocolRejectsRestAttestation OmiPiBridgeConnectsKernel \
	AuthorityPipelinePreservesDecision

CHECKED_MODULES := \
	$(FOUNDATION_MODULES) $(CLOSURE_MODULES) $(INCIDENCE_MODULES) \
	$(PROJECTION_MODULES) $(EXECUTION_MODULES)

proof: execution-proof

prepare-artifacts:
	mkdir -p $(ARTIFACTDIR)

foundations-proof: prepare-artifacts
	$(call compile_coq,00-foundations/ProofStatusOrdersClaims.v)
	$(call compile_coq,00-foundations/FiniteBasicsEnumeratesSets.v)
	$(call compile_coq,00-foundations/RationalVectorsDefineOperations.v)
	$(call compile_coq,00-foundations/GoldenFieldDefinesArithmetic.v)
	$(call compile_coq,00-foundations/FiniteTruthTablesCountFunctions.v)
	$(call compile_coq,00-foundations/EarnedControlBandsEncode.v)

closure-proof: foundations-proof
	$(call compile_coq,02-closure/ComplexityBoundsArity.v)
	$(call compile_coq,02-closure/DiagonalGaugeCloses.v)
	$(call compile_coq,02-closure/NullRingCloses.v)

incidence-proof: closure-proof
	$(call compile_coq,01-incidence/FiniteIncidenceBalancesFlags.v)
	$(call compile_coq,01-incidence/MiquelIncidenceBalancesFlags.v)

projection-proof: incidence-proof
	$(call compile_coq,03-projection/BQFBridgePreservesForms.v)
	$(call compile_coq,03-projection/MetricProjectionPreservesBounds.v)
	$(call compile_coq,03-projection/PiProjectionPreservesWitnesses.v)

execution-proof: projection-proof
	$(call compile_coq,04-execution/AtomicKernelDefinesReplay.v)
	$(call compile_coq,04-execution/Delta16HasExactPeriodEight.v)
	$(call compile_coq,04-execution/SabbathProtocolRejectsRestAttestation.v)
	$(call compile_coq,04-execution/OmiPiBridgeConnectsKernel.v)
	$(call compile_coq,04-execution/AuthorityPipelinePreservesDecision.v)

proof-strict:
	./tools/check-strict-coq.sh
	$(MAKE) proof
	cd $(COQDIR) && $(COQCHK) $(COQFLAGS) $(CHECKED_MODULES)

proof-book-check:
	./tools/check-proof-book.sh

proof-status:
	@printf 'active_sources=%s\n' "$$(find $(COQDIR) -path '$(COQDIR)/_archive' -prune -o -name '*.v' -print | wc -l)"
	@printf 'archived_sources=%s\n' "$$(find $(COQDIR)/_archive -name '*.v' -print | wc -l)"
	@printf 'forbidden_active=%s\n' "$$(find $(COQDIR) -path '$(COQDIR)/_archive' -prune -o -name '*.v' -print0 | xargs -0 grep -El '^[[:space:]]*(Axiom|Parameter|Conjecture|Admitted|admit|Abort)\\b' | wc -l)"
	@printf 'artifact_files=%s\n' "$$(find $(ARTIFACTDIR) -type f ! -name '.gitkeep' | wc -l)"

polyharmonic-proof: incidence-proof

clean:
	find $(COQDIR) -type f \( \
		-name '*.vo' -o -name '*.vos' -o -name '*.vok' -o \
		-name '*.glob' -o -name '*.aux' -o -name '.*.aux' -o \
		-name '*.vio' -o -name '*.v.beautified' -o \
		-name '*.required_vo' -o -name '*.ml' -o -name '*.mli' \) -delete
	rm -f $(COQDIR)/.lia.cache $(COQDIR)/.nia.cache $(COQDIR)/.nra.cache
	find $(ARTIFACTDIR) -mindepth 1 ! -name '.gitkeep' -delete

.PHONY: proof proof-strict proof-status foundations-proof closure-proof \
	incidence-proof projection-proof execution-proof polyharmonic-proof \
	proof-book-check prepare-artifacts clean
