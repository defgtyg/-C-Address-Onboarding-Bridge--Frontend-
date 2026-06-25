import { StrKey } from "@stellar/stellar-sdk";

/**
 * Validates a Soroban C-address with contextual error messages.
 * Returns null when valid, or a human-readable error string.
 */
export function validateCAddress(address: string): string | null {
  if (!address) return null;

  if (!address.startsWith("C")) {
    if (address.startsWith("G") && StrKey.isValidEd25519PublicKey(address)) {
      return "This is a Stellar G-address (public key). Soroban Contract IDs must begin with a 'C'.";
    }
    return "Soroban Contract IDs must begin with a 'C'.";
  }

  if (address.length !== 56) {
    return `C-addresses must be exactly 56 characters (got ${address.length}).`;
  }

  if (!StrKey.isValidContract(address)) {
    return "Invalid address checksum. Please verify the characters.";
  }

  return null;
}
