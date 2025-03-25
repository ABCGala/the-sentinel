import stringify from "json-stringify-deterministic";
import elliptic from "elliptic";
import jsSha3 from "js-sha3";
import { v4 as uuidv4 } from "uuid";

const { keccak256 } = jsSha3;
const ec = new elliptic.ec("secp256k1");

/**
 * Cryptographic Utilities for The Sentinel
 * Core security functions for GALA token operations
 */

/**
 * Securely signs transaction objects with ECDSA (secp256k1)
 * @param obj - The payload object to sign
 * @param privateKey - Hex-formatted private key (with or without 0x prefix)
 * @returns The original object with added signature field
 * @throws If private key is invalid or signing fails
 */
export function signObject<T>(obj: T, privateKey: string): T & { signature: string } {
  try {
    // Prepare canonical JSON representation
    const toSign = stringify({ ...obj, signature: undefined });
    
    // Generate Keccak-256 hash
    const hash = keccak256(Buffer.from(toSign, "utf-8"));
    
    // Load and validate private key
    const cleanPrivateKey = privateKey.trim().replace(/^0x/, "");
    const key = ec.keyFromPrivate(cleanPrivateKey, "hex");
    
    // Create deterministic signature
    const signature = key.sign(hash, { canonical: true }).toDER("hex");

    console.log("🛡️ The Sentinel - Successfully signed transaction payload");
    return { ...obj, signature };
  } catch (error) {
    console.error("❌ The Sentinel - Critical signing error:", error);
    throw new Error("Transaction signing failed - possible invalid private key");
  }
}

/**
 * Generates unique operation IDs for transaction tracking
 * @returns Universally unique operation identifier
 * @format galasentinel-operation-{uuidv4}
 */
export function generateUniqueKey(): string {
  const operationId = `galasentinel-operation-${uuidv4()}`;
  console.log(`🛡️ The Sentinel - Generated operation ID: ${operationId}`);
  return operationId;
}

/**
 * Validates ECDSA signatures (Future implementation)
 * @future Add signature verification for enhanced security
 */
// export function verifySignature() { ... }