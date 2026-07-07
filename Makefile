COQC=coqc
COQDIR=coq
COQFLAGS=-R . ''

PROOF_TARGETS= \
	$(COQDIR)/AtomicKernel.vo \
	$(COQDIR)/AtomicKernelVNext.vo \
	$(COQDIR)/DiagonalClosure.vo \
	$(COQDIR)/FiniteIncidence.vo \
	$(COQDIR)/BQFBridge.vo \
	$(COQDIR)/MetricProjection.vo \
	$(COQDIR)/PiProjection.vo \
	$(COQDIR)/OMI_Exports.vo \
	$(COQDIR)/omi_pi_proof.vo \
	$(COQDIR)/omi_pi_bridge.vo \
	$(COQDIR)/delta_orbit_theory.vo \
	$(COQDIR)/functorial_semantics.vo \
	$(COQDIR)/coalgebraic_bisimulation.vo \
	$(COQDIR)/OMI_bialgebra.vo \
	$(COQDIR)/verified_execution.vo \
	$(COQDIR)/VecQ.vo \
	$(COQDIR)/GoldenField.vo \
	$(COQDIR)/GoldenQuaternion.vo \
	$(COQDIR)/IcosianUnits.vo \
	$(COQDIR)/IcosianSpan.vo \
	$(COQDIR)/E8Roots.vo \
	$(COQDIR)/WeylReflection.vo \
	$(COQDIR)/FanoIncidence.vo \
	$(COQDIR)/OmiRingIcosian.vo \
	$(COQDIR)/OmiRingQuotation.vo \
	$(COQDIR)/ProofStatus00.vo \
	$(COQDIR)/FiniteBasics01.vo \
	$(COQDIR)/FanoIncidence02.vo \
	$(COQDIR)/BitmaskClosure03.vo \
	$(COQDIR)/KarnaughReduction04.vo \
	$(COQDIR)/GaugeTable05.vo \
	$(COQDIR)/GoldenField06.vo \
	$(COQDIR)/GoldenQuaternion07.vo \
	$(COQDIR)/IcosianUnits08.vo \
	$(COQDIR)/OmiRingStep09.vo \
	$(COQDIR)/RelationalQuotation10.vo \
	$(COQDIR)/E8Roots11.vo \
	$(COQDIR)/WeylReflection12.vo \
	$(COQDIR)/HopfProjection13.vo \
	$(COQDIR)/PinchBranchLocalForms14.vo \
	$(COQDIR)/ProofRegistry15.vo

proof: $(PROOF_TARGETS)

$(COQDIR)/AtomicKernel.vo: $(COQDIR)/AtomicKernel.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) AtomicKernel.v

$(COQDIR)/AtomicKernelVNext.vo: $(COQDIR)/AtomicKernelVNext.v $(COQDIR)/AtomicKernel.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) AtomicKernelVNext.v

$(COQDIR)/DiagonalClosure.vo: $(COQDIR)/DiagonalClosure.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) DiagonalClosure.v

$(COQDIR)/FiniteIncidence.vo: $(COQDIR)/FiniteIncidence.v $(COQDIR)/DiagonalClosure.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) FiniteIncidence.v

$(COQDIR)/BQFBridge.vo: $(COQDIR)/BQFBridge.v $(COQDIR)/DiagonalClosure.vo $(COQDIR)/FiniteIncidence.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) BQFBridge.v

$(COQDIR)/MetricProjection.vo: $(COQDIR)/MetricProjection.v $(COQDIR)/FiniteIncidence.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) MetricProjection.v

$(COQDIR)/PiProjection.vo: $(COQDIR)/PiProjection.v $(COQDIR)/DiagonalClosure.vo $(COQDIR)/BQFBridge.vo $(COQDIR)/MetricProjection.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) PiProjection.v

$(COQDIR)/OMI_Exports.vo: $(COQDIR)/OMI_Exports.v $(COQDIR)/DiagonalClosure.vo $(COQDIR)/FiniteIncidence.vo $(COQDIR)/BQFBridge.vo $(COQDIR)/MetricProjection.vo $(COQDIR)/PiProjection.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) OMI_Exports.v

$(COQDIR)/omi_pi_proof.vo: $(COQDIR)/omi_pi_proof.v $(COQDIR)/OMI_Exports.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) omi_pi_proof.v

$(COQDIR)/omi_pi_bridge.vo: $(COQDIR)/omi_pi_bridge.v $(COQDIR)/AtomicKernelVNext.vo $(COQDIR)/DiagonalClosure.vo $(COQDIR)/PiProjection.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) omi_pi_bridge.v

$(COQDIR)/delta_orbit_theory.vo: $(COQDIR)/delta_orbit_theory.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) delta_orbit_theory.v

$(COQDIR)/functorial_semantics.vo: $(COQDIR)/functorial_semantics.v $(COQDIR)/delta_orbit_theory.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) functorial_semantics.v

$(COQDIR)/coalgebraic_bisimulation.vo: $(COQDIR)/coalgebraic_bisimulation.v $(COQDIR)/delta_orbit_theory.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) coalgebraic_bisimulation.v

$(COQDIR)/OMI_bialgebra.vo: $(COQDIR)/OMI_bialgebra.v $(COQDIR)/delta_orbit_theory.vo $(COQDIR)/functorial_semantics.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) OMI_bialgebra.v

$(COQDIR)/verified_execution.vo: $(COQDIR)/verified_execution.v $(COQDIR)/delta_orbit_theory.vo $(COQDIR)/functorial_semantics.vo $(COQDIR)/coalgebraic_bisimulation.vo $(COQDIR)/OMI_bialgebra.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) verified_execution.v

$(COQDIR)/VecQ.vo: $(COQDIR)/VecQ.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) VecQ.v

$(COQDIR)/GoldenField.vo: $(COQDIR)/GoldenField.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) GoldenField.v

$(COQDIR)/GoldenQuaternion.vo: $(COQDIR)/GoldenQuaternion.v $(COQDIR)/GoldenField.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) GoldenQuaternion.v

$(COQDIR)/IcosianUnits.vo: $(COQDIR)/IcosianUnits.v $(COQDIR)/GoldenField.vo $(COQDIR)/GoldenQuaternion.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) IcosianUnits.v

$(COQDIR)/IcosianSpan.vo: $(COQDIR)/IcosianSpan.v $(COQDIR)/GoldenField.vo $(COQDIR)/GoldenQuaternion.vo $(COQDIR)/IcosianUnits.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) IcosianSpan.v

$(COQDIR)/E8Roots.vo: $(COQDIR)/E8Roots.v $(COQDIR)/VecQ.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) E8Roots.v

$(COQDIR)/WeylReflection.vo: $(COQDIR)/WeylReflection.v $(COQDIR)/VecQ.vo $(COQDIR)/E8Roots.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) WeylReflection.v

$(COQDIR)/FanoIncidence.vo: $(COQDIR)/FanoIncidence.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) FanoIncidence.v

$(COQDIR)/OmiRingIcosian.vo: $(COQDIR)/OmiRingIcosian.v $(COQDIR)/GoldenField.vo $(COQDIR)/GoldenQuaternion.vo $(COQDIR)/IcosianUnits.vo $(COQDIR)/FanoIncidence.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) OmiRingIcosian.v

$(COQDIR)/OmiRingQuotation.vo: $(COQDIR)/OmiRingQuotation.v $(COQDIR)/GoldenField.vo $(COQDIR)/GoldenQuaternion.vo $(COQDIR)/IcosianUnits.vo $(COQDIR)/OmiRingIcosian.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) OmiRingQuotation.v

$(COQDIR)/ProofStatus00.vo: $(COQDIR)/ProofStatus00.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) ProofStatus00.v

$(COQDIR)/FiniteBasics01.vo: $(COQDIR)/FiniteBasics01.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) FiniteBasics01.v

$(COQDIR)/FanoIncidence02.vo: $(COQDIR)/FanoIncidence02.v $(COQDIR)/FiniteBasics01.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) FanoIncidence02.v

$(COQDIR)/BitmaskClosure03.vo: $(COQDIR)/BitmaskClosure03.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) BitmaskClosure03.v

$(COQDIR)/KarnaughReduction04.vo: $(COQDIR)/KarnaughReduction04.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) KarnaughReduction04.v

$(COQDIR)/GaugeTable05.vo: $(COQDIR)/GaugeTable05.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) GaugeTable05.v

$(COQDIR)/GoldenField06.vo: $(COQDIR)/GoldenField06.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) GoldenField06.v

$(COQDIR)/GoldenQuaternion07.vo: $(COQDIR)/GoldenQuaternion07.v $(COQDIR)/GoldenField06.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) GoldenQuaternion07.v

$(COQDIR)/IcosianUnits08.vo: $(COQDIR)/IcosianUnits08.v $(COQDIR)/GoldenField06.vo $(COQDIR)/GoldenQuaternion07.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) IcosianUnits08.v

$(COQDIR)/OmiRingStep09.vo: $(COQDIR)/OmiRingStep09.v $(COQDIR)/GoldenField06.vo $(COQDIR)/GoldenQuaternion07.vo $(COQDIR)/IcosianUnits08.vo $(COQDIR)/GaugeTable05.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) OmiRingStep09.v

$(COQDIR)/RelationalQuotation10.vo: $(COQDIR)/RelationalQuotation10.v $(COQDIR)/GoldenField06.vo $(COQDIR)/GoldenQuaternion07.vo $(COQDIR)/IcosianUnits08.vo $(COQDIR)/OmiRingStep09.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) RelationalQuotation10.v

$(COQDIR)/E8Roots11.vo: $(COQDIR)/E8Roots11.v $(COQDIR)/FiniteBasics01.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) E8Roots11.v

$(COQDIR)/WeylReflection12.vo: $(COQDIR)/WeylReflection12.v $(COQDIR)/E8Roots11.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) WeylReflection12.v

$(COQDIR)/HopfProjection13.vo: $(COQDIR)/HopfProjection13.v $(COQDIR)/GoldenField06.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) HopfProjection13.v

$(COQDIR)/PinchBranchLocalForms14.vo: $(COQDIR)/PinchBranchLocalForms14.v
	cd $(COQDIR) && $(COQC) $(COQFLAGS) PinchBranchLocalForms14.v

$(COQDIR)/ProofRegistry15.vo: $(COQDIR)/ProofRegistry15.v $(COQDIR)/ProofStatus00.vo $(COQDIR)/FiniteBasics01.vo $(COQDIR)/FanoIncidence02.vo $(COQDIR)/BitmaskClosure03.vo $(COQDIR)/KarnaughReduction04.vo $(COQDIR)/GaugeTable05.vo $(COQDIR)/GoldenField06.vo $(COQDIR)/GoldenQuaternion07.vo $(COQDIR)/IcosianUnits08.vo $(COQDIR)/OmiRingStep09.vo $(COQDIR)/RelationalQuotation10.vo $(COQDIR)/E8Roots11.vo $(COQDIR)/WeylReflection12.vo $(COQDIR)/HopfProjection13.vo $(COQDIR)/PinchBranchLocalForms14.vo
	cd $(COQDIR) && $(COQC) $(COQFLAGS) ProofRegistry15.v

clean:
	find $(COQDIR) -type f \( \
		-name '*.vo' -o -name '*.vos' -o -name '*.vok' -o \
		-name '*.glob' -o -name '*.aux' -o -name '.*.aux' -o \
		-name '*.vio' -o -name '*.v.beautified' -o \
		-name '*.required_vo' -o -name '*.ml' -o -name '*.mli' \) -delete
	rm -f $(COQDIR)/.lia.cache $(COQDIR)/.nia.cache $(COQDIR)/.nra.cache

.PHONY: proof clean
