"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Link as LinkModel } from "@/lib/links/backend";
import { createLink, getLinkById, updateLinkById } from "@/lib/links/backend";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  id?: string;
};

function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function stringifyTags(tags: string[] | undefined) {
  return (tags ?? []).join(", ");
}

export default function LinkEditor({ mode, id }: Props) {
  const { getToken } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [loaded, setLoaded] = useState(false);
  const [link, setLink] = useState<LinkModel | null>(null);
  const [eventCount, setEventCount] = useState<number | null>(null);

  const [slug, setSlug] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);

  const header = useMemo(() => {
    return mode === "create" ? "New link" : "Link details";
  }, [mode]);

  useEffect(() => {
    if (mode !== "edit" || !id) return;
    startTransition(() => {
      (async () => {
        const token = await getToken();
        const res = await getLinkById(id, token ?? undefined);
        setLink(res.link);
        setEventCount(res.eventCount);
        setSlug(res.link.slug);
        setDestinationUrl(res.link.destination_url);
        setTags(stringifyTags(res.link.tags));
        setNotes(res.link.notes ?? "");
        setIsActive(res.link.is_active);
        setLoaded(true);
      })().catch((e: any) => {
        toast.error(e?.message ?? "Failed to load link");
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  async function onSave() {
    const token = await getToken();

    if (mode === "create") {
      const created = await createLink({
        destination_url: destinationUrl,
        ...(slug.trim() ? { slug } : {}),
        ...(tags.trim() ? { tags: parseTags(tags) } : {}),
        ...(notes.trim() ? { notes } : {}),
        ...(token ? { authToken: token } : {}),
      });
      toast.success("Link created");
      setLink(created);
      return created;
    }

    if (!id) throw new Error("Missing id");

    const updated = await updateLinkById(
      id,
      {
        slug,
        destination_url: destinationUrl,
        is_active: isActive,
        tags: parseTags(tags),
        notes: notes.trim() ? notes : "",
      },
      token ?? undefined
    );
    toast.success("Saved");
    setLink(updated);
    return updated;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight">{header}</h2>
          {mode === "edit" ? (
            <p className="text-sm text-muted-foreground">
              {eventCount !== null ? `${eventCount} events` : "—"}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Creates a tracked redirect at <span className="font-mono">/r/&lt;slug&gt;</span>.
            </p>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="../links">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>

      {mode === "edit" && !loaded && isPending ? (
        <div className="rounded-lg border bg-card/50 p-4 text-sm text-muted-foreground">
          Loading…
        </div>
      ) : null}

      <div className="grid gap-4 rounded-xl border bg-card/50 p-6">
        <div className="grid gap-2">
          <Label htmlFor="destination">Destination URL</Label>
          <Input
            id="destination"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="demo"
          />
          <p className="text-xs text-muted-foreground">
            If empty, the backend can generate one.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="marketing, launch"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes…"
          />
        </div>

        {mode === "edit" ? (
          <div className="flex items-center justify-between rounded-lg border bg-background/40 p-4">
            <div className="grid gap-1">
              <div className="text-sm font-medium">Active</div>
              <div className="text-xs text-muted-foreground">
                Disable to stop redirecting and tracking.
              </div>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-2">
          <Button
            disabled={isPending || !destinationUrl.trim()}
            onClick={() => {
              startTransition(() => {
                onSave().catch((e: any) =>
                  toast.error(e?.message ?? "Save failed")
                );
              });
            }}
            className="gap-2"
          >
            <Save className="size-4" />
            {isPending ? "Saving…" : "Save"}
          </Button>
        </div>

        {mode === "edit" && link ? (
          <div className="pt-2 text-xs text-muted-foreground">
            ID: <span className="font-mono">{link.id}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
