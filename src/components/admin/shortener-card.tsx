"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { ExternalLink } from "lucide-react";
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
import KeyValueRow from "@/components/admin/key-value-row";
import type { Link } from "@/lib/links/backend";
import { canonicalShortUrl, createLink } from "@/lib/links/backend";

type ShortenerCardProps = {
  locale?: string;
};

export default function ShortenerCard(_props: ShortenerCardProps) {
  const [isPending, startTransition] = useTransition();
  const [destinationUrl, setDestinationUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [result, setResult] = useState<Link | null>(null);
  const { getToken } = useAuth();

  const shortUrl = useMemo(() => {
    if (!result) return null;
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    return canonicalShortUrl(result.slug, origin);
  }, [result]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create short link</CardTitle>
        <CardDescription>
          Stores redirects in R2 as JSON objects under your configured prefix.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="destinationUrl">Destination URL</Label>
          <Input
            id="destinationUrl"
            placeholder="https://example.com/some/long/path"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Custom slug (optional)</Label>
          <Input
            id="slug"
            placeholder="my-link"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Allowed: letters, numbers, <span className="font-mono">-</span> and{" "}
            <span className="font-mono">_</span> (3–64 chars).
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            disabled={!destinationUrl.trim() || isPending}
            onClick={() => {
              setResult(null);
              startTransition(async () => {
                try {
                  const token = await getToken();
                  const created = await createLink({
                    destination_url: destinationUrl,
                    ...(slug.trim() ? { slug } : {}),
                    ...(token ? { authToken: token } : {}),
                  });
                  setResult(created);
                  toast.success("Short link created");
                } catch (e: any) {
                  toast.error(e?.message ?? "Failed to create short link");
                }
              });
            }}
          >
            {isPending ? "Creating…" : "Create"}
          </Button>

          {result?.slug ? (
            <Button
              variant="outline"
              disabled={!shortUrl}
              onClick={() => {
                if (!shortUrl) return;
                window.open(shortUrl, "_blank", "noopener,noreferrer");
              }}
              className="gap-2"
            >
              <ExternalLink className="size-4" />
              Open
            </Button>
          ) : null}
        </div>

        {result ? (
          <div className="grid gap-3 rounded-lg border bg-card/50 p-4">
            <KeyValueRow
              label="Short URL"
              value={shortUrl ?? `/r/${result.slug}`}
            />
            <KeyValueRow
              label="Destination"
              value={result.destination_url}
              href={result.destination_url}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
