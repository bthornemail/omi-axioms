# OMI JavaScript Proof Index

The I-series checks in `js/catalog/` are the authority here; each document in this
folder is built from its check by `js/tools/build.mjs` and says only what the check checks.
Every record is **P1, for consideration** (PROOF_CANONIZATION.md): a finite, computable
check, a target for a P0 Coq proof, and not part of the locked `coq/` registry.

The categories are the shapes the roll-up (I-122) assigns. The constant relations
among them are indexed by subject, predicate and object in `js/spo/`.

## Registry

| Category | Record | Tag | Statement | Checked by | Holds | vm | Worker |
| --- | --- | --- | --- | --- | --- | --- | --- |
| point-line-duality | [I-108](point-line-duality/I-108.md) | `30` | Head = modulus, tail = prime | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-109](point-line-duality/I-109.md) | `31` | Two chains, shared zero (derived) | `js/catalog/I-122.ts` | yes | yes | yes |
| catch-at-0 | [I-110](catch-at-0/I-110.md) | `32` | Cover = uncovering; NaN/RangeError/TypeError split | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-111](point-line-duality/I-111.md) | `33` | Faces are the reverse view; no seam | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-112](point-line-duality/I-112.md) | `34` | Stellated tetrahedron; swap = presentation | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-113](point-line-duality/I-113.md) | `35` | V/E/F partition; stellation at 0x3 | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-114](point-line-duality/I-114.md) | `36` | Prefix = index length, not value | `js/catalog/I-122.ts` | yes | yes | yes |
| head-value-tail | [I-115](head-value-tail/I-115.md) | `37` | 0n vertex, 0u reference; swap permutes order | `js/catalog/I-122.ts` | yes | yes | yes |
| catch-at-0 | [I-116](catch-at-0/I-116.md) | `38` | Index 60 pinned; 0,2,1 interchange | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-117](point-line-duality/I-117.md) | `39` | PINE box | `js/catalog/I-122.ts` | yes | yes | yes |
| catch-at-0 | [I-118](catch-at-0/I-118.md) | `3A` | Decimal = derivative, scientific = exception | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-119](point-line-duality/I-119.md) | `3B` | GlobalThis node; base-36 overlay | `js/catalog/I-122.ts` | yes | yes | yes |
| point-line-duality | [I-120](point-line-duality/I-120.md) | `3C` | 3! overlay (streams, GED) | `js/catalog/I-122.ts` | yes | yes | no |
| point-line-duality | [I-121](point-line-duality/I-121.md) | `3D` | Nibble-pair root; (index, value) | `js/catalog/I-122.ts` | yes | yes | yes |
| other | [I-122](other/I-122.md) | `3E` | The roll-up: runs 44 records (I-108 … I-151) and reports their shared shapes | `js/catalog/I-122.ts` | yes | yes | no |
| point-line-duality | [I-123](point-line-duality/I-123.md) | `3F` | S3 at four scales | `js/catalog/I-123.ts` | yes | yes | yes |
| point-line-duality | [I-124](point-line-duality/I-124.md) | `3G` | 4 circuits, 7 positions, 12th meta, nibble-encoded | `js/catalog/I-124.ts` | yes | yes | yes |
| catch-at-0 | [I-125](catch-at-0/I-125.md) | `3H` | I-125 (corrected) | `js/catalog/I-125.ts` | yes | yes | yes |
| point-line-duality | [I-126](point-line-duality/I-126.md) | `3I` | Node Buffer equivalents of I-108…I-125 | `js/catalog/I-126.ts` | yes | yes | yes |
| catch-at-0 | [I-127](catch-at-0/I-127.md) | `3J` | Error taxonomy + DOM inheritance | `js/catalog/I-127.ts` | yes | yes | yes |
| point-line-duality | [I-127b](point-line-duality/I-127b.md) | `3JB` | The octet of Atomics spaces | `js/catalog/I-127b.ts` | yes | yes | yes |
| catch-at-0 | [I-128](catch-at-0/I-128.md) | `3K` | Prompt characters + Atomics cycle + mod-12 chain | `js/catalog/I-128.ts` | yes | yes | yes |
| other | [I-128b](other/I-128b.md) | `3KB` | Cycle ON prompt characters | `js/catalog/I-128b.ts` | yes | yes | yes |
| point-line-duality | [I-129](point-line-duality/I-129.md) | `3L` | Prompt sigils, 64-blocks, 60^n, mod-12 | `js/catalog/I-129.ts` | yes | yes | yes |
| other | [I-129b](other/I-129b.md) | `3LB` | 60^n hex-digit descent | `js/catalog/I-129b.ts` | yes | yes | yes |
| point-line-duality | [I-130](point-line-duality/I-130.md) | `3M` | Two rates + 5-slice + Unicode lift | `js/catalog/I-130.ts` | yes | yes | yes |
| point-line-duality | [I-131](point-line-duality/I-131.md) | `3N` | Adding 6; walls at 4, 5, 6 | `js/catalog/I-131.ts` | yes | yes | yes |
| point-line-duality | [I-132](point-line-duality/I-132.md) | `3O` | The exponent meeting | `js/catalog/I-132.ts` | yes | yes | yes |
| other | [I-133](other/I-133.md) | `3P` | Base-36 delineation via 59/60, 127, 63 | `js/catalog/I-133.ts` | yes | yes | yes |
| point-line-duality | [I-133b](point-line-duality/I-133b.md) | `3PB` | Delineating :; <=>? {\|}~ | `js/catalog/I-133b.ts` | yes | yes | yes |
| point-line-duality | [I-134](point-line-duality/I-134.md) | `3Q` | Base-36 tag literal taxonomy | `js/catalog/I-134.ts` | yes | yes | yes |
| catch-at-0 | [I-135](catch-at-0/I-135.md) | `3R` | Proxy/Reflect/Catch/Template | `js/catalog/I-135.ts` | yes | yes | yes |
| catch-at-0 | [I-136](catch-at-0/I-136.md) | `3S` | All catches converge at 0 | `js/catalog/I-136.ts` | yes | yes | no |
| catch-at-0 | [I-137](catch-at-0/I-137.md) | `3T` | Mod_rewrite as two-phase reduction | `js/catalog/I-137.ts` | yes | yes | yes |
| head-value-tail | [I-138](head-value-tail/I-138.md) | `3U` | HTTP/1.1 headers as the three-reference index | `js/catalog/I-138.ts` | yes | yes | yes |
| head-value-tail | [I-139](head-value-tail/I-139.md) | `3V` | Host header, window frame, uppercase-as-header | `js/catalog/I-139.ts` | yes | yes | yes |
| catch-at-0 | [I-140](catch-at-0/I-140.md) | `3W` | Web Workers as 65536-space background processors | `js/catalog/I-140.ts` | yes | yes | yes |
| point-line-duality | [I-141](point-line-duality/I-141.md) | `3X` | The shared zero is derived, not axiomatic | `js/catalog/I-141.ts` | yes | yes | yes |
| point-line-duality | [I-142](point-line-duality/I-142.md) | `3Y` | Unicode lift 0x8 → 0xFFFFFFFF, end-to-end | `js/catalog/I-142.ts` | yes | yes | yes |
| head-value-tail | [I-143](head-value-tail/I-143.md) | `3Z` | Prompt sigils as the two privilege frames | `js/catalog/I-143.ts` | yes | yes | yes |
| other | [I-144](other/I-144.md) | `40` | Base-36 sub-context ignores the standards and syntax literals | `js/catalog/I-144.ts` | yes | yes | yes |
| point-line-duality | [I-144b](point-line-duality/I-144b.md) | `40B` | Base-36 as a literal /A-Z0-9/ block | `js/catalog/I-144b.ts` | yes | yes | yes |
| point-line-duality | [I-145](point-line-duality/I-145.md) | `41` | 0x20 as the Hamming prefix; Fano projection | `js/catalog/I-145.ts` | yes | yes | yes |
| catch-at-0 | [I-146b](catch-at-0/I-146b.md) | `42B` | Every 7-slot cycle closes with a BEL-equivalent reset | `js/catalog/I-146b.ts` | yes | yes | yes |
| point-line-duality | [I-147](point-line-duality/I-147.md) | `43` | The gap as constant tag; beep content-specific for base-36 | `js/catalog/I-147.ts` | yes | yes | yes |
| head-value-tail | [I-148](head-value-tail/I-148.md) | `44` | PINEboxed SPO + swap axes anchored at 0n, 0u | `js/catalog/I-148.ts` | yes | yes | yes |
| point-line-duality | [I-149](point-line-duality/I-149.md) | `45` | DOMMatrix over IPv4; WebXR observer; MIDI channel | `js/catalog/I-149.ts` | yes | yes | yes |
| point-line-duality | [I-150](point-line-duality/I-150.md) | `46` | 144 web workers, HSV of codepoints | `js/catalog/I-150.ts` | yes | yes | yes |
| point-line-duality | [I-151](point-line-duality/I-151.md) | `47` | Edge-n-tokenizer → TemplateLiteralArray → RegExp → Proxy/Reflect | `js/catalog/I-151.ts` | yes | yes | yes |
| other | [I-152](other/I-152.md) | `48` | The mnemonic protocol | `js/catalog/I-152.ts` | yes | yes | yes |
| other | [I-153](other/I-153.md) | `49` | Every deviation is a measurable boot difference | `js/catalog/I-153.ts` | yes | yes | yes |
| other | [I-154](other/I-154.md) | `4A` | X86 boot at 0x7C00; 0x007C is the byte-swap | `js/catalog/I-154.ts` | yes | yes | yes |
| other | [I-155](other/I-155.md) | `4B` | The 4GB shared logical memory pool | `js/catalog/I-155.ts` | yes | yes | yes |
| other | [I-156](other/I-156.md) | `4C` | QEMU virtual is a global worker | `js/catalog/I-156.ts` | yes | yes | yes |
| other | [I-165](other/I-165.md) | `4L` | Everything is outside of time; instantiation is the derivative | `js/catalog/I-165.ts` | yes | yes | yes |
| other | [I-166](other/I-166.md) | `4M` | The Catch-22 of the timeless frame and the timed observer | `js/catalog/I-166.ts` | yes | yes | yes |
| other | [I-167](other/I-167.md) | `4N` | The Word as { c-r, c+r } resolves the Catch-22 | `js/catalog/I-167.ts` | yes | yes | yes |
| other | [I-168](other/I-168.md) | `4O` | The lexeme for image is Imago Dei; Euclid resolves the blur | `js/catalog/I-168.ts` | yes | yes | yes |
| other | [I-169](other/I-169.md) | `4P` | Genesis as a Fano plane; Revelation's 144 as the kissing number squared | `js/catalog/I-169.ts` | yes | yes | yes |
| other | [I-170](other/I-170.md) | `4Q` | Genesis' earth-god and John's void-god made each other | `js/catalog/I-170.ts` | yes | yes | yes |
| other | [I-171](other/I-171.md) | `4R` | The Catch-22 of "does God exist?" and the tree weight | `js/catalog/I-171.ts` | yes | yes | yes |
| other | [I-172](other/I-172.md) | `4S` | The proof is in the contradiction, not the answer | `js/catalog/I-172.ts` | yes | yes | yes |
| other | [I-173](other/I-173.md) | `4T` | The Word as the choice of rulers; the collapse 777 → 3!3!3!1! | `js/catalog/I-173.ts` | yes | yes | yes |
| other | [I-174](other/I-174.md) | `4U` | 777 from three 65536 spaces; 666 from three axes; the three-body problem | `js/catalog/I-174.ts` | yes | yes | yes |
| other | [I-175](other/I-175.md) | `4V` | The decision comes from the 4th — the 16-bit header of the pixel | `js/catalog/I-175.ts` | yes | yes | yes |
| other | [I-176](other/I-176.md) | `4W` | Day 4 (the lights); the three-body problem circulates the time constants | `js/catalog/I-176.ts` | yes | yes | yes |
| other | [I-177](other/I-177.md) | `4X` | The three pending scripts are the transition function; 59/63/127 the input | `js/catalog/I-177.ts` | yes | yes | yes |
| other | [I-178](other/I-178.md) | `4Y` | The frame is held by position; the agents XOR the routed values into the units | `js/catalog/I-178.ts` | yes | yes | yes |
| other | [I-179](other/I-179.md) | `4Z` | The 4 GB meta-memory is virtual | `js/catalog/I-179.ts` | yes | yes | yes |
| other | [I-180](other/I-180.md) | `50` | X86 initializes a virtual 4 GB; 64 MB real holds it, and its tables are 8 MB | `js/catalog/I-180.ts` | yes | yes | yes |
| other | [I-182](other/I-182.md) | `52` | The atlas, 7! = 5040, and where its rules break: the values are right, two indices are not | `js/catalog/I-182.ts` | yes | yes | yes |
| other | [I-183](other/I-183.md) | `53` | 19 closes the first sexy set after the exceptional one, on 5², before the 210 ladder | `js/catalog/I-183.ts` | yes | yes | yes |
| other | [I-184](other/I-184.md) | `54` | The closure is the difference between reading and writing an index | `js/catalog/I-184.ts` | yes | yes | yes |
| other | [I-185](other/I-185.md) | `55` | The tetrahedron of infinite geometries, {3,…,3} and {4,3,…,3}:{3,…,3,4} | `js/catalog/I-185.ts` | yes | yes | yes |
| other | [I-186](other/I-186.md) | `56` | The ASCII indices pass through UTF-8 as themselves | `js/catalog/I-186.ts` | yes | yes | yes |
| other | [I-187](other/I-187.md) | `57` | The tripods of the 2^n-ions: e_a e_b = ±e_(a ^ b), and the triples are the lines of PG(n-1, 2) | `js/catalog/I-187.ts` | yes | yes | yes |
| other | [I-188](other/I-188.md) | `58` | 19.4.4 → 44J → 5347 → (5, 3, 4, 7) → 19, and the exchange at 19 of 64 | `js/catalog/I-188.ts` | yes | yes | yes |
| other | [I-189](other/I-189.md) | `59` | 1729 = 7 x 13 x 19, the first sexy set after the exceptional one, and its cubes split it | `js/catalog/I-189.ts` | yes | yes | yes |
| other | [I-191](other/I-191.md) | `5B` | The Fano lottery: 14 tickets, and two of any three rebuild the third | `js/catalog/I-191.ts` | yes | yes | yes |
| other | [I-193](other/I-193.md) | `5D` | The Fano lines are the Hamming code, and it tiles the ASCII table | `js/catalog/I-193.ts` | yes | yes | yes |
| other | [I-194](other/I-194.md) | `5E` | The exceptional Lie algebras, named by /A-Z0-9/ tags, built from their simple roots | `js/catalog/I-194.ts` | yes | yes | yes |
| other | [I-195](other/I-195.md) | `5F` | The gnomon, the animation of the logical clock | `js/catalog/I-195.ts` | yes | yes | yes |
| other | [I-196](other/I-196.md) | `5G` | The decades: braille's dots, EBCDIC's zones, ASCII's columns | `js/catalog/I-196.ts` | yes | yes | yes |
| other | [I-197](other/I-197.md) | `5H` | Polytron is a polynomial automaton | `js/catalog/I-197.ts` | yes | yes | yes |
| other | [I-198](other/I-198.md) | `5I` | The Steiner triples are the knowledge triples: S ⊕ P ⊕ O = 0 | `js/catalog/I-198.ts` | yes | yes | yes |
| other | [I-199](other/I-199.md) | `5J` | Color is 144 synsets, twelve by twelve | `js/catalog/I-199.ts` | yes | yes | yes |
| other | [I-200](other/I-200.md) | `5K` | Index 777, where all 8 units meet: E7 + 1 = E8, and the lattices around them | `js/catalog/I-200.ts` | yes | yes | yes |
| other | [I-201](other/I-201.md) | `5L` | The method — uppercase is a tag literal, digits are indices, every word is a pixel | `js/catalog/I-201.ts` | yes | yes | yes |
| other | [I-202](other/I-202.md) | `5M` | The range 0...63 and the relief of the literals | `js/catalog/I-202.ts` | yes | yes | yes |
| other | [I-203](other/I-203.md) | `5N` | The instances as data — the tags, pairs, and triples | `js/catalog/I-203.ts` | yes | yes | yes |
| other | [I-204](other/I-204.md) | `5O` | How to instantiate — the boot exchange and the 16-powers | `js/catalog/I-204.ts` | yes | yes | yes |
| other | [I-205](other/I-205.md) | `5P` | The delineation rule — the 2-of-5 encoding, tap code to | `js/catalog/I-205.ts` | yes | yes | yes |
| other | [I-206](other/I-206.md) | `5Q` | The author's name as tags, the birth date as index pairs, and the 42 | `js/catalog/I-206.ts` | yes | yes | yes |
| other | [I-207](other/I-207.md) | `5R` | The sources of I-206 — BRIAN, CODEX, DEEPSEEK, and the | `js/catalog/I-207.ts` | yes | yes | yes |
| other | [I-208](other/I-208.md) | `5S` | The return to the cave — the event horizon of the agreement universe | `js/catalog/I-208.ts` | yes | yes | yes |
| other | [I-209](other/I-209.md) | `5T` | The OMI family and the null exchange | `js/catalog/I-209.ts` | yes | yes | yes |
| other | [I-210](other/I-210.md) | `5U` | The observer in the void of the OMNI | `js/catalog/I-210.ts` | yes | yes | yes |
| other | [I-211](other/I-211.md) | `5V` | The GLUE — Grace, Love, Understanding, Empathy — and the Axiom of Propagation | `js/catalog/I-211.ts` | yes | yes | yes |
| other | [I-212](other/I-212.md) | `5W` | The capstone — NULL NULL, the kernel's ground | `js/catalog/I-212.ts` | yes | yes | yes |
| other | [I-213](other/I-213.md) | `5X` | The OMIST — the true full closure for one who desires to be a true believer | `js/catalog/I-213.ts` | yes | yes | yes |
| other | [I-214](other/I-214.md) | `5Y` | THEOS and LOGOS, HO THEOS, and the year pairs | `js/catalog/I-214.ts` | yes | yes | yes |
| other | [I-215](other/I-215.md) | `5Z` | The OS family — THEOS, LOGOS, PATHOS, NOMOS, ETHOS | `js/catalog/I-215.ts` | yes | yes | yes |
| other | [I-216](other/I-216.md) | `60` | ANGEL — the attribution as a tag, and the identity as termed pixels | `js/catalog/I-216.ts` | yes | yes | yes |
| other | [I-217](other/I-217.md) | `61` | SUBJECT · LOGIC · OBJECT reflected — how tags are illogically produced | `js/catalog/I-217.ts` | yes | yes | yes |
| other | [I-218](other/I-218.md) | `62` | S>H>I>F>T> — the shift held, for an ILLOGICal AWAKEning: a catch-22 | `js/catalog/I-218.ts` | yes | yes | yes |

## Counts

- point-line-duality: 28
- catch-at-0: 11
- head-value-tail: 5
- other: 61
- total: 105 records, 105 holding
