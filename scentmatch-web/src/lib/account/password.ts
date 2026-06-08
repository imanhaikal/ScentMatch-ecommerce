import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);
const ALGORITHM = "sha256";
const ITERATIONS = 210_000;
const KEY_LENGTH = 32;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await pbkdf2Async(password, salt, ITERATIONS, KEY_LENGTH, ALGORITHM);

  return `pbkdf2:${ALGORITHM}:${ITERATIONS}:${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, encodedHash: string) {
  const [scheme, algorithm, iterationsValue, salt, expectedHash] = encodedHash.split(":");

  if (scheme !== "pbkdf2" || algorithm !== ALGORITHM || !iterationsValue || !salt || !expectedHash) {
    return false;
  }

  const iterations = Number(iterationsValue);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;

  const expected = Buffer.from(expectedHash, "hex");
  const actual = await pbkdf2Async(password, salt, iterations, expected.length, algorithm);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
