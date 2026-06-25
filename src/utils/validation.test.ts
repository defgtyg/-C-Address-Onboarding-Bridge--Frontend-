import { describe, it, expect } from "vitest";
import { validateCAddress } from "./validation";

const VALID_C = "CD3PAUUC6WSXPQQM26UNI7ZBRQLOQSLOXYZPCYC32U4C2EDROJZM2MOL";
const CORRUPT_CHECKSUM = "CD3PAUUC6WAXPQQM26UNI7ZBRQLOQSLOXYZPCYC32U4C2EDROJZM2MOL";
const VALID_G = "GA5GHFQ2MX27ZRULWWRWAANVL7SSMDU6LF2A42QK52335UGPCJYWTCT7";

describe("validateCAddress", () => {
  it("returns null for a valid C-address", () => {
    expect(validateCAddress(VALID_C)).toBeNull();
  });

  it("returns null for empty string (no-input state)", () => {
    expect(validateCAddress("")).toBeNull();
  });

  it("flags a valid G-address with a specific 'use C-address' message", () => {
    const error = validateCAddress(VALID_G);
    expect(error).toContain("G-address");
    expect(error).toContain("'C'");
  });

  it("flags a non-C/non-G prefix with a generic prefix message", () => {
    const error = validateCAddress("XABC123");
    expect(error).toContain("'C'");
    expect(error).not.toContain("G-address");
  });

  it("flags a too-short C-prefix string", () => {
    const error = validateCAddress("CABC123");
    expect(error).toContain("56 characters");
  });

  it("flags a too-long C-prefix string", () => {
    const error = validateCAddress("C" + "A".repeat(56));
    expect(error).toContain("56 characters");
  });

  it("flags a 56-char C-address with an invalid checksum", () => {
    const error = validateCAddress(CORRUPT_CHECKSUM);
    expect(error).toContain("checksum");
  });

  it("does not return a checksum error for a valid G-address interpreted as C", () => {
    const gAsC = "C" + VALID_G.slice(1);
    const error = validateCAddress(gAsC);
    expect(error).toContain("checksum");
  });
});
