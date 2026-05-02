import { createHash } from "node:crypto";

const KEY_NAME = "codedocss-fingerprint";

/** Server-side: хеширует fingerprint для хранения. */
export function hashFingerprint(raw: string): string {
  if (!raw || raw.length < 4) return "anon";
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export const FINGERPRINT_LOCAL_STORAGE_KEY = KEY_NAME;
