import stringify from "json-stringify-deterministic";
import elliptic from "elliptic";
import jsSha3 from "js-sha3";
import { v4 as uuidv4 } from "uuid";

const { keccak256 } = jsSha3;
const ec = new elliptic.ec("secp256k1");

/**
 * Signs an object with the private key using secp256k1.
 * @param obj - The object to sign.
 * @param privateKey - The private key to sign with.
 * @returns The object with a signature added.
 */
export function signObject<T>(obj: T, privateKey: string): T & { signature: string } {
  const toSign = stringify({ ...obj, signature: undefined });
  const hash = keccak256(Buffer.from(toSign, "utf-8"));
  const key = ec.keyFromPrivate(privateKey.trim().replace(/^0x/, ""), "hex");
  const signature = key.sign(hash, { canonical: true }).toDER("hex");

  return { ...obj, signature };
}

/**
 * Generates a unique key for transactions.
 * @returns A unique key string for identifying operations in **The Sentinel** bot.
 */
export function generateUniqueKey(): string {
  return `galaconnect-operation-${uuidv4()}`;
}
