"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ExternalLink, Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Link as LinkModel } from "@/lib/links/backend";
import { canonicalShortUrl, listLinks } from "@/lib/links/backend";

export default function LinksDashboard() {
  const { getToken } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<LinkModel[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const origin = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  async function load(nextSearch?: string) {
    setError(null);
    const token = await getToken();
    const res = await listLinks(nextSearch, token ?? undefined);
    setItems(res.items);
    setTotal(typeof res.total === "number" ? res.total : null);
  }

  useEffect(() => {
    startTransition(() => {
      load().catch((e: any) => setError(e?.message ?? "Failed to load links"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Links</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage tracked redirects at <span className="font-mono">/r/&lt;slug&gt;</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                load(search).catch((e: any) =>
                  setError(e?.message ?? "Failed to refresh")
                );
              });
            }}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
          <Button asChild size="sm" className="gap-2">
            <Link href="./links/new">
              <Plus className="size-4" />
              New link
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by slug, destination, tags…"
            className="pl-9"
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              startTransition(() => {
                load(search).catch((err: any) =>
                  setError(err?.message ?? "Search failed")
                );
              });
            }}
          />
        </div>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              load(search).catch((err: any) =>
                setError(err?.message ?? "Search failed")
              );
            });
          }}
        >
          Search
        </Button>
        {total !== null ? (
          <div className="text-sm text-muted-foreground sm:ml-auto">
            {total} total
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-lg border bg-card/50 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="rounded-xl border bg-card/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead className="hidden md:table-cell">Destination</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-sm text-muted-foreground">
                  {isPending ? "Loading…" : "No links found"}
                </TableCell>
              </TableRow>
            ) : (
              items.map((link) => {
                const shortUrl = canonicalShortUrl(link.slug, origin);
                return (
                  <TableRow key={link.id}>
                    <TableCell className="font-mono">{link.slug}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <a
                        href={link.destination_url}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-1 max-w-[600px] break-all text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                      >
                        {link.destination_url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`./links/${encodeURIComponent(link.id)}`}>
                            Details
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(shortUrl, "_blank", "noopener,noreferrer")}
                          className="gap-2"
                        >
                          <ExternalLink className="size-4" />
                          Open
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

