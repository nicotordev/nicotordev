import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

export type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  endpoint: string;
  publicBaseUrl?: string;
};

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getR2Config(): R2Config | null {
  const accountId = readEnv("R2_ACCOUNT_ID");
  const accessKeyId = readEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = readEnv("R2_SECRET_ACCESS_KEY");
  const bucketName = readEnv("R2_BUCKET_NAME");

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    return null;
  }

  const endpoint =
    readEnv("R2_ENDPOINT") ?? `https://${accountId}.r2.cloudflarestorage.com`;

  const publicBaseUrl = readEnv("R2_PUBLIC_BASE_URL")?.replace(/\/$/, "");

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    endpoint,
    ...(publicBaseUrl ? { publicBaseUrl } : {}),
  };
}

let cachedClient: S3Client | null = null;
let cachedClientKey: string | null = null;

export function getR2Client(): { client: S3Client; config: R2Config } {
  const config = getR2Config();
  if (!config) {
    throw new Error(
      "Missing R2 configuration. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET_NAME."
    );
  }

  const key = [
    config.endpoint,
    config.accessKeyId,
    config.secretAccessKey,
  ].join("|");

  if (!cachedClient || cachedClientKey !== key) {
    cachedClient = new S3Client({
      region: "auto",
      endpoint: config.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    cachedClientKey = key;
  }

  return { client: cachedClient, config };
}

export function r2PublicUrlForKey(config: R2Config, key: string): string | null {
  if (!config.publicBaseUrl) return null;
  const normalizedKey = key.replace(/^\/+/, "");
  return `${config.publicBaseUrl}/${normalizedKey}`;
}
