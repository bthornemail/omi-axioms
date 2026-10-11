import java.math.BigInteger;
import java.nio.file.*;

/** Reads proof.bin and every literal beside it, and XORs each against the Blob. Run: java Equivalence.java */
public class Equivalence {
  static final String B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  static byte[] fixed(BigInteger n) {
    byte[] raw = n.toByteArray(), out = new byte[8192];
    int skip = Math.max(0, raw.length - 8192);
    System.arraycopy(raw, skip, out, 8192 - (raw.length - skip), raw.length - skip);
    return out;
  }
  static byte[] base32(String s) {
    byte[] out = new byte[8192]; int acc = 0, bits = 0, i = 0;
    for (char c : s.replaceAll("\\s+", "").toCharArray()) {
      acc = ((acc << 5) | B32.indexOf(c)) & 0xffff; bits += 5;
      if (bits >= 8) { bits -= 8; if (i < 8192) out[i++] = (byte) ((acc >> bits) & 0xff); }
    }
    return out;
  }
  public static void main(String[] args) throws Exception {
    byte[] blob = Files.readAllBytes(Path.of("proof.bin"));
    BigInteger whole = new BigInteger(1, blob);
    String[][] forms = { {"0x", "16"}, {"0b", "2"}, {"0o", "8"}, {"0d", "10"} };
    boolean all = true;
    for (String[] f : forms) {
      String text = Files.readString(Path.of("proof." + f[0])).trim().substring(2);
      BigInteger n = new BigInteger(text, Integer.parseInt(f[1]));
      byte[] u = fixed(n); int ones = 0;
      for (int i = 0; i < 8192; i++) ones |= (u[i] ^ blob[i]) & 0xff;
      boolean zero = n.xor(whole).signum() == 0 && ones == 0;
      all &= zero;
      System.out.println(f[0] + ": xor " + (zero ? "0n and 0u" : "NOT zero"));
    }
    byte[] b = base32(Files.readString(Path.of("proof.b32"))); int ones = 0;
    for (int i = 0; i < 8192; i++) ones |= (b[i] ^ blob[i]) & 0xff;
    all &= ones == 0;
    System.out.println("base32: xor " + (ones == 0 ? "0u" : "NOT zero"));
    System.out.println(all ? "EQUIVALENT: every form XORs the Blob to 0" : "NOT EQUIVALENT");
    if (!all) System.exit(1);
  }
}
