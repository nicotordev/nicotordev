"use server";

import { currentUser } from "@clerk/nextjs/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { getR2Client, r2PublicUrlForKey } from "@/lib/r2";
import { buildUploadKey } from "@/lib/admin/uploads";

function requireAdminRole(
  user: Awaited<ReturnType<typeof currentUser>>
): asserts user is NonNullable<Awaited<ReturnType<typeof currentUser>>> {
  const role = (user?.privateMetadata?.role as string | undefined) ?? null;
  if (!user || role !== "admin") {
    throw new Error("Unauthorized");
  }
}

const uploadIntentSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  prefix: z.string().trim().optional(),
});

export type CreateUploadIntentResult = {
  key: string;
  putUrl: string;
  getUrl: string;
  publicUrl: string | null;
};

export async function createUploadIntent(
  input: z.input<typeof uploadIntentSchema>
): Promise<CreateUploadIntentResult> {
  const user = await currentUser();
  requireAdminRole(user);

  const parsed = uploadIntentSchema.parse(input);
  const { client, config } = getR2Client();
  const signature = process.env.ID_SIGNATURE ?? "nico";

  const prefix = (parsed.prefix ?? "uploads").replace(/^\/+|\/+$/g, "");
  const key = buildUploadKey({
    prefix,
    fileName: parsed.fileName,
    signature,
  });

  const putUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      ContentType: parsed.contentType,
    }),
    { expiresIn: 60 * 5 }
  );

  const getUrl = await getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: config.bucketName, Key: key }),
    { expiresIn: 60 * 60 }
  );

  return {
    key,
    putUrl,
    getUrl,
    publicUrl: r2PublicUrlForKey(config, key),
  };
}

