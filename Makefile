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
	$(COQDIR)/verified_execution.vo

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

clean:
	find $(COQDIR) -type f \( \
		-name '*.vo' -o -name '*.vos' -o -name '*.vok' -o \
		-name '*.glob' -o -name '*.aux' -o -name '.*.aux' -o \
		-name '*.vio' -o -name '*.v.beautified' -o \
		-name '*.required_vo' -o -name '*.ml' -o -name '*.mli' \) -delete
	rm -f $(COQDIR)/.lia.cache $(COQDIR)/.nia.cache $(COQDIR)/.nra.cache

.PHONY: proof clean
