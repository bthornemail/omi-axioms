COQC ?= coqc
COQCHK ?= coqchk
COQDIR := coq
ARTIFACTDIR := artifacts/coq
COQARTIFACTS := ../$(ARTIFACTDIR)
COQFLAGS := -Q . OmiCore \
	-Q $(COQARTIFACTS) '' \
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
	GoldenField06 phi_proof GoldenQuaternion GoldenQuaternion07 \
	FiniteTruthTablesCountFunctions OminoSECDEDCell BitmaskClosure03 \
	GaugeTable05 IdentityChain OMI_bialgebra OminoAxiomaticSovereignty \
	PinchBranchLocalForms14 Polynomials EarnedControlBandsEncode

CLOSURE_MODULES := \
	ComplexityBoundsArity DiagonalGaugeCloses NullRingCloses \
	PowerClosureGate

INCIDENCE_MODULES := \
	FiniteIncidenceBalancesFlags FanoIncidence FanoIncidence02 \
	Fano_PCG IcosianSpan IcosianUnits IcosianUnits08 \
	MiquelIncidenceBalancesFlags OmiRingIcosian OmiRingQuotation

PROJECTION_MODULES := \
	BQFBridgePreservesForms MetricProjectionPreservesBounds \
	PiProjectionPreservesWitnesses E8RootsEnumerate240 CyclicClock \
	E8Roots E8Roots11 HopfProjection13 WeylReflection WeylReflection12

EXECUTION_MODULES := \
	AtomicKernelDefinesReplay Delta16HasExactPeriodEight \
	AAL AtomicKernelComputesDelta AtomicKernelReplayDeterministic \
	SabbathProtocolRejectsRestAttestation OmiPiBridgeConnectsKernel \
	AuthorityPipelinePreservesDecision KERNEL KarnaughReduction04 \
	OmiRingStep09 OminoArchivePromotionRegistry OminoFiveBinarySubstrate \
	OminoParallelSpatialScaling ProofRegistry15 RelationalQuotation10 \
	coalgebraic_bisimulation delta_orbit_theory extract \
	functorial_semantics test_dd_show verified_execution

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
	$(call compile_coq,00-foundations/GoldenField06.v)
	$(call compile_coq,00-foundations/phi_proof.v)
	$(call compile_coq,00-foundations/GoldenQuaternion.v)
	$(call compile_coq,00-foundations/GoldenQuaternion07.v)
	$(call compile_coq,00-foundations/FiniteTruthTablesCountFunctions.v)
	$(call compile_coq,00-foundations/OminoSECDEDCell.v)
	$(call compile_coq,00-foundations/BitmaskClosure03.v)
	$(call compile_coq,00-foundations/GaugeTable05.v)
	$(call compile_coq,00-foundations/IdentityChain.v)
	$(call compile_coq,00-foundations/OMI_bialgebra.v)
	$(call compile_coq,00-foundations/OminoAxiomaticSovereignty.v)
	$(call compile_coq,00-foundations/PinchBranchLocalForms14.v)
	$(call compile_coq,00-foundations/Polynomials.v)
	$(call compile_coq,00-foundations/EarnedControlBandsEncode.v)

closure-proof: foundations-proof
	$(call compile_coq,02-closure/ComplexityBoundsArity.v)
	$(call compile_coq,02-closure/DiagonalGaugeCloses.v)
	$(call compile_coq,02-closure/NullRingCloses.v)
	$(call compile_coq,02-closure/PowerClosureGate.v)

incidence-proof: closure-proof
	$(call compile_coq,01-incidence/FiniteIncidenceBalancesFlags.v)
	$(call compile_coq,01-incidence/FanoIncidence.v)
	$(call compile_coq,01-incidence/FanoIncidence02.v)
	$(call compile_coq,01-incidence/Fano_PCG.v)
	$(call compile_coq,01-incidence/IcosianSpan.v)
	$(call compile_coq,01-incidence/IcosianUnits.v)
	$(call compile_coq,01-incidence/IcosianUnits08.v)
	$(call compile_coq,01-incidence/MiquelIncidenceBalancesFlags.v)
	$(call compile_coq,01-incidence/OmiRingIcosian.v)
	$(call compile_coq,01-incidence/OmiRingQuotation.v)

projection-proof: incidence-proof
	$(call compile_coq,03-projection/BQFBridgePreservesForms.v)
	$(call compile_coq,03-projection/MetricProjectionPreservesBounds.v)
	$(call compile_coq,03-projection/PiProjectionPreservesWitnesses.v)
	$(call compile_coq,03-projection/E8RootsEnumerate240.v)
	$(call compile_coq,03-projection/CyclicClock.v)
	$(call compile_coq,03-projection/E8Roots.v)
	$(call compile_coq,03-projection/E8Roots11.v)
	$(call compile_coq,03-projection/HopfProjection13.v)
	$(call compile_coq,03-projection/WeylReflection.v)
	$(call compile_coq,03-projection/WeylReflection12.v)

execution-proof: projection-proof
	$(call compile_coq,04-execution/AtomicKernelDefinesReplay.v)
	$(call compile_coq,04-execution/Delta16HasExactPeriodEight.v)
	$(call compile_coq,04-execution/AAL.v)
	$(call compile_coq,04-execution/AtomicKernelComputesDelta.v)
	$(call compile_coq,04-execution/AtomicKernelReplayDeterministic.v)
	$(call compile_coq,04-execution/SabbathProtocolRejectsRestAttestation.v)
	$(call compile_coq,04-execution/OmiPiBridgeConnectsKernel.v)
	$(call compile_coq,04-execution/AuthorityPipelinePreservesDecision.v)
	$(call compile_coq,04-execution/KERNEL.v)
	$(call compile_coq,04-execution/KarnaughReduction04.v)
	$(call compile_coq,04-execution/OmiRingStep09.v)
	$(call compile_coq,04-execution/OminoArchivePromotionRegistry.v)
	$(call compile_coq,04-execution/OminoFiveBinarySubstrate.v)
	$(call compile_coq,04-execution/OminoParallelSpatialScaling.v)
	$(call compile_coq,04-execution/ProofRegistry15.v)
	$(call compile_coq,04-execution/RelationalQuotation10.v)
	$(call compile_coq,04-execution/coalgebraic_bisimulation.v)
	$(call compile_coq,04-execution/delta_orbit_theory.v)
	$(call compile_coq,04-execution/extract.v)
	$(call compile_coq,04-execution/functorial_semantics.v)
	$(call compile_coq,04-execution/test_dd_show.v)
	$(call compile_coq,04-execution/verified_execution.v)

proof-registry-lock: SKILLS.md _CoqProject Makefile coq/README.md coq-docs/ARCHIVE.md
	@rg -q 'coqc -Q \. OmiCore' SKILLS.md
	@rg -q 'Definition mask16 \(x : N\) : N := N\.land x 0xFFFF\.' SKILLS.md
	@rg -q 'Definition r0 \(x : N\) : N := N\.lxor x 0xAAAA\.' SKILLS.md
	@rg -q '00-foundations' SKILLS.md
	@rg -q '01-incidence' SKILLS.md
	@rg -q '02-closure' SKILLS.md
	@rg -q '03-projection' SKILLS.md
	@rg -q '04-execution' SKILLS.md
	@rg -q -- '-Q \. OmiCore' Makefile
	@rg -q -- '-Q coq OmiCore' _CoqProject
	@printf '%s\n' "Coq registry lock verified"

proof-strict: proof-registry-lock
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

.PHONY: proof proof-strict proof-registry-lock proof-status foundations-proof closure-proof \
	incidence-proof projection-proof execution-proof polyharmonic-proof \
	proof-book-check prepare-artifacts clean
