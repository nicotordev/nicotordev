"use client";

import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import KeyValueRow from "@/components/admin/key-value-row";
import { formatBytes } from "@/lib/format-bytes";
import type { CreateUploadIntentResult } from "@/lib/admin/upload-actions";
import { createUploadIntent } from "@/lib/admin/upload-actions";

type UploadResult = CreateUploadIntentResult & {
  size: number;
  contentType: string;
};

export default function UploaderCard() {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [prefix, setPrefix] = useState("uploads");
  const [result, setResult] = useState<UploadResult | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload asset to R2</CardTitle>
        <CardDescription>
          Generates a presigned PUT URL, uploads directly from your browser, and
          returns a signed GET URL for preview/download.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="file">File</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prefix">Prefix</Label>
          <Input
            id="prefix"
            placeholder="uploads"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Objects will be stored as{" "}
            <span className="font-mono">
              {prefix || "uploads"}/&lt;signature&gt;_&lt;uuid&gt;-&lt;file&gt;
            </span>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            disabled={!file || isPending}
            onClick={() => {
              if (!file) return;
              setResult(null);
              startTransition(async () => {
                try {
                  const intent = await createUploadIntent({
                    fileName: file.name,
                    contentType: file.type || "application/octet-stream",
                    prefix: prefix.trim() ? prefix : undefined,
                  });

                  const res = await fetch(intent.putUrl, {
                    method: "PUT",
                    headers: {
                      "Content-Type":
                        file.type || "application/octet-stream",
                    },
                    body: file,
                  });

                  if (!res.ok) {
                    throw new Error(`Upload failed (${res.status})`);
                  }

                  setResult({
                    ...intent,
                    size: file.size,
                    contentType: file.type || "application/octet-stream",
                  });
                  toast.success("Uploaded");
                } catch (e: any) {
                  toast.error(e?.message ?? "Failed to upload");
                }
              });
            }}
            className="gap-2"
          >
            <Upload className={cn("size-4", isPending && "opacity-70")} />
            {isPending ? "Uploading…" : "Upload"}
          </Button>
        </div>

        {result ? (
          <div className="grid gap-3 rounded-lg border bg-card/50 p-4">
            <KeyValueRow label="Key" value={result.key} />
            <KeyValueRow label="Content-Type" value={result.contentType} />
            <KeyValueRow label="Size" value={formatBytes(result.size)} />
            {result.publicUrl ? (
              <KeyValueRow
                label="Public URL"
                value={result.publicUrl}
                href={result.publicUrl}
              />
            ) : (
              <div className="text-xs text-muted-foreground">
                Set <span className="font-mono">R2_PUBLIC_BASE_URL</span> to
                display a public URL.
              </div>
            )}
            <KeyValueRow label="Signed GET URL" value={result.getUrl} href={result.getUrl} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
