#!/bin/sh
# tag: FANO
# title: every 7-bit margin state resolves to one of the 16 Fano constants in at most two steps
# category: fano
# applets: sh-arithmetic
# claim: the step "mark a XOR b for every marked pair" (one OR of three ANDs per point) reaches a fixed point in at most two steps for all 128 inputs; the fixed points are exactly the 16 XOR-closed masks (empty, 7 points, 7 lines, full); and, ordered as in core/src/verified/fano.ts (0 empty, 1..7 points, 8..14 lines, 15 full), the dual of index i is i XOR 15, i.e. perp(CONSTANTS[i]) == CONSTANTS[i XOR 15]. (Gemini's engine, checked against the author's verified fano.ts.)
set -u
fail(){ echo "FAIL($0): $*" >&2; exit 1; }

# One convergence step (fano.ts step): out = mask, then for each line {a,b,c} light
# the third point when the other two are on. No subshell: result in RES.
LINES='1 2 3 : 1 4 5 : 1 6 7 : 2 4 6 : 2 5 7 : 3 4 7 : 3 5 6'
fstep(){
  _m=$(( $1 & 127 )); _o=$_m
  _old=$IFS; IFS=':'
  for L in $LINES; do
    IFS=' '; set -- $L
    _a=$(( (_m >> ($1 - 1)) & 1 )); _b=$(( (_m >> ($2 - 1)) & 1 )); _c=$(( (_m >> ($3 - 1)) & 1 ))
    _o=$(( _o | ((_a & _b) << ($3 - 1)) | ((_a & _c) << ($2 - 1)) | ((_b & _c) << ($1 - 1)) ))
    IFS=':'
  done
  IFS=$_old; RES=$_o
}

# perp (fano.ts): the points x whose GF(2) dot product with every marked point is even. Result in RESP.
fperp(){
  _m=$(( $1 & 127 )); _out=0; _x=1
  while [ "$_x" -lt 8 ]; do
    _even=1; _n=1
    while [ "$_n" -lt 8 ]; do
      if [ $(( (_m >> (_n - 1)) & 1 )) -ne 0 ]; then
        _p=$(( _x & _n )); _p=$(( _p ^ (_p >> 2) )); _p=$(( _p ^ (_p >> 1) ))
        [ $(( _p & 1 )) -ne 0 ] && _even=0
      fi
      _n=$(( _n + 1 ))
    done
    [ "$_even" -ne 0 ] && _out=$(( _out | (1 << (_x - 1)) ))
    _x=$(( _x + 1 ))
  done
  RESP=$_out
}
is_const(){ fstep "$1"; [ "$RES" = "$1" ]; }

# assert: every state converges in <= 2 steps to a fixed mask that is a constant
s=0
while [ "$s" -lt 128 ]; do
  fstep "$s";  s1=$RES
  fstep "$s1"; s2=$RES
  fstep "$s2"; s3=$RES
  [ "$s3" -eq "$s2" ] || fail "state $s not fixed within two steps ($s -> $s1 -> $s2 -> $s3)"
  is_const "$s2" || fail "state $s converged to $s2, not a constant"
  s=$(( s + 1 ))
done

# assert: exactly 16 fixed points
nfix=0; s=0
while [ "$s" -lt 128 ]; do is_const "$s" && nfix=$(( nfix + 1 )); s=$(( s + 1 )); done
[ "$nfix" -eq 16 ] || fail "expected 16 fixed points, found $nfix"

# build the ordered table T0..T15 exactly as fano.ts, then check the dual law
T='0 1 2 4 8 16 32 64'
for i in 8 9 10 11 12 13 14; do fperp "$(( 1 << (14 - i) ))"; T="$T $RESP"; done
T="$T 127"
i=0; for v in $T; do eval "T$i=$v"; i=$(( i + 1 )); done

# assert: all sixteen table entries are constants (fixed points)
i=0; while [ "$i" -lt 16 ]; do eval "m=\$T$i"; is_const "$m" || fail "table[$i]=$m is not a constant"; i=$(( i + 1 )); done

# assert: the dual law perp(CONSTANTS[i]) == CONSTANTS[i XOR 15] for all i
i=0; while [ "$i" -lt 16 ]; do
  j=$(( i ^ 15 )); eval "mi=\$T$i"; eval "mj=\$T$j"
  fperp "$mi"
  [ "$RESP" = "$mj" ] || fail "dual law fails at i=$i: perp($mi)=$RESP, table[i^15=$j]=$mj"
  i=$(( i + 1 ))
done

echo "FANO: 128 states converge in <=2 steps to the 16 constants; dual is i XOR 15 — passed"
