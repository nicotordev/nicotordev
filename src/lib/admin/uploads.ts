import { signedUuid } from "@/lib/ids";

export function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^\w.\-() ]+/g, "_").trim() || "file";
}

export function buildUploadKey({
  prefix,
  fileName,
  signature = "nico",
}: {
  prefix: string;
  fileName: string;
  signature?: string;
}) {
  const normalizedPrefix = (prefix || "uploads").replace(/^\/+|\/+$/g, "");
  const safeFileName = sanitizeFileName(fileName);
  return `${normalizedPrefix}/${signedUuid(signature)}-${safeFileName}`;
}

