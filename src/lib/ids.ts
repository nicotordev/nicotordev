function sanitizeSignature(signature: string) {
  const trimmed = signature.trim().toLowerCase();
  if (!trimmed) return "nico";
  return trimmed.replace(/[^a-z0-9]+/g, "").slice(0, 12) || "nico";
}

function uuid() {
  const fn = globalThis.crypto?.randomUUID;
  if (!fn) {
    throw new Error("crypto.randomUUID is not available in this runtime");
  }
  return fn.call(globalThis.crypto);
}

export function signedUuid(signature = "nico") {
  const sig = sanitizeSignature(signature);
  return `${sig}_${uuid()}`;
}

export function compactUuid() {
  return uuid().replace(/-/g, "");
}
